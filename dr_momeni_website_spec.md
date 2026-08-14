# وب‌سایت تخصصی دکتر فاطمه مومنی — پرامپت نهایی بازتولید
## نسخه کامل و فوق‌حرفه‌ای (Reverse-Engineered from Base44)

---

## 1. هویت پروژه و اهداف

| فیلد | مقدار |
|------|-------|
| **نام پزشک** | دکتر فاطمه مومنی |
| **تخصص** | متخصص اعصاب و روان (روان‌پزشک) — دارای بورد تخصصی |
| **محل فعالیت** | تهران، بیمارستان نیکان غرب |
| **نوع ویزیت** | حضوری و آنلاین (هر دو برجسته) |
| **شماره تماس** | `09934420967` |
| **WhatsApp** | `https://wa.me/989934420967` |
| **آدرس نقشه** | `https://www.google.com/maps/search/?api=1&query=Nikan+Gharb+Hospital+Tehran` |

### قانون ۵ ثانیه‌ای
در ۵ ثانیه اول کاربر باید بداند:
1. این پزشک کیست
2. به چه کسانی کمک می‌کند
3. چطور شروع کند (رزرو نوبت)

### حس‌وحال کلی
- **حس**: آرامش حرفه‌ای، اقتدار آرام، بی‌طرفی گرم
- **تم**: فقط روشن (Light Mode) — هیچ دارک‌مودی
- **دلیل**: محیط تیره برای کاربر مضطرب حس انزوا القا می‌کند
- **مخاطب**: فردی، زوج، خانواده، کودک و نوجوان

---

## 2. استک فنی و معماری

```
Framework:        React 18.2+ (SPA، بدون SSR)
Build Tool:       Vite 5+ (ESM)
Styling:          Tailwind CSS 3.4+ + tailwindcss-animate
State Server:     Base44 BaaS (Entity CRUD)
State Client:     React Query (TanStack) 5.84 + useState + localStorage
Routing:          React Router DOM 6.26+
Icons:            Lucide React 0.475+
Date:             moment 2.30+ (فقط پنل)
UI Primitives:    shadcn/ui (کامل)
Maps:             iframe OpenStreetMap (بدون کتابخانه map)
Auth:             OTP محلی شبیه‌سازی‌شده (بدون backend SMS)
```

### ⚠️ مهم
**از Framer Motion استفاده نکن.** همه انیمیشن‌ها CSS-only یا IntersectionObserver خالص باشند.

---

## 3. ساختار دایرکتوری

```
project-root/
├── index.html                      ← HTML root: lang="fa" dir="rtl"
├── vite.config.js                  ← @base44/vite-plugin + react()
├── jsconfig.json                   ← alias @/* → ./src/*, jsx: react-jsx
├── tailwind.config.js              ← tokens + keyframes + animations
├── postcss.config.js               ← tailwindcss + autoprefixer
├── components.json                 ← shadcn/ui config
├── package.json
├── base44/
│   ├── config.jsonc
│   └── entities/
│       ├── Appointment.jsonc       ← entity نوبت
│       ├── BlogPost.jsonc          ← entity مقاله
│       └── Testimonial.jsonc       ← entity نظرات
└── src/
    ├── main.jsx                    ← ReactDOM.createRoot('#root').render(<App/>)
    ├── App.jsx                     ← Router + LanguageProvider + ScrollToTop
    ├── index.css                   ← Design Tokens (HSL) + utility classes + animations
    ├── api/
    │   └── base44Client.js         ← export base44 (SDK پیش‌مقداردهی‌شده)
    ├── i18n/
    │   ├── LanguageProvider.jsx    ← Context زبان + RTL/LTR + localStorage
    │   └── translations.js         ← دیکشنری {fa, en} + serviceKeys
    ├── lib/
    │   ├── siteConstants.js        ← ثابت‌های تماس/موقعیت/تصاویر
    │   ├── utils.js                ← cn() + isIframe
    │   ├── query-client.js         ← QueryClient (refetchOnWindowFocus:false)
    │   ├── AuthContext.jsx         ← scaffolding پلتفرم
    │   ├── authReturnTo.js
    │   ├── app-params.js
    │   └── PageNotFound.jsx        ← صفحه ۴۰۴ (slate-based)
    ├── hooks/
    │   ├── use-size.jsx            ← useSize (ResizeObserver برای Image)
    │   └── use-mobile.jsx          ← useIsMobile
    ├── components/
    │   ├── Reveal.jsx              ← IntersectionObserver wrapper
    │   ├── ScrollToTop.jsx         ← اسکرول به بالا روی route change
    │   ├── ProtectedRoute.jsx      ← scaffolding
    │   ├── UserNotRegisteredError.jsx
    │   ├── AuthLayout.jsx
    │   ├── GoogleIcon.jsx
    │   ├── layout/
    │   │   ├── Layout.jsx          ← Header + Outlet + Footer + FloatingCareBar
    │   │   ├── Header.jsx          ← هدر sticky glass
    │   │   ├── Footer.jsx          ← فوتر ۳ ستونه
    │   │   └── FloatingCareBar.jsx ← نوار شناور تماس/واتساپ
    │   ├── site/
    │   │   ├── SectionHeading.jsx  ← عنوان بخش (kicker + title + intro)
    │   │   └── ServiceCard.jsx     ← کارت خدمت
    │   └── ui/                     ← کتابخانه کامل shadcn/ui
    │       ├── button.jsx
    │       ├── image.jsx           ← کامپوننت تصویر با CDN transform
    │       ├── dialog.jsx
    │       ├── sheet.jsx
    │       ├── toast.jsx / toaster.jsx / use-toast.jsx
    │       ├── input.jsx
    │       ├── label.jsx
    │       ├── tabs.jsx
    │       ├── badge.jsx
    │       ├── separator.jsx
    │       ├── scroll-area.jsx
    │       ├── skeleton.jsx
    │       ├── tooltip.jsx
    │       ├── accordion.jsx
    │       ├── calendar.jsx
    │       ├── select.jsx
    │       ├── textarea.jsx
    │       ├── checkbox.jsx
    │       ├── radio-group.jsx
    │       ├── progress.jsx
    │       └── ... (تمام primitiveهای shadcn)
    └── pages/
        ├── Home.jsx                ← صفحه اصلی
        ├── About.jsx               ← درباره من
        ├── Services.jsx            ← خدمات
        ├── Visits.jsx              ← ویزیت
        ├── Blog.jsx                ← بلاگ
        ├── BlogPost.jsx            ← جزئیات مقاله
        ├── Testimonials.jsx        ← نظرات
        ├── Contact.jsx             ← تماس
        ├── PatientPanel.jsx        ← پنل بیمار
        ├── Login.jsx               ← scaffolding (روت ثبت‌نشده)
        ├── Register.jsx            ← scaffolding (روت ثبت‌نشده)
        ├── ForgotPassword.jsx      ← scaffolding (روت ثبت‌نشده)
        ├── ResetPassword.jsx       ← scaffolding (روت ثبت‌نشده)
        └── OAuthConsent.jsx        ← scaffolding (روت ثبت‌نشده)
```

