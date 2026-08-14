import { ChatMessage, PatientThread, ServiceType, VisitType, MessageReaction, MessageDeliveryStatus } from '../types';
import { getAllAppointments } from './appointmentStore';

const CHAT_MESSAGES_KEY = 'dr_patient_chat_messages';

const INITIAL_SEED_CHATS: ChatMessage[] = [
  // Thread 1: Maryam Ahmadi (09123456789)
  {
    id: 'msg-101',
    patientPhone: '09123456789',
    patientName: 'مریم احمدی',
    sender: 'patient',
    senderName: 'مریم احمدی',
    text: 'سلام خانم دکتر مومنی وقت بخیر. طبق دستور شما مصرف سرترالین ۵۰ میلی‌گرم رو شروع کردم. روزهای اول کمی حالت تهوع خفیف داشتم ولی الان روز ششم هستم و کاملاً برطرف شده.',
    timestamp: '2026-08-12T14:30:00Z',
    read: true,
    deliveryStatus: 'read',
    reactions: [
      { emoji: '👍', by: 'doctor', name: 'دکتر فاطمه مومنی' },
      { emoji: '🩺', by: 'doctor', name: 'دکتر فاطمه مومنی' }
    ]
  },
  {
    id: 'msg-102',
    patientPhone: '09123456789',
    patientName: 'مریم احمدی',
    sender: 'doctor',
    senderName: 'دکتر فاطمه مومنی',
    text: 'سلام خانم احمدی عزیز، بسیار عالی است. تهوع گذرا در روزهای نخست کاملاً طبیعی است. مصرف دارو را دقیقاً بعد از صبحانه ادامه دهید. برای دو هفته آینده ویزیت پیگیری تنظیم شده است.',
    timestamp: '2026-08-12T15:10:00Z',
    read: true,
    deliveryStatus: 'read',
    reactions: [
      { emoji: '❤️', by: 'patient', name: 'مریم احمدی' },
      { emoji: '🙏', by: 'patient', name: 'مریم احمدی' }
    ]
  },
  {
    id: 'msg-103',
    patientPhone: '09123456789',
    patientName: 'مریم احمدی',
    sender: 'doctor',
    senderName: 'دکتر فاطمه مومنی',
    text: 'دستورالعمل بهداشت خواب و پایش خلق روزانه را برای شما ضمیمه کردم:',
    timestamp: '2026-08-12T15:12:00Z',
    read: true,
    deliveryStatus: 'read',
    attachmentType: 'clinical_guide',
    attachmentTitle: 'راهنمای بهداشت خواب و کنترل استرس - کلینیک دکتر مومنی.pdf'
  },
  {
    id: 'msg-104',
    patientPhone: '09123456789',
    patientName: 'مریم احمدی',
    sender: 'patient',
    senderName: 'مریم احمدی',
    text: 'خیلی ممنونم خانم دکتر، حتماً مطالعه می‌کنم. یک سوال هم داشتم آیا مصرف دمنوش بابونه در شب با این دارو تداخلی دارد؟',
    timestamp: '2026-08-13T10:15:00Z',
    read: false,
    deliveryStatus: 'delivered'
  },

  // Thread 2: Alireza Karimi (09351112233)
  {
    id: 'msg-201',
    patientPhone: '09351112233',
    patientName: 'علیرضا کریمی',
    sender: 'patient',
    senderName: 'علیرضا کریمی',
    text: 'سلام خانم دکتر، من نوبت آنلاین برای فردا رزرو کردم. فایل نوار قلب و آزمایش خونی که متخصص قلب گفته بودند مشکلی ندارد رو براتون ارسال می‌کنم.',
    timestamp: '2026-08-13T11:20:00Z',
    read: true,
    deliveryStatus: 'read',
    attachmentType: 'lab_report',
    attachmentTitle: 'ECG_Cardiology_Clearance_LabResults.pdf'
  },
  {
    id: 'msg-202',
    patientPhone: '09351112233',
    patientName: 'علیرضا کریمی',
    sender: 'doctor',
    senderName: 'دکتر فاطمه مومنی',
    text: 'سلام آقای کریمی. مدارک را بررسی کردم، نتایج قلب کاملاً نرمال است و نشان می‌دهد تپش قلب شما ناشی از اضطراب و حمله پانیک است نه مشکل ساختاری قلب. در جلسه آنلاین فردا پروتکل درمان را آغاز می‌کنیم.',
    timestamp: '2026-08-13T12:05:00Z',
    read: true,
    deliveryStatus: 'read',
    reactions: [
      { emoji: '💡', by: 'doctor', name: 'دکتر فاطمه مومنی' }
    ]
  },
  {
    id: 'msg-203',
    patientPhone: '09351112233',
    patientName: 'علیرضا کریمی',
    sender: 'patient',
    senderName: 'علیرضا کریمی',
    text: 'شنیدن این موضوع خیلی به من آرامش داد، متشکرم تا فردا ساعت ۱۶ در پلتفرم آنلاین.',
    timestamp: '2026-08-13T13:40:00Z',
    read: false,
    deliveryStatus: 'delivered',
    reactions: [
      { emoji: '🙏', by: 'patient', name: 'علیرضا کریمی' }
    ]
  },

  // Thread 3: Pouya Sameti (09193337788)
  {
    id: 'msg-301',
    patientPhone: '09193337788',
    patientName: 'پویا صامتی',
    sender: 'patient',
    senderName: 'پویا صامتی',
    text: 'سلام خانم دکتر، من پرسشنامه تشخیصی DIVA و نقص توجه بزرگسالان رو تکمیل کردم.',
    timestamp: '2026-08-11T16:00:00Z',
    read: true,
    deliveryStatus: 'read',
    attachmentType: 'clinical_guide',
    attachmentTitle: 'Adult_ADHD_Self_Report_Scale_DIVA.pdf'
  },
  {
    id: 'msg-302',
    patientPhone: '09193337788',
    patientName: 'پویا صامتی',
    sender: 'doctor',
    senderName: 'دکتر فاطمه مومنی',
    text: 'سلام آقای صامتی. پاسخ‌های پرسشنامه نمرات بالایی در حوزه‌های بی‌توجهی و مدیریت زمان نشان می‌دهند. در جلسه آنلاین ۳۱ مرداد تحلیل بالینی دقیق را انجام خواهیم داد.',
    timestamp: '2026-08-11T18:20:00Z',
    read: true,
    deliveryStatus: 'read',
    reactions: [
      { emoji: '🩺', by: 'doctor', name: 'دکتر فاطمه مومنی' }
    ]
  },

  // Thread 4: Sara Roozbahani (09128884455)
  {
    id: 'msg-401',
    patientPhone: '09128884455',
    patientName: 'سارا روزبهانی',
    sender: 'patient',
    senderName: 'سارا روزبهانی',
    text: 'سلام وقت بخیر، نوبت من در انتظار تایید بیمارستان نیکان هست، آیا نیاز هست قبل از مراجعه آزمایش خاصی انجام بدم؟',
    timestamp: '2026-08-13T15:45:00Z',
    read: false,
    deliveryStatus: 'sent'
  }
];

