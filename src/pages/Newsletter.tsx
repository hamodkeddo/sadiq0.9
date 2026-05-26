import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { validateEmail, checkSpam } from '../utils/validation'
import './Page.css'

type Status = { type: 'idle' | 'loading' | 'success' | 'error'; message?: string }

export default function Newsletter() {
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
      subject: 'Newsletter',
      message: 'Please add me to the SADIQ newsletter.',
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

    if (!payload.name) {
      setStatus({ type: 'error', message: 'Please enter your name.' })
      return
    }

    setStatus({ type: 'loading' })
    try {
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
        message: 'You are on the list — watch your inbox for updates.',
      })
      form.reset()
      setLoadTime(Date.now())
    } catch {
      setStatus({
        type: 'error',
        message: 'Could not add to newsletter. Please try again or email us directly.',
      })
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__eyebrow">Stay close</span>
          <h1>Newsletter</h1>
          <p className="lead">
            Become a member of our mailing list for stories from the field, new projects, and
            upcoming events. We respect your inbox and never sell your information.
          </p>
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
          <button
            className="btn btn--primary"
            type="submit"
            disabled={status.type === 'loading'}
          >
            {status.type === 'loading' ? 'Signing up…' : 'Signup here'}
          </button>
          
          <p className="form-disclaimer">
            This site is protected by reCAPTCHA and the Google 
            <a href="https://policies.google.com/privacy"> Privacy Policy</a> and
            <a href="https://policies.google.com/terms"> Terms of Service</a> apply.
          </p>
          
          <p className="newsletter-footnote">
            Prefer to reach out directly? <Link to="/contact">Contact us</Link> anytime.
          </p>
        </form>
      </div>
    </>
  )
}

