import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Sparkles, 
  Image as ImageIcon, 
  Clock, 
  BookOpen, 
  Check, 
  AlertCircle, 
  FileText, 
  Headphones, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Star, 
  ShieldCheck, 
  Tag, 
  ListOrdered,
  Eye,
  FileCheck,
  FolderOpen
} from 'lucide-react';
import { BlogPost, BlogAttachment, BlogFAQItem, BlogCategoryKey } from '../../types';
import { createPost, updatePost } from '../../lib/blogStore';
import { DEFAULT_PRESET_COVERS } from '../../lib/coverImageStore';
import { useLanguage } from '../../i18n/LanguageProvider';
import { FileUploadDropzone } from './FileUploadDropzone';
import { CoverImageSelector } from './CoverImageSelector';
import { AudioPlayerWidget } from '../site/AudioPlayerWidget';
import { BlogAttachmentsView } from '../site/BlogAttachmentsView';

interface ArticleEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  postToEdit?: BlogPost | null;
  onSaved?: (post: BlogPost) => void;
}

const CATEGORY_OPTIONS: { id: BlogCategoryKey; labelFa: string; labelEn: string }[] = [
  { id: 'anxiety', labelFa: 'اضطراب و پانیک', labelEn: 'Anxiety & Panic' },
  { id: 'depression', labelFa: 'افسردگی و خلق', labelEn: 'Depression & Mood' },
  { id: 'adhd', labelFa: 'بیش‌فعالی (ADHD)', labelEn: 'Adult ADHD & Focus' },
  { id: 'sleep', labelFa: 'بهداشت و تنظیم خواب', labelEn: 'Sleep Architecture' },
  { id: 'ocd', labelFa: 'وسواس فکری-عملی (OCD)', labelEn: 'OCD Care' },
  { id: 'bipolar', labelFa: 'اختلالات دوقطبی', labelEn: 'Bipolar Spectrum' },
  { id: 'psychosomatic', labelFa: 'روان‌تنی (سایکوسوماتیک)', labelEn: 'Psychosomatic Medicine' },
  { id: 'burnout', labelFa: 'فرسودگی شغلی و استرس', labelEn: 'Occupational Burnout' },
  { id: 'children', labelFa: 'کودک و نوجوان', labelEn: 'Child & Adolescent' },
  { id: 'couples', labelFa: 'روان‌درمانی و زوج‌درمانی', labelEn: 'Couples & Psychotherapy' },
  { id: 'general', labelFa: 'مفاهیم پایه روان‌پزشکی', labelEn: 'Foundational Concepts' }
];