---

## 4. سیستم طراحی (Design Tokens)

### 4.1 پالت رنگی — مقادیر HSL دقیق

تمام توکن‌ها در `:root` به‌صورت کانال HSL تعریف شده‌اند. **فقط Light Mode.** هیچ `.dark` block نباشد.

| توکن | HSL دقیق | HEX تقریبی | مصرف |
|------|----------|------------|------|
| `--background` | `36 54% 97.5%` | `#FCF9F5` | پس‌زمینه کل صفحه |
| `--foreground` | `193 9% 19%` | `#2C3335` | متن اصلی |
| `--card` | `0 0% 100%` | `#FFFFFF` | پس‌زمینه کارت‌ها |
| `--card-foreground` | `193 9% 19%` | `#2C3335` | متن داخل کارت |
| `--popover` | `0 0% 100%` | `#FFFFFF` | پاپاور |
| `--popover-foreground` | `193 9% 19%` | `#2C3335` | متن پاپاور |
| `--primary` | `192 62% 31%` | `#1E6B7E` | تیل/فیروزه‌ای عمیق |
| `--primary-foreground` | `36 54% 97.5%` | `#FCF9F5` | متن روی primary |
| `--secondary` | `188 46% 68%` | `#88C9D3` | آبی-فیروزه‌ای نرم |
| `--secondary-foreground` | `192 62% 31%` | `#1E6B7E` | متن روی secondary |
| `--muted` | `188 30% 93%` | `#EAF0F1` | پس‌زمینه‌های خالی |
| `--muted-foreground` | `192 10% 42%` | `#6B7A80` | متن ثانویه |
| `--accent` | `188 46% 90%` | `#DBEEF3` | تینت روشن |
| `--accent-foreground` | `192 62% 25%` | `#155566` | متن روی accent |
| `--destructive` | `0 72% 48%` | `#D23A2E` | خطا / دکمه لغو |
| `--destructive-foreground` | `0 0% 98%` | `#FAFAFA` | متن روی destructive |
| `--border` | `188 24% 87%` | `#D5E0E2` | خط مرزی |
| `--input` | `188 24% 87%` | `#D5E0E2` | حاشیه input |
| `--ring` | `192 62% 31%` | `#1E6B7E` | حلقه فوکوس |
| `--soft-sky` | `188 46% 68%` | `#88C9D3` | alias secondary |
| `--alabaster` | `36 54% 97.5%` | `#FCF9F5` | alias background |
| `--charcoal` | `193 9% 19%` | `#2C3335` | overlay موبایل |
| `--teal-deep` | `192 62% 31%` | `#1E6B7E` | alias primary |
| `--cream` | `36 45% 94%` | `#F7F1E9` | سکشن‌های متناوب |
| `--radius` | `1.1rem` | — | شعاع گوشه |

### 4.2 رنگ‌های هاردکد خارج از پالت

| مقدار | محل استفاده |
|-------|-------------|
| `#25D366` | دکمه WhatsApp در FloatingCareBar و Contact |
| `rgba(30,107,126,0.45)` | `.btn-soft-glow` — سایه دکمه اصلی |
| `rgba(30,107,126,0.25)` | سایه هدر در حالت scrolled |
| `rgba(30,107,126,0.5)` | سایه پرتره Hero |
| `rgba(30,107,126,0.35)` | سایه hover کارت خدمت |

### 4.3 توکن‌های فونت

```css
:root {
  --font-heading: 'Vazirmatn', 'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-body:    'Vazirmatn', 'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Vazirmatn', 'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-mono:    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

html[lang="en"] {
  --font-heading: 'Hanken Grotesk', 'Vazirmatn', ui-sans-serif, system-ui, sans-serif;
  --font-body:    'Hanken Grotesk', 'Vazirmatn', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Hanken Grotesk', 'Vazirmatn', ui-sans-serif, system-ui, sans-serif;
}
```

---

## 5. تایپوگرافی

### 5.1 فونت‌ها (بارگذاری در index.html)

