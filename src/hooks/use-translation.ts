
"use client";

import { useLanguage } from '@/context/LanguageContext';
import { translations, TranslationType } from '@/lib/translations';

export function useTranslation() {
  const { language, setLanguage } = useLanguage();

  const t = translations[language] || translations.fr;

  return { t, language, setLanguage };
}
