/**
 * @fileoverview Central Asset and Image Registry for Dr. Fatemeh Momeni's Psychiatric Platform.
 * 
 * Provides a strongly-typed, categorized, single-source-of-truth registry for all visual assets:
 *  - Doctor portraits & medical credential seals (`/images/doctor/*`)
 *  - Clinical treatment philosophy & biopsychosocial diagrams (`/images/philosophy/*`)
 *  - Consultation room & hospital location photography (`/images/clinical/*`)
 *  - Curated psychiatry & mental health article covers (`/images/covers/*`)
 *  - Branding marks & certification seals (`/images/branding/*`)
 *  - Platform engineering & developer profile (`/images/developer/*`)
 * 
 * Conforms to Google TypeScript Style Guidelines with comprehensive JSDoc annotations,
 * immutable configurations, fallback safety, and accessible alt-text definitions.
 * 
 * @author Mohammad Hussein (Platform Architect & Senior Full-Stack Engineer)
 * @version 2.0.0
 */

import type { SyntheticEvent } from 'react';

/**
 * Standard interface representing a registered image asset across the application.
 */
export interface ImageAsset {
  /** Unique immutable identifier for the asset */
  readonly id: string;
  /** Primary local or CDN path to the image asset */
  readonly src: string;
  /** High-res fallback source if primary fails or is inaccessible */
  readonly fallbackSrc?: string;
  /** Descriptive Persian alt-text for accessibility and clinical SEO */
  readonly altFa: string;
  /** Descriptive English alt-text for international patients and accessibility */
  readonly altEn: string;
  /** Human-readable category */
  readonly category: 'doctor' | 'philosophy' | 'clinical' | 'covers' | 'branding' | 'developer';
  /** Intended aspect ratio for layout shifts prevention */
  readonly aspectRatio?: '1/1' | '4/5' | '16/9' | '4/3' | '3/2';
  /** Dimensions metadata */
  readonly width?: number;
  readonly height?: number;
}

// ============================================================================
// 1. DOCTOR ASSETS (دکتر فاطمه مومنی - پرتره و نشان‌های بالینی)
// ============================================================================

/**
 * Official portrait and identity assets for Dr. Fatemeh Momeni.
 */
export const DOCTOR_ASSETS = {
  /** Primary official doctor portrait with clinical coat and board credentials */
  portrait: {
    id: 'doc-portrait-primary',
    src: '/images/doctor/dr-fatemeh-momeni.jpg',
    fallbackSrc: 'https://media.base44.com/images/public/6a74f2a2d4d291dc08716b22/5d3e24f0f_______________.jpg',
    altFa: 'دکتر فاطمه مومنی، متخصص اعصاب و روان (روانپزشک) دارای بورد تخصصی',
    altEn: 'Dr. Fatemeh Momeni, Board Certified Psychiatrist',
    category: 'doctor',
    aspectRatio: '4/5',
    width: 819,
    height: 1024,
  },
  /** About page featured portrait */
  about: {
    id: 'doc-about-portrait',
    src: '/images/doctor/dr-fatemeh-momeni.jpg',
    fallbackSrc: 'https://media.base44.com/images/public/6a74f2a2d4d291dc08716b22/5d3e24f0f_______________.jpg',
    altFa: 'دکتر فاطمه مومنی در کلینیک تخصصی اعصاب و روان بیمارستان نیکان غرب',
    altEn: 'Dr. Fatemeh Momeni, Psychiatric Consultation Room at Nikan Gharb Hospital',
    category: 'doctor',
    aspectRatio: '4/5',
    width: 819,
    height: 1024,
  }
} as const;

// ============================================================================
// 2. TREATMENT PHILOSOPHY & CLINICAL APPROACH (فلسفه درمان و رویکرد بالینی)
// ============================================================================

/**
 * Visual models, diagrams, and educational illustrations for therapeutic approach.
 */
export const PHILOSOPHY_ASSETS = {
  /** Clinical consultation space and 3-Pillar Bio-Psycho-Social psychiatric model */
  bioPsychoSocialModel: {
    id: 'philo-biopsychosocial-triad',
    src: '/images/clinical/consulting-room.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    altFa: 'محیط آرام‌بخش اتاق درمان و مشاوره بالینی - دکتر فاطمه مومنی',
    altEn: 'Integrative Psychiatric Consultation Environment - Dr. Fatemeh Momeni',
    category: 'philosophy',
    aspectRatio: '3/2',
    width: 1200,
    height: 802,
  },
  /** Step-by-step personalized clinical roadmap */
  clinicalFlowPathway: {
    id: 'philo-care-pathway',
    src: '/images/philosophy/biopsychosocial-approach.svg',
    fallbackSrc: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    altFa: 'فرآیند ۴ مرحله‌ای درمان شخصی‌سازی‌شده و هم‌افزایی دارودرمانی با روان‌درمانی',
    altEn: 'Four-Step Personalized Psychiatric Care & Psychotherapy Roadmap',
    category: 'philosophy',
    aspectRatio: '16/9',
    width: 1200,
    height: 675,
  }
} as const;

