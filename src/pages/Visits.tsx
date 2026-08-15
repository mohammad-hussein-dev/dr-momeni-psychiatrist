import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Video, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  Car,
  FileText,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/site/SectionHeading';
import { HospitalLocationMap } from '../components/site/HospitalLocationMap';

export const Visits: React.FC = () => {
  const { t, lang, isRTL } = useLanguage();

  const inPersonSteps = lang === 'fa'
    ? [
        'رزرو آنلاین یا تلفنی و دریافت پیامک تایید زمان ویزیت',
        'مراجعه به کلینیک تخصصی بیمارستان نیکان غرب',
        'مصاحبه بالینی جامع، ارزیابی تشخیصی و تنظیم برنامه درمان فردی'
      ]
    : [
        'Online/phone booking and SMS appointment confirmation',
        'Check-in at Nikan West Hospital Specialty Clinic',
        'Comprehensive psychiatric interview & personalized therapy plan'
      ];

  const onlineSteps = lang === 'fa'
    ? [
        'انتخاب زمان مناسب و تکمیل رزرو اینترنتی',
        'دریافت لینک اتاق امن و اختصاصی مشاوره ویدیویی',
        'ویزیت ویدیویی، ارزیابی بالینی و صدور نسخه الکترونیک معتبر'
      ]
    : [
        'Select preferred time slot and confirm booking',
        'Receive secure end-to-end encrypted video consultation link',
        'Live video consultation, clinical assessment & verified e-prescription'
      ];

  return (
    <div className="pt-20 sm:pt-28 pb-16 overflow-hidden">
      
      {/* 1. HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <SectionHeading
          kicker={t('visits_kicker')}
          title={t('visits_title')}
          intro={t('visits_intro')}
          align="center"
        />
      </section>

      {/* 2. VISIT TYPES COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* In-Person Card */}
          <Reveal delay={100} className="h-full">
            <div className="h-full rounded-3xl bg-card border border-border/80 p-8 sm:p-10 flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8" />
                </div>
                
                <h3 className="font-heading font-bold text-foreground text-2xl mb-3">
                  {t('visit_inperson_title')}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {t('visit_inperson_desc')}
                </p>

                <div className="space-y-3 pt-4 border-t border-border/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    {lang === 'fa' ? 'مراحل ویزیت حضوری:' : 'In-Person Consultation Flow:'}
                  </h4>
                  {Array.isArray(inPersonSteps) && inPersonSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90">
                      <span className="w-5 h-5 rounded-full bg-accent text-primary flex items-center justify-center font-bold shrink-0 text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/60">
                <Link
                  to="/panel"
                  state={{ visit_type: 'in_person' }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-95 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('book_in_person')}</span>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Online Card */}
          <Reveal delay={200} className="h-full">
            <div className="h-full rounded-3xl bg-card border border-secondary/50 p-8 sm:p-10 flex flex-col justify-between shadow-xs breathing-pulse">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-secondary/25 text-primary flex items-center justify-center mb-6">
                  <Video className="w-8 h-8" />
                </div>
                
                <h3 className="font-heading font-bold text-foreground text-2xl mb-3">
                  {t('visit_online_title')}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {t('visit_online_desc')}
                </p>

                <div className="space-y-3 pt-4 border-t border-border/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    {lang === 'fa' ? 'مراحل ویزیت آنلاین:' : 'Online Video Flow:'}
                  </h4>
                  {Array.isArray(onlineSteps) && onlineSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90">
                      <span className="w-5 h-5 rounded-full bg-accent text-primary flex items-center justify-center font-bold shrink-0 text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/60">
                <Link
                  to="/panel"
                  state={{ visit_type: 'online' }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:opacity-95 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('book_online')}</span>
                </Link>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 3. MAP & LOCATION OF NIKAN GHARB HOSPITAL */}
      <section className="section-pad bg-cream/60 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <HospitalLocationMap showTitle={true} />
          </Reveal>
        </div>
      </section>

      {/* 4. SECURITY & CONFIDENTIALITY DETAILS */}
      <section className="pt-16 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <div className="w-12 h-12 rounded-2xl bg-accent text-primary flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-foreground text-xl mb-2">
            {t('visit_online_security_title')}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto">
            {t('visit_online_security_desc')}
          </p>
        </Reveal>
      </section>

    </div>
  );
};
