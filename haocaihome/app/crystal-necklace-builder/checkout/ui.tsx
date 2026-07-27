"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type BraceletDesign = {
  id: string;
  intention: string;
  theme: string;
  pattern: string[];
  size: string;
  beadCount: number;
  basePrice?: number;
  extraBeadCount?: number;
  price: number;
  createdAt: string;
};

export default function BraceletCheckout() {
  const [design, setDesign] = useState<BraceletDesign | null>(null);
  const [status, setStatus] = useState("提交后会保存为待处理订单，之后可接 Stripe Checkout 或后端数据库。");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = localStorage.getItem("haocai-bracelet-design");
      setDesign(stored ? (JSON.parse(stored) as BraceletDesign) : null);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const submitOrder = () => {
    if (!design) return;
    const order = {
      id: `order-${Date.now()}`,
      designId: design.id,
      design,
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("haocai-bracelet-order", JSON.stringify(order));
    setStatus("订单已生成并保存。下一步可以接 Stripe Checkout 或提交到数据库。");
  };

  return (
    <main className="min-h-screen bg-arcana-charcoal px-5 py-8 text-arcana-cream">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-8 flex items-center justify-between">
          <Link href="/crystal-necklace-builder/design" className="text-sm font-semibold text-arcana-gray hover:text-arcana-gold">
            返回调整手环
          </Link>
          <span className="text-sm font-semibold text-arcana-gold">Step 3 / Checkout</span>
        </nav>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="ios-glass rounded-2xl p-5">
            <h1 className="mb-5 text-3xl font-bold">你的水晶手环订单</h1>
            {design ? (
              <div className="space-y-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-arcana-gray">主题</p>
                  <p className="mt-1 text-xl font-bold">{design.theme}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm text-arcana-gray">尺寸</p>
                    <p className="mt-1 text-xl font-bold">{design.size}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-sm text-arcana-gray">总珠数</p>
                    <p className="mt-1 text-xl font-bold">{design.beadCount} 颗</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-arcana-gray">价格</p>
                  <p className="mt-1 text-3xl font-bold text-arcana-gold">${design.price.toFixed(2)}</p>
                  {design.extraBeadCount ? (
                    <p className="mt-2 text-xs text-arcana-gray-dark">
                      基础 ${design.basePrice?.toFixed(2)} + 额外水晶 {design.extraBeadCount} 颗
                    </p>
                  ) : null}
                </div>
                <div className="rounded-2xl bg-[#2A2A2A] p-4 text-white">
                  <p className="mb-2 text-sm font-semibold">珠子顺序</p>
                  <p className="break-words text-xs leading-relaxed text-white/70">{design.pattern.join(" / ")}</p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-5">
                <p className="mb-4 text-sm leading-relaxed text-arcana-gray">还没有手环设计。请先选择意图并调整珠子顺序。</p>
                <Link href="/crystal-necklace-builder" className="inline-flex h-11 items-center justify-center rounded-full bg-arcana-gold px-5 text-sm font-semibold text-white">
                  去设计手环
                </Link>
              </div>
            )}
          </aside>

          <section className="ios-glass rounded-2xl p-5">
            <h2 className="mb-5 text-3xl font-bold">填写制作与联系信息</h2>
            <form className="space-y-4">
              {["姓名", "Email", "地址"].map((label) => (
                <label key={label} className="block">
                  <span className="mb-1 block text-sm font-semibold text-arcana-gray">{label}</span>
                  <input className="h-12 w-full rounded-xl border border-arcana-gold/15 bg-white px-3 text-sm outline-none focus:border-arcana-gold" />
                </label>
              ))}
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-arcana-gray">备注</span>
                <textarea className="min-h-28 w-full rounded-xl border border-arcana-gold/15 bg-white px-3 py-2 text-sm outline-none focus:border-arcana-gold" />
              </label>
              <button type="button" onClick={submitOrder} disabled={!design} className="inline-flex h-12 w-full items-center justify-center rounded-full bg-arcana-gold px-6 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
                提交订单
              </button>
            </form>
            <p className="mt-4 text-sm leading-relaxed text-arcana-gray">{status}</p>
          </section>
        </section>
      </div>
    </main>
  );
}
