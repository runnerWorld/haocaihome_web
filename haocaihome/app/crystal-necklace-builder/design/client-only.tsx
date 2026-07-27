"use client";

import dynamic from "next/dynamic";

const BraceletDesign = dynamic(() => import("./ui"), {
  ssr: false,
  loading: () => <main className="min-h-screen bg-arcana-charcoal px-5 py-8 text-arcana-cream">正在加载手环设计器...</main>,
});

export default function BraceletDesignClientOnly() {
  return <BraceletDesign />;
}
