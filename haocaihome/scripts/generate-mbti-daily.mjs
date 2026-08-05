import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

const MBTI_TYPES = [
  ["INTJ", "建筑师", "冷静、清晰、克制、有策略感", "目标推进、职业选择、深度学习与亲密关系中的表达"],
  ["INTP", "逻辑学家", "理性、轻松、启发式、不催促", "思维整理、学习效率、工作边界与关系中的回应"],
  ["ENTJ", "指挥官", "直接、有力量、务实、避免空泛鼓励", "领导力、执行节奏、学习规划与亲密关系中的柔软度"],
  ["ENTP", "辩论家", "机智、具体、开放、有行动提醒", "创意落地、注意力管理、学习探索与相处中的稳定感"],
  ["INFJ", "提倡者", "温柔、清澈、有边界感、不神秘恐吓", "情绪边界、长期愿景、学习内化与亲密沟通"],
  ["INFP", "调停者", "温柔、陪伴式、具体、允许慢下来", "情绪安放、创作学习、工作自信与爱情表达"],
  ["ENFJ", "主人公", "温暖、明亮、坚定、强调自我照顾", "关系平衡、团队协作、学习输出与爱情中的真实需求"],
  ["ENFP", "竞选者", "轻盈、热情、具体、有收束感", "灵感执行、学习节奏、工作选择与关系中的承诺感"],
  ["ISTJ", "物流师", "稳重、明确、务实、不过度渲染情绪", "任务管理、工作稳定、学习复盘与关系中的弹性"],
  ["ISFJ", "守卫者", "温柔、安定、细致、强调边界", "自我照顾、工作负担、学习积累与亲密关系中的需求表达"],
  ["ESTJ", "总经理", "清楚、坚定、实用、带复盘意识", "执行效率、团队沟通、学习计划与关系中的倾听"],
  ["ESFJ", "执政官", "亲切、具体、稳定、避免讨好倾向", "关系经营、工作协作、学习坚持与爱情中的安全感"],
  ["ISTP", "鉴赏家", "简洁、冷静、行动导向、不啰嗦", "现场判断、技能学习、工作效率与关系中的回应度"],
  ["ISFP", "探险家", "柔和、感性、具体、不压迫", "感受表达、创作学习、工作节奏与爱情中的真实感"],
  ["ESTP", "企业家", "直接、爽快、具体、有风险提醒", "机会判断、执行节奏、实战学习与关系中的耐心"],
  ["ESFP", "表演者", "明快、温暖、具体、带一点收束", "情绪能量、工作表现、学习坚持与爱情互动"],
];

const today = new Date().toISOString().slice(0, 10);
const DATA_DIR = path.join(process.cwd(), "data", "mbti-daily");

function readArg(name, fallback) {
  const prefix = `--${name}=`;
  const value = process.argv.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : fallback;
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

async function readJsonIfExists(filePath) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch {
    return null;
  }
}

async function getExistingCanonicalSlugs(type, currentDate) {
  const slugs = new Set();

  try {
    const entries = await readdir(DATA_DIR, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name === currentDate || !/^\d{4}-\d{2}-\d{2}$/.test(entry.name)) continue;

      const record = await readJsonIfExists(path.join(DATA_DIR, entry.name, `${type.toLowerCase()}.json`));
      const content = record?.content ?? {};

      for (const slug of [content.slug_en, content.slug]) {
        if (slug) slugs.add(slug);
      }
    }
  } catch {
    return slugs;
  }

  return slugs;
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

function buildContentSlugs(type, content, existingSlugs) {
  const themeEn = slugifyEnglish(content.daily_theme_en || content.daily_theme || content.title_en || content.seo_title);
  const themeZh = slugifyChinese(content.daily_theme || content.title_zh || content.h1 || content.seo_title);
  const slugEn = getUniqueSlug(`${type.toLowerCase()}-daily-horoscope-${themeEn || "today-theme"}`, existingSlugs);
  const slugZh = `${type.toLowerCase()}-今日运势-${themeZh || "今日主题"}`;

  return {
    ...content,
    slug: slugEn,
    slug_en: slugEn,
    slug_zh: slugZh,
  };
}

