export type IntentionKey =
  | "calm"
  | "love"
  | "focus"
  | "confidence"
  | "protection"
  | "clarity"
  | "healing"
  | "new_beginning"
  | "wealth"
  | "health"
  | "career"
  | "study"
  | "sleep"
  | "creativity"
  | "social"
  | "luck";
export type LengthOption = "S" | "M" | "L";

export type Stone = {
  id: string;
  name: string;
  english: string;
  color: string;
  deep: string;
  glow: string;
  ring: string;
  note: string;
};

export type Intention = {
  id: IntentionKey;
  label: string;
  english: string;
  title: string;
  reminder: string;
  stones: Stone[];
};

export type Bead = Stone & {
  beadId: string;
};

const stoneMap: Record<string, Stone> = {
  amethyst: { id: "amethyst", name: "紫水晶", english: "Amethyst", color: "#8D6CCF", deep: "#3C136A", glow: "#EF8CFF", ring: "#CBB7F5", note: "安定过度思考，把注意力收回来。" },
  moonstone: { id: "moonstone", name: "月光石", english: "Moonstone", color: "#E9E4F3", deep: "#A9A5C7", glow: "#FFFFFF", ring: "#F7F3FF", note: "象征柔和、直觉和情绪缓冲。" },
  clear_quartz: { id: "clear_quartz", name: "白水晶", english: "Clear Quartz", color: "#F8FAFC", deep: "#CBD5E1", glow: "#FFFFFF", ring: "#D8E0EA", note: "代表清理杂讯，回到简单判断。" },
  rose_quartz: { id: "rose_quartz", name: "粉晶", english: "Rose Quartz", color: "#F6A8BE", deep: "#CB5F7F", glow: "#FFE6EE", ring: "#FFD4E0", note: "适合代表温柔、接纳和关系修复。" },
  strawberry_quartz: { id: "strawberry_quartz", name: "草莓晶", english: "Strawberry Quartz", color: "#F07F9A", deep: "#B9345D", glow: "#FFD5E1", ring: "#FFC0CE", note: "象征甜美、吸引和轻松互动。" },
  lapis: { id: "lapis", name: "青金石", english: "Lapis Lazuli", color: "#244C9A", deep: "#0B1F5E", glow: "#8BA8FF", ring: "#86A5E8", note: "支持深度思考和更清楚的表达。" },
  citrine: { id: "citrine", name: "黄水晶", english: "Citrine", color: "#F5C84B", deep: "#A56A09", glow: "#FFF0A6", ring: "#FFE9A3", note: "象征明亮、自我肯定和行动感。" },
  tigers_eye: { id: "tigers_eye", name: "虎眼石", english: "Tiger Eye", color: "#9B6A2F", deep: "#4A2A12", glow: "#F2C26E", ring: "#DDB874", note: "提醒你稳定看见自己的力量。" },
  garnet: { id: "garnet", name: "石榴石", english: "Garnet", color: "#8E1F2F", deep: "#3D0710", glow: "#E36B82", ring: "#D06D7C", note: "代表热度、承诺和持续投入。" },
  obsidian: { id: "obsidian", name: "黑曜石", english: "Obsidian", color: "#171717", deep: "#020202", glow: "#7A7A7A", ring: "#5D5D5D", note: "适合代表保护、界线和清理干扰。" },
  tourmaline: { id: "tourmaline", name: "黑碧玺", english: "Black Tourmaline", color: "#262626", deep: "#050505", glow: "#8A8A8A", ring: "#707070", note: "象征稳定、防护和落地感。" },
  fluorite: { id: "fluorite", name: "萤石", english: "Fluorite", color: "#76B7A7", deep: "#2F6F66", glow: "#D3FFF3", ring: "#BFE8DC", note: "适合象征分类、秩序和思路整理。" },
  green_aventurine: { id: "green_aventurine", name: "绿东陵", english: "Green Aventurine", color: "#6FB386", deep: "#2F754B", glow: "#C9F2D7", ring: "#BCE3C7", note: "象征恢复、柔和的成长和重新展开。" },
  jade: { id: "jade", name: "和田玉", english: "Jade", color: "#9CC9A8", deep: "#4D8560", glow: "#E0F5E6", ring: "#C7E8CF", note: "适合代表平衡、养护和长期稳定。" },
  red_agate: { id: "red_agate", name: "红玛瑙", english: "Red Agate", color: "#C74332", deep: "#6B1712", glow: "#FF9B83", ring: "#E68B7D", note: "象征活力、节奏和温暖的行动力。" },
  pyrite: { id: "pyrite", name: "黄铁矿", english: "Pyrite", color: "#B88A2D", deep: "#5F4314", glow: "#F5D36D", ring: "#D7B15C", note: "常被用来象征财富意识、机会和执行力。" },
  malachite: { id: "malachite", name: "孔雀石", english: "Malachite", color: "#1F8A5B", deep: "#06452D", glow: "#70D59F", ring: "#78C99E", note: "适合代表转化、增长和主动争取。" },
  amazonite: { id: "amazonite", name: "天河石", english: "Amazonite", color: "#72C8C0", deep: "#2B7774", glow: "#C8FFF9", ring: "#A7E9E2", note: "象征沟通、协调和更轻松的表达。" },
  sodalite: { id: "sodalite", name: "方钠石", english: "Sodalite", color: "#315A8C", deep: "#12284D", glow: "#86A7D8", ring: "#8EAAD2", note: "适合代表学习、逻辑整理和稳定专注。" },
  labradorite: { id: "labradorite", name: "拉长石", english: "Labradorite", color: "#637B86", deep: "#273D46", glow: "#A5E4DB", ring: "#9CB7BE", note: "象征灵感、变化和新的看见。" },
};

