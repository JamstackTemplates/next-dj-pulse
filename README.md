# Midnight Pulse DJ (`next-dj-pulse`)

A self-contained Next.js static website template for mobile DJs, sound & lighting hire, and event
entertainment — built for the `JamstackTemplates` gallery. All business details, resident DJs,
mixes, quotes and prices are fictitious sample data for **Midnight Pulse DJ** in Chicago.

Local development requires Node 24 or later and npm. Run `npm ci` and `npm run dev` to preview
locally.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Jog-wheel hero, resident line-up bill, featured backstage passes, 5-channel run of show, newest mixes, client pull-quotes, closing call and `EntertainmentBusiness` JSON-LD |
| `/packages/` | Event-type filterable wall of laminated backstage passes, standard inclusions setlist and expandable `<details>` FAQ |
| `/gear/` | Four open flight cases (sound, lighting, effects, staging), sticky build-your-rig estimate with plain-text "Copy summary" (`estimate only`), and venue technical rider sheet |
| `/mixes/` | Genre-filterable crate of records with "Now playing" feature, BPM LED rings on hover/focus, and resident DJ crew laminates |
| `/contact/` | Hosted Jamstacks support form (when `siteId` is configured) or email fallback, always-visible email and phone, booking-line hours with Chicago live status, Chicagoland 20/40/60-mile service ring |
| `/404.html` | "Needle skipped." scratched-record art with cue links |

## Make it yours (file ownership)

| File | Owns |
| --- | --- |
| `content/business.ts` | Business name, tagline, email, phone, service area, travel radius, booking-line hours and enquiry guidance |
| `content/packages.ts` | Event packages (`id`, `name`, `eventType`, `hours`, `priceFrom`, `extraHour`, `djs`, `includes`, `featured`, `available`) |
| `content/gear.ts` | Add-on equipment (`id`, `name`, `category`, `spec`, `price`, `available`, `note`) |
| `content/mixes.ts` | Mix archive (`id`, `title`, `genre`, `bpm`, `minutes`, `recorded`, `dj`, `highlights`, `listenUrl`); newest mix goes at the top |
| `content/djs.ts` | Resident DJ profiles (`id`, `name`, `plays`, `since`, `bio`) referenced by `content/mixes.ts` |
| `app/page.tsx`, `app/<route>/page.tsx` | Page composition and editable prose (headings, steps, reviews, FAQs, rider notes, calls to action) |
| `site.config.json` | Public name, description, hostname, `timeZone` (`America/Chicago`) and Jamstacks integration (`siteId`, `cdnUrl`) |
| `app/tailwind.input.css` | Dark/light colour tokens, font variables, textures (grain, haze, brushed aluminium, halftone, gaffer tape), jog-wheel BPM animation and print styles |
| `components/art/*` | Reusable inline SVG artwork (jog wheel, hero scene, dividers, record sleeve, Chicagoland ring, scratched record, hairline icons) |
| `lib/structured-data.ts` | `EntertainmentBusiness` JSON-LD with `areaServed`, `openingHoursSpecification` and `OfferCatalog` derived from `content/packages.ts` |
| `lib/estimate.ts` | Pure rig-estimate calculator and plain-text summary formatter |
| `app/sitemap.ts` | Public routes (`/`, `/packages/`, `/gear/`, `/mixes/`, `/contact/`) |

### Common owner edits

- **Update a package price or pause a package**: Edit `priceFrom` or set `available: false` in
  `content/packages.ts`. Prices flow automatically to `/packages/`, the Home hero/teaser, the Gear
  rig estimate, and JSON-LD `OfferCatalog`.
- **Mark gear out for service or back in the case**: Edit `available` and `note` in
  `content/gear.ts`. Unavailable items show an amber "Out for service" LED and cannot be ticked in
  the rig estimate.
- **Add a new mix**: Insert a new entry at the top of `content/mixes.ts` referencing an existing DJ
  `id` from `content/djs.ts`. The first entry automatically becomes "Now playing" on `/mixes/` and
  appears in the Home teaser.
- **Change business name or booking-line hours**: Update `content/business.ts` and
  `site.config.json` (`name` and `timeZone`).

## Typography and licences

All fonts are self-hosted via npm (no external font CDN requests) under the SIL Open Font License
1.1 (OFL):

- **Monoton** (`@fontsource/monoton`) — wordmark, section numerals and large numbers.
- **Mona Sans Variable** (`@fontsource-variable/mona-sans`, width + weight axes) — expanded display
  headings and UI/body copy.
- **Kode Mono Variable** (`@fontsource-variable/kode-mono`) — channel labels, BPM, prices, times
  and gaffer-tape strips.

## Public configuration

```json
{
  "name": "Midnight Pulse DJ",
  "description": "Chicago mobile DJs with sound, lighting and effects for weddings, corporate events and parties. Event packages from $900, add-on gear and free mixes to preview our sound.",
  "domain": "next-dj-pulse.jamstacks.net",
  "timeZone": "America/Chicago",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config `timeZone` |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear
only on `/contact/` when `siteId` is configured. Without a site ID, no embed host or script is
rendered and the direct email fallback is shown. The public email (`hello@midnightpulsedj.com`) and
phone are always visible. Navigation to and from `/contact/` uses full-document loads via
`SiteLink`. Every date check or quote is framed as an enquiry; dates are held only once confirmed
in writing.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Gallery publishing metadata lives in `jamstacks/` (removable without affecting customer builds or
tests) and is validated separately with `node --test jamstacks/config.test.mjs`.
