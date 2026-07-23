export type MBTIType = {
  code: string;
  name: string;
  title: string;
  audience: string;
  tone: string;
  focus: string;
};

export const MBTI_TYPES: MBTIType[] = [
  {
    code: "INTJ",
    name: "建筑师",
    title: "INTJ 建筑师型",
    audience: "重视长期规划、独立判断与效率感的用户",
    tone: "冷静、清晰、克制、有策略感",
    focus: "目标推进、职业选择、深度学习与亲密关系中的表达",
  },
  {
    code: "INTP",
    name: "逻辑学家",
    title: "INTP 逻辑学家型",
    audience: "喜欢独立思考、分析问题与探索可能性的用户",
    tone: "理性、轻松、启发式、不催促",
    focus: "思维整理、学习效率、工作边界与关系中的回应",
  },
  {
    code: "ENTJ",
    name: "指挥官",
    title: "ENTJ 指挥官型",
    audience: "关注目标、掌控感、事业成长与高效关系的用户",
    tone: "直接、有力量、务实、避免空泛鼓励",
    focus: "领导力、执行节奏、学习规划与亲密关系中的柔软度",
  },
  {
    code: "ENTP",
    name: "辩论家",
    title: "ENTP 辩论家型",
    audience: "喜欢新鲜想法、表达观点与尝试机会的用户",
    tone: "机智、具体、开放、有行动提醒",
    focus: "创意落地、注意力管理、学习探索与相处中的稳定感",
  },
  {
    code: "INFJ",
    name: "提倡者",
    title: "INFJ 提倡者型",
    audience: "敏感细腻、重视意义感和深度关系的用户",
    tone: "温柔、清澈、有边界感、不神秘恐吓",
    focus: "情绪边界、长期愿景、学习内化与亲密沟通",
  },
  {
    code: "INFP",
    name: "调停者",
    title: "INFP 调停者型",
    audience: "理想主义、情绪细腻、关注自我成长的用户",
    tone: "温柔、陪伴式、具体、允许慢下来",
    focus: "情绪安放、创作学习、工作自信与爱情表达",
  },
  {
    code: "ENFJ",
    name: "主人公",
    title: "ENFJ 主人公型",
    audience: "擅长连接他人、关注成长与关系质量的用户",
    tone: "温暖、明亮、坚定、强调自我照顾",
    focus: "关系平衡、团队协作、学习输出与爱情中的真实需求",
  },
  {
    code: "ENFP",
    name: "竞选者",
    title: "ENFP 竞选者型",
    audience: "热爱自由、灵感丰富、需要节奏感的用户",
    tone: "轻盈、热情、具体、有收束感",
    focus: "灵感执行、学习节奏、工作选择与关系中的承诺感",
  },
  {
    code: "ISTJ",
    name: "物流师",
    title: "ISTJ 物流师型",
    audience: "重视责任、稳定、秩序与实际成果的用户",
    tone: "稳重、明确、务实、不过度渲染情绪",
    focus: "任务管理、工作稳定、学习复盘与关系中的弹性",
  },
  {
    code: "ISFJ",
    name: "守卫者",
    title: "ISFJ 守卫者型",
    audience: "温和负责、重视安全感和照顾他人的用户",
    tone: "温柔、安定、细致、强调边界",
    focus: "自我照顾、工作负担、学习积累与亲密关系中的需求表达",
  },
  {
    code: "ESTJ",
    name: "总经理",
    title: "ESTJ 总经理型",
    audience: "重视规则、效率、结果与现实推进的用户",
    tone: "清楚、坚定、实用、带复盘意识",
    focus: "执行效率、团队沟通、学习计划与关系中的倾听",
  },
  {
    code: "ESFJ",
    name: "执政官",
    title: "ESFJ 执政官型",
    audience: "重视关系、责任感、现实稳定与被认可的用户",
    tone: "亲切、具体、稳定、避免讨好倾向",
    focus: "关系经营、工作协作、学习坚持与爱情中的安全感",
  },
  {
    code: "ISTP",
    name: "鉴赏家",
    title: "ISTP 鉴赏家型",
    audience: "独立务实、喜欢解决问题和保持自由度的用户",
    tone: "简洁、冷静、行动导向、不啰嗦",
    focus: "现场判断、技能学习、工作效率与关系中的回应度",
  },
  {
    code: "ISFP",
    name: "探险家",
    title: "ISFP 探险家型",
    audience: "感受力强、重视审美、自由与真实体验的用户",
    tone: "柔和、感性、具体、不压迫",
    focus: "感受表达、创作学习、工作节奏与爱情中的真实感",
  },
  {
    code: "ESTP",
    name: "企业家",
    title: "ESTP 企业家型",
    audience: "行动力强、喜欢机会、现实反馈与即时挑战的用户",
    tone: "直接、爽快、具体、有风险提醒",
    focus: "机会判断、执行节奏、实战学习与关系中的耐心",
  },
  {
    code: "ESFP",
    name: "表演者",
    title: "ESFP 表演者型",
    audience: "外向热情、重视体验、关系互动与当下快乐的用户",
    tone: "明快、温暖、具体、带一点收束",
    focus: "情绪能量、工作表现、学习坚持与爱情互动",
  },
];

export function getMBTIType(code: string) {
  return MBTI_TYPES.find((type) => type.code === code.toUpperCase());
}
