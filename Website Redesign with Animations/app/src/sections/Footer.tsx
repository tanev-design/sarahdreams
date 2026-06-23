import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { type Lang } from '@/lib/translations';

interface FooterProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

export function Footer({ lang, setLang, t }: FooterProps) {
  return (
    <footer
      className="bg-ink border-t border-mist/60"
      style={{ padding: '3rem clamp(1.5rem, 5vw, 4rem) 1.5rem' }}
    >
      <div className="max-w-[1100px] mx-auto text-center">
        <a
          href="#"
          className="font-heading text-[1.4rem] tracking-[0.08em] inline-flex items-center gap-2 text-bone no-underline mb-6"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="text-rose-gold text-[0.95rem]">&#10086;</span>
          <span>Sarah</span>
          <span className="text-champagne font-medium">Dream</span>
        </a>

        <ul className="flex justify-center gap-6 mb-6 list-none flex-wrap">
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-body text-[0.75rem] uppercase tracking-[0.1em] text-mist no-underline transition-colors duration-300 hover:text-champagne"
            >
              {t('footer.impressum')}
            </a>
          </li>
          <li>
            <a
              href="tel:+41783027547"
              className="font-body text-[0.75rem] uppercase tracking-[0.1em] text-mist no-underline transition-colors duration-300 hover:text-champagne"
            >
              +41 78 302 75 47
            </a>
          </li>
        </ul>

        <p className="font-body text-[0.78rem] text-bone/35 mb-4">
          {t('footer.copyright')}
        </p>

        <p className="font-body text-[0.7rem] text-bone/20 mb-6">
          {t('footer.recaptcha')}
        </p>

        <div className="flex justify-center md:hidden">
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>
      </div>
    </footer>
  );
}
