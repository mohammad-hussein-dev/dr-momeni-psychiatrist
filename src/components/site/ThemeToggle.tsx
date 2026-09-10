/**
 * @file Theme toggle button component for switching between light and dark modes.
 * Provides smooth icon transitions and accessible UI for theme switching.
 *
 * @author Mohammad Hossein
 * @version 1.0.0
 */
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../lib/ThemeProvider';
import { useLanguage } from '../../i18n/LanguageProvider';

/**
 * Props interface for ThemeToggle component.
 */
export interface IThemeToggleProps {
  /** Optional custom CSS classes */
  className?: string;
  /** Button size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show text label next to icon */
  showLabel?: boolean;
}

/**
 * Accessible theme toggle button with smooth icon transitions.
 * Switches between light and dark modes with visual feedback.
 *
 * @param props - IThemeToggleProps
 * @returns React.JSX.Element
 *
 * @example
 * ```tsx
 * <ThemeToggle size="md" showLabel={false} />
 * ```
 */
export const ThemeToggle: React.FC<IThemeToggleProps> = ({
  className = '',
  size = 'md',
  showLabel = false,
}): React.JSX.Element => {
  const { toggleTheme, isDark } = useTheme();
  const { lang } = useLanguage();
  const isFa = lang === 'fa';

  // ─── Size Mappings ─────────────────────────────────────────────
  const sizeClasses = {
    sm: 'min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:w-8 sm:h-8 text-xs',
    md: 'min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:w-9 sm:h-9 text-xs',
    lg: 'min-h-[48px] min-w-[48px] sm:w-10 sm:h-10 text-sm',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4.5 h-4.5',
    lg: 'w-5 h-5',
  };

  // ─── Accessibility Labels ──────────────────────────────────────
  const titleText = isDark
  ? (isFa ? 'تغییر به حالت روز (روشن)' : 'Switch to Light Mode')
  : (isFa ? 'تغییر به حالت شب (تاریک)' : 'Switch to Dark Mode');

  const labelText = isDark
  ? (isFa ? 'حالت شب' : 'Dark')
  : (isFa ? 'حالت روز' : 'Light');

  // ─── Event Handler ─────────────────────────────────────────────
  const handleToggle = (): void => {
    toggleTheme();
  };

  return (
    <button
    type="button"
    onClick={handleToggle}
    aria-label={titleText}
    title={titleText}
    className={`relative group rounded-full border border-border/80 bg-card/90 hover:bg-accent/70 text-foreground transition-all duration-300 ease-in-out flex items-center justify-center shadow-2xs hover:shadow-xs cursor-pointer select-none active:scale-95 active:bg-muted ${sizeClasses[size]} ${className}`}
    >
    {/* ─── Ambient Micro Glow ──────────────────────────────────── */}
    <div
    className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none ${
      isDark ? 'bg-sky-500/15 opacity-100' : 'bg-amber-500/15 opacity-100'
    }`}
    />

    {/* ─── Smooth Icon Morphing & Rotation ─────────────────────── */}
    <div className="relative z-10 flex items-center justify-center w-full h-full">
    {/* SUN ICON (Light Mode) */}
    <div
    className={`absolute transition-all duration-300 ease-out transform ${
      !isDark
      ? 'opacity-100 rotate-0 scale-100'
      : 'opacity-0 rotate-90 scale-0 pointer-events-none'
    }`}
    >
    <Sun
    className={`${iconSizes[size]} text-amber-500 hover:rotate-45 transition-transform duration-300`}
    aria-hidden="true"
    />
    </div>

    {/* MOON ICON (Dark Mode) */}
    <div
    className={`absolute transition-all duration-300 ease-out transform ${
      isDark
      ? 'opacity-100 rotate-0 scale-100'
      : 'opacity-0 -rotate-90 scale-0 pointer-events-none'
    }`}
    >
    <Moon
    className={`${iconSizes[size]} text-sky-400 hover:-rotate-12 transition-transform duration-300`}
    aria-hidden="true"
    />
    </div>
    </div>

    {/* ─── Optional Label ──────────────────────────────────────── */}
    {showLabel && (
      <span className="ms-2 font-medium text-xs">
      {labelText}
      </span>
    )}
    </button>
  );
};

export default ThemeToggle;
