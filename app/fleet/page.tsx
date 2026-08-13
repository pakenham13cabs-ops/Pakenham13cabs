import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "Taxi Fleet & Maxi Cabs",
  description: "Choose a clean sedan, premium Lexus, SUV or maxi van for local trips and airport transfers in Pakenham.",
  alternates: { canonical: "/fleet" },
  openGraph: {
    title: "Taxi Fleet and Maxi Cabs in Pakenham",
    description: "Sedans, premium cars, SUVs and maxi vans for Pakenham taxi and airport bookings.",
    url: "/fleet",
  },
};

const vehicles = [
  ["Standard Cab", "Everyday excellence", "/images/fleet-camry.webp", "A smooth, quiet and fuel-efficient ride for airport runs, local trips and everyday travel.", "1–4 passengers", "2 large bags", "Standard fare", ["Air conditioning", "Phone charging", "Cleaned before every trip", "Ideal for local and airport travel"]],
  ["Lexus ES300h F Sport", "Premium luxury", "/images/fleet-lexus.webp", "A silver 2025 Lexus with premium seating and quiet hybrid performance for business and special occasions.", "1–4 passengers", "2 large bags", "Standard + $11", ["Luxury hybrid sedan", "Premium leather interior", "Mineral water on request", "Professional presentation"]],
  ["Wagon / SUV Taxi", "Family and group travel", "/images/fleet-kluger.webp", "A spacious Toyota Kluger for families, groups and airport journeys with plenty of luggage.", "1–6 passengers", "4+ large bags", "Standard fare", ["Spacious SUV", "Extra luggage room", "Baby and booster seats", "Ideal for family airport trips"]],
  ["Maxi Van", "Large groups and tours", "/images/fleet-van.webp", "A roomy Toyota HiAce for airport groups, corporate teams, tours and sporting events.", "5–11 passengers", "Group luggage", "Standard + $14", ["Up to 11 passengers", "Large luggage capacity", "Wheelchair access on request", "Corporate and tour groups"]],
] as const;

export default function FleetPage() { return <><Header /><main><section className="inner-hero"><div className="shell centered"><span className="eyebrow eyebrow-light">Our fleet</span><h1>Choose your <strong>vehicle</strong></h1><p>Late-model, fully insured vehicles cleaned before every trip—from everyday sedans to premium cars and maxi vans.</p></div></section><section className="section"><div className="shell fleet-detail-grid">{vehicles.map(([name, tagline, image, description, passengers, luggage, fare, features], index) => <article className="fleet-detail-card" key={name}><div className="fleet-image"><Image src={image} alt={name} width={800} height={598} unoptimized />{index > 0 && <span>{index === 1 ? "Premium" : index === 2 ? "Family pick" : "Group travel"}</span>}<small>{tagline}</small></div><div className="fleet-content"><h2>{name}</h2><p>{description}</p><div className="capacity-row"><span>♙ {passengers}</span><span>▣ {luggage}</span></div><ul>{features.map((item) => <li key={item}>✓ {item}</li>)}</ul><div className="fleet-card-footer"><span><small>Fare</small><strong>{fare}</strong></span><Link className="button button-gold" href="/booking">Book this vehicle</Link></div></div></article>)}</div></section></main><Footer /></>; }
