export const MIX_GENRES = ['house', 'disco', 'hiphop', 'latin', 'throwback', 'wedding'] as const;
export type MixGenre = typeof MIX_GENRES[number];

export const MIX_GENRE_LABELS: Record<MixGenre, string> = {
  house: 'House',
  disco: 'Disco',
  hiphop: 'Hip-hop',
  latin: 'Latin',
  throwback: 'Throwback',
  wedding: 'Wedding',
};

export interface MixRecord {
  /** Stable, URL-safe unique identifier. */
  id: string;
  /** Mix title printed on the record sleeve. */
  title: string;
  /** Primary genre used for filtering and sleeve artwork. */
  genre: MixGenre;
  /** Tempo range [min, max] in BPM (60-180, min <= max). */
  bpm: [number, number];
  /** Whole-minute runtime. */
  minutes: number;
  /** Recording month in YYYY-MM format (newest first). */
  recorded: string;
  /** References an existing DJ id in content/djs.ts. */
  dj: string;
  /** Three genre-style tracklist notes (not real artist/track names). */
  highlights: [string, string, string];
  /** Optional external listening URL; blank prompts "Ask for the full mix". */
  listenUrl?: string;
}

/** Keep newest mixes at the top — the first item is highlighted as "Now playing". */
export const mixes: readonly MixRecord[] = [
  {
    id: 'pilsen-sunrise',
    title: 'Pilsen Sunrise',
    genre: 'house',
    bpm: [120, 124],
    minutes: 62,
    recorded: '2026-10',
    dj: 'nova',
    highlights: [
      'Deep Chicago organ chords over a crisp 909 clap',
      'Filtered vocal chop lifting into peak-hour acid bass',
      'Warm piano-house closer built for 2 a.m. hands up',
    ],
  },
  {
    id: 'mirrorball-mondays',
    title: 'Mirrorball Mondays',
    genre: 'disco',
    bpm: [112, 120],
    minutes: 58,
    recorded: '2026-09',
    dj: 'nova',
    highlights: [
      'Live-string boogie opener with slap-bass turnaround',
      'Extended percussion break into glossy French-touch edit',
      'Nu-disco handclap groove for cocktail-to-floor transitions',
    ],
  },
  {
    id: 'low-end-theory',
    title: 'Low End Theory',
    genre: 'hiphop',
    bpm: [88, 98],
    minutes: 45,
    recorded: '2026-08',
    dj: 'bell',
    highlights: [
      'Boom-bap brass loops cut with quick wordplay blends',
      'Midwest 2000s R&B slow-bounce into crisp trap drums',
      'Sub-heavy party flip designed for a packed late floor',
    ],
  },
  {
    id: 'first-dance-to-last-call',
    title: 'First Dance to Last Call',
    genre: 'wedding',
    bpm: [70, 128],
    minutes: 75,
    recorded: '2026-07',
    dj: 'okafor',
    highlights: [
      'Soul ballad opener warming into horn-section Motown',
      'Multi-generational singalong run through 80s and 90s pop',
      'High-energy house-remix sprint for the final forty minutes',
    ],
  },
  {
    id: 'cumbia-on-the-lake',
    title: 'Cumbia on the Lake',
    genre: 'latin',
    bpm: [95, 110],
    minutes: 50,
    recorded: '2026-06',
    dj: 'bell',
    highlights: [
      'Accordion-led cumbia rebajada easing the room onto the floor',
      'Dembow-driven reggaeton switch with horn stabs',
      'Brass-heavy salsa dura peak that keeps couples spinning',
    ],
  },
  {
    id: 'rewind-90s-00s',
    title: 'Rewind: 90s & 00s',
    genre: 'throwback',
    bpm: [96, 126],
    minutes: 60,
    recorded: '2026-05',
    dj: 'okafor',
    highlights: [
      'New-jack swing warm-up into glossy Y2K club hooks',
      'Indie-sleaze guitar-synth crossover for milestone parties',
      'Big-chorus 90s dance anthem finale with clean acapella drop',
    ],
  },
  {
    id: 'warehouse-hours',
    title: 'Warehouse Hours',
    genre: 'house',
    bpm: [124, 128],
    minutes: 90,
    recorded: '2026-03',
    dj: 'nova',
    highlights: [
      'Raw jacking drum-machine intro from the South Side tradition',
      'Hypnotic dub-techno tension building across three decks',
      'Driving peak-room acid roller for late club sets',
    ],
  },
];

export function formatRecorded(ym: string): string {
  const [year, month] = ym.split('-');
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const idx = Number(month) - 1;
  return idx >= 0 && idx < 12 ? `${names[idx]} ${year}` : ym;
}
