import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@/hooks/useLenis';
import { useLanguage } from '@/hooks/useLanguage';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { GallerySection } from '@/sections/GallerySection';
import { ServicesSection } from '@/sections/ServicesSection';
import { ContactSection } from '@/sections/ContactSection';
import { Footer } from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useLenis();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang === 'bg' ? 'bg' : lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-obsidian text-bone overflow-x-hidden">
      <Navigation lang={lang} setLang={setLang} t={t} />
      <main>
        <HeroSection t={t} />
        <AboutSection t={t} />
        <GallerySection t={t} />
        <ServicesSection t={t} />
        <ContactSection t={t} />
      </main>
      <Footer lang={lang} setLang={setLang} t={t} />
    </div>
  );
}
