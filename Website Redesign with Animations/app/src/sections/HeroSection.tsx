import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FallingPetals } from '@/components/FallingPetals';

interface HeroSectionProps {
  t: (key: string) => string;
}

export function HeroSection({ t }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.5
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.7
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.95
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.15
      );

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let rafId: number;
    const animate = () => {
      if (imageRef.current) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        imageRef.current.style.transform = `
          scale(1.1)
          translate(${mx * -15}px, ${my * -15}px)
          rotateX(${my * 2}deg)
          rotateY(${mx * -2}deg)
        `;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 z-0">
        <div
          ref={imageRef}
          className="absolute inset-[-5%] will-change-transform"
          style={{
            backgroundImage: 'url(/photo_1_2026-06-08_16-40-33.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            filter: 'contrast(1.05) saturate(0.9)',
          }}
        />
        {/* Gradient overlays for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 60% 40%, transparent 0%, rgba(5,5,5,0.5) 70%, rgba(5,5,5,0.85) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.2) 50%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(139,21,56,0.12) 0%, transparent 55%)',
          }}
        />
      </div>

      {/* Falling petals */}
      <FallingPetals count={12} />

      {/* Content */}
      <div className="relative z-10 w-full" style={{ padding: '0 clamp(1.5rem, 8vw, 8rem)' }}>
        <div className="max-w-xl">
          <span
            ref={labelRef}
            className="font-label text-champagne mb-6 flex items-center gap-3 opacity-0"
          >
            <span className="block w-[30px] h-[1px] bg-champagne" />
            {t('hero.label')}
          </span>

          <h1
            ref={titleRef}
            className="font-display text-display text-bone mb-6 opacity-0 whitespace-pre-line"
            style={{ textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}
          >
            {t('hero.title')}
          </h1>

          <p
            ref={descRef}
            className="font-body text-[clamp(0.95rem,1.3vw,1.15rem)] text-bone/70 max-w-[480px] mb-8 leading-[1.7] opacity-0"
          >
            {t('hero.desc')}
          </p>

          <div ref={ctaRef} className="flex gap-3 flex-wrap opacity-0">
            <a
              href="#contact"
              onClick={(e) => handleCtaClick(e, '#contact')}
              className="btn-primary"
            >
              {t('hero.cta1')}
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleCtaClick(e, '#gallery')}
              className="btn-secondary"
            >
              {t('hero.cta2')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div
          className="w-[1px] h-10 bg-champagne animate-pulse-line"
          style={{ animation: 'pulse-line 2s ease infinite' }}
        />
      </div>
    </section>
  );
}
