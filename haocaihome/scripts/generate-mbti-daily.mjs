import { mkdir, writeFile } from "node:fs/promises";
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
1. 这是网站 SEO 页面，不是聊天回复。
2. 标题自然包含 ${persona.mbti}、今日运势、${payload.date}。
3. 分析工作、学习、爱情、人际相处，每段都有可执行建议。
4. 不要声称百分百准确，不要制造恐惧。
5. 不要给医疗、法律、投资保证。
6. FAQ 至少 3 条。
7. slug 使用小写英文、数字和连字符。
8. 避免 16 型人格内容模板化，每个类型要体现自身特点。
9. 不要强行加入城市或地区词。
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

    const content = await generateOne(apiKey, payload);
    const record = {
      ...payload,
      content,
      generated_at: new Date().toISOString(),
    };
    const outputFile = path.join(outputDir, `${code.toLowerCase()}.json`);

    await writeFile(outputFile, `${JSON.stringify(record, null, 2)}\n`, "utf8");
    index.push({
      type: code,
      name,
      title: content.seo_title,
      slug: content.slug,
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
