import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Phone, 
  Building2, 
  Video, 
  Award, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Heart, 
  ArrowRight,
  Star,
  Quote,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { serviceKeys } from '../i18n/translations';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/site/SectionHeading';
import { ServiceCard } from '../components/site/ServiceCard';
import { HospitalLocationMap } from '../components/site/HospitalLocationMap';
import { 
  PHONE, 
  PHONE_TEL, 
  HERO_IMG, 
  CLINIC_ROOM_IMG, 
  CONSULTATION_IMG,
  DOCTOR_NIKAN_URL,
  HOSPITAL_URL,
  MEDICAL_COUNCIL_FA,
  MEDICAL_COUNCIL_CODE
} from '../lib/siteConstants';
import { INITIAL_POSTS, INITIAL_TESTIMONIALS } from '../data/mockData';
import { ShadowAvatar } from '../components/ShadowAvatar';
import { PatientReactionBar } from '../components/PatientReactionBar';
import { ClinicalStatsBanner } from '../components/site/ClinicalStatsBanner';

export const Home: React.FC = () => {
  const { t, lang, pick, isRTL } = useLanguage();

  return (
    <div className="overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
        {/* Ambient background blur blobs */}
        <div className="absolute -top-24 -right-24 w-[24rem] h-[24rem] rounded-full bg-secondary/20 blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 -left-24 w-[20rem] h-[20rem] rounded-full bg-accent/50 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Text Side (order-2 lg:order-1) */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/80 text-primary text-xs font-semibold border border-primary/20 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span>{t('hero_kicker')}</span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="mt-4 text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-bold text-foreground leading-[1.2]">
                  {t('hero_title')}
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-4 text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
                  {t('hero_subtitle')}
                </p>
              </Reveal>

              {/* Action Buttons */}
              <Reveal delay={300}>
                <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    to="/panel"
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold bg-primary text-primary-foreground btn-soft-glow hover:opacity-95 transition-all shadow-md active:scale-95"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t('book_now')}</span>
                  </Link>

                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-primary bg-card border border-primary/30 hover:bg-accent/40 transition-all shadow-2xs"
                    dir="ltr"
                  >
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>{PHONE}</span>
                  </a>
                </div>
              </Reveal>

              {/* Fast Option Quick Cards */}
              <Reveal delay={400}>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* In-Person */}
                  <Link
                    to="/panel"
                    state={{ visit_type: 'in_person' }}
                    className="group glass-card rounded-2xl p-3.5 sm:p-4 flex items-start gap-3 transition-all hover:border-primary/50 hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-foreground text-xs sm:text-sm group-hover:text-primary transition-colors">
                        {t('hero_card_inperson_title')}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-normal">
                        {t('hero_card_inperson_desc')}
                      </p>
                    </div>
                  </Link>

                  {/* Online */}
                  <Link
                    to="/panel"
                    state={{ visit_type: 'online' }}
                    className="group glass-card rounded-2xl p-3.5 sm:p-4 flex items-start gap-3 transition-all breathing-pulse hover:border-primary/50 hover:shadow-md"
                  >
                    <div className="w-9 h-9 rounded-xl bg-secondary/25 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-foreground text-xs sm:text-sm group-hover:text-primary transition-colors">
                        {t('hero_card_online_title')}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-normal">
                        {t('hero_card_online_desc')}
                      </p>
                    </div>
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Doctor Portrait Side (order-1 lg:order-2) */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
              <Reveal delay={150} className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
                
                {/* Decorative border frame */}
                <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-card aspect-[4/5] bg-muted max-w-md mx-auto">
                  <img
                    src={HERO_IMG}
                    alt={t('brand_name')}
                    loading="eager"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      // Graceful fallback in case external CDN is blocked
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('unsplash')) {
                        target.src = "https://images.unsplash.com/photo-1594824813590-78965a3962b1?auto=format&fit=crop&w=1000&q=80";
                      }
                    }}
                  />
                </div>

                {/* Top Badge: Board Certified / Verification */}
                <div
                  className={`absolute top-3 sm:top-4 ${
                    isRTL ? 'right-2 sm:right-3' : 'left-2 sm:left-3'
                  } glass-card rounded-full px-3.5 py-1.5 shadow-md border border-primary/25 bg-card/95 backdrop-blur-md flex items-center gap-1.5 text-xs font-semibold text-primary z-10`}
                >
                  <Award className="w-4 h-4 text-primary" />
                  <span>{t('hero_badge')}</span>
                </div>

                {/* Bottom Floating Card: Hospital & Consultation format */}
                <div
                  className={`absolute -bottom-3 sm:-bottom-4 ${
                    isRTL ? 'left-2 sm:left-3' : 'right-2 sm:right-3'
                  } glass-card rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-xl border border-border/80 bg-card/95 backdrop-blur-md flex items-center gap-3 z-10 animate-float-slow`}
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

      {/* 2. TRUST FACTORS BAR */}
      <section className="py-8 sm:py-10 bg-cream/70 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            
            <Reveal delay={0} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/70 text-primary flex items-center justify-center shrink-0 shadow-2xs">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-xs sm:text-sm">
                  {t('trust_board')}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {t('trust_board_desc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={100} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/70 text-primary flex items-center justify-center shrink-0 shadow-2xs">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-xs sm:text-sm">
                  {t('trust_cities')}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {t('trust_cities_desc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/70 text-primary flex items-center justify-center shrink-0 shadow-2xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-xs sm:text-sm">
                  {t('trust_hospital')}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {t('trust_hospital_desc')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={300} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/70 text-primary flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-xs sm:text-sm">
                  {t('trust_online')}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {t('trust_online_desc')}
                </p>
              </div>
            </Reveal>

          </div>

          {/* Clinical KPI Metrics with Hover Micro-Interactions */}
          <div className="mt-8 pt-8 border-t border-border/60">
            <Reveal delay={150}>
              <ClinicalStatsBanner />
            </Reveal>
          </div>
        </div>
      </section>
      {/* 3. SERVICES SECTION */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            kicker={t('services_kicker')}
            title={t('services_title')}
            intro={t('services_intro')}
          />

          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {serviceKeys.map((item, idx) => (
              <Reveal key={item.key} delay={idx * 50} className="h-full">
                <ServiceCard
                  icon={item.icon}
                  title={t(item.titleKey)}
                  desc={t(item.descKey)}
                  serviceKey={item.key}
                />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-primary/30 text-primary bg-card hover:bg-accent/40 transition-all shadow-2xs"
            >
              <span>{t('view_services')}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. PHILOSOPHY & CLINICAL CARE TEASER */}
      <section className="py-12 sm:py-16 bg-cream/60 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Image */}
            <div className="lg:col-span-6">
              <Reveal>
                <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] border-4 border-card bg-card max-w-lg mx-auto">
                  <img
                    src={CLINIC_ROOM_IMG}
                    alt="Clinical Consulting Room"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                </div>
              </Reveal>
            </div>

            {/* Content */}
            <div className="lg:col-span-6 space-y-4">
              <Reveal>
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-primary bg-accent/70 px-3 py-1 rounded-full border border-primary/15">
                  {t('about_kicker')}
                </span>
                <h2 className="mt-2.5 text-2xl sm:text-3xl font-heading font-bold text-foreground leading-snug">
                  {t('about_philo_title')}
                </h2>
              </Reveal>

              <Reveal delay={100}>
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                  {t('about_philo_p')}
                </p>
              </Reveal>

              <Reveal delay={200}>
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{t('about_creds_board')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{t('about_creds_hospital')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{t('about_creds_online')}</span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300} className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-accent-foreground transition-colors"
                >
                  <span>{t('learn_more')}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 5. VISIT FORMATS (In-Person vs Online) */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            kicker={t('visits_kicker')}
            title={t('visits_title')}
            intro={t('visits_intro')}
          />

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* In-Person Card */}
            <Reveal delay={100} className="h-full">
              <div className="h-full rounded-2xl sm:rounded-3xl bg-card border border-border/80 p-6 sm:p-8 flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-xl sm:text-2xl mb-2.5">
                    {t('visit_inperson_title')}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-5">
                    {t('visit_inperson_desc')}
                  </p>
                  
                  <ul className="space-y-2 text-xs text-muted-foreground pt-3.5 border-t border-border/60">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{lang === 'fa' ? 'دسترسی سریع با پارکینگ اختصاصی در غرب تهران' : 'Convenient West Tehran access with dedicated parking'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{lang === 'fa' ? 'امکان انجام آزمایش‌ها و تست‌های تکمیلی در بیمارستان' : 'Full hospital diagnostic and lab capabilities'}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-2">
                  <a
                    href={DOCTOR_NIKAN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-sm hover:opacity-95 transition-all cursor-pointer"
                  >
                    <span>{lang === 'fa' ? 'نوبت‌دهی در سایت بیمارستان نیکان' : 'Book on Nikan Hospital Site'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Online Card */}
            <Reveal delay={200} className="h-full">
              <div className="h-full rounded-2xl sm:rounded-3xl bg-card border border-secondary/50 p-6 sm:p-8 flex flex-col justify-between breathing-pulse hover:border-primary/40 hover:shadow-md transition-all">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-secondary/25 text-primary flex items-center justify-center mb-5">
                    <Video className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-xl sm:text-2xl mb-2.5">
                    {t('visit_online_title')}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-5">
                    {t('visit_online_desc')}
                  </p>

                  <ul className="space-y-2 text-xs text-muted-foreground pt-3.5 border-t border-border/60">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{lang === 'fa' ? 'بدون نیاز به رفت‌وآمد و صرف وقت در ترافیک' : 'Zero commute time from the comfort of your home'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{lang === 'fa' ? 'ارائه نسخه الکترونیک معتبر و قابل استعلام' : 'Official verified digital e-prescriptions'}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-2">
                  <Link
                    to="/panel"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-md btn-soft-glow hover:opacity-95 transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{lang === 'fa' ? 'درخواست نوبت و پذیرش آنلاین در سایت' : 'Book Online Consultation (Instant)'}</span>
                  </Link>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS PREVIEW */}
      <section className="py-12 sm:py-16 bg-cream/60 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            kicker={t('testi_kicker')}
            title={t('testi_title')}
            intro={t('testi_intro')}
          />

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {INITIAL_TESTIMONIALS.slice(0, 3).map((item, idx) => (
              <Reveal key={item.id} delay={idx * 80} className="h-full">
                <div className="h-full rounded-2xl sm:rounded-3xl bg-card border border-border/70 p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-primary/40 hover:shadow-md transition-all">
                  <div>
                    {/* Stars & Verified Pill */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                        ))}
                      </div>
                      {item.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{lang === 'fa' ? 'تاییدشده' : 'Verified'}</span>
                        </span>
                      )}
                    </div>

                    {/* Outcome Highlight Tag */}
                    {item.outcome_badge_fa && (
                      <p className="text-[11px] font-medium text-secondary-foreground bg-secondary/15 px-2.5 py-1 rounded-md mb-3 border border-secondary/25">
                        ✨ {lang === 'fa' ? item.outcome_badge_fa : item.outcome_badge_en}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic text-justify">
                      "{pick(item, 'body')}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <ShadowAvatar
                          type={item.shadow_avatar || 'calm_mind'}
                          size="sm"
                          className="shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">
                            {lang === 'fa' ? (item.persona_title_fa || item.author_initial) : (item.persona_title_en || item.author_initial)}
                          </p>
                          <p className="text-[10px] sm:text-[11px] text-muted-foreground truncate">
                            {pick(item, 'author_label')}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] text-muted-foreground shrink-0 font-medium">
                        {lang === 'fa' ? item.treatment_duration_fa : item.treatment_duration_en}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-border/30">
                      <PatientReactionBar 
                        testimonialId={item.id} 
                        initialLikes={16}
                        compact={false} 
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline"
            >
              <span>{t('view_all_testimonials')}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>

        </div>
      </section>

      {/* 7. BLOG PREVIEW */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            kicker={t('blog_kicker')}
            title={t('blog_title')}
            intro={t('blog_intro')}
          />

          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {INITIAL_POSTS.slice(0, 3).map((post, idx) => (
              <Reveal key={post.id} delay={idx * 80} className="h-full">
                <article className="group h-full rounded-2xl sm:rounded-3xl bg-card border border-border/70 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={post.image_url}
                        alt={pick(post, 'title')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-card/90 text-primary backdrop-blur-xs shadow-2xs">
                        {pick(post, 'category')}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground mb-2">
                        <Clock className="w-3 h-3" />
                        <span>{post.read_minutes} {t('blog_read_min')}</span>
                      </div>

                      <h3 className="font-heading font-bold text-foreground text-base sm:text-lg group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        <Link to={`/blog/${post.slug}`}>
                          {pick(post, 'title')}
                        </Link>
                      </h3>

                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {pick(post, 'excerpt')}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0 border-t border-border/50 mt-3">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all pt-3"
                    >
                      <span>{t('read_more')}</span>
                      <ArrowRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-primary/30 text-primary bg-card hover:bg-accent/40 transition-all shadow-2xs"
            >
              <span>{t('view_all_posts')}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>

        </div>
      </section>

      {/* 8. CLINICAL LOCATION & MULTI-APP NAVIGATION */}
      <section className="py-12 sm:py-16 bg-cream/50 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <HospitalLocationMap showTitle={true} />
          </Reveal>
        </div>
      </section>

      {/* 9. FINAL CTA BANNER */}
      <section className="pb-16 sm:pb-20 pt-8 sm:pt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground px-6 sm:px-12 py-10 sm:py-14 text-center shadow-xl">
              
              {/* Decorative gradient blobs inside banner */}
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-secondary/30 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-5">
                <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-[11px] sm:text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
                  {t('hospital')}
                </span>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold leading-tight">
                  {lang === 'fa' 
                    ? 'اولین قدم را برای آرامش ذهنی و بهبود کیفیت زندگی بردارید'
                    : 'Take the First Step Toward Clarity and Mental Well-Being'}
                </h2>

                <p className="text-primary-foreground/90 text-xs sm:text-sm md:text-base leading-relaxed">
                  {lang === 'fa'
                    ? 'رزرو نوبت حضوری در بیمارستان نیکان غرب یا نوبت آنلاین ویدیویی تنها در چند مرحله ساده.'
                    : 'Convenient appointment scheduling for in-person visits at Nikan Gharb Hospital or global online video care.'}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    to="/panel"
                    className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white text-primary font-bold text-xs sm:text-sm hover:bg-alabaster transition-all shadow-md active:scale-95"
                  >
                    {t('book_now')}
                  </Link>

                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-transparent border border-white/40 text-white font-semibold text-xs sm:text-sm hover:bg-white/10 transition-all"
                    dir="ltr"
                  >
                    {PHONE}
                  </a>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};
