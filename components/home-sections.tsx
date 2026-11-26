import type { ReactNode } from 'react';
import { business } from '../content/business';
import { djs } from '../content/djs';
import { formatRecorded, MIX_GENRE_LABELS, mixes } from '../content/mixes';
import { lowestPackagePrice, packages } from '../content/packages';
import { formatUsd } from '../lib/estimate';
import {
  ChicagoSkylineWatermark,
  EqualizerDivider,
  RackRailBorder,
  SoundwaveBorder,
  VinylGrooveBackdrop,
} from './art/dividers';
import { HeroScene } from './art/hero-scene';
import { PulseIcon } from './art/icons';
import { RecordSleeve } from './art/record-sleeve';
import { BackstagePass } from './backstage-pass';
import { BookingLineBadge } from './booking-line-badge';
import { SiteLink } from './site-link';

type Children = { children: ReactNode };

/* --------------------------------------------------------------------------
   1. Hero (Floor band — asymmetric scene with jog wheel, skyline & crowd)
   -------------------------------------------------------------------------- */

function HeroRoot({ children }: Children) {
  return (
    <section className="floor-band relative pt-8 pb-0 sm:pt-12 lg:pt-14">
      <div className="spotlight-beams" aria-hidden="true" />
      <VinylGrooveBackdrop side="left" />
      <div className="wrap relative z-10 grid items-center gap-8 pb-8 lg:grid-cols-12 lg:gap-6 lg:pb-12">
        <div className="order-1 space-y-5 lg:col-span-5">{children}</div>
        <div className="order-2 lg:col-span-7">
          <HeroScene />
        </div>
      </div>
      <SoundwaveBorder className="relative z-10 -mb-px" />
    </section>
  );
}

function HeroTape({ children }: Children) {
  return (
    <p className="gaffer-tape gaffer-tape-magenta -rotate-1 text-[0.68rem] sm:text-xs">
      <span>{children}</span>
      <span className="opacity-90">· from {formatUsd(lowestPackagePrice())}</span>
    </p>
  );
}

function HeroHeading({ children }: Children) {
  return (
    <h1 className="font-display text-4xl tracking-tight text-ink sm:text-6xl lg:text-[4.35rem]">
      {children}
    </h1>
  );
}

function HeroLead({ children }: Children) {
  return <p className="max-w-xl text-base text-muted sm:text-lg">{children}</p>;
}

function HeroActions({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-1">
      <SiteLink href="/contact/" className="button px-6 py-3 text-base">
        {primary}
      </SiteLink>
      <SiteLink href="/packages/" className="button button-quiet px-5 py-3 text-base">
        {secondary}
      </SiteLink>
    </div>
  );
}

export const HomeHero = Object.assign(HeroRoot, {
  Tape: HeroTape,
  Heading: HeroHeading,
  Lead: HeroLead,
  Actions: HeroActions,
});

/* --------------------------------------------------------------------------
   2. Tonight's line-up (Booth band — festival flyer bill, decreasing scale)
   -------------------------------------------------------------------------- */

const BILL_SIZES = [
  'text-3xl sm:text-6xl lg:text-7xl',
  'text-2xl sm:text-5xl lg:text-6xl',
  'text-xl sm:text-4xl lg:text-5xl',
];

