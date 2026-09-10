// ─── src/services/bookingService.ts ─────────────────────────────────────────
/**
 * @fileoverview Booking Orchestrator Service
 * @description Coordinates multiple notification channels (Telegram, Google Sheets,
 *              Web3Forms) using Promise.allSettled for fault-tolerant booking submission.
 *              Implements a unified interface that ensures partial failures don't block
 *              the entire booking flow.
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 1.0.0
 * @since 2026-09-10
 */

import {
    IBookingRequest,
    IBookingResponse,
    IBookingService,
} from '../types/booking';
import { sendTelegramNotification } from './telegramService';

// ─── Constants ──────────────────────────────────────────────────────────────

/**
 * @constant BOOKING_ID_PREFIX
 * @description Prefix for generating unique booking tracking IDs
 */
const BOOKING_ID_PREFIX = 'MOM';

/**
 * @constant WEB3FORMS_ENDPOINT
 * @description Web3Forms API endpoint for email notifications
 */
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * @function generateBookingId
 * @description Generates a unique, human-readable booking tracking ID
 * @returns A string in format "MOM-XXXX" where XXXX is a random 4-digit number
 * @example "MOM-4829"
 */
const generateBookingId = (): string => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `${BOOKING_ID_PREFIX}-${randomDigits}`;
};

/**
 * @function sendWeb3FormsNotification
 * @description Sends booking confirmation email via Web3Forms (free, no backend)
 * @param data - The validated booking request payload
 * @returns A promise resolving to the standardized booking response
 */
const sendWeb3FormsNotification = async (
    data: IBookingRequest
): Promise<IBookingResponse> => {
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    // Guard clause: skip gracefully if not configured
    if (!accessKey) {
        console.warn('[BookingService] VITE_WEB3FORMS_KEY not set. Skipping email notification.');
        return {
            success: true,
            message: 'ایمیل تایید (غیرفعال)',
        };
    }

    try {
        const response = await fetch(WEB3FORMS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                access_key: accessKey,
                subject: `نوبت جدید — ${data.fullName} (${data.date} ساعت ${data.time})`,
                                 from_name: 'سامانه نوبت‌دهی دکتر مومنی',
                                 name: data.fullName,
                                 phone: data.phone,
                                 email: data.email || 'بدون ایمیل',
                                 message: `
                                 🔔 درخواست نوبت جدید
                                 ━━━━━━━━━━━━━━━━━━━━━
                                 نام: ${data.fullName}
                                 موبایل: ${data.phone}
                                 ایمیل: ${data.email || '—'}
                                 تاریخ: ${data.date}
                                 ساعت: ${data.time}
                                 نوع ویزیت: ${data.visitType}
                                 بیمه: ${data.insurance || 'آزاد'}
                                 توضیحات: ${data.description || '—'}
                                 ━━━━━━━━━━━━━━━━━━━━━
                                 `.trim(),
            }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Web3Forms submission failed');
        }

        console.log('[BookingService] ✅ Email notification sent via Web3Forms.');
        return {
            success: true,
            message: 'ایمیل تایید با موفقیت ارسال شد',
        };
    } catch (error) {
        console.error('[BookingService] ❌ Web3Forms error:', error);
        return {
            success: false,
            message: 'خطا در ارسال ایمیل تایید',
        };
    }
};

/**
 * @function sendSheetsNotification
 * @description Appends booking record to Google Sheets via Apps Script webhook
 * @param data - The validated booking request payload
 * @param bookingId - The generated unique booking ID
 * @returns A promise resolving to the standardized booking response
 */
