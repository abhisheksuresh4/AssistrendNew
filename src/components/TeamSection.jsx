import FlexCarousel from './FlexCarousel';
import { TEAM_MEMBERS } from '../data/team';
import './TeamSection.css';

/* FlexCarousel cover-crops each portrait into its fixed 3:4 card (fit="portrait").
   It renders title + subtitle only, so the longer `detail` line stays off the carousel. */

export default function TeamSection() {
  return (
    <section
      className="team-section"
      id="community"
      aria-labelledby="team-title"
    >
      {/* Header — split: title left, intro right */}
      <header className="team-header container">
        <div className="team-header-lead">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow-num">02</span>
            <span className="eyebrow-rule" aria-hidden="true" />
            Community
          </p>

          <h2 className="team-title" id="team-title" data-reveal style={{ '--reveal-delay': '80ms' }}>
            Meet the People{' '}
            <span className="accent-serif team-title-accent">Behind ASSISTREND</span>
          </h2>
        </div>

        <div className="team-header-aside" data-reveal style={{ '--reveal-delay': '160ms' }}>
          <p className="team-subtitle">
            A passionate founding team driving student mental wellbeing
            through technology, mentorship, and community building.
          </p>
          <p className="team-hint">
            <span className="team-hint-count">{String(TEAM_MEMBERS.length).padStart(2, '0')}</span>
            Founding members — click a portrait to focus
          </p>
        </div>
      </header>

      {/* FlexCarousel */}
      <div className="team-carousel-wrapper">
        {/* Oversized outlined wordmark sitting behind the portraits */}
        <span className="team-wordmark" aria-hidden="true">Community</span>

        <FlexCarousel
          items={TEAM_MEMBERS}
          preset="liquid"
          intro="rise"
          fit="portrait"
          cardHeight={0.65}
          gap={16}
          radius={16}
          squeeze={0.15}
          focusOnClick
          captions
          dispersion={0.35}
        />
      </div>
    </section>
  );
}