export function getAllChatMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(CHAT_MESSAGES_KEY);
    if (!raw) {
      localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(INITIAL_SEED_CHATS));
      return INITIAL_SEED_CHATS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_SEED_CHATS;
  }
}

export function getMessagesForPatient(patientPhone: string): ChatMessage[] {
  const normalized = patientPhone.replace(/\D/g, '');
  const all = getAllChatMessages();
  return all
    .filter(m => m.patientPhone.replace(/\D/g, '') === normalized)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

export function getAllPatientThreads(): PatientThread[] {
  const allMessages = getAllChatMessages();
  const allAppointments = getAllAppointments();
  
  // Group messages by patient phone
  const grouped: Record<string, ChatMessage[]> = {};
  allMessages.forEach(msg => {
    const key = msg.patientPhone.replace(/\D/g, '');
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(msg);
  });

  // Ensure patients with appointments also appear even if zero chat messages yet
  allAppointments.forEach(appt => {
    const key = appt.patient_phone.replace(/\D/g, '');
    if (!grouped[key]) {
      grouped[key] = [];
    }
  });

  const threads: PatientThread[] = [];

  Object.entries(grouped).forEach(([phoneKey, msgs]) => {
    const matchingAppt = allAppointments.find(a => a.patient_phone.replace(/\D/g, '') === phoneKey);
    const sortedMsgs = msgs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    const lastMsg = sortedMsgs[sortedMsgs.length - 1];

    const patientName = lastMsg?.patientName || matchingAppt?.patient_name || 'مراجع محترم';
    const patientPhone = lastMsg?.patientPhone || matchingAppt?.patient_phone || phoneKey;
    const unreadCount = msgs.filter(m => m.sender === 'patient' && !m.read).length;

    const fallbackMsg: ChatMessage = {
      id: 'init-' + phoneKey,
      patientPhone,
      patientName,
      sender: 'patient',
      text: matchingAppt ? `نوبت ${matchingAppt.date} (${matchingAppt.time_slot}) ثبت شده است.` : 'شروع گفتگوی بالینی',
      timestamp: matchingAppt?.created_at || new Date().toISOString(),
      read: true,
      deliveryStatus: 'read'
    };

    threads.push({
      patientPhone,
      patientName,
      lastMessage: lastMsg || fallbackMsg,
      unreadCount,
      lastActivity: lastMsg?.timestamp || matchingAppt?.created_at || new Date().toISOString(),
      service: matchingAppt?.service,
      visitType: matchingAppt?.visit_type,
      statusBadge: matchingAppt?.status === 'confirmed' ? 'نوبت تایید شده' : matchingAppt?.status === 'pending_approval' ? 'در انتظار بررسی' : undefined,
      isOnline: Math.random() > 0.4
    });
  });

  return threads.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
}

export function sendChatMessage(data: {
  patientPhone: string;
  patientName: string;
  sender: 'doctor' | 'patient';
  senderName?: string;
  text: string;
  attachmentType?: 'prescription' | 'lab_report' | 'voice_note' | 'clinical_guide';
  attachmentTitle?: string;
  attachmentData?: string;
  voiceDurationSeconds?: number;
}): ChatMessage {
  const all = getAllChatMessages();
  const newMsg: ChatMessage = {
    id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    patientPhone: data.patientPhone,
    patientName: data.patientName,
    sender: data.sender,
    senderName: data.senderName || (data.sender === 'doctor' ? 'دکتر فاطمه مومنی' : data.patientName),
    text: data.text,
    timestamp: new Date().toISOString(),
    read: false,
    deliveryStatus: 'sent', // Starts with single tick
    attachmentType: data.attachmentType,
    attachmentTitle: data.attachmentTitle,
    attachmentData: data.attachmentData,
    voiceDurationSeconds: data.voiceDurationSeconds,
    reactions: []
  };

  all.push(newMsg);
  localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(all));

  // Trigger immediate event
  try {
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('dr_chat_update', { detail: { patientPhone: data.patientPhone } }));
  } catch (e) {}

  // Realistic server-delivery heartbeat simulation (Transitions from single tick 'sent' to double tick 'delivered' after 600ms)
  setTimeout(() => {
    const currentMsgs = getAllChatMessages();
    const target = currentMsgs.find(m => m.id === newMsg.id);
    if (target && target.deliveryStatus === 'sent') {
      target.deliveryStatus = 'delivered';
      localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(currentMsgs));
      try {
        window.dispatchEvent(new CustomEvent('dr_chat_update', { detail: { patientPhone: data.patientPhone } }));
      } catch (e) {}
    }
  }, 600);

  return newMsg;
}