```html
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

### 5.2 استایل‌های پایه

| عنصر | مقادیر |
|------|--------|
| body | `font-family: var(--font-body); font-size: 17px; line-height: 1.6; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;` |
| h1..h6 | `font-family: var(--font-heading); font-weight: 600; line-height: 1.25; letter-spacing: -0.01em;` |
| selection | `background: hsl(var(--primary) / 0.18);` |
| html | `scroll-behavior: smooth;` |

### 5.3 سایزهای استفاده‌شده

| کلاس | سایز | مصرف |
|------|------|------|
| `text-[11px]` | ۱۱px | tooltip، badge کوچک |
| `text-[12px]` | ۱۲px | kickerها |
| `text-[13px]` | ۱۳px | لینک‌های کوچک |
| `text-sm` | ۱۴px | توضیحات کارت |
| `text-[17px]` | ۱۷px | body text اصلی |
| `text-lg` | ۱۸px | subtitle hero |
| `text-xl` | ۲۰px | عنوان کارت |
| `text-3xl` | ۳۰px | عنوان سکشن |
| `text-4xl` | ۳۶px | h1 mobile |
| `text-5xl` | ۴۸px | h1 tablet |
| `text-6xl` | ۶۰px | h1 desktop |

### 5.4 tracking و leading

| مقدار | مصرف |
|-------|------|
| `tracking-[0.18em]` | همه kickerها |
| `tracking-[0.4em]` | کد OTP |
| `leading-[1.12]` | h1 hero |
| `leading-tight` (۱.۲۵) | headings |
| `leading-relaxed` (۱.۶۲۵) | body text |

---

## 6. کامپوننت‌ها — مشخصات کامل

### 6.1 Reveal (components/Reveal.jsx)

**props:** `{ children, delay=0, className='', as: Tag='div' }`

**state:** `shown: boolean = false`

**منطق:** `IntersectionObserver(node, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })`
- پس از intersect → `setShown(true)` + `obs.unobserve(e.target)`
- cleanup: `obs.disconnect()`

**render:** `<Tag ref={node} style={{transitionDelay: \`${delay}ms\`}} className={\`fade-up ${shown ? 'in' : ''} ${className}\`}>`

**مصرف:** همه صفحات

### 6.2 SectionHeading (components/site/SectionHeading.jsx)

**props:** `{ kicker?, title, intro?, align='center', className='' }`

**render:**
```
<Reveal className={`${isCenter ? 'text-center mx-auto' : ''} max-w-2xl ${className}`}>
  kicker: span text-xs font-semibold tracking-[0.18em] uppercase text-primary/80 mb-3
  h2: text-3xl sm:text-4xl md:text-[2.6rem] font-heading font-semibold text-foreground leading-tight
  intro: p mt-4 text-muted-foreground leading-relaxed text-[17px]
</Reveal>
```

**مصرف:** Home×3, Services, Visits, Blog, Testimonials, Contact

### 6.3 ServiceCard (components/site/ServiceCard.jsx)

**props:** `{ icon, title, desc, serviceKey, compact=false }`

**آیکون‌ها (mapping Lucide):**
- individual → User
- couple → HeartHandshake
- family → Users
- child → Baby
- depression → CloudRain
- anxiety → Wind

**render:**
```
div.group.h-full.rounded-3xl.bg-card.border.border-border/60.p-6.sm:p-7
  transition-all duration-500 hover:-translate-y-1.5
  hover:shadow-[0_24px_50px_-24px_rgba(30,107,126,0.35)] hover:border-primary/30
  ├─ icon-box: w-14 h-14 rounded-2xl bg-accent/60 text-primary
  │   group-hover:bg-primary group-hover:text-primary-foreground
  ├─ h3: font-heading font-semibold text-foreground text-xl mb-2
  ├─ p: text-sm text-muted-foreground leading-relaxed
  └─ Link to="/panel" state={{service: serviceKey}}
      mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary
      hover:gap-2.5 transition-all
      {t('bookthis_service')} <ArrowRight className={`w-4 h-4 ${rtl ? 'rotate-180' : ''}`} />
```

**مصرف:** Home, Services

### 6.4 Header (components/layout/Header.jsx)

**رفتار:**
- `fixed top-0 inset-x-0 z-50`
- حالت اولیه: `transparent`، padding `py-4`
- وقتی `scrollY > 24px` → `.glass` + `shadow-[0_2px_30px_-12px_rgba(30,107,126,0.25)]` + `py-2.5`
- listener: `passive: true`

**محتوا (RTL):**
| المان | دسکتاپ | موبایل |
|-------|--------|--------|
| لوگو | دایره `w-10 h-10 rounded-2xl bg-primary` + حرف "ف" + brand text | دایره + brand text |
| ناوبری | ۷ لینک (hidden lg:flex) | drawer (lg:hidden) |
| سوییچ زبان | hidden sm:flex | در drawer |
| دکمه تلفن | hidden md:flex | در drawer |
| دکمه Book | hidden sm:inline-flex | در drawer |
| دکمه منو | lg:hidden | نمایش |

**drawer موبایل:**
- overlay: `absolute inset-0 bg-charcoal/30 backdrop-blur-sm`
- پنل: `absolute top-0 inset-x-0 glass border-b border-border/60 pt-20 pb-6 px-6 animate-accordion-down`
- بسته شدن: با تغییر `location.pathname`

**NavLink active:** `text-primary bg-accent/70`
**NavLink inactive:** `text-foreground/70 hover:text-primary hover:bg-accent/40`

### 6.5 Footer (components/layout/Footer.jsx)

```
bg-cream border-t border-border/60
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14

grid gap-10 md:grid-cols-12:
├─ md:col-span-5: لوگو + brand_name/role + footer_about + دکمه tel + دکمه WhatsApp
├─ md:col-span-3: Quick Links (۶ لینک)
└─ md:col-span-4: اطلاعات تماس + privacy note

کپی‌رایت: mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between
```

### 6.6 FloatingCareBar (components/layout/FloatingCareBar.jsx)

```
fixed bottom-5 z-40
visible فقط وقتی scrollY > 480
  → visible: opacity-100 translate-y-0
  → hidden: opacity-0 translate-y-6 pointer-events-none

RTL: left-4 sm:left-6
LTR: right-4 sm:right-6

شکل pill (container rounded-full glass shadow-lg)

├─ دکمه تلفن: w-12 h-12 rounded-full bg-primary text-primary-foreground
│   shadow-lg btn-soft-glow animate-pulse-ring
│   + tooltip hover (absolute -top-9, bg-charcoal/90 text-alabaster text-[11px])
│
└─ دکمه WhatsApp: w-12 h-12 rounded-full bg-[#25D366] text-white
    shadow-lg hover:scale-105
```

### 6.7 Layout (components/layout/Layout.jsx)

```jsx
<div className="min-h-screen flex flex-col bg-background">
  <Header />
  <main className="flex-1"><Outlet /></main>
  <Footer />
  <FloatingCareBar />
</div>
```

### 6.8 Image (components/ui/image.jsx)

**منطق:**
- اگر `src` روی `media.base44.com` یا `static.wixstatic.com` باشد → URL transform
- params: `w_`, `h_`, `q_90`, `usm_0.66_1.00_0.01`, `enc_webp`, `quality_auto`
- srcset: 1x/2x/3x با DPR
- placeholder blur: resize به width:20 + filter:blur(10px)
- fallback: `FALLBACK_IMAGE_URL` در `onError`
- اگر `src` خارج از هاست‌های Wix → `<img>` خام

**نکته:** فایل‌های آپلودی کاربر (با underscore در نام) از transform پشتیبانی نمی‌کنند.

---

## 7. سیستم دوزبانه (i18n)

### 7.1 ساختار ترجمه

```js
export const translations = {
  fa: { brand_name: "دکتر فاطمه مومنی", nav_home: "خانه", /* ~۱۰۰ کلید */ },
  en: { brand_name: "Dr. Fatemeh Momeni", nav_home: "Home", /* همان کلیدها */ }
};

export const serviceKeys = [
  { key:"individual",  title:"service_individual_title",  desc:"service_individual_desc",  icon:"User" },
  { key:"couple",     title:"service_couple_title",     desc:"service_couple_desc",     icon:"HeartHandshake" },
  { key:"family",     title:"service_family_title",     desc:"service_family_desc",     icon:"Users" },
  { key:"child",      title:"service_child_title",      desc:"service_child_desc",      icon:"Baby" },
  { key:"depression", title:"service_depression_title", desc:"service_depression_desc", icon:"CloudRain" },
  { key:"anxiety",    title:"service_anxiety_title",    desc:"service_anxiety_desc",    icon:"Wind" }
];
```

### 7.2 LanguageProvider

```js
const [lang, setLang] = useState(() => localStorage.getItem('dr_lang') || 'fa');
const dir = lang === 'fa' ? 'rtl' : 'ltr';

useEffect(() => {
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', dir);
  localStorage.setItem('dr_lang', lang);
}, [lang, dir]);

const t = useCallback((key) => {
  const dict = translations[lang] || translations.fa;
  return dict[key] ?? translations.fa[key] ?? key;
}, [lang]);

const pick = useCallback((obj, base) => {
  if (!obj) return '';
  const suffix = lang === 'fa' ? '_fa' : '_en';
  return obj[base + suffix] || obj[base + '_fa'] || obj[base + '_en'] || '';
}, [lang]);

const toggleLang = useCallback(() => setLang(prev => prev === 'fa' ? 'en' : 'fa'), []);
```

### 7.3 کلیدهای ترجمه کامل

```
brand_name, brand_role, board_certified, hospital, tehran, phone,
nav_home, nav_about, nav_services, nav_visits, nav_blog, nav_testimonials, nav_contact, nav_panel,
book_now, book_in_person, book_online, call_direct, whatsapp,
view_services, read_more, view_all_posts, view_all_testimonials,
send_message, book_this_service, back_to_blog, back_home, contact_us, learn_more,
hero_kicker, hero_title, hero_subtitle,
hero_card_inperson_title, hero_card_inperson_desc,
hero_card_online_title, hero_card_online_desc,
trust_kicker, trust_board, trust_board_desc, trust_exp, trust_exp_desc,
trust_hospital, trust_hospital_desc, trust_online, trust_online_desc,
services_kicker, services_title, services_intro,
service_individual_title, service_individual_desc,
service_couple_title, service_couple_desc,
service_family_title, service_family_desc,
service_child_title, service_child_desc,
service_depression_title, service_depression_desc,
service_anxiety_title, service_anxiety_desc,
about_kicker, about_title, about_p1, about_p2,
about_philo_title, about_philo_p,
about_creds_title, about_creds_edu, about_creds_board, about_creds_exp, about_creds_hospital, about_creds_online,
about_why_title, about_why_p,
visits_kicker, visits_title, visits_intro,
visit_inperson_title, visit_inperson_desc, visit_inperson_steps,
visit_online_title, visit_online_desc, visit_online_steps,
visit_address_title, visit_address,
visit_online_security_title, visit_online_security_desc,
visit_map_hint,
blog_kicker, blog_title, blog_intro,
blog_read_min, blog_category_all, blog_related, blog_empty,
testi_kicker, testi_title, testi_intro, testi_empty, testi_privacy_note,
contact_kicker, contact_title, contact_intro,
contact_phone_title, contact_whatsapp_title,
contact_address_title, contact_address_val,
contact_form_name, contact_form_phone, contact_form_message,
contact_form_send, contact_success, contact_hours_title, contact_hours_val,
panel_kicker, panel_title,
panel_login_title, panel_login_desc, panel_phone_label, panel_send_otp,
panel_otp_label, panel_verify_otp, panel_otp_hint, panel_resend, panel_wrong_code,
panel_welcome, panel_upcoming, panel_history,
panel_new_appointment, panel_no_upcoming, panel_no_history,
panel_cancel, panel_logout,
bk_step_service, bk_step_type, bk_step_time, bk_step_confirm,
bk_select_service, bk_select_type, bk_select_date, bk_select_slot,
bk_confirm_summary, bk_service, bk_type, bk_date, bk_time, bk_name,
bk_confirm_btn, bk_next, bk_back, bk_success, bk_next_available,
footer_about, footer_quick, footer_contact, footer_privacy,
footer_rights, footer_privacy_note,
lang_switch, made_with, loading
```

### 7.4 RTL ↔ LTR

| المان | RTL | LTR |
|-------|-----|-----|
| html dir | `dir="rtl"` | `dir="ltr"` |
| html lang | `lang="fa"` | `lang="en"` |
| فونت | Vazirmatn اولویت | Hanken Grotesk اولویت |
| آیکون‌های جهت‌دار | `rotate-180` روی ArrowRight | بدون rotate |
| FloatingCareBar | `left-4` | `right-4` |
| input نام در استپر | `right-3` + `pr-10 pl-4` | `left-3` + `pl-10 pr-4` |
| شماره تلفن | همیشه `dir="ltr"` | همیشه `dir="ltr"` |

---

## 8. صفحات — جزئیات کامل

### 8.1 Home (/)

#### Hero Section
- `pt-28 sm:pt-32 pb-16 sm:pb-24`
- blob1: `absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-secondary/25 blur-3xl`
- blob2: `absolute top-40 -left-24 w-[24rem] h-[24rem] rounded-full bg-accent/50 blur-3xl`
- grid: `grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **متن:** `lg:col-span-6 order-2 lg:order-1`
  - kicker: `inline-flex gap-2 px-3.5 py-1.5 rounded-full bg-accent/60 text-primary text-xs font-semibold` + dot `w-1.5 h-1.5 rounded-full bg-primary animate-pulse`
  - h1: `mt-5 text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-[1.12]`
  - subtitle: `mt-5 text-muted-foreground text-[17px] sm:text-lg leading-relaxed max-w-xl`
  - CTA1: Button `asChild size="lg" rounded-full btn-soft-glow gap-2` → CalendarHeart + book_now → /panel
  - CTA2: Button `variant="outline" size="lg" rounded-full gap-2 border-primary/25 text-primary` → tel
  - کارت‌های سریع: `glass-card rounded-2xl p-4 flex items-center gap-3.5`
    - حضوری: Link /panel state={{visit_type:'in_person'}} + Building2
    - آنلاین: Link /panel state={{visit_type:'online'}} + Video + breathing-pulse
- **تصویر:** `lg:col-span-6 order-1 lg:order-2`
  - `relative rounded-[2.2rem] overflow-hidden shadow-[0_40px_80px_-30px_rgba(30,107,126,0.5)] aspect-[4/5]`
  - `<img src={HERO_IMG} alt={brand_name} loading="lazy" className="w-full h-full object-cover object-center" />`
  - badge شناور: `absolute bottom-5 ${rtl?'right-5':'left-5'} glass-card rounded-2xl px-4 py-3 animate-float-slow`
    - "Board Certified" + Award icon

#### Trust Section
- `py-14 bg-cream/70 border-y border-border/50`
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- `grid grid-cols-2 lg:grid-cols-4 gap-5`
- ۴ آیتم: BadgeCheck + Clock + Building2 + Video

#### Services Section
- `section-pad`
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- SectionHeading
- `grid sm:grid-cols-2 lg:grid-cols-3 gap-6`
- ۶ ServiceCard با delay={i*70}

#### Philosophy Teaser
- `py-20 bg-cream/60`
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- `grid grid-cols-1 lg:grid-cols-2 gap-10 items-center`
- تصویر: `<Image src={ROOM_IMG} fittingType="fill" className="w-full h-full" />` در `rounded-[2rem] overflow-hidden aspect-[3/2] shadow-xl`
- متن + یادآوری محرمانگی ShieldCheck

#### Visit Types
- `section-pad`
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- `grid md:grid-cols-2 gap-6`
- کارت حضوری + کارت آنلاین (breathing-pulse)

#### Testimonials Preview
- `py-20 bg-cream/60`
- useQuery: `['testimonials-home', lang]` → Testimonial.list('order', 3)
- `grid sm:grid-cols-2 lg:grid-cols-3 gap-6`

#### Blog Preview
- `section-pad` (فقط اگر posts.length > 0)
- useQuery: `['posts-home', lang]` → BlogPost.list('-published_date', 3)
- `grid sm:grid-cols-2 lg:grid-cols-3 gap-6`

#### Final CTA
- `py-20`
- کارت: `relative overflow-hidden rounded-[2.5rem] bg-primary text-primary-foreground px-7 sm:px-14 py-12 sm:py-16 text-center`
- blob‌های secondary و alabaster دکوراتیو

### 8.2 About (/about)

- Hero: `pt-32 pb-16` + blob + grid ۱۲ ستونه
- Philosophy: `py-16 bg-cream/60` + کارت Compass
- Credentials: `section-pad` + grid ۴
- Why this path: `py-16 bg-cream/60` + کارت Heart
- Privacy: `py-14` + ShieldCheck
- CTA: `pb-20`

### 8.3 Services (/services)

- Hero: `pt-32 pb-12`
- Grid: `pb-16` + ۶ ServiceCard
- Privacy strip: `py-14 bg-cream/60`
- CTA: `py-20`

### 8.4 Visits (/visits)

- Hero: `pt-32 pb-12`
- دو کارت: `pb-8` + grid ۲ ستونه
- Map: `section-pad` + iframe OpenStreetMap

### 8.5 Blog (/blog)

- state: `cat = 'all'`
- useQuery: `['posts', lang]` → BlogPost.list('-published_date', 50)
- Hero + فیلتر دسته + Grid

### 8.6 BlogPost (/blog/:id)

- useParams: `{ id }`
- useQuery A: `['post', id, lang]` → BlogPost.get(id)
- useQuery B: `['posts-related', lang]` → BlogPost.list('-published_date', 4)
- Cover + Image + Body + CTA + Related

### 8.7 Testimonials (/testimonials)

- useQuery: `['testimonials', lang]` → Testimonial.list('order', 50)
- Hero + Grid + Privacy note + CTA

### 8.8 Contact (/contact)

- state: `sent = false`, `form = { name: '', phone: '', message: '' }`
- Hero + ۴ کارت + فرم + نقشه + Privacy

---

## 9. پنل بیمار (/panel)

### 9.1 ثابت‌ها

```js
const STORAGE_KEY = 'dr_patient_phone';
const SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

function nextDays(n) {
  const days = [];
  let d = moment().startOf('day');
  while (days.length < n) {
    d.add(1, 'day');
    const wd = d.day();
    if (wd !== 5 && wd !== 6) days.push(d.clone());
  }
  return days;
}
```

### 9.2 state

```js
const [phone, setPhone] = useState(localStorage.getItem(STORAGE_KEY) || '');
const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem(STORAGE_KEY));
const [booking, setBooking] = useState(false);
const [step, setStep] = useState(0);
const [draft, setDraft] = useState({ service: '', visit_type: '', date: '', time_slot: '', patient_name: '' });
```

### 9.3 OTP شبیه‌سازی

```js
const sendOtp = (e) => {
  e.preventDefault();
  if (phone.replace(/\D/g, '').length < 10) return;
  const code = String(Math.floor(1000 + Math.random() * 9000));
  setGenOtp(code);
  setStage('otp');
};

const verify = (e) => {
  e.preventDefault();
  if (otp.trim() === genOtp) onLogin(phone);
  else setErr(t('panel_wrong_code'));
};
```

کد OTP در همان UI نمایش داده می‌شود:
```jsx
<p className="text-2xl font-heading font-bold text-primary tracking-[0.4em] mt-1" dir="ltr">{genOtp}</p>
```

### 9.4 Booking Stepper (۴ مرحله)

**مرحله ۰ — انتخاب خدمت:**
- grid `sm:grid-cols-2 gap-3`
- ۶ دکمه از serviceKeys
- انتخاب → setStep(1)

**مرحله ۱ — نوع ویزیت:**
- grid `sm:grid-cols-2 gap-3`
- ۲ دکمه: حضوری (KeyRound) / آنلاین (Video)
- انتخاب → setStep(2)

**مرحله ۲ — تاریخ و ساعت:**
- ۱۲ روز کاری افقی (shrink-0 w-16)
- اسلات‌ها: `grid-cols-3 sm:grid-cols-4 gap-2`
- SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

**مرحله ۳ — تأیید:**
- خلاصه نوبت (Row components)
- input نام بیمار
- Button confirm

### 9.5 داشبورد

- welcome + phone (dir ltr)
- ۲ دکمه: "نوبت جدید" + "خروج"
- لیست نوبت‌های پیش‌رو (با دکمه لغو)
- لیست تاریخچه (readonly)

### 9.6 لغو نوبت

```js
await base44.entities.Appointment.update(a.id, { status: 'cancelled' });
qc.invalidateQueries({ queryKey: ['my-appts', phone] });
```

---

## 10. انیمیشن‌ها و افکت‌ها

### 10.1 CSS Keyframes

```css
.breathing-pulse { animation: breathe 6s ease-in-out infinite; }
@keyframes breathe {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 hsl(var(--secondary) / 0.35); }
  50%      { transform: scale(1.012); box-shadow: 0 0 0 12px hsl(var(--secondary) / 0); }
}

