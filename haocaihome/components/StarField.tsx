'use client';

import { useMemo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function StarField({ count = 15 }: { count?: number }) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-arcana-gold animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--twinkle-delay': `${star.delay}s`,
            '--twinkle-duration': `${star.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
