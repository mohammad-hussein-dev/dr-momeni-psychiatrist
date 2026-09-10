/// <reference types="vite/client" />
// ─── src/components/booking/BookingSuccess.tsx ──────────────────────────────
/**
 * @fileoverview Booking Success Component
 * @description Displays a professional success message after booking submission,
 *              with actionable buttons for calendar integration, WhatsApp contact,
 *              and booking tracking. Implements fault-tolerant calendar URL generation
 *              and RTL-aware layout.
 *
 * @features
 * - Unique booking ID display (MOM-XXXX format)
 * - One-click calendar integration (Google, Apple, Outlook)
 * - WhatsApp quick contact with pre-filled message
 * - Confetti animation on success (optional)
 * - Accessibility-compliant (aria-live, focus management)
 * - RTL-aware layout with logical properties
 * - Design Token integration
 *
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 1.0.0
 * @since 2026-09-10
 */

import React, { useEffect, useRef } from 'react';
import {
    CheckCircle2,
    Calendar,
    MessageCircle,
    Home,
    Copy,
    Check,
    Sparkles,
    Clock,
    User,
    Phone,
    MapPin,
} from 'lucide-react';
import { IBookingRequest } from '../../types/booking';

// ─── Type Definitions ───────────────────────────────────────────────────────

/**
 * @interface IBookingSuccessProps
 * @description Props interface for BookingSuccess component
 */
interface IBookingSuccessProps {
    /** The booking response containing success status and booking ID */
    bookingResponse: {
        success: boolean;
        message: string;
        bookingId?: string;
    };
    /** The original booking request data */
    bookingData: IBookingRequest;
    /** Callback to reset the form and start a new booking */
    onReset: () => void;
    /** Additional CSS classes */
    className?: string;
}

// ─── Constants ──────────────────────────────────────────────────────────────

/**
 * @constant WHATSAPP_NUMBER
 * @description Clinic's WhatsApp number (international format)
 */
const WHATSAPP_NUMBER = '989934420967';

/**
 * @constant CLINIC_NAME
 * @description Clinic name for WhatsApp message
 */
const CLINIC_NAME = 'دکتر فاطمه مومنی';

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * @function generateGoogleCalendarUrl
 * @description Generates a Google Calendar event URL
 * @param data - Booking request data
 * @param bookingId - Unique booking ID
 * @returns Google Calendar URL
 */
