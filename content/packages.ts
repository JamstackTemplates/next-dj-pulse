export const EVENT_TYPES = ['wedding', 'corporate', 'party', 'school', 'club'] as const;
export type EventType = typeof EVENT_TYPES[number];

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  wedding: 'Weddings',
  corporate: 'Corporate',
  party: 'Parties',
  school: 'School & Prom',
  club: 'Club',
};

export interface EventPackage {
  /** Stable, URL-safe unique identifier. */
  id: string;
  /** Package title shown on the backstage pass and schema OfferCatalog. */
  name: string;
  /** Event category used for filtering. */
  eventType: EventType;
  /** Whole hours of performance included in the base price (1-12). */
  hours: number;
  /** Starting price in whole USD (owner-editable). */
  priceFrom: number;
  /** Rate in whole USD per additional hour beyond included hours. */
  extraHour: number;
  /** Number of DJs included (1 or 2). */
  djs: 1 | 2;
  /** Concrete inclusions printed on the pass. */
  includes: string[];
  /** Exactly three packages are featured on the Home page teaser. */
  featured: boolean;
  /** Set to false to mark "Not taking new dates" without removing the package. */
  available: boolean;
}

export const packages: readonly EventPackage[] = [
  {
    id: 'wedding-full-night',
    name: 'Full Night Wedding',
    eventType: 'wedding',
    hours: 7,
    priceFrom: 2400,
    extraHour: 250,
    djs: 1,
    includes: [
      'Ceremony and cocktail-hour sound in a second room',
      'Wireless mics for vows and speeches',
      'MC and timeline announcements',
      '12 battery uplights',
      'Dance-floor wash lighting',
      'Two planning calls',
    ],
    featured: true,
    available: true,
  },
  {
    id: 'wedding-reception',
    name: 'Reception Only',
    eventType: 'wedding',
    hours: 4,
    priceFrom: 1650,
    extraHour: 250,
    djs: 1,
    includes: [
      'MC and grand-entrance cues',
      'Wireless mics for toasts',
      '8 battery uplights',
      'Dance-floor wash lighting',
      'One planning call',
    ],
    featured: false,
    available: true,
  },
  {
    id: 'corporate-launch',
    name: 'Launch & Corporate',
    eventType: 'corporate',
    hours: 4,
    priceFrom: 1800,
    extraHour: 275,
    djs: 1,
    includes: [
      'Presentation audio and lectern mic',
      'Branded gobo projection',
      'Walk-on stings for speakers',
      'Curated playlists for networking',
    ],
    featured: true,
    available: true,
  },
  {
    id: 'house-party',
    name: 'Milestone & House Party',
    eventType: 'party',
    hours: 4,
    priceFrom: 1150,
    extraHour: 200,
    djs: 1,
    includes: [
      'Compact PA system',
      'Party wash lighting',
      'Online guest request list',
    ],
    featured: true,
    available: true,
  },
  {
    id: 'school-dance',
    name: 'School Dance & Prom',
    eventType: 'school',
    hours: 4,
    priceFrom: 1300,
    extraHour: 200,
    djs: 1,
    includes: [
      'Clean edits only',
      'Booth request tablet',
      'Chaperone-friendly volume limiter',
    ],
    featured: false,
    available: true,
  },
  {
    id: 'afterhours-set',
    name: 'Afterhours Club Set',
    eventType: 'club',
    hours: 3,
    priceFrom: 900,
    extraHour: 225,
    djs: 1,
    includes: [
      "DJ only on the venue's rig",
      'Two-deck CDJ setup',
      'Redundant USB backups',
    ],
    featured: false,
    available: true,
  },
  {
    id: 'back-to-back',
    name: 'Back-to-Back Double Bill',
    eventType: 'party',
    hours: 5,
    priceFrom: 2900,
    extraHour: 400,
    djs: 2,
    includes: [
      'Two DJs trading sets live',
      'Large PA system',
      'Moving-head beam array',
      'Atmospheric haze (with venue permission)',
    ],
    featured: false,
    available: true,
  },
];

export function lowestPackagePrice(): number {
  return Math.min(...packages.map(pkg => pkg.priceFrom));
}
