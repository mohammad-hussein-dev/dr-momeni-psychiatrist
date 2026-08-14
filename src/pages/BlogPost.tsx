import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, ArrowLeft, Calendar, Share2, Award, BookOpen, Edit, Trash2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Reveal } from '../components/Reveal';
import { getPostBySlug, getAllPosts, deletePost } from '../lib/blogStore';
import { BrandLogo } from '../components/site/BrandLogo';
import { getActiveSession } from '../lib/appointmentStore';
import { ArticleEditorModal } from '../components/admin/ArticleEditorModal';
import { BlogPost as BlogPostType } from '../types';

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

  const reloadPost = () => {
    if (slug) {
      const found = getPostBySlug(slug);
      setPost(found);
    }
    setAllPosts(getAllPosts());
  };

  useEffect(() => {
    reloadPost();

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
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* In-Page Doctor Control Bar for this specific article */}
        {isDoctor && (
          <div className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/30 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>{isFa ? 'مدیریت این مقاله (دکتر فاطمه مومنی)' : 'Author Admin Controls'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditorOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>{isFa ? 'ویرایش متن و جزییات مقاله' : 'Edit Article'}</span>
              </button>

              <button
                type="button"
                onClick={handleDeleteThisPost}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 border border-rose-500/30 font-semibold transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isFa ? 'حذف مقاله' : 'Delete'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t('back_to_blog')}</span>
          </Link>
        </div>

        <Reveal>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="px-3 py-1 rounded-full bg-accent text-primary font-semibold">
              {pick(post, 'category')}
            </span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{post.read_minutes} {t('blog_read_min')}</span>
            </div>
            <span>•</span>
            <span>{post.published_date}</span>
            <span>•</span>
            <span>{isFa ? 'نویسنده:' : 'Author:'} {post.author_fa || 'دکتر فاطمه مومنی'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight mb-6">
            {pick(post, 'title')}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed border-b border-border/70 pb-6 mb-8 font-medium">
            {pick(post, 'excerpt')}
          </p>
        </Reveal>

        {/* Cover Image */}
        <Reveal delay={100} className="mb-10">
          <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-card bg-muted aspect-[16/9]">
            <img
              src={post.image_url}
              alt={pick(post, 'title')}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/doctor.png";
              }}
            />
          </div>
        </Reveal>

        {/* Post Body */}
        <Reveal delay={200} className="prose prose-lg max-w-none text-foreground/90 leading-loose space-y-6">
          <div className="whitespace-pre-line text-[16px] sm:text-[17px] leading-relaxed">
            {pick(post, 'body')}
          </div>
        </Reveal>

        {/* Author Footnote */}
        <Reveal delay={300} className="mt-12 p-6 rounded-3xl bg-cream/70 border border-border/70 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <BrandLogo size="lg" />
            <div>
              <p className="text-sm font-bold text-foreground">{t('brand_name')}</p>
              <p className="text-xs text-muted-foreground">{t('brand_role')} — {t('hospital')}</p>
            </div>
          </div>

          <Link
            to="/panel"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-sm hover:opacity-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('book_now')}</span>
          </Link>
        </Reveal>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border/60">
            <h3 className="font-heading font-bold text-xl text-foreground mb-6">
              {t('blog_related')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  className="rounded-2xl bg-card border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <h4 className="font-heading font-bold text-base text-foreground mb-2 line-clamp-2">
                    <Link to={`/blog/${rel.slug}`} className="hover:text-primary transition-colors">
                      {pick(rel, 'title')}
                    </Link>
                  </h4>
                  <Link
                    to={`/blog/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary pt-3"
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
