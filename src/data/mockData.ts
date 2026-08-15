import { BlogPost, Testimonial, Appointment } from '../types';

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "difference-between-psychiatrist-and-psychologist",
    title_fa: "تفاوت روان‌پزشک، روان‌شناس و روان‌درمانگر چیست و به چه کسی مراجعه کنیم؟",
    title_en: "Psychiatrist vs. Psychologist: Understanding the Differences & Choosing Care",
    excerpt_fa: "بررسی دقیق تفاوت در تحصیلات، شیوه درمان، صلاحیت تجویز دارو و نحوه هم‌افزایی درمان دارویی با روان‌درمانی برای بهبود پایدار سلامت روان.",
    excerpt_en: "A comprehensive guide on educational backgrounds, prescribing authority, and how combined pharmacotherapy and psychotherapy yield optimal outcomes.",
    body_fa: `یکی از متداول‌ترین پرسش‌های مراجعین این است که برای مشکلات روحی و رفتاری خود، ابتدا باید به روان‌پزشک مراجعه کنند یا روان‌شناس؟

### ۱. روان‌پزشک (Psychiatrist)
روان‌پزشک پزشکی است که پس از گذراندن دوره عمومی پزشکی (۷ سال)، دوره تخصصی روان‌پزشکی (۴ سال) را سپری کرده و دارای بورد تخصصی اعصاب و روان است. روان‌پزشک با تسلط کامل بر علوم اعصاب، بیوشیمی مغز و تعاملات فیزیولوژیک بدن:
- صلاحیت ارزیابی پزشکی، درخواست آزمایش‌ها و بررسی علل جسمی اختلالات روانی (مانند مشکلات تیروئید، کمبود ویتامین‌ها یا اختلالات هورمونی) را دارد.
- صلاحیت قانونی و علمی تجویز و تنظیم دقیق داروهای اعصاب و روان را داراست.
- در کنار دارودرمانی، از تکنیک‌های روان‌درمانی فردی و شناختی نیز بهره می‌گیرد.

### ۲. روان‌شناس بالینی (Clinical Psychologist)
روان‌شناس دارای مدرک کارشناسی ارشد یا دکتری در رشته روان‌شناسی است. تمرکز اصلی روان‌شناس بر:
- ارزیابی رفتاری، شخصیتی و انجام آزمون‌های روان‌شناختی
- اجرای روان‌درمانی‌های غیردارویی نظیر درمان شناختی-رفتاری (CBT)، طرحواره‌درمانی و روان‌پویشی است.
روان‌شناس اجازه تجویز دارو ندارد.

### رویکرد تلفیقی در درمان نوین
امروزه در روان‌پزشکی مدرن، رویکرد تلفیقی (زیستی-روانی-اجتماعی) استاندارد طلایی درمان است. در کلینیک دکتر فاطمه مومنی، در صورت لزوم، دارودرمانی با حداقل دوز مؤثر و با هدف متعادل‌سازی ناقل‌های عصبی مغز آغاز شده و هم‌زمان با روان‌درمانی تخصصی پیش برده می‌شود تا فرد به بهبودی عمیق و پایدار دست یابد.`,
    body_en: `A common query among patients is whether to consult a psychiatrist or a psychologist for mental distress.

### 1. Psychiatrist
A psychiatrist is a medical doctor who completed medical school followed by specialized psychiatric residency and specialty board exams. Psychiatrists understand brain biochemistry, physiological interactions, and systemic health:
- Authorized to order medical workups, ruling out organic causes (e.g., thyroid dysfunction, vitamin deficiencies).
- Fully licensed to prescribe and adjust psychiatric medications.
- Integrates both pharmacotherapy and evidence-based psychotherapy.

### 2. Clinical Psychologist
A clinical psychologist holds a Master's or Doctoral degree in psychology, focusing on diagnostic testing and non-pharmacological psychotherapy (e.g., CBT, Schema Therapy).

### The Integrative Treatment Model
In contemporary mental healthcare, the Bio-Psycho-Social model represents the gold standard. Dr. Fatemeh Momeni utilizes an integrative approach—combining modern pharmacotherapy where indicated with individualized psychotherapy to foster sustainable recovery.`,
    category: "general",
    category_fa: "مفاهیم پایه روان‌پزشکی",
    category_en: "Foundational Concepts",
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    read_minutes: 4,
    published_date: "2024-10-15",
    author_fa: "دکتر فاطمه مومنی",
    author_en: "Dr. Fatemeh Momeni",
    tags: ["مفاهیم پایه", "روان‌پزشک", "روان‌شناس", "دارودرمانی", "مشاوره"],
    featured: true,
    clinical_pearl_fa: "هیچ رقابتی میان روان‌پزشکی و روان‌شناسی وجود ندارد؛ این دو بال‌های یک پرواز به سوی سلامت روان پایدار هستند.",
    target_audience_fa: "عموم مراجعین و افرادی که برای اولین بار قصد دریافت خدمات سلامت روان دارند",
    verified_medical_review: true,
    attachments: [
      {
        id: "att-1-1",
        name: "راهنمای گام‌به‌گام انتخاب متخصص سلامت روان",
        type: "pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        sizeStr: "420 KB",
        description: "جدول راهنمای تشخیص سریع جهت تعیین نوبت روان‌پزشکی یا روان‌شناسی",
        downloadName: "Psychiatry_vs_Psychology_Guide.pdf"
      }
    ],
    faq_items: [
      {
        question_fa: "آیا در اولین جلسه ویزیت حتماً دارو تجویز می‌شود؟",
        answer_fa: "خیر، تجویز دارو منوط به ارزیابی دقیق بالینی و شدت علائم است. در صورت خفیف بودن علائم، روان‌درمانی در اولویت قرار می‌گیرد."
      },
      {
        question_fa: "آیا روان‌پزشک می‌تواند جلسات مشاوره روان‌درمانی هم برگزار کند؟",
        answer_fa: "بله، روان‌پزشکان آموزش‌های جامعی در زمینه انواع روان‌درمانی‌ها نظیر CBT و روان‌پویشی دیده‌اند و صلاحیت اجرای هر دو حیطه را دارند."
      }
    ],
    scientific_references: [
      "Kaplan & Sadock's Comprehensive Textbook of Psychiatry, 10th Edition",
      "American Psychiatric Association (APA) Practice Guidelines"
    ]
  },
  {
    id: "2",
    slug: "panic-attack-symptoms-management",
    title_fa: "حملات پانیک (وحشت‌زدگی): علائم فیزیکی، ریشه‌ها و اقدامات فوری در لحظه حمله",
    title_en: "Panic Attacks: Physical Symptoms, Root Causes, and Immediate Management Strategies",
    excerpt_fa: "تپش قلب شدید، تنگی نفس و احساس مرگ ناگهانی؛ چگونه چرخه ترس پانیک را بشکنیم و درمان پایدار دریافت کنیم؟",
    excerpt_en: "Rapid heart rate, shortness of breath, and overwhelming fear: how to halt the panic loop and achieve long-term clinical relief.",
    body_fa: `حمله پانیک (Panic Attack) هجوم ناگهانی ترس یا ناراحتی بسیار شدید است که ظرف چند دقیقه به اوج می‌رسد و با علائم جسمانی و شناختی بارزی همراه است.

### علائم شایع حمله پانیک
- تپش قلب شدید، کوبش قفسه سینه یا افزایش غیرعادی ضربان
- احساس خفگی یا کمبود هوا و تنگی نفس
- تعریق شدید، لرزش دست‌ها و پاها
- سرگیجه، احساس سبکی سر و عدم تعادل
- احساس گسست از واقعیت (Depersonalization)
- ترس فلج‌کننده از مرگ قریب‌الوقوع یا از دست دادن کنترل

### در لحظه حمله پانیک چه باید کرد؟
۱. **تنفس دیافراگمی ۴-۴-۴:** به مدت ۴ ثانیه از بینی هوا را داخل بکشید، ۴ ثانیه حبس کنید و به آرامی در ۴ ثانیه از دهان خارج کنید.
۲. **تکنیک ۵-۴-۳-۲-۱ گراندینگ (Grounding):** به ۵ شیء اطراف نگاه کنید، ۴ چیز را لمس کنید، ۳ صدا را بشنوید، ۲ بو را حس کنید و ۱ مزه را در دهان تجربه کنید.
۳. **یادآوری منطقی:** به خود بگویید: «این فقط یک واکنش آژیر اشتباه در مغز من است، هیچ خطر جانی وجود ندارد و این حس ظرف چند دقیقه تمام می‌شود.»

### درمان ریشه‌ای
درمان اختلال پانیک با تشخیص دقیق روان‌پزشک، مهار دارویی نوسانات آمیگدال مغز و جلسات روان‌درمانی شناختی-رفتاری به سادگی و به طور کامل قابل کنترل و درمان است.`,
    body_en: `A panic attack is a sudden surge of overwhelming fear or discomfort that peaks within minutes, accompanied by intense somatic and cognitive symptoms.

### Hallmark Symptoms
- Palpitations, pounding heart, or accelerated heart rate
- Shortness of breath, sensation of choking
- Trembling, shaking, profuse sweating
- Dizziness, unsteadiness, or feeling faint
- Feelings of unreality (derealization)
- Overpowering terror of dying or losing control

### Immediate Grounding Steps
1. **Box Breathing (4-4-4):** Inhale for 4 seconds, hold for 4 seconds, exhale smoothly for 4 seconds.
2. **5-4-3-2-1 Sensory Grounding:** Anchor yourself into your physical surroundings.
3. **Cognitive Reassurance:** Remind yourself: "This is a false brain alarm. It is temporary and physically harmless."

### Long-Term Psychiatric Treatment
With appropriate psychiatric evaluation, tailored stabilization of neurochemical pathways, and cognitive therapy, Panic Disorder exhibits high response and remission rates.`,
    category: "anxiety",
    category_fa: "اضطراب و پانیک",
    category_en: "Anxiety & Panic",
    image_url: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?auto=format&fit=crop&w=1200&q=80",
    read_minutes: 5,
    published_date: "2024-11-02",
    author_fa: "دکتر فاطمه مومنی",
    author_en: "Dr. Fatemeh Momeni",
    tags: ["پانیک", "اضطراب", "تپش قلب", "تنفس دیافراگمی", "آمیگدال"],
    featured: true,
    clinical_pearl_fa: "پانیک کشنده نیست؛ آمیگدال مغز آژیر خطر اشتباه به صدا درآورده است. تسلیم ترس نشوید و به تنفس آرام پایبند بمانید.",
    target_audience_fa: "بیماران مبتلا به حملات وحشت‌زدگی، اضطراب فراگیر و خانواده‌های آنان",
    audio_guide_url: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg",
    audio_guide_title: "پادکست آموزشی: راهنمای صوتی تنفس آرامش و توقف پانیک در ۳ دقیقه",
    audio_duration_seconds: 180,
    verified_medical_review: true,
    attachments: [
      {
        id: "att-2-1",
        name: "کارت جیبی مدیریت آنی حمله پانیک (PDF)",
        type: "pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        sizeStr: "280 KB",
        description: "برگه راهنمای گام‌به‌گام برای همراه داشتن در کیف و مواقع هجوم اضطراب",
        downloadName: "Panic_Emergency_Pocket_Guide.pdf"
      },
      {
        id: "att-2-2",
        name: "صوت راهنمای ریلکسیشن عضلانی پیشرونده (PMR)",
        type: "audio",
        url: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg",
        sizeStr: "3.2 MB",
        description: "تمرین صوتی دکتر مومنی جهت آرام‌سازی سیستم عصبی سمپاتیک",
        downloadName: "Dr_Momeni_Relaxation_Exercise.mp3"
      }
    ],
    faq_items: [
      {
        question_fa: "آیا حمله پانیک می‌تواند منجر به سکته قلبی یا مرگ شود؟",
        answer_fa: "خیر، حمله پانیک علی‌رغم شباهت شدید به احساس خطر جانی، به دلیل ترشح آدرنالین موقت است و هرگز به قلب یا مغز آسیب ساختاری نمی‌زند."
      },
      {
        question_fa: "چرا مراجعات مکرر به اورژانس قلبی در مبتلایان به پانیک شایع است؟",
        answer_fa: "زیرا تپش قلب و احساس تنگی نفس بسیار واقعی و شدید هستند. پس از تایید سلامت قلب توسط متخصص قلب، مراجعه به روان‌پزشک پایان‌بخش این چرخه است."
      }
    ],
    scientific_references: [
      "Diagnostic and Statistical Manual of Mental Disorders (DSM-5-TR), Panic Disorder Section",
      "Stahl's Essential Psychopharmacology: Neuroscientific Basis and Practical Applications"
    ]
  },
  {
    id: "3",
    slug: "myths-and-facts-psychiatric-medications",
    title_fa: "داروهای اعصاب و روان: باورهای غلط، واقعیت‌های علمی و رفع نگرانی از اعتیاد دارویی",
    title_en: "Psychiatric Medications: Dispelling Myths, Dependency Fears, and Scientific Realities",
    excerpt_fa: "آیا داروهای اعصاب اعتیادآورند؟ آیا شخصیت فرد را تغییر می‌دهند؟ پاسخ‌های تخصصی به رایج‌ترین دغدغه‌های مراجعین.",
    excerpt_en: "Do psychiatric medications cause addiction or alter personality? Clear, evidence-based answers to key patient concerns.",
    body_fa: `یکی از بزرگ‌ترین موانع مراجعه بهنگام به روان‌پزشک، باورهای نادرست و ترس‌های بی‌اساس پیرامون داروهای روان‌پزشکی است. در ادامه به شایع‌ترین باورهای غلط می‌پردازیم:

### باور غلط ۱: داروهای اعصاب اعتیادآور هستند و تا آخر عمر باید مصرف شوند.
**واقعیت علمی:** اکثریت قاطع داروهای روان‌پزشکی مدرن (مانند مهارکننده‌های بازجذب سروتونین یا SSRIها نظیر سرترالین، فلوکستین و اس‌سیتالوپرام) به هیچ وجه وابستگی فیزیکی یا روانی ایجاد نمی‌کنند. پس از طی دوره درمان استاندارد (معمولاً ۶ تا ۹ ماه پس از بهبودی کامل علائم)، دارو تحت نظر پزشک به صورت تدریجی قطع خواهد شد.

### باور غلط ۲: داروهای روان‌پزشکی انسان را منگ و بی‌احساس می‌کنند.
**واقعیت علمی:** هدف دارودرمانی صحیح، بازگرداندن فرد به عملکرد طبیعی روزمره است، نه کرخت کردن او. در صورتی که فرد احساس خواب‌آلودگی یا کرختی غیرعادی کند، روان‌پزشک با تنظیم دوز یا تغییر نوع دارو، این عارضه را برطرف می‌سازد.

### باور غلط ۳: درمان روان‌پزشکی نشانه ضعف اراده است.
**واقعیت علمی:** افسردگی و اضطراب همانند دیابت یا پرفشاری خون، دارای مبنای بیولوژیک و تغییرات در سطح نوروترانسمیترها هستند. همان‌طور که بیمار دیابتی به دلیل نقص انسولین سرزنش نمی‌شود، بیمار مبتلا به افسردگی نیز نیاز به تنظیم مواد شیمیایی مغز دارد.`,
    body_en: `Unfounded societal stigmas regarding psychiatric medications often prevent individuals from seeking timely clinical help.

### Myth 1: Psychiatric medications cause irreversible addiction.
**Scientific Fact:** The overwhelming majority of contemporary antidepressants (such as SSRIs) are non-addictive. Once clinical remission is sustained (typically 6-9 months), medications are systematically tapered under medical supervision.

### Myth 2: Medications alter your personality or numb your emotions.
**Scientific Fact:** The primary objective of modern psychiatric pharmacotherapy is to restore optimal cognitive and emotional functioning, eliminating debilitating symptoms without blunting genuine feelings.

### Myth 3: Requiring psychiatric support denotes personal weakness.
**Scientific Fact:** Mood and anxiety disorders are biological medical conditions linked to neurotransmitter dysregulation, just as diabetes relates to insulin deficiency. Seeking care is an act of rational self-responsibility.`,
    category: "depression",
    category_fa: "افسردگی و دارودرمانی",
    category_en: "Depression & Pharmacology",
    image_url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    read_minutes: 6,
    published_date: "2024-11-20",
    author_fa: "دکتر فاطمه مومنی",
    author_en: "Dr. Fatemeh Momeni",
    tags: ["دارودرمانی", "افسردگی", "سروتونین", "SSRI", "باورهای غلط"],
    featured: true,
    clinical_pearl_fa: "داروهای روان‌پزشکی مدرن برای درمان ساخته شده‌اند، نه برای وابستگی. قطع ناگهانی بدون نظر پزشک عامل اصلی بازگشت علائم است.",
    target_audience_fa: "افرادی که به تازگی داروی اعصاب برایشان تجویز شده یا نگران عوارض دارویی هستند",
    verified_medical_review: true,
    attachments: [
      {
        id: "att-3-1",
        name: "بروشور جامع راهنمای مصرف داروهای SSRI و SNRI (PDF)",
        type: "pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        sizeStr: "510 KB",
        description: "راهنمای زمان مصرف، عوارض موقت هفته اول و نحوه تداوم درمان",
        downloadName: "SSRI_Patient_Handbook.pdf"
      }
    ],
    faq_items: [
      {
        question_fa: "چه مدت طول می‌کشد تا اثرات داروی ضد افسردگی احساس شود؟",
        answer_fa: "معمولاً اثرات اولیه ظرف ۲ تا ۴ هفته پس از شروع دوز درمانی آشکار می‌شود، هرچند بهبود کیفیت خواب و اشتها ممکن است زودتر رخ دهد."
      },
      {
        question_fa: "اگر یک نوبت دارو را فراموش کردیم چه کنیم؟",
        answer_fa: "به محض یادآوری مصرف کنید، مگر اینکه به نوبت بعدی نزدیک باشید. هرگز دوز را دو برابر نکنید."
      }
    ],
    scientific_references: [
      "The Maudsley Prescribing Guidelines in Psychiatry, 14th Edition",
      "World Health Organization (WHO) Mental Health Action Plan"
    ]
  },
  {
    id: "4",
    slug: "adult-adhd-diagnosis-and-treatment",
    title_fa: "بیش‌فعالی و نقص توجه (ADHD) در بزرگسالان: نشانه‌های پنهان، افت تمرکز و تعلل‌ورزی",
    title_en: "Adult ADHD: Hidden Signs, Chronic Procrastination, and Multimodal Treatment",
    excerpt_fa: "فراموش‌کاری مداوم، پرش افکار، خستگی ذهنی و ناتوانی در سازمان‌دهی زمان؛ چگونه ADHD در بزرگسالی تشخیص داده و درمان می‌شود؟",
    excerpt_en: "Chronic disorganization, mental restlessness, and executive dysfunction: diagnostic pathways and evidence-based interventions.",
    body_fa: `بسیاری از افراد گمان می‌کنند اختلال نقص توجه و بیش‌فعالی (ADHD) صرفاً مختص کودکان بازیگوش است؛ در حالی که در حدود ۶۰ درصد موارد، علائم تا بزرگسالی تداوم می‌یابند و به شکل‌های متفاوتی بروز می‌کنند.

### نشانه‌های ADHD در بزرگسالی
- اهمال‌کاری مزمن (Procrastination) و دشواری در شروع کارهای خسته‌کننده یا اداری
- پرش مکرر افکار از یک ایده به ایده دیگر بدون به پایان رساندن کارها
- گم کردن مداوم وسایل شخصی نظیر کلید، تلفن همراه یا کارت‌های بانکی
- بی‌قراری درونی و نیاز مداوم به حرکت یا تغییر موقعیت
- حساسیت شدید به طرد یا انتقاد (RSD)

### ارزیابی و درمان
تشخیص ADHD در بزرگسالی نیازمند مصاحبه بالینی تخصصی توسط روان‌پزشک و بررسی تاریخچه دوران کودکی است. درمان شامل داروهای تنظیم‌کننده دوپامین و نورآدرنالین همراه با آموزش تکنیک‌های مدیریت زمان و کارکردهای اجرایی است که تغییری شگرف در عملکرد شغلی و تحصیلی بیمار ایجاد می‌کند.`,
    body_en: `ADHD often persists into adulthood, manifesting as executive dysfunction, time blindness, and internal restlessness rather than overt physical hyperactivity.

### Primary Adult Manifestations
- Chronic procrastination and severe inertia starting complex tasks
- Executive disorganization and frequent misplacement of essential items
- Internal restlessness, difficulty sustaining attention during meetings
- Impulsive speech or decision-making

### Clinical Intervention
Comprehensive clinical evaluation by a psychiatrist enables tailored pharmacological optimization alongside practical organizational coaching, transforming occupational and relational productivity.`,
    category: "adhd",
    category_fa: "بیش‌فعالی (ADHD)",
    category_en: "Adult ADHD & Focus",
    image_url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    read_minutes: 5,
    published_date: "2024-12-05",
    author_fa: "دکتر فاطمه مومنی",
    author_en: "Dr. Fatemeh Momeni",
    tags: ["ADHD", "بیش‌فعالی بزرگسالان", "تمرکز", "اهمال‌کاری", "دوپامین"],
    featured: true,
    clinical_pearl_fa: "بزرگسال مبتلا به ADHD تنبل یا بی‌اراده نیست؛ مغز او در تنظیم پیام‌رسان دوپامین برای پاداش بلندمدت دچار چالش فیزیولوژیک است.",
    target_audience_fa: "دانشجویان، کارآفرینان، شاغلین و افرادی که با تمرکز و مدیریت زمان چالش مداوم دارند",
    audio_guide_url: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg",
    audio_guide_title: "پادکست اختصاصی: تفاوت اهمال‌کاری عادی با نقص توجه ADHD بزرگسالان",
    audio_duration_seconds: 240,
    verified_medical_review: true,
    attachments: [
      {
        id: "att-4-1",
        name: "پرسشنامه خودارزیابی بیش‌فعالی بزرگسالان ASRS-v1.1 (PDF)",
        type: "guide",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        sizeStr: "340 KB",
        description: "مقیاس استاندارد سازمان جهانی بهداشت برای غربالگری اولیه علائم نقص توجه",
        downloadName: "WHO_ASRS_ADHD_Self_Screening.pdf"
      },
      {
        id: "att-4-2",
        name: "کاربرگه سازماندهی کارکردهای اجرایی و ماتریس زمان (Excel/DOC)",
        type: "document",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        sizeStr: "190 KB",
        description: "تمپلیت روزانه تقسیم تسک‌های پیچیده به قطعات کوچک قابل اجرا",
        downloadName: "Executive_Function_Planner.docx"
      }
    ],
    faq_items: [
      {
        question_fa: "آیا ریتالین یا سایر داروهای محرک در بزرگسالان وابستگی ایجاد می‌کنند؟",
        answer_fa: "در صورت تجویز توسط روان‌پزشک و مصرف با دوز مشخص درمانی، نه تنها اعتیادآور نیستند بلکه خطر رفتارهای تکانشی و سوءمصرف مواد را به شدت کاهش می‌دهند."
      },
      {
        question_fa: "آیا فردی که در کودکی تشخیص ADHD نداشته می‌تواند در بزرگسالی مبتلا باشد؟",
        answer_fa: "بسیاری از افراد باهوش در کودکی با نمرات خوب علائم را پنهان کرده‌اند، اما با پیچیده‌تر شدن مسئولیت‌های دانشگاهی و شغلی، علائم آشکار می‌شود."
      }
    ],
    scientific_references: [
      "Barkley, R. A. (2015). Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment",
      "NICE Guidelines: Attention deficit hyperactivity disorder: diagnosis and management"
    ]
  },
  {
    id: "5",
    slug: "sleep-architecture-and-insomnia-treatment",
    title_fa: "معماری خواب و درمان ریشه‌ای بی‌خوابی مزمن بدون وابستگی دارویی",
    title_en: "Sleep Architecture & Non-Habit-Forming Solutions for Chronic Insomnia",
    excerpt_fa: "بیداری‌های مکرر شبانه، خستگی صبحگاهی و افکار هجوم‌آورنده در رختخواب؛ بازسازی ریتم سیرکادین مغز با رویکرد نوین بالینی.",
    excerpt_en: "Restoring slow-wave deep sleep and circadian stability through neuro-targeted non-habit-forming medical intervention and sleep hygiene.",
    body_fa: `خواب شبانه فرآیندی غیرفعال نیست، بلکه یکی از پویاترین چرخه‌های ترمیمی مغز است که طی آن تثبیت حافظه، ترشح هورمون‌های رشد و پاکسازی پروتئین‌های سمی نورونی صورت می‌پذیرد.

### مراحل معماری خواب (Sleep Architecture)
۱. **خواب سبک (N1 و N2):** کاهش ضربان قلب و دمای بدن
۲. **خواب عمیق با امواج آهسته (N3 / Slow-Wave):** بازسازی بافت‌های فیزیکی و سیستم ایمنی
۳. **خواب با حرکات سریع چشم (REM):** پردازش هیجانی و خواب دیدن

### عوامل مخرب خواب در زندگی مدرن
- نور آبی صفحات نمایش و سرکوب ترشح ملاتونین طبیعی
- مصرف کافئین در ساعات عصرگاهی با نیمه‌عمر بیش از ۶ ساعت
- اضطراب پیش‌بینانه و شرطی‌شدن تختخواب با بیداری و استرس

### پروتکل بهداشت خواب و درمان پزشکی
در کلینیک دکتر فاطمه مومنی، درمان بی‌خوابی بدون استفاده از داروهای اعتیادآور خواب‌آور صورت می‌گیرد. با استفاده از ترکیبات تنظیم‌کننده ملاتونرژیک و تعدیل‌کننده‌های نورونی غیروابستگی، ریتم شبانه‌روزی بیمار مجدداً تنظیم می‌شود.`,
    body_en: `Sleep is an active neurobiological restorative phase vital for memory consolidation and neural detoxification.

### Stages of Healthy Sleep Architecture
1. Light Sleep (N1 & N2)
2. Slow-Wave Deep Sleep (N3)
3. Rapid Eye Movement (REM)

### Scientific Clinical Strategies
Avoiding addictive hypnotic agents, contemporary psychiatric care relies on circadian retiming, melatonin pathway modulators, and CBT for Insomnia (CBT-I).`,
    category: "sleep",
    category_fa: "بهداشت و تنظیم خواب",
    category_en: "Sleep Architecture",
    image_url: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80",
    read_minutes: 6,
    published_date: "2024-12-18",
    author_fa: "دکتر فاطمه مومنی",
    author_en: "Dr. Fatemeh Momeni",
    tags: ["خواب", "بی‌خوابی", "ریتم سیرکادین", "ملاتونین", "خستگی مزمن"],
    featured: false,
    clinical_pearl_fa: "تختخواب فقط برای خواب و رابطه زناشویی است؛ هرگز کار، چک کردن موبایل یا تماشای فیلم را در رختخواب انجام ندهید تا مغز شرطی نشود.",
    target_audience_fa: "افراد با سابقه بیداری شبانه، پرواززدگی، شیفت‌های کاری یا استرس خواب",
    verified_medical_review: true,
    attachments: [
      {
        id: "att-5-1",
        name: "دفترچه پایش و ثبت ۲ هفته‌ای الگوهای خواب (PDF)",
        type: "pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        sizeStr: "380 KB",
        description: "جدول ارزیابی زمان به خواب رفتن، بیداری‌های شبانه و کیفیت بیداری صبحگاهی",
        downloadName: "Two_Week_Sleep_Diary_Tracker.pdf"
      }
    ],
    faq_items: [
      {
        question_fa: "اگر شب بعد از ۲۰ دقیقه خوابمان نبرد چه باید کرد؟",
        answer_fa: "از رختخواب خارج شوید، در محیطی با نور کم کتاب ملایم بخوانید و تنها زمانی که پلک‌هایتان سنگین شد دوباره به تخت برگردید."
      }
    ],
    scientific_references: [
      "Principles and Practice of Sleep Medicine, 7th Edition (Kryger, Roth, Dement)",
      "European Sleep Research Society (ESRS) Clinical Guidelines"
    ]
  },
  {
    id: "6",
    slug: "obsessive-compulsive-disorder-erp-and-biology",
    title_fa: "وسواس فکری-عملی (OCD): شکستن چرخه افکار مزاحم و تشریفات خسته‌کننده",
    title_en: "Obsessive-Compulsive Disorder: Breaking the Intrusive Thoughts Loop with ERP & Medicine",
    excerpt_fa: "افکار تکرارشونده آزاردهنده، چک کردن‌های مکرر، وسواس شستشو و تقارن؛ تبیین علمی مدار کورتیکو-استریاتو-تالامیک در OCD.",
    excerpt_en: "Understanding the Cortico-Striato-Thalamo-Cortical loop in OCD and achieving freedom with Exposure and Response Prevention (ERP).",
    body_fa: `اختلال وسواس فکری-عملی (OCD) شامل دو بخش اصلی است: وسواس‌های فکری (Obsessions) که افکار، تصاویر یا تکانه‌های ناخواسته و به شدت اضطراب‌آور هستند؛ و وسواس‌های عملی (Compulsions) که اعمال تکراری برای کاهش آن اضطراب هستند.

### مدار عصبی وسواس در مغز
تحقیقات تصویربرداری عصبی نشان می‌دهد که در مبتلایان به OCD، مدار عصبی بین قشر پیش‌پیشانی، تالاموس و هسته‌های قاعده‌ای دچار بیش‌فعالی است و سیگنال «خطر برطرف شد» به درستی ارسال نمی‌شود.

### درمان استاندارد طلایی
۱. **دارودرمانی با دوز مناسب:** داروهای مهارکننده اختصاصی بازجذب سروتونین در دوزهای بالاتر از درمان افسردگی تجویز شده و بیش‌فعالی مدار مغزی را آرام می‌سازند.
۲. **مواجهه و جلوگیری از پاسخ (ERP):** فرد یاد می‌گیرد بدون انجام تشریفات وسواسی، اضطراب را در بدن تجربه کند تا آمیگدال متوجه بی‌خطر بودن آن شود.`,
    body_en: `Obsessive-Compulsive Disorder (OCD) features distressing intrusive thoughts (obsessions) followed by compulsive behaviors to neutralize distress.

### Neural Circuitry
Hyperactivity in the Cortico-Striato-Thalamo-Cortical (CSTC) loop prevents the brain's internal 'all-clear' signal from firing.

### Gold Standard Interventions
- High-dose serotonergic pharmacotherapy
- Exposure and Response Prevention (ERP) behavioral conditioning.`,
    category: "ocd",
    category_fa: "وسواس فکری-عملی",
    category_en: "OCD Care",
    image_url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
    read_minutes: 6,
    published_date: "2025-01-08",
    author_fa: "دکتر فاطمه مومنی",
    author_en: "Dr. Fatemeh Momeni",
    tags: ["وسواس", "OCD", "افکار مزاحم", "ERP", "سروتونین"],
    featured: false,
    clinical_pearl_fa: "پاسخ دادن به وسواس (شستن مجدد یا چک کردن دوباره) مانند آب ریختن روی بنزین است؛ موقتاً آرام می‌کند اما آتش وسواس را بزرگ‌تر می‌سازد.",
    target_audience_fa: "مبتلایان به وسواس فکری، شست‌وشو، چک‌کردن و افکار تکرارشونده آزاردهنده",
    verified_medical_review: true,
    attachments: [
      {
        id: "att-6-1",
        name: "جدول پلکان مواجهه تدریجی و ثبت شدت اضطراب ERP (PDF)",
        type: "guide",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        sizeStr: "450 KB",
        description: "کاربرگه گام‌به‌گام مواجهه سلسله‌مراتبی از اضطراب کم به زیاد",
        downloadName: "OCD_ERP_Exposure_Hierarchy_Worksheet.pdf"
      }
    ],
    faq_items: [
      {
        question_fa: "آیا داشتن افکار کفرآمیز یا پرخاشگرانه ناخواسته به این معناست که من انسان بدی هستم؟",
        answer_fa: "به هیچ وجه؛ این ماهیت وسواس (Ego-Dystonic) است. این افکار در تضاد با شخصیت واقعی شما هستند و صرفاً نویزهای بیوشیمیایی مغز می‌باشند."
      }
    ],
    scientific_references: [
      "International OCD Foundation (IOCDF) Clinical Protocols",
      "Kaplan & Sadock's Synopsis of Psychiatry, 12th Edition"
    ]
  },
  {
    id: "7",
    slug: "bipolar-disorder-spectrum-and-mood-charting",
    title_fa: "طیف اختلال دو‌قطبی: شناخت نشانه‌های هایپومانیا، افسردگی و تثبیت خلق",
    title_en: "Bipolar Spectrum: Recognizing Hypomania, Mood Lability, and Stabilization",
    excerpt_fa: "دوره‌های پرانرژی کاذب، پرحرفی، کم‌خوابی بدون احساس خستگی و سقوط به تاریکی افسردگی؛ تفاوت دوقطبی نوع ۱ و ۲.",
    excerpt_en: "Differentiating unipolar depression from bipolar spectrum disorders: clinical assessment, mood stabilizers, and long-term relapse prevention.",
    body_fa: `اختلال دوقطبی (Bipolar Disorder) یکی از بیماری‌های مهم روان‌پزشکی است که با نوسانات دوره‌ای در خلق، سطح انرژی و توانایی فعالیت مشخص می‌شود.

### تفاوت نوع یک و نوع دو
- **دوقطبی نوع ۱:** همراه با دوره‌های شیدایی (مانیا) شدید که ممکن است به بستری یا رفتارهای پرخطر مالی و تکانشی منجر شود.
- **دوقطبی نوع ۲:** همراه با دوره‌های خفیف‌تر شیدایی موسوم به هایپومانیا (خلق بسیار شاد، پرانرژی، کاهش نیاز به خواب) و دوره‌های طولانی افسردگی شدید.

### خطر تشخیص اشتباه با افسردگی تک‌قطبی
اگر بیمار دوقطبی صرفاً داروی ضدافسردگی دریافت کند، ممکن است دچار تغییر فاز به مانیا یا ناپایداری شدیدتر خلقی شود. به همین دلیل تشخیص دقیق روان‌پزشک و استفاده از تثبیت‌کننده‌های خلق (Mood Stabilizers) حیاتی است.`,
    body_en: `Bipolar spectrum conditions present with episodic shifts in mood, energy, and activity levels. Accurate differentiation from major depression is essential to prevent antidepressant-induced mania.`,
    category: "bipolar",
    category_fa: "اختلالات دوقطبی و خلق",
    category_en: "Bipolar Spectrum",
    image_url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80",
    read_minutes: 7,
    published_date: "2025-01-20",
    author_fa: "دکتر فاطمه مومنی",
    author_en: "Dr. Fatemeh Momeni",
    tags: ["دوقطبی", "نوسان خلق", "هایپومانیا", "تثبیت‌کننده خلق", "مانیا"],
    featured: false,
    clinical_pearl_fa: "خواب منظم قوی‌ترین داروی طبیعی برای تثبیت خلق در دوقطبی است؛ حتی یک شب بی‌خوابی می‌تواند ماشه‌چکان دوره هایپومانیا شود.",
    target_audience_fa: "بیماران با سابقه نوسانات شدید خلقی، دوره‌های پرانرژی ناگهانی و خانواده‌هایشان",
    verified_medical_review: true,
    attachments: [
      {
        id: "att-7-1",
        name: "نمودار روزانه ثبت نوسان خلق و سطح انرژی (Mood Chart)",
        type: "pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        sizeStr: "310 KB",
        description: "ابزار بالینی رسمی NIMH برای ثبت گرافیکی خلق و میزان خواب شبانه",
        downloadName: "Daily_Life_Chart_Mood_Tracker.pdf"
      }
    ],
    faq_items: [
      {
        question_fa: "آیا بیمار دوقطبی می‌تواند زندگی شغلی و خانوادگی موفق و باثباتی داشته باشد؟",
        answer_fa: "کاملاً بله؛ با دارودرمانی منظم و پایش علائم، اکثریت قریب به اتفاق بیماران به زندگی عادی و درخشان دست می‌یابند."
      }
    ],
    scientific_references: [
      "Goodwin & Jamison: Manic-Depressive Illness: Bipolar Disorders and Recurrent Depression, 3rd Edition",
      "CANMAT Guidelines for the Management of Patients with Bipolar Disorder"
    ]
  },
  {
    id: "8",
    slug: "postpartum-depression-and-perinatal-mental-health",
    title_fa: "افسردگی پس از زایمان و سلامت روان مادران: ایمنی داروها در بارداری و شیردهی",
    title_en: "Postpartum Depression & Perinatal Psychiatry: Medication Safety in Pregnancy & Nursing",
    excerpt_fa: "گریه‌های بی‌دلیل، احساس گناه مفرط، اضطراب شدید نسبت به نوزاد؛ بررسی تخصصی رویکردهای درمانی ایمن برای مادر و کودک.",
    excerpt_en: "Evidence-based risk-benefit analysis of psychiatric pharmacotherapy during pregnancy and lactation, overcoming mother guilt and restoring joy.",
    body_fa: `تولد فرزند یکی از بزرگ‌ترین تغییرات هورمونی و روانی در زندگی یک زن است. تمایز بین «غم پاییزه نوزاد» (Baby Blues) که ظرف ۲ هفته برطرف می‌شود و «افسردگی پس از زایمان» (PPD) اهمیت حیاتی دارد.

### علائم هشداردهنده افسردگی پس از زایمان
- ناتوانی در برقراری پیوند عاطفی عمیق با نوزاد
- ترس شدید از صدمه دیدن ناخواسته نوزاد یا عدم صلاحیت مادری
- خستگی مفرط حتی زمانی که نوزاد خواب است
- بی‌خوابی شدید با وجود خستگی مفرط
- افکار گناه و بی‌ارزشی مداوم

### ایمنی داروهای اعصاب در بارداری و شیردهی
تحقیقات گسترده بالینی اثبات کرده است که افسردگی درمان‌نشده مادر، خطرات بسیار بیشتری از جمله ترشح کورتیزول و تأثیر بر تکامل جنین به همراه دارد. با انتخاب دقیق داروهای دارای پروفایل ایمنی عالی نظیر سرترالین، درمان دارویی کاملاً بی‌خطر در دوران شیردهی امکان‌پذیر است.`,
    body_en: `Perinatal psychiatric health directly impacts maternal well-being and child neurodevelopment. Modern psychopharmacology offers safe, evidence-based medication protocols compatible with breastfeeding.`,
    category: "depression",
    category_fa: "سلامت روان مادر و بارداری",
    category_en: "Perinatal Psychiatry",
    image_url: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=80",
    read_minutes: 5,
    published_date: "2025-02-02",
    author_fa: "دکتر فاطمه مومنی",
    author_en: "Dr. Fatemeh Momeni",
    tags: ["افسردگی پس از زایمان", "سلامت مادر", "شیردهی", "بارداری", "PPD"],
    featured: false,
    clinical_pearl_fa: "مادر سالم زیربنای رشد نوزاد سالم است. درخواست کمک در دوران پس از زایمان نشانه ضعف مادری نیست، بلکه شجاعانه‌ترین اقدام برای مراقبت از فرزند است.",
    target_audience_fa: "مادران باردار، مادران تازه زایمان‌کرده و همسران آنان",
    verified_medical_review: true,
    attachments: [
      {
        id: "att-8-1",
        name: "پرسشنامه استاندارد غربالگری افسردگی پس از زایمان ادینبورگ EPDS (PDF)",
        type: "guide",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        sizeStr: "290 KB",
        description: "مقیاس ۱۰ سوالی استاندارد جهت سنجش سریع خلق مادران پس از زایمان",
        downloadName: "Edinburgh_Postnatal_Depression_Scale_EPDS.pdf"
      }
    ],
    faq_items: [
      {
        question_fa: "آیا داروی تجویزشده وارد شیر مادر می‌شود؟",
        answer_fa: "بسیاری از داروهای مدرن نظیر سرترالین به میزان بسیار ناچیزی وارد شیر می‌شوند که از نظر بالینی برای نوزاد کاملاً ایمن و قابل چشم‌پوشی است."
      }
    ],
    scientific_references: [
      "American College of Obstetricians and Gynecologists (ACOG) Clinical Guidelines",
      "MGH Center for Women's Mental Health Reproductive Psychiatry Protocols"
    ]
  },
  {
    id: "9",
    slug: "occupational-burnout-and-somatic-stress",
    title_fa: "فرسودگی شغلی (Burnout) و استرس مزمن: بیولوژی خستگی و احیای کارکرد شناختی",
    title_en: "Occupational Burnout: The Neurobiology of Exhaustion & Executive Recovery",
    excerpt_fa: "خستگی مفرطی که با استراحت برطرف نمی‌شود، بدبینی شغلی و کاهش بازدهی؛ چگونه سیستم عصبی خودتنظیم را احیا کنیم؟",
    excerpt_en: "Chronic allostatic load, amygdala hypertrophy, and neuro-adaptive recovery pathways from workplace burnout.",
    body_fa: `فرسودگی شغلی (Burnout Syndrome) به عنوان یک پدیده شغلی در طبقه‌بندی بین‌المللی بیماری‌ها (ICD-11) به رسمیت شناخته شده است که ناشی از استرس مزمن و مدیریت‌نشده در محیط کار است.

### ابعاد سه‌گانه فرسودگی شغلی
۱. **خستگی عاطفی و جسمانی مفرط:** احساس تخلیه کامل انرژی
۲. **مسخ شخصیت و بدبینی (Depersonalization):** ایجاد نگرش منفی و بی‌تفاوتی نسبت به همکاران یا مشتریان
۳. **کاهش کارآمدی حرفه‌ای:** احساس ناتوانی در به سرانجام رساندن کارها و افت تمرکز

### بازسازی سیستم عصبی
تحت استرس مزمن، محور هیپوتالاموس-هیپوفیز-آدرنال (HPA) دچار فرسودگی می‌شود. درمان شامل مرزبندی‌های قاطع ارتباطی، تعدیل دارویی خستگی و روان‌درمانی معطوف بر بازتعریف ارزش‌هاست.`,
    body_en: `Burnout results from unmanaged chronic workplace stressors, leading to allostatic overload and emotional exhaustion.`,
    category: "burnout",
    category_fa: "فرسودگی شغلی و استرس",
    category_en: "Occupational Burnout",
    image_url: "https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?auto=format&fit=crop&w=1200&q=80",
    read_minutes: 5,
    published_date: "2025-02-14",
    author_fa: "دکتر فاطمه مومنی",
    author_en: "Dr. Fatemeh Momeni",
    tags: ["فرسودگی شغلی", "Burnout", "استرس مزمن", "تمرکز", "خستگی"],
    featured: false,
    clinical_pearl_fa: "نه گفتن به اضافه‌کاری‌های فرساینده، نه گفتن به شغل نیست؛ بله گفتن به تداوم سلامت و توانمندی پایدار شماست.",
    target_audience_fa: "مدیران، کادر درمان، مهندسان نرم‌افزار و شاغلین تحت فشارهای زمانی سنگین",
    verified_medical_review: true,
    attachments: [
      {
        id: "att-9-1",
        name: "پرسشنامه سنجش فرسودگی شغلی مسلش MBI (PDF)",
        type: "guide",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        sizeStr: "320 KB",
        description: "ابزار ارزیابی ابعاد سه‌گانه خستگی عاطفی، بدبینی و کارآمدی فردی",
        downloadName: "Maslach_Burnout_Inventory_Guide.pdf"
      }
    ],
    faq_items: [
      {
        question_fa: "آیا فرسودگی شغلی همان افسردگی است؟",
        answer_fa: "فرسودگی شغلی معمولاً متمرکز بر بافت کار است، اما در صورت عدم رسیدگی، به سرعت به افسردگی فراگیر بالینی تبدیل می‌شود."
      }
    ],
    scientific_references: [
      "World Health Organization (WHO) ICD-11 Burnout Definition",
      "Maslach, C., & Leiter, M. P. (2016). Understanding the burnout experience"
    ]
  },
  {
    id: "10",
    slug: "psychosomatic-disorders-and-gut-brain-axis",
    title_fa: "اختلالات روان‌تنی (سایکوسوماتیک): وقتی اضطراب در معده و عضلات سخن می‌گوید",
    title_en: "Psychosomatic Disorders: The Gut-Brain Axis, IBS, and Somatic Distress",
    excerpt_fa: "دردهای مبهم قفسه سینه، سندرم روده تحریک‌پذیر (IBS)، سردردهای تنشنی؛ چگونه هیجانات سرکوب‌شده جسم را به درد می‌آورند؟",
    excerpt_en: "Neuro-gastroenterology and the bidirectional vagal nerve pathways connecting emotional dysregulation with physical pain.",
    body_fa: `بدن و ذهن دو نهاد جداگانه نیستند؛ دستگاه گوارش و سیستم ایمنی مستقیماً با بیش از ۱۰۰ میلیون سلول عصبی از طریق عصب واگ با مغز در تعامل مداوم هستند.

### اختلالات شایع روان‌تنی
- **سندرم روده تحریک‌پذیر (IBS):** دل‌پیچه، نفخ و تغییر اجابت مزاج در مواجهه با تنش‌ها
- **سردردهای تنشنی و میگرن:** انقباض مزمن عضلات گردن و پوست سر
- **فیبرومیالژیا و دردهای مزمن عضلانی:** بیش‌حسی مسیرهای درد در سیستم عصبی مرکزی
- **تنگی نفس عصبی و آه کشیدن‌های مکرر**

### رویکرد درمانی
پس از رد علل ارگانیک با آزمایش‌های پزشکی، تجویز دوزهای بسیار پایین داروهای تعدیل‌کننده درد عصبی (نظیر نوروتریپتیلین یا دولوکستین) همراه با آرام‌سازی هیجانی، تسکین عمیقی بر دردهای چندین ساله می‌نهد.`,
    body_en: `The bidirectional Gut-Brain axis mediates somatic manifestations of psychological distress through autonomic and neuro-endocrine routes.`,
    category: "psychosomatic",
    category_fa: "اختلالات روان‌تنی (سایکوسوماتیک)",
    category_en: "Psychosomatic Medicine",
    image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    read_minutes: 5,
    published_date: "2025-02-28",
    author_fa: "دکتر فاطمه مومنی",
    author_en: "Dr. Fatemeh Momeni",
    tags: ["سایکوسوماتیک", "IBS", "محور مغز و روده", "عصب واگ", "درد مزمن"],
    featured: false,
    clinical_pearl_fa: "درد بیمار روان‌تنی خیالی یا ساختگی نیست؛ کاملاً واقعی و ناشی از پیام‌های ناصحیح عصبی است که با درمان علمی خاموش می‌شود.",
    target_audience_fa: "بیماران مبتلا به دردهای گوارشی بدون علت ارگانیک، سردردهای تنشنی و دردهای عضلانی مزمن",
    verified_medical_review: true,
    attachments: [
      {
        id: "att-10-1",
        name: "راهنمای تنفس شکمی دیافراگمی و فعال‌سازی عصب واگ (PDF)",
        type: "pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        sizeStr: "360 KB",
        description: "تمرینات عملی آرام‌سازی دستگاه گوارش و عضلات تنه",
        downloadName: "Vagus_Nerve_Activation_Guide.pdf"
      }
    ],
    faq_items: [
      {
        question_fa: "چرا پزشک گوارش من را به روان‌پزشک ارجاع داد؟",
        answer_fa: "چون ۹۰ درصد سروتونین بدن در دستگاه گوارش تولید می‌شود و داروهای روان‌پزشکی با تنظیم انتقال پیام‌ها، اسپاسم‌ها و درد گوارشی را درمان می‌کنند."
      }
    ],
    scientific_references: [
      "Drossman, D. A. (2016). Functional Gastrointestinal Disorders: History, Pathophysiology, Clinical Features and Rome IV",
      "Gastroenterology: The Brain-Gut-Microbiome Axis"
    ]
  },
  {
    id: "11",
    slug: "child-and-adolescent-separation-anxiety",
    title_fa: "اضطراب جدایی، تیک‌های عصبی و تنظیم هیجان در کودکان و نوجوانان",
    title_en: "Pediatric & Adolescent Anxiety: Separation Distress, Tics, and Emotional Regulation",
    excerpt_fa: "امتناع از مدرسه، دل‌دردهای صبحگاهی قبل از رفتن به کلاس، پرخاشگری ناگهانی؛ راهنمای جامع والدین برای حمایت روانی فرزندان.",
    excerpt_en: "Evidence-based parental coaching, school refusal management, and pediatric psychiatric evaluation for childhood anxiety disorders.",
    body_fa: `کودکان همیشه قادر به بیان کلامی اضطراب خود نیستند؛ در عوض، ترس‌ها و نگرانی‌ها اغلب به شکل دل‌دردهای صبحگاهی، گریه‌های هنگام جدا شدن از والدین یا تیک‌های حرکتی و صوتی خود را نشان می‌دهند.

### نشانه‌های شایع اضطراب در کودکان
- چسبیدن افراطی به والدین و ترس از دست دادن آن‌ها
- کابوس‌های شبانه مکرر و امتناع از خوابیدن در اتاق مجزا
- امتناع از رفتن به مهدکودک یا مدرسه (School Refusal)
- بروز حرکات تکراری غیرارادی نظیر پلک زدن‌های شدید یا صاف کردن مداوم گلو (تیک)

### نقش والدین و درمان تخصصی
پاسخ‌های تسلیم‌شونده یا سرزنش‌گرانه هر دو اضطراب کودک را تشدید می‌کنند. روان‌پزشک با ارزیابی جامع، آموزش سبک‌های فرزندپروری موثر و در صورت نیاز دارودرمانی ایمن کودکان، تاب‌آوری هیجانی فرزند را ارتقا می‌دهد.`,
    body_en: `Childhood anxiety frequently manifests as somatic symptoms, school refusal, and behavioral withdrawal. Early intervention prevents long-term academic and social impairments.`,
    category: "children",
    category_fa: "روان‌پزشکی کودک و نوجوان",
    category_en: "Child & Adolescent Psychiatry",
    image_url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80",
    read_minutes: 5,
    published_date: "2025-03-05",
    author_fa: "دکتر فاطمه مومنی",
    author_en: "Dr. Fatemeh Momeni",
    tags: ["کودک و نوجوان", "اضطراب جدایی", "تیک عصبی", "فرزندپروری", "مدرسه"],
    featured: false,
    clinical_pearl_fa: "کودک مضطرب را لوس یا بهانه‌گیر نخوانید؛ احساس امنیت او نیازمند حضور آرام، باثبات و پیش‌بینی‌پذیر والدین است.",
    target_audience_fa: "والدین کودکان پیش‌دبستانی، دبستانی و نوجوانان با چالش‌های رفتاری",
    verified_medical_review: true,
    attachments: [
      {
        id: "att-11-1",
        name: "راهنمای گام‌به‌گام والدین برای مدیریت امتناع از مدرسه (PDF)",
        type: "pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        sizeStr: "410 KB",
        description: "پروتکل هماهنگی خانه و مدرسه برای بازگشت آرام کودک به کلاس درس",
        downloadName: "School_Refusal_Parental_Guideline.pdf"
      }
    ],
    faq_items: [
      {
        question_fa: "آیا تیک‌های عصبی در کودکان خودبه‌خود برطرف می‌شوند؟",
        answer_fa: "بسیاری از تیک‌های گذرا با کاهش استرس برطرف می‌شوند، اما در صورت تداوم بیش از ۱ سال نیازمند ارزیابی بالینی روان‌پزشکی هستند."
      }
    ],
    scientific_references: [
      "AACAP Practice Parameters for the Assessment and Treatment of Children and Adolescents with Anxiety Disorders",
      "Rutter's Child and Adolescent Psychiatry, 6th Edition"
    ]
  },
  {
    id: "12",
    slug: "couples-therapy-and-emotional-attunement",
    title_fa: "زوج‌درمانی و بازسازی صمیمیت عاطفی: حل الگوهای مخرب گفت‌وگو و تعارض",
    title_en: "Couples Therapy: De-escalating Negative Interaction Cycles & Rebuilding Intimacy",
    excerpt_fa: "چرخه‌های معیوب قهر و تهاجم، ناتوانی در گوش دادن فعال و فرسایش اعتماد؛ هنر بازسازی پیوند امن در روابط زناشویی.",
    excerpt_en: "Emotionally Focused Therapy (EFT) principles to repair attachment injuries, disarm defensive communication, and restore safety.",
    body_fa: `در تعارضات زناشویی، اغلب بحث‌ها بر سر مسائل ظاهری (نظیر کارهای خانه یا برنامه‌های خانوادگی) نیست؛ بلکه در زیربنای تعارض، نیازهای بی‌پاسخ‌مانده دلبستگی نظیر «آیا من برای تو مهم هستم؟» و «آیا در مواقع سختی به من تکیه می‌کنی؟» پنهان شده است.

### الگوهای مخرب رابطه (چهار اسب‌سوار جان گاتمن)
۱. **انتقاد و سرزنش شخصیتی:** به جای شکایت از رفتار، حمله به هویت همسر
۲. **تحقیر و طعنه‌زنی:** سمی‌ترین عامل پیش‌بینی‌کننده طلاق
۳. **حالت دفاعی:** توجیه خود و انداختن تقصیر به گردن طرف مقابل
4. **سکوت و دیوارکشی (Stonewalling):** خروج کامل از گفتگو و قهر

### اصول مداخله در زوج‌درمانی
روان‌درمانگر با ایجاد فضایی ایمن و بدون قضاوت، به زوجین کمک می‌کند تا پیام‌های پنهان زیر خشم را شناسایی کرده و نیازهای عاطفی خود را با زبان بی‌آسیب و صمیمانه بیان کنند.`,
    body_en: `Couples therapy explores underlying attachment longings, dismantling defensive stonewalling and fostering secure interpersonal resonance.`,
    category: "couples",
    category_fa: "روان‌درمانی و زوج‌درمانی",
    category_en: "Couples & Psychotherapy",
    image_url: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=1200&q=80",
    read_minutes: 6,
    published_date: "2025-03-12",
    author_fa: "دکتر فاطمه مومنی",
    author_en: "Dr. Fatemeh Momeni",
    tags: ["زوج‌درمانی", "روابط عاطفی", "حل تعارض", "صمیمیت", "گاتمن"],
    featured: false,
    clinical_pearl_fa: "در رابطه زناشویی، برنده شدن در یک بحث مساوی با باختن هر دو نفر است. هدف، درک احساس همسر است نه اثبات برتری.",
    target_audience_fa: "زوج‌ها، نامزدها و افرادی که به دنبال ارتقای کیفیت رابطه عاطفی و زناشویی خود هستند",
    verified_medical_review: true,
    attachments: [
      {
        id: "att-12-1",
        name: "کاربرگه مکالمات ترمیم پیوند و گوینده-شنونده (PDF)",
        type: "pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        sizeStr: "270 KB",
        description: "راهنمای عملی نوبت‌بندی گفتگو و بازگویی احساسات بدون قطع کلام",
        downloadName: "Speaker_Listener_Couples_Dialogue.pdf"
      }
    ],
    faq_items: [
      {
        question_fa: "آیا در جلسات زوج‌درمانی، درمانگر مقصر را مشخص می‌کند؟",
        answer_fa: "خیر، درمانگر قاضی نیست. هدف شناخت الگوی تعاملی معیوب بین دو نفر و توانمندسازی هر دو برای ترمیم رابطه است."
      }
    ],
    scientific_references: [
      "Johnson, S. M. (2019). The Practice of Emotionally Focused Couple Therapy",
      "Gottman, J. M., & Silver, N. (2015). The Seven Principles for Making Marriage Work"
    ]
  }
];


