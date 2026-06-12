/**
 * @fileoverview SVG icon registry — all icons are stroke-based, 24×24 viewBox.
 *
 * Usage:
 *   import { BagIcon, HeartIcon } from '../../ui/Icon/icons';
 *   <BagIcon size={20} strokeWidth={1.5} />
 *
 * Design rules:
 *   - strokeWidth default: 1.5  (refined, editorial weight)
 *   - fill: none  (outline style)
 *   - stroke: currentColor  (inherits CSS color)
 *   - strokeLinecap / strokeLinejoin: round
 */

const iconBase = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  xmlns: "http://www.w3.org/2000/svg",
};

// ── Navigation & UI ────────────────────────────────────────────────────────────

export const BagIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

export const HeartIcon = ({ size = 24, strokeWidth = 1.5, filled = false, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <path
      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
      fill={filled ? "currentColor" : "none"}
    />
  </svg>
);

export const UserIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const MenuIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="15" y2="18" />
  </svg>
);

export const XIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const SearchIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const ChevronDownIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const ChevronRightIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const ArrowRightIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── E-commerce ─────────────────────────────────────────────────────────────────

export const TruckIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

export const RefreshIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
  </svg>
);

export const ShieldIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const StarIcon = ({ size = 24, strokeWidth = 1.5, filled = false, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      fill={filled ? "currentColor" : "none"}
    />
  </svg>
);

export const TrashIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);

export const PlusIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const MinusIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const CheckIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const MapPinIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const MailIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// ── Social ─────────────────────────────────────────────────────────────────────

export const InstagramIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const TwitterXIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <path d="M4 4l16 16M4 20L20 4" />
  </svg>
);

export const PinterestIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.16 1.22-5.16s-.31-.62-.31-1.55c0-1.45.84-2.54 1.89-2.54.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.49-.25 1.04.52 1.89 1.54 1.89 1.85 0 3.09-2.36 3.09-5.14 0-2.12-1.43-3.71-3.99-3.71-2.91 0-4.72 2.17-4.72 4.59 0 .84.25 1.42.63 1.88.17.21.2.29.13.53-.05.17-.16.58-.2.74-.07.25-.28.34-.51.25-1.41-.58-2.06-2.14-2.06-3.88 0-2.9 2.45-6.38 7.3-6.38 3.91 0 6.5 2.83 6.5 5.88 0 4.02-2.23 7.03-5.51 7.03-1.1 0-2.14-.59-2.49-1.26l-.69 2.64c-.23.85-.69 1.71-1.1 2.38.83.25 1.7.38 2.61.38 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);

export const YoutubeIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg {...iconBase} width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} aria-hidden="true" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
);
