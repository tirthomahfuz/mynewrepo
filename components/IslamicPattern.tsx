"use client";

interface IslamicPatternProps {
  className?: string;
  color?: string;
  opacity?: number;
  size?: number;
}

export default function IslamicPattern({
  className = "",
  color = "#0f766e",
  opacity = 0.12,
  size = 60,
}: IslamicPatternProps) {
  const id = `geo-${Math.random().toString(36).substr(2, 9)}`;
  const half = size / 2;

  // 8-pointed star points
  const outerR = half * 0.88;
  const innerR = half * 0.38;
  const points: string[] = [];

  for (let i = 0; i < 8; i++) {
    const outerAngle = (i * Math.PI) / 4 - Math.PI / 2;
    const innerAngle = outerAngle + Math.PI / 8;
    points.push(
      `${half + outerR * Math.cos(outerAngle)},${half + outerR * Math.sin(outerAngle)}`
    );
    points.push(
      `${half + innerR * Math.cos(innerAngle)},${half + innerR * Math.sin(innerAngle)}`
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points={points.join(" ")}
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            opacity={opacity}
          />
          {/* Connecting squares at tile corners */}
          <rect
            x={half - 3}
            y={-3}
            width={6}
            height={6}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity={opacity * 0.6}
            transform={`rotate(45, ${half}, 0)`}
          />
          <rect
            x={half - 3}
            y={size - 3}
            width={6}
            height={6}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity={opacity * 0.6}
            transform={`rotate(45, ${half}, ${size})`}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function PatternDivider({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`relative flex items-center justify-center py-2 ${className}`}>
      <div className="absolute inset-x-0 h-px bg-stone-200" />
      <div className="relative flex items-center gap-3 px-4 bg-transparent">
        <StarIcon className="text-teal-600 opacity-40" size={14} />
        <DiamondIcon className="text-amber-600 opacity-40" size={10} />
        <StarIcon className="text-teal-600 opacity-40" size={14} />
      </div>
    </div>
  );
}

function StarIcon({ className = "", size = 14 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M10 1l2.39 7.35H19l-5.39 3.92 2.06 7.35L10 16.23l-5.67 3.39 2.06-7.35L1 8.35h6.61z" />
    </svg>
  );
}

function DiamondIcon({ className = "", size = 10 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M10 0 L20 10 L10 20 L0 10 Z" />
    </svg>
  );
}
