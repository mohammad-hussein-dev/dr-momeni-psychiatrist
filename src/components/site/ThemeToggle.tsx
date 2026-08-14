import React, { useState } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../../lib/ThemeProvider';
import { useLanguage } from '../../i18n/LanguageProvider';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '',
  size = 'md',
  showLabel = false
}) => {
  const { toggleTheme, isDark } = useTheme();
  const { lang } = useLanguage();
  const isFa = lang === 'fa';

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-8.5 h-8.5 text-xs',
    lg: 'w-10 h-10 text-sm'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4.5 h-4.5',
    lg: 'w-5 h-5'
  };

  const titleText = isDark 
    ? (isFa ? 'تغییر به حالت روز (روشن)' : 'Switch to Light Mode')
    : (isFa ? 'تغییر به حالت شب (تاریک)' : 'Switch to Dark Mode');

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={titleText}
      title={titleText}
      className={`relative group rounded-full border border-border/80 bg-card/90 hover:bg-accent/70 text-foreground transition-all duration-200 flex items-center justify-center shadow-2xs hover:shadow-xs cursor-pointer select-none active:scale-90 ${sizeClasses[size]} ${className}`}
    >
      {/* Ambient Micro Glow */}
      <div 
        className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none ${
          isDark 
            ? 'bg-sky-500/15 opacity-100'
            : 'bg-amber-500/15 opacity-100'
        }`}
      />

      {/* Smooth Icon Morphing & Rotation */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {/* SUN ICON (Light Mode) */}
        <div
          className={`absolute transition-all duration-300 ease-out transform ${
            !isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-0 pointer-events-none'
          }`}
        >
          <Sun className={`${iconSizes[size]} text-amber-500 hover:rotate-45 transition-transform duration-300`} />
        </div>

        {/* MOON & STARS ICON (Dark Mode) */}
        <div
          className={`absolute transition-all duration-300 ease-out transform ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0 pointer-events-none'
          }`}
        >
          <Moon className={`${iconSizes[size]} text-sky-400 dark:text-cyan-300 hover:-rotate-12 transition-transform duration-300`} />
        </div>
      </div>

      {showLabel && (
        <span className="ms-2 font-medium text-xs">
          {isDark ? (isFa ? 'حالت شب' : 'Dark') : (isFa ? 'حالت روز' : 'Light')}
        </span>
      )}
    </button>
  );
};
