import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  ShieldCheck, 
  GraduationCap, 
  Building2, 
  HeartHandshake, 
  Compass, 
  Sparkles, 
  CheckCircle2,
  Calendar,
  Phone,
  MapPin,
  Activity,
  Brain,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/site/SectionHeading';
import { ClinicalStatsBanner } from '../components/site/ClinicalStatsBanner';
import { 
  ABOUT_IMG, 
  PHONE, 
  PHONE_TEL,
  DOCTOR_NIKAN_URL,
  HOSPITAL_URL,
  MEDICAL_COUNCIL_FA,
  MEDICAL_COUNCIL_CODE
} from '../lib/siteConstants';

export const About: React.FC = () => {
  const { t, lang, isRTL } = useLanguage();

  return (
    <div className="pt-20 sm:pt-28 pb-16 overflow-hidden">
      
      {/* 1. HERO / BIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <Reveal className="relative w-full max-w-sm sm:max-w-md">
              <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-card aspect-[4/5] bg-muted">
                <img
                  src={ABOUT_IMG}
                  alt={t('brand_name')}
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('unsplash')) {
                      target.src = "https://images.unsplash.com/photo-1594824813590-78965a3962b1?auto=format&fit=crop&w=1000&q=80";
                    }
                  }}
                />
              </div>

              {/* Top Verified Badge */}
              <div
                className={`absolute top-3 sm:top-4 ${
                  isRTL ? 'right-2 sm:right-3' : 'left-2 sm:left-3'
                } glass-card rounded-full px-3.5 py-1.5 shadow-md border border-primary/25 bg-card/95 backdrop-blur-md flex items-center gap-1.5 text-xs font-semibold text-primary z-10`}
              >
                <Award className="w-4 h-4 text-primary" />
                <span>{t('board_certified')}</span>
              </div>

              {/* Bottom Floating Hospital Card */}
              <div
                className={`absolute -bottom-3 sm:-bottom-4 ${
                  isRTL ? 'left-2 sm:left-3' : 'right-2 sm:right-3'
                } glass-card rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-xl border border-border/80 bg-card/95 backdrop-blur-md flex items-center gap-3 z-10`}
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Building2 className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    {t('hospital')}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    {lang === 'fa' ? `کد نظام پزشکی: ${MEDICAL_COUNCIL_FA}` : `MC Reg: ${MEDICAL_COUNCIL_CODE}`}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bio Text */}
          <div className="lg:col-span-7 space-y-4">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/70 text-primary text-xs font-semibold border border-primary/15">
                <MapPin className="w-3.5 h-3.5" />
                <span>{t('cities_exp')}</span>
              </div>
              <h1 className="mt-2.5 text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
                {t('about_title')}
              </h1>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                {t('about_p1')}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                {t('about_p2')}
              </p>
            </Reveal>

            {/* Cities Experience Highlight Box */}
            <Reveal delay={250}>
              <div className="rounded-2xl bg-accent/35 border border-border/70 p-3.5 flex items-start gap-3">
                <Building2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-foreground text-xs">
                    {t('about_cities_title')}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {t('about_cities_desc')}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300} className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/panel"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm btn-soft-glow hover:opacity-95 transition-all shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('book_now')}</span>
              </Link>

              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card text-foreground font-semibold text-xs sm:text-sm hover:border-primary/40 hover:text-primary transition-all"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>{PHONE}</span>
              </a>
            </Reveal>
          </div>

        </div>

        {/* Clinical Statistics Banner */}
        <div className="mt-12 pt-10 border-t border-border/60">
          <Reveal delay={200}>
            <ClinicalStatsBanner />
          </Reveal>
        </div>
      </section>

      {/* 2. TREATMENT PHILOSOPHY */}
      <section className="py-14 bg-cream/60 border-y border-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl bg-card border border-border/80 p-6 sm:p-10 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-3">
                {t('about_philo_title')}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('about_philo_p')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. CREDENTIALS & QUALIFICATIONS */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            kicker={t('about_kicker')}
            title={t('about_creds_title')}
            align="center"
          />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <Reveal delay={0} className="rounded-2xl bg-card border border-border/70 p-5 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-accent/70 text-primary flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-sm mb-1">
                  {lang === 'fa' ? 'دکترای پزشکی و تخصص' : 'Medical & Psychiatric Doctorate'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t('about_creds_edu')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={80} className="rounded-2xl bg-card border border-border/70 p-5 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-accent/70 text-primary flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-sm mb-1">
                  {lang === 'fa' ? 'بورد تخصصی اعصاب و روان' : 'National Board Diploma'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t('about_creds_board')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={160} className="rounded-2xl bg-card border border-border/70 p-5 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-accent/70 text-primary flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-sm mb-1">
                  {lang === 'fa' ? 'سابقه فعالیت در ۳ کلان‌شهر' : 'Practice in 3 Cities'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t('about_creds_cities')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={240} className="rounded-2xl bg-card border border-border/70 p-5 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-accent/70 text-primary flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-sm mb-1">
                  {lang === 'fa' ? 'روان‌درمانی و زوج‌درمانی' : 'Psychotherapy & Couples'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t('about_creds_therapist')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={320} className="rounded-2xl bg-card border border-border/70 p-5 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-accent/70 text-primary flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-sm mb-1">
                  {lang === 'fa' ? 'تکنولوژی‌های مغزی و غیردارویی' : 'Brain Tech (EEG, rTMS, tDCS)'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t('about_creds_neuro')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={400} className="rounded-2xl bg-card border border-border/70 p-5 flex flex-col justify-between">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-accent/70 text-primary flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-1">
                    {lang === 'fa' ? 'بیمارستان نیکان غرب' : 'Nikan Gharb Hospital'}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t('about_creds_hospital')} • {lang === 'fa' ? `کد نظام پزشکی: ${MEDICAL_COUNCIL_FA}` : `MC: ${MEDICAL_COUNCIL_CODE}`}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between">
                <a
                  href={DOCTOR_NIKAN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                >
                  <span>{lang === 'fa' ? 'مشاهده در سایت بیمارستان نیکان' : 'View on Nikan Hospital Site'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE THIS PRACTICE */}
      <section className="py-14 bg-cream/60 border-y border-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-3">
              {t('about_why_title')}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
              {t('about_why_p')}
            </p>
          </Reveal>
        </div>
      </section>

    </div>
  );
};
