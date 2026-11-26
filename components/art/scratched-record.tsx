/**
 * 404 illustration: scratched vinyl record with tonearm skidding off
 * and "404" set in Monoton as the centre label.
 */
export function ScratchedRecord() {
  return (
    <svg
      viewBox="0 0 420 340"
      className="mx-auto h-auto w-full max-w-md"
      role="img"
      aria-label="A scratched vinyl record with the tonearm skidding off and 404 on the label"
    >
      <defs>
        <linearGradient id="scratch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--magenta)" />
          <stop offset="52%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>

      {/* Vinyl record */}
      <circle cx="180" cy="175" r="136" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
      <circle cx="180" cy="175" r="122" fill="none" stroke="var(--border)" strokeWidth="1" opacity="0.8" />
      <circle cx="180" cy="175" r="108" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="24 8" />
      <circle cx="180" cy="175" r="94" fill="none" stroke="var(--border)" strokeWidth="1" opacity="0.7" />
      <circle cx="180" cy="175" r="80" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="16 10" />

      {/* Center label with Monoton 404 */}
      <circle cx="180" cy="175" r="56" fill="url(#scratch-grad)" />
      <circle cx="180" cy="175" r="48" fill="var(--bg)" opacity="0.82" />
      <text
        x="180"
        y="188"
        textAnchor="middle"
        fill="var(--text)"
        style={{ fontFamily: 'var(--font-groove)', fontSize: '34px' }}
      >
        404
      </text>
      <circle cx="180" cy="175" r="5" fill="var(--magenta)" />

      {/* Bright jagged scratch across grooves */}
      <path
        d="M92 98 L128 124 L118 134 L152 156"
        stroke="var(--cyan)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M210 218 L244 248 L260 242 L288 266"
        stroke="var(--magenta)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Tonearm pivot & skidding arm */}
      <circle cx="358" cy="76" r="24" fill="var(--surface-raised)" stroke="var(--border)" strokeWidth="2" />
      <circle cx="358" cy="76" r="10" fill="var(--bg)" stroke="var(--cyan)" strokeWidth="1.5" />
      <path
        d="M352 94 L322 214 L276 244"
        fill="none"
        stroke="var(--text)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Headshell & spark */}
      <rect x="256" y="236" width="24" height="12" rx="3" transform="rotate(-32 268 242)" fill="var(--amber)" />
      <path d="M248 258 L236 266 M258 266 L254 278 M242 248 L230 246" stroke="var(--amber)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
