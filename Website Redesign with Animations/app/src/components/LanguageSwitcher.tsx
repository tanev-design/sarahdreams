import { type Lang } from '@/lib/translations';
import { cn } from '@/lib/cn';

interface LanguageSwitcherProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  className?: string;
}

export function LanguageSwitcher({ lang, setLang, className }: LanguageSwitcherProps) {
  const languages: { code: Lang; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'bg', label: 'BG' },
    { code: 'de', label: 'DE' },
  ];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={cn(
            'w-8 h-8 rounded-full border text-[0.65rem] uppercase font-body transition-all duration-300',
            lang === code
              ? 'border-gold text-gold shadow-glow bg-charcoal'
              : 'border-mist text-bone/60 bg-charcoal hover:border-champagne/50'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
