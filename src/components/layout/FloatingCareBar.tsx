import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MessageCircle, 
  X, 
  Copy, 
  Check, 
  Clock, 
  Building2, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  Award
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { 
  PHONE, 
  PHONE_TEL, 
  WHATSAPP_URL, 
  HOSPITAL_CENTRAL_PHONE, 
  HOSPITAL_CENTRAL_PHONE_FA,
  HOSPITAL_NAME_FA,
  HOSPITAL_NAME_EN,
  DOCTOR_NIKAN_URL,
  MEDICAL_COUNCIL_FA,
  MEDICAL_COUNCIL_CODE
} from '../../lib/siteConstants';

export const FloatingCareBar: React.FC = () => {
  const { t, lang, isRTL } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Visible after scrolling 200px
      setVisible(window.scrollY > 200);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PHONE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-4 sm:bottom-5 end-3 sm:end-6 z-40 transition-all duration-500 ease-out ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      {/* Expanded Concierge Call Panel */}
      {expanded && (
        <div className="mb-2.5 w-76 sm:w-84 rounded-2xl bg-card/95 backdrop-blur-xl border border-primary/25 shadow-xl p-4 space-y-3.5 animate-in fade-in zoom-in-95 duration-200 text-foreground">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-border/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-heading text-foreground">
                  {lang === 'fa' ? 'هماهنگی و مشاوره نوبت' : 'Concierge Booking & Call'}
                </h4>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{lang === 'fa' ? 'پاسخگویی در ساعات کاری' : 'Active during clinic hours'}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="p-1 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="بستن"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Primary Doctor Phone Dial Box */}
          <div className="p-3 rounded-xl bg-accent/40 border border-border/80 flex items-center justify-between gap-2.5">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                {lang === 'fa' ? 'شماره مستقیم مطب دکتر مومنی' : 'Dr. Momeni Direct Line'}
              </span>
              <a
                href={`tel:${PHONE_TEL}`}
                className="text-sm sm:text-base font-bold font-mono text-primary hover:underline mt-0.5 block"
                dir="ltr"
              >
                {PHONE}
              </a>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyPhone}
                className="w-8 h-8 rounded-lg bg-card border border-border text-foreground hover:text-primary transition-colors flex items-center justify-center"
                title={lang === 'fa' ? 'کپی شماره' : 'Copy Number'}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
              >
                <Phone className="w-3 h-3 fill-current" />
                <span>{lang === 'fa' ? 'تماس' : 'Call'}</span>
              </a>
            </div>
          </div>

          {/* Quick WhatsApp Message Option */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between h-9 px-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] dark:text-emerald-400 hover:bg-[#25D366] hover:text-white transition-all text-xs font-semibold group shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'ارسال پیام در واتس‌اپ' : 'Chat on WhatsApp'}</span>
            </div>
            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
          </a>

          {/* Hospital Info & Verification */}
          <div className="pt-2 border-t border-border/50 text-[10px] sm:text-[11px] text-muted-foreground space-y-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3 text-primary" />
                <span>{lang === 'fa' ? HOSPITAL_NAME_FA : HOSPITAL_NAME_EN}</span>
              </span>
              <a href={`tel:${HOSPITAL_CENTRAL_PHONE}`} className="font-mono font-semibold text-foreground hover:text-primary" dir="ltr">
                {HOSPITAL_CENTRAL_PHONE_FA}
              </a>
            </div>

            <div className="flex items-center justify-between text-[10px]">
              <span className="flex items-center gap-1">
                <Award className="w-3 h-3 text-primary" />
                <span>{lang === 'fa' ? `نظام پزشکی: ${MEDICAL_COUNCIL_FA}` : `MC Reg: ${MEDICAL_COUNCIL_CODE}`}</span>
              </span>
              <a
                href={DOCTOR_NIKAN_URL}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-0.5"
              >
                <span>{lang === 'fa' ? 'پروفایل نیکان' : 'Nikan'}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

        </div>
      )}

      {/* Floating Action Trigger Bar */}
      <div className="flex items-center gap-1.5 p-1 rounded-full glass border border-primary/30 shadow-xl backdrop-blur-md">
        
        {/* WhatsApp Fast Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label={t('whatsapp')}
          className="group relative w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
          
          {/* Tooltip */}
          <span className="absolute -top-8 px-2 py-0.5 rounded-md bg-foreground/90 text-background text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
            {t('whatsapp')}
          </span>
        </a>

        {/* VIP Hotline Toggle / Call Trigger */}
        <button
          onClick={() => setExpanded(!expanded)}
          aria-label={t('call_direct')}
          className={`group relative flex items-center gap-1.5 px-3 h-10 rounded-full bg-primary text-primary-foreground shadow-md btn-soft-glow transition-all duration-300 hover:scale-105 active:scale-95 ${
            expanded ? 'ring-2 ring-primary/50' : 'animate-pulse-ring'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Phone className="w-4 h-4 fill-current" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
          </div>

          <span className="text-xs font-bold font-mono tracking-wide hidden sm:inline" dir="ltr">
            {PHONE}
          </span>
          <span className="text-xs font-bold sm:hidden">
            {lang === 'fa' ? 'تماس' : 'Call'}
          </span>
        </button>

      </div>
    </div>
  );
};

