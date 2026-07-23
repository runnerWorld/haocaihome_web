import Link from "next/link";
import { notFound } from "next/navigation";
import { getAvailableMBTIDailyParams, getMBTIDailyRecord } from "@/lib/mbtiDailyContent";
import { getMBTIType } from "@/lib/mbtiTypes";

type PageProps = {
  params: Promise<{
    type: string;
    date: string;
  }>;
};

export function generateStaticParams() {
  return getAvailableMBTIDailyParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { type, date } = await params;
  const record = getMBTIDailyRecord(type, date);

  if (!record) {
    return {
      title: "MBTI 今日运势",
    };
  }

  return {
    title: record.content.seo_title,
    description: record.content.meta_description,
  };
}

export default async function MBTIDailyPage({ params }: PageProps) {
  const { type, date } = await params;
  const mbtiType = getMBTIType(type);
  const record = getMBTIDailyRecord(type, date);

  if (!mbtiType || !record) {
    notFound();
  }

  const sections = [
    ["今日总运", record.content.overall],
    ["工作运", record.content.work],
    ["学习运", record.content.study],
    ["爱情运", record.content.love],
    ["人际相处", record.content.relationship],
  ];

  return (
    <main className="min-h-screen bg-arcana-charcoal px-5 py-12 text-arcana-cream">
      <article className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm">
          <Link href="/" className="font-medium text-arcana-gray hover:text-arcana-gold">
            首页
          </Link>
          <span className="text-arcana-gray-dark">/</span>
          <Link href="/mbti" className="font-medium text-arcana-gray hover:text-arcana-gold">
            MBTI 今日运势
          </Link>
        </div>

        <header className="mb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-arcana-gold">{mbtiType.code}</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-arcana-gray">{date}</span>
          </div>
          <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl">{record.content.h1}</h1>
          <p className="text-lg leading-relaxed text-arcana-gray">{record.content.intro}</p>
        </header>

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

        <section className="flex flex-wrap gap-2">
          {[...record.content.seo_keywords, ...(record.content.topic_keywords ?? record.content.geo_keywords ?? [])].map((keyword) => (
            <span key={keyword} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-arcana-gray">
              {keyword}
            </span>
          ))}
        </section>
      </article>
    </main>
  );
}
