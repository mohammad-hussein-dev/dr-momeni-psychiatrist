import React from 'react';
import { Award, Clock, Building2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageProvider';
import { Reveal } from '../../../components/Reveal';
import { ClinicalStatsBanner } from '../../../components/site/ClinicalStatsBanner';

export const TrustFactorsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
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
  );
};