function buildPrompt(payload) {
  const persona = payload.persona;

  return `
请根据以下 MBTI 人格设定，生成一篇每日运势 SEO 页面内容。

输出语言：${payload.locale === "zh-TW" ? "繁体中文" : "简体中文"}
日期：${payload.date}
MBTI：${persona.mbti}
人格名称：${persona.name}
今日心情：${persona.mood}
受众：${persona.audience}
语气：${persona.tone}
分析重点：${persona.questionFocus}

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
1. 这是网站 SEO 页面，不是聊天回复。
2. 标题自然包含 ${persona.mbti}、今日运势、${payload.date}，但不要写明日运势。
3. daily_theme 必须写当天不同主题，不要泛泛写“整理思路”。示例：先行动五分钟、少解释多确认、先收一个尾、把沉默变成一句回应。
4. hook 要像真人开场，写出用户今天可能遇到的具体心理或生活场景，不要以“今天适合”开头。
5. quick_summary.keywords 给 3 个短词；suitable、avoid、action 都要具体，action 必须是一个立刻能做的小动作。
6. stuck_moment 写“今天最容易卡住的瞬间”，必须有画面感，例如打开资料 40 分钟却没开始、想回复消息却反复删改。
7. 分析工作、学习、爱情、人际相处，每段都要包含一个真实场景和一个动作。爱情或人际段落至少给一句可复制的话术。
8. card_prompt 连接好彩虹 App 的心情卡体验，给 3 张可能抽到的塔罗牌及其含义。
9. app_cta 不能硬广，要自然引导用户打开好彩虹，抽今日心情卡并继续问 AI 下一步。
10. 不要声称百分百准确，不要制造恐惧。
11. 不要给医疗、法律、投资保证。
12. FAQ 至少 5 条，问题要像搜索问题，例如“${persona.mbti} 今天适合主动联系别人吗？”。
13. title_zh 写中文 SEO 标题，title_en 写自然英文标题。daily_theme_en 必须把 daily_theme 翻译成自然英文动作主题，使用 3 到 6 个英文词，例如 set clear boundaries、reply without overthinking、finish one small task。slug、slug_en、slug_zh 可以留空，最终 URL 会由脚本根据主题统一生成。
14. 避免 16 型人格内容模板化，每个类型要体现自身特点，也要体现今天有什么不同。
15. 不要强行加入城市或地区词。
`.trim();
}

function buildEnglishPrompt(payload, content) {
  const persona = payload.persona;

  return `
Translate and adapt the following MBTI daily horoscope content into publish-ready English SEO copy.

Date: ${payload.date}
MBTI: ${persona.mbti}
Personality name: ${persona.name}
Tone: calm, specific, grounded, never fear-based.

Use the same daily theme and practical advice as the Chinese version, but write naturally for English readers.

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
1. Keep it as a website SEO page, not a chat reply.
2. Naturally include ${persona.mbti}, daily horoscope, work, study, love, relationships, and today's theme.
3. Do not claim certainty, do not create fear, and do not provide medical, legal, or financial guarantees.
4. FAQ must contain at least 5 search-style questions.
5. Each analysis section must include a realistic situation and one practical action.
`.trim();
}

async function generateOne(apiKey, payload) {
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
            "你是专业 SEO 内容策略师与 MBTI 运势内容作者。你必须输出合法 JSON，内容要具体、克制、可发布。",
        },
        {
          role: "user",
          content: buildPrompt(payload),
        },
      ],
      stream: false,
      temperature: 0.82,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message ?? `DeepSeek API failed with ${response.status}`);
  }

  return JSON.parse(stripJsonFence(result.choices?.[0]?.message?.content ?? ""));
}

async function generateEnglish(apiKey, payload, content) {
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
          content: buildEnglishPrompt(payload, content),
        },
      ],
      stream: false,
      temperature: 0.76,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message ?? `DeepSeek API failed with ${response.status}`);
  }

  return JSON.parse(stripJsonFence(result.choices?.[0]?.message?.content ?? ""));
}

async function main() {
  const apiKey = getDeepSeekAPIKey();
  if (!apiKey) {
    throw new Error("Missing DEEPSEEK_API_KEY");
  }

  const date = readArg("date", today);
  const locale = readArg("locale", "zh-CN");
  const mood = readArg("mood", "平静");
  const only = readArg("only", "")
    .split(",")
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean);
  const selectedTypes = only.length > 0 ? MBTI_TYPES.filter(([code]) => only.includes(code)) : MBTI_TYPES;

  if (selectedTypes.length === 0) {
    throw new Error("No MBTI types selected");
  }

  const outputDir = path.join(process.cwd(), "data", "mbti-daily", date);
  await mkdir(outputDir, { recursive: true });

  const index = [];

  for (const [code, name, tone, focus] of selectedTypes) {
    const payload = {
      date,
      locale,
      persona: {
        name: `${code} ${name}型`,
        audience: `关注 ${code} 人格、感情、工作、学习与自我成长的用户`,
        tone,
        mbti: code,
        mood,
        questionFocus: focus,
      },
    };

    const existingSlugs = await getExistingCanonicalSlugs(code, date);
    const content = buildContentSlugs(code, await generateOne(apiKey, payload), existingSlugs);
    const contentEn = await generateEnglish(apiKey, payload, content);
    const record = {
      ...payload,
      content,
      content_en: contentEn,
      generated_at: new Date().toISOString(),
    };
    const outputFile = path.join(outputDir, `${code.toLowerCase()}.json`);

    await writeFile(outputFile, `${JSON.stringify(record, null, 2)}\n`, "utf8");
    index.push({
      type: code,
      name,
      title: content.seo_title,
      title_zh: content.title_zh,
      title_en: content.title_en,
      daily_theme: content.daily_theme,
      daily_theme_en: content.daily_theme_en,
      slug: content.slug,
      slug_zh: content.slug_zh,
      slug_en: content.slug_en,
      file: `${code.toLowerCase()}.json`,
    });

    console.log(outputFile);
  }

  await writeFile(
    path.join(outputDir, "index.json"),
    `${JSON.stringify({ date, locale, mood, items: index }, null, 2)}\n`,
    "utf8",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