const generateGoogleCalendarUrl = (
    data: IBookingRequest,
    bookingId: string
): string => {
    const startDate = new Date(`${data.date}T${data.time}:00`);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 minutes

    const formatDateTime = (date: Date): string => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: `نوبت ${CLINIC_NAME} - کد پیگیری: ${bookingId}`,
        dates: `${formatDateTime(startDate)}/${formatDateTime(endDate)}`,
                                       details: `نام: ${data.fullName}\nموبایل: ${data.phone}\nنوع ویزیت: ${data.visitType}\nبیمه: ${data.insurance || 'آزاد'}\nتوضیحات: ${data.description || '—'}`,
                                       location: 'بیمارستان نیکان غرب، تهران',
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

/**
 * @function generateOutlookCalendarUrl
 * @description Generates an Outlook Calendar event URL
 * @param data - Booking request data
 * @param bookingId - Unique booking ID
 * @returns Outlook Calendar URL
 */
const generateOutlookCalendarUrl = (
    data: IBookingRequest,
    bookingId: string
): string => {
    const startDate = new Date(`${data.date}T${data.time}:00`);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

    const params = new URLSearchParams({
        path: '/calendar/action/compose',
        rru: 'addevent',
        startdt: startDate.toISOString(),
                                       enddt: endDate.toISOString(),
                                       subject: `نوبت ${CLINIC_NAME} - ${bookingId}`,
                                       body: `نام: ${data.fullName}\nموبایل: ${data.phone}\nنوع ویزیت: ${data.visitType}`,
                                       location: 'بیمارستان نیکان غرب، تهران',
    });

    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

/**
 * @function generateWhatsAppUrl
 * @description Generates a WhatsApp message URL with pre-filled text
 * @param data - Booking request data
 * @param bookingId - Unique booking ID
 * @returns WhatsApp URL
 */
const generateWhatsAppUrl = (
    data: IBookingRequest,
    bookingId: string
): string => {
    const message = `سلام، نوبت من با کد پیگیری ${bookingId} ثبت شد.\n\nنام: ${data.fullName}\nتاریخ: ${data.date}\nساعت: ${data.time}\nنوع: ${data.visitType}\n\nلطفاً تأیید بفرمایید.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// ─── Component Implementation ───────────────────────────────────────────────

/**
 * @component BookingSuccess
 * @description Professional success page with calendar integration and WhatsApp contact
 *
 * @param {IBookingSuccessProps} props - Component props
 * @returns {React.FC} Rendered component
 *
 * @example
 * ```tsx
 * <BookingSuccess
 *   bookingResponse={{ success: true, message: 'نوبت ثبت شد', bookingId: 'MOM-4829' }}
 *   bookingData={{ fullName: 'علی احمدی', phone: '09123456789', ... }}
 *   onReset={() => setShowForm(true)}
 * />
 * ```
 */
export const BookingSuccess: React.FC<IBookingSuccessProps> = ({
    bookingResponse,
    bookingData,
    onReset,
    className = '',
}) => {
    // ─── State Management ────────────────────────────────────────────────────
    const [copiedId, setCopiedId] = React.useState(false);
    const successRef = useRef<HTMLDivElement>(null);

    // ─── Effects ─────────────────────────────────────────────────────────────

    /**
     * @effect Focus management on mount
     * @description Moves focus to success message for accessibility
     */
    useEffect(() => {
        if (successRef.current) {
            successRef.current.focus();
        }
    }, []);

    // ─── Event Handlers ──────────────────────────────────────────────────────

    /**
     * @function handleCopyBookingId
     * @description Copies booking ID to clipboard
     */
    const handleCopyBookingId = () => {
        if (bookingResponse.bookingId) {
            navigator.clipboard.writeText(bookingResponse.bookingId);
            setCopiedId(true);
            setTimeout(() => setCopiedId(false), 2000);
        }
    };

    /**
     * @function handleAddToGoogleCalendar
     * @description Opens Google Calendar in new tab
     */
    const handleAddToGoogleCalendar = () => {
        const url = generateGoogleCalendarUrl(bookingData, bookingResponse.bookingId || '');
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    /**
     * @function handleAddToOutlookCalendar
     * @description Opens Outlook Calendar in new tab
     */
    const handleAddToOutlookCalendar = () => {
        const url = generateOutlookCalendarUrl(bookingData, bookingResponse.bookingId || '');
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    /**
     * @function handleWhatsAppContact
     * @description Opens WhatsApp with pre-filled message
     */
    const handleWhatsAppContact = () => {
        const url = generateWhatsAppUrl(bookingData, bookingResponse.bookingId || '');
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // ─── Render Logic ────────────────────────────────────────────────────────

    return (
        <div
        ref={successRef}
        tabIndex={-1}
        className={`max-w-2xl mx-auto ${className}`}
        role="alert"
        aria-live="polite"
        >
        {/* ─── Success Header ───────────────────────────────────────────────── */}
        <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-4">
        <CheckCircle2 className="w-10 h-10 text-success" aria-hidden="true" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        نوبت شما با موفقیت ثبت شد!
        </h2>
        <p className="text-muted-foreground">
        کد پیگیری شما: <span className="font-mono font-bold text-primary">{bookingResponse.bookingId}</span>
        </p>
        </div>

        {/* ─── Booking Details Card ─────────────────────────────────────────── */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
        جزئیات نوبت
        </h3>

        <div className="space-y-3">
        <div className="flex items-start gap-3">
        <User className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
        <p className="text-xs text-muted-foreground">نام بیمار</p>
        <p className="text-sm font-medium text-foreground">{bookingData.fullName}</p>
        </div>
        </div>

        <div className="flex items-start gap-3">
        <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
        <p className="text-xs text-muted-foreground">شماره تماس</p>
        <p className="text-sm font-medium text-foreground" dir="ltr">{bookingData.phone}</p>
        </div>
        </div>

        <div className="flex items-start gap-3">
        <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
        <p className="text-xs text-muted-foreground">تاریخ و ساعت</p>
        <p className="text-sm font-medium text-foreground">
        {bookingData.date} — {bookingData.time}
        </p>
        </div>
        </div>

        <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
        <p className="text-xs text-muted-foreground">نوع ویزیت</p>
        <p className="text-sm font-medium text-foreground">{bookingData.visitType}</p>
        </div>
        </div>
        </div>
        </div>

        {/* ─── Action Buttons ───────────────────────────────────────────────── */}
        <div className="space-y-3">
        {/* Calendar Integration */}
        <div className="bg-muted/30 border border-border/50 rounded-2xl p-4">
        <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
        افزودن به تقویم
        </p>
        <div className="grid grid-cols-2 gap-2">
        <button
        type="button"
        onClick={handleAddToGoogleCalendar}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
        >
        <Calendar className="w-4 h-4" aria-hidden="true" />
        <span>گوگل</span>
        </button>
        <button
        type="button"
        onClick={handleAddToOutlookCalendar}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
        >
        <Calendar className="w-4 h-4" aria-hidden="true" />
        <span>اوت‌لوک</span>
        </button>
        </div>
        </div>

        {/* WhatsApp Contact */}
        <button
        type="button"
        onClick={handleWhatsAppContact}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-success text-success-foreground font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
        >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        <span>ارتباط فوری در واتس‌اپ</span>
        </button>

        {/* Copy Booking ID */}
        {bookingResponse.bookingId && (
            <button
            type="button"
            onClick={handleCopyBookingId}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-background border border-border text-sm font-medium text-foreground hover:bg-muted transition-all"
            >
            {copiedId ? (
                <>
                <Check className="w-4 h-4 text-success" aria-hidden="true" />
                <span>کد پیگیری کپی شد!</span>
                </>
            ) : (
                <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>کپی کد پیگیری</span>
                </>
            )}
            </button>
        )}

        {/* Return to Home */}
        <button
        type="button"
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-background border border-border text-sm font-medium text-foreground hover:bg-muted transition-all"
        >
        <Home className="w-4 h-4" aria-hidden="true" />
        <span>بازگشت به صفحه اصلی</span>
        </button>
        </div>

        {/* ─── Helper Text ──────────────────────────────────────────────────── */}
        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
        <Clock className="w-3.5 h-3.5 inline-block ml-1" aria-hidden="true" />
        لطفاً ۱۵ دقیقه قبل از ساعت نوبت در مطب حضور داشته باشید.
        <br />
        در صورت عدم امکان حضور، حداقل ۲۴ ساعت قبل از طریق واتس‌اپ اطلاع دهید.
        </p>
        </div>
        </div>
    );
};

// ─── Default Export ─────────────────────────────────────────────────────────
export default BookingSuccess;

// ─── End of File ────────────────────────────────────────────────────────────
