import { UserSession, UserRole } from '../../../types';
import { safeStorage } from '../../../services/storage/storageService';

export const AUTH_SESSION_KEY = 'dr_auth_session';
export const PATIENT_PHONE_KEY = 'dr_patient_phone';

/** Recognized doctor/admin phone numbers with administrative privileges */
export const DOCTOR_ADMIN_PHONES = ['09121112233', '09120000000', '09129998877'];

export const authService = {
  getActiveSession(): UserSession | null {
    return safeStorage.get<UserSession | null>(AUTH_SESSION_KEY, null);
  },

  saveSession(session: UserSession): void {
    safeStorage.set(AUTH_SESSION_KEY, session, 'auth_state_changed');
    if (session.role === 'patient') {
      safeStorage.set(PATIENT_PHONE_KEY, session.phone);
    }
  },

  clearSession(): void {
    safeStorage.remove(AUTH_SESSION_KEY, 'auth_state_changed');
  },

  isDoctorPhone(phone: string): boolean {
    const cleaned = phone.replace(/[^0-9]/g, '');
    return DOCTOR_ADMIN_PHONES.some(p => p.replace(/[^0-9]/g, '') === cleaned);
  },

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  createSession(phone: string, role: UserRole, name?: string): UserSession {
    const defaultName = role === 'doctor_admin' ? 'دکتر فاطمه مومنی' : (name || 'مراجع گرامی');
    const session: UserSession = {
      phone,
      name: defaultName,
      role,
      token: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      loggedInAt: new Date().toISOString()
    };
    this.saveSession(session);
    return session;
  }
};
