import { Link } from 'react-router-dom'
import './Page.css'

export default function DonateSuccess() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__eyebrow">Success</span>
          <h1>Thank you for your gift</h1>
          <p className="lead">
            Your contribution has been received. We are deeply grateful for your support in
            rebuilding Syrian communities.
          </p>
        </div>
      </section>
      <div className="page">
        <div className="card card--feature">
          <p>
            A receipt has been sent to your email address. If you have any questions about your
            donation, please contact us.
          </p>
          <div className="cta-row" style={{ marginTop: '2rem' }}>
            <Link className="btn btn--primary" to="/">
              Return home
            </Link>
            <Link className="btn btn--ghost" to="/projects">
              See our projects
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
