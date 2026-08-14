import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Calendar,
  Clock,
  ShieldCheck,
  Award,
  Sparkles,
  Activity,
  Brain
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { serviceKeys } from '../i18n/translations';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/site/SectionHeading';
import { ServiceCard } from '../components/site/ServiceCard';

export const Services: React.FC = () => {
  const { t, lang, isRTL } = useLanguage();

  return (
    <div className="pt-20 sm:pt-28 pb-16 overflow-hidden">
      
      {/* 1. HERO HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <SectionHeading
          kicker={t('services_kicker')}
          title={t('services_title')}
          intro={t('services_intro')}
          align="center"
        />
      </section>

      {/* 2. SERVICES GRID (9 Comprehensive Services) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </section>

      {/* 3. NON-PHARMACOLOGICAL & BRAIN TECH HIGHLIGHT */}
      <section className="py-14 bg-accent/20 border-y border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'تکنولوژی‌های نوین مغزی' : 'Advanced Neurotechnologies'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                  {lang === 'fa' ? 'درمان‌های غیردارویی، نقشه مغزی و تحریک الکتریکی و مغناطیسی' : 'Non-Pharmacological & Neuromodulation Treatments'}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {lang === 'fa' 
                    ? 'انجام و تفسیر تخصصی نوار مغز (EEG) و نقشه رنگی مغزی (QEEG)، نوروفیدبک، تحریک مغناطیسی مکرر مغز (rTMS) و تحریک الکتریکی جریان مستقیم (tDCS) برای درمان افسردگی مقاوم، اضطراب، بیش‌فعالی و ارتقای تمرکز.'
                    : 'Specialized EEG and QEEG brain mapping interpretation, neurofeedback, rTMS, and tDCS for treatment-resistant depression, anxiety, ADHD, and cognitive enhancement.'}
                </p>
              </div>

              <Link
                to="/panel"
                state={{ service: 'non_pharma' }}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold btn-soft-glow hover:opacity-95 transition-all shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('book_now')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLINICAL STANDARDS STRIP */}
      <section className="py-14 bg-cream/60 border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-start">
            
            <Reveal delay={0} className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-sm mb-1">
                  {lang === 'fa' ? 'رازداری مطلق بالینی' : 'Absolute Confidentiality'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {lang === 'fa' ? 'تمامی پرونده‌ها و اطلاعات پزشکی در بالاترین سطح حفاظت نگهداری می‌شوند.' : 'All medical records and consultations remain strictly confidential.'}
                </p>
              </div>
            </Reveal>

            <Reveal delay={80} className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-sm mb-1">
                  {lang === 'fa' ? 'زمان‌بندی اختصاصی' : 'Dedicated Consultation Time'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {lang === 'fa' ? 'جلسات تشخیصی ۴۵ تا ۶۰ دقیقه برای ارزیابی جامع بالینی اختصاص می‌یابد.' : 'Full 45-60 minute structured sessions ensuring comprehensive clinical assessment.'}
                </p>
              </div>
            </Reveal>

            <Reveal delay={160} className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-sm mb-1">
                  {lang === 'fa' ? 'راهنماهای بالینی APA' : 'APA & CANMAT Guidelines'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {lang === 'fa' ? 'انطباق کامل فرایند درمان با به‌روزترین استانداردهای بین‌المللی روان‌پزشکی.' : 'Adherence to the latest evidence-based psychiatric guidelines.'}
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="pt-16 text-center max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-3">
            {lang === 'fa' ? 'نیاز به راهنمایی در انتخاب نوع خدمت دارید؟' : 'Need Assistance Choosing the Right Service?'}
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm mb-6 max-w-lg mx-auto">
            {lang === 'fa' 
              ? 'می‌توانید با مطب تماس حاصل فرمایید یا در سامانه رزرواسیون وقت مشاوره خود را ثبت کنید.'
              : 'Feel free to contact our clinic directly or easily schedule your initial session via our patient portal.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/panel"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm btn-soft-glow hover:opacity-95 transition-all shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('book_now')}</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card text-foreground font-semibold text-xs sm:text-sm hover:border-primary/40 hover:text-primary transition-all shadow-2xs"
            >
              <span>{t('contact_us')}</span>
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
};
