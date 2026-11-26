'use client';

import { useEffect, useRef, useState } from 'react';
import {
  GEAR_CATEGORIES,
  GEAR_CATEGORY_LABELS,
  type GearCategory,
  type GearItem,
} from '../content/gear';
import type { EventPackage } from '../content/packages';
import { calculateRigEstimate, formatRigSummary, formatUsd } from '../lib/estimate';
import { PulseIcon, type IconName } from './art/icons';
import { SiteLink } from './site-link';

const ITEM_ICONS: Record<string, IconName> = {
  'pa-compact': 'speaker',
  'pa-large': 'speaker',
  'wireless-mics': 'mic',
  'uplights-12': 'uplight',
  'moving-heads': 'moving-head',
  'monogram-gobo': 'uplight',
  haze: 'haze',
  'cold-sparks': 'spark',
  'led-floor': 'dance-floor',
  'booth-facade': 'tape',
};

const CATEGORY_FALLBACK_ICON: Record<GearCategory, IconName> = {
  sound: 'speaker',
  lighting: 'uplight',
  effects: 'spark',
  staging: 'dance-floor',
};

export function GearRackAndBuilder({
  gearItems,
  packageItems,
}: {
  gearItems: readonly GearItem[];
  packageItems: readonly EventPackage[];
}) {
  const [hydrated, setHydrated] = useState(false);
  const [selectedPkgId, setSelectedPkgId] = useState<string>(packageItems[0]?.id ?? '');
  const [selectedGearIds, setSelectedGearIds] = useState<string[]>([]);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setHydrated(true);
    return () => clearTimeout(timerRef.current);
  }, []);

  const selectedPkg = packageItems.find(p => p.id === selectedPkgId) ?? null;
  const estimate = calculateRigEstimate(selectedPkg, selectedGearIds, gearItems);
  const summaryText = formatRigSummary(estimate);

  function toggleGear(item: GearItem) {
    if (!item.available) return;
    setSelectedGearIds(prev =>
      prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id],
    );
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopyState('idle'), 4500);
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-12">
      {/* Left: Four open road flight cases */}
      <div className="space-y-8 lg:col-span-7">
        {GEAR_CATEGORIES.map(category => {
          const meta = GEAR_CATEGORY_LABELS[category];
          const items = gearItems.filter(item => item.category === category);
          return (
            <section
              key={category}
              aria-labelledby={`case-${category}`}
              className="flight-case p-5 sm:p-6"
            >
              {/* Stencilled case lid header */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/15 pb-4">
                <div>
                  <p className="font-tech text-xs font-bold uppercase tracking-widest text-cyan">
                    {meta.stencil}
                  </p>
                  <h2 id={`case-${category}`} className="mt-1 font-display text-2xl sm:text-3xl">
                    {meta.title}
                  </h2>
                </div>
                <p className="max-w-xs text-xs text-[var(--case-muted)]">{meta.subtitle}</p>
              </div>

              {/* Foam-cut gear slots */}
              <ul className="mt-4 space-y-3">
                {items.map(item => {
                  const icon = ITEM_ICONS[item.id] ?? CATEGORY_FALLBACK_ICON[item.category];
                  const checked = selectedGearIds.includes(item.id);
                  return (
                    <li key={item.id} className="flight-case-slot p-4">
                      <div className="flex flex-wrap items-start justify-between gap-4 sm:flex-nowrap">
                        <div className="flex min-w-0 flex-1 items-start gap-3.5">
                          <span className="mt-0.5 rounded-md border border-white/15 bg-white/5 p-2 text-cyan">
                            <PulseIcon name={icon} className="h-5 w-5" />
                          </span>
                          <div>
                            <div className="flex flex-wrap items-center gap-2.5">
                              <h3 className="font-display text-lg text-[var(--case-ink)]">{item.name}</h3>
                              <span className="inline-flex items-center gap-1.5 font-tech text-[0.7rem] uppercase tracking-wider">
                                <span
                                  className={`h-2 w-2 rounded-full ${
                                    item.available ? 'bg-cyan' : 'bg-amber'
                                  }`}
                                  aria-hidden="true"
                                />
                                <span className={item.available ? 'text-cyan' : 'text-amber'}>
                                  {item.available ? 'In the case' : 'Out for service'}
                                </span>
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-[var(--case-muted)]">{item.spec}</p>
                            {item.note ? (
                              <p className="mt-1.5 font-tech text-xs text-amber">{item.note}</p>
                            ) : null}
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-3 self-center">
                          <span className="font-tech text-base font-bold text-[var(--case-ink)]">
                            {formatUsd(item.price)}
                          </span>
                          {hydrated ? (
                            <label
                              className={`no-print inline-flex items-center gap-2 rounded border px-2.5 py-1.5 font-tech text-xs uppercase ${
                                item.available
                                  ? checked
                                    ? 'cursor-pointer border-cyan bg-primary text-on-primary'
                                    : 'cursor-pointer border-white/25 bg-white/5 text-[var(--case-ink)] hover:border-cyan'
                                  : 'cursor-not-allowed border-white/10 bg-white/5 text-[var(--case-muted)] opacity-55'
                              }`}
                            >
                              <input
                                type="checkbox"
                                className="sr-only"
                                disabled={!item.available}
                                checked={item.available && checked}
                                onChange={() => toggleGear(item)}
                              />
                              <span>{!item.available ? 'Unavailable' : checked ? 'Added' : 'Add'}</span>
                            </label>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Right: Sticky Mixer Console Rig Estimate */}
      <aside
        aria-labelledby="rig-builder-heading"
        className="booth-panel p-6 lg:sticky lg:top-24 lg:col-span-5"
      >
        <span className="booth-screw top-3 left-3" aria-hidden="true" />
        <span className="booth-screw top-3 right-3" aria-hidden="true" />
        <span className="booth-screw bottom-3 left-3" aria-hidden="true" />
        <span className="booth-screw bottom-3 right-3" aria-hidden="true" />

        <p className="gaffer-tape mb-3">RIG CONSOLE // ESTIMATE ONLY</p>
        <h2 id="rig-builder-heading" className="font-display text-2xl text-ink sm:text-3xl">
          Build-your-rig estimate
        </h2>
        <p className="mt-2 text-sm text-muted">
          Pair a package with available add-on gear for a rough starting figure. Final pricing is
          always confirmed in writing after we check your room and date.
        </p>

        {hydrated ? (
          <div className="no-print mt-5 space-y-5">
            <div>
              <label
                htmlFor="rig-package-select"
                className="block font-tech text-xs font-bold uppercase tracking-wider text-muted"
              >
                Base package
              </label>
              <select
                id="rig-package-select"
                value={selectedPkgId}
                onChange={e => setSelectedPkgId(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-line bg-bg px-3 py-2.5 font-sans text-sm text-ink"
              >
                <option value="">Add-on gear only (no base package)</option>
                {packageItems.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} ({pkg.hours} hrs) — from {formatUsd(pkg.priceFrom)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 border-y border-dashed border-line py-4">
              <p className="font-tech text-xs font-bold uppercase tracking-wider text-muted">
                Selected add-ons ({estimate.selectedGear.length})
              </p>
              {estimate.selectedGear.length === 0 ? (
                <p className="text-sm text-muted">
                  Tick any &ldquo;In the case&rdquo; item on the left to add it to your rig.
                </p>
              ) : (
                <ul className="space-y-1.5 text-sm">
                  {estimate.selectedGear.map(item => (
                    <li key={item.id} className="flex items-center justify-between gap-2">
                      <span className="text-ink">{item.name}</span>
                      <span className="font-tech text-cyan">{formatUsd(item.price)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-baseline justify-between gap-4">
              <span className="font-tech text-xs uppercase tracking-widest text-muted">
                Illustrative total
              </span>
              <div className="text-right">
                <span className="font-groove pulse-text text-4xl leading-none">
                  {formatUsd(estimate.total)}
                </span>
                <p className="mt-1 font-tech text-[0.7rem] uppercase text-muted">
                  From · estimate only
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button type="button" className="button button-quiet text-sm" onClick={copySummary}>
                Copy summary
              </button>
              <SiteLink href="/contact/" className="button text-sm">
                Check your date
              </SiteLink>
            </div>

            <p className="min-h-5 font-tech text-xs text-cyan" role="status" aria-live="polite">
              {copyState === 'copied'
                ? 'Estimate copied — paste it into your enquiry message on Contact.'
                : copyState === 'failed'
                  ? 'Could not copy automatically — copy the text below instead.'
                  : ''}
            </p>

            {copyState === 'failed' ? (
              <pre className="overflow-x-auto rounded border border-line bg-bg p-3 font-tech text-xs text-muted">
                {summaryText}
              </pre>
            ) : null}
          </div>
        ) : (
          <div className="mt-5 rounded-md border border-line bg-bg p-4 text-sm text-muted">
            <p>
              List the package and add-on gear you want in your message on the{' '}
              <SiteLink href="/contact/" className="text-link">
                Contact page
              </SiteLink>{' '}
              and we will send a written quote.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
