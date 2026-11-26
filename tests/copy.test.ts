import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

function collectFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...collectFiles(full));
    else if (/\.(ts|tsx)$/.test(entry)) out.push(full);
  }
  return out;
}

test('site copy frames date checks as enquiries and never claims a form books, holds or takes payment', () => {
  const files = [...collectFiles('app'), ...collectFiles('content'), ...collectFiles('components')];
  const forbidden = [
    /\bbook now\b/i,
    /\binstant booking\b/i,
    /\binstantly confirmed\b/i,
    /\bdate is booked\b/i,
    /\breserve your date now\b/i,
    /\bpay deposit online\b/i,
  ];
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    for (const pattern of forbidden) {
      assert.doesNotMatch(text, pattern, `${file}: forbidden booking/payment claim matched ${pattern}`);
    }
  }
});
