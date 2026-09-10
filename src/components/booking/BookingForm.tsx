/// <reference types="vite/client" />
// ─── src/components/booking/BookingForm.tsx ─────────────────────────────────
/**
 * @fileoverview Premium Online Booking Form Component
 * @description A streamlined, high-conversion booking form specifically for
 *              online consultations. Features staggered entrance animations,
 *              micro-interactions, and removed redundant fields (visit type, insurance).
 *
 * @features
 * - Streamlined fields (Name, Phone, Email, Date, Time, Description)
 * - Hardcoded 'آنلاین' visit type for this specific flow
 * - Staggered fade-in animations for form groups
 * - Premium focus states with soft glow effects
 * - Real-time validation with Persian error messages
 * - Accessibility-compliant (aria-label, aria-invalid)
 *
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 3.0.0 (Premium UI Update)
 * @since 2026-09-10
 */

import React, { useState, useCallback, useMemo } from 'react';
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

interface IBookingFormProps {
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

// ─── Validation Functions ───────────────────────────────────────────────────

const validateFullName = (value: string): string => {
    if (!value.trim()) return 'نام و نام خانوادگی الزامی است';
    if (value.trim().length < 3) return 'نام باید حداقل ۳ کاراکتر باشد';
    return '';
};

const validatePhone = (value: string): string => {
    if (!value.trim()) return 'شماره موبایل الزامی است';
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(value)) return 'شماره موبایل باید با 09 شروع شده و ۱۱ رقم باشد';
    return '';
};

const validateEmail = (value: string): string => {
    if (!value.trim()) return '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'فرمت ایمیل نامعتبر است';
    return '';
};

const validateDate = (value: string): string => {
    if (!value) return 'تاریخ نوبت الزامی است';
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) return 'تاریخ نمی‌تواند در گذشته باشد';
    if (selectedDate.getDay() === 5) return 'جمعه‌ها مطب تعطیل است';
    return '';
};

const validateTime = (value: string): string => {
    if (!value) return 'ساعت نوبت الزامی است';
    return '';
};

// ─── Component Implementation ───────────────────────────────────────────────

