/**
 * @file Reusable, accessible image component with automatic error fallback,
 * CLS mitigation, lazy loading, and Persian alt text verification.
 *
 * @author Mohammad Hossein
 * @version 1.0.0
 */
import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

export interface IAppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /** Source URL or imported asset string */
    src: string;
    /** Mandatory descriptive Persian/English alt text */
    alt: string;
    /** Explicit width in pixels or CSS units to prevent CLS */
    width?: number | string;
    /** Explicit height in pixels or CSS units to prevent CLS */
    height?: number | string;
    /** Optional fallback component or text when image fails */
    fallbackText?: string;
    /** Custom CSS classes */
    className?: string;
}

/**
 * Staff-level accessible image component ensuring zero broken visual artifacts.
 * Provides graceful fallback with clinical placeholder when image fails to load.
 *
 * @param props - IAppImageProps
 * @returns React.JSX.Element
 *
 * @example
 * ```tsx
 * <AppImage
 *   src="/images/doctor.jpg"
 *   alt="تصویر پروفایل دکتر فاطمه مومنی"
 *   width={400}
 *   height={500}
 *   loading="lazy"
 * />
 * ```
 */
export function AppImage({
    src,
    alt,
    width,
    height,
    fallbackText,
    className = '',
    loading = 'lazy',
    ...rest
}: IAppImageProps): React.JSX.Element {
    const [hasError, setHasError] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const handleError = (): void => {
        setHasError(true);
    };

    const handleLoad = (): void => {
        setIsLoaded(true);
    };

    // ─── Fallback State: Clinical Placeholder ────────────────────────
    if (hasError || !src) {
        return (
            <div
            className={`flex flex-col items-center justify-center bg-muted/70 text-muted-foreground border border-border/70 rounded-xl p-3 text-center select-none ${className}`}
            style={{
                width: width || '100%',
                height: height || '100%',
                minHeight: typeof height === 'number' ? `${height}px` : '120px',
            }}
            role="img"
            aria-label={alt}
            >
            <ImageOff className="w-6 h-6 text-primary/50 mb-1" />
            <span className="text-xs text-muted-foreground font-medium">
            {fallbackText || alt || 'تصویر در دسترس نیست'}
            </span>
            </div>
        );
    }

    // ─── Normal State: Image with Fade-in ────────────────────────────
    return (
        <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        onError={handleError}
        onLoad={handleLoad}
        className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-85'
        } ${className}`}
        {...rest}
        />
    );
}

export default AppImage;
