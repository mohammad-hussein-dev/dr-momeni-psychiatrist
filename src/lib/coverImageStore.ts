// Store and manager for Blog Article Cover Images (Presets & Uploads)

export interface CoverImageItem {
  id: string;
  url: string;
  label_fa: string;
  label_en: string;
  category?: string;
  source: 'preset' | 'uploaded' | 'custom_url';
  fileName?: string;
  sizeStr?: string;
  uploadedAt?: string;
}

export const UPLOADED_COVERS_STORAGE_KEY = 'dr_uploaded_cover_images_v1';

// Standard clinic curated presets with accessible public paths and high-res fallbacks
export const DEFAULT_PRESET_COVERS: CoverImageItem[] = [
  {
    id: 'cov-preset-1',
    url: '/images/covers/anxiety-panic.svg',
    label_fa: 'اضطراب و مهار پانیک',
    label_en: 'Anxiety & Panic Management',
    category: 'anxiety',
    source: 'preset'
  },
  {
    id: 'cov-preset-2',
    url: '/images/covers/depression-mood.svg',
    label_fa: 'افسردگی و تنظیم خلق',
    label_en: 'Depression & Mood Therapy',
    category: 'depression',
    source: 'preset'
  },
  {
    id: 'cov-preset-3',
    url: '/images/covers/adhd-focus.svg',
    label_fa: 'بیش‌فعالی (ADHD) و تمرکز',
    label_en: 'Adult ADHD & Focus',
    category: 'adhd',
    source: 'preset'
  },
  {
    id: 'cov-preset-4',
    url: '/images/covers/sleep-rhythm.svg',
    label_fa: 'بهداشت و معماری خواب',
    label_en: 'Sleep Hygiene & Rhythm',
    category: 'sleep',
    source: 'preset'
  },
  {
    id: 'cov-preset-5',
    url: '/images/covers/ocd-mindfulness.svg',
    label_fa: 'وسواس (OCD) و ذهن‌آگاهی',
    label_en: 'OCD & Mindfulness',
    category: 'ocd',
    source: 'preset'
  },
  {
    id: 'cov-preset-6',
    url: '/images/covers/bipolar-spectrum.svg',
    label_fa: 'طیف اختلالات دوقطبی',
    label_en: 'Bipolar Spectrum',
    category: 'bipolar',
    source: 'preset'
  },
  {
    id: 'cov-preset-7',
    url: '/images/covers/psychosomatic.svg',
    label_fa: 'روان‌تنی و استرس گوارشی (IBS)',
    label_en: 'Psychosomatic Medicine',
    category: 'psychosomatic',
    source: 'preset'
  },
  {
    id: 'cov-preset-8',
    url: '/images/covers/burnout-stress.svg',
    label_fa: 'فرسودگی شغلی و استرس',
    label_en: 'Occupational Burnout',
    category: 'burnout',
    source: 'preset'
  },
  {
    id: 'cov-preset-9',
    url: '/images/covers/child-adolescent.svg',
    label_fa: 'روان‌پزشکی کودک و نوجوان',
    label_en: 'Child & Adolescent Psychiatry',
    category: 'children',
    source: 'preset'
  },
  {
    id: 'cov-preset-10',
    url: '/images/covers/couples-therapy.svg',
    label_fa: 'روان‌درمانی و زوج‌درمانی',
    label_en: 'Couples & Psychotherapy',
    category: 'couples',
    source: 'preset'
  },
  {
    id: 'cov-preset-11',
    url: '/images/covers/general-psychiatry.svg',
    label_fa: 'مفاهیم پایه و دارودرمانی',
    label_en: 'General Psychiatry & Medications',
    category: 'general',
    source: 'preset'
  },
  {
    id: 'cov-preset-12',
    url: '/images/doctor/dr-fatemeh-momeni-portrait.svg',
    label_fa: 'پرتره رسمی دکتر فاطمه مومنی',
    label_en: 'Dr. Fatemeh Momeni Official Portrait',
    category: 'doctor',
    source: 'preset'
  },
  {
    id: 'cov-preset-13',
    url: '/images/philosophy/clinical-philosophy.svg',
    label_fa: 'مدل جامع فلسفه درمان (زیستی-روانی-اجتماعی)',
    label_en: 'Bio-Psycho-Social Treatment Model',
    category: 'philosophy',
    source: 'preset'
  },
  {
    id: 'cov-preset-14',
    url: '/images/philosophy/biopsychosocial-approach.svg',
    label_fa: 'مسیر و رویکرد ۴ مرحله‌ای درمان بالینی',
    label_en: '4-Step Clinical Care Roadmap',
    category: 'philosophy',
    source: 'preset'
  },
  {
    id: 'cov-preset-15',
    url: '/images/clinical/psychiatric-consulting-room.svg',
    label_fa: 'اتاق ویزیت و فضای درمانی بیمارستان',
    label_en: 'Consulting Suite & Therapeutic Space',
    category: 'clinical',
    source: 'preset'
  },
  {
    id: 'cov-preset-16',
    url: '/images/clinical/hospital-nikan-west.svg',
    label_fa: 'بیمارستان فوق‌تخصصی نیکان غرب تهران',
    label_en: 'Nikan Gharb Hospital Center',
    category: 'clinical',
    source: 'preset'
  },
  // Standardized clinical and therapeutic presets
  {
    id: 'cov-photo-1',
    url: '/images/clinical/consulting-room.svg',
    label_fa: 'مطب بالینی و فضای درمانی',
    label_en: 'Clinical Consultation',
    category: 'general',
    source: 'preset'
  },
  {
    id: 'cov-photo-2',
    url: '/images/covers/anxiety-panic.svg',
    label_fa: 'آرامش، مدیتیشن و تنفس',
    label_en: 'Serenity & Breathing',
    category: 'anxiety',
    source: 'preset'
  },
  {
    id: 'cov-photo-3',
    url: '/images/covers/depression-mood.svg',
    label_fa: 'دارودرمانی و علوم اعصاب',
    label_en: 'Neuroscience & Medication',
    category: 'general',
    source: 'preset'
  },
  {
    id: 'cov-photo-4',
    url: '/images/covers/sleep-rhythm.svg',
    label_fa: 'خواب و آرامش شبانه',
    label_en: 'Restorative Sleep',
    category: 'sleep',
    source: 'preset'
  }
];

