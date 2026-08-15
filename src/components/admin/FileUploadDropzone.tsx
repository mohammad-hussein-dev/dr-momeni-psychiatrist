import React, { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  FileText, 
  Headphones, 
  Image as ImageIcon, 
  File, 
  Plus, 
  Check, 
  AlertCircle, 
  Sparkles,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { BlogAttachment, BlogAttachmentType } from '../../types';
import { useLanguage } from '../../i18n/LanguageProvider';

interface FileUploadDropzoneProps {
  attachments: BlogAttachment[];
  onChange: (attachments: BlogAttachment[]) => void;
  onSetCoverImage?: (imageUrl: string) => void;
  onInsertInlineMarkdown?: (markdownText: string) => void;
}

export const FileUploadDropzone: React.FC<FileUploadDropzoneProps> = ({
  attachments,
  onChange,
  onSetCoverImage,
  onInsertInlineMarkdown
}) => {
  const { lang, isRTL } = useLanguage();
  const isFa = lang === 'fa';

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const detectType = (file: File): BlogAttachmentType => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.includes('pdf')) return 'pdf';
    if (file.type.startsWith('audio/')) return 'audio';
    if (file.name.endsWith('.pdf')) return 'pdf';
    if (file.name.endsWith('.mp3') || file.name.endsWith('.wav') || file.name.endsWith('.m4a') || file.name.endsWith('.aac')) return 'audio';
    if (file.name.endsWith('.docx') || file.name.endsWith('.doc') || file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) return 'document';
    return 'document';
  };

  const processFiles = (files: FileList | File[]) => {
    setUploadError('');
    setUploadSuccess('');

    const newAttachments: BlogAttachment[] = [];

    Array.from(files).forEach((file) => {
      // 25MB max size per attachment
      if (file.size > 25 * 1024 * 1024) {
        setUploadError(isFa ? `حجم فایل ${file.name} بیشتر از حد مجاز (۲۵ مگابایت) است.` : `File ${file.name} exceeds 25MB limit.`);
        return;
      }

      const fileType = detectType(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const resultUrl = e.target?.result as string;
        if (!resultUrl) return;

        const newAtt: BlogAttachment = {
          id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name.replace(/\.[^/.]+$/, ""),
          type: fileType,
          url: resultUrl,
          sizeStr: formatFileSize(file.size),
          downloadName: file.name,
          description: fileType === 'pdf' 
            ? (isFa ? 'راهنمای بالینی PDF برای مراجعین' : 'Clinical PDF Guide')
            : fileType === 'audio'
            ? (isFa ? 'فایل صوتی و پادکست توضیحی دکتر مومنی' : 'Voice Explanation Track')
            : fileType === 'image'
            ? (isFa ? 'تصویر و اینفوگرافیک تکمیلی' : 'Infographic illustration')
            : (isFa ? 'کاربرگه و سند ضمیمه' : 'Clinical Worksheet')
        };

        onChange([...attachments, newAtt]);
        setUploadSuccess(isFa ? `فایل «${file.name}» با موفقیت افزوده شد.` : `File "${file.name}" added successfully.`);
        setTimeout(() => setUploadSuccess(''), 3500);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeAttachment = (id: string) => {
    onChange(attachments.filter(a => a.id !== id));
  };

  const updateAttachmentName = (id: string, name: string) => {
    onChange(attachments.map(a => a.id === id ? { ...a, name } : a));
  };

  const updateAttachmentDesc = (id: string, description: string) => {
    onChange(attachments.map(a => a.id === id ? { ...a, description } : a));
  };

  return (
    <div className="space-y-4 text-start">
      
      {/* Upload Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
          isDragging 
            ? 'border-primary bg-primary/10 scale-[1.01]' 
            : 'border-border/80 hover:border-primary/50 bg-accent/15 hover:bg-accent/25'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,audio/*,.docx,.xlsx,.doc,.csv"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2.5">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-xs">
            <Upload className="w-6 h-6 animate-bounce" />
          </div>

          <div>
            <p className="text-xs sm:text-sm font-heading font-bold text-foreground">
              {isFa ? 'برای آپلود فایل‌ها، PDF، عکس‌ها یا فایل‌های صوتی اینجا کلیک کنید یا آن‌ها را بکشید و رها کنید' : 'Click or Drag & Drop to upload PDFs, Images, Voice Memos & Documents'}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              {isFa ? 'پشتیبانی از فرمت‌های JPG, PNG, WEBP, PDF, MP3, M4A, DOCX, XLSX تا سقف ۲۵ مگابایت' : 'Supported formats: JPG, PNG, WEBP, PDF, MP3, M4A, DOCX, XLSX (up to 25MB)'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">
              <FileText className="w-3 h-3" />
              <span>PDF راهنما / پرسشنامه</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
              <Headphones className="w-3 h-3" />
              <span>پادکست و فایل صوتی</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <ImageIcon className="w-3 h-3" />
              <span>تصاویر و اینفوگرافیک</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
              <FileSpreadsheet className="w-3 h-3" />
              <span>کاربرگه و اسناد DOCX</span>
            </span>
          </div>
        </div>
      </div>

      {uploadError && (
        <div className="p-3 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {uploadSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* Attachments List */}
      {attachments.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-foreground">
            <span>{isFa ? `پیوست‌های بارگذاری شده (${attachments.length})` : `Uploaded Attachments (${attachments.length})`}</span>
            <span className="text-[11px] text-muted-foreground font-normal">
              {isFa ? 'می‌توانید عنوان و توضیحات هر پیوست را ویرایش کنید' : 'Edit name & descriptions directly'}
            </span>
          </div>

          <div className="space-y-2.5">
            {attachments.map((att) => (
              <div
                key={att.id}
                className="p-3.5 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-center gap-3 w-full sm:w-auto flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    {att.type === 'pdf' ? (
                      <FileText className="w-5 h-5 text-rose-500" />
                    ) : att.type === 'audio' ? (
                      <Headphones className="w-5 h-5 text-blue-500" />
                    ) : att.type === 'image' ? (
                      <ImageIcon className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <FileSpreadsheet className="w-5 h-5 text-amber-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={att.name}
                        onChange={(e) => updateAttachmentName(att.id, e.target.value)}
                        placeholder="نام فایل پیوست..."
                        className="font-bold text-xs bg-transparent border-b border-border/60 focus:border-primary px-1 py-0.5 w-full max-w-sm text-foreground focus:outline-none"
                      />
                      {att.sizeStr && (
                        <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                          {att.sizeStr}
                        </span>
                      )}
                    </div>

                    <input
                      type="text"
                      value={att.description || ''}
                      onChange={(e) => updateAttachmentDesc(att.id, e.target.value)}
                      placeholder={isFa ? 'توضیح کوتاه (مثال: جدول ثبت افکار خودآیند)' : 'Short description for patients...'}
                      className="text-[11px] text-muted-foreground bg-transparent border-b border-border/40 focus:border-primary px-1 py-0.5 w-full max-w-md focus:outline-none"
                    />
                  </div>
                </div>

                {/* Actions per item */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                  {att.type === 'image' && onSetCoverImage && (
                    <button
                      type="button"
                      onClick={() => onSetCoverImage(att.url)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                      title={isFa ? 'تنظیم به عنوان عکس شاخص کاور مقاله' : 'Set as Cover Image'}
                    >
                      {isFa ? 'کاور مقاله' : 'Set Cover'}
                    </button>
                  )}

                  {att.type === 'image' && onInsertInlineMarkdown && (
                    <button
                      type="button"
                      onClick={() => onInsertInlineMarkdown(`\n\n![${att.name}](${att.url})\n*${att.description || att.name}*\n\n`)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 transition-colors"
                      title={isFa ? 'درج این عکس درون متن مقاله' : 'Insert inline into text'}
                    >
                      {isFa ? 'درج در متن' : 'Insert'}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => removeAttachment(att.id)}
                    className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors"
                    title={isFa ? 'حذف این پیوست' : 'Remove Attachment'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
