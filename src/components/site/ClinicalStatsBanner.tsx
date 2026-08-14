import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Users, 
  MapPin, 
  Award,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageProvider';

interface ClinicalStatsBannerProps {
  className?: string;
  variant?: 'card' | 'compact' | 'transparent';
}

export const ClinicalStatsBanner: React.FC<ClinicalStatsBannerProps> = ({ 
  className = '',
  variant = 'card'
}) => {
  const { lang, isRTL } = useLanguage();
  const isFa = lang === 'fa';
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const stats = [
    {
      id: 'satisfaction',
      num_fa: '۹۸٪',
      num_en: '98%',
      label_fa: 'رضایت از کیفیت درمان',
      label_en: 'Treatment Satisfaction',
      sub_fa: 'بر اساس سنجش بالینی مراجعین',
      sub_en: 'Verified Clinical Outcomes',
      icon: Sparkles,
      gradient: 'from-teal-500/15 via-emerald-500/10 to-transparent',
      borderColor: 'hover:border-teal-500/50',
      iconBg: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 group-hover:bg-teal-600 group-hover:text-white',
      glowColor: 'rgba(20, 184, 166, 0.25)',
      badge_fa: 'بالاترین استاندارد',
      badge_en: 'High Standard',
      progressPercent: '98%'
    },
    {
      id: 'sessions',
      num_fa: '+۱,۴۰۰',
      num_en: '+1,400',
      label_fa: 'جلسه درمانی و مشاوره',
      label_en: 'Consultation Sessions',
      sub_fa: 'حضوری و آنلاین سراسری',
      sub_en: 'In-Person & Nationwide Online',
      icon: Users,
      gradient: 'from-sky-500/15 via-blue-500/10 to-transparent',
      borderColor: 'hover:border-sky-500/50',
      iconBg: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 group-hover:bg-sky-600 group-hover:text-white',
      glowColor: 'rgba(14, 165, 233, 0.25)',
      badge_fa: 'تجربه بالینی غنی',
      badge_en: 'Clinical Experience',
      progressPercent: '95%'
    },
    {
      id: 'cities',
      num_fa: '۳ شهر',
      num_en: '3 Cities',
      label_fa: 'رشت • شیراز • تهران',
      label_en: 'Rasht • Shiraz • Tehran',
      sub_fa: 'سوابق دانشگاهی و کلینیکی',
      sub_en: 'Academic & Hospital Centers',
      icon: MapPin,
      gradient: 'from-amber-500/15 via-orange-500/10 to-transparent',
      borderColor: 'hover:border-amber-500/50',
      iconBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white',
      glowColor: 'rgba(245, 158, 11, 0.25)',
      badge_fa: 'کلان‌شهرهای پزشکی',
      badge_en: 'Medical Hubs',
      progressPercent: '100%'
    },
    {
      id: 'privacy',
      num_fa: '۱۰۰٪',
      num_en: '100%',
      label_fa: 'تضمین رازداری پزشکی',
      label_en: 'Confidentiality Assured',
      sub_fa: 'پایبندی به کدهای اخلاق زیستی',
      sub_en: 'Strict Medical Privacy Code',
      icon: ShieldCheck,
      gradient: 'from-emerald-500/15 via-teal-500/10 to-transparent',
      borderColor: 'hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      badge_fa: 'تعهد قطعی اخلاقی',
      badge_en: 'Absolute Privacy',
      progressPercent: '100%'
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={stat.id}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`group relative rounded-2xl sm:rounded-3xl bg-card/95 border border-border/80 ${stat.borderColor} p-4 sm:p-5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg dark:hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.5)] cursor-default overflow-hidden flex flex-col justify-between`}
            >
              {/* Dynamic ambient hover glow layer */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none`} 
              />
              
              {/* Soft radial corner aura */}
              <div 
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-400 pointer-events-none"
                style={{ backgroundColor: stat.glowColor }}
              />

              {/* Top Row: Animated Icon + Tag */}
              <div className="relative z-10 flex items-center justify-between gap-2 mb-2 sm:mb-3">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl ${stat.iconBg} border border-border/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-2xs shrink-0`}>
                  <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-300" />
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-muted/70 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-border/40 whitespace-nowrap">
                    {isFa ? stat.badge_fa : stat.badge_en}
                  </span>
                </div>
              </div>

              {/* Central Number & Metric Label */}
              <div className="relative z-10">
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl sm:text-3xl lg:text-[2rem] font-heading font-extrabold text-foreground group-hover:text-primary transition-colors duration-200 tracking-tight">
                    {isFa ? stat.num_fa : stat.num_en}
                  </p>
                </div>

                <p className="text-xs sm:text-sm font-bold text-foreground/95 mt-1 leading-snug">
                  {isFa ? stat.label_fa : stat.label_en}
                </p>

                <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-normal opacity-85 group-hover:opacity-100 transition-opacity">
                  {isFa ? stat.sub_fa : stat.sub_en}
                </p>
              </div>

              {/* Bottom Subtle Animated Progress Line */}
              <div className="relative z-10 mt-3.5 pt-2.5 border-t border-border/40">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] font-sans">{isFa ? 'شاخص استاندارد بالینی' : 'Clinical Benchmark'}</span>
                  <span>{stat.progressPercent}</span>
                </div>
                <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-primary/40 group-hover:bg-primary transition-all duration-500 rounded-full"
                    style={{
                      width: isHovered ? stat.progressPercent : '25%'
                    }}
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