export function getUploadedCovers(): CoverImageItem[] {
  try {
    const raw = localStorage.getItem(UPLOADED_COVERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error reading uploaded covers:', e);
    return [];
  }
}

export function saveUploadedCover(item: {
  url: string;
  label_fa?: string;
  label_en?: string;
  category?: string;
  fileName?: string;
  sizeStr?: string;
}): CoverImageItem {
  const current = getUploadedCovers();
  const newItem: CoverImageItem = {
    id: `upload-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    url: item.url,
    label_fa: item.label_fa || item.fileName || 'کاور آپلود شده',
    label_en: item.label_en || item.fileName || 'Uploaded Cover',
    category: item.category || 'general',
    source: 'uploaded',
    fileName: item.fileName,
    sizeStr: item.sizeStr,
    uploadedAt: new Date().toLocaleDateString('fa-IR')
  };

  const updated = [newItem, ...current];
  localStorage.setItem(UPLOADED_COVERS_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('cover_library_updated'));
  return newItem;
}

export function deleteUploadedCover(id: string): boolean {
  const current = getUploadedCovers();
  const filtered = current.filter(c => c.id !== id);
  if (filtered.length !== current.length) {
    localStorage.setItem(UPLOADED_COVERS_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('cover_library_updated'));
    return true;
  }
  return false;
}

export function getAllCoverImages(): CoverImageItem[] {
  const uploaded = getUploadedCovers();
  return [...uploaded, ...DEFAULT_PRESET_COVERS];
}

/**
 * Compresses an image client-side to ensure fast loading and responsive caching
 */
export async function processAndCompressImage(file: File, maxDim = 1200, quality = 0.85): Promise<{ dataUrl: string; sizeStr: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({
            dataUrl: event.target?.result as string,
            sizeStr: `${Math.round(file.size / 1024)} KB`
          });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const approxBytes = Math.round((dataUrl.length * 3) / 4);
        const sizeStr = approxBytes > 1024 * 1024 
          ? `${(approxBytes / (1024 * 1024)).toFixed(1)} MB` 
          : `${Math.round(approxBytes / 1024)} KB`;

        resolve({ dataUrl, sizeStr });
      };
      img.onerror = () => reject(new Error('Failed to load image for processing'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