export const stones = Object.values(stoneMap);

export const intentions: Intention[] = [
  { id: "calm", label: "平静", english: "Calm", title: "平静与安定", reminder: "先把呼吸放慢，再处理今天真正重要的一件事。", stones: [stoneMap.amethyst, stoneMap.moonstone, stoneMap.clear_quartz] },
  { id: "love", label: "爱与关系", english: "Love", title: "爱与关系", reminder: "把猜测换成一句柔软但清楚的表达。", stones: [stoneMap.rose_quartz, stoneMap.moonstone, stoneMap.strawberry_quartz] },
  { id: "focus", label: "专注", english: "Focus", title: "专注与清晰", reminder: "不用完全想清楚，也可以先开始五分钟。", stones: [stoneMap.amethyst, stoneMap.clear_quartz, stoneMap.lapis] },
  { id: "confidence", label: "自信", english: "Confidence", title: "自信与表达", reminder: "今天先让行动替你建立底气。", stones: [stoneMap.citrine, stoneMap.tigers_eye, stoneMap.garnet] },
  { id: "protection", label: "保护", english: "Protection", title: "保护与界线", reminder: "不是所有情绪都需要你接住，先守住自己的边界。", stones: [stoneMap.obsidian, stoneMap.tourmaline, stoneMap.clear_quartz] },
  { id: "clarity", label: "清晰", english: "Clarity", title: "清晰与判断", reminder: "把脑中的问题写出来，答案会比想象中更快成形。", stones: [stoneMap.clear_quartz, stoneMap.fluorite, stoneMap.lapis] },
  { id: "healing", label: "疗愈", english: "Healing", title: "疗愈与恢复", reminder: "今天不需要逼自己变好，只要做一件会恢复能量的小事。", stones: [stoneMap.green_aventurine, stoneMap.rose_quartz, stoneMap.amethyst] },
  { id: "new_beginning", label: "新的开始", english: "New Beginning", title: "新的开始", reminder: "不要等到完全准备好，先为新阶段留出一个入口。", stones: [stoneMap.moonstone, stoneMap.citrine, stoneMap.clear_quartz] },
  { id: "wealth", label: "财运", english: "Wealth", title: "财运与机会", reminder: "把好运落到一个现实动作：确认预算、跟进机会，或完成一件能带来回报的小事。", stones: [stoneMap.citrine, stoneMap.pyrite, stoneMap.green_aventurine] },
  { id: "health", label: "身体健康", english: "Health", title: "健康与养护", reminder: "今天先照顾身体的基础节奏：喝水、伸展、早点休息，别把恢复推到最后。", stones: [stoneMap.jade, stoneMap.green_aventurine, stoneMap.red_agate] },
  { id: "career", label: "事业", english: "Career", title: "事业与推进", reminder: "先把最重要的工作推进一个可见节点，机会更容易被别人看见。", stones: [stoneMap.tigers_eye, stoneMap.pyrite, stoneMap.clear_quartz] },
  { id: "study", label: "学业", english: "Study", title: "学业与考试", reminder: "把要学的内容拆成一张清单，先攻克一个最容易拿分的小点。", stones: [stoneMap.sodalite, stoneMap.fluorite, stoneMap.clear_quartz] },
  { id: "sleep", label: "睡眠", english: "Sleep", title: "睡眠与放松", reminder: "今天给睡前留一段无屏幕时间，让身体知道可以慢慢收工了。", stones: [stoneMap.amethyst, stoneMap.moonstone, stoneMap.jade] },
  { id: "creativity", label: "创作", english: "Creativity", title: "创作与灵感", reminder: "灵感不用等完整。先留下一个草稿、一个标题，或一段还不完美的开头。", stones: [stoneMap.labradorite, stoneMap.citrine, stoneMap.amethyst] },
  { id: "social", label: "人缘", english: "Social", title: "人缘与表达", reminder: "今天适合主动释放一点善意，但也保留舒服的边界。", stones: [stoneMap.amazonite, stoneMap.rose_quartz, stoneMap.lapis] },
  { id: "luck", label: "好运", english: "Luck", title: "好运与新机会", reminder: "好运通常需要入口。今天先答应一个小尝试，让变化有地方发生。", stones: [stoneMap.citrine, stoneMap.moonstone, stoneMap.pyrite] },
];

