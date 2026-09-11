/// <reference types="vite/client" />
// ─── src/services/telegramService.ts ────────────────────────────────────────
/**
 * @fileoverview Telegram Notification Service for the Booking System.
 * @description Sends formatted, emoji-rich booking notifications to a specified
 *              Telegram chat via a server-side PHP proxy to bypass ISP restrictions.
 *              Implements fault-tolerant error handling and Persian (Jalali) date formatting.
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 2.1.0 (Persian Date in Notifications)
 * @since 2026-09-11
 */

import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { IBookingRequest, IBookingResponse } from '../types/booking';

// ─── Constants & Configuration ──────────────────────────────────────────────

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

// Point to the local PHP proxy instead of direct Telegram API to bypass Iranian ISP restrictions
const PROXY_URL = '/telegram-proxy.php';

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * @function formatBookingMessage
 * @description Formats the booking request into a readable, HTML-parsed Telegram message
 *              with Persian (Jalali) date formatting.
 * @param data - The validated booking request payload
 * @returns Formatted string ready for Telegram API
 */
const formatBookingMessage = (data: IBookingRequest): string => {
    // Convert Iranian phone format (09...) to international format (+989...) for tel links
    const intlPhone = data.phone.startsWith('0') ? `+98${data.phone.slice(1)}` : data.phone;

    // Convert Gregorian date (YYYY-MM-DD) to Persian (Jalali) date (YYYY/MM/DD)
    let formattedPersianDate = data.date;
    try {
        const gregorianDate = new Date(data.date);
        if (!isNaN(gregorianDate.getTime())) {
            const persianDate = new DateObject({
                date: gregorianDate,
                calendar: persian,
                locale: persian_fa
            });
            formattedPersianDate = persianDate.format("YYYY/MM/DD");
        }
    } catch (error) {
        console.warn('[TelegramService] Date conversion failed, falling back to original date:', error);
    }

    return `
    🔔 <b>نوبت جدید — دکتر فاطمه مومنی</b>
    ━━━━━━━━━━━━━━━━━━━━━
    👤 <b>بیمار:</b> ${data.fullName}
    📱 <b>موبایل:</b> <a href="tel:${intlPhone}">${data.phone}</a>
    📧 <b>ایمیل:</b> ${data.email || '—'}
    📅 <b>تاریخ:</b> ${formattedPersianDate}
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
 * @description Submits the booking notification to Telegram asynchronously via PHP proxy
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
        // ─── API Request via PHP Proxy ──────────────────────────────────────
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: BOT_TOKEN,
                chat_id: CHAT_ID,
                text: formatBookingMessage(data),
                                 parse_mode: 'HTML', // Enables bold text and clickable links
            }),
        });

        // ─── Response Handling ────────────────────────────────────────────────
        const result = await response.json();

        // The PHP proxy returns the raw Telegram API response, which includes "ok": true
        if (!response.ok || !result.ok) {
            console.error('[TelegramService] Proxy/API Error:', result);
            throw new Error(result.description || 'Failed to send Telegram message via proxy');
        }

        console.log('[TelegramService] ✅ Notification sent successfully via proxy.');
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
