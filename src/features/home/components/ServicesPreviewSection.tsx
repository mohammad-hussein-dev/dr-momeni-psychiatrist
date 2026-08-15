import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageProvider';
import { serviceKeys } from '../../../i18n/translations';
import { Reveal } from '../../../components/Reveal';
import { SectionHeading } from '../../../components/site/SectionHeading';
import { ServiceCard } from '../../../components/site/ServiceCard';

export const ServicesPreviewSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
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
  );
};