export const sizeOptions: Array<{ value: LengthOption; label: string; beads: number; price: number }> = [
  { value: "S", label: "S / 15cm", beads: 18, price: 29.99 },
  { value: "M", label: "M / 16.5cm", beads: 21, price: 34.99 },
  { value: "L", label: "L / 18cm", beads: 24, price: 39.99 },
];

export function getIntention(id: string | null | undefined) {
  return intentions.find((item) => item.id === id) ?? intentions[2];
}

export function makeBeads(stones: Stone[], count: number) {
  return Array.from({ length: count }, (_, index) => {
    const stone = stones[index % stones.length];
    return { ...stone, beadId: `${stone.id}-${index}` };
  });
}

export function countStones(beads: Bead[]) {
  return beads.reduce<Record<string, { name: string; count: number }>>((acc, bead) => {
    acc[bead.id] = acc[bead.id] ?? { name: bead.name, count: 0 };
    acc[bead.id].count += 1;
    return acc;
  }, {});
}

export function beadBackground(bead: Stone) {
  return [
    "radial-gradient(circle at 28% 22%, rgba(255,255,255,0.95) 0 7%, transparent 8%)",
    `radial-gradient(circle at 68% 72%, ${bead.deep} 0 13%, transparent 22%)`,
    "linear-gradient(132deg, transparent 0 18%, rgba(255,255,255,0.38) 18% 27%, transparent 27% 43%, rgba(0,0,0,0.18) 43% 52%, transparent 52% 100%)",
    `linear-gradient(28deg, ${bead.deep}, ${bead.color} 38%, ${bead.glow} 53%, ${bead.color} 66%, ${bead.deep})`,
  ].join(", ");
}
