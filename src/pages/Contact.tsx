import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck,
  Building2,
  Award,
  Navigation
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/site/SectionHeading';
import { HospitalLocationMap } from '../components/site/HospitalLocationMap';
import { 
  PHONE, 
  PHONE_TEL, 
  WHATSAPP_URL, 
  ADDRESS_FA, 
  ADDRESS_EN, 
  HOSPITAL_NAME_FA, 
  HOSPITAL_NAME_EN, 
  GOOGLE_MAPS_URL, 
  HOSPITAL_URL,
  DOCTOR_NIKAN_URL,
  MEDICAL_COUNCIL_FA,
  MEDICAL_COUNCIL_CODE,
  HOSPITAL_CENTRAL_PHONE_FA,
  HOSPITAL_CENTRAL_PHONE
} from '../lib/siteConstants';

export const Contact: React.FC = () => {
  const { t, lang, isRTL } = useLanguage();
  const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setSubmitted(true);
    setFormState({ name: '', phone: '', message: '' });
  };

  return (
    <div className="pt-20 sm:pt-28 pb-16 overflow-hidden">
      
      {/* 1. HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
        <SectionHeading
          kicker={t('contact_kicker')}
          title={t('contact_title')}
          intro={t('contact_intro')}
          align="center"
        />
      </section>

      {/* 2. 4 CONTACT CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Direct Phone */}
          <Reveal delay={0} className="h-full">
            <div className="h-full rounded-3xl bg-card border border-border/80 p-6 flex flex-col justify-between shadow-2xs hover:border-primary/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-base mb-1">
                  {t('contact_phone_title')}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  {lang === 'fa' ? 'پاسخگویی مستقیم منشی جهت هماهنگی و مشاوره نوبت' : 'Direct assistant call for coordination & booking'}
                </p>
              </div>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                dir="ltr"
              >
                <span>{PHONE}</span>
              </a>
            </div>
          </Reveal>

          {/* WhatsApp */}
          <Reveal delay={100} className="h-full">
            <div className="h-full rounded-3xl bg-card border border-border/80 p-6 flex flex-col justify-between shadow-2xs hover:border-[#25D366]/50 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-base mb-1">
                  {t('contact_whatsapp_title')}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  {lang === 'fa' ? 'ارسال پیام در واتس‌اپ و مشاوره نوبت‌دهی آنلاین' : 'Fast WhatsApp messaging for queries & online sessions'}
                </p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#128C7E] hover:underline"
              >
                <span>{t('whatsapp')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Reveal>

          {/* Hospital & Doctor Profile */}
          <Reveal delay={200} className="h-full">
            <div className="h-full rounded-3xl bg-card border border-border/80 p-6 flex flex-col justify-between shadow-2xs hover:border-primary/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-base mb-1">
                  {lang === 'fa' ? 'بیمارستان نیکان غرب' : 'Nikan Gharb Hospital'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {lang === 'fa' ? `کد نظام پزشکی: ${MEDICAL_COUNCIL_FA}` : `MC Reg: ${MEDICAL_COUNCIL_CODE}`}
                </p>
              </div>
              <div className="flex flex-col gap-1.5 mt-3 pt-2 border-t border-border/60">
                <a
                  href={DOCTOR_NIKAN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <span>{lang === 'fa' ? 'صفحه رسمی در سایت نیکان' : 'Profile at Nikan'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={`tel:${HOSPITAL_CENTRAL_PHONE}`}
                  className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
                  dir="ltr"
                >
                  <Phone className="w-3 h-3" />
                  <span>{HOSPITAL_CENTRAL_PHONE_FA}</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Working Hours */}
          <Reveal delay={300} className="h-full">
            <div className="h-full rounded-3xl bg-card border border-border/80 p-6 flex flex-col justify-between shadow-2xs hover:border-primary/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-base mb-1">
                  {t('contact_hours_title')}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t('contact_hours_val')}
                </p>
              </div>
              <span className="text-xs font-semibold text-primary mt-3">
                {lang === 'fa' ? 'پنج‌شنبه و جمعه: تعطیل' : 'Thu & Fri: Closed'}
              </span>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 3. MESSAGE FORM & FAST COORDINATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Message Form */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="rounded-3xl bg-card border border-border/80 p-8 shadow-xs">
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {lang === 'fa' ? 'ارسال پیام مستقیم به منشی کلینیک' : 'Send a Message to Clinic Desk'}
                </h3>
                <p className="text-xs text-muted-foreground mb-6">
                  {lang === 'fa' ? 'پاسخ شما ظرف ۲۴ ساعت کاری داده خواهد شد.' : 'Our team will respond within 24 business hours.'}
                </p>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-accent/60 border border-primary/20 text-center space-y-3 animate-fade-in">
                    <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
                    <p className="text-sm font-bold text-foreground">{t('contact_success')}</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-primary underline"
                    >
                      {lang === 'fa' ? 'ارسال پیام دیگر' : 'Send another message'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        {t('contact_form_name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder={lang === 'fa' ? 'مثال: علی رضایی' : 'e.g. Ali Rezaei'}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        {t('contact_form_phone')} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="09123456789"
                        dir="ltr"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-left"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        {t('contact_form_message')}
                      </label>
                      <textarea
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder={lang === 'fa' ? 'پیام یا پرسش خود را اینجا بنویسید...' : 'Type your message or inquiry here...'}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm btn-soft-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t('contact_form_send')}</span>
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* Quick Clinic Info Summary */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={150}>
              <div className="rounded-3xl bg-card border border-border/80 p-7 shadow-xs space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-base">
                      {t('brand_name')}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {t('brand_role')} • {t('board_certified')}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/60 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">{lang === 'fa' ? 'کلینیک تخصصی اعصاب و روان:' : 'Department of Psychiatry:'}</strong>{' '}
                      {lang === 'fa' ? ADDRESS_FA : ADDRESS_EN}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <strong className="text-foreground">{lang === 'fa' ? 'شماره هماهنگی و رزرواسیون:' : 'Coordination Cell:'}</strong>{' '}
                      <a href={`tel:${PHONE_TEL}`} className="text-primary hover:underline font-mono" dir="ltr">{PHONE}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <strong className="text-foreground">{lang === 'fa' ? 'تلفن گویای بیمارستان نیکان:' : 'Nikan Central Line:'}</strong>{' '}
                      <a href={`tel:${HOSPITAL_CENTRAL_PHONE}`} className="text-primary hover:underline font-mono" dir="ltr">{HOSPITAL_CENTRAL_PHONE_FA}</a>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/40 flex flex-wrap items-center gap-3">
                  <a
                    href={DOCTOR_NIKAN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all shadow-xs"
                  >
                    <span>{lang === 'fa' ? 'مشاهده پروفایل در سایت بیمارستان نیکان' : 'Doctor Profile at Nikan'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={HOSPITAL_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-muted text-foreground text-xs font-medium hover:text-primary border border-border transition-colors"
                  >
                    <span>{lang === 'fa' ? 'سایت رسمی بیمارستان' : 'Official Hospital Site'}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* 4. FULL INTERACTIVE MAP & MULTI-APP NAVIGATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Reveal>
          <HospitalLocationMap showTitle={true} />
        </Reveal>
      </section>

    </div>
  );
};
