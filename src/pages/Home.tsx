import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageProvider';
import { Reveal } from '../components/Reveal';
import { HospitalLocationMap } from '../components/site/HospitalLocationMap';
import { PHONE, PHONE_TEL } from '../lib/siteConstants';

// Modular Home Feature Sections
import { HeroSection } from '../features/home/components/HeroSection';
import { TrustFactorsSection } from '../features/home/components/TrustFactorsSection';
import { ServicesPreviewSection } from '../features/home/components/ServicesPreviewSection';
import { PhilosophyTeaserSection } from '../features/home/components/PhilosophyTeaserSection';
import { VisitFormatsSection } from '../features/home/components/VisitFormatsSection';
import { TestimonialsPreviewSection } from '../features/home/components/TestimonialsPreviewSection';
import { BlogPreviewSection } from '../features/home/components/BlogPreviewSection';

export const Home: React.FC = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. TRUST FACTORS & CLINICAL KPIS */}
      <TrustFactorsSection />

      {/* 3. CORE SERVICES PREVIEW */}
      <ServicesPreviewSection />

      {/* 4. CLINICAL PHILOSOPHY & TEASER */}
      <PhilosophyTeaserSection />

      {/* 5. VISIT FORMATS (IN-PERSON VS ONLINE) */}
      <VisitFormatsSection />

      {/* 6. TESTIMONIALS & OUTCOMES */}
      <TestimonialsPreviewSection />

      {/* 7. RECENT CLINICAL BLOG POSTS */}
      <BlogPreviewSection />

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
              {/* Decorative gradient blobs */}
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
