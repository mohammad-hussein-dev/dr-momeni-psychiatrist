import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ThumbsUp, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Smile,
  Plus
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

export type ReactionType = 'hope' | 'helpful' | 'inspiring' | 'reassuring' | 'bravo';

interface ReactionConfig {
  id: ReactionType;
  icon: React.FC<{ className?: string }>;
  label_fa: string;
  label_en: string;
  colorClass: string;
  activeBg: string;
  activeBorder: string;
  activeText: string;
  glowColor: string;
}

export const REACTION_CONFIGS: Record<ReactionType, ReactionConfig> = {
  hope: {
    id: 'hope',
    icon: Heart,
    label_fa: 'امید و همدلی',
    label_en: 'Hope & Empathy',
    colorClass: 'text-rose-500',
    activeBg: 'bg-rose-50 dark:bg-rose-950/40',
    activeBorder: 'border-rose-300 dark:border-rose-700/50',
    activeText: 'text-rose-600 dark:text-rose-400',
    glowColor: 'rgba(244, 63, 94, 0.25)'
  },
  helpful: {
    id: 'helpful',
    icon: ThumbsUp,
    label_fa: 'مفید و کاربردی',
    label_en: 'Helpful Insight',
    colorClass: 'text-emerald-500',
    activeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    activeBorder: 'border-emerald-300 dark:border-emerald-700/50',
    activeText: 'text-emerald-600 dark:text-emerald-400',
    glowColor: 'rgba(16, 185, 129, 0.25)'
  },
  inspiring: {
    id: 'inspiring',
    icon: Sparkles,
    label_fa: 'الهام‌بخش درمان',
    label_en: 'Inspiring Journey',
    colorClass: 'text-amber-500',
    activeBg: 'bg-amber-50 dark:bg-amber-950/40',
    activeBorder: 'border-amber-300 dark:border-amber-700/50',
    activeText: 'text-amber-600 dark:text-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.25)'
  },
  reassuring: {
    id: 'reassuring',
    icon: ShieldCheck,
    label_fa: 'اطمینان‌بخش و آرامش',
    label_en: 'Reassuring & Safe',
    colorClass: 'text-cyan-500',
    activeBg: 'bg-cyan-50 dark:bg-cyan-950/40',
    activeBorder: 'border-cyan-300 dark:border-cyan-700/50',
    activeText: 'text-cyan-600 dark:text-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.25)'
  },
  bravo: {
    id: 'bravo',
    icon: Award,
    label_fa: 'تحسین اراده مراجع',
    label_en: 'Bravo & Strength',
    colorClass: 'text-violet-500',
    activeBg: 'bg-violet-50 dark:bg-violet-950/40',
    activeBorder: 'border-violet-300 dark:border-violet-700/50',
    activeText: 'text-violet-600 dark:text-violet-400',
    glowColor: 'rgba(139, 92, 246, 0.25)'
  }
};

interface PatientReactionBarProps {
  testimonialId: string;
  initialLikes?: number;
  className?: string;
  compact?: boolean;
}

