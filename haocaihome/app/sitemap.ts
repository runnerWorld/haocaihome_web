import type { MetadataRoute } from "next";
import { getAvailableMBTIDailyPages } from "@/lib/mbtiDailyContent";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const mbtiDailyPages = getAvailableMBTIDailyPages().map(({ type, date, segment }) => ({
    url: `${siteUrl}/mbti/${type}/daily/${segment}`,
    lastModified: new Date(`${date}T00:00:00.000Z`),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));
  const englishMBTIDailyPages = getAvailableMBTIDailyPages().map(({ type, date, segment }) => ({
    url: `${siteUrl}/en/mbti/${type}/daily/${segment}`,
    lastModified: new Date(`${date}T00:00:00.000Z`),
    changeFrequency: "daily" as const,
    priority: 0.75,
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
      url: `${siteUrl}/en/mbti`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    ...mbtiDailyPages,
    ...englishMBTIDailyPages,
  ];
}
