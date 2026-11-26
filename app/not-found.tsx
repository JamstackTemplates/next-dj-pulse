import { ScratchedRecord } from '../components/art/scratched-record';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="floor-band py-16 sm:py-24">
      <div className="wrap relative z-10 text-center">
        <ScratchedRecord />
        <p className="gaffer-tape gaffer-tape-magenta mx-auto mt-6">ERR 404 // TRACK MISSING</p>
        <h1 className="mt-4 font-display text-4xl text-ink sm:text-6xl">Needle skipped.</h1>
        <p className="mx-auto mt-4 max-w-md text-base text-muted">
          That page isn&apos;t in the crate. Drop the needle back on the home deck, browse our
          packages, or send a date enquiry.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <SiteLink href="/" className="button">
            Cue Home
          </SiteLink>
          <SiteLink href="/packages/" className="channel-btn">
            Cue Packages
          </SiteLink>
          <SiteLink href="/contact/" className="channel-btn">
            Cue Contact
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
