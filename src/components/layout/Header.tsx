/**
 * @fileoverview Main Responsive Header Component
 * @description Provides primary navigation, brand identity, quick actions,
 *              theme & language toggles, and mobile drawer menu with background scroll-lock.
 *
 * @architecture
 * - Mobile-first design: simplified header on < sm viewports (Logo, Theme, Lang, Hamburger only)
 * - Scroll-lock body effect when mobile drawer is open
 * - Smooth 300ms animations and logical CSS properties
 *
 * @author Mohammad Hossein (Lead Developer)
 * @version 2.2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Phone,
  Calendar,
  Menu,
  X,
  Globe,
  ShieldCheck,
  Instagram
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { PHONE, PHONE_TEL, INSTAGRAM_URL } from '../../lib/siteConstants';
import { BrandLogo } from '../site/BrandLogo';
import { ThemeToggle } from '../site/ThemeToggle';
import { getActiveSession } from '../../lib/appointmentStore';
import { UserSession } from '../../types';

/**
 * Main application header component with responsive desktop navigation
 * and full-screen mobile slide-down drawer.
 */
export const Header: React.FC = () => {
  const { t, lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<UserSession | null>(() => getActiveSession());
  const location = useLocation();

  const isDoctorOrAdmin = session?.role === 'doctor_admin';

  // Listen to auth changes in real-time
  useEffect(() => {
    const syncSession = () => setSession(getActiveSession());
    window.addEventListener('storage', syncSession);
    window.addEventListener('auth_state_changed', syncSession);
    const interval = setInterval(syncSession, 1200);

    return () => {
      window.removeEventListener('storage', syncSession);
      window.removeEventListener('auth_state_changed', syncSession);
      clearInterval(interval);
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

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
      className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/80 shadow-xs py-2 sm:py-2.5'
          : 'bg-background/85 backdrop-blur-sm border-b border-border/50 py-2.5 sm:py-3.5'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">

          {/* 1. BRAND LOGO & DOCTOR TITLE */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 group shrink-0 select-none min-w-0 min-h-[44px]"
            title={t('brand_name')}
          >
            <BrandLogo size="sm" showPulse={false} className="group-hover:scale-105 transition-transform duration-300 shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 leading-tight">
              <span className="font-heading font-bold text-foreground text-xs sm:text-sm lg:text-[15px] tracking-tight group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
                {t('brand_name')}
              </span>
              <span className="hidden xl:inline text-muted-foreground/60 text-xs">|</span>
              <span className="hidden xl:inline text-[11px] text-muted-foreground font-medium whitespace-nowrap">
                {lang === 'fa' ? 'متخصص اعصاب و روان' : 'Psychiatrist (M.D.)'}
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-card/90 px-2 py-1 rounded-full border border-border/60 shadow-2xs backdrop-blur-md shrink-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] font-medium transition-all duration-300 whitespace-nowrap shrink-0 ${
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
          {/* Mobile view (< sm): Shows ONLY Brand, Theme Toggle, Language Toggle, and Hamburger Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

            {/* Theme Toggle - Always visible */}
            <div className="flex items-center justify-center min-h-[44px] min-w-[44px]">
              <ThemeToggle size="sm" />
            </div>

            {/* Language Switcher - Always visible */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label="Switch language"
              title={lang === 'fa' ? "Switch to English" : "تغییر به فارسی"}
              className="min-h-[44px] px-2.5 sm:px-3 rounded-full text-xs font-semibold border border-border/70 bg-card/90 hover:bg-accent/60 text-foreground/85 hover:text-primary active:scale-95 active:bg-muted transition-all duration-300 flex items-center gap-1 shadow-2xs shrink-0 whitespace-nowrap cursor-pointer select-none"
            >
              <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{lang === 'fa' ? 'EN' : 'فا'}</span>
            </button>

            {/* Instagram - Hidden on mobile (< sm) to prevent clutter */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('social_instagram')}
              title={t('social_instagram')}
              className="hidden sm:flex min-h-[44px] min-w-[44px] w-9 h-9 rounded-full border border-border/70 bg-card/80 items-center justify-center text-foreground/70 hover:text-pink-600 hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xs shrink-0 cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>

            {/* Phone - Only visible on wide desktop */}
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden 2xl:inline-flex items-center gap-1.5 min-h-[44px] px-3.5 rounded-full text-xs font-medium text-foreground/85 bg-card/80 border border-border/70 hover:border-primary/40 hover:text-primary transition-all duration-300 shadow-2xs shrink-0 whitespace-nowrap font-mono"
              dir="ltr"
              title={t('phone_label')}
            >
              <Phone className="w-3 h-3 text-primary" />
              <span>{PHONE}</span>
            </a>

            {/* SMART CTA: Admin vs Patient - Hidden on mobile (< sm), accessible inside drawer */}
            {isDoctorOrAdmin ? (
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 min-h-[44px] px-3.5 sm:px-4 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500/20 shadow-xs hover:shadow-sm transition-all duration-300 active:scale-95 shrink-0 whitespace-nowrap"
                title="Doctor Admin Dashboard"
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>{lang === 'fa' ? 'پنل مدیریت' : 'Admin'}</span>
              </Link>
            ) : (
              <Link
                to="/booking?type=online"
                className="hidden sm:inline-flex items-center gap-1.5 min-h-[44px] px-3.5 sm:px-4 rounded-full text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/20 shadow-xs hover:shadow-sm transition-all duration-300 active:scale-95 shrink-0 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>{t('book_now')}</span>
              </Link>
            )}

            {/* HAMBURGER MENU BUTTON */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              className="lg:hidden min-h-[44px] min-w-[44px] w-11 h-11 rounded-full bg-card/90 border border-border/80 text-foreground hover:text-primary active:scale-95 active:bg-muted flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 shadow-2xs"
            >
              {isOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET SLIDE-DOWN DRAWER */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full w-full z-50 animate-in fade-in slide-in-from-top-4 duration-300 ease-in-out">
          {/* Backdrop with click-to-close */}
          <div
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity duration-300 -z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="bg-background/98 backdrop-blur-xl border-b border-border/80 shadow-2xl px-4 sm:px-6 py-5 overflow-y-auto custom-scrollbar max-h-[85vh] space-y-4">
            {/* Nav links */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `min-h-[48px] px-4 py-3 rounded-xl text-sm sm:text-base font-medium flex items-center transition-all duration-300 active:bg-muted active:scale-[0.99] ${
                      isActive
                        ? 'bg-primary/15 text-primary border border-primary/30 font-bold shadow-2xs'
                        : 'text-foreground/85 hover:bg-accent/40 hover:text-primary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Quick Actions in Mobile Drawer */}
            <div className="pt-3 border-t border-border/60 flex flex-col gap-2.5">
              {isDoctorOrAdmin ? (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold shadow-xs active:scale-[0.99] transition-all duration-300"
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{lang === 'fa' ? 'پنل مدیریت کلینیک' : 'Admin Dashboard'}</span>
                </Link>
              ) : (
                <Link
                  to="/booking?type=online"
                  onClick={() => setIsOpen(false)}
                  className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-xs active:scale-[0.99] transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{t('book_now')}</span>
                </Link>
              )}

              {/* Instagram shortcut */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border/70 text-foreground/80 hover:text-pink-600 active:bg-muted active:scale-[0.99] text-xs font-semibold transition-all duration-300"
              >
                <Instagram className="w-4 h-4 text-pink-600 shrink-0" />
                <span>{t('social_instagram')}</span>
              </a>

              {/* Direct phone call button */}
              <a
                href={`tel:${PHONE_TEL}`}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-border/70 text-foreground active:bg-muted active:scale-[0.99] text-xs font-semibold font-mono transition-all duration-300"
                dir="ltr"
              >
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>{PHONE}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
