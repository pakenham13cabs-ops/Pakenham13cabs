import { drizzle } from "drizzle-orm/d1";
import { sql } from "drizzle-orm";
import * as schema from "./schema";

let bookingSchemaReady: Promise<void> | undefined;

export async function getDb() {
  const { env } = await import("cloudflare:workers");
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}

export async function ensureBookingSchema(db: Awaited<ReturnType<typeof getDb>>) {
  bookingSchemaReady ??= (async () => {
    await db.run(sql`CREATE TABLE IF NOT EXISTS bookings (
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      reference text NOT NULL,
      name text NOT NULL,
      phone text NOT NULL,
      email text DEFAULT '' NOT NULL,
      service text DEFAULT '' NOT NULL,
      vehicle text DEFAULT '' NOT NULL,
      pickup text NOT NULL,
      dropoff text NOT NULL,
      date text NOT NULL,
      time text NOT NULL,
      passengers integer DEFAULT 1 NOT NULL,
      flight text DEFAULT '' NOT NULL,
      notes text DEFAULT '' NOT NULL,
      source text DEFAULT 'website' NOT NULL,
      notification_status text DEFAULT 'pending' NOT NULL,
      created_at text DEFAULT CURRENT_TIMESTAMP NOT NULL
    )`);
    await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS bookings_reference_unique ON bookings (reference)`);
  })().catch((error) => {
    bookingSchemaReady = undefined;
    throw error;
  });
  await bookingSchemaReady;
}
