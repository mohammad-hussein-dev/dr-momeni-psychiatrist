import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  User,
  Paperclip,
  Mic,
  FileText,
  Sparkles,
  Check,
  CheckCheck,
  Search,
  Phone,
  Video,
  Building2,
  Calendar,
  Clock,
  Download,
  AlertCircle,
  MoreVertical,
  MoreHorizontal,
  Trash2,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  Pause,
  ArrowRight,
  Smile,
  Copy,
  Edit3,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { ChatMessage, PatientThread, ServiceType, VisitType, MessageReaction } from '../../types';
import {
  getAllPatientThreads,
  getMessagesForPatient,
  sendChatMessage,
  markThreadAsRead,
  deleteChatMessage,
  toggleMessageReaction,
  editChatMessage
} from '../../lib/chatStore';
import { getAllAppointments, updateAppointmentStatus } from '../../lib/appointmentStore';

const CLINICAL_REACTIONS = [
  { emoji: '❤️', label_fa: 'همدلی و مهر', label_en: 'Support & Care' },
  { emoji: '🙏', label_fa: 'سپاس و احترام', label_en: 'Gratitude' },
  { emoji: '👍', label_fa: 'تایید و هماهنگ', label_en: 'Approved' },
  { emoji: '🩺', label_fa: 'نکته بالینی/پزشکی', label_en: 'Clinical' },
  { emoji: '💊', label_fa: 'دستور دارویی', label_en: 'Medication' },
  { emoji: '💡', label_fa: 'راهکار و بینش', label_en: 'Insight' },
  { emoji: '😊', label_fa: 'امید و لبخند', label_en: 'Warmth' },
];

interface DoctorPatientChatProps {
  mode: 'doctor' | 'patient';
  defaultPatientPhone?: string;
  defaultPatientName?: string;
  className?: string;
}

