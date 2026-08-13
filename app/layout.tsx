import type { Metadata } from "next";
import "./globals.css";
import { PHONE_E164, SITE_NAME, SITE_URL } from "./site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Pakenham 13 Cabs | 24/7 Taxi & Airport Transfers", template: "%s | Pakenham 13 Cabs" },
  description: "Reliable 24/7 taxi service in Pakenham, Victoria. Local trips, Melbourne Airport transfers, corporate travel, family vehicles and maxi cabs.",
  keywords: ["Pakenham taxi", "Pakenham cabs", "taxi Pakenham", "Pakenham airport transfer", "maxi cab Pakenham"],
  robots: { index: true, follow: true },
  other: { "codex-preview": "development" }, icons: { icon: "/favicon.svg" },
  openGraph: { title: "Pakenham 13 Cabs", description: "Reliable taxis and airport transfers across Pakenham and Melbourne's south-east, 24/7.", type: "website", locale: "en_AU", url: SITE_URL, images: [{ url: "/images/pakenham-taxi-hero.webp", width: 1279, height: 720, alt: "Pakenham taxi ready for an airport transfer" }] },
};
const schema = { "@context": "https://schema.org", "@type": "TaxiService", name: SITE_NAME, url: SITE_URL, telephone: PHONE_E164, priceRange: "$$", areaServed: ["Pakenham", "Officer", "Beaconsfield", "Berwick", "Melbourne"], address: { "@type": "PostalAddress", addressLocality: "Pakenham", addressRegion: "VIC", addressCountry: "AU" }, openingHours: "Mo-Su 00:00-23:59" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en-AU"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>; }
