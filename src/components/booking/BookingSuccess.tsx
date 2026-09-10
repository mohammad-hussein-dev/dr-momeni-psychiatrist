/// <reference types="vite/client" />
// ─── src/components/booking/BookingSuccess.tsx ─────────────────────────────
/**
 * @fileoverview Bilingual Booking Success Component
 * @description Renders confirmed appointment details, Google/Outlook calendar links,
 *              WhatsApp direct confirmation, and tracking code copying with
 *              seamless Persian and English support.
 *
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 2.2.0
 */

import React, { useRef, useEffect, useState } from 'react';
import {
    CheckCircle2,
    Calendar,
    Phone,
    MapPin,
    User,
    Copy,
    Check,
    MessageCircle,
    Home,
    Clock,
    Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { IBookingRequest, IBookingResponse } from '../../types/booking';
import {
    HOSPITAL_NAME_FA,
    HOSPITAL_NAME_EN,
} from '../../lib/siteConstants';

export interface IBookingSuccessProps {
    bookingResponse: IBookingResponse;
    bookingData: IBookingRequest;
    onReset?: () => void;
    className?: string;
}

const WHATSAPP_NUMBER = '989934420967';

// ─── Calendar URL Generators ────────────────────────────────────────────────

const generateGoogleCalendarUrl = (
    data: IBookingRequest,
    bookingId: string,
    isEn: boolean
): string => {
    const startDate = new Date(`${data.date}T${data.time}:00`);
    const endDate = new Date(startDate.getTime() + 45 * 60 * 1000); // 45 min psychiatric session

    const formatDateTime = (date: Date): string => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const title = isEn
        ? `Psychiatric Consultation - Dr. Momeni (ID: ${bookingId})`
        : `نوبت مشاوره روانپزشکی - دکتر فاطمه مومنی (کد: ${bookingId})`;

    const details = isEn
        ? `Patient: ${data.fullName}\nPhone: ${data.phone}\nMode: ${data.visitType}\nNotes: ${data.description || 'N/A'}`
        : `نام بیمار: ${data.fullName}\nتلفن: ${data.phone}\nنوع ویزیت: ${data.visitType}\nتوضیحات: ${data.description || '—'}`;

    const location = isEn ? 'Nikan Gharb Hospital / Online Telehealth' : 'بیمارستان نیکان غرب / ویزیت آنلاین';

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        dates: `${formatDateTime(startDate)}/${formatDateTime(endDate)}`,
        details,
        location,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const generateOutlookCalendarUrl = (
    data: IBookingRequest,
    bookingId: string,
    isEn: boolean
): string => {
    const startDate = new Date(`${data.date}T${data.time}:00`);
    const endDate = new Date(startDate.getTime() + 45 * 60 * 1000);

    const title = isEn
        ? `Psychiatric Consultation - Dr. Momeni (${bookingId})`
        : `نوبت مشاوره روانپزشکی دکتر مومنی (${bookingId})`;

    const params = new URLSearchParams({
        path: '/calendar/action/compose',
        rru: 'addevent',
        startdt: startDate.toISOString(),
        enddt: endDate.toISOString(),
        subject: title,
        body: `Patient: ${data.fullName}\nPhone: ${data.phone}\nType: ${data.visitType}`,
        location: isEn ? 'Nikan Gharb Hospital / Telehealth' : 'بیمارستان نیکان غرب / آنلاین',
    });

    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

const generateWhatsAppUrl = (
    data: IBookingRequest,
    bookingId: string,
    isEn: boolean
): string => {
    const message = isEn
        ? `Hello, my appointment request (Tracking ID: ${bookingId}) has been registered.\nName: ${data.fullName}\nDate: ${data.date}\nTime: ${data.time}\nMode: ${data.visitType}\nPlease confirm.`
        : `سلام، نوبت من با کد پیگیری ${bookingId} ثبت شد.\nنام: ${data.fullName}\nتاریخ: ${data.date}\nساعت: ${data.time}\nنوع: ${data.visitType}\nلطفاً تأیید بفرمایید.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// ─── Component Implementation ───────────────────────────────────────────────

export const BookingSuccess: React.FC<IBookingSuccessProps> = ({
    bookingResponse,
    bookingData,
    onReset,
    className = '',
}) => {
    const { t, lang } = useLanguage();
    const isEn = lang === 'en';
    const [copiedId, setCopiedId] = useState(false);
    const successRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (successRef.current) {
            successRef.current.focus();
        }
    }, []);

    const handleCopyBookingId = () => {
        if (bookingResponse.bookingId) {
            navigator.clipboard.writeText(bookingResponse.bookingId);
            setCopiedId(true);
            setTimeout(() => setCopiedId(false), 2500);
        }
    };

    const handleAddToGoogleCalendar = () => {
        const url = generateGoogleCalendarUrl(bookingData, bookingResponse.bookingId || '', isEn);
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleAddToOutlookCalendar = () => {
        const url = generateOutlookCalendarUrl(bookingData, bookingResponse.bookingId || '', isEn);
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleWhatsAppContact = () => {
        const url = generateWhatsAppUrl(bookingData, bookingResponse.bookingId || '', isEn);
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            ref={successRef}
            tabIndex={-1}
            className={`max-w-2xl mx-auto focus:outline-none ${className}`}
            role="alert"
            aria-live="polite"
        >
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-4 shadow-sm">
                    <CheckCircle2 className="w-10 h-10 text-success" aria-hidden="true" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                    {t('booking_success_heading')}
                </h2>
                <p className="text-muted-foreground">
                    {t('booking_tracking_code_label')}{' '}
                    <span className="font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
                        {bookingResponse.bookingId}
                    </span>
                </p>
            </div>

            {/* Booking Details Card */}
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 mb-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2 pb-3 border-b border-border/60">
                    <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
                    <span>{t('booking_details_title')}</span>
                </h3>

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <div className="flex-1">
                            <p className="text-xs text-muted-foreground">{t('booking_patient_name')}</p>
                            <p className="text-sm font-semibold text-foreground">{bookingData.fullName}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <div className="flex-1">
                            <p className="text-xs text-muted-foreground">{t('booking_contact_phone')}</p>
                            <p className="text-sm font-semibold text-foreground font-mono" dir="ltr">
                                {bookingData.phone}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <div className="flex-1">
                            <p className="text-xs text-muted-foreground">{t('booking_datetime')}</p>
                            <p className="text-sm font-semibold text-foreground">
                                {bookingData.date} — {bookingData.time}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <div className="flex-1">
                            <p className="text-xs text-muted-foreground">{t('booking_type_label')}</p>
                            <p className="text-sm font-semibold text-foreground">{bookingData.visitType}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                {/* Calendar Integration */}
                <div className="bg-muted/30 border border-border/50 rounded-2xl p-4">
                    <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
                        <span>{t('booking_add_to_calendar')}</span>
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={handleAddToGoogleCalendar}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                        >
                            <Calendar className="w-4 h-4" aria-hidden="true" />
                            <span>{t('booking_cal_google')}</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleAddToOutlookCalendar}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                        >
                            <Calendar className="w-4 h-4" aria-hidden="true" />
                            <span>{t('booking_cal_outlook')}</span>
                        </button>
                    </div>
                </div>

                {/* WhatsApp Contact */}
                <button
                    type="button"
                    onClick={handleWhatsAppContact}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-success text-success-foreground font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
                >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    <span>{t('booking_instant_whatsapp')}</span>
                </button>

                {/* Copy Booking ID */}
                {bookingResponse.bookingId && (
                    <button
                        type="button"
                        onClick={handleCopyBookingId}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-background border border-border text-sm font-medium text-foreground hover:bg-muted transition-all duration-300"
                    >
                        {copiedId ? (
                            <>
                                <Check className="w-4 h-4 text-success" aria-hidden="true" />
                                <span className="text-success font-semibold">{t('booking_id_copied')}</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 text-primary" aria-hidden="true" />
                                <span>{t('booking_copy_id')}</span>
                            </>
                        )}
                    </button>
                )}

                {/* Return to Booking Form / Home */}
                {onReset && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-background border border-border text-sm font-medium text-foreground hover:bg-muted transition-all duration-300"
                    >
                        <Home className="w-4 h-4" aria-hidden="true" />
                        <span>{t('booking_back_to_form')}</span>
                    </button>
                )}
            </div>

            {/* Helper Advice Note */}
            <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                <p className="text-xs text-muted-foreground text-center leading-relaxed flex items-center justify-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                    <span>{t('booking_success_tip')}</span>
                </p>
            </div>
        </div>
    );
};

export default BookingSuccess;
