import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageProvider';
import { Reveal } from '../../../components/Reveal';
import { SectionHeading } from '../../../components/site/SectionHeading';
import { ShadowAvatar } from '../../../components/ShadowAvatar';
import { PatientReactionBar } from '../../../components/PatientReactionBar';
import { INITIAL_TESTIMONIALS } from '../../../data/mockData';

export const TestimonialsPreviewSection: React.FC = () => {
  const { t, lang, pick, isRTL } = useLanguage();

  return (
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
  );
};
