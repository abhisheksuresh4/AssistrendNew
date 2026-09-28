import { useState } from 'react';
import './ContactForm.css';

const FIELDS = {
  name: { label: 'Your name', type: 'text', autoComplete: 'name', required: true, error: 'Please tell us your name.' },
  email: { label: 'Email address', type: 'email', autoComplete: 'email', required: true, error: 'Please enter a valid email address.' },
  subject: { label: 'Subject', type: 'text', autoComplete: 'off', required: false, placeholder: 'Optional' },
};

const EMPTY = { name: '', email: '', subject: '', message: '' };

/* Web3Forms delivers submissions to the inbox the key was created with.
   The key is public by design (it can only send *to* that inbox) — set it in .env. */
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const ArrowIcon = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 10h10M11 6l4 4-4 4" />
  </svg>
);

/* Sends through Web3Forms when VITE_WEB3FORMS_KEY is set.
   Without a key it falls back to composing the email in the visitor's mail app. */
export default function ContactForm({ email }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  /* idle | sending | sent | drafted (mailto fallback) | error */
  const [status, setStatus] = useState('idle');
  const sending = status === 'sending';

  const validate = (form) => {
    const next = {};
    ['name', 'email', 'message'].forEach((key) => {
      const el = form.elements[key];
      if (!el.checkValidity()) {
        next[key] = key === 'message' ? 'Please write a short message.' : FIELDS[key].error;
      }
    });
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    const form = e.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      form.elements[firstInvalid].focus();
      return;
    }

    const name = values.name.trim();
    const subject = values.subject.trim() || `New message from ${name}`;

    /* No key configured — fall back to the visitor's mail app */
    if (!WEB3FORMS_KEY) {
      const body = `${values.message.trim()}\n\n— ${name} (${values.email.trim()})`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('drafted');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[ASSISTREND] ${subject}`,
          from_name: 'ASSISTREND Website',
          name,
          email: values.email.trim(), /* Web3Forms uses this as Reply-To */
          message: values.message.trim(),
          botcheck: form.elements.botcheck.checked, /* honeypot — bots tick it */
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || 'Send failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setStatus('idle');
  };

  const done = status === 'sent' || status === 'drafted';

  const renderField = (key) => {
    const f = FIELDS[key];
    const errorId = `cf-${key}-error`;
    return (
      <div className={`cf-field${errors[key] ? ' has-error' : ''}`} key={key}>
        <label className="cf-label" htmlFor={`cf-${key}`}>
          {f.label}
          {f.required && <span className="cf-required" aria-hidden="true">*</span>}
        </label>
        <input
          id={`cf-${key}`}
          className="cf-input"
          name={key}
          type={f.type}
          autoComplete={f.autoComplete}
          placeholder={f.placeholder}
          required={f.required}
          value={values[key]}
          onChange={handleChange}
          aria-invalid={errors[key] ? true : undefined}
          aria-describedby={errors[key] ? errorId : undefined}
        />
        {errors[key] && <p className="cf-error" id={errorId}>{errors[key]}</p>}
      </div>
    );
  };

  return (
    <div className="cf" id="contact-form">
      <div className="cf-intro" data-reveal>
        <p className="eyebrow">
          <span className="eyebrow-num">→</span>
          <span className="eyebrow-rule" aria-hidden="true" />
          Write to us
        </p>
        <h3 className="cf-title">
          Send us a <span className="accent-serif cf-title-accent">message</span>
        </h3>
        <p className="cf-lede">
          Questions about cohorts, mentorship, or working with us — tell us a
          little about yourself and what you&rsquo;re looking for.
        </p>
        <a className="cf-direct" href={`mailto:${email}`}>
          Or email us directly at <span>{email}</span>
        </a>
      </div>

      <div className="cf-panel" data-reveal style={{ '--reveal-delay': '120ms' }}>
        {done ? (
          <div className="cf-success" role="status">
            <span className="cf-success-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            {status === 'sent' ? (
              <>
                <h4 className="cf-success-title">Message sent</h4>
                <p className="cf-success-text">
                  Thanks, {values.name.trim().split(' ')[0]} — it&rsquo;s with the ASSISTREND team.
                  We&rsquo;ll reply to <strong>{values.email.trim()}</strong>.
                </p>
              </>
            ) : (
              <>
                <h4 className="cf-success-title">Your message is ready to send</h4>
                <p className="cf-success-text">
                  We&rsquo;ve opened it in your email app — hit send there and it&rsquo;ll reach us.
                  If nothing opened, write to <a href={`mailto:${email}`}>{email}</a>.
                </p>
              </>
            )}
            <button type="button" className="cf-reset" onClick={reset}>
              Write another message
            </button>
          </div>
        ) : (
          <form className="cf-form" onSubmit={handleSubmit} noValidate aria-busy={sending}>
            {/* Honeypot — hidden from people, ticked by bots */}
            <input
              type="checkbox"
              name="botcheck"
              className="cf-honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="cf-row">
              {renderField('name')}
              {renderField('email')}
            </div>
            {renderField('subject')}

            <div className={`cf-field${errors.message ? ' has-error' : ''}`}>
              <label className="cf-label" htmlFor="cf-message">
                Message<span className="cf-required" aria-hidden="true">*</span>
              </label>
              <textarea
                id="cf-message"
                className="cf-input cf-textarea"
                name="message"
                rows={5}
                required
                minLength={10}
                value={values.message}
                onChange={handleChange}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? 'cf-message-error' : undefined}
              />
              {errors.message && <p className="cf-error" id="cf-message-error">{errors.message}</p>}
            </div>

            {status === 'error' && (
              <p className="cf-send-error" role="alert">
                Your message couldn&rsquo;t be sent — please check your connection and try again,
                or email us at <a href={`mailto:${email}`}>{email}</a>.
              </p>
            )}

            <div className="cf-actions">
              <p className="cf-note"><span aria-hidden="true">*</span> Required</p>
              <button type="submit" className="cf-submit" disabled={sending}>
                {sending ? (
                  <>
                    Sending
                    <span className="cf-spinner" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    {status === 'error' ? 'Try again' : 'Send message'}
                    {ArrowIcon}
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
