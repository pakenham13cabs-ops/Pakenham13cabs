import type { MetadataRoute } from "next";
import { SITE_URL } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/areas`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/fleet`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/booking`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
