'use client';

import { useEffect, useState } from 'react';
import type { DjProfile } from '../content/djs';
import {
  formatRecorded,
  MIX_GENRES,
  MIX_GENRE_LABELS,
  type MixGenre,
  type MixRecord,
} from '../content/mixes';
import { RecordSleeve } from './art/record-sleeve';
import { SiteLink } from './site-link';

type GenreFilter = 'all' | MixGenre;

function isMixGenre(value: string): value is MixGenre {
  return (MIX_GENRES as readonly string[]).includes(value);
}

/**
 * Filterable crate of mixes: newest mix featured as "Now playing" when visible,
 * remaining mixes rendered as vinyl records sliding from genre-generated sleeves.
 * Without JS, all mixes show and the filter buttons stay hidden.
 */
export function MixesCrate({
  mixItems,
  djItems,
}: {
  mixItems: readonly MixRecord[];
  djItems: readonly DjProfile[];
}) {
  const [hydrated, setHydrated] = useState(false);
  const [genre, setGenre] = useState<GenreFilter>('all');

  useEffect(() => {
    setHydrated(true);
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (isMixGenre(hash)) setGenre(hash);
      else if (hash === 'all' || hash === '') setGenre('all');
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  function selectGenre(next: GenreFilter) {
    setGenre(next);
    if (typeof window !== 'undefined') {
      const url = next === 'all' ? window.location.pathname : `${window.location.pathname}#${next}`;
      window.history.replaceState(null, '', url);
    }
  }

  const visible = genre === 'all' ? mixItems : mixItems.filter(m => m.genre === genre);
  const featured = genre === 'all' ? visible[0] : null;
  const crate = featured ? visible.slice(1) : visible;

  const findDj = (id: string) => djItems.find(d => d.id === id);

  return (
    <div>
      {hydrated ? (
        <div
          role="group"
          aria-label="Filter mixes by genre"
          className="no-print mb-10 flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            className="channel-btn"
            aria-pressed={genre === 'all'}
            onClick={() => selectGenre('all')}
          >
            All ({mixItems.length})
          </button>
          {MIX_GENRES.map(g => {
            const count = mixItems.filter(m => m.genre === g).length;
            return (
              <button
                key={g}
                type="button"
                className="channel-btn"
                aria-pressed={genre === g}
                onClick={() => selectGenre(g)}
              >
                {MIX_GENRE_LABELS[g]} ({count})
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Newest mix highlighted larger as "Now playing" */}
      {featured ? (
        <article className="mix-record booth-panel group mb-12 grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <RecordSleeve
              id={`now-${featured.id}`}
              title={featured.title}
              genre={featured.genre}
              bpm={featured.bpm}
              active
            />
          </div>
          <div className="space-y-4 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="gaffer-tape gaffer-tape-magenta">Now playing</span>
              <span className="font-tech text-xs font-bold uppercase tracking-widest text-cyan">
                {MIX_GENRE_LABELS[featured.genre]} · {featured.bpm[0]}–{featured.bpm[1]} BPM · {featured.minutes} MIN
              </span>
            </div>
            <h2 className="font-display text-3xl text-ink sm:text-5xl">{featured.title}</h2>
            <p className="font-tech text-sm text-muted">
              Mixed by {findDj(featured.dj)?.name ?? featured.dj} · Recorded {formatRecorded(featured.recorded)}
            </p>
            <ul className="space-y-2 border-t border-dashed border-line pt-4 text-sm text-muted">
              {featured.highlights.map(note => (
                <li key={note} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              {featured.listenUrl ? (
                <a
                  href={featured.listenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button text-sm"
                >
                  Listen to full mix ↗
                </a>
              ) : (
                <SiteLink href="/contact/" className="button text-sm">
                  Ask for the full mix
                </SiteLink>
              )}
            </div>
          </div>
        </article>
      ) : null}

      {/* Crate of records */}
      <div className="grid gap-10 md:grid-cols-2">
        {crate.map(mix => {
          const dj = findDj(mix.dj);
          return (
            <article
              key={mix.id}
              className="mix-record group flex flex-col gap-5 border-b border-line pb-8"
            >
              <div className="grid items-center gap-6 sm:grid-cols-12">
                <div className="sm:col-span-6">
                  <RecordSleeve
                    id={mix.id}
                    title={mix.title}
                    genre={mix.genre}
                    bpm={mix.bpm}
                    compact
                  />
                </div>
                <div className="space-y-2 sm:col-span-6">
                  <p className="font-tech text-xs font-bold uppercase tracking-widest text-cyan">
                    {MIX_GENRE_LABELS[mix.genre]} · {mix.bpm[0]}–{mix.bpm[1]} BPM
                  </p>
                  <h2 className="font-display text-2xl text-ink">{mix.title}</h2>
                  <p className="font-tech text-xs text-muted">
                    {dj ? dj.name : mix.dj} · {mix.minutes} min · {formatRecorded(mix.recorded)}
                  </p>
                  <div className="pt-2">
                    {mix.listenUrl ? (
                      <a
                        href={mix.listenUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-tech text-xs font-bold uppercase tracking-wider text-primary-ink hover:text-magenta"
                      >
                        Listen ↗
                      </a>
                    ) : (
                      <SiteLink
                        href="/contact/"
                        className="font-tech text-xs font-bold uppercase tracking-wider text-primary-ink hover:text-magenta"
                      >
                        Ask for the full mix →
                      </SiteLink>
                    )}
                  </div>
                </div>
              </div>

              <ul className="space-y-1.5 pl-1 text-sm text-muted">
                {mix.highlights.map(note => (
                  <li key={note} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-magenta" aria-hidden="true" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
