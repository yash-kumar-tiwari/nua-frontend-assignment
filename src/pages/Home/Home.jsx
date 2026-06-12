/**
 * @fileoverview Homepage — landing page for NuaShop.
 *
 * Design:
 *   - 1. Page Hero: Large editorial type + background design shapes.
 *   - 2. Brand Standard: Clean 3-column details of philosophy.
 *   - 3. Category Grid: Editorial asymmetrical grid collage of shop links.
 *   - 4. Best Sellers: Grid showcasing bestselling products (reusing ProductCard).
 *   - 5. Campaign banner: High contrast promo card with newsletter signup.
 *   - 6. Social Feed: Editorial tags grid displaying styled pieces.
 */

import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useProducts } from "../../features/products/useProducts";
import { ROUTES } from "../../constants/routes";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import ProductCardSkeleton from "../../components/ui/ProductCard/ProductCardSkeleton";
import {
  ArrowRightIcon,
  ShieldIcon,
  RefreshIcon,
  TruckIcon,
  CheckIcon,
} from "../../components/ui/Icon/icons";
import { cx } from "../../utils/cx";
import styles from "./Home.module.scss";

// Static Category Cards config for collage layout
const CATEGORY_CARDS = [
  {
    id: "men's clothing",
    title: "Men's Collection",
    subtitle: "Refined Everyday Staples",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    link: "/products?category=men's clothing",
    cols: "colSpan2",
  },
  {
    id: "women's clothing",
    title: "Women's Collection",
    subtitle: "Tailored Linen & Knits",
    image: "https://fakestoreapi.com/img/71HblAHs1xL._AC_UY879_-2.jpg",
    link: "/products?category=women's clothing",
    cols: "colSpan1",
  },
  {
    id: "jewelery",
    title: "Fine Jewelry",
    subtitle: "Minimalist Solid Gold",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_FMwebp_QL65_.jpg",
    link: "/products?category=jewelery",
    cols: "colSpan1",
  },
  {
    id: "electronics",
    title: "Audio & Tech",
    subtitle: "Acoustic Engineering",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    link: "/products?category=electronics",
    cols: "colSpan2",
  },
];

