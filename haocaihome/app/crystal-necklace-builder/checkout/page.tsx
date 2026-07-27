import type { Metadata } from "next";
import BraceletCheckout from "./ui";
import { getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "水晶手环订单 Checkout｜填写制作与联系信息",
  description: "确认你的水晶手环设计，填写姓名、Email、地址与备注，生成待处理订单。",
  alternates: {
    canonical: getAbsoluteUrl("/crystal-necklace-builder/checkout"),
  },
};

export default function BraceletCheckoutPage() {
  return <BraceletCheckout />;
}
