import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { DailyFortuneContent, DailyFortuneEnglishContent, DailyFortunePersona } from "@/lib/dailyFortune";
import { MBTI_TYPES, getMBTIType } from "@/lib/mbtiTypes";

export type MBTIDailyRecord = {
  date: string;
  locale: "zh-CN" | "zh-TW";
  persona: DailyFortunePersona;
  content: DailyFortuneContent;
  content_en?: DailyFortuneEnglishContent;
  generated_at: string;
};

const DATA_DIR = path.join(process.cwd(), "data", "mbti-daily");

function normalizeSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function readMBTIDailyRecord(type: string, date: string) {
  const mbtiType = getMBTIType(type);
  if (!mbtiType) return null;

  const filePath = path.join(DATA_DIR, date, `${mbtiType.code.toLowerCase()}.json`);
  if (!existsSync(filePath)) return null;

  return JSON.parse(readFileSync(filePath, "utf8")) as MBTIDailyRecord;
}

export function getMBTIDailyRecord(type: string, dateOrSlug: string) {
  const segment = normalizeSegment(dateOrSlug);

  if (/^\d{4}-\d{2}-\d{2}$/.test(segment)) {
    return readMBTIDailyRecord(type, segment);
  }

  const mbtiType = getMBTIType(type);
  if (!mbtiType) return null;

  for (const date of getMBTIDailyDates()) {
    const record = readMBTIDailyRecord(mbtiType.code, date);

    if (record && getMBTIDailyAliases(record).includes(segment)) {
      return record;
    }
  }

  return null;
}

export function getMBTIDailyRecordByDate(type: string, date: string) {
  return readMBTIDailyRecord(type, date);
}

export function getMBTIDailyCanonicalSlug(record: MBTIDailyRecord) {
  return record.content.slug_en || record.content.slug || record.date;
}

export function getMBTIDailyAliases(record: MBTIDailyRecord) {
  return Array.from(new Set([record.date, record.content.slug_en, record.content.slug_zh, record.content.slug, ...(record.content.legacy_slugs ?? [])].filter(Boolean)));
}

export function getMBTIDailyUrl(type: string, record: MBTIDailyRecord) {
  const segment = getMBTIDailyCanonicalSlug(record);

  return `/mbti/${type.toLowerCase()}/daily/${segment}`;
}

export function getEnglishMBTIDailyUrl(type: string, record: MBTIDailyRecord) {
  const segment = getMBTIDailyCanonicalSlug(record);

  return `/en/mbti/${type.toLowerCase()}/daily/${segment}`;
}

export function getLatestMBTIDailyDate() {
  if (!existsSync(DATA_DIR)) return null;

  const dates = getMBTIDailyDates();

  return dates[0] ?? null;
}

export function getMBTIDailyDates() {
  if (!existsSync(DATA_DIR)) return [];

  return readdirSync(DATA_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(entry.name))
    .map((entry) => entry.name)
    .sort()
    .reverse();
}

export function getMBTIDailyAdjacentDates(type: string, date: string) {
  const mbtiType = getMBTIType(type);
  if (!mbtiType) return { previousDate: null, nextDate: null };

  const dates = getMBTIDailyDates()
    .filter((item) => existsSync(path.join(DATA_DIR, item, `${mbtiType.code.toLowerCase()}.json`)))
    .sort();
  const index = dates.indexOf(date);

  if (index < 0) return { previousDate: null, nextDate: null };

  return {
    previousDate: dates[index - 1] ?? null,
    nextDate: dates[index + 1] ?? null,
  };
}

export function getAvailableMBTIDailyParams() {
  return getAvailableMBTIDailyPages().map(({ type, segment }) => ({
    date: segment,
    type,
  }));
}

export function getAvailableMBTIDailyPages() {
  if (!existsSync(DATA_DIR)) return [];

  return readdirSync(DATA_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(entry.name))
    .flatMap((entry) => {
      const date = entry.name;
      const dateDir = path.join(DATA_DIR, date);

      return readdirSync(dateDir)
        .filter((file) => file.endsWith(".json") && file !== "index.json")
        .map((file) => {
          const type = file.replace(/\.json$/, "");
          const record = readMBTIDailyRecord(type, date);

          return {
            date,
            segment: record ? getMBTIDailyCanonicalSlug(record) : date,
            type,
          };
        });
    });
}

export function getMBTIDailyIndexItems() {
  const latestDate = getLatestMBTIDailyDate();

  return MBTI_TYPES.map((type) => ({
    ...type,
    latestDate,
    record: latestDate ? getMBTIDailyRecordByDate(type.code, latestDate) : null,
  }));
}
