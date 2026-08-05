import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import LanguageSwitch from "@/components/LanguageSwitch";
import {
  getAvailableMBTIDailyParams,
  getEnglishMBTIDailyUrl,
  getMBTIDailyAdjacentDates,
  getMBTIDailyCanonicalSlug,
  getMBTIDailyRecord,
  getMBTIDailyRecordByDate,
  getMBTIDailyUrl,
} from "@/lib/mbtiDailyContent";
import { MBTI_TYPES, getMBTIType, type MBTIType } from "@/lib/mbtiTypes";
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

function getQuickSummary(content: DailyFortuneContent, mbtiType: MBTIType) {
  return {
    keywords: content.quick_summary?.keywords?.length ? content.quick_summary.keywords.slice(0, 3) : ["清晰", "边界", "小行动"],
    suitable: content.quick_summary?.suitable ?? `把${mbtiType.focus}里的一个重点写清楚。`,
    avoid: content.quick_summary?.avoid ?? "反复停在脑内推演，却没有给现实一个反馈。",
    action: content.quick_summary?.action ?? content.one_sentence_advice ?? content.today_advice,
  };
}

function getCardPrompt(content: DailyFortuneContent) {
  return (
    content.card_prompt ?? {
      title: "今日心情卡提示",
      body: "如果你想把今天的提醒变成更贴近自己的解读，可以先标记此刻心情，再抽一张牌观察它回应的是哪一部分状态。",
      cards: [
        { name: "星星", meaning: "把注意力放回希望和长期方向。" },
        { name: "节制", meaning: "先降低强度，把事情拆成更小一步。" },
        { name: "隐士", meaning: "留一点安静时间，听清楚自己的真实判断。" },
      ],
    }
  );
}

function getRelatedTypes(mbtiType: MBTIType, date: string) {
  return MBTI_TYPES.filter((item) => item.code !== mbtiType.code && item.code[0] === mbtiType.code[0] && getMBTIDailyRecord(item.code, date)).slice(0, 3);
}

export function generateStaticParams() {
  return getAvailableMBTIDailyParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { type, date } = await params;
  const record = getMBTIDailyRecord(type, date);
  const mbtiType = getMBTIType(type);

  if (!record) {
    return {
      title: "MBTI 今日运势",
    };
  }

  const canonicalPath = getMBTIDailyUrl(type, record);
  const englishPath = getEnglishMBTIDailyUrl(type, record);

  return {
    title: record.content.seo_title,
    description: record.content.meta_description,
    keywords: [...record.content.seo_keywords, mbtiType?.code, `${mbtiType?.code} 今日运势`, "MBTI 性格关联", "MBTI 每日分析"].filter(Boolean),
    alternates: {
      canonical: getAbsoluteUrl(canonicalPath),
      languages: {
        "zh-CN": getAbsoluteUrl(canonicalPath),
        en: getAbsoluteUrl(englishPath),
      },
    },
    openGraph: {
      title: record.content.seo_title,
      description: record.content.meta_description,
      url: getAbsoluteUrl(canonicalPath),
      siteName: "好彩虹",
      locale: record.locale === "zh-TW" ? "zh_TW" : "zh_CN",
      type: "article",
      publishedTime: record.generated_at,
      modifiedTime: record.generated_at,
    },
    twitter: {
      card: "summary",
      title: record.content.seo_title,
      description: record.content.meta_description,
    },
  };
}

