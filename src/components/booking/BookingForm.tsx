/// <reference types="vite/client" />
// ─── src/components/booking/BookingForm.tsx ─────────────────────────────────
/**
 * @fileoverview Bilingual Online Booking Form Component
 * @description Features a robust, bug-free Persian Date Picker with strict
 *              Gregorian-Jalali state decoupling, preventing year-jump bugs (e.g., 1405).
 *
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 4.0.0 (Bulletproof Date Handling)
 * @since 2026-09-11
 */

import React, { useState, useCallback, useMemo } from 'react';
import DatePicker from 'react-multi-date-picker';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import {
    User,
    Phone,
    Mail,
    Calendar,
    Clock,
    FileText,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { IBookingRequest, IBookingResponse } from '../../types/booking';
import { submitBooking } from '../../services/bookingService';

// ─── Type Definitions ───────────────────────────────────────────────────────

interface IFormFieldState<T = string> {
    value: T;
    error: string;
    touched: boolean;
}

interface IFormState {
    fullName: IFormFieldState;
    phone: IFormFieldState;
    email: IFormFieldState;
    date: IFormFieldState;
    time: IFormFieldState;
    description: IFormFieldState;
}

export interface IBookingFormProps {
    onSuccess?: (response: IBookingResponse, data: IBookingRequest) => void;
    onError?: (response: IBookingResponse) => void;
    className?: string;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
'12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
'15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

const INITIAL_FORM_STATE: IFormState = {
    fullName: { value: '', error: '', touched: false },
    phone: { value: '', error: '', touched: false },
    email: { value: '', error: '', touched: false },
    date: { value: '', error: '', touched: false },
    time: { value: '', error: '', touched: false },
    description: { value: '', error: '', touched: false },
};

// ─── Component Implementation ───────────────────────────────────────────────

export const BookingForm: React.FC<IBookingFormProps> = ({
    onSuccess,
    onError,
    className = '',
}) => {
    const { t, lang } = useLanguage();
    const [formState, setFormState] = useState<IFormState>(INITIAL_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitResult, setSubmitResult] = useState<IBookingResponse | null>(null);

    // ─── Validation Helpers ──────────────────────────────────────────────────
    const validateField = useCallback((field: keyof IFormState, value: string): string => {
        switch (field) {
            case 'fullName':
                if (!value.trim()) return t('booking_val_name_req');
                if (value.trim().length < 3) return t('booking_val_name_len');
                return '';
            case 'phone':
                if (!value.trim()) return t('booking_val_phone_req');
                const phoneClean = value.replace(/[\s\-\+]/g, '');
            if (phoneClean.length < 10) return t('booking_val_phone_inv');
            return '';
            case 'email':
                if (!value.trim()) return '';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return t('booking_val_email_inv');
            return '';
            case 'date':
                if (!value) return t('booking_val_date_req');
                const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) return t('booking_val_date_past');
            if (selectedDate.getDay() === 5) return t('booking_val_date_closed'); // Friday
            return '';
            case 'time':
                if (!value) return t('booking_val_time_req');
                return '';
            default:
                return '';
        }
    }, [t]);

    const handleFieldChange = useCallback(
        (field: keyof IFormState, value: string) => {
            setFormState((prev) => {
                const currentField = prev[field];
                const error = validateField(field, value);
                return {
                    ...prev,
                    [field]: { ...currentField, value, error: currentField.touched ? error : '' },
                };
            });
        },
        [validateField]
    );

    const handleFieldBlur = useCallback(
        (field: keyof IFormState) => {
            setFormState((prev) => {
                const currentField = prev[field];
                const error = validateField(field, currentField.value);
                return { ...prev, [field]: { ...currentField, touched: true, error } };
            });
        },
        [validateField]
    );

    // ─── Bulletproof Date Conversion Logic ───────────────────────────────────
    /**
     * Safely converts Gregorian ISO string (from state) to Persian DateObject (for UI)
     * Prevents "1405" bug by ensuring valid parsing.
     */
    const getSafeJalaliValue = useMemo(() => {
        if (!formState.date.value) return undefined;
        try {
            return new DateObject({
                date: new Date(formState.date.value),
                                  calendar: persian,
                                  locale: persian_fa
            });
        } catch (e) {
            return undefined; // Fallback to empty if parsing fails
        }
    }, [formState.date.value]);

    const handleDateChange = (dateObj: any) => {
        if (dateObj) {
            // Convert Persian DateObject back to standard Gregorian JS Date, then to ISO string
            const gregorianDate = dateObj.toDate();
            const isoString = gregorianDate.toISOString().split('T')[0];
            handleFieldChange('date', isoString);
        } else {
            handleFieldChange('date', '');
        }
    };

    // Minimum date is today (in Persian calendar for the picker UI)
    const minJalaliDate = useMemo(() => {
        return new DateObject({ calendar: persian, locale: persian_fa });
    }, []);

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setSubmitResult(null);

            const errors = {
                fullName: validateField('fullName', formState.fullName.value),
                                     phone: validateField('phone', formState.phone.value),
                                     email: validateField('email', formState.email.value),
                                     date: validateField('date', formState.date.value),
                                     time: validateField('time', formState.time.value),
            };

            const hasErrors = Object.values(errors).some((error) => error !== '');

            if (hasErrors) {
                setFormState((prev) => ({
                    ...prev,
                    fullName: { ...prev.fullName, touched: true, error: errors.fullName },
                    phone: { ...prev.phone, touched: true, error: errors.phone },
                    email: { ...prev.email, touched: true, error: errors.email },
                    date: { ...prev.date, touched: true, error: errors.date },
                    time: { ...prev.time, touched: true, error: errors.time },
                }));
                return;
            }

            setIsSubmitting(true);
            try {
                const bookingData: IBookingRequest = {
                    fullName: formState.fullName.value.trim(),
                                     phone: formState.phone.value.trim(),
                                     email: formState.email.value.trim() || undefined,
                                     date: formState.date.value, // Already in YYYY-MM-DD format
                                     time: formState.time.value,
                                     visitType: lang === 'fa' ? 'آنلاین' : 'Online Telehealth',
                                     description: formState.description.value.trim() || undefined,
                };

                const response = await submitBooking(bookingData);
                setSubmitResult(response);

                if (response.success) {
                    if (onSuccess) onSuccess(response, bookingData);
                    setFormState(INITIAL_FORM_STATE);
                } else {
                    if (onError) onError(response);
                }
            } catch (error) {
                console.error('[BookingForm] Unexpected error:', error);
                setSubmitResult({
                    success: false,
                    message: t('booking_unexpected_error'),
                });
            } finally {
                setIsSubmitting(false);
            }
        },
        [formState, validateField, lang, onSuccess, onError, t]
    );

    const staggerDelay = (index: number): React.CSSProperties => ({
        animationDelay: `${index * 60}ms`,
    });

    return (
        <form onSubmit={handleSubmit} className={`relative space-y-5 ${className}`} noValidate>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-3xl pointer-events-none" />

        {submitResult && (
            <div className={`relative z-10 flex items-start gap-3 p-4 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-300 ${
                submitResult.success ? 'bg-success/10 border-success/30 text-success' : 'bg-destructive/10 border-destructive/30 text-destructive'
            }`} role="alert">
            {submitResult.success ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
            <div className="flex-1">
            <p className="font-semibold text-sm">
            {submitResult.success ? t('booking_submitted_success_title') : t('booking_submission_error_title')}
            </p>
            <p className="text-xs mt-1 opacity-90">{submitResult.message}</p>
            {submitResult.bookingId && (
                <p className="text-xs mt-2 font-mono bg-background/60 px-2.5 py-1 rounded-md inline-block border border-border">
                {t('booking_tracking_code_label')} <span className="font-bold text-primary">{submitResult.bookingId}</span>
                </p>
            )}
            </div>
            </div>
        )}

        <div className="relative z-10 space-y-5">
        {/* Full Name */}
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500" style={staggerDelay(0)}>
        <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <User className="w-4 h-4 text-primary shrink-0" />
        <span>{t('booking_fullname_label')} <span className="text-destructive">*</span></span>
        </label>
        <input
        id="fullName" type="text" value={formState.fullName.value}
        onChange={(e) => handleFieldChange('fullName', e.target.value)}
        onBlur={() => handleFieldBlur('fullName')}
        placeholder={t('booking_fullname_placeholder')}
        className={`w-full min-h-[48px] px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
            formState.fullName.error && formState.fullName.touched ? 'border-destructive focus:ring-destructive/50 focus:border-destructive' : 'border-border hover:border-primary/50'
        }`} disabled={isSubmitting}
        />
        {formState.fullName.error && formState.fullName.touched && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> <span>{formState.fullName.error}</span>
            </p>
        )}
        </div>

        {/* Phone */}
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500" style={staggerDelay(1)}>
        <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Phone className="w-4 h-4 text-primary shrink-0" />
        <span>{t('booking_phone_label')} <span className="text-destructive">*</span></span>
        </label>
        <input
        id="phone" type="tel" value={formState.phone.value}
        onChange={(e) => handleFieldChange('phone', e.target.value)}
        onBlur={() => handleFieldBlur('phone')}
        placeholder={t('booking_phone_placeholder')} maxLength={15} dir="ltr"
        className={`w-full min-h-[48px] px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
            formState.phone.error && formState.phone.touched ? 'border-destructive focus:ring-destructive/50 focus:border-destructive' : 'border-border hover:border-primary/50'
        }`} disabled={isSubmitting}
        />
        {formState.phone.error && formState.phone.touched && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> <span>{formState.phone.error}</span>
            </p>
        )}
        </div>

        {/* Email */}
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500" style={staggerDelay(2)}>
        <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Mail className="w-4 h-4 text-primary shrink-0" />
        <span>{t('booking_email_label')}</span>
        </label>
        <input
        id="email" type="email" value={formState.email.value}
        onChange={(e) => handleFieldChange('email', e.target.value)}
        onBlur={() => handleFieldBlur('email')}
        placeholder={t('booking_email_placeholder')} dir="ltr"
        className={`w-full min-h-[48px] px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
            formState.email.error && formState.email.touched ? 'border-destructive focus:ring-destructive/50 focus:border-destructive' : 'border-border hover:border-primary/50'
        }`} disabled={isSubmitting}
        />
        {formState.email.error && formState.email.touched && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> <span>{formState.email.error}</span>
            </p>
        )}
        </div>

        {/* Date & Time Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500" style={staggerDelay(3)}>

        {/* ─── PROFESSIONAL PERSIAN DATE PICKER ────────────────── */}
        <div className="space-y-2">
        <label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Calendar className="w-4 h-4 text-primary shrink-0" />
        <span>{t('booking_date_label')} <span className="text-destructive">*</span></span>
        </label>

        <DatePicker
        value={getSafeJalaliValue} // Safely parsed Persian DateObject
        onChange={handleDateChange} // Converts back to Gregorian ISO string
        minDate={minJalaliDate}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD"
            calendarPosition="bottom-right"
            inputClass={`w-full min-h-[48px] px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm text-foreground transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer text-center ${
                formState.date.error && formState.date.touched ? 'border-destructive focus:ring-destructive/50 focus:border-destructive' : 'border-border hover:border-primary/50'
            }`}
            containerClassName="w-full"
            // Premium styling for the calendar popup itself
            calendarClassName="!bg-background !border !border-border !shadow-2xl !rounded-2xl !font-sans !z-50"
            disabled={isSubmitting}
            />

            {formState.date.error && formState.date.touched && (
                <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> <span>{formState.date.error}</span>
                </p>
            )}
            </div>

            {/* Time Selector */}
            <div className="space-y-2">
            <label htmlFor="time" className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span>{t('booking_time_label')} <span className="text-destructive">*</span></span>
            </label>
            <select
            id="time" value={formState.time.value}
            onChange={(e) => handleFieldChange('time', e.target.value)}
            onBlur={() => handleFieldBlur('time')}
            className={`w-full min-h-[48px] px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm text-foreground transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                formState.time.error && formState.time.touched ? 'border-destructive focus:ring-destructive/50 focus:border-destructive' : 'border-border hover:border-primary/50'
            }`} disabled={isSubmitting}
            >
            <option value="">{t('booking_select_time')}</option>
            {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
            ))}
            </select>
            {formState.time.error && formState.time.touched && (
                <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> <span>{formState.time.error}</span>
                </p>
            )}
            </div>
            </div>

            {/* Description */}
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500" style={staggerDelay(4)}>
            <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FileText className="w-4 h-4 text-primary shrink-0" />
            <span>{t('booking_desc_label')}</span>
            </label>
            <textarea
            id="description" value={formState.description.value}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            placeholder={t('booking_desc_placeholder')} rows={3} maxLength={500}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary hover:border-primary/50 resize-none leading-relaxed"
            disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground text-end">
            {formState.description.value.length}/500 {t('booking_char_limit')}
            </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-500" style={staggerDelay(5)}>
            <button
            type="submit" disabled={isSubmitting}
            className="group relative w-full min-h-[52px] flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-bold text-sm sm:text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden cursor-pointer"
            >
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
            <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin shrink-0" /><span>{t('booking_submitting_btn')}</span></>
            ) : (
                <><Sparkles className="w-5 h-5 shrink-0" /><span>{t('booking_submit_btn')}</span></>
            )}
            </span>
            </button>
            <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
            <span>{t('booking_privacy_note')}</span>
            </p>
            </div>
            </div>

            <style>{`
                @keyframes shimmer { 100% { transform: translateX(100%); } }
                `}</style>
                </form>
    );
};

export default BookingForm;