const sendSheetsNotification = async (
    data: IBookingRequest,
    bookingId: string
): Promise<IBookingResponse> => {
    const webhookUrl = import.meta.env.VITE_SHEETS_WEBHOOK_URL;

    // Guard clause: skip gracefully if not configured
    if (!webhookUrl) {
        console.warn('[BookingService] VITE_SHEETS_WEBHOOK_URL not set. Skipping Sheets sync.');
        return {
            success: true,
            message: 'ذخیره در گوگل شیت (غیرفعال)',
        };
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script Web Apps
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookingId,
                fullName: data.fullName,
                phone: data.phone,
                email: data.email || '',
                date: data.date,
                time: data.time,
                visitType: data.visitType,
                insurance: data.insurance || 'آزاد',
                description: data.description || '',
                status: 'pending',
                createdAt: new Date().toISOString(),
            }),
        });

        // Note: no-cors mode returns opaque response, so we assume success if no exception
        console.log('[BookingService] ✅ Booking synced to Google Sheets.');
        return {
            success: true,
            message: 'نوبت در گوگل شیت ثبت شد',
        };
    } catch (error) {
        console.error('[BookingService] ❌ Google Sheets error:', error);
        return {
            success: false,
            message: 'خطا در ذخیره نوبت در گوگل شیت',
        };
    }
};

// ─── Main Service Implementation ────────────────────────────────────────────

/**
 * @function submitBooking
 * @description Orchestrates the entire booking submission flow across all channels.
 *              Uses Promise.allSettled to ensure fault tolerance — if one channel fails,
 *              others continue and the booking is still considered successful as long as
 *              at least one channel succeeds.
 *
 * @param data - The validated booking request payload
 * @returns A promise resolving to the final booking response with tracking ID
 *
 * @example
 * ```typescript
 * const response = await submitBooking({
 *   fullName: 'علی احمدی',
 *   phone: '09123456789',
 *   date: '2026-09-15',
 *   time: '10:00',
 *   visitType: 'حضوری',
 * });
 *
 * if (response.success) {
 *   console.log(`Booking confirmed: ${response.bookingId}`);
 * }
 * ```
 */
export const submitBooking: IBookingService['submit'] = async (
    data: IBookingRequest
): Promise<IBookingResponse> => {
    // ─── Step 1: Generate unique tracking ID ──────────────────────────────────
    const bookingId = generateBookingId();
    console.log(`[BookingService] 📝 New booking request — ID: ${bookingId}`);

    // ─── Step 2: Execute all notification channels in parallel ────────────────
    const [telegramResult, sheetsResult, emailResult] = await Promise.allSettled([
        sendTelegramNotification(data),
                                                                                 sendSheetsNotification(data, bookingId),
                                                                                 sendWeb3FormsNotification(data),
    ]);

    // ─── Step 3: Analyze results for fault tolerance ──────────────────────────
    const results = [telegramResult, sheetsResult, emailResult];
    const successfulChannels = results.filter(
        (r) => r.status === 'fulfilled' && r.value.success
    ).length;

    const failedChannels = results.filter(
        (r) => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success)
    );

    // ─── Step 4: Log detailed diagnostics ─────────────────────────────────────
    console.log(`[BookingService] 📊 Channel results: ${successfulChannels}/3 successful`);
    if (failedChannels.length > 0) {
        console.warn('[BookingService] ⚠️ Failed channels:', failedChannels);
    }

    // ─── Step 5: Determine final response ─────────────────────────────────────
    // Booking is considered successful if at least Telegram OR Sheets worked
    const telegramOk =
    telegramResult.status === 'fulfilled' && telegramResult.value.success;
    const sheetsOk =
    sheetsResult.status === 'fulfilled' && sheetsResult.value.success;

    const isOverallSuccess = telegramOk || sheetsOk;

    if (isOverallSuccess) {
        return {
            success: true,
            message:
            'درخواست نوبت شما با موفقیت ثبت شد. کد پیگیری: ' + bookingId,
            bookingId,
        };
    }

    // Edge case: all channels failed
    return {
        success: false,
        message:
        'متأسفانه در ثبت نوبت مشکلی پیش آمد. لطفاً مستقیماً از طریق واتس‌اپ اقدام فرمایید.',
        bookingId,
        errors: {
            general: 'تمامی کانال‌های اطلاع‌رسانی با خطا مواجه شدند',
        },
    };
};

// ─── Default Export ─────────────────────────────────────────────────────────
export default submitBooking;

// ─── End of File ────────────────────────────────────────────────────────────
