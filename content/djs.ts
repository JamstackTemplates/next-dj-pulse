export interface DjProfile {
  /** Stable, URL-safe unique identifier referenced by mixes. */
  id: string;
  /** Performer stage or full name. */
  name: string;
  /** Primary genres or room styles this DJ plays. */
  plays: string[];
  /** Year the DJ started playing Chicago rooms. */
  since: number;
  /** Concise one-sentence profile. */
  bio: string;
}

export const djs: readonly DjProfile[] = [
  {
    id: 'nova',
    name: 'Nova Reyes',
    plays: ['House', 'Disco'],
    since: 2014,
    bio: 'Resident at late-night afterhours sets across Pilsen and the West Loop, mixing classic Chicago house with warm disco edits.',
  },
  {
    id: 'bell',
    name: 'Marcus "Low End" Bell',
    plays: ['Hip-hop', 'R&B', 'Latin'],
    since: 2011,
    bio: 'Club selector and sharp corporate MC who keeps keynote cues tight and moves seamlessly from hip-hop to cumbia.',
  },
  {
    id: 'okafor',
    name: 'Kit Okafor',
    plays: ['Weddings', 'Throwbacks'],
    since: 2017,
    bio: 'Reads a room of three generations with ease, threading 90s singalongs, Motown staples and peak-hour club anthems.',
  },
];

export function djById(id: string): DjProfile | undefined {
  return djs.find(dj => dj.id === id);
}
