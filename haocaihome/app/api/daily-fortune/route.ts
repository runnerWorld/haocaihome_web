import { NextRequest, NextResponse } from "next/server";
import { generateDailyFortune, getTodayISO, type DailyFortuneRequest } from "@/lib/dailyFortune";

export const runtime = "nodejs";

const defaultPersona = {
  name: "好彩虹温柔理性型",
  audience: "关注感情、工作、学习与自我成长的年轻用户",
  tone: "温柔、具体、有陪伴感，但不要迷信恐吓",
  questionFocus: "工作、学习、爱情、人际相处中的状态分析",
};

export async function GET(request: NextRequest) {
  const authError = validateSecret(request);
  if (authError) return authError;

  const { searchParams } = request.nextUrl;
  const payload: DailyFortuneRequest = {
    date: searchParams.get("date") ?? getTodayISO(),
    locale: searchParams.get("locale") === "zh-TW" ? "zh-TW" : "zh-CN",
    persona: {
      ...defaultPersona,
      name: searchParams.get("persona") ?? defaultPersona.name,
      zodiac: searchParams.get("zodiac") ?? undefined,
      mbti: searchParams.get("mbti") ?? undefined,
      mood: searchParams.get("mood") ?? undefined,
    },
  };

  return createFortuneResponse(payload);
}

export async function POST(request: NextRequest) {
  const authError = validateSecret(request);
  if (authError) return authError;

  const payload = (await request.json()) as DailyFortuneRequest;
  return createFortuneResponse(payload);
}

async function createFortuneResponse(payload: DailyFortuneRequest) {
  try {
    const content = await generateDailyFortune(payload);

    return NextResponse.json({
      date: payload.date ?? getTodayISO(),
      persona: payload.persona,
      content,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate daily fortune",
      },
      { status: 500 },
    );
  }
}

function validateSecret(request: NextRequest) {
  const secret = process.env.DAILY_CONTENT_SECRET;

  if (!secret) {
    return null;
  }

  const providedSecret = request.headers.get("x-daily-content-secret") ?? request.nextUrl.searchParams.get("secret");

  if (providedSecret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
