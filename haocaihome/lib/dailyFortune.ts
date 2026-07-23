export type DailyFortunePersona = {
  name: string;
  audience?: string;
  tone?: string;
  zodiac?: string;
  mbti?: string;
  mood?: string;
  questionFocus?: string;
};

export type DailyFortuneRequest = {
  date?: string;
  locale?: "zh-CN" | "zh-TW";
  persona: DailyFortunePersona;
};

export type DailyFortuneContent = {
  seo_title: string;
  meta_description: string;
  slug: string;
  h1: string;
  intro: string;
  overall: string;
  work: string;
  study: string;
  love: string;
  relationship: string;
  lucky_color: string;
  lucky_number: string;
  today_advice: string;
  topic_keywords?: string[];
  geo_keywords?: string[];
  seo_keywords: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

type DeepSeekChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DEFAULT_MODEL = "deepseek-v4-flash";

export function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function buildDailyFortunePrompt(request: DailyFortuneRequest) {
  const date = request.date ?? getTodayISO();
  const locale = request.locale ?? "zh-CN";
  const persona = request.persona;

  return `
请根据以下人格设定，生成一篇每日运势 SEO 内容。

输出语言：${locale === "zh-TW" ? "繁体中文" : "简体中文"}
日期：${date}
星座/类型：${persona.zodiac ?? "未指定"}
MBTI：${persona.mbti ?? "未指定"}
今日心情：${persona.mood ?? "未指定"}
人格名称：${persona.name}
受众：${persona.audience ?? "关注感情、工作、学习与自我成长的用户"}
语气：${persona.tone ?? "温柔、具体、有陪伴感，但不要迷信恐吓"}
分析重点：${persona.questionFocus ?? "工作、学习、爱情、人际相处中的状态分析"}

请只输出合法 JSON，不要 markdown，不要代码块。

JSON 字段必须完全如下：
{
  "seo_title": "",
  "meta_description": "",
  "slug": "",
  "h1": "",
  "intro": "",
  "overall": "",
  "work": "",
  "study": "",
  "love": "",
  "relationship": "",
  "lucky_color": "",
  "lucky_number": "",
  "today_advice": "",
  "topic_keywords": [],
  "seo_keywords": [],
  "faq": [
    {"question": "", "answer": ""}
  ]
}

内容要求：
1. 适合直接发布到网站或 App 内容页。
2. 不要声称百分百准确，不要制造恐惧。
3. 不要给医疗、法律、投资保证。
4. 自然包含人格词、今日运势、工作运、学习运、爱情运、人际关系等关键词，不要强行加入城市或地区词。
5. FAQ 至少 3 条。
6. slug 使用小写英文、数字和连字符。
7. 每个分析段落给出可执行建议，不要空泛。
`.trim();
}

export async function generateDailyFortune(request: DailyFortuneRequest): Promise<DailyFortuneContent> {
  const apiKey = getDeepSeekAPIKey();

  if (!apiKey) {
    throw new Error("Missing DEEPSEEK_API_KEY");
  }

  if (!request.persona?.name) {
    throw new Error("persona.name is required");
  }

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL ?? DEFAULT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "你是专业 SEO 内容策略师与心理型运势内容作者，擅长生成结构化中文内容。你必须只输出合法 JSON。",
        },
        {
          role: "user",
          content: buildDailyFortunePrompt(request),
        },
      ],
      stream: false,
      temperature: 0.8,
    }),
  });

  const payload = (await response.json()) as DeepSeekChatResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message ?? `DeepSeek API failed with ${response.status}`);
  }

  const content = payload.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("DeepSeek API returned empty content");
  }

  return parseDailyFortuneContent(content);
}

export function getDeepSeekAPIKey() {
  return process.env.DEEPSEEK_API_KEY ?? "";
}

export function parseDailyFortuneContent(content: string): DailyFortuneContent {
  const normalized = content
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  const parsed = JSON.parse(normalized) as DailyFortuneContent;

  validateDailyFortuneContent(parsed);
  return parsed;
}

function validateDailyFortuneContent(content: DailyFortuneContent) {
  const requiredStringFields: Array<keyof DailyFortuneContent> = [
    "seo_title",
    "meta_description",
    "slug",
    "h1",
    "intro",
    "overall",
    "work",
    "study",
    "love",
    "relationship",
    "lucky_color",
    "lucky_number",
    "today_advice",
  ];

  for (const field of requiredStringFields) {
    if (typeof content[field] !== "string" || !content[field]) {
      throw new Error(`Invalid daily fortune content: ${field} is required`);
    }
  }

  if (!Array.isArray(content.seo_keywords)) {
    throw new Error("Invalid daily fortune content: keyword fields must be arrays");
  }

  if (content.topic_keywords !== undefined && !Array.isArray(content.topic_keywords)) {
    throw new Error("Invalid daily fortune content: topic_keywords must be an array");
  }

  if (content.geo_keywords !== undefined && !Array.isArray(content.geo_keywords)) {
    throw new Error("Invalid daily fortune content: geo_keywords must be an array");
  }

  if (!Array.isArray(content.faq) || content.faq.length < 3) {
    throw new Error("Invalid daily fortune content: faq must contain at least 3 items");
  }
}
