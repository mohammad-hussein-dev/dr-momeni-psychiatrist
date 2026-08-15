import React, { HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, hoverEffect = false, children, ...props }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl sm:rounded-3xl bg-card border border-border/80 text-card-foreground shadow-2xs overflow-hidden',
          hoverEffect && 'transition-all duration-300 hover:border-primary/40 hover:shadow-md',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={twMerge('p-5 sm:p-6 border-b border-border/50', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => (
  <h3 className={twMerge('font-heading font-bold text-foreground text-base sm:text-lg', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => (
  <p className={twMerge('text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed', className)} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={twMerge('p-5 sm:p-6', className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={twMerge('p-5 sm:p-6 pt-0 border-t border-border/50', className)} {...props}>
    {children}
  </div>
);
