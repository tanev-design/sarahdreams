import { useMemo } from 'react';

interface PetalConfig {
  id: number;
  variant: number;
  left: number;
  delay: number;
  color: string;
}

export function FallingPetals({ count = 15 }: { count?: number }) {
  const petals = useMemo<PetalConfig[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      variant: (i % 5) + 1,
      left: Math.random() * 95 + 2.5,
      delay: i * 0.6,
      color: i % 2 === 0 ? '#c9a96e' : '#d4a574',
    }));
  }, [count]);

  const fallAnimation = (v: number) => {
    const anims: Record<number, string> = {
      1: 'petal-fall-1 9.5s linear infinite',
      2: 'petal-fall-2 12s linear infinite',
      3: 'petal-fall-3 8.8s linear infinite',
      4: 'petal-fall-4 11.2s linear infinite',
      5: 'petal-fall-5 10s linear infinite',
    };
    return anims[v] || anims[1];
  };

  const swayAnimation = (v: number) => {
    const anims: Record<number, string> = {
      1: 'petal-sway-1 4.2s ease-in-out infinite',
      2: 'petal-sway-2 3.8s ease-in-out infinite',
      3: 'petal-sway-3 5.1s ease-in-out infinite',
      4: 'petal-sway-4 4.5s ease-in-out infinite',
      5: 'petal-sway-5 3.5s ease-in-out infinite',
    };
    return anims[v] || anims[1];
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute -top-[30px] pointer-events-none will-change-transform"
          style={{
            left: `${petal.left}%`,
            animation: `${fallAnimation(petal.variant)}, ${swayAnimation(petal.variant)}`,
            animationDelay: `${petal.delay}s, ${petal.delay + 1}s`,
            color: petal.color,
          }}
        >
          <div
            className="relative"
            style={{
              width: `${8 + (petal.variant % 3) * 3}px`,
              height: `${8 + (petal.variant % 3) * 3}px`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                borderRadius: '200px 0px 200px 0px',
                background: `linear-gradient(45deg, ${petal.color}, transparent)`,
                opacity: 0.7,
                filter: 'blur(0.3px)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
