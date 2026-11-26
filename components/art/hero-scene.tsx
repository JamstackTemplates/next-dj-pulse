import { asset } from '../../lib/paths';

/**
 * Full-bleed framed Hero visual with theme-switched high-resolution artwork
 * (public/hero-dark.png in dark mode, public/hero-light.png in light mode)
 * paired with a clean, solid-ring 124 BPM telemetry badge.
 */
export function HeroScene() {
  return (
    <div className="relative select-none">
      <div className="hero-art-frame">
        {/* Dark-mode hero artwork */}
        <img
          src={asset('/hero-dark.png')}
          alt="Midnight Pulse DJ booth overlooking a packed Chicago warehouse dance floor with glowing magenta and cyan beams and twin CDJ decks"
          width={1400}
          height={920}
          className="hero-img-dark h-auto w-full object-cover"
          fetchPriority="high"
        />
        {/* Light-mode hero artwork */}
        <img
          src={asset('/hero-light.png')}
          alt="Midnight Pulse DJ brushed-silver booth and twin CDJ decks in daylight soundcheck lighting with the Chicago skyline behind"
          width={1400}
          height={920}
          className="hero-img-light h-auto w-full object-cover"
          fetchPriority="high"
        />

        {/* Top-left live booth channel strip badge */}
        <div
          className="pointer-events-none absolute top-3 left-3 flex items-center gap-2 rounded-full border border-line bg-bg/85 px-3 py-1 font-tech text-[0.7rem] font-bold uppercase tracking-widest text-ink backdrop-blur-sm sm:top-4 sm:left-4"
          aria-hidden="true"
        >
          <span className="header-bpm-dot" />
          <span>LIVE RIG // CHICAGO</span>
        </div>

        {/* Bottom-right solid-ring 124 BPM telemetry badge */}
        <div
          className="pointer-events-none absolute right-3 bottom-3 flex items-center gap-3 rounded-xl border border-line bg-bg/92 px-3 py-2 shadow-lg backdrop-blur-md sm:right-4 sm:bottom-4"
          aria-hidden="true"
        >
          <svg viewBox="0 0 48 48" className="h-11 w-11 shrink-0 sm:h-12 sm:w-12">
            <defs>
              <linearGradient id="mini-bpm-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--magenta)" />
                <stop offset="52%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--cyan)" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="20" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
            <circle cx="24" cy="24" r="16.5" fill="none" stroke="url(#mini-bpm-ring)" strokeWidth="3.5" />
            <text
              x="24"
              y="27"
              textAnchor="middle"
              fill="var(--text)"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}
            >
              124
            </text>
          </svg>
          <div className="font-tech leading-tight">
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-cyan">DECK A · SYNC</p>
            <p className="mt-0.5 text-xs font-bold text-ink">124 BPM LIVE</p>
            <p className="text-[0.65rem] text-muted">CDJ · CHI HOUSE</p>
          </div>
        </div>
      </div>
    </div>
  );
}
