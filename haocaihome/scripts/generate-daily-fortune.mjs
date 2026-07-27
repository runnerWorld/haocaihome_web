import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

const defaultPersona = {
  name: "好彩虹温柔理性型",
  audience: "关注感情、工作、学习与自我成长的年轻用户",
  tone: "温柔、具体、有陪伴感，但不要迷信恐吓",
  questionFocus: "工作、学习、爱情、人际相处中的状态分析",
};

const today = new Date().toISOString().slice(0, 10);

function readArg(name, fallback) {
  const prefix = `--${name}=`;
  const value = process.argv.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : fallback;
}

function buildPrompt(payload) {
  const persona = payload.persona;

  return `
请根据以下人格设定，生成一篇每日运势 SEO 内容。

输出语言：${payload.locale === "zh-TW" ? "繁体中文" : "简体中文"}
日期：${payload.date}
星座/类型：${persona.zodiac ?? "未指定"}
MBTI：${persona.mbti ?? "未指定"}
今日心情：${persona.mood ?? "未指定"}
人格名称：${persona.name}
受众：${persona.audience ?? "关注感情、工作、学习与自我成长的用户"}
语气：${persona.tone ?? "温柔、具体、有陪伴感，但不要迷信恐吓"}
分析重点：${persona.questionFocus ?? "工作、学习、爱情、人际相处中的状态分析"}

请只输出合法 JSON，不要 markdown，不要代码块。字段必须包含：
seo_title, meta_description, slug, h1, intro, overall, work, study, love,
relationship, lucky_color, lucky_number, today_advice, topic_keywords, seo_keywords, faq。

要求 FAQ 至少 3 条，slug 使用小写英文、数字和连字符，每个分析段落给出可执行建议。不要强行加入城市或地区词。
`.trim();
}

function stripJsonFence(content) {
  const withoutFence = content.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const start = withoutFence.indexOf("{");
  const end = withoutFence.lastIndexOf("}");
  const jsonLike = start >= 0 && end > start ? withoutFence.slice(start, end + 1) : withoutFence;

  return jsonLike.replace(/[\u0000-\u001F]/g, "");
}

function getDeepSeekAPIKey() {
  return process.env.DEEPSEEK_API_KEY ?? "";
}

async function main() {
  const apiKey = getDeepSeekAPIKey();

  if (!apiKey) {
    throw new Error("Missing DEEPSEEK_API_KEY");
  }

  const payload = {
    date: readArg("date", today),
    locale: readArg("locale", "zh-CN"),
    persona: {
      ...defaultPersona,
      name: readArg("persona", defaultPersona.name),
      zodiac: readArg("zodiac", undefined),
      mbti: readArg("mbti", undefined),
      mood: readArg("mood", undefined),
    },
  };

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
          content: "你是专业 SEO 内容策略师与心理型运势内容作者。你必须只输出合法 JSON。",
        },
        {
          role: "user",
          content: buildPrompt(payload),
        },
      ],
      stream: false,
      temperature: 0.8,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message ?? `DeepSeek API failed with ${response.status}`);
  }

  const content = JSON.parse(stripJsonFence(result.choices?.[0]?.message?.content ?? ""));
  const output = {
    ...payload,
    content,
    generated_at: new Date().toISOString(),
  };
  const outputDir = path.join(process.cwd(), "data", "daily-fortunes");
  const outputFile = path.join(outputDir, `${payload.date}-${content.slug}.json`);

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  console.log(outputFile);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
