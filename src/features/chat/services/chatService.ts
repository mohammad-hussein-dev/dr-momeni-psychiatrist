import { ChatMessage, PatientThread, ServiceType, VisitType, MessageReaction, MessageDeliveryStatus } from '../../../types';
import { safeStorage } from '../../../services/storage/storageService';
import { appointmentService } from '../../appointments/services/appointmentService';

export const CHAT_MESSAGES_KEY = 'dr_patient_chat_messages';

const INITIAL_SEED_CHATS: ChatMessage[] = [
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
    deliveryStatus: 'delivered'
  }
];

export const chatService = {
  getAllMessages(): ChatMessage[] {
    const list = safeStorage.get<ChatMessage[]>(CHAT_MESSAGES_KEY, []);
    if (!Array.isArray(list) || list.length === 0) {
      safeStorage.set(CHAT_MESSAGES_KEY, INITIAL_SEED_CHATS);
      return INITIAL_SEED_CHATS;
    }
    return list;
  },

  getMessagesByPhone(patientPhone: string): ChatMessage[] {
    const cleaned = patientPhone.replace(/[^0-9]/g, '');
    const all = this.getAllMessages();
    return all.filter(m => m.patientPhone.replace(/[^0-9]/g, '') === cleaned);
  },

  sendChatMessage(params: {
    patientPhone: string;
    patientName?: string;
    sender: 'doctor' | 'patient';
    senderName?: string;
    text: string;
    attachmentType?: ChatMessage['attachmentType'];
    attachmentTitle?: string;
    attachmentData?: string;
    voiceDurationSeconds?: number;
  }): ChatMessage {
    const messages = this.getAllMessages();
    const cleanPhone = params.patientPhone.replace(/[^0-9]/g, '');
    
    let resolvedPatientName = params.patientName;
    if (!resolvedPatientName) {
      const existingMsg = messages.find(m => m.patientPhone.replace(/[^0-9]/g, '') === cleanPhone);
      resolvedPatientName = existingMsg?.patientName || 'مراجع گرامی';
    }

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      patientPhone: cleanPhone,
      patientName: resolvedPatientName,
      sender: params.sender,
      senderName: params.senderName || (params.sender === 'doctor' ? 'دکتر فاطمه مومنی' : resolvedPatientName),
      text: params.text.trim(),
      timestamp: new Date().toISOString(),
      read: params.sender === 'doctor',
      deliveryStatus: 'sent',
      attachmentType: params.attachmentType,
      attachmentTitle: params.attachmentTitle,
      attachmentData: params.attachmentData,
      voiceDurationSeconds: params.voiceDurationSeconds
    };

    const updated = [...messages, newMessage];
    safeStorage.set(CHAT_MESSAGES_KEY, updated, 'chat_messages_updated');
    return newMessage;
  },

  markMessagesAsRead(patientPhone: string, reader: 'doctor' | 'patient'): void {
    const cleanPhone = patientPhone.replace(/[^0-9]/g, '');
    const messages = this.getAllMessages();
    let changed = false;

    const updated = messages.map(msg => {
      if (msg.patientPhone.replace(/[^0-9]/g, '') === cleanPhone) {
        if ((reader === 'doctor' && msg.sender === 'patient' && !msg.read) ||
            (reader === 'patient' && msg.sender === 'doctor' && !msg.read)) {
          changed = true;
          return { ...msg, read: true, deliveryStatus: 'read' as MessageDeliveryStatus };
        }
      }
      return msg;
    });

    if (changed) {
      safeStorage.set(CHAT_MESSAGES_KEY, updated, 'chat_messages_updated');
    }
  },

  toggleMessageReaction(messageId: string, emoji: string, by: 'doctor' | 'patient', name?: string): boolean {
    const messages = this.getAllMessages();
    const idx = messages.findIndex(m => m.id === messageId);
    if (idx === -1) return false;

    const msg = messages[idx];
    const reactions = msg.reactions || [];
    const existingIdx = reactions.findIndex(r => r.emoji === emoji && r.by === by);

    if (existingIdx !== -1) {
      reactions.splice(existingIdx, 1);
    } else {
      reactions.push({
        emoji,
        by,
        name: name || (by === 'doctor' ? 'دکتر فاطمه مومنی' : 'بیمار'),
        at: new Date().toISOString()
      });
    }

    messages[idx] = { ...msg, reactions };
    safeStorage.set(CHAT_MESSAGES_KEY, messages, 'chat_messages_updated');
    return true;
  },

  editChatMessage(messageId: string, newText: string): boolean {
    const messages = this.getAllMessages();
    const idx = messages.findIndex(m => m.id === messageId);
    if (idx === -1) return false;

    messages[idx] = {
      ...messages[idx],
      text: newText.trim(),
      editedAt: new Date().toISOString()
    };

    safeStorage.set(CHAT_MESSAGES_KEY, messages, 'chat_messages_updated');
    return true;
  },

  deleteChatMessage(messageId: string): boolean {
    const messages = this.getAllMessages();
    const filtered = messages.filter(m => m.id !== messageId);
    if (filtered.length !== messages.length) {
      safeStorage.set(CHAT_MESSAGES_KEY, filtered, 'chat_messages_updated');
      return true;
    }
    return false;
  },

  getPatientThreads(): PatientThread[] {
    const messages = this.getAllMessages();
    const appointments = appointmentService.getAllAppointments();
    const threadMap = new Map<string, PatientThread>();

    const sortedMessages = [...messages].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    for (const msg of sortedMessages) {
      const phone = msg.patientPhone.replace(/[^0-9]/g, '');
      const existing = threadMap.get(phone);

      const unreadIncrement = (!msg.read && msg.sender === 'patient') ? 1 : 0;

      if (!existing) {
        const appt = appointments.find(a => a.patient_phone.replace(/[^0-9]/g, '') === phone);
        threadMap.set(phone, {
          patientPhone: phone,
          patientName: msg.patientName || appt?.patient_name || 'مراجع',
          lastMessage: msg,
          unreadCount: unreadIncrement,
          lastActivity: msg.timestamp,
          service: appt?.service,
          visitType: appt?.visit_type,
          statusBadge: appt ? (appt.status === 'confirmed' ? 'نوبت تایید شده' : 'در انتظار بررسی') : undefined,
          isOnline: Math.random() > 0.4
        });
      } else {
        existing.lastMessage = msg;
        existing.lastActivity = msg.timestamp;
        existing.unreadCount += unreadIncrement;
        if (msg.patientName) {
          existing.patientName = msg.patientName;
        }
      }
    }

    return Array.from(threadMap.values()).sort(
      (a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
    );
  },

  resetChatsToDefaults(): ChatMessage[] {
    safeStorage.set(CHAT_MESSAGES_KEY, INITIAL_SEED_CHATS, 'chat_messages_updated');
    return INITIAL_SEED_CHATS;
  }
};
