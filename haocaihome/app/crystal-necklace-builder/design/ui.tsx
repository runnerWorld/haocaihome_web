"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { beadBackground, countStones, getIntention, makeBeads, sizeOptions, stones, type Bead, type LengthOption, type Stone } from "../data";

function SortableBraceletBead({ bead, index, total }: { bead: Bead; index: number; total: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: bead.beadId });
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const left = 50 + Math.cos(angle) * 34;
  const top = 50 + Math.sin(angle) * 34;
  const dndTransform = CSS.Transform.toString(transform);

  return (
    <button
      ref={setNodeRef}
      type="button"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: `${dndTransform ? `${dndTransform} ` : ""}translate(-50%, -50%)`,
        transition,
        touchAction: "none",
      }}
      className={`absolute h-9 w-9 rounded-full border-2 shadow-sm sm:h-10 sm:w-10 ${isDragging ? "z-20 shadow-xl" : "z-10"}`}
      title={`${bead.name} ${bead.english}`}
      {...attributes}
      {...listeners}
    >
      <span className="block h-full w-full rounded-full shadow-[inset_8px_8px_16px_rgba(255,255,255,0.34),inset_-10px_-12px_18px_rgba(0,0,0,0.2)]" style={{ background: beadBackground(bead), borderColor: bead.ring }} />
    </button>
  );
}

