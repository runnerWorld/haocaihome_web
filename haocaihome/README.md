This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## DeepSeek 每日 SEO 内容生成

项目已提供两种自动调用方式：

- `GET/POST /api/daily-fortune`：给后台、App 或定时请求使用，直接返回结构化 JSON。
- `npm run generate:daily-fortune`：给 VPS cron 使用，会把每日内容写入 `data/daily-fortunes/`。
- `npm run generate:mbti-daily`：批量生成 16 种 MBTI 每日内容，并驱动 `/mbti` SEO 页面。

### 环境变量

优先推荐在 VPS 配置：

```bash
export DEEPSEEK_API_KEY="你的 DeepSeek key"
export DEEPSEEK_MODEL="deepseek-v4-flash"
export DAILY_CONTENT_SECRET="自定义接口密钥"
export NEXT_PUBLIC_SITE_URL="https://你的域名"
```

变量名以 `.env.example` 为准，VPS 上直接配置对应环境变量即可。

### 本地或 VPS 手动生成

```bash
npm run generate:daily-fortune -- --date=2026-07-22 --persona=INFP温柔型 --mbti=INFP --mood=焦虑
```

生成结果会保存到：

```bash
data/daily-fortunes/
```

### 生成 16 种 MBTI 页面数据

本地测试单个类型：

```bash
npm run generate:mbti-daily -- --date=2026-07-22 --mood=平静 --only=INFJ
```

正式生成全部 16 类：

```bash
npm run generate:mbti-daily -- --date=2026-07-22 --mood=平静
```

生成结果会保存到：

```bash
data/mbti-daily/2026-07-22/
```

生成后会自动出现页面：

```bash
/mbti
/mbti/infj/daily/2026-07-22
```

### VPS cron 每天自动生成

执行 `crontab -e`，加入：

```bash
0 8 * * * cd /path/to/haocaihome && set -a && . ./.env && set +a && /usr/bin/npm run generate:daily-fortune >> /var/log/haocaihome-daily-fortune.log 2>&1
```

如果要每天生成 16 种 MBTI 页面数据：

```bash
5 8 * * * cd /path/to/haocaihome && set -a && . ./.env && set +a && /usr/bin/npm run generate:mbti-daily >> /var/log/haocaihome-mbti-daily.log 2>&1
```

`generate:mbti-daily` 不传 `--date` 时会使用 VPS 当天日期。生成后的 JSON 会被 `/mbti` 和 `/mbti/[type]/daily/[date]` 页面读取，`/sitemap.xml` 会自动包含这些已生成页面。

### API 调用

```bash
curl "https://你的域名/api/daily-fortune?secret=你的DAILY_CONTENT_SECRET&mbti=INFP&mood=焦虑"
```

POST 示例：

```bash
curl -X POST "https://你的域名/api/daily-fortune" \
  -H "Content-Type: application/json" \
  -H "x-daily-content-secret: 你的DAILY_CONTENT_SECRET" \
  -d '{
    "date": "2026-07-22",
    "locale": "zh-CN",
    "persona": {
      "name": "INFP温柔型",
      "mbti": "INFP",
      "mood": "焦虑",
      "questionFocus": "工作、学习、爱情、人际相处分析"
    }
  }'
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
