import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'badge' | 'glass' | 'gold' | 'minimal';
  showPulse?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'badge',
  showPulse = true,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
    '2xl': 'w-16 h-16'
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-2xl transition-all duration-300 group-hover:scale-105 select-none ${sizeMap[size]} ${className}`}
      aria-label="دکتر فاطمه مومنی - نشان تشخیصی گوشی پزشکی بالینی"
      title="دکتر فاطمه مومنی - روانپزشک و روان‌درمانگر"
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-all duration-300"
      >
        <defs>
          {/* Softer, Refined Medical Mineral-Green / Deep Sage Gradient */}
          <linearGradient id="brandStethGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E6B7E" />
            <stop offset="50%" stopColor="#195B6C" />
            <stop offset="100%" stopColor="#134754" />
          </linearGradient>

          {/* Platinum / Metallic Highlights */}
          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Soft Calming Core Glow */}
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#E0F2FE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1E6B7E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Squircle Badge Background with delicate thin rounded shape */}
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="16"
          fill="url(#brandStethGrad)"
        />

        {/* Micro-Thin Precision Inner Rim */}
        <rect
          x="2.5"
          y="2.5"
          width="59"
          height="59"
          rx="15.5"
          stroke="rgba(255, 255, 255, 0.18)"
          strokeWidth="0.8"
        />

        {/* Soft Ambient Center Glow */}
        <circle cx="32" cy="20" r="16" fill="url(#coreGlow)" opacity="0.08" />

        {/* 1. Binaural Soft Comfort Earpieces */}
        <circle cx="20.5" cy="13" r="2.2" fill="url(#metalGrad)" />
        <circle cx="43.5" cy="13" r="2.2" fill="url(#metalGrad)" />

        {/* 2. Stainless Steel Binaural Headset Arch - Thinner, Sleek Stethoscope lines */}
        <path
          d="M20.5 15.2 V20.5 C20.5 26.5 28.5 30.5 32 33.5 C35.5 30.5 43.5 26.5 43.5 20.5 V15.2"
          stroke="url(#metalGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Tension Arch Bar */}
        <path
          d="M25 21 Q32 23.5 39 21"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* 3. Sleek Y-Yoke Connector */}
        <path
          d="M30.5 33.2 H33.5 L33 36.8 H31 Z"
          fill="url(#metalGrad)"
        />

        {/* 4. Flexible Acoustic Tubing - Elegant, Delicate Thin Stroke */}
        <path
          d="M32 36.8 C32 44 21.5 48.5 21.5 41.5 C21.5 34.5 36 33 40 40.5 C42 44.5 41 48.5 36.5 49.5"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 5. Master Diaphragm / Chestpiece with Acoustic Waves */}
        <circle
          cx="33.5"
          cy="49.5"
          r="5"
          fill="#0f3c47"
          stroke="url(#metalGrad)"
          strokeWidth="1.8"
        />

        {/* Inner Frequency Disc */}
        <circle
          cx="33.5"
          cy="49.5"
          r="2.6"
          fill="url(#coreGlow)"
        />

        {/* Center Acoustic Sensor */}
        <circle
          cx="33.5"
          cy="49.5"
          r="1"
          fill="#FFFFFF"
        />

        {/* Subtle Empathic Listening Waves */}
        <path
          d="M40.5 46.5 C42 48 42 51 40.5 52.5"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M43.5 44.5 C45.5 47 45.5 52 43.5 54.5"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </svg>

      {/* Optional Pulsing Acoustic Ring */}
      {showPulse && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-card"></span>
        </span>
      )}
    </div>
  );
};

