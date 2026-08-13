import Link from "next/link";
import { Brand } from "./Brand";
import { PHONE_DISPLAY, PHONE_HREF } from "../site-config";

const services = ["Airport Transfers", "Corporate Travel", "Parcel Delivery", "Baby Seat Taxi", "Meet & Greet", "Maxi Cab"];
const areas = ["Pakenham", "Officer", "Beaconsfield", "Berwick", "Narre Warren", "Clyde North"];

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-grid shell">
        <section><Brand /><p>Reliable local taxis, airport transfers and premium travel across Pakenham and Melbourne&apos;s south-east, 24 hours a day.</p><a href={PHONE_HREF}>☎ {PHONE_DISPLAY}</a><span>⌖ Pakenham, Victoria</span></section>
        <section><h2>Services</h2>{services.map((service) => <Link href="/services" key={service}>{service}</Link>)}</section>
        <section><h2>Areas We Serve</h2>{areas.map((area) => <Link href="/areas" key={area}>{area} taxi</Link>)}</section>
        <section className="footer-book"><span>Available 24 / 7</span><h2>Need a cab?</h2><p>Call now for the quickest response, or send your trip details online.</p><a className="button button-gold" href={PHONE_HREF}>Call {PHONE_DISPLAY}</a><Link className="button button-outline" href="/booking">Book online</Link></section>
      </div>
      <div className="footer-bottom shell"><span>© {new Date().getFullYear()} Pakenham 13 Cabs. All rights reserved.</span><span>Serving Melbourne&apos;s south-east since 2014</span></div>
    </footer>
  );
}
