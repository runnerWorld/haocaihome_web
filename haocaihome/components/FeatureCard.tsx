'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export default function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      className="relative p-6 rounded-lg bg-arcana-charcoal-light/50 border border-arcana-gold/10 card-hover-glow"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-arcana-charcoal border border-arcana-gold/20">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-arcana-cream mb-2">{title}</h3>
      <p className="text-sm text-arcana-gray leading-relaxed">{description}</p>
    </motion.div>
  );
}
