import type { Metadata } from "next";
import BraceletDesignClientOnly from "./client-only";
import { getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "设计你的水晶手环｜拖拽调整水晶珠子顺序",
  description: "查看按心情推荐的水晶手环，拖拽调整珠子位置，确认珠子数量、尺寸与价格，然后生成订单。",
  alternates: {
    canonical: getAbsoluteUrl("/crystal-necklace-builder/design"),
  },
};

export default function BraceletDesignPage() {
  return <BraceletDesignClientOnly />;
}
