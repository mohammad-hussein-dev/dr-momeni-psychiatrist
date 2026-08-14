import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Phone, 
  Calendar, 
  Clock, 
  Building2, 
  Video, 
  CheckCircle2, 
  XCircle, 
  PlusCircle, 
  LogOut, 
  AlertCircle, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  CalendarHeart,
  KeyRound,
  FileText,
  Settings,
  Sparkles,
  MapPin,
  Save,
  Check,
  Bell,
  HeartPulse,
  ExternalLink,
  MessageCircle,
  MessageSquare,
  Copy,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/LanguageProvider';
import { serviceKeys } from '../i18n/translations';
import { Reveal } from '../components/Reveal';
import { DoctorPatientChat } from '../components/chat/DoctorPatientChat';
import { 
  Appointment, 
  ServiceType, 
  VisitType,
  PatientProfile,
  UserSession
} from '../types';
import { 
  SLOTS, 
  getNextAvailableWorkDays, 
  getAppointmentsByPhone, 
  createAppointment, 
  cancelAppointment,
  getActiveSession,
  saveSession,
  clearSession,
  DOCTOR_ADMIN_PHONES
} from '../lib/appointmentStore';

const STORAGE_KEY = 'dr_patient_phone';
const PROFILE_KEY_PREFIX = 'dr_patient_profile_';

