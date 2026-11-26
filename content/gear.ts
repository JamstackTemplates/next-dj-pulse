export const GEAR_CATEGORIES = ['sound', 'lighting', 'effects', 'staging'] as const;
export type GearCategory = typeof GEAR_CATEGORIES[number];

export const GEAR_CATEGORY_LABELS: Record<GearCategory, { title: string; stencil: string; subtitle: string }> = {
  sound: {
    title: 'Sound',
    stencil: 'CASE 01 // AUDIO',
    subtitle: 'Active tops, subs and wireless mics for rooms up to 400 guests.',
  },
  lighting: {
    title: 'Lighting',
    stencil: 'CASE 02 // LX',
    subtitle: 'Wireless uplights, programmed moving heads and custom gobos.',
  },
  effects: {
    title: 'Effects',
    stencil: 'CASE 03 // FX',
    subtitle: 'Atmospherics and peak-moment accents, subject to venue clearance.',
  },
  staging: {
    title: 'Staging',
    stencil: 'CASE 04 // DECK & FLOOR',
    subtitle: 'Clean cable dressing and illuminated dance-floor surfaces.',
  },
};

export interface GearItem {
  /** Stable, URL-safe unique identifier. */
  id: string;
  /** Equipment name shown in the flight case slot and rig builder. */
  name: string;
  /** Flight-case group. */
  category: GearCategory;
  /** Single-line technical specification. */
  spec: string;
  /** Per-event add-on rate in whole USD. */
  price: number;
  /** False marks the item "Out for service" and disables it in the rig builder. */
  available: boolean;
  /** Optional venue clearance or servicing return note. */
  note?: string;
}

export const gear: readonly GearItem[] = [
  {
    id: 'pa-compact',
    name: 'Compact PA',
    category: 'sound',
    spec: '2 × 12" tops + 15" sub, up to 120 guests',
    price: 250,
    available: true,
  },
  {
    id: 'pa-large',
    name: 'Large PA',
    category: 'sound',
    spec: '4 × 12" tops + 2 × 18" subs, up to 400 guests',
    price: 550,
    available: true,
  },
  {
    id: 'wireless-mics',
    name: 'Wireless mic pair',
    category: 'sound',
    spec: '2 handhelds, speeches and toasts',
    price: 90,
    available: true,
  },
  {
    id: 'uplights-12',
    name: 'Uplighting × 12',
    category: 'lighting',
    spec: 'Battery LED, any colour',
    price: 300,
    available: true,
  },
  {
    id: 'moving-heads',
    name: 'Moving-head beams × 4',
    category: 'lighting',
    spec: 'Programmed to the set',
    price: 380,
    available: true,
  },
  {
    id: 'monogram-gobo',
    name: 'Custom gobo projection',
    category: 'lighting',
    spec: 'Names, logo or monogram',
    price: 180,
    available: true,
  },
  {
    id: 'haze',
    name: 'Haze machine',
    category: 'effects',
    spec: 'Needs venue permission',
    price: 120,
    available: true,
    note: 'Water-based haze; confirm smoke-detector clearance with your venue.',
  },
  {
    id: 'cold-sparks',
    name: 'Cold spark fountains × 2',
    category: 'effects',
    spec: 'First dance or walk-on',
    price: 450,
    available: false,
    note: 'Back in March after servicing',
  },
  {
    id: 'led-floor',
    name: 'LED dance floor 16 × 16 ft',
    category: 'staging',
    spec: 'Black-mirror finish',
    price: 1200,
    available: true,
  },
  {
    id: 'booth-facade',
    name: 'Mirror booth facade',
    category: 'staging',
    spec: 'Hides cables and cases',
    price: 150,
    available: true,
  },
];
