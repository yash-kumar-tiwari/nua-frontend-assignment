/**
 * @fileoverview Footer — dark charcoal e-commerce footer.
 *
 * Sections:
 *   1. Newsletter bar — full-width email signup
 *   2. Main grid — brand + 3 link columns
 *   3. Trust badges — shipping / returns / security
 *   4. Bottom bar — copyright + legal links + payment icons
 */

import { useState } from "react";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";
import {
  BagIcon,
  InstagramIcon,
  TwitterXIcon,
  PinterestIcon,
  YoutubeIcon,
  TruckIcon,
  RefreshIcon,
  ShieldIcon,
  MailIcon,
  ArrowRightIcon,
} from "../../ui/Icon/icons";
import styles from "./Footer.module.scss";

// ── Static data ────────────────────────────────────────────────────────────────
const SHOP_LINKS = [
  { label: "All Products", to: ROUTES.PRODUCTS },
  { label: "Men's", to: `${ROUTES.PRODUCTS}?category=men's clothing` },
  { label: "Women's", to: `${ROUTES.PRODUCTS}?category=women's clothing` },
  { label: "Electronics", to: `${ROUTES.PRODUCTS}?category=electronics` },
  { label: "Jewelry", to: `${ROUTES.PRODUCTS}?category=jewelery` },
];

const HELP_LINKS = [
  { label: "Contact Us", to: "#" },
  { label: "FAQ", to: "#" },
  { label: "Shipping Policy", to: "#" },
  { label: "Returns & Exchanges", to: "#" },
  { label: "Track Your Order", to: "#" },
];

const COMPANY_LINKS = [
  { label: "About Nua", to: "#" },
  { label: "Careers", to: "#" },
  { label: "Sustainability", to: "#" },
  { label: "Press", to: "#" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", to: "#", Icon: InstagramIcon },
  { label: "X (Twitter)", to: "#", Icon: TwitterXIcon },
  { label: "Pinterest", to: "#", Icon: PinterestIcon },
  { label: "YouTube", to: "#", Icon: YoutubeIcon },
];

const TRUST_ITEMS = [
  {
    Icon: TruckIcon,
    title: "Free Shipping",
    desc: "On all orders over $50",
  },
  {
    Icon: RefreshIcon,
    title: "Easy Returns",
    desc: "30-day return policy",
  },
  {
    Icon: ShieldIcon,
    title: "Secure Checkout",
    desc: "256-bit SSL encryption",
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "#" },
  { label: "Terms of Service", to: "#" },
  { label: "Cookie Preferences", to: "#" },
];

// ─────────────────────────────────────────────────────────────────────────────
function FooterLinkColumn({ title, links }) {
  return (
    <div className={styles.linkColumn}>
      <h3 className={styles.columnTitle}>{title}</h3>
      <ul className={styles.linkList} role="list">
        {links.map(({ label, to }) => (
          <li key={label}>
            <Link to={to} className={styles.footerLink}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className={styles.footer} aria-label="Site footer">

      {/* ── Trust badges ──────────────────────────────────────────────────── */}
      <div className={styles.trustBar}>
        <div className={styles.trustInner}>
          {TRUST_ITEMS.map(({ Icon, title, desc }) => (
            <div key={title} className={styles.trustItem}>
              <span className={styles.trustIcon}>
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>{title}</span>
                <span className={styles.trustDesc}>{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Newsletter ─────────────────────────────────────────────────────── */}
      <div className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <div className={styles.newsletterCopy}>
            <p className={styles.newsletterEyebrow}>Stay in the loop</p>
            <h2 className={styles.newsletterHeading}>
              New arrivals, exclusive drops, curated edits.
            </h2>
          </div>

          {subscribed ? (
            <div className={styles.subscribed} role="status" aria-live="polite">
              <span className={styles.subscribedCheck}>✓</span>
              <p>You're in. Watch your inbox.</p>
            </div>
          ) : (
            <form
              className={styles.newsletterForm}
              onSubmit={handleSubscribe}
              noValidate
            >
              <label htmlFor="footer-email" className={styles.srOnly}>
                Email address
              </label>
              <div className={styles.inputGroup}>
                <span className={styles.inputIcon}>
                  <MailIcon size={16} strokeWidth={1.5} />
                </span>
                <input
                  id="footer-email"
                  type="email"
                  className={styles.emailInput}
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <button
                  type="submit"
                  className={styles.subscribeBtn}
                  aria-label="Subscribe to newsletter"
                >
                  <span className={styles.subscribeBtnText}>Subscribe</span>
                  <ArrowRightIcon size={16} strokeWidth={2} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ── Main footer body ───────────────────────────────────────────────── */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>

          {/* Brand column */}
          <div className={styles.brandColumn}>
            <Link to={ROUTES.HOME} className={styles.brandLogo} aria-label="Nua homepage">
              <BagIcon size={20} strokeWidth={2} />
              <span>nua</span>
            </Link>
            <p className={styles.brandTagline}>
              Modern e-commerce.<br />Thoughtfully curated.
            </p>

            {/* Social links */}
            <div className={styles.socialLinks} aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, to, Icon }) => (
                <a
                  key={label}
                  href={to}
                  className={styles.socialLink}
                  aria-label={label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterLinkColumn title="Shop" links={SHOP_LINKS} />
          <FooterLinkColumn title="Help" links={HELP_LINKS} />
          <FooterLinkColumn title="Company" links={COMPANY_LINKS} />
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Nua, Inc. All rights reserved.
          </p>
          <nav aria-label="Legal links">
            <ul className={styles.legalLinks} role="list">
              {LEGAL_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className={styles.legalLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
