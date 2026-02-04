'use client';

import { motion } from 'framer-motion';
import StarField from '@/components/StarField';
import GlowOrb from '@/components/GlowOrb';
import ArcanaIcon from '@/components/ArcanaIcon';
import SectionTitle from '@/components/SectionTitle';
import FeatureCard from '@/components/FeatureCard';
import RitualPreview from '@/components/RitualPreview';
import FAQItem from '@/components/FAQItem';

// Icons as inline SVG components
const RainbowIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 18C4 14.6863 6.68629 12 10 12H14C17.3137 12 20 14.6863 20 18" strokeLinecap="round" />
    <path d="M6 18C6 15.7909 7.79086 14 10 14H14C16.2091 14 18 15.7909 18 18" strokeLinecap="round" />
    <path d="M8 18C8 16.8954 8.89543 16 10 16H14C15.1046 16 16 16.8954 16 18" strokeLinecap="round" />
  </svg>
);

const TapIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="3" />
    <path d="M12 11V15M12 15L9 18M12 15L15 18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
  </svg>
);

const CardIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M12 8L13 11L16 11L13.5 13L14.5 16L12 14L9.5 16L10.5 13L8 11L11 11L12 8Z" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12L10 17L19 8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// FAQ Data
const faqData = [
  {
    question: '这是真正的算命吗？',
    answer: '彩虹奥秘专为内心反思和温柔指引而设计，而非预测未来。我们的解读提供象征性的启示来激励你的一天，而不是决定你的命运。把它当作一个正念的停顿时刻，而非预言。',
  },
  {
    question: '彩虹提醒是如何运作的？',
    answer: '我们使用天气数据和大气条件来检测你所在区域何时可能出现彩虹。当条件吻合时，你会收到一个温和的通知，邀请你抽取今日塔罗牌。这是大自然在说"停下来歇一歇"。',
  },
  {
    question: '我可以随时抽牌吗？',
    answer: '免费用户每次彩虹提醒可抽取一张牌。高级会员可以随时抽牌——非常适合晨间仪式或一天中任何需要反思片刻的时候。',
  },
  {
    question: '高级版解锁了什么？',
    answer: '高级版包括无限每日抽牌、带有历史奥秘背景的深度解读、"三选一"牌阵选项，以及独家季节限定牌面设计。你还将优先体验新功能。',
  },
  {
    question: '我的数据安全吗？',
    answer: '绝对安全。你的解读记录存储在本地设备上。我们仅使用你的位置信息来检测彩虹，绝不会分享个人数据。你可以随时在设置中删除历史记录。',
  },
];

