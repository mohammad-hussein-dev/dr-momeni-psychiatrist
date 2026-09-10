// ─── src/components/ui/DemoBadge.tsx ───────────────────────────────────────
/**
 * @fileoverview Demo Badge Component for Mock Data Transparency
 * @description Renders a subtle, non-intrusive badge indicating that displayed
 *              content (such as testimonials, sample bookings, or mock chats)
 *              is demonstrative/sample data.
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 1.0.0
 * @since 2026-09-10
 */

import React from 'react';
import { Sparkles } from 'lucide-react';

export interface IDemoBadgeProps {
    /** Optional custom text (defaults to 'نمونه' or 'داده آزمایشی') */
    text?: string;
    /** Size variant */
    size?: 'sm' | 'md';
    /** Custom CSS classes */
    className?: string;
}

/**
 * @component DemoBadge
 * @description A discreet, professional pill badge to flag mock/sample data
 *              maintaining medical transparency standards.
 */
export const DemoBadge: React.FC<IDemoBadgeProps> = ({
    text = 'نمونه',
    size = 'sm',
    className = '',
}) => {
    const sizeClasses = size === 'sm'
        ? 'text-[10px] px-2 py-0.5 gap-1'
        : 'text-xs px-2.5 py-1 gap-1.5';

    return (
        <span
            className={`inline-flex items-center rounded-full font-medium bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/25 select-none tracking-tight ${sizeClasses} ${className}`}
            title="این محتوا صرفاً جنبه نمونه و پیش‌نمایش رابط کاربری دارد"
        >
            <Sparkles className="w-2.5 h-2.5 opacity-75 shrink-0" aria-hidden="true" />
            <span>{text}</span>
        </span>
    );
};

export default DemoBadge;
