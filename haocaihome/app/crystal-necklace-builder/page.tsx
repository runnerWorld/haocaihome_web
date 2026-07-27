import type { Metadata } from "next";
import CrystalNecklaceBuilder from "./ui";
import { getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "DIY 水晶项链设计器｜按心情与意图搭配你的水晶项链",
  description: "选择你的心情或意图，获得 3 种水晶推荐，线上预览项链排列，拖拽调整珠子顺序，生成分享图，并下单制作属于你的 DIY 水晶项链。",
  alternates: {
    canonical: getAbsoluteUrl("/crystal-necklace-builder"),
  },
  openGraph: {
    title: "DIY Crystal Necklace Builder｜Design by Mood, Intention & Energy",
    description: "Design a crystal necklace by mood, intention and energy. Preview stones, reorder beads, download a share image and start a simple checkout.",
    url: getAbsoluteUrl("/crystal-necklace-builder"),
    siteName: "好彩虹",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "DIY Crystal Necklace Builder",
    description: "Design your crystal necklace by mood and intention.",
  },
};

export default function CrystalNecklaceBuilderPage() {
  return <CrystalNecklaceBuilder />;
}
