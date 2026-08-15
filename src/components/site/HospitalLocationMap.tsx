import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Copy, 
  Check, 
  Car, 
  Phone, 
  Building2, 
  ShieldCheck, 
  Compass, 
  Sparkles,
  Award
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { 
  HOSPITAL_NAME_FA, 
  HOSPITAL_NAME_EN, 
  ADDRESS_FA, 
  ADDRESS_EN, 
  ADDRESS_EXACT_HINT_FA,
  ADDRESS_EXACT_HINT_EN,
  LATITUDE, 
  LONGITUDE, 
  GOOGLE_MAPS_URL, 
  WAZE_URL, 
  NESHAN_URL, 
  BALAD_URL, 
  APPLE_MAPS_URL,
  OSM_EMBED_URL,
  HOSPITAL_URL,
  DOCTOR_NIKAN_URL,
  MEDICAL_COUNCIL_FA,
  MEDICAL_COUNCIL_CODE,
  HOSPITAL_CENTRAL_PHONE_FA,
  HOSPITAL_CENTRAL_PHONE,
  PHONE,
  PHONE_TEL
} from '../../lib/siteConstants';

interface HospitalLocationMapProps {
  showTitle?: boolean;
  className?: string;
}

export const HospitalLocationMap: React.FC<HospitalLocationMapProps> = ({
  showTitle = true,
  className = ''
}) => {
  const { t, lang, isRTL } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [copiedCoord, setCopiedCoord] = useState(false);

  const copyAddress = () => {
    const textToCopy = lang === 'fa' ? ADDRESS_FA : ADDRESS_EN;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${LATITUDE}, ${LONGITUDE}`);
    setCopiedCoord(true);
    setTimeout(() => setCopiedCoord(false), 2500);
  };

  const navApps = [
    {
      name: lang === 'fa' ? 'گوگل مپ' : 'Google Maps',
      enName: 'Google Maps',
      url: GOOGLE_MAPS_URL,
      iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:bg-blue-600 hover:text-white',
      badge: 'Global'
    },
    {
      name: lang === 'fa' ? 'ویز' : 'Waze',
      enName: 'Waze',
      url: WAZE_URL,
      iconBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 hover:bg-cyan-600 hover:text-white',
      badge: 'Live Traffic'
    },
    {
      name: lang === 'fa' ? 'نشان' : 'Neshan',
      enName: 'Neshan',
      url: NESHAN_URL,
      iconBg: 'bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-600/20 hover:bg-blue-700 hover:text-white',
      badge: 'Iran'
    },
    {
      name: lang === 'fa' ? 'بلد' : 'Balad',
      enName: 'Balad',
      url: BALAD_URL,
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-600 hover:text-white',
      badge: 'Iran'
    },
    {
      name: lang === 'fa' ? 'اپل مپ' : 'Apple Maps',
      enName: 'Apple Maps',
      url: APPLE_MAPS_URL,
      iconBg: 'bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 border-neutral-500/20 hover:bg-neutral-800 hover:text-white',
      badge: 'iOS'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {showTitle && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'دسترسی و موقعیت کلینیک' : 'Location & Hospital Access'}</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-foreground">
              {lang === 'fa' ? HOSPITAL_NAME_FA : HOSPITAL_NAME_EN}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {lang === 'fa' ? ADDRESS_EXACT_HINT_FA : ADDRESS_EXACT_HINT_EN}
            </p>
          </div>

          {/* Official Verification Pill */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={DOCTOR_NIKAN_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-card border border-primary/30 text-primary text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all shadow-2xs group"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? `نظام پزشکی: ${MEDICAL_COUNCIL_FA}` : `MC Reg: ${MEDICAL_COUNCIL_CODE}`}</span>
              <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
            </a>

            <a
              href={HOSPITAL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-muted/70 text-foreground/90 text-xs font-medium hover:bg-card border border-border/80 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-primary" />
              <span>{lang === 'fa' ? 'سایت بیمارستان نیکان' : 'Nikan Hospital'}</span>
              <ExternalLink className="w-3 h-3 text-muted-foreground" />
            </a>
          </div>
        </div>
      )}

      {/* Main Map Box & Navigation Hub */}
      <div className="rounded-2xl sm:rounded-3xl bg-card border border-border/80 shadow-sm overflow-hidden">
        
        {/* Interactive Map Visual Layer */}
        <div className="relative aspect-[16/10] sm:aspect-[16/7] md:aspect-[21/8] w-full bg-muted border-b border-border/60 overflow-hidden group">
          <iframe
            title={lang === 'fa' ? HOSPITAL_NAME_FA : HOSPITAL_NAME_EN}
            aria-label="Nikan Gharb Hospital Location"
            src={OSM_EMBED_URL}
            className="w-full h-full border-0 filter contrast-105"
            loading="lazy"
          />

          {/* Pulsating Location Badge Overlay */}
          <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 left-auto z-10 pointer-events-none">
            <div className="bg-background/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-primary/30 p-2 sm:p-2.5 shadow-md flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-primary text-primary-foreground shrink-0 shadow-xs">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-foreground leading-tight">
                  {lang === 'fa' ? 'بیمارستان نیکان غرب' : 'Nikan Gharb Hospital'}
                </p>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground">
                  {lang === 'fa' ? 'کلینیک تخصصی اعصاب و روان' : 'Psychiatry Specialty Clinic'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Open in Full Maps button on map */}
          <div className="absolute bottom-2.5 left-2.5 sm:left-3.5 z-10">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 h-7 sm:h-8 px-2.5 sm:px-3 rounded-full bg-background/90 backdrop-blur-md text-foreground text-xs font-semibold shadow-md border border-border hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Navigation className="w-3 h-3 text-primary group-hover:text-primary-foreground" />
              <span>{lang === 'fa' ? 'مشاهده تمام‌صفحه' : 'Full Map'}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Multi-App Navigation Bar */}
        <div className="p-4 sm:p-5 md:p-6 bg-card space-y-4 sm:space-y-5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <h4 className="font-heading font-bold text-foreground text-xs sm:text-sm flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-primary" />
                <span>{t('nav_apps_title')}</span>
              </h4>
              <span className="text-[11px] text-muted-foreground hidden sm:inline">
                {lang === 'fa' ? 'با کلیک مستقیم در اپلیکیشن مورد نظر باز می‌شود' : 'Click to launch directly in app'}
              </span>
            </div>

            {/* Navigation App Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {navApps.map((app) => (
                <a
                  key={app.enName}
                  href={app.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between h-9 sm:h-10 px-3 rounded-xl border text-xs font-semibold transition-all duration-200 shadow-2xs group ${app.iconBg}`}
                >
                  <div className="flex items-center gap-1.5">
                    <Navigation className="w-3 h-3 transition-transform group-hover:rotate-45" />
                    <span>{app.name}</span>
                  </div>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Detailed Address and Direct Actions */}
          <div className="pt-3.5 border-t border-border/60 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Address Text */}
            <div className="md:col-span-8 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                  {lang === 'fa' ? ADDRESS_FA : ADDRESS_EN}
                </p>
                <div className="flex flex-wrap items-center gap-2.5 mt-1.5 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Car className="w-3 h-3 text-primary" />
                    <span>{lang === 'fa' ? 'پارکینگ اختصاصی بیمارستان' : 'Dedicated hospital parking'}</span>
                  </span>
                  <span>•</span>
                  <button
                    onClick={copyCoordinates}
                    className="inline-flex items-center gap-1 text-primary hover:underline font-mono"
                    title={lang === 'fa' ? 'کپی مختصات جغرافیایی' : 'Copy GPS coordinates'}
                  >
                    <span>{LATITUDE}, {LONGITUDE}</span>
                    {copiedCoord ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons: Copy Address & Hospital Phone */}
            <div className="md:col-span-4 flex flex-wrap sm:flex-nowrap items-center justify-end gap-2">
              <button
                onClick={copyAddress}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg bg-accent/70 border border-border text-foreground text-xs font-semibold hover:border-primary/40 hover:text-primary transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600 dark:text-emerald-400">{t('nav_copied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{t('nav_copy_address')}</span>
                  </>
                )}
              </button>

              <a
                href={`tel:${HOSPITAL_CENTRAL_PHONE}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg bg-card border border-border text-foreground text-xs font-semibold hover:border-primary/40 hover:text-primary transition-all font-mono"
                dir="ltr"
                title={t('hospital_central_phone_label')}
              >
                <Phone className="w-3 h-3 text-primary" />
                <span>{HOSPITAL_CENTRAL_PHONE_FA}</span>
              </a>
            </div>

          </div>

          {/* Official Verification Strip */}
          <div className="pt-2.5 border-t border-border/40 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>
                {lang === 'fa' 
                  ? 'پروفایل تایید شده دکتر فاطمه مومنی در بخش متخصصین بیمارستان نیکان غرب'
                  : 'Verified specialist profile of Dr. Fatemeh Momeni at Nikan Gharb Hospital'}
              </span>
            </div>
            
            <a
              href={DOCTOR_NIKAN_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
            >
              <span>{lang === 'fa' ? 'مشاهده صفحه اختصاصی در سامانه نیکان' : 'View Profile on Nikan Portal'}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
