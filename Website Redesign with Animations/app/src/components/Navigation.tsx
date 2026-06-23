import { useEffect, useRef, useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { type Lang } from '@/lib/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/cn';

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

export function Navigation({ lang, setLang, t }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      linksRef.current.forEach((link, i) => {
        if (link) {
          gsap.fromTo(
            link,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.1 + i * 0.08, ease: 'power3.out' }
          );
        }
      });
    }
  }, [mobileOpen]);

  const navLinks = [
    { href: '#about', key: 'nav.about' },
    { href: '#gallery', key: 'nav.gallery' },
    { href: '#services', key: 'nav.services' },
    { href: '#contact', key: 'nav.contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between transition-all duration-500',
          scrolled
            ? 'bg-[rgba(5,5,5,0.85)] backdrop-blur-[20px] saturate-[1.2] border-b border-champagne/10'
            : 'bg-transparent'
        )}
        style={{ padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
      >
        <a
          href="#"
          className="font-heading text-[1.15rem] tracking-[0.08em] flex items-center gap-2 text-bone no-underline group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="text-rose-gold text-[0.95rem] transition-transform duration-400 group-hover:rotate-[15deg] group-hover:scale-120 inline-block">
            &#10086;
          </span>
          <span>Sarah</span>
          <span className="text-champagne font-medium">Dream</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(({ href, key }) => (
            <a
              key={key}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="relative text-[0.78rem] uppercase tracking-[0.18em] text-bone/80 font-body font-normal no-underline transition-all duration-400 hover:text-champagne hover:tracking-[0.22em] group/link"
            >
              {t(key)}
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-gradient-to-r from-champagne to-gold rounded-full transition-all duration-400 group-hover/link:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher lang={lang} setLang={setLang} className="hidden md:flex" />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-7 h-5 relative flex flex-col justify-between bg-transparent border-none p-0 cursor-pointer z-[60]"
            aria-label="Menu"
          >
            <span
              className={cn(
                'block w-full h-[1.5px] bg-bone rounded-sm transition-all duration-350 origin-center',
                mobileOpen && 'translate-y-[9px] rotate-45 bg-champagne'
              )}
            />
            <span
              className={cn(
                'block w-full h-[1.5px] bg-bone rounded-sm transition-all duration-350',
                mobileOpen && 'opacity-0 scale-x-0'
              )}
            />
            <span
              className={cn(
                'block w-full h-[1.5px] bg-bone rounded-sm transition-all duration-350 origin-center',
                mobileOpen && '-translate-y-[9px] -rotate-45 bg-champagne'
              )}
            />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[55] bg-[rgba(5,5,5,0.98)] backdrop-blur-[30px] flex flex-col items-center justify-center gap-10 opacity-0"
        >
          {navLinks.map(({ href, key }, i) => (
            <a
              key={key}
              ref={(el) => {
                if (el) linksRef.current[i] = el;
              }}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="text-xl uppercase tracking-[0.2em] text-bone/80 font-body no-underline transition-colors duration-300 hover:text-champagne opacity-0"
            >
              {t(key)}
            </a>
          ))}
          <div className="mt-6">
            <LanguageSwitcher lang={lang} setLang={setLang} />
          </div>
        </div>
      )}
    </>
  );
}
