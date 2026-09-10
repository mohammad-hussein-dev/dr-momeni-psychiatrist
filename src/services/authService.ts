/// <reference types="vite/client" />
// ─── src/services/authService.ts ────────────────────────────────────────────
/**
 * @fileoverview Authentication Service for OTP-based login.
 * @description Provides a mock OTP implementation for development and testing.
 *              Designed with a clean interface (IAuthService) to allow seamless
 *              replacement with a real SMS API provider (e.g., Kavehnegar, MeliPayamak)
 *              before production deployment.
 *
 * @architecture
 * - Interface-based design for dependency injection
 * - Mock implementation accepts any 4-digit code for testing
 * - Includes TODO markers for production SMS API integration
 * - Type-safe with strict TypeScript validation
 *
 * @author Mohammad Hossein (Senior Frontend Engineer)
 * @version 1.0.0
 * @since 2026-09-10
 */

// ─── Type Definitions ───────────────────────────────────────────────────────

/**
 * @interface IAuthResult
 * @description Standardized response structure for authentication operations
 */
export interface IAuthResult {
    /** Indicates if the authentication was successful */
    success: boolean;
    /** User-facing message (in Persian) explaining the result */
    message: string;
    /** Optional user data returned upon successful authentication */
    userData?: {
        phone: string;
        role: 'patient' | 'doctor' | 'admin';
        name?: string;
    };
}

/**
 * @interface IAuthService
 * @description Contract for authentication services
 * @note Implementations should handle rate limiting and security best practices
 */
export interface IAuthService {
    /**
     * Sends an OTP code to the specified phone number
     * @param phone - Iranian mobile number (format: 09xxxxxxxxx)
     * @returns Promise resolving to authentication result
     */
    sendCode: (phone: string) => Promise<IAuthResult>;

    /**
     * Verifies the OTP code entered by the user
     * @param phone - Iranian mobile number (format: 09xxxxxxxxx)
     * @param code - 4-digit OTP code entered by user
     * @returns Promise resolving to authentication result with user data
     */
    verifyCode: (phone: string, code: string) => Promise<IAuthResult>;
}

// ─── Constants ──────────────────────────────────────────────────────────────

/**
 * @constant OTP_LENGTH
 * @description Length of OTP code (4 digits for simplicity)
 */
const OTP_LENGTH = 4;

/**
 * @constant OTP_EXPIRY_MINUTES
 * @description OTP code validity period in minutes
 */
const OTP_EXPIRY_MINUTES = 5;

/**
 * @constant MOCK_OTP_CODE
 * @description Fixed OTP code for testing purposes
 * @note In production, this should be randomly generated and stored server-side
 */
const MOCK_OTP_CODE = '1234';

// ─── Mock Service Implementation ────────────────────────────────────────────

/**
 * @class MockAuthService
 * @description Mock implementation of IAuthService for development and testing.
 *              Accepts any 4-digit code and returns success.
 *
 * @implementation_notes
 * - This is a CLIENT-SIDE mock for UI testing only
 * - In production, OTP generation and validation MUST happen server-side
 * - Real implementation should use SMS API with rate limiting
 * - TODO(MH): Replace with real SMS API before production deployment
 *
 * @example
 * ```typescript
 * const authService = new MockAuthService();
 *
 * // Send OTP
 * const sendResult = await authService.sendCode('09123456789');
 * if (sendResult.success) {
 *   console.log('OTP sent successfully');
 * }
 *
 * // Verify OTP
 * const verifyResult = await authService.verifyCode('09123456789', '1234');
 * if (verifyResult.success) {
 *   console.log('User authenticated:', verifyResult.userData);
 * }
 * ```
 */
