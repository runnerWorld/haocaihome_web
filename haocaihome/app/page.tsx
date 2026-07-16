'use client';

import { motion } from 'framer-motion';
import StarField from '@/components/StarField';
import GlowOrb from '@/components/GlowOrb';
import ArcanaIcon from '@/components/ArcanaIcon';
import SectionTitle from '@/components/SectionTitle';
import FAQItem from '@/components/FAQItem';

const RainbowIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 18C4 14.6863 6.68629 12 10 12H14C17.3137 12 20 14.6863 20 18" strokeLinecap="round" />
    <path d="M6 18C6 15.7909 7.79086 14 10 14H14C16.2091 14 18 15.7909 18 18" strokeLinecap="round" />
    <path d="M8 18C8 16.8954 8.89543 16 10 16H14C15.1046 16 16 16.8954 16 18" strokeLinecap="round" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M5 6.5C5 5.12 6.12 4 7.5 4H16.5C17.88 4 19 5.12 19 6.5V12.5C19 13.88 17.88 15 16.5 15H11L6 20V15.2C5.42 14.78 5 14.08 5 13.25V6.5Z" strokeLinejoin="round" />
    <path d="M8.5 8.5H15.5M8.5 11.5H13" strokeLinecap="round" />
  </svg>
);

const BraceletIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="12" cy="12" r="7" />
    <circle cx="12" cy="5" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="18.1" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="18.1" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="19" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="5.9" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="5.9" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

const navItems = [
  { label: '彩虹心情', href: '#rainbow-mood' },
  { label: 'MBTI', href: '#mbti' },
  { label: 'AI 问答', href: '#ai-chat' },
  { label: '在线 Shop', href: '#shop' },
];

const featureCards = [
  {
    title: '彩虹心情',
    body: '记录当下情绪，生成一张今日心情牌，把复杂感受转成一句可以执行的提醒。',
    icon: <RainbowIcon />,
    href: '#rainbow-mood',
  },
  {
    title: 'MBTI 守护牌',
    body: '完成轻量人格测试，获得类型、守护塔罗与 AI 个性解读。',
    icon: <SparkleIcon />,
    href: '#mbti',
  },
  {
    title: 'AI 继续追问',
    body: '围绕牌面聊感情、工作、选择和情绪，不止停在一次解读。',
    icon: <ChatIcon />,
    href: '#ai-chat',
  },
];

const moods = [
  { label: '开心', tone: 'bg-[#FDC7D0]' },
  { label: '平静', tone: 'bg-[#A3D3F9]' },
  { label: '焦虑', tone: 'bg-[#E8D6F4]' },
  { label: '低落', tone: 'bg-[#F8F6F1]' },
  { label: '期待', tone: 'bg-[#FF8F61]' },
];

const shopProducts = [
  {
    name: '幸运手环',
    tag: '随身提醒',
    price: '¥68',
    description: '适合在解读结束后作为每日祝福和行动锚点。',
    icon: <BraceletIcon />,
  },
  {
    name: '转运净化包',
    tag: '情绪整理',
    price: '¥36',
    description: '当牌面提示需要放下、整理或重新开始时推荐。',
    icon: <SparkleIcon />,
  },
  {
    name: '彩虹牌面贴纸',
    tag: '记录分享',
    price: '¥19',
    description: '把今日牌面保存下来，也可以送给同频的朋友。',
    icon: <RainbowIcon />,
  },
];

const faqData = [
  {
    question: '这是算命吗？',
    answer: '不是。彩虹奥秘更接近情绪记录、象征解读和自我反思工具。它不会替你决定命运，而是帮你把当下状态整理成一句温柔的行动提醒。',
  },
  {
    question: 'MBTI 和塔罗怎么结合？',
    answer: 'MBTI 用来描述你的偏好和决策方式，塔罗作为象征语言补充当下视角。应用会把人格类型、守护牌和 AI 解读放在同一个结果页里。',
  },
  {
    question: '彩虹心情是什么？',
    answer: '你可以记录当天心情，应用会根据情绪推荐一张心情牌，并给出短解读、行动建议和可继续追问的 AI 对话入口。',
  },
  {
    question: 'AI 问答会做什么？',
    answer: 'AI 会基于你的牌面、问题和上下文继续回答。例如感情、工作、选择、今天要避免什么，或这张牌为什么会出现。',
  },
  {
    question: '在线 Shop 和解读有什么关系？',
    answer: 'Shop 不是强行销售，而是在解读结束后提供一个可收藏、可赠送、可执行的行动建议，例如幸运手环、转运净化包或牌面周边。',
  },
];

