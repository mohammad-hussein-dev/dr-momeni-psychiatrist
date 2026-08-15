import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Video, 
  CheckCircle2, 
  Phone, 
  ArrowRight,
  Award,
  Sparkles,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageProvider';
import { Reveal } from '../../../components/Reveal';
import { PHONE, PHONE_TEL } from '../../../lib/siteConstants';
import { DOCTOR_ASSETS } from '../../../lib/assetRegistry';

export const HeroSection: React.FC = () => {
  const { t, lang, isRTL } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-80 h-80 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text & Action Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-start">
            
            {/* Top Pill / Badge */}
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-accent/70 text-primary border border-primary/20 shadow-2xs backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>{t('hero_kicker')}</span>
              </div>
            </Reveal>

            {/* Main Headline */}
            <Reveal delay={100}>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold text-foreground leading-[1.2] tracking-tight">
                {t('hero_title')}
              </h1>
            </Reveal>

            {/* Subtitle / Bio summary */}
            <Reveal delay={200}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t('hero_subtitle')}
              </p>
            </Reveal>

            {/* Key Service Bullets (Short) */}
            <Reveal delay={250}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm text-foreground/85">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{t('hero_bullet_1')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{t('hero_bullet_2')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{t('hero_bullet_3')}</span>
                </div>
              </div>
            </Reveal>

            {/* CTAs Button Group */}
            <Reveal delay={300}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3">
                <Link
                  to="/panel"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-primary text-primary-foreground hover:opacity-95 shadow-md transition-all active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('book_appointment')}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>

                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold border border-border bg-card text-foreground hover:bg-muted/70 shadow-2xs transition-all"
                  dir="ltr"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{PHONE}</span>
                </a>
              </div>
            </Reveal>

            {/* Two Quick Visit Cards (Hospital & Online) */}
            <Reveal delay={400}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 text-start">
                
                {/* In-Person Quick Card */}
                <Link 
                  to="/visits"
                  className="p-3.5 sm:p-4 rounded-2xl bg-card border border-border/80 hover:border-primary/40 hover:shadow-sm transition-all group block"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Building2 className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {t('visit_inperson_title')}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {t('hospital')}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Online Consultation Quick Card */}
                <Link 
                  to="/visits"
                  className="p-3.5 sm:p-4 rounded-2xl bg-card border border-border/80 hover:border-primary/40 hover:shadow-sm transition-all group block"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-secondary/25 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Video className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {t('visit_online_title')}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {lang === 'fa' ? 'سراسر ایران و خارج از کشور' : 'Worldwide Telehealth'}
                      </p>
                    </div>
                  </div>
                </Link>

              </div>
            </Reveal>

          </div>

          {/* Doctor Portrait Image Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <Reveal delay={200} className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Doctor Official Photo Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[3/4] bg-card border-4 border-card">
                <img
                  src={DOCTOR_ASSETS.portrait.src}
                  alt={t('brand_name')}
                  loading="eager"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (DOCTOR_ASSETS.portrait.fallbackSrc && target.src !== DOCTOR_ASSETS.portrait.fallbackSrc) {
                      target.src = DOCTOR_ASSETS.portrait.fallbackSrc;
                    }
                  }}
                />
              </div>

              {/* Top Badge: Board Certified / Verification */}
              <div
                className="absolute top-3 sm:top-4 start-2 sm:start-3 glass-card rounded-full px-3.5 py-1.5 shadow-md border border-primary/25 bg-card/95 backdrop-blur-md flex items-center gap-1.5 text-xs font-semibold text-primary z-10"
              >
                <Award className="w-4 h-4 text-primary" />
                <span>{t('hero_badge')}</span>
              </div>

              {/* Bottom Floating Card: Hospital & Consultation format */}
              <div
                className="absolute -bottom-3 sm:-bottom-4 end-2 sm:end-3 glass-card rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-xl border border-border/80 bg-card/95 backdrop-blur-md flex items-center gap-3 z-10 animate-float-slow max-w-[calc(100%-1rem)]"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-2xs shrink-0">
                  <Building2 className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    {t('hospital')}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    {lang === 'fa' ? 'ویزیت حضوری و آنلاین' : 'In-Person & Online Care'}
                  </p>
                </div>
              </div>

            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};
