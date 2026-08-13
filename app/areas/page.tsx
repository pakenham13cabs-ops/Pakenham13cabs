import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PHONE_DISPLAY, PHONE_HREF } from "../site-config";

export const metadata: Metadata = {
  title: "Pakenham Taxi Service Areas",
  description: "24/7 taxi pickups across Pakenham, Officer, Beaconsfield, Berwick and Melbourne's south-east, including airport transfers.",
  alternates: { canonical: "/areas" },
  openGraph: {
    title: "Pakenham Taxi Service Areas",
    description: "Taxi pickups across Pakenham, Officer, Beaconsfield, Berwick and Melbourne's south-east, 24 hours a day.",
    url: "/areas",
  },
};

const areas = ["Pakenham", "Pakenham Upper", "Officer", "Beaconsfield", "Berwick", "Narre Warren", "Clyde North", "Cranbourne", "Bunyip", "Garfield", "Tynong", "Gembrook", "Koo Wee Rup", "Emerald", "Melbourne CBD", "Melbourne Airport"];

export default function AreasPage() {
  return <><Header /><main><section className="inner-hero"><div className="shell centered"><span className="eyebrow eyebrow-light">Local coverage</span><h1>Pakenham taxi <strong>service areas</strong></h1><p>Local, airport and long-distance bookings across Pakenham and Melbourne&apos;s south-east, 24 hours a day.</p></div></section><section className="section"><div className="shell local-grid"><div><span className="eyebrow">Local and reliable</span><h2>Book ahead and speak to a real person</h2><p>We provide direct taxi bookings without surge pricing. Send your pickup details online, or call for the fastest response when you need a cab soon.</p><ul className="reasons-list"><li><strong>Local pickups</strong><span>Homes, stations, appointments, schools and shopping trips.</span></li><li><strong>Airport transfers</strong><span>Melbourne and Avalon airport trips with flight details recorded.</span></li><li><strong>Real confirmation</strong><span>Every online request must be confirmed by call or SMS.</span></li></ul></div><div className="areas-card"><span className="eyebrow">Coverage</span><h2>Areas we serve</h2><div className="area-tags">{areas.map((area) => <span key={area}>{area}</span>)}</div><p>Pickup outside these suburbs? Ask us—we also accept longer-distance trips.</p><a href={PHONE_HREF}>Check your area: {PHONE_DISPLAY}</a></div></div></section><section className="area-info"><div className="shell area-info-grid"><article><span>Airport bookings</span><h2>From your door to the terminal</h2><p>Choose a sedan, premium car, SUV or maxi van based on your group and luggage. Add the flight number to your booking so the trip details are complete.</p></article><article><span>Advance bookings</span><h2>Plan the pickup time</h2><p>Reserve trips for work, events, medical appointments and early flights. Your request becomes confirmed only after we call or SMS you.</p></article></div></section><section className="closing-cta"><div className="shell"><div><span className="eyebrow eyebrow-light">Ready to travel?</span><h2>Book your Pakenham cab</h2><p>Send the trip details online or call us directly.</p></div><div><a className="button button-gold button-large" href={PHONE_HREF}>Call {PHONE_DISPLAY}</a><Link className="button button-ghost button-large" href="/booking">Book online</Link></div></div></section></main><Footer /></>;
}
