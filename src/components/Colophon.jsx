import logoMark from '../assets/logo-mark.png';
import './Colophon.css';

/* Shared page footer. `topHref` points at the current page's first section. */
export default function Colophon({ topHref = '#hero' }) {
  return (
    <div className="colophon container">
      <a href="/" className="colophon-brand" aria-label="ASSISTREND home">
        <img src={logoMark} alt="" aria-hidden="true" />
        <span>ASSISTREND</span>
      </a>
      <span className="colophon-motto">
        Grow together. <span className="accent-serif">Stress less.</span>
      </span>
      <a href={topHref} className="colophon-top">
        Back to top
        <span aria-hidden="true">↑</span>
      </a>
    </div>
  );
}
