import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  FileCheck, 
  Headphones, 
  Image as ImageIcon, 
  File, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { BlogAttachment } from '../../types';
import { useLanguage } from '../../i18n/LanguageProvider';

interface BlogAttachmentsViewProps {
  attachments: BlogAttachment[];
  className?: string;
}

export const BlogAttachmentsView: React.FC<BlogAttachmentsViewProps> = ({
  attachments,
  className = ''
}) => {
  const { lang, isRTL } = useLanguage();
  const isFa = lang === 'fa';

  const [previewAttachment, setPreviewAttachment] = useState<BlogAttachment | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});

  if (!attachments || attachments.length === 0) return null;

  const handleDownload = (att: BlogAttachment) => {
    setDownloadedIds(prev => ({ ...prev, [att.id]: true }));
    
    // Trigger download
    const link = document.createElement('a');
    link.href = att.url;
    link.download = att.downloadName || att.name || 'document';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadedIds(prev => ({ ...prev, [att.id]: false }));
    }, 4000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'guide':
        return <FileText className="w-5 h-5 text-rose-500" />;
      case 'audio':
        return <Headphones className="w-5 h-5 text-blue-500" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-emerald-500" />;
      case 'document':
        return <FileSpreadsheet className="w-5 h-5 text-amber-500" />;
      default:
        return <File className="w-5 h-5 text-primary" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'pdf':
        return isFa ? 'سند PDF راهنما' : 'PDF Document';
      case 'guide':
        return isFa ? 'پرسشنامه خودارزیابی' : 'Self-Assessment Guide';
      case 'audio':
        return isFa ? 'فایل صوتی' : 'Audio Track';
      case 'image':
        return isFa ? 'اینفوگرافیک و دیاگرام' : 'Infographic';
      case 'document':
        return isFa ? 'جدول و کاربرگه' : 'Worksheet';
      default:
        return isFa ? 'پیوست بالینی' : 'Attachment';
    }
  };

  return (
    <div className={`p-5 sm:p-6 rounded-3xl bg-muted/40 border border-border/80 space-y-4 text-start ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
            <FileCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-foreground">
              {isFa ? 'فایل‌ها، راهنماهای بالینی و پیوست‌های آموزشی' : 'Clinical Guides & Downloadable Attachments'}
            </h3>
            <p className="text-[11px] sm:text-xs text-muted-foreground">
              {isFa ? 'توسط دکتر فاطمه مومنی برای استفاده مراجعین و بیماران بارگذاری شده است' : 'Prepared by Dr. Fatemeh Momeni for patient self-care & reference'}
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary self-start sm:self-auto">
          {attachments.length} {isFa ? 'فایل ضمیمه' : 'files'}
        </span>
      </div>

      {/* Attachments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {attachments.map((att) => (
          <div
            key={att.id}
            className="p-3.5 rounded-2xl bg-card border border-border/80 hover:border-primary/40 hover:shadow-md transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {getIcon(att.type)}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-muted text-muted-foreground uppercase">
                    {getTypeLabel(att.type)}
                  </span>
                  {att.sizeStr && (
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {att.sizeStr}
                    </span>
                  )}
                </div>

                <h4 className="font-heading font-bold text-xs sm:text-sm text-foreground truncate mt-0.5" title={att.name}>
                  {att.name}
                </h4>

                {att.description && (
                  <p className="text-[11px] text-muted-foreground truncate">
                    {att.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {(att.type === 'pdf' || att.type === 'guide' || att.type === 'image') && att.url && (
                <button
                  type="button"
                  onClick={() => setPreviewAttachment(att)}
                  title={isFa ? 'پیش‌نمایش در سایت' : 'Preview'}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => handleDownload(att)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  downloadedIds[att.id]
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs'
                }`}
              >
                {downloadedIds[att.id] ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isFa ? 'دریافت شد' : 'Done'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>{isFa ? 'دانلود' : 'Download'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Preview Modal for attachments */}
      {previewAttachment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-3xl max-h-[85vh] bg-card border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden text-start">
            <div className="p-4 border-b border-border flex items-center justify-between bg-accent/20">
              <div className="flex items-center gap-2">
                {getIcon(previewAttachment.type)}
                <h4 className="font-heading font-bold text-sm text-foreground truncate">
                  {previewAttachment.name}
                </h4>
              </div>

              <button
                onClick={() => setPreviewAttachment(null)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-muted/20 min-h-[300px]">
              {previewAttachment.type === 'image' ? (
                <img
                  src={previewAttachment.url}
                  alt={previewAttachment.name}
                  className="max-h-[60vh] max-w-full rounded-2xl object-contain shadow-md"
                />
              ) : previewAttachment.type === 'pdf' || previewAttachment.type === 'guide' ? (
                <div className="text-center p-8 space-y-4 max-w-md">
                  <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h5 className="font-bold text-base text-foreground">
                    {previewAttachment.name}
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {previewAttachment.description || (isFa ? 'این فایل PDF شامل راهنمای گام‌به‌گام و جداول بالینی برای مراجعین است.' : 'This clinical PDF guide contains clinical worksheets and step-by-step instructions.')}
                  </p>
                  <button
                    onClick={() => handleDownload(previewAttachment)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isFa ? 'دانلود و مشاهده کامل PDF' : 'Download Full PDF'}</span>
                  </button>
                </div>
              ) : (
                <div className="text-center p-6 space-y-3">
                  <File className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-xs text-muted-foreground">{previewAttachment.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