// Testimonials Data
const testimonials = [
  {
    quote: '彩虹通知是一种如此温柔的方式来暂停我的一天。感觉像是宇宙送来的小礼物。',
    author: '小雅',
    role: '设计师',
  },
  {
    quote: '起初我持怀疑态度，但仪式动画确实很让人平静。解读很有心意，不是千篇一律。',
    author: '子轩',
    role: '工程师',
  },
  {
    quote: '终于有一款塔罗应用不显得俗气或过于神秘主义了。设计精美，体验高级。',
    author: '思琪',
    role: '作家',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-arcana-charcoal text-arcana-cream grain-overlay vignette-overlay relative">
      {/* Star field background */}
      <StarField count={18} />

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background glow orbs */}
        <GlowOrb size="lg" className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" intensity="low" />
        <GlowOrb size="md" className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2" intensity="low" />

        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left: Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-arcana-gold/20 bg-arcana-charcoal-light/50 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-arcana-gold animate-pulse" />
              <span className="text-xs text-arcana-gray tracking-wide">没有厄运预言，只有温柔指引</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-arcana-cream">彩虹</span>{' '}
              <span className="text-arcana-gold">奥秘</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-lg md:text-xl text-arcana-gray font-light mb-8 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              一道彩虹提醒，一张塔罗启示，今日一个温柔的行动
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <button className="px-8 py-3.5 rounded-full bg-arcana-gold text-arcana-charcoal font-medium text-sm tracking-wide transition-all hover:bg-arcana-gold-bright hover:shadow-lg hover:shadow-arcana-gold/20">
                下载应用
              </button>
              <button className="px-8 py-3.5 rounded-full border border-arcana-gold/30 text-arcana-gold font-medium text-sm tracking-wide transition-all hover:border-arcana-gold/50 hover:bg-arcana-gold/5">
                了解运作方式
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Arcana Icon */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <ArcanaIcon className="w-full h-full" />
              {/* Additional soft glow behind icon */}
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(184, 149, 110, 0.4) 0%, transparent 60%)',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.5, duration: 0.5 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
        >
          <div className="w-6 h-10 rounded-full border border-arcana-gold/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-arcana-gold/50" />
          </div>
        </motion.div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="运作方式"
            subtitle="一个简单的仪式，由自然之光引导"
          />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: 1,
                title: '彩虹提醒到达',
                description: '当大气条件吻合，彩虹在你附近出现时，我们会发送一个温和的通知。',
                icon: <RainbowIcon />,
              },
              {
                step: 2,
                title: '点击接收你的启示',
                description: '打开应用，开始仪式抽牌。在牌面揭示之前，享受片刻宁静。',
                icon: <TapIcon />,
              },
              {
                step: 3,
                title: '今日一个温柔的行动',
                description: '获取你的牌、它的含义，以及一个可以伴随你度过一天的简单行动。',
                icon: <SparkleIcon />,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Step number with icon */}
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border border-arcana-gold/30 flex items-center justify-center text-arcana-gold">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-arcana-charcoal border border-arcana-gold/40 flex items-center justify-center text-xs text-arcana-gold font-medium">
                    {item.step}
                  </div>
                </div>

                <h3 className="text-lg font-medium text-arcana-cream mb-2">{item.title}</h3>
                <p className="text-sm text-arcana-gray leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 w-2/3 max-w-md h-px bg-gradient-to-r from-transparent via-arcana-gold/20 to-transparent" />
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="relative px-6 py-20 md:py-32 bg-arcana-charcoal-light/30">
        <GlowOrb size="md" className="top-0 right-0 -translate-y-1/2" intensity="low" />

        <div className="max-w-5xl mx-auto">
          <SectionTitle
            title="功能特色"
            subtitle="为反思而设计，为美感而打造"
          />

          <div className="grid sm:grid-cols-2 gap-6">
            <FeatureCard
              title="彩虹触发免费抽牌"
              description="你的每日塔罗牌由大自然本身赐予。当彩虹在你附近出现时，应用将被唤醒，赠予你一次免费抽牌。"
              icon={<RainbowIcon />}
              delay={0}
            />
            <FeatureCard
              title="高级版：随时抽牌"
              description="无需等待彩虹。高级会员可以在灵感召唤时随时开始仪式——无论是早晨、中午还是午夜。"
              icon={<SparkleIcon />}
              delay={0.1}
            />
            <FeatureCard
              title="奥秘级视觉体验"
              description="每一张牌、每一个动画、每一道光晕都经过精心打造。配得上神秘主题的视觉盛宴。"
              icon={<EyeIcon />}
              delay={0.2}
            />
            <FeatureCard
              title="可分享的每日牌面"
              description="将你的解读导出为精美图片。与朋友分享你的每日指引，或保存下来以供日后反思。"
              icon={<ShareIcon />}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ========== RITUAL PREVIEW ========== */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden">
        <GlowOrb size="lg" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" intensity="medium" />

        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="仪式体验"
            subtitle="感受抽牌动画"
          />

          <RitualPreview />

          <motion.p
            className="text-center text-arcana-gray-dark text-sm mt-8 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            此预览展示了应用内仪式体验的简化版本
          </motion.p>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="relative px-6 py-20 md:py-32 bg-arcana-charcoal-light/30">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            title="用户评价"
            subtitle="来自社区的早期声音"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg border border-arcana-gold/10 bg-arcana-charcoal/50"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Quote mark */}
                <svg className="w-6 h-6 text-arcana-gold/30 mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 12C4 9.79086 5.79086 8 8 8C10.2091 8 12 9.79086 12 12V18H4V12ZM14 12C14 9.79086 15.7909 8 18 8C20.2091 8 22 9.79086 22 12V18H14V12Z" />
                </svg>

                <p className="text-arcana-cream text-sm leading-relaxed mb-4">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-arcana-gold/10 border border-arcana-gold/20 flex items-center justify-center text-arcana-gold text-xs font-medium">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-arcana-cream text-sm">{testimonial.author}</p>
                    <p className="text-arcana-gray-dark text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRICING (COMMENTED OUT) ==========
      <section className="relative px-6 py-20 md:py-32">
        <GlowOrb size="sm" className="top-0 left-1/4" intensity="low" />

        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="价格方案"
            subtitle="选择你的道路"
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
              className="p-8 rounded-xl border border-arcana-gold/10 bg-arcana-charcoal-light/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-medium text-arcana-cream mb-2">免费版</h3>
              <p className="text-arcana-gray text-sm mb-6">自然引导的抽牌</p>

              <div className="text-3xl font-light text-arcana-cream mb-6">
                ¥0 <span className="text-sm text-arcana-gray font-normal">/ 永久免费</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  '每次彩虹提醒可抽一次牌',
                  '标准牌面解读',
                  '每日行动建议',
                  '精美仪式动画',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-arcana-gray">
                    <span className="w-5 h-5 rounded-full border border-arcana-gold/30 flex items-center justify-center text-arcana-gold">
                      <CheckIcon />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 rounded-full border border-arcana-gold/30 text-arcana-gold text-sm tracking-wide transition-all hover:border-arcana-gold/50 hover:bg-arcana-gold/5">
                免费开始
              </button>
            </motion.div>

            <motion.div
              className="p-8 rounded-xl border border-arcana-gold/40 bg-arcana-charcoal-light/50 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-arcana-gold/10 border border-arcana-gold/30 text-arcana-gold text-xs">
                热门选择
              </div>

              <h3 className="text-xl font-medium text-arcana-gold mb-2">高级版</h3>
              <p className="text-arcana-gray text-sm mb-6">无限神秘体验</p>

              <div className="text-3xl font-light text-arcana-cream mb-2">
                ¥28 <span className="text-sm text-arcana-gray font-normal">/ 月</span>
              </div>
              <p className="text-xs text-arcana-gray-dark mb-6">或 ¥198/年（省33%）</p>

              <ul className="space-y-3 mb-8">
                {[
                  '随时抽牌，无限次数',
                  '带背景知识的深度解读',
                  '"三选一"牌阵选项',
                  '独家季节限定牌面',
                  '导出并分享精美图片',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-arcana-cream">
                    <span className="w-5 h-5 rounded-full bg-arcana-gold/20 border border-arcana-gold/40 flex items-center justify-center text-arcana-gold">
                      <CheckIcon />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 rounded-full bg-arcana-gold text-arcana-charcoal font-medium text-sm tracking-wide transition-all hover:bg-arcana-gold-bright hover:shadow-lg hover:shadow-arcana-gold/20">
                开始高级试用
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      ========== */}

      {/* ========== FAQ ========== */}
      <section className="relative px-6 py-20 md:py-32 bg-arcana-charcoal-light/30">
        <div className="max-w-2xl mx-auto">
          <SectionTitle
            title="常见问题"
            subtitle="你想知道的一切"
          />

          <div className="border-t border-arcana-gold/10">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden">
        <GlowOrb size="lg" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" intensity="medium" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative star */}
            <motion.svg
              className="w-12 h-12 mx-auto mb-8 text-arcana-gold"
              viewBox="0 0 48 48"
              fill="currentColor"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              <path d="M24 4L27 18L40 16L30 24L40 32L27 30L24 44L21 30L8 32L18 24L8 16L21 18L24 4Z" />
            </motion.svg>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-arcana-cream tracking-wide mb-4">
              准备好接收你的启示了吗？
            </h2>
            <p className="text-arcana-gray text-base md:text-lg mb-8 max-w-md mx-auto">
              下载彩虹奥秘，让大自然引导你的每日反思
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 rounded-full bg-arcana-gold text-arcana-charcoal font-medium text-sm tracking-wide transition-all hover:bg-arcana-gold-bright hover:shadow-lg hover:shadow-arcana-gold/20">
                下载应用
              </button>
              <button className="px-10 py-4 rounded-full border border-arcana-gold/30 text-arcana-gold font-medium text-sm tracking-wide transition-all hover:border-arcana-gold/50 hover:bg-arcana-gold/5">
                了解更多
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="relative px-6 py-12 border-t border-arcana-gold/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-arcana-gold" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" />
              </svg>
              <span className="text-arcana-cream font-light tracking-wide">彩虹奥秘</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-arcana-gray">
              <a href="#" className="hover:text-arcana-cream transition-colors">隐私政策</a>
              <a href="#" className="hover:text-arcana-cream transition-colors">服务条款</a>
              <a href="#" className="hover:text-arcana-cream transition-colors">联系我们</a>
            </div>

            <p className="text-xs text-arcana-gray-dark">
              © 2025 彩虹奥秘 版权所有
            </p>
          </div>
          <p className="mt-4 text-xs text-arcana-gray-dark text-center">
            桂ICP备2025071572号
          </p>
        </div>
      </footer>
    </div>
  );
}
