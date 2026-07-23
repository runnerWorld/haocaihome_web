import type { MetadataRoute } from "next";
import { getAvailableMBTIDailyParams } from "@/lib/mbtiDailyContent";

export const dynamic = "force-dynamic";

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

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
    ...mbtiDailyPages,
  ];
}
