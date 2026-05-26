import { ORG_SHORT } from '../components/Layout'
import './Page.css'

export default function Donate() {
  const zelleUrl = import.meta.env.VITE_ZELLE_URL ?? ''
  const paypalUrl = import.meta.env.VITE_PAYPAL_URL ?? ''
  const stripeOneTimeUrl = import.meta.env.VITE_STRIPE_ONETIME_URL ?? ''
  const stripeMonthlyUrl = import.meta.env.VITE_STRIPE_MONTHLY_URL ?? ''

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__eyebrow">Donations</span>
          <h1>Support {ORG_SHORT} today</h1>
          <p className="lead">
            Your gift fuels bakeries, teacher support, education, and advocacy—where transparency
            and accountability matter.
          </p>
        </div>
      </section>

      <div className="page">
        <div className="donate-grid">
          <article className="card card--donate-option">
            <h2>Credit Card / Digital Wallet</h2>
            <p>Secure one-time or recurring gifts via Stripe.</p>
            <div className="cta-row">
              {stripeOneTimeUrl && (
                <a href={stripeOneTimeUrl} className="btn btn--primary" rel="noopener noreferrer">
                  One-time gift
                </a>
              )}
              {stripeMonthlyUrl && (
                <a href={stripeMonthlyUrl} className="btn btn--ghost" rel="noopener noreferrer">
                  Monthly support
                </a>
              )}
              {!stripeOneTimeUrl && !stripeMonthlyUrl && (
                <p className="muted">Stripe links coming soon.</p>
              )}
            </div>
          </article>

          <article className="card card--donate-option">
            <h2>Zelle</h2>
            <p>Direct bank transfer with zero fees.</p>
            {zelleUrl ? (
              <a href={zelleUrl} className="btn btn--primary" rel="noopener noreferrer">
                Open Zelle
              </a>
            ) : (
              <p className="muted">Zelle details coming soon.</p>
            )}
          </article>

          <article className="card card--donate-option">
            <h2>PayPal</h2>
            <p>Give using your PayPal balance or linked account.</p>
            {paypalUrl ? (
              <a href={paypalUrl} className="btn btn--primary" rel="noopener noreferrer">
                Give with PayPal
              </a>
            ) : (
              <p className="muted">PayPal link coming soon.</p>
            )}
          </article>
        </div>

        <div className="donate-info">
          <h3>Tax Information</h3>
          <p>
            Donations may be tax-deductible to the extent allowed by law. SADIQ is a registered
            nonprofit organization. Please consult your tax advisor for details regarding your
            specific situation.
          </p>
        </div>
      </div>
    </>
  )
}