.lang-fade { transition: opacity .32s ease, transform .32s ease; }
.lang-fade.swapping { opacity: 0; transform: scale(0.985); }

.fade-up { opacity: 0; transform: translateY(22px); transition: opacity .7s ease, transform .7s ease; }
.fade-up.in { opacity: 1; transform: none; }
```

### 10.2 Tailwind Keyframes

```js
'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
'float-slow':     { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
'pulse-ring':     { '0%': { boxShadow: '0 0 0 0 hsl(var(--primary) / 0.4)' },
                    '70%': { boxShadow: '0 0 0 14px hsl(var(--primary) / 0)' },
                    '100%': { boxShadow: '0 0 0 0 hsl(var(--primary) / 0)' } }
```

### 10.3 جدول انیمیشن‌ها

| انیمیشن | duration | easing | المان |
|---------|----------|--------|-------|
| `breathe` | ۶s | ease-in-out infinite | کارت Online در Hero + Visits |
| `fade-up` | 0.7s | ease | همه عناصر داخل `<Reveal>` |
| `accordion-down` | 0.2s | ease-out | drawer موبایل |
| `float-slow` | ۷s | ease-in-out infinite | badge "Board Certified" |
| `pulse-ring` | ۲.۶s | ease-out infinite | دکمه تلفن FloatingCareBar |
| `animate-pulse` | — | — | نقطه kicker Hero |

### 10.4 افکت‌های بدون keyframe

| کلاس | تعریف |
|------|-------|
| `.glass` | `backdrop-filter: blur(18px) saturate(140%)` |
| `.glass-card` | `backdrop-filter: blur(14px) saturate(135%); border: 1px solid hsl(var(--border)/0.7)` |
| `.section-pad` | `padding: clamp(4.5rem, 9vw, 9rem) 0` |
| `.btn-soft-glow` | `box-shadow: 0 8px 30px -8px hsl(var(--primary)/0.45)` |

---

## 11. مدیریت داده و State

### 11.1 localStorage

| کلید | محتوا |
|------|-------|
| `dr_lang` | `'fa'` یا `'en'` |
| `dr_patient_phone` | شماره موبایل لاگین‌شده |

### 11.2 Entityها

**Appointment:**
```json
{
  "patient_name": "string (required)",
  "patient_phone": "string (required)",
  "service": "enum ['individual','couple','child','family','general'] (required)",
  "visit_type": "enum ['in_person','online'] (required)",
  "date": "string format=date (required)",
  "time_slot": "string (required)",
  "status": "enum ['upcoming','completed','cancelled'], default 'upcoming'",
  "notes": "string"
}
```

**BlogPost:**
```json
{
  "title_fa": "string (required)", "title_en": "string (required)",
  "excerpt_fa": "string (required)", "excerpt_en": "string (required)",
  "body_fa": "string (required)", "body_en": "string (required)",
  "category": "string",
  "image_url": "string format=uri",
  "read_minutes": "number",
  "published_date": "string format=date"
}
```

**Testimonial:**
```json
{
  "author_initial": "string (required)",
  "author_label_fa": "string (required)", "author_label_en": "string (required)",
  "body_fa": "string (required)", "body_en": "string (required)",
  "rating": "number",
  "service_tag": "string",
  "order": "number, default 0"
}
```

### 11.3 queryKeyها

| کلید | queryFn | صفحه |
|------|---------|------|
| `['testimonials-home', lang]` | Testimonial.list('order', 3) | Home |
| `['posts-home', lang]` | BlogPost.list('-published_date', 3) | Home |
| `['posts', lang]` | BlogPost.list('-published_date', 50) | Blog |
| `['post', id, lang]` | BlogPost.get(id) | BlogPost |
| `['posts-related', lang]` | BlogPost.list('-published_date', 4) | BlogPost |
| `['testimonials', lang]` | Testimonial.list('order', 50) | Testimonials |
| `['my-appts', phone]` | Appointment.filter({patient_phone: phone}, 'date') | PatientPanel |

### 11.4 QueryClient

```js
new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});
```

---

## 12. تصاویر و Assetها

### 12.1 ثابت‌ها

```js
export const PHONE        = "09934420967";
export const PHONE_TEL    = "+989934420967";
export const WHATSAPP_URL = "https://wa.me/989934420967";
export const HOSPITAL_NAME_FA = "بیمارستان نیکان غرب";
export const HOSPITAL_NAME_EN = "Nikan Gharb Hospital";
export const ADDRESS_FA   = "تهران، بیمارستان نیکان غرب";
export const ADDRESS_EN   = "Tehran, Nikan Gharb Hospital";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Nikan+Gharb+Hospital+Tehran";

