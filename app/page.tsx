import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "./components/BookingForm";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { PHONE_DISPLAY, PHONE_HREF } from "./site-config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const shortcuts = [
  ["Airport transfers", "Flight-aware pickups and dependable departures for Melbourne and Avalon airports.", "/services"],
  ["Local & corporate", "Pakenham trips, appointments, business travel and direct parcel delivery.", "/services"],
  ["Family & group travel", "Child seats, roomy SUVs and maxi vans for up to 11 passengers.", "/fleet"],
] as const;
const nearbyAreas = ["Pakenham", "Officer", "Beaconsfield", "Berwick", "Clyde North", "Melbourne Airport"];

export default function Home() {
  return <><Header /><main>
    <section className="hero"><div className="hero-grid shell">
      <div className="hero-copy"><span className="eyebrow eyebrow-light">Available 24 / 7 — Melbourne wide</span><h1>PAKENHAM&apos;S <strong>RELIABLE TAXI</strong> SERVICE</h1><p>Professional drivers, clean vehicles and dependable pickups across Pakenham and Melbourne&apos;s south-east—day or night.</p><ul className="hero-points"><li>Airport transfers</li><li>Local &amp; corporate trips</li><li>Advance bookings</li><li>Vehicles for 1–11</li></ul><div className="hero-actions"><a className="button button-gold button-large" href={PHONE_HREF}>☎ Call {PHONE_DISPLAY}</a><a className="button button-ghost button-large" href="#booking">Book online</a></div><div className="hero-stats"><span><strong>10+</strong> Years&apos; experience</span><span><strong>24/7</strong> Availability</span><span><strong>1–11</strong> Passengers</span></div></div>
      <div className="hero-form-card" id="booking"><div className="form-card-heading"><span>Quick and easy</span><h2>Book Your Cab</h2><p>Send your trip details and we&apos;ll call or SMS to confirm.</p></div><BookingForm source="homepage" /></div>
    </div></section>
    <section className="trust-strip"><div className="shell"><span>✓ Licensed &amp; insured drivers</span><span>✓ Available 24 / 7</span><span>✓ Cash &amp; cards accepted</span><span>✓ Clean, late-model vehicles</span></div></section>
    <section className="section home-shortcuts"><div className="shell"><div className="section-heading centered"><span className="eyebrow">The ride you need</span><h2>Simple choices, dependable service</h2><p>Start here, then view the dedicated service or fleet page if you need more detail.</p></div><div className="shortcut-grid">{shortcuts.map(([title, text, href], index) => <Link className="shortcut-card" href={href} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><strong>View details →</strong></Link>)}</div></div></section>
    <section className="section home-local"><div className="shell home-local-grid"><div><span className="eyebrow">Local and direct</span><h2>A Pakenham taxi team you can call</h2><p>Book ahead, speak directly with our team and receive a real call or SMS confirmation before your ride.</p><div className="home-actions"><Link className="button button-navy" href="/services">View services</Link><Link className="button button-gold" href="/fleet">View vehicles</Link></div></div><div className="areas-card"><span className="eyebrow">Popular coverage</span><h2>Nearby areas</h2><div className="area-tags">{nearbyAreas.map((area) => <span key={area}>{area}</span>)}</div><p>See the full coverage list, or call if your suburb is not shown.</p><Link href="/areas">View all service areas →</Link></div></div></section>
    <section className="closing-cta"><div className="shell"><div><span className="eyebrow eyebrow-light">Ready when you are</span><h2>Need a ride in Pakenham?</h2><p>Call for the fastest response or send your trip details online.</p></div><div><a className="button button-gold button-large" href={PHONE_HREF}>Call {PHONE_DISPLAY}</a><Link className="button button-ghost button-large" href="/booking">Book online</Link></div></div></section>
  </main><Footer /></>;
}
