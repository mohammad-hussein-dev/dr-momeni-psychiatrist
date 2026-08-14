import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

export const NotFound: React.FC = () => {
  const { t, lang, isRTL } = useLanguage();

  return (
    <div className="pt-36 pb-24 min-h-[70vh] flex items-center justify-center text-center px-4">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-6xl font-bold font-mono text-primary/30">404</span>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
          {lang === 'fa' ? 'صفحه مورد نظر یافت نشد' : 'Page Not Found'}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {lang === 'fa'
            ? 'ممکن است آدرس را به اشتباه وارد کرده باشید یا صفحه به آدرس دیگری منتقل شده باشد.'
            : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-95 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>{t('back_home')}</span>
        </Link>
      </div>
    </div>
  );
};
