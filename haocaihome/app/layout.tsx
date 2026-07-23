import type { Metadata } from "next";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "彩虹奥秘 - 一道彩虹提醒，一张塔罗启示，今日一个温柔的行动",
  description: "收到彩虹提醒，打开应用，体验仪式抽牌动画，获取简短解读与行动建议。高级神秘塔罗体验。",
  alternates: {
    canonical: getAbsoluteUrl("/"),
  },
  openGraph: {
    title: "彩虹奥秘 - 一道彩虹提醒，一张塔罗启示，今日一个温柔的行动",
    description: "收到彩虹提醒，打开应用，体验仪式抽牌动画，获取简短解读与行动建议。",
    url: getAbsoluteUrl("/"),
    siteName: "彩虹奥秘",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "彩虹奥秘",
    description: "一道彩虹提醒，一张塔罗启示，今日一个温柔的行动。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className="antialiased"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