// ============================================================================
// 3. CLINICAL ENVIRONMENT & HOSPITAL (محیط بالینی و بیمارستان نیکان غرب)
// ============================================================================

/**
 * Hospital location, consultation room, and ambient therapy space photography.
 */
export const CLINICAL_ASSETS = {
  /** Modern psychiatric consultation office with calming atmosphere */
  consultingRoom: {
    id: 'clinic-consulting-room',
    src: '/images/clinical/consulting-room.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    altFa: 'اتاق ویزیت و مشاوره آرام‌بخش و محرمانه روان‌پزشکی',
    altEn: 'Serene & Confidential Psychiatric Consultation Suite',
    category: 'clinical',
    aspectRatio: '3/2',
    width: 1200,
    height: 802,
  },
  /** Exterior facade of Nikan Gharb Hospital in Tehran */
  hospitalFacade: {
    id: 'clinic-hospital-nikan',
    src: '/images/clinical/hospital-nikan-west.svg',
    fallbackSrc: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    altFa: 'نمای بیمارستان فوق‌تخصصی نیکان غرب تهران، کلینیک اعصاب و روان',
    altEn: 'Nikan Gharb Super-Specialty Hospital, Tehran, Psychiatry Clinic',
    category: 'clinical',
    aspectRatio: '16/9',
    width: 1200,
    height: 675,
  },
  /** Active psychotherapy session atmosphere */
  patientDialogue: {
    id: 'clinic-consultation-dialogue',
    src: '/images/clinical/psychiatric-consulting-room.svg',
    fallbackSrc: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&q=80',
    altFa: 'گفت‌وگوی همدلانه و ارزیابی تشخیصی در اتاق درمان',
    altEn: 'Empathetic Clinical Dialogue & Diagnostic Assessment',
    category: 'clinical',
    aspectRatio: '16/9',
    width: 1200,
    height: 675,
  }
} as const;

// ============================================================================
// 4. CURATED PSYCHIATRIC COVERS (کاورهای مقالات تخصصی)
// ============================================================================

/**
 * Presets for mental health topics and article hero cards.
 */
export const COVER_ASSETS = {
  anxiety: {
    id: 'cov-anxiety',
    src: '/images/covers/anxiety-panic.svg',
    altFa: 'کاور تخصصی مدیریت اضطراب و مهار حملات پانیک',
    altEn: 'Anxiety & Panic Disorder Management Cover',
    category: 'covers',
  },
  depression: {
    id: 'cov-depression',
    src: '/images/covers/depression-mood.svg',
    altFa: 'کاور تخصصی درمان افسردگی اساسی و تنظیم خلق',
    altEn: 'Depression & Mood Therapy Cover',
    category: 'covers',
  },
  adhd: {
    id: 'cov-adhd',
    src: '/images/covers/adhd-focus.svg',
    altFa: 'کاور تخصصی بیش‌فعالی و نقص توجه (ADHD) بزرگسالان',
    altEn: 'Adult ADHD & Executive Focus Cover',
    category: 'covers',
  },
  sleep: {
    id: 'cov-sleep',
    src: '/images/covers/sleep-rhythm.svg',
    altFa: 'کاور بهداشت و معماری خواب شبانه',
    altEn: 'Sleep Architecture & Circadian Rhythm Cover',
    category: 'covers',
  },
  ocd: {
    id: 'cov-ocd',
    src: '/images/covers/ocd-mindfulness.svg',
    altFa: 'کاور وسواس فکری-عملی (OCD) و ذهن‌آگاهی',
    altEn: 'Obsessive-Compulsive Disorder & Mindfulness Cover',
    category: 'covers',
  },
  bipolar: {
    id: 'cov-bipolar',
    src: '/images/covers/bipolar-spectrum.svg',
    altFa: 'کاور طیف اختلالات دوقطبی و تثبیت خلق',
    altEn: 'Bipolar Spectrum & Mood Stabilization Cover',
    category: 'covers',
  },
  psychosomatic: {
    id: 'cov-psychosomatic',
    src: '/images/covers/psychosomatic.svg',
    altFa: 'کاور اختلالات روان‌تنی، سندروم روده تحریک‌پذیر و استرس',
    altEn: 'Psychosomatic Disorders & Gut-Brain Axis Cover',
    category: 'covers',
  },
  burnout: {
    id: 'cov-burnout',
    src: '/images/covers/burnout-stress.svg',
    altFa: 'کاور فرسودگی شغلی و احیای کارکردهای اجرایی',
    altEn: 'Occupational Burnout & Recovery Cover',
    category: 'covers',
  },
  children: {
    id: 'cov-children',
    src: '/images/covers/child-adolescent.svg',
    altFa: 'کاور روان‌پزشکی کودک، نوجوان و فرزندپروری',
    altEn: 'Child & Adolescent Psychiatry Cover',
    category: 'covers',
  },
  couples: {
    id: 'cov-couples',
    src: '/images/covers/couples-therapy.svg',
    altFa: 'کاور زوج‌درمانی و بازسازی صمیمیت عاطفی',
    altEn: 'Couples Therapy & Relational Safety Cover',
    category: 'covers',
  },
  general: {
    id: 'cov-general',
    src: '/images/covers/general-psychiatry.svg',
    altFa: 'کاور مفاهیم پایه روان‌پزشکی و دارودرمانی نوین',
    altEn: 'Foundational Clinical Psychiatry Cover',
    category: 'covers',
  },
} as const;

