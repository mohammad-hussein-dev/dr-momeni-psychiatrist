import { PatientProfile } from '../../../types';
import { safeStorage } from '../../../services/storage/storageService';

const PROFILE_KEY_PREFIX = 'dr_patient_profile_';

export const DEFAULT_PATIENT_PROFILE: PatientProfile = {
  name: '',
  phone: '',
  email: '',
  city: 'تهران',
  birthYear: '۱۳۷۰',
  emergencyContactName: '',
  emergencyContactPhone: '',
  medicalHistoryNotes: '',
  avatarSeed: '1',
  notificationPref: 'sms'
};

export const patientProfileService = {
  getProfile(phone: string): PatientProfile {
    const clean = phone.replace(/[^0-9]/g, '');
    if (!clean) return { ...DEFAULT_PATIENT_PROFILE };
    return safeStorage.get<PatientProfile>(PROFILE_KEY_PREFIX + clean, {
      ...DEFAULT_PATIENT_PROFILE,
      phone: clean
    });
  },

  saveProfile(phone: string, profile: PatientProfile): boolean {
    const clean = phone.replace(/[^0-9]/g, '');
    if (!clean) return false;
    return safeStorage.set(PROFILE_KEY_PREFIX + clean, profile, 'patient_profile_updated');
  }
};
