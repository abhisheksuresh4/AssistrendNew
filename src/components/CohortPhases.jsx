import { useEffect, useRef, useState } from 'react';
import DitherVeil from './DitherVeil';
import { PHASES } from '../data/phases';
import './CohortPhases.css';

const pad = (n) => String(n).padStart(2, '0');

export default function CohortPhases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const phaseRefs = useRef([]);

  /* Track the phase crossing the upper-middle of the viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    phaseRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const active = PHASES[activeIndex];

  return (
    <section
      className="cohorts-section"
      id="cohorts"
      aria-labelledby="cohorts-title"
    >
      <div className="container cohorts-body">
        {/* ---- LEFT: Header + phase rows ---- */}
        <div className="cohorts-main">
          <header className="cohorts-header">
            <p className="eyebrow cohorts-eyebrow" data-reveal>
              <span className="eyebrow-num">01</span>
              <span className="eyebrow-rule" aria-hidden="true" />
              Structured Growth
            </p>

            <h2 className="cohorts-title" id="cohorts-title" data-reveal style={{ '--reveal-delay': '80ms' }}>
              A 3-Phase Journey Built for{' '}
              <span className="accent-serif cohorts-title-accent">
                Student Wellbeing & Success
              </span>
            </h2>
          </header>

          <ol className="phase-list">
            {PHASES.map((phase, index) => (
              <li
                key={phase.id}
                ref={(el) => { phaseRefs.current[index] = el; }}
                data-index={index}
                className={`phase-item${index === activeIndex ? ' is-active' : ''}`}
                aria-label={`${phase.label}: ${phase.name}`}
              >
                <span className="phase-number" aria-hidden="true">{pad(phase.number)}</span>

                <div className="phase-content">
                  <span className="phase-label">{phase.label}</span>
                  <h3 className="phase-name">{phase.name}</h3>
                  <p className="phase-description">{phase.description}</p>
                  <ul className="phase-tags" aria-label="Key highlights">
                    {phase.tags.map((tag) => (
                      <li key={tag} className="phase-tag">{tag}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ---- RIGHT: Sticky DitherVeil ---- */}
        <div className="cohorts-visual">
          <div className="cohorts-dither-wrapper">
            <DitherVeil
              src="/hero-figure.jpg"
              fit="cover"
              pattern="floyd"
              pixelSize={2}
              inkColor="#0F111A"
              paperColor="#e8e0f0"
              revealRadius={180}
              softness={0.6}
              linger={1}
              rimColor="#7132f5"
              rim={0.15}
              wander={true}
              clickBurst={true}
              contrast={1.15}
            />

            {/* Live caption — follows the active phase */}
            <div className="cohorts-dither-label" aria-hidden="true">
              <span className="cohorts-dither-label-dot" />
              <span className="cohorts-dither-label-num">{pad(active.number)} / {pad(PHASES.length)}</span>
              <span key={active.id} className="cohorts-dither-label-name">{active.name}</span>
            </div>

            {/* Phase progress ticks */}
            <div className="cohorts-progress" aria-hidden="true">
              {PHASES.map((phase, index) => (
                <span
                  key={phase.id}
                  className={`cohorts-progress-tick${index <= activeIndex ? ' is-filled' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
