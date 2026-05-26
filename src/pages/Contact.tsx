import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { validateEmail, checkSpam } from '../utils/validation'
import './Page.css'

type Status = { type: 'idle' | 'loading' | 'success' | 'error'; message?: string }

export default function Contact() {
  const [status, setStatus] = useState<Status>({ type: 'idle' })
  const [loadTime, setLoadTime] = useState(0)

  useEffect(() => {
    setLoadTime(Date.now())
  }, [])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      subject: String(fd.get('subject') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
      _gotcha: String(fd.get('_gotcha') ?? '') // Honeypot field
    }

    // Client-side spam checks
    const spamCheck = checkSpam(payload._gotcha, loadTime, 3000)
    if (spamCheck.isSpam) {
      console.warn('[Spam Detection]', spamCheck.reason)
      setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' })
      return
    }

    // Comprehensive email validation
    const emailCheck = validateEmail(payload.email)
    if (!emailCheck.valid) {
      setStatus({ type: 'error', message: emailCheck.error })
      return
    }

    if (!payload.name || !payload.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' })
      return
    }

    setStatus({ type: 'loading' })
    try {
      // Use a configurable form endpoint (e.g., Formspree)
      const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT ?? 'https://formspree.io/'
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        throw new Error('Form submission failed')
      }
      setStatus({
        type: 'success',
        message: 'Thank you — we will get back to you soon.',
      })
      form.reset()
      setLoadTime(Date.now()) // Reset timing for next submission
    } catch {
      setStatus({
        type: 'error',
        message: 'Could not send message. Please try again or email us directly.',
      })
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__eyebrow">Contact</span>
          <h1>We&apos;d love to hear from you</h1>
          <p className="lead">
            Partnerships, donations, media, referrals, or questions about our programs—send a note
            and our team will respond as soon as we can.
          </p>
          <ul className="contact-direct">
            <li>
              <a href="mailto:info@sadiqfoundation.info">info@sadiqfoundation.info</a>
            </li>
            <li>
              <a href="tel:+14423093132">(442) 309-3132</a>
            </li>
          </ul>
        </div>
      </section>
      <div className="page">
        <form className="form" onSubmit={onSubmit} noValidate>
          {status.type === 'success' && (
            <div className="form-status form-status--ok" role="status">
              {status.message}
            </div>
          )}
          {status.type === 'error' && (
            <div className="form-status form-status--err" role="alert">
              {status.message}
            </div>
          )}
          
          {/* Honeypot field (hidden from users) */}
          <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <label>
            Name
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Subject
            <select name="subject" defaultValue="">
              <option value="">General inquiry</option>
              <option value="Volunteering">Volunteering</option>
              <option value="Partnership">Partnership</option>
              <option value="Referral">Referral</option>
              <option value="Media">Media</option>
              <option value="Donations">Donations</option>
            </select>
          </label>
          <label>
            Message
            <textarea name="message" required placeholder="How can we help?" />
          </label>
          <button
            className="btn btn--primary"
            type="submit"
            disabled={status.type === 'loading'}
          >
            {status.type === 'loading' ? 'Sending…' : 'Send message'}
          </button>
          
          <p className="form-disclaimer">
            This site is protected by reCAPTCHA and the Google 
            <a href="https://policies.google.com/privacy"> Privacy Policy</a> and
            <a href="https://policies.google.com/terms"> Terms of Service</a> apply.
          </p>
        </form>
      </div>
    </>
  )
}
