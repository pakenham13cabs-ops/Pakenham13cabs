import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PHONE_DISPLAY, PHONE_HREF } from "../site-config";

export const metadata: Metadata = {
  title: "Booking Request Received",
  description: "Your Pakenham 13 Cabs booking request has been received.",
  alternates: { canonical: "/booking-thank-you" },
  robots: { index: false, follow: false },
};

export default function BookingThankYouPage() {
  return (
    <>
      <Header />
      <main>
        <section className="inner-hero booking-hero">
          <div className="shell centered">
            <span className="eyebrow eyebrow-light">Request received</span>
            <h1>Thank you for <strong>booking</strong></h1>
            <p>We have received your taxi request and our team will call or SMS you to confirm the details.</p>
          </div>
        </section>
        <section className="section">
          <div className="shell centered thank-you-card">
            <span className="success-mark" aria-hidden="true">✓</span>
            <span className="eyebrow">Next steps</span>
            <h2>Your request is on its way</h2>
            <p>Online requests are not confirmed until you hear from our team. If your pickup is urgent, call us now and quote the details you submitted.</p>
            <div className="success-actions">
              <a className="button button-gold" href={PHONE_HREF}>Call {PHONE_DISPLAY}</a>
              <a className="button button-navy" href="/">Return home</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
