import { Link } from 'react-router-dom'
import './Page.css'

export default function Projects() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__eyebrow">On the ground</span>
          <h1>Upcoming &amp; active projects</h1>
          <p className="lead">
            Practical initiatives that restore daily life and long-term opportunity—designed with
            partners in Syria and the diaspora, funded by people who believe in transparent
            impact.
          </p>
        </div>
      </section>
      <div className="page">
        <article className="card card--project">
          <div className="card--project__badge">Flagship</div>
          <h2>Bakery restoration — Qaboun &amp; beyond</h2>
          <p>
            Syria needs 160 bakeries. Our first project launches in Qaboun, aiming to restore missing
            bakeries across the country. The goal is straightforward: provide bread, create jobs,
            and rebuild hope—bringing dignity back to our people one bakery at a time.
          </p>
          <div className="card--project__image">
            <img src="/images/bakery.jpg" alt="Bakery" />
          </div>
          <div className="cta-row">
            <Link className="btn btn--donate" to="/donate">
              Contribute
            </Link>
            <Link className="btn btn--ghost" to="/contact">
              Partner with us
            </Link>
          </div>
        </article>

        <article className="card card--project" style={{ marginTop: '1.25rem' }}>
          <h2>Supporting educators — Qara</h2>
          <p>
            We are helping more than 360 teachers in Qara, Syria—keeping schools connected to
            resources and training so students keep learning despite extraordinary challenges.
          </p>
        </article>

        <p style={{ marginTop: '2rem', color: 'var(--muted)', maxWidth: '42rem' }}>
          Have an idea for a project or want to volunteer your expertise? We are always looking for
          aligned partners.
        </p>
        <div className="cta-row">
          <Link className="btn btn--primary" to="/contact">
            Start a conversation
          </Link>
        </div>
      </div>
    </>
  )
}
