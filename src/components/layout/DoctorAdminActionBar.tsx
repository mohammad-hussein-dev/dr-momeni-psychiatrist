import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Plus, BookOpen, MessageSquare, Calendar, LogOut, X } from 'lucide-react';
import { getActiveSession, clearSession } from '../../lib/appointmentStore';
import { useLanguage } from '../../i18n/LanguageProvider';

interface DoctorAdminActionBarProps {
  onOpenArticleEditor?: () => void;
  onOpenTestimonialEditor?: () => void;
}

export const DoctorAdminActionBar: React.FC<DoctorAdminActionBarProps> = ({
  onOpenArticleEditor,
  onOpenTestimonialEditor
}) => {
  const { lang, isRTL } = useLanguage();
  const isFa = lang === 'fa';
  const location = useLocation();

  const [session, setSession] = useState(getActiveSession());
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleAuthCheck = () => {
      setSession(getActiveSession());
    };

    window.addEventListener('storage', handleAuthCheck);
    window.addEventListener('auth_state_changed', handleAuthCheck);
    const interval = setInterval(handleAuthCheck, 1500);

    return () => {
      window.removeEventListener('storage', handleAuthCheck);
      window.removeEventListener('auth_state_changed', handleAuthCheck);
      clearInterval(interval);
    };
  }, []);

  const isDoctor = session?.role === 'doctor_admin';
  if (!isDoctor || isDismissed) return null;

  const isBlogPage = location.pathname.startsWith('/blog');
  const isTestimonialsPage = location.pathname.startsWith('/testimonials');
  const isAdminHub = location.pathname.startsWith('/admin');

  // Only show quick floating creator bar on blog or testimonials or when not in admin hub
  const triggerAddArticle = () => {
    if (onOpenArticleEditor) {
      onOpenArticleEditor();
    } else {
      window.dispatchEvent(new Event('open_new_article_modal'));
    }
  };

  const triggerAddTestimonial = () => {
    if (onOpenTestimonialEditor) {
      onOpenTestimonialEditor();
    } else {
      window.dispatchEvent(new Event('open_new_testimonial_modal'));
    }
  };

  // If user is inside /admin, the in-page tabs handle everything, so no extra floating bar is needed
  if (isAdminHub) return null;

  return (
    <aside
      aria-label={isFa ? 'دسترسی سریع مدیریت پزشک' : 'Doctor Quick Actions'}
      className="fixed bottom-20 sm:bottom-6 start-4 sm:start-6 z-40 animate-fade-in"
    >
      <div className="bg-card/95 dark:bg-card/95 text-foreground border border-primary/40 rounded-2xl shadow-xl backdrop-blur-md px-3.5 py-2.5 flex items-center gap-2 text-xs">
        
        {/* Status Dot */}
        <div className="flex items-center gap-1.5 font-bold text-primary pe-1 border-e border-border/70">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="hidden sm:inline">{isFa ? 'دکتر مومنی' : 'Dr. Momeni'}</span>
        </div>

        {/* Dynamic Action Buttons */}
        {isBlogPage && (
          <button
            type="button"
            onClick={triggerAddArticle}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isFa ? 'نگارش مقاله جدید' : 'New Article'}</span>
          </button>
        )}

        {isTestimonialsPage && (
          <button
            type="button"
            onClick={triggerAddTestimonial}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isFa ? 'ثبت نظر جدید' : 'New Review'}</span>
          </button>
        )}

        <Link
          to="/admin"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-all font-semibold"
        >
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>{isFa ? 'پنل مدیریت' : 'Admin Hub'}</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            clearSession();
            setSession(null);
          }}
          title={isFa ? 'خروج از حساب پزشک' : 'Logout Doctor'}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white transition-all font-semibold cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isFa ? 'خروج' : 'Logout'}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          title={isFa ? 'بستن موقت این نوار' : 'Close'}
          className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </aside>
  );
};
