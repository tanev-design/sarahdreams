import { useState, useCallback } from 'react';
import { translations, type Lang, type TranslationKey } from '@/lib/translations';

export function useLanguage() {
  const [lang, setLang] = useState<Lang>('en');

  const t = useCallback(
    (key: string): string => {
      return translations[lang][key as TranslationKey] || translations['en'][key as TranslationKey] || key;
    },
    [lang]
  );

  return { lang, setLang, t };
}
