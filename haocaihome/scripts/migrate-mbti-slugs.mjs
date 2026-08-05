import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DATA_DIR = path.join(process.cwd(), "data", "mbti-daily");
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function readArg(name, fallback) {
  const prefix = `--${name}=`;
  const value = process.argv.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : fallback;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function getDeepSeekAPIKey() {
  return process.env.DEEPSEEK_API_KEY ?? "";
}

function stripJsonFence(content) {
  const withoutFence = content.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const start = withoutFence.indexOf("{");
  const end = withoutFence.lastIndexOf("}");
  const jsonLike = start >= 0 && end > start ? withoutFence.slice(start, end + 1) : withoutFence;

  return jsonLike.replace(/[\u0000-\u001F]/g, "");
}

function isDateDir(name) {
  return /^\d{4}-\d{2}-\d{2}$/.test(name);
}

function titleCaseType(type) {
  return type.trim().toUpperCase();
}

function getEnglishTitle(type, date) {
  const [year, month, day] = date.split("-").map(Number);
  const monthName = MONTH_NAMES[month - 1] ?? "daily";
  const displayMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  return `${titleCaseType(type)} Daily Fortune for ${displayMonth} ${day}, ${year}`;
}

function slugifyEnglish(value) {
  return value
    .toString()
    .normalize("NFKD")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function slugifyChinese(value) {
  return value
    .toString()
    .toLowerCase()
    .replace(/[|｜:：,，.。!！?？()[\]【】「」『』"'“”‘’]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getThemeFallback(type) {
  const themeByType = {
    intj: ["set clear priorities", "设定清晰优先级"],
    intp: ["turn ideas into one step", "把想法变成一步行动"],
    entj: ["lead with clear boundaries", "用清晰边界推进"],
    entp: ["focus one useful idea", "收束一个有用想法"],
    infj: ["protect emotional boundaries", "保护情绪边界"],
    infp: ["reply without overthinking", "不要反复删改回复"],
    enfj: ["balance care and self needs", "平衡照顾与自我需求"],
    enfp: ["choose one thing to finish", "选择一件事完成"],
    istj: ["finish one practical task", "完成一个具体任务"],
    isfj: ["care without overextending", "照顾别人但不过度承担"],
    estj: ["listen before deciding", "决定前先听清楚"],
    esfj: ["express needs without pleasing", "表达需求而不讨好"],
    istp: ["act with calm precision", "冷静精准地行动"],
    isfp: ["name the real feeling", "说出真实感受"],
    estp: ["slow down before acting", "行动前先慢一步"],
    esfp: ["turn energy into follow through", "把热情变成持续行动"],
  };

  return themeByType[type.toLowerCase()] ?? ["choose one clear action", "选择一个清晰行动"];
}

function getUniqueSlug(baseSlug, existingSlugs) {
  let slug = baseSlug;
  let suffix = 2;

  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  existingSlugs.add(slug);
  return slug;
}

function getLegacySlugs(content) {
  return Array.from(new Set([...(content.legacy_slugs ?? []), content.slug, content.slug_en, content.slug_zh].filter(Boolean)));
}

function getEnglishFallbackContent(type, content, titleEn, dailyThemeEn) {
  const mbti = titleCaseType(type);
  const theme = dailyThemeEn
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    seo_title: content.title_en || titleEn,
    meta_description: `${mbti} daily horoscope for work, study, love, and relationships. Today's theme: ${theme}.`,
    h1: `${mbti} Daily Horoscope: ${theme}`,
    daily_theme: theme,
    daily_theme_en: dailyThemeEn,
    hook: `${mbti}, today is about ${dailyThemeEn}. Use this reading as a grounded prompt for reflection and action.`,
    quick_summary: {
      keywords: ["clarity", "boundaries", "small action"],
      suitable: `Choose one situation where ${dailyThemeEn} can make your day easier.`,
      avoid: "Overthinking the whole day before taking the first practical step.",
      action: "Write down one clear next action and do it within ten minutes.",
    },
    stuck_moment: "The easiest place to get stuck today is knowing what matters but waiting for the perfect moment to begin.",
    one_sentence_advice: `Let ${dailyThemeEn} guide one concrete choice today.`,
    intro: `${mbti} daily horoscope pages are for self-reflection and practical planning. They do not predict a fixed outcome, but they can help you notice today's emotional rhythm and choose a better next step.`,
    overall: `Overall, ${mbti} benefits from slowing down enough to choose one clear priority. Keep the theme of ${dailyThemeEn} close and let it shape your decisions.`,
    work: "At work, focus on one priority before opening too many new threads. A short written note can make your expectations and next step clearer.",
    study: "For study, choose depth over quantity. Spend focused time on one concept, then summarize it in your own words.",
    love: "In love, avoid guessing what the other person means. A simple sentence such as \"Can I check what you meant by that?\" can reduce unnecessary tension.",
    relationship: "In relationships, give a warm response without taking responsibility for everything. Clear words can be kinder than silent pressure.",
    card_prompt: {
      title: "Today's Mood Card Prompt",
      body: "Open Haocaihong, draw today's mood card, and ask the AI what one next step fits your current state.",
      cards: [
        { name: "The Star", meaning: "Return to hope and a longer view." },
        { name: "Temperance", meaning: "Lower the intensity and take one balanced step." },
        { name: "The Hermit", meaning: "Create quiet space for your own judgment." },
      ],
    },
    app_cta: "If you want a more personal reading, open Haocaihong, draw today's mood card, and continue the conversation with AI.",
    lucky_color: String(content.lucky_color ?? "soft blue"),
    lucky_number: String(content.lucky_number ?? "7"),
    today_advice: `Use ${dailyThemeEn} as your anchor and turn it into one visible action.`,
    topic_keywords: [`${mbti} daily horoscope`, `${mbti} work horoscope`, `${mbti} love horoscope`],
    seo_keywords: [`${mbti} daily horoscope`, `${mbti} horoscope today`, `${mbti} work love study`],
    faq: [
      {
        question: `What is the ${mbti} daily horoscope about today?`,
        answer: `It focuses on ${dailyThemeEn} and turns that theme into practical advice for work, study, love, and relationships.`,
      },
      {
        question: `Is this ${mbti} horoscope a prediction?`,
        answer: "No. It is a reflective guide for noticing patterns and choosing practical actions, not a fixed prediction.",
      },
      {
        question: `What should ${mbti} focus on at work today?`,
        answer: "Choose one priority, clarify the next step, and avoid carrying responsibilities that are not yours.",
      },
      {
        question: `How can ${mbti} handle love today?`,
        answer: "Ask clear questions instead of guessing. Simple and honest wording helps reduce overthinking.",
      },
      {
        question: `How should ${mbti} use this daily horoscope?`,
        answer: "Use it as a short reflection prompt, then turn the theme into one action you can complete today.",
      },
    ],
  };
}

function buildEnglishPrompt(type, date, content) {
  const mbti = titleCaseType(type);

  return `
Translate and adapt this existing Chinese MBTI daily horoscope into publish-ready English SEO content.

Date: ${date}
MBTI: ${mbti}
Canonical slug: ${content.slug_en || content.slug}
Daily theme in Chinese: ${content.daily_theme}
Daily theme in English: ${content.daily_theme_en}

Chinese source JSON:
${JSON.stringify(content)}

Return valid JSON only. No markdown.

JSON fields must be exactly:
{
  "seo_title": "",
  "meta_description": "",
  "h1": "",
  "daily_theme": "",
  "daily_theme_en": "",
  "hook": "",
  "quick_summary": {
    "keywords": [],
    "suitable": "",
    "avoid": "",
    "action": ""
  },
  "stuck_moment": "",
  "one_sentence_advice": "",
  "intro": "",
  "overall": "",
  "work": "",
  "study": "",
  "love": "",
  "relationship": "",
  "card_prompt": {
    "title": "",
    "body": "",
    "cards": [
      {"name": "", "meaning": ""}
    ]
  },
  "app_cta": "",
  "lucky_color": "",
  "lucky_number": "",
  "today_advice": "",
  "topic_keywords": [],
  "seo_keywords": [],
  "faq": [
    {"question": "", "answer": ""}
  ]
}

Requirements:
1. Write natural English for English-speaking readers; do not translate word-for-word when it sounds unnatural.
2. Keep the same meaning, daily theme, tarot card prompt, and practical advice as the Chinese content.
3. Naturally include ${mbti}, daily horoscope, work, study, love, relationships, and the daily theme.
4. Do not claim certainty, do not create fear, and do not provide medical, legal, or financial guarantees.
5. FAQ must contain at least 5 search-style questions.
6. Every analysis section must include a realistic situation and one practical action.
`.trim();
}

async function translateEnglishContent(apiKey, type, date, content) {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL ?? "deepseek-v4-flash",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are an SEO content strategist and MBTI daily horoscope writer. You must return valid JSON only, with grounded and publishable English copy.",
        },
        {
          role: "user",
          content: buildEnglishPrompt(type, date, content),
        },
      ],
      stream: false,
      temperature: 0.74,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message ?? `DeepSeek API failed with ${response.status}`);
  }

  return JSON.parse(stripJsonFence(result.choices?.[0]?.message?.content ?? ""));
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function migrateRecord(filePath, type, date, existingSlugs, options) {
  const record = await readJson(filePath);
  const content = record.content ?? {};
  const [fallbackThemeEn, fallbackThemeZh] = getThemeFallback(type);
  const titleZh = content.title_zh || content.h1 || content.seo_title || `${titleCaseType(type)} 今日运势`;
  const titleEn = content.title_en || getEnglishTitle(type, date);
  const dailyTheme = content.daily_theme || fallbackThemeZh;
  const dailyThemeEn = content.daily_theme_en || fallbackThemeEn;
  const themeEn = slugifyEnglish(dailyThemeEn || titleEn);
  const themeZh = slugifyChinese(dailyTheme || titleZh);
  const slugEn = getUniqueSlug(`${type.toLowerCase()}-daily-horoscope-${themeEn || "today-theme"}`, existingSlugs);
  const slugZh = `${type.toLowerCase()}-今日运势-${themeZh || "今日主题"}`;

  record.content = {
    ...content,
    title_zh: titleZh,
    title_en: titleEn,
    daily_theme: dailyTheme,
    daily_theme_en: dailyThemeEn,
    legacy_slugs: getLegacySlugs(content),
    slug: slugEn,
    slug_zh: slugZh,
    slug_en: slugEn,
  };

  if (options.translateEn && (!record.content_en || options.forceEn)) {
    record.content_en = await translateEnglishContent(options.apiKey, type, date, record.content);
  } else {
    record.content_en = record.content_en || getEnglishFallbackContent(type, record.content, titleEn, dailyThemeEn);
  }

  await writeJson(filePath, record);

  return {
    type: titleCaseType(type),
    title: record.content.seo_title,
    title_zh: titleZh,
    title_en: titleEn,
    daily_theme: dailyTheme,
    daily_theme_en: dailyThemeEn,
    slug: slugEn,
    slug_zh: slugZh,
    slug_en: slugEn,
    file: path.basename(filePath),
  };
}

