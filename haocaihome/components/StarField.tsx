'use client';

interface Star {
  id: number;
  x: string;
  y: string;
  size: string;
  delay: string;
  duration: string;
}

const seededValue = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const fixed = (value: number) => value.toFixed(6);

const generateStars = (count: number): Star[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: fixed(seededValue(i * 6 + 1) * 100),
    y: fixed(seededValue(i * 6 + 2) * 100),
    size: fixed(seededValue(i * 6 + 3) * 2 + 1),
    delay: fixed(seededValue(i * 6 + 4) * 5),
    duration: fixed(seededValue(i * 6 + 5) * 3 + 2),
  }));

export default function StarField({ count = 15 }: { count?: number }) {
  const stars = generateStars(count);

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
