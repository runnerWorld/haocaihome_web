'use client';

import { motion } from 'framer-motion';

interface GlowOrbProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export default function GlowOrb({
  size = 'md',
  className = '',
  intensity = 'medium'
}: GlowOrbProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96'
  };

  const opacityMap = {
    low: 0.15,
    medium: 0.3,
    high: 0.5
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${sizeClasses[size]} ${className}`}
      style={{
        background: `radial-gradient(circle, rgba(255, 143, 97, ${opacityMap[intensity]}) 0%, rgba(253, 199, 208, ${opacityMap[intensity] * 0.55}) 42%, rgba(163, 211, 249, 0) 72%)`,
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [opacityMap[intensity], opacityMap[intensity] * 1.3, opacityMap[intensity]],
      }}
      transition={{
        duration: 6,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    />
  );
}
