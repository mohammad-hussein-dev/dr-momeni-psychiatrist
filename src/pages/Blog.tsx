import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  ArrowRight, 
  Search, 
  Tag as TagIcon, 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  FileText,
  Headphones,
  Star,
  Layers,
  Filter,
  Check
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/site/SectionHeading';
import { getAllPosts, deletePost } from '../lib/blogStore';
import { BlogPost, BlogCategoryKey } from '../types';
import { getActiveSession } from '../lib/appointmentStore';
import { ArticleEditorModal } from '../components/admin/ArticleEditorModal';

export const Blog: React.FC = () => {
  const { t, lang, pick, isRTL } = useLanguage();
  const isFa = lang === 'fa';

  const [posts, setPosts] = useState<BlogPost[]>(getAllPosts());
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterWithAttachmentsOnly, setFilterWithAttachmentsOnly] = useState(false);
  const [filterWithAudioOnly, setFilterWithAudioOnly] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('');
  
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

  const categories: { key: string; label_fa: string; label_en: string }[] = [
    { key: 'all', label_fa: 'همه مقالات', label_en: 'All Articles' },
    { key: 'anxiety', label_fa: 'اضطراب و پانیک', label_en: 'Anxiety & Panic' },
    { key: 'depression', label_fa: 'افسردگی و خلق', label_en: 'Depression & Mood' },
    { key: 'adhd', label_fa: 'بیش‌فعالی (ADHD)', label_en: 'Adult ADHD' },
    { key: 'sleep', label_fa: 'خواب و بی‌خوابی', label_en: 'Sleep Architecture' },
    { key: 'ocd', label_fa: 'وسواس (OCD)', label_en: 'OCD Care' },
    { key: 'bipolar', label_fa: 'اختلالات دوقطبی', label_en: 'Bipolar' },
    { key: 'psychosomatic', label_fa: 'روان‌تنی (IBS)', label_en: 'Psychosomatic' },
    { key: 'burnout', label_fa: 'فرسودگی شغلی', label_en: 'Burnout' },
    { key: 'children', label_fa: 'کودک و نوجوان', label_en: 'Child & Adolescent' },
    { key: 'couples', label_fa: 'زوج‌درمانی', label_en: 'Couples' },
    { key: 'general', label_fa: 'مفاهیم پایه', label_en: 'Foundations' }
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCat === 'all' || post.category === selectedCat;
    const title = pick(post, 'title').toLowerCase();
    const excerpt = pick(post, 'excerpt').toLowerCase();
    const body = pick(post, 'body').toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || title.includes(q) || excerpt.includes(q) || body.includes(q);

    const matchesAttachments = !filterWithAttachmentsOnly || (post.attachments && post.attachments.length > 0);
    const matchesAudio = !filterWithAudioOnly || !!post.audio_guide_url;
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));

    return matchesCat && matchesSearch && matchesAttachments && matchesAudio && matchesTag;
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
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
                    <span>{isFa ? 'مرکز مدیریت و انتشار مقالات بالینی (دکتر فاطمه مومنی)' : 'Scientific Articles CMS (Dr. Fatemeh Momeni)'}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary text-primary-foreground font-semibold">
                      {posts.length} {isFa ? 'مقاله علمی' : 'articles'}
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isFa ? 'قابلیت آپلود پیوست‌های PDF، فایل‌های صوتی، پرسشنامه‌ها، مرواریدهای بالینی و سوالات متداول.' : 'Upload PDFs, voice memos, clinical pearls & worksheets.'}
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
                  <span>{isFa ? 'نگارش مقاله جدید با آپلود فایل و صوت' : 'Write New Article with Uploads'}</span>
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Filter & Search Bar */}
        <div className="mt-8 space-y-4 max-w-5xl mx-auto">
          
          {/* Search + Quick Feature Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder={isFa ? 'جستجو در مقالات، داروها و علائم...' : t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-full border border-border/80 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 pl-9"
              />
              <Search className={`w-4 h-4 text-muted-foreground absolute top-3 ${isRTL ? 'left-3.5' : 'right-3.5'}`} />
            </div>

            {/* Quick Filter Badges */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
              <button
                type="button"
                onClick={() => setFilterWithAttachmentsOnly(!filterWithAttachmentsOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  filterWithAttachmentsOnly
                    ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                    : 'bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isFa ? 'دارای فایل PDF / کاربرگه' : 'With PDF Guides'}</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterWithAudioOnly(!filterWithAudioOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  filterWithAudioOnly
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>{isFa ? 'دارای پادکست صوتی' : 'With Audio Podcast'}</span>
              </button>

              {selectedTag && (
                <button
                  type="button"
                  onClick={() => setSelectedTag('')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground cursor-pointer"
                >
                  <TagIcon className="w-3 h-3" />
                  <span>#{selectedTag} (حذف)</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Chips Scrollbar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCat(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedCat === cat.key
                    ? 'bg-primary text-primary-foreground shadow-xs font-bold scale-[1.02]'
                    : 'bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {lang === 'fa' ? cat.label_fa : cat.label_en}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 2. POSTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-muted/20 rounded-3xl border border-border/60 max-w-lg mx-auto p-6 space-y-3">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto opacity-50" />
            <p className="text-sm font-semibold text-foreground">{t('blog_empty')}</p>
            <p className="text-xs text-muted-foreground">
              {isFa ? 'با تغییر فیلترها یا عبارت جستجو می‌توانید مقالات دیگر را بیابید.' : 'Try adjusting your search query or filters.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCat('all');
                setSearchQuery('');
                setFilterWithAttachmentsOnly(false);
                setFilterWithAudioOnly(false);
                setSelectedTag('');
              }}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold cursor-pointer"
            >
              <span>{isFa ? 'نمایش همه مقالات' : 'Reset Filters'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <Reveal key={post.id} delay={idx * 50} className="h-full">
                <article className="group relative h-full rounded-3xl bg-card border border-border/80 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-primary/40 transition-all text-start">
                  
                  {/* Doctor Card Admin Overlay Controls */}
                  {isDoctor && (
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-black/75 backdrop-blur-md p-1 rounded-xl shadow-lg border border-white/20">
                      <button
                        type="button"
                        onClick={(e) => handleEditPost(post, e)}
                        title={isFa ? 'ویرایش این مقاله' : 'Edit Article'}
                        className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-primary hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDeletePost(post.id, pick(post, 'title'), e)}
                        title={isFa ? 'حذف این مقاله' : 'Delete Article'}
                        className="p-1.5 rounded-lg bg-white/20 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div>
                    {/* Featured Image & Overlays */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={post.image_url}
                        alt={pick(post, 'title')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      <div className="absolute top-3.5 right-3.5 flex flex-col gap-1.5 items-end">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-card/90 text-primary backdrop-blur-xs shadow-xs">
                          {pick(post, 'category')}
                        </span>
                        {post.featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-xs">
                            <Star className="w-3 h-3 fill-slate-950" />
                            <span>{isFa ? 'ویژه' : 'Featured'}</span>
                          </span>
                        )}
                      </div>

                      {/* Bottom Image Badges (Audio & Attachments) */}
                      <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[10px] font-bold pointer-events-none">
                        {post.audio_guide_url ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-600/90 text-white backdrop-blur-xs shadow-xs">
                            <Headphones className="w-3 h-3" />
                            <span>{isFa ? 'پادکست صوتی' : 'Audio Track'}</span>
                          </span>
                        ) : <span></span>}

                        {post.attachments && post.attachments.length > 0 && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-600/90 text-white backdrop-blur-xs shadow-xs">
                            <FileText className="w-3 h-3" />
                            <span>{post.attachments.length} {isFa ? 'فایل ضمیمه' : 'Files'}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{post.read_minutes} {t('blog_read_min')}</span>
                        <span>•</span>
                        <span>{post.published_date}</span>
                        {post.verified_medical_review && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-0.5">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>{isFa ? 'تایید پزشک' : 'Verified'}</span>
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-foreground text-base sm:text-lg group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        <Link to={`/blog/${post.slug}`}>
                          {pick(post, 'title')}
                        </Link>
                      </h3>

                      <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {pick(post, 'excerpt')}
                      </p>

                      {/* Clinical Pearl Snippet preview */}
                      {post.clinical_pearl_fa && (
                        <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300 line-clamp-2 flex items-start gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                          <span>{post.clinical_pearl_fa}</span>
                        </div>
                      )}

                      {/* Tags chips */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {post.tags.slice(0, 3).map((tag, tIdx) => (
                            <button
                              key={tIdx}
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedTag(tag);
                              }}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0 border-t border-border/50 mt-2 flex items-center justify-between">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all pt-3.5"
                    >
                      <span>{t('read_more')}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>

                    {post.attachments && post.attachments.length > 0 && (
                      <span className="text-[10px] text-rose-500 font-semibold pt-3.5">
                        {isFa ? 'دانلود PDF و راهنما' : 'Downloadable'}
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
