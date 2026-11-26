'use client';

import { useEffect, useState } from 'react';
import { EVENT_TYPES, EVENT_TYPE_LABELS, type EventPackage, type EventType } from '../content/packages';
import { BackstagePass } from './backstage-pass';

type FilterValue = 'all' | EventType;

function isEventType(value: string): value is EventType {
  return (EVENT_TYPES as readonly string[]).includes(value);
}

/**
 * Interactive event-type filter + uneven backstage-pass wall.
 * Without JavaScript, all packages render and the filter bar stays hidden.
 */
export function PackagesWall({ items }: { items: readonly EventPackage[] }) {
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<FilterValue>('all');

  useEffect(() => {
    setHydrated(true);
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (isEventType(hash)) setFilter(hash);
      else if (hash === 'all' || hash === '') setFilter('all');
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  function selectFilter(next: FilterValue) {
    setFilter(next);
    if (typeof window !== 'undefined') {
      const url = next === 'all' ? window.location.pathname : `${window.location.pathname}#${next}`;
      window.history.replaceState(null, '', url);
    }
  }

  const visible = filter === 'all' ? items : items.filter(pkg => pkg.eventType === filter);

  return (
    <div>
      {hydrated ? (
        <div
          role="group"
          aria-label="Filter packages by event type"
          className="no-print mb-10 flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            className="channel-btn"
            aria-pressed={filter === 'all'}
            onClick={() => selectFilter('all')}
          >
            All ({items.length})
          </button>
          {EVENT_TYPES.map(type => {
            const count = items.filter(pkg => pkg.eventType === type).length;
            return (
              <button
                key={type}
                type="button"
                className="channel-btn"
                aria-pressed={filter === type}
                onClick={() => selectFilter(type)}
              >
                {EVENT_TYPE_LABELS[type]} ({count})
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((pkg, idx) => (
          <BackstagePass
            key={pkg.id}
            pkg={pkg}
            showLanyard
            tiltClass={idx % 3 === 1 ? 'lg:mt-6' : idx % 3 === 2 ? 'lg:mt-2' : ''}
          />
        ))}
      </div>
    </div>
  );
}