export const ArticleEditorModal: React.FC<ArticleEditorModalProps> = ({
  isOpen,
  onClose,
  postToEdit,
  onSaved
}) => {
  const { lang, isRTL } = useLanguage();
  const isFa = lang === 'fa';

  const [activeTab, setActiveTab] = useState<'content' | 'attachments' | 'advanced' | 'faq' | 'references' | 'preview'>('content');
  
  // Basic content
  const [titleFa, setTitleFa] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState<BlogCategoryKey>('anxiety');
  const [categoryFa, setCategoryFa] = useState('اضطراب و پانیک');
  const [categoryEn, setCategoryEn] = useState('Anxiety & Panic');
  const [excerptFa, setExcerptFa] = useState('');
  const [excerptEn, setExcerptEn] = useState('');
  const [bodyFa, setBodyFa] = useState('');
  const [bodyEn, setBodyEn] = useState('');
  const [imageUrl, setImageUrl] = useState(DEFAULT_PRESET_COVERS[0].url);
  const [customImageInput, setCustomImageInput] = useState('');
  const [readMinutes, setReadMinutes] = useState(5);
  const [publishedDate, setPublishedDate] = useState('');
  const [authorFa, setAuthorFa] = useState('دکتر فاطمه مومنی');
  const [slug, setSlug] = useState('');

  // Advanced & Clinical Fields
  const [featured, setFeatured] = useState(false);
  const [verifiedMedicalReview, setVerifiedMedicalReview] = useState(true);
  const [clinicalPearlFa, setClinicalPearlFa] = useState('');
  const [targetAudienceFa, setTargetAudienceFa] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [audioGuideUrl, setAudioGuideUrl] = useState('');
  const [audioGuideTitle, setAudioGuideTitle] = useState('');
  const [audioDurationSeconds, setAudioDurationSeconds] = useState(180);

  // Multi-format Attachments & FAQ
  const [attachments, setAttachments] = useState<BlogAttachment[]>([]);
  const [faqItems, setFaqItems] = useState<BlogFAQItem[]>([]);
  const [referencesInput, setReferencesInput] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (postToEdit) {
      setTitleFa(postToEdit.title_fa || '');
      setTitleEn(postToEdit.title_en || '');
      setCategory((postToEdit.category as BlogCategoryKey) || 'anxiety');
      setCategoryFa(postToEdit.category_fa || 'اضطراب و پانیک');
      setCategoryEn(postToEdit.category_en || 'Anxiety & Panic');
      setExcerptFa(postToEdit.excerpt_fa || '');
      setExcerptEn(postToEdit.excerpt_en || '');
      setBodyFa(postToEdit.body_fa || '');
      setBodyEn(postToEdit.body_en || '');
      setImageUrl(postToEdit.image_url || DEFAULT_PRESET_COVERS[0].url);
      setReadMinutes(postToEdit.read_minutes || 5);
      setPublishedDate(postToEdit.published_date || new Date().toISOString().split('T')[0]);
      setAuthorFa(postToEdit.author_fa || 'دکتر فاطمه مومنی');
      setSlug(postToEdit.slug || '');
      
      setFeatured(!!postToEdit.featured);
      setVerifiedMedicalReview(postToEdit.verified_medical_review !== false);
      setClinicalPearlFa(postToEdit.clinical_pearl_fa || '');
      setTargetAudienceFa(postToEdit.target_audience_fa || '');
      setTagsInput(postToEdit.tags?.join('، ') || '');
      setAudioGuideUrl(postToEdit.audio_guide_url || '');
      setAudioGuideTitle(postToEdit.audio_guide_title || '');
      setAudioDurationSeconds(postToEdit.audio_duration_seconds || 180);

      setAttachments(postToEdit.attachments || []);
      setFaqItems(postToEdit.faq_items || []);
      setReferencesInput(postToEdit.scientific_references?.join('\n') || '');
    } else {
      // Default initial template
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
- تأثیر بر عملکرد فردی و شغلی

### ۲. رویکردهای نوین درمانی
درمان‌های ترکیبی شامل دارودرمانی تنظیم‌کننده با حداقل دوز مؤثر و روان‌درمانی فردی، بالاترین میزان بهبودی پایدار را ایجاد می‌کنند.

### توصیه‌های عملی
برای دریافت مشاوره تخصصی می‌توانید از طریق سیستم نوبت‌دهی آنلاین یا حضوری با دکتر فاطمه مومنی در ارتباط باشید.`);
      setBodyEn('');
      setImageUrl(DEFAULT_PRESET_COVERS[0].url);
      setCustomImageInput('');
      setReadMinutes(5);
      setPublishedDate(new Date().toISOString().split('T')[0]);
      setAuthorFa('دکتر فاطمه مومنی');
      setSlug('');

      setFeatured(false);
      setVerifiedMedicalReview(true);
      setClinicalPearlFa('سلامت روان نیازمند ارزیابی علمی است؛ درمان به‌موقع مانع از مزمن شدن رنج‌های درونی می‌شود.');
      setTargetAudienceFa('عموم مراجعین و علاقه‌مندان به سلامت ذهن');
      setTagsInput('روان‌پزشکی، سلامت روان، دارودرمانی، مشاوره');
      setAudioGuideUrl('');
      setAudioGuideTitle('');
      setAudioDurationSeconds(180);

      setAttachments([]);
      setFaqItems([
        {
          question_fa: 'طول دوره درمان معمولاً چقدر است؟',
          answer_fa: 'بسته به شدت علائم و تشخیص بالینی، دوره‌های درمانی بین ۶ ماه تا یک سال متغیر است و قطع دارو همواره تدریجی خواهد بود.'
        }
      ]);
      setReferencesInput(`Kaplan & Sadock's Comprehensive Textbook of Psychiatry\nAmerican Psychiatric Association Practice Guidelines`);
    }

    setActiveTab('content');
    setErrorMsg('');
    setIsSuccess(false);
  }, [postToEdit, isOpen]);

  if (!isOpen) return null;

  const handleCategorySelect = (catKey: BlogCategoryKey) => {
    setCategory(catKey);
    const found = CATEGORY_OPTIONS.find(c => c.id === catKey);
    if (found) {
      setCategoryFa(found.labelFa);
      setCategoryEn(found.labelEn);
    }
  };

  const handleAddFaqItem = () => {
    setFaqItems([
      ...faqItems,
      {
        question_fa: '',
        answer_fa: '',
        question_en: '',
        answer_en: ''
      }
    ]);
  };

  const handleUpdateFaq = (index: number, field: keyof BlogFAQItem, val: string) => {
    const updated = [...faqItems];
    updated[index] = { ...updated[index], [field]: val };
    setFaqItems(updated);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqItems(faqItems.filter((_, i) => i !== index));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!titleFa.trim()) {
      setErrorMsg(isFa ? 'لطفاً عنوان مقاله را به زبان فارسی وارد نمایید.' : 'Please provide a title in Persian.');
      setActiveTab('content');
      return;
    }
    if (!bodyFa.trim()) {
      setErrorMsg(isFa ? 'متن مقاله نمی‌تواند خالی باشد.' : 'Article body cannot be empty.');
      setActiveTab('content');
      return;
    }

    const finalImage = customImageInput.trim() || imageUrl;
    const parsedTags = tagsInput
      .split(/[,،\n]+/)
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const parsedReferences = referencesInput
      .split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0);

    const postPayload = {
      title_fa: titleFa.trim(),
      title_en: titleEn.trim() || titleFa.trim(),
      category,
      category_fa: categoryFa,
      category_en: categoryEn,
      excerpt_fa: excerptFa.trim() || titleFa.trim().substring(0, 120) + '...',
      excerpt_en: excerptEn.trim() || excerptFa.trim(),
      body_fa: bodyFa.trim(),
      body_en: bodyEn.trim() || bodyFa.trim(),
      image_url: finalImage,
      read_minutes: Number(readMinutes) || 5,
      published_date: publishedDate || new Date().toISOString().split('T')[0],
      author_fa: authorFa.trim() || 'دکتر فاطمه مومنی',
      author_en: 'Dr. Fatemeh Momeni',
      slug: slug.trim() || undefined,

      featured,
      verified_medical_review: verifiedMedicalReview,
      clinical_pearl_fa: clinicalPearlFa.trim() || undefined,
      target_audience_fa: targetAudienceFa.trim() || undefined,
      tags: parsedTags.length > 0 ? parsedTags : undefined,
      audio_guide_url: audioGuideUrl.trim() || undefined,
      audio_guide_title: audioGuideTitle.trim() || undefined,
      audio_duration_seconds: Number(audioDurationSeconds) || undefined,

      attachments: attachments.length > 0 ? attachments : undefined,
      faq_items: faqItems.filter(f => f.question_fa.trim() && f.answer_fa.trim()),
      scientific_references: parsedReferences.length > 0 ? parsedReferences : undefined
    };

    if (postToEdit) {
      const updated = updatePost(postToEdit.id, postPayload);
      if (updated && onSaved) onSaved(updated);
    } else {
      const created = createPost(postPayload);
      if (onSaved) onSaved(created);
    }

    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[94vh] flex flex-col bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden text-start">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-accent/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-foreground">
                {postToEdit 
                  ? (isFa ? 'ویرایش جامع مقاله علمی و پزشکی' : 'Edit Medical Blog Article') 
                  : (isFa ? 'نگارش و انتشار مقاله تخصصی روان‌پزشکی' : 'Create New Clinical Article')}
              </h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground">
                {isFa ? 'پشتیبانی از آپلود چندفرمت (PDF, صوت, تصویر), سوالات متداول, مروارید بالینی و پیوست‌ها' : 'Supports Multi-format Uploads (PDF/Audio/Image), Clinical Pearls, FAQs & References'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Tabs Bar */}
        <div className="px-4 sm:px-6 pt-2 border-b border-border/60 bg-muted/20 overflow-x-auto flex gap-1.5 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'content'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isFa ? '۱. متن و محتوای اصلی' : '1. Main Content'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('attachments')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'attachments'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>{isFa ? `۲. پیوست‌ها و آپلود (${attachments.length})` : `2. Uploads & Files (${attachments.length})`}</span>
            {attachments.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('advanced')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'advanced'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFa ? '۳. گزینه‌های بالینی و سئو' : '3. Clinical Options & SEO'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'faq'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isFa ? `۴. سوالات متداول (${faqItems.length})` : `4. FAQs (${faqItems.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('references')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'references'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>{isFa ? '۵. رفرنس‌ها و منابع' : '5. References'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'preview'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isFa ? 'پیش‌نمایش نهایی' : 'Live Preview'}</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{isFa ? 'مقاله علمی با موفقیت ذخیره و منتشر شد.' : 'Article successfully published.'}</span>
            </div>
          )}

          {/* TAB 1: MAIN CONTENT */}
          {activeTab === 'content' && (
            <div className="space-y-5">
              {/* Category Selector Grid */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-2">
                  {isFa ? 'دسته‌بندی تخصصی مقاله روان‌پزشکی' : 'Specialized Clinical Category'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`p-2 rounded-xl text-[11px] font-semibold border transition-all text-center cursor-pointer truncate ${
                        category === cat.id
                          ? 'bg-primary text-primary-foreground border-primary shadow-xs font-bold'
                          : 'bg-card border-border/80 text-muted-foreground hover:bg-accent/40 hover:text-foreground'
                      }`}
                      title={isFa ? cat.labelFa : cat.labelEn}
                    >
                      {isFa ? cat.labelFa : cat.labelEn}
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
                    {isFa ? 'عنوان انگلیسی (جهت سئو و مراجعین بین‌المللی)' : 'English Title'}
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
                  {isFa ? 'خلاصه مقاله (Excerpt) — نمایش در کارت‌های وبلاگ' : 'Article Excerpt'}
                </label>
                <textarea
                  rows={2}
                  value={excerptFa}
                  onChange={(e) => setExcerptFa(e.target.value)}
                  placeholder="خلاصه‌ای جذاب در ۲ الی ۳ خط..."
                  className="w-full px-3.5 py-2 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Body Content */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-foreground">
                    {isFa ? 'متن کامل و تخصصی مقاله (مارک‌داون) *' : 'Full Article Body *'}
                  </label>
                  <span className="text-[11px] text-muted-foreground">
                    {isFa ? 'از ### برای تیترها، - برای لیست و **متن** برای بولد استفاده کنید' : 'Markdown supported'}
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

              {/* Cover Image Selector with Device Upload, /public/covers presets, and Media Library */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-primary" />
                  <span>{isFa ? 'مدیریت و انتخاب تصویر شاخص کاور مقاله (آپلود / کتابخانه / گالری)' : 'Article Cover Image Management'}</span>
                </label>
                
                <CoverImageSelector
                  currentImageUrl={imageUrl}
                  onSelectCover={(url) => {
                    setImageUrl(url);
                    setCustomImageInput('');
                  }}
                  selectedCategory={category}
                />
              </div>
            </div>
          )}

          {/* TAB 2: ATTACHMENTS & MULTI-FORMAT UPLOAD */}
          {activeTab === 'attachments' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-foreground">
                    {isFa ? 'مرکز مدیریت پیوست‌ها و فایل‌های دانلودی بیماران' : 'Patient Attachment Management Center'}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                    {isFa ? 'می‌توانید فایل‌های راهنما، پرسشنامه‌های خودارزیابی PDF، ویس‌های ضبط شده توضیحی یا اینفوگرافیک‌ها را آپلود نمایید تا مراجعین مستقیماً از صفحه مقاله دانلود کنند.' : 'Upload PDFs, Self-assessment guides, voice notes, or worksheets.'}
                  </p>
                </div>
              </div>

              <FileUploadDropzone
                attachments={attachments}
                onChange={setAttachments}
                onSetCoverImage={(img) => {
                  setImageUrl(img);
                  setCustomImageInput(img);
                }}
                onInsertInlineMarkdown={(md) => {
                  setBodyFa(prev => prev + md);
                  setActiveTab('content');
                }}
              />
            </div>
          )}

          {/* TAB 3: ADVANCED CLINICAL & SEO OPTIONS */}
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              
              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-card border border-border/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Star className="w-4 h-4 text-amber-500" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground">
                        {isFa ? 'مقاله ویژه و برگزیده (Featured)' : 'Featured Article'}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        {isFa ? 'نمایش در بالای صفحه وبلاگ با نشان طلایی' : 'Display on top of blog'}
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-5 h-5 rounded-lg accent-primary cursor-pointer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-card border border-border/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground">
                        {isFa ? 'نشان تایید و ارزیابی پزشکی' : 'Verified Medical Review'}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        {isFa ? 'نمایش نشان بورد تخصصی دکتر مومنی' : 'Dr. Momeni review badge'}
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={verifiedMedicalReview}
                    onChange={(e) => setVerifiedMedicalReview(e.target.checked)}
                    className="w-5 h-5 rounded-lg accent-primary cursor-pointer"
                  />
                </div>
              </div>

              {/* Clinical Pearl Box */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>{isFa ? 'نکته کلیدی و مروارید بالینی (Clinical Pearl)' : 'Clinical Pearl'}</span>
                </label>
                <textarea
                  rows={2}
                  value={clinicalPearlFa}
                  onChange={(e) => setClinicalPearlFa(e.target.value)}
                  placeholder="نکته طلایی و آرامش‌بخش برای بیمار در یک قاب برجسته..."
                  className="w-full px-3.5 py-2 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {isFa ? 'جامعه هدف مقاله (چه کسانی باید بخوانند؟)' : 'Target Audience'}
                </label>
                <input
                  type="text"
                  value={targetAudienceFa}
                  onChange={(e) => setTargetAudienceFa(e.target.value)}
                  placeholder="مثال: مراجعین با سابقه اضطراب فراگیر، خانواده بیماران و شاغلین"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>

              {/* Audio Podcast Guide */}
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/80 space-y-3">
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-primary" />
                  <h4 className="text-xs font-bold text-foreground">
                    {isFa ? 'فایل صوتی و پادکست توضیحی مقاله' : 'Audio Guide & Voice Podcast'}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">
                      {isFa ? 'عنوان صوت پادکست' : 'Audio Title'}
                    </label>
                    <input
                      type="text"
                      value={audioGuideTitle}
                      onChange={(e) => setAudioGuideTitle(e.target.value)}
                      placeholder="پادکست آموزشی: راهنمای تنفس آرامش و توقف پانیک..."
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-muted-foreground mb-1">
                      {isFa ? 'لینک مستقیم صوت (URL / MP3)' : 'Direct Audio URL'}
                    </label>
                    <input
                      type="url"
                      value={audioGuideUrl}
                      onChange={(e) => setAudioGuideUrl(e.target.value)}
                      placeholder="https://.../podcast.mp3"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Tags & Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border/60">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-primary" />
                    <span>{isFa ? 'برچسب‌ها و کلمات کلیدی (جداشده با ویرگول)' : 'Tags (comma separated)'}</span>
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="پانیک، اضطراب، تپش قلب، آرام‌سازی"
                    className="w-full px-3.5 py-2 rounded-xl border border-border/80 bg-background text-foreground text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    {isFa ? 'زمان مطالعه (دقیقه)' : 'Read Time'}
                  </label>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      min={1}
                      max={45}
                      value={readMinutes}
                      onChange={(e) => setReadMinutes(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAQS */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-foreground">
                    {isFa ? 'پرسش‌ها و پاسخ‌های متداول بالینی' : 'Clinical Frequently Asked Questions (FAQ)'}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {isFa ? 'پاسخ به سوالات پرتکرار مراجعین پیرامون این اختلال و روند درمان' : 'Direct answers to patients queries'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddFaqItem}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isFa ? 'افزودن پرسش' : 'Add FAQ'}</span>
                </button>
              </div>

              {faqItems.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-border rounded-2xl space-y-2">
                  <HelpCircle className="w-8 h-8 text-muted-foreground mx-auto opacity-50" />
                  <p className="text-xs text-muted-foreground">
                    {isFa ? 'هنوز سوال متداولی ثبت نشده است.' : 'No FAQs added yet.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleAddFaqItem}
                    className="text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    {isFa ? '+ افزودن اولین پرسش بالینی' : '+ Add first FAQ'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {faqItems.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-card border border-border/80 space-y-2.5 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary">
                          {isFa ? `پرسش شماره ${idx + 1}` : `Question #${idx + 1}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(idx)}
                          className="p-1 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={item.question_fa}
                        onChange={(e) => handleUpdateFaq(idx, 'question_fa', e.target.value)}
                        placeholder={isFa ? 'متن سوال (مثال: آیا این دارو اعتیادآور است؟)' : 'Question...'}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs font-bold"
                      />

                      <textarea
                        rows={2}
                        value={item.answer_fa}
                        onChange={(e) => handleUpdateFaq(idx, 'answer_fa', e.target.value)}
                        placeholder={isFa ? 'پاسخ پزشک...' : 'Answer...'}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SCIENTIFIC REFERENCES */}
          {activeTab === 'references' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-foreground">
                  {isFa ? 'منابع و رفرنس‌های علمی معتبر (کتاب‌ها و مقالات)' : 'Scientific References & Citations'}
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  {isFa ? 'هر منبع را در یک خط جداگانه بنویسید (مثال: Kaplan & Sadock, DSM-5-TR, Lancet Psychiatry)' : 'Enter each reference on a new line.'}
                </p>
              </div>

              <textarea
                rows={8}
                value={referencesInput}
                onChange={(e) => setReferencesInput(e.target.value)}
                placeholder={`Kaplan & Sadock's Comprehensive Textbook of Psychiatry\nDiagnostic and Statistical Manual of Mental Disorders (DSM-5-TR)\nAmerican Psychiatric Association Practice Guidelines`}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs font-mono focus:ring-2 focus:ring-primary/40 focus:outline-none leading-relaxed"
                dir="ltr"
              />
            </div>
          )}

          {/* TAB 6: LIVE PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-6 max-w-3xl mx-auto text-start">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-muted border border-border">
                <img
                  src={customImageInput || imageUrl}
                  alt={titleFa || 'پیش‌نمایش'}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[11px]">
                    {categoryFa}
                  </span>
                  <span>•</span>
                  <span>{readMinutes} دقیقه مطالعه</span>
                  <span>•</span>
                  <span>نویسنده: {authorFa}</span>
                  {verifiedMedicalReview && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>تایید بورد تخصصی</span>
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-tight">
                  {titleFa || 'عنوان آزمایشی مقاله'}
                </h2>

                <p className="text-sm text-muted-foreground font-medium border-b border-border/70 pb-4 leading-relaxed">
                  {excerptFa || 'خلاصه مقاله در اینجا به نمایش در می‌آید...'}
                </p>

                {/* Audio Podcast in preview */}
                {audioGuideUrl && (
                  <AudioPlayerWidget
                    audioUrl={audioGuideUrl}
                    title={audioGuideTitle}
                    author={authorFa}
                    durationSeconds={audioDurationSeconds}
                  />
                )}

                {/* Clinical Pearl in preview */}
                {clinicalPearlFa && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-amber-600 dark:text-amber-400">مروارید بالینی دکتر فاطمه مومنی</h4>
                      <p className="text-xs text-foreground mt-0.5 leading-relaxed">{clinicalPearlFa}</p>
                    </div>
                  </div>
                )}

                {/* Body */}
                <div className="whitespace-pre-line text-sm text-foreground/90 leading-loose font-sans pt-2">
                  {bodyFa || 'متن کامل مقاله در اینجا نمایش داده خواهد شد.'}
                </div>

                {/* Attachments in preview */}
                {attachments.length > 0 && (
                  <BlogAttachmentsView attachments={attachments} />
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-border/80 bg-card flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            {isFa ? 'انصراف' : 'Cancel'}
          </button>

          <div className="flex items-center gap-2">
            {activeTab !== 'preview' && (
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-border text-foreground hover:bg-accent/40 transition-colors cursor-pointer"
              >
                {isFa ? 'مشاهده پیش‌نمایش' : 'Preview'}
              </button>
            )}

            <button
              type="button"
              onClick={() => handleSave()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{postToEdit ? (isFa ? 'ذخیره تغییرات مقاله' : 'Save Changes') : (isFa ? 'انتشار مقاله در سایت' : 'Publish Article')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
