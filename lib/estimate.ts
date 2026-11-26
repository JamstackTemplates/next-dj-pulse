import type { GearItem } from '../content/gear.ts';
import type { EventPackage } from '../content/packages.ts';

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

export interface RigEstimate {
  pkg: EventPackage | null;
  selectedGear: GearItem[];
  packageSubtotal: number;
  gearSubtotal: number;
  total: number;
}

/**
 * Compute an illustrative "from" rig estimate.
 * Unavailable gear items are always excluded even if their IDs are passed.
 */
export function calculateRigEstimate(
  pkg: EventPackage | null,
  selectedGearIds: readonly string[],
  allGear: readonly GearItem[],
): RigEstimate {
  const idSet = new Set(selectedGearIds);
  const selectedGear = allGear.filter(item => item.available && idSet.has(item.id));
  const packageSubtotal = pkg ? pkg.priceFrom : 0;
  const gearSubtotal = selectedGear.reduce((sum, item) => sum + item.price, 0);
  return {
    pkg,
    selectedGear,
    packageSubtotal,
    gearSubtotal,
    total: packageSubtotal + gearSubtotal,
  };
}

/**
 * Format a plain-text rig estimate summary for pasting into the Contact enquiry message.
 * Always states "estimate only" and never implies a booking or hold.
 */
export function formatRigSummary(estimate: RigEstimate): string {
  const lines: string[] = ['Midnight Pulse DJ — Rig estimate (estimate only, subject to written quote)'];
  if (estimate.pkg) {
    lines.push(`Package: ${estimate.pkg.name} (${estimate.pkg.hours} hrs) — from ${formatUsd(estimate.pkg.priceFrom)}`);
  } else {
    lines.push('Package: Gear add-ons only (no base package selected)');
  }
  if (estimate.selectedGear.length > 0) {
    lines.push('Add-on gear:');
    for (const item of estimate.selectedGear) {
      lines.push(`- ${item.name} (${formatUsd(item.price)})`);
    }
  } else {
    lines.push('Add-on gear: None selected');
  }
  lines.push(`Illustrative total: from ${formatUsd(estimate.total)} (estimate only)`);
  return lines.join('\n');
}
