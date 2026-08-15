/**
 * Project Inquiry Store & Dispatcher
 * 
 * Manages project requests, quotation orders, and instant Telegram/Email 
 * pre-filled message generation for potential clients, doctors, and medical centers.
 * 
 * Follows Google TypeScript style conventions.
 */

export interface ProjectInquiry {
  id: string;
  clientName: string;
  clientRole: 'doctor' | 'clinic' | 'hospital' | 'startup' | 'enterprise' | 'personal' | 'other';
  specialtyOrBusiness?: string;
  projectCategory: string;
  selectedFeatures: string[];
  timeline: string;
  budgetRange: string;
  description: string;
  phone: string;
  email?: string;
  telegramUsername?: string;
  preferredContact: 'telegram' | 'email' | 'phone';
  createdAt: string;
  status: 'new' | 'in_review' | 'contacted';
}

const INQUIRY_STORAGE_KEY = 'momeni_developer_project_inquiries_v1';

/**
 * Retrieves all saved project inquiries from localStorage.
 */
export function getSavedInquiries(): ProjectInquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRY_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse inquiries:', err);
    return [];
  }
}

/**
 * Saves a new project quotation request to local storage.
 */
export function saveProjectInquiry(inquiry: Omit<ProjectInquiry, 'id' | 'createdAt' | 'status'>): ProjectInquiry {
  const newRecord: ProjectInquiry = {
    ...inquiry,
    id: `INQ-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  try {
    const current = getSavedInquiries();
    const updated = [newRecord, ...current];
    localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save inquiry:', err);
  }

  return newRecord;
}

/**
 * Generates a pre-formatted Telegram link for rapid dispatch.
 */
export function generateTelegramInquiryUrl(inquiry: Partial<ProjectInquiry>): string {
  const telegramUsername = 'mohammad_hussein_dev';
  const textLines = [
    `🌟 *درخواست استعلام و ساخت پروژه نرم‌افزاری*`,
    `👤 *کارفرما:* ${inquiry.clientName || 'نامشخص'} (${inquiry.specialtyOrBusiness || inquiry.clientRole || 'کارفرما'})`,
    `📌 *نوع پروژه:* ${inquiry.projectCategory || 'سامانه اختصاصی'}`,
    `⚡ *امکانات مدنظر:* ${inquiry.selectedFeatures?.join('، ') || 'مشاوره فنی'}`,
    `⏳ *زمان‌بندی:* ${inquiry.timeline || 'عادی'}`,
    `💰 *بازه بودجه:* ${inquiry.budgetRange || 'بر اساس تحلیل نیازها'}`,
    `📞 *شماره تماس کارفرما:* ${inquiry.phone || 'ثبت نشده'}`,
    `📧 *ایمیل:* ${inquiry.email || '-'}`,
    `💬 *روش تماس ترجیحی:* ${inquiry.preferredContact || 'تلگرام'}`,
    `📝 *توضیحات:* ${inquiry.description || 'درخواست برآورد زمان و هزینه پروژه'}`,
    `🔗 ارجاع مستقیم از وبسایت دکتر فاطمه مومنی`
  ];
  const text = encodeURIComponent(textLines.join('\n'));
  return `https://t.me/${telegramUsername}?text=${text}`;
}

/**
 * Generates a pre-formatted email mailto link for direct inquiry dispatch.
 */
export function generateEmailInquiryUrl(inquiry: Partial<ProjectInquiry>): string {
  const developerEmail = 'king.mohamd.09876@gmail.com';
  const subject = encodeURIComponent(`[Project Inquiry] ${inquiry.projectCategory || 'Software Project'} - ${inquiry.clientName || 'Client'}`);
  const body = encodeURIComponent(
    `Dear Mohammad Hussein,\n\nI would like to request a project quotation and technical consultation:\n\n` +
    `- Name / Organization: ${inquiry.clientName || ''} (${inquiry.specialtyOrBusiness || inquiry.clientRole || ''})\n` +
    `- Project Category: ${inquiry.projectCategory || ''}\n` +
    `- Selected Modules: ${inquiry.selectedFeatures?.join(', ') || ''}\n` +
    `- Timeline: ${inquiry.timeline || ''}\n` +
    `- Estimated Budget: ${inquiry.budgetRange || ''}\n` +
    `- Phone: ${inquiry.phone || ''}\n` +
    `- Preferred Contact: ${inquiry.preferredContact || 'Email'}\n\n` +
    `Project Details / Requirements:\n${inquiry.description || ''}\n\n` +
    `Sent from Dr. Fatemeh Momeni Medical Web Platform`
  );
  return `mailto:${developerEmail}?subject=${subject}&body=${body}`;
}
