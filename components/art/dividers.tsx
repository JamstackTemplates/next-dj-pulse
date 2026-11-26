import type { CSSProperties } from 'react';

const EQ_HEIGHTS = [
  14, 24, 38, 28, 46, 32, 18, 42, 52, 34, 20, 48, 36, 24, 44, 30,
  16, 40, 50, 28, 22, 46, 34, 18, 38, 48, 26, 20, 42, 30, 16, 26,
];

/** Multi-bar LED equalizer divider with amber peak-hold caps between sections. */
export function EqualizerDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 960 64" className="block h-11 w-full sm:h-14" preserveAspectRatio="none">
        <defs>
          <linearGradient id="eq-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="55%" stopColor="var(--magenta)" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>
        <line x1="0" y1="63" x2="960" y2="63" stroke="var(--border)" strokeWidth="2" />
        {EQ_HEIGHTS.map((height, i) => (
          <g key={i}>
            <rect
              x={i * 30 + 6}
              y={62 - height}
              width="18"
              height={height}
              rx="2.5"
              fill="url(#eq-grad)"
              opacity={i % 3 === 0 ? 0.92 : 0.68}
              className="eq-bar"
              style={{ '--d': i % 7 } as CSSProperties}
            />
            {/* Amber LED peak-hold cap */}
            <rect
              x={i * 30 + 6}
              y={Math.max(2, 55 - height)}
              width="18"
              height="3.5"
              rx="1.5"
              fill="var(--amber)"
              opacity={height > 36 ? 0.95 : 0.45}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Sculpted soundwave section border transitioning from Hero to Booth. */
export function SoundwaveBorder({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div
      className={`pointer-events-none w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 54" className="block h-8 w-full sm:h-12" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sw-border-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--magenta)" />
            <stop offset="50%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>
        <path
          d="M0 54 V34 L90 34 L118 14 L142 42 L170 20 L198 34 L340 34 L366 8 L392 44 L418 16 L444 34 L620 34 L650 10 L678 46 L706 12 L734 34 L940 34 L968 18 L996 42 L1024 14 L1052 34 L1230 34 L1258 10 L1284 40 L1312 18 L1340 34 L1440 34 V54 Z"
          fill="var(--surface-raised)"
        />
        <path
          d="M0 34 L90 34 L118 14 L142 42 L170 20 L198 34 L340 34 L366 8 L392 44 L418 16 L444 34 L620 34 L650 10 L678 46 L706 12 L734 34 L940 34 L968 18 L996 42 L1024 14 L1052 34 L1230 34 L1258 10 L1284 40 L1312 18 L1340 34 L1440 34"
          fill="none"
          stroke="url(#sw-border-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** 19-inch studio audio rack-rail section border with mounting slots and pulse rail. */
export function RackRailBorder({ label = 'BOOTH RACK // 19" AUDIO', className = '' }: { label?: string; className?: string }) {
  const slots = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div
      className={`pointer-events-none relative flex items-center justify-between overflow-hidden border-y border-line bg-bg/90 px-4 py-1.5 ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        {slots.slice(0, 10).map(i => (
          <span
            key={i}
            className="inline-block h-2 w-4 shrink-0 rounded-full border border-line bg-raised"
          />
        ))}
      </div>
      <span className="shrink-0 px-4 font-tech text-[0.65rem] font-bold uppercase tracking-[0.22em] text-muted">
        {label}
      </span>
      <div className="flex items-center gap-3 overflow-hidden">
        {slots.slice(10, 20).map(i => (
          <span
            key={i}
            className="inline-block h-2 w-4 shrink-0 rounded-full border border-line bg-raised"
          />
        ))}
      </div>
    </div>
  );
}

/** Oversized concentric vinyl-groove background ornament for floor sections. */
export function VinylGrooveBackdrop({ side = 'right' }: { side?: 'left' | 'right' }) {
  const pos = side === 'left' ? '-left-40 -top-24' : '-right-40 -top-24';
  return (
    <svg
      viewBox="0 0 560 560"
      className={`pointer-events-none absolute ${pos} z-0 h-[34rem] w-[34rem] opacity-[0.18] select-none`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`groove-arc-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--magenta)" />
          <stop offset="50%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>
      {[260, 234, 208, 182, 156, 130, 104, 78].map((r, idx) => (
        <circle
          key={r}
          cx="280"
          cy="280"
          r={r}
          fill="none"
          stroke={idx % 3 === 0 ? `url(#groove-arc-${side})` : 'var(--border)'}
          strokeWidth={idx % 3 === 0 ? '2' : '1'}
          strokeDasharray={idx % 2 === 1 ? '28 14' : undefined}
        />
      ))}
      <line x1="280" y1="8" x2="280" y2="552" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 8" />
      <line x1="8" y1="280" x2="552" y2="280" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 8" />
    </svg>
  );
}

/** Architectural Chicago skyline + elevated L-train truss silhouette watermark. */
export function ChicagoSkylineWatermark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 160"
      className={`pointer-events-none block w-full select-none ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 160 V120 H44 V134 H76 V92 H122 V128 H162 V74 H196 V118 H234 V62 H256 V36 H262 V6 H266 V36 H276 V6 H280 V36 H290 V62 H310 V110 H364 V82 H412 V122 H458 V96 H504 V132 H564 V78 H608 V116 H654 V64 H692 V108 H746 V86 H798 V124 H848 V70 H896 V112 H948 V88 H1004 V128 H1058 V76 H1108 V114 H1164 V90 H1214 V126 H1268 V82 H1322 V118 H1378 V96 H1440 V160 Z"
        fill="var(--bg)"
        opacity="0.34"
      />
      <line x1="0" y1="142" x2="1440" y2="142" stroke="var(--border)" strokeWidth="1.5" opacity="0.6" />
      <line x1="0" y1="150" x2="1440" y2="150" stroke="var(--border)" strokeWidth="1" strokeDasharray="18 10" opacity="0.5" />
    </svg>
  );
}

/** Mirrored horizontal waveform rule for page heads and footer. */
export function WaveformRule({ className = '' }: { className?: string }) {
  const amplitudes = [
    4, 8, 14, 7, 18, 12, 6, 20, 14, 9, 16, 11, 5, 19, 13, 8, 15, 22, 12, 7,
    17, 10, 6, 21, 15, 9, 14, 18, 11, 6, 16, 12, 8, 19, 13, 7, 15, 9, 5, 12,
  ];
  return (
    <svg
      viewBox="0 0 800 48"
      className={`block h-8 w-full ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wave-rule-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--magenta)" />
          <stop offset="50%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>
      <line x1="0" y1="24" x2="800" y2="24" stroke="var(--border)" strokeWidth="1" />
      {amplitudes.map((amp, i) => (
        <line
          key={i}
          x1={10 + i * 20}
          y1={24 - amp}
          x2={10 + i * 20}
          y2={24 + amp}
          stroke="url(#wave-rule-grad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
