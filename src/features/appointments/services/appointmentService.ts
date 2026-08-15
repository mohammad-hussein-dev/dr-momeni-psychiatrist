import { Appointment, ServiceType, VisitType, AppointmentStatus, PaymentStatus } from '../../../types';
import { safeStorage } from '../../../services/storage/storageService';

export const APPOINTMENTS_KEY = 'dr_appointments_list';
export const SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

const INITIAL_SEED_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-101",
    patient_name: "مریم احمدی",
    patient_phone: "09123456789",
    patient_national_id: "0019283741",
    service: "depression",
    visit_type: "in_person",
    date: "2026-08-18",
    time_slot: "10:00",
    status: "confirmed",
    notes: "علائم بی‌انگیزگی شدید و اختلال خواب از دو ماه پیش پس از تغییر موقعیت شغلی.",
    doctor_notes: "جلسه اول مصاحبه بالینی انجام شود. آزمایش تیروئید و ویتامین D بررسی گردد.",
    payment_status: "paid_in_person",
    hospital_room: "اتاق ۳۰۲ - کلینیک اعصاب و روان بیمارستان نیکان غرب",
    created_at: "2026-08-12T09:30:00Z",
    confirmed_at: "2026-08-12T11:00:00Z"
  },
  {
    id: "apt-102",
    patient_name: "علیرضا کریمی",
    patient_phone: "09351112233",
    patient_national_id: "0449918231",
    service: "anxiety",
    visit_type: "online",
    date: "2026-08-19",
    time_slot: "16:00",
    status: "pending_approval",
    notes: "حملات پانیک گاه‌به‌گاه حین رانندگی در اتوبان و تپش قلب ناگهانی.",
    doctor_notes: "",
    payment_status: "paid_online",
    online_meeting_url: "https://meet.google.com/drm-online-session-742",
    created_at: "2026-08-13T14:15:00Z"
  },
  {
    id: "apt-103",
    patient_name: "سارا روزبهانی",
    patient_phone: "09128884455",
    patient_national_id: "0078123901",
    service: "sleep",
    visit_type: "in_person",
    date: "2026-08-19",
    time_slot: "11:00",
    status: "completed",
    notes: "بی‌خوابی مزمن و بیدار شدن مکرر شبانه.",
    doctor_notes: "پروتکل بهداشت خواب و دارودرمانی خط اول با دوز ملایم تنظیم شد.",
    payment_status: "paid_in_person",
    hospital_room: "اتاق ۳۰۲",
    created_at: "2026-08-10T11:00:00Z"
  }
];

export function getNextAvailableWorkDays(count = 12) {
  const days: { dateStr: string; dayNameFa: string; dayNameEn: string; dateDisplayFa: string; dateDisplayEn: string }[] = [];
  const now = new Date();
  
  const faWeekdays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
  const enWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const faMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const current = new Date(now);
  current.setDate(current.getDate() + 1);

  while (days.length < count) {
    const dayOfWeek = current.getDay();
    // Exclude Friday (day 5 in JS getDay)
    if (dayOfWeek !== 5) {
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, '0');
      const day = String(current.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      let formattedFa = '';
      try {
        formattedFa = new Intl.DateTimeFormat('fa-IR', { month: 'short', day: 'numeric' }).format(current);
      } catch {
        formattedFa = `${current.getDate()} ${faMonths[current.getMonth()]}`;
      }

      const formattedEn = `${enMonths[current.getMonth()]} ${current.getDate()}`;

      days.push({
        dateStr,
        dayNameFa: faWeekdays[dayOfWeek],
        dayNameEn: enWeekdays[dayOfWeek],
        dateDisplayFa: formattedFa,
        dateDisplayEn: formattedEn
      });
    }
    current.setDate(current.getDate() + 1);
  }

  return days;
}

export const appointmentService = {
  getAllAppointments(): Appointment[] {
    const list = safeStorage.get<Appointment[]>(APPOINTMENTS_KEY, []);
    if (!Array.isArray(list) || list.length === 0) {
      safeStorage.set(APPOINTMENTS_KEY, INITIAL_SEED_APPOINTMENTS);
      return INITIAL_SEED_APPOINTMENTS;
    }
    return list;
  },

  getAppointmentsByPhone(phone: string): Appointment[] {
    const cleaned = phone.replace(/[^0-9]/g, '');
    const all = this.getAllAppointments();
    return all.filter(a => a.patient_phone.replace(/[^0-9]/g, '') === cleaned);
  },

  getAppointmentById(id: string): Appointment | undefined {
    return this.getAllAppointments().find(a => a.id === id);
  },

  createAppointment(data: {
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
    const appointments = this.getAllAppointments();
    
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      patient_name: data.patient_name.trim(),
      patient_phone: data.patient_phone.trim(),
      patient_national_id: data.patient_national_id?.trim(),
      service: data.service,
      visit_type: data.visit_type,
      date: data.date,
      time_slot: data.time_slot,
      status: 'pending_approval',
      notes: data.notes?.trim() || '',
      doctor_notes: '',
      payment_status: data.payment_status || (data.visit_type === 'online' ? 'paid_online' : 'pending'),
      created_at: new Date().toISOString(),
      online_meeting_url: data.visit_type === 'online' ? `https://meet.google.com/drm-${Math.random().toString(36).substring(2, 8)}` : undefined,
      hospital_room: data.visit_type === 'in_person' ? 'اتاق ۳۰۲ - کلینیک اعصاب و روان بیمارستان نیکان غرب' : undefined
    };

    const updated = [newAppointment, ...appointments];
    safeStorage.set(APPOINTMENTS_KEY, updated, 'appointments_updated');
    return newAppointment;
  },

  updateAppointmentStatus(
    id: string, 
    status: AppointmentStatus, 
    doctorNotes?: string, 
    rejectionReason?: string,
    meetingUrl?: string,
    hospitalRoom?: string
  ): Appointment | null {
    const list = this.getAllAppointments();
    const index = list.findIndex(a => a.id === id);
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      status,
      ...(doctorNotes !== undefined && { doctor_notes: doctorNotes }),
      ...(rejectionReason !== undefined && { rejection_reason: rejectionReason }),
      ...(meetingUrl !== undefined && { online_meeting_url: meetingUrl }),
      ...(hospitalRoom !== undefined && { hospital_room: hospitalRoom }),
      ...(status === 'confirmed' && !list[index].confirmed_at && { confirmed_at: new Date().toISOString() })
    };

    safeStorage.set(APPOINTMENTS_KEY, list, 'appointments_updated');
    return list[index];
  },

  updateAppointmentDetails(id: string, updates: Partial<Appointment>): Appointment | null {
    const list = this.getAllAppointments();
    const index = list.findIndex(a => a.id === id);
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      ...updates
    };

    safeStorage.set(APPOINTMENTS_KEY, list, 'appointments_updated');
    return list[index];
  },

  cancelAppointment(id: string, reason?: string): boolean {
    const updated = this.updateAppointmentStatus(id, 'cancelled', undefined, reason);
    return !!updated;
  },

  deleteAppointment(id: string): boolean {
    const list = this.getAllAppointments();
    const filtered = list.filter(a => a.id !== id);
    if (filtered.length !== list.length) {
      safeStorage.set(APPOINTMENTS_KEY, filtered, 'appointments_updated');
      return true;
    }
    return false;
  },

  resetAppointmentsToDefaults(): Appointment[] {
    safeStorage.set(APPOINTMENTS_KEY, INITIAL_SEED_APPOINTMENTS, 'appointments_updated');
    return INITIAL_SEED_APPOINTMENTS;
  }
};
