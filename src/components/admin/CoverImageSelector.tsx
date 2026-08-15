import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Check, 
  Trash2, 
  FolderOpen, 
  Link as LinkIcon, 
  Sparkles, 
  Layers, 
  AlertCircle,
  Eye,
  Info,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { 
  CoverImageItem, 
  DEFAULT_PRESET_COVERS, 
  getUploadedCovers, 
  saveUploadedCover, 
  deleteUploadedCover,
  processAndCompressImage 
} from '../../lib/coverImageStore';
import { useLanguage } from '../../i18n/LanguageProvider';

interface CoverImageSelectorProps {
  currentImageUrl: string;
  onSelectCover: (url: string) => void;
  selectedCategory?: string;
}

export const CoverImageSelector: React.FC<CoverImageSelectorProps> = ({
  currentImageUrl,
  onSelectCover,
  selectedCategory
}) => {
  const { lang, isRTL } = useLanguage();
  const isFa = lang === 'fa';

  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'my_uploads' | 'url'>('upload');
  const [uploadedLibrary, setUploadedLibrary] = useState<CoverImageItem[]>(getUploadedCovers());
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // Direct URL state
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');

  // Upload progress / preview state
  const [dragOver, setDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<{
    dataUrl: string;
    fileName: string;
    sizeStr: string;
  } | null>(null);
  const [customLabel, setCustomLabel] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshLibrary = () => {
    setUploadedLibrary(getUploadedCovers());
  };

  useEffect(() => {
    refreshLibrary();
    const handleUpdate = () => refreshLibrary();
    window.addEventListener('cover_library_updated', handleUpdate);
    return () => window.removeEventListener('cover_library_updated', handleUpdate);
  }, []);

  // Handle local image file selection
  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(isFa ? 'لطفاً فقط فایل تصویری (JPG, PNG, WEBP, SVG) انتخاب فرمایید.' : 'Please select an image file.');
      return;
    }

    try {
      setIsProcessing(true);
      const result = await processAndCompressImage(file, 1200, 0.85);
      setUploadedPreview({
        dataUrl: result.dataUrl,
        fileName: file.name,
        sizeStr: result.sizeStr
      });
      setCustomLabel(file.name.replace(/\.[^/.]+$/, ''));
    } catch (e) {
      console.error(e);
      alert(isFa ? 'خطا در پردازش تصویر.' : 'Error processing image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUploaded = () => {
    if (!uploadedPreview) return;

    // Save to permanent local cover library
    const saved = saveUploadedCover({
      url: uploadedPreview.dataUrl,
      fileName: uploadedPreview.fileName,
      label_fa: customLabel || uploadedPreview.fileName,
      label_en: customLabel || uploadedPreview.fileName,
      sizeStr: uploadedPreview.sizeStr,
      category: selectedCategory || 'general'
    });

    onSelectCover(saved.url);
    setUploadedPreview(null);
    setCustomLabel('');
    refreshLibrary();
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    onSelectCover(urlInput.trim());
    setUrlError('');
  };

  const handleDeleteUploadedItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(isFa ? 'آیا این تصویر از کتابخانه حذف شود؟' : 'Delete this cover from library?')) {
      deleteUploadedCover(id);
      refreshLibrary();
    }
  };

  const filteredPresets = filterCategory === 'all' 
    ? DEFAULT_PRESET_COVERS 
    : DEFAULT_PRESET_COVERS.filter(p => p.category === filterCategory);

  return (
    <div className="space-y-4 p-4 rounded-3xl bg-card border border-border/80 shadow-xs text-start">
      
      {/* 1. CURRENT SELECTED COVER PREVIEW */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-2xl bg-muted/30 border border-border/70">
        <div className="relative w-full sm:w-48 aspect-[16/10] rounded-xl overflow-hidden bg-muted border border-border shrink-0 shadow-xs">
          <img
            src={currentImageUrl || '/covers/anxiety-panic.svg'}
            alt="Current Cover"
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback if broken
              (e.currentTarget as HTMLImageElement).src = '/developer.jpg';
            }}
          />
          <span className="absolute bottom-1 right-1 text-[9px] font-bold px-2 py-0.5 rounded-md bg-black/75 text-white backdrop-blur-xs">
            16:9 Cover
          </span>
        </div>

        <div className="flex-1 space-y-1.5 w-full">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground">
              {isFa ? 'تصویر شاخص فعلی کاور' : 'Current Active Cover Image'}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" />
              <span>{isFa ? 'انتخاب شده' : 'Active'}</span>
            </span>
          </div>

          <p className="text-[11px] text-muted-foreground font-mono truncate max-w-md" dir="ltr">
            {currentImageUrl}
          </p>

          <p className="text-[11px] text-muted-foreground">
            {isFa ? 'این تصویر در بالای مقاله، پیش‌نمایش شبکه‌های اجتماعی و کارت‌های وبلاگ نمایش داده می‌شود.' : 'This image will be shown on the blog header and cards.'}
          </p>
        </div>
      </div>

      {/* 2. TAB CONTROLS */}
      <div className="flex items-center gap-1.5 border-b border-border/60 pb-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'upload'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>{isFa ? '۱. آپلود مستقیم از دستگاه' : '1. Upload From Device'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('presets')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'presets'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>{isFa ? '۲. کاورهای رسمی پوشه public/covers' : '2. Public Presets (/covers)'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('my_uploads')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'my_uploads'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isFa ? `۳. کتابخانه تصاویر آپلود شده (${uploadedLibrary.length})` : `3. Uploaded Library (${uploadedLibrary.length})`}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'url'
              ? 'bg-primary text-primary-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>{isFa ? '۴. لینک مستقیم اینترنتی / مسیر' : '4. Custom URL'}</span>
        </button>
      </div>

      {/* TAB CONTENT 1: DIRECT FILE UPLOAD */}
      {activeTab === 'upload' && (
        <div className="space-y-4 pt-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            accept="image/png, image/jpeg, image/webp, image/svg+xml"
            className="hidden"
          />

          {!uploadedPreview ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer space-y-3 ${
                dragOver
                  ? 'border-primary bg-primary/10 scale-[1.01]'
                  : 'border-border/80 hover:border-primary/60 bg-muted/20 hover:bg-muted/30'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>

              <div>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {isFa ? 'برای آپلود تصویر کاور، اینجا کلیک کنید یا فایل را بکشید و رها کنید' : 'Click to upload cover image or drag & drop'}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {isFa ? 'پشتیبانی از فرمت‌های JPG, PNG, WEBP, SVG با ابعاد استاندارد ۱۶:۹ و فشرده‌سازی هوشمند خودکار' : 'Supports JPG, PNG, WEBP, SVG (Auto-compressed)'}
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
              >
                <FolderOpen className="w-4 h-4" />
                <span>{isFa ? 'انتخاب فایل از کامپیوتر یا گوشی' : 'Browse Local Image'}</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:w-48 aspect-[16/10] rounded-xl overflow-hidden bg-black/20 border border-primary/40 shrink-0">
                  <img
                    src={uploadedPreview.dataUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 flex-1 w-full">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase">آماده اعمال به عنوان کاور</span>
                    <h4 className="font-bold text-xs text-foreground truncate">{uploadedPreview.fileName}</h4>
                    <p className="text-[11px] text-muted-foreground">حجم پردازش شده: {uploadedPreview.sizeStr}</p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                      {isFa ? 'عنوان / برچسب تصویر (اختیاری):' : 'Image Label:'}
                    </label>
                    <input
                      type="text"
                      value={customLabel}
                      onChange={(e) => setCustomLabel(e.target.value)}
                      placeholder="مثال: کاور اختصاصی بررسی داروی سرترالین..."
                      className="w-full px-3 py-1.5 rounded-xl border border-border bg-background text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => setUploadedPreview(null)}
                  className="px-3 py-1.5 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                >
                  {isFa ? 'انصراف و انتخاب عکس دیگر' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={handleApplyUploaded}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>{isFa ? 'تایید و ذخیره در کاور مقاله' : 'Apply as Cover'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: CLINIC PRESETS (PUBLIC DIRECTORY ASSETS) */}
      {activeTab === 'presets' && (
        <div className="space-y-3 pt-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <HardDrive className="w-3.5 h-3.5 text-primary" />
              <span>{isFa ? 'کاورهای وکتور و استاندارد ذخیره شده در /public/covers/:' : 'Public assets in /public/covers/: '}</span>
            </div>

            {/* Category Filter for Presets */}
            <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
              {['all', 'anxiety', 'depression', 'adhd', 'sleep', 'general'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-primary text-primary-foreground font-bold'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat === 'all' ? (isFa ? 'همه' : 'All') : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto custom-scrollbar-dense p-1">
            {filteredPresets.map((preset) => {
              const isSelected = currentImageUrl === preset.url;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectCover(preset.url)}
                  className={`group relative rounded-2xl overflow-hidden border-2 text-start transition-all cursor-pointer aspect-[16/10] flex flex-col justify-end bg-card ${
                    isSelected 
                      ? 'border-primary ring-2 ring-primary/40 shadow-md' 
                      : 'border-border/80 hover:border-primary/50 opacity-90 hover:opacity-100'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.label_fa}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/developer.jpg';
                    }}
                  />
                  
                  {isSelected && (
                    <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className="relative z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 pt-6 w-full">
                    <p className="text-[10px] font-bold text-white leading-tight truncate">
                      {isFa ? preset.label_fa : preset.label_en}
                    </p>
                    <p className="text-[8px] text-slate-300 font-mono truncate mt-0.5" dir="ltr">
                      {preset.url}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: UPLOADED LIBRARY */}
      {activeTab === 'my_uploads' && (
        <div className="space-y-3 pt-1">
          {uploadedLibrary.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed border-border rounded-2xl space-y-2">
              <Layers className="w-8 h-8 text-muted-foreground mx-auto opacity-50" />
              <p className="text-xs font-semibold text-foreground">
                {isFa ? 'هنوز تصویری آپلود نشده است.' : 'No custom covers uploaded yet.'}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {isFa ? 'با استفاده از تب «آپلود مستقیم» می‌توانید تصاویر دلخواه خود را آپلود و در این کتابخانه ذخیره کنید.' : 'Upload images in Tab 1 to build your library.'}
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isFa ? 'رفتن به بخش آپلود' : 'Go to Upload'}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto custom-scrollbar-dense p-1">
              {uploadedLibrary.map((item) => {
                const isSelected = currentImageUrl === item.url;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectCover(item.url)}
                    className={`group relative rounded-2xl overflow-hidden border-2 text-start transition-all cursor-pointer aspect-[16/10] flex flex-col justify-end bg-card ${
                      isSelected 
                        ? 'border-primary ring-2 ring-primary/40 shadow-md' 
                        : 'border-border/80 hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.label_fa}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={(e) => handleDeleteUploadedItem(item.id, e)}
                      title={isFa ? 'حذف از کتابخانه' : 'Delete'}
                      className="absolute top-1.5 right-1.5 z-20 p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    {isSelected && (
                      <div className="absolute top-1.5 left-1.5 z-20 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div className="relative z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 pt-6 w-full">
                      <p className="text-[10px] font-bold text-white leading-tight truncate">
                        {item.label_fa}
                      </p>
                      <div className="flex items-center justify-between text-[8px] text-slate-300 mt-0.5">
                        <span>{item.sizeStr || 'Image'}</span>
                        <span>{item.uploadedAt}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 4: DIRECT URL / PUBLIC PATH */}
      {activeTab === 'url' && (
        <div className="space-y-3 pt-1">
          <div>
            <label className="block text-xs font-bold text-foreground mb-1">
              {isFa ? 'آدرس اینترنتی یا مسیر فایل در پوشه public' : 'Direct Image URL or Public Path'}
            </label>
            <p className="text-[11px] text-muted-foreground mb-2">
              {isFa ? 'می‌توانید مسیر فایل‌های استاندارد مثل /images/doctor/portrait-main.svg یا /images/covers/anxiety-panic.svg را وارد نمایید.' : 'Enter path like /images/doctor/portrait-main.svg or /images/covers/anxiety-panic.svg'}
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="/images/covers/anxiety-panic.svg"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                dir="ltr"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shrink-0 cursor-pointer"
              >
                {isFa ? 'اعمال آدرس' : 'Apply'}
              </button>
            </div>
          </div>

          {/* Quick shortcuts for public folder assets */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-muted-foreground block mb-1.5">
              {isFa ? 'میانبرهای سریع فایل‌های تصاویر استاندارد:' : 'Standard Asset Shortcuts:'}
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => { setUrlInput('/images/doctor/portrait-main.svg'); onSelectCover('/images/doctor/portrait-main.svg'); }}
                className="px-2.5 py-1 rounded-lg bg-muted text-muted-foreground hover:text-foreground font-mono text-[11px] cursor-pointer"
              >
                /images/doctor/portrait-main.svg
              </button>
              <button
                type="button"
                onClick={() => { setUrlInput('/images/covers/anxiety-panic.svg'); onSelectCover('/images/covers/anxiety-panic.svg'); }}
                className="px-2.5 py-1 rounded-lg bg-muted text-muted-foreground hover:text-foreground font-mono text-[11px] cursor-pointer"
              >
                /images/covers/anxiety-panic.svg
              </button>
              <button
                type="button"
                onClick={() => { setUrlInput('/images/covers/depression-mood.svg'); onSelectCover('/images/covers/depression-mood.svg'); }}
                className="px-2.5 py-1 rounded-lg bg-muted text-muted-foreground hover:text-foreground font-mono text-[11px] cursor-pointer"
              >
                /images/covers/depression-mood.svg
              </button>
              <button
                type="button"
                onClick={() => { setUrlInput('/images/philosophy/treatment-philosophy.svg'); onSelectCover('/images/philosophy/treatment-philosophy.svg'); }}
                className="px-2.5 py-1 rounded-lg bg-muted text-muted-foreground hover:text-foreground font-mono text-[11px] cursor-pointer"
              >
                /images/philosophy/treatment-philosophy.svg
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
