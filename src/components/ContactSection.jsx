import ContactForm from './ContactForm';
import Colophon from './Colophon';
import './ContactSection.css';

/* Icons — inline so they inherit currentColor (matches TeamSection's badge svg) */
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m3.5 6.5 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const AddressIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 20.5V5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 16 5v15.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M16 9.5h2.5A1.5 1.5 0 0 1 20 11v9.5M2.5 20.5h19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 7.5h5M7.5 11h5M7.5 14.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/* Contact details — hoisted static data (Vercel React: rendering-hoist-jsx). */
const CONTACT_DETAILS = [
  {
    id: 'email',
    Icon: MailIcon,
    label: 'Email',
    href: 'mailto:assistrendai@gmail.com',
    lines: ['assistrendai@gmail.com'],
  },
  {
    id: 'phone',
    Icon: PhoneIcon,
    label: 'Phone',
    href: 'tel:+919495279233',
    lines: ['+91 94952 79233'],
  },
  {
    id: 'billing',
    Icon: AddressIcon,
    label: 'Registered Address',
    lines: [
      'ASSISTREND',
      '13/071, Meppuram, Vysombhagom',
      'Kuttanad, Alappuzha',
      'Kerala, India — 688005',
    ],
  },
];

const CONTACT_EMAIL = CONTACT_DETAILS.find((d) => d.id === 'email').lines[0];

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        {/* Left — eyebrow, display headline, scroll cue */}
        <div className="contact-lead">
          <p className="eyebrow contact-eyebrow" data-reveal>
            <span className="eyebrow-num">03</span>
            <span className="eyebrow-rule" aria-hidden="true" />
            Contact Us
          </p>

          <h2 className="contact-title" id="contact-title" data-reveal style={{ '--reveal-delay': '80ms' }}>
            Contact
            <br />
            the ASSISTREND
            <br />
            <span className="accent-serif contact-title-accent">Team</span>
          </h2>

          <a href="#contact-form" className="contact-scroll">
            <span className="contact-scroll-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M3 8.5 7 12.5l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Scroll down to contact form
          </a>
        </div>

        {/* Right — detail cards */}
        <ul className="contact-cards" role="list">
          {CONTACT_DETAILS.map(({ id, Icon, label, href, lines }, i) => (
            <li
              key={id}
              className={`contact-card contact-card-${id}`}
              role="listitem"
              data-reveal
              style={{ '--reveal-delay': `${120 + i * 90}ms` }}
            >
              <span className="contact-card-icon">
                <Icon />
              </span>

              <h3 className="contact-card-label">{label}</h3>

              {href ? (
                <a className="contact-card-value contact-card-link" href={href}>
                  {lines[0]}
                </a>
              ) : (
                <address className="contact-card-value">
                  {lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact form — target of the scroll cue above */}
      <div className="container">
        <ContactForm email={CONTACT_EMAIL} />
      </div>

      <Colophon />
    </section>
  );
}
