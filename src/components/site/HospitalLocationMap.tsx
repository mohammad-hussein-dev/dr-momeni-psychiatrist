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
  Award,
  Bus,
  Train,
  Share2,
  Info,
  CheckCircle2,
  CornerDownLeft,
  Route
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
  NESHAN_SHORT_URL,
  NESHAN_URL, 
  NESHAN_MAP_URL,
  GOOGLE_MAPS_URL, 
  GOOGLE_MAPS_DIR_URL,
  WAZE_URL, 
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
  const isFa = lang === 'fa';

  const [copied, setCopied] = useState(false);
  const [copiedCoord, setCopiedCoord] = useState(false);
  const [copiedNeshanLink, setCopiedNeshanLink] = useState(false);
  const [activeRouteTab, setActiveRouteTab] = useState<'car' | 'metro' | 'parking'>('car');

  const copyAddress = () => {
    const textToCopy = isFa ? ADDRESS_FA : ADDRESS_EN;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${LATITUDE}, ${LONGITUDE}`);
    setCopiedCoord(true);
    setTimeout(() => setCopiedCoord(false), 2500);
  };

  const copyNeshan = () => {
    navigator.clipboard.writeText(NESHAN_SHORT_URL);
    setCopiedNeshanLink(true);
    setTimeout(() => setCopiedNeshanLink(false), 2500);
  };

  const navApps = [
    {
      name: isFa ? 'نشان (پیشنهادی)' : 'Neshan (Recommended)',
      enName: 'Neshan',
      url: NESHAN_SHORT_URL,
      iconBg: 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700 shadow-sm',
      badge: isFa ? 'لینک مستقیم' : 'Direct Link',
      isPrimary: true
    },
    {
      name: isFa ? 'بلد' : 'Balad',
      enName: 'Balad',
      url: BALAD_URL,
      iconBg: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-600 hover:text-white',
      badge: 'Iran',
      isPrimary: false
    },
    {
      name: isFa ? 'گوگل مپ' : 'Google Maps',
      enName: 'Google Maps',
      url: GOOGLE_MAPS_URL,
      iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 hover:bg-blue-600 hover:text-white',
      badge: 'Global',
      isPrimary: false
    },
    {
      name: isFa ? 'ویز' : 'Waze',
      enName: 'Waze',
      url: WAZE_URL,
      iconBg: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30 hover:bg-cyan-600 hover:text-white',
      badge: 'Traffic',
      isPrimary: false
    },
    {
      name: isFa ? 'اپل مپ' : 'Apple Maps',
      enName: 'Apple Maps',
      url: APPLE_MAPS_URL,
      iconBg: 'bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 border-neutral-500/30 hover:bg-neutral-800 hover:text-white',
      badge: 'iOS',
      isPrimary: false
    }
  ];

  const carRoutes = [
    {
      title_fa: 'مسیر ۱: از مرکز، شرق و شمال‌شرق تهران (مسیر همت)',
      title_en: 'Route 1: From Central, East & North-East Tehran (Hemmat)',
      desc_fa: 'بزرگراه شهید همت (مسیر شرق به غرب) ➔ عبور از تقاطع بزرگراه ستاری و باکری ➔ بعد از تقاطع آزادگان ➔ نرسیده به میدان المپیک ➔ روبروی پارک جوانمردان ➔ بیمارستان فوق تخصصی نیکان غرب',
      desc_en: 'Shahid Hemmat Expressway (Westbound) ➔ pass Sattari & Bakeri ➔ pass Azadegan interchange ➔ before Olympic Sq ➔ opposite Javanmardan Park ➔ Nikan Gharb Hospital'
    },
    {
      title_fa: 'مسیر ۲: از غرب تهران، چیتگر، منطقه ۲۲ و کرج',
      title_en: 'Route 2: From West Tehran, Chitgar, District 22 & Karaj',
      desc_fa: 'بزرگراه شهید همدانی (حکیم غرب) یا آزادراه تهران-کرج ➔ ورود به بزرگراه آزادگان (شمال) ➔ خروجی بزرگراه شهید همت (شرق) ➔ دوربرگردان یا دسترسی به میدان المپیک ➔ ورودی بیمارستان نیکان غرب',
      desc_en: 'Shahid Hamadani (Hakim West) or Tehran-Karaj Fwy ➔ Azadegan North ➔ Exit onto Hemmat ➔ access to Olympic Sq / Nikan Hospital'
    },
    {
      title_fa: 'مسیر ۳: از جنوب و جنوب‌غرب تهران (فرودگاه‌ها و آزادگان)',
      title_en: 'Route 3: From South & South-West Tehran (Azadegan / Airports)',
      desc_fa: 'بزرگراه آزادگان (به سمت شمال) ➔ ورود به باند کندرو بزرگراه همت غرب به سمت میدان المپیک ➔ بیمارستان نیکان غرب',
      desc_en: 'Azadegan Expressway (Northbound) ➔ Exit to Hemmat West towards Olympic Square ➔ Nikan Gharb Hospital'
    }
  ];

  const transitRoutes = [
    {
      title_fa: 'مترو خط ۲ (ایستگاه صادقیه) + تاکسی‌های میدان المپیک',
      title_en: 'Metro Line 2 (Sadeghieh) + Olympic Sq Taxis',
      desc_fa: 'پیاده شدن در پایانه مترو صادقیه ➔ استفاده از تاکسی‌های خطی میدان المپیک / دهکده المپیک ➔ پیاده شدن روبروی بیمارستان نیکان غرب.',
      desc_en: 'Alight at Sadeghieh Metro Terminal ➔ Take shared taxis to Olympic Square ➔ Alight directly in front of Nikan West Hospital.'
    },
    {
      title_fa: 'مترو خط ۴ (ایستگاه ارم سبز) + تاکسی‌های همت غرب',
      title_en: 'Metro Line 4 (Eram-e Sabz) + West Taxis',
      desc_fa: 'ایستگاه مترو ارم سبز ➔ تاکسی‌های مسیر بزرگراه باکری یا اتوبان همت غرب به سمت دهکده المپیک.',
      desc_en: 'Eram-e Sabz Metro Station ➔ Taxis heading north to Hemmat West / Olympic Village.'
    },
    {
      title_fa: 'اتوبوس‌های تندرو (BRT) و خطوط میدان آزادی',
      title_en: 'BRT Buses & Azadi Square Lines',
      desc_fa: 'پایانه میدان آزادی ➔ اتوبوس یا ون‌های مسیر دهکده المپیک و دریاچه چیتگر ➔ ایستگاه بیمارستان نیکان غرب.',
      desc_en: 'Azadi Square Bus Terminal ➔ Buses/Vans to Olympic Village ➔ Nikan Hospital Stop.'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {showTitle && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>{isFa ? 'دسترسی، موقعیت و راهنمای مسیرها' : 'Location, Map & Route Guidance'}</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-foreground">
              {isFa ? HOSPITAL_NAME_FA : HOSPITAL_NAME_EN}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {isFa ? ADDRESS_EXACT_HINT_FA : ADDRESS_EXACT_HINT_EN}
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
              <span>{isFa ? `نظام پزشکی: ${MEDICAL_COUNCIL_FA}` : `MC Reg: ${MEDICAL_COUNCIL_CODE}`}</span>
              <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
            </a>

            <a
              href={HOSPITAL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-muted/70 text-foreground/90 text-xs font-medium hover:bg-card border border-border/80 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-primary" />
              <span>{isFa ? 'سایت بیمارستان نیکان' : 'Nikan Hospital'}</span>
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
            title={isFa ? HOSPITAL_NAME_FA : HOSPITAL_NAME_EN}
            aria-label="Nikan Gharb Hospital Location"
            src={OSM_EMBED_URL}
            className="w-full h-full border-0 filter contrast-105"
            loading="lazy"
          />

          {/* Pulsating Location Badge Overlay */}
          <div className="absolute top-2.5 sm:top-3.5 end-2.5 sm:end-3.5 z-10 pointer-events-none">
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
                  {isFa ? 'بیمارستان فوق تخصصی نیکان غرب' : 'Nikan Gharb Super Specialty Hospital'}
                </p>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground">
                  {isFa ? 'کلینیک تخصصی اعصاب و روان (اتاق ۳۰۲)' : 'Psychiatry Specialty Clinic (Room 302)'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Direct Neshan Floating Action */}
          <div className="absolute bottom-2.5 start-2.5 sm:start-3.5 z-10 flex items-center gap-2">
            <a
              href={NESHAN_SHORT_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 h-7 sm:h-8 px-3 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg hover:bg-blue-700 transition-all cursor-pointer"
            >
              <Navigation className="w-3 h-3 text-white" />
              <span>{isFa ? 'مسیریابی با نشان' : 'Open in Neshan'}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-80" />
            </a>

            <a
              href={GOOGLE_MAPS_DIR_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 h-7 sm:h-8 px-3 rounded-full bg-background/90 backdrop-blur-md text-foreground text-xs font-semibold shadow-md border border-border hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <span>{isFa ? 'گوگل مپ' : 'Google Maps'}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Multi-App Navigation Bar */}
        <div className="p-4 sm:p-5 md:p-6 bg-card space-y-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <h4 className="font-heading font-bold text-foreground text-xs sm:text-sm flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-primary" />
                <span>{t('nav_apps_title')}</span>
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyNeshan}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  title="کپی لینک اختصاصی نشان"
                >
                  {copiedNeshanLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedNeshanLink ? (isFa ? 'لینک نشان کپی شد' : 'Neshan link copied') : (isFa ? 'کپی لینک نشان' : 'Copy Neshan Link')}</span>
                </button>
              </div>
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
                  <div className="flex items-center gap-1.5 truncate">
                    <Navigation className="w-3 h-3 shrink-0 transition-transform group-hover:rotate-45" />
                    <span className="truncate">{app.name}</span>
                  </div>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ROUTE ASSISTANT & DIRECTIONS GUIDE (کمک کننده مسیرها) */}
          {/* ========================================================================= */}
          <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/70 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                  <Route className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-foreground">
                    {isFa ? 'راهنمای هوشمند دسترسی و مسیرهای منتهی به کلینیک' : 'Clinical Route & Access Assistant'}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] text-muted-foreground">
                    {isFa ? 'مسیرهای خودرو شخصی، خطوط مترو و اطلاعات ورود' : 'Driving routes, Metro connections & facility access'}
                  </span>
                </div>
              </div>

              {/* Route Tabs */}
              <div className="flex items-center gap-1 bg-background/80 p-1 rounded-xl border border-border/60">
                <button
                  onClick={() => setActiveRouteTab('car')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeRouteTab === 'car'
                      ? 'bg-primary text-primary-foreground shadow-2xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Car className="w-3 h-3" />
                  <span>{isFa ? 'خودرو شخصی' : 'Driving'}</span>
                </button>

                <button
                  onClick={() => setActiveRouteTab('metro')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeRouteTab === 'metro'
                      ? 'bg-primary text-primary-foreground shadow-2xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Train className="w-3 h-3" />
                  <span>{isFa ? 'مترو و اتوبوس' : 'Transit'}</span>
                </button>

                <button
                  onClick={() => setActiveRouteTab('parking')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeRouteTab === 'parking'
                      ? 'bg-primary text-primary-foreground shadow-2xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Building2 className="w-3 h-3" />
                  <span>{isFa ? 'ورود و پارکینگ' : 'Facility'}</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Car Driving Routes */}
            {activeRouteTab === 'car' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in duration-200">
                {carRoutes.map((route, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-card border border-border/70 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                      <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate">{isFa ? route.title_fa : route.title_en}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {isFa ? route.desc_fa : route.desc_en}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Metro & Public Transit */}
            {activeRouteTab === 'metro' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in duration-200">
                {transitRoutes.map((route, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-card border border-border/70 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <Train className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{isFa ? route.title_fa : route.title_en}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {isFa ? route.desc_fa : route.desc_en}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Parking & In-Clinic Access */}
            {activeRouteTab === 'parking' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 animate-in fade-in duration-200 text-xs">
                <div className="p-3 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-primary">
                    <Car className="w-3.5 h-3.5" />
                    <span>{isFa ? 'پارکینگ اختصاصی' : 'Dedicated Parking'}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {isFa ? 'پارکینگ طبقاتی چندطبقه بیمارستان نیکان با دسترسی مستقیم آسانسور به کلینیک‌ها.' : 'Multi-level parking with direct elevator access.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-primary">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{isFa ? 'موقعیت درمانگاه' : 'Clinic Location'}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {isFa ? 'بیمارستان نیکان غرب، بخش درمانگاه‌های تخصصی، کلینیک اعصاب و روان (اتاق ۳۰۲).' : 'Nikan West Hospital, Outpatient Specialty Wing, Room 302.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isFa ? 'دسترس‌پذیری توان‌یابان' : 'Accessibility'}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {isFa ? 'رمپ‌های استاندارد، ورودی بدون پله و آسانسورهای مخصوص ویلچر و سالمندان.' : 'Full step-free access, wheelchair ramps and spacious elevators.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-card border border-border/70 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-primary">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{isFa ? 'هماهنگی تلفنی' : 'Phone Assistance'}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {isFa ? 'پاسخگویی مستقیم منشی: ۰۹۹۳۴۴۲۰۹۶۷ و تلفن گویای بیمارستان: ۰۲۱-۲۹۱۲۹' : 'Reception: +989934420967 | Hospital: 021-29129'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Detailed Address and Direct Actions */}
          <div className="pt-3.5 border-t border-border/60 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Address Text */}
            <div className="md:col-span-8 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                  {isFa ? ADDRESS_FA : ADDRESS_EN}
                </p>
                <div className="flex flex-wrap items-center gap-2.5 mt-1.5 text-[11px] text-muted-foreground">
                  <a
                    href={NESHAN_SHORT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold hover:underline font-mono"
                    dir="ltr"
                  >
                    <span>{NESHAN_SHORT_URL}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span>•</span>
                  <button
                    onClick={copyCoordinates}
                    className="inline-flex items-center gap-1 text-primary hover:underline font-mono cursor-pointer"
                    title={isFa ? 'کپی مختصات جغرافیایی' : 'Copy GPS coordinates'}
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg bg-accent/70 border border-border text-foreground text-xs font-semibold hover:border-primary/40 hover:text-primary transition-all cursor-pointer"
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
                {isFa 
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
              <span>{isFa ? 'مشاهده صفحه اختصاصی در سامانه نیکان' : 'View Profile on Nikan Portal'}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
