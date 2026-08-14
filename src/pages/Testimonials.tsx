import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Quote, 
  ShieldCheck, 
  Heart, 
  Calendar, 
  BadgeCheck, 
  ThumbsUp, 
  MessageSquarePlus, 
  Sparkles, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Video,
  X,
  Send,
  Users,
  Trash2,
  Edit,
  Plus,
  Check
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/site/SectionHeading';
import { 
  getAllTestimonials, 
  deleteTestimonial, 
  toggleTestimonialVerified, 
  createTestimonial 
} from '../lib/testimonialsStore';
import { Testimonial } from '../types';
import { ShadowAvatar, ShadowAvatarType } from '../components/ShadowAvatar';
import { PatientReactionBar } from '../components/PatientReactionBar';
import { ClinicalStatsBanner } from '../components/site/ClinicalStatsBanner';
import { getActiveSession } from '../lib/appointmentStore';
import { TestimonialEditorModal } from '../components/admin/TestimonialEditorModal';

export const Testimonials: React.FC = () => {
  const { t, lang, pick, isRTL } = useLanguage();
  const isFa = lang === 'fa';
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(getAllTestimonials());
  
  // Auth state
  const [session, setSession] = useState(getActiveSession());
  const isDoctor = session?.role === 'doctor_admin';

  // Modal & Toast States
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState<boolean>(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [submittedToast, setSubmittedToast] = useState<string | null>(null);

  const [helpfulLikes, setHelpfulLikes] = useState<Record<string, number>>({
    '1': 24,
    '2': 38,
    '3': 19,
    '4': 29,
    '5': 22,
    '6': 15
  });

  const [newReview, setNewReview] = useState<{
    persona_title: string;
    shadow_avatar: ShadowAvatarType;
    author_label: string;
    body: string;
    rating: number;
    category: 'anxiety' | 'depression' | 'adhd' | 'couples' | 'online';
    visit_type: 'in_person' | 'online';
    treatment_duration: string;
  }>({
    persona_title: '',
    shadow_avatar: 'calm_mind',
    author_label: '',
    body: '',
    rating: 5,
    category: 'anxiety',
    visit_type: 'online',
    treatment_duration: 'دوره درمانی: ۳ ماه'
  });

  const refreshList = () => {
    setTestimonialsList(getAllTestimonials());
  };

  useEffect(() => {
    refreshList();

    const handleUpdate = () => {
      refreshList();
    };

    const handleOpenDoctorModal = () => {
      setEditingTestimonial(null);
      setIsDoctorModalOpen(true);
    };

    const handleAuthChange = () => {
      setSession(getActiveSession());
    };

    window.addEventListener('testimonials_updated', handleUpdate);
    window.addEventListener('open_new_testimonial_modal', handleOpenDoctorModal);
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('auth_state_changed', handleAuthChange);

    return () => {
      window.removeEventListener('testimonials_updated', handleUpdate);
      window.removeEventListener('open_new_testimonial_modal', handleOpenDoctorModal);
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('auth_state_changed', handleAuthChange);
    };
  }, []);

  const shadowAvatarOptions: { type: ShadowAvatarType; label_fa: string; label_en: string }[] = [
    { type: 'calm_mind', label_fa: 'ذهن آرام (زمردی)', label_en: 'Calm Mind' },
    { type: 'seeker_light', label_fa: 'جوینده نور (طلایی)', label_en: 'Seeker of Light' },
    { type: 'focus_spark', label_fa: 'تمرکز ژرف (آبی)', label_en: 'Sharp Focus' },
    { type: 'harmony_duo', label_fa: 'پیوند مهر (رز)', label_en: 'Harmony & Duo' },
    { type: 'resilient_shield', label_fa: 'سپر تاب‌آوری (فیروزه‌ای)', label_en: 'Resilient Shield' },
    { type: 'night_awakening', label_fa: 'آرامش شبانه (بنفش)', label_en: 'Night Traveler' },
    { type: 'hope_wings', label_fa: 'پرواز امید (لاجوردی)', label_en: 'Wings of Hope' },
    { type: 'inner_sun', label_fa: 'آفتاب درون (کهربایی)', label_en: 'Inner Sun' },
    { type: 'breeze_zen', label_fa: 'نسیم رهایی (نعنایی)', label_en: 'Mindful Breeze' },
    { type: 'compass_path', label_fa: 'قطب‌نمای مسیر (نیلی)', label_en: 'Compass Guide' }
  ];

  const filterCategories = [
    { key: 'all', label_fa: 'همه تجارب درمان', label_en: 'All Experiences' },
    { key: 'anxiety', label_fa: 'اضطراب و پانیک (Panic & GAD)', label_en: 'Anxiety & Panic' },
    { key: 'depression', label_fa: 'افسردگی و خواب (Depression & Sleep)', label_en: 'Depression & Sleep' },
    { key: 'adhd', label_fa: 'بیش‌فعالی بزرگسالان (Adult ADHD)', label_en: 'Adult ADHD & Focus' },
    { key: 'couples', label_fa: 'زوج‌درمانی و ارتباط (Couples)', label_en: 'Couples Therapy' },
    { key: 'online', label_fa: 'ویزیت آنلاین و خارج از کشور', label_en: 'Online & Diaspora' }
  ];

  const filteredItems = testimonialsList.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  // Doctor in-page delete
  const handleDeleteItem = (id: string, name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(isFa ? `آیا از حذف این نظر یا تجربه مراجع («${name}») اطمینان دارید؟` : `Delete review from "${name}"?`)) {
      deleteTestimonial(id);
      setSubmittedToast(isFa ? 'نظر مورد نظر با موفقیت حذف گردید.' : 'Review deleted successfully.');
      setTimeout(() => setSubmittedToast(null), 4000);
    }
  };

  // Doctor in-page verify toggle
  const handleToggleVerified = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = toggleTestimonialVerified(id);
    setSubmittedToast(newStatus ? (isFa ? 'وضعیت به «مراجع تاییدشده» تغییر یافت.' : 'Marked as verified.') : (isFa ? 'نشان تایید از این نظر برداشته شد.' : 'Unmarked verified status.'));
    setTimeout(() => setSubmittedToast(null), 3000);
  };

  // Doctor in-page edit
  const handleEditItem = (item: Testimonial, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingTestimonial(item);
    setIsDoctorModalOpen(true);
  };

  const handleSubmitPatientReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.body.trim()) return;

    const personaName = newReview.persona_title.trim() || (lang === 'fa' ? 'روایت‌گر آرامش' : 'Peace Seeker');
    createTestimonial({
      author_initial: personaName,
      persona_title_fa: personaName,
      persona_title_en: personaName,
      shadow_avatar: newReview.shadow_avatar,
      author_label_fa: newReview.author_label || (newReview.visit_type === 'online' ? 'مراجع ویزیت آنلاین' : 'مراجع ویزیت حضوری بیمارستان نیکان'),
      author_label_en: newReview.author_label || (newReview.visit_type === 'online' ? 'Online Consultation Client' : 'In-Person Client at Nikan Hospital'),
      body_fa: newReview.body,
      body_en: newReview.body,
      rating: newReview.rating,
      service_tag: newReview.category,
      service_tag_fa: lang === 'fa' ? 'تجربه درمانی ثبت‌شده جدید' : 'Newly Verified Patient Care',
      service_tag_en: 'Newly Verified Care Review',
      order: 0,
      visit_type: newReview.visit_type,
      category: newReview.category,
      treatment_duration_fa: newReview.treatment_duration,
      treatment_duration_en: 'Care Duration: 3+ Months',
      verified: true,
      location_tag_fa: newReview.visit_type === 'online' ? 'ویزیت آنلاین' : 'بیمارستان نیکان غرب',
      location_tag_en: newReview.visit_type === 'online' ? 'Online Care' : 'Nikan Gharb Hospital',
      outcome_badge_fa: 'ثبت‌شده در سامانه مراجعین',
      outcome_badge_en: 'Verified Patient Submission',
      date_str: lang === 'fa' ? 'امروز' : 'Today'
    });

    setShowSubmitModal(false);
    setSubmittedToast(isFa ? 'سپاس از اشتراک‌گذاری تجربه ارزشمندتان. نظر شما با حفظ کامل محرمانگی ثبت شد.' : 'Thank you for sharing your feedback.');
    setNewReview({
      persona_title: '',
      shadow_avatar: 'calm_mind',
      author_label: '',
      body: '',
      rating: 5,
      category: 'anxiety',
      visit_type: 'online',
      treatment_duration: 'دوره درمانی: ۳ ماه'
    });

    setTimeout(() => {
      setSubmittedToast(null);
    }, 6000);
  };

  return (
    <div className="pt-20 sm:pt-28 pb-16 overflow-hidden">
      
      {/* 1. HERO HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <SectionHeading
          kicker={t('testi_kicker')}
          title={t('testi_title')}
          intro={t('testi_intro')}
          align="center"
        />

        {/* Doctor Admin In-Page Control Bar */}
        {isDoctor && (
          <Reveal className="mt-6 max-w-5xl mx-auto">
            <div className="p-4 sm:p-5 rounded-3xl bg-primary/10 border-2 border-primary/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-foreground flex items-center gap-2">
                    <span>{isFa ? 'پنل نظارت بر نظرات و کامنت‌های مراجعین (دکتر فاطمه مومنی)' : 'Patient Reviews & Comments Moderation (Dr. Fatemeh Momeni)'}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary text-primary-foreground font-semibold">
                      {testimonialsList.length} {isFa ? 'تجربه ثبت شده' : 'reviews'}
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isFa ? 'شما می‌توانید نظرات را بررسی، تایید، ویرایش کرده و یا کامنت‌های نامناسب را بلافاصله حذف نمایید.' : 'Live moderation active. You can approve, edit, or delete patient comments directly on cards.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTestimonial(null);
                    setIsDoctorModalOpen(true);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isFa ? 'ثبت گزارش بالینی / نظر جدید' : 'Add Verified Review'}</span>
                </button>
              </div>
            </div>
          </Reveal>
        )}

        {/* Clinical Trust KPI Banner */}
        <Reveal delay={100} className="mt-8 max-w-5xl mx-auto">
          <ClinicalStatsBanner />
        </Reveal>
      </section>

      {/* 2. FILTER TABS & ACTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/60 pb-5">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                }`}
              >
                {lang === 'fa' ? cat.label_fa : cat.label_en}
              </button>
            ))}
          </div>

          {/* Share Review Action */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/80 hover:bg-accent text-primary border border-primary/30 text-xs font-semibold transition-all shadow-2xs shrink-0 cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>{lang === 'fa' ? 'ثبت تجربه درمان (محرمانه)' : 'Share Experience (Anonymous)'}</span>
          </button>
        </div>

        {/* Toast */}
        {submittedToast && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white border border-primary/40 flex items-center gap-3 text-xs sm:text-sm animate-fade-in shadow-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{submittedToast}</span>
          </div>
        )}
      </section>

      {/* 3. TESTIMONIALS CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const likesCount = helpfulLikes[item.id] || 12;
            const personaName = lang === 'fa' ? (item.persona_title_fa || item.author_initial) : (item.persona_title_en || item.author_initial);

            return (
              <Reveal key={item.id} delay={idx * 50} className="h-full">
                <div className="relative h-full rounded-2xl sm:rounded-3xl bg-card border border-border/80 p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-primary/40 hover:shadow-md transition-all group">
                  
                  {/* Doctor Card Admin Action Controls */}
                  {isDoctor && (
                    <div className="mb-3 p-2 rounded-xl bg-muted/60 border border-border flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleToggleVerified(item.id, e)}
                          title={isFa ? 'تغییر وضعیت تایید پرونده' : 'Toggle Verified Status'}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                            item.verified 
                              ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' 
                              : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                          }`}
                        >
                          <BadgeCheck className="w-3 h-3" />
                          <span>{item.verified ? (isFa ? 'تایید شده' : 'Verified') : (isFa ? 'نیازمند تایید' : 'Pending')}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleEditItem(item, e)}
                          title={isFa ? 'ویرایش این نظر' : 'Edit review'}
                          className="p-1.5 rounded-lg bg-card hover:bg-primary hover:text-white text-muted-foreground border border-border transition-colors cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteItem(item.id, personaName, e)}
                          title={isFa ? 'حذف این کامنت / نظر' : 'Delete comment'}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 hover:text-white text-rose-600 border border-rose-500/20 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  <div>
                    {/* Top Row: Stars, Outcome Tag & Verified Badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                        ))}
                      </div>
                      
                      {item.verified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                          <BadgeCheck className="w-3 h-3 text-primary" />
                          <span>{lang === 'fa' ? 'مراجع تاییدشده' : 'Verified Patient'}</span>
                        </span>
                      )}
                    </div>

                    {/* Outcome Highlight Badge */}
                    {item.outcome_badge_fa && (
                      <div className="mb-3.5">
                        <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-medium bg-secondary/20 text-secondary-foreground border border-secondary/30">
                          ✨ {lang === 'fa' ? item.outcome_badge_fa : item.outcome_badge_en}
                        </span>
                      </div>
                    )}

                    {/* Review Body */}
                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed text-justify mb-5 relative">
                      <span className="text-primary font-serif font-bold text-base opacity-40 mx-0.5">“</span>
                      {pick(item, 'body')}
                      <span className="text-primary font-serif font-bold text-base opacity-40 mx-0.5">”</span>
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-border/50 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      
                      {/* Shadow Avatar & Unique Persona Info */}
                      <div className="flex items-center gap-3 min-w-0">
                        <ShadowAvatar
                          type={item.shadow_avatar || 'calm_mind'}
                          size="md"
                          className="shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate flex items-center gap-1.5">
                            <span>{personaName}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block animate-pulse"></span>
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {pick(item, 'author_label')}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Reaction Bar */}
                    <div className="pt-2 border-t border-border/30">
                      <PatientReactionBar 
                        testimonialId={item.id} 
                        initialLikes={likesCount} 
                      />
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center justify-between text-[10px] text-muted-foreground gap-1 pt-1 border-t border-border/30">
                      <span className="flex items-center gap-1">
                        {item.visit_type === 'online' ? (
                          <Video className="w-3 h-3 text-primary" />
                        ) : (
                          <Building2 className="w-3 h-3 text-primary" />
                        )}
                        <span>{lang === 'fa' ? item.location_tag_fa : item.location_tag_en}</span>
                      </span>

                      {item.treatment_duration_fa && (
                        <span className="flex items-center gap-1 text-foreground/75 font-medium">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span>{lang === 'fa' ? item.treatment_duration_fa : item.treatment_duration_en}</span>
                        </span>
                      )}
                    </div>

                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 4. PRIVACY & ETHICS GUARANTEE */}
      <section className="py-12 bg-cream/60 border-y border-border/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-2xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-foreground text-base sm:text-lg">
            {lang === 'fa' ? 'حفظ کامل اسرار و گمنامی مراجعین' : 'Patient Anonymity & Data Protection'}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t('testi_privacy_note')}
          </p>
        </div>
      </section>

      {/* 5. CTA BOOKING */}
      <section className="pt-14 text-center max-w-xl mx-auto px-4">
        <Reveal>
          <h3 className="font-heading font-bold text-foreground text-xl sm:text-2xl mb-2.5">
            {lang === 'fa' ? 'آماده شروع جلسات درمانی هستید؟' : 'Ready to Begin Your Care?'}
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm mb-5">
            {lang === 'fa' 
              ? 'نوبت حضوری در بیمارستان نیکان یا مشاوره آنلاین را با چند کلیک رزرو فرمایید.' 
              : 'Schedule your consultation easily online in just a few clicks.'}
          </p>
          <Link
            to="/panel"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm btn-soft-glow hover:opacity-95 transition-all shadow-md"
          >
            <Calendar className="w-4 h-4" />
            <span>{t('book_now')}</span>
          </Link>
        </Reveal>
      </section>

      {/* 6. PATIENT SHARE REVIEW MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl relative space-y-4 text-start">
            
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-5 end-5 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <MessageSquarePlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-base sm:text-lg">
                  {lang === 'fa' ? 'ثبت تجربه درمان با دکتر مومنی' : 'Share Your Patient Journey'}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {lang === 'fa' ? 'هویت شما کاملاً محفوظ و مخفف خواهد ماند' : 'Your identity will remain completely anonymous'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitPatientReview} className="space-y-3.5 pt-2">
              
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  {lang === 'fa' ? 'انتخاب شخصیت سایه‌ای شما (نماد بالینی ناشناس)' : 'Select Your Mysterious Shadow Persona'}
                </label>
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {shadowAvatarOptions.map((opt) => {
                    const isSelected = newReview.shadow_avatar === opt.type;
                    return (
                      <button
                        key={opt.type}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, shadow_avatar: opt.type })}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                          isSelected
                            ? 'bg-primary/10 border-primary shadow-xs ring-2 ring-primary/30'
                            : 'bg-background border-border/70 hover:border-border hover:bg-muted/40'
                        }`}
                      >
                        <ShadowAvatar type={opt.type} size="sm" />
                        <span className="text-[9px] font-medium text-foreground/80 leading-tight">
                          {lang === 'fa' ? opt.label_fa.split(' ')[0] : opt.label_en}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    {lang === 'fa' ? 'نام مستعار یا حس درمانی (اختیاری)' : 'Persona Alias / Feeling'}
                  </label>
                  <input
                    type="text"
                    value={newReview.persona_title}
                    onChange={(e) => setNewReview({ ...newReview, persona_title: e.target.value })}
                    placeholder={lang === 'fa' ? 'مثال: ذهن آزاد، مسافر امید...' : 'e.g. Calm Mind, Horizon Seeker'}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    {lang === 'fa' ? 'نوع ویزیت' : 'Visit Format'}
                  </label>
                  <select
                    value={newReview.visit_type}
                    onChange={(e) => setNewReview({ ...newReview, visit_type: e.target.value as 'in_person' | 'online' })}
                    className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  >
                    <option value="in_person">{lang === 'fa' ? 'حضوری (بیمارستان نیکان غرب)' : 'In-Person (Nikan)'}</option>
                    <option value="online">{lang === 'fa' ? 'آنلاین (سراسری / خارج از کشور)' : 'Online Consultation'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  {lang === 'fa' ? 'حوزه درمان' : 'Care Specialty'}
                </label>
                <select
                  value={newReview.category}
                  onChange={(e) => setNewReview({ ...newReview, category: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                >
                  <option value="anxiety">{lang === 'fa' ? 'اضطراب، وسواس و پانیک' : 'Anxiety, Panic & OCD'}</option>
                  <option value="depression">{lang === 'fa' ? 'افسردگی و اختلالات خلقی' : 'Depression & Mood'}</option>
                  <option value="adhd">{lang === 'fa' ? 'بیش‌فعالی و تمرکز بزرگسالان (ADHD)' : 'Adult ADHD & Focus'}</option>
                  <option value="couples">{lang === 'fa' ? 'زوج‌درمانی و خانواده' : 'Couples Therapy'}</option>
                  <option value="online">{lang === 'fa' ? 'ویزیت آنلاین ایرانیان خارج از کشور' : 'Diaspora Care'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  {lang === 'fa' ? 'متن تجربه درمانی شما' : 'Your Experience & Progress'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={newReview.body}
                  onChange={(e) => setNewReview({ ...newReview, body: e.target.value })}
                  placeholder={lang === 'fa' ? 'توضیح کوتاه درباره روند بهبودی، برخورد صبورانه پزشک و تغییرات مثبت ایجاد شده...' : 'Share a few words about your clinical journey, symptoms relief, and doctor care...'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs leading-relaxed focus:ring-2 focus:ring-primary/40 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1 cursor-pointer"
                    >
                      <Star className={`w-4 h-4 ${star <= newReview.rating ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'}`} />
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'ارسال نظر محرمانه' : 'Submit Review'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* 7. DOCTOR TESTIMONIAL EDITOR MODAL */}
      <TestimonialEditorModal
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
        testimonialToEdit={editingTestimonial}
        onSaved={() => {
          refreshList();
          setSubmittedToast(isFa ? 'تغییرات با موفقیت ذخیره گردید.' : 'Changes saved successfully.');
          setTimeout(() => setSubmittedToast(null), 4000);
        }}
      />

    </div>
  );
};
