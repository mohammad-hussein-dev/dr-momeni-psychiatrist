import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:opacity-95 shadow-xs active:scale-[0.98]',
  secondary: 'bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 border border-secondary/30',
  outline: 'bg-card text-primary border border-primary/30 hover:bg-accent/40 shadow-2xs',
  ghost: 'bg-transparent text-foreground hover:bg-muted/70',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-xs',
  accent: 'bg-accent text-accent-foreground hover:bg-accent/80'
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'text-[11px] px-2.5 py-1 rounded-lg gap-1',
  sm: 'text-xs px-3.5 py-1.5 rounded-xl gap-1.5',
  md: 'text-xs sm:text-sm px-4 py-2.5 rounded-full gap-2 font-semibold',
  lg: 'text-sm sm:text-base px-6 py-3 rounded-full gap-2.5 font-bold'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center transition-all cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed',
            variantStyles[variant],
            sizeStyles[size],
            className
          )
        )}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
