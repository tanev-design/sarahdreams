import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  t: (key: string) => string;
}

export function AboutSection({ t }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, smoothX: 0, smoothY: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const imageContainer = imageContainerRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;
    if (!section || !imageContainer || !content || !stats) return;

    const triggers: ScrollTrigger[] = [];

    // Image entrance
    const imgTl = gsap.fromTo(
      imageContainer,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
        },
      }
    );
    if (imgTl.scrollTrigger) triggers.push(imgTl.scrollTrigger);

    // Content stagger
    const textElements = content.querySelectorAll('.animate-item');
    const contentTl = gsap.fromTo(
      textElements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );
    if (contentTl.scrollTrigger) triggers.push(contentTl.scrollTrigger);

    // Stats count-up
    const statNumbers = stats.querySelectorAll('.stat-number');
    const targets = [37, 158, 49];
    statNumbers.forEach((el, i) => {
      const obj = { val: 0 };
      const st = ScrollTrigger.create({
        trigger: stats,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: targets[i],
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = String(Math.round(obj.val));
            },
          });
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  // Mouse parallax for image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let rafId: number;
    const animate = () => {
      const mouse = mouseRef.current;
      mouse.smoothX += (mouse.x - mouse.smoothX) * 0.05;
      mouse.smoothY += (mouse.y - mouse.smoothY) * 0.05;

      if (imageRef.current) {
        const depth = 1;
        const rotX = mouse.smoothY * 4 * depth;
        const rotY = mouse.smoothX * -4 * depth;
        const transX = mouse.smoothX * 6 * depth;
        const transY = mouse.smoothY * 6 * depth;
        imageRef.current.style.transform = `
          translateX(${transX}px) translateY(${transY}px)
          rotateX(${rotX}deg) rotateY(${rotY}deg)
          scale(1.05)
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

  const paragraphs = ['about.p1', 'about.p2', 'about.p3', 'about.p4', 'about.p5'];
  const statLabels = [
    { numKey: 'stats.age', label: t('stats.age') },
    { numKey: 'stats.height', label: 'cm' },
    { numKey: 'stats.weight', label: 'kg' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-ink"
      style={{ padding: 'clamp(4rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4rem)' }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Image Column */}
        <div className="w-full md:w-[55%]" ref={imageContainerRef}>
          <div
            className="relative"
            style={{ perspective: '30vw' }}
          >
            {/* Decorative offset border */}
            <div
              className="absolute -top-3 -left-3 w-full h-full border border-champagne/20 rounded-[3px] pointer-events-none z-[1]"
            />
            <div
              className="relative overflow-hidden rounded-[3px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                ref={imageRef}
                src="/photo_3_2026-06-08_16-40-33.jpg"
                alt="About Sarah"
                className="w-full h-auto object-cover will-change-transform"
                style={{
                  aspectRatio: '3/4',
                  filter: 'grayscale(20%) contrast(1.05)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="w-full md:w-[45%]" ref={contentRef}>
          <div className="animate-item">
            <SectionHeader label={t('about.label')} heading={t('about.title')} centered={false} />
          </div>

          {paragraphs.map((key) => (
            <p
              key={key}
              className="animate-item font-body text-[clamp(0.9rem,1.1vw,1.05rem)] text-bone/75 leading-[1.75] mb-5"
            >
              {t(key)}
            </p>
          ))}

          {/* Stats */}
          <div
            ref={statsRef}
            className="animate-item grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-mist text-center relative"
          >
            {statLabels.map((stat, i) => (
              <div key={i} className="relative">
                {i > 0 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-mist/40" />
                )}
                <span className="stat-number font-display text-[1.8rem] text-champagne block">
                  0
                </span>
                <span className="font-label text-mist mt-1 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
