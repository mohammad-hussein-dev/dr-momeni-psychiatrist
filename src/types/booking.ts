// ─── src/types/booking.ts ─────────────────────────────────────────────────────
/**
 * @fileoverview Type definitions for the medical booking system.
 * @description Defines strict interfaces and types for booking requests,
 *              responses, and service contracts to ensure end-to-end type safety.
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 1.0.0
 * @since 2026-09-10
 */

// ─── Domain Types ─────────────────────────────────────────────────────────────

/**
 * @type VisitType
 * @description Allowed types of medical visits
 */
export type VisitType = 'حضوری' | 'آنلاین' | 'in_person' | 'online' | 'Online Telehealth' | 'In-Person Consultation';

/**
 * @type BookingStatus
 * @description Lifecycle states of a booking request
 */
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// ─── Data Interfaces ──────────────────────────────────────────────────────────

/**
 * @interface IBookingRequest
 * @description Payload structure for a new booking submission
 */
export interface IBookingRequest {
    /** Patient's full name (Persian or English) */
    fullName: string;

    /** Iranian mobile number (Format: 09xxxxxxxxx) */
    phone: string;

    /** Optional email address for confirmation */
    email?: string;

    /** Appointment date (Format: YYYY-MM-DD) */
    date: string;

    /** Appointment time (Format: HH:mm) */
    time: string;

    /** Type of visit */
    visitType: VisitType;

    /** Optional insurance provider name */
    insurance?: string;

    /** Optional patient's reason for visit or additional notes (Max 500 chars) */
    description?: string;
}

/**
 * @interface IBookingResponse
 * @description Standardized response structure from the booking service
 */
export interface IBookingResponse {
    /** Indicates if the booking was successfully registered */
    success: boolean;

    /** User-facing message (in Persian) explaining the result */
    message: string;

    /** Unique tracking ID generated upon success (e.g., "MOM-4829") */
    bookingId?: string;

    /** Field-specific validation errors (if success is false) */
    errors?: Record<string, string>;
}

// ─── Service Contracts ────────────────────────────────────────────────────────

/**
 * @interface IBookingService
 * @description Contract for booking submission services.
 * @note Implementations should handle fault tolerance (e.g., if Email fails,
 *       Telegram/Sheets should still attempt to process the request).
 */
export interface IBookingService {
    /**
     * Submits a booking request to configured channels.
     *
     * @param data - The validated booking request payload
     * @returns A promise resolving to the standardized booking response
     */
    submit: (data: IBookingRequest) => Promise<IBookingResponse>;
}

// ─── End of File ──────────────────────────────────────────────────────────────
