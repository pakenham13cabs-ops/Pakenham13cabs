import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  reference: text("reference").notNull().unique(),
  name: text("name").notNull(), phone: text("phone").notNull(),
  email: text("email").notNull().default(""), service: text("service").notNull().default(""), vehicle: text("vehicle").notNull().default(""),
  pickup: text("pickup").notNull(), dropoff: text("dropoff").notNull(), date: text("date").notNull(), time: text("time").notNull(),
  passengers: integer("passengers").notNull().default(1), flight: text("flight").notNull().default(""), notes: text("notes").notNull().default(""), source: text("source").notNull().default("website"),
  notificationStatus: text("notification_status").notNull().default("pending"), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
