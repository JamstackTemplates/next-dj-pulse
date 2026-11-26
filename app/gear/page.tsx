import type { Metadata } from 'next';
import { RackRailBorder, VinylGrooveBackdrop } from '../../components/art/dividers';
import { PageHead } from '../../components/page-head';
import { GearRackAndBuilder } from '../../components/rig-builder';
import { gear } from '../../content/gear';
import { packages } from '../../content/packages';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Gear',
  description:
    'Add-on PA systems, wireless mics, uplighting, moving heads, haze and LED dance floors for Chicago events, plus a build-your-rig estimate.',
  alternates: { canonical: absoluteUrl('/gear/') },
};

const VENUE_RIDER_NOTES: readonly { code: string; title: string; detail: string }[] = [
  {
    code: 'PWR-01',
    title: 'Power requirements',
    detail:
      'One dedicated 120V / 20A circuit within 50 ft of the booth for PA and lighting. Add a second independent circuit when pairing the Large PA with the 16 × 16 ft LED dance floor.',
  },
  {
    code: 'FX-02',
    title: 'Haze & cold spark permissions',
    detail:
      'Both haze and cold spark fountains require written venue sign-off in advance. Check with your venue coordinator about optical smoke detectors and ceiling height before adding effects.',
  },
  {
    code: 'LD-03',
    title: 'Load-in & elevator access',
    detail:
      'We load in two hours before doors using rolling flight cases. Let us know about freight elevators, dock hours, stairs or parking permits so we schedule extra crew time if needed.',
  },
];

export default function GearPage() {
  return (
    <>
      <PageHead numeral="02" eyebrow="CH 02 // FLIGHT CASES & RIG" title="Add-on sound, lighting and staging">
        <p>
          Every item below travels in our own road cases — maintained in-house and priced per event.
          Tick available items to build an illustrative rig estimate you can paste into your
          enquiry.
        </p>
      </PageHead>

      <section className="floor-band py-14 sm:py-20" aria-label="Gear flight cases and rig estimator">
        <VinylGrooveBackdrop side="left" />
        <div className="wrap relative z-10">
          <GearRackAndBuilder gearItems={gear} packageItems={packages} />
        </div>
      </section>

      {/* Venue notes as a printed rider sheet */}
      <section className="booth-band border-y-0" aria-labelledby="rider-heading">
        <RackRailBorder label="TECHNICAL RIDER // LOAD-IN & POWER" />
        <div className="wrap relative z-10 py-14 sm:py-20">
          <div className="rider-sheet p-6 sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-dashed border-line pb-5">
              <div>
                <p className="font-tech text-xs font-bold uppercase tracking-widest text-magenta">
                  TECHNICAL RIDER // VENUE CHECKLIST
                </p>
                <h2 id="rider-heading" className="mt-1 font-display text-3xl text-ink sm:text-4xl">
                  Venue notes before load-in
                </h2>
              </div>
              <span className="font-tech text-xs uppercase text-muted">
                MIDNIGHT PULSE DJ · CHICAGO
              </span>
            </div>

            <dl className="mt-6 grid gap-6 md:grid-cols-3">
              {VENUE_RIDER_NOTES.map(note => (
                <div key={note.code} className="space-y-2">
                  <dt className="flex items-center gap-2">
                    <span className="gaffer-tape text-[0.7rem]">{note.code}</span>
                    <span className="font-display text-lg text-ink">{note.title}</span>
                  </dt>
                  <dd className="text-sm text-muted">{note.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
