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
  Car
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { 
  PHONE, 
  PHONE_TEL, 
  WHATSAPP_URL, 
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
  HOSPITAL_CENTRAL_PHONE,
  PARKING_NAME_FA,
  PARKING_NAME_EN
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

  const quickNav = [
    { to: '/', label: t('nav_home') },
    { to: '/about', label: t('nav_about') },
    { to: '/services', label: t('nav_services') },
    { to: '/visits', label: t('nav_visits') },
    { to: '/blog', label: t('nav_blog') },
    { to: '/testimonials', label: t('nav_testimonials') },
    { to: '/contact', label: t('nav_contact') },
    { to: '/panel', label: t('nav_panel') },
    { to: '/admin', label: lang === 'fa' ? 'پنل مدیریت پزشک (تایید/لغو نوبت‌ها)' : 'Doctor Management Portal' }
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
          
          {/* Col 1: Brand, Credentials & Direct CTAs (lg:col-span-4) */}
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
                <Link
                  to="/panel"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t('book_now')}</span>
                </Link>

                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-card border border-primary/30 text-primary hover:bg-accent/40 text-xs font-semibold transition-all shadow-2xs"
                  dir="ltr"
                  title="تماس با مطب"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>{PHONE}</span>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t('whatsapp')}</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={DOCTOR_NIKAN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold hover:bg-primary hover:text-primary-foreground transition-all shadow-2xs"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'پروفایل پزشک در سایت نیکان' : 'Doctor Profile at Nikan'}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <a
                  href={HOSPITAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-foreground/80 border border-border text-[11px] font-medium hover:text-primary hover:border-primary/40 transition-all"
                >
                  <span>{lang === 'fa' ? 'وب‌سایت بیمارستان' : 'Hospital Site'}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Clinical Services (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-foreground text-xs sm:text-sm tracking-wide flex items-center gap-1.5 pb-1 border-b border-border/40">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>{t('footer_services_title')}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {serviceLinks.map((srv) => (
                <li key={srv.key}>
                  <Link 
                    to="/services" 
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 py-0.5 group"
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

          {/* Col 3: Quick Navigation (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-foreground text-xs sm:text-sm tracking-wide pb-1 border-b border-border/40">
              {t('footer_quick')}
            </h4>
            <ul className="space-y-2 text-xs">
              {quickNav.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 py-0.5 group"
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

          {/* Col 4: Location & Multi-App Directions (lg:col-span-3) */}
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
                <div className="flex items-center gap-1 mt-1 text-[11px] text-primary font-medium">
                  <Car className="w-3 h-3 shrink-0" />
                  <span>{lang === 'fa' ? PARKING_NAME_FA : PARKING_NAME_EN}</span>
                </div>
                
                {/* Fast App Jump Links */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/80 hover:bg-primary hover:text-primary-foreground text-[10px] font-semibold transition-colors"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                  <a
                    href={WAZE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/80 hover:bg-primary hover:text-primary-foreground text-[10px] font-semibold transition-colors"
                  >
                    <span>Waze</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                  <a
                    href={NESHAN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/80 hover:bg-primary hover:text-primary-foreground text-[10px] font-semibold transition-colors"
                  >
                    <span>{lang === 'fa' ? 'نشان' : 'Neshan'}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                  <a
                    href={BALAD_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/80 hover:bg-primary hover:text-primary-foreground text-[10px] font-semibold transition-colors"
                  >
                    <span>{lang === 'fa' ? 'بلد' : 'Balad'}</span>
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
                {HOSPITAL_CENTRAL_PHONE_FA}
              </a>
            </div>

            {/* Privacy Note */}
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-2 border-t border-border/40">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span className="leading-tight">{t('footer_privacy_note')}</span>
            </div>
          </div>

        </div>

        {/* 3. Bottom Copyright & Medical Ethics Bar */}
        <div className="mt-10 pt-5 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="text-center sm:text-start">{t('footer_rights')}</p>
          <div className="flex items-center gap-2 font-medium">
            <HeartHandshake className="w-3.5 h-3.5 text-primary" />
            <span>{t('made_with')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
