import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Building2,
  Video,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  ShieldCheck,
  Phone,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Send,
  MessageSquare,
  FileText,
  Activity,
  CreditCard,
  RefreshCw,
  LogOut,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Check,
  Lock,
  ArrowRight,
  ArrowLeft,
  X,
  Printer,
  Download,
  Plus,
  Settings,
  Pill,
  Users,
  Mic,
  CalendarDays,
  BadgeCheck,
  BookOpen,
  Heart,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/LanguageProvider';
import { serviceKeys } from '../i18n/translations';
import { Reveal } from '../components/Reveal';
import { DoctorPatientChat } from '../components/chat/DoctorPatientChat';
import {
  Appointment,
  AppointmentStatus,
  PaymentStatus,
  ServiceType,
  VisitType,
  UserSession,
  BlogPost,
  Testimonial
} from '../types';
import {
  getAllAppointments,
  updateAppointmentStatus,
  updateAppointmentDetails,
  deleteAppointment,
  getActiveSession,
  saveSession,
  clearSession,
  getNextAvailableWorkDays,
  SLOTS,
  DOCTOR_ADMIN_PHONES
} from '../lib/appointmentStore';
import { sendChatMessage } from '../lib/chatStore';
import { getAllPosts, deletePost } from '../lib/blogStore';
import { getAllTestimonials, deleteTestimonial, toggleTestimonialVerified } from '../lib/testimonialsStore';
import { ArticleEditorModal } from '../components/admin/ArticleEditorModal';
import { TestimonialEditorModal } from '../components/admin/TestimonialEditorModal';
import { ShadowAvatar } from '../components/ShadowAvatar';

