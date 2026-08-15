import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Calendar, 
  Menu, 
  X, 
  Globe, 
  User, 
  ShieldCheck, 
  Lock,
  LogOut,
  Sparkles,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { PHONE, PHONE_TEL } from '../../lib/siteConstants';
import { BrandLogo } from '../site/BrandLogo';
import { ThemeToggle } from '../site/ThemeToggle';
import { getActiveSession, clearSession } from '../../lib/appointmentStore';
import { UserSession } from '../../types';

export const Header: React.FC = () => {
  const { t, lang, toggleLang, isRTL } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<UserSession | null>(() => getActiveSession());
  const location = useLocation();

  const isDoctorOrAdmin = session?.role === 'doctor_admin';

  // Listen to auth changes in real-time
  useEffect(() => {
    const syncSession = () => {
      setSession(getActiveSession());
    };

    window.addEventListener('storage', syncSession);
    window.addEventListener('auth_state_changed', syncSession);
    const interval = setInterval(syncSession, 1200);

    return () => {
      window.removeEventListener('storage', syncSession);
      window.removeEventListener('auth_state_changed', syncSession);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleDoctorLogout = () => {
    if (window.confirm(lang === 'fa' ? 'آیا مایل به خروج از حساب پزشک هستید؟' : 'Exit doctor session?')) {
      clearSession();
      setSession(null);
      window.dispatchEvent(new Event('auth_state_changed'));
      window.location.href = '/';
    }
  };

  const navLinks = [
    { to: '/', label: t('nav_home') },
    { to: '/about', label: t('nav_about') },
    { to: '/services', label: t('nav_services') },
    { to: '/visits', label: t('nav_visits') },
    { to: '/blog', label: t('nav_blog') },
    { to: '/testimonials', label: t('nav_testimonials') },
    { to: '/contact', label: t('nav_contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/80 shadow-xs py-2 sm:py-2.5'
          : 'bg-background/85 backdrop-blur-sm border-b border-border/50 py-2.5 sm:py-3.5'
      }`}
    >
      {/* Strict Max Width Fluid Container with zero horizontal overflow */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
          
          {/* 1. BRAND LOGO & DOCTOR TITLE */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group shrink-0 select-none min-w-0"
            title={t('brand_name')}
          >
            <BrandLogo size="sm" showPulse={false} className="group-hover:scale-105 transition-transform duration-200 shrink-0" />
            
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 leading-tight">
              <span className="font-heading font-bold text-foreground text-xs sm:text-sm lg:text-[15px] tracking-tight group-hover:text-primary transition-colors whitespace-nowrap">
                {t('brand_name')}
              </span>
              <span className="hidden xl:inline text-muted-foreground/60 text-xs">|</span>
              <span className="hidden xl:inline text-[11px] text-muted-foreground font-medium whitespace-nowrap">
                {lang === 'fa' ? 'متخصص اعصاب و روان' : 'Psychiatrist (M.D.)'}
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION (Visible on large screens, perfectly spaced) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-card/90 px-2 py-1 rounded-full border border-border/60 shadow-2xs backdrop-blur-md shrink-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-2 xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] font-medium transition-all duration-150 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-primary/15 text-primary border border-primary/30 font-semibold shadow-2xs'
                      : 'text-foreground/80 hover:text-primary hover:bg-accent/40 border border-transparent'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* 3. ACTION BUTTONS & CONTROLS */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Animated Dynamic Theme Switcher with Circular Wave Effect */}
            <ThemeToggle size="sm" />

            {/* Language Switcher Button */}
            <button
              onClick={toggleLang}
              aria-label="Switch language"
              title={lang === 'fa' ? "Switch to English" : "تغییر به فارسی"}
              className="h-8 px-2.5 rounded-full text-xs font-semibold border border-border/70 bg-card/80 hover:bg-accent/50 text-foreground/85 hover:text-primary transition-all flex items-center gap-1 shadow-2xs shrink-0 whitespace-nowrap cursor-pointer"
            >
              <Globe className="w-3 h-3 text-primary shrink-0" />
              <span>{lang === 'fa' ? 'EN' : 'فا'}</span>
            </button>

            {/* Direct Phone Line (Hidden on smaller screens to prevent overcrowding) */}
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden 2xl:inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-medium text-foreground/85 bg-card/80 border border-border/70 hover:border-primary/40 hover:text-primary transition-all shadow-2xs shrink-0 whitespace-nowrap font-mono"
              dir="ltr"
              title={t('phone_label')}
            >
              <Phone className="w-3 h-3 text-primary" />
              <span>{PHONE}</span>
            </a>

            {/* DOCTOR LOGGED-IN ACTIONS vs PATIENT ACTIONS */}
            {isDoctorOrAdmin ? (
              <>
                {/* Doctor Appointments & Hub Link */}
                <Link
                  to="/admin"
                  title={lang === 'fa' ? 'میز کار و مدیریت نوبت‌های بیماران' : 'Doctor Appointments Hub'}
                  className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-bold border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 transition-all shrink-0"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-[11px] font-bold">{lang === 'fa' ? 'میز کار نوبت‌ها' : 'Doctor Hub'}</span>
                </Link>

                {/* Doctor Admin Dashboard CTA */}
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 h-8 px-3 sm:px-4 rounded-full text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/20 shadow-xs hover:shadow-sm transition-all active:scale-95 shrink-0 whitespace-nowrap"
                  title={lang === 'fa' ? 'ورود به پنل جامع مدیریت کلینیک' : 'Doctor Admin Dashboard'}
                >
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
                  <span>{lang === 'fa' ? 'پنل مدیریت کلینیک' : 'Doctor Admin'}</span>
                </Link>

                {/* Fast Doctor Logout Button */}
                <button
                  type="button"
                  onClick={handleDoctorLogout}
                  title={lang === 'fa' ? 'خروج از حساب پزشک' : 'Exit Doctor Session'}
                  className="hidden md:inline-flex items-center justify-center h-8 w-8 rounded-full border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                {/* Patient Portal Link (نوبت‌های من) */}
                <Link
                  to="/panel"
                  title={lang === 'fa' ? 'پیگیری نوبت‌ها و پرونده مراجع' : 'Patient Appointments'}
                  className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-semibold border border-border/70 bg-card/80 hover:bg-accent/40 text-foreground/85 hover:text-primary transition-all shrink-0"
                >
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[11px] font-bold">{lang === 'fa' ? 'نوبت‌های من' : 'My Visits'}</span>
                </Link>

                {/* Prominent Booking CTA Button */}
                <Link
                  to="/panel"
                  className="inline-flex items-center gap-1.5 h-8 px-3 sm:px-4 rounded-full text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/20 shadow-xs hover:shadow-sm transition-all active:scale-95 shrink-0 whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{t('book_now')}</span>
                </Link>
              </>
            )}

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden w-8 h-8 rounded-full bg-card/80 border border-border/70 text-foreground hover:text-primary flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>
      </div>

      {/* MOBILE & TABLET DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 w-full z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div 
            className="fixed inset-0 top-[52px] bg-charcoal/40 backdrop-blur-xs transition-opacity -z-10"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="bg-background/98 backdrop-blur-xl border-b border-border/70 shadow-2xl px-4 sm:px-6 py-4 overflow-y-auto max-h-[80vh] space-y-3">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary/15 text-primary border border-primary/30 font-semibold'
                        : 'text-foreground/85 hover:bg-accent/40'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="pt-3 mt-2 border-t border-border/60 flex flex-col gap-2">
                {isDoctorOrAdmin ? (
                  /* Doctor Mobile Drawer Options */
                  <div className="space-y-2">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <div>
                          <p className="text-xs font-bold text-foreground">{lang === 'fa' ? 'دکتر فاطمه مومنی' : 'Dr. Fatemeh Momeni'}</p>
                          <p className="text-[10px] text-muted-foreground">{lang === 'fa' ? 'پنل مدیریت کلینیک فعال است' : 'Doctor Admin Active'}</p>
                        </div>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    </div>

                    <Link
                      to="/admin"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-xs"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{lang === 'fa' ? 'میز کار و نوبت‌های پزشک' : 'Doctor Admin Dashboard'}</span>
                    </Link>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/blog"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-card border border-border text-xs font-semibold text-foreground hover:text-primary"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                        <span>{lang === 'fa' ? 'مدیریت مقالات' : 'Manage Blog'}</span>
                      </Link>

                      <Link
                        to="/testimonials"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-card border border-border text-xs font-semibold text-foreground hover:text-primary"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
                        <span>{lang === 'fa' ? 'نظرات مراجعین' : 'Manage Reviews'}</span>
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={handleDoctorLogout}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-400 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{lang === 'fa' ? 'خروج از حساب پزشک' : 'Logout Doctor Account'}</span>
                    </button>
                  </div>
                ) : (
                  /* Patient / Guest Mobile Drawer Options */
                  <>
                    <Link
                      to="/panel"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-xs"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{t('book_now')}</span>
                    </Link>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/panel"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-card border border-border text-xs font-semibold text-foreground hover:text-primary"
                      >
                        <User className="w-3.5 h-3.5 text-primary" />
                        <span>{lang === 'fa' ? 'نوبت‌های من' : 'My Visits'}</span>
                      </Link>

                      <Link
                        to="/admin"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-card border border-border text-xs font-semibold text-foreground hover:text-primary"
                      >
                        <Lock className="w-3.5 h-3.5 text-primary" />
                        <span>{lang === 'fa' ? 'پنل پزشک' : 'Doctor Portal'}</span>
                      </Link>
                    </div>
                  </>
                )}

                {/* Mobile Controls: Theme & Language Row */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/70 mt-1">
                  <div className="flex items-center gap-2">
                    <ThemeToggle size="sm" />
                    <span className="text-xs font-medium text-foreground">
                      {lang === 'fa' ? 'تغییر پوسته (شب / روز)' : 'Theme Mode'}
                    </span>
                  </div>

                  <button
                    onClick={toggleLang}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent/60 text-primary border border-primary/20 flex items-center gap-1"
                  >
                    <Globe className="w-3 h-3" />
                    <span>{lang === 'fa' ? 'English' : 'فارسی'}</span>
                  </button>
                </div>

                {/* Direct Phone Call */}
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-card border border-border/60 text-foreground text-xs font-medium font-mono"
                  dir="ltr"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>{PHONE}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
