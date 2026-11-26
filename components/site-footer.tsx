import { business } from '../content/business';
import { WaveformRule } from './art/dividers';
import { PulseIcon } from './art/icons';
import { BookingLineBadge } from './booking-line-badge';
import { SiteLink } from './site-link';

export function SiteFooter() {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="floor-band border-t border-line pt-10">
      <div className="wrap relative z-10">
        <WaveformRule className="mb-10" />

        <div className="grid gap-10 pb-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <p className="gaffer-tape">Chicago Mobile DJ &amp; Production</p>
            <p className="max-w-md text-sm text-muted">{business.serviceArea}</p>
            <div className="pt-1">
              <BookingLineBadge hours={business.bookingHours} />
            </div>
          </div>

          <div className="space-y-3 md:col-span-4">
            <h2 className="font-tech text-xs font-bold uppercase tracking-widest text-muted">
              Booking line
            </h2>
            <p className="font-tech text-sm text-ink">
              Mon–Fri 11:00–19:00 · Sat 12:00–16:00 · Sun closed (CT)
            </p>
            <ul className="space-y-2 pt-1 font-tech text-sm">
              <li>
                <a className="inline-flex items-center gap-2 text-link" href={`mailto:${business.email}`}>
                  <PulseIcon name="mail" className="h-4 w-4 text-magenta" />
                  <span>{business.email}</span>
                </a>
              </li>
              {business.phone ? (
                <li>
                  <a className="inline-flex items-center gap-2 text-link" href={telHref}>
                    <PulseIcon name="phone" className="h-4 w-4 text-cyan" />
                    <span>{business.phone}</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="space-y-3 md:col-span-3">
            <h2 className="font-tech text-xs font-bold uppercase tracking-widest text-muted">
              Channels
            </h2>
            <ul className="grid grid-cols-2 gap-2 font-tech text-sm md:grid-cols-1">
              <li><SiteLink href="/" className="text-ink hover:text-cyan">Home</SiteLink></li>
              <li><SiteLink href="/packages/" className="text-ink hover:text-cyan">Packages</SiteLink></li>
              <li><SiteLink href="/gear/" className="text-ink hover:text-cyan">Gear</SiteLink></li>
              <li><SiteLink href="/mixes/" className="text-ink hover:text-cyan">Mixes</SiteLink></li>
              <li><SiteLink href="/contact/" className="text-primary-ink hover:text-magenta">Check your date</SiteLink></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-4 font-tech text-xs text-muted">
          <p>{business.name} · Chicagoland</p>
          <span title="Made with love by jamstacks.net">
            with <span role="img" aria-label="love">❤️</span>{' '}
            <a className="no-underline hover:text-primary-ink hover:underline" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </span>
        </div>
      </div>

      {/* Huge cropped Monoton wordmark bleeding off the bottom edge */}
      <div
        className="pointer-events-none relative z-10 overflow-hidden select-none pt-2"
        aria-hidden="true"
      >
        <p className="font-groove pulse-text -mb-3 whitespace-nowrap text-center text-[clamp(2.2rem,8.8vw,8.4rem)] leading-[0.84] tracking-wider opacity-85 sm:-mb-6">
          MIDNIGHT PULSE
        </p>
      </div>
    </footer>
  );
}
