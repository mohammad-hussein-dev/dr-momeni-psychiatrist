/// <reference types="vite/client" />
// ─── src/services/telegramService.ts ────────────────────────────────────────
/**
 * @fileoverview Telegram Notification Service for the Booking System.
 * @description Sends formatted, emoji-rich booking notifications to a specified
 *              Telegram chat using the Telegram Bot API. Implements fault-tolerant
 *              error handling to ensure the main booking flow is never blocked.
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 1.0.1
 * @since 2026-09-10
 */

import { IBookingRequest, IBookingResponse } from '../types/booking';

// ─── Constants & Configuration ──────────────────────────────────────────────

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * @function formatBookingMessage
 * @description Formats the booking request into a readable, HTML-parsed Telegram message
 * @param data - The validated booking request payload
 * @returns Formatted string ready for Telegram API
 */
const formatBookingMessage = (data: IBookingRequest): string => {
    // Convert Iranian phone format (09...) to international format (+989...) for tel links
    const intlPhone = data.phone.startsWith('0') ? `+98${data.phone.slice(1)}` : data.phone;

    return `
    🔔 <b>نوبت جدید — دکتر فاطمه مومنی</b>
    ━━━━━━━━━━━━━━━━━━━━━
    👤 <b>بیمار:</b> ${data.fullName}
    📱 <b>موبایل:</b> <a href="tel:${intlPhone}">${data.phone}</a>
    📧 <b>ایمیل:</b> ${data.email || '—'}
    📅 <b>تاریخ:</b> ${data.date}
    ⏰ <b>ساعت:</b> ${data.time}
    🏥 <b>نوع:</b> ${data.visitType}
    🏨 <b>بیمه:</b> ${data.insurance || 'آزاد'}
    📝 <b>شرح:</b> ${data.description || '—'}
    ━━━━━━━━━━━━━━━━━━━━━
    ✅ تأیید: <code>/confirm_${data.phone}</code>
    ❌ لغو: <code>/cancel_${data.phone}</code>
    📞 تماس: <a href="tel:${intlPhone}">${data.phone}</a>
    `.trim();
};

// ─── Service Implementation ─────────────────────────────────────────────────

/**
 * @function sendTelegramNotification
 * @description Submits the booking notification to Telegram asynchronously
 * @param data - The validated booking request payload
 * @returns A promise resolving to the standardized booking response
 */
export const sendTelegramNotification = async (
    data: IBookingRequest
): Promise<IBookingResponse> => {
    // ─── Guard Clause: Fail gracefully if credentials are missing ───────────
    if (!BOT_TOKEN || !CHAT_ID) {
        console.warn('[TelegramService] Missing BOT_TOKEN or CHAT_ID in .env. Skipping notification.');
        return {
            success: true, // Return true to not block the main booking flow
            message: 'نوبت ثبت شد (اعلان تلگرام در حالت توسعه غیرفعال است)',
        };
    }

    try {
        // ─── API Request ──────────────────────────────────────────────────────
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: formatBookingMessage(data),
                                 parse_mode: 'HTML', // Enables bold text and clickable links
                                 disable_web_page_preview: true,
            }),
        });

        // ─── Response Handling ────────────────────────────────────────────────
        const result = await response.json();

        if (!response.ok || !result.ok) {
            console.error('[TelegramService] API Error:', result);
            throw new Error(result.description || 'Failed to send Telegram message');
        }

        console.log('[TelegramService] ✅ Notification sent successfully.');
        return {
            success: true,
            message: 'اعلان تلگرام با موفقیت ارسال شد',
        };
    } catch (error) {
        // ─── Error Handling: Log developer error, return user-friendly message ─
        console.error('[TelegramService] ❌ Exception:', error);
        return {
            success: false,
            message: 'خطا در ارسال اعلان تلگرام. لطفاً با پشتیبانی تماس بگیرید.',
        };
    }
};

// ─── Default Export ─────────────────────────────────────────────────────────
export default sendTelegramNotification;

// ─── End of File ────────────────────────────────────────────────────────────
