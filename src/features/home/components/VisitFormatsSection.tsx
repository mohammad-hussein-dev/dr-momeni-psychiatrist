import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Video, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageProvider';
import { Reveal } from '../../../components/Reveal';
import { SectionHeading } from '../../../components/site/SectionHeading';

export const VisitFormatsSection: React.FC = () => {
  const { t, lang } = useLanguage();

  return (
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
                <Link
                  to="/panel"
                  state={{ visit_type: 'in_person' }}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-sm hover:opacity-95 transition-all"
                >
                  <span>{t('book_in_person')}</span>
                </Link>
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
                  state={{ visit_type: 'online' }}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-sm hover:opacity-95 transition-all"
                >
                  <span>{t('book_online')}</span>
                </Link>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