export const BookingForm: React.FC<IBookingFormProps> = ({
    onSuccess,
    onError,
    className = '',
}) => {
    const [formState, setFormState] = useState<IFormState>(INITIAL_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitResult, setSubmitResult] = useState<IBookingResponse | null>(null);

    const handleFieldChange = useCallback(
        (field: keyof IFormState, value: string) => {
            setFormState((prev) => {
                const currentField = prev[field];
                let error = '';
            switch (field) {
                case 'fullName': error = validateFullName(value); break;
                case 'phone': error = validatePhone(value); break;
                case 'email': error = validateEmail(value); break;
                case 'date': error = validateDate(value); break;
                case 'time': error = validateTime(value); break;
            }
            return {
                ...prev,
                [field]: { ...currentField, value, error: currentField.touched ? error : '' },
            };
            });
        },
        []
    );

    const handleFieldBlur = useCallback((field: keyof IFormState) => {
        setFormState((prev) => {
            const currentField = prev[field];
            let error = '';
        switch (field) {
            case 'fullName': error = validateFullName(currentField.value); break;
            case 'phone': error = validatePhone(currentField.value); break;
            case 'email': error = validateEmail(currentField.value); break;
            case 'date': error = validateDate(currentField.value); break;
            case 'time': error = validateTime(currentField.value); break;
        }
        return { ...prev, [field]: { ...currentField, touched: true, error } };
        });
    }, []);

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setSubmitResult(null);

            const errors = {
                fullName: validateFullName(formState.fullName.value),
                                     phone: validatePhone(formState.phone.value),
                                     email: validateEmail(formState.email.value),
                                     date: validateDate(formState.date.value),
                                     time: validateTime(formState.time.value),
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
                                     date: formState.date.value,
                                     time: formState.time.value,
                                     visitType: 'آنلاین', // Hardcoded for this specific form
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
                setSubmitResult({ success: false, message: 'خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید.' });
            } finally {
                setIsSubmitting(false);
            }
        },
        [formState, onSuccess, onError]
    );

    const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

    // ─── Animation Helper ─────────────────────────────────────────────────────
    const staggerDelay = (index: number) => `animation-delay: ${index * 75}ms`;

    return (
        <form onSubmit={handleSubmit} className={`relative space-y-5 ${className}`} noValidate>
        {/* Premium Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-3xl pointer-events-none" />

        {/* Success/Error Message */}
        {submitResult && (
            <div
            className={`relative z-10 flex items-start gap-3 p-4 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-300 ${
                submitResult.success
                ? 'bg-success/10 border-success/30 text-success'
                : 'bg-destructive/10 border-destructive/30 text-destructive'
            }`}
            role="alert"
            >
            {submitResult.success ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            ) : (
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
            <p className="font-semibold text-sm">
            {submitResult.success ? 'درخواست با موفقیت ثبت شد!' : 'خطا در ثبت درخواست'}
            </p>
            <p className="text-xs mt-1 opacity-90">{submitResult.message}</p>
            {submitResult.bookingId && (
                <p className="text-xs mt-2 font-mono bg-background/50 px-2 py-1 rounded inline-block">
                کد پیگیری: {submitResult.bookingId}
                </p>
            )}
            {submitResult.success && (
                <p className="text-xs mt-2 text-muted-foreground">
                پیام تأیید به زودی از طریق تلگرام برای شما ارسال می‌شود.
                </p>
            )}
            </div>
            </div>
        )}

        {/* Form Fields with Staggered Animation */}
        <div className="relative z-10 space-y-5">
        {/* Full Name */}
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500" style={staggerDelay(0)}>
        <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <User className="w-4 h-4 text-primary" />
        <span>نام و نام خانوادگی</span>
        <span className="text-destructive">*</span>
        </label>
        <input
        id="fullName"
        type="text"
        value={formState.fullName.value}
        onChange={(e) => handleFieldChange('fullName', e.target.value)}
        onBlur={() => handleFieldBlur('fullName')}
        placeholder="مثال: علی احمدی"
        className={`w-full px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            formState.fullName.error && formState.fullName.touched ? 'border-destructive focus:ring-destructive/20' : 'border-border hover:border-primary/50'
        }`}
        disabled={isSubmitting}
        />
        {formState.fullName.error && formState.fullName.touched && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in">
            <AlertCircle className="w-3 h-3" /> {formState.fullName.error}
            </p>
        )}
        </div>

        {/* Phone */}
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500" style={staggerDelay(1)}>
        <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Phone className="w-4 h-4 text-primary" />
        <span>شماره موبایل</span>
        <span className="text-destructive">*</span>
        </label>
        <input
        id="phone"
        type="tel"
        value={formState.phone.value}
        onChange={(e) => handleFieldChange('phone', e.target.value)}
        onBlur={() => handleFieldBlur('phone')}
        placeholder="09123456789"
        maxLength={11}
        dir="ltr"
        className={`w-full px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            formState.phone.error && formState.phone.touched ? 'border-destructive focus:ring-destructive/20' : 'border-border hover:border-primary/50'
        }`}
        disabled={isSubmitting}
        />
        {formState.phone.error && formState.phone.touched && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in">
            <AlertCircle className="w-3 h-3" /> {formState.phone.error}
            </p>
        )}
        </div>

        {/* Email */}
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500" style={staggerDelay(2)}>
        <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Mail className="w-4 h-4 text-primary" />
        <span>ایمیل (اختیاری)</span>
        </label>
        <input
        id="email"
        type="email"
        value={formState.email.value}
        onChange={(e) => handleFieldChange('email', e.target.value)}
        onBlur={() => handleFieldBlur('email')}
        placeholder="example@email.com"
        dir="ltr"
        className={`w-full px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            formState.email.error && formState.email.touched ? 'border-destructive focus:ring-destructive/20' : 'border-border hover:border-primary/50'
        }`}
        disabled={isSubmitting}
        />
        </div>

        {/* Date & Time Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500" style={staggerDelay(3)}>
        <div className="space-y-2">
        <label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Calendar className="w-4 h-4 text-primary" />
        <span>تاریخ نوبت</span>
        <span className="text-destructive">*</span>
        </label>
        <input
        id="date"
        type="date"
        value={formState.date.value}
        onChange={(e) => handleFieldChange('date', e.target.value)}
        onBlur={() => handleFieldBlur('date')}
        min={minDate}
        dir="ltr"
        className={`w-full px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm text-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            formState.date.error && formState.date.touched ? 'border-destructive focus:ring-destructive/20' : 'border-border hover:border-primary/50'
        }`}
        disabled={isSubmitting}
        />
        {formState.date.error && formState.date.touched && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in">
            <AlertCircle className="w-3 h-3" /> {formState.date.error}
            </p>
        )}
        </div>

        <div className="space-y-2">
        <label htmlFor="time" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Clock className="w-4 h-4 text-primary" />
        <span>ساعت نوبت</span>
        <span className="text-destructive">*</span>
        </label>
        <select
        id="time"
        value={formState.time.value}
        onChange={(e) => handleFieldChange('time', e.target.value)}
        onBlur={() => handleFieldBlur('time')}
        className={`w-full px-4 py-3 rounded-xl border bg-background/50 backdrop-blur-sm text-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
            formState.time.error && formState.time.touched ? 'border-destructive focus:ring-destructive/20' : 'border-border hover:border-primary/50'
        }`}
        disabled={isSubmitting}
        >
        <option value="">انتخاب ساعت</option>
        {TIME_SLOTS.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
        ))}
        </select>
        {formState.time.error && formState.time.touched && (
            <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in">
            <AlertCircle className="w-3 h-3" /> {formState.time.error}
            </p>
        )}
        </div>
        </div>

        {/* Description */}
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500" style={staggerDelay(4)}>
        <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <FileText className="w-4 h-4 text-primary" />
        <span>توضیحات (اختیاری)</span>
        </label>
        <textarea
        id="description"
        value={formState.description.value}
        onChange={(e) => handleFieldChange('description', e.target.value)}
        placeholder="علت مراجعه یا توضیحات اضافی..."
        rows={3}
        maxLength={500}
        className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50 resize-none"
        disabled={isSubmitting}
        />
        <p className="text-xs text-muted-foreground text-end">
        {formState.description.value.length}/500 کاراکتر
        </p>
        </div>

        {/* Premium Submit Button */}
        <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-500" style={staggerDelay(5)}>
        <button
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-bold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
        >
        {/* Shimmer Effect on Hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

        <span className="relative z-10 flex items-center gap-2">
        {isSubmitting ? (
            <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>در حال ثبت درخواست...</span>
            </>
        ) : (
            <>
            <Sparkles className="w-5 h-5" />
            <span>ثبت نهایی درخواست نوبت آنلاین</span>
            </>
        )}
        </span>
        </button>
        <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
        <CheckCircle2 className="w-3.5 h-3.5 text-success" />
        <span>اطلاعات شما کاملاً محرمانه بوده و کد پیگیری از طریق تلگرام ارسال می‌شود.</span>
        </p>
        </div>
        </div>

        {/* Custom Keyframe for Shimmer Effect */}
        <style>{`
            @keyframes shimmer {
                100% { transform: translateX(100%); }
            }
            `}</style>
            </form>
    );
};

export default BookingForm;
