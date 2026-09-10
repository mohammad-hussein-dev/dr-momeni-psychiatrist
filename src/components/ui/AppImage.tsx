// ─── src/components/ui/AppImage.tsx ─────────────────────────────────────────
/**
 * @fileoverview Resilient Image Component with Error Handling & CLS Prevention
 * @description A production-grade image wrapper that prevents broken images,
 *              handles loading states gracefully, and maintains layout stability.
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 2.0.0
 * @since 2026-09-10
 */

import React, { useState, useCallback } from 'react';
import { ImageOff } from 'lucide-react';

// ─── Type Definitions ────────────────────────────────────────────────────────

/**
 * @interface IAppImageProps
 * @description Extended props interface for the AppImage component
 * @extends React.ImgHTMLAttributes<HTMLImageElement>
 */
export interface IAppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /** Image source URL (required) */
    src: string;
    /** Alternative text for accessibility (required, Persian recommended) */
    alt: string;
    /** Fallback text when image fails to load (default: "تصویر بارگذاری نشد") */
    fallbackText?: string;
    /** Additional CSS classes */
    className?: string;
    /** Loading strategy: 'lazy' for below-fold, 'eager' for above-fold */
    loading?: 'lazy' | 'eager';
    /** Explicit width to prevent CLS (Cumulative Layout Shift) */
    width?: number | string;
    /** Explicit height to prevent CLS */
    height?: number | string;
}

// ─── Component Implementation ────────────────────────────────────────────────

/**
 * @component AppImage
 * @description A resilient image component with error handling, lazy loading,
 *              and graceful fallback. Prevents broken image icons and maintains
 *              layout stability through explicit dimensions.
 *
 * @features
 * - Automatic error handling with fallback UI
 * - Lazy loading support for performance optimization
 * - CLS prevention through explicit width/height
 * - Accessibility-compliant with proper alt text
 * - RTL-aware styling
 *
 * @param {IAppImageProps} props - Component props
 * @returns {React.FC} Rendered component
 *
 * @example
 * ```tsx
 * <AppImage
 *   src="/images/doctor.jpg"
 *   alt="تصویر پروفایل دکتر فاطمه مومنی"
 *   width={400}
 *   height={400}
 *   loading="lazy"
 *   fallbackText="تصویر در دسترس نیست"
 * />
 * ```
 */
export const AppImage: React.FC<IAppImageProps> = ({
    src,
    alt,
    fallbackText = 'تصویر بارگذاری نشد',
    className = '',
    loading = 'lazy',
    width,
    height,
    onError,
    ...restProps
}) => {
    // ─── State Management ────────────────────────────────────────────────────
    const [hasError, setHasError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // ─── Event Handlers ──────────────────────────────────────────────────────

    /**
     * @function handleImageError
     * @description Handles image load failure gracefully
     * @param {React.SyntheticEvent<HTMLImageElement>} event - Error event
     */
    const handleImageError = useCallback(
        (event: React.SyntheticEvent<HTMLImageElement>) => {
            console.warn(`[AppImage] Failed to load image: ${src}`);
            setHasError(true);
            setIsLoading(false);

            // Call custom onError if provided
            if (onError) {
                onError(event);
            }
        },
        [src, onError]
    );

    /**
     * @function handleImageLoad
     * @description Handles successful image load
     */
    const handleImageLoad = useCallback(() => {
        setIsLoading(false);
    }, []);

    // ─── Render Logic ────────────────────────────────────────────────────────

    // Fallback UI when image fails to load
    if (hasError) {
        return (
            <div
            className={`flex flex-col items-center justify-center bg-muted/30 border border-border/50 rounded-lg text-muted-foreground transition-all ${className}`}
            style={{ width, height }}
            role="img"
            aria-label={fallbackText}
            >
            <ImageOff className="w-8 h-8 mb-2 opacity-50" aria-hidden="true" />
            <span className="text-xs font-medium text-center px-2">
            {fallbackText}
            </span>
            </div>
        );
    }

    // Main image rendering
    return (
        <img
        src={src}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        decoding="async"
        {...restProps}
        />
    );
};

// ─── Default Export ──────────────────────────────────────────────────────────
export default AppImage;

// ─── End of File ─────────────────────────────────────────────────────────────
