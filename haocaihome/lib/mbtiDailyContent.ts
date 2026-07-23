import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { DailyFortuneContent, DailyFortunePersona } from "@/lib/dailyFortune";
import { MBTI_TYPES, getMBTIType } from "@/lib/mbtiTypes";

export type MBTIDailyRecord = {
  date: string;
  locale: "zh-CN" | "zh-TW";
  persona: DailyFortunePersona;
  content: DailyFortuneContent;
  generated_at: string;
};

const DATA_DIR = path.join(process.cwd(), "data", "mbti-daily");

export function getMBTIDailyRecord(type: string, date: string) {
  const mbtiType = getMBTIType(type);
  if (!mbtiType) return null;

  const filePath = path.join(DATA_DIR, date, `${mbtiType.code.toLowerCase()}.json`);
  if (!existsSync(filePath)) return null;

  return JSON.parse(readFileSync(filePath, "utf8")) as MBTIDailyRecord;
}

export function getLatestMBTIDailyDate() {
  if (!existsSync(DATA_DIR)) return null;

  const dates = readdirSync(DATA_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(entry.name))
    .map((entry) => entry.name)
    .sort()
    .reverse();

  return dates[0] ?? null;
}

export function getAvailableMBTIDailyParams() {
  if (!existsSync(DATA_DIR)) return [];

  return readdirSync(DATA_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(entry.name))
    .flatMap((entry) => {
      const date = entry.name;
      const dateDir = path.join(DATA_DIR, date);

      return readdirSync(dateDir)
        .filter((file) => file.endsWith(".json") && file !== "index.json")
        .map((file) => ({
          date,
          type: file.replace(/\.json$/, ""),
        }));
    });
}

export function getMBTIDailyIndexItems() {
  const latestDate = getLatestMBTIDailyDate();

  return MBTI_TYPES.map((type) => ({
    ...type,
    latestDate,
    record: latestDate ? getMBTIDailyRecord(type.code, latestDate) : null,
  }));
}
