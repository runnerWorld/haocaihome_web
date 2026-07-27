import type { MetadataRoute } from "next";
import { getAvailableMBTIDailyParams } from "@/lib/mbtiDailyContent";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const mbtiDailyPages = getAvailableMBTIDailyParams().map(({ type, date }) => ({
    url: `${siteUrl}/mbti/${type}/daily/${date}`,
    lastModified: new Date(`${date}T00:00:00.000Z`),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/mbti`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/crystal-necklace-builder`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/crystal-necklace-builder/design`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/crystal-necklace-builder/checkout`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...mbtiDailyPages,
  ];
}