function BraceletDesignSurface({ beads, sensors, onDragEnd }: { beads: Bead[]; sensors: ReturnType<typeof useSensors>; onDragEnd: (event: DragEndEvent) => void }) {
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={beads.map((bead) => bead.beadId)} strategy={rectSortingStrategy}>
        <div className="relative mx-auto aspect-square w-full max-w-[420px] rounded-[2rem] bg-white/65 shadow-inner">
          <div className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-[#E7D0A1]/35" />
          <div className="absolute left-1/2 top-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFFDF9]/80 shadow-inner" />
          <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-arcana-gold/30 bg-white" />
          {beads.map((bead, index) => (
            <SortableBraceletBead key={bead.beadId} bead={bead} index={index} total={beads.length} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default function BraceletDesign() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [size, setSize] = useState<LengthOption>("M");
  const intention = useMemo(() => getIntention(searchParams.get("intention")), [searchParams]);
  const sizeConfig = useMemo(() => sizeOptions.find((item) => item.value === size) ?? sizeOptions[1], [size]);
  const [beads, setBeads] = useState<Bead[]>(() => makeBeads(intention.stones, sizeConfig.beads));
  const [activeStone, setActiveStone] = useState<Stone>(stones[0]);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const stoneCounts = useMemo(() => Object.values(countStones(beads)), [beads]);
  const extraBeadCount = Math.max(0, beads.length - sizeConfig.beads);
  const extraBeadPrice = extraBeadCount * 1.5;
  const totalPrice = sizeConfig.price + extraBeadPrice;

  const handleSizeChange = (nextSize: LengthOption) => {
    const nextConfig = sizeOptions.find((item) => item.value === nextSize) ?? sizeOptions[1];
    setSize(nextSize);
    setBeads(makeBeads(intention.stones, nextConfig.beads));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setBeads((items) => {
      const oldIndex = items.findIndex((item) => item.beadId === active.id);
      const newIndex = items.findIndex((item) => item.beadId === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const addStone = (stone: Stone) => {
    setBeads((items) => [...items, { ...stone, beadId: `${stone.id}-${Date.now()}-${items.length}` }]);
  };

  const continueToCheckout = () => {
    const design = {
      id: `bracelet-${Date.now()}`,
      intention: intention.id,
      theme: intention.title,
      stones: intention.stones.map((stone) => stone.id),
      pattern: beads.map((bead) => bead.id),
      size,
      beadCount: beads.length,
      basePrice: sizeConfig.price,
      extraBeadCount,
      price: totalPrice,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("haocai-bracelet-design", JSON.stringify(design));
    router.push("/crystal-necklace-builder/checkout");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-arcana-charcoal px-5 py-8 text-arcana-cream">
      <div className="mx-auto max-w-6xl overflow-x-hidden">
        <nav className="mb-8 flex items-center justify-between">
          <Link href="/crystal-necklace-builder" className="text-sm font-semibold text-arcana-gray hover:text-arcana-gold">
            重新选择意图
          </Link>
          <span className="text-sm font-semibold text-arcana-gold">Step 2 / Design</span>
        </nav>

        <section className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="ios-glass min-w-0 overflow-hidden rounded-2xl p-5">
            <p className="mb-2 text-sm font-semibold text-arcana-gold">{intention.title}</p>
            <h1 className="mb-2 text-3xl font-bold leading-tight sm:text-4xl">拖拽手环上的水晶，调整珠子位置</h1>
            <p className="mb-4 text-sm leading-relaxed text-arcana-gray">每一颗珠子都可以直接拖动。放开后，手环会按新的顺序重新排满。</p>
            <BraceletDesignSurface beads={beads} sensors={sensors} onDragEnd={handleDragEnd} />
            <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-bold">添加额外水晶</h2>
                  <p className="mt-1 text-sm text-arcana-gray">点一下添加到手环，预览会立即更新。每颗 +$1.50。</p>
                </div>
                <span className="rounded-full bg-arcana-gold/10 px-3 py-1 text-xs font-semibold text-arcana-gold">+ 水晶</span>
              </div>
              <div className="flex max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-1">
                {stones.map((stone) => (
                  <button
                    key={stone.id}
                    type="button"
                    onMouseEnter={() => setActiveStone(stone)}
                    onFocus={() => setActiveStone(stone)}
                    onClick={() => {
                      setActiveStone(stone);
                      addStone(stone);
                    }}
                    className={`flex w-[128px] shrink-0 items-center gap-2 rounded-2xl p-3 text-left shadow-sm ${
                      activeStone.id === stone.id ? "bg-arcana-gold/10 ring-1 ring-arcana-gold" : "bg-[#F8F6F1]"
                    }`}
                  >
                    <span className="h-8 w-8 shrink-0 rounded-full border shadow-sm" style={{ borderColor: stone.ring, background: beadBackground(stone) }} />
                    <span>
                      <span className="block text-xs font-semibold">{stone.name}</span>
                      <span className="block text-[11px] text-arcana-gray-dark">+ 添加</span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 rounded-2xl bg-[#2A2A2A] p-4 text-white">
                <p className="text-sm font-semibold">{activeStone.name} · {activeStone.english}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/70">{activeStone.note}</p>
              </div>
            </div>
          </div>

          <aside className="min-w-0 space-y-5">
            <section className="ios-glass rounded-2xl p-5">
              <h2 className="mb-4 text-2xl font-bold">珠子数量与价格</h2>
              <div className="mb-5 grid grid-cols-3 gap-2">
                {sizeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSizeChange(option.value)}
                    className={`rounded-2xl px-3 py-3 text-sm font-semibold ${size === option.value ? "bg-arcana-gold text-white" : "bg-white text-arcana-gray"}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {stoneCounts.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                    <span className="text-sm font-semibold">{item.name}</span>
                    <span className="text-sm text-arcana-gray">{item.count} 颗</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm text-arcana-gray">总珠数</p>
                <p className="mt-1 text-2xl font-bold">{beads.length} 颗</p>
                {extraBeadCount > 0 ? <p className="mt-1 text-xs text-arcana-gray-dark">含额外添加 {extraBeadCount} 颗，+${extraBeadPrice.toFixed(2)}</p> : null}
                <div className="mt-4 space-y-2 border-t border-arcana-gold/10 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-arcana-gray">基础手环</span>
                    <span className="font-semibold">${sizeConfig.price.toFixed(2)} x 1</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-arcana-gray">额外水晶</span>
                    <span className="font-semibold">$1.50 x {extraBeadCount}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-sm text-arcana-gray">合计</p>
                  <p className="text-3xl font-bold text-arcana-gold">${totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </section>

            <section className="ios-glass rounded-2xl p-5">
              <h2 className="mb-3 text-2xl font-bold">今日提醒</h2>
              <p className="mb-5 text-sm leading-relaxed text-arcana-gray">{intention.reminder}</p>
              <button type="button" onClick={continueToCheckout} className="inline-flex h-12 w-full items-center justify-center rounded-full bg-arcana-gold px-6 text-sm font-semibold text-white">
                生成订单
              </button>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
