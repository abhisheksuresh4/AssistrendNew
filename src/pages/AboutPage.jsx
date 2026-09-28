import Navbar from '../components/Navbar';
import Colophon from '../components/Colophon';
import useReveal from '../hooks/useReveal';
import { TEAM_MEMBERS } from '../data/team';
import nvidiaInceptionBadge from '../assets/NVIDIA.png';
import ksumLogo from '../assets/KSUM-logo.svg';
import iitMandiLogo from '../assets/iitmandicatalyst_logo.jpg';
import './AboutPage.css';

/* ---------------------------------------------
   Content — sourced from ASSISTREND's LinkedIn page,
   assistrend.com and details confirmed by the team.
   --------------------------------------------- */

const FACTS = [
  { label: 'Founded', value: '2023' },
  { label: 'Based in', value: 'Kerala, India' },
  { label: 'Built for', value: 'Students & young people' },
  { label: 'What it is', value: 'An AI wellness companion' },
];

const PILLARS = [
  {
    num: '01',
    name: 'User mapping',
    text: 'It starts with you — your goals, your routines and what matters to you — so support is shaped around your life, not a template.',
  },
  {
    num: '02',
    name: 'Predictive analytics',
    text: 'Patterns over time help surface the right support earlier, so help can arrive before pressure turns into burnout.',
  },
  {
    num: '03',
    name: 'Community engagement',
    text: 'Peers who understand, mentors who have been there, experts who teach and professional care when it’s needed — online and off.',
  },
];

/* Official partner artwork, shown unaltered — never redraw partner logos. */
const RECOGNITION = [
  {
    id: 'nvidia',
    status: 'Member',
    name: 'NVIDIA Inception',
    text: 'ASSISTREND is part of NVIDIA Inception, NVIDIA’s program for startups building with AI — opening up technical resources, training and a global network of founders.',
    logo: nvidiaInceptionBadge,
    logoAlt: 'NVIDIA Inception Program badge',
  },
  {
    id: 'ksum',
    status: 'Grant recipient',
    name: 'Kerala Startup Mission',
    text: 'Our work is supported by a grant from Kerala Startup Mission, the Government of Kerala’s nodal agency for entrepreneurship and startups.',
    logo: ksumLogo,
    logoAlt: 'Kerala Startup Mission logo',
  },
  {
    id: 'iit-mandi',
    status: 'Pre-incubation',
    name: 'IIT Mandi Catalyst',
    text: 'Selected for the Exploration 2.0 pre-incubation cohort at IIT Mandi Catalyst, the institute’s technology business incubator.',
    logo: iitMandiLogo,
    logoAlt: 'IIT Mandi Catalyst — A Technology Business Incubator logo',
  },
];

const ArrowIcon = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 10h10M11 6l4 4-4 4" />
  </svg>
);

