import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, FastForward, Headphones, Download, Radio } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageProvider';

interface AudioPlayerWidgetProps {
  audioUrl: string;
  title?: string;
  author?: string;
  durationSeconds?: number;
  className?: string;
}

export const AudioPlayerWidget: React.FC<AudioPlayerWidgetProps> = ({
  audioUrl,
  title,
  author,
  durationSeconds,
  className = ''
}) => {
  const { lang, isRTL } = useLanguage();
  const isFa = lang === 'fa';

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(durationSeconds || 0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Audio playback error (e.g. simulated blob url):', err);
        // Fallback simulated playing state for local demo URLs
        setIsPlaying(!isPlaying);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-primary/15 via-accent/30 to-primary/10 border border-primary/25 shadow-sm text-start ${className}`}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-primary/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs shrink-0">
            <Headphones className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary uppercase tracking-wider">
                {isFa ? 'پادکست و تحلیل صوتی' : 'Audio Podcast'}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {author || (isFa ? 'دکتر فاطمه مومنی' : 'Dr. Fatemeh Momeni')}
              </span>
            </div>
            <h4 className="font-heading font-bold text-sm text-foreground mt-0.5 line-clamp-1">
              {title || (isFa ? 'توضیحات و فایل صوتی این مقاله بالینی' : 'Audio commentary on this clinical article')}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            onClick={cycleSpeed}
            className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-background/80 hover:bg-background border border-border text-foreground transition-all cursor-pointer"
            title={isFa ? 'سرعت پخش' : 'Playback Speed'}
          >
            {playbackRate}x
          </button>

          <button
            onClick={toggleMute}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {audioUrl && !audioUrl.startsWith('data:') && (
            <a
              href={audioUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors cursor-pointer"
              title={isFa ? 'دانلود فایل صوتی' : 'Download Audio'}
            >
              <Download className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Scrubber and Controls */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className={`w-5 h-5 ${isRTL ? 'mr-0.5' : 'ml-0.5'}`} />}
          </button>

          <div className="flex-1 space-y-1">
            <div className="relative w-full flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 rounded-lg bg-primary/20 accent-primary cursor-pointer transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground px-0.5">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