async function main() {
  const fromDate = readArg("from", "2026-07-23");
  const translateEn = hasFlag("translate-en");
  const forceEn = hasFlag("force-en");
  const apiKey = getDeepSeekAPIKey();

  if (translateEn && !apiKey) {
    throw new Error("Missing DEEPSEEK_API_KEY. Set it before running --translate-en.");
  }

  const existingSlugsByType = new Map();
  const dateDirs = (await readdir(DATA_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && isDateDir(entry.name) && entry.name >= fromDate)
    .map((entry) => entry.name)
    .sort();

  let migrated = 0;
  let translated = 0;

  for (const date of dateDirs) {
    const dateDir = path.join(DATA_DIR, date);
    const files = (await readdir(dateDir)).filter((file) => file.endsWith(".json") && file !== "index.json").sort();
    const indexPath = path.join(dateDir, "index.json");
    let indexRecord = null;
    const indexItems = [];

    try {
      indexRecord = await readJson(indexPath);
    } catch {
      indexRecord = { date, items: [] };
    }

    for (const file of files) {
      const type = file.replace(/\.json$/, "");
      const existingSlugs = existingSlugsByType.get(type) ?? new Set();
      existingSlugsByType.set(type, existingSlugs);
      const filePath = path.join(dateDir, file);
      const before = await readJson(filePath);
      const hadEnglish = Boolean(before.content_en);
      const item = await migrateRecord(filePath, type, date, existingSlugs, {
        apiKey,
        forceEn,
        translateEn,
      });
      indexItems.push(item);
      migrated += 1;
      if (translateEn && (!hadEnglish || forceEn)) translated += 1;
    }

    await writeJson(indexPath, {
      ...indexRecord,
      date,
      items: indexItems,
    });
  }

  console.log(`Migrated ${migrated} MBTI daily records from ${fromDate}.`);
  if (translateEn) {
    console.log(`Translated ${translated} MBTI daily records into English.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
