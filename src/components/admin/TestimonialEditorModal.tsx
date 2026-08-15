import React, { useState, useEffect } from 'react';
import { X, Save, Star, ShieldCheck, Heart, User, Check, AlertCircle } from 'lucide-react';
import { Testimonial } from '../../types';
import { createTestimonial, updateTestimonial } from '../../lib/testimonialsStore';
import { ShadowAvatar, ShadowAvatarType } from '../ShadowAvatar';
import { useLanguage } from '../../i18n/LanguageProvider';

interface TestimonialEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonialToEdit?: Testimonial | null;
  onSaved?: (item: Testimonial) => void;
}

const AVATAR_PRESETS: { type: ShadowAvatarType; label_fa: string }[] = [
  { type: 'calm_mind', label_fa: 'ذهن آرام (زمردی)' },
  { type: 'seeker_light', label_fa: 'جوینده نور (طلایی)' },
  { type: 'focus_spark', label_fa: 'تمرکز ژرف (آبی)' },
  { type: 'harmony_duo', label_fa: 'پیوند مهر (رز)' },
  { type: 'resilient_shield', label_fa: 'سپر تاب‌آوری (فیروزه‌ای)' },
  { type: 'night_awakening', label_fa: 'آرامش شبانه (بنفش)' },
  { type: 'hope_wings', label_fa: 'پرواز امید (لاجوردی)' },
  { type: 'inner_sun', label_fa: 'آفتاب درون (کهربایی)' }
];

