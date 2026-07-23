import Link from "next/link";
import { getMBTIDailyIndexItems } from "@/lib/mbtiDailyContent";
import { getAbsoluteUrl, jsonLdScript } from "@/lib/seo";

export const metadata = {
  title: "MBTI 今日运势 - 16 型人格每日工作学习爱情分析",
  description: "查看 16 型人格每日运势，包含工作、学习、爱情、人际相处分析与今日行动建议。",
  alternates: {
    canonical: getAbsoluteUrl("/mbti"),
  },
  openGraph: {
    title: "MBTI 今日运势 - 16 型人格每日工作学习爱情分析",
    description: "查看 16 型人格每日运势，包含工作、学习、爱情、人际相处分析与今日行动建议。",
    url: getAbsoluteUrl("/mbti"),
    siteName: "彩虹奥秘",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MBTI 今日运势",
    description: "16 型人格每日工作、学习、爱情和人际相处分析。",
  },
};

export const dynamic = "force-dynamic";

export default function MBTIIndexPage() {
  const items = getMBTIDailyIndexItems();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MBTI 今日运势",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${item.code} ${item.name}`,
      url: item.latestDate ? getAbsoluteUrl(`/mbti/${item.code.toLowerCase()}/daily/${item.latestDate}`) : getAbsoluteUrl("/mbti"),
    })),
  };

  return (
    <main className="min-h-screen bg-arcana-charcoal px-5 py-12 text-arcana-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(itemListJsonLd)} />
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-8 inline-flex text-sm font-medium text-arcana-gray hover:text-arcana-gold">
          返回首页
        </Link>

        <header className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold text-arcana-gold">MBTI Daily</p>
          <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">16 型人格今日运势</h1>
          <p className="text-base leading-relaxed text-arcana-gray">
            根据 MBTI 类型生成每日工作、学习、爱情和人际相处分析。内容用于自我观察和行动提醒，不替代专业建议。
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const href = item.latestDate ? `/mbti/${item.code.toLowerCase()}/daily/${item.latestDate}` : undefined;

            return (
              <article key={item.code} className="ios-glass rounded-2xl p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-bold text-arcana-cream">{item.code}</h2>
                    <p className="text-sm text-arcana-gray">{item.name}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-arcana-gold">
                    {item.latestDate ?? "未生成"}
                  </span>
                </div>
                <p className="mb-5 line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed text-arcana-gray">
                  {item.record?.content.meta_description ?? item.focus}
                </p>
                {href ? (
                  <Link href={href} className="inline-flex text-sm font-semibold text-arcana-gold hover:text-arcana-cream">
                    查看今日分析
                  </Link>
                ) : (
                  <span className="text-sm text-arcana-gray-dark">等待生成内容</span>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