const PillButton = ({ children, href, primary = false }: { children: React.ReactNode; href: string; primary?: boolean }) => (
  <a
    href={href}
    className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-all ${
      primary
        ? 'border border-arcana-gold/50 bg-arcana-charcoal-light text-arcana-cream shadow-lg shadow-arcana-gold/10 hover:border-arcana-gold'
        : 'border border-white/80 bg-white/70 text-arcana-cream shadow-sm backdrop-blur-xl hover:bg-white'
    }`}
  >
    {children}
  </a>
);

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-arcana-charcoal text-arcana-cream grain-overlay vignette-overlay">
      <StarField count={18} />

      <header className="fixed left-0 right-0 top-0 z-50 px-4 py-3">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/80 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-2xl">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-arcana-gold/12 text-arcana-gold">
              <SparkleIcon />
            </span>
            <span className="text-sm font-semibold text-arcana-cream">彩虹奥秘</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-arcana-gray transition-colors hover:bg-white hover:text-arcana-cream">
                {item.label}
              </a>
            ))}
          </div>

          <a href="#download" className="rounded-full bg-arcana-gold px-4 py-2 text-sm font-semibold text-white shadow-md shadow-arcana-gold/20">
            下载 App
          </a>
        </nav>
      </header>

      <main>
        <section className="relative flex min-h-screen items-center px-6 pb-20 pt-32">
          <GlowOrb size="lg" className="left-0 top-20 -translate-x-1/2" intensity="low" />
          <GlowOrb size="md" className="right-0 top-32 translate-x-1/3" intensity="medium" />

          <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.88fr]">
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1.5 text-xs text-arcana-gray shadow-sm backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-arcana-gold" />
                彩虹 · 心情 · MBTI · AI 问答
              </div>

              <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-bold leading-tight tracking-normal text-arcana-cream sm:text-5xl lg:mx-0 lg:text-6xl">
                用彩虹、心情与 AI，收到每天刚刚好的提醒
              </h1>

              <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-arcana-gray sm:text-lg lg:mx-0">
                记录今日心情，接收彩虹时刻，抽一张专属塔罗牌，并继续向 AI 追问你的解读。
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <PillButton href="#download" primary>下载 App</PillButton>
                <PillButton href="#rainbow-mood">查看功能</PillButton>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            >
              <div className="ios-phone relative w-[292px] overflow-hidden rounded-[3rem] bg-[#F8F6F1] p-3 sm:w-[330px]">
                <div className="absolute left-1/2 top-3 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-[#2A2A2A]" />
                <div className="rounded-[2.25rem] bg-[#F8F6F1] px-4 pb-5 pt-10">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-arcana-gray-dark">Today</p>
                      <p className="text-xl font-bold text-arcana-cream">彩虹奥秘</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-arcana-gold shadow-sm">已匹配</span>
                  </div>

                  <div className="mb-4 rounded-[1.7rem] bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-arcana-gold/12 text-arcana-gold">
                        <RainbowIcon />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-arcana-cream">今日心情</p>
                        <p className="text-xs text-arcana-gray-dark">焦虑 · 推荐节制</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-arcana-gray">先把事情拆小，不急着一次解决全部。</p>
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="ios-glass rounded-[1.5rem] p-4">
                      <p className="mb-1 text-xs text-arcana-gray-dark">MBTI</p>
                      <p className="text-2xl font-bold text-arcana-gold">INFP</p>
                      <p className="text-xs text-arcana-gray">守护牌 · 月亮</p>
                    </div>
                    <div className="ios-glass rounded-[1.5rem] p-4">
                      <p className="mb-2 text-xs text-arcana-gray-dark">AI 问答</p>
                      <div className="rounded-2xl bg-white px-3 py-2 text-xs leading-relaxed text-arcana-gray shadow-sm">
                        我该主动联系 TA 吗？
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.7rem] bg-[#2A2A2A] p-4 text-white shadow-xl">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold">解读后的行动</p>
                      <BraceletIcon />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm">幸运手环</p>
                        <p className="text-xs text-white/60">随身提醒 · ¥68</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#2A2A2A]">查看</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            {featureCards.map((feature, index) => (
              <motion.a
                key={feature.title}
                href={feature.href}
                className="card-hover-glow rounded-3xl border border-arcana-gold/20 bg-gradient-to-br from-[#FFFDF9] to-[#F8F6F1] p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-arcana-gold/10 text-arcana-gold">
                  {feature.icon}
                </div>
                <h2 className="mb-2 text-xl font-semibold text-arcana-cream">{feature.title}</h2>
                <p className="text-sm leading-relaxed text-arcana-gray">{feature.body}</p>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="rainbow-mood" className="relative scroll-mt-28 bg-white/45 px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionTitle title="彩虹心情" subtitle="把今天的感受，变成一张可以陪你的心情牌" className="text-left [&>*]:mx-0" />
              <p className="text-base leading-relaxed text-arcana-gray">
                iOS 里已经有心情记录、心情牌和通知提醒。Landing 页面要让用户一眼看懂：不是单纯抽牌，而是先记录真实状态，再得到更贴近当下的解读。
              </p>
            </div>

            <motion.div
              className="ios-glass rounded-[2rem] p-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {moods.map((mood) => (
                  <div key={mood.label} className="rounded-3xl bg-white p-3 text-center shadow-sm">
                    <div className={`mx-auto mb-2 h-11 w-11 rounded-full ${mood.tone} border border-white/80`} />
                    <p className="text-sm font-medium text-arcana-cream">{mood.label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="mb-1 text-xs font-medium text-arcana-gray-dark">根据“焦虑”推荐</p>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-arcana-cream">节制</h3>
                  <span className="rounded-full bg-arcana-gold/10 px-3 py-1 text-xs font-semibold text-arcana-gold">今日行动</span>
                </div>
                <p className="text-sm leading-relaxed text-arcana-gray">
                  先把一个担心写下来，再写出你今天能完成的最小一步。你不需要马上解决全部。
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="mbti" className="relative scroll-mt-28 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionTitle title="MBTI 守护牌" subtitle="用人格测试打开长期自我理解，再由塔罗补上当下提醒" />

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                className="ios-glass rounded-[2rem] p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-arcana-gray-dark">Personality Reading</p>
                    <h3 className="text-3xl font-bold text-arcana-gold">INFP</h3>
                    <p className="text-sm text-arcana-gray">调停者 · 守护牌：月亮</p>
                  </div>
                  <div className="flex h-20 w-14 rotate-6 items-center justify-center rounded-2xl border border-arcana-gold/30 bg-white text-arcana-gold shadow-lg">
                    <SparkleIcon />
                  </div>
                </div>
                <div className="space-y-3">
                  {['12 道轻量问题', '四组维度结果', '守护塔罗匹配', 'AI 个性解读'].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-arcana-gold" />
                      <span className="text-sm text-arcana-gray">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  ['ENTJ', '皇帝', '把计划落到结构与优先级。'],
                  ['ISFJ', '女祭司', '先照顾内在秩序，再回应外界期待。'],
                  ['ENFP', '星星', '把灵感收束成一个今天能开始的行动。'],
                ].map(([type, card, text], index) => (
                  <motion.div
                    key={type}
                    className="rounded-3xl border border-arcana-gold/15 bg-white/75 p-5 shadow-sm backdrop-blur-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xl font-bold text-arcana-gold">{type}</span>
                      <span className="text-arcana-gray-dark">·</span>
                      <span className="font-semibold text-arcana-cream">{card}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-arcana-gray">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="ai-chat" className="relative scroll-mt-28 bg-white/45 px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionTitle title="AI 问答" subtitle="解读不是结束，而是一次可以继续追问的对话" className="text-left [&>*]:mx-0" />
              <p className="text-base leading-relaxed text-arcana-gray">
                用户抽到牌之后，最自然的问题不是“这是什么意思”，而是“这和我现在的问题有什么关系”。网站应该把这个场景明确展示出来。
              </p>
            </div>

            <motion.div
              className="ios-glass rounded-[2rem] p-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 rounded-3xl bg-white/70 p-4">
                <p className="mb-1 text-xs font-semibold uppercase text-arcana-gold">Context</p>
                <p className="text-sm font-semibold text-arcana-cream">星星 · 希望与重新连接</p>
                <p className="mt-1 text-xs leading-relaxed text-arcana-gray">今天的牌面提醒你保留信任，但不要忽略现实节奏。</p>
              </div>
              <div className="space-y-3">
                <div className="ml-auto max-w-[80%] rounded-3xl bg-arcana-gold px-4 py-3 text-sm leading-relaxed text-white">
                  我该不该主动联系 TA？
                </div>
                <div className="max-w-[86%] rounded-3xl bg-white px-4 py-3 text-sm leading-relaxed text-arcana-gray shadow-sm">
                  如果你期待的是确认关系，先不要急着索取答案。更适合发出一个轻量、没有压力的问候，观察对方是否愿意回应。
                </div>
                <div className="ml-auto max-w-[80%] rounded-3xl bg-[#E8D6F4] px-4 py-3 text-sm leading-relaxed text-arcana-cream">
                  那工作上呢？
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="shop" className="relative scroll-mt-28 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionTitle title="在线 Shop" subtitle="解读后的行动建议，可以收藏、赠送，也可以变成一个随身提醒" />

            <div className="grid gap-5 md:grid-cols-3">
              {shopProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  className="ios-glass rounded-[2rem] p-5"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF8F61] to-[#FDC7D0] text-white shadow-lg">
                      {product.icon}
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-arcana-gray shadow-sm">{product.tag}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-arcana-cream">{product.name}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-arcana-gray">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-arcana-cream">{product.price}</span>
                    <button className="rounded-full bg-arcana-gold px-4 py-2 text-sm font-semibold text-white shadow-md shadow-arcana-gold/20">
                      查看
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-white/45 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <SectionTitle title="一次完整体验" subtitle="从感受到行动，整个流程不需要离开 App" />
            <div className="grid gap-4 md:grid-cols-5">
              {['记录心情', '等待彩虹', '抽牌解读', 'AI 追问', '收藏或购买'].map((step, index) => (
                <motion.div
                  key={step}
                  className="relative rounded-3xl bg-white/75 p-5 text-center shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                >
                  <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-arcana-gold/10 text-sm font-bold text-arcana-gold">
                    {index + 1}
                  </div>
                  <p className="text-sm font-semibold text-arcana-cream">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="relative px-6 py-20 md:py-28">
          <div className="mx-auto max-w-2xl">
            <SectionTitle title="常见问题" subtitle="关于彩虹心情、MBTI、AI 问答和 Shop" />
            <div className="border-t border-arcana-gold/10">
              {faqData.map((faq, index) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} delay={index * 0.04} />
              ))}
            </div>
          </div>
        </section>

        <section id="download" className="relative px-6 py-20 md:py-28">
          <GlowOrb size="lg" className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" intensity="medium" />
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-arcana-gold shadow-lg">
              <ArcanaIcon className="h-10 w-10" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-arcana-cream md:text-4xl">把每天的提醒收进口袋</h2>
            <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-arcana-gray">
              彩虹奥秘把天气、心情、人格、塔罗和 AI 对话放在一个安静的日常仪式里。
            </p>
            <PillButton href="#" primary>下载 App</PillButton>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/70 bg-white/40 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-arcana-gold/10 text-arcana-gold">
              <SparkleIcon />
            </span>
            <span className="font-semibold text-arcana-cream">彩虹奥秘</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-arcana-gray">
            <a href="/privacy" className="hover:text-arcana-cream">隐私政策</a>
            <a href="/terms" className="hover:text-arcana-cream">服务条款</a>
            <a href="#faq" className="hover:text-arcana-cream">常见问题</a>
          </div>

          <div className="text-center text-xs text-arcana-gray-dark md:text-right">
            <p>© 2025 彩虹奥秘 版权所有</p>
            <p className="mt-1">桂ICP备2025071572号</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <a href="#download" className="flex h-12 items-center justify-center rounded-full bg-arcana-gold text-sm font-semibold text-white shadow-lg shadow-arcana-gold/25">
          下载 App
        </a>
      </div>
    </div>
  );
}
