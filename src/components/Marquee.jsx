import { PHASES } from '../data/phases';
import './Marquee.css';

/* Every cohort highlight, in journey order */
const ITEMS = PHASES.flatMap((phase) => phase.tags);

/* Four-point sparkle — same glyph as the old cohorts badge */
const Sparkle = (
  <svg className="marquee-sparkle" viewBox="0 0 14 14" aria-hidden="true">
    <path d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z" />
  </svg>
);

export default function Marquee() {
  /* Track is rendered twice so the loop is seamless; the copy is hidden from AT */
  const renderTrack = (hidden) => (
    <ul className="marquee-track" aria-hidden={hidden || undefined}>
      {ITEMS.map((item, i) => (
        <li key={item} className="marquee-item">
          <span className={i % 2 ? 'marquee-text accent-serif' : 'marquee-text'}>{item}</span>
          {Sparkle}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee" role="region" aria-label="What each cohort includes">
      <div className="marquee-inner">
        {renderTrack(false)}
        {renderTrack(true)}
      </div>
    </div>
  );
}