// پرتره واقعی — فقط با <img> خام
export const HERO_IMG  = "https://media.base44.com/images/public/6a74f2a2d4d291dc08716b22/5d3e24f0f_______________.jpg";
export const ABOUT_IMG = "https://media.base44.com/images/public/6a74f2a2d4d291dc08716b22/5d3e24f0f_______________.jpg";

// تصویر AI-generated — با کامپوننت Image
export const ROOM_IMG  = "https://media.base44.com/images/public/6a74f2a2d4d291dc08716b22/40c678887_generated_f4e17768.png";
```

### 12.2 جدول تصاویر

| تصویر | نوع | aspect | روش لود | مصرف |
|-------|-----|--------|---------|------|
| HERO_IMG | واقعی .jpg | `aspect-[4/5]` | `<img>` خام | Home hero |
| ABOUT_IMG | همان | `aspect-[4/5]` | `<img>` خام | About hero |
| ROOM_IMG | AI .png | `aspect-[3/2]` | `<Image>` | Home philosophy |
| BlogPost.image_url | AI | `aspect-[16/10]` | `<Image>` | Blog |
| favicon | SVG | — | `<link>` | همه صفحات |

### 12.3 هک مهم

**پرتره واقعی با `<img>` خام نه `<Image>`:**
فایل آپلودی کاربر (با underscore در نام) در media.base44.com؛ تست‌شده: `<img>` خام کار می‌کند (naturalWidth=819)؛ اما تمام URLهای تبدیلی `/v1/fill/.../.webp` failure هستند. چون `<Image>` در خطا به FALLBACK سوییچ می‌کند، پرتره‌ها با `<img>` خام جایگزین شدند.

---

## 13. Responsive Design

### 13.1 Breakpoint‌ها

| نام | px |
|-----|-----|
| sm | 640 |
| md | 768 |
| lg | 1024 |
| xl | 1280 |
| 2xl | 1536 |

### 13.2 رفتار المان‌ها

| المان | موبایل | sm | md | lg |
|-------|--------|-----|-----|-----|
| ناوبری Header | drawer | drawer | drawer | nav افقی |
| دکمه تلفن Header | hidden | hidden | hidden md:flex | نمایش |
| دکمه Book Header | hidden | hidden sm:inline-flex | نمایش | نمایش |
| Hero Home | stack | stack | stack | grid ۱۲ |
| Trust grid | ۲ ستون | ۲ | ۲ | ۴ ستون |
| Services grid | ۱ | ۲ | ۲ | ۳ |
| Blog grid | ۱ | ۲ | ۲ | ۳ |
| Footer | ۱ ستون | ۱ | ۳ ستون | ۳ |

### 13.3 max-width containers

| مقدار | rem | مصرف |
|-------|-----|------|
| max-w-7xl | 80 | Home, Blog, Testimonials, Services, Visits, Contact |
| max-w-5xl | 64 | About |
| max-w-4xl | 56 | heroهای ساده، BlogPost |
| max-w-3xl | 48 | CTAها، BlogPost body، پنل |
| max-w-md | 28 | LoginView |

### 13.4 padding افقی

```
px-4 sm:px-6 lg:px-8  ← همه containerها
```

---

## 14. دسترسی‌پذیری

### 14.1 lang/dir
- `html lang` و `dir` از LanguageProvider setAttribute می‌شوند
- هر صفحه `<div dir={dir}>` روی root

### 14.2 ARIA labels

| المان | aria-label |
|-------|-----------|
| دکمه زبان Header | "Switch language" |
| دکمه منو Header | "Menu" |
| دکمه tel FloatingCareBar | `t('call_direct')` |
| دکمه WhatsApp FloatingCareBar | `t('whatsapp')` |
| iframe Visits | "Nikan Gharb Hospital" |
| iframe Contact | "Map" |

### 14.3 Focus styles

```css
* { @apply border-border outline-ring/50; }
input:focus { outline: none; ring: 2px solid hsl(var(--primary) / 0.4); }
button:focus-visible { outline: none; ring: 1px solid hsl(var(--ring)); }
```

### 14.4 کنتراست

| ترکیب | نسبت | وضعیت |
|-------|------|-------|
| foreground روی background | ~۱۲.۸:۱ | AAA |
| muted-foreground روی background | ~۴.۶:۱ | AA |
| primary روی background | ~۵.۳:۱ | AA |

### 14.5 SEO

```html
<title>دکتر فاطمه مومنی | متخصص اعصاب و روان</title>
<meta name="description" content="دکتر فاطمه مومنی، متخصص اعصاب و روان (روان‌پزشک) — دارای بورد تخصصی. ویزیت حضوری در بیمارستان نیکان غرب و ویزیت آنلاین. Dr. Fatemeh Momeni, Board Certified Psychiatrist." />
```

---

## 15. فایل‌های پیکربندی

### 15.1 tailwind.config.js

```js
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        skysoft: 'hsl(var(--soft-sky))',
        alabaster: 'hsl(var(--alabaster))',
        charcoal: 'hsl(var(--charcoal))',
        cream: 'hsl(var(--cream))'
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)']
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'float-slow': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 hsl(var(--primary) / 0.4)' },
          '70%': { boxShadow: '0 0 0 14px hsl(var(--primary) / 0)' },
          '100%': { boxShadow: '0 0 0 0 hsl(var(--primary) / 0)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.6s ease-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
```

### 15.2 vite.config.js

```js
import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    base44({
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react()
  ]
});
```

### 15.3 jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
    "jsx": "react-jsx",
    "module": "esnext",
    "moduleResolution": "bundler",
    "lib": ["esnext", "dom"],
    "target": "esnext",
    "checkJs": true,
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "types": []
  },
  "include": ["src/components/**/*.js", "src/pages/**/*.jsx", "src/Layout.jsx"],
  "exclude": ["node_modules", "dist", "src/vite-plugins", "src/components/ui", "src/api", "src/lib"]
}
```

