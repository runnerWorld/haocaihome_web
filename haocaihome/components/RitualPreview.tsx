'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type RitualPhase = 'idle' | 'darken' | 'flare' | 'card' | 'reveal';

export default function RitualPreview() {
  const [phase, setPhase] = useState<RitualPhase>('idle');
  const [isPlaying, setIsPlaying] = useState(false);

  const startRitual = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    // Phase A (0-0.5s): background darkens + halo intensifies
    setPhase('darken');

    // Phase B (0.5-1.5s): gold arc flare sweeps
    setTimeout(() => setPhase('flare'), 500);

    // Phase C (1.5-2.5s): tarot card flies in + rotates
    setTimeout(() => setPhase('card'), 1500);

    // Phase D (2.5-3.2s): ding indicator + reveal
    setTimeout(() => setPhase('reveal'), 2500);

    // Reset
    setTimeout(() => {
      setPhase('idle');
      setIsPlaying(false);
    }, 4500);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Preview Container */}
      <motion.div
        className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-arcana-gold/20"
        style={{
          background: 'linear-gradient(180deg, #0a0a0c 0%, #141418 100%)',
        }}
      >
        {/* Darkening overlay */}
        <AnimatePresence>
          {phase !== 'idle' && (
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'darken' ? 0.5 : phase === 'reveal' ? 0.3 : 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Central halo glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(184, 149, 110, 0.2) 0%, transparent 70%)',
            }}
            animate={{
              scale: phase === 'darken' || phase === 'flare' ? 1.5 : 1,
              opacity: phase === 'darken' ? 0.8 : phase === 'flare' ? 1 : 0.3,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Flare arc sweep */}
        <AnimatePresence>
          {phase === 'flare' && (
            <motion.svg
              viewBox="0 0 200 200"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 180 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              <defs>
                <linearGradient id="flareGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d4a96a" stopOpacity="0" />
                  <stop offset="50%" stopColor="#d4a96a" stopOpacity="1" />
                  <stop offset="100%" stopColor="#d4a96a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="60"
                fill="none"
                stroke="url(#flareGradient)"
                strokeWidth="3"
                strokeDasharray="100 200"
                style={{ filter: 'drop-shadow(0 0 10px rgba(212, 169, 106, 0.8))' }}
              />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Tarot card animation */}
        <AnimatePresence>
          {(phase === 'card' || phase === 'reveal') && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.3, y: 100, rotateY: 180 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateY: phase === 'reveal' ? 0 : 90,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <div
                className="w-20 h-32 rounded-lg border-2 border-arcana-gold flex items-center justify-center"
                style={{
                  background: 'linear-gradient(180deg, #1a1a1e 0%, #0a0a0c 100%)',
                  boxShadow: '0 0 40px rgba(184, 149, 110, 0.4)',
                }}
              >
                {phase === 'reveal' && (
                  <motion.svg
                    viewBox="0 0 40 40"
                    className="w-12 h-12"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <path
                      d="M20 4L23 15L34 15L25 22L28 33L20 26L12 33L15 22L6 15L17 15Z"
                      fill="#b8956e"
                    />
                  </motion.svg>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ding pulse effect */}
        <AnimatePresence>
          {phase === 'reveal' && (
            <>
              {/* Expanding circle pulse */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-24 h-24 rounded-full border-2 border-arcana-gold-bright"
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </motion.div>

              {/* Sparkle bursts */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-arcana-gold-bright"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'center',
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: Math.cos((angle * Math.PI) / 180) * 80,
                    y: Math.sin((angle * Math.PI) / 180) * 80,
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Reveal text */}
        <AnimatePresence>
          {phase === 'reveal' && (
            <motion.div
              className="absolute bottom-4 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-arcana-gold text-sm font-light tracking-wider">
                The Star
              </p>
              <p className="text-arcana-gray text-xs mt-1">
                Hope and inspiration await
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Idle state content */}
        {phase === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <svg viewBox="0 0 60 80" className="w-12 h-16 mb-3 opacity-40">
              <rect
                x="5"
                y="5"
                width="50"
                height="70"
                rx="4"
                fill="none"
                stroke="#b8956e"
                strokeWidth="1.5"
              />
              <path
                d="M30 25L33 35L43 35L35 42L38 52L30 46L22 52L25 42L17 35L27 35Z"
                fill="#b8956e"
                opacity="0.5"
              />
            </svg>
            <p className="text-arcana-gray-dark text-sm">Tap to experience the ritual</p>
          </div>
        )}
      </motion.div>

      {/* Trigger button */}
      <motion.button
        onClick={startRitual}
        disabled={isPlaying}
        className="mt-6 w-full py-3 px-6 rounded-full border border-arcana-gold/40 bg-arcana-charcoal-light/50 text-arcana-gold text-sm tracking-wider transition-all hover:border-arcana-gold/60 hover:bg-arcana-charcoal-light disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isPlaying ? 1 : 1.02 }}
        whileTap={{ scale: isPlaying ? 1 : 0.98 }}
      >
        {isPlaying ? 'Drawing...' : 'Begin Ritual Draw'}
      </motion.button>
    </div>
  );
}
