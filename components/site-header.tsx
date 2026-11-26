'use client';

import { useState } from 'react';
import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/packages/', label: 'Packages', ch: '01' },
  { href: '/gear/', label: 'Gear', ch: '02' },
  { href: '/mixes/', label: 'Mixes', ch: '03' },
] as const;

function BrandEmblem() {
  return (
    <svg
      viewBox="0 0 36 36"
      className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brand-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--magenta)" />
          <stop offset="52%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>
      {/* Solid dark/light deck housing */}
      <rect x="1" y="1" width="34" height="34" rx="9" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
      {/* Continuous bold pulse ring (crisp at small sizes) */}
      <circle cx="18" cy="18" r="11" fill="none" stroke="url(#brand-ring)" strokeWidth="3.2" />
      {/* Subtle inner platter groove */}
      <circle cx="18" cy="18" r="6.2" fill="none" stroke="var(--border)" strokeWidth="1" />
      {/* Center spindle pulse dot */}
      <circle cx="18" cy="18" r="3" fill="url(#brand-ring)" />
      {/* Cue indicator tick at 12 o'clock */}
      <circle cx="18" cy="5.2" r="1.4" fill="var(--amber)" />
    </svg>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="booth-band sticky top-0 z-40 border-t-0 backdrop-blur-md">
      <div className="wrap flex min-h-18 items-center justify-between gap-3 py-2.5">
        {/* Redesigned solid brand lockup — crisp at small sizes */}
        <SiteLink
          href="/"
          className="group flex shrink-0 items-center gap-2.5 no-underline hover:no-underline"
          aria-label={`${business.name} — Home`}
        >
          <BrandEmblem />
          <span className="flex flex-col leading-none">
            <span className="font-display flex items-center gap-1.5 whitespace-nowrap text-base tracking-tight uppercase sm:text-xl">
              <span className="text-ink">Midnight</span>
              <span className="pulse-text">Pulse</span>
            </span>
            <span className="mt-0.5 hidden items-center gap-1.5 font-tech text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted sm:inline-flex">
              <span className="header-bpm-dot h-1.5 w-1.5" aria-hidden="true" />
              <span>DJ · CHICAGO</span>
            </span>
          </span>
        </SiteLink>

        {/* Desktop channel buttons + primary action + deck power switch */}
        <nav aria-label="Main" className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map(item => (
            <SiteLink key={item.href} href={item.href} markCurrent="page" className="channel-btn">
              <span className="text-[0.68rem] opacity-65" aria-hidden="true">
                {item.ch}
              </span>
              {item.label}
            </SiteLink>
          ))}
          <SiteLink href="/contact/" markCurrent="page" className="button ml-1.5 px-4 py-2 text-sm">
            Check your date
          </SiteLink>
          <div
            className="ml-1 flex items-center rounded-md border border-line bg-bg px-1.5 py-1"
            title="House lights / Club dark mode"
          >
            <DarkModeToggle />
          </div>
        </nav>

        {/* Mobile bar: primary CTA + menu button */}
        <div className="flex shrink-0 items-center gap-1.5 md:hidden">
          <SiteLink href="/contact/" className="button min-h-9 whitespace-nowrap px-2.5 py-1.5 text-xs">
            Check date
          </SiteLink>
          <button
            type="button"
            className="channel-btn min-h-9 whitespace-nowrap px-2.5 text-xs"
            aria-expanded={menuOpen}
            aria-controls="mobile-channel-nav"
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile channel drawer */}
      {menuOpen ? (
        <nav
          id="mobile-channel-nav"
          aria-label="Mobile navigation"
          className="border-t border-line bg-surface px-4 py-4 md:hidden"
        >
          <div className="wrap flex flex-col gap-2">
            <SiteLink href="/" markCurrent="page" className="channel-btn justify-between" onClick={() => setMenuOpen(false)}>
              <span>Home</span>
              <span className="text-[0.68rem] opacity-65">DECK</span>
            </SiteLink>
            {NAV_ITEMS.map(item => (
              <SiteLink
                key={item.href}
                href={item.href}
                markCurrent="page"
                className="channel-btn justify-between"
                onClick={() => setMenuOpen(false)}
              >
                <span>{item.label}</span>
                <span className="text-[0.68rem] opacity-65">CH {item.ch}</span>
              </SiteLink>
            ))}
            <SiteLink
              href="/contact/"
              markCurrent="page"
              className="button mt-1 w-full justify-center"
              onClick={() => setMenuOpen(false)}
            >
              Check your date
            </SiteLink>
            <div className="mt-2 flex items-center justify-between border-t border-line pt-3">
              <span className="font-tech text-xs uppercase text-muted">House lights</span>
              <DarkModeToggle />
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
