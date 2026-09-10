import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from './translations';
import { Language } from '../types';

interface ILanguageContextType {
  lang: Language;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
  pick: (obj: Record<string, unknown> | null | undefined, base: string) => string;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<ILanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('dr_lang');
    return (saved === 'en' || saved === 'fa') ? saved : 'fa';
  });

  const dir = lang === 'fa' ? 'rtl' : 'ltr';
  const isRTL = lang === 'fa';

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', dir);
    localStorage.setItem('dr_lang', lang);
  }, [lang, dir]);

  const t = useCallback((key: string): string => {
    const dict = (translations as Record<Language, Record<string, string>>)[lang] || translations.fa;
    return dict[key] ?? translations.fa[key] ?? key;
  }, [lang]);

  const pick = useCallback((obj: Record<string, unknown> | null | undefined, base: string): string => {
    if (!obj) return '';
    const record = obj as Record<string, unknown>;
    const suffix = lang === 'fa' ? '_fa' : '_en';
    const primary = record[base + suffix];
    if (typeof primary === 'string') return primary;
    const faFallback = record[base + '_fa'];
    if (typeof faFallback === 'string') return faFallback;
    const enFallback = record[base + '_en'];
    if (typeof enFallback === 'string') return enFallback;
    return '';
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLangState(prev => (prev === 'fa' ? 'en' : 'fa'));
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, dir, t, pick, toggleLang, setLang, isRTL }}>
      <div dir={dir} className={lang === 'fa' ? 'font-body text-right' : 'font-body text-left'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