### 15.4 index.html

```html
<!doctype html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://base44.com/logo_v2.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="دکتر فاطمه مومنی، متخصص اعصاب و روان (روان‌پزشک) — دارای بورد تخصصی. ویزیت حضوری در بیمارستان نیکان غرب و ویزیت آنلاین. Dr. Fatemeh Momeni, Board Certified Psychiatrist." />
    <link rel="manifest" href="/manifest.json" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <title>دکتر فاطمه مومنی | متخصص اعصاب و روان</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 15.5 src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 36 54% 97.5%;
    --foreground: 193 9% 19%;
    --card: 0 0% 100%;
    --card-foreground: 193 9% 19%;
    --popover: 0 0% 100%;
    --popover-foreground: 193 9% 19%;
    --primary: 192 62% 31%;
    --primary-foreground: 36 54% 97.5%;
    --secondary: 188 46% 68%;
    --secondary-foreground: 192 62% 31%;
    --muted: 188 30% 93%;
    --muted-foreground: 192 10% 42%;
    --accent: 188 46% 90%;
    --accent-foreground: 192 62% 25%;
    --destructive: 0 72% 48%;
    --destructive-foreground: 0 0% 98%;
    --border: 188 24% 87%;
    --input: 188 24% 87%;
    --ring: 192 62% 31%;
    --soft-sky: 188 46% 68%;
    --alabaster: 36 54% 97.5%;
    --charcoal: 193 9% 19%;
    --teal-deep: 192 62% 31%;
    --cream: 36 45% 94%;
    --radius: 1.1rem;

    --font-heading: 'Vazirmatn', 'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif;
    --font-body: 'Vazirmatn', 'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif;
    --font-display: 'Vazirmatn', 'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }

  html[lang="en"] {
    --font-heading: 'Hanken Grotesk', 'Vazirmatn', ui-sans-serif, system-ui, sans-serif;
    --font-body: 'Hanken Grotesk', 'Vazirmatn', ui-sans-serif, system-ui, sans-serif;
    --font-display: 'Hanken Grotesk', 'Vazirmatn', ui-sans-serif, system-ui, sans-serif;
  }
}

@layer base {
  * { @apply border-border outline-ring/50; }
  html { scroll-behavior: smooth; }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-body);
    font-size: 17px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.01em;
  }
  ::selection { background: hsl(var(--primary) / 0.18); }
}

@layer components {
  .glass {
    background: hsl(var(--alabaster) / 0.72);
    backdrop-filter: blur(18px) saturate(140%);
  }
  .glass-card {
    background: hsl(var(--card) / 0.7);
    backdrop-filter: blur(14px) saturate(135%);
    border: 1px solid hsl(var(--border) / 0.7);
  }
  .section-pad {
    padding-top: clamp(4.5rem, 9vw, 9rem);
    padding-bottom: clamp(4.5rem, 9vw, 9rem);
  }
  .btn-soft-glow {
    box-shadow: 0 8px 30px -8px hsl(var(--primary) / 0.45);
  }
  .breathing-pulse {
    animation: breathe 6s ease-in-out infinite;
  }
  @keyframes breathe {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 hsl(var(--secondary) / 0.35); }
    50% { transform: scale(1.012); box-shadow: 0 0 0 12px hsl(var(--secondary) / 0); }
  }
  .lang-fade {
    transition: opacity .32s ease, transform .32s ease;
  }
  .lang-fade.swapping {
    opacity: 0;
    transform: scale(0.985);
  }
  .fade-up {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity .7s ease, transform .7s ease;
  }
  .fade-up.in {
    opacity: 1;
    transform: none;
  }
}

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: hsl(var(--muted)); }
::-webkit-scrollbar-thumb { background: hsl(var(--secondary) / 0.6); border-radius: 999px; }
::-webkit-scrollbar-thumb:hover { background: hsl(var(--primary) / 0.6); }
```

