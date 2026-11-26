import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { bookingLineStatus, DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => (day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' }));
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))), /Tuesday/);
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))), /Tuesday/);
});

const chicago = (iso: string) => bookingLineStatus(business.bookingHours, 'America/Chicago', new Date(iso));

test('Midnight Pulse booking-line weekday boundaries in America/Chicago (10:59, 11:00, 18:59, 19:00)', () => {
  // Wednesday 2026-01-14 is CST (UTC-6)
  assert.deepEqual(chicago('2026-01-14T16:59:00Z'), {
    open: false,
    known: true,
    label: 'Lines closed · back today 11am',
  });
  assert.deepEqual(chicago('2026-01-14T17:00:00Z'), {
    open: true,
    known: true,
    label: 'Lines open now · until 7pm',
  });
  assert.deepEqual(chicago('2026-01-15T00:59:00Z'), {
    open: true,
    known: true,
    label: 'Lines open now · until 7pm',
  });
  assert.deepEqual(chicago('2026-01-15T01:00:00Z'), {
    open: false,
    known: true,
    label: 'Lines closed · back Thursday 11am',
  });
});

test('Midnight Pulse booking-line Saturday 12:00-16:00 and Sunday closed', () => {
  // Saturday 2026-01-17 CST (UTC-6): 12:00 = 18:00Z, 16:00 = 22:00Z
  assert.equal(chicago('2026-01-17T17:59:00Z').label, 'Lines closed · back today 12pm');
  assert.equal(chicago('2026-01-17T18:00:00Z').label, 'Lines open now · until 4pm');
  assert.equal(chicago('2026-01-17T21:59:00Z').label, 'Lines open now · until 4pm');
  assert.equal(chicago('2026-01-17T22:00:00Z').label, 'Lines closed · back Monday 11am');
  // Sunday 2026-01-18 closed all day
  assert.equal(chicago('2026-01-18T19:00:00Z').open, false);
  assert.equal(chicago('2026-01-18T19:00:00Z').label, 'Lines closed · back Monday 11am');
});

test('Midnight Pulse booking-line respects March and November Chicago DST transitions', () => {
  // March 2026 DST starts Sunday 2026-03-08 (UTC-6 -> UTC-5)
  // Saturday 2026-03-07 (CST, UTC-6): 12:00 = 18:00Z
  assert.equal(chicago('2026-03-07T17:59:00Z').open, false);
  assert.equal(chicago('2026-03-07T18:00:00Z').open, true);
  // Monday 2026-03-09 (CDT, UTC-5): 11:00 = 16:00Z, 19:00 = 2026-03-10T00:00Z
  assert.equal(chicago('2026-03-09T15:59:00Z').label, 'Lines closed · back today 11am');
  assert.equal(chicago('2026-03-09T16:00:00Z').label, 'Lines open now · until 7pm');
  assert.equal(chicago('2026-03-09T23:59:00Z').open, true);
  assert.equal(chicago('2026-03-10T00:00:00Z').open, false);

  // November 2026 DST ends Sunday 2026-11-01 (UTC-5 -> UTC-6)
  // Saturday 2026-10-31 (CDT, UTC-5): 12:00 = 17:00Z
  assert.equal(chicago('2026-10-31T16:59:00Z').open, false);
  assert.equal(chicago('2026-10-31T17:00:00Z').open, true);
  // Monday 2026-11-02 (CST, UTC-6): 11:00 = 17:00Z, 19:00 = 2026-11-03T01:00Z
  assert.equal(chicago('2026-11-02T16:59:00Z').label, 'Lines closed · back today 11am');
  assert.equal(chicago('2026-11-02T17:00:00Z').label, 'Lines open now · until 7pm');
  assert.equal(chicago('2026-11-03T00:59:00Z').open, true);
  assert.equal(chicago('2026-11-03T01:00:00Z').open, false);
});
