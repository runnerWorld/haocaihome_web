import Link from "next/link";
import LanguageSwitch from "@/components/LanguageSwitch";
import { getEnglishMBTIDailyUrl, getMBTIDailyIndexItems, getMBTIDailyUrl } from "@/lib/mbtiDailyContent";
import { getAbsoluteUrl, jsonLdScript } from "@/lib/seo";

export const metadata = {
  title: "MBTI Daily Horoscope - Work, Study, Love, and Relationships",
  description: "Read daily MBTI horoscope pages for all 16 personality types, with practical guidance for work, study, love, and relationships.",
  keywords: ["MBTI daily horoscope", "16 personalities horoscope", "MBTI work horoscope", "MBTI love horoscope", "personality daily guidance"],
  alternates: {
    canonical: getAbsoluteUrl("/en/mbti"),
    languages: {
      "zh-CN": getAbsoluteUrl("/mbti"),
      en: getAbsoluteUrl("/en/mbti"),
    },
  },
  openGraph: {
    title: "MBTI Daily Horoscope",
    description: "Daily MBTI guidance for work, study, love, and relationships.",
    url: getAbsoluteUrl("/en/mbti"),
    siteName: "Haocaihong",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MBTI Daily Horoscope",
    description: "Daily MBTI guidance for work, study, love, and relationships.",
  },
};

export const dynamic = "force-dynamic";

export default function EnglishMBTIIndexPage() {
  const items = getMBTIDailyIndexItems();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MBTI Daily Horoscope",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${item.code} ${item.name}`,
      url: item.record ? getAbsoluteUrl(getEnglishMBTIDailyUrl(item.code, item.record)) : getAbsoluteUrl("/en/mbti"),
    })),
  };

  return (
    <main className="min-h-screen bg-arcana-charcoal px-5 py-12 text-arcana-cream" lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(itemListJsonLd)} />
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="inline-flex text-sm font-medium text-arcana-gray hover:text-arcana-gold">
            Home
          </Link>
          <LanguageSwitch current="en" zhHref="/mbti" enHref="/en/mbti" />
        </div>

        <header className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold text-arcana-gold">MBTI Daily</p>
          <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">16 Personality Types Daily Horoscope</h1>
          <p className="text-base leading-relaxed text-arcana-gray">
            Read daily guidance for each MBTI type across work, study, love, and relationships. Use it as a practical reflection prompt, not a fixed prediction.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const href = item.record ? getEnglishMBTIDailyUrl(item.code, item.record) : undefined;
            const zhHref = item.record ? getMBTIDailyUrl(item.code, item.record) : undefined;

            return (
              <article key={item.code} className="ios-glass rounded-2xl p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-bold text-arcana-cream">{item.code}</h2>
                    <p className="text-sm text-arcana-gray">{item.title}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-arcana-gold">{item.latestDate ?? "Pending"}</span>
                </div>
                <p className="mb-5 line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed text-arcana-gray">
                  {item.record?.content_en?.meta_description ?? item.record?.content.meta_description ?? item.focus}
                </p>
                {href ? (
                  <div className="flex flex-wrap gap-3">
                    <Link href={href} className="inline-flex text-sm font-semibold text-arcana-gold hover:text-arcana-cream">
                      Read Today
                    </Link>
                    {zhHref ? (
                      <Link href={zhHref} hrefLang="zh-CN" className="inline-flex text-sm font-semibold text-arcana-gray hover:text-arcana-gold">
                        中文
                      </Link>
                    ) : null}
                  </div>
                ) : (
                  <span className="text-sm text-arcana-gray-dark">Waiting for content</span>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