export function LineupSection({ eyebrow, heading, note }: { eyebrow: string; heading: string; note: string }) {
  return (
    <section className="booth-band py-16 sm:py-24" aria-labelledby="lineup-heading">
      <div className="wrap relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="gaffer-tape mb-3">{eyebrow}</p>
            <h2 id="lineup-heading" className="font-display text-3xl text-ink sm:text-5xl">
              {heading}
            </h2>
          </div>
          <p className="max-w-sm font-tech text-xs uppercase tracking-wider text-muted">{note}</p>
        </div>

        <ol className="mt-8 divide-y divide-line">
          {djs.map((dj, index) => (
            <li
              key={dj.id}
              className="flex flex-col gap-3 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:py-8"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-tech pulse-text text-lg font-bold tracking-widest sm:text-2xl" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className={`font-display uppercase tracking-tight text-ink ${BILL_SIZES[index] ?? BILL_SIZES[2]}`}>
                  {dj.name}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                <span className="inline-flex items-center gap-2 font-tech text-xs font-bold uppercase tracking-widest text-cyan">
                  <PulseIcon name="headphones" className="h-4 w-4 text-magenta" />
                  {dj.plays.join(' · ')}
                </span>
                <span className="font-tech text-xs text-muted">SINCE {dj.since}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   3. Packages teaser (Floor band — hanging laminated passes + EQ divider)
   -------------------------------------------------------------------------- */

const PASS_TILTS = ['lg:-rotate-1', 'lg:translate-y-4', 'lg:rotate-1'];

export function PackagesTeaser({
  eyebrow,
  heading,
  lead,
  ctaLabel,
}: {
  eyebrow: string;
  heading: string;
  lead: string;
  ctaLabel: string;
}) {
  const featured = packages.filter(pkg => pkg.featured);

  return (
    <section className="floor-band pb-20 sm:pb-28" aria-labelledby="packages-teaser-heading">
      <EqualizerDivider className="relative z-10 -mt-1" />
      <VinylGrooveBackdrop side="right" />
      <div className="wrap relative z-10 pt-10 sm:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="gaffer-tape mb-3">{eyebrow}</p>
            <h2 id="packages-teaser-heading" className="font-display text-3xl text-ink sm:text-5xl">
              {heading}
            </h2>
            <p className="mt-3 text-muted">{lead}</p>
          </div>
          <SiteLink href="/packages/" className="channel-btn">
            {ctaLabel} →
          </SiteLink>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3 lg:gap-7">
          {featured.map((pkg, i) => (
            <BackstagePass key={pkg.id} pkg={pkg} showLanyard tiltClass={PASS_TILTS[i] ?? ''} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   4. How a night runs (Booth band — 5-channel mixer strip, rising faders)
   -------------------------------------------------------------------------- */

export interface NightStep {
  numeral: string;
  title: string;
  detail: string;
  level: number;
}

export function RunOfShow({
  eyebrow,
  heading,
  steps,
}: {
  eyebrow: string;
  heading: string;
  steps: readonly NightStep[];
}) {
  return (
    <section className="booth-band border-y-0" aria-labelledby="run-of-show-heading">
      <RackRailBorder label="MASTER CONSOLE // 5-CHANNEL RUN OF SHOW" />
      <div className="wrap relative z-10 py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="gaffer-tape mb-3">{eyebrow}</p>
          <h2 id="run-of-show-heading" className="font-display text-3xl text-ink sm:text-5xl">
            {heading}
          </h2>
        </div>

        {/* Desktop: 5 vertical mixer channels; Mobile: stacked horizontal faders */}
        <ol className="mt-10 grid gap-4 lg:grid-cols-5">
          {steps.map(step => (
            <li key={step.numeral} className="booth-panel flex flex-col justify-between p-5">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-groove pulse-text text-3xl leading-none">{step.numeral}</span>
                  {/* EQ knob motif */}
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-line bg-bg"
                    aria-hidden="true"
                  >
                    <span className="h-2.5 w-0.5 -translate-y-1 rotate-12 rounded-full bg-cyan" />
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.detail}</p>
              </div>

              {/* Vertical fader on desktop, horizontal bar on mobile */}
              <div className="mt-6" aria-hidden="true">
                {/* Mobile horizontal fader */}
                <div className="relative h-4 w-full rounded-full border border-line bg-bg lg:hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${step.level}%`,
                      background: 'var(--pulse-gradient)',
                    }}
                  />
                  <span
                    className="absolute top-1/2 h-5 w-3 -translate-y-1/2 rounded-sm border border-cyan bg-raised"
                    style={{ left: `calc(${step.level}% - 6px)` }}
                  />
                </div>

                {/* Desktop vertical fader track */}
                <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-2">
                  <div className="relative h-28 w-3 rounded-full border border-line bg-bg">
                    <div
                      className="absolute inset-x-0 bottom-0 rounded-full"
                      style={{
                        height: `${step.level}%`,
                        background: 'var(--pulse-gradient)',
                      }}
                    />
                    <span
                      className="absolute left-1/2 h-3.5 w-8 -translate-x-1/2 rounded-sm border border-cyan bg-raised shadow"
                      style={{ bottom: `calc(${step.level}% - 7px)` }}
                    />
                  </div>
                  <span className="font-tech text-[0.65rem] uppercase tracking-widest text-muted">
                    CH {step.numeral} · {step.level}%
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <RackRailBorder label="AUX SEND // BACKUP RIG ON STANDBY" />
    </section>
  );
}

/* --------------------------------------------------------------------------
   5. Mixes teaser (Floor band — 3 newest records in staggered diagonal row)
   -------------------------------------------------------------------------- */

const RECORD_OFFSETS = ['lg:mt-0', 'lg:mt-8', 'lg:mt-16'];

export function MixesTeaser({
  eyebrow,
  heading,
  lead,
  ctaLabel,
}: {
  eyebrow: string;
  heading: string;
  lead: string;
  ctaLabel: string;
}) {
  const latest = mixes.slice(0, 3);

  return (
    <section className="floor-band py-16 sm:py-24" aria-labelledby="mixes-teaser-heading">
      <VinylGrooveBackdrop side="left" />
      <div className="wrap relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="gaffer-tape mb-3">{eyebrow}</p>
            <h2 id="mixes-teaser-heading" className="font-display text-3xl text-ink sm:text-5xl">
              {heading}
            </h2>
            <p className="mt-3 text-muted">{lead}</p>
          </div>
          <SiteLink href="/mixes/" className="channel-btn">
            {ctaLabel} →
          </SiteLink>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {latest.map((mix, index) => {
            const dj = djs.find(d => d.id === mix.dj);
            return (
              <article key={mix.id} className={`mix-record group flex flex-col gap-4 ${RECORD_OFFSETS[index] ?? ''}`}>
                <RecordSleeve
                  id={`home-${mix.id}`}
                  title={mix.title}
                  genre={mix.genre}
                  bpm={mix.bpm}
                  compact
                />
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 font-tech text-xs uppercase text-cyan">
                    <span>{MIX_GENRE_LABELS[mix.genre]}</span>
                    <span className="text-muted">·</span>
                    <span>{mix.bpm[0]}–{mix.bpm[1]} BPM</span>
                    <span className="text-muted">·</span>
                    <span>{mix.minutes} MIN</span>
                  </div>
                  <h3 className="font-display text-2xl text-ink">{mix.title}</h3>
                  <p className="font-tech text-xs text-muted">
                    {dj ? dj.name : mix.dj} · {formatRecorded(mix.recorded)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   6. Reviews (Booth band — oversized Monoton quotes in 2-col offset layout)
   -------------------------------------------------------------------------- */

export interface ClientQuote {
  quote: string;
  author: string;
  event: string;
}

export function ReviewsSection({
  eyebrow,
  heading,
  quotes,
}: {
  eyebrow: string;
  heading: string;
  quotes: readonly ClientQuote[];
}) {
  return (
    <section className="booth-band py-16 sm:py-24" aria-labelledby="reviews-heading">
      <div className="wrap relative z-10">
        <p className="gaffer-tape mb-3">{eyebrow}</p>
        <h2 id="reviews-heading" className="font-display text-3xl text-ink sm:text-5xl">
          {heading}
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {quotes.map((item, idx) => (
            <figure
              key={item.author}
              className={`relative border-l-2 border-magenta pl-6 ${
                idx === 1 ? 'md:mt-12' : idx === 2 ? 'md:col-span-2 md:max-w-2xl md:ml-auto' : ''
              }`}
            >
              <span
                className="font-groove pulse-text block text-5xl leading-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 text-lg font-medium text-ink sm:text-xl">
                {item.quote}
              </blockquote>
              <figcaption className="mt-4 flex flex-wrap items-center gap-3">
                <span className="gaffer-tape">{item.author}</span>
                <span className="font-tech text-xs uppercase tracking-wider text-muted">
                  {item.event}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   7. Closing Call (Full-bleed pulse gradient)
   -------------------------------------------------------------------------- */

export function ClosingCall({
  heading,
  note,
  ctaLabel,
}: {
  heading: string;
  note: string;
  ctaLabel: string;
}) {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <section className="pulse-closing pt-16 pb-0 sm:pt-24" aria-labelledby="closing-heading">
      <div className="spotlight-beams" aria-hidden="true" />
      <div className="wrap relative z-10 grid items-center gap-8 pb-12 lg:grid-cols-12 lg:pb-16">
        <div className="space-y-4 lg:col-span-7">
          <BookingLineBadge hours={business.bookingHours} />
          <h2 id="closing-heading" className="font-display text-3xl text-ink sm:text-5xl">
            {heading}
          </h2>
          <p className="max-w-xl text-base text-ink/85">{note}</p>
        </div>

        <div className="space-y-4 lg:col-span-5 lg:text-right">
          <div className="space-y-1.5 font-tech">
            <p className="text-xl font-bold text-ink sm:text-2xl">
              <a className="hover:text-cyan" href={telHref}>
                {business.phone}
              </a>
            </p>
            <p className="text-base font-semibold text-ink sm:text-lg">
              <a className="break-all hover:text-cyan" href={`mailto:${business.email}`}>
                {business.email}
              </a>
            </p>
            <p className="text-xs uppercase tracking-wider text-ink/80">
              Mon–Fri 11:00–19:00 · Sat 12:00–16:00 · Sun closed (CT)
            </p>
          </div>
          <div className="pt-2">
            <SiteLink href="/contact/" className="button px-7 py-3.5 text-base">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>
      </div>
      <ChicagoSkylineWatermark className="relative z-10 -mt-4 h-20 sm:h-28" />
    </section>
  );
}
