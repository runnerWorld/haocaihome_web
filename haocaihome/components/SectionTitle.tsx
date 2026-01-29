'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className = '' }: SectionTitleProps) {
  return (
    <motion.div
      className={`text-center mb-12 md:mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-arcana-cream tracking-wide mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-arcana-gray text-sm md:text-base max-w-md mx-auto">
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center mt-6 gap-2">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-arcana-gold-muted" />
        <svg className="w-4 h-4 text-arcana-gold" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" />
        </svg>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-arcana-gold-muted" />
      </div>
    </motion.div>
  );
}