export function markThreadAsRead(patientPhone: string): void {
  const normalized = patientPhone.replace(/\D/g, '');
  const all = getAllChatMessages();
  let modified = false;

  all.forEach(msg => {
    if (msg.patientPhone.replace(/\D/g, '') === normalized && msg.sender === 'patient' && !msg.read) {
      msg.read = true;
      msg.deliveryStatus = 'read'; // Turns into colored double tick
      modified = true;
    }
  });

  if (modified) {
    localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(all));
    try {
      window.dispatchEvent(new CustomEvent('dr_chat_update', { detail: { patientPhone } }));
    } catch (e) {}
  }
}

export function toggleMessageReaction(
  messageId: string, 
  emoji: string, 
  by: 'doctor' | 'patient', 
  name?: string
): boolean {
  const all = getAllChatMessages();
  const target = all.find(m => m.id === messageId);
  if (!target) return false;

  if (!target.reactions) {
    target.reactions = [];
  }

  const existingIdx = target.reactions.findIndex(r => r.by === by && r.emoji === emoji);

  if (existingIdx >= 0) {
    // Remove reaction if already toggled
    target.reactions.splice(existingIdx, 1);
  } else {
    // Remove any previous reaction by the same sender, and replace with new emoji
    target.reactions = target.reactions.filter(r => r.by !== by);
    target.reactions.push({
      emoji,
      by,
      name: name || (by === 'doctor' ? 'دکتر فاطمه مومنی' : target.patientName),
      at: new Date().toISOString()
    });
  }

  localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(all));
  try {
    window.dispatchEvent(new CustomEvent('dr_chat_update', { detail: { patientPhone: target.patientPhone } }));
  } catch (e) {}

  return true;
}

export function editChatMessage(messageId: string, newText: string): boolean {
  const all = getAllChatMessages();
  const target = all.find(m => m.id === messageId);
  if (!target) return false;

  target.text = newText;
  target.editedAt = new Date().toISOString();

  localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(all));
  try {
    window.dispatchEvent(new CustomEvent('dr_chat_update', { detail: { patientPhone: target.patientPhone } }));
  } catch (e) {}

  return true;
}

export function deleteChatMessage(id: string): boolean {
  const all = getAllChatMessages();
  const target = all.find(m => m.id === id);
  const filtered = all.filter(m => m.id !== id);
  if (filtered.length !== all.length) {
    localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(filtered));
    try {
      window.dispatchEvent(new CustomEvent('dr_chat_update', { detail: { patientPhone: target?.patientPhone } }));
    } catch (e) {}
    return true;
  }
  return false;
}
