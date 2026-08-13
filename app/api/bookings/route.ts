import { eq } from "drizzle-orm";
import { ensureBookingSchema, getDb } from "../../../db";
import { bookings } from "../../../db/schema";
import { BOOKING_EMAIL } from "../../site-config";

type Payload = Record<string, unknown>;
type BookingValues = {
  name: string; phone: string; email: string; service: string; vehicle: string;
  pickup: string; dropoff: string; date: string; time: string; passengers: number;
  payment: string; flight: string; notes: string; source: string;
};
type NotificationStatus = "sent" | "failed" | "not_configured";
const allowedVehicles = new Set(["Sedan", "SUV", "Van", "Maxi Van"]);
const allowedPayments = new Set(["Debit Card / Cash", "MPTP", "Cabcharge"]);

function clean(value: unknown, max: number) { return typeof value === "string" ? value.replaceAll("\0", "").trim().slice(0, max) : ""; }
function reference() { return `PKM-${new Date().toISOString().slice(5, 10).replace("-", "")}-${crypto.randomUUID().slice(0, 5).toUpperCase()}`; }
function isCalendarDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}
function melbourneCutoff() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Melbourne", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date(Date.now() - 15 * 60 * 1000));
  const value = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${value.year}-${value.month}-${value.day}T${value.hour}:${value.minute}`;
}
function validate(values: BookingValues) {
  if (!values.name || !values.phone || !values.vehicle || !values.pickup || !values.dropoff || !values.date || !values.time) return "Please complete every required field.";
  const phoneDigits = values.phone.replace(/\D/g, "");
  if (phoneDigits.length < 9 || phoneDigits.length > 15) return "Please enter a valid phone number.";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return "Please enter a valid email address.";
  if (!allowedVehicles.has(values.vehicle)) return "Please choose a vehicle type.";
  if (values.payment && !allowedPayments.has(values.payment)) return "Please choose a valid payment preference.";
  if (!isCalendarDate(values.date) || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(values.time)) return "Please enter a valid pickup date and time.";
  if (`${values.date}T${values.time}` < melbourneCutoff()) return "Please choose a future pickup date and time.";
  if (!Number.isInteger(values.passengers) || values.passengers < 1 || values.passengers > 4) return "Please choose 1, 2, 3 or 4 / 4+ passengers.";
  return null;
}

async function notify(values: BookingValues, ref: string): Promise<NotificationStatus> {
  const { env } = await import("cloudflare:workers");
  const key = (env as unknown as { WEB3FORMS_ACCESS_KEY?: string }).WEB3FORMS_ACCESS_KEY?.trim();
  if (!key) return "not_configured";
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        access_key: key,
        subject: `New Pakenham 13 Cabs booking — ${ref}`,
        from_name: "Pakenham 13 Cabs website",
        botcheck: false,
        booking_reference: ref,
        website_contact: BOOKING_EMAIL,
        ...values,
        pickup_date_time: `${values.date} ${values.time}`,
        passengers: values.passengers === 4 ? "4 / 4+ passengers" : `${values.passengers} passenger${values.passengers > 1 ? "s" : ""}`,
        payment: values.payment || "Not specified",
      }),
    });
    const result = await response.json().catch(() => null) as { success?: boolean } | null;
    return response.ok && result?.success === true ? "sent" : "failed";
  } catch { return "failed"; }
}

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return Response.json({ error: "Please submit the booking form again." }, { status: 415 });
    if (Number(request.headers.get("content-length") || 0) > 20_000) return Response.json({ error: "This booking request is too large." }, { status: 413 });
    const raw = await request.text();
    if (raw.length > 20_000) return Response.json({ error: "This booking request is too large." }, { status: 413 });
    let body: Payload;
    try { body = JSON.parse(raw) as Payload; }
    catch { return Response.json({ error: "Please submit the booking form again." }, { status: 400 }); }
    if (clean(body.company, 80)) return Response.json({ error: "Unable to accept this booking." }, { status: 400 });
    const pickupAt = clean(body.pickupAt, 16);
    const [pickupDate = "", pickupTime = ""] = pickupAt.split("T");
    const values: BookingValues = { name: clean(body.name, 80), phone: clean(body.phone, 24), email: clean(body.email, 120), service: clean(body.service, 80), vehicle: clean(body.vehicle, 40), pickup: clean(body.pickup, 180), dropoff: clean(body.dropoff, 180), date: pickupDate || clean(body.date, 10), time: pickupTime || clean(body.time, 5), passengers: Number(body.passengers), payment: clean(body.payment, 40), flight: clean(body.flight, 30), notes: clean(body.notes, 800), source: clean(body.source, 40) || "website" };
    const validationError = validate(values);
    if (validationError) return Response.json({ error: validationError }, { status: 400 });
    const ref = reference();
    const db = await getDb();
    await ensureBookingSchema(db);
    const { payment, ...storedValues } = values;
    const storedNotes = [payment ? `Payment preference: ${payment}` : "", values.notes].filter(Boolean).join("\n");
    await db.insert(bookings).values({ reference: ref, ...storedValues, notes: storedNotes, notificationStatus: "pending" });
    const notification = await notify(values, ref);
    await db.update(bookings).set({ notificationStatus: notification }).where(eq(bookings.reference, ref));
    return Response.json({ reference: ref, notification }, { status: notification === "sent" ? 201 : 202 });
  } catch (error) {
    console.error("Booking submission failed", error);
    return Response.json({ error: "We could not send your booking right now." }, { status: 500 });
  }
}
