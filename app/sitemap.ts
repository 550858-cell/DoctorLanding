import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { servicePages } from "@/lib/servicePages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    ...servicePages.map((s) => ({
      url: `${site.url}/${s.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
