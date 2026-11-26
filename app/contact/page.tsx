import type { Metadata } from 'next';
import { ChicagoServiceRing } from '../../components/art/chicago-ring';
import { VinylGrooveBackdrop } from '../../components/art/dividers';
import { PulseIcon } from '../../components/art/icons';
import { BookingLineBadge } from '../../components/booking-line-badge';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { format12Hour } from '../../lib/hours';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <>
      <PageHead numeral="04" eyebrow="CH 04 // DATE & QUOTE ENQUIRY" title={business.enquiries.title}>
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <section className="floor-band py-14 sm:py-20">
        <VinylGrooveBackdrop side="right" />
        <div className="wrap relative z-10 grid items-start gap-10 lg:grid-cols-12">
          {/* Left: Booth panel hosting the Jamstacks form (or visible email fallback) */}
          <div className="booth-panel p-6 sm:p-8 lg:col-span-7" aria-label="Enquiry form">
            <span className="booth-screw top-3 left-3" aria-hidden="true" />
            <span className="booth-screw top-3 right-3" aria-hidden="true" />
            <span className="booth-screw bottom-3 left-3" aria-hidden="true" />
            <span className="booth-screw bottom-3 right-3" aria-hidden="true" />

            <p className="gaffer-tape mb-4">DIRECT BOOTH LINE</p>
            {hosted ? (
              <JamstacksSupportForm
                siteId={site.jamstacksSite}
                embedUrl={site.jamstacksEmbedUrl}
                email={business.email}
              />
            ) : (
              <div className="space-y-4 rounded-md border border-line bg-bg p-6">
                <h2 className="font-display text-2xl text-ink">Write to us directly</h2>
                <p className="text-sm text-muted">
                  The hosted enquiry form is not connected on this preview. Send your event details
                  straight to{' '}
                  <a className="text-link font-tech" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>{' '}
                  or call{' '}
                  <a className="text-link font-tech" href={telHref}>
                    {business.phone}
                  </a>{' '}
                  during booking-line hours.
                </p>
              </div>
            )}

            {/* What happens next */}
            <div className="mt-8 border-t border-dashed border-line pt-6">
              <h2 className="font-display text-xl text-ink">What happens next</h2>
              <ol className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="font-tech font-bold text-magenta">01</span>
                  <span>
                    We check our roster and gear lock-up and reply within one working day during
                    booking-line hours.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-tech font-bold text-primary-ink">02</span>
                  <span>
                    You receive availability, a written quote with any add-ons or travel clearly
                    itemised, and a link to schedule a quick planning call.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-tech font-bold text-cyan">03</span>
                  <span>
                    Your date is held only once you&apos;ve confirmed in writing — sending an
                    enquiry never locks a date or charges anything.
                  </span>
                </li>
              </ol>
            </div>
          </div>

          {/* Right: Always-visible contact details, what to include, hours & Chicagoland ring */}
          <aside aria-label="Booking-line details" className="space-y-8 lg:col-span-5">
            {/* Always-visible email & phone */}
            <div className="booth-panel space-y-4 p-6">
              <BookingLineBadge hours={business.bookingHours} />
              <div className="space-y-2.5 pt-1">
                <p className="font-tech text-xs font-bold uppercase tracking-widest text-muted">
                  Email &amp; phone
                </p>
                <p className="font-tech text-base font-bold">
                  <a
                    className="inline-flex items-center gap-2 text-link break-all"
                    href={`mailto:${business.email}`}
                  >
                    <PulseIcon name="mail" className="h-4 w-4 text-magenta" />
                    <span>{business.email}</span>
                  </a>
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <CopyEmail email={business.email} />
                </div>
                {business.phone ? (
                  <p className="pt-1 font-tech text-base font-bold">
                    <a className="inline-flex items-center gap-2 text-link" href={telHref}>
                      <PulseIcon name="phone" className="h-4 w-4 text-cyan" />
                      <span>{business.phone}</span>
                    </a>
                  </p>
                ) : null}
              </div>

              {/* Booking-line hours */}
              <div className="border-t border-line pt-4">
                <h2 className="font-tech text-xs font-bold uppercase tracking-widest text-muted">
                  Booking-line hours (Central Time)
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Phone and email reply hours — events run into the night as scheduled.
                </p>
                <dl className="mt-3 space-y-1 font-tech text-xs">
                  {business.bookingHours.map(entry => (
                    <div key={entry.day} className="flex justify-between gap-4">
                      <dt className="text-muted">{entry.day}</dt>
                      <dd className="text-ink">
                        {entry.opens && entry.closes
                          ? `${format12Hour(entry.opens)} – ${format12Hour(entry.closes)}`
                          : 'Closed'}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Numbered setlist: What to include */}
            <div className="rider-sheet p-6">
              <p className="gaffer-tape mb-3">WHAT TO INCLUDE</p>
              <h2 className="font-display text-xl text-ink">Help us quote fast</h2>
              <ol className="mt-4 space-y-2.5 text-sm text-muted">
                {business.enquiries.usefulToInclude.map((tip, index) => (
                  <li key={tip} className="flex gap-3">
                    <span className="font-tech text-xs font-bold text-cyan">0{index + 1}</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Chicagoland 20 / 40 / 60 mile service ring */}
            <div className="space-y-3">
              <p className="font-tech text-xs font-bold uppercase tracking-widest text-muted">
                Service area · no public showroom
              </p>
              <ChicagoServiceRing />
              <p className="text-xs text-muted">
                {business.serviceArea} Equipment is kept in a private Chicago lock-up, not open to
                walk-in visitors.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
