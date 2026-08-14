import React from 'react';

export type ShadowAvatarType = 
  | 'calm_mind'          // Serene silhouette profile with glowing emerald mind aura
  | 'seeker_light'       // Silhouette wanderer under golden crescent dawn
  | 'focus_spark'        // Silhouette with sharp crystalline focus prism
  | 'harmony_duo'        // Two intertwined empathetic shadow profiles
  | 'resilient_shield'   // Protective teal guardian shield silhouette
  | 'night_awakening'    // Stargazer gazing at cosmic constellation
  | 'hope_wings'         // Silhouette with radiant luminous butterfly wings
  | 'inner_sun'          // Silhouette embracing radiant amber sunrise
  | 'breeze_zen'         // Meditative lotus silhouette with flowing mint breeze
  | 'compass_path';      // Quantum traveler silhouette with glowing guidance star

interface ShadowAvatarProps {
  type?: ShadowAvatarType | string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glow?: boolean;
}

export const ShadowAvatar: React.FC<ShadowAvatarProps> = ({
  type = 'calm_mind',
  size = 'md',
  className = '',
  glow = true
}) => {
  // Balanced scale: crisp, easily visible, and non-intrusive
  const sizeMap = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-15 sm:h-15',
    xl: 'w-16 h-16 sm:w-20 sm:h-20'
  };

  const getStyle = () => {
    switch (type) {
      case 'seeker_light':
        return {
          bg: 'from-amber-950/80 via-yellow-950/50 to-stone-900',
          border: 'border-amber-400/40',
          glowColor: 'rgba(245, 158, 11, 0.35)',
          accent: '#fbbf24',
          accentLight: '#fef3c7',
          gradId: 'amber-aura'
        };
      case 'focus_spark':
        return {
          bg: 'from-sky-950/80 via-indigo-950/50 to-slate-900',
          border: 'border-sky-400/40',
          glowColor: 'rgba(56, 189, 248, 0.35)',
          accent: '#38bdf8',
          accentLight: '#e0f2fe',
          gradId: 'sky-aura'
        };
      case 'harmony_duo':
        return {
          bg: 'from-rose-950/80 via-pink-950/50 to-stone-900',
          border: 'border-rose-400/40',
          glowColor: 'rgba(244, 63, 94, 0.35)',
          accent: '#fb7185',
          accentLight: '#ffe4e6',
          gradId: 'rose-aura'
        };
      case 'resilient_shield':
        return {
          bg: 'from-cyan-950/80 via-teal-950/50 to-slate-900',
          border: 'border-cyan-400/40',
          glowColor: 'rgba(6, 182, 212, 0.35)',
          accent: '#06b6d4',
          accentLight: '#ccfbf1',
          gradId: 'cyan-aura'
        };
      case 'night_awakening':
        return {
          bg: 'from-purple-950/80 via-violet-950/50 to-slate-950',
          border: 'border-violet-400/40',
          glowColor: 'rgba(139, 92, 246, 0.35)',
          accent: '#a78bfa',
          accentLight: '#ede9fe',
          gradId: 'violet-aura'
        };
      case 'hope_wings':
        return {
          bg: 'from-blue-950/80 via-sky-950/50 to-slate-900',
          border: 'border-blue-400/40',
          glowColor: 'rgba(96, 165, 250, 0.35)',
          accent: '#60a5fa',
          accentLight: '#eff6ff',
          gradId: 'blue-aura'
        };
      case 'inner_sun':
        return {
          bg: 'from-orange-950/80 via-amber-950/50 to-stone-900',
          border: 'border-orange-400/40',
          glowColor: 'rgba(251, 146, 60, 0.35)',
          accent: '#fb923c',
          accentLight: '#ffedd5',
          gradId: 'orange-aura'
        };
      case 'breeze_zen':
        return {
          bg: 'from-emerald-950/80 via-teal-950/50 to-stone-900',
          border: 'border-teal-400/40',
          glowColor: 'rgba(20, 184, 166, 0.35)',
          accent: '#2dd4bf',
          accentLight: '#f0fdf4',
          gradId: 'teal-aura'
        };
      case 'compass_path':
        return {
          bg: 'from-indigo-950/80 via-blue-950/50 to-slate-950',
          border: 'border-indigo-400/40',
          glowColor: 'rgba(99, 102, 241, 0.35)',
          accent: '#818cf8',
          accentLight: '#e0e7ff',
          gradId: 'indigo-aura'
        };
      case 'calm_mind':
      default:
        return {
          bg: 'from-emerald-950/80 via-teal-950/50 to-primary/40',
          border: 'border-emerald-400/40',
          glowColor: 'rgba(16, 185, 129, 0.35)',
          accent: '#10b981',
          accentLight: '#ecfdf5',
          gradId: 'emerald-aura'
        };
    }
  };

  const style = getStyle();

  return (
    <div
      className={`relative rounded-full p-0.5 overflow-hidden flex items-center justify-center bg-gradient-to-b ${style.bg} border ${style.border} ${sizeMap[size]} ${className} shadow-sm shrink-0 transition-transform duration-300`}
      style={glow ? { boxShadow: `0 4px 14px 0 ${style.glowColor}` } : undefined}
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-radial from-white/15 via-transparent to-black/50 opacity-80 pointer-events-none" />

      {/* High-definition Mysterious Silhouette Vector */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-0.5 drop-shadow-md z-10 select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={style.gradId} cx="50" cy="40" r="24" gradientUnits="userSpaceOnUse">
            <stop stopColor={style.accent} stopOpacity="0.6" />
            <stop offset="1" stopColor={style.accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. CALM MIND - Emerald Mind Waves & Serene Silhouette */}
        {(type === 'calm_mind' || !type) && (
          <g>
            <circle cx="50" cy="42" r="22" fill={`url(#${style.gradId})`} />
            <circle cx="50" cy="42" r="24" stroke={style.accent} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            {/* Dark Silhouette Torso */}
            <path d="M26 90C26 70 36 62 50 62C64 62 74 70 74 90" fill="#09111e" stroke="#1e293b" strokeWidth="2" />
            {/* Head Profile */}
            <circle cx="50" cy="42" r="14" fill="#09111e" stroke="#334155" strokeWidth="1.5" />
            {/* Luminous Mindfulness Pearl */}
            <circle cx="50" cy="36" r="3.5" fill={style.accentLight} />
            <circle cx="50" cy="36" r="7" fill={style.accent} fillOpacity="0.4" />
            {/* Energy Waves */}
            <path d="M38 52Q50 57 62 52" stroke={style.accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          </g>
        )}

        {/* 2. SEEKER LIGHT - Cloaked Wanderer with Golden Dawn Crescent */}
        {type === 'seeker_light' && (
          <g>
            <circle cx="50" cy="42" r="24" fill={`url(#${style.gradId})`} />
            {/* Golden Dawn Crescent */}
            <path
              d="M52 14C66 14 78 26 78 40C78 52 70 62 58 66C70 60 74 46 70 34C66 22 54 18 42 20C45 16 49 14 52 14Z"
              fill={style.accent}
              fillOpacity="0.9"
            />
            {/* Hooded Wanderer Shadow */}
            <path d="M24 90C26 66 36 58 50 58C64 58 74 66 76 90" fill="#14110b" stroke="#382e1c" strokeWidth="2" />
            <path d="M50 28C41 28 34 36 36 49C38 58 45 62 50 62C55 62 62 58 64 49C66 36 59 28 50 28Z" fill="#14110b" stroke="#524328" strokeWidth="1.5" />
            {/* Inner Guiding Flame */}
            <circle cx="50" cy="44" r="3" fill={style.accentLight} />
            <circle cx="50" cy="44" r="6" fill={style.accent} fillOpacity="0.5" />
          </g>
        )}

        {/* 3. FOCUS SPARK - Geometric Mind Prism & Sharp Focus */}
        {type === 'focus_spark' && (
          <g>
            <circle cx="50" cy="42" r="24" fill={`url(#${style.gradId})`} />
            <circle cx="50" cy="42" r="22" stroke={style.accent} strokeWidth="1.2" strokeDasharray="4 2" opacity="0.7" />
            {/* Shadow Figure */}
            <path d="M26 90C26 68 36 60 50 60C64 60 74 68 74 90" fill="#0b1329" stroke="#1e293b" strokeWidth="2" />
            <circle cx="50" cy="42" r="14" fill="#0b1329" stroke="#1d4ed8" strokeWidth="1.5" />
            {/* Sharp Diamond Prism on Forehead */}
            <polygon points="50,26 56,36 50,46 44,36" fill={style.accentLight} />
            <circle cx="50" cy="36" r="6" fill={style.accent} fillOpacity="0.5" />
            {/* Focus Crosshairs */}
            <line x1="28" y1="42" x2="34" y2="42" stroke={style.accent} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="66" y1="42" x2="72" y2="42" stroke={style.accent} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {/* 4. HARMONY DUO - Two Intertwined Shadow Figures for Empathy & Connection */}
        {type === 'harmony_duo' && (
          <g>
            <circle cx="40" cy="44" r="18" fill={style.accent} fillOpacity="0.2" />
            <circle cx="60" cy="44" r="18" fill={style.accent} fillOpacity="0.2" />
            {/* Left Silhouette */}
            <path d="M18 90C20 72 28 66 38 66C43 66 48 68 51 73C44 77 40 83 38 90" fill="#1f0f16" stroke="#4c1d30" strokeWidth="1.5" />
            <circle cx="36" cy="44" r="11" fill="#1f0f16" stroke="#831843" strokeWidth="1.5" />
            {/* Right Silhouette */}
            <path d="M82 90C80 72 72 66 62 66C57 66 52 68 49 73C56 77 60 83 62 90" fill="#2d1220" stroke="#4c1d30" strokeWidth="1.5" />
            <circle cx="64" cy="44" r="11" fill="#2d1220" stroke="#831843" strokeWidth="1.5" />
            {/* Luminous Empathy Hearth */}
            <circle cx="50" cy="44" r="4" fill={style.accentLight} />
            <circle cx="50" cy="44" r="8" fill={style.accent} fillOpacity="0.6" />
          </g>
        )}

        {/* 5. RESILIENT SHIELD - Protective Guardian Silhouette */}
        {type === 'resilient_shield' && (
          <g>
            {/* Guardian Crest Background */}
            <polygon points="50,14 78,26 74,64 50,82 26,64 22,26" fill={`url(#${style.gradId})`} stroke={style.accent} strokeWidth="1.5" />
            {/* Strong Shadow Figure */}
            <path d="M28 90C28 72 37 64 50 64C63 64 72 72 72 90" fill="#04202c" stroke="#083344" strokeWidth="2" />
            <circle cx="50" cy="46" r="13" fill="#04202c" stroke="#0e7490" strokeWidth="1.5" />
            {/* Core Shield Spark */}
            <polygon points="50,34 54,42 50,50 46,42" fill={style.accentLight} />
            <circle cx="50" cy="42" r="5" fill={style.accent} fillOpacity="0.5" />
          </g>
        )}

        {/* 6. NIGHT AWAKENING - Cosmic Silhouette Under Stars */}
        {type === 'night_awakening' && (
          <g>
            <circle cx="50" cy="42" r="24" fill={`url(#${style.gradId})`} />
            {/* Cosmic Crescent Moon */}
            <path d="M34 18C42 18 48 24 50 30C46 32 44 36 44 40C44 46 48 50 54 50C52 56 46 60 38 60C26 60 18 50 18 38C18 26 25 18 34 18Z" fill={style.accent} fillOpacity="0.8" />
            {/* Night Gazer Shadow */}
            <path d="M28 90C28 68 37 62 50 62C63 62 72 68 72 90" fill="#0c071e" stroke="#2e1065" strokeWidth="2" />
            <circle cx="50" cy="42" r="13" fill="#0c071e" stroke="#581c87" strokeWidth="1.5" />
            {/* Starlight Constellations */}
            <circle cx="70" cy="24" r="2" fill={style.accentLight} />
            <circle cx="78" cy="40" r="1.5" fill={style.accentLight} />
            <circle cx="62" cy="16" r="1.5" fill={style.accentLight} />
            <circle cx="50" cy="38" r="2.5" fill={style.accentLight} />
          </g>
        )}

        {/* 7. HOPE WINGS - Radiant Butterfly Wings & Freedom Silhouette */}
        {type === 'hope_wings' && (
          <g>
            {/* Butterfly Luminous Wings */}
            <path d="M50 42C36 20 16 28 20 50C22 58 34 62 50 52C66 62 78 58 80 50C84 28 64 20 50 42Z" fill={style.accent} fillOpacity="0.3" stroke={style.accent} strokeWidth="1.2" />
            {/* Ascending Figure Silhouette */}
            <path d="M30 90C30 70 38 62 50 62C62 62 70 70 70 90" fill="#08152c" stroke="#1e3a8a" strokeWidth="2" />
            <circle cx="50" cy="42" r="12" fill="#08152c" stroke="#2563eb" strokeWidth="1.5" />
            {/* Beacon Spark */}
            <circle cx="50" cy="36" r="3" fill={style.accentLight} />
            <circle cx="50" cy="36" r="6" fill={style.accent} fillOpacity="0.6" />
          </g>
        )}

        {/* 8. INNER SUN - Radiant Solar Aura & Vitality */}
        {type === 'inner_sun' && (
          <g>
            {/* Solar Rays */}
            <circle cx="50" cy="40" r="22" fill={`url(#${style.gradId})`} />
            <circle cx="50" cy="40" r="16" fill={style.accent} fillOpacity="0.4" />
            {/* Shadow Silhouette */}
            <path d="M26 90C26 68 36 60 50 60C64 60 74 68 74 90" fill="#1c0f04" stroke="#431407" strokeWidth="2" />
            <circle cx="50" cy="42" r="13" fill="#1c0f04" stroke="#7c2d12" strokeWidth="1.5" />
            {/* Sun core */}
            <circle cx="50" cy="36" r="3.5" fill={style.accentLight} />
            <circle cx="50" cy="36" r="7" fill={style.accent} fillOpacity="0.5" />
          </g>
        )}

        {/* 9. BREEZE ZEN - Lotus Breath & Mint Serenity */}
        {type === 'breeze_zen' && (
          <g>
            <circle cx="50" cy="42" r="24" fill={`url(#${style.gradId})`} />
            {/* Flowing Zen Aura Waves */}
            <path d="M24 38Q50 26 76 38" stroke={style.accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M20 48Q50 36 80 48" stroke={style.accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            {/* Meditative Silhouette */}
            <path d="M26 90C26 70 36 62 50 62C64 62 74 70 74 90" fill="#041f1a" stroke="#064e3b" strokeWidth="2" />
            <circle cx="50" cy="42" r="13" fill="#041f1a" stroke="#047857" strokeWidth="1.5" />
            {/* Breath Sparkle */}
            <circle cx="50" cy="36" r="3" fill={style.accentLight} />
          </g>
        )}

        {/* 10. COMPASS PATH - Navigation Compass Star & Direction */}
        {type === 'compass_path' && (
          <g>
            <circle cx="50" cy="42" r="24" fill={`url(#${style.gradId})`} />
            {/* Four-Point Compass Star */}
            <polygon points="50,16 54,34 72,38 54,42 50,60 46,42 28,38 46,34" fill={style.accent} fillOpacity="0.35" stroke={style.accent} strokeWidth="1.2" />
            {/* Traveler Shadow */}
            <path d="M28 90C28 70 37 62 50 62C63 62 72 70 72 90" fill="#0b0e27" stroke="#1e1b4b" strokeWidth="2" />
            <circle cx="50" cy="42" r="13" fill="#0b0e27" stroke="#3730a3" strokeWidth="1.5" />
            {/* North Star Guide Light */}
            <circle cx="50" cy="36" r="3" fill={style.accentLight} />
            <circle cx="50" cy="36" r="6" fill={style.accent} fillOpacity="0.6" />
          </g>
        )}
      </svg>
    </div>
  );
};
