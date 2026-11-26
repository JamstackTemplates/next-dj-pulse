import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { djs } from '../content/djs.ts';
import { gear } from '../content/gear.ts';
import { mixes } from '../content/mixes.ts';
import { packages } from '../content/packages.ts';
import { validateHours } from '../lib/hours.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const YYYY_MM = /^\d{4}-(0[1-9]|1[0-2])$/;

function assertUniqueUrlSafeIds(label: string, items: readonly { id: string }[]) {
  const seen = new Set<string>();
  for (const item of items) {
    assert.match(item.id, URL_SAFE_ID, `${label}[${item.id}]: id must be URL-safe lowercase kebab-case`);
    assert.ok(!seen.has(item.id), `${label}[${item.id}]: duplicate id`);
    seen.add(item.id);
  }
}

test('business content has actionable required fields and valid booking-line hours', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'serviceArea'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length > 0, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
  assert.doesNotThrow(() => validateHours(business.bookingHours));
});

test('packages have unique URL-safe IDs, valid prices, hours, DJ counts and exactly 3 featured', () => {
  assertUniqueUrlSafeIds('packages', packages);
  for (const pkg of packages) {
    assert.ok(pkg.name.trim(), `packages[${pkg.id}]: name required`);
    assert.ok(Number.isInteger(pkg.priceFrom) && pkg.priceFrom > 0, `packages[${pkg.id}]: priceFrom must be positive whole USD`);
    assert.ok(Number.isInteger(pkg.extraHour) && pkg.extraHour > 0, `packages[${pkg.id}]: extraHour must be positive whole USD`);
    assert.ok(Number.isInteger(pkg.hours) && pkg.hours >= 1 && pkg.hours <= 12, `packages[${pkg.id}]: hours must be integer 1-12`);
    assert.ok(pkg.djs === 1 || pkg.djs === 2, `packages[${pkg.id}]: djs must be 1 or 2`);
    assert.ok(pkg.includes.length > 0, `packages[${pkg.id}]: includes must not be empty`);
  }
  const featured = packages.filter(p => p.featured);
  assert.equal(featured.length, 3, `packages: expected exactly 3 featured packages, found ${featured.length}`);
});

test('gear items have unique URL-safe IDs, specs and positive whole USD prices', () => {
  assertUniqueUrlSafeIds('gear', gear);
  for (const item of gear) {
    assert.ok(item.name.trim(), `gear[${item.id}]: name required`);
    assert.ok(item.spec.trim(), `gear[${item.id}]: spec required`);
    assert.ok(Number.isInteger(item.price) && item.price > 0, `gear[${item.id}]: price must be positive whole USD`);
  }
});

test('DJs have unique URL-safe IDs, genres and bios', () => {
  assertUniqueUrlSafeIds('djs', djs);
  for (const dj of djs) {
    assert.ok(dj.name.trim(), `djs[${dj.id}]: name required`);
    assert.ok(dj.plays.length > 0, `djs[${dj.id}]: plays required`);
    assert.ok(Number.isInteger(dj.since) && dj.since >= 1980 && dj.since <= 2030, `djs[${dj.id}]: valid since year required`);
    assert.ok(dj.bio.trim(), `djs[${dj.id}]: bio required`);
  }
});

test('mixes have unique URL-safe IDs, valid BPM ranges, YYYY-MM dates and valid DJ references', () => {
  assertUniqueUrlSafeIds('mixes', mixes);
  const djIds = new Set(djs.map(d => d.id));
  for (const mix of mixes) {
    assert.ok(mix.title.trim(), `mixes[${mix.id}]: title required`);
    const [minBpm, maxBpm] = mix.bpm;
    assert.ok(
      Number.isInteger(minBpm) && Number.isInteger(maxBpm) && minBpm >= 60 && maxBpm <= 180 && minBpm <= maxBpm,
      `mixes[${mix.id}]: bpm [${minBpm}, ${maxBpm}] must be within 60-180 with min <= max`,
    );
    assert.ok(Number.isInteger(mix.minutes) && mix.minutes > 0, `mixes[${mix.id}]: minutes must be positive integer`);
    assert.match(mix.recorded, YYYY_MM, `mixes[${mix.id}]: recorded must be YYYY-MM`);
    assert.ok(djIds.has(mix.dj), `mixes[${mix.id}]: dj "${mix.dj}" does not reference an existing DJ`);
    assert.equal(mix.highlights.length, 3, `mixes[${mix.id}]: expected 3 tracklist highlights`);
    for (const note of mix.highlights) {
      assert.ok(note.trim(), `mixes[${mix.id}]: highlight cannot be empty`);
    }
  }
});

test('structured data outputs EntertainmentBusiness with Chicago areaServed and OfferCatalog', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'EntertainmentBusiness');
  assert.equal(schema.areaServed.name, 'Chicago');
  assert.equal(schema.openingHoursSpecification.length, 6);
  assert.equal(schema.hasOfferCatalog['@type'], 'OfferCatalog');
  assert.equal(schema.hasOfferCatalog.itemListElement.length, packages.length);
  const housePartyOffer = schema.hasOfferCatalog.itemListElement.find(o => o.name === 'Milestone & House Party');
  assert.equal(housePartyOffer?.price, packages.find(p => p.id === 'house-party')?.priceFrom);
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
