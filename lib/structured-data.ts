import { business } from '../content/business.ts';
import { packages } from '../content/packages.ts';
import { absoluteUrl } from './paths.ts';

export function businessStructuredData() {
  const url = absoluteUrl('/');
  const packagesUrl = absoluteUrl('/packages/');
  const openingHoursSpecification = business.bookingHours
    .filter((entry): entry is typeof entry & { opens: string; closes: string } => Boolean(entry.opens && entry.closes))
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'EntertainmentBusiness',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    areaServed: {
      '@type': 'City',
      name: 'Chicago',
    },
    openingHoursSpecification,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Event DJ & Production Packages',
      itemListElement: packages.map(pkg => ({
        '@type': 'Offer',
        name: pkg.name,
        description: `${pkg.hours} hours, ${pkg.djs === 2 ? '2 DJs' : '1 DJ'}: ${pkg.includes.join(', ')}.`,
        priceCurrency: 'USD',
        price: pkg.priceFrom,
        availability: pkg.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        ...(packagesUrl ? { url: `${packagesUrl}#${pkg.id}` } : {}),
      })),
    },
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
