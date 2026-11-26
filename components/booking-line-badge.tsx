'use client';

import { useEffect, useState } from 'react';
import { bookingLineStatus, type HoursStatus, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

const STATIC_FALLBACK: HoursStatus = {
  open: false,
  known: false,
  label: 'Booking line · Mon–Fri 11am–7pm, Sat 12pm–4pm CT',
};

/**
 * Displays live Chicago booking-line status in the browser, refreshed every minute.
 * Static/no-JS HTML renders neutral booking-line hours.
 */
export function BookingLineBadge({
  hours,
  className = '',
}: {
  hours: readonly OpeningHours[];
  className?: string;
}) {
  const [status, setStatus] = useState<HoursStatus>(STATIC_FALLBACK);

  useEffect(() => {
    const update = () => setStatus(bookingLineStatus(hours, site.timeZone || 'America/Chicago'));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const dotColor = !status.known ? 'bg-primary' : status.open ? 'bg-cyan' : 'bg-amber';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-tech text-xs font-semibold text-ink ${className}`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor}`} aria-hidden="true" />
      <span>{status.label}</span>
    </span>
  );
}
