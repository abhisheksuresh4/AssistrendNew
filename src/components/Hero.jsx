import './Hero.css';

/* Arrow icon — hoisted static JSX outside component (Vercel React: rendering-hoist-jsx) */
const ArrowIcon = (
  <svg
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

/* Avatar placeholder colors */
const AVATAR_COLORS = ['#7132f5', '#5741d8', '#149e61', '#a855f7', '#5b1ecf'];

/* Table of contents strip — one entry per section below */
const HERO_INDEX = [
  { num: '01', label: 'The Journey', href: '#cohorts' },
  { num: '02', label: 'The People', href: '#community' },
  { num: '03', label: 'Get in Touch', href: '#contact' },
];

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      {/* Ambient Glow Blobs — decorative */}
      <div className="hero-glow hero-glow--purple" aria-hidden="true" />
      <div className="hero-glow hero-glow--cyan" aria-hidden="true" />
      <div className="hero-glow hero-glow--green" aria-hidden="true" />

      <div className="hero-content container">
        {/* Main Heading — oversized, offset two-line spread */}
        <h1 className="hero-heading" id="hero-heading">
          <span className="hero-heading-sans">Grow Together.</span>
          <span className="hero-heading-serif">Stress Less.</span>
        </h1>

        {/* Lower deck — copy left, actions right */}
        <div className="hero-deck">
          <p className="hero-subheadline">
            An AI-enabled wellness and social-support ecosystem for students
            and young people — guided by your own goals, it connects you early
            to the right peer communities, mentors, experts and professional care.
          </p>

          <div className="hero-actions">
            <div className="hero-cta-group">
              <a href="#cohorts" className="hero-cta-primary">
                Explore Cohorts
                {ArrowIcon}
              </a>
            </div>

            {/* Social Proof Trust Bar */}
            <div className="hero-trust">
              <div className="hero-trust-avatars">
                {AVATAR_COLORS.map((color, i) => (
                  <div
                    key={i}
                    className="hero-trust-avatar"
                    style={{ background: color }}
                    role="img"
                    aria-label={`Student ${i + 1}`}
                  />
                ))}
                <span className="hero-trust-count">
                  <strong>2,400+</strong> students joined
                </span>
              </div>
              <span className="hero-trust-label">
                Trusted by students across 25 campuses
              </span>
            </div>
          </div>
        </div>

        {/* Index strip — editorial table of contents */}
        <nav className="hero-index" aria-label="On this page">
          {HERO_INDEX.map((item) => (
            <a key={item.num} href={item.href} className="hero-index-item">
              <span className="hero-index-num">{item.num}</span>
              <span className="hero-index-label">{item.label}</span>
              <span className="hero-index-arrow" aria-hidden="true">↓</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