export const PatientReactionBar: React.FC<PatientReactionBarProps> = ({
  testimonialId,
  initialLikes = 14,
  className = '',
  compact = false
}) => {
  const { lang } = useLanguage();
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  
  // Seed distinct reactions breakdown based on card ID
  const [counts, setCounts] = useState<{ [key in ReactionType]: number }>(() => {
    const seed = testimonialId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      helpful: Math.max(3, (seed % 9) + 4),
      hope: Math.max(2, ((seed * 3) % 8) + 2),
      inspiring: Math.max(1, ((seed * 7) % 6) + 1),
      reassuring: Math.max(1, ((seed * 5) % 5) + 1),
      bravo: Math.max(1, ((seed * 2) % 4) + 1)
    };
  });

  const totalReactions = (Object.values(counts) as number[]).reduce((a: number, b: number) => a + b, 0);

  const handleSelectReaction = (type: ReactionType) => {
    if (userReaction === type) {
      // Toggle off
      setUserReaction(null);
      setCounts(prev => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
    } else {
      // If switching or selecting
      setCounts(prev => {
        const next = { ...prev };
        if (userReaction) {
          next[userReaction] = Math.max(0, next[userReaction] - 1);
        }
        next[type] = next[type] + 1;
        return next;
      });
      setUserReaction(type);
    }
    setShowPicker(false);
  };

  // Click outside listener for picker
  useEffect(() => {
    if (!showPicker) return;
    const handleOutsideClick = () => setShowPicker(false);
    const timer = setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    }, 10);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [showPicker]);

  const activeReactionConfig = userReaction ? REACTION_CONFIGS[userReaction] : null;

  return (
    <div className={`relative flex items-center justify-between gap-2 select-none ${className}`}>
      
      {/* 1. POPUP REACTION PICKER (Floating Bar like modern messaging / LinkedIn) */}
      {showPicker && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute -top-14 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-40 bg-card/95 backdrop-blur-xl border border-border/80 rounded-full px-2 py-1.5 shadow-xl flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-200"
          style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
        >
          {(Object.keys(REACTION_CONFIGS) as ReactionType[]).map((key) => {
            const config = REACTION_CONFIGS[key];
            const Icon = config.icon;
            const isSelected = userReaction === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectReaction(key)}
                className={`group relative p-2 rounded-full transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? `${config.activeBg} ${config.activeBorder} scale-115 ring-2 ring-primary/40` 
                    : 'hover:bg-muted/70 hover:scale-125'
                }`}
                title={lang === 'fa' ? config.label_fa : config.label_en}
              >
                <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${config.colorClass} transition-transform group-hover:rotate-6`} />
                
                {/* Floating tooltip on hover */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-charcoal text-white text-[10px] font-medium px-2 py-0.5 rounded-md whitespace-nowrap shadow-md pointer-events-none z-50">
                  {lang === 'fa' ? config.label_fa : config.label_en}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 2. MAIN INTERACTIVE TRIGGER BUTTON */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (userReaction) {
              handleSelectReaction(userReaction);
            } else {
              setShowPicker(!showPicker);
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowPicker(true);
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${
            activeReactionConfig
              ? `${activeReactionConfig.activeBg} ${activeReactionConfig.activeBorder} ${activeReactionConfig.activeText} shadow-2xs scale-102`
              : 'bg-card border-border/70 text-foreground/80 hover:text-primary hover:border-primary/40 hover:bg-muted/40 shadow-2xs'
          }`}
          title={lang === 'fa' ? 'انتخاب واکنش / حس شما به این تجربه' : 'React to this testimonial'}
        >
          {activeReactionConfig ? (
            <>
              <activeReactionConfig.icon className={`w-3.5 h-3.5 ${activeReactionConfig.colorClass} animate-bounce`} />
              <span>{lang === 'fa' ? activeReactionConfig.label_fa.split(' ')[0] : activeReactionConfig.label_en.split(' ')[0]}</span>
            </>
          ) : (
            <>
              <Heart className="w-3.5 h-3.5 text-rose-500/80 group-hover:scale-110 transition-transform" />
              <span>{lang === 'fa' ? 'ابراز حس' : 'React'}</span>
            </>
          )}

          <span className="text-[11px] font-bold opacity-85 px-1 bg-background/60 rounded-full">
            {totalReactions}
          </span>
        </button>

        {/* Plus / Expand Icon to easily reveal more reactions */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowPicker(!showPicker);
          }}
          className={`p-1.5 rounded-full border border-border/60 bg-card hover:bg-muted text-muted-foreground hover:text-primary transition-all cursor-pointer ${
            showPicker ? 'bg-primary/10 border-primary text-primary' : ''
          }`}
          title={lang === 'fa' ? 'همه واکنش‌ها' : 'All reactions'}
        >
          <Plus className={`w-3 h-3 transition-transform ${showPicker ? 'rotate-45' : ''}`} />
        </button>
      </div>

      {/* 3. VISUAL SUMMARY PILLS (Showing active reaction distribution) */}
      {!compact && (
        <div className="flex items-center gap-1">
          {counts.hope > 0 && (
            <span 
              onClick={() => handleSelectReaction('hope')}
              className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium border cursor-pointer transition-all hover:scale-105 ${
                userReaction === 'hope' 
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 border-rose-300' 
                  : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-rose-50/50 hover:text-rose-600'
              }`}
              title={lang === 'fa' ? `${counts.hope} نفر حس امید گرفتند` : `${counts.hope} felt hopeful`}
            >
              <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500/30" />
              <span>{counts.hope}</span>
            </span>
          )}

          {counts.helpful > 0 && (
            <span 
              onClick={() => handleSelectReaction('helpful')}
              className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium border cursor-pointer transition-all hover:scale-105 ${
                userReaction === 'helpful' 
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-300' 
                  : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-emerald-50/50 hover:text-emerald-600'
              }`}
              title={lang === 'fa' ? `${counts.helpful} نفر این نظر را مفید دانستند` : `${counts.helpful} found helpful`}
            >
              <ThumbsUp className="w-2.5 h-2.5 text-emerald-500" />
              <span>{counts.helpful}</span>
            </span>
          )}

          {counts.inspiring > 0 && (
            <span 
              onClick={() => handleSelectReaction('inspiring')}
              className={`hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium border cursor-pointer transition-all hover:scale-105 ${
                userReaction === 'inspiring' 
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 border-amber-300' 
                  : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-amber-50/50 hover:text-amber-600'
              }`}
              title={lang === 'fa' ? `${counts.inspiring} نفر الهام‌بخش دانستند` : `${counts.inspiring} felt inspired`}
            >
              <Sparkles className="w-2.5 h-2.5 text-amber-500" />
              <span>{counts.inspiring}</span>
            </span>
          )}
        </div>
      )}

    </div>
  );
};
