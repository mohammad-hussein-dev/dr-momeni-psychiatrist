import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageProvider';
import { Reveal } from '../../../components/Reveal';
import { SectionHeading } from '../../../components/site/SectionHeading';
import { INITIAL_POSTS } from '../../../data/mockData';

export const BlogPreviewSection: React.FC = () => {
  const { t, pick, isRTL } = useLanguage();

  return (
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
  );
};
