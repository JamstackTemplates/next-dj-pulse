import type { CSSProperties } from 'react';

const SEGMENTS = Array.from({ length: 32 }, (_, index) => index);

type JogWheelProps = {
  /** Tempo in BPM controlling the CSS-only LED chase speed. */
  bpm?: number;
  /** Center label (defaults to `${bpm}`). */
  label?: string;
  /** Optional subtitle inside the platter display. */
  sublabel?: string;
  /** Whether the LED chase runs continuously (true on Home hero, hover/focus on Mixes). */
  active?: boolean;
  /** Size class for the SVG. */
  className?: string;
  /** Unique prefix for SVG gradient IDs when rendered multiple times on a page. */
  uid?: string;
};

/**
 * Signature element: CDJ-style jog wheel with 32 LED segments driven by CSS --bpm.
 * Static fully lit gradient ring under prefers-reduced-motion.
 */
export function JogWheel({
  bpm = 124,
  label,
  sublabel = 'BPM',
  active = true,
  className = 'w-full h-auto',
  uid = 'hero',
}: JogWheelProps) {
  const gradId = `pulse-ring-${uid}`;
  const glowId = `pulse-glow-${uid}`;

  return (
    <svg
      viewBox="0 0 360 360"
      className={`jog-wheel ${className}`}
      style={{ '--bpm': bpm } as CSSProperties}
      data-active={active ? 'true' : 'false'}
      role="img"
      aria-label={`DJ jog wheel pulsing at ${bpm} BPM`}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--magenta)" />
          <stop offset="52%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--cyan)" />
        </linearGradient>
        <filter id={glowId} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer brushed platter bezel */}
      <circle cx="180" cy="180" r="172" fill="var(--surface-raised)" stroke="var(--border)" strokeWidth="2" />
      <circle cx="180" cy="180" r="158" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />

      {/* Platter grip notches */}
      {SEGMENTS.map(i => {
        const angle = (i * 360) / 32;
        return (
          <line
            key={`notch-${i}`}
            x1="180"
            y1="12"
            x2="180"
            y2="20"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${angle} 180 180)`}
          />
        );
      })}

      {/* 32 LED ring segments */}
      <g filter={`url(#${glowId})`}>
        {SEGMENTS.map(i => {
          const angle = (i * 360) / 32;
          const color =
            i < 11 ? 'var(--magenta)' : i < 22 ? 'var(--primary)' : i === 31 ? 'var(--amber)' : 'var(--cyan)';
          return (
            <rect
              key={`led-${i}`}
              x="176"
              y="28"
              width="8"
              height="16"
              rx="3"
              fill={color}
              className="jog-led"
              style={{ '--i': i } as CSSProperties}
              transform={`rotate(${angle} 180 180)`}
            />
          );
        })}
      </g>

      {/* Vinyl groove rings */}
      <circle cx="180" cy="180" r="126" fill="none" stroke={`url(#${gradId})`} strokeWidth="2.5" opacity="0.9" />
      <circle cx="180" cy="180" r="114" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="18 8" />
      <circle cx="180" cy="180" r="102" fill="none" stroke="var(--border)" strokeWidth="1" opacity="0.7" />
      <circle cx="180" cy="180" r="90" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="30 12" />

      {/* Center OLED platter display */}
      <circle cx="180" cy="180" r="74" fill="var(--bg)" stroke={`url(#${gradId})`} strokeWidth="2.5" />
      <circle
        cx="180"
        cy="180"
        r="64"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="6"
        className="jog-center-glow"
        opacity="0.35"
      />
      <circle cx="180" cy="180" r="56" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />

      {/* BPM readout */}
      <text
        x="180"
        y="184"
        textAnchor="middle"
        fill="var(--text)"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '30px', fontWeight: 700, letterSpacing: '0.04em' }}
      >
        {label ?? bpm}
      </text>
      <text
        x="180"
        y="206"
        textAnchor="middle"
        fill="var(--muted)"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em' }}
      >
        {sublabel}
      </text>

      {/* Top cue marker */}
      <polygon points="180,108 175,118 185,118" fill="var(--amber)" />
    </svg>
  );
}
