import type { Metadata } from 'next';
import { RackRailBorder, VinylGrooveBackdrop } from '../../components/art/dividers';
import { PulseIcon, type IconName } from '../../components/art/icons';
import { PackagesWall } from '../../components/packages-wall';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { packages } from '../../content/packages';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Packages',
  description:
    'Chicago DJ packages from $900 for weddings, corporate events, house parties, school dances and club sets, with clear extra-hour rates.',
  alternates: { canonical: absoluteUrl('/packages/') },
};

const EVERY_PACKAGE_INCLUDES: readonly { icon: IconName; label: string; detail: string }[] = [
  { icon: 'clock', label: 'Two-hour load-in', detail: 'Setup and soundcheck finished before doors open, never billed as play time.' },
  { icon: 'speaker', label: 'Redundant backups', detail: 'Spare mixer, USB drives and backup controller ride in every van.' },
  { icon: 'tape', label: 'Clean cable dressing', detail: 'All runs gaffer-taped flat and hidden behind the booth.' },
  { icon: 'map-pin', label: '60-mile Loop radius', detail: 'Chicago and nearby suburbs included; beyond 60 miles quoted up front.' },
];

const PACKAGE_FAQ: readonly { question: string; answer: string }[] = [
  {
    question: 'How do deposits and date holds work?',
    answer:
      "Sending an enquiry does not lock a date or take payment. We'll reply with availability and a written quote; any deposit and payment schedule are arranged in writing after you confirm you want to go ahead.",
  },
  {
    question: 'Does setup and teardown count toward my included hours?',
    answer:
      'No. Included hours cover live music and MC time only. We arrive two hours before doors for load-in and soundcheck, and pack down after the last track at no extra hourly charge.',
  },
  {
    question: 'What power does our venue need?',
    answer:
      'One dedicated 120V / 20A circuit within 50 feet of the DJ booth covers all standard sound and lighting packages. Large PA plus LED dance floor setups need a second separate circuit.',
  },
  {
    question: 'Can guests make song requests?',
    answer:
      'Yes, if you want them. During planning we agree whether requests are open, filtered through your do-not-play list, or turned off completely.',
  },
  {
    question: 'Do you play clean radio edits for schools and family crowds?',
    answer:
      'Yes. School Dance & Prom packages run strictly clean edits by default, and we can keep any wedding or corporate set family-friendly until late night.',
  },
  {
    question: 'Do you travel outside Chicago?',
    answer:
      'Events within 60 miles of the Chicago Loop are included in the listed package prices. For venues farther out in Illinois, Wisconsin or Indiana, we include a clear flat travel line in our written quote.',
  },
];

export default function PackagesPage() {
  return (
    <>
      <PageHead numeral="01" eyebrow="CH 01 // EVENT PACKAGES" title="Packages printed like backstage passes">
        <p>
          Pick the room size and night length you need. Every package lists its included hours,
          starting price and extra-hour rate — filter by event type below or enquire for a custom
          run of show.
        </p>
      </PageHead>

      <section className="floor-band py-14 sm:py-20" aria-label="Event packages list">
        <VinylGrooveBackdrop side="left" />
        <div className="wrap relative z-10">
          <PackagesWall items={packages} />
        </div>
      </section>

      {/* What every package includes: horizontal setlist strip */}
      <section className="booth-band border-y-0" aria-labelledby="included-heading">
        <RackRailBorder label="STANDARD RIDER // EVERY SHOW" />
        <div className="wrap relative z-10 py-14 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="gaffer-tape mb-3">STANDARD SETLIST</p>
              <h2 id="included-heading" className="font-display text-3xl text-ink sm:text-4xl">
                What every package includes
              </h2>
            </div>
            <SiteLink href="/gear/" className="channel-btn">
              Need extra sound or lighting? →
            </SiteLink>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EVERY_PACKAGE_INCLUDES.map(item => (
              <li key={item.label} className="booth-panel p-5">
                <PulseIcon name={item.icon} className="h-6 w-6 text-cyan" />
                <h3 className="mt-3 font-display text-lg text-ink">{item.label}</h3>
                <p className="mt-1.5 text-sm text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <RackRailBorder label="FAQ // BOOTH NOTES" />
      </section>

      {/* FAQ as a gaffer-taped setlist with expandable <details> rows */}
      <section className="floor-band py-14 sm:py-20" aria-labelledby="faq-heading">
        <VinylGrooveBackdrop side="right" />
        <div className="wrap relative z-10 max-w-4xl">
          <p className="gaffer-tape mb-3">BOOTH NOTES // FAQ</p>
          <h2 id="faq-heading" className="font-display text-3xl text-ink sm:text-4xl">
            Common questions before you enquire
          </h2>

          <div className="faq-setlist mt-8 border-t border-line">
            {PACKAGE_FAQ.map(item => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <div className="pb-5 pl-6 text-sm text-muted sm:text-base">{item.answer}</div>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-surface p-6">
            <div>
              <p className="font-display text-xl text-ink">Ready to check your date?</p>
              <p className="mt-1 text-sm text-muted">
                We&apos;ll reply with availability and a written quote; your date is held only once
                you&apos;ve confirmed in writing.
              </p>
            </div>
            <SiteLink href="/contact/" className="button">
              Check your date
            </SiteLink>
          </div>
        </div>
      </section>
    </>
  );
}
