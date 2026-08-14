import React from 'react';
import { Reveal } from '../Reveal';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  intro?: string;
  align?: 'center' | 'start';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  intro,
  align = 'center',
  className = ''
}) => {
  const isCenter = align === 'center';

  return (
    <Reveal className={`${isCenter ? 'text-center mx-auto' : 'text-start'} max-w-2xl ${className}`}>
      {kicker && (
        <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-primary mb-2.5 bg-accent/60 px-3 py-1 rounded-full border border-primary/15">
          {kicker}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground leading-snug">
        {title}
      </h2>
      {intro && (
        <p className="mt-3 text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
          {intro}
        </p>
      )}
    </Reveal>
  );
};