export const DoctorPatientChat: React.FC<DoctorPatientChatProps> = ({
  mode,
  defaultPatientPhone = '09123456789',
  defaultPatientName = 'مریم احمدی',
  className = ''
}) => {
  const { t, lang, isRTL } = useLanguage();
  const isFa = lang === 'fa';

  // Threads & Active Selected Chat
  const [threads, setThreads] = useState<PatientThread[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<string>(defaultPatientPhone);
  const [selectedPatientName, setSelectedPatientName] = useState<string>(defaultPatientName);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  // UI states
  const [inputText, setInputText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showQuickPresets, setShowQuickPresets] = useState<boolean>(false);
  const [showAttachMenu, setShowAttachMenu] = useState<boolean>(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [mobileThreadsOpen, setMobileThreadsOpen] = useState<boolean>(false);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  // Message Actions & Interactions
  const [activeMenuMsgId, setActiveMenuMsgId] = useState<string | null>(null);
  const [editingMsgId, setEditingMsgId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const voiceTimerRef = useRef<any>(null);

  const isDoctor = mode === 'doctor';

  // Quick Doctor Clinical Reply Templates
  const doctorQuickPresets = isFa ? [
    { title: 'ادامه دوز دارویی', text: 'سلام. پاسخ درمانی شما مطلوب است. لطفاً مصرف دارو را با همان دوز تجویز شده ادامه دهید و تغییرات خلقی را ثبت کنید.' },
    { title: 'ارسال دستور آزمایش', text: 'سلام. لطفاً برای ویزیت بعدی، آزمایش‌های روتین تیروئید (TSH/Free T4) و ویتامین D3 و CBC را همراه داشته باشید.' },
    { title: 'توصیه بهداشت خواب', text: 'سلام. پرهیز از صفحات دیجیتال ۱ ساعت قبل خواب، تاریکی کامل اتاق و دوش آب گرم به تنظیم ریتم شبانه‌روزی کمک می‌کند.' },
    { title: 'تایید ویزیت آنلاین', text: 'سلام. مدارک ارسالی شما بررسی شد. در موعد مقرر از طریق لینک جلسه آنلاین آماده گفتگو خواهیم بود.' }
  ] : [
    { title: 'Medication Continuation', text: 'Hello. Your clinical progress is positive. Please continue the current dosage and track daily mood.' },
    { title: 'Lab Work Request', text: 'Hello. Please bring recent Thyroid panel (TSH/Free T4) and Vitamin D3 results to your next follow-up.' },
    { title: 'Sleep Hygiene Advice', text: 'Hello. Avoid digital screens 1 hour before bedtime and maintain consistent sleep/wake times.' },
    { title: 'Tele-visit Confirmation', text: 'Hello. Your uploaded clinical history has been reviewed. See you in the online video session.' }
  ];

  // Refresh threads list
  const reloadThreads = () => {
    const list = getAllPatientThreads();
    setThreads(list);
    if (list.length > 0 && !selectedPhone && isDoctor) {
      setSelectedPhone(list[0].patientPhone);
      setSelectedPatientName(list[0].patientName);
    }
  };

  // Reload current conversation messages
  const reloadMessages = () => {
    if (!selectedPhone) return;
    const msgs = getMessagesForPatient(selectedPhone);
    setMessages(msgs);
    if (isDoctor) {
      markThreadAsRead(selectedPhone);
    }
  };

  useEffect(() => {
    reloadThreads();
    reloadMessages();

    const handleChatUpdate = (e: any) => {
      reloadThreads();
      reloadMessages();
    };

    window.addEventListener('dr_chat_update', handleChatUpdate);
    window.addEventListener('storage', handleChatUpdate);

    return () => {
      window.removeEventListener('dr_chat_update', handleChatUpdate);
      window.removeEventListener('storage', handleChatUpdate);
    };
  }, [selectedPhone]);

  // Auto-scroll inside the messages container only (NEVER scrolls main window/page!)
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  useEffect(() => {
    // When messages or selected thread changes, smoothly scroll the inner chat container down to the latest message
    const timer = setTimeout(() => {
      scrollToBottom('smooth');
    }, 60);
    return () => clearTimeout(timer);
  }, [messages, selectedPhone]);

  // Handle Voice Recording Simulation
  const toggleVoiceRecording = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setRecordingSeconds(0);
      voiceTimerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      // Finish recording and send voice note
      clearInterval(voiceTimerRef.current);
      setIsRecordingVoice(false);
      const duration = recordingSeconds || 5;

      sendChatMessage({
        patientPhone: selectedPhone,
        patientName: selectedPatientName,
        sender: isDoctor ? 'doctor' : 'patient',
        text: isDoctor 
          ? (isFa ? 'پیام صوتی توضیحات بالینی و راهنمای درمانی دکتر فاطمه مومنی' : 'Dr. Momeni Clinical Voice Memo')
          : (isFa ? 'پیام صوتی شرح حال مراجع' : 'Patient Voice Message'),
        attachmentType: 'voice_note',
        attachmentTitle: `Voice_Note_${duration}s.aac`,
        voiceDurationSeconds: duration
      });
      setRecordingSeconds(0);
      reloadMessages();
      reloadThreads();
    }
  };

  const handleCancelVoice = () => {
    clearInterval(voiceTimerRef.current);
    setIsRecordingVoice(false);
    setRecordingSeconds(0);
  };

  const handleToggleReaction = (msgId: string, emoji: string) => {
    toggleMessageReaction(
      msgId,
      emoji,
      isDoctor ? 'doctor' : 'patient',
      isDoctor ? 'دکتر فاطمه مومنی' : selectedPatientName
    );
    setActiveMenuMsgId(null);
    reloadMessages();
  };

  const handleCopyText = (text: string, msgId: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedMsgId(msgId);
    setActiveMenuMsgId(null);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleStartEdit = (msg: ChatMessage) => {
    setEditingMsgId(msg.id);
    setEditingText(msg.text);
    setActiveMenuMsgId(null);
  };

  const handleSaveEdit = (msgId: string) => {
    if (!editingText.trim()) return;
    editChatMessage(msgId, editingText.trim());
    setEditingMsgId(null);
    setEditingText('');
    reloadMessages();
  };

  const handleCancelEdit = () => {
    setEditingMsgId(null);
    setEditingText('');
  };

  const handleDeleteMessage = (msgId: string) => {
    if (window.confirm(isFa ? 'آیا از حذف این پیام بالینی اطمینان دارید؟' : 'Are you sure you want to delete this message?')) {
      deleteChatMessage(msgId);
      setActiveMenuMsgId(null);
      reloadMessages();
      reloadThreads();
    }
  };

  const renderDeliveryTicks = (msg: ChatMessage) => {
    const status = msg.deliveryStatus || (msg.read ? 'read' : 'delivered');
    
    if (status === 'read' || msg.read) {
      return (
        <span 
          className="inline-flex items-center text-sky-400 font-bold drop-shadow-xs" 
          title={isFa ? 'خوانده و مشاهده شده (دو تیک رنگی)' : 'Seen / Read'}
        >
          <CheckCheck className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
      );
    }
    
    if (status === 'delivered') {
      return (
        <span 
          className="inline-flex items-center text-white/75 dark:text-muted-foreground opacity-80" 
          title={isFa ? 'تحویل داده شد (دو تیک خاکستری)' : 'Delivered'}
        >
          <CheckCheck className="w-3.5 h-3.5 stroke-[1.8]" />
        </span>
      );
    }
    
    return (
      <span 
        className="inline-flex items-center text-white/70 dark:text-muted-foreground opacity-75" 
        title={isFa ? 'ارسال به سرور انجام شد (تک تیک)' : 'Sent'}
      >
        <Check className="w-3.5 h-3.5 stroke-[1.8]" />
      </span>
    );
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputText.trim();
    if (!text || !selectedPhone) return;

    sendChatMessage({
      patientPhone: selectedPhone,
      patientName: selectedPatientName,
      sender: isDoctor ? 'doctor' : 'patient',
      text
    });

    setInputText('');
    setShowQuickPresets(false);
    reloadMessages();
    reloadThreads();

    // If patient is sending, simulate auto-acknowledgment after 2.5s if desired
    if (!isDoctor) {
      setTimeout(() => {
        reloadMessages();
        reloadThreads();
      }, 1200);
    }
  };

  const handleSendAttachment = (type: 'prescription' | 'lab_report' | 'clinical_guide', title: string) => {
    if (!selectedPhone) return;
    sendChatMessage({
      patientPhone: selectedPhone,
      patientName: selectedPatientName,
      sender: isDoctor ? 'doctor' : 'patient',
      text: type === 'prescription' 
        ? (isFa ? 'نسخه الکترونیک و دستور دارویی رسمی با مهر نظام پزشکی صادر شد.' : 'Official Medical Prescription Generated.')
        : type === 'clinical_guide'
        ? (isFa ? 'فایل راهنمای بالینی و پایش سلامت پیوست گردید.' : 'Clinical Guide Attachment.')
        : (isFa ? 'فایل گزارش آزمایشگاهی ضمیمه شد.' : 'Laboratory Test Report Attachment.'),
      attachmentType: type,
      attachmentTitle: title
    });
    setShowAttachMenu(false);
    reloadMessages();
    reloadThreads();
  };

  const selectPatientThread = (thread: PatientThread) => {
    setSelectedPhone(thread.patientPhone);
    setSelectedPatientName(thread.patientName);
    setMobileThreadsOpen(false);
    markThreadAsRead(thread.patientPhone);
    reloadThreads();
  };

  const filteredThreads = threads.filter(t => 
    t.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.patientPhone.includes(searchQuery)
  );

  // Find active appointment details for header info
  const allAppts = getAllAppointments();
  const currentPatientAppt = allAppts.find(a => a.patient_phone.replace(/\D/g, '') === selectedPhone.replace(/\D/g, ''));

  return (
    <div className={`rounded-3xl bg-card border border-border/80 shadow-lg overflow-hidden flex flex-col md:flex-row h-[720px] max-h-[85vh] ${className}`}>
      
      {/* ========================================================================= */}
      {/* 1. LEFT/RIGHT SIDEBAR: PATIENTS LIST (DOCTOR MODE ONLY) */}
      {/* ========================================================================= */}
      {isDoctor && (
        <div className={`w-full md:w-80 lg:w-96 border-b md:border-b-0 ${isRTL ? 'md:border-l' : 'md:border-r'} border-border/70 bg-card/60 flex flex-col shrink-0 ${
          mobileThreadsOpen ? 'block' : 'hidden md:flex'
        }`}>
          
          {/* Threads Header */}
          <div className="p-3.5 sm:p-4 border-b border-border/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-foreground">
                    {isFa ? 'گفتگوهای بالینی مراجعین' : 'Patient Clinical Threads'}
                  </h3>
                  <span className="text-[10px] text-muted-foreground">
                    {isFa ? `${threads.length} پرونده فعال` : `${threads.length} active`}
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isFa ? 'ارتباط امن' : 'Encrypted'}</span>
              </span>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isFa ? 'جستجوی بیمار یا شماره تماس...' : 'Search patients...'}
                className="w-full ps-8.5 pe-3 py-1.5 rounded-xl border border-border/80 bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          {/* Threads List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-border/40">
            {filteredThreads.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground text-xs">
                {isFa ? 'گفتگویی با این مشخصات یافت نشد.' : 'No threads found.'}
              </div>
            ) : (
              filteredThreads.map(th => {
                const isSelected = th.patientPhone.replace(/\D/g, '') === selectedPhone.replace(/\D/g, '');

                return (
                  <button
                    key={th.patientPhone}
                    onClick={() => selectPatientThread(th)}
                    className={`w-full text-start p-3.5 transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-primary/10 border-s-4 border-primary'
                        : 'hover:bg-muted/40'
                    }`}
                  >
                    {/* Avatar with Status Dot */}
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/40 text-primary flex items-center justify-center font-bold text-sm border border-primary/20 shadow-2xs">
                        {th.patientName.slice(0, 1) || <User className="w-4 h-4" />}
                      </div>
                      {th.isOnline && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" title="آنلاین" />
                      )}
                    </div>

                    {/* Patient Name & Snippet */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`font-semibold text-xs truncate ${isSelected ? 'text-primary font-bold' : 'text-foreground'}`}>
                          {th.patientName}
                        </span>
                        <span className="text-[10px] text-muted-foreground shrink-0 font-mono" dir="ltr">
                          {new Date(th.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className="text-[11px] text-muted-foreground truncate leading-relaxed">
                        {th.lastMessage?.text || (isFa ? 'پیام جدید' : 'New message')}
                      </p>

                      <div className="flex items-center justify-between gap-1 mt-1.5">
                        <span className="text-[10px] text-muted-foreground/80 font-mono" dir="ltr">
                          {th.patientPhone}
                        </span>

                        {th.unreadCount > 0 && (
                          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-primary text-primary-foreground animate-pulse">
                            {th.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN CHAT AREA */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 bg-background/50 relative">
        
        {/* Chat Top Bar */}
        <div className="p-3 sm:p-4 border-b border-border/70 bg-card/80 backdrop-blur-sm flex items-center justify-between gap-2 shrink-0">
          
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Back to Threads Button (Doctor Mode) */}
            {isDoctor && (
              <button
                onClick={() => setMobileThreadsOpen(true)}
                className="md:hidden w-8 h-8 rounded-xl bg-muted text-foreground flex items-center justify-center shrink-0"
              >
                {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            )}

            {/* Avatar */}
            <div className="w-10 h-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center font-bold text-sm border border-primary/25 shrink-0 shadow-2xs">
              {isDoctor ? (selectedPatientName.slice(0, 1) || <User className="w-4 h-4" />) : <ShieldCheck className="w-5 h-5 text-primary" />}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-heading font-bold text-xs sm:text-sm text-foreground truncate">
                  {isDoctor ? selectedPatientName : (isFa ? 'دکتر فاطمه مومنی (متخصص اعصاب و روان)' : 'Dr. Fatemeh Momeni (M.D.)')}
                </h4>
                
                {!isDoctor && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary border border-primary/25 whitespace-nowrap">
                    {isFa ? 'نظام پزشکی: ۱۳۳۴۳۹' : 'M.D. 133439'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{isFa ? 'پاسخگویی بالینی فعال' : 'Active Clinical Channel'}</span>
                </span>
                
                {currentPatientAppt && (
                  <>
                    <span>•</span>
                    <span className="truncate">
                      {currentPatientAppt.visit_type === 'in_person' ? (isFa ? 'بیمارستان نیکان غرب' : 'Nikan Hospital') : (isFa ? 'مشاوره آنلاین تصویری' : 'Tele-visit')}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {isDoctor && (
              <a
                href={`tel:${selectedPhone}`}
                className="w-8 h-8 rounded-xl bg-card border border-border/80 text-foreground hover:text-primary flex items-center justify-center transition-colors"
                title={isFa ? 'تماس با بیمار' : 'Call Patient'}
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
              </a>
            )}

            <div className="px-2.5 py-1 rounded-xl bg-muted/60 border border-border/60 text-[10px] text-muted-foreground font-mono" dir="ltr">
              {isDoctor ? selectedPhone : '021-29124000'}
            </div>
          </div>

        </div>

        {/* Message Feed Area */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-5 space-y-4"
        >
          
          {/* Clinic Security Badge Disclaimer */}
          <div className="p-3 rounded-2xl bg-muted/40 border border-border/60 text-center max-w-md mx-auto">
            <p className="text-[10px] sm:text-[11px] text-muted-foreground flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>
                {isFa 
                  ? 'تمامی مکاتبات و فایل‌های تبادل‌شده مطابق کدهای اخلاق پزشکی و محرمانگی بالینی رمزنگاری شده است.'
                  : 'All clinical exchanges and files are strictly confidential under medical privacy standards.'}
              </span>
            </p>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto opacity-50" />
              <p className="text-xs text-muted-foreground">
                {isFa ? 'هیچ پیامی در این گفتگو ثبت نشده است. اولین پیام را ارسال کنید.' : 'No messages yet in this conversation.'}
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = (isDoctor && msg.sender === 'doctor') || (!isDoctor && msg.sender === 'patient');
              const isMenuOpen = activeMenuMsgId === msg.id;
              const isEditing = editingMsgId === msg.id;
              const hasReactions = msg.reactions && msg.reactions.length > 0;

              // Group reactions by emoji and capture reactor identities cleanly
              const reactionGroups: {
                emoji: string;
                count: number;
                userReacted: boolean;
                hasDoctor: boolean;
                hasPatient: boolean;
                doctorName?: string;
                patientName?: string;
                tooltipText: string;
              }[] = [];

              if (msg.reactions && msg.reactions.length > 0) {
                const currentRole = isDoctor ? 'doctor' : 'patient';
                const groupMap: Record<string, {
                  count: number;
                  userReacted: boolean;
                  hasDoctor: boolean;
                  hasPatient: boolean;
                  doctorName?: string;
                  patientName?: string;
                  names: string[];
                }> = {};

                msg.reactions.forEach(r => {
                  if (!groupMap[r.emoji]) {
                    groupMap[r.emoji] = {
                      count: 0,
                      userReacted: false,
                      hasDoctor: false,
                      hasPatient: false,
                      names: []
                    };
                  }
                  const entry = groupMap[r.emoji];
                  entry.count += 1;
                  if (r.by === currentRole) {
                    entry.userReacted = true;
                  }
                  if (r.by === 'doctor') {
                    entry.hasDoctor = true;
                    entry.doctorName = r.name || (isFa ? 'دکتر فاطمه مومنی' : 'Dr. Fatemeh Momeni');
                    if (!entry.names.includes(entry.doctorName)) {
                      entry.names.push(entry.doctorName);
                    }
                  } else {
                    entry.hasPatient = true;
                    entry.patientName = r.name || msg.patientName || (isFa ? 'مراجع' : 'Patient');
                    if (!entry.names.includes(entry.patientName)) {
                      entry.names.push(entry.patientName);
                    }
                  }
                });

                Object.entries(groupMap).forEach(([emoji, data]) => {
                  const namesStr = data.names.join(isFa ? ' و ' : ', ');
                  const tooltipText = isFa ? `واکنش: ${namesStr}` : `Reaction by ${namesStr}`;
                  reactionGroups.push({
                    emoji,
                    count: data.count,
                    userReacted: data.userReacted,
                    hasDoctor: data.hasDoctor,
                    hasPatient: data.hasPatient,
                    doctorName: data.doctorName,
                    patientName: data.patientName,
                    tooltipText
                  });
                });
              }

              return (
                <div
                  key={msg.id}
                  className={`group relative flex flex-col ${isMe ? 'items-end' : 'items-start'} my-1.5`}
                >
                  <div className={`flex items-center gap-1.5 max-w-[88%] sm:max-w-[78%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Bubble Container */}
                    <div
                      className={`relative rounded-3xl p-3.5 sm:p-4 transition-all shadow-xs w-full ${
                        isMe
                          ? 'bg-primary text-primary-foreground rounded-ee-xs'
                          : 'bg-card border border-border/80 text-foreground rounded-es-xs'
                      }`}
                    >
                      {/* Sender Tag if from Doctor to Patient */}
                      {!isMe && msg.sender === 'doctor' && (
                        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-bold text-primary">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{isFa ? 'دکتر فاطمه مومنی' : 'Dr. Fatemeh Momeni'}</span>
                        </div>
                      )}

                      {/* Editing Mode Inline */}
                      {isEditing ? (
                        <div className="space-y-2 py-1">
                          <textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            rows={3}
                            className={`w-full p-2.5 rounded-2xl text-xs sm:text-[13px] border focus:outline-none ${
                              isMe 
                                ? 'bg-black/20 text-white border-white/30 placeholder-white/60 focus:border-white' 
                                : 'bg-background text-foreground border-border focus:border-primary'
                            }`}
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className={`px-3 py-1 rounded-xl text-xs font-semibold cursor-pointer ${
                                isMe ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                            >
                              {isFa ? 'انصراف' : 'Cancel'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(msg.id)}
                              className={`px-3.5 py-1 rounded-xl text-xs font-bold shadow-xs cursor-pointer ${
                                isMe ? 'bg-white text-primary hover:bg-white/90' : 'bg-primary text-primary-foreground hover:opacity-90'
                              }`}
                            >
                              {isFa ? 'ذخیره تغییرات' : 'Save'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Standard Text Content */
                        <p className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap select-text">
                          {msg.text}
                        </p>
                      )}

                      {/* Attachment Render: Prescription */}
                      {msg.attachmentType === 'prescription' && (
                        <div className={`mt-3 p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                          isMe ? 'bg-black/15 border-white/20' : 'bg-primary/5 border-primary/20'
                        }`}>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-bold block truncate">{msg.attachmentTitle || (isFa ? 'نسخه الکترونیک دارویی' : 'Prescription')}</span>
                              <span className="text-[10px] opacity-80">{isFa ? 'دارای کد پیگیری و مهر دیجیتال' : 'Verified Medical Rx'}</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => alert(isFa ? `دریافت فایل نسخه: ${msg.attachmentTitle}` : `Downloading: ${msg.attachmentTitle}`)}
                            className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 shrink-0 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span className="text-[10px]">{isFa ? 'دانلود' : 'PDF'}</span>
                          </button>
                        </div>
                      )}

                      {/* Attachment Render: Lab Report / Guide */}
                      {(msg.attachmentType === 'lab_report' || msg.attachmentType === 'clinical_guide') && (
                        <div className={`mt-3 p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                          isMe ? 'bg-black/15 border-white/20' : 'bg-muted/60 border-border'
                        }`}>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-bold block truncate">{msg.attachmentTitle || 'Document.pdf'}</span>
                              <span className="text-[10px] opacity-80">{isFa ? 'سند ضمیمه بالینی' : 'Clinical Document'}</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => alert(isFa ? `مشاهده فایل: ${msg.attachmentTitle}` : `Viewing: ${msg.attachmentTitle}`)}
                            className="p-1.5 rounded-lg bg-card border border-border text-foreground hover:text-primary shrink-0 text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {/* Voice Memo Player Simulation */}
                      {msg.attachmentType === 'voice_note' && (
                        <div className={`mt-2.5 p-2.5 rounded-2xl border flex items-center gap-3 ${
                          isMe ? 'bg-black/20 border-white/20' : 'bg-primary/5 border-primary/20'
                        }`}>
                          <button
                            onClick={() => setPlayingVoiceId(playingVoiceId === msg.id ? null : msg.id)}
                            className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-2xs hover:scale-105 transition-all cursor-pointer"
                          >
                            {playingVoiceId === msg.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ms-0.5" />}
                          </button>
                          
                          {/* Audio Waveform Simulator */}
                          <div className="flex-1 flex items-center gap-1 h-5 overflow-hidden">
                            {[40, 70, 90, 60, 30, 80, 100, 75, 45, 90, 65, 30, 85, 50, 40].map((h, i) => (
                              <span
                                key={i}
                                style={{ height: `${h}%` }}
                                className={`w-1 rounded-full ${
                                  playingVoiceId === msg.id
                                    ? 'bg-primary animate-pulse'
                                    : isMe ? 'bg-white/60' : 'bg-primary/40'
                                }`}
                              />
                            ))}
                          </div>

                          <span className="text-[10px] font-mono shrink-0">
                            {msg.voiceDurationSeconds ? `00:${String(msg.voiceDurationSeconds).padStart(2, '0')}` : '00:08'}
                          </span>
                        </div>
                      )}

                      {/* Footer Metadata: Timestamp, Edited Indicator & Realistic Delivery Status */}
                      <div className={`flex items-center gap-1.5 mt-1.5 text-[9px] select-none ${
                        isMe ? 'text-primary-foreground/80 justify-end' : 'text-muted-foreground justify-start'
                      }`}>
                        {msg.editedAt && (
                          <span className="opacity-75 italic text-[8.5px]">
                            {isFa ? '(ویرایش شده)' : '(edited)'}
                          </span>
                        )}
                        <span dir="ltr">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isMe && renderDeliveryTicks(msg)}
                      </div>
                    </div>

                    {/* Three-Dots / Actions Menu Trigger Button */}
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveMenuMsgId(isMenuOpen ? null : msg.id)}
                        className={`p-1.5 rounded-full transition-all cursor-pointer ${
                          isMenuOpen
                            ? 'bg-primary/15 text-primary'
                            : 'opacity-0 group-hover:opacity-100 hover:bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                        title={isFa ? 'گزینه‌ها، واکنش و ویرایش' : 'Options & Reactions'}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {/* Copied to clipboard Toast tooltip */}
                      {copiedMsgId === msg.id && (
                        <div className="absolute -top-7 start-1/2 -translate-x-1/2 z-40 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold shadow-md animate-in fade-in duration-150 whitespace-nowrap">
                          {isFa ? 'کپی شد!' : 'Copied!'}
                        </div>
                      )}

                      {/* Contextual Action Dropdown Popover */}
                      {isMenuOpen && (
                        <>
                          {/* Backdrop to close */}
                          <div 
                            className="fixed inset-0 z-30" 
                            onClick={() => setActiveMenuMsgId(null)}
                          />

                          <div 
                            className={`absolute z-40 top-full mt-1 w-64 rounded-2xl bg-popover/95 backdrop-blur-md border border-border/80 shadow-xl p-2 space-y-2 text-foreground animate-in fade-in zoom-in-95 duration-150 ${
                              isMe ? 'end-0' : 'start-0'
                            }`}
                          >
                            {/* Reactions Ribbon */}
                            <div>
                              <div className="text-[10px] font-bold text-muted-foreground px-1.5 pb-1 flex items-center gap-1">
                                <Smile className="w-3 h-3 text-primary" />
                                <span>{isFa ? 'واکنش بالینی / احساسی:' : 'Quick Reaction:'}</span>
                              </div>
                              <div className="flex items-center justify-between gap-1 p-1 rounded-xl bg-muted/50 border border-border/50">
                                {CLINICAL_REACTIONS.map((rec) => {
                                  const isSelected = msg.reactions?.some(
                                    r => r.emoji === rec.emoji && r.by === (isDoctor ? 'doctor' : 'patient')
                                  );
                                  return (
                                    <button
                                      key={rec.emoji}
                                      type="button"
                                      onClick={() => handleToggleReaction(msg.id, rec.emoji)}
                                      title={isFa ? rec.label_fa : rec.label_en}
                                      className={`text-base p-1.5 rounded-lg hover:scale-125 transition-transform cursor-pointer ${
                                        isSelected ? 'bg-primary/20 ring-1 ring-primary' : 'hover:bg-background'
                                      }`}
                                    >
                                      {rec.emoji}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="h-px bg-border/60" />

                            {/* Action Buttons List */}
                            <div className="space-y-0.5 text-xs font-medium">
                              <button
                                type="button"
                                onClick={() => handleCopyText(msg.text, msg.id)}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-muted transition-colors text-start cursor-pointer"
                              >
                                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                                <span>{isFa ? 'کپی متن پیام' : 'Copy Message'}</span>
                              </button>

                              {(isMe || isDoctor) && (
                                <button
                                  type="button"
                                  onClick={() => handleStartEdit(msg)}
                                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-muted transition-colors text-start cursor-pointer"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-sky-500" />
                                  <span>{isFa ? 'ویرایش متن پیام' : 'Edit Message'}</span>
                                </button>
                              )}

                              {(isMe || isDoctor) && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-destructive/10 text-destructive transition-colors text-start cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>{isFa ? 'حذف پیام' : 'Delete Message'}</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Reaction Pills Row underneath Message */}
                  {hasReactions && (
                    <div className={`flex flex-wrap items-center gap-1.5 mt-1 px-1 select-none ${isMe ? 'justify-end' : 'justify-start'}`}>
                      {reactionGroups.map((rec) => (
                        <button
                          key={rec.emoji}
                          type="button"
                          onClick={() => handleToggleReaction(msg.id, rec.emoji)}
                          className={`group/rec inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono shadow-2xs border transition-all cursor-pointer ${
                            rec.userReacted
                              ? 'bg-primary/15 border-primary/40 text-primary font-bold scale-[1.02]'
                              : 'bg-card/95 border-border/80 text-foreground hover:bg-muted'
                          }`}
                          title={`${rec.tooltipText} - ${isFa ? 'کلیک برای ثبت / لغو واکنش' : 'Click to toggle'}`}
                        >
                          <span className="text-xs transition-transform group-hover/rec:scale-110 leading-none">{rec.emoji}</span>
                          
                          {/* Micro Author Badges - Crisp, neat and never intrusive */}
                          <div className="inline-flex items-center gap-0.5">
                            {rec.hasDoctor && (
                              <span
                                className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded-md bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[9px] font-bold tracking-tight"
                                title={rec.doctorName || (isFa ? 'دکتر فاطمه مومنی' : 'Dr. Momeni')}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                                <span>{isFa ? 'پزشک' : 'Dr'}</span>
                              </span>
                            )}

                            {rec.hasPatient && (
                              <span
                                className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded-md bg-sky-500/20 text-sky-800 dark:text-sky-300 text-[9px] font-bold tracking-tight"
                                title={rec.patientName || (isFa ? 'مراجع' : 'Patient')}
                              >
                                <User className="w-2.5 h-2.5 shrink-0" />
                                <span>{isFa ? 'مراجع' : 'Patient'}</span>
                              </span>
                            )}

                            {rec.count > 1 && (
                              <span className="text-[10px] font-bold text-muted-foreground ms-0.5">
                                {rec.count}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Doctor Quick Reply Preset Tray */}
        {isDoctor && showQuickPresets && (
          <div className="p-3 bg-card border-t border-border/80 space-y-2 animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between text-xs font-bold text-foreground">
              <span className="flex items-center gap-1.5 text-primary">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isFa ? 'قالب‌های پاسخ سریع بالینی پزشک:' : 'Doctor Clinical Quick Presets:'}</span>
              </span>
              <button onClick={() => setShowQuickPresets(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {doctorQuickPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(preset.text);
                    setShowQuickPresets(false);
                  }}
                  className="p-2.5 rounded-xl border border-border/80 bg-background/80 hover:border-primary/50 text-start text-xs transition-all flex flex-col gap-1 cursor-pointer"
                >
                  <span className="font-bold text-primary">{preset.title}</span>
                  <span className="text-[11px] text-muted-foreground line-clamp-1">{preset.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Attachment Menu Popup */}
        {showAttachMenu && (
          <div className="absolute bottom-20 start-4 z-30 p-2 rounded-2xl bg-card border border-border shadow-2xl space-y-1 w-64 animate-in fade-in slide-in-from-bottom-3 duration-200">
            {isDoctor ? (
              <>
                <button
                  onClick={() => handleSendAttachment('prescription', 'نسخه_الکترونیک_دارویی_دکتر_مومنی.pdf')}
                  className="w-full text-start p-2 rounded-xl hover:bg-primary/10 text-xs font-semibold text-foreground flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-primary" />
                  <span>{isFa ? 'صدور و ارسال نسخه الکترونیک' : 'Issue Electronic Rx'}</span>
                </button>

                <button
                  onClick={() => handleSendAttachment('clinical_guide', 'پروتکل_کنترل_اضطراب_و_بهداشت_خواب.pdf')}
                  className="w-full text-start p-2 rounded-xl hover:bg-primary/10 text-xs font-semibold text-foreground flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>{isFa ? 'ارسال راهنمای بالینی و پایش' : 'Send Clinical Guide'}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleSendAttachment('lab_report', 'گزارش_آزمایش_خون_و_تیروئید.pdf')}
                  className="w-full text-start p-2 rounded-xl hover:bg-primary/10 text-xs font-semibold text-foreground flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-sky-500" />
                  <span>{isFa ? 'ارسال فایل آزمایش یا نوار مغز' : 'Upload Lab / EEG File'}</span>
                </button>
              </>
            )}
          </div>
        )}

        {/* Bottom Chat Input Bar */}
        <div className="p-3 sm:p-4 border-t border-border/70 bg-card/90">
          
          {isRecordingVoice ? (
            /* Voice Recording Active Bar */
            <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-destructive/10 border border-destructive/20 animate-pulse">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-destructive animate-ping" />
                <span className="text-xs font-bold text-destructive">
                  {isFa ? 'در حال ضبط پیام صوتی بالینی...' : 'Recording Clinical Voice Note...'}
                </span>
                <span className="text-xs font-mono font-bold text-destructive">
                  00:{String(recordingSeconds).padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancelVoice}
                  className="px-3 py-1.5 rounded-xl bg-card border border-border text-xs text-muted-foreground hover:text-foreground"
                >
                  {isFa ? 'انصراف' : 'Cancel'}
                </button>
                <button
                  onClick={toggleVoiceRecording}
                  className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Send className="w-3 h-3" />
                  <span>{isFa ? 'ارسال ویس' : 'Send'}</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-2">
              
              {/* Input Action Controls */}
              <div className="flex items-center gap-2">
                
                {/* Attachment Trigger */}
                <button
                  type="button"
                  onClick={() => setShowAttachMenu(!showAttachMenu)}
                  className="w-9 h-9 rounded-2xl bg-background border border-border/80 text-muted-foreground hover:text-primary flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                  title={isFa ? 'ارسال فایل یا نسخه' : 'Attach File'}
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                {/* Voice Note Button */}
                <button
                  type="button"
                  onClick={toggleVoiceRecording}
                  className="w-9 h-9 rounded-2xl bg-background border border-border/80 text-muted-foreground hover:text-primary flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                  title={isFa ? 'ضبط پیام صوتی' : 'Record Voice Note'}
                >
                  <Mic className="w-4 h-4" />
                </button>

                {/* Doctor Quick Preset Trigger */}
                {isDoctor && (
                  <button
                    type="button"
                    onClick={() => setShowQuickPresets(!showQuickPresets)}
                    className="h-9 px-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-xs font-semibold hover:bg-primary/20 flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isFa ? 'پاسخ‌های آماده' : 'Quick Rx'}</span>
                  </button>
                )}

                {/* Text Input */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      isDoctor
                        ? (isFa ? 'تایپ پیام یا توصیه بالینی برای بیمار...' : 'Type clinical message to patient...')
                        : (isFa ? 'پیام یا سوال خود از دکتر فاطمه مومنی را بنویسید...' : 'Type your question for Dr. Momeni...')
                    }
                    className="w-full px-4 py-2.5 rounded-2xl border border-border/80 bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 flex items-center justify-center shrink-0 shadow-xs transition-all cursor-pointer"
                  title={isFa ? 'ارسال پیام' : 'Send'}
                >
                  <Send className="w-4 h-4" />
                </button>

              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