export default function AboutPage() {
  useReveal();

  return (
    <>
      <a href="#about-hero" className="skip-link">
        Skip to main content
      </a>
      <Navbar page="about" />

      <main>
        {/* ---- Hero ---- */}
        <section className="ab-hero" id="about-hero" aria-labelledby="ab-hero-title">
          <div className="ab-hero-glow ab-hero-glow--a" aria-hidden="true" />
          <div className="ab-hero-glow ab-hero-glow--b" aria-hidden="true" />

          <div className="container ab-hero-inner">
            <p className="eyebrow ab-hero-eyebrow">
              <span className="eyebrow-num">00</span>
              <span className="eyebrow-rule" aria-hidden="true" />
              About ASSISTREND
            </p>

            <h1 className="ab-hero-title" id="ab-hero-title">
              <span className="ab-hero-sans">If we unite today,</span>
              <span className="ab-hero-serif">we can be unique tomorrow.</span>
            </h1>

            <div className="ab-hero-deck">
              <p className="ab-hero-lede">
                ASSISTREND is a new-age wellness companion for young people — a data-driven,
                AI-powered platform that proactively supports personalised daily wellness
                through user mapping, predictive analytics and community engagement.
              </p>

              <dl className="ab-facts">
                {FACTS.map((f) => (
                  <div key={f.label} className="ab-fact">
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---- 01 Why ASSISTREND ---- */}
        <section className="ab-name" aria-labelledby="ab-name-title">
          <div className="container">
            <p className="eyebrow ab-name-eyebrow" data-reveal>
              <span className="eyebrow-num">01</span>
              <span className="eyebrow-rule" aria-hidden="true" />
              Why ASSISTREND
            </p>

            <h2 className="ab-name-word" id="ab-name-title" data-reveal style={{ '--reveal-delay': '80ms' }}>
              <span className="ab-name-assist">Assist</span>
              <span className="ab-name-plus" aria-hidden="true">+</span>
              <span className="accent-serif ab-name-trend">trend</span>
            </h2>

            <p className="ab-name-lede" data-reveal style={{ '--reveal-delay': '140ms' }}>
              To assist young people through the trends shaping their lives today — and
              to make proactive care itself a trend tomorrow.
            </p>

            <div className="ab-statements">
              <article className="ab-statement" data-reveal>
                <h3 className="ab-statement-label">Our mission</h3>
                <p className="ab-statement-text">
                  To create a world where every young mind is proactively supported through
                  digital communities that inspire <em className="accent-serif">meaningful offline</em> interactions.
                </p>
              </article>
              <article className="ab-statement" data-reveal style={{ '--reveal-delay': '100ms' }}>
                <h3 className="ab-statement-label">Our aim</h3>
                <p className="ab-statement-text">
                  To become an intelligent <em className="accent-serif">mental-health ecosystem</em>, worldwide.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ---- 02 How it works ---- */}
        <section className="ab-how" aria-labelledby="ab-how-title">
          <div className="container">
            <div className="ab-how-head">
              <p className="eyebrow" data-reveal>
                <span className="eyebrow-num">02</span>
                <span className="eyebrow-rule" aria-hidden="true" />
                How it works
              </p>
              <h2 className="ab-how-title" id="ab-how-title" data-reveal style={{ '--reveal-delay': '80ms' }}>
                Proactive, <span className="accent-serif ab-how-accent">not reactive.</span>
              </h2>
              <p className="ab-how-lede" data-reveal style={{ '--reveal-delay': '140ms' }}>
                Most support arrives after a crisis. ASSISTREND is designed for the moment
                before — a companion that works alongside a young person every day.
              </p>
            </div>

            <ol className="ab-pillars">
              {PILLARS.map((p, i) => (
                <li key={p.num} className="ab-pillar" data-reveal style={{ '--reveal-delay': `${i * 90}ms` }}>
                  <span className="ab-pillar-num" aria-hidden="true">{p.num}</span>
                  <h3 className="ab-pillar-name">{p.name}</h3>
                  <p className="ab-pillar-text">{p.text}</p>
                </li>
              ))}
            </ol>

            <a href="/#cohorts" className="ab-link" data-reveal>
              See the 3-phase cohort journey
              {ArrowIcon}
            </a>
          </div>
        </section>

        {/* ---- 03 Recognition ---- */}
        <section className="ab-rec" aria-labelledby="ab-rec-title">
          <div className="container">
            <p className="eyebrow ab-rec-eyebrow" data-reveal>
              <span className="eyebrow-num">03</span>
              <span className="eyebrow-rule" aria-hidden="true" />
              Recognition &amp; support
            </p>
            <h2 className="ab-rec-title" id="ab-rec-title" data-reveal style={{ '--reveal-delay': '80ms' }}>
              In good <span className="accent-serif ab-rec-accent">company.</span>
            </h2>

            <ul className="ab-rec-grid">
              {RECOGNITION.map((r, i) => (
                <li key={r.id} className={`ab-rec-card ab-rec-card--${r.id}`} data-reveal style={{ '--reveal-delay': `${i * 100}ms` }}>
                  <div className="ab-rec-badge">
                    <img src={r.logo} alt={r.logoAlt} loading="lazy" decoding="async" />
                  </div>
                  <span className="ab-rec-status">{r.status}</span>
                  <h3 className="ab-rec-name">{r.name}</h3>
                  <p className="ab-rec-text">{r.text}</p>
                </li>
              ))}
            </ul>

            <p className="ab-rec-note">
              Membership in NVIDIA Inception does not constitute an endorsement by NVIDIA of
              ASSISTREND&rsquo;s products or services.
            </p>
          </div>
        </section>

        {/* ---- 04 Team ---- */}
        <section className="ab-team" aria-labelledby="ab-team-title">
          <div className="container">
            <div className="ab-team-head">
              <p className="eyebrow" data-reveal>
                <span className="eyebrow-num">04</span>
                <span className="eyebrow-rule" aria-hidden="true" />
                The founding team
              </p>
              <h2 className="ab-team-title" id="ab-team-title" data-reveal style={{ '--reveal-delay': '80ms' }}>
                The people <span className="accent-serif ab-team-accent">behind it.</span>
              </h2>
            </div>

            <ul className="ab-team-grid">
              {TEAM_MEMBERS.map((m, i) => (
                <li key={m.title} className="ab-person" data-reveal style={{ '--reveal-delay': `${i * 90}ms` }}>
                  <div className="ab-person-photo">
                    <img src={m.src} alt={m.alt} loading="lazy" decoding="async" />
                  </div>
                  <h3 className="ab-person-name">{m.title}</h3>
                  <p className="ab-person-role">{m.subtitle}</p>
                  {m.detail && <p className="ab-person-detail">{m.detail}</p>}
                </li>
              ))}
            </ul>

            <p className="ab-team-note" data-reveal>
              Alongside a wider team of mentors, developers, designers, marketers and volunteers
              across Kerala.
            </p>
          </div>
        </section>

        {/* ---- Closing CTA ---- */}
        <section className="ab-cta" aria-labelledby="ab-cta-title">
          <div className="container ab-cta-inner">
            <h2 className="ab-cta-title" id="ab-cta-title" data-reveal>
              Grow together. <span className="accent-serif">Stress less.</span>
            </h2>
            <div className="ab-cta-actions" data-reveal style={{ '--reveal-delay': '100ms' }}>
              <a href="/#cohorts" className="ab-btn ab-btn--primary">
                Explore cohorts
                {ArrowIcon}
              </a>
              <a href="/#contact" className="ab-btn ab-btn--ghost">
                Contact us
              </a>
            </div>
          </div>
          <Colophon topHref="#about-hero" />
        </section>
      </main>
    </>
  );
}
