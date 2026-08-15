import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageProvider';
import { Reveal } from '../../../components/Reveal';
import { CLINICAL_ASSETS } from '../../../lib/assetRegistry';

export const PhilosophyTeaserSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-12 sm:py-16 bg-cream/60 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Clinic Room Image Frame */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] border-4 border-card bg-card max-w-lg mx-auto">
                <img
                  src={CLINICAL_ASSETS.consultingRoom.src}
                  alt="Clinical Consulting Room"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (CLINICAL_ASSETS.consultingRoom.fallbackSrc && target.src !== CLINICAL_ASSETS.consultingRoom.fallbackSrc) {
                      target.src = CLINICAL_ASSETS.consultingRoom.fallbackSrc;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
              </div>
            </Reveal>
          </div>

          {/* Philosophy & Care Approach Text */}
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
  );
};