export const AdminPanel: React.FC = () => {
  const { t, lang, isRTL } = useLanguage();
  const isFa = lang === 'fa';
  const navigate = useNavigate();

  // Auth & Session
  const [session, setSession] = useState<UserSession | null>(() => getActiveSession());
  const [phoneInput, setPhoneInput] = useState<string>('09121112233');
  const [otpStage, setOtpStage] = useState<'phone' | 'otp'>('phone');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [otpInput, setOtpInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Primary Active Tab in Doctor Dashboard
  const [activeTab, setActiveTab] = useState<'visits' | 'chat' | 'prescription' | 'articles' | 'testimonials' | 'schedule'>('visits');

  // Content Management States (Blog & Testimonials)
  const [posts, setPosts] = useState<BlogPost[]>(() => getAllPosts());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => getAllTestimonials());
  const [articleSearch, setArticleSearch] = useState<string>('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState<string>('all');
  const [testimonialCategoryFilter, setTestimonialCategoryFilter] = useState<string>('all');
  const [testimonialSearch, setTestimonialSearch] = useState<string>('');
  const [isArticleModalOpen, setIsArticleModalOpen] = useState<boolean>(false);
  const [editingArticle, setEditingArticle] = useState<BlogPost | null>(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState<boolean>(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // Appointments Data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [visitTypeFilter, setVisitTypeFilter] = useState<string>('all');
  
  // Selected Appointment for Modal
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'reschedule' | 'cancel_reason'>('view');
  const [doctorNoteDraft, setDoctorNoteDraft] = useState<string>('');
  const [rejectionReasonDraft, setRejectionReasonDraft] = useState<string>('');
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [rescheduleSlot, setRescheduleSlot] = useState<string>('');
  
  // Prescription Writer State
  const [rxPatientPhone, setRxPatientPhone] = useState<string>('09123456789');
  const [rxPatientName, setRxPatientName] = useState<string>('مریم احمدی');
  const [rxDiagnosis, setRxDiagnosis] = useState<string>('اختلال افسردگی اساسی (MDD) و اضطراب فراگیر');
  const [rxItems, setRxItems] = useState<Array<{ name: string; dose: string; instructions: string }>>([
    { name: 'قرص سرترالین (Sertraline)', dose: '50mg', instructions: 'یک عدد بعد از صبحانه' },
    { name: 'قرص کلونازپام (Clonazepam)', dose: '0.5mg', instructions: 'نصف قرص قبل از خواب در صورت اضطراب شدید' }
  ]);
  const [rxNewMedName, setRxNewMedName] = useState<string>('');
  const [rxNewMedDose, setRxNewMedDose] = useState<string>('');
  const [rxNewMedInstructions, setRxNewMedInstructions] = useState<string>('');
  const [rxSuccessMsg, setRxSuccessMsg] = useState<string>('');

  // Clinic Schedule Controls State
  const [hospitalActive, setHospitalActive] = useState<boolean>(true);
  const [teleActive, setTeleActive] = useState<boolean>(true);
  const [maxDailySlots, setMaxDailySlots] = useState<number>(8);
  const [blockedDates, setBlockedDates] = useState<string[]>(['2026-08-25']);

  // Simulated SMS Toast State
  const [smsToast, setSmsToast] = useState<{ show: boolean; to: string; message: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  const availableDays = useMemo(() => getNextAvailableWorkDays(14), []);

  const loadData = () => {
    setAppointments(getAllAppointments());
    setPosts(getAllPosts());
    setTestimonials(getAllTestimonials());
  };

  useEffect(() => {
    loadData();

    const handleBlogUpdate = () => setPosts(getAllPosts());
    const handleTestimonialUpdate = () => setTestimonials(getAllTestimonials());

    window.addEventListener('blog_posts_updated', handleBlogUpdate);
    window.addEventListener('testimonials_updated', handleTestimonialUpdate);

    return () => {
      window.removeEventListener('blog_posts_updated', handleBlogUpdate);
      window.removeEventListener('testimonials_updated', handleTestimonialUpdate);
    };
  }, []);

  // Sync session state
  useEffect(() => {
    const active = getActiveSession();
    setSession(active);
  }, []);

  const isDoctorOrAdmin = session?.role === 'doctor_admin';

  // --- Auth Handlers ---
  const handleSendAdminOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phoneInput.replace(/\D/g, '');
    if (clean.length < 10) {
      setAuthError(isFa ? 'لطفاً شماره همراه معتبر وارد نمایید.' : 'Please enter a valid mobile number.');
      return;
    }
    setAuthError('');
    const code = '5432';
    setGeneratedOtp(code);
    setOtpStage('otp');
  };

  const handleVerifyAdminOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.trim() === generatedOtp || otpInput.trim() === '5432' || otpInput.trim() === '1234') {
      const newSession: UserSession = {
        phone: phoneInput,
        name: 'دکتر فاطمه مومنی',
        role: 'doctor_admin',
        token: 'admin_token_' + Date.now(),
        loggedInAt: new Date().toISOString()
      };
      saveSession(newSession);
      setSession(newSession);
      setAuthError('');
      loadData();
    } else {
      setAuthError(isFa ? 'کد تایید وارد شده اشتباه است.' : 'Invalid verification code.');
    }
  };

  const handleQuickDoctorLogin = () => {
    const newSession: UserSession = {
      phone: '09121112233',
      name: 'دکتر فاطمه مومنی (متخصص اعصاب و روان)',
      role: 'doctor_admin',
      token: 'admin_quick_' + Date.now(),
      loggedInAt: new Date().toISOString()
    };
    saveSession(newSession);
    setSession(newSession);
    loadData();
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setOtpStage('phone');
    setOtpInput('');
  };

  // --- Appointment Action Handlers ---
  const showSmsNotification = (to: string, msg: string) => {
    setSmsToast({ show: true, to, message: msg });
    setTimeout(() => {
      setSmsToast(null);
    }, 6000);
  };

  const handleConfirmAppointment = (appt: Appointment) => {
    const updated = updateAppointmentStatus(appt.id, 'confirmed');
    if (updated) {
      loadData();
      if (selectedAppt?.id === appt.id) {
        setSelectedAppt(updated);
      }
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}

      const isOnline = appt.visit_type === 'online';
      const msg = isFa 
        ? `مراجع محترم ${appt.patient_name}، نوبت شما نزد دکتر فاطمه مومنی در تاریخ ${appt.date} ساعت ${appt.time_slot} (${isOnline ? 'مشاوره آنلاین' : 'حضوری بیمارستان نیکان غرب'}) تایید شد.`
        : `Dear ${appt.patient_name}, your consultation with Dr. Fatemeh Momeni on ${appt.date} at ${appt.time_slot} has been confirmed.`;
      
      showSmsNotification(appt.patient_phone, msg);
    }
  };

  const handleCompleteAppointment = (appt: Appointment) => {
    const updated = updateAppointmentStatus(appt.id, 'completed');
    if (updated) {
      loadData();
      if (selectedAppt?.id === appt.id) {
        setSelectedAppt(updated);
      }
      setToastMessage(isFa ? 'نوبت به عنوان انجام‌شده ثبت شد.' : 'Appointment marked as completed.');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleCancelWithReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppt) return;
    const reason = rejectionReasonDraft.trim() || (isFa ? 'تداخل با برنامه اتاق عمل / لزوم هماهنگی مجدد' : 'Schedule conflict / Reschedule needed');
    const updated = updateAppointmentStatus(selectedAppt.id, 'cancelled', reason);
    if (updated) {
      loadData();
      setSelectedAppt(updated);
      setModalMode('view');
      const msg = isFa 
        ? `مراجع محترم ${selectedAppt.patient_name}، نوبت شما به علت "${reason}" لغو گردید. لطفاً جهت انتخاب زمان جدید با مطب تماس حاصل فرمایید.`
        : `Dear ${selectedAppt.patient_name}, your appointment was cancelled due to: ${reason}.`;
      showSmsNotification(selectedAppt.patient_phone, msg);
    }
  };

  const handleSaveReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppt || !rescheduleDate || !rescheduleSlot) return;
    const updated = updateAppointmentDetails(selectedAppt.id, {
      date: rescheduleDate,
      time_slot: rescheduleSlot,
      status: 'confirmed'
    });
    if (updated) {
      loadData();
      setSelectedAppt(updated);
      setModalMode('view');
      const msg = isFa
        ? `مراجع محترم ${selectedAppt.patient_name}، زمان نوبت شما به تاریخ ${rescheduleDate} ساعت ${rescheduleSlot} تغییر یافت و تایید شد.`
        : `Dear ${selectedAppt.patient_name}, your appointment was rescheduled to ${rescheduleDate} at ${rescheduleSlot}.`;
      showSmsNotification(selectedAppt.patient_phone, msg);
    }
  };

  const handleSaveDoctorNotes = () => {
    if (!selectedAppt) return;
    const updated = updateAppointmentDetails(selectedAppt.id, {
      doctor_notes: doctorNoteDraft
    });
    if (updated) {
      loadData();
      setSelectedAppt(updated);
      setToastMessage(isFa ? 'یادداشت بالینی با موفقیت ذخیره شد.' : 'Clinical notes updated.');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleUpdatePaymentStatus = (payment_status: PaymentStatus) => {
    if (!selectedAppt) return;
    const updated = updateAppointmentDetails(selectedAppt.id, { payment_status });
    if (updated) {
      loadData();
      setSelectedAppt(updated);
    }
  };

  const handleDeleteAppt = (id: string) => {
    if (window.confirm(isFa ? 'آیا از حذف کامل این رکورد از دیتابیس اطمینان دارید؟' : 'Are you sure you want to delete this record?')) {
      deleteAppointment(id);
      loadData();
      setSelectedAppt(null);
    }
  };

  const openApptModal = (appt: Appointment) => {
    setSelectedAppt(appt);
    setDoctorNoteDraft(appt.doctor_notes || '');
    setRejectionReasonDraft(appt.rejection_reason || '');
    setRescheduleDate(appt.date);
    setRescheduleSlot(appt.time_slot);
    setModalMode('view');
  };

  const getServiceName = (key: ServiceType) => {
    const item = serviceKeys.find(s => s.key === key);
    return item ? t(item.titleKey) : key;
  };

  // Prescription Handlers
  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rxNewMedName.trim()) return;
    setRxItems([
      ...rxItems,
      {
        name: rxNewMedName.trim(),
        dose: rxNewMedDose.trim() || 'طبق دستور',
        instructions: rxNewMedInstructions.trim() || 'روزانه بعد از غذا'
      }
    ]);
    setRxNewMedName('');
    setRxNewMedDose('');
    setRxNewMedInstructions('');
  };

  const handleRemoveMedication = (idx: number) => {
    setRxItems(rxItems.filter((_, i) => i !== idx));
  };

  const handleDispatchRxToChat = () => {
    if (!rxPatientPhone) return;
    const summary = rxItems.map(m => `• ${m.name} (${m.dose}) - ${m.instructions}`).join('\n');
    sendChatMessage({
      patientPhone: rxPatientPhone,
      patientName: rxPatientName,
      sender: 'doctor',
      text: `نسخه الکترونیک رسمی صادر شد:\nتشخیص: ${rxDiagnosis}\n\nاقلام دارویی:\n${summary}\n\nنظام پزشکی: ۱۳۳۴۳۹ - دکتر فاطمه مومنی`,
      attachmentType: 'prescription',
      attachmentTitle: `نسخه_دارویی_${rxPatientName.replace(/\s+/g, '_')}.pdf`
    });

    setRxSuccessMsg(isFa ? 'نسخه الکترونیک صادر و مستقیماً به چت بیمار ارسال شد.' : 'E-Prescription issued and dispatched to patient chat.');
    setTimeout(() => setRxSuccessMsg(''), 4000);
  };

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter(a => {
      const matchSearch = 
        a.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.patient_phone.includes(searchQuery) ||
        (a.patient_national_id && a.patient_national_id.includes(searchQuery));
      
      const matchStatus = statusFilter === 'all' || a.status === statusFilter;
      const matchType = visitTypeFilter === 'all' || a.visit_type === visitTypeFilter;

      return matchSearch && matchStatus && matchType;
    });
  }, [appointments, searchQuery, statusFilter, visitTypeFilter]);

  // Statistics
  const pendingCount = appointments.filter(a => a.status === 'pending_approval').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const inPersonCount = appointments.filter(a => a.visit_type === 'in_person').length;
  const onlineCount = appointments.filter(a => a.visit_type === 'online').length;

  return (
    <div className="pt-20 sm:pt-28 pb-16 min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SMS Notification Banner Simulator */}
        {smsToast && (
          <div className="fixed bottom-6 right-6 left-6 sm:left-auto sm:max-w-md z-50 p-4 rounded-2xl bg-card border border-primary/40 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {isFa ? 'شبیه‌ساز پیامک سامانه هوشمند' : 'SMS Gateway Simulator'}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono" dir="ltr">{smsToast.to}</span>
                </div>
                <p className="text-xs text-foreground/90 mt-1 leading-relaxed bg-muted/40 p-2.5 rounded-xl border border-border/50 font-sans">
                  {smsToast.message}
                </p>
              </div>
              <button onClick={() => setSmsToast(null)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-24 start-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-emerald-950 text-emerald-200 border border-emerald-700/50 shadow-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 1. NOT LOGGED IN AS ADMIN: DOCTOR / CLINIC AUTH SCREEN */}
        {/* ========================================================================= */}
        {!isDoctorOrAdmin ? (
          <Reveal className="max-w-md mx-auto">
            <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 shadow-xl text-center">
              
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>{isFa ? 'پنل اختصاصی پزشک و مدیریت' : 'Doctor & Clinic Admin Portal'}</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-2">
                {isFa ? 'ورود به پنل مدیریت دکتر فاطمه مومنی' : 'Dr. Momeni Admin Login'}
              </h1>
              
              <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
                {isFa ? 'جهت بررسی ویزیت‌ها، پرونده‌های بالینی، گفتگوی مستقیم با مراجعین و نسخه‌نویسی' : 'Manage patient visits, clinical files, secure chat, and e-prescriptions.'}
              </p>

              {/* Quick Demo Access Bar */}
              <div className="mb-6 p-3.5 rounded-2xl bg-accent/40 border border-primary/20 text-start">
                <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isFa ? 'ورود یک‌کلیکه پزشک (تست سریع):' : 'One-Click Doctor Login:'}</span>
                </p>
                <p className="text-[11px] text-muted-foreground mb-2.5">
                  {isFa ? 'ورود مستقیم و بدون وقفه به عنوان دکتر فاطمه مومنی:' : 'Click below to access Dr. Momeni’s full workspace:'}
                </p>
                <button
                  type="button"
                  onClick={handleQuickDoctorLogin}
                  className="w-full py-2.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-2 hover:opacity-95 shadow-xs transition-all cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{isFa ? 'ورود مستقیم به عنوان دکتر فاطمه مومنی' : 'Enter as Dr. Fatemeh Momeni'}</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-border w-full" />
                <span className="bg-card px-3 text-[11px] text-muted-foreground font-medium uppercase">{isFa ? 'یا ورود با پیامک OTP' : 'Or via SMS OTP'}</span>
              </div>

              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-center gap-2 text-start">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {otpStage === 'phone' ? (
                <form onSubmit={handleSendAdminOtp} className="space-y-4">
                  <div className="text-start">
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      {isFa ? 'شماره موبایل مدیریت / پزشک' : 'Admin / Doctor Mobile Number'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="09121112233"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm btn-soft-glow hover:opacity-95 transition-all shadow-md cursor-pointer"
                  >
                    {isFa ? 'دریافت کد تایید پیامکی (OTP)' : 'Send Verification OTP'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyAdminOtp} className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-accent/60 border border-primary/20 text-center">
                    <p className="text-xs text-muted-foreground">{isFa ? 'کد شبیه‌سازی شده پیامک مدیریت:' : 'Simulated Admin OTP:'}</p>
                    <p className="text-2xl font-heading font-bold text-primary tracking-[0.35em] mt-1" dir="ltr">
                      {generatedOtp}
                    </p>
                  </div>

                  <div className="text-start">
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      {isFa ? 'کد ۴ رقمی پیامک شده' : 'Enter 4-Digit OTP'}
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      autoFocus
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="••••"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground text-xl font-mono text-center tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm btn-soft-glow hover:opacity-95 transition-all shadow-md cursor-pointer"
                  >
                    {isFa ? 'ورود به پنل مدیریت' : 'Verify & Enter Dashboard'}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setOtpStage('phone'); setOtpInput(''); }}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors block mx-auto pt-2 cursor-pointer"
                  >
                    {isFa ? 'تغییر شماره موبایل' : 'Change Mobile Number'}
                  </button>
                </form>
              )}

              <div className="mt-6 pt-5 border-t border-border/60 text-center">
                <Link to="/panel" className="text-xs text-primary hover:underline font-medium">
                  {isFa ? 'ورود به پنل مراجعین و رزرو نوبت بیمار' : 'Switch to Patient Portal'}
                </Link>
              </div>

            </div>
          </Reveal>
        ) : (

        /* ========================================================================= */
        /* 2. LOGGED IN FULL DOCTOR WORKSPACE */
        /* ========================================================================= */
          <div className="space-y-5">
            
            {/* Top Bar / Header */}
            <div className="rounded-3xl bg-card border border-border/80 p-4 sm:p-5 shadow-xs">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4">
                
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-sm font-bold shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h1 className="font-heading font-bold text-base sm:text-lg text-foreground">
                        {isFa ? 'سامانه بالینی و مدیریت مطب دکتر فاطمه مومنی' : 'Dr. Fatemeh Momeni Clinical Portal'}
                      </h1>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/15 text-primary border border-primary/25">
                        {isFa ? 'نظام پزشکی: ۱۳۶۸۸۲' : 'M.D. 136882'}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {isFa ? 'کلینیک اعصاب و روان بیمارستان نیکان غرب • ویزیت‌های حضوری و آنلاین' : 'Nikan West Hospital Psychiatry Clinic & Tele-psychiatry.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-stretch lg:self-auto justify-end shrink-0">
                  <Link
                    to="/panel"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border text-xs font-medium text-foreground hover:text-primary hover:bg-accent/40 transition-all"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{isFa ? 'نمای مراجع' : 'Patient View'}</span>
                  </Link>

                  <button
                    onClick={loadData}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all cursor-pointer"
                    title={isFa ? 'بروزرسانی داده‌ها' : 'Refresh'}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isFa ? 'بروزرسانی' : 'Refresh'}</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-destructive/30 text-xs font-medium text-destructive hover:bg-destructive/10 transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{isFa ? 'خروج' : 'Logout'}</span>
                  </button>
                </div>

              </div>

              {/* Compact Workspace Navigation Tabs - Perfectly fitted in a 6-col responsive grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2 mt-4 pt-3.5 border-t border-border/60">
                
                <button
                  onClick={() => setActiveTab('visits')}
                  className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    activeTab === 'visits'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{isFa ? 'مدیریت ویزیت‌ها' : 'Visits'}</span>
                  {pendingCount > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono shrink-0 ${
                      activeTab === 'visits' ? 'bg-black/20 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {pendingCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    activeTab === 'chat'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 text-sky-500" />
                  <span className="truncate">{isFa ? 'چت با مراجعین' : 'Chat'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                </button>

                <button
                  onClick={() => setActiveTab('prescription')}
                  className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    activeTab === 'prescription'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Pill className="w-3.5 h-3.5 shrink-0 text-indigo-500" />
                  <span className="truncate">{isFa ? 'نسخه‌نویسی آنلاین' : 'Rx & Files'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('articles')}
                  className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    activeTab === 'articles'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                  <span className="truncate">{isFa ? 'مقالات علمی' : 'Articles'}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                    {posts.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('testimonials')}
                  className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    activeTab === 'testimonials'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                  <span className="truncate">{isFa ? 'نظرات و تجارب' : 'Reviews'}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-rose-500/20 text-rose-700 dark:text-rose-300 shrink-0">
                    {testimonials.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    activeTab === 'schedule'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                  <span className="truncate">{isFa ? 'زمان‌بندی مطب' : 'Schedule'}</span>
                </button>

              </div>

            </div>

            {/* ========================================================================= */}
            {/* TAB 1: VISITS & BOOKINGS MANAGEMENT */}
            {/* ========================================================================= */}
            {activeTab === 'visits' && (
              <div className="space-y-4 sm:space-y-5">
                
                {/* KPI Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium text-amber-700 dark:text-amber-300">{isFa ? 'در انتظار تایید پزشک' : 'Pending Approval'}</p>
                      <p className="text-xl sm:text-2xl font-heading font-extrabold text-amber-800 dark:text-amber-200 mt-0.5">{pendingCount}</p>
                    </div>
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 opacity-80 shrink-0" />
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">{isFa ? 'تایید شده فعال' : 'Confirmed Active'}</p>
                      <p className="text-xl sm:text-2xl font-heading font-extrabold text-emerald-800 dark:text-emerald-200 mt-0.5">{confirmedCount}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 opacity-80 shrink-0" />
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium text-sky-700 dark:text-sky-300">{isFa ? 'ویزیت‌های حضوری (نیکان)' : 'In-Person (Nikan)'}</p>
                      <p className="text-xl sm:text-2xl font-heading font-extrabold text-sky-800 dark:text-sky-200 mt-0.5">{inPersonCount}</p>
                    </div>
                    <Building2 className="w-5 h-5 text-sky-600 dark:text-sky-400 opacity-80 shrink-0" />
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium text-purple-700 dark:text-purple-300">{isFa ? 'مشاوره آنلاین تصویری' : 'Tele-Psychiatry'}</p>
                      <p className="text-xl sm:text-2xl font-heading font-extrabold text-purple-800 dark:text-purple-200 mt-0.5">{onlineCount}</p>
                    </div>
                    <Video className="w-5 h-5 text-purple-600 dark:text-purple-400 opacity-80 shrink-0" />
                  </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="rounded-2xl bg-card border border-border/80 p-3 sm:p-4 shadow-2xs space-y-3">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={isFa ? 'جستجو بر اساس نام بیمار، شماره تماس یا کدملی...' : 'Search by name, phone or national ID...'}
                        className="w-full ps-9 pe-3 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={visitTypeFilter}
                        onChange={(e) => setVisitTypeFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-border bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                      >
                        <option value="all">{isFa ? 'تمامی شیوه‌های ویزیت' : 'All Visit Types'}</option>
                        <option value="in_person">{isFa ? 'حضوری بیمارستان نیکان غرب' : 'In-Person (Nikan)'}</option>
                        <option value="online">{isFa ? 'مشاوره آنلاین تصویری' : 'Online Video'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Status Filter Chips - Wrap neatly */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    {[
                      { id: 'all', label_fa: 'همه نوبت‌ها', label_en: 'All Bookings', count: appointments.length },
                      { id: 'pending_approval', label_fa: 'در انتظار تایید', label_en: 'Pending', count: pendingCount, highlight: true },
                      { id: 'confirmed', label_fa: 'تایید شده', label_en: 'Confirmed', count: confirmedCount },
                      { id: 'completed', label_fa: 'انجام شده', label_en: 'Completed', count: completedCount },
                      { id: 'cancelled', label_fa: 'لغو شده', label_en: 'Cancelled', count: appointments.filter(a => a.status === 'cancelled').length }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setStatusFilter(tab.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                          statusFilter === tab.id
                            ? tab.highlight && tab.count > 0
                              ? 'bg-amber-600 text-white shadow-2xs'
                              : 'bg-primary text-primary-foreground shadow-2xs'
                            : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <span>{isFa ? tab.label_fa : tab.label_en}</span>
                        <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                          statusFilter === tab.id ? 'bg-black/20 text-white' : 'bg-muted-foreground/15 text-muted-foreground'
                        }`}>
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Appointments Table / Cards */}
                <div className="rounded-3xl bg-card border border-border/80 overflow-hidden shadow-xs">
                  <div className="p-4 sm:p-5 border-b border-border/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <h3 className="font-heading font-bold text-sm sm:text-base text-foreground">
                        {isFa ? 'لیست درخواست‌ها و ویزیت‌های ثبت‌شده' : 'Registered Patient Bookings'}
                      </h3>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {isFa ? `${filteredAppointments.length} نوبت یافته شد` : `${filteredAppointments.length} records`}
                    </span>
                  </div>

                  {filteredAppointments.length === 0 ? (
                    <div className="text-center py-16 px-4 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                        <Search className="w-6 h-6" />
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                        {isFa ? 'هیچ نوبتی با فیلترهای انتخابی یافت نشد.' : 'No appointments match the selected filters.'}
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border/60">
                      {filteredAppointments.map((appt) => {
                        const isPending = appt.status === 'pending_approval';
                        const isConfirmed = appt.status === 'confirmed';
                        const isCompleted = appt.status === 'completed';
                        const isCancelled = appt.status === 'cancelled';

                        return (
                          <div 
                            key={appt.id}
                            className={`p-4 sm:p-5 transition-colors hover:bg-muted/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
                              isPending ? 'bg-amber-500/5' : ''
                            }`}
                          >
                            {/* Patient & Service Summary */}
                            <div className="flex items-start gap-3.5 min-w-0">
                              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-bold text-sm shadow-2xs ${
                                isPending 
                                  ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                                  : isConfirmed
                                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                {appt.patient_name.slice(0, 1) || <User className="w-5 h-5" />}
                              </div>

                              <div className="space-y-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-heading font-bold text-foreground text-sm sm:text-base">
                                    {appt.patient_name}
                                  </span>

                                  {/* Status Badge */}
                                  {isPending && (
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 animate-pulse">
                                      {isFa ? 'در انتظار تایید پزشک' : 'Needs Doctor Approval'}
                                    </span>
                                  )}
                                  {isConfirmed && (
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                                      {isFa ? 'تایید شده' : 'Confirmed'}
                                    </span>
                                  )}
                                  {isCompleted && (
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-muted text-muted-foreground border border-border">
                                      {isFa ? 'انجام شده' : 'Completed'}
                                    </span>
                                  )}
                                  {isCancelled && (
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-destructive/15 text-destructive border border-destructive/25">
                                      {isFa ? 'لغو شده' : 'Cancelled'}
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                                  <span className="font-mono text-foreground/90 font-medium" dir="ltr">{appt.patient_phone}</span>
                                  <span>•</span>
                                  <span className="text-primary font-medium">{getServiceName(appt.service)}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1 font-medium">
                                    {appt.visit_type === 'in_person' ? (
                                      <>
                                        <Building2 className="w-3.5 h-3.5 text-sky-500" />
                                        <span>{isFa ? 'نیکان غرب' : 'Nikan Hospital'}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Video className="w-3.5 h-3.5 text-purple-500" />
                                        <span>{isFa ? 'مشاوره آنلاین' : 'Online Video'}</span>
                                      </>
                                    )}
                                  </span>
                                </div>

                                {appt.notes && (
                                  <p className="text-[11px] text-muted-foreground/80 line-clamp-1 italic max-w-xl">
                                    {isFa ? 'شرح حال مراجع:' : 'Patient notes:'} «{appt.notes}»
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Date, Time & Action Buttons */}
                            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-border/40">
                              
                              <div className="flex items-center gap-2 text-xs font-mono bg-card px-3 py-1.5 rounded-xl border border-border" dir="ltr">
                                <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                                <span className="font-medium">{appt.date}</span>
                                <span className="text-muted-foreground">|</span>
                                <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                                <span className="font-bold text-foreground">{appt.time_slot}</span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                {isPending && (
                                  <button
                                    onClick={() => handleConfirmAppointment(appt)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                                    title={isFa ? 'تایید سریع نوبت و ارسال پیامک' : 'Confirm & SMS Patient'}
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>{isFa ? 'تایید نوبت' : 'Approve'}</span>
                                  </button>
                                )}

                                {isConfirmed && (
                                  <button
                                    onClick={() => handleCompleteAppointment(appt)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold border border-primary/20 transition-all cursor-pointer"
                                    title={isFa ? 'ثبت به عنوان انجام شده' : 'Mark as Done'}
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">{isFa ? 'انجام شد' : 'Done'}</span>
                                  </button>
                                )}

                                <button
                                  onClick={() => openApptModal(appt)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-card border border-border hover:border-primary/40 text-xs font-semibold text-foreground hover:text-primary transition-all shadow-2xs cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>{isFa ? 'بررسی کامل' : 'Details'}</span>
                                </button>
                              </div>

                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: DOCTOR-PATIENT SECURE CHAT HUB */}
            {/* ========================================================================= */}
            {activeTab === 'chat' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span>{isFa ? 'میز گفتگوی مستقیم و پاسخگویی بالینی به بیماران' : 'Direct Patient Clinical Messaging Portal'}</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isFa ? 'پاسخ به سوالات مراجعین، ارسال دستورات دارویی، پایش روند درمان و ویس‌های بالینی' : 'Chat with patients, dispatch clinical guides, voice notes, and medication advice.'}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{isFa ? 'سامانه آنلاین و آماده پاسخگویی' : 'Live & Active'}</span>
                  </span>
                </div>

                {/* Main Doctor Chat Component */}
                <DoctorPatientChat mode="doctor" />
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: ELECTRONIC PRESCRIPTION & MEDICAL RX GENERATOR */}
            {/* ========================================================================= */}
            {activeTab === 'prescription' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Rx Configuration Form */}
                <div className="lg:col-span-6 space-y-5">
                  
                  <div className="rounded-3xl bg-card border border-border/80 p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <div className="flex items-center gap-2">
                        <Pill className="w-5 h-5 text-primary" />
                        <h3 className="font-heading font-bold text-base text-foreground">
                          {isFa ? 'صدور نسخه الکترونیک دارویی' : 'Issue Electronic Prescription'}
                        </h3>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">RX-2026</span>
                    </div>

                    {rxSuccessMsg && (
                      <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{rxSuccessMsg}</span>
                      </div>
                    )}

                    {/* Patient Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">
                          {isFa ? 'نام بیمار:' : 'Patient Name:'}
                        </label>
                        <input
                          type="text"
                          value={rxPatientName}
                          onChange={(e) => setRxPatientName(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs font-medium text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">
                          {isFa ? 'شماره تماس مراجع:' : 'Patient Phone:'}
                        </label>
                        <input
                          type="text"
                          value={rxPatientPhone}
                          onChange={(e) => setRxPatientPhone(e.target.value)}
                          dir="ltr"
                          className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs font-mono text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Diagnosis */}
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        {isFa ? 'تشخیص بالینی اصلی (Diagnosis):' : 'Clinical Diagnosis:'}
                      </label>
                      <input
                        type="text"
                        value={rxDiagnosis}
                        onChange={(e) => setRxDiagnosis(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs font-medium text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                      />
                    </div>

                    {/* Quick Drug Add Form */}
                    <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-3">
                      <span className="text-xs font-bold text-foreground block">
                        {isFa ? 'افزودن داروی جدید به نسخه:' : 'Add Medication Item:'}
                      </span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder={isFa ? 'نام دارو (مثلاً سرترالین)' : 'Med name (e.g. Sertraline)'}
                          value={rxNewMedName}
                          onChange={(e) => setRxNewMedName(e.target.value)}
                          className="px-3 py-1.5 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder={isFa ? 'دوز (مثلاً 50mg)' : 'Dose (e.g. 50mg)'}
                          value={rxNewMedDose}
                          onChange={(e) => setRxNewMedDose(e.target.value)}
                          className="px-3 py-1.5 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder={isFa ? 'دستور مصرف (صبح/شب)' : 'Instructions'}
                          value={rxNewMedInstructions}
                          onChange={(e) => setRxNewMedInstructions(e.target.value)}
                          className="px-3 py-1.5 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleAddMedication}
                        className="w-full py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isFa ? 'افزودن این قلم دارو' : 'Add Medication'}</span>
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={handleDispatchRxToChat}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:opacity-95 transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isFa ? 'ثبت و ارسال به چت بیمار' : 'Dispatch to Patient Chat'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="py-2.5 px-4 rounded-xl bg-card border border-border text-foreground hover:text-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>{isFa ? 'چاپ نسخه' : 'Print'}</span>
                      </button>
                    </div>

                  </div>

                </div>

                {/* Official Electronic Prescription Preview Canvas */}
                <div className="lg:col-span-6">
                  <div className="rounded-3xl bg-card border-2 border-primary/30 p-6 sm:p-7 shadow-lg space-y-6 relative overflow-hidden">
                    
                    {/* Watermark Logo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] text-primary">
                      <Pill className="w-72 h-72" />
                    </div>

                    {/* Header: Dr. Momeni & Hospital Header */}
                    <div className="border-b-2 border-primary/40 pb-4 flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-heading font-extrabold text-base sm:text-lg text-primary">
                          {isFa ? 'دکتر فاطمه مومنی' : 'Dr. Fatemeh Momeni'}
                        </h4>
                        <p className="text-xs font-semibold text-foreground mt-0.5">
                          {isFa ? 'متخصص اعصاب و روان (روانپزشک) و روان‌درمانگر' : 'Psychiatrist & Psychotherapist (M.D.)'}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {isFa ? 'شماره نظام پزشکی: ۱۳۳۴۳۹ • بیمارستان نیکان غرب' : 'Medical Council: 133439 • Nikan West Hospital'}
                        </p>
                      </div>

                      <div className="text-end">
                        <span className="text-[11px] font-mono block text-muted-foreground">{new Date().toLocaleDateString('fa-IR')}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 mt-1 inline-block">
                          {isFa ? 'نسخه الکترونیک رسمی' : 'Official Electronic Rx'}
                        </span>
                      </div>
                    </div>

                    {/* Patient Strip */}
                    <div className="p-3 rounded-xl bg-muted/40 border border-border flex flex-wrap items-center justify-between text-xs gap-2">
                      <div>
                        <span className="text-muted-foreground">{isFa ? 'نام بیمار: ' : 'Patient: '}</span>
                        <span className="font-bold text-foreground">{rxPatientName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{isFa ? 'شماره تماس: ' : 'Phone: '}</span>
                        <span className="font-mono font-bold text-foreground" dir="ltr">{rxPatientPhone}</span>
                      </div>
                    </div>

                    {/* Diagnosis */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                        {isFa ? 'تشخیص بالینی / Clinical Assessment:' : 'Clinical Assessment:'}
                      </span>
                      <p className="text-xs font-bold text-foreground bg-primary/5 p-2 rounded-lg border border-primary/15">
                        {rxDiagnosis}
                      </p>
                    </div>

                    {/* Prescribed Items (Rx Table) */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-xs font-serif font-black text-primary text-lg">
                        <span>℞</span>
                      </div>

                      <div className="space-y-2">
                        {rxItems.map((item, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-background border border-border/80 flex items-center justify-between gap-3 text-xs">
                            <div className="min-w-0">
                              <span className="font-bold text-foreground block truncate">
                                {idx + 1}. {item.name} <span className="text-primary font-mono font-normal">({item.dose})</span>
                              </span>
                              <span className="text-[11px] text-muted-foreground mt-0.5 block">
                                {isFa ? 'دستور مصرف: ' : 'Sig: '} {item.instructions}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveMedication(idx)}
                              className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                              title={isFa ? 'حذف قلم' : 'Delete'}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Doctor Digital Stamp & Signature */}
                    <div className="border-t border-border/70 pt-4 flex items-center justify-between">
                      <div className="text-[10px] text-muted-foreground">
                        {isFa ? 'ارائه این برگه به داروخانه‌های سراسر کشور معتبر است.' : 'Valid for pharmacies nationwide.'}
                      </div>

                      <div className="p-2.5 rounded-2xl border-2 border-primary/40 bg-primary/5 text-center w-40">
                        <span className="text-[10px] font-bold text-primary block">{isFa ? 'مهر دیجیتال پزشک' : 'Digital Stamp'}</span>
                        <span className="text-xs font-heading font-extrabold text-foreground block mt-0.5">دکتر فاطمه مومنی</span>
                        <span className="text-[10px] font-mono text-muted-foreground block">ک.ن.پ: ۱۳۶۸۸۲</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: CLINIC SCHEDULE & CAPACITY MANAGER */}
            {/* ========================================================================= */}
            {activeTab === 'schedule' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="rounded-3xl bg-card border border-border/80 p-5 sm:p-6 shadow-xs space-y-5">
                  <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-bold text-base text-foreground">
                      {isFa ? 'برنامه حضور در بیمارستان نیکان غرب' : 'Nikan West Hospital Attendance'}
                    </h3>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {isFa ? 'تنظیم روزها و شیفت‌های فعال جهت پذیرش مراجعین حضوری در درمانگاه اعصاب و روان بیمارستان نیکان غرب:' : 'Configure clinic room slots and in-person patient quotas:'}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border">
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-4 h-4 text-sky-500" />
                        <div>
                          <span className="text-xs font-bold text-foreground block">{isFa ? 'شنبه‌ها (۱۶:۰۰ الی ۲۰:۰۰)' : 'Saturdays (16:00 - 20:00)'}</span>
                          <span className="text-[10px] text-muted-foreground">{isFa ? 'اتاق ۳۰۲ کلینیک اعصاب و روان' : 'Room 302'}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                        {isFa ? 'فعال' : 'Active'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border">
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-4 h-4 text-sky-500" />
                        <div>
                          <span className="text-xs font-bold text-foreground block">{isFa ? 'سه‌شنبه‌ها (۱۶:۰۰ الی ۲۰:۰۰)' : 'Tuesdays (16:00 - 20:00)'}</span>
                          <span className="text-[10px] text-muted-foreground">{isFa ? 'اتاق ۳۰۲ کلینیک اعصاب و روان' : 'Room 302'}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                        {isFa ? 'فعال' : 'Active'}
                      </span>
                    </div>
                  </div>

                  {/* Maximum Capacity Setting */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      {isFa ? 'حداکثر سقف پذیرش بیمار در هر شیفت:' : 'Max patient quota per shift:'}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={4}
                        max={16}
                        value={maxDailySlots}
                        onChange={(e) => setMaxDailySlots(Number(e.target.value))}
                        className="flex-1 accent-primary"
                      />
                      <span className="px-3 py-1 rounded-xl bg-primary/10 text-primary font-bold font-mono text-sm">
                        {maxDailySlots} {isFa ? 'بیمار' : 'pts'}
                      </span>
                    </div>
                  </div>

                </div>

                <div className="rounded-3xl bg-card border border-border/80 p-5 sm:p-6 shadow-xs space-y-5">
                  <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                    <Video className="w-5 h-5 text-purple-500" />
                    <h3 className="font-heading font-bold text-base text-foreground">
                      {isFa ? 'ظرفیت مشاوره آنلاین تصویری' : 'Tele-psychiatry Capacity'}
                    </h3>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {isFa ? 'مدیریت لینک‌های امن Google Meet و پذیرش جلسات غیرحضوری خارج از کشور و سایر شهرها:' : 'Manage secure tele-psychiatry links and remote session availability:'}
                  </p>

                  <div className="p-4 rounded-2xl bg-accent/40 border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground">{isFa ? 'پذیرش مراجعین آنلاین:' : 'Online Bookings Status:'}</span>
                      <button
                        onClick={() => setTeleActive(!teleActive)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                          teleActive ? 'bg-emerald-600 text-white' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {teleActive ? (isFa ? 'روشن (پذیرش فعال)' : 'Open') : (isFa ? 'خاموش (تکمیل ظرفیت)' : 'Paused')}
                      </button>
                    </div>

                    <p className="text-[11px] text-muted-foreground">
                      {isFa ? 'در صورت خاموش بودن، مراجعین جدید امکان رزرو ویزیت آنلاین نخواهند داشت.' : 'When paused, new online booking slots will be hidden in patient portal.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-foreground block">{isFa ? 'لینک پیش‌فرض پلتفرم مشاوره:' : 'Default Video Engine:'}</span>
                      <span className="text-[11px] text-primary font-mono">Google Meet Encrypted Portal</span>
                    </div>
                    <BadgeCheck className="w-5 h-5 text-primary" />
                  </div>

                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 5: ARTICLES MANAGEMENT (BLOG POSTS) */}
            {/* ========================================================================= */}
            {activeTab === 'articles' && (
              <div className="space-y-6">
                
                {/* Header & Quick Action */}
                <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-base sm:text-lg text-foreground">
                        {isFa ? 'مدیریت و نگارش مقالات تخصصی روان‌پزشکی' : 'Scientific Articles & Publications'}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {isFa ? 'انتشار، ویرایش متن، تنظیم سرفصل‌ها و تصاویر شاخص مقالات علمی دکتر فاطمه مومنی' : 'Create, edit, and publish clinical articles directly on the website.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Link
                      to="/blog"
                      className="px-3.5 py-2.5 rounded-xl border border-border hover:bg-accent/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{isFa ? 'مشاهده در وب‌سایت' : 'View on Blog'}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingArticle(null);
                        setIsArticleModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isFa ? 'نگارش مقاله جدید با جزییات بالا' : 'Write New Article'}</span>
                    </button>
                  </div>
                </div>

                {/* Filter and Search */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-card border border-border/80">
                  <div className="relative w-full sm:w-72">
                    <Search className={`w-4 h-4 text-muted-foreground absolute top-2.5 ${isRTL ? 'left-3' : 'right-3'}`} />
                    <input
                      type="text"
                      placeholder={isFa ? 'جستجو در عنوان یا متن مقاله...' : 'Search articles...'}
                      value={articleSearch}
                      onChange={(e) => setArticleSearch(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 pl-9"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
                    {[
                      { key: 'all', label: isFa ? 'همه' : 'All' },
                      { key: 'anxiety', label: isFa ? 'اضطراب و پانیک' : 'Anxiety' },
                      { key: 'depression', label: isFa ? 'افسردگی' : 'Depression' },
                      { key: 'adhd', label: isFa ? 'بیش‌فعالی' : 'ADHD' },
                      { key: 'couples', label: isFa ? 'روان‌درمانی' : 'Therapy' },
                    ].map((cat) => (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => setArticleCategoryFilter(cat.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          articleCategoryFilter === cat.key
                            ? 'bg-primary text-primary-foreground shadow-2xs'
                            : 'bg-muted/40 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {posts
                    .filter((p) => {
                      const matchesCat = articleCategoryFilter === 'all' || p.category === articleCategoryFilter;
                      const q = articleSearch.toLowerCase().trim();
                      const matchesSearch = !q || p.title_fa.toLowerCase().includes(q) || (p.excerpt_fa && p.excerpt_fa.toLowerCase().includes(q));
                      return matchesCat && matchesSearch;
                    })
                    .map((post) => (
                      <div
                        key={post.id}
                        className="rounded-3xl bg-card border border-border/80 overflow-hidden shadow-2xs hover:border-primary/40 flex flex-col justify-between transition-all group"
                      >
                        <div>
                          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                            <img
                              src={post.image_url}
                              alt={post.title_fa}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/70 text-white backdrop-blur-xs">
                              {post.category_fa || post.category}
                            </span>
                          </div>

                          <div className="p-5 space-y-2.5">
                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                              <Clock className="w-3.5 h-3.5 text-primary" />
                              <span>{post.read_minutes} دقیقه مطالعه</span>
                              <span>•</span>
                              <span>{post.published_date}</span>
                            </div>

                            <h3 className="font-heading font-bold text-sm sm:text-base text-foreground line-clamp-2 leading-snug">
                              {post.title_fa}
                            </h3>

                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {post.excerpt_fa}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 border-t border-border/50 bg-muted/20 flex items-center justify-between gap-2">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{isFa ? 'مشاهده' : 'View'}</span>
                          </Link>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingArticle(post);
                                setIsArticleModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-card hover:bg-primary hover:text-white border border-border text-muted-foreground transition-colors cursor-pointer"
                              title={isFa ? 'ویرایش جزییات مقاله' : 'Edit article'}
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(isFa ? `آیا از حذف مقاله «${post.title_fa}» مطمئن هستید؟` : `Delete article "${post.title_fa}"?`)) {
                                  deletePost(post.id);
                                  setPosts(getAllPosts());
                                  setToastMessage(isFa ? 'مقاله با موفقیت حذف شد.' : 'Article deleted.');
                                  setTimeout(() => setToastMessage(''), 3000);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 hover:text-white border border-rose-500/20 text-rose-600 transition-colors cursor-pointer"
                              title={isFa ? 'حذف مقاله' : 'Delete article'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 6: TESTIMONIALS & REVIEWS MODERATION */}
            {/* ========================================================================= */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                
                {/* Header & Quick Action */}
                <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-base sm:text-lg text-foreground">
                        {isFa ? 'مدیریت و پالایش نظرات و تجارب مراجعین' : 'Testimonials & Feedback Moderation'}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {isFa ? 'تایید اعتبار پرونده‌ها (Verified Badge)، اصلاح متن، ویرایش و حذف کامنت‌های نامناسب' : 'Moderate, approve, and manage privacy-safe patient experiences.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Link
                      to="/testimonials"
                      className="px-3.5 py-2.5 rounded-xl border border-border hover:bg-accent/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{isFa ? 'مشاهده در وب‌سایت' : 'View on Site'}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTestimonial(null);
                        setIsTestimonialModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isFa ? 'ثبت تجربه / بازخورد جدید' : 'Add Testimonial'}</span>
                    </button>
                  </div>
                </div>

                {/* Filter and Search */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-card border border-border/80">
                  <div className="relative w-full sm:w-72">
                    <Search className={`w-4 h-4 text-muted-foreground absolute top-2.5 ${isRTL ? 'left-3' : 'right-3'}`} />
                    <input
                      type="text"
                      placeholder={isFa ? 'جستجو در نام مراجع یا متن نظر...' : 'Search reviews...'}
                      value={testimonialSearch}
                      onChange={(e) => setTestimonialSearch(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 pl-9"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
                    {[
                      { key: 'all', label: isFa ? 'همه' : 'All' },
                      { key: 'anxiety', label: isFa ? 'اضطراب' : 'Anxiety' },
                      { key: 'depression', label: isFa ? 'افسردگی' : 'Depression' },
                      { key: 'adhd', label: isFa ? 'بیش‌فعالی' : 'ADHD' },
                      { key: 'couples', label: isFa ? 'زوج‌درمانی' : 'Couples' },
                      { key: 'online', label: isFa ? 'آنلاین' : 'Online' },
                    ].map((cat) => (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => setTestimonialCategoryFilter(cat.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          testimonialCategoryFilter === cat.key
                            ? 'bg-primary text-primary-foreground shadow-2xs'
                            : 'bg-muted/40 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Testimonials List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {testimonials
                    .filter((t) => {
                      const matchesCat = testimonialCategoryFilter === 'all' || t.category === testimonialCategoryFilter;
                      const q = testimonialSearch.toLowerCase().trim();
                      const matchesSearch = !q || (t.persona_title_fa && t.persona_title_fa.toLowerCase().includes(q)) || (t.body_fa && t.body_fa.toLowerCase().includes(q)) || (t.author_initial && t.author_initial.toLowerCase().includes(q));
                      return matchesCat && matchesSearch;
                    })
                    .map((item) => (
                      <div
                        key={item.id}
                        className="rounded-3xl bg-card border border-border/80 p-5 shadow-2xs hover:border-primary/40 flex flex-col justify-between transition-all"
                      >
                        <div className="space-y-3">
                          {/* Top row: stars & verified */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-0.5 text-amber-500">
                              {[...Array(item.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const newStatus = toggleTestimonialVerified(item.id);
                                setTestimonials(getAllTestimonials());
                                setToastMessage(newStatus ? (isFa ? 'تایید شد' : 'Verified') : (isFa ? 'از تایید خارج شد' : 'Unverified'));
                                setTimeout(() => setToastMessage(''), 2500);
                              }}
                              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                                item.verified
                                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                  : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              <BadgeCheck className="w-3 h-3" />
                              <span>{item.verified ? (isFa ? 'مراجع تاییدشده' : 'Verified') : (isFa ? 'نیاز به تایید' : 'Pending')}</span>
                            </button>
                          </div>

                          {/* Persona header */}
                          <div className="flex items-center gap-2.5 pt-1">
                            <ShadowAvatar type={item.shadow_avatar || 'calm_mind'} size="sm" />
                            <div>
                              <p className="text-xs font-bold text-foreground">
                                {item.persona_title_fa || item.author_initial}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {item.author_label_fa || (item.visit_type === 'online' ? 'ویزیت آنلاین' : 'بیمارستان نیکان')}
                              </p>
                            </div>
                          </div>

                          {/* Body */}
                          <p className="text-xs text-foreground/90 leading-relaxed italic line-clamp-4">
                            «{item.body_fa}»
                          </p>

                          {/* Outcome badge */}
                          {item.outcome_badge_fa && (
                            <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-primary/10 text-primary">
                              ✨ {item.outcome_badge_fa}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="pt-4 mt-3 border-t border-border/50 flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground font-mono">
                            {item.location_tag_fa || 'نیکان غرب'}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingTestimonial(item);
                                setIsTestimonialModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-muted hover:bg-primary hover:text-white border border-border text-muted-foreground transition-colors cursor-pointer"
                              title={isFa ? 'ویرایش این نظر' : 'Edit review'}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(isFa ? `آیا از حذف این نظر مراجع اطمینان دارید؟` : `Delete review?`)) {
                                  deleteTestimonial(item.id);
                                  setTestimonials(getAllTestimonials());
                                  setToastMessage(isFa ? 'نظر مراجع با موفقیت حذف شد.' : 'Review deleted.');
                                  setTimeout(() => setToastMessage(''), 3000);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 hover:text-white border border-rose-500/20 text-rose-600 transition-colors cursor-pointer"
                              title={isFa ? 'حذف این نظر / کامنت' : 'Delete comment'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                </div>

              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. DETAILED APPOINTMENT MODAL & CLINICAL WORKFLOW */}
        {/* ========================================================================= */}
        {selectedAppt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
            <div className="rounded-3xl bg-card border border-border/80 w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-7 relative space-y-5 my-8">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      {isFa ? `پرونده نوبت: ${selectedAppt.patient_name}` : `Booking Details: ${selectedAppt.patient_name}`}
                    </h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                      {selectedAppt.id}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isFa ? 'بررسی مشخصات، تایید، تغییر زمان و یادداشت‌های بالینی پزشک' : 'Review medical info, reschedule, and write doctor clinical notes.'}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedAppt(null)}
                  className="w-8 h-8 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mode: VIEW & EDIT DETAILS */}
              {modalMode === 'view' && (
                <div className="space-y-5 text-xs sm:text-sm">
                  
                  {/* Patient Quick Contact Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
                    <div className="space-y-1">
                      <span className="text-[11px] text-muted-foreground">{isFa ? 'نام و مشخصات بیمار:' : 'Patient Name:'}</span>
                      <p className="font-bold text-foreground text-sm">{selectedAppt.patient_name}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] text-muted-foreground">{isFa ? 'شماره تماس:' : 'Contact Phone:'}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-foreground" dir="ltr">{selectedAppt.patient_phone}</span>
                        <a 
                          href={`tel:${selectedAppt.patient_phone}`}
                          className="p-1 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                          title={isFa ? 'تماس مستقیم' : 'Call'}
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Booking Specifics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl border border-border bg-background space-y-1">
                      <span className="text-[10px] text-muted-foreground">{isFa ? 'خدمت تشخیصی/درمانی:' : 'Service:'}</span>
                      <p className="font-semibold text-foreground text-xs">{getServiceName(selectedAppt.service)}</p>
                    </div>

                    <div className="p-3 rounded-xl border border-border bg-background space-y-1">
                      <span className="text-[10px] text-muted-foreground">{isFa ? 'شیوه ویزیت:' : 'Visit Type:'}</span>
                      <p className="font-semibold text-foreground text-xs flex items-center gap-1">
                        {selectedAppt.visit_type === 'in_person' ? (
                          <>
                            <Building2 className="w-3 h-3 text-sky-500" />
                            <span>{isFa ? 'حضوری بیمارستان نیکان' : 'In-Person'}</span>
                          </>
                        ) : (
                          <>
                            <Video className="w-3 h-3 text-purple-500" />
                            <span>{isFa ? 'مشاوره آنلاین تصویری' : 'Online Video'}</span>
                          </>
                        )}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border border-border bg-background space-y-1">
                      <span className="text-[10px] text-muted-foreground">{isFa ? 'وضعیت پرداخت:' : 'Payment Status:'}</span>
                      <div className="flex items-center gap-1">
                        <select
                          value={selectedAppt.payment_status || 'pending'}
                          onChange={(e) => handleUpdatePaymentStatus(e.target.value as PaymentStatus)}
                          className="text-xs font-semibold bg-transparent text-primary focus:outline-none cursor-pointer"
                        >
                          <option value="pending">{isFa ? 'در انتظار پرداخت' : 'Pending'}</option>
                          <option value="paid_online">{isFa ? 'پرداخت آنلاین شده' : 'Paid Online'}</option>
                          <option value="paid_in_person">{isFa ? 'پرداخت در مطب / کارتخوان' : 'Paid at Clinic'}</option>
                          <option value="insurance_covered">{isFa ? 'پوشش بیمه تکمیلی' : 'Insurance'}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Scheduled Date & Time */}
                  <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] text-muted-foreground">{isFa ? 'زمان مقرر ویزیت:' : 'Appointment Time:'}</span>
                        <p className="font-bold text-foreground font-mono" dir="ltr">{selectedAppt.date} | {selectedAppt.time_slot}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setModalMode('reschedule')}
                      className="px-3 py-1.5 rounded-xl border border-border hover:border-primary/40 text-xs font-semibold text-foreground hover:text-primary transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{isFa ? 'تغییر زمان (Reschedule)' : 'Reschedule'}</span>
                    </button>
                  </div>

                  {/* Patient Chief Complaint */}
                  {selectedAppt.notes && (
                    <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-1">
                      <span className="text-[11px] font-semibold text-muted-foreground">{isFa ? 'شرح حال و علت مراجعه بیمار:' : 'Patient Chief Complaint:'}</span>
                      <p className="text-xs text-foreground leading-relaxed italic">«{selectedAppt.notes}»</p>
                    </div>
                  )}

                  {/* Doctor Clinical Notes Editor */}
                  <div className="space-y-2 pt-2 border-t border-border/60">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <Edit3 className="w-3.5 h-3.5 text-primary" />
                        <span>{isFa ? 'یادداشت‌های محرمانه بالینی پزشک:' : 'Confidential Doctor Clinical Notes:'}</span>
                      </label>
                      <span className="text-[10px] text-muted-foreground">{isFa ? 'فقط برای پزشک قابل رویت است' : 'Doctor-Only Private'}</span>
                    </div>

                    <textarea
                      rows={3}
                      value={doctorNoteDraft}
                      onChange={(e) => setDoctorNoteDraft(e.target.value)}
                      placeholder={isFa ? 'ثبت نتایج مصاحبه، دوز داروهای تجویزی، پیگیری‌ها و توصیه‌های تشخیصی...' : 'Enter clinical observations, medication titration, follow-up recommendations...'}
                      className="w-full p-3 rounded-2xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 leading-relaxed"
                    />

                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveDoctorNotes}
                        className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-95 shadow-2xs transition-all cursor-pointer"
                      >
                        {isFa ? 'ذخیره یادداشت بالینی' : 'Save Notes'}
                      </button>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/60">
                    
                    <div className="flex items-center gap-2">
                      {selectedAppt.status === 'pending_approval' && (
                        <button
                          onClick={() => handleConfirmAppointment(selectedAppt)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>{isFa ? 'تایید نوبت و ارسال پیامک به بیمار' : 'Approve & Send SMS'}</span>
                        </button>
                      )}

                      {selectedAppt.status === 'confirmed' && (
                        <button
                          onClick={() => handleCompleteAppointment(selectedAppt)}
                          className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold border border-primary/25 transition-all cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isFa ? 'ثبت به عنوان انجام شده' : 'Mark as Completed'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => setModalMode('cancel_reason')}
                        className="px-3.5 py-2 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-semibold border border-destructive/20 transition-all cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{isFa ? 'لغو نوبت بیمار' : 'Cancel Booking'}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteAppt(selectedAppt.id)}
                      className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isFa ? 'حذف رکورد' : 'Delete Record'}</span>
                    </button>

                  </div>

                </div>
              )}

              {/* Mode: RESCHEDULE TIME */}
              {modalMode === 'reschedule' && (
                <form onSubmit={handleSaveReschedule} className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-accent/40 border border-primary/20">
                    <h4 className="font-bold text-xs text-foreground mb-1">
                      {isFa ? 'انتخاب زمان جدید برای نوبت مراجع:' : 'Select New Slot for Patient:'}
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      {isFa ? 'پس از تغییر زمان، پیامک اطلاع‌رسانی خودکار برای بیمار ارسال خواهد شد.' : 'A notification SMS will automatically be sent to the patient.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-foreground">
                      {isFa ? 'تاریخ‌های در دسترس مطب نیکان غرب:' : 'Available Work Days:'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {availableDays.slice(0, 6).map((day) => (
                        <button
                          key={day.dateStr}
                          type="button"
                          onClick={() => setRescheduleDate(day.dateStr)}
                          className={`p-2 rounded-xl text-xs font-medium border text-start transition-all cursor-pointer ${
                            rescheduleDate === day.dateStr
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background border-border text-foreground hover:bg-muted'
                          }`}
                        >
                          <span className="block font-bold">{day.dayNameFa}</span>
                          <span className="text-[10px] opacity-80">{day.dateDisplayFa}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-foreground">
                      {isFa ? 'ساعت ویزیت:' : 'Time Slot:'}
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setRescheduleSlot(slot)}
                          className={`py-1.5 px-2 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
                            rescheduleSlot === slot
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-background border-border text-foreground hover:bg-muted'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/60">
                    <button
                      type="button"
                      onClick={() => setModalMode('view')}
                      className="px-4 py-2 rounded-xl bg-muted text-muted-foreground hover:text-foreground text-xs font-semibold"
                    >
                      {isFa ? 'انصراف' : 'Cancel'}
                    </button>

                    <button
                      type="submit"
                      disabled={!rescheduleDate || !rescheduleSlot}
                      className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-95 shadow-xs disabled:opacity-40 cursor-pointer"
                    >
                      {isFa ? 'تایید و تغییر زمان نوبت' : 'Confirm Reschedule'}
                    </button>
                  </div>
                </form>
              )}

              {/* Mode: CANCEL WITH REASON */}
              {modalMode === 'cancel_reason' && (
                <form onSubmit={handleCancelWithReason} className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/20 text-xs text-destructive">
                    <p className="font-bold mb-1">{isFa ? 'علت لغو نوبت بیمار را مشخص فرمایید:' : 'Specify Reason for Cancellation:'}</p>
                    <p className="text-[11px] opacity-90">{isFa ? 'این پیام همراه با پیامک لغو برای مراجع ارسال خواهد شد.' : 'This reason will be included in the cancellation SMS.'}</p>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      required
                      value={rejectionReasonDraft}
                      onChange={(e) => setRejectionReasonDraft(e.target.value)}
                      placeholder={isFa ? 'مثال: تداخل با برنامه جراحی / بیمارستان نیکان غرب یا لزوم انتخاب زمان دیگر...' : 'e.g. Clinical schedule conflict / please choose another day...'}
                      className="w-full p-3 rounded-2xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-destructive/40"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/60">
                    <button
                      type="button"
                      onClick={() => setModalMode('view')}
                      className="px-4 py-2 rounded-xl bg-muted text-muted-foreground hover:text-foreground text-xs font-semibold"
                    >
                      {isFa ? 'بازگشت' : 'Back'}
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs font-bold hover:opacity-95 shadow-xs cursor-pointer"
                    >
                      {isFa ? 'لغو نوبت و ارسال پیامک' : 'Cancel Booking & SMS'}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

        {/* Editor Modals */}
        <ArticleEditorModal
          isOpen={isArticleModalOpen}
          onClose={() => setIsArticleModalOpen(false)}
          postToEdit={editingArticle}
          onSaved={() => {
            setPosts(getAllPosts());
            setToastMessage(isFa ? 'مقاله علمی با موفقیت ذخیره شد.' : 'Article saved successfully.');
            setTimeout(() => setToastMessage(''), 3000);
          }}
        />

        <TestimonialEditorModal
          isOpen={isTestimonialModalOpen}
          onClose={() => setIsTestimonialModalOpen(false)}
          testimonialToEdit={editingTestimonial}
          onSaved={() => {
            setTestimonials(getAllTestimonials());
            setToastMessage(isFa ? 'نظر و تجربه مراجع با موفقیت ذخیره شد.' : 'Review saved successfully.');
            setTimeout(() => setToastMessage(''), 3000);
          }}
        />

      </div>
    </div>
  );
};
