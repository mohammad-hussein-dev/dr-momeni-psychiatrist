import React, { useState, useEffect } from 'react';
import { X, Save, Sparkles, Image as ImageIcon, Clock, BookOpen, Check, AlertCircle } from 'lucide-react';
import { BlogPost } from '../../types';
import { createPost, updatePost } from '../../lib/blogStore';
import { useLanguage } from '../../i18n/LanguageProvider';

interface ArticleEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  postToEdit?: BlogPost | null;
  onSaved?: (post: BlogPost) => void;
}

const PRESET_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80', label: 'مطب و سلامت روان' },
  { url: 'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?auto=format&fit=crop&w=1200&q=80', label: 'اضطراب و آرامش' },
  { url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80', label: 'دارو و عصب‌شناسی' },
  { url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80', label: 'تمرکز و مطالعه' },
  { url: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=1200&q=80', label: 'زوج‌درمانی و گفتگو' },
  { url: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80', label: 'مشاوره و روان‌درمانی' },
];

export const ArticleEditorModal: React.FC<ArticleEditorModalProps> = ({
  isOpen,
  onClose,
  postToEdit,
  onSaved
}) => {
  const { lang, isRTL } = useLanguage();
  const isFa = lang === 'fa';

  const [titleFa, setTitleFa] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState<'anxiety' | 'depression' | 'adhd' | 'general' | 'couples'>('anxiety');
  const [categoryFa, setCategoryFa] = useState('اضطراب و پانیک');
  const [categoryEn, setCategoryEn] = useState('Anxiety & Panic');
  const [excerptFa, setExcerptFa] = useState('');
  const [excerptEn, setExcerptEn] = useState('');
  const [bodyFa, setBodyFa] = useState('');
  const [bodyEn, setBodyEn] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [customImageInput, setCustomImageInput] = useState('');
  const [readMinutes, setReadMinutes] = useState(5);
  const [publishedDate, setPublishedDate] = useState('');
  const [authorFa, setAuthorFa] = useState('دکتر فاطمه مومنی');
  const [slug, setSlug] = useState('');

  const [activeTab, setActiveTab] = useState<'content' | 'preview'>('content');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (postToEdit) {
      setTitleFa(postToEdit.title_fa || '');
      setTitleEn(postToEdit.title_en || '');
      setCategory((postToEdit.category as any) || 'anxiety');
      setCategoryFa(postToEdit.category_fa || 'اضطراب و پانیک');
      setCategoryEn(postToEdit.category_en || 'Anxiety & Panic');
      setExcerptFa(postToEdit.excerpt_fa || '');
      setExcerptEn(postToEdit.excerpt_en || '');
      setBodyFa(postToEdit.body_fa || '');
      setBodyEn(postToEdit.body_en || '');
      setImageUrl(postToEdit.image_url || PRESET_IMAGES[0].url);
      setReadMinutes(postToEdit.read_minutes || 5);
      setPublishedDate(postToEdit.published_date || new Date().toISOString().split('T')[0]);
      setAuthorFa(postToEdit.author_fa || 'دکتر فاطمه مومنی');
      setSlug(postToEdit.slug || '');
    } else {
      // Default new template
      setTitleFa('');
      setTitleEn('');
      setCategory('anxiety');
      setCategoryFa('اضطراب و پانیک');
      setCategoryEn('Anxiety & Panic');
      setExcerptFa('');
      setExcerptEn('');
      setBodyFa(`### مقدمه و اهمیت موضوع
در این مقاله به بررسی بالینی یکی از اختلالات شایع روان‌پزشکی و راه‌های علمی درمان آن می‌پردازیم.

### ۱. نشانه‌ها و علائم اصلی
- نشانه‌های فیزیولوژیک و بدنی
- تغییرات شناختی و هیجانی
- تأثیر بر عملکرد فردی و اجتماعی

### ۲. رویکردهای نوین درمانی
درمان‌های ترکیبی شامل دارودرمانی تنظیم‌کننده با حداقل دوز و روان‌درمانی فردی، بالاترین میزان اثربخشی را ایجاد می‌کنند.

### توصیه‌های عملی
برای دریافت مشاوره تخصصی می‌توانید از طریق سیستم نوبت‌دهی آنلاین یا حضوری با دکتر فاطمه مومنی در ارتباط باشید.`);
      setBodyEn('');
      setImageUrl(PRESET_IMAGES[0].url);
      setReadMinutes(5);
      setPublishedDate(new Date().toISOString().split('T')[0]);
      setAuthorFa('دکتر فاطمه مومنی');
      setSlug('');
    }
    setErrorMsg('');
    setIsSuccess(false);
  }, [postToEdit, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (cat: 'anxiety' | 'depression' | 'adhd' | 'general' | 'couples') => {
    setCategory(cat);
    switch (cat) {
      case 'anxiety':
        setCategoryFa('اضطراب و پانیک');
        setCategoryEn('Anxiety & Panic');
        break;
      case 'depression':
        setCategoryFa('افسردگی و خلق');
        setCategoryEn('Depression & Mood');
        break;
      case 'adhd':
        setCategoryFa('بیش‌فعالی و تمرکز (ADHD)');
        setCategoryEn('Adult ADHD & Focus');
        break;
      case 'couples':
        setCategoryFa('روان‌درمانی و زوج‌درمانی');
        setCategoryEn('Psychotherapy & Couples');
        break;
      case 'general':
      default:
        setCategoryFa('مفاهیم پایه روان‌پزشکی');
        setCategoryEn('Foundational Concepts');
        break;
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleFa.trim()) {
      setErrorMsg(isFa ? 'لطفاً عنوان مقاله را به زبان فارسی وارد نمایید.' : 'Please provide a title in Persian.');
      return;
    }
    if (!bodyFa.trim()) {
      setErrorMsg(isFa ? 'متن مقاله نمی‌تواند خالی باشد.' : 'Article body cannot be empty.');
      return;
    }

    const finalImage = customImageInput.trim() || imageUrl;

    if (postToEdit) {
      const updated = updatePost(postToEdit.id, {
        title_fa: titleFa.trim(),
        title_en: titleEn.trim() || titleFa.trim(),
        category,
        category_fa: categoryFa,
        category_en: categoryEn,
        excerpt_fa: excerptFa.trim() || titleFa.trim().substring(0, 100) + '...',
        excerpt_en: excerptEn.trim() || excerptFa.trim(),
        body_fa: bodyFa.trim(),
        body_en: bodyEn.trim() || bodyFa.trim(),
        image_url: finalImage,
        read_minutes: Number(readMinutes) || 5,
        published_date: publishedDate || new Date().toISOString().split('T')[0],
        author_fa: authorFa.trim() || 'دکتر فاطمه مومنی',
        author_en: 'Dr. Fatemeh Momeni',
        slug: slug.trim() || undefined
      });
      if (updated && onSaved) onSaved(updated);
    } else {
      const created = createPost({
        title_fa: titleFa.trim(),
        title_en: titleEn.trim() || titleFa.trim(),
        category,
        category_fa: categoryFa,
        category_en: categoryEn,
        excerpt_fa: excerptFa.trim() || titleFa.trim().substring(0, 100) + '...',
        excerpt_en: excerptEn.trim() || excerptFa.trim(),
        body_fa: bodyFa.trim(),
        body_en: bodyEn.trim() || bodyFa.trim(),
        image_url: finalImage,
        read_minutes: Number(readMinutes) || 5,
        published_date: publishedDate || new Date().toISOString().split('T')[0],
        author_fa: authorFa.trim() || 'دکتر فاطمه مومنی',
        author_en: 'Dr. Fatemeh Momeni',
        slug: slug.trim() || undefined
      });
      if (onSaved) onSaved(created);
    }

    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden text-start">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-border/80 flex items-center justify-between bg-accent/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-foreground">
                {postToEdit 
                  ? (isFa ? 'ویرایش مقاله علمی' : 'Edit Scientific Article') 
                  : (isFa ? 'افزودن مقاله علمی جدید با جزییات بالا' : 'Add New Scientific Article')}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isFa ? 'نگارش و انتشار مستقیم توسط دکتر فاطمه مومنی در وب‌سایت' : 'Author & Publish directly by Dr. Fatemeh Momeni'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View tabs */}
            <div className="flex bg-muted/60 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'content' ? 'bg-card text-foreground shadow-2xs font-bold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isFa ? 'ویرایش محتوا' : 'Content Editor'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'preview' ? 'bg-card text-foreground shadow-2xs font-bold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isFa ? 'پیش‌نمایش' : 'Preview'}
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{isFa ? 'مقاله با موفقیت در وب‌سایت ذخیره و منتشر شد.' : 'Article successfully saved and published.'}</span>
            </div>
          )}

          {activeTab === 'content' ? (
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-2">
                  {isFa ? 'دسته‌بندی تخصصی مقاله' : 'Article Category'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'anxiety', label: 'اضطراب و پانیک' },
                    { id: 'depression', label: 'افسردگی و خلق' },
                    { id: 'adhd', label: 'بیش‌فعالی (ADHD)' },
                    { id: 'couples', label: 'زوج‌درمانی و ارتباط' },
                    { id: 'general', label: 'مفاهیم پایه' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                        category === cat.id
                          ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                          : 'bg-card border-border/80 text-muted-foreground hover:bg-accent/40'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    {isFa ? 'عنوان مقاله (فارسی) *' : 'Article Title (Persian) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={titleFa}
                    onChange={(e) => setTitleFa(e.target.value)}
                    placeholder="مثال: روش‌های نوین مهار حملات پانیک و تپش قلب..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    {isFa ? 'عنوان انگلیسی (اختیاری جهت SEO)' : 'English Title (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g. Modern Strategies to Manage Panic Attacks"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Excerpt / Summary */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {isFa ? 'خلاصه مقاله (Excerpt) — نمایش در کارت‌ها' : 'Article Excerpt'}
                </label>
                <textarea
                  rows={2}
                  value={excerptFa}
                  onChange={(e) => setExcerptFa(e.target.value)}
                  placeholder="خلاصه‌ای جذاب در ۲ الی ۳ خط که در صفحه اصلی و وبلاگ نمایش داده می‌شود..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Body Content */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-foreground">
                    {isFa ? 'متن کامل و تخصصی مقاله (پشتیبانی از سرفصل‌ها و پاراگراف‌ها) *' : 'Full Article Body *'}
                  </label>
                  <span className="text-[11px] text-muted-foreground">
                    {isFa ? 'می‌توانید از ### برای عنوان‌ها و - برای لیست استفاده کنید' : 'Supports markdown headings & lists'}
                  </span>
                </div>
                <textarea
                  rows={10}
                  required
                  value={bodyFa}
                  onChange={(e) => setBodyFa(e.target.value)}
                  placeholder="متن علمی، توصیه‌های بالینی، نکات دارودرمانی و روان‌پزشکی..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs font-mono focus:ring-2 focus:ring-primary/40 focus:outline-none leading-loose"
                />
              </div>

              {/* Image Selector */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-primary" />
                  <span>{isFa ? 'انتخاب تصویر شاخص مقاله' : 'Featured Image'}</span>
                </label>
                
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                  {PRESET_IMAGES.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setImageUrl(img.url);
                        setCustomImageInput('');
                      }}
                      className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all group ${
                        imageUrl === img.url && !customImageInput ? 'border-primary shadow-xs ring-2 ring-primary/30' : 'border-border/60 hover:opacity-90'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      <span className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] text-white p-0.5 truncate text-center">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>

                <input
                  type="url"
                  value={customImageInput}
                  onChange={(e) => setCustomImageInput(e.target.value)}
                  placeholder={isFa ? 'یا لینک تصویر دلخواه خود را وارد کنید (https://...)' : 'Or enter custom image URL (https://...)'}
                  className="w-full px-3.5 py-2 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  dir="ltr"
                />
              </div>

              {/* Metadata row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border/60">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    {isFa ? 'زمان مطالعه (دقیقه)' : 'Read Time (Minutes)'}
                  </label>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={readMinutes}
                      onChange={(e) => setReadMinutes(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    {isFa ? 'نام نویسنده' : 'Author Name'}
                  </label>
                  <input
                    type="text"
                    value={authorFa}
                    onChange={(e) => setAuthorFa(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    {isFa ? 'نامک یکتا (Slug انگلیسی)' : 'URL Slug'}
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="custom-article-slug"
                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-xs"
                    dir="ltr"
                  />
                </div>
              </div>

            </form>
          ) : (
            /* Live Preview Mode */
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-muted border border-border">
                <img
                  src={customImageInput || imageUrl}
                  alt={titleFa || 'پیش‌نمایش'}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[11px]">
                    {categoryFa}
                  </span>
                  <span>•</span>
                  <span>{readMinutes} دقیقه مطالعه</span>
                  <span>•</span>
                  <span>نویسنده: {authorFa}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-tight">
                  {titleFa || 'عنوان آزمایشی مقاله'}
                </h2>

                <p className="text-sm text-muted-foreground font-medium border-b border-border/70 pb-4">
                  {excerptFa || 'خلاصه مقاله در اینجا به نمایش در می‌آید...'}
                </p>

                <div className="whitespace-pre-line text-sm text-foreground/90 leading-relaxed font-sans pt-2">
                  {bodyFa || 'متن کامل مقاله در اینجا نمایش داده خواهد شد.'}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-border/80 bg-card flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {isFa ? 'انصراف' : 'Cancel'}
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{postToEdit ? (isFa ? 'ذخیره تغییرات مقاله' : 'Save Changes') : (isFa ? 'انتشار مقاله در سایت' : 'Publish Article')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
