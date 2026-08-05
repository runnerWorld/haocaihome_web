import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import LanguageSwitch from "@/components/LanguageSwitch";
import {
  getAvailableMBTIDailyParams,
  getEnglishMBTIDailyUrl,
  getMBTIDailyCanonicalSlug,
  getMBTIDailyRecord,
  getMBTIDailyUrl,
} from "@/lib/mbtiDailyContent";
import { getMBTIType } from "@/lib/mbtiTypes";
import type { DailyFortuneContent } from "@/lib/dailyFortune";
import { getAbsoluteUrl, jsonLdScript } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    type: string;
    date: string;
  }>;
};

const appStoreUrl = "https://apps.apple.com/app/id6759077138";

export const dynamicParams = true;

function getEnglishContent(record: NonNullable<ReturnType<typeof getMBTIDailyRecord>>) {
  return (record.content_en ?? record.content) as DailyFortuneContent;
}

export function generateStaticParams() {
  return getAvailableMBTIDailyParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { type, date } = await params;
  const record = getMBTIDailyRecord(type, date);

  if (!record) {
    return {
      title: "MBTI Daily Horoscope",
    };
  }

  const content = getEnglishContent(record);
  const enPath = getEnglishMBTIDailyUrl(type, record);
  const zhPath = getMBTIDailyUrl(type, record);

  return {
    title: content.seo_title,
    description: content.meta_description,
    keywords: content.seo_keywords,
    alternates: {
      canonical: getAbsoluteUrl(enPath),
      languages: {
        "zh-CN": getAbsoluteUrl(zhPath),
        en: getAbsoluteUrl(enPath),
      },
    },
    openGraph: {
      title: content.seo_title,
      description: content.meta_description,
      url: getAbsoluteUrl(enPath),
      siteName: "Haocaihong",
      locale: "en_US",
      type: "article",
      publishedTime: record.generated_at,
      modifiedTime: record.generated_at,
    },
    twitter: {
      card: "summary",
      title: content.seo_title,
      description: content.meta_description,
    },
  };
}