export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    author_initial: "روشنای غربت",
    persona_title_fa: "مسافر امید (فرانکفورت)",
    persona_title_en: "Hope Seeker (Frankfurt)",
    author_label_fa: "مراجع ویزیت آنلاین بین‌المللی (آلمان)",
    author_label_en: "International Online Patient (Germany)",
    body_fa: "به دلیل اقامت در خارج از کشور، دسترسی به روان‌پزشک فارسی‌زبان که فرهنگ، ریشه‌های خانوادگی و شرایط مهاجرت را عمیقاً درک کند بسیار دشوار بود. جلسات آنلاین منظم با خانم دکتر مومنی و تنظیم دارویی دقیق ایشان، افسردگی و اضطراب شدیدی که ماه‌ها مرا خانه‌نشین کرده بود را به طور کامل مهار کرد.",
    body_en: "Living abroad made finding an empathetic, Persian-speaking psychiatrist challenging. Dr. Momeni's structured online sessions and precise medication management helped me completely overcome debilitating anxiety and mood drop.",
    rating: 5,
    service_tag: "online_depression",
    service_tag_fa: "درمان افسردگی و اضطراب آنلاین",
    service_tag_en: "Online Depression & Anxiety",
    category: "online",
    shadow_avatar: "seeker_light",
    treatment_duration_fa: "دوره درمانی: ۸ ماه",
    treatment_duration_en: "Care Duration: 8 Months",
    verified: true,
    location_tag_fa: "آنلاین بین‌المللی",
    location_tag_en: "International Online",
    outcome_badge_fa: "بهبودی کامل خلق و بازگشت به کار",
    outcome_badge_en: "Complete Remission & Work Return",
    date_str: "۱۴۰۳/۰۹",
    order: 1,
    visit_type: "online"
  },
  {
    id: "2",
    author_initial: "ساحل آرامش",
    persona_title_fa: "ذهن رها از پانیک",
    persona_title_en: "Calm Horizon (Panic-Free)",
    author_label_fa: "مراجع ویزیت حضوری (بیمارستان نیکان غرب تهران)",
    author_label_en: "In-Person Patient (Nikan Gharb Hospital, Tehran)",
    body_fa: "برخورد بسیار صبورانه، محترمانه و نگاه علمی خانم دکتر در اتاق درمان فوق‌العاده آرامش‌بخش است. بعد از ماه‌ها سردرگمی، ترس از حملات مکرر پانیک و مراجعه به اورژانس‌های مختلف، با تشخیص دقیق ایشان و گذشت چند هفته، دوباره به زندگی آرام و رانندگی بدون هراس برگشتم.",
    body_en: "Dr. Momeni's patient, respectful, and deeply scientific bedside manner is profoundly calming. After months of terrifying panic attacks, her diagnostic accuracy restored complete normalcy to my life.",
    rating: 5,
    service_tag: "inperson_panic",
    service_tag_fa: "مهار حملات پانیک و اضطراب فراگیر",
    service_tag_en: "Panic Disorder & GAD Relief",
    category: "anxiety",
    shadow_avatar: "calm_mind",
    treatment_duration_fa: "دوره درمانی: ۶ ماه",
    treatment_duration_en: "Care Duration: 6 Months",
    verified: true,
    location_tag_fa: "بیمارستان نیکان غرب",
    location_tag_en: "Nikan Gharb Hospital",
    outcome_badge_fa: "قطع کامل حملات پانیک",
    outcome_badge_en: "Zero Panic Episodes",
    date_str: "۱۴۰۳/۰۸",
    order: 2,
    visit_type: "in_person"
  },
  {
    id: "3",
    author_initial: "پیوند دوباره",
    persona_title_fa: "همراهان گفت‌وگو",
    persona_title_en: "Harmonious Bond",
    author_label_fa: "مراجع زوج‌درمانی تخصصی (تهران)",
    author_label_en: "Couples Therapy Client (Tehran)",
    body_fa: "جلسات زوج‌درمانی با خانم دکتر مومنی چشم‌انداز کاملاً جدیدی در ارتباط ما باز کرد. ایشان بدون هیچ‌گونه سوگیری یا جانبداری، ریشه‌های اصلی سوءتفاهم‌های انباشته‌شده را کالبدشکافی کردند و ابزارهای عینی و علمی گفت‌وگو را در اختیار ما گذاشتند.",
    body_en: "Our couples therapy sessions with Dr. Momeni provided transformative insights into our relationship dynamics, maintaining absolute therapeutic neutrality and clinical wisdom.",
    rating: 5,
    service_tag: "couples",
    service_tag_fa: "زوج‌درمانی و حل تعارضات ارتباطی",
    service_tag_en: "Couples & Relational Therapy",
    category: "couples",
    shadow_avatar: "harmony_duo",
    treatment_duration_fa: "۱۲ جلسه هفتگی",
    treatment_duration_en: "12 Weekly Sessions",
    verified: true,
    location_tag_fa: "حضوری / آنلاین",
    location_tag_en: "Hybrid (In-Person/Online)",
    outcome_badge_fa: "حل تعارضات مزمن و ارتقای صمیمیت",
    outcome_badge_en: "Conflict Resolution & Intimacy",
    date_str: "۱۴۰۳/۰۷",
    order: 3,
    visit_type: "in_person"
  },
  {
    id: "4",
    author_initial: "تمرکز ژرف",
    persona_title_fa: "کاشف پتانسیل ذهن (ADHD)",
    persona_title_en: "Focused Mind (ADHD Reclaimed)",
    author_label_fa: "مراجع بیش‌فعالی و نقص توجه بزرگسالان (ADHD)",
    author_label_en: "Adult ADHD Patient (Executive Function)",
    body_fa: "سال‌ها فکر می‌کردم تنبلم و اراده ندارم، تا اینکه خانم دکتر مومنی با ارزیابی دقیق، بیش‌فعالی و نقص توجه بزرگسالی را در من تشخیص دادند. شروع درمان دارویی سبک همراه با راهکارهای سازماندهی ذهن، راندمان کاری و تحصیلی‌ام را چند برابر کرد و احساس گناه همیشگی‌ام پایان یافت.",
    body_en: "I always blamed myself for chronic procrastination until Dr. Momeni accurately diagnosed adult ADHD. Targeted treatment and cognitive structuring transformed my focus and eliminated years of self-doubt.",
    rating: 5,
    service_tag: "adhd",
    service_tag_fa: "تشخیص و مدیریت ADHD بزرگسالان",
    service_tag_en: "Adult ADHD Diagnosis & Care",
    category: "adhd",
    shadow_avatar: "focus_spark",
    treatment_duration_fa: "دوره درمانی: ۴ ماه",
    treatment_duration_en: "Care Duration: 4 Months",
    verified: true,
    location_tag_fa: "ویزیت آنلاین",
    location_tag_en: "Online Consultation",
    outcome_badge_fa: "ارتقای چشمگیر تمرکز و انگیزه کاری",
    outcome_badge_en: "Enhanced Focus & Productivity",
    date_str: "۱۴۰۳/۱۰",
    order: 4,
    visit_type: "online"
  },
  {
    id: "5",
    author_initial: "رهایی از وسواس",
    persona_title_fa: "سپر تاب‌آوری ذهن",
    persona_title_en: "Resilient Shield (OCD Free)",
    author_label_fa: "مراجع درمان وسواس فکری و شست‌وشو (OCD)",
    author_label_en: "OCD Patient (Intrusive Thoughts & Compulsions)",
    body_fa: "سال‌ها با وسواس شدید فکری و تشریفات خسته‌کننده دست‌وپنجه نرم می‌کردم و از برچسب خوردن یا مصرف دارو هراس داشتم. خانم دکتر مومنی با حوصله تمام، فیزیولوژی مغز و بی‌خطر بودن داروها را برایم شفاف کردند. امروز بعد از ۶ ماه، احساس آزادی و آرامش بی‌سابقه‌ای دارم.",
    body_en: "I fought debilitating OCD rituals and feared medication stigmas. Dr. Momeni kindly walked me through the neurobiology of recovery. Six months in, I have reclaimed my peace of mind.",
    rating: 5,
    service_tag: "ocd",
    service_tag_fa: "درمان وسواس فکری-عملی (OCD)",
    service_tag_en: "Obsessive-Compulsive Disorder",
    category: "anxiety",
    shadow_avatar: "resilient_shield",
    treatment_duration_fa: "دوره درمانی: ۶ ماه",
    treatment_duration_en: "Care Duration: 6 Months",
    verified: true,
    location_tag_fa: "بیمارستان نیکان غرب",
    location_tag_en: "Nikan Gharb Hospital",
    outcome_badge_fa: "کاهش ۹۰ درصدی افکار مزاحم وسواسی",
    outcome_badge_en: "90% Reduction in Intrusions",
    date_str: "۱۴۰۳/۰۶",
    order: 5,
    visit_type: "in_person"
  },
  {
    id: "6",
    author_initial: "بیداری دوباره",
    persona_title_fa: "مسافر شب و آرامش",
    persona_title_en: "Night Traveler (Sleep Restored)",
    author_label_fa: "مراجع اختلالات خواب و استرس شغلی مفرط (Burnout)",
    author_label_en: "Sleep Architecture & Burnout Recovery",
    body_fa: "به دلیل فشارهای شدید کاری، ماه‌ها بی‌خوابی مفرط و بیداری‌های شبانه همراه با خستگی مزمن داشتم. با بررسی دقیق الگوهای خواب و تنظیم دارویی اختصاصی بدون ایجاد وابستگی توسط خانم دکتر، کیفیت خواب عمیق و شادابی روزانه‌ام احیا شد.",
    body_en: "Severe occupational burnout ruined my sleep architecture. Dr. Momeni restored restorative deep sleep and morning energy through precise non-habit-forming medical intervention.",
    rating: 5,
    service_tag: "sleep_burnout",
    service_tag_fa: "تنظیم خواب و احیای انرژی روانی",
    service_tag_en: "Insomnia & Burnout Restoration",
    category: "depression",
    shadow_avatar: "night_awakening",
    treatment_duration_fa: "دوره درمانی: ۳ ماه",
    treatment_duration_en: "Care Duration: 3 Months",
    verified: true,
    location_tag_fa: "آنلاین سراسری",
    location_tag_en: "Nationwide Online",
    outcome_badge_fa: "بهبود کیفیت خواب عمیق و رفع خستگی",
    outcome_badge_en: "Deep Sleep & Stamina Restored",
    date_str: "۱۴۰۳/۱۱",
    order: 6,
    visit_type: "online"
  },
  {
    id: "7",
    author_initial: "پرواز امید",
    persona_title_fa: "رهایی از کرختی افسردگی",
    persona_title_en: "Wings of Hope (Depression Overcome)",
    author_label_fa: "مراجع افسردگی اساسی و بی‌انگیزگی (MDD)",
    author_label_en: "Major Depressive Disorder Recovery",
    body_fa: "ماه‌ها در تاریکی و ناتوانی از بلند شدن از تخت بودم. مهربانی، درک عمیق بدون قضاوت و تنظیم هوشمندانه درمان توسط دکتر مومنی شبیه یک نجات واقعی بود. امروز دوباره انگیزه، لبخند و امید به آینده در زندگی‌ام جاری است.",
    body_en: "I spent months paralyzed by heavy depressive fog. Dr. Momeni's empathetic listening and precise therapeutic regimen gave me back my joy and zest for life.",
    rating: 5,
    service_tag: "depression",
    service_tag_fa: "درمان افسردگی اساسی و بهبود خلق",
    service_tag_en: "Major Depressive Disorder",
    category: "depression",
    shadow_avatar: "hope_wings",
    treatment_duration_fa: "دوره درمانی: ۹ ماه",
    treatment_duration_en: "Care Duration: 9 Months",
    verified: true,
    location_tag_fa: "بیمارستان نیکان غرب",
    location_tag_en: "Nikan Gharb Hospital",
    outcome_badge_fa: "احیای کامل شادابی و انگیزه زندگی",
    outcome_badge_en: "Full Vitality & Mood Recovery",
    date_str: "۱۴۰۳/۱۱",
    order: 7,
    visit_type: "in_person"
  },
  {
    id: "8",
    author_initial: "نسیم رهایی",
    persona_title_fa: "تنفس عمیق و آرامش ذهن",
    persona_title_en: "Mindful Breeze (Somatic Calm)",
    author_label_fa: "مراجع علائم جسمانی اضطراب و تپش قلب",
    author_label_en: "Somatic Anxiety & Heart Palpitations",
    body_fa: "تپش قلب‌های مداوم و دلشوره بی‌دلیل باعث شده بود از جمع و محیط کار فرار کنم. رویکرد جامع خانم دکتر که هم جسم و هم روان را در نظر می‌گیرد، حس امنیت و سبکی عمیقی به من بخشید.",
    body_en: "Chronic physical tension and sudden palpitations made workplace meetings unbearable. Dr. Momeni's holistic neuro-psychiatric treatment brought true somatic tranquility.",
    rating: 5,
    service_tag: "anxiety",
    service_tag_fa: "مهار علائم جسمانی اضطراب و تپش قلب",
    service_tag_en: "Somatic Anxiety & Palpitation Care",
    category: "anxiety",
    shadow_avatar: "breeze_zen",
    treatment_duration_fa: "دوره درمانی: ۵ ماه",
    treatment_duration_en: "Care Duration: 5 Months",
    verified: true,
    location_tag_fa: "آنلاین / حضوری",
    location_tag_en: "Hybrid Care",
    outcome_badge_fa: "رفع تپش قلب و احساس سبکی پایدار",
    outcome_badge_en: "Somatic Symptoms Fully Resolved",
    date_str: "۱۴۰۳/۱۲",
    order: 8,
    visit_type: "online"
  }
];
