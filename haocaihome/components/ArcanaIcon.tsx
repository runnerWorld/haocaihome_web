'use client';

import { motion } from 'framer-motion';

interface ArcanaIconProps {
  className?: string;
}

export default function ArcanaIcon({ className = '' }: ArcanaIconProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer halo arc */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full absolute animate-halo"
        style={{ filter: 'drop-shadow(0 0 20px rgba(184, 149, 110, 0.4))' }}
      >
        <defs>
          <linearGradient id="haloGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a96a" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#b8956e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8a7254" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="url(#haloGradient)"
          strokeWidth="1.5"
          strokeDasharray="30 15 60 15"
        />
      </motion.svg>

      {/* 8-point star */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full absolute"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a96a" />
            <stop offset="100%" stopColor="#8a7254" />
          </linearGradient>
        </defs>
        <path
          d="M100 20 L108 80 L160 60 L120 100 L160 140 L108 120 L100 180 L92 120 L40 140 L80 100 L40 60 L92 80 Z"
          fill="none"
          stroke="url(#starGradient)"
          strokeWidth="1"
          opacity="0.6"
        />
      </motion.svg>

      {/* Tarot card shape */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full absolute"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <defs>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1e" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </linearGradient>
        </defs>
        <rect
          x="70"
          y="55"
          width="60"
          height="90"
          rx="4"
          fill="url(#cardGradient)"
          stroke="#b8956e"
          strokeWidth="1.5"
          opacity="0.9"
        />
        {/* Card inner design */}
        <rect
          x="76"
          y="61"
          width="48"
          height="78"
          rx="2"
          fill="none"
          stroke="#b8956e"
          strokeWidth="0.5"
          opacity="0.4"
        />
        {/* Small star on card */}
        <path
          d="M100 85 L103 95 L113 95 L105 102 L108 112 L100 106 L92 112 L95 102 L87 95 L97 95 Z"
          fill="#b8956e"
          opacity="0.6"
        />
      </motion.svg>

      {/* Inner glow circle */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        <div
          className="w-16 h-16 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(184, 149, 110, 0.3) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </div>
  );
}
