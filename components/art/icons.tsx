import type { SVGProps } from 'react';

export type IconName =
  | 'headphones'
  | 'mic'
  | 'speaker'
  | 'uplight'
  | 'moving-head'
  | 'haze'
  | 'spark'
  | 'dance-floor'
  | 'record'
  | 'clock'
  | 'phone'
  | 'mail'
  | 'map-pin'
  | 'tape';

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

/** 24px hairline icons drawn for Midnight Pulse DJ. */
export function PulseIcon({ name, className = 'h-5 w-5 shrink-0', ...rest }: IconProps) {
  const base = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    className,
    ...rest,
  };

  switch (name) {
    case 'headphones':
      return (
        <svg {...base}>
          <path d="M4 13a8 8 0 0 1 16 0" />
          <rect x="3" y="13" width="4" height="7" rx="1.5" />
          <rect x="17" y="13" width="4" height="7" rx="1.5" />
        </svg>
      );
    case 'mic':
      return (
        <svg {...base}>
          <rect x="9" y="3" width="6" height="10" rx="3" />
          <path d="M6 11a6 6 0 0 0 12 0" />
          <path d="M12 17v4M9 21h6" />
        </svg>
      );
    case 'speaker':
      return (
        <svg {...base}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <circle cx="12" cy="8" r="2" />
          <circle cx="12" cy="15" r="3.2" />
          <circle cx="12" cy="15" r="0.8" fill="currentColor" />
        </svg>
      );
    case 'uplight':
      return (
        <svg {...base}>
          <path d="M7 19h10l-1.5-4h-7L7 19Z" />
          <path d="M9 15 5 5M12 15V4M15 15l4-10" />
        </svg>
      );
    case 'moving-head':
      return (
        <svg {...base}>
          <rect x="6" y="17" width="12" height="4" rx="1" />
          <path d="M8 17v-5a4 4 0 0 1 8 0v5" />
          <circle cx="12" cy="10" r="3" />
          <path d="M9 6 6 3M15 6l3-3" />
        </svg>
      );
    case 'haze':
      return (
        <svg {...base}>
          <path d="M4 15h14a3 3 0 0 0 0-6h-.5a5 5 0 0 0-9.6-1.4A3.5 3.5 0 0 0 4 11.5" />
          <path d="M3 18.5h10M16 18.5h4" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...base}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'dance-floor':
      return (
        <svg {...base}>
          <path d="M3 12 12 6l9 6-9 6-9-6Z" />
          <path d="M7.5 9l9 6M16.5 9l-9 6" />
        </svg>
      );
    case 'record':
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" strokeDasharray="3 2" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...base}>
          <path d="M5 4h4l1.5 4-2.2 1.6a11 11 0 0 0 6.1 6.1L16 13.5l4 1.5v4a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...base}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case 'map-pin':
      return (
        <svg {...base}>
          <circle cx="12" cy="10" r="2.5" />
          <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11 6.5 11Z" />
        </svg>
      );
    case 'tape':
      return (
        <svg {...base}>
          <path d="M3 8.5 21 7l-.8 8.5L3.8 17 3 8.5Z" />
          <path d="M7 11.5h10" />
        </svg>
      );
  }
}
