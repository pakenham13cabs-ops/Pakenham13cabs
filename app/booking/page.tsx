import type { Metadata } from "next";
import { BookingForm } from "../components/BookingForm";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PHONE_DISPLAY, PHONE_HREF } from "../site-config";

export const metadata: Metadata = {
  title: "Book a Pakenham Taxi",
  description: "Request a Pakenham taxi online for local travel, airport transfers, family trips and maxi-cab bookings.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Book a Pakenham Taxi",
    description: "Send your Pakenham 13 Cabs booking request online and receive confirmation by phone or SMS.",
    url: "/booking",
  },
};

const assurances = ["Available 24/7, including public holidays", "Serving Pakenham and Melbourne's south-east", "No surge pricing", "Advance bookings welcome", "Flight tracking for airport pickups", "Cash and major cards accepted", "Baby and booster seats on request"];
export default function BookingPage() { return <><Header /><main><section className="inner-hero booking-hero"><div className="shell centered"><span className="eyebrow eyebrow-light">Book a ride</span><h1>Book your <strong>taxi</strong></h1><p>Send the form below and we&apos;ll call or SMS to confirm. For an urgent pickup, please call us directly.</p></div></section><section className="section"><div className="shell booking-page-grid"><div><div className="booking-section-title"><span className="eyebrow">Your journey</span><h2>Tell us where and when</h2><p>Your request is only confirmed after our team contacts you.</p></div><BookingForm variant="full" source="booking-page" /></div><aside className="booking-sidebar"><section className="call-card"><span>Prefer to call?</span><strong>{PHONE_DISPLAY}</strong><p>Available 24 hours, 7 days a week.</p><a className="button button-gold" href={PHONE_HREF}>Call now</a></section><section className="good-to-know"><h2>Good to know</h2>{assurances.map((item) => <p key={item}>✓ {item}</p>)}</section></aside></div></section></main><Footer /></>; }
