"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { intentions, type Intention } from "./data";

function StoneSwatch({ color, ring }: { color: string; ring: string }) {
  return (
    <span
      className="block h-10 w-10 rounded-full border shadow-sm"
      style={{
        borderColor: ring,
        background: `radial-gradient(circle at 30% 24%, #fff 0 8%, ${color} 40%, ${ring} 100%)`,
      }}
    />
  );
}

export default function CrystalNecklaceBuilder() {
  const [selectedIntention, setSelectedIntention] = useState<Intention>(intentions[2]);
  const router = useRouter();

  const continueToDesign = () => {
    localStorage.setItem("haocai-necklace-intention", selectedIntention.id);
    router.push(`/crystal-necklace-builder/design?intention=${selectedIntention.id}`);
  };

  return (
    <main className="min-h-screen bg-arcana-charcoal px-5 py-8 text-arcana-cream">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-10 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-arcana-gray hover:text-arcana-gold">
            好彩虹
          </Link>
          <Link href="/mbti" className="text-sm font-semibold text-arcana-gray hover:text-arcana-gold">
            MBTI 今日运势
          </Link>
        </nav>

        <section className="grid min-h-[calc(100vh-7rem)] items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="mb-4 text-sm font-semibold text-arcana-gold">Crystal Bracelet Builder</p>
            <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl">今天的你，需要哪一条水晶手环？</h1>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-arcana-gray sm:text-lg">
              先选择你的心情、愿望或今天最想加强的方向。好彩虹会推荐 3 种水晶，下一步进入手环设计页，拖拽调整每一颗珠子的位置。
            </p>
            <button type="button" onClick={continueToDesign} className="inline-flex h-12 items-center justify-center rounded-full bg-arcana-gold px-6 text-sm font-semibold text-white shadow-md shadow-arcana-gold/20">
              下一步：设计手环
            </button>
          </div>

          <div className="space-y-5">
            <section className="ios-glass rounded-2xl p-5">
              <h2 className="mb-4 text-2xl font-bold">今天你想要哪一种能量？</h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {intentions.map((intention) => (
                  <button
                    key={intention.id}
                    type="button"
                    onClick={() => setSelectedIntention(intention)}
                    className={`rounded-2xl border p-3 text-left transition-all ${
                      selectedIntention.id === intention.id ? "border-arcana-gold bg-white shadow-sm" : "border-transparent bg-white/70 hover:border-arcana-gold/30"
                    }`}
                  >
                    <span className="block text-base font-semibold">{intention.label}</span>
                    <span className="mt-1 block text-xs text-arcana-gray">{intention.english}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="ios-glass rounded-2xl p-5">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-arcana-gold">{selectedIntention.title}</p>
                  <h2 className="mt-1 text-2xl font-bold">推荐这 3 种水晶</h2>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-arcana-gray">{selectedIntention.english}</span>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {selectedIntention.stones.map((stone) => (
                  <article key={stone.id} className="rounded-2xl bg-white p-4 shadow-sm">
                    <StoneSwatch color={stone.color} ring={stone.ring} />
                    <h3 className="mt-4 font-semibold">{stone.name}</h3>
                    <p className="text-xs text-arcana-gold">{stone.english}</p>
                    <p className="mt-2 text-sm leading-relaxed text-arcana-gray">{stone.note}</p>
                  </article>
                ))}
              </div>
              <p className="mt-5 rounded-2xl bg-white/75 p-4 text-sm leading-relaxed text-arcana-gray">{selectedIntention.reminder}</p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
