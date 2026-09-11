/// <reference types="vite/client" />
// ─── src/components/ui/AppImage.tsx ─────────────────────────────────────────
/**
 * @fileoverview Resilient Image Component with Error Handling & CLS Prevention
 * @description A production-grade image wrapper that prevents broken images,
 *              handles loading states gracefully, maintains layout stability,
 *              and implements a robust multi-stage fallback mechanism.
 *
 * @features
 * - Multi-stage fallback: Primary -> Explicit Fallback -> Smart Contextual Fallback -> UI Placeholder
 * - Cumulative Layout Shift (CLS) prevention via explicit width/height
 * - Accessibility-compliant (ARIA attributes, semantic fallback UI)
 * - Performance optimized (async decoding, lazy loading by default)
 *
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 3.2.0 (Final Production Build)
 * @since 2026-09-10
 */

import React, { useState, useCallback, useEffect } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

// ─── Type Definitions ────────────────────────────────────────────────────────

export interface IAppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /** Primary image source URL (required) */
    src: string;
    /** Alternative text for accessibility (required) */
    alt: string;
    /** Optional secondary fallback source URL (e.g., from assetRegistry) */
    fallbackSrc?: string;
    /** Fallback text displayed when all image sources fail */
    fallbackText?: string;
    /** Additional Tailwind CSS classes */
    className?: string;
    /** Loading strategy: 'lazy' for below-fold, 'eager' for above-fold */
    loading?: 'lazy' | 'eager';
    /** Explicit width to prevent CLS */
    width?: number | string;
    /** Explicit height to prevent CLS */
    height?: number | string;
}

// ─── Smart Contextual Fallbacks ──────────────────────────────────────────────

/**
 * @function getSmartFallback
 * @description Intelligently guesses a safe fallback image based on the original src path.
 * @param src - The original image source path
 * @returns A safe fallback path or null if no match is found
 */
function getSmartFallback(src: string): string | null {
    if (!src) return null;
    const lower = src.toLowerCase();

    if (lower.includes('doctor') || lower.includes('momeni') || lower.includes('portrait')) {
        return '/doctor.jpg';
    }
    if (lower.includes('consulting') || lower.includes('clinic') || lower.includes('hospital')) {
        return '/consulting-room.jpg';
    }
    if (lower.includes('developer') || lower.includes('hussein')) {
        return '/developer.jpg';
    }
    if (lower.includes('cover') || lower.includes('blog') || lower.includes('article')) {
        return '/covers/general-psychiatry.svg';
    }

    return null;
}

// ─── Component Implementation ────────────────────────────────────────────────

export const AppImage: React.FC<IAppImageProps> = ({
    src,
    alt,
    fallbackSrc,
    fallbackText = 'تصویر در دسترس نیست',
    className = '',
    loading = 'lazy',
    width,
    height,
    onError,
    onLoad,
    ...restProps
}) => {
    // Current active source that is rendering
    const [currentSrc, setCurrentSrc] = useState<string>(src);
    // Attempts tracker: 0 = primary, 1 = fallbackSrc, 2 = smartFallback, 3 = failed
    const [fallbackStage, setFallbackStage] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Reset state whenever the incoming `src` prop changes (crucial for dynamic lists)
    useEffect(() => {
        setCurrentSrc(src);
        setFallbackStage(0);
        setIsLoading(true);
    }, [src]);

    const handleImageError = useCallback(
        (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
            console.warn(`[AppImage] ⚠️ Error loading: ${currentSrc} (stage ${fallbackStage})`);

            if (fallbackStage === 0 && fallbackSrc && fallbackSrc !== currentSrc) {
                // Stage 1: Try the explicitly provided fallbackSrc
                setFallbackStage(1);
                setCurrentSrc(fallbackSrc);
                setIsLoading(true);
            } else if (fallbackStage <= 1) {
                // Stage 2: Try smart contextual fallback
                const smart = getSmartFallback(src);
                if (smart && smart !== currentSrc) {
                    setFallbackStage(2);
                    setCurrentSrc(smart);
                    setIsLoading(true);
                } else {
                    // Stage 3: Final failure, all options exhausted
                    setFallbackStage(3);
                    setIsLoading(false);
                    if (onError) onError(event);
                }
            } else {
                // Final failure safeguard
                setFallbackStage(3);
                setIsLoading(false);
                if (onError) onError(event);
            }
        },
        [currentSrc, fallbackStage, fallbackSrc, src, onError]
    );

    const handleImageLoad = useCallback(
        (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
            setIsLoading(false);
            if (onLoad) onLoad(event);
        },
        [onLoad]
    );

    // ─── Render Logic: Graceful Clinical Placeholder ────────────────────────
    if (fallbackStage === 3) {
        return (
            <div
            className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-muted/40 to-primary/10 border border-primary/20 rounded-2xl p-4 text-center select-none overflow-hidden ${className}`}
            style={{ width, height, minHeight: height || 120 }}
            role="img"
            aria-label={alt || fallbackText}
            data-testid="app-image-fallback"
            >
            <div className="w-10 h-10 rounded-xl bg-card/80 border border-border/80 shadow-sm flex items-center justify-center text-primary mb-2">
            <Sparkles className="w-5 h-5 text-primary/70" aria-hidden="true" />
            </div>
            <span className="text-xs font-medium text-foreground/80 line-clamp-2 px-2 max-w-xs">
            {alt || fallbackText}
            </span>
            </div>
        );
    }

    // ─── Render Logic: Actual Image ─────────────────────────────────────────
    return (
        <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        decoding="async"
        referrerPolicy="no-referrer"
        data-testid="app-image"
        {...restProps}
        />
    );
};

export default AppImage;

// ─── End of File ─────────────────────────────────────────────────────────────