export const TestimonialEditorModal: React.FC<TestimonialEditorModalProps> = ({
  isOpen,
  onClose,
  testimonialToEdit,
  onSaved
}) => {
  const { lang } = useLanguage();
  const isFa = lang === 'fa';

  const [personaTitle, setPersonaTitle] = useState('');
  const [shadowAvatar, setShadowAvatar] = useState<ShadowAvatarType>('calm_mind');
  const [authorLabel, setAuthorLabel] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [category, setCategory] = useState<'anxiety' | 'depression' | 'adhd' | 'couples' | 'online'>('anxiety');
  const [visitType, setVisitType] = useState<'in_person' | 'online'>('in_person');
  const [treatmentDuration, setTreatmentDuration] = useState('دوره درمانی: ۴ ماه');
  const [verified, setVerified] = useState<boolean>(true);
  const [outcomeBadge, setOutcomeBadge] = useState('بهبودی پایدار و کاهش اضطراب');
  const [locationTag, setLocationTag] = useState('بیمارستان نیکان غرب');

  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (testimonialToEdit) {
      setPersonaTitle(testimonialToEdit.persona_title_fa || testimonialToEdit.author_initial || '');
      setShadowAvatar(testimonialToEdit.shadow_avatar || 'calm_mind');
      setAuthorLabel(testimonialToEdit.author_label_fa || '');
      setBody(testimonialToEdit.body_fa || '');
      setRating(testimonialToEdit.rating || 5);
      setCategory(testimonialToEdit.category || 'anxiety');
      setVisitType(testimonialToEdit.visit_type || 'in_person');
      setTreatmentDuration(testimonialToEdit.treatment_duration_fa || 'دوره درمانی: ۴ ماه');
      setVerified(testimonialToEdit.verified ?? true);
      setOutcomeBadge(testimonialToEdit.outcome_badge_fa || 'بهبودی پایدار');
      setLocationTag(testimonialToEdit.location_tag_fa || (testimonialToEdit.visit_type === 'online' ? 'ویزیت آنلاین' : 'بیمارستان نیکان غرب'));
    } else {
      setPersonaTitle('');
      setShadowAvatar('calm_mind');
      setAuthorLabel('مراجع تحت درمان دارویی و روان‌درمانی');
      setBody('');
      setRating(5);
      setCategory('anxiety');
      setVisitType('in_person');
      setTreatmentDuration('دوره درمانی: ۳ ماه');
      setVerified(true);
      setOutcomeBadge('بهبودی کامل علائم و بازیابی عملکرد روزمره');
      setLocationTag('بیمارستان نیکان غرب');
    }
    setErrorMsg('');
    setIsSuccess(false);
  }, [testimonialToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) {
      setErrorMsg(isFa ? 'لطفاً متن تجربه یا نظر مراجع را وارد فرمایید.' : 'Please enter the testimonial body.');
      return;
    }

    const persona = personaTitle.trim() || (isFa ? 'مراجع محترم کلینیک' : 'Verified Patient');

    if (testimonialToEdit) {
      const updated = updateTestimonial(testimonialToEdit.id, {
        author_initial: persona,
        persona_title_fa: persona,
        persona_title_en: persona,
        shadow_avatar: shadowAvatar,
        author_label_fa: authorLabel.trim(),
        author_label_en: authorLabel.trim(),
        body_fa: body.trim(),
        body_en: body.trim(),
        rating,
        category,
        visit_type: visitType,
        treatment_duration_fa: treatmentDuration.trim(),
        treatment_duration_en: treatmentDuration.trim(),
        verified,
        outcome_badge_fa: outcomeBadge.trim(),
        outcome_badge_en: outcomeBadge.trim(),
        location_tag_fa: locationTag.trim(),
        location_tag_en: locationTag.trim()
      });
      if (updated && onSaved) onSaved(updated);
    } else {
      const created = createTestimonial({
        author_initial: persona,
        persona_title_fa: persona,
        persona_title_en: persona,
        shadow_avatar: shadowAvatar,
        author_label_fa: authorLabel.trim(),
        author_label_en: authorLabel.trim(),
        body_fa: body.trim(),
        body_en: body.trim(),
        rating,
        service_tag: category,
        service_tag_fa: category === 'anxiety' ? 'اضطراب و پانیک' : category === 'depression' ? 'افسردگی' : category === 'adhd' ? 'بیش‌فعالی' : 'روان‌درمانی',
        service_tag_en: category,
        order: 0,
        category,
        visit_type: visitType,
        treatment_duration_fa: treatmentDuration.trim(),
        treatment_duration_en: treatmentDuration.trim(),
        verified,
        outcome_badge_fa: outcomeBadge.trim(),
        outcome_badge_en: outcomeBadge.trim(),
        location_tag_fa: locationTag.trim(),
        location_tag_en: locationTag.trim(),
        date_str: isFa ? 'امروز' : 'Today'
      });
      if (onSaved) onSaved(created);
    }

    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden text-start">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-border/80 flex items-center justify-between bg-accent/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-foreground">
                {testimonialToEdit ? (isFa ? 'ویرایش بازخورد یا تجربه مراجع' : 'Edit Patient Review') : (isFa ? 'ثبت تجربه یا گزارش بالینی مراجع' : 'Add Patient Testimonial')}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isFa ? 'مدیریت نظرات، حفظ حریم شخصی (Shadow Avatar) و اعتبارسنجی' : 'Manage privacy-preserving patient feedback'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-7 space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{isFa ? 'نظر و تجربه بالینی با موفقیت ثبت شد.' : 'Review successfully saved.'}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            
            {/* Avatar Preset Selector */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-2">
                {isFa ? 'انتخاب آواتار اختصاصی محرمانه (Shadow Avatar)' : 'Shadow Avatar Preset'}
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {AVATAR_PRESETS.map((av) => (
                  <button
                    key={av.type}
                    type="button"
                    onClick={() => setShadowAvatar(av.type)}
                    className={`p-2 rounded-2xl flex flex-col items-center gap-1.5 border transition-all ${
                      shadowAvatar === av.type
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/30'
                        : 'border-border/70 hover:bg-accent/40'
                    }`}
                  >
                    <ShadowAvatar type={av.type} size="sm" />
                    <span className="text-[9px] truncate text-muted-foreground">{av.label_fa.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Persona and Label */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {isFa ? 'عنوان مراجع / نام مستعار' : 'Persona Title'}
                </label>
                <input
                  type="text"
                  value={personaTitle}
                  onChange={(e) => setPersonaTitle(e.target.value)}
                  placeholder="مثال: رویا ک. (مهندس نرم‌افزار)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {isFa ? 'توضیح کوتاه / برچسب مراجع' : 'Author Subtitle'}
                </label>
                <input
                  type="text"
                  value={authorLabel}
                  onChange={(e) => setAuthorLabel(e.target.value)}
                  placeholder="مثال: مراجع درمان دارویی و CBT"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Category & Visit Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {isFa ? 'دسته‌بندی اختلال / حوزه درمان' : 'Category'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                >
                  <option value="anxiety">اضطراب و پانیک (Anxiety & Panic)</option>
                  <option value="depression">افسردگی و خواب (Depression & Sleep)</option>
                  <option value="adhd">بیش‌فعالی و تمرکز (Adult ADHD)</option>
                  <option value="couples">زوج‌درمانی و خانواده (Couples)</option>
                  <option value="online">ویزیت آنلاین و خارج از کشور (Online Care)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {isFa ? 'نوع ویزیت و محل درمان' : 'Visit Type'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setVisitType('in_person');
                      setLocationTag('بیمارستان نیکان غرب');
                    }}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      visitType === 'in_person'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card border-border/80 text-muted-foreground'
                    }`}
                  >
                    {isFa ? 'حضوری (نیکان غرب)' : 'In-Person'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVisitType('online');
                      setLocationTag('ویزیت آنلاین تصویری');
                    }}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      visitType === 'online'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card border-border/80 text-muted-foreground'
                    }`}
                  >
                    {isFa ? 'ویزیت آنلاین تصویری' : 'Online Care'}
                  </button>
                </div>
              </div>
            </div>

            {/* Testimonial Text */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                {isFa ? 'متن تجربه بالینی و شرح بهبود مراجع *' : 'Testimonial Body *'}
              </label>
              <textarea
                rows={4}
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="توضیح روند درمان، تغییر علائم، نحوه برخورد و رویکرد علمی دکتر فاطمه مومنی..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Outcome Badge & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {isFa ? 'نشان نتیجه درمان (Outcome Badge)' : 'Outcome Badge'}
                </label>
                <input
                  type="text"
                  value={outcomeBadge}
                  onChange={(e) => setOutcomeBadge(e.target.value)}
                  placeholder="مثال: قطع حملات پانیک پس از ۶ هفته"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {isFa ? 'مدت زمان درمان' : 'Treatment Duration'}
                </label>
                <input
                  type="text"
                  value={treatmentDuration}
                  onChange={(e) => setTreatmentDuration(e.target.value)}
                  placeholder="مثال: دوره درمانی: ۴ ماه"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Rating and Verification */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-accent/20 border border-border/70">
              <div>
                <span className="block text-xs font-bold text-foreground mb-1.5">{isFa ? 'امتیاز مراجع' : 'Rating'}</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/40'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-foreground mr-2 font-mono">{rating} / 5</span>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verified}
                  onChange={(e) => setVerified(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary/40"
                />
                <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  {isFa ? 'تایید رسمی پرونده (نشان Verified Patient)' : 'Verified Patient Status'}
                </span>
              </label>
            </div>

          </form>
        </div>

        {/* Footer */}
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
            <span>{testimonialToEdit ? (isFa ? 'ذخیره تغییرات' : 'Save Changes') : (isFa ? 'ثبت و انتشار در سایت' : 'Publish Testimonial')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
