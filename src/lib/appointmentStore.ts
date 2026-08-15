import { Appointment, ServiceType, VisitType, AppointmentStatus, PaymentStatus, UserSession, UserRole } from '../types';

export const AUTH_SESSION_KEY = 'dr_auth_session';
export const PATIENT_PHONE_KEY = 'dr_patient_phone';
export const APPOINTMENTS_KEY = 'dr_appointments_list';

// Known Doctor / Admin Phone numbers for instant auto-recognition
export const DOCTOR_ADMIN_PHONES = ['09121112233', '09120000000', '09129998877'];

export const SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

// Helper to get next N work days (excluding Friday=5)
export function getNextAvailableWorkDays(count = 12) {
  const days: { dateStr: string; dayNameFa: string; dayNameEn: string; dateDisplayFa: string; dateDisplayEn: string }[] = [];
  const now = new Date();
  
  const faWeekdays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
  const enWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const faMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let current = new Date(now);
  current.setDate(current.getDate() + 1);

  while (days.length < count) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 5) {
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, '0');
      const day = String(current.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      let formattedFa = '';
      try {
        formattedFa = new Intl.DateTimeFormat('fa-IR', { month: 'short', day: 'numeric' }).format(current);
      } catch (e) {
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

// Initial realistic seed appointments for Dr. Momeni & clinic
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
    status: "pending_approval",
    notes: "بی‌خوابی مزمن و بیدار شدن‌های مکرر شبانه با کابوس.",
    doctor_notes: "",
    payment_status: "pending",
    hospital_room: "اتاق ۳۰۲ - کلینیک اعصاب و روان",
    created_at: "2026-08-13T15:20:00Z"
  },
  {
    id: "apt-104",
    patient_name: "پویا صامتی",
    patient_phone: "09193337788",
    service: "cognitive",
    visit_type: "online",
    date: "2026-08-21",
    time_slot: "15:00",
    status: "confirmed",
    notes: "بررسی علائم نقص تمرکز و بیش‌فعالی بزرگسالی (ADHD).",
    doctor_notes: "پرسشنامه DIVA ارسال شده است و ارزیابی عصب‌شناختی نیاز دارد.",
    payment_status: "paid_online",
    online_meeting_url: "https://meet.google.com/drm-adhd-eval-109",
    created_at: "2026-08-11T10:00:00Z",
    confirmed_at: "2026-08-11T12:30:00Z"
  },
  {
    id: "apt-105",
    patient_name: "ندا شریفی",
    patient_phone: "09123456789",
    service: "psychotherapy",
    visit_type: "in_person",
    date: "2026-08-05",
    time_slot: "14:00",
    status: "completed",
    notes: "پیگیری دوره درمانی و تنظیم داروی ضداضطراب.",
    doctor_notes: "پاسخ بسیار خوب به سرترالین ۵۰. دوز ادامه داده شود و ۳ هفته دیگر ویزیت کنترلی تنظیم گردد.",
    payment_status: "paid_in_person",
    hospital_room: "اتاق ۳۰۲",
    created_at: "2026-08-01T08:00:00Z",
    confirmed_at: "2026-08-01T09:00:00Z"
  }
];

export function getAllAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_KEY);
    if (!raw) {
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(INITIAL_SEED_APPOINTMENTS));
      return INITIAL_SEED_APPOINTMENTS;
    }
    const parsed = JSON.parse(raw);
    // backward compatibility with older statuses
    return parsed.map((a: any) => ({
      ...a,
      status: a.status === 'upcoming' ? 'confirmed' : a.status
    }));
  } catch (err) {
    return INITIAL_SEED_APPOINTMENTS;
  }
}

export function getAppointmentsByPhone(phone: string): Appointment[] {
  const normalized = phone.replace(/\D/g, '');
  const all = getAllAppointments();
  return all.filter(a => a.patient_phone.replace(/\D/g, '') === normalized);
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
}): Appointment {
  const all = getAllAppointments();
  const isOnline = data.visit_type === 'online';
  
  const newAppt: Appointment = {
    id: "apt-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    ...data,
    status: 'pending_approval', // Newly booked by patient, awaits doctor/admin approval
    payment_status: isOnline ? 'paid_online' : 'pending',
    online_meeting_url: isOnline ? `https://meet.google.com/drm-${Date.now().toString(36)}` : undefined,
    hospital_room: !isOnline ? 'اتاق ۳۰۲ - کلینیک اعصاب و روان بیمارستان نیکان غرب' : undefined,
    created_at: new Date().toISOString()
  };
  
  all.unshift(newAppt);
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(all));
  return newAppt;
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus, rejectionReason?: string): Appointment | null {
  const all = getAllAppointments();
  const index = all.findIndex(a => a.id === id);
  if (index !== -1) {
    all[index].status = status;
    if (status === 'confirmed') {
      all[index].confirmed_at = new Date().toISOString();
      all[index].rejection_reason = undefined;
    } else if (status === 'cancelled' && rejectionReason) {
      all[index].rejection_reason = rejectionReason;
    }
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(all));
    return all[index];
  }
  return null;
}

export function updateAppointmentDetails(id: string, updates: Partial<Appointment>): Appointment | null {
  const all = getAllAppointments();
  const index = all.findIndex(a => a.id === id);
  if (index !== -1) {
    all[index] = {
      ...all[index],
      ...updates
    };
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(all));
    return all[index];
  }
  return null;
}

export function cancelAppointment(id: string, reason?: string): boolean {
  const res = updateAppointmentStatus(id, 'cancelled', reason);
  return !!res;
}

export function deleteAppointment(id: string): boolean {
  const all = getAllAppointments();
  const filtered = all.filter(a => a.id !== id);
  if (filtered.length !== all.length) {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(filtered));
    return true;
  }
  return false;
}

// ----------------- Auth Session Helpers -----------------

export function getActiveSession(): UserSession | null {
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) {
      // Check fallback phone key
      const legacyPhone = localStorage.getItem(PATIENT_PHONE_KEY);
      if (legacyPhone) {
        const isDoc = DOCTOR_ADMIN_PHONES.includes(legacyPhone.replace(/\D/g, ''));
        const role = isDoc ? 'doctor_admin' : 'patient';
        const session: UserSession = {
          phone: legacyPhone,
          name: isDoc ? 'دکتر فاطمه مومنی' : 'مراجع محترم',
          role,
          token: 'sess_' + Date.now(),
          loggedInAt: new Date().toISOString()
        };
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
        return session;
      }
      return null;
    }
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function isDoctorSession(): boolean {
  const session = getActiveSession();
  return session?.role === 'doctor_admin';
}

export function saveSession(session: UserSession) {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  localStorage.setItem(PATIENT_PHONE_KEY, session.phone);
  try {
    window.dispatchEvent(new Event('auth_state_changed'));
  } catch (e) {
    // safe fallback
  }
}

export function clearSession() {
  localStorage.removeItem(AUTH_SESSION_KEY);
  localStorage.removeItem(PATIENT_PHONE_KEY);
  try {
    window.dispatchEvent(new Event('auth_state_changed'));
  } catch (e) {
    // safe fallback
  }
}

