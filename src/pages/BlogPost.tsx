import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  Share2, 
  Award, 
  BookOpen, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles,
  Users,
  Tag,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ListOrdered,
  Download,
  Copy,
  Printer
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Reveal } from '../components/Reveal';
import { getPostBySlug, getAllPosts, deletePost } from '../lib/blogStore';
import { BrandLogo } from '../components/site/BrandLogo';
import { getActiveSession } from '../lib/appointmentStore';
import { ArticleEditorModal } from '../components/admin/ArticleEditorModal';
import { BlogPost as BlogPostType } from '../types';
import { AudioPlayerWidget } from '../components/site/AudioPlayerWidget';
import { BlogAttachmentsView } from '../components/site/BlogAttachmentsView';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, lang, pick, isRTL } = useLanguage();
  const isFa = lang === 'fa';

  const [post, setPost] = useState<BlogPostType | undefined>(() => slug ? getPostBySlug(slug) : undefined);
  const [allPosts, setAllPosts] = useState<BlogPostType[]>(getAllPosts());
  
  // Auth state
  const [session, setSession] = useState(getActiveSession());
  const isDoctor = session?.role === 'doctor_admin';

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<number, boolean>>({ 0: true });

  const reloadPost = () => {
    if (slug) {
      const found = getPostBySlug(slug);
      setPost(found);
    }
    setAllPosts(getAllPosts());
  };

  useEffect(() => {
    reloadPost();
    window.scrollTo(0, 0);

    const handleBlogUpdate = () => {
      reloadPost();
    };

    const handleAuthChange = () => {
      setSession(getActiveSession());
    };

    window.addEventListener('blog_posts_updated', handleBlogUpdate);
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('auth_state_changed', handleAuthChange);

    return () => {
      window.removeEventListener('blog_posts_updated', handleBlogUpdate);
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('auth_state_changed', handleAuthChange);
    };
  }, [slug]);

  if (!post) {
    return (
      <div className="pt-36 pb-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold font-heading mb-4">
          {lang === 'fa' ? 'مقاله مورد نظر یافت نشد' : 'Article Not Found'}
        </h2>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm"
        >
          <span>{t('back_to_blog')}</span>
        </Link>
      </div>
    );
  }

  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  const handleDeleteThisPost = () => {
    if (window.confirm(isFa ? `آیا از حذف مقاله «${pick(post, 'title')}» اطمینان دارید؟` : `Delete article "${pick(post, 'title')}"?`)) {
      deletePost(post.id);
      navigate('/blog');
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pick(post, 'title'),
        text: pick(post, 'excerpt'),
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToastMessage(isFa ? 'لینک مقاله در کلیپ‌بورد کپی شد.' : 'Article link copied to clipboard.');
      setTimeout(() => setToastMessage(''), 3500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-20 sm:pt-28 pb-16 overflow-hidden">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HEADER & META */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
        
        {/* In-Page Doctor Control Bar for this specific article */}
        {isDoctor && (
          <div className="mb-6 p-4 rounded-3xl bg-primary/10 border-2 border-primary/30 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>{isFa ? 'پنل مدیریت اختصاصی این مقاله (دکتر فاطمه مومنی)' : 'Author Admin Controls'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditorOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>{isFa ? 'ویرایش متن، آپلودها و تنظیمات' : 'Edit Article & Uploads'}</span>
              </button>

              <button
                type="button"
                onClick={handleDeleteThisPost}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 border border-rose-500/30 font-bold transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isFa ? 'حذف' : 'Delete'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Navigation & Action Bar */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t('back_to_blog')}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-xl border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              title={isFa ? 'چاپ مقاله' : 'Print'}
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted text-xs font-semibold transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{isFa ? 'اشتراک‌گذاری' : 'Share'}</span>
            </button>
          </div>
        </div>

        <Reveal>
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">
              {pick(post, 'category')}
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{post.read_minutes} {t('blog_read_min')}</span>
            </div>
            <span>•</span>
            <span>{post.published_date}</span>
            <span>•</span>
            <span className="font-semibold text-foreground">{isFa ? 'نویسنده:' : 'Author:'} {post.author_fa || 'دکتر فاطمه مومنی'}</span>
            
            {post.verified_medical_review && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isFa ? 'تایید بورد تخصصی روان‌پزشکی' : 'Peer-Reviewed Medical Board'}</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight mb-4">
            {pick(post, 'title')}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed border-b border-border/70 pb-6 mb-6 font-medium">
            {pick(post, 'excerpt')}
          </p>

          {/* Target Audience Banner */}
          {post.target_audience_fa && (
            <div className="mb-6 p-3.5 rounded-2xl bg-muted/40 border border-border/80 flex items-center gap-2.5 text-xs text-muted-foreground">
              <Users className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="font-bold text-foreground">{isFa ? 'جامعه هدف مقاله: ' : 'Target Audience: '}</span>
                <span>{post.target_audience_fa}</span>
              </div>
            </div>
          )}
        </Reveal>

        {/* Audio Guide Podcast Player (If available) */}
        {post.audio_guide_url && (
          <Reveal delay={80} className="mb-8">
            <AudioPlayerWidget
              audioUrl={post.audio_guide_url}
              title={post.audio_guide_title || pick(post, 'title')}
              author={post.author_fa || 'دکتر فاطمه مومنی'}
              durationSeconds={post.audio_duration_seconds}
            />
          </Reveal>
        )}

        {/* Cover Image */}
        <Reveal delay={100} className="mb-8">
          <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-border/80 bg-muted aspect-[16/9]">
            <img
              src={post.image_url}
              alt={pick(post, 'title')}
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>

        {/* Clinical Pearl Box (Golden Advice) */}
        {post.clinical_pearl_fa && (
          <Reveal delay={150} className="mb-8">
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border-2 border-amber-500/30 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-sm text-amber-700 dark:text-amber-300">
                  {isFa ? 'نکته کلیدی و مروارید بالینی دکتر فاطمه مومنی' : 'Clinical Pearl & Doctor Key Insight'}
                </h3>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
                  {post.clinical_pearl_fa}
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* Post Body (Markdown-like formatting) */}
        <Reveal delay={200} className="prose prose-lg max-w-none text-foreground/90 leading-loose space-y-6">
          <div className="whitespace-pre-line text-[16px] sm:text-[17px] leading-relaxed">
            {pick(post, 'body')}
          </div>
        </Reveal>

        {/* Downloadable Multi-format Attachments (PDF, Audio, Guides, Spreadsheets) */}
        {post.attachments && post.attachments.length > 0 && (
          <Reveal delay={250} className="mt-10">
            <BlogAttachmentsView attachments={post.attachments} />
          </Reveal>
        )}

        {/* Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <Reveal delay={270} className="mt-8 pt-4 border-t border-border/60">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                <span>{isFa ? 'برچسب‌ها:' : 'Tags:'}</span>
              </span>
              {post.tags.map((tag, idx) => (
                <Link
                  key={idx}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 rounded-xl text-xs font-medium bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </Reveal>
        )}

        {/* FAQ Accordion Section */}
        {post.faq_items && post.faq_items.length > 0 && (
          <Reveal delay={300} className="mt-12 p-6 rounded-3xl bg-card border border-border/80 space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border/60">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-bold text-base sm:text-lg text-foreground">
                {isFa ? 'پرسش‌های متداول مراجعین پیرامون این موضوع' : 'Frequently Asked Clinical Questions'}
              </h3>
            </div>

            <div className="space-y-3 pt-1">
              {post.faq_items.map((item, idx) => {
                const isOpen = !!openFaqIndices[idx];
                return (
                  <div
                    key={idx}
                    className="border border-border/80 rounded-2xl overflow-hidden transition-all bg-muted/20 hover:bg-muted/30"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 flex items-center justify-between gap-3 text-start font-bold text-xs sm:text-sm text-foreground cursor-pointer"
                    >
                      <span>{item.question_fa}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3 animate-in fade-in">
                        {item.answer_fa}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* Scientific References Section */}
        {post.scientific_references && post.scientific_references.length > 0 && (
          <Reveal delay={330} className="mt-8 p-5 rounded-2xl bg-muted/30 border border-border/60 text-xs text-muted-foreground space-y-2">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <ListOrdered className="w-4 h-4 text-primary" />
              <span>{isFa ? 'منابع علمی و رفرنس‌های بالینی این مقاله:' : 'Scientific References:'}</span>
            </div>
            <ul className="list-disc list-inside space-y-1 font-mono text-[11px] text-muted-foreground" dir="ltr">
              {post.scientific_references.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Author Doctor Card & Appointment Booking CTA */}
        <Reveal delay={350} className="mt-12 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/20 to-primary/5 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <BrandLogo size="lg" />
            <div>
              <p className="text-sm font-bold text-foreground">{t('brand_name')}</p>
              <p className="text-xs text-muted-foreground">{t('brand_role')} — {t('hospital')}</p>
              <p className="text-[11px] text-primary font-semibold mt-0.5">
                {isFa ? 'بورد تخصصی اعصاب و روان از دانشگاه علوم پزشکی مشهد' : 'Board-Certified Psychiatrist'}
              </p>
            </div>
          </div>

          <Link
            to="/panel"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{isFa ? 'رزرو نوبت حضوری یا آنلاین با دکتر مومنی' : t('book_now')}</span>
          </Link>
        </Reveal>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-14 pt-10 border-t border-border/60">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground mb-6">
              {t('blog_related')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  className="rounded-2xl bg-card border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                      {pick(rel, 'category')}
                    </span>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-foreground mt-2 mb-1.5 line-clamp-2">
                      <Link to={`/blog/${rel.slug}`} className="hover:text-primary transition-colors">
                        {pick(rel, 'title')}
                      </Link>
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {pick(rel, 'excerpt')}
                    </p>
                  </div>
                  
                  <Link
                    to={`/blog/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary pt-3 mt-2"
                  >
                    <span>{t('read_more')}</span>
                    <ArrowRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </article>

      {/* Editor Modal */}
      <ArticleEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        postToEdit={post}
        onSaved={(updated) => {
          setPost(updated);
          setToastMessage(isFa ? 'تغییرات مقاله با موفقیت ذخیره شد.' : 'Article changes saved.');
          setTimeout(() => setToastMessage(''), 4000);
        }}
      />

    </div>
  );
};
