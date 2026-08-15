/**
 * Appointment and Session store facade for backward compatibility.
 * Delegates to modular domain services in src/features/
 */
import { Appointment, AppointmentStatus, PaymentStatus, ServiceType, VisitType, UserSession, UserRole } from '../types';
import { 
  appointmentService, 
  getNextAvailableWorkDays as getWorkDays, 
  SLOTS as TIME_SLOTS,
  APPOINTMENTS_KEY as APPT_KEY 
} from '../features/appointments/services/appointmentService';
import { 
  authService, 
  AUTH_SESSION_KEY as SESSION_KEY, 
  PATIENT_PHONE_KEY as PHONE_KEY, 
  DOCTOR_ADMIN_PHONES as DOCTOR_PHONES 
} from '../features/authentication/services/authService';

export const AUTH_SESSION_KEY = SESSION_KEY;
export const PATIENT_PHONE_KEY = PHONE_KEY;
export const APPOINTMENTS_KEY = APPT_KEY;
export const DOCTOR_ADMIN_PHONES = DOCTOR_PHONES;
export const SLOTS = TIME_SLOTS;

export const getNextAvailableWorkDays = getWorkDays;

export function getAllAppointments(): Appointment[] {
  return appointmentService.getAllAppointments();
}

export function getAppointmentsByPhone(phone: string): Appointment[] {
  return appointmentService.getAppointmentsByPhone(phone);
}

export function getAppointmentById(id: string): Appointment | undefined {
  return appointmentService.getAppointmentById(id);
}

export function createAppointment(data: {
  patient_name: string;
  patient_phone: string;
  patient_national_id?: string;
  service: ServiceType;
  visit_type: VisitType;
  date: string;
  time_slot: string;
  notes?: string;
  payment_status?: PaymentStatus;
}): Appointment {
  return appointmentService.createAppointment(data);
}

export function updateAppointmentStatus(
  id: string, 
  status: AppointmentStatus, 
  doctorNotes?: string, 
  rejectionReason?: string,
  meetingUrl?: string,
  hospitalRoom?: string
): Appointment | null {
  return appointmentService.updateAppointmentStatus(id, status, doctorNotes, rejectionReason, meetingUrl, hospitalRoom);
}

export function updateAppointmentDetails(id: string, updates: Partial<Appointment>): Appointment | null {
  return appointmentService.updateAppointmentDetails(id, updates);
}

export function cancelAppointment(id: string, reason?: string): boolean {
  return appointmentService.cancelAppointment(id, reason);
}

export function deleteAppointment(id: string): boolean {
  return appointmentService.deleteAppointment(id);
}

export function resetAppointmentsToDefaults(): Appointment[] {
  return appointmentService.resetAppointmentsToDefaults();
}

export function getActiveSession(): UserSession | null {
  return authService.getActiveSession();
}

export function saveSession(session: UserSession): void {
  authService.saveSession(session);
}

export function clearSession(): void {
  authService.clearSession();
}
