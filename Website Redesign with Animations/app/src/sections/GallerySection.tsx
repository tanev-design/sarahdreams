import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/lib/cn';

gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
  t: (key: string) => string;
}

const galleryImages = [
  '/photo_2_2026-06-08_16-40-33.jpg',
  '/photo_4_2026-06-08_16-40-33.jpg',
  '/photo_5_2026-06-08_16-40-33.jpg',
  '/photo_6_2026-06-08_16-40-33.jpg',
  '/photo_7_2026-06-08_16-40-33.jpg',
  '/photo_8_2026-06-08_16-40-33.jpg',
  '/photo_9_2026-06-08_16-40-33.jpg',
  '/photo_10_2026-06-08_16-40-33.jpg',
  '/photo_11_2026-06-08_16-40-33.jpg',
  '/photo_12_2026-06-08_16-40-33.jpg',
];

export function GallerySection({ t }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

  // Horizontal scroll with GSAP
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const scrollTween = gsap.to(track, {
      xPercent: -62,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        end: '+=2000px',
        onUpdate: (self) => {
          const progress = self.progress;
          const newDot = Math.min(
            galleryImages.length - 1,
            Math.floor(progress * galleryImages.length)
          );
          setActiveDot(newDot);
        },
      },
    });

    scrollTweenRef.current = scrollTween;

    // Header entrance
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }

    return () => {
      scrollTween.kill();
    };
  }, []);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, closeLightbox, lightboxPrev, lightboxNext]);

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        className="relative bg-obsidian overflow-hidden"
      >
        {/* Top gradient divider */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)',
          }}
        />

        {/* Section header */}
        <div ref={headerRef} className="pt-20 pb-8 opacity-0">
          <SectionHeader label={t('gallery.label')} heading={t('gallery.title')} />
        </div>

        {/* Horizontal scroll wrapper */}
        <div ref={wrapperRef} className="relative min-h-[100dvh] flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-8 will-change-transform"
            style={{ padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
          >
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 cursor-pointer group"
                style={{ width: 'clamp(280px, 28vw, 400px)' }}
                onClick={() => openLightbox(i)}
              >
                <div
                  className="relative overflow-hidden rounded-[4px] shadow-card group-hover:shadow-card-hover transition-all duration-500"
                  style={{ aspectRatio: '3/4' }}
                >
                  {/* Inner frame border */}
                  <div className="absolute inset-2 border border-champagne/15 rounded-[3px] pointer-events-none z-10 transition-all duration-400 group-hover:border-champagne/25 group-hover:inset-1.5" />

                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-contain bg-charcoal transition-all duration-600"
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                    }}
                    loading={i < 3 ? 'eager' : 'lazy'}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,5,8,0.55)] via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-400 z-[5]" />

                  {/* Slide number */}
                  <span className="absolute top-4 right-4 z-20 font-display text-[0.75rem] text-champagne tracking-[0.1em] opacity-50 group-hover:opacity-100 transition-opacity duration-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                className={cn(
                  'w-2.5 h-2.5 rounded-full border transition-all duration-400',
                  activeDot === i
                    ? 'bg-champagne border-champagne shadow-glow scale-110'
                    : 'bg-transparent border-mist hover:border-champagne/50'
                )}
                onClick={() => {
                  const track = trackRef.current;
                  if (track && scrollTweenRef.current) {
                    const progress = i / galleryImages.length;
                    const st = scrollTweenRef.current.scrollTrigger;
                    if (st) {
                      gsap.to(window, {
                        scrollTo: { y: st.start + (st.end - st.start) * progress },
                        duration: 0.8,
                        ease: 'power2.out',
                      });
                    }
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center"
          style={{
            background: 'rgba(5,5,5,0.94)',
            backdropFilter: 'blur(12px)',
          }}
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-mist text-bone text-2xl flex items-center justify-center transition-all duration-300 hover:border-champagne hover:text-champagne z-10"
            onClick={closeLightbox}
          >
            &times;
          </button>

          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-mist/60 bg-charcoal/70 text-bone text-lg flex items-center justify-center transition-all duration-300 hover:border-champagne hover:text-champagne z-10"
            onClick={(e) => {
              e.stopPropagation();
              lightboxPrev();
            }}
          >
            &#10094;
          </button>

          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-mist/60 bg-charcoal/70 text-bone text-lg flex items-center justify-center transition-all duration-300 hover:border-champagne hover:text-champagne z-10"
            onClick={(e) => {
              e.stopPropagation();
              lightboxNext();
            }}
          >
            &#10095;
          </button>

          <img
            src={galleryImages[lightboxIndex]}
            alt={`Gallery ${lightboxIndex + 1}`}
            className="max-w-[85vw] max-h-[82dvh] object-contain rounded-[3px]"
            style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
