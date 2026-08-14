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
    author_en: "Dr. Fatemeh Momeni"
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
    author_en: "Dr. Fatemeh Momeni"
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
    author_en: "Dr. Fatemeh Momeni"
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
    category: "general",
    category_fa: "تمرکز و شناخت",
    category_en: "Cognition & Focus",
    image_url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    read_minutes: 5,
    published_date: "2024-12-05",
    author_fa: "دکتر فاطمه مومنی",
    author_en: "Dr. Fatemeh Momeni"
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
