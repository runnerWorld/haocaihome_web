import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DATA_DIR = path.join(process.cwd(), "data", "mbti-daily");
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

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function migrateRecord(filePath, type, date, existingSlugs) {
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
  const existingSlugsByType = new Map();
  const dateDirs = (await readdir(DATA_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && isDateDir(entry.name) && entry.name >= fromDate)
    .map((entry) => entry.name)
    .sort();

  let migrated = 0;

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
      const item = await migrateRecord(path.join(dateDir, file), type, date, existingSlugs);
      indexItems.push(item);
      migrated += 1;
    }

    await writeJson(indexPath, {
      ...indexRecord,
      date,
      items: indexItems,
    });
  }

  console.log(`Migrated ${migrated} MBTI daily records from ${fromDate}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
