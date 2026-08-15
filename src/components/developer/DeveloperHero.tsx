import React, { useState } from 'react';
import { 
  Globe, 
  Send, 
  Github, 
  Linkedin, 
  Gitlab, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Code2, 
  Sparkles, 
  Smartphone, 
  Bot, 
  ShieldCheck, 
  Zap, 
  FileCode2, 
  Check, 
  Copy,
  Terminal,
  Activity
} from 'lucide-react';
import { Reveal } from '../Reveal';
import { DEVELOPER_IMG, DEVELOPER_FALLBACK } from '../../lib/siteConstants';

interface DeveloperHeroProps {
  isFa: boolean;
}

export const DeveloperHero: React.FC<DeveloperHeroProps> = ({ isFa }) => {
  const [avatarError, setAvatarError] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const socialLinks = [
    {
      id: 'portfolio',
      name: isFa ? 'وبسایت شخصی' : 'Portfolio',
      url: 'https://mohammad-hussein-dev.github.io/mohammad-hussein-dev/',
      icon: Globe,
      style: 'bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border-primary/30',
      badge: 'Portfolio'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      url: 'https://t.me/mohammad_hussein_dev',
      icon: Send,
      style: 'bg-sky-500/10 hover:bg-sky-600 text-sky-600 dark:text-sky-400 hover:text-white border-sky-500/30',
      badge: '@mohammad_hussein_dev'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mohammad-hussein-dev',
      icon: Linkedin,
      style: 'bg-blue-600/10 hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white border-blue-600/30',
      badge: 'Network'
    },
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/mohammad-hussein-dev',
      icon: Github,
      style: 'bg-zinc-800/10 dark:bg-zinc-700/30 hover:bg-zinc-900 text-foreground hover:text-white border-border',
      badge: 'Code Base'
    },
    {
      id: 'gitlab',
      name: 'GitLab',
      url: 'https://gitlab.com/mohammad-hussein-dev',
      icon: Gitlab,
      style: 'bg-orange-500/10 hover:bg-orange-600 text-orange-600 dark:text-orange-400 hover:text-white border-orange-500/30',
      badge: 'GitLab CI'
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      url: 'https://x.com/mohammad_hussein_dev',
      icon: Twitter,
      style: 'bg-neutral-500/10 hover:bg-black text-foreground hover:text-white border-border',
      badge: '@mohammad_hussein_dev'
    },
    {
      id: 'email',
      name: 'Email',
      url: 'mailto:king.mohamd.09876@gmail.com',
      icon: Mail,
      style: 'bg-emerald-500/10 hover:bg-emerald-600 text-emerald-600 dark:text-emerald-400 hover:text-white border-emerald-500/30',
      badge: 'Direct'
    }
  ];

  return (
    <div className="relative rounded-3xl p-6 sm:p-10 bg-card/80 dark:bg-card/40 backdrop-blur-xl border border-border/80 shadow-2xl tech-cyber-glow overflow-hidden">
      {/* High-Tech Background Ambient Lights & Grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-1/4 w-72 h-72 rounded-full bg-sky-500/15 blur-3xl pointer-events-none -z-10" />

      {/* Top Telemetry Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-border/60 text-xs font-mono">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold tracking-wide">SYSTEM HEALTH: 100% OPTIMAL</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-muted-foreground text-[11px]">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-primary" />
            <span>P99 LATENCY: &lt;28ms</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-sky-500" />
            <span>CLEAN ARCHITECTURE: ENFORCED</span>
          </span>
          <span>•</span>
          <span className="text-foreground font-bold">.NET 8 &amp; REACT 19</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Avatar Column with Senior Radiant Orbital Conic Ring (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col items-center text-center">
          <Reveal>
            <div className="relative group">
              {/* Animated Multi-Layer Conic Glowing Halo */}
              <div className="developer-avatar-halo w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center p-1.5 shadow-2xl animate-laser-glow">
                
                {/* Avatar Image Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-card border-2 border-background z-10">
                  {!avatarError ? (
                    <img
                      src={DEVELOPER_IMG}
                      alt="Mohammad Hussein - Senior Full-Stack Software Engineer"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        if (e.currentTarget.src !== DEVELOPER_FALLBACK) {
                          e.currentTarget.src = DEVELOPER_FALLBACK;
                        } else {
                          setAvatarError(true);
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex flex-col items-center justify-center text-primary">
                      <Code2 className="w-12 h-12 stroke-[1.5]" />
                      <span className="text-xs font-bold mt-1 font-mono">M. Hussein</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Verified Senior Engineer Badge */}
              <div className="absolute -bottom-2 inset-x-0 mx-auto w-fit px-3.5 py-1.5 rounded-full bg-card/95 border border-primary/40 shadow-xl text-[11px] font-bold text-primary flex items-center gap-1.5 z-20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isFa ? 'مهندس ارشد نرم‌افزار' : 'Senior Software Engineer'}</span>
              </div>
            </div>
          </Reveal>

          {/* Social & Professional Links with All 7 Platforms */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-sm">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-2xs ${link.style}`}
                  title={`${link.name} - Mohammad Hussein`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-mono">{link.name}</span>
                  {link.id === 'portfolio' && <ExternalLink className="w-2.5 h-2.5 opacity-70" />}
                </a>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-muted-foreground font-mono" dir="ltr">
            <span className="px-2 py-0.5 rounded bg-muted/60">@mohammad_hussein_dev</span>
            <span>•</span>
            <button
              onClick={() => handleCopy('king.mohamd.09876@gmail.com', 'email')}
              className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors cursor-pointer"
              title="Copy Email Address"
            >
              <span>king.mohamd.09876@gmail.com</span>
              {copiedLink === 'email' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-60" />}
            </button>
          </div>
        </div>

        {/* Bio & Value Proposition Column (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4 text-start">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isFa ? 'طراح و سازنده اختصاصی این پلتفرم' : 'Creator & Lead Architect of this Platform'}</span>
            </div>

            <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
              {isFa ? 'محمدحسین | مهندس نرم‌افزار و معمار وب‌پزشکی' : 'Mohammad Hussein | Software Engineer & Medical Web Architect'}
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3 text-justify">
              {isFa ? (
                <>
                  طراح و برنامه‌نویس اختصاصی وب‌سایت و سامانه مدیریت بالینی <strong>دکتر فاطمه مومنی</strong>.
                  متخصص در توسعه سیستم‌های مقیاس‌پذیر بک‌اند با .NET و سامانه‌های مدرن وب بر پایه React و TypeScript با معماری تمیز (Clean Architecture)،
                  رابط کاربری فوق‌العاده واکنش‌گرا (بهینه‌سازی ویژه برای بیش از ۹۰٪ مراجعین موبایلی) و یکپارچه‌سازی دستیارهای هوش مصنوعی تریاژ بالینی.
                </>
              ) : (
                <>
                  Lead Software Engineer and Architect of <strong>Dr. Fatemeh Momeni's</strong> clinical psychiatry web platform.
                  Specializing in high-performance full-stack web applications, scalable .NET backend architecture, clinical booking workflows, mobile-first responsive design, and enterprise-grade privacy and security standards.
                </>
              )}
            </p>
          </Reveal>

          {/* Core Strengths Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-3.5 rounded-2xl bg-card border border-border/70 text-center shadow-2xs hover:border-primary/40 transition-colors">
              <Smartphone className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-xs font-bold text-foreground">{isFa ? '۹۰٪+ بهینه موبایل' : 'Mobile-First'}</p>
              <p className="text-[10px] text-muted-foreground">{isFa ? 'سرعت و لمس روان' : 'Ultra Fast UI'}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-card border border-border/70 text-center shadow-2xs hover:border-primary/40 transition-colors">
              <Bot className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-xs font-bold text-foreground">{isFa ? 'هوش مصنوعی' : 'AI-Powered'}</p>
              <p className="text-[10px] text-muted-foreground">{isFa ? 'تریاژ و راهنما' : 'Smart Triage'}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-card border border-border/70 text-center shadow-2xs hover:border-primary/40 transition-colors">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-foreground">{isFa ? 'امنیت و رازداری' : 'HIPAA Ready'}</p>
              <p className="text-[10px] text-muted-foreground">{isFa ? 'کدگذاری بالینی' : 'Strict Privacy'}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-card border border-border/70 text-center shadow-2xs hover:border-primary/40 transition-colors">
              <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-foreground">{isFa ? 'سرعت زیر ۱ ثانیه' : 'Sub-Second'}</p>
              <p className="text-[10px] text-muted-foreground">{isFa ? 'بدون معطلی کاربر' : 'Instant Loading'}</p>
            </div>
          </div>

          {/* Direct Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <a
              href="#inquiry-form"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:opacity-95 transition-all shadow-md transform hover:-translate-y-0.5"
            >
              <FileCode2 className="w-4 h-4" />
              <span>{isFa ? 'ثبت سفارش ساخت سامانه مشابه' : 'Request Custom System Project'}</span>
            </a>

            <a
              href="https://t.me/mohammad_hussein_dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-sky-500/40 text-sky-600 dark:text-sky-400 hover:bg-sky-500/10 font-semibold text-xs sm:text-sm transition-all transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              <span>{isFa ? 'مشاوره فنی در تلگرام (@mohammad_hussein_dev)' : 'Telegram Consultation'}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
