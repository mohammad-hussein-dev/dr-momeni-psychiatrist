export type Language = 'fa' | 'en';

export type UserRole = 'patient' | 'doctor_admin';

export type ServiceType = 
  | 'depression' 
  | 'anxiety' 
  | 'cognitive'
  | 'child' 
  | 'personality'
  | 'sleep'
  | 'sexual'
  | 'non_pharma'
  | 'psychotherapy'
  | 'individual' 
  | 'couple' 
  | 'family' 
  | 'general';

export type VisitType = 'in_person' | 'online';

export type AppointmentStatus = 
  | 'pending_approval' // در انتظار بررسی و تایید پزشک
  | 'confirmed'        // تایید شده توسط پزشک/ادمین
  | 'completed'        // ویزیت انجام شده
  | 'cancelled'        // لغو شده
  | 'rescheduled';     // جابجا شده

export type PaymentStatus = 'paid_online' | 'paid_in_person' | 'pending' | 'insurance_covered';

export interface Appointment {
  id: string;
  patient_name: string;
  patient_phone: string;
  patient_national_id?: string;
  service: ServiceType;
  visit_type: VisitType;
  date: string; // YYYY-MM-DD
  time_slot: string; // e.g. "10:00"
  status: AppointmentStatus;
  notes?: string;
  doctor_notes?: string;
  payment_status?: PaymentStatus;
  created_at: string;
  confirmed_at?: string;
  rejection_reason?: string;
  online_meeting_url?: string;
  hospital_room?: string;
}

export interface UserSession {
  phone: string;
  name: string;
  role: UserRole;
  token: string;
  loggedInAt: string;
}

// ----------------- Patient-Doctor Secure Chat Types -----------------

export type MessageSender = 'doctor' | 'patient';
export type MessageAttachmentType = 'prescription' | 'lab_report' | 'voice_note' | 'clinical_guide';
export type MessageDeliveryStatus = 'sending' | 'sent' | 'delivered' | 'read';

export interface MessageReaction {
  emoji: string;
  by: MessageSender;
  name?: string;
  at?: string;
}

export interface ChatMessage {
  id: string;
  patientPhone: string;
  patientName: string;
  sender: MessageSender;
  senderName?: string;
  text: string;
  timestamp: string;
  read: boolean;
  deliveryStatus?: MessageDeliveryStatus;
  editedAt?: string;
  reactions?: MessageReaction[];
  attachmentType?: MessageAttachmentType;
  attachmentTitle?: string;
  attachmentData?: string;
  voiceDurationSeconds?: number;
}

export interface PatientThread {
  patientPhone: string;
  patientName: string;
  lastMessage: ChatMessage;
  unreadCount: number;
  lastActivity: string;
  service?: ServiceType;
  visitType?: VisitType;
  statusBadge?: string;
  isOnline?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title_fa: string;
  title_en: string;
  excerpt_fa: string;
  excerpt_en: string;
  body_fa: string;
  body_en: string;
  category: 'anxiety' | 'depression' | 'relationships' | 'children' | 'general';
  category_fa: string;
  category_en: string;
  image_url: string;
  read_minutes: number;
  published_date: string;
  author_fa: string;
  author_en: string;
}

export interface Testimonial {
  id: string;
  author_initial: string;
  author_label_fa: string;
  author_label_en: string;
  body_fa: string;
  body_en: string;
  rating: number;
  service_tag: string;
  service_tag_fa: string;
  service_tag_en: string;
  order: number;
  visit_type: VisitType;
  category?: 'all' | 'anxiety' | 'depression' | 'adhd' | 'couples' | 'online' | 'neuromodulation';
  shadow_avatar?: string;
  persona_title_fa?: string;
  persona_title_en?: string;
  treatment_duration_fa?: string;
  treatment_duration_en?: string;
  verified?: boolean;
  location_tag_fa?: string;
  location_tag_en?: string;
  outcome_badge_fa?: string;
  outcome_badge_en?: string;
  date_str?: string;
}

export interface PatientProfile {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  birthYear?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  medicalHistoryNotes?: string;
  avatarSeed?: string;
  notificationPref?: 'sms' | 'whatsapp' | 'both';
}

export interface ServiceItem {
  key: ServiceType;
  titleKey: string;
  descKey: string;
  icon: string;
  badge_fa?: string;
  badge_en?: string;
}
