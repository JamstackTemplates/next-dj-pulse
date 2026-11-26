import type { Metadata } from 'next';
import { RackRailBorder, VinylGrooveBackdrop } from '../../components/art/dividers';
import { PulseIcon } from '../../components/art/icons';
import { MixesCrate } from '../../components/mixes-crate';
import { PageHead } from '../../components/page-head';
import { djs } from '../../content/djs';
import { mixes } from '../../content/mixes';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Mixes',
  description:
    'Preview live-recorded Chicago DJ mixes across house, disco, hip-hop, Latin, throwbacks and weddings, plus meet our three resident DJs.',
  alternates: { canonical: absoluteUrl('/mixes/') },
};

export default function MixesPage() {
  return (
    <>
      <PageHead numeral="03" eyebrow="CH 03 // MIX ARCHIVE" title="Dig through the crate">
        <p>
          Recorded live in one take on our booth decks — no studio quantizing or pre-made playlists.
          Filter by genre and hover or focus any record to spin its BPM ring.
        </p>
      </PageHead>

      <section className="floor-band py-14 sm:py-20" aria-label="Mix archive">
        <VinylGrooveBackdrop side="left" />
        <div className="wrap relative z-10">
          <MixesCrate mixItems={mixes} djItems={djs} />
        </div>
      </section>

      {/* DJ profiles as three backstage-crew laminates */}
      <section className="booth-band border-y-0" aria-labelledby="crew-heading">
        <RackRailBorder label="RESIDENT ROSTER // BACKSTAGE LAMINATES" />
        <div className="wrap relative z-10 py-14 sm:py-20">
          <p className="gaffer-tape mb-3">RESIDENT CREW LAMINATES</p>
          <h2 id="crew-heading" className="font-display text-3xl text-ink sm:text-5xl">
            Meet the selectors behind the decks
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {djs.map(dj => (
              <article key={dj.id} className="backstage-pass flex flex-col">
                <div className="flex items-center justify-between border-b border-line bg-raised/70 px-5 py-3">
                  <span className="font-tech text-[0.7rem] font-bold uppercase tracking-widest text-cyan">
                    CREW // {dj.id.toUpperCase()}
                  </span>
                  <span className="inline-block h-2.5 w-8 rounded-full border border-line bg-bg" aria-hidden="true" />
                  <span className="font-tech text-[0.7rem] uppercase text-muted">CHI</span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl text-ink">{dj.name}</h3>
                    <span className="font-tech text-sm font-bold tracking-widest text-cyan">EST. {dj.since}</span>
                  </div>
                  <p className="inline-flex items-center gap-2 font-tech text-xs font-bold uppercase tracking-widest text-magenta">
                    <PulseIcon name="headphones" className="h-4 w-4" />
                    {dj.plays.join(' · ')}
                  </p>
                  <p className="text-sm text-muted">{dj.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