// Mock Instagram Posts for the Social Feed
const SOCIAL_POSTS = [
  { id: 1, handle: "@clara.living", likes: "1.2k", image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg" },
  { id: 2, handle: "@marcus_wear", likes: "824", image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg" },
  { id: 3, handle: "@elena_styling", likes: "2.1k", image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg" },
  { id: 4, handle: "@tech.minimal", likes: "650", image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg" },
  { id: 5, handle: "@james_commute", likes: "1.5k", image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg" },
  { id: 6, handle: "@nua.essentials", likes: "3.4k", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_FMwebp_QL65_.jpg" },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: products, isLoading, isError } = useProducts();

  // Filter 4 best sellers to show on home
  const bestSellers = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => p.isBestseller).slice(0, 4);
  }, [products]);

  // Handle newsletter submit
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail("");
    }, 1000);
  };

  return (
    <div className={styles.page}>
      
      {/* ── 1 · HERO SECTION ──────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Editorial Launch · 2026</span>
            <h1 id="hero-title" className={styles.heroHeading}>
              Thoughtfully Designed.<br />
              <em>Responsibly Crafted.</em>
            </h1>
            <p className={styles.heroText}>
              A curation of luxury essentials built for quality, durability, and daily comfort.
            </p>
            <div className={styles.heroActions}>
              <Link to={ROUTES.PRODUCTS} className={styles.heroBtnPrimary}>
                Shop the Collection
                <ArrowRightIcon size={16} strokeWidth={2} />
              </Link>
              <a href="#philosophy" className={styles.heroBtnSecondary}>
                Our Philosophy
              </a>
            </div>
          </div>
        </div>
        
        {/* Floating background gradient orbs for brand aesthetics */}
        <div className={styles.heroDecor} aria-hidden="true">
          <div className={styles.decorOrb1} />
          <div className={styles.decorOrb2} />
        </div>
      </section>

      {/* ── 2 · BRAND PHILOSOPHY ──────────────────────────────────────────── */}
      <section id="philosophy" className={styles.philosophy} aria-labelledby="phil-title">
        <div className={styles.container}>
          <div className={styles.philosophyHeader}>
            <span className={styles.sectionEyebrow}>THE NUA STANDARD</span>
            <h2 id="phil-title" className={styles.sectionTitle}>
              Quality without compromise.
            </h2>
            <p className={styles.sectionText}>
              We believe garments and items should outlast seasons. Every piece in our curation adheres to our strict principles of circularity.
            </p>
          </div>

          <div className={styles.philosophyGrid}>
            <div className={styles.philCard}>
              <div className={styles.philIconWrapper}>
                <RefreshIcon size={24} strokeWidth={1.5} className={styles.philIcon} />
              </div>
              <h3 className={styles.philCardTitle}>Sustainable Sourcing</h3>
              <p className={styles.philCardBody}>
                100% organic cotton, post-consumer recycled nylon, and ethically harvested wool fibers only.
              </p>
            </div>
            <div className={styles.philCard}>
              <div className={styles.philIconWrapper}>
                <ShieldIcon size={24} strokeWidth={1.5} className={styles.philIcon} />
              </div>
              <h3 className={styles.philCardTitle}>Ethical Production</h3>
              <p className={styles.philCardBody}>
                Made in certified clean mills where workers are protected by fair wages and secure workplace policies.
              </p>
            </div>
            <div className={styles.philCard}>
              <div className={styles.philIconWrapper}>
                <TruckIcon size={24} strokeWidth={1.5} className={styles.philIcon} />
              </div>
              <h3 className={styles.philCardTitle}>Zero Waste Logistics</h3>
              <p className={styles.philCardBody}>
                Shipped in 100% compostable mailers with offset carbon mapping for every cargo route.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 · CATEGORY SHOWCASE (ASYNCHRONOUS COLLAGE) ───────────────────── */}
      <section className={styles.categories} aria-labelledby="cat-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Curated Collections</span>
              <h2 id="cat-title" className={styles.sectionTitle}>Browse by Category</h2>
            </div>
            <Link to={ROUTES.PRODUCTS} className={styles.exploreLink}>
              <span>View All Shop</span>
              <ArrowRightIcon size={14} strokeWidth={2.5} />
            </Link>
          </div>

          <div className={styles.categoryGrid}>
            {CATEGORY_CARDS.map((cat) => (
              <Link
                key={cat.id}
                to={cat.link}
                className={cx(styles.categoryCard, styles[cat.cols])}
                aria-label={`Shop ${cat.title}`}
              >
                <div className={styles.cardImageWrapper}>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <div className={styles.cardOverlay} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{cat.title}</h3>
                  <p className={styles.cardSubtitle}>{cat.subtitle}</p>
                  <span className={styles.cardLink}>
                    Explore
                    <ArrowRightIcon size={14} strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · FEATURED BEST SELLERS ─────────────────────────────────────── */}
      <section className={styles.bestsellers} aria-labelledby="bs-title">
        <div className={styles.container}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionEyebrow}>Customer Favorites</span>
            <h2 id="bs-title" className={styles.sectionTitle}>Best Sellers</h2>
            <div className={styles.headingDivider} />
          </div>

          <div className={styles.productGrid}>
            {isLoading ? (
              [1, 2, 3, 4].map((n) => <ProductCardSkeleton key={n} />)
            ) : isError ? (
              <p className={styles.errorText} style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                Unable to load best sellers. Please check your connection.
              </p>
            ) : (
              bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── 5 · CAMPAIGN SPLIT BANNER & NEWSLETTER ───────────────────────── */}
      <section className={styles.campaign} aria-labelledby="camp-title">
        <div className={styles.container}>
          <div className={styles.campaignCard}>
            
            {/* Left: Content and newsletter form */}
            <div className={styles.campaignLeft}>
              <span className={styles.campaignEyebrow}>EXCLUSIVE ACCESS</span>
              <h2 id="camp-title" className={styles.campaignHeading}>
                Summer Drop Campaign
              </h2>
              <p className={styles.campaignText}>
                Be the first to hear about our limited-edition linen capsule. Zero restocks. Register your email for priority early access and exclusive pricing previews.
              </p>

              {subscribed ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIconWrapper}>
                    <CheckIcon size={16} strokeWidth={2.5} />
                  </div>
                  <span>Thank you! We've registered your priority slot.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className={styles.subscribeInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email subscription input"
                  />
                  <button
                    type="submit"
                    className={styles.subscribeBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Get Priority Access"}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Graphic overlay */}
            <div className={styles.campaignRight} aria-hidden="true">
              <div className={styles.campaignImageWrapper}>
                <img
                  src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
                  alt="Summer drop campaign teaser"
                  className={styles.campaignImage}
                  loading="lazy"
                />
                <div className={styles.campaignOverlay} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6 · LIFESTYLE SOCIAL FEED ────────────────────────────────────── */}
      <section className={styles.social} aria-labelledby="social-title">
        <div className={styles.container}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionEyebrow}>@NUA.ESSENTIALS</span>
            <h2 id="social-title" className={styles.sectionTitle}>Seen in Nua</h2>
            <p className={styles.sectionText}>
              Tag us in your styling choices to be featured in our weekly standard edit.
            </p>
          </div>

          <div className={styles.socialGrid}>
            {SOCIAL_POSTS.map((post) => (
              <div key={post.id} className={styles.socialCard}>
                <div className={styles.socialImageWrapper}>
                  <img
                    src={post.image}
                    alt={`Styled layout by ${post.handle}`}
                    className={styles.socialImage}
                    loading="lazy"
                  />
                  <div className={styles.socialHoverOverlay}>
                    <span className={styles.socialHandle}>{post.handle}</span>
                    <span className={styles.socialLikes}>♥ {post.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
