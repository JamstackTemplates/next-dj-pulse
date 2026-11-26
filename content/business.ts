import type { OpeningHours } from '../lib/hours.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by the page and fallback metadata. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public booking-line phone number; blank hides it. */
  phone: string;
  /** Geographic coverage description (no public showroom/address). */
  serviceArea: string;
  /** Standard included travel radius in miles from the Chicago Loop. */
  travelRadiusMiles: number;
  /** Booking-line hours (phone and email replies, not event end times). */
  bookingHours: readonly OpeningHours[];
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment or delivery promises. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: string[];
  };
}

export const business: Business = {
  name: 'Midnight Pulse DJ',
  tagline: 'Your floor. Full till the last track.',
  introduction:
    'Chicago mobile DJs with sound, lighting and effects for weddings, corporate events and parties. Event packages from $900, add-on gear and free mixes to preview our sound.',
  email: 'hello@midnightpulsedj.com',
  phone: '(312) 555-0143',
  serviceArea: 'Chicago and suburbs within 60 miles of the Loop (travel fee beyond 60 miles quoted in our reply).',
  travelRadiusMiles: 60,
  bookingHours: [
    { day: 'Monday', opens: '11:00', closes: '19:00' },
    { day: 'Tuesday', opens: '11:00', closes: '19:00' },
    { day: 'Wednesday', opens: '11:00', closes: '19:00' },
    { day: 'Thursday', opens: '11:00', closes: '19:00' },
    { day: 'Friday', opens: '11:00', closes: '19:00' },
    { day: 'Saturday', opens: '12:00', closes: '16:00' },
    { day: 'Sunday' },
  ],
  enquiries: {
    title: 'Check your date',
    introduction:
      "Send your event details for a date check and written quote. We'll reply with availability and a written quote; your date is held only once you've confirmed in writing.",
    usefulToInclude: [
      'Event date and approximate start/finish times',
      'Event type (wedding, corporate, house party, school dance or club set)',
      'Venue name and Chicago neighbourhood or suburb',
      'Rough guest count',
      'Package or add-on gear you are interested in (or paste your rig estimate)',
      'Any must-play tracks or do-not-play rules',
    ],
  },
};
