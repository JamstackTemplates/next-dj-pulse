import type { Metadata } from 'next';
import {
  ClosingCall,
  HomeHero,
  LineupSection,
  MixesTeaser,
  PackagesTeaser,
  ReviewsSection,
  RunOfShow,
  type ClientQuote,
  type NightStep,
} from '../components/home-sections';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

const NIGHT_STEPS: readonly NightStep[] = [
  {
    numeral: '01',
    title: 'Enquire',
    detail: 'Send your date, venue and rough headcount. We reply with availability and a written quote.',
    level: 22,
  },
  {
    numeral: '02',
    title: 'Planning call',
    detail: 'Walk through your timeline, announcements, speeches and the room acoustics with your DJ.',
    level: 40,
  },
  {
    numeral: '03',
    title: 'Must-play & do-not-play',
    detail: 'Share your non-negotiables, family favourites and hard-no tracks before the week of the show.',
    level: 58,
  },
  {
    numeral: '04',
    title: 'Load-in 2 hrs early',
    detail: 'We arrive two hours before doors, dress every cable, sound-check mics and focus the floor wash.',
    level: 78,
  },
  {
    numeral: '05',
    title: 'Last track',
    detail: 'Live mixing all night with backup decks on standby until the house lights come up.',
    level: 96,
  },
];

const CLIENT_QUOTES: readonly ClientQuote[] = [
  {
    quote:
      'Kit kept my seventy-year-old uncle and our college friends on the floor together until midnight without a single cheesy transition.',
    author: 'Maya',
    event: 'West Loop wedding · June',
  },
  {
    quote:
      'Marcus nailed every speaker walk-on cue during our product launch, then flipped the loft into a proper Chicago house set the minute the bar opened.',
    author: 'Devon',
    event: 'Fulton Market launch · October',
  },
  {
    quote:
      'Nova brought a compact rig that sounded huge in our backyard tent and never once tripped the house breaker. Best 40th we could have asked for.',
    author: 'Elena',
    event: 'Logan Square milestone party · August',
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero>
        <HomeHero.Tape>Chicago DJs · Sound · Lighting</HomeHero.Tape>
        <HomeHero.Heading>
          Your floor. <span className="pulse-text">Full till the last track.</span>
        </HomeHero.Heading>
        <HomeHero.Lead>
          Three working Chicago DJs with full sound, lighting and effects rigs for weddings,
          corporate launches, milestone parties, school dances and afterhours club sets.
        </HomeHero.Lead>
        <HomeHero.Actions primary="Check your date" secondary="See packages" />
      </HomeHero>

      <LineupSection
        eyebrow="Tonight's line-up"
        heading="Three resident selectors. Zero canned playlists."
        note="Every show is mixed live on club-standard CDJs with full backup gear in the booth."
      />

      <PackagesTeaser
        eyebrow="Event packages"
        heading="Backstage passes for every room size"
        lead="Transparent starting prices, included hours and clear extra-hour rates — no hidden setup surcharges inside 60 miles of the Loop."
        ctaLabel="All packages"
      />

      <RunOfShow eyebrow="How a night runs" heading="Five channels from first message to last track" steps={NIGHT_STEPS} />

      <MixesTeaser
        eyebrow="Fresh out of the crate"
        heading="Preview the sound before you enquire"
        lead="Recorded live on our booth rig — hover or focus any record to spin its BPM ring."
        ctaLabel="Hear more mixes"
      />

      <ReviewsSection eyebrow="Floor reports" heading="What Chicagoland hosts say" quotes={CLIENT_QUOTES} />

      <ClosingCall
        heading="Dates go fast in June and December"
        note="Send your event date and venue for a fast availability check and written quote. Your date is held only once you've confirmed in writing."
        ctaLabel="Check your date"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
