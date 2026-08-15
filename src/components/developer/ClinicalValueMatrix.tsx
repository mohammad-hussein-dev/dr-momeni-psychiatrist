import React, { useState } from 'react';
import { 
  Check, 
  X, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  Bot, 
  Calendar, 
  Users, 
  Sparkles, 
  ArrowRight,
  Stethoscope,
  Building2,
  Lock,
  Clock
} from 'lucide-react';
import { Reveal } from '../Reveal';
import { SectionHeading } from '../site/SectionHeading';

interface ClinicalValueMatrixProps {
  isFa: boolean;
}

export const ClinicalValueMatrix: React.FC<ClinicalValueMatrixProps> = ({ isFa }) => {
  const [selectedPerspective, setSelectedPerspective] = useState<'doctor' | 'patient' | 'manager'>('doctor');

  const perspectives = [
    {
      id: 'doctor' as const,
      icon: Stethoscope,
      label: isFa ? 'دیدگاه پزشک و متخصص' : 'For Specialist Physicians',
      benefitTitle: isFa ? 'نظم کامل مطب و کاهش خستگی ویزیت' : 'Zero Scheduling Chaos & Effortless Intake',
      benefits: isFa ? [
        'دریافت شرح‌حال اولیه و علائم بیمار توسط هوش مصنوعی قبل از ورود بیمار به اتاق ویزیت',
        'تنظیم دقیق ظرفیت ویزیت و شیفت‌های کاری بدون تداخل و بدون نیاز به پاسخگویی تلفنی مکرر',
        'امکان دسترسی سریع به سوابق و یادداشت‌های بالینی با حفظ امنیت و محرمانگی کامل',
        'برندسازی دیجیتال معتبر و در شأن رتبه علمی پزشک'
      ] : [
        'AI pre-intake collects sleep & mood symptoms before patient enters consultation room',
        'Custom shift rules & automated capacity management prevent double-booking',
        'Encrypted electronic patient records with zero data leakage',
        'Prestigious digital clinical presence matching physician expertise'
      ]
    },
    {
      id: 'patient' as const,
      icon: Users,
      label: isFa ? 'دیدگاه بیمار و مراجع' : 'For Patients & Clients',
      benefitTitle: isFa ? 'رزرو نوبت در ۳۰ ثانیه بدون معطلی' : '30-Second Hassle-Free Appointment Booking',
      benefits: isFa ? [
        'رزرو نوبت سریع روی گوشی بدون نیاز به نصب هیچ‌گونه اپلیکیشن اضافی',
        'مسیریابی هوشمند با یک لمس به بلد، نشان، گوگل‌مپ و ویز',
        'دریافت فوری پیامک تایید نوبت با لینک مکان دقیق کلینیک',
        'مشاوره تریاژ هوشمند برای انتخاب صحیح نوع نوبت (حضوری یا آنلاین)'
      ] : [
        'Instant mobile booking with zero app install required',
        'One-tap navigation directly into Google Maps, Waze, Neshan, and Balad',
        'Immediate SMS confirmations with clinic address and prep instructions',
        'Intelligent symptom guidance ensuring appropriate service selection'
      ]
    },
    {
      id: 'manager' as const,
      icon: Building2,
      label: isFa ? 'دیدگاه مدیر کلینیک و مرکز' : 'For Clinic & Practice Directors',
      benefitTitle: isFa ? 'افزایش راندمان و کاهش هزینه‌های پرسنلی' : 'Maximized Attendance & Lower Overhead',
      benefits: isFa ? [
        'کاهش تماس‌های تکراری منشی تا ۷۰ درصد به دلیل اتوماسیون کامل نوبت‌دهی',
        'گزارش‌گیری دقیق از تعداد نوبت‌ها، لغوها و حضور مراجعین',
        'مدیریت چندپزشکه و تفکیک اتاق‌ها و خدمات در یک پنل یکپارچه',
        'بهینه‌سازی سئو برای جذب بالاترین رتبه در جستجوهای پزشکی گوگل'
      ] : [
        'Up to 70% reduction in phone inquiries through automated patient workflows',
        'Comprehensive attendance reporting, cancelation tracking, and revenue logs',
        'Unified multi-practitioner scheduling and room allocation',
        'Clinical SEO optimized for top Google healthcare search rankings'
      ]
    }
  ];

  const currentPerspective = perspectives.find(p => p.id === selectedPerspective)!;

  const comparisonRows = [
    {
      feature: isFa ? 'تجربه موبایل و لمس سریع' : 'Mobile Ergonomics & Speed',
      traditional: isFa ? 'قالب‌های سنگین و کند، دکمه‌های ریز و ناخوانا' : 'Bloated slow templates, tiny hard-to-tap buttons',
      senior: isFa ? 'طراحی اختصاصی برای ۹۰٪ مراجعین با لمس آسان و شماره‌گیری آنی' : 'Engineered for 90%+ smartphone traffic, sub-second native dialing'
    },
    {
      feature: isFa ? 'سیستم نوبت‌دهی' : 'Appointment Workflow',
      traditional: isFa ? 'فرم‌های ساده بدون تقویم زنده، تداخل نوبت‌ها' : 'Static contact forms leading to manual scheduling overlaps',
      senior: isFa ? 'تقویم هوشمند با ظرفیت پویا و پیامک خودکار تایید' : 'Interactive calendar with dynamic capacity & automated SMS confirmations'
    },
    {
      feature: isFa ? 'هوش مصنوعی و تریاژ' : 'Clinical AI Integration',
      traditional: isFa ? 'ندارد یا چت‌بات‌های آماده و عمومی بدون درک پزشکی' : 'None or generic chatbots hallucinating inaccurate advice',
      senior: isFa ? 'مدل اختصاصی Gemini با دستورالعمل‌های بالینی و رازداری بیمار' : 'Google Gemini AI tailored with strict clinical triage guardrails'
    },
    {
      feature: isFa ? 'معماری و امنیت پایدار' : 'Architecture & Security',
      traditional: isFa ? 'پلاگین‌های ناامن، آسیب‌پذیری و کندی تدریجی' : 'Vulnerable generic plugins that slow down and break over time',
      senior: isFa ? 'معماری تمیز (Clean Architecture)، بدون باگ و نشت داده' : 'Strict Clean Architecture, zero SQLi, enterprise stability'
    }
  ];

  return (
    <div className="space-y-12">
      
      {/* 1. Value Perspective Selector for Clinic Stakeholders */}
      <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 shadow-md">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFa ? 'چرا این پلتفرم متفاوت است؟' : 'Why This Engineering Matters'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            {isFa ? 'تاثیر مهندسی نرم‌افزار حرفه‌ای در عمل' : 'Real-World Clinical & Practice Impact'}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {isFa 
              ? 'ببینید این معماری چگونه مستقیماً تجربه بیمار، نظم کاری پزشک و بهره‌وری کلینیک را متحول می‌کند.' 
              : 'Discover how specialized medical web architecture benefits every stakeholder.'}
          </p>
        </div>

        {/* Perspective Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {perspectives.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedPerspective === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPerspective(p.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Perspective Detail Card */}
        <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-accent/25 border border-primary/20 space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm sm:text-base font-heading">
            <Sparkles className="w-4 h-4" />
            <span>{currentPerspective.benefitTitle}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {currentPerspective.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border/70 text-xs sm:text-sm text-foreground">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 2. Traditional Web vs Senior Medical Architecture Comparison Table */}
      <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 shadow-md overflow-hidden">
        
        <div className="border-b border-border/70 pb-4 mb-6">
          <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground">
            {isFa ? 'مقایسه وبسایت‌های آماده با سامانه اختصاصی مهندسی‌شده' : 'Generic Templates vs. Senior Engineered Platform'}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {isFa 
              ? 'تفاوت یک سایت معمولی با سیستمی که اختصاصاً بر اساس استانداردهای پزشکی و سرعت بالا ساخته شده است.' 
              : 'Clear side-by-side comparison of boilerplate solutions vs. tailored high-performance architecture.'}
          </p>
        </div>

        <div className="space-y-4">
          {comparisonRows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-2xl bg-muted/40 border border-border/60 items-center">
              
              <div className="md:col-span-4 font-bold text-xs sm:text-sm text-foreground font-heading">
                {row.feature}
              </div>

              <div className="md:col-span-4 flex items-start gap-2 text-xs text-muted-foreground p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/20">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{row.traditional}</span>
              </div>

              <div className="md:col-span-4 flex items-start gap-2 text-xs text-foreground font-medium p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{row.senior}</span>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
