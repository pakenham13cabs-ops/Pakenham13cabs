"use client";

import { FormEvent, useState } from "react";
import { PHONE_DISPLAY, PHONE_HREF } from "../site-config";

type Props = { variant?: "compact" | "full"; source?: string };
type State = { kind: "idle" } | { kind: "sending" } | { kind: "success"; reference: string } | { kind: "warning"; reference: string } | { kind: "error"; message: string };
type BookingResult = { reference?: string; notification?: "sent" | "failed" | "not_configured"; error?: string };
const vehicles = [
  ["Sedan", "1–4 seats"],
  ["SUV", "Extra room"],
  ["Van", "Group travel"],
  ["Maxi Van", "Large groups"],
] as const;
const payments = ["Debit Card / Cash", "MPTP", "Cabcharge"] as const;
const services = ["Local / suburban trip", "Airport transfer — to airport", "Airport transfer — from airport", "Corporate travel", "Parcel delivery", "Baby or booster seat", "Meet and greet", "Other"];
function melbourneNow() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Melbourne", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const value = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${value.year}-${value.month}-${value.day}T${value.hour}:${value.minute}`;
}

export function BookingForm({ variant = "compact", source = "website" }: Props) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [now] = useState(melbourneNow);
  const full = variant === "full";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState({ kind: "sending" });
    try {
      const response = await fetch("/api/bookings", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...Object.fromEntries(new FormData(form).entries()), source }) });
      const result = (await response.json()) as BookingResult;
      if (!response.ok || !result.reference) throw new Error(result.error || "We could not send your booking request.");
      form.reset();
      setState(result.notification === "sent" ? { kind: "success", reference: result.reference } : { kind: "warning", reference: result.reference });
    } catch (error) {
      setState({ kind: "error", message: error instanceof Error ? error.message : "Something went wrong. Please call us." });
    }
  }

  if (state.kind === "success") return (
    <div className="booking-success" role="status"><span className="success-mark">✓</span><h2>Booking request sent</h2><p>Your reference is <strong>{state.reference}</strong>. We&apos;ll call or SMS to confirm. Your ride is not confirmed until you hear from us.</p><div className="success-actions"><button type="button" className="button button-gold" onClick={() => setState({ kind: "idle" })}>Make another booking</button><a className="button button-navy" href={PHONE_HREF}>Call us now</a></div></div>
  );

  if (state.kind === "warning") return (
    <div className="booking-success booking-warning" role="status"><span className="success-mark">!</span><h2>Request saved — please call</h2><p>Your reference is <strong>{state.reference}</strong>. We saved your trip details, but could not verify the instant email alert. Please call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a> now so we can confirm your booking.</p><div className="success-actions"><a className="button button-gold" href={PHONE_HREF}>Call {PHONE_DISPLAY}</a><button type="button" className="button button-navy" onClick={() => setState({ kind: "idle" })}>Start again</button></div></div>
  );

  return (
    <form className={`booking-form ${full ? "booking-form-full" : ""}`} onSubmit={submit} aria-describedby="booking-form-note">
      <div className="form-grid">
        <label>Full name <em>*</em><input name="name" autoComplete="name" placeholder="Your name" required maxLength={80} /></label>
        <label>Mobile <em>*</em><input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="04XX XXX XXX" required maxLength={24} /></label>
        <label className={full ? "" : "form-span-2"}>Email <span>(optional)</span><input name="email" type="email" autoComplete="email" placeholder="your@email.com" maxLength={120} /></label>
        {full && <label>Service type<select name="service" defaultValue=""><option value="">Select service</option>{services.map((item) => <option key={item}>{item}</option>)}</select></label>}
        <fieldset className="choice-fieldset form-span-2"><legend>Vehicle type <em>*</em></legend><div className="choice-grid vehicle-choice-grid">{vehicles.map(([vehicle, detail]) => <label className="choice-option" key={vehicle}><input name="vehicle" type="radio" value={vehicle} required /><span><strong>{vehicle}</strong><small>{detail}</small></span></label>)}</div></fieldset>
        <label className={full ? "form-span-2" : ""}>Pickup location <em>*</em><input name="pickup" autoComplete="street-address" placeholder="Pickup address" required maxLength={180} /></label>
        <label className={full ? "form-span-2" : ""}>Drop-off location <em>*</em><input name="dropoff" placeholder="Destination" required maxLength={180} /></label>
        <label>Pickup date &amp; time <em>*</em><input name="pickupAt" type="datetime-local" min={now} suppressHydrationWarning required /></label>
        <label>Passengers<select name="passengers" defaultValue="1"><option value="1">1 passenger</option><option value="2">2 passengers</option><option value="3">3 passengers</option><option value="4">4 / 4+ passengers</option></select></label>
        <fieldset className="choice-fieldset form-span-2"><legend>Payment preference <span>(optional)</span></legend><div className="choice-grid payment-choice-grid">{payments.map((payment) => <label className="choice-option" key={payment}><input name="payment" type="radio" value={payment} /><span><strong>{payment}</strong></span></label>)}</div></fieldset>
        {full && <label>Flight number<input name="flight" placeholder="e.g. QF409" maxLength={30} /></label>}
        {full && <label className="form-span-2">Notes to driver <span>(optional)</span><textarea name="notes" rows={4} placeholder="Baby seat, luggage, flight details or special requirements" maxLength={800} /></label>}
        <label className="trap-field" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <p className="form-privacy">By submitting, you agree that we may use these details to contact you about this booking.</p>
      {state.kind === "error" && <p className="form-error" role="alert">{state.message} Call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.</p>}
      <button className="submit-booking" type="submit" disabled={state.kind === "sending"}>{state.kind === "sending" ? "Sending booking…" : "Submit Booking Request"}</button>
      <p className="form-footnote" id="booking-form-note">We&apos;ll confirm by phone or SMS. For an urgent pickup, call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.</p>
    </form>
  );
}
