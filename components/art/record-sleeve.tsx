import type { MixGenre } from '../../content/mixes';
import { JogWheel } from './jog-wheel';

const GENRE_MOTIFS: Record<MixGenre, { badge: string; accent: string; secondary: string }> = {
  house: { badge: 'CHI HOUSE', accent: 'var(--magenta)', secondary: 'var(--cyan)' },
  disco: { badge: 'DISCO BOOGIE', accent: 'var(--amber)', secondary: 'var(--magenta)' },
  hiphop: { badge: 'LOW END', accent: 'var(--primary)', secondary: 'var(--amber)' },
  latin: { badge: 'LAKE LATIN', accent: 'var(--cyan)', secondary: 'var(--amber)' },
  throwback: { badge: '90S / 00S', accent: 'var(--magenta)', secondary: 'var(--primary)' },
  wedding: { badge: 'ALL AGES', accent: 'var(--cyan)', secondary: 'var(--magenta)' },
};

type RecordSleeveProps = {
  id: string;
  title: string;
  genre: MixGenre;
  bpm: [number, number];
  /** Show the vinyl pulsing continuously (used for "Now playing") vs on hover/focus. */
  active?: boolean;
  /** Compact mode for Home teaser. */
  compact?: boolean;
};

/**
 * Record sleeve with genre-generated flyer art and vinyl record sliding half out
 * with its JogWheel LED ring pulsing at the mix's BPM.
 */
export function RecordSleeve({ id, title, genre, bpm, active = false, compact = false }: RecordSleeveProps) {
  const motif = GENRE_MOTIFS[genre];
  const avgBpm = Math.round((bpm[0] + bpm[1]) / 2);

  return (
    <div
      className={`relative inline-flex items-center ${
        compact ? 'w-[17rem] max-w-full pr-14' : 'w-[19.5rem] max-w-full pr-20'
      }`}
    >
      {/* Sliding vinyl with JogWheel LED ring */}
      <div
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:translate-x-2 ${
          compact ? 'right-0 w-32 sm:w-36' : 'right-0 w-40 sm:w-44'
        }`}
      >
        <JogWheel
          bpm={avgBpm}
          label={`${bpm[0]}`}
          sublabel={`${bpm[1]} BPM`}
          active={active}
          uid={`mix-${id}`}
        />
      </div>

      {/* Genre-generated flyer sleeve */}
      <div className="relative z-10 aspect-square w-full max-w-[13.5rem] overflow-hidden rounded-sm border border-line bg-surface shadow-lg">
        <svg viewBox="0 0 220 220" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={`sleeve-bg-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={motif.accent} stopOpacity="0.34" />
              <stop offset="55%" stopColor="var(--surface)" />
              <stop offset="100%" stopColor={motif.secondary} stopOpacity="0.32" />
            </linearGradient>
            <pattern id={`sleeve-dots-${id}`} width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="1" fill={motif.accent} opacity="0.35" />
            </pattern>
          </defs>

          <rect width="220" height="220" fill={`url(#sleeve-bg-${id})`} />
          <rect width="220" height="220" fill={`url(#sleeve-dots-${id})`} opacity="0.55" />

          {/* Genre-distinctive geometric flyer shapes */}
          {genre === 'house' && (
            <>
              <rect x="20" y="24" width="180" height="12" fill={motif.accent} opacity="0.85" />
              <rect x="20" y="44" width="132" height="6" fill={motif.secondary} opacity="0.8" />
              <circle cx="152" cy="140" r="54" fill="none" stroke={motif.accent} strokeWidth="3" />
              <circle cx="152" cy="140" r="34" fill="none" stroke={motif.secondary} strokeWidth="1.5" strokeDasharray="6 4" />
            </>
          )}
          {genre === 'disco' && (
            <>
              <circle cx="110" cy="110" r="68" fill="none" stroke={motif.accent} strokeWidth="2" />
              <path d="M110 34 V186 M34 110 H186 M56 56 L164 164 M164 56 L56 164" stroke={motif.secondary} strokeWidth="1.5" opacity="0.7" />
              <circle cx="110" cy="110" r="22" fill={motif.accent} opacity="0.3" />
            </>
          )}
          {genre === 'hiphop' && (
            <>
              <polygon points="18,196 110,36 202,196" fill="none" stroke={motif.accent} strokeWidth="3" />
              <polygon points="48,196 110,88 172,196" fill="none" stroke={motif.secondary} strokeWidth="2" />
              <rect x="24" y="24" width="60" height="10" fill={motif.secondary} />
            </>
          )}
          {genre === 'latin' && (
            <>
              <path d="M16 140 Q62 84 110 140 T204 140" fill="none" stroke={motif.accent} strokeWidth="4" />
              <path d="M16 162 Q62 106 110 162 T204 162" fill="none" stroke={motif.secondary} strokeWidth="2.5" />
              <circle cx="164" cy="60" r="26" fill={motif.secondary} opacity="0.35" />
            </>
          )}
          {genre === 'throwback' && (
            <>
              <rect x="22" y="30" width="176" height="96" rx="10" fill="none" stroke={motif.accent} strokeWidth="2.5" />
              <circle cx="76" cy="78" r="20" fill="none" stroke={motif.secondary} strokeWidth="2.5" />
              <circle cx="144" cy="78" r="20" fill="none" stroke={motif.secondary} strokeWidth="2.5" />
              <line x1="76" y1="78" x2="144" y2="78" stroke={motif.accent} strokeWidth="2" strokeDasharray="5 4" />
            </>
          )}
          {genre === 'wedding' && (
            <>
              <circle cx="88" cy="112" r="46" fill="none" stroke={motif.accent} strokeWidth="2.5" />
              <circle cx="132" cy="112" r="46" fill="none" stroke={motif.secondary} strokeWidth="2.5" />
              <line x1="20" y1="186" x2="200" y2="186" stroke={motif.accent} strokeWidth="2" />
            </>
          )}

          {/* Sleeve label strip */}
          <rect x="14" y="14" width="96" height="22" rx="2" fill="var(--bg)" opacity="0.88" />
          <text
            x="22"
            y="29"
            fill="var(--text)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em' }}
          >
            {motif.badge}
          </text>
          <rect x="14" y="176" width="192" height="30" rx="2" fill="var(--bg)" opacity="0.88" />
          <text
            x="22"
            y="195"
            fill="var(--text)"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 800 }}
          >
            {title.length > 22 ? `${title.slice(0, 21)}…` : title}
          </text>
        </svg>
      </div>
    </div>
  );
}
