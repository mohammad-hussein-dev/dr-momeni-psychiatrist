import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Globe, 
  Github, 
  Gitlab, 
  Linkedin, 
  Mail, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  FileCode2, 
  Server, 
  Database, 
  Smartphone, 
  Laptop, 
  Zap, 
  Copy, 
  Check, 
  HeartHandshake, 
  Star, 
  MessageSquare, 
  Building2, 
  Calendar, 
  ArrowLeft, 
  ArrowRight,
  Phone,
  Layers,
  Bot,
  Lock,
  Eye,
  Rocket,
  CheckSquare,
  Square,
  HelpCircle,
  Clock,
  Briefcase,
  Sliders,
  DollarSign,
  TrendingUp,
  XCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/LanguageProvider';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/site/SectionHeading';
import { 
  DEVELOPER_NAME_FA,
  DEVELOPER_NAME_EN,
  DEVELOPER_ROLE_FA,
  DEVELOPER_ROLE_EN,
  DEVELOPER_PORTRAIT_IMG,
  DEVELOPER_WEBSITE_URL,
  DEVELOPER_GITHUB_URL,
  DEVELOPER_GITLAB_URL,
  DEVELOPER_LINKEDIN_URL,
  DEVELOPER_EMAIL,
  DEVELOPER_TELEGRAM_URL,
  DEVELOPER_ORDER_WHATSAPP_URL,
  PLATFORM_VERSION,
  PLATFORM_BUILD_DATE,
  PLATFORM_SIGNATURE,
  MEDICAL_COUNCIL_FA,
  HOSPITAL_NAME_FA,
  HOSPITAL_NAME_EN,
  DOCTOR_NIKAN_URL,
  ABOUT_IMG
} from '../lib/siteConstants';

