import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  MessageCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2,
  Calendar,
  HeartHandshake,
  Code2,
  Instagram
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { AppImage } from '../ui/AppImage';
import {
  PHONE,
  PHONE_TEL,
  WHATSAPP_URL,
  INSTAGRAM_URL,
  ADDRESS_FA,
  ADDRESS_EN,
  GOOGLE_MAPS_URL,
  WAZE_URL,
  NESHAN_URL,
  BALAD_URL,
  HOSPITAL_URL,
  DOCTOR_NIKAN_URL,
  MEDICAL_COUNCIL_FA,
  MEDICAL_COUNCIL_CODE,
  HOSPITAL_CENTRAL_PHONE_FA,
  HOSPITAL_CENTRAL_PHONE
} from '../../lib/siteConstants';
import { BrandLogo } from '../site/BrandLogo';

export const Footer: React.FC = () => {
  const { t, lang, isRTL } = useLanguage();

  const serviceLinks = [
    { label: lang === 'fa' ? 'درمان افسردگی و دوقطبی' : 'Depression & Bipolar', key: 'depression' },
    { label: lang === 'fa' ? 'اختلالات اضطرابی و وسواسی' : 'Anxiety & OCD', key: 'anxiety' },
    { label: lang === 'fa' ? 'اختلال شناختی و سالمندان (آلزایمر)' : 'Cognitive & Geriatric', key: 'cognitive' },
    { label: lang === 'fa' ? 'کودک و نوجوان (بیش‌فعالی، اوتیسم)' : 'Child & Adolescent', key: 'child' },
    { label: lang === 'fa' ? 'درمان‌های غیردارویی (EEG، QEEG، rTMS)' : 'EEG, QEEG & rTMS', key: 'non_pharma' },
    { label: lang === 'fa' ? 'روان‌درمانی فردی و زوج‌درمانی' : 'Psychotherapy & Couples', key: 'psychotherapy' }
  ];

  // ─── Cleaned Quick Navigation ────────────────
  const quickNav = [
    { to: '/', label: t('nav_home') },
    { to: '/about', label: t('nav_about') },
    { to: '/services', label: t('nav_services') },
    { to: '/visits', label: t('nav_visits') },
    { to: '/blog', label: t('nav_blog') },
    { to: '/testimonials', label: t('nav_testimonials') },
    { to: '/contact', label: t('nav_contact') },
    { to: '/developer', label: lang === 'fa' ? 'توسعه‌دهنده و سفارش سامانه: محمدحسین' : 'Developer & Systems Architecture: Mohammad Hussein' }
  ];

  return (
    <footer className="bg-card/95 border-t border-border/60 transition-colors duration-300 mt-auto">
    {/* 1. Top Clinical Trust & Verification Ribbon */}
    <div className="border-b border-border/40 bg-accent/25 py-3">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
    <div className="flex items-center gap-2 font-medium">
    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
    <span className="text-foreground/90 font-semibold">{t('cities_exp')}</span>
    </div>
    <div className="flex flex-wrap items-center gap-3 sm:gap-5">
    <span className="inline-flex items-center gap-1.5 text-primary font-semibold">
    <Award className="w-4 h-4" />
    <span>{lang === 'fa' ? `کد نظام پزشکی: ${MEDICAL_COUNCIL_FA}` : `MC Reg: ${MEDICAL_COUNCIL_CODE}`}</span>
    </span>
    <span className="hidden sm:inline text-border">|</span>
    <a
    href={DOCTOR_NIKAN_URL}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-1.5 text-foreground hover:text-primary font-medium transition-colors"
    >
    <Building2 className="w-4 h-4 text-primary" />
    <span>{lang === 'fa' ? 'بیمارستان نیکان غرب تهران' : 'Nikan Gharb Hospital'}</span>
    <ExternalLink className="w-3 h-3 opacity-70" />
    </a>
    </div>
    </div>
    </div>

    {/* 2. Main Footer Grid */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

    {/* Col 1: Brand, Credentials & Direct CTAs */}
    <div className="lg:col-span-4 space-y-4">
    <div>
    <Link to="/" className="inline-flex items-center gap-3 group mb-3">
    <BrandLogo size="md" />
    <div>
    <h3 className="font-heading font-bold text-foreground text-base sm:text-lg leading-tight group-hover:text-primary transition-colors">
    {t('brand_name')}
    </h3>
    <p className="text-xs text-muted-foreground font-medium mt-0.5">
    {t('brand_role')}
    </p>
    </div>
    </Link>

    <p className="text-muted-foreground text-xs leading-relaxed text-justify mt-2 max-w-sm">
    {t('footer_about')}
    </p>
    </div>

    {/* Quick Action Buttons */}
    <div className="space-y-2.5 pt-2">
    <div className="flex flex-wrap items-center gap-2">
    {/* Updated to point directly to the smart booking system */}
    <Link
    to="/booking?type=online"
    className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 active:scale-95 transition-all duration-300 ease-in-out shadow-xs"
    >
    <Calendar className="w-3.5 h-3.5 shrink-0" />
    <span>{t('book_now')}</span>
    </Link>

    <a
    href={`tel:${PHONE_TEL}`}
    className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border border-primary/30 text-primary hover:bg-accent/40 active:scale-95 text-xs font-semibold transition-all duration-300 ease-in-out shadow-2xs"
    dir="ltr"
    title={lang === 'fa' ? 'تماس با مطب' : 'Call Clinic'}
    >
    <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
    <span>{PHONE}</span>
    </a>

    <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600 hover:text-white active:scale-95 transition-all duration-300 ease-in-out shadow-2xs"
    >
    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
    <span>{t('whatsapp')}</span>
    </a>

    <a
    href={INSTAGRAM_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border border-border/70 text-foreground/80 hover:text-pink-600 active:scale-95 hover:scale-105 transition-all duration-300 ease-in-out text-xs font-semibold shadow-2xs"
    title={t('social_instagram')}
    >
    <Instagram className="w-3.5 h-3.5 text-pink-600 shrink-0" />
    <span>{lang === 'fa' ? 'اینستاگرام' : 'Instagram'}</span>
    </a>
    </div>

    <div className="flex flex-wrap items-center gap-2 pt-1">
    <a
    href={DOCTOR_NIKAN_URL}
    target="_blank"
    rel="noreferrer"
    className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-300 ease-in-out shadow-2xs"
    >
    <Building2 className="w-3.5 h-3.5 shrink-0" />
    <span>{lang === 'fa' ? 'پروفایل پزشک در سایت نیکان' : 'Doctor Profile at Nikan'}</span>
    <ExternalLink className="w-3 h-3 opacity-70 shrink-0" />
    </a>

    <a
    href={HOSPITAL_URL}
    target="_blank"
    rel="noreferrer"
    className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-foreground/80 border border-border text-[11px] font-medium hover:text-primary hover:border-primary/40 active:scale-95 transition-all duration-300 ease-in-out"
    >
    <span>{lang === 'fa' ? 'وب‌سایت بیمارستان' : 'Hospital Site'}</span>
    <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
    </a>
    </div>
    </div>
    </div>

    {/* Col 2: Clinical Services */}
    <div className="lg:col-span-3 space-y-3">
    <h4 className="font-heading font-bold text-foreground text-xs sm:text-sm tracking-wide flex items-center gap-1.5 pb-1 border-b border-border/40">
    <Sparkles className="w-4 h-4 text-primary shrink-0" />
    <span>{t('footer_services_title')}</span>
    </h4>
    <ul className="space-y-1 text-xs">
    {serviceLinks.map((srv) => (
      <li key={srv.key}>
      <Link
      to="/services"
      className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1.5 py-1.5 group"
      >
      {isRTL ? (
        <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary group-hover:-translate-x-0.5 transition-transform shrink-0" />
      ) : (
        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-transform shrink-0" />
      )}
      <span className="truncate">{srv.label}</span>
      </Link>
      </li>
    ))}
    </ul>
    </div>

    {/* Col 3: Quick Navigation */}
    <div className="lg:col-span-2 space-y-3">
    <h4 className="font-heading font-bold text-foreground text-xs sm:text-sm tracking-wide pb-1 border-b border-border/40">
    {t('footer_quick')}
    </h4>
    <ul className="space-y-1 text-xs">
    {quickNav.map((link) => (
      <li key={link.to}>
      <Link
      to={link.to}
      className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1.5 py-1.5 group"
      >
      {isRTL ? (
        <ChevronLeft className="w-3 h-3 text-muted-foreground/40 group-hover:text-primary group-hover:-translate-x-0.5 transition-transform shrink-0" />
      ) : (
        <ChevronRight className="w-3 h-3 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-transform shrink-0" />
      )}
      <span>{link.label}</span>
      </Link>
      </li>
    ))}
    </ul>
    </div>

    {/* Col 4: Location & Multi-App Directions */}
    <div className="lg:col-span-3 space-y-3">
    <h4 className="font-heading font-bold text-foreground text-xs sm:text-sm tracking-wide pb-1 border-b border-border/40">
    {t('footer_contact')}
    </h4>

    {/* Address */}
    <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
    <div>
    <p className="leading-snug text-foreground/90 font-medium">
    {lang === 'fa' ? ADDRESS_FA : ADDRESS_EN}
    </p>

    {/* Fast App Jump Links */}
    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
    <a
    href={NESHAN_URL}
    target="_blank"
    rel="noreferrer"
    className="min-h-[36px] inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:scale-95 text-[11px] font-bold transition-all duration-200 shadow-2xs"
    >
    <span>{lang === 'fa' ? 'نشان' : 'Neshan'}</span>
    <ExternalLink className="w-2.5 h-2.5 opacity-80" />
    </a>
    <a
    href={BALAD_URL}
    target="_blank"
    rel="noreferrer"
    className="min-h-[36px] inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted/80 hover:bg-primary hover:text-primary-foreground active:scale-95 text-[11px] font-semibold transition-all duration-200"
    >
    <span>{lang === 'fa' ? 'بلد' : 'Balad'}</span>
    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
    </a>
    <a
    href={GOOGLE_MAPS_URL}
    target="_blank"
    rel="noreferrer"
    className="min-h-[36px] inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted/80 hover:bg-primary hover:text-primary-foreground active:scale-95 text-[11px] font-semibold transition-all duration-200"
    >
    <span>Maps</span>
    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
    </a>
    <a
    href={WAZE_URL}
    target="_blank"
    rel="noreferrer"
    className="min-h-[36px] inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted/80 hover:bg-primary hover:text-primary-foreground active:scale-95 text-[11px] font-semibold transition-all duration-200"
    >
    <span>Waze</span>
    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
    </a>
    </div>
    </div>
    </div>

    {/* Hospital Central & Clinic Hours */}
    <div className="flex items-center gap-2.5 text-xs text-muted-foreground pt-1">
    <Clock className="w-4 h-4 text-primary shrink-0" />
    <span>{t('contact_hours_val')}</span>
    </div>

    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
    <span className="flex items-center gap-1.5">
    <Building2 className="w-3.5 h-3.5 text-primary" />
    <span>{lang === 'fa' ? 'تلفن بیمارستان:' : 'Hospital Central:'}</span>
    </span>
    <a href={`tel:${HOSPITAL_CENTRAL_PHONE}`} className="font-semibold text-foreground hover:text-primary" dir="ltr">
    {lang === 'fa' ? HOSPITAL_CENTRAL_PHONE_FA : HOSPITAL_CENTRAL_PHONE}
    </a>
    </div>

    {/* Privacy Note */}
    <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-2 border-t border-border/40">
    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
    <span className="leading-tight">{t('footer_privacy_note')}</span>
    </div>
    </div>

    </div>

    {/* 3. Bottom Copyright & Developer Signature Bar */}
    <div className="mt-12 pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-muted-foreground">
    <p className="text-center md:text-start order-2 md:order-1">{t('footer_rights')}</p>

    {/* Subtle & Prestigious Developer Signature Shortcut Badge */}
    <div className="order-1 md:order-2 flex justify-center">
    <Link
    to="/developer"
    className="footer-dev-badge-wrap group relative min-h-[44px] inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-card/95 hover:bg-card border border-border/80 text-foreground transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-xs hover:shadow-md cursor-pointer select-none"
    title={lang === 'fa' ? 'مشاهده معماری فنی، مشخصات مهندسی و پورتفولیو محمدحسین' : 'View Senior Engineering Architecture & Portfolio'}
    >
    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-primary/40 bg-card shrink-0 shadow-2xs">
    <AppImage
    src="/developer.jpg"
    alt={lang === 'fa' ? 'محمدحسین - مهندس ارشد نرم‌افزار و توسعه‌دهنده سامانه' : 'Mohammad Hussein - Senior Full-Stack Engineer'}
    width={24}
    height={24}
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
    loading="lazy"
    fallbackText=""
    />
    <Code2 className="w-3.5 h-3.5 text-primary absolute inset-0 m-auto -z-1" />
    </div>

    <span className="relative flex h-2 w-2 shrink-0">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>

    <div className="flex items-center gap-1.5 text-[11px]">
    <span className="text-muted-foreground">
    {lang === 'fa' ? 'توسعه‌دهنده و سفارش سامانه:' : 'Developer & Systems Architecture:'}
    </span>
    <span className="font-bold text-foreground group-hover:text-primary transition-colors">
    {lang === 'fa' ? 'محمدحسین' : 'Mohammad Hussein'}
    </span>
    </div>

    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-foreground border border-primary/20 text-[10px] font-semibold transition-all">
    <span>{lang === 'fa' ? 'پورتفولیو' : 'Portfolio'}</span>
    <Sparkles className="w-2.5 h-2.5" />
    </span>
    </Link>
    </div>

    <div className="flex items-center gap-2 font-medium order-3">
    <HeartHandshake className="w-3.5 h-3.5 text-primary" />
    <span>{t('made_with')}</span>
    </div>
    </div>
    </div>
    </footer>
  );
};

export default Footer;
