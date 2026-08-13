import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "Taxi Services",
  description: "Airport transfers, local taxis, corporate travel, parcel delivery, child-seat taxis and premium travel in Pakenham.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Taxi Services in Pakenham",
    description: "Airport transfers, local taxis, corporate travel and family-friendly taxi services in Pakenham.",
    url: "/services",
  },
};

const services = [
  ["Airport Transfers", "/images/service-airport.webp", "Reliable pickups and drop-offs for Melbourne and Avalon airports. Share your flight number when booking so delays can be monitored.", ["Flight tracking for collections", "Early-morning and late-night bookings", "Room for passengers and luggage"]],
  ["Corporate Travel", "/images/service-corporate.webp", "Clean vehicles and professional drivers for meetings, client transfers, staff travel and regular business bookings.", ["Professional presentation", "Advance and repeat bookings", "Standard or premium vehicles"]],
  ["Parcel Delivery", "/images/service-parcel.webp", "A direct point-to-point option for time-sensitive documents and parcels across Pakenham and Melbourne.", ["Direct same-day transport", "Pickup and delivery confirmation", "Local and metro destinations"]],
  ["Baby & Booster Seats", "/images/service-baby-seat.webp", "Family-friendly travel with child seats available when requested in advance. Tell us the child's age when booking.", ["Baby and booster seats", "Spacious family vehicles", "Advance requests recommended"]],
  ["Meet & Greet", "/images/service-meet-greet.webp", "A personal airport welcome with a name board, luggage assistance and a driver ready for your onward journey.", ["Name-board welcome", "Luggage assistance", "Ideal for visitors and clients"]],
  ["Premium Travel", "/images/service-entertainment.webp", "A quiet Lexus experience for executive journeys, special occasions and passengers who prefer extra comfort.", ["Premium hybrid sedan", "Business and event travel", "Comfort for longer trips"]],
] as const;

export default function ServicesPage() {
  return <><Header /><main><section className="inner-hero"><div className="shell centered"><span className="eyebrow eyebrow-light">Our services</span><h1>Taxi services for <strong>every journey</strong></h1><p>Choose the trip type that suits you, then send the booking form or call for an urgent pickup.</p></div></section><section className="section"><div className="shell service-grid">{services.map(([title, image, text, features]) => <article className="service-card service-detail-card" key={title}><Image src={image} alt={title} width={700} height={469} unoptimized /><div><h2>{title}</h2><p>{text}</p><ul>{features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul><Link href="/booking">Book this service →</Link></div></article>)}</div></section><section className="closing-cta"><div className="shell"><div><span className="eyebrow eyebrow-light">Not sure what to choose?</span><h2>Tell us about your trip</h2><p>We&apos;ll help match the right vehicle and service to your booking.</p></div><div><Link className="button button-gold button-large" href="/booking">Book online</Link><Link className="button button-ghost button-large" href="/fleet">View fleet</Link></div></div></section></main><Footer /></>;
}
