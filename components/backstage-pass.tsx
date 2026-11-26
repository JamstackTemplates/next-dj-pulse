import { EVENT_TYPE_LABELS, type EventPackage } from '../content/packages';
import { formatUsd } from '../lib/estimate';
import { SiteLink } from './site-link';

type BackstagePassProps = {
  pkg: EventPackage;
  /** Optional slight tilt angle class for the hanging-lanyard Home teaser. */
  tiltClass?: string;
  /** Show the lanyard strap above the hole punch. */
  showLanyard?: boolean;
};

/**
 * Event package printed as a laminated backstage pass with lanyard punch hole,
 * holographic pulse gradient header strip, Monoton hour numeral and gaffer-tape footer.
 */
export function BackstagePass({ pkg, tiltClass = '', showLanyard = false }: BackstagePassProps) {
  return (
    <article
      id={pkg.id}
      className={`relative flex flex-col ${tiltClass}`}
    >
      {showLanyard ? (
        <div className="mx-auto flex flex-col items-center" aria-hidden="true">
          <div className="h-7 w-1.5 bg-gradient-to-b from-magenta via-primary to-cyan opacity-80" />
          <div className="h-3 w-6 rounded-t-sm border border-line bg-raised" />
        </div>
      ) : null}

      <div className="backstage-pass flex flex-1 flex-col">
        {/* Lanyard slot punch */}
        <div className="flex items-center justify-between border-b border-line bg-raised/70 px-5 py-3">
          <span className="font-tech text-[0.7rem] font-bold uppercase tracking-widest text-muted">
            ALL ACCESS // {EVENT_TYPE_LABELS[pkg.eventType]}
          </span>
          <span
            className="inline-block h-2.5 w-9 rounded-full border border-line bg-bg shadow-inner"
            aria-hidden="true"
          />
          <span className="font-tech text-[0.7rem] font-bold uppercase tracking-widest text-cyan">
            {pkg.djs === 2 ? '2 DJS' : '1 DJ'}
          </span>
        </div>

        {/* Unavailable gaffer-tape banner */}
        {!pkg.available ? (
          <div className="bg-magenta/15 px-5 py-2.5 border-b border-line">
            <span className="gaffer-tape gaffer-tape-amber">Not taking new dates</span>
          </div>
        ) : null}

        {/* Main pass body */}
        <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl text-ink">{pkg.name}</h3>
              <p className="mt-1.5 font-tech text-xs uppercase tracking-wider text-muted">
                From <span className="text-lg font-bold text-ink">{formatUsd(pkg.priceFrom)}</span>
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span className="font-groove pulse-text block text-4xl leading-none sm:text-5xl">
                {pkg.hours}
              </span>
              <span className="font-tech text-[0.68rem] uppercase tracking-widest text-muted">
                HRS INC.
              </span>
            </div>
          </div>

          <ul className="space-y-2 border-t border-dashed border-line pt-4 text-sm text-muted">
            {pkg.includes.map(line => (
              <li key={line} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-magenta" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <span className="gaffer-tape text-[0.72rem]">
              +{formatUsd(pkg.extraHour)} / extra hr
            </span>
            <SiteLink
              href="/contact/"
              className="font-tech text-xs font-bold uppercase tracking-wider text-primary-ink hover:text-magenta"
            >
              Enquire →
            </SiteLink>
          </div>
        </div>
      </div>
    </article>
  );
}
