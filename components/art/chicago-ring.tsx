/**
 * Chicagoland service ring: radar-like concentric rings (20 / 40 / 60 miles)
 * centred on the Chicago Loop with Lake Michigan shoreline.
 */
export function ChicagoServiceRing() {
  return (
    <svg
      viewBox="0 0 360 280"
      className="h-auto w-full rounded-md border border-line bg-bg"
      role="img"
      aria-label="Chicagoland service area map showing 20, 40 and 60 mile rings centred on the Chicago Loop"
    >
      <defs>
        <linearGradient id="chi-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--magenta)" />
          <stop offset="52%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>

      {/* Lake Michigan water area on right */}
      <path
        d="M236 0 C222 52, 226 112, 240 156 C252 194, 278 238, 305 280 L360 280 L360 0 Z"
        fill="var(--cyan)"
        opacity="0.1"
      />
      {/* Lakeshore hairline */}
      <path
        d="M236 0 C222 52, 226 112, 240 156 C252 194, 278 238, 305 280"
        fill="none"
        stroke="var(--cyan)"
        strokeWidth="2"
      />

      {/* Radar grid axes */}
      <line x1="20" y1="142" x2="340" y2="142" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="226" y1="16" x2="226" y2="264" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />

      {/* 60 / 40 / 20 mile rings */}
      <circle cx="226" cy="142" r="120" fill="none" stroke="url(#chi-ring-grad)" strokeWidth="2" strokeDasharray="6 4" />
      <circle cx="226" cy="142" r="80" fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.8" />
      <circle cx="226" cy="142" r="40" fill="var(--magenta)" fillOpacity="0.1" stroke="var(--magenta)" strokeWidth="1.5" />

      {/* Ring labels */}
      <text x="114" y="136" fill="var(--cyan)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700 }}>
        60 MI
      </text>
      <text x="154" y="136" fill="var(--primary-ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700 }}>
        40 MI
      </text>
      <text x="192" y="136" fill="var(--magenta)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700 }}>
        20 MI
      </text>

      {/* Loop center pin */}
      <circle cx="226" cy="142" r="6" fill="var(--magenta)" />
      <circle cx="226" cy="142" r="11" fill="none" stroke="var(--magenta)" strokeWidth="1.5" opacity="0.7" />
      <text x="242" y="138" fill="var(--text)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700 }}>
        THE LOOP
      </text>
      <text x="348" y="36" textAnchor="end" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em' }}>
        LAKE MICHIGAN
      </text>
      <text x="16" y="262" fill="var(--muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
        INCLUDED RADIUS · TRAVEL QUOTED BEYOND 60 MI
      </text>
    </svg>
  );
}