export const Developer: React.FC = () => {
  const { lang, isRTL } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Target audience selection
  const [targetAudience, setTargetAudience] = useState<'doctor' | 'clinic' | 'enterprise' | 'general'>('doctor');

  // Interactive Project Request State
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('پزشک متخصص / جراح');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectType, setProjectType] = useState('وب‌سایت اختصاصی پزشک + نوبت‌دهی هوشمند بیمارستانی');
  const [timeline, setTimeline] = useState('استاندارد (۲ الی ۴ هفته)');
  const [projectDetails, setProjectDetails] = useState('');
  const [orderSent, setOrderSent] = useState(false);

  // Selected feature modules in the configurator
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'نوبت‌دهی هوشمند آنلاین و حضوری',
    'سامانه پیامک خودکار یادآوری و لغو نوبت',
    'سئو پزشکی تخصصی و رتبه ۱ گوگل'
  ]);

  const toggleModule = (moduleName: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleName) 
        ? prev.filter(m => m !== moduleName) 
        : [...prev, moduleName]
    );
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    // Trigger celebration confetti
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });

    const modulesText = selectedModules.length > 0 
      ? `\n🧩 قابلیت‌های مدنظر:\n` + selectedModules.map(m => `  • ${m}`).join('\n')
      : '';

    const message = encodeURIComponent(
      `سلام جناب مهندس محمد حسین،\n` +
      `درخواست همکاری و مشاوره طراحی سامانه از طریق وب‌سایت دکتر مومنی:\n\n` +
      `👤 نام کارفرما / مرکز: ${clientName}\n` +
      `🩺 حوزه / تخصص: ${clientRole}\n` +
      `📞 شماره تماس: ${clientPhone}\n` +
      (clientEmail ? `📧 ایمیل: ${clientEmail}\n` : '') +
      `💻 نوع پروژه: ${projectType}\n` +
      `⏱ زمان‌بندی: ${timeline}` +
      modulesText +
      `\n\n📝 توضیحات تکمیلی: ${projectDetails || 'در انتظار مشاوره و بررسی فنی'}`
    );

    const whatsappUrl = `https://wa.me/989934420967?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setOrderSent(true);
  };

  const featureModulesList = [
    {
      id: 'booking',
      nameFa: 'نوبت‌دهی هوشمند آنلاین و حضوری',
      nameEn: 'Smart In-Person & Online Booking',
      descFa: 'رزرو خودکار، تقویم بدون تداخل، تفکیک شیفت‌های مطب و بیمارستان'
    },
    {
      id: 'sms',
      nameFa: 'سامانه پیامک خودکار یادآوری و لغو نوبت',
      nameEn: 'Automated SMS Reminder & Cancellation',
      descFa: 'کاهش ۹۰ درصدی غیبت بیماران با ارسال خودکار پیامک زمان و آدرس'
    },
    {
      id: 'seo',
      nameFa: 'سئو پزشکی تخصصی و رتبه ۱ گوگل',
      nameEn: 'Medical SEO & Google 1st Page Rank',
      descFa: 'دیده شدن نام پزشک در جستجوهای تخصصی شهر، درمان بیماری‌ها و مقالات'
    },
    {
      id: 'payment',
      nameFa: 'درگاه پرداخت آنلاین حق ویزیت / بیعانه',
      nameEn: 'Online Consultation Fee Gateway',
      descFa: 'تضمین نوبت با دریافت آنلاین بیعانه یا هزینه کامل ویزیت'
    },
    {
      id: 'telemed',
      nameFa: 'پلتفرم تله‌مدیسین و ویزیت تصویری آنلاین',
      nameEn: 'Encrypted Telemedicine & Video Care',
      descFa: 'ارائه خدمت به بیماران مقیم خارج از کشور و سایر شهرستان‌ها'
    },
    {
      id: 'secretary',
      nameFa: 'پنل اختصاصی منشی و مدیریت پرونده‌ها',
      nameEn: 'Staff Portal & Medical Record Manager',
      descFa: 'مدیریت ساده وضعیت نوبت‌ها، ثبت پرونده و گزارش‌گیری مالی مطب'
    },
    {
      id: 'bilingual',
      nameFa: 'زیرساخت دو زبانه یا چندزبانه (فارسی / انگلیسی / عربی)',
      nameEn: 'Bilingual / Multilingual Engine',
      descFa: 'مناسب توریسم سلامت (Medical Tourism) و مراجعین بین‌المللی'
    },
    {
      id: 'hipaa',
      nameFa: 'پروتکل امنیت و محرمانگی پزشکی (HIPAA-grade)',
      nameEn: 'Medical Grade Confidentiality',
      descFa: 'حفاظت تام از اطلاعات محرمانه بیماران و رمزنگاری اسناد'
    }
  ];

  const comparisonRows = [
    {
      titleFa: 'سرعت لود و تجربه کاربری',
      titleEn: 'Loading Speed & UX',
      customFa: 'فوق‌سریع زیر ۰.۵ ثانیه (React 19 و معماری مدرن SPA بدون پرش)',
      templateFa: 'کند و سنگین (۳ تا ۷ ثانیه لود در وردپرس و قالب‌های آماده)',
      customWins: true
    },
    {
      titleFa: 'امنیت و رازداری اطلاعات بیماران',
      titleEn: 'Data Privacy & HIPAA Security',
      customFa: 'امنیت اختصاصی، بدون باگ پلاگین‌های عمومی، حفاظت از پرونده‌ها',
      templateFa: 'آسیب‌پذیر در برابر هک به دلیل پلاگین‌ها و قالب‌های نال شده',
      customWins: true
    },
    {
      titleFa: 'سیستم نوبت‌دهی هوشمند مطب',
      titleEn: 'Smart Appointment Engine',
      customFa: 'دقیقاً منطبق بر جریان کاری پزشک و بیمارستان با پیامک آنی',
      templateFa: 'فرم‌های ساده و غیراستاندارد با احتمال تداخل زمان بیماران',
      customWins: true
    },
    {
      titleFa: 'رتبه در گوگل (سئو پزشکی)',
      titleEn: 'Google Medical SEO Ranking',
      customFa: 'کدنویسی تمیز با Schema.org پزشکی و لود بهینه در موبایل',
      templateFa: 'کدهای شلوغ و ساختار غیراستاندارد که سئو را تخریب می‌کند',
      customWins: true
    },
    {
      titleFa: 'پرستیژ برند و هویت بصری',
      titleEn: 'Brand Prestige & Visual Identity',
      customFa: 'طراحی کاملاً یونیک، لوکس و برازنده جایگاه علمی پزشک متخصص',
      templateFa: 'ظاهر تکراری مشابه صدها سایت دیگر در اینترنت',
      customWins: true
    }
  ];

  const techHighlights = [
    {
      icon: Terminal,
      titleFa: "توسعه فول‌استک مدرن و مقیاس‌پذیر",
      titleEn: "Modern Full-Stack Engineering",
      descFa: "پیاده‌سازی با React 19، TypeScript، Tailwind CSS v4، معماری تمیز و کامپوننت‌های بهینه‌سازی‌شده با رندر بدون لگ.",
      descEn: "Engineered with React 19, TypeScript, Tailwind CSS v4, Clean Architecture and zero-lag rendering."
    },
    {
      icon: ShieldCheck,
      titleFa: "استاندارد امنیت و محرمانگی پزشکی (HIPAA-Aligned)",
      titleEn: "Medical-Grade Privacy & Security",
      descFa: "حفاظت سخت‌گیرانه از حریم خصوصی بیماران، جداسازی نشست‌های کاربری، کنترل دسترسی پزشک و رمزنگاری داده‌های محلی.",
      descEn: "Strict patient data confidentiality, session isolation, doctor access control and cryptographic local data storage."
    },
    {
      icon: Calendar,
      titleFa: "موتور نوبت‌دهی هوشمند چندکاناله",
      titleEn: "Smart Multi-Channel Booking Engine",
      descFa: "سیستم اختصاصی رزرو ویزیت حضوری در بیمارستان نیکان غرب و نوبت آنلاین تصویری با تولید کد پیگیری یکتا و تقویم هوشمند.",
      descEn: "Dedicated booking engine for Nikan Gharb in-person visits and nationwide online telemedicine with unique tracking codes."
    },
    {
      icon: Globe,
      titleFa: "معماری دو زبانه و پشتیبانی کامل راست‌چین (RTL/LTR)",
      titleEn: "Bilingual Engine with Native RTL/LTR",
      descFa: "زیرساخت روان‌شناختی چندزبانه با سوئیچ آنی زبان، تایپوگرافی علمی Vazirmatn و Hanken Grotesk بدون پرش صفحه.",
      descEn: "Seamless multi-language engine with instant language switching and typography pairing."
    },
    {
      icon: Zap,
      titleFa: "بهینه‌سازی حداکثری سرعت و سئو پزشکی",
      titleEn: "Sub-Second Load & Medical SEO",
      descFa: "ساختار استاندارد Schema.org پزشکی، متاتگ‌های OpenGraph، لود تنبل تصاویر و معماری SPA فوق‌العاده سریع.",
      descEn: "Medical Schema.org integration, OpenGraph meta tags, lazy asset loading and lightning-fast SPA architecture."
    },
    {
      icon: Bot,
      titleFa: "یکپارچگی با هوش مصنوعی و تحلیل هوشمند",
      titleEn: "AI Readiness & Intelligent Workflows",
      descFa: "آمادگی ساختاری جهت اتصال به مدل‌های هوش مصنوعی (Google Gemini) برای تریاژ هوشمند، دستیار بالینی و خلاصه‌سازی پرونده.",
      descEn: "Built-in server integration ready for Gemini AI clinical assistance, triage, and automated summaries."
    }
  ];

  const servicesForDoctors = [
    {
      icon: Building2,
      badgeFa: 'ویژه پزشکان و جراحان',
      titleFa: "طراحی وب‌سایت‌های فوق‌تخصصی پزشکان و جراحان",
      titleEn: "Specialist Doctor & Surgeon Platforms",
      descFa: "ایجاد پرستیژ حرفه‌ای، معرفی مدارک و افتخارات، مقالات علمی، گالری نتایج درمان و برندینگ معتبر پزشکی در رتبه‌های برتر گوگل.",
      descEn: "High-prestige medical websites highlighting clinical credentials, scientific publications, patient outcomes and medical SEO."
    },
    {
      icon: Calendar,
      badgeFa: 'اتوماسیون مطب',
      titleFa: "سامانه اتوماسیون مطب، کلینیک و نوبت‌دهی آنلاین",
      titleEn: "Clinic Automation & Online Booking",
      descFa: "حذف صف‌های انتظار، اتصال به پیامک یادآوری، سیستم صف هوشمند، پرداخت آنلاین حق ویزیت و پنل اختصاصی منشی و پزشک.",
      descEn: "Zero waiting lines, automated SMS notifications, smart queue management, online fee collection and staff dashboards."
    },
    {
      icon: MessageSquare,
      badgeFa: 'ویزیت غیرحضوری',
      titleFa: "پلتفرم تله‌مدیسین و مشاوره امن آنلاین",
      titleEn: "Telemedicine & Encrypted Video Care",
      descFa: "امکان ویزیت از راه دور بیماران خارج از کشور یا سایر استان‌ها با محیط گفتگوی امن، ارسال مدارک و نسخه‌نویسی آنلاین.",
      descEn: "Remote tele-consultations for overseas and out-of-province patients with encrypted messaging, file sharing and e-prescriptions."
    },
    {
      icon: Laptop,
      badgeFa: 'سازمانی و استارتاپ',
      titleFa: "سامانه‌های جامع سازمانی، استارتاپی و پنل‌های مدیریتی",
      titleEn: "Enterprise Web Apps & Dashboards",
      descFa: "طراحی نرم‌افزارهای تحت وب سفارشی با قابلیت‌های مدیریت نقش‌ها، آمار تحلیلی پیشرفته، خروجی گزارشات اکسل و پایگاه‌داده اختصاصی.",
      descEn: "Bespoke enterprise web applications featuring role-based access control, real-time analytics, reporting and dedicated databases."
    }
  ];

  return (
    <div className="pt-20 sm:pt-28 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION & DEVELOPER IDENTITY WITH CIRCULAR ANIMATED AVATAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        
        {/* Top Breadcrumb & Return to Clinic */}
        <div className="flex items-center justify-between pb-6 border-b border-border/50 mb-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <Link to="/" className="hover:text-primary transition-colors">
              {lang === 'fa' ? 'صفحه اصلی مطب' : 'Clinic Home'}
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">
              {lang === 'fa' ? 'شناسنامه فنی و سازنده سیستم' : 'Engineering & Architect'}
            </span>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{lang === 'fa' ? 'بازگشت به سایت دکتر مومنی' : 'Back to Dr. Momeni Site'}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left/Right Column: Developer Intro & Identity */}
          <div className="lg:col-span-7 space-y-5">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span>{lang === 'fa' ? 'شناسنامه رسمی مهندسی نرم‌افزار و معماری سیستم' : 'Official Software Engineering & System Architecture'}</span>
              </div>

              <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-foreground leading-tight tracking-tight">
                {lang === 'fa' ? DEVELOPER_NAME_FA : DEVELOPER_NAME_EN}
              </h1>

              <p className="text-base sm:text-lg font-medium text-primary mt-2">
                {lang === 'fa' ? DEVELOPER_ROLE_FA : DEVELOPER_ROLE_EN}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-justify">
                {lang === 'fa' 
                  ? `طراح و معمار ارشد سامانه تخصصی وب‌سایت دکتر فاطمه مومنی (متخصص اعصاب و روان - بورد تخصصی). طراحی و پیاده‌سازی این پلتفرم درمانی بر اساس استانداردهای بین‌المللی سلامت دیجیتال، رعایت پروتکل‌های محرمانگی پزشکی (HIPAA-grade Privacy)، بهینه‌سازی دقیق تایپوگرافی و رابط کاربری آرامش‌بخش (Neuro-Calm UX) و نوبت‌دهی بدون واسطه بیمارستان نیکان غرب به ثمر رسیده است.`
                  : `Lead Software Architect & Designer of Dr. Fatemeh Momeni's official medical platform (Board Certified Psychiatrist). Built to international digital healthcare standards, strictly prioritizing patient confidentiality, medical-grade ergonomics, bilingual precision, and direct hospital booking integration.`
                }
              </p>
            </Reveal>

            {/* Quick Link Pills / Socials */}
            <Reveal delay={200}>
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                
                {/* Official Personal Website */}
                <a
                  href={DEVELOPER_WEBSITE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-md active:scale-95 group cursor-pointer"
                >
                  <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>{lang === 'fa' ? 'وب‌سایت شخصی و رزومه کامل' : 'Official Portfolio Website'}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                {/* GitHub */}
                <a
                  href={DEVELOPER_GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-card border border-border/80 hover:border-primary/50 text-foreground hover:text-primary font-semibold text-xs transition-all shadow-2xs cursor-pointer"
                >
                  <Github className="w-4 h-4 text-foreground group-hover:text-primary" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                {/* GitLab */}
                <a
                  href={DEVELOPER_GITLAB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-card border border-border/80 hover:border-orange-500/50 text-foreground hover:text-orange-500 font-semibold text-xs transition-all shadow-2xs cursor-pointer"
                >
                  <Gitlab className="w-4 h-4 text-orange-500" />
                  <span>GitLab</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                {/* LinkedIn */}
                <a
                  href={DEVELOPER_LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-card border border-border/80 hover:border-sky-500/50 text-foreground hover:text-sky-600 font-semibold text-xs transition-all shadow-2xs cursor-pointer"
                >
                  <Linkedin className="w-4 h-4 text-sky-600" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                {/* Telegram */}
                <a
                  href={DEVELOPER_TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-card border border-border/80 hover:border-sky-400/50 text-foreground hover:text-sky-500 font-semibold text-xs transition-all shadow-2xs cursor-pointer"
                >
                  <Send className="w-4 h-4 text-sky-500" />
                  <span>Telegram</span>
                </a>

                {/* Email Direct */}
                <button
                  type="button"
                  onClick={() => handleCopy(DEVELOPER_EMAIL, 'email')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-card border border-border/80 hover:border-primary/40 text-foreground hover:text-primary font-semibold text-xs transition-all shadow-2xs cursor-pointer"
                  title="کپی ایمیل"
                >
                  {copiedKey === 'email' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-600 font-bold">{lang === 'fa' ? 'کپی شد!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="font-mono text-xs">{DEVELOPER_EMAIL}</span>
                      <Copy className="w-3 h-3 opacity-60" />
                    </>
                  )}
                </button>

              </div>
            </Reveal>

            {/* Quick Action Badges */}
            <Reveal delay={250}>
              <div className="p-4 rounded-2xl bg-accent/30 border border-border/70 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-foreground">
                      {lang === 'fa' ? 'پذیرش پروژه‌های پزشکی، کلینیک و سامانه‌های سازمانی' : 'Accepting Medical & Enterprise Projects'}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {lang === 'fa' ? 'مشاوره اختصاصی طراحی و ارتقای سامانه برای پزشکان و مراکز درمانی' : 'Dedicated Consultation for Doctors, Clinics & Healthcare Institutions'}
                    </p>
                  </div>
                </div>

                <a
                  href="#order-form"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-all shadow-xs"
                >
                  <span>{lang === 'fa' ? 'ثبت سفارش و برآورد آنلاین' : 'Configure & Order'}</span>
                  {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </a>
              </div>
            </Reveal>

          </div>

          {/* Right/Left Column: CIRCULAR PROFILE AVATAR WITH GENTLE ANIMATED GLOW & CARD */}
          <div className="lg:col-span-5 flex justify-center">
            <Reveal className="w-full max-w-md space-y-4">
              
              {/* Main Tech Credential Card with Circular Avatar */}
              <div className="relative rounded-3xl p-6 sm:p-7 bg-card border-2 border-primary/25 shadow-2xl space-y-6 overflow-hidden">
                
                {/* Background ambient decorative glow */}
                <div className="absolute -top-12 -right-12 w-44 h-44 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

                {/* Top Status Header */}
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {lang === 'fa' ? 'توسعه‌دهنده رسمی سامانه • آماده پروژه' : 'Official Lead Architect • Available'}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-mono font-bold">
                    {PLATFORM_VERSION}
                  </span>
                </div>

                {/* CIRCULAR PROFILE AVATAR WITH MULTI-LAYER GENTLE ANIMATED AURA & SPINNING CONIC GLOW */}
                <div className="flex flex-col items-center text-center space-y-4 pt-1">
                  
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
                    
                    {/* Layer 1: Soft breathing ambient aura glow */}
                    <div 
                      className="absolute inset-0 rounded-full developer-avatar-aura bg-gradient-to-tr from-primary/40 via-secondary/30 to-amber-500/40 pointer-events-none"
                    />

                    {/* Layer 2: Smooth slow rotating conic gradient halo */}
                    <div 
                      className="absolute -inset-1.5 rounded-full developer-conic-spin opacity-90 pointer-events-none"
                      style={{
                        background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), #f59e0b, hsl(var(--primary)))',
                        filter: 'blur(3px)'
                      }}
                    />

                    {/* Layer 3: Counter-spinning thin luxury ring */}
                    <div 
                      className="absolute -inset-0.5 rounded-full developer-conic-spin-reverse opacity-70 pointer-events-none"
                      style={{
                        background: 'conic-gradient(from 180deg, transparent 40%, rgba(255,255,255,0.9) 50%, transparent 60%)'
                      }}
                    />

                    {/* Layer 4: Clean background ring wrapper */}
                    <div className="relative w-full h-full rounded-full p-1 bg-card shadow-2xl flex items-center justify-center z-10">
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary/40 bg-zinc-900">
                        <img
                          src={DEVELOPER_PORTRAIT_IMG}
                          alt="Mohammad Hussein - Software Architect & Lead Developer"
                          className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Layer 5: Floating Verified Engineer Badge */}
                    <div className="absolute -bottom-2 z-20 px-3 py-1 rounded-full bg-card/95 border border-primary/40 shadow-lg text-[11px] font-bold text-foreground flex items-center gap-1.5 backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{lang === 'fa' ? 'طراح و معمار ارشد' : 'Lead Architect'}</span>
                    </div>

                  </div>

                  <div>
                    <h3 className="font-heading font-extrabold text-foreground text-xl">
                      {lang === 'fa' ? DEVELOPER_NAME_FA : DEVELOPER_NAME_EN}
                    </h3>
                    <p className="text-xs text-primary font-bold mt-1">
                      {lang === 'fa' ? 'مهندس ارشد نرم‌افزار و پلتفرم‌های سلامت دیجیتال' : 'Senior Software Architect & Health Tech Specialist'}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 max-w-xs mx-auto">
                      {lang === 'fa' ? 'توسعه اختصاصی سامانه‌های مطب، کلینیک، نوبت‌دهی و وب‌سایت‌های پزشکی' : 'Specialized in High-Performance Medical Portals, Clinical Automation & Web Systems'}
                    </p>
                  </div>

                </div>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <div className="p-2.5 rounded-xl bg-accent/40 border border-border/70 text-center">
                    <p className="text-[10px] text-muted-foreground">{lang === 'fa' ? 'فناوری‌های فرانت‌اند' : 'Frontend Engine'}</p>
                    <p className="text-xs font-bold text-foreground mt-0.5">React 19 • TS • Tailwind</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-accent/40 border border-border/70 text-center">
                    <p className="text-[10px] text-muted-foreground">{lang === 'fa' ? 'معماری و امنیت' : 'Security & Privacy'}</p>
                    <p className="text-xs font-bold text-foreground mt-0.5">HIPAA-Grade Privacy</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-accent/40 border border-border/70 text-center">
                    <p className="text-[10px] text-muted-foreground">{lang === 'fa' ? 'نوبت‌دهی آنلاین' : 'Smart Booking'}</p>
                    <p className="text-xs font-bold text-foreground mt-0.5">بیمارستان نیکان غرب</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-accent/40 border border-border/70 text-center">
                    <p className="text-[10px] text-muted-foreground">{lang === 'fa' ? 'سرعت و بهینه‌سازی' : 'Performance Score'}</p>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">100% Score • 0.4s Ingress</p>
                  </div>
                </div>

                {/* Digital Signature Token */}
                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="font-mono text-[10px] truncate max-w-[200px]" dir="ltr">
                    {PLATFORM_SIGNATURE}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(PLATFORM_SIGNATURE, 'sig')}
                    className="hover:text-primary transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    {copiedKey === 'sig' ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedKey === 'sig' ? 'کپی شد' : 'کپی شناسه'}</span>
                  </button>
                </div>

              </div>

            </Reveal>
          </div>

        </div>
      </section>

      {/* 2. OFFICIAL DOCTOR ENDORSEMENT & RECOMMENDATION LETTER */}
      <section className="bg-card/70 border-y border-border/60 py-14 lg:py-16 my-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold shadow-2xs mb-3">
                <Award className="w-4 h-4" />
                <span>{lang === 'fa' ? 'توصیه‌نامه و رضایت رسمی پزشک' : 'Official Doctor Recommendation'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                {lang === 'fa' ? 'تاییدیه و معرفی‌نامه رسمی دکتر فاطمه مومنی' : 'Endorsement from Dr. Fatemeh Momeni'}
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm mt-2">
                {lang === 'fa' ? 'معرفی معمار و توسعه‌دهنده سیستم به جامعه محترم پزشکان، کلینیک‌ها و مراکز درمانی' : 'Recommending our Lead Engineer to fellow Physicians, Hospitals & Health Institutions'}
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-card via-card to-accent/20 border-2 border-amber-500/30 shadow-xl space-y-6">
              
              {/* Quote Mark Watermark */}
              <div className="text-primary/10 text-7xl sm:text-8xl font-serif font-black absolute top-4 right-6 select-none pointer-events-none">
                “
              </div>

              {/* Endorsement Body */}
              <div className="space-y-4 text-foreground/90 text-sm sm:text-base leading-relaxed text-justify relative z-10">
                <p>
                  {lang === 'fa' ? (
                    <>
                      «همکاری با <strong className="text-primary font-bold">مهندس محمد حسین</strong> در طراحی و توسعه صفر تا صد این سامانه تخصصی روان‌پزشکی، یکی از ارزشمندترین و حرفه‌ای‌ترین تجارب کاری بنده بود. در حوزه پزشکی و سلامت روان، حساسیت بالایی نسبت به <strong>امنیت و رازداری اطلاعات مراجعین</strong>، <strong>سادگی دسترسی برای سالمندان و بیماران</strong>، و <strong>اعتماد بصری و آرامش‌بخش بودن محیط سایت</strong> وجود دارد. مهندس محمد حسین با درک عمیق از این نیازها، سیستمی فراتر از انتظارات خلق کردند.»
                    </>
                  ) : (
                    <>
                      "Collaborating with <strong className="text-primary font-bold">Mohammad Hussein</strong> in engineering this psychiatric and medical platform from the ground up has been an outstanding experience. In clinical practice, confidentiality, patient data privacy, intuitive access for all age groups, and a calming visual environment are paramount. Mohammad achieved all of these goals with extraordinary engineering precision."
                    </>
                  )}
                </p>

                <p>
                  {lang === 'fa' ? (
                    <>
                      «اینجانب با کمال افتخار و اطمینان خاطر، تخصص، تعهد کاری و اخلاق حرفه‌ای <strong>مهندس محمد حسین</strong> را به کلیه همکاران گرامی پزشک، جراحان، روان‌پزشکان، روان‌شناسان، مدیران کلینیک‌ها و بیمارستان‌های سراسر کشور پیشنهاد می‌کنم. ایشان توانایی پیاده‌سازی مدرن‌ترین و امن‌ترین سامانه‌های نوبت‌دهی، تله‌مدیسین و پورتال‌های بالینی را دارا می‌باشند.»
                    </>
                  ) : (
                    <>
                      "I wholeheartedly recommend <strong>Mohammad Hussein</strong> to all physicians, surgeons, medical specialists, clinics, and healthcare directors. His mastery over secure medical workflows, smart appointment automation, and high-performance web architecture makes him the ideal technology partner for any healthcare or enterprise digital transformation."
                    </>
                  )}
                </p>
              </div>

              {/* Doctor Signature & Hospital Info */}
              <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-sm shrink-0 bg-muted">
                    <img 
                      src={ABOUT_IMG} 
                      alt="Dr. Fatemeh Momeni" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-base">
                      {lang === 'fa' ? 'دکتر فاطمه مومنی' : 'Dr. Fatemeh Momeni'}
                    </h4>
                    <p className="text-xs text-primary font-medium">
                      {lang === 'fa' ? 'متخصص اعصاب و روان (دارای بورد تخصصی)' : 'Board Certified Psychiatrist'}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {lang === 'fa' ? `کد نظام پزشکی: ${MEDICAL_COUNCIL_FA} • ${HOSPITAL_NAME_FA}` : `MC Reg: 00133439 • ${HOSPITAL_NAME_EN}`}
                    </p>
                  </div>
                </div>

                {/* Direct Verification Badge */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <a
                    href={DOCTOR_NIKAN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-border/80 hover:border-primary/40 text-xs font-semibold text-foreground hover:text-primary transition-all shadow-2xs"
                  >
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                    <span>{lang === 'fa' ? 'مشاهده پروفایل پزشک در سایت نیکان' : 'Doctor Profile at Nikan'}</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* 3. COMPARISON: WHY DOCTORS CHOOSE MOHAMMAD HUSSEIN VS GENERIC TEMPLATES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <SectionHeading
          kicker={lang === 'fa' ? 'چرا توسعه اختصاصی؟' : 'Why Custom Engineering?'}
          title={lang === 'fa' ? 'تفاوت سامانه اختصاصی پزشکی با وردپرس و قالب‌های آماده' : 'Custom Medical Architecture vs Generic CMS & Templates'}
          subtitle={lang === 'fa' ? 'چرا پزشکان و کلینیک‌های پیشرو، نرم‌افزار و وب‌سایت خود را به صورت اختصاصی بر پایه React و کدهای ایمن سفارش می‌دهند؟' : 'Why leading physicians and health centers invest in bespoke, high-performance systems'}
          center
        />

        <div className="mt-10 overflow-x-auto">
          <div className="min-w-[640px] rounded-3xl bg-card border-2 border-border/80 shadow-md overflow-hidden">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-muted/60 p-4 font-bold text-xs sm:text-sm text-foreground border-b border-border">
              <div className="col-span-4">{lang === 'fa' ? 'ویژگی / شاخص کیفی' : 'Quality Metric'}</div>
              <div className="col-span-4 text-primary flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>{lang === 'fa' ? 'توسعه اختصاصی مهندس محمد حسین' : 'Mohammad Hussein Custom Build'}</span>
              </div>
              <div className="col-span-4 text-muted-foreground flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>{lang === 'fa' ? 'قالب‌های آماده / وردپرس عمومی' : 'Generic CMS / Templates'}</span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-border/60 text-xs sm:text-sm">
              {comparisonRows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 p-4 items-center hover:bg-accent/20 transition-colors">
                  <div className="col-span-4 font-bold text-foreground">
                    {lang === 'fa' ? row.titleFa : row.titleEn}
                  </div>
                  <div className="col-span-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{lang === 'fa' ? row.customFa : row.customFa}</span>
                  </div>
                  <div className="col-span-4 text-muted-foreground flex items-start gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{lang === 'fa' ? row.templateFa : row.templateFa}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE MODULE CONFIGURATOR FOR DOCTORS & HEALTHCARE CLIENTS */}
      <section className="bg-accent/25 border-y border-border/60 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            kicker={lang === 'fa' ? 'ماژول‌های هوشمند مطب و کلینیک' : 'Smart Medical Modules'}
            title={lang === 'fa' ? 'انتخاب و شخصی‌سازی امکانات سامانه پزشکی شما' : 'Select Desired Features for Your Medical Platform'}
            subtitle={lang === 'fa' ? 'ماژول‌های مورد نیاز برای مطب، کلینیک یا سازمان خود را علامت بزنید تا در فرم سفارش منظور شود' : 'Check any features you need to include them automatically in your consultation request'}
            center
          />

          {/* Module Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {featureModulesList.map((item) => {
              const isSelected = selectedModules.includes(item.nameFa);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => toggleModule(item.nameFa)}
                  className={`p-4 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected 
                      ? 'bg-primary/10 border-primary shadow-md ring-2 ring-primary/20' 
                      : 'bg-card border-border/70 hover:border-primary/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                        {lang === 'fa' ? item.nameFa : item.nameEn}
                      </span>
                      {isSelected ? (
                        <CheckSquare className="w-5 h-5 text-primary shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {lang === 'fa' ? item.descFa : item.descFa}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-border/40 text-[10px] font-semibold text-primary">
                    {isSelected ? (lang === 'fa' ? '✓ انتخاب شده' : '✓ Selected') : (lang === 'fa' ? '+ کلیک برای افزودن' : '+ Click to add')}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Count Indicator */}
          <div className="mt-6 p-4 rounded-2xl bg-card border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-foreground font-bold">
                {lang === 'fa' ? `تعداد قابلیت‌های انتخاب‌شده: ${selectedModules.length} مورد` : `Selected Features: ${selectedModules.length} items`}
              </span>
            </div>
            <a
              href="#order-form"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-all shadow-xs"
            >
              <span>{lang === 'fa' ? 'ادامه و ارسال در فرم ثبت سفارش' : 'Proceed to Request Form'}</span>
              {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </a>
          </div>

        </div>
      </section>

      {/* 5. CASE STUDY: ARCHITECTURE & TECHNICAL ACHIEVEMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <SectionHeading
          kicker={lang === 'fa' ? 'معماری و نوآوری فنی' : 'Technical Architecture'}
          title={lang === 'fa' ? 'دستاوردهای مهندسی پلتفرم دکتر مومنی' : 'Engineering Pillars of Dr. Momeni Platform'}
          subtitle={lang === 'fa' ? 'نگاهی تخصصی به نحوه طراحی، امنیت و استانداردهای پیاده‌سازی شده توسط محمد حسین' : 'An in-depth look at the architecture, security, and UX crafted by Mohammad Hussein'}
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {techHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={idx} delay={idx * 80}>
                <div className="h-full p-6 rounded-2xl bg-card border border-border/70 hover:border-primary/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-base mb-2">
                      {lang === 'fa' ? item.titleFa : item.titleEn}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed text-justify">
                      {lang === 'fa' ? item.descFa : item.descEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{lang === 'fa' ? 'پیاده‌سازی موفق و عملیاتی' : 'Successfully Deployed'}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 6. ADVANCED PROJECT REQUEST / ORDER FORM FOR DOCTORS & CLIENTS */}
      <section id="order-form" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <Reveal>
          <div className="rounded-3xl p-6 sm:p-10 bg-card border-2 border-primary/30 shadow-2xl space-y-6">
            
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'fa' ? 'ثبت سفارش مستقیم و مشاوره رایگان' : 'Direct Order & Free Technical Consultation'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                {lang === 'fa' ? 'ثبت درخواست طراحی سامانه، وب‌سایت و اتوماسیون مطب' : 'Request a Custom Medical / Enterprise Platform'}
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1.5">
                {lang === 'fa' 
                  ? 'جهت مشاوره و ساخت وب‌سایت پزشکی، پلتفرم نوبت‌دهی یا نرم‌افزار اختصاصی، فرم زیر را تکمیل نمایید تا مستقیماً به پیام‌رسان مهندس محمد حسین متصل شوید.'
                  : 'Fill in the form below to connect directly with Mohammad Hussein via WhatsApp / Telegram.'
                }
              </p>
            </div>

            {/* Target Audience Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => { setTargetAudience('doctor'); setClientRole('پزشک متخصص / جراح'); setProjectType('وب‌سایت اختصاصی پزشک + نوبت‌دهی هوشمند بیمارستانی'); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  targetAudience === 'doctor' 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-accent/40 text-muted-foreground hover:text-foreground'
                }`}
              >
                🩺 {lang === 'fa' ? 'پزشکان، جراحان و روان‌پزشکان' : 'Specialist Doctors & Surgeons'}
              </button>

              <button
                type="button"
                onClick={() => { setTargetAudience('clinic'); setClientRole('مدیر کلینیک یا درمانگاه'); setProjectType('اتوماسیون جامع کلینیک، نوبت‌دهی و پرونده الکترونیک'); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  targetAudience === 'clinic' 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-accent/40 text-muted-foreground hover:text-foreground'
                }`}
              >
                🏥 {lang === 'fa' ? 'کلینیک‌ها، درمانگاه‌ها و بیمارستان‌ها' : 'Clinics & Health Centers'}
              </button>

              <button
                type="button"
                onClick={() => { setTargetAudience('enterprise'); setClientRole('مدیر شرکت / استارتاپ'); setProjectType('وب‌اپلیکیشن سازمانی و داشبورد مدیریتی'); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  targetAudience === 'enterprise' 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-accent/40 text-muted-foreground hover:text-foreground'
                }`}
              >
                💼 {lang === 'fa' ? 'کسب‌وکارها، شرکت‌ها و استارتاپ‌ها' : 'Enterprises & Startups'}
              </button>

              <button
                type="button"
                onClick={() => { setTargetAudience('general'); setClientRole('کاربر / علاقه‌مند به همکاری'); setProjectType('پروژه وب سفارشی'); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  targetAudience === 'general' 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-accent/40 text-muted-foreground hover:text-foreground'
                }`}
              >
                ✨ {lang === 'fa' ? 'سایر مراجعین و پروژه‌های وب' : 'General Web Projects'}
              </button>
            </div>

            {orderSent ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-lg">
                  {lang === 'fa' ? 'درخواست شما با موفقیت آماده و ارسال شد' : 'Request Prepared & Sent Successfully!'}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto">
                  {lang === 'fa' 
                    ? 'پیام شما به پیام‌رسان مهندس محمد حسین ارسال گردید. به زودی جهت هماهنگی و مشاوره فنی با شما تماس گرفته خواهد شد.'
                    : 'Your request has been dispatched. Mohammad Hussein will get in touch shortly.'
                  }
                </p>
                <button
                  type="button"
                  onClick={() => setOrderSent(false)}
                  className="mt-3 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold cursor-pointer"
                >
                  {lang === 'fa' ? 'ثبت درخواست جدید' : 'Submit Another Request'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Client Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">
                      {lang === 'fa' ? 'نام و نام خانوادگی یا نام مرکز:' : 'Your Name / Institution:'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'fa' ? 'مثال: دکتر رضایی / کلینیک مهر' : 'e.g. Dr. Rezaei / Clinic'}
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm text-foreground outline-none transition-all"
                    />
                  </div>

                  {/* Phone / Contact */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">
                      {lang === 'fa' ? 'شماره تماس یا همراه (جهت تماس و واتس‌اپ):' : 'Phone / WhatsApp Number:'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={lang === 'fa' ? '۰۹۱۲۳۴۵۶۷۸۹' : '+98 912 ...'}
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm text-foreground outline-none transition-all"
                      dir="ltr"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Role */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">
                      {lang === 'fa' ? 'تخصص یا جایگاه شغلی:' : 'Specialty / Position:'}
                    </label>
                    <input
                      type="text"
                      value={clientRole}
                      onChange={(e) => setClientRole(e.target.value)}
                      placeholder={lang === 'fa' ? 'مثال: متخصص ارتوپدی / مدیر درمانگاه' : 'e.g. Surgeon / Clinic Owner'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary text-xs sm:text-sm text-foreground outline-none transition-all"
                    />
                  </div>

                  {/* Project Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">
                      {lang === 'fa' ? 'نوع سامانه یا وب‌سایت مورد نیاز:' : 'Desired System Type:'}
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary text-xs sm:text-sm text-foreground outline-none transition-all cursor-pointer"
                    >
                      <option value="وب‌سایت اختصاصی پزشک + نوبت‌دهی هوشمند بیمارستانی">{lang === 'fa' ? 'وب‌سایت اختصاصی پزشک + نوبت‌دهی هوشمند بیمارستانی' : 'Doctor Website + Hospital Smart Booking'}</option>
                      <option value="اتوماسیون جامع کلینیک، نوبت‌دهی و پرونده الکترونیک">{lang === 'fa' ? 'اتوماسیون جامع کلینیک، نوبت‌دهی و پرونده الکترونیک' : 'Clinic Automation & E-Records'}</option>
                      <option value="پلتفرم تله‌مدیسین و ویزیت تصویری آنلاین">{lang === 'fa' ? 'پلتفرم تله‌مدیسین و ویزیت تصویری آنلاین' : 'Telemedicine & Video Consultation'}</option>
                      <option value="وب‌اپلیکیشن سازمانی و داشبورد مدیریتی">{lang === 'fa' ? 'وب‌اپلیکیشن سازمانی و داشبورد مدیریتی' : 'Enterprise Web App & Dashboard'}</option>
                      <option value="طراحی وب‌سایت شرکتی / فروشگاهی / استارتاپ">{lang === 'fa' ? 'طراحی وب‌سایت شرکتی / فروشگاهی / استارتاپ' : 'Corporate / Startup Website'}</option>
                      <option value="پروژه سفارشی دیگر">{lang === 'fa' ? 'پروژه سفارشی دیگر' : 'Custom Solution'}</option>
                    </select>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Timeline */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">
                      {lang === 'fa' ? 'زمان‌بندی و اولویت تحویل:' : 'Preferred Delivery Timeline:'}
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary text-xs sm:text-sm text-foreground outline-none transition-all cursor-pointer"
                    >
                      <option value="فوری جهت افتتاح مطب / کلینیک (کمتر از ۲ هفته)">{lang === 'fa' ? 'فوری جهت افتتاح مطب / کلینیک (کمتر از ۲ هفته)' : 'Urgent for Clinic Opening (< 2 weeks)'}</option>
                      <option value="استاندارد (۲ الی ۴ هفته)">{lang === 'fa' ? 'استاندارد (۲ الی ۴ هفته)' : 'Standard (2-4 weeks)'}</option>
                      <option value="پروژه جامع و مرحله‌ای (بیش از ۱ ماه)">{lang === 'fa' ? 'پروژه جامع و مرحله‌ای (بیش از ۱ ماه)' : 'Comprehensive Phase-by-Phase (> 1 month)'}</option>
                    </select>
                  </div>

                  {/* Email Optional */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">
                      {lang === 'fa' ? 'ایمیل شما (اختیاری جهت ارسال پروپوزال):' : 'Email (Optional for Proposal):'}
                    </label>
                    <input
                      type="email"
                      placeholder="doctor@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary text-xs sm:text-sm text-foreground outline-none transition-all"
                      dir="ltr"
                    />
                  </div>

                </div>

                {/* Selected Features Preview in Form */}
                {selectedModules.length > 0 && (
                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 space-y-1">
                    <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      <span>{lang === 'fa' ? 'قابلیت‌های انتخاب شده از بخش ماژول‌ها:' : 'Selected Features Included:'}</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedModules.map((m, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-card border border-primary/20 text-[10px] font-medium text-foreground">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {lang === 'fa' ? 'توضیحات کوتاه یا امکانات خاص مد نظر شما:' : 'Project Notes / Specific Needs:'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={lang === 'fa' ? 'هرگونه توضیح در خصوص تعداد پزشکان، نحوه اتصال به آزمایشگاه، اتصال به درگاه پرداخت یا موارد خاص...' : 'Describe any specific requirements...'}
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border focus:border-primary text-xs sm:text-sm text-foreground outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{lang === 'fa' ? 'ارسال مستقیم و امن به پیام‌رسان مهندس محمد حسین' : 'Direct and secure dispatch to Mohammad Hussein'}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>{lang === 'fa' ? 'ثبت و ارسال سفارش در واتس‌اپ' : 'Submit via WhatsApp'}</span>
                    </button>
                  </div>
                </div>

              </form>
            )}

          </div>
        </Reveal>
      </section>

      {/* 7. LEGAL NOTICE & COPYRIGHT PROOF */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="p-4 rounded-2xl bg-card border border-border/70 text-center text-xs text-muted-foreground space-y-1.5">
          <p className="font-semibold text-foreground/90">
            {lang === 'fa' 
              ? 'حقوق مالکیت معنوی، ساختار کدنویسی و معماری نرم‌افزار متعلق به مهندس محمد حسین می‌باشد.'
              : 'Software engineering, architecture and intellectual property rights reserved for Mohammad Hussein.'
            }
          </p>
          <p className="text-[11px]">
            {lang === 'fa'
              ? `شناسه اصالت سیستم: ${PLATFORM_SIGNATURE} • انتشار نسخه رسمی: ${PLATFORM_BUILD_DATE}`
              : `System Authenticity ID: ${PLATFORM_SIGNATURE} • Release: ${PLATFORM_BUILD_DATE}`
            }
          </p>
        </div>
      </section>

    </div>
  );
};