export default async function EnglishMBTIDailyPage({ params }: PageProps) {
  const { type, date } = await params;
  const mbtiType = getMBTIType(type);
  const record = getMBTIDailyRecord(type, date);

  if (!mbtiType || !record) {
    notFound();
  }

  const canonicalPath = getEnglishMBTIDailyUrl(mbtiType.code, record);
  const canonicalSlug = getMBTIDailyCanonicalSlug(record);

  if (date !== canonicalSlug) {
    permanentRedirect(canonicalPath);
  }

  const content = getEnglishContent(record);
  const quickSummary = content.quick_summary ?? {
    keywords: ["clarity", "boundaries", "small action"],
    suitable: `Choose one priority connected to ${mbtiType.focus}.`,
    avoid: "Overthinking before taking the first practical step.",
    action: content.one_sentence_advice ?? content.today_advice,
  };
  const cardPrompt = content.card_prompt ?? {
    title: "Today's Mood Card Prompt",
    body: "Open Haocaihong, draw today's mood card, and ask the AI what one next step fits your current state.",
    cards: [
      { name: "The Star", meaning: "Return to hope and a longer view." },
      { name: "Temperance", meaning: "Lower the intensity and take one balanced step." },
      { name: "The Hermit", meaning: "Create quiet space for your own judgment." },
    ],
  };
  const pageUrl = getAbsoluteUrl(canonicalPath);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.h1,
    description: content.meta_description,
    url: pageUrl,
    datePublished: record.generated_at,
    dateModified: record.generated_at,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: "Haocaihong",
    },
    publisher: {
      "@type": "Organization",
      name: "Haocaihong",
    },
    mainEntityOfPage: pageUrl,
    keywords: [...content.seo_keywords, ...(content.topic_keywords ?? [])].join(", "),
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  const sections = [
    ["Overall", content.overall],
    ["Work", content.work],
    ["Study", content.study],
    ["Love", content.love],
    ["Relationships", content.relationship],
  ];

  return (
    <main className="min-h-screen bg-arcana-charcoal px-5 py-12 text-arcana-cream" lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)} />
      <article className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="font-medium text-arcana-gray hover:text-arcana-gold">
              Home
            </Link>
            <span className="text-arcana-gray-dark">/</span>
            <Link href="/en/mbti" className="font-medium text-arcana-gray hover:text-arcana-gold">
              MBTI Daily Horoscope
            </Link>
          </div>
          <LanguageSwitch current="en" zhHref={getMBTIDailyUrl(mbtiType.code, record)} enHref={canonicalPath} />
        </div>

        <header className="mb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-arcana-gold">{mbtiType.code}</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-arcana-gray">{record.date}</span>
          </div>
          <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl">{content.h1}</h1>
          <p className="text-lg leading-relaxed text-arcana-gray">{content.hook ?? content.intro}</p>
        </header>

        <section className="mb-8 rounded-2xl border border-arcana-gold/15 bg-white/70 p-6 shadow-sm">
          <p className="mb-2 text-sm font-semibold text-arcana-gold">Today&apos;s Theme</p>
          <h2 className="mb-5 text-2xl font-bold">{content.daily_theme_en ?? content.daily_theme}</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {quickSummary.keywords.slice(0, 3).map((keyword) => (
              <div key={keyword} className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-arcana-gold">{keyword}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl bg-arcana-charcoal-light p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">Quick Summary</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <h3 className="mb-2 text-base font-semibold">Suitable</h3>
              <p className="text-sm leading-relaxed text-arcana-gray">{quickSummary.suitable}</p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold">Avoid</h3>
              <p className="text-sm leading-relaxed text-arcana-gray">{quickSummary.avoid}</p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold">Do Now</h3>
              <p className="text-sm leading-relaxed text-arcana-gray">{quickSummary.action}</p>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-3 sm:grid-cols-3">
          <div className="ios-glass rounded-2xl p-5">
            <p className="text-sm text-arcana-gray">Lucky Color</p>
            <p className="mt-2 text-xl font-bold text-arcana-cream">{content.lucky_color}</p>
          </div>
          <div className="ios-glass rounded-2xl p-5">
            <p className="text-sm text-arcana-gray">Lucky Number</p>
            <p className="mt-2 text-xl font-bold text-arcana-cream">{content.lucky_number}</p>
          </div>
          <div className="ios-glass rounded-2xl p-5">
            <p className="text-sm text-arcana-gray">Personality Type</p>
            <p className="mt-2 text-xl font-bold text-arcana-cream">{mbtiType.code}</p>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-arcana-gold/15 bg-white/70 p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold">Where You May Get Stuck</h2>
          <p className="text-base leading-relaxed text-arcana-gray">{content.stuck_moment}</p>
        </section>

        <section className="mb-8 space-y-4">
          {sections.map(([title, body]) => (
            <section key={title} className="rounded-2xl border border-arcana-gold/15 bg-white/70 p-6 shadow-sm">
              <h2 className="mb-3 text-2xl font-bold">{title}</h2>
              <p className="text-base leading-relaxed text-arcana-gray">{body}</p>
            </section>
          ))}
        </section>

        <section className="mb-8 rounded-2xl bg-arcana-charcoal-light p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold">Today&apos;s Advice</h2>
          <p className="text-base leading-relaxed text-arcana-gray">{content.today_advice}</p>
        </section>

        <section className="mb-8 rounded-2xl border border-arcana-gold/15 bg-white/70 p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold">{cardPrompt.title}</h2>
          <p className="mb-5 text-base leading-relaxed text-arcana-gray">{cardPrompt.body}</p>
          <div className="grid gap-3 md:grid-cols-3">
            {cardPrompt.cards.slice(0, 3).map((card) => (
              <div key={card.name} className="rounded-2xl bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-arcana-gold">{card.name}</h3>
                <p className="text-sm leading-relaxed text-arcana-gray">{card.meaning}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl bg-arcana-charcoal-light p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold">Continue the Reading</h2>
          <p className="mb-5 text-base leading-relaxed text-arcana-gray">{content.app_cta}</p>
          <a
            href={appStoreUrl}
            className="inline-flex h-12 items-center justify-center rounded-full bg-arcana-gold px-6 text-sm font-semibold text-white shadow-md shadow-arcana-gold/20 transition-all hover:-translate-y-0.5"
          >
            Open Haocaihong
          </a>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">FAQ</h2>
          <div className="space-y-3">
            {content.faq.map((item) => (
              <details key={item.question} className="rounded-2xl border border-arcana-gold/15 bg-white/70 p-5">
                <summary className="cursor-pointer font-semibold">{item.question}</summary>
                <p className="mt-3 leading-relaxed text-arcana-gray">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
