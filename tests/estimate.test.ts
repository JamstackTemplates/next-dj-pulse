import assert from 'node:assert/strict';
import { test } from 'node:test';
import { gear } from '../content/gear.ts';
import { packages } from '../content/packages.ts';
import { calculateRigEstimate, formatRigSummary } from '../lib/estimate.ts';

test('rig estimate adds base package and selected available gear', () => {
  const pkg = packages.find(p => p.id === 'house-party')!;
  const estimate = calculateRigEstimate(pkg, ['uplights-12', 'haze'], gear);
  assert.equal(estimate.packageSubtotal, pkg.priceFrom);
  assert.equal(estimate.gearSubtotal, 300 + 120);
  assert.equal(estimate.total, pkg.priceFrom + 420);
  assert.deepEqual(
    estimate.selectedGear.map(g => g.id),
    ['uplights-12', 'haze'],
  );
});

test('rig estimate excludes unavailable gear even when its ID is passed', () => {
  const pkg = packages.find(p => p.id === 'wedding-full-night')!;
  const unavailable = gear.find(g => !g.available);
  assert.ok(unavailable, 'expected at least one unavailable gear item in default data');
  const estimate = calculateRigEstimate(pkg, ['wireless-mics', unavailable.id], gear);
  assert.equal(estimate.selectedGear.length, 1);
  assert.equal(estimate.selectedGear[0].id, 'wireless-mics');
  assert.equal(estimate.total, pkg.priceFrom + 90);
});

test('copied rig summary states estimate only and lists package, add-ons and total', () => {
  const pkg = packages.find(p => p.id === 'corporate-launch')!;
  const estimate = calculateRigEstimate(pkg, ['moving-heads'], gear);
  const summary = formatRigSummary(estimate);
  assert.match(summary, /estimate only/i);
  assert.match(summary, /Launch & Corporate/);
  assert.match(summary, /Moving-head beams × 4/);
  assert.match(summary, /\$2,180/);
});