export const PatientPanel: React.FC = () => {
  const { t, lang, pick, isRTL } = useLanguage();
  const isFa = lang === 'fa';
  const location = useLocation();
  const navigate = useNavigate();

  // Active Session & Doctor Check
  const [session, setSession] = useState<UserSession | null>(() => getActiveSession());
  const isDoctor = session?.role === 'doctor_admin';

  // Active Tab State inside logged-in dashboard
  const [activeTab, setActiveTab] = useState<'appointments' | 'chat' | 'profile' | 'guidelines' | 'new_booking'>('appointments');

  // Auth State
  const [phone, setPhone] = useState<string>(() => {
    const active = getActiveSession();
    if (active && active.role === 'patient') return active.phone;
    return localStorage.getItem(STORAGE_KEY) || '';
  });
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    const active = getActiveSession();
    return !!active && active.role === 'patient';
  });
  const [stage, setStage] = useState<'phone' | 'otp'>('phone');
  const [genOtp, setGenOtp] = useState<string>('');
  const [otpInput, setOtpInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // If active user is doctor, auto-navigate to /admin immediately
  useEffect(() => {
    const handleAuthCheck = () => {
      const active = getActiveSession();
      setSession(active);
      if (active?.role === 'doctor_admin') {
        navigate('/admin', { replace: true });
      }
    };

    handleAuthCheck();
    window.addEventListener('storage', handleAuthCheck);
    window.addEventListener('auth_state_changed', handleAuthCheck);

    return () => {
      window.removeEventListener('storage', handleAuthCheck);
      window.removeEventListener('auth_state_changed', handleAuthCheck);
    };
  }, [navigate]);

  // User Profile State
  const [profile, setProfile] = useState<PatientProfile>({
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
  });
  const [profileSavedToast, setProfileSavedToast] = useState<boolean>(false);

  // Booking Stepper State
  const [step, setStep] = useState<number>(0);
  const availableDays = getNextAvailableWorkDays(12);

  const [draft, setDraft] = useState<{
    service: ServiceType;
    visit_type: VisitType;
    date: string;
    time_slot: string;
    patient_name: string;
    notes: string;
  }>({
    service: 'depression',
    visit_type: 'in_person',
    date: availableDays[0]?.dateStr || '',
    time_slot: '10:00',
    patient_name: '',
    notes: ''
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Load Profile from localStorage
  useEffect(() => {
    if (phone && !isDoctor) {
      const savedProfile = localStorage.getItem(PROFILE_KEY_PREFIX + phone);
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          setProfile(parsed);
          if (parsed.name) {
            setDraft(prev => ({ ...prev, patient_name: parsed.name }));
          }
        } catch (e) {
          // ignore
        }
      } else {
        setProfile(prev => ({ ...prev, phone }));
      }
    }
  }, [phone, isDoctor]);

  // Handle incoming routing state (e.g. from service cards or hero quick-buttons)
  useEffect(() => {
    if (location.state?.service) {
      setDraft(prev => ({ ...prev, service: location.state.service }));
      setActiveTab('new_booking');
      setStep(1);
    }
    if (location.state?.visit_type) {
      setDraft(prev => ({ ...prev, visit_type: location.state.visit_type }));
      setActiveTab('new_booking');
    }
  }, [location.state]);

  // Load appointments when logged in as patient
  useEffect(() => {
    if (loggedIn && phone && !isDoctor) {
      setAppointments(getAppointmentsByPhone(phone));
    }
  }, [loggedIn, phone, isDoctor]);

  // Save Profile Handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(PROFILE_KEY_PREFIX + phone, JSON.stringify(profile));
    setDraft(prev => ({ ...prev, patient_name: profile.name }));
    setProfileSavedToast(true);
    setTimeout(() => {
      setProfileSavedToast(false);
    }, 4000);
  };

  // OTP Simulation
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setAuthError(lang === 'fa' ? 'لطفاً یک شماره تلفن همراه معتبر ۱۰ یا ۱۱ رقمی وارد نمایید.' : 'Please enter a valid mobile number.');
      return;
    }
    setAuthError('');
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setGenOtp(code);
    setStage('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.trim() === genOtp || otpInput.trim() === '1234' || otpInput.trim() === '5432') {
      const cleanPhone = phone.replace(/\D/g, '');
      const isDoc = DOCTOR_ADMIN_PHONES.includes(cleanPhone);

      if (isDoc) {
        const docSession: UserSession = {
          phone: cleanPhone,
          name: 'دکتر فاطمه مومنی',
          role: 'doctor_admin',
          token: 'admin_doc_' + Date.now(),
          loggedInAt: new Date().toISOString()
        };
        saveSession(docSession);
        navigate('/admin');
        return;
      }

      const patientSession: UserSession = {
        phone: cleanPhone,
        name: profile.name || (isFa ? 'مراجع محترم' : 'Patient'),
        role: 'patient',
        token: 'pat_' + Date.now(),
        loggedInAt: new Date().toISOString()
      };
      saveSession(patientSession);
      setLoggedIn(true);
      setAuthError('');
      const savedProfile = localStorage.getItem(PROFILE_KEY_PREFIX + cleanPhone);
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          setProfile(parsed);
          if (parsed.name) {
            setDraft(prev => ({ ...prev, patient_name: parsed.name }));
          }
        } catch (e) {
          // ignore
        }
      }
    } else {
      setAuthError(t('panel_wrong_code'));
    }
  };

  const handleQuickPatientLogin = () => {
    const demoPhone = '09123456789';
    setPhone(demoPhone);
    const patientSession: UserSession = {
      phone: demoPhone,
      name: 'مریم احمدی',
      role: 'patient',
      token: 'pat_demo_' + Date.now(),
      loggedInAt: new Date().toISOString()
    };
    saveSession(patientSession);
    setLoggedIn(true);
    setProfile(prev => ({ ...prev, name: 'مریم احمدی', phone: demoPhone }));
  };

  const handleLogout = () => {
    clearSession();
    localStorage.removeItem(STORAGE_KEY);
    setLoggedIn(false);
    setPhone('');
    setStage('phone');
    setOtpInput('');
    setGenOtp('');
    setActiveTab('appointments');
  };

  if (isDoctor) {
    return (
      <div className="pt-28 pb-16 min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-card border border-primary/30 text-center space-y-4 shadow-xl animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-2xs">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            {isFa ? 'حساب پزشک (دکتر فاطمه مومنی) فعال است' : 'Doctor Session is Active'}
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {isFa 
              ? 'شما با دسترسی مدیریت پزشک وارد شده‌اید. در حال انتقال خودکار به میز کار و پنل نوبت‌های کلینیک...'
              : 'Redirecting to Doctor Dashboard...'}
          </p>
          <div className="pt-2">
            <Link 
              to="/admin" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{isFa ? 'ورود به پنل مدیریت پزشک' : 'Go to Doctor Admin'}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingName = draft.patient_name.trim() || profile.name.trim();
    if (!bookingName) return;

    createAppointment({
      patient_name: bookingName,
      patient_phone: phone,
      service: draft.service,
      visit_type: draft.visit_type,
      date: draft.date,
      time_slot: draft.time_slot,
      notes: draft.notes
    });

    if (!profile.name) {
      const updated = { ...profile, name: bookingName };
      setProfile(updated);
      localStorage.setItem(PROFILE_KEY_PREFIX + phone, JSON.stringify(updated));
    }

    setAppointments(getAppointmentsByPhone(phone));
    setActiveTab('appointments');
    setStep(0);
    setSuccessMessage(isFa ? 'درخواست نوبت شما با موفقیت ثبت شد و در انتظار تایید نهایی پزشک قرار گرفت.' : 'Your appointment request has been submitted and is pending doctor approval.');

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    setTimeout(() => {
      setSuccessMessage('');
    }, 8000);
  };

  const handleCancelAppointment = (id: string) => {
    if (window.confirm(t('panel_cancel_confirm') || 'آیا از لغو این نوبت اطمینان دارید؟')) {
      cancelAppointment(id);
      setAppointments(getAppointmentsByPhone(phone));
    }
  };

  const getServiceName = (key: ServiceType) => {
    const s = serviceKeys.find(item => item.key === key);
    return s ? t(s.titleKey) : key;
  };

  const activeAppts = appointments.filter(a => a.status === 'confirmed' || a.status === 'pending_approval');
  const pastAppts = appointments.filter(a => a.status === 'completed' || a.status === 'cancelled');

  const fileRecordNumber = `DRM-${phone.slice(-4) || '8492'}`;

  return (
    <div className="pt-20 sm:pt-28 pb-16 min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* 1. NOT LOGGED IN: OTP SIGN IN CARD */}
        {/* ========================================================= */}
        {!loggedIn ? (
          <Reveal className="max-w-md mx-auto">
            <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 shadow-xl text-center">
              
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 shadow-2xs">
                <KeyRound className="w-7 h-7" />
              </div>

              <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-2">
                {t('panel_login_title')}
              </h1>
              
              <p className="text-xs sm:text-sm text-muted-foreground mb-5 leading-relaxed">
                {t('panel_login_desc')}
              </p>

              {/* Fast Demo Login Option */}
              <div className="mb-5 p-3 rounded-2xl bg-accent/40 border border-primary/20 text-start">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {isFa ? 'ورود سریع تستی (مراجع نمونه):' : 'Demo Patient Login:'}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">09123456789</span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickPatientLogin}
                  className="w-full py-2 px-3 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary text-xs font-bold transition-colors cursor-pointer"
                >
                  {isFa ? 'ورود یک‌کلیکه به عنوان مراجع' : 'Enter as Demo Patient'}
                </button>
              </div>

              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {stage === 'phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="text-start">
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      {t('panel_phone_label')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09123456789"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm btn-soft-glow hover:opacity-95 transition-all shadow-md cursor-pointer"
                  >
                    {t('panel_send_otp')}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  
                  {/* Simulated OTP Display Banner */}
                  <div className="p-4 rounded-2xl bg-accent/60 border border-primary/20 text-center space-y-2">
                    <p className="text-xs text-muted-foreground">{t('panel_otp_hint')}</p>
                    <p className="text-2xl font-heading font-bold text-primary tracking-[0.4em]" dir="ltr">
                      {genOtp}
                    </p>
                    <button
                      type="button"
                      onClick={() => setOtpInput(genOtp)}
                      className="text-[11px] font-semibold text-primary/90 hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{isFa ? 'درج خودکار کد تایید' : 'Auto-fill OTP'}</span>
                    </button>
                  </div>

                  <div className="text-start">
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      {t('panel_otp_label')}
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
                    {t('panel_verify_otp')}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setStage('phone'); setOtpInput(''); }}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors block mx-auto pt-2 cursor-pointer"
                  >
                    {lang === 'fa' ? 'تغییر شماره موبایل' : 'Change Phone Number'}
                  </button>
                </form>
              )}

              {/* Link to Doctor / Admin Panel */}
              <div className="mt-6 pt-5 border-t border-border/60 text-center">
                <Link
                  to="/admin"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-accent/40 hover:bg-accent border border-primary/20 text-xs text-primary font-semibold transition-all group"
                >
                  <Lock className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>{isFa ? 'ورود به پنل پزشک و مدیریت کلینیک' : 'Doctor & Clinic Admin Portal'}</span>
                </Link>
              </div>

            </div>
          </Reveal>
        ) : (
          /* ========================================================= */
          /* 2. LOGGED IN: COMPREHENSIVE PATIENT PORTAL & PROFILE */
          /* ========================================================= */
          <div className="space-y-6">
            
            {/* Top User Profile Header Card */}
            <div className="rounded-3xl bg-card border border-border/80 p-5 sm:p-7 shadow-xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                
                {/* Left: Patient Avatar & Key Identifiers */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-primary to-primary/80 text-primary-foreground font-bold flex items-center justify-center text-xl sm:text-2xl shadow-md border-2 border-primary/20">
                      {profile.name ? profile.name.slice(0, 2) : <User className="w-8 h-8" />}
                    </div>
                    <span className="absolute -bottom-1 -end-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-card ring-1 ring-emerald-300" title="Active File" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-heading font-bold text-foreground text-lg sm:text-xl">
                        {profile.name || (lang === 'fa' ? 'مراجع محترم' : 'Valued Patient')}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                        {lang === 'fa' ? 'پرونده فعال سلامت روان' : 'Active Medical File'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1.5">
                      <span className="font-mono" dir="ltr">{phone}</span>
                      <span>•</span>
                      <span className="font-medium text-foreground/80">
                        {lang === 'fa' ? `شماره پرونده: ${fileRecordNumber}` : `File: ${fileRecordNumber}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Quick Portal Actions */}
                <div className="flex items-center gap-2.5 self-stretch md:self-auto justify-end">
                  <button
                    onClick={() => { setActiveTab('new_booking'); setStep(0); }}
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold btn-soft-glow hover:opacity-95 transition-all shadow-xs cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{t('panel_new_appointment')}</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs font-medium transition-all cursor-pointer"
                    title={t('panel_logout')}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t('panel_logout')}</span>
                  </button>
                </div>

              </div>

              {/* Portal Navigation Tabs */}
              <div className="flex items-center gap-2 mt-6 pt-5 border-t border-border/60 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'appointments'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'نوبت‌های درمانی من' : 'My Appointments'}</span>
                  {activeAppts.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-secondary text-primary font-bold text-[10px] flex items-center justify-center">
                      {activeAppts.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('chat')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'chat'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'گفتگو و چت با پزشک' : 'Chat with Doctor'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'پروفایل و اطلاعات پزشکی' : 'Profile & Health Info'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('guidelines')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'guidelines'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'راهنمای آمادگی جلسات' : 'Session Preparation Guide'}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('new_booking'); setStep(0); }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'new_booking'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'رزرو نوبت جدید' : 'Book Appointment'}</span>
                </button>
              </div>

            </div>

            {/* Success Toast */}
            {successMessage && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 text-emerald-300 border border-emerald-700/40 flex items-center gap-3 text-xs sm:text-sm animate-fade-in shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-medium">{successMessage}</span>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 1: APPOINTMENTS LIST */}
            {/* ========================================================= */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                
                {/* ACTIVE APPOINTMENTS */}
                <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-7 shadow-xs">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-heading font-bold text-foreground text-lg sm:text-xl flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>{t('panel_upcoming')}</span>
                    </h3>

                    {activeAppts.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {lang === 'fa' ? `${activeAppts.length} نوبت فعال` : `${activeAppts.length} Active`}
                      </span>
                    )}
                  </div>

                  {activeAppts.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-2xl space-y-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                        <CalendarHeart className="w-6 h-6" />
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                        {t('panel_no_upcoming')}
                      </p>
                      <button
                        onClick={() => { setActiveTab('new_booking'); setStep(0); }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95 cursor-pointer"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>{t('panel_new_appointment')}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activeAppts.map((appt) => {
                        const isPending = appt.status === 'pending_approval';

                        return (
                          <div
                            key={appt.id}
                            className="rounded-2xl border border-border/80 p-5 bg-background hover:border-primary/40 transition-all shadow-2xs space-y-4"
                          >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  {isPending ? (
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 animate-pulse">
                                      {lang === 'fa' ? 'در انتظار تایید پزشک' : 'Pending Doctor Approval'}
                                    </span>
                                  ) : (
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-700/30">
                                      {lang === 'fa' ? 'نوبت تایید شده' : 'Confirmed'}
                                    </span>
                                  )}
                                  <span className="font-bold text-foreground text-sm sm:text-base">
                                    {getServiceName(appt.service)}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {lang === 'fa' ? 'نام بیمار:' : 'Patient:'}{' '}
                                  <span className="text-foreground font-medium">{appt.patient_name}</span>
                                </p>
                              </div>

                              {/* Cancel Button */}
                              <button
                                onClick={() => handleCancelAppointment(appt.id)}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-destructive border border-destructive/30 hover:bg-destructive/10 transition-all shrink-0 cursor-pointer"
                              >
                                {t('panel_cancel')}
                              </button>
                            </div>

                            {/* Status Helper Banner for Pending */}
                            {isPending && (
                              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <span>
                                  {isFa 
                                    ? 'درخواست ویزیت شما دریافت شد. منشی کلینیک یا دکتر مومنی پس از بازبینی برنامه بالینی، وضعیت را تایید و پیامک اطلاع‌رسانی ارسال خواهند کرد.'
                                    : 'Your booking has been received and will be confirmed shortly by clinic admin via SMS.'}
                                </span>
                              </div>
                            )}

                            {/* Details Bar */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-border/40 text-xs">
                              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border/50" dir="ltr">
                                <Calendar className="w-4 h-4 text-primary shrink-0" />
                                <span className="font-mono font-medium">{appt.date}</span>
                              </div>

                              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border/50" dir="ltr">
                                <Clock className="w-4 h-4 text-primary shrink-0" />
                                <span className="font-mono font-medium">{appt.time_slot}</span>
                              </div>

                              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border/50">
                                {appt.visit_type === 'in_person' ? (
                                  <>
                                    <Building2 className="w-4 h-4 text-primary shrink-0" />
                                    <span className="font-medium text-foreground">{lang === 'fa' ? 'بیمارستان نیکان غرب' : 'Nikan Gharb Hospital'}</span>
                                  </>
                                ) : (
                                  <>
                                    <Video className="w-4 h-4 text-secondary shrink-0" />
                                    <span className="font-medium text-foreground">{lang === 'fa' ? 'مشاوره تصویری آنلاین' : 'Online Video'}</span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Quick Action links */}
                            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                              {appt.visit_type === 'online' ? (
                                <div className="inline-flex items-center gap-1.5 text-secondary text-xs font-semibold">
                                  <Video className="w-3.5 h-3.5" />
                                  <span>{lang === 'fa' ? 'لینک ورود امن تصویری پس از تایید فعال می‌گردد' : 'Encrypted video room link activated upon approval'}</span>
                                </div>
                              ) : (
                                <div className="inline-flex items-center gap-1.5 text-muted-foreground text-xs">
                                  <MapPin className="w-3.5 h-3.5 text-primary" />
                                  <span>{lang === 'fa' ? 'تهران، اتوبان همت غرب، بیمارستان نیکان غرب، کلینیک مغز و اعصاب' : 'Nikan Gharb Hospital, Neuropsychiatry Dept'}</span>
                                </div>
                              )}

                              <span className="text-[11px] text-muted-foreground">
                                {lang === 'fa' ? 'پزشک معالج: دکتر فاطمه مومنی' : 'Physician: Dr. Fatemeh Momeni'}
                              </span>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* PAST / CANCELLED APPOINTMENTS */}
                {pastAppts.length > 0 && (
                  <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-7 shadow-xs">
                    <h3 className="font-heading font-bold text-foreground text-base sm:text-lg mb-4 text-muted-foreground">
                      {t('panel_history')}
                    </h3>
                    <div className="space-y-3">
                      {pastAppts.map((appt) => (
                        <div
                          key={appt.id}
                          className="rounded-2xl border border-border/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-muted/30 text-muted-foreground"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-foreground">{getServiceName(appt.service)}</span>
                              <span>•</span>
                              <span dir="ltr" className="font-mono">{appt.date} ({appt.time_slot})</span>
                            </div>
                            {appt.rejection_reason && (
                              <p className="text-[11px] text-destructive/80">
                                {isFa ? `علت لغو: ${appt.rejection_reason}` : `Cancellation reason: ${appt.rejection_reason}`}
                              </p>
                            )}
                          </div>
                          <span className={`px-2.5 py-1 rounded-md font-medium shrink-0 self-start sm:self-auto ${
                            appt.status === 'cancelled' ? 'bg-destructive/10 text-destructive' : 'bg-muted text-foreground'
                          }`}>
                            {appt.status === 'cancelled' ? (lang === 'fa' ? 'لغو شده' : 'Cancelled') : (lang === 'fa' ? 'جلسه انجام‌شده' : 'Completed')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Doctor / Clinic Admin Access Card in Appointments Tab */}
                <div className="p-4 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        {isFa ? 'ورود به پنل پزشک و مدیریت کلینیک' : 'Doctor & Clinic Admin Portal'}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {isFa ? 'بررسی، تایید، لغو نوبت‌ها، تنظیم تقویم و صدور نسخه الکترونیک' : 'Approve, reschedule, or cancel bookings, manage clinic capacity and write e-prescriptions'}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold border border-primary/25 transition-all shrink-0 cursor-pointer"
                  >
                    <span>{isFa ? 'ورود به پنل پزشک' : 'Doctor Dashboard'}</span>
                    <ArrowLeft className="w-3.5 h-3.5 rtl:inline-block ltr:hidden" />
                    <ArrowRight className="w-3.5 h-3.5 ltr:inline-block rtl:hidden" />
                  </Link>
                </div>

              </div>
            )}

            {/* ========================================================= */}
            {/* TAB: SECURE CHAT WITH DR. MOMENI */}
            {/* ========================================================= */}
            {activeTab === 'chat' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span>{lang === 'fa' ? 'ارتباط مستقیم با دکتر فاطمه مومنی' : 'Direct Medical Chat with Dr. Momeni'}</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {lang === 'fa' ? 'ارسال سوالات دارویی، پایش روند بهبودی، دریافت نسخه‌ها و پیام‌های صوتی' : 'Ask medication questions, follow up treatment, and receive e-prescriptions.'}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{lang === 'fa' ? 'ارتباط امن و محرمانه پزشکی' : 'Encrypted Medical Channel'}</span>
                  </span>
                </div>

                <DoctorPatientChat
                  mode="patient"
                  defaultPatientPhone={phone}
                  defaultPatientName={profile.name || (lang === 'fa' ? 'مراجع محترم' : 'Patient')}
                />
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: PROFILE & HEALTH RECORD */}
            {/* ========================================================= */}
            {activeTab === 'profile' && (
              <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 shadow-xs">
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-heading font-bold text-foreground text-lg sm:text-xl flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      <span>{lang === 'fa' ? 'اطلاعات پرونده و مشخصات فردی' : 'Patient Profile & Medical Record'}</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {lang === 'fa' ? 'این اطلاعات صرفاً جهت دسترسی پزشک و پرونده درمانی بالینی استفاده می‌شود.' : 'Confidential data for Dr. Momeni’s clinical file.'}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                    {fileRecordNumber}
                  </span>
                </div>

                {profileSavedToast && (
                  <div className="mb-6 p-4 rounded-2xl bg-emerald-950/40 text-emerald-300 border border-emerald-700/40 flex items-center gap-3 text-xs sm:text-sm animate-fade-in">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{lang === 'fa' ? 'تغییرات پرونده با موفقیت ذخیره گردید.' : 'Profile changes saved successfully.'}</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        {lang === 'fa' ? 'نام و نام خانوادگی بیمار' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        placeholder={lang === 'fa' ? 'مثال: سارا محمدی' : 'e.g. Sara Mohammadi'}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        {lang === 'fa' ? 'شماره موبایل ثبت‌شده' : 'Registered Mobile'}
                      </label>
                      <input
                        type="text"
                        disabled
                        value={phone}
                        dir="ltr"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/60 text-muted-foreground text-xs sm:text-sm font-mono cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        {lang === 'fa' ? 'شهر محل سکونت' : 'City of Residence'}
                      </label>
                      <input
                        type="text"
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                        placeholder={lang === 'fa' ? 'تهران / رشت / خارج از کشور' : 'Tehran / Abroad'}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        {lang === 'fa' ? 'سال تولد (شمسی یا میلادی)' : 'Birth Year'}
                      </label>
                      <input
                        type="text"
                        value={profile.birthYear}
                        onChange={(e) => setProfile({ ...profile, birthYear: e.target.value })}
                        placeholder="۱۳۷۰"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        {lang === 'fa' ? 'شیوه دریافت یادآور جلسات' : 'Reminders Channel'}
                      </label>
                      <select
                        value={profile.notificationPref}
                        onChange={(e) => setProfile({ ...profile, notificationPref: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none"
                      >
                        <option value="sms">{lang === 'fa' ? 'پیامک هوشمند (SMS)' : 'SMS'}</option>
                        <option value="whatsapp">{lang === 'fa' ? 'واتس‌اپ (برای مراجعین خارج از کشور)' : 'WhatsApp'}</option>
                        <option value="both">{lang === 'fa' ? 'هر دو روش' : 'Both'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        {lang === 'fa' ? 'نام تماس اضطراری / همراه' : 'Emergency Contact Name'}
                      </label>
                      <input
                        type="text"
                        value={profile.emergencyContactName}
                        onChange={(e) => setProfile({ ...profile, emergencyContactName: e.target.value })}
                        placeholder={lang === 'fa' ? 'نام همسر، والدین یا دوست نزدیک' : 'Spouse, Parent or Friend'}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        {lang === 'fa' ? 'شماره تماس اضطراری' : 'Emergency Contact Phone'}
                      </label>
                      <input
                        type="tel"
                        value={profile.emergencyContactPhone}
                        onChange={(e) => setProfile({ ...profile, emergencyContactPhone: e.target.value })}
                        placeholder="0912..."
                        dir="ltr"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm font-mono focus:ring-2 focus:ring-primary/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      {lang === 'fa' ? 'یادداشت یا سابقه پزشکی برای پزشک (داروهای مصرفی، حساسیت‌ها، سوابق قبلی)' : 'Medical History Notes for Doctor'}
                    </label>
                    <textarea
                      rows={3}
                      value={profile.medicalHistoryNotes}
                      onChange={(e) => setProfile({ ...profile, medicalHistoryNotes: e.target.value })}
                      placeholder={lang === 'fa' ? 'در صورت مصرف هرگونه داروی اعصاب، بیماری‌های زمینه‌ای یا حساسیت دارویی، در اینجا ثبت فرمایید...' : 'List current medications, allergies, or prior clinical psychiatric history...'}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-xs sm:text-sm text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:opacity-95 transition-all shadow-xs cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{lang === 'fa' ? 'ذخیره تغییرات پرونده' : 'Save Profile Changes'}</span>
                    </button>
                  </div>

                </form>

              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: SESSION PREPARATION GUIDELINES */}
            {/* ========================================================= */}
            {activeTab === 'guidelines' && (
              <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 shadow-xs space-y-6">
                
                <div>
                  <h3 className="font-heading font-bold text-foreground text-lg sm:text-xl flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span>{lang === 'fa' ? 'راهنما و چک‌لیست آمادگی برای جلسه ویزیت' : 'Session Preparation Guidelines'}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {lang === 'fa' ? 'رعایت این نکات به بالاترین کیفیت ارزیابی و درمان بالینی کمک شایانی می‌نماید.' : 'Key recommendations for an optimal clinical consultation.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* In Person Guide */}
                  <div className="rounded-2xl border border-border p-5 bg-background space-y-3">
                    <div className="flex items-center gap-2.5 text-primary font-bold text-sm">
                      <Building2 className="w-5 h-5" />
                      <span>{lang === 'fa' ? 'ویزیت حضوری در بیمارستان نیکان غرب' : 'In-Person Visit at Nikan Hospital'}</span>
                    </div>

                    <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{lang === 'fa' ? 'حضور ۱۰ تا ۱۵ دقیقه قبل از زمان مقرر در طبقه درمانگاه اعصاب و روان' : 'Arrive 10-15 minutes prior at Psychiatry clinic'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{lang === 'fa' ? 'همراه داشتن آخرین آزمایش‌های خونی، تیروئید یا سوابق دارویی قبلی' : 'Bring recent thyroid/blood test results and medication boxes'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{lang === 'fa' ? 'امکان استفاده از پارکینگ طبقاتی بیمارستان نیکان با دسترسی آسان' : 'Hospital multi-storey parking available with direct elevator'}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Online Guide */}
                  <div className="rounded-2xl border border-border p-5 bg-background space-y-3">
                    <div className="flex items-center gap-2.5 text-primary font-bold text-sm">
                      <Video className="w-5 h-5" />
                      <span>{lang === 'fa' ? 'مشاوره آنلاین تصویری (سراسری / خارج از کشور)' : 'Online Video Sessions'}</span>
                    </div>

                    <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{lang === 'fa' ? 'حضور در اتاقی آرام، خصوصی و با نور مناسب برای تضمین محرمانگی کامل' : 'Join from a private, quiet room with adequate lighting'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{lang === 'fa' ? 'استفاده از هندزفری یا هدست برای ارتقای وضوح صدای مکالمه' : 'Use headphones/earphones for enhanced audio clarity'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{lang === 'fa' ? 'امکان صدور نسخه الکترونیک معتبر بیمه‌ای یا گزارش به زبان انگلیسی برای خارج از کشور' : 'Digital e-prescription and English medical reports available'}</span>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>
            )}
            
            {/* ========================================================= */}
            {/* TAB 4: NEW APPOINTMENT STEPPER */}
            {/* ========================================================= */}
            {activeTab === 'new_booking' && (
              <div className="rounded-3xl bg-card border-2 border-primary/30 p-6 sm:p-8 shadow-xl">
                
                {/* Stepper Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-3">
                    <span className={step >= 0 ? 'text-primary font-bold' : ''}>{t('bk_step_service')}</span>
                    <span className={step >= 1 ? 'text-primary font-bold' : ''}>{t('bk_step_type')}</span>
                    <span className={step >= 2 ? 'text-primary font-bold' : ''}>{t('bk_step_date')}</span>
                    <span className={step >= 3 ? 'text-primary font-bold' : ''}>{t('bk_step_info')}</span>
                  </div>
                  
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300 rounded-full"
                      style={{ width: `${((step + 1) / 4) * 100}%` }}
                    />
                  </div>
                </div>

                <form onSubmit={handleCreateBooking}>
                  
                  {/* Step 0: Service Selection */}
                  {step === 0 && (
                    <div className="space-y-4">
                      <h3 className="font-heading font-bold text-foreground text-base sm:text-lg">
                        {t('bk_step_service')}
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {serviceKeys.map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => {
                              setDraft({ ...draft, service: item.key });
                              setStep(1);
                            }}
                            className={`p-4 rounded-2xl border text-start transition-all cursor-pointer ${
                              draft.service === item.key
                                ? 'border-primary bg-primary/10 shadow-xs'
                                : 'border-border bg-background hover:border-primary/40'
                            }`}
                          >
                            <p className="font-heading font-bold text-foreground text-sm">
                              {t(item.titleKey)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                              {t(item.descKey)}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 1: Visit Format */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="font-heading font-bold text-foreground text-base sm:text-lg">
                        {t('bk_step_type')}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            setDraft({ ...draft, visit_type: 'in_person' });
                            setStep(2);
                          }}
                          className={`p-6 rounded-3xl border text-start transition-all cursor-pointer ${
                            draft.visit_type === 'in_person'
                              ? 'border-primary bg-primary/10 shadow-sm'
                              : 'border-border bg-background hover:border-primary/40'
                          }`}
                        >
                          <Building2 className="w-8 h-8 text-primary mb-3" />
                          <h4 className="font-heading font-bold text-foreground text-base">{t('visit_inperson_title')}</h4>
                          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{t('visit_inperson_desc')}</p>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setDraft({ ...draft, visit_type: 'online' });
                            setStep(2);
                          }}
                          className={`p-6 rounded-3xl border text-start transition-all cursor-pointer ${
                            draft.visit_type === 'online'
                              ? 'border-secondary bg-secondary/10 shadow-sm'
                              : 'border-border bg-background hover:border-secondary/40'
                          }`}
                        >
                          <Video className="w-8 h-8 text-secondary mb-3" />
                          <h4 className="font-heading font-bold text-foreground text-base">{t('visit_online_title')}</h4>
                          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{t('visit_online_desc')}</p>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Date & Slot Selection */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-heading font-bold text-foreground text-base sm:text-lg mb-1">
                          {t('bk_step_date')}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {isFa ? 'روز کاری مورد نظر خود را انتخاب نمایید:' : 'Select preferred consultation day:'}
                        </p>
                      </div>

                      {/* Day selector pills */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                        {availableDays.map((d) => (
                          <button
                            key={d.dateStr}
                            type="button"
                            onClick={() => setDraft({ ...draft, date: d.dateStr })}
                            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                              draft.date === d.dateStr
                                ? 'border-primary bg-primary text-primary-foreground font-bold shadow-xs'
                                : 'border-border bg-background hover:border-primary/40'
                            }`}
                          >
                            <p className="text-xs font-semibold">{isFa ? d.dayNameFa : d.dayNameEn}</p>
                            <p className="text-xs opacity-90 mt-0.5">{isFa ? d.dateDisplayFa : d.dateDisplayEn}</p>
                          </button>
                        ))}
                      </div>

                      {/* Time Slots */}
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-foreground">
                          {isFa ? 'انتخاب ساعت حضور یا تماس ویدیویی:' : 'Select Time Slot:'}
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                          {SLOTS.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setDraft({ ...draft, time_slot: slot })}
                              className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                                draft.time_slot === slot
                                  ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                                  : 'border-border bg-background hover:border-primary/40'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95 cursor-pointer"
                        >
                          {isFa ? 'مرحله بعد: ثبت مشخصات' : 'Next Step'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Confirmation & Notes */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <h3 className="font-heading font-bold text-foreground text-base sm:text-lg">
                        {t('bk_step_info')}
                      </h3>

                      {/* Booking Summary Box */}
                      <div className="p-4 rounded-2xl bg-muted/50 border border-border/80 text-xs space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isFa ? 'نوع خدمت:' : 'Service:'}</span>
                          <span className="font-bold text-foreground">{getServiceName(draft.service)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isFa ? 'شیوه ویزیت:' : 'Format:'}</span>
                          <span className="font-bold text-foreground">
                            {draft.visit_type === 'in_person' ? (isFa ? 'حضوری بیمارستان نیکان غرب' : 'In-Person Nikan') : (isFa ? 'مشاوره آنلاین تصویری' : 'Online Video')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isFa ? 'تاریخ و زمان:' : 'Date & Time:'}</span>
                          <span className="font-bold font-mono text-foreground" dir="ltr">{draft.date} ({draft.time_slot})</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">
                          {isFa ? 'نام و نام خانوادگی بیمار' : 'Patient Name'} *
                        </label>
                        <input
                          type="text"
                          required
                          value={draft.patient_name}
                          onChange={(e) => setDraft({ ...draft, patient_name: e.target.value })}
                          placeholder={isFa ? 'مثال: مریم احمدی' : 'e.g. Maryam Ahmadi'}
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-xs sm:text-sm text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">
                          {isFa ? 'توضیحات کوتاه یا شرح علائم برای پزشک (اختیاری)' : 'Chief Complaint or Symptoms (Optional)'}
                        </label>
                        <textarea
                          rows={3}
                          value={draft.notes}
                          onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                          placeholder={isFa ? 'علائم اصلی، سابقه مصرف داروهای اعصاب، هدف از جلسه...' : 'Describe symptoms, previous medications, or session goals...'}
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-xs text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none resize-none leading-relaxed"
                        />
                      </div>

                      <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-4 py-2 rounded-full border border-border text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          {isFa ? 'مرحله قبل' : 'Back'}
                        </button>

                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold btn-soft-glow hover:opacity-95 shadow-md cursor-pointer"
                        >
                          {isFa ? 'ثبت نهایی و ارسال به پزشک' : 'Submit Booking'}
                        </button>
                      </div>
                    </div>
                  )}

                </form>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
