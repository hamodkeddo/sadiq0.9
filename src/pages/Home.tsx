import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ORG_FULL, ORG_SHORT } from '../components/Layout'
import './Page.css'

const SLIDES = [
  {
    title: 'Support us today',
    subtitle: 'Invest in education, infrastructure, and hope for Syrian communities.',
    image: '/images/owl1.jpeg',
  },
  {
    title: 'Supporting Syrians abroad',
    subtitle: 'We connect diaspora energy with on-the-ground projects that restore dignity.',
    image: '/images/owl2.jpg',
  },
  {
    title: 'Empowering the community',
    subtitle: 'Partnerships and programs that build skills, jobs, and opportunity.',
    image: '/images/owl3.jpg',
  },
  {
    title: '360+ teachers in Qara, Syria',
    subtitle: 'Helping educators keep learning alive where it matters most.',
    image: '/images/owl4.jpg',
  },
  {
    image: '/images/landing.jpeg'
  }
] as const

export default function Home() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length)
    }, 6500)
    return () => window.clearInterval(id)
  }, [])

  const nextSlide = () => setSlide((s) => (s + 1) % SLIDES.length)
  const prevSlide = () => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)

  return (
    <>
      <section className="home-hero" aria-label="Featured highlights">
        <div className="home-hero__figure" aria-hidden="true">
          {SLIDES.map((s, i) => (
            <img
              key={s.image}
              src={s.image}
              alt=""
              width={1920}
              height={1080}
              decoding="async"
              className={`home-hero__img${i === slide ? ' home-hero__img--active' : ''}`}
            />
          ))}
        </div>

        <div className="home-hero__nav">
          <button
            type="button"
            className="home-hero__nav-btn home-hero__nav-btn--prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            type="button"
            className="home-hero__nav-btn home-hero__nav-btn--next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="home-hero__content">
          <div className="home-hero__slides" aria-live="polite">
            {SLIDES.map((s, i) => {
              const hasContent = 'title' in s || 'subtitle' in s;
              if (!hasContent) return null;

              return (
                <div
                  key={s.image}
                  className={`home-hero__slide${i === slide ? ' home-hero__slide--active' : ''}`}
                  aria-hidden={i !== slide}
                >
                  {'title' in s && s.title && <h2 className="home-hero__slide-title">{s.title}</h2>}
                  {'subtitle' in s && s.subtitle && <p className="home-hero__slide-sub">{s.subtitle}</p>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="home-hero__dots" role="tablist" aria-label="Hero highlights">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === slide}
              className={`home-hero__dot${i === slide ? ' home-hero__dot--active' : ''}`}
              onClick={() => setSlide(i)}
            >
              <span className="sr-only">Slide {i + 1}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-intro-section">
        <div className="home-hero__intro">
          <p className="home-hero__brand">
            <span className="home-hero__brand-mark">{ORG_SHORT}</span>
            <span className="home-hero__brand-full">{ORG_FULL}</span>
          </p>
          <h1 className="home-hero__headline">A new path to hope, education, and opportunity</h1>
          <p className="lead home-hero__lead">
            By investing in education, infrastructure, and economic empowerment, {ORG_SHORT}{' '}
            envisions a future where Syrians—no matter where they are—have the tools to rebuild
            their lives and contribute to a better society.
          </p>
          <div className="cta-row">
            <Link className="btn btn--donate" to="/donate">
              Donate now
            </Link>
            <Link className="btn btn--primary" to="/newsletter">
              Join the newsletter
            </Link>
            <Link className="btn btn--ghost" to="/projects">
              See projects
            </Link>
          </div>
        </div>
      </section>

      <section className="youtube-video-section">
        <div className="youtube-video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <div className="page">
        <section className="home-split" aria-labelledby="mission-heading">
          <div>
            <h2 id="mission-heading" className="section-title">
              Our mission
            </h2>
            <p className="home-prose">
              At {ORG_SHORT}, we work to restore, rebuild, and invest in Syria&apos;s future. We
              focus on education and workforce development, community rebuilding, economic
              empowerment, and global advocacy to uplift Syrians and revitalize war-affected
              areas.
            </p>
          </div>
          <div>
            <h2 className="section-title">Our vision</h2>
            <p className="home-prose">
              We believe in a future where every Syrian has access to education, financial
              independence, and the ability to contribute to a thriving society. Your support can
              make this vision a reality.
            </p>
            <Link className="home-inline-link" to="/contact">
              Get involved
            </Link>
          </div>
        </section>

        <section className="home-unity" aria-labelledby="unity-heading">
          <img
            className="home-unity__img"
            src="/images/Unity.jpg"
            alt=""
            width={1200}
            height={450}
            loading="lazy"
            decoding="async"
          />
          <div className="home-unity__caption">
            <h2 id="unity-heading" className="home-unity__title">
              #Unity with the board
            </h2>
            <p className="home-unity__text">
              Our leadership volunteers their time—working together across communities to advance
              the mission.
            </p>
            <Link className="home-inline-link" to="/board">
              Meet the board
            </Link>
          </div>
        </section>

        <h2 className="section-title home-section-title">Where we focus</h2>
        <div className="grid-3">
          <article className="card">
            <h3>Education &amp; workforce</h3>
            <p>
              Scholarships, teacher support, and vocational paths so people can earn a living and
              lead in their communities.
            </p>
          </article>
          <article className="card">
            <h3>Infrastructure &amp; essentials</h3>
            <p>
              Projects like bakeries restore daily stability—bread on the table and jobs that
              rebuild hope block by block.
            </p>
          </article>
          <article className="card">
            <h3>Advocacy &amp; connection</h3>
            <p>
              We amplify Syrian voices and connect donors, partners, and volunteers who share our
              commitment to transparent impact.
            </p>
          </article>
        </div>

        <section className="home-band" aria-labelledby="transparency-heading">
          <h2 id="transparency-heading" className="home-band__title">
            Transparency that earns trust
          </h2>
          <p className="home-band__text">
            <em>{ORG_SHORT} management members don&apos;t take compensation—our time is part of the
            contribution.</em> Transparency is fundamental: clear practices, regular audits, and
            rigorous standards (including CISA-aligned security and compliance practices) so
            supporters know their gifts are handled with care.
          </p>
          <Link className="btn btn--ghost home-band__btn" to="/contact">
            Ask a question
          </Link>
        </section>

        <section className="home-refer" aria-labelledby="refer-heading">
          <h2 id="refer-heading" className="section-title">
            Empower change — refer &amp; connect
          </h2>
          <p className="home-prose home-refer__lead">
            Change begins with connections. If you know an organization, donor, volunteer, or
            company that aligns with our mission to educate, empower, and rebuild Syrian
            communities, we encourage you to refer them to us.
          </p>
          <ul className="list-check">
            <li>
              <strong style={{ color: 'var(--ink)' }}>Nonprofits &amp; humanitarian groups — </strong>
              Partner for lasting social impact.
            </li>
            <li>
              <strong style={{ color: 'var(--ink)' }}>Corporate sponsors &amp; investors — </strong>
              Fund education and economic development programs.
            </li>
            <li>
              <strong style={{ color: 'var(--ink)' }}>Schools &amp; scholars — </strong>
              Contribute expertise, mentorship, or scholarships.
            </li>
            <li>
              <strong style={{ color: 'var(--ink)' }}>Volunteers &amp; professionals — </strong>
              Share time and skills in training and mentorship.
            </li>
            <li>
              <strong style={{ color: 'var(--ink)' }}>Media &amp; influencers — </strong>
              Help spread awareness of our mission.
            </li>
          </ul>
          <div className="cta-row">
            <Link className="btn btn--primary" to="/contact">
              Refer someone today
            </Link>
            <Link className="btn btn--ghost" to="/events">
              Upcoming events
            </Link>
          </div>
        </section>

        <section className="home-events-teaser" aria-labelledby="events-teaser-heading">
          <div>
            <h2 id="events-teaser-heading" className="section-title">
              Upcoming events
            </h2>
            <p className="home-prose">
              Join gatherings that celebrate Syrian culture and raise support for rebuilding—from
              community forums to special collaborations.
            </p>
          </div>
          <Link className="btn btn--primary" to="/events">
            Register &amp; learn more
          </Link>
        </section>
      </div>
    </>
  )
}