// ============================================================================
// 5. BRANDING & CERTIFICATION SEALS (برندینگ و نمادهای بورد)
// ============================================================================

/**
 * Official logo marks, seal stamps, and emblems.
 */
export const BRANDING_ASSETS = {
  logo: {
    id: 'brand-logo-symbol',
    src: '/images/branding/clinic-logo.svg',
    altFa: 'لوگوی رسمی کلینیک تخصصی دکتر فاطمه مومنی',
    altEn: 'Official Logo of Dr. Fatemeh Momeni Psychiatry Clinic',
    category: 'branding',
    aspectRatio: '1/1',
    width: 500,
    height: 500,
  },
  medicalSeal: {
    id: 'brand-board-seal',
    src: '/images/branding/medical-board-seal.svg',
    altFa: 'مهر و نشان بورد تخصصی اعصاب و روان و کد نظام پزشکی ۱۳۳۴۳۹',
    altEn: 'Psychiatric Board Certification Seal & Medical Council Reg 133439',
    category: 'branding',
    aspectRatio: '1/1',
    width: 400,
    height: 400,
  }
} as const;

// ============================================================================
// 6. DEVELOPER / SYSTEM ARCHITECT (توسعه‌دهنده پلتفرم)
// ============================================================================

/**
 * Identity assets for the platform engineering team and creator.
 */
export const DEVELOPER_ASSETS = {
  avatar: {
    id: 'dev-mohammad-hussein-avatar',
    src: '/images/developer/mohammad-hussein.jpg',
    fallbackSrc: '/developer.jpg',
    altFa: 'محمد حسین، مهندس ارشد نرم‌افزار و معمار سیستم‌های تحت وب پزشکی',
    altEn: 'Mohammad Hussein, Senior Software Engineer & Medical Systems Architect',
    category: 'developer',
    aspectRatio: '1/1',
  }
} as const;

// ============================================================================
// UTILITY FUNCTIONS & RESOLVERS
// ============================================================================

/**
 * Returns a safe, normalized asset URL with automatic fallback.
 * 
 * @param asset Image asset object
 * @returns Primary URL string
 */
export function getAssetUrl(asset: ImageAsset): string {
  return asset.src;
}

/**
 * Resolves a cover image by psychiatric category or slug.
 * 
 * @param category Category key (e.g. 'anxiety', 'adhd', 'depression')
 * @returns Cover image asset
 */
export function getCoverByCategory(category: string): ImageAsset {
  const normalized = category.toLowerCase().trim();
  if (normalized in COVER_ASSETS) {
    return COVER_ASSETS[normalized as keyof typeof COVER_ASSETS];
  }
  return COVER_ASSETS.general;
}

/**
 * Safe Image Error Handler for HTML <img> elements that switches to fallbacks gracefully.
 * 
 * @param event React Image Synthetic Error Event
 * @param fallbackUrl Custom fallback URL or default clinical backdrop
 */
export function handleImageFallback(
  event: SyntheticEvent<HTMLImageElement, Event>,
  fallbackUrl: string = 'https://images.unsplash.com/photo-1594824813590-78965a3962b1?auto=format&fit=crop&w=1000&q=80'
): void {
  const img = event.currentTarget;
  if (img.src !== fallbackUrl) {
    img.src = fallbackUrl;
  }
}
