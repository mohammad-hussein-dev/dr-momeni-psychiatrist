import React, { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftElement, rightElement, id, ...props }, ref) => {
    const inputId = id || (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

    return (
      <div className="w-full space-y-1.5 text-start">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-foreground">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && <div className="absolute left-3 text-muted-foreground pointer-events-none">{leftElement}</div>}
          <input
            ref={ref}
            id={inputId}
            className={twMerge(
              clsx(
                'w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 disabled:opacity-50 disabled:bg-muted/40',
                leftElement && 'pl-9',
                rightElement && 'pr-9',
                error && 'border-rose-500/80 focus:ring-rose-500/30 focus:border-rose-500',
                className
              )
            )}
            {...props}
          />
          {rightElement && <div className="absolute right-3 text-muted-foreground pointer-events-none">{rightElement}</div>}
        </div>
        {error && <p className="text-[11px] font-medium text-rose-500">{error}</p>}
        {!error && helperText && <p className="text-[11px] text-muted-foreground">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
