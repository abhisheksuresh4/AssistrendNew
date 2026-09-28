import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import logoMark from '../assets/logo-mark.png';
import './Navbar.css';

/* `path` items are separate pages; the rest are sections of the home page */
const NAV_ITEMS = [
  { id: 'about', label: 'About Us', path: '/about/' },
  { id: 'cohorts', label: 'Cohorts' },
  { id: 'community', label: 'Community' },
  { id: 'contact', label: 'Contact Us' },
];

/* Section links stay in-page on home, and point back to home from other pages */
const hrefFor = (item, page) => item.path ?? (page === 'home' ? `#${item.id}` : `/#${item.id}`);

const SCROLL_THRESHOLD = 24;
const DESKTOP_QUERY = '(min-width: 769px)';

/* Arrow icon — hoisted static JSX (matches Hero CTA idiom) */
const ArrowIcon = (
  <svg
    className="navbar-cta-arrow"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 10h10M11 6l4 4-4 4" />
  </svg>
);

export default function Navbar({ page = 'home' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  /* On a standalone page its own nav item stays active; home uses scroll-spy */
  const [activeId, setActiveId] = useState(page === 'home' ? null : page);
  const [hoverId, setHoverId] = useState(null);

  const navRef = useRef(null);
  const trackRef = useRef(null);
  const linkRefs = useRef({});

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  /* Scroll state + progress hairline (progress written to a CSS var, no re-render) */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setIsScrolled(y > SCROLL_THRESHOLD);
      navRef.current?.style.setProperty('--nav-progress', max > 0 ? Math.min(y / max, 1) : 0);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* Scroll-spy — highlights the section crossing the middle of the viewport */
  useEffect(() => {
    if (page !== 'home') return undefined;

    const sections = NAV_ITEMS
      .filter((item) => !item.path)
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    /* Back at the hero → nothing active */
    const hero = document.getElementById('hero');
    const heroObserver = hero
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveId(null);
          },
          { rootMargin: '-45% 0px -50% 0px' }
        )
      : null;
    if (hero) heroObserver.observe(hero);

    return () => {
      observer.disconnect();
      heroObserver?.disconnect();
    };
  }, [page]);

  /* Sliding indicator — follows hover, falls back to the active section */
  const indicatorId = hoverId ?? activeId;

  const positionIndicator = useCallback(() => {
    const track = trackRef.current;
    const link = indicatorId ? linkRefs.current[indicatorId] : null;
    if (!track) return;

    if (!link) {
      track.style.setProperty('--indicator-opacity', 0);
      return;
    }
    track.style.setProperty('--indicator-x', `${link.offsetLeft}px`);
    track.style.setProperty('--indicator-w', `${link.offsetWidth}px`);
    track.style.setProperty('--indicator-opacity', 1);
  }, [indicatorId]);

  useLayoutEffect(() => {
    positionIndicator();
  }, [positionIndicator, isScrolled]);

  useEffect(() => {
    window.addEventListener('resize', positionIndicator);
    document.fonts?.ready.then(positionIndicator);
    return () => window.removeEventListener('resize', positionIndicator);
  }, [positionIndicator]);

  /* Mobile menu — Escape to close, lock body scroll, auto-close on desktop */
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onMq = (e) => {
      if (e.matches) setIsOpen(false);
    };

    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const wrapperClass = [
    'navbar-wrapper',
    isScrolled && 'is-scrolled',
    isOpen && 'is-open',
  ].filter(Boolean).join(' ');

  return (
    <nav ref={navRef} className={wrapperClass} aria-label="Main navigation">
      <div className="navbar">
        {/* Logo */}
        <a href="/" className="navbar-logo" aria-label="ASSISTREND home">
          <img className="navbar-logo-mark" src={logoMark} alt="" aria-hidden="true" />
          <span className="navbar-logo-text">ASSISTREND</span>
        </a>

        {/* Desktop Links — inset track with sliding indicator */}
        <ul
          ref={trackRef}
          className="navbar-links"
          onMouseLeave={() => setHoverId(null)}
        >
          <li className="navbar-indicator" aria-hidden="true" />
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                ref={(el) => { linkRefs.current[item.id] = el; }}
                href={hrefFor(item, page)}
                className={`navbar-link${activeId === item.id ? ' is-active' : ''}`}
                aria-current={activeId === item.id ? 'location' : undefined}
                onMouseEnter={() => setHoverId(item.id)}
                onFocus={() => setHoverId(item.id)}
                onBlur={() => setHoverId(null)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — DESIGN.md Primary Purple button */}
        <a href="#get-started" className="navbar-cta navbar-cta-desktop">
          Get Started
          {ArrowIcon}
        </a>

        {/* Mobile Toggle — morphs into a close icon */}
        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="navbar-sheet"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        {/* Scroll progress hairline */}
        <span className="navbar-progress" aria-hidden="true" />
      </div>

      {/* Mobile Sheet */}
      <div
        id="navbar-sheet"
        className="navbar-sheet"
        inert={!isOpen}
      >
        <ul className="navbar-sheet-links">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.id} style={{ '--i': i }}>
              <a
                href={hrefFor(item, page)}
                className={`navbar-sheet-link${activeId === item.id ? ' is-active' : ''}`}
                aria-current={activeId === item.id ? 'location' : undefined}
                onClick={closeMenu}
              >
                <span className="navbar-sheet-index">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#get-started"
          className="navbar-cta navbar-sheet-cta"
          style={{ '--i': NAV_ITEMS.length }}
          onClick={closeMenu}
        >
          Get Started
          {ArrowIcon}
        </a>
      </div>

      {/* Backdrop — tap outside to close */}
      <div className="navbar-scrim" onClick={closeMenu} aria-hidden="true" />
    </nav>
  );
}
