import Link from "next/link";
import { getMBTIDailyIndexItems, getMBTIDailyUrl } from "@/lib/mbtiDailyContent";
import { getAbsoluteUrl, jsonLdScript } from "@/lib/seo";

export const metadata = {
  title: "MBTI 今日运势 - 16 型人格每日工作学习爱情分析",
  description: "查看 16 型人格每日运势，了解每天的工作、学习、爱情、人际相处分析，以及 MBTI 性格和每日提醒的关联方式。",
  keywords: ["MBTI 今日运势", "16 型人格每日运势", "MBTI 性格分析", "MBTI 工作运", "MBTI 爱情运", "每日人格提醒"],
  alternates: {
    canonical: getAbsoluteUrl("/mbti"),
  },
  openGraph: {
    title: "MBTI 今日运势 - 16 型人格每日工作学习爱情分析",
    description: "查看 16 型人格每日运势，了解每天的工作、学习、爱情、人际相处分析，以及 MBTI 性格和每日提醒的关联方式。",
    url: getAbsoluteUrl("/mbti"),
    siteName: "好彩虹",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MBTI 今日运势",
    description: "16 型人格每日工作、学习、爱情和人际相处分析，以及 MBTI 和每日提醒的关联说明。",
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
      url: item.record ? getAbsoluteUrl(getMBTIDailyUrl(item.code, item.record)) : getAbsoluteUrl("/mbti"),
    })),
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "MBTI 每日运势和性格关联紧密吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "关联是中等偏紧密：MBTI 提供稳定的人格偏好，例如决策方式、能量来源和沟通习惯；每日运势则把这些偏好放进当天的工作、学习、爱情和人际场景中，形成行动提醒。它适合自我观察，不应被当作绝对预测。",
        },
      },
      {
        "@type": "Question",
        name: "为什么同一个 MBTI 类型每天内容会变化？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "因为每日内容关注的是当下状态和具体场景。人格类型提供分析底色，但每天的重点会围绕行动节奏、沟通边界、情绪能量和关系问题变化。",
        },
      },
      {
        "@type": "Question",
        name: "MBTI 今日运势适合用来做什么？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "适合用作每日复盘、工作学习安排、关系沟通提醒和情绪记录入口。它帮助用户把人格偏好转成当天可执行的小建议。",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-arcana-charcoal px-5 py-12 text-arcana-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(itemListJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)} />
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
            const href = item.record ? getMBTIDailyUrl(item.code, item.record) : undefined;

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

        <section className="mt-12 rounded-2xl border border-arcana-gold/15 bg-white/70 p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">MBTI 性格和每日运势的关联有多紧密？</h2>
          <div className="space-y-4 text-base leading-relaxed text-arcana-gray">
            <p>
              好彩虹把 MBTI 当作每日分析的“性格底色”，而不是把它当作固定命运。E/I、S/N、T/F、J/P 四组偏好会影响一个人更容易从哪里获得能量、如何处理信息、怎样做决定，以及面对压力时更需要秩序还是弹性。
            </p>
            <p>
              因此，MBTI 今日运势和性格的关联是中等偏紧密：它会围绕每个类型常见的工作节奏、学习方式、爱情表达和人际边界生成提醒，但不会声称同一类型的人今天一定发生同一件事。更准确的用法，是把它当作每日自我观察和行动选择的入口。
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["人格偏好", "决定内容的长期视角，例如 INTJ 更重视策略，ESFP 更重视体验和互动。"],
              ["每日主题", "决定今天先看工作、学习、爱情还是人际关系，避免内容每天重复。"],
              ["行动建议", "把人格倾向翻译成今天能做的小步骤，例如沟通、复盘、休息或推进。"],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-arcana-cream">{title}</h3>
                <p className="text-sm leading-relaxed text-arcana-gray">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
