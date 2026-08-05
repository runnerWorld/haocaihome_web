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

function getEnglishSlug(type, date) {
  const [year, month, day] = date.split("-").map(Number);
  const monthName = MONTH_NAMES[month - 1] ?? "daily";

  return `${type.toLowerCase()}-daily-fortune-${monthName}-${day}-${year}`;
}

function getChineseSlug(title, type, date) {
  const fallback = `${titleCaseType(type)}-${date}-今日运势`;

  return (title || fallback)
    .toString()
    .toLowerCase()
    .replace(/[|｜:：,，.。!！?？()[\]【】「」『』"'“”‘’]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function migrateRecord(filePath, type, date) {
  const record = await readJson(filePath);
  const content = record.content ?? {};
  const titleZh = content.title_zh || content.h1 || content.seo_title || `${titleCaseType(type)} 今日运势`;
  const titleEn = content.title_en || getEnglishTitle(type, date);
  const slugEn = content.slug_en || getEnglishSlug(type, date);
  const slugZh = content.slug_zh || getChineseSlug(titleZh, type, date);

  record.content = {
    ...content,
    title_zh: titleZh,
    title_en: titleEn,
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
    slug: slugEn,
    slug_zh: slugZh,
    slug_en: slugEn,
    file: path.basename(filePath),
  };
}

async function main() {
  const fromDate = readArg("from", "2026-07-23");
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
      const item = await migrateRecord(path.join(dateDir, file), type, date);
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
