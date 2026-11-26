import type { ReactNode } from 'react';
import { VinylGrooveBackdrop, WaveformRule } from './art/dividers';

type PageHeadProps = {
  /** Monoton section numeral, e.g. "01"-"04". */
  numeral: string;
  /** Short tape label above the title. */
  eyebrow: string;
  /** Main H1 heading. */
  title: string;
  /** Lead paragraph or optional filter bar below the title. */
  children?: ReactNode;
};

/**
 * Flyer-style PageHead with halftone gradient, registration crop marks,
 * vinyl groove backdrop, big Monoton numeral, expanded Mona Sans heading and mirrored waveform rule.
 */
export function PageHead({ numeral, eyebrow, title, children }: PageHeadProps) {
  return (
    <section className="halftone-flyer pt-12 pb-6 sm:pt-16">
      <VinylGrooveBackdrop side="right" />
      <span className="flyer-crop-mark top-4 left-4 hidden sm:block" aria-hidden="true" />
      <span className="flyer-crop-mark top-4 right-4 hidden sm:block" aria-hidden="true" />
      <span className="flyer-crop-mark bottom-4 left-4 hidden sm:block" aria-hidden="true" />
      <span className="flyer-crop-mark bottom-4 right-4 hidden sm:block" aria-hidden="true" />

      <div className="wrap relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="gaffer-tape mb-4">{eyebrow}</p>
            <h1 className="font-display text-4xl text-ink sm:text-6xl">{title}</h1>
            {children ? <div className="mt-5 max-w-2xl text-base text-muted sm:text-lg">{children}</div> : null}
          </div>
          <span
            className="font-groove pulse-text select-none text-6xl leading-none opacity-85 sm:text-8xl"
            aria-hidden="true"
          >
            {numeral}
          </span>
        </div>
        <WaveformRule className="mt-8" />
      </div>
    </section>
  );
}
