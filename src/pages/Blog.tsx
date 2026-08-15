import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Search, Tag, BookOpen, Plus, Edit, Trash2, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/site/SectionHeading';
import { getAllPosts, deletePost, resetBlogToDefaults } from '../lib/blogStore';
import { BlogPost } from '../types';
import { getActiveSession } from '../lib/appointmentStore';
import { ArticleEditorModal } from '../components/admin/ArticleEditorModal';

export const Blog: React.FC = () => {
  const { t, lang, pick, isRTL } = useLanguage();
  const isFa = lang === 'fa';

  const [posts, setPosts] = useState<BlogPost[]>(getAllPosts());
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Auth state
  const [session, setSession] = useState(getActiveSession());
  const isDoctor = session?.role === 'doctor_admin';

  // Modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const refreshPosts = () => {
    setPosts(getAllPosts());
  };

  useEffect(() => {
    refreshPosts();

    const handleBlogUpdate = () => {
      refreshPosts();
    };

    const handleOpenModal = () => {
      setEditingPost(null);
      setIsEditorOpen(true);
    };

    const handleAuthChange = () => {
      setSession(getActiveSession());
    };

    window.addEventListener('blog_posts_updated', handleBlogUpdate);
    window.addEventListener('open_new_article_modal', handleOpenModal);
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('auth_state_changed', handleAuthChange);

    return () => {
      window.removeEventListener('blog_posts_updated', handleBlogUpdate);
      window.removeEventListener('open_new_article_modal', handleOpenModal);
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('auth_state_changed', handleAuthChange);
    };
  }, []);

  const categories = [
    { key: 'all', label_fa: 'همه مقالات', label_en: 'All Articles' },
    { key: 'anxiety', label_fa: 'اضطراب و پانیک', label_en: 'Anxiety & Panic' },
    { key: 'depression', label_fa: 'افسردگی و خلق', label_en: 'Depression & Mood' },
    { key: 'adhd', label_fa: 'بیش‌فعالی (ADHD)', label_en: 'Adult ADHD' },
    { key: 'couples', label_fa: 'روان‌درمانی و زوج', label_en: 'Psychotherapy' },
    { key: 'general', label_fa: 'مفاهیم روان‌پزشکی', label_en: 'Psychiatric Concepts' }
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCat === 'all' || post.category === selectedCat;
    const title = pick(post, 'title').toLowerCase();
    const excerpt = pick(post, 'excerpt').toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || title.includes(q) || excerpt.includes(q);
    return matchesCat && matchesSearch;
  });

  const handleDeletePost = (id: string, title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(isFa ? `آیا از حذف مقاله «${title}» اطمینان دارید؟` : `Delete article "${title}"?`)) {
      deletePost(id);
      setToastMessage(isFa ? 'مقاله با موفقیت حذف شد.' : 'Article deleted.');
      setTimeout(() => setToastMessage(''), 4000);
    }
  };

  const handleEditPost = (post: BlogPost, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleAddNew = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  return (
    <div className="pt-20 sm:pt-28 pb-16 overflow-hidden">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <SectionHeading
          kicker={t('blog_kicker')}
          title={t('blog_title')}
          intro={t('blog_intro')}
          align="center"
        />

        {/* In-Page Doctor Admin Control Bar */}
        {isDoctor && (
          <Reveal className="mt-6 max-w-4xl mx-auto">
            <div className="p-4 sm:p-5 rounded-3xl bg-primary/10 border-2 border-primary/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-foreground flex items-center gap-2">
                    <span>{isFa ? 'پنل مدیریت مقالات بالینی (دکتر فاطمه مومنی)' : 'Scientific Articles Editor (Dr. Fatemeh Momeni)'}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary text-primary-foreground font-semibold">
                      {posts.length} {isFa ? 'مقاله' : 'articles'}
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isFa ? 'شما در حال بررسی زنده وبلاگ هستید و می‌توانید مقالات را ایجاد، ویرایش یا حذف نمایید.' : 'Live in-page editor mode active. Create, update or remove articles on the fly.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleAddNew}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isFa ? 'نگارش و انتشار مقاله جدید' : 'Write New Article'}</span>
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          
          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCat(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCat === cat.key
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {lang === 'fa' ? cat.label_fa : cat.label_en}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-xs rounded-full border border-border/80 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 pl-9"
            />
            <Search className={`w-4 h-4 text-muted-foreground absolute top-2.5 ${isRTL ? 'left-3' : 'right-3'}`} />
          </div>

        </div>
      </section>

      {/* 2. POSTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-cream/40 rounded-3xl border border-border/60 max-w-lg mx-auto">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">{t('blog_empty')}</p>
            {isDoctor && (
              <button
                type="button"
                onClick={handleAddNew}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isFa ? 'افزودن اولین مقاله' : 'Add First Article'}</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <Reveal key={post.id} delay={idx * 60} className="h-full">
                <article className="group relative h-full rounded-3xl bg-card border border-border/80 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-primary/40 transition-all">
                  
                  {/* Doctor Card Admin Overlay Controls */}
                  {isDoctor && (
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-black/70 backdrop-blur-md p-1 rounded-xl shadow-lg border border-white/20">
                      <button
                        type="button"
                        onClick={(e) => handleEditPost(post, e)}
                        title={isFa ? 'ویرایش این مقاله' : 'Edit Article'}
                        className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-primary hover:text-white transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDeletePost(post.id, pick(post, 'title'), e)}
                        title={isFa ? 'حذف این مقاله' : 'Delete Article'}
                        className="p-1.5 rounded-lg bg-white/20 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={post.image_url}
                        alt={pick(post, 'title')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-xs font-semibold bg-card/90 text-primary backdrop-blur-xs shadow-2xs">
                        {pick(post, 'category')}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{post.read_minutes} {t('blog_read_min')}</span>
                        <span>•</span>
                        <span>{post.published_date}</span>
                      </div>

                      <h3 className="font-heading font-bold text-foreground text-lg group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        <Link to={`/blog/${post.slug}`}>
                          {pick(post, 'title')}
                        </Link>
                      </h3>

                      <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {pick(post, 'excerpt')}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-border/50 mt-4 flex items-center justify-between">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all pt-4"
                    >
                      <span>{t('read_more')}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>

                    {isDoctor && (
                      <span className="text-[10px] text-muted-foreground pt-4 font-mono">
                        ID: {post.id.slice(-6)}
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Editor Modal */}
      <ArticleEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        postToEdit={editingPost}
        onSaved={() => {
          refreshPosts();
          setToastMessage(isFa ? 'مقاله با موفقیت ذخیره شد.' : 'Article saved successfully.');
          setTimeout(() => setToastMessage(''), 4000);
        }}
      />

    </div>
  );
};
