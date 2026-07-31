import Link from "next/link";

type CheckoutSuccessPageProps = {
  searchParams: Promise<{ order?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const { order } = await searchParams;

  return (
    <main className="min-h-screen bg-arcana-charcoal px-5 py-12 text-arcana-cream">
      <section className="mx-auto max-w-2xl rounded-2xl border border-arcana-gold/15 bg-white/75 p-6 shadow-sm">
        <p className="mb-3 text-sm font-semibold text-arcana-gold">Payment received</p>
        <h1 className="mb-4 text-3xl font-bold">付款完成</h1>
        <p className="mb-6 text-sm leading-relaxed text-arcana-gray">
          我们已经收到你的付款结果。手环制作信息会跟随订单一起处理。
        </p>
        {order ? <p className="mb-6 rounded-xl bg-arcana-charcoal-light p-3 text-sm text-arcana-gray">订单号：{order}</p> : null}
        <Link href="/" className="inline-flex h-11 items-center justify-center rounded-full bg-arcana-gold px-5 text-sm font-semibold text-white">
          返回首页
        </Link>
      </section>
    </main>
  );
}
