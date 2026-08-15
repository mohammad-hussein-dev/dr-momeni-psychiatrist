import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Smartphone, 
  Bot, 
  Database, 
  Mail, 
  Check, 
  Zap, 
  Building2,
  Stethoscope,
  Send,
  Globe
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { SectionHeading } from '../components/site/SectionHeading';
import { DeveloperHero } from '../components/developer/DeveloperHero';
import { LiveArchitectureTerminal } from '../components/developer/LiveArchitectureTerminal';
import { SeniorMetricsDeck } from '../components/developer/SeniorMetricsDeck';
import { ClinicalValueMatrix } from '../components/developer/ClinicalValueMatrix';
import { 
  saveProjectInquiry, 
  generateTelegramInquiryUrl,
  generateEmailInquiryUrl,
  ProjectInquiry 
} from '../lib/inquiryStore';

/**
 * Developer Profile and Senior Medical Web Systems Portfolio Page
 * 
 * Showcases the technical architecture, case study of Dr. Fatemeh Momeni's platform,
 * full-stack engineering credentials of Mohammad Hussein, interactive CLI telemetry,
 * and a high-detail project quotation & inquiry dispatch system.
 * 
 * @author Mohammad Hussein
 */
export const Developer: React.FC = () => {
  const { lang } = useLanguage();
  const isFa = lang === 'fa';

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState<ProjectInquiry['clientRole']>('doctor');
  const [specialtyOrBusiness, setSpecialtyOrBusiness] = useState('');
  const [projectCategory, setProjectCategory] = useState(
    isFa ? 'سامانه اختصاصی پزشکی و نوبت‌دهی آنلاین' : 'Custom Medical & Telehealth Web System'
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    isFa ? 'سامانه نوبت‌دهی آنلاین تقویمی' : 'Interactive Calendar Booking',
    isFa ? 'پرونده الکترونیک و رهگیری مراجعین' : 'Electronic Patient Records',
    isFa ? 'دستیار تریاژ و مشاوره هوش مصنوعی' : 'AI Psychiatric Assistant Desk',
    isFa ? 'طراحی ریسپانسیو اختصاصی موبایل' : 'Mobile-First Responsive UX (90%+ traffic)'
  ]);
  const [timeline, setTimeline] = useState(isFa ? '۱ تا ۲ ماه (طبیعی)' : '1-2 Months (Standard)');
  const [budgetRange, setBudgetRange] = useState(isFa ? 'حرفه‌ای و کامل (VIP پزشکی)' : 'Professional VIP Medical');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [preferredContact, setPreferredContact] = useState<ProjectInquiry['preferredContact']>('telegram');
  
  // Submission Feedback State
  const [submittedInquiry, setSubmittedInquiry] = useState<ProjectInquiry | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Available Features Checklist
  const featureOptions = isFa ? [
    'سامانه نوبت‌دهی آنلاین تقویمی',
    'پرونده الکترونیک و رهگیری مراجعین',
    'دستیار تریاژ و مشاوره هوش مصنوعی',
    'طراحی ریسپانسیو اختصاصی موبایل',
    'درگاه پرداخت مستقیم شتابی و ارزی',
    'سیستم ارسال خودکار پیامک یادآوری',
    'چت آنلاین اختصاصی پزشک و بیمار',
    'پنل مدیریت چندسطحی پزشک و منشی',
    'چندزبانه کامل (فارسی و انگلیسی)',
    'بهینه‌سازی سئو بالینی و جذب بیمار',
    'مشاوره ویزیت تصویری (تله‌مدیسین)',
    'نسخه‌نویسی الکترونیک و بارگذاری مدارک'
  ] : [
    'Interactive Calendar Booking',
    'Electronic Patient Records',
    'AI Psychiatric Assistant Desk',
    'Mobile-First Responsive UX (90%+ traffic)',
    'Direct Payment Gateway Integration',
    'Automated SMS Reminders',
    'Encrypted Real-Time Patient Chat',
    'Multi-Tier Doctor & Staff Admin Hub',
    'Full Bilingual Support (FA / EN)',
    'Clinical SEO & Google Ranking',
    'Secure Video Telehealth Consultation',
    'Document Upload & e-Prescription'
  ];

  const handleToggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) {
      alert(isFa ? 'لطفاً نام و شماره تماس خود را وارد نمایید.' : 'Please enter your name and phone number.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const saved = saveProjectInquiry({
        clientName: clientName.trim(),
        clientRole,
        specialtyOrBusiness: specialtyOrBusiness.trim(),
        projectCategory,
        selectedFeatures,
        timeline,
        budgetRange,
        description: description.trim(),
        phone: phone.trim(),
        email: email.trim(),
        telegramUsername: telegramUsername.trim(),
        preferredContact,
      });

      setSubmittedInquiry(saved);
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="pt-20 sm:pt-24 pb-20 overflow-hidden">
      
      {/* 1. HERO & SENIOR DEVELOPER IDENTITY BANNER */}
      <section className="relative pb-12 pt-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">
              {isFa ? 'صفحه اصلی' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">
              {isFa ? 'معماری و توسعه‌دهنده پلتفرم' : 'Platform Engineering & Developer'}
            </span>
          </div>

          {/* High-Tech Senior Developer Hero */}
          <DeveloperHero isFa={isFa} />

        </div>
      </section>

      {/* 2. INTERACTIVE LIVE ARCHITECTURE & TELEMETRY CLI TERMINAL */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker={isFa ? 'تله‌متری و خط فرمان تعاملی' : 'System Telemetry & Architecture'}
            title={isFa ? 'معماری کلینیکال و شبیه‌ساز مهندسی سیستم' : 'Clinical Architecture & Interactive Telemetry'}
            subtitle={isFa ? 'بررسی زنده سلامت سیستم، تاخیر پاسخ‌دهی و جریان داده‌ها بین لایه‌های فرانت، بک‌اند و هوش مصنوعی' : 'Live system diagnostics, throughput telemetry, and Clean Architecture signal flow.'}
            align="center"
          />

          <div className="mt-8">
            <LiveArchitectureTerminal isFa={isFa} />
          </div>
        </div>
      </section>

      {/* 3. SENIOR METRICS & TECHNICAL COMPETENCY DECK */}
      <section className="py-12 bg-card/40 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker={isFa ? 'تخصص‌های فنی و مهندسی نرم‌افزار' : 'Technical Proficiency & Architecture'}
            title={isFa ? 'استک تخصصی و بنچمارک‌های کارایی' : 'Core Engineering Disciplines & Benchmarks'}
            subtitle={isFa ? 'توسعه اصولی بر پایه الگوهای طراحی Clean Architecture، بهینه‌سازی الگوریتمی و امنیت پایدار' : 'Building resilient systems with proven architectural patterns and high-performance algorithms.'}
            align="center"
          />

          <div className="mt-10">
            <SeniorMetricsDeck isFa={isFa} />
          </div>
        </div>
      </section>

      {/* 4. CASE STUDY & SYSTEM ARCHITECTURE */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            kicker={isFa ? 'مطالعه موردی و مهندسی سیستم' : 'Case Study & Engineering Architecture'}
            title={isFa ? 'پشت‌صحنه مهندسی وب‌سایت دکتر فاطمه مومنی' : 'The Architecture Behind Dr. Fatemeh Momeni Platform'}
            subtitle={isFa ? 'چگونه یک وبسایت پزشکی را از یک صفحه ساده به یک کلینیک دیجیتال خودکار و معتبر تبدیل کردیم؟' : 'How we transformed a medical web presence into an automated clinical ecosystem.'}
            align="center"
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1: Mobile-First UX */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-border/70 space-y-3 hover:border-primary/50 transition-all shadow-2xs">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-base">
                {isFa ? '۱. تجربه کاربری موبایل‌محور (۹۰٪ مراجعین)' : '1. Mobile-First Patient UX'}
              </h3>
              <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed text-justify">
                {isFa ? (
                  'طبق داده‌های آماری، بیش از ۹۰ درصد بیماران با گوشی تلفن همراه وارد سایت می‌شوند. کل سامانه به نحوی مهندسی شده که کلیک روی شماره‌ها بلافاصله شماره‌گیر موبایل را باز کند، نقشه‌ها با یک لمس به بلد، نشان، گوگل‌مپ و ویز متصل شوند و رزرو نوبت در ۳ مرحله آسان تکمیل گردد.'
                ) : (
                  'With over 90% of healthcare searchers on smartphones, every touch target, dialing link, and map routing button connects natively with zero friction.'
                )}
              </p>
            </div>

            {/* Feature 2: AI Triage Desk */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-border/70 space-y-3 hover:border-primary/50 transition-all shadow-2xs">
              <div className="w-10 h-10 rounded-2xl bg-secondary/25 text-primary flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-base">
                {isFa ? '۲. دستیار هوشمند تریاژ روانپزشکی' : '2. AI Psychiatric Symptom Triage'}
              </h3>
              <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed text-justify">
                {isFa ? (
                  'تعبیه چت هوشمند با مدل‌های پیشرفته Gemini که قبل از نوبت، شرح‌حال و علائم مراجع (خواب، خلق، اضطراب) را بررسی کرده و راهنمایی اولیه را با رعایت موازین ایمنی بالینی ارائه می‌دهد.'
                ) : (
                  'Integrated secure AI consultation agent evaluating preliminary patient symptoms with medical ethical guardrails.'
                )}
              </p>
            </div>

            {/* Feature 3: Doctor Desk & Multi-Role Hub */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-border/70 space-y-3 hover:border-primary/50 transition-all shadow-2xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-base">
                {isFa ? '۳. میز کار مستقل پزشک و منشی' : '3. Doctor & Staff Admin Portal'}
              </h3>
              <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed text-justify">
                {isFa ? (
                  'پنل مدیریت مستقل با ورود امن که پزشک یا منشی می‌توانند بدون دانش فنی، نوبت‌ها را تایید یا جابجا کنند، یادداشت بالینی ثبت نمایند و مقالات و نظرات را مدیریت کنند.'
                ) : (
                  'Robust standalone management console empowering physicians and clinic staff to approve appointments, handle notes, and publish clinical articles seamlessly.'
                )}
              </p>
            </div>

            {/* Feature 4: Sub-Second Performance */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-border/70 space-y-3 hover:border-primary/50 transition-all shadow-2xs">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-base">
                {isFa ? '۴. سرعت فوق‌العاده و بدون قطعی' : '4. Zero-Lag High Performance'}
              </h3>
              <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed text-justify">
                {isFa ? (
                  'استفاده از React 19، Vite و استک سبک بدون ابزارهای سنگین کندکننده. بارگذاری صفحات در کسری از ثانیه حتی در اینترنت‌های با سرعت پایین.'
                ) : (
                  'Built with lightweight modern architecture guaranteeing instant page transitions even on limited mobile data connections.'
                )}
              </p>
            </div>

            {/* Feature 5: Privacy & HIPAA Mindset */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-border/70 space-y-3 hover:border-primary/50 transition-all shadow-2xs">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-base">
                {isFa ? '۵. امنیت کامل اطلاعات بیماران' : '5. Clinical Data Confidentiality'}
              </h3>
              <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed text-justify">
                {isFa ? (
                  'جداسازی کامل اطلاعات حساس، ذخیره‌سازی محلی کدگذاری شده و دسترسی کنترل‌شده برای پیشگیری از هرگونه نشت اطلاعات بالینی مراجعین.'
                ) : (
                  'Strict patient privacy boundaries and secure token storage honoring confidential medical ethics.'
                )}
              </p>
            </div>

            {/* Feature 6: Full Bilingual & RTL/LTR */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-border/70 space-y-3 hover:border-primary/50 transition-all shadow-2xs">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-base">
                {isFa ? '۶. پشتیبانی دوزبانه استاندارد' : '6. Seamless Bilingual Engine'}
              </h3>
              <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed text-justify">
                {isFa ? (
                  'تغییر آنی زبان فارسی و انگلیسی همراه با تغییر جهت راست‌به‌چپ (RTL) و چپ‌به‌راست (LTR) و هماهنگی دقیق فونت‌ها و اعداد جهت پذیرش بیماران بین‌المللی.'
                ) : (
                  'Smooth dynamic switching between Persian and English with bidirectional typographic hierarchy for medical tourism.'
                )}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CLINICAL VALUE & PRACTICE TRANSFORMATION (For Doctors, Clinics & Patients) */}
      <section className="py-12 bg-card/30 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClinicalValueMatrix isFa={isFa} />
        </div>
      </section>

      {/* 6. TAILORED SERVICES FOR DOCTORS & HEALTHCARE CLIENTS */}
      <section className="py-14 bg-accent/20 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            kicker={isFa ? 'خدمات قابل ارائه به پزشکان و مراکز' : 'Tailored Solutions For Medical Specialists'}
            title={isFa ? 'برای مطب، کلینیک یا شرکت خود به چه سامانه‌ای نیاز دارید؟' : 'What We Can Build For Your Practice'}
            subtitle={isFa ? 'توسعه اختصاصی بر اساس هویت و تخصص شما بدون محدودیت‌های پلتفرم‌های عمومی' : 'Custom engineering tailored to your workflow and brand prestige.'}
            align="center"
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/70 shadow-xs space-y-4 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground">
                    {isFa ? 'وبسایت و کلینیک دیجیتال اختصاصی پزشکان' : 'Specialist Doctor Digital Clinic'}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {isFa ? 'برای پزشکان، دندانپزشکان، روانپزشکان و فوق‌تخصص‌ها' : 'For Physicians, Clinics, and Private Practices'}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-[13px] text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{isFa ? 'نوبت‌دهی آنلاین با امکان تعیین شیفت و ظرفیت بیمار' : 'Custom booking capacity rules per clinic shift'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{isFa ? 'درگاه پرداخت مستقیم اینترنتی برای رزرو قطعی نوبت' : 'Direct bank payment gateways for guaranteed appointments'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{isFa ? 'اتصال مستقیم به پیامک اطلاع‌رسانی به بیمار و منشی' : 'Automated SMS alerts for patient and front desk'}</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/70 shadow-xs space-y-4 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-secondary/25 text-primary flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground">
                    {isFa ? 'پورتال جامع بیمارستان و درمانگاه‌های تخصصی' : 'Hospital & Multi-Specialty Clinic Portals'}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {isFa ? 'سامانه‌های چندپزشکه با پنل منشی، صندوق و پذیرش' : 'Multi-Doctor Hub with Reception & Billing Modules'}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-[13px] text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{isFa ? 'مدیریت تقویم کاری ده‌ها پزشک و بخش‌های مختلف درمانی' : 'Dynamic doctor rosters across multiple clinic departments'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{isFa ? 'پرونده الکترونیک و ثبت تاریخچه درمان و گزارش پاراکلینیک' : 'Electronic medical history and imaging report uploads'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{isFa ? 'داشبورد گزارش‌گیری مالی و آماری دقیق' : 'Comprehensive revenue analytics and attendance charts'}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 6. HIGH-DETAIL PROJECT INQUIRY FORM (ثبت درخواست و استعلام قیمت پروژه) */}
      <section id="inquiry-form" className="py-14 bg-card/60 border-t border-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            kicker={isFa ? 'استعلام قیمت و مشاوره مستقیم' : 'Project Quotation & Consultation'}
            title={isFa ? 'ثبت درخواست سفارش ساخت سامانه نرم‌افزاری' : 'Submit Your Project Inquiry'}
            subtitle={isFa ? 'جزئیات سامانه مدنظرتان را انتخاب کنید تا مستقیماً در تلگرام یا ایمیل بررسی و پاسخ داده شود.' : 'Specify your technical needs and dispatch directly via Telegram or Email.'}
            align="center"
          />

          {submittedInquiry ? (
            /* Submission Success State with Direct Telegram & Email Dispatch */
            <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground">
                  {isFa ? 'درخواست شما با موفقیت ثبت شد!' : 'Inquiry Registered Successfully!'}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {isFa ? `کد پیگیری درخواست: ${submittedInquiry.id}` : `Reference Code: ${submittedInquiry.id}`}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border/80 text-start text-xs space-y-1.5 max-w-md mx-auto">
                <p className="font-semibold text-foreground">{isFa ? 'خلاصه مشخصات پروژه:' : 'Inquiry Summary:'}</p>
                <p><span className="text-muted-foreground">{isFa ? 'کارفرما:' : 'Client:'}</span> {submittedInquiry.clientName} ({submittedInquiry.specialtyOrBusiness || submittedInquiry.clientRole})</p>
                <p><span className="text-muted-foreground">{isFa ? 'نوع پروژه:' : 'Category:'}</span> {submittedInquiry.projectCategory}</p>
                <p><span className="text-muted-foreground">{isFa ? 'امکانات انتخابی:' : 'Features:'}</span> {submittedInquiry.selectedFeatures.length} {isFa ? 'ماژول' : 'modules'}</p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={generateTelegramInquiryUrl(submittedInquiry)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{isFa ? 'ارسال مشخصات به تلگرام محمدحسین (@mohammad_hussein_dev)' : 'Send to Telegram (@mohammad_hussein_dev)'}</span>
                </a>

                <a
                  href={generateEmailInquiryUrl(submittedInquiry)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm transition-all shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isFa ? 'ارسال از طریق ایمیل' : 'Send via Email'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSubmittedInquiry(null)}
                  className="px-4 py-2 rounded-full bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  {isFa ? 'ثبت درخواست جدید' : 'Submit Another'}
                </button>
              </div>
            </div>
          ) : (
            /* Main High-Detail Form */
            <form onSubmit={handleSubmitInquiry} className="mt-8 glass-card rounded-3xl p-6 sm:p-10 border border-border/80 shadow-lg space-y-6">
              
              {/* Row 1: Client Role & Specialty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    {isFa ? 'شما کارفرمای کدام بخش هستید؟' : 'Your Role / Industry'}
                  </label>
                  <select
                    value={clientRole}
                    onChange={(e) => setClientRole(e.target.value as ProjectInquiry['clientRole'])}
                    className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-hidden"
                  >
                    <option value="doctor">{isFa ? 'پزشک متخصص / روانپزشک / دندانپزشک' : 'Specialist Physician / Psychiatrist'}</option>
                    <option value="clinic">{isFa ? 'مدیر کلینیک یا درمانگاه تخصصی' : 'Clinic / Polyclinic Director'}</option>
                    <option value="hospital">{isFa ? 'مدیریت بیمارستان یا مرکز درمانی' : 'Hospital Management'}</option>
                    <option value="startup">{isFa ? 'استارتاپ حوزه سلامت یا هوش مصنوعی' : 'HealthTech / AI Startup'}</option>
                    <option value="enterprise">{isFa ? 'شرکت یا سازمان تجاری' : 'Enterprise / Company'}</option>
                    <option value="personal">{isFa ? 'برندینگ شخصی یا سایر زمینه‌ها' : 'Personal Brand / Other'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    {isFa ? 'تخصص بالینی یا نام مرکز شما' : 'Specialty / Practice Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={specialtyOrBusiness}
                    onChange={(e) => setSpecialtyOrBusiness(e.target.value)}
                    placeholder={isFa ? 'مثال: کلینیک اعصاب نیکان / دکتر ...' : 'e.g., Cardiology Clinic / Dr. ...'}
                    className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Row 2: Client Name & Contact Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    {isFa ? 'نام و نام خانوادگی' : 'Full Name'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={isFa ? 'نام شما' : 'Your Name'}
                    className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    {isFa ? 'شماره تماس کارفرما' : 'Your Contact Phone'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912..."
                    dir="ltr"
                    className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-foreground text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Row 3: Optional Email & Preferred Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    {isFa ? 'آدرس ایمیل (اختیاری)' : 'Email Address (Optional)'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@example.com"
                    dir="ltr"
                    className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-foreground text-xs font-mono focus:ring-2 focus:ring-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    {isFa ? 'روش تماس ترجیحی شما' : 'Preferred Contact Channel'}
                  </label>
                  <select
                    value={preferredContact}
                    onChange={(e) => setPreferredContact(e.target.value as ProjectInquiry['preferredContact'])}
                    className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-hidden"
                  >
                    <option value="telegram">{isFa ? 'پیام در تلگرام' : 'Telegram Message'}</option>
                    <option value="email">{isFa ? 'ارسال ایمیل' : 'Email'}</option>
                    <option value="phone">{isFa ? 'تماس تلفنی' : 'Direct Phone Call'}</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Multi-Select Required Features */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-2">
                  {isFa ? 'امکانات و ماژول‌های مورد نیاز در پروژه شما:' : 'Select Required Project Features:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {featureOptions.map((feat) => {
                    const isSelected = selectedFeatures.includes(feat);
                    return (
                      <button
                        type="button"
                        key={feat}
                        onClick={() => handleToggleFeature(feat)}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-start flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-primary/10 border-primary text-primary font-semibold'
                            : 'bg-background border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <span className="truncate pe-2">{feat}</span>
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-border'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Timeline & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    {isFa ? 'زمان‌بندی مدنظر برای تحویل' : 'Expected Timeline'}
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-hidden"
                  >
                    <option value={isFa ? 'فوری (کمتر از ۳ هفته)' : 'Urgent (< 3 Weeks)'}>{isFa ? 'فوری (کمتر از ۳ هفته)' : 'Urgent (< 3 Weeks)'}</option>
                    <option value={isFa ? '۱ تا ۲ ماه (طبیعی)' : '1-2 Months (Standard)'}>{isFa ? '۱ تا ۲ ماه (طبیعی)' : '1-2 Months (Standard)'}</option>
                    <option value={isFa ? '۲ تا ۳ ماه (سامانه جامع)' : '2-3 Months (Enterprise)'}>{isFa ? '۲ تا ۳ ماه (سامانه جامع)' : '2-3 Months (Enterprise)'}</option>
                    <option value={isFa ? 'فازبندی شده بلندمدت' : 'Phased Long-Term'}>{isFa ? 'فازبندی شده بلندمدت' : 'Phased Long-Term'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    {isFa ? 'بازه بودجه برآوردی' : 'Estimated Budget Range'}
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-background border border-border text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-hidden"
                  >
                    <option value={isFa ? 'پایه و استاندارد (اقتصادی)' : 'Basic Standard'}>{isFa ? 'پایه و استاندارد (اقتصادی)' : 'Basic Standard'}</option>
                    <option value={isFa ? 'حرفه‌ای و کامل (VIP پزشکی)' : 'Professional VIP Medical'}>{isFa ? 'حرفه‌ای و کامل (VIP پزشکی)' : 'Professional VIP Medical'}</option>
                    <option value={isFa ? 'سازمانی و کلینیک بزرگ (Enterprise)' : 'Enterprise / Multi-Branch'}>{isFa ? 'سازمانی و کلینیک بزرگ (Enterprise)' : 'Enterprise / Multi-Branch'}</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Detailed Project Description */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  {isFa ? 'توضیحات تکمیلی و نیازمندی‌های خاص پروژه' : 'Project Brief & Specific Requirements'}
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={isFa ? 'لطفاً خلاصه خواسته‌ها، بخش‌های خاص، تعداد پزشکان یا امکانات اختصاصی را بنویسید...' : 'Provide details regarding your clinic, specific workflows, or custom feature ideas...'}
                  className="w-full p-3.5 rounded-xl bg-background border border-border text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-hidden resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {submitting ? (
                  <span>{isFa ? 'در حال پردازش...' : 'Processing...'}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{isFa ? 'ثبت نهایی درخواست و دریافت مشاوره' : 'Submit Project Inquiry'}</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </section>

      {/* 7. TECH STACK & ARCHITECTURE MATRIX */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-border/70 text-center space-y-4">
            <h3 className="font-heading font-bold text-foreground text-base sm:text-lg flex items-center justify-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              <span>{isFa ? 'فناوری‌های به‌کاررفته در توسعه این سامانه' : 'Core Technologies & Clean Architecture'}</span>
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite', 'Google Gemini AI', '.NET 8 Architecture', 'Motion Animations', 'Lucide Icons', 'Cloud Run / Express'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-accent/60 border border-primary/20 text-xs font-mono font-semibold text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-xs text-muted-foreground max-w-xl mx-auto pt-1">
              {isFa ? 'توسعه یافته بر اساس استاندارد گوگل و اصول کدنویسی تمیز (Google TypeScript Style Guide).' : 'Engineered adhering to Google TypeScript Style Guidelines and resilient web standards.'}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