export default async function MBTIDailyPage({ params }: PageProps) {
  const { type, date } = await params;
  const mbtiType = getMBTIType(type);
  const record = getMBTIDailyRecord(type, date);

  if (!mbtiType || !record) {
    notFound();
  }

  const canonicalPath = getMBTIDailyUrl(mbtiType.code, record);
  const canonicalSlug = getMBTIDailyCanonicalSlug(record);

  if (date !== canonicalSlug) {
    permanentRedirect(canonicalPath);
  }

  const quickSummary = getQuickSummary(record.content, mbtiType);
  const cardPrompt = getCardPrompt(record.content);
  const relatedTypes = getRelatedTypes(mbtiType, record.date);
  const { previousDate, nextDate } = getMBTIDailyAdjacentDates(mbtiType.code, record.date);
  const appCta =
    record.content.app_cta ??
    `想把今天的提醒变成你的专属解读？打开好彩虹，先抽一张今日心情卡，再继续问 AI：${mbtiType.code} 今天下一步该怎么做？`;
  const sections = [
    ["今日总运", record.content.overall],
    ["工作运", record.content.work],
    ["学习运", record.content.study],
    ["爱情运", record.content.love],
    ["人际相处", record.content.relationship],
  ];
  const pageUrl = getAbsoluteUrl(canonicalPath);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: record.content.h1,
    description: record.content.meta_description,
    url: pageUrl,
    datePublished: record.generated_at,
    dateModified: record.generated_at,
    inLanguage: record.locale === "zh-TW" ? "zh-TW" : "zh-CN",
    author: {
      "@type": "Organization",
      name: "好彩虹",
    },
    publisher: {
      "@type": "Organization",
      name: "好彩虹",
    },
    mainEntityOfPage: pageUrl,
    keywords: [...record.content.seo_keywords, ...(record.content.topic_keywords ?? record.content.geo_keywords ?? [])].join(", "),
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: record.content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-arcana-charcoal px-5 py-12 text-arcana-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)} />
      <article className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="font-medium text-arcana-gray hover:text-arcana-gold">
              首页
            </Link>
            <span className="text-arcana-gray-dark">/</span>
            <Link href="/mbti" className="font-medium text-arcana-gray hover:text-arcana-gold">
              MBTI 今日运势
            </Link>
          </div>
          <LanguageSwitch current="zh" zhHref={canonicalPath} enHref={getEnglishMBTIDailyUrl(mbtiType.code, record)} />
        </div>

        <header className="mb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-arcana-gold">{mbtiType.code}</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-arcana-gray">{record.date}</span>
          </div>
          <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl">{record.content.h1}</h1>
          <p className="text-lg leading-relaxed text-arcana-gray">{record.content.hook ?? record.content.intro}</p>
        </header>

        <section className="mb-8 rounded-2xl border border-arcana-gold/15 bg-white/70 p-6 shadow-sm">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-arcana-gold">今日主题</p>
              <h2 className="text-2xl font-bold">{record.content.daily_theme ?? `${mbtiType.code} 今日运势和性格有什么关系？`}</h2>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-arcana-gray">{mbtiType.title}</span>
          </div>
          <p className="mb-5 text-base leading-relaxed text-arcana-gray">
            {record.content.one_sentence_advice ??
              `${mbtiType.code} 的今日运势不是给你贴标签，而是把${mbtiType.name}型常见的节奏和今天的具体场景连起来，帮你找到一个能马上开始的小动作。`}
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">人格重点</h3>
              <p className="text-sm leading-relaxed text-arcana-gray">{mbtiType.focus}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">今日观察</h3>
              <p className="text-sm leading-relaxed text-arcana-gray">{quickSummary.suitable}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">行动提醒</h3>
              <p className="text-sm leading-relaxed text-arcana-gray">{quickSummary.action}</p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-2xl bg-arcana-charcoal-light p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">今日 {mbtiType.code} 快速摘要</h2>
          <div className="mb-5 flex flex-wrap gap-2">
            {quickSummary.keywords.map((keyword) => (
              <span key={keyword} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-arcana-gold">
                {keyword}
              </span>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <h3 className="mb-2 text-base font-semibold">适合</h3>
              <p className="text-sm leading-relaxed text-arcana-gray">{quickSummary.suitable}</p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold">避免</h3>
              <p className="text-sm leading-relaxed text-arcana-gray">{quickSummary.avoid}</p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold">现在就做</h3>
              <p className="text-sm leading-relaxed text-arcana-gray">{quickSummary.action}</p>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-3 sm:grid-cols-3">
          <div className="ios-glass rounded-2xl p-5">
            <p className="text-sm text-arcana-gray">幸运色</p>
            <p className="mt-2 text-xl font-bold text-arcana-cream">{record.content.lucky_color}</p>
          </div>
          <div className="ios-glass rounded-2xl p-5">
            <p className="text-sm text-arcana-gray">幸运数字</p>
            <p className="mt-2 text-xl font-bold text-arcana-cream">{record.content.lucky_number}</p>
          </div>
          <div className="ios-glass rounded-2xl p-5">
            <p className="text-sm text-arcana-gray">人格类型</p>
            <p className="mt-2 text-xl font-bold text-arcana-cream">{mbtiType.name}</p>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-arcana-gold/15 bg-white/70 p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold">今天最容易卡住的瞬间</h2>
          <p className="text-base leading-relaxed text-arcana-gray">
            {record.content.stuck_moment ??
              `你知道自己应该处理${mbtiType.focus.split("、")[0]}，却迟迟没有把它变成一个具体动作。今天先不要追求完整答案，先把第一个入口打开。`}
          </p>
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
          <h2 className="mb-3 text-2xl font-bold">今日建议</h2>
          <p className="text-base leading-relaxed text-arcana-gray">{record.content.today_advice}</p>
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
          <h2 className="mb-3 text-2xl font-bold">把今天的提醒继续聊下去</h2>
          <p className="mb-5 text-base leading-relaxed text-arcana-gray">{appCta}</p>
          <a
            href={appStoreUrl}
            className="inline-flex h-12 items-center justify-center rounded-full bg-arcana-gold px-6 text-sm font-semibold text-white shadow-md shadow-arcana-gold/20 transition-all hover:-translate-y-0.5"
          >
            打开好彩虹抽今日心情卡
          </a>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">常见问题</h2>
          <div className="space-y-3">
            {record.content.faq.map((item) => (
              <details key={item.question} className="rounded-2xl border border-arcana-gold/15 bg-white/70 p-5">
                <summary className="cursor-pointer font-semibold">{item.question}</summary>
                <p className="mt-3 leading-relaxed text-arcana-gray">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-arcana-gold/15 bg-white/70 p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">继续查看 MBTI 今日运势</h2>
          <div className="flex flex-wrap gap-3">
            {previousDate ? (
              <Link href={getMBTIDailyUrl(mbtiType.code, getMBTIDailyRecordByDate(mbtiType.code, previousDate)!)} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-arcana-gray hover:text-arcana-gold">
                查看 {previousDate} {mbtiType.code} 运势
              </Link>
            ) : null}
            {nextDate ? (
              <Link href={getMBTIDailyUrl(mbtiType.code, getMBTIDailyRecordByDate(mbtiType.code, nextDate)!)} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-arcana-gray hover:text-arcana-gold">
                查看 {nextDate} {mbtiType.code} 运势
              </Link>
            ) : null}
            {relatedTypes.map((item) => (
              <Link key={item.code} href={getMBTIDailyUrl(item.code, getMBTIDailyRecordByDate(item.code, record.date)!)} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-arcana-gray hover:text-arcana-gold">
                {item.code} 今日运势
              </Link>
            ))}
            <Link href="/mbti" className="rounded-full bg-arcana-gold px-4 py-2 text-sm font-semibold text-white">
              查看全部 16 型人格
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