export class MockAuthService implements IAuthService {
    /**
     * @method sendCode
     * @description Simulates sending an OTP code via SMS
     * @param phone - Iranian mobile number (format: 09xxxxxxxxx)
     * @returns Promise resolving to success result
     *
     * @note In production, this should:
     * 1. Generate a random 4-digit code
     * 2. Store it server-side with expiration timestamp
     * 3. Send it via SMS API
     * 4. Implement rate limiting (e.g., max 3 attempts per hour)
     */
    async sendCode(phone: string): Promise<IAuthResult> {
        // ─── Validation ───────────────────────────────────────────────────────
        if (!this.isValidIranianPhone(phone)) {
            return {
                success: false,
                message: 'شماره موبایل نامعتبر است. لطفاً فرمت 09xxxxxxxxx را رعایت کنید.',
            };
        }

        // ─── Simulate API delay ───────────────────────────────────────────────
        await this.simulateNetworkDelay(800, 1500);

        // ─── Mock success ─────────────────────────────────────────────────────
        console.log(`[MockAuthService] 📱 OTP sent to ${phone} (Mock code: ${MOCK_OTP_CODE})`);

        return {
            success: true,
            message: `کد تایید به شماره ${phone} ارسال شد. (کد تست: ${MOCK_OTP_CODE})`,
        };
    }

    /**
     * @method verifyCode
     * @description Simulates verifying an OTP code
     * @param phone - Iranian mobile number (format: 09xxxxxxxxx)
     * @param code - 4-digit OTP code entered by user
     * @returns Promise resolving to success result with user data
     *
     * @note In production, this should:
     * 1. Retrieve stored OTP from server-side storage
     * 2. Compare with user input
     * 3. Check expiration timestamp
     * 4. Invalidate OTP after successful verification
     * 5. Return user data from database
     */
    async verifyCode(phone: string, code: string): Promise<IAuthResult> {
        // ─── Validation ───────────────────────────────────────────────────────
        if (!this.isValidIranianPhone(phone)) {
            return {
                success: false,
                message: 'شماره موبایل نامعتبر است.',
            };
        }

        if (!code || code.length !== OTP_LENGTH) {
            return {
                success: false,
                message: `کد تایید باید ${OTP_LENGTH} رقمی باشد.`,
            };
        }

        // ─── Simulate API delay ───────────────────────────────────────────────
        await this.simulateNetworkDelay(500, 1000);

        // ─── Mock verification (accepts any 4-digit code) ─────────────────────
        // TODO(MH): In production, validate against server-side stored OTP
        console.log(`[MockAuthService] 🔐 Verifying OTP for ${phone} (Mock: accepting any 4-digit code)`);

        return {
            success: true,
            message: 'ورود با موفقیت انجام شد.',
            userData: {
                phone,
                role: 'patient',
                name: this.extractNameFromPhone(phone),
            },
        };
    }

    // ─── Helper Methods ─────────────────────────────────────────────────────

    /**
     * @method isValidIranianPhone
     * @description Validates Iranian mobile number format
     * @param phone - Phone number to validate
     * @returns true if valid, false otherwise
     */
    private isValidIranianPhone(phone: string): boolean {
        const iranianPhoneRegex = /^09\d{9}$/;
        return iranianPhoneRegex.test(phone);
    }

    /**
     * @method simulateNetworkDelay
     * @description Simulates network latency for realistic UX
     * @param min - Minimum delay in milliseconds
     * @param max - Maximum delay in milliseconds
     */
    private async simulateNetworkDelay(min: number, max: number): Promise<void> {
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        return new Promise((resolve) => setTimeout(resolve, delay));
    }

    /**
     * @method extractNameFromPhone
     * @description Generates a mock name from phone number for testing
     * @param phone - Iranian mobile number
     * @returns Mock user name
     * @note In production, name should come from database
     */
    private extractNameFromPhone(phone: string): string {
        // Mock name generation for testing
        const mockNames = [
            'علی احمدی',
            'فاطمه رضایی',
            'محمد حسینی',
            'زهرا محمدی',
            'حسین کریمی',
        ];
        const index = parseInt(phone.slice(-2)) % mockNames.length;
        return mockNames[index];
    }
}

// ─── Service Instance ───────────────────────────────────────────────────────

/**
 * @constant authService
 * @description Singleton instance of the authentication service
 * @note TODO(MH): Replace MockAuthService with real SMS API implementation before production
 */
export const authService: IAuthService = new MockAuthService();

// ─── Default Export ─────────────────────────────────────────────────────────
export default authService;

// ─── End of File ────────────────────────────────────────────────────────────
