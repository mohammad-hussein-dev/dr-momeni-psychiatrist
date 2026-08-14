import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from './translations';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
  pick: (obj: any, base: string) => string;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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
    const dict = (translations as any)[lang] || translations.fa;
    return dict[key] ?? (translations.fa as any)[key] ?? key;
  }, [lang]);

  const pick = useCallback((obj: any, base: string): string => {
    if (!obj) return '';
    const suffix = lang === 'fa' ? '_fa' : '_en';
    return obj[base + suffix] || obj[base + '_fa'] || obj[base + '_en'] || '';
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