---

## 16. چک‌لیست نهایی

- [x] همه ۸ صفحه اصلی ساخته شده
- [x] FA/EN سوییچ بدون رفرش
- [x] RTL/LTR کاملاً درست
- [x] پرتره واقعی با `<img>` خام
- [x] هدر sticky با glass effect بعد از ۲۴px اسکرول
- [x] FloatingCareBar بعد از ۴۸۰px اسکرول
- [x] Reveal animation روی همه بخش‌ها
- [x] breathing-pulse روی کارت آنلاین
- [x] pulse-ring روی دکمه تلفن شناور
- [x] OTP شبیه‌سازی شده
- [x] پنل بیمار با ۴ مرحله رزرو
- [x] پنجشنبه/جمعه از تقویم حذف
- [x] اسلات زمانی: ۰۹:۰۰-۱۱:۰۰، ۱۴:۰۰-۱۷:۰۰
- [x] فرم تماس با toast
- [x] Map در صفحه ویزیت و تماس
- [x] SEO دوزبانه
- [x] فقط Light Mode

---

## خلاصه فنی نهایی

| بعد | مقدار/وضعیت |
|-----|-------------|
| **Framework** | React 18.2 + Vite ESM |
| **Styling** | Tailwind CSS + tokens HSL + shadcn/ui |
| **Routing** | react-router-dom 6.26 |
| **State Server** | Base44 BaaS (Entity CRUD) |
| **State Client** | React Query 5.84 + useState + localStorage (۲ کلید) |
| **i18n** | Context-based + localStorage، کلید مبتنی، ۲ زبان |
| **RTL** | html dir + Tailwind + کلاس‌های منطقی |
| **Icons** | lucide-react 0.475 |
| **Date** | moment 2.30 |
| **Maps** | iframe OpenStreetMap |
| **Animation** | CSS فقط |
| **Auth** | محلی OTP دمو |
| **Security** | بدون RLS |
| **Images** | Wix Media (transform برای AI، خام برای پرتره) |
| **Dark mode** | نه (عمداً) |
| **Mobile** | drawer + responsive grid |

---

*این سند تمام اطلاعات دقیق کد را پوشش می‌دهد تا بتوانید پروژه را در هر پلتفرمی بازتولید کنید.*
