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
  title_zh?: string;
  title_en?: string;
  slug_zh?: string;
  slug_en?: string;
  legacy_slugs?: string[];
  h1: string;
  daily_theme?: string;
  daily_theme_en?: string;
  hook?: string;
  quick_summary?: {
    keywords: string[];
    suitable: string;
    avoid: string;
    action: string;
  };
  stuck_moment?: string;
  one_sentence_advice?: string;
  intro: string;
  overall: string;
  work: string;
  study: string;
  love: string;
  relationship: string;
  card_prompt?: {
    title: string;
    body: string;
    cards: Array<{
      name: string;
      meaning: string;
    }>;
  };
  app_cta?: string;
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
  "title_zh": "",
  "title_en": "",
  "slug_zh": "",
  "slug_en": "",
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

内容要求：
1. 适合直接发布到网站或 App 内容页，面向搜索“${persona.mbti ?? "MBTI"} 今日运势”的用户。
2. 不要写明日运势，不要预测具体灾祸，不要声称百分百准确。
3. 不要给医疗、法律、投资保证。
4. 自然包含人格词、今日运势、工作运、学习运、爱情运、人际关系等关键词，不要强行加入城市或地区词。
5. daily_theme 必须是当天主题，不要泛泛写“整理思路”。示例：先行动五分钟、少解释多确认、先收一个尾、把沉默变成一句回应。
6. hook 要像真人开场，写出用户今天可能遇到的具体心理或生活场景，不要以“今天适合”开头。
7. quick_summary.keywords 给 3 个短词；suitable、avoid、action 都要具体，action 必须是一个立刻能做的小动作。
8. stuck_moment 写“今天最容易卡住的瞬间”，必须有画面感，例如打开资料 40 分钟却没开始、想回复消息却反复删改。
9. work、study、love、relationship 每段都要包含一个真实场景和一个动作。爱情或人际段落至少给一句可复制的话术。
10. card_prompt 连接好彩虹 App 的心情卡体验，给 3 张可能抽到的塔罗牌及其含义。
11. app_cta 不能硬广，要自然引导用户打开好彩虹，抽今日心情卡并继续问 AI 下一步。
12. FAQ 至少 5 条，问题要像搜索问题，例如“${persona.mbti ?? "MBTI"} 今天适合主动联系别人吗？”。
13. title_zh 写中文 SEO 标题，title_en 写自然英文标题。daily_theme_en 必须把 daily_theme 翻译成自然英文动作主题，使用 3 到 6 个英文词，例如 set clear boundaries、reply without overthinking、finish one small task。slug、slug_en、slug_zh 可以留空，最终 URL 会由脚本根据主题统一生成。
14. 避免同一 MBTI 每天重复同一套说法；不要只反复讲人格标签，要写“今天有什么不同”。
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
      response_format: { type: "json_object" },
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
  const normalized = normalizeJsonContent(content);

  const parsed = JSON.parse(normalized) as DailyFortuneContent;

  validateDailyFortuneContent(parsed);
  return parsed;
}

function normalizeJsonContent(content: string) {
  const withoutFence = content
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
  const start = withoutFence.indexOf("{");
  const end = withoutFence.lastIndexOf("}");
  const jsonLike = start >= 0 && end > start ? withoutFence.slice(start, end + 1) : withoutFence;

  return jsonLike.replace(/[\u0000-\u001F]/g, "");
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
