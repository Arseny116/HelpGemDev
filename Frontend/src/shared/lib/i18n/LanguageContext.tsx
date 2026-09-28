import { useState, type ReactNode } from 'react';
import { translations, type Language } from '../../config/i18n';
import { LanguageContext } from './context';
const LANGUAGE_KEY = 'language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return saved === 'en' ? 'en' : 'ru';
  });

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    localStorage.setItem(LANGUAGE_KEY, nextLanguage);
  };

  const toggleLanguage = () => setLanguage(language === 'ru' ? 'en' : 'ru');

  return <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t: (key) => translations[language][key] }}>{children}</LanguageContext.Provider>;
}