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
    question: 'Is this real fortune-telling?',
    answer: 'Rainbow Arcana is designed for reflection and gentle guidance, not prediction. Our readings offer symbolic insights to inspire your day, not determine your fate. Think of it as a moment of mindful pause rather than prophecy.',
  },
  {
    question: 'How do rainbow alerts work?',
    answer: 'We use weather data and atmospheric conditions to detect when rainbows are likely visible in your area. When conditions align, you receive a gentle notification inviting you to draw your daily card. It\'s nature\'s way of saying "take a moment."',
  },
  {
    question: 'Can I draw anytime?',
    answer: 'Free users receive one draw per rainbow alert. Premium members can draw anytime—perfect for morning rituals or whenever you need a moment of reflection throughout your day.',
  },
  {
    question: 'What does Premium unlock?',
    answer: 'Premium includes unlimited daily draws, deeper interpretations with historical arcana context, a "Pick 3" spread option, and exclusive seasonal card designs. You also get early access to new features.',
  },
  {
    question: 'Is my data private?',
    answer: 'Absolutely. Your readings are stored locally on your device. We only use your location for rainbow detection and never share personal data. You can delete your history anytime in settings.',
  },
];

// Testimonials Data
const testimonials = [
  {
    quote: 'The rainbow notification is such a gentle way to pause my day. It feels like the universe sending a small gift.',
    author: 'Maya L.',
    role: 'Designer',
  },
  {
    quote: 'I was skeptical at first, but the ritual animation is genuinely calming. The readings are thoughtful, not generic.',
    author: 'James K.',
    role: 'Engineer',
  },
  {
    quote: 'Finally, a tarot app that doesn\'t feel gaudy or new-agey. The design is gorgeous and the experience is premium.',
    author: 'Sarah M.',
    role: 'Writer',
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
              <span className="text-xs text-arcana-gray tracking-wide">No doom words. Just gentle guidance.</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-arcana-cream">Rainbow</span>{' '}
              <span className="text-arcana-gold">Arcana</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-lg md:text-xl text-arcana-gray font-light mb-8 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              A rainbow alert. A tarot sign. A gentle action for today.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <button className="px-8 py-3.5 rounded-full bg-arcana-gold text-arcana-charcoal font-medium text-sm tracking-wide transition-all hover:bg-arcana-gold-bright hover:shadow-lg hover:shadow-arcana-gold/20">
                Get the App
              </button>
              <button className="px-8 py-3.5 rounded-full border border-arcana-gold/30 text-arcana-gold font-medium text-sm tracking-wide transition-all hover:border-arcana-gold/50 hover:bg-arcana-gold/5">
                See how it works
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
            title="How It Works"
            subtitle="A simple ritual, guided by nature's light"
          />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: 1,
                title: 'Rainbow alert arrives',
                description: 'When atmospheric conditions align and a rainbow appears near you, we send a gentle notification.',
                icon: <RainbowIcon />,
              },
              {
                step: 2,
                title: 'Tap to receive your sign',
                description: 'Open the app and begin the ritual draw. A moment of calm before your card reveals itself.',
                icon: <TapIcon />,
              },
              {
                step: 3,
                title: 'One gentle action for today',
                description: 'Receive your card, its meaning, and a simple action to carry with you through the day.',
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
            title="Features"
            subtitle="Designed for reflection, built for beauty"
          />

          <div className="grid sm:grid-cols-2 gap-6">
            <FeatureCard
              title="Rainbow-triggered free draw"
              description="Your daily card is gifted by nature itself. When a rainbow appears near you, the app awakens for a free draw."
              icon={<RainbowIcon />}
              delay={0}
            />
            <FeatureCard
              title="Premium: draw anytime"
              description="Don't wait for rainbows. Premium members can begin the ritual whenever inspiration calls—morning, noon, or midnight."
              icon={<SparkleIcon />}
              delay={0.1}
            />
            <FeatureCard
              title="Arcana-grade visuals"
              description="Every card, every animation, every glow is crafted with care. A visual experience worthy of the mystical."
              icon={<EyeIcon />}
              delay={0.2}
            />
            <FeatureCard
              title="Shareable daily card"
              description="Export your reading as a beautiful image. Share your daily guidance with friends or save it for reflection."
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
            title="The Ritual"
            subtitle="Experience the draw animation"
          />

          <RitualPreview />

          <motion.p
            className="text-center text-arcana-gray-dark text-sm mt-8 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            This preview shows a simplified version of the in-app ritual experience.
          </motion.p>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="relative px-6 py-20 md:py-32 bg-arcana-charcoal-light/30">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            title="What People Say"
            subtitle="Early voices from our community"
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

      {/* ========== PRICING ========== */}
      <section className="relative px-6 py-20 md:py-32">
        <GlowOrb size="sm" className="top-0 left-1/4" intensity="low" />

        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Pricing"
            subtitle="Choose your path"
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free Tier */}
            <motion.div
              className="p-8 rounded-xl border border-arcana-gold/10 bg-arcana-charcoal-light/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-medium text-arcana-cream mb-2">Free</h3>
              <p className="text-arcana-gray text-sm mb-6">Nature-guided draws</p>

              <div className="text-3xl font-light text-arcana-cream mb-6">
                $0 <span className="text-sm text-arcana-gray font-normal">/ forever</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'One draw per rainbow alert',
                  'Standard card interpretations',
                  'Daily action tip',
                  'Beautiful ritual animation',
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
                Get Started Free
              </button>
            </motion.div>

            {/* Premium Tier */}
            <motion.div
              className="p-8 rounded-xl border border-arcana-gold/40 bg-arcana-charcoal-light/50 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Premium badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-arcana-gold/10 border border-arcana-gold/30 text-arcana-gold text-xs">
                Popular
              </div>

              <h3 className="text-xl font-medium text-arcana-gold mb-2">Premium</h3>
              <p className="text-arcana-gray text-sm mb-6">Unlimited mystical access</p>

              <div className="text-3xl font-light text-arcana-cream mb-2">
                $4.99 <span className="text-sm text-arcana-gray font-normal">/ month</span>
              </div>
              <p className="text-xs text-arcana-gray-dark mb-6">or $39.99/year (save 33%)</p>

              <ul className="space-y-3 mb-8">
                {[
                  'Draw anytime, no limits',
                  'Deep interpretations with context',
                  'Pick 3 spread option',
                  'Exclusive seasonal cards',
                  'Export & share beautiful images',
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
                Start Premium Trial
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="relative px-6 py-20 md:py-32 bg-arcana-charcoal-light/30">
        <div className="max-w-2xl mx-auto">
          <SectionTitle
            title="Questions"
            subtitle="Everything you need to know"
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
              Ready to receive your sign?
            </h2>
            <p className="text-arcana-gray text-base md:text-lg mb-8 max-w-md mx-auto">
              Download Rainbow Arcana and let nature guide your daily reflection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 rounded-full bg-arcana-gold text-arcana-charcoal font-medium text-sm tracking-wide transition-all hover:bg-arcana-gold-bright hover:shadow-lg hover:shadow-arcana-gold/20">
                Get the App
              </button>
              <button className="px-10 py-4 rounded-full border border-arcana-gold/30 text-arcana-gold font-medium text-sm tracking-wide transition-all hover:border-arcana-gold/50 hover:bg-arcana-gold/5">
                Learn More
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
              <span className="text-arcana-cream font-light tracking-wide">Rainbow Arcana</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-arcana-gray">
              <a href="#" className="hover:text-arcana-cream transition-colors">Privacy</a>
              <a href="#" className="hover:text-arcana-cream transition-colors">Terms</a>
              <a href="#" className="hover:text-arcana-cream transition-colors">Contact</a>
            </div>

            <p className="text-xs text-arcana-gray-dark">
              © 2025 Rainbow Arcana. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
