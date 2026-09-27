interface BrandIconProps {
  className?: string;
  size?: number;
}

export function BrandIcon({ className = "w-6 h-6", size }: BrandIconProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="dm-grad-icon" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4A7C6A" />
          <stop offset="100%" stopColor="#1B3B2E" />
        </linearGradient>
        <linearGradient id="dm-ring-icon" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FDFBF7" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="dm-glow-icon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A3D9C9" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4A7C6A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background squircle */}
      <rect width="64" height="64" rx="18" fill="url(#dm-grad-icon)" />

      {/* Inner border highlight */}
      <rect x="1" y="1" width="62" height="62" rx="17" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" />

      {/* Center lens glow */}
      <circle cx="32" cy="32" r="18" fill="url(#dm-glow-icon)" />

      {/* Camera lens / Aperture ring */}
      <circle cx="32" cy="32" r="15" stroke="url(#dm-ring-icon)" strokeWidth="3" />

      {/* Center iris core */}
      <circle cx="32" cy="32" r="7.5" fill="#FDFBF7" />

      {/* Memory sparkle star at top-right */}
      <path
        d="M46 12 C46 15 47.5 17 50.5 17 C47.5 17 46 19 46 22 C46 19 44.5 17 41.5 17 C44.5 17 46 15 46 12 Z"
        fill="#FDFBF7"
      />

      {/* Subtle lens accent glint */}
      <circle cx="28.5" cy="28.5" r="2" fill="white" />
    </svg>
  );
}
