import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Layout.css'

export const ORG_SHORT = 'SADIQ'
export const ORG_FULL = 'Syrian American Development & Investment Quorum'

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <div className={`site ${isHome ? 'site--home' : ''}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`site-header ${isHome ? 'site-header--transparent' : ''}`}>
        <div className="site-header__inner">
          <NavLink to="/" className="site-logo" end>
            <img
              className="site-logo__img"
              src="/images/logo.png"
              alt=""
              width={120}
              height={30}
              decoding="async"
            />
            <span className="site-logo__text">
              <span className="site-logo__name">{ORG_SHORT}</span>
              <span className="site-logo__tag">{ORG_FULL}</span>
            </span>
          </NavLink>
          
          <nav className={`site-nav ${isMenuOpen ? 'site-nav--open' : ''}`} aria-label="Primary">
            <div className="site-nav__center">
              <NavLink to="/" className="site-nav__link" end>
                Home
              </NavLink>
              <NavLink to="/board" className="site-nav__link">
                Board
              </NavLink>
              <NavLink to="/projects" className="site-nav__link">
                Projects
              </NavLink>
              <NavLink to="/events" className="site-nav__link">
                Events
              </NavLink>
              <NavLink to="/newsletter" className="site-nav__link">
                Newsletter
              </NavLink>
              <NavLink to="/contact" className="site-nav__link">
                Contact
              </NavLink>
            </div>
            <NavLink to="/donate" className="site-nav__link site-nav__link--donate-mobile">
              DONATE NOW
            </NavLink>
          </nav>

          <NavLink to="/donate" className="site-nav__link--header">
            DONATE NOW
          </NavLink>

          <div className="site-header__actions">
            <button 
              className={`mobile-toggle ${isMenuOpen ? 'mobile-toggle--active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="mobile-toggle__bar"></span>
              <span className="mobile-toggle__bar"></span>
              <span className="mobile-toggle__bar"></span>
            </button>
          </div>
        </div>
      </header>
      <main id="main" className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="site-footer__grid">
          <div>
            <p className="site-footer__brand">
              <img
                className="site-footer__logo"
                src="/images/logo.png"
                alt=""
                width={180}
                height={45}
                loading="lazy"
                decoding="async"
              />
            </p>
            <p className="site-footer__org">{ORG_SHORT}</p>
            <p className="site-footer__tagline">{ORG_FULL}</p>
            <p className="site-footer__blurb">
              Rebuilding Syria through education, infrastructure, and economic empowerment—with
              full transparency and zero management compensation.
            </p>
          </div>
          <div>
            <p className="site-footer__heading">Contact</p>
            <p className="site-footer__contact">
              <a href="mailto:info@sadiqfoundation.info">info@sadiqfoundation.info</a>
            </p>
            <p className="site-footer__contact">
              <a href="tel:+14423093132">(442) 309-3132</a>
            </p>
          </div>
          <div>
            <p className="site-footer__heading">Explore</p>
            <ul className="site-footer__links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/board">Board members</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/events">Upcoming events</Link>
              </li>
              <li>
                <Link to="/donate">Donations</Link>
              </li>
              <li>
                <Link to="/newsletter">Newsletter</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="site-footer__heading">Stay connected</p>
            <p className="site-footer__social">
              <a
                href="https://www.facebook.com/profile.php?id=61572231586054&mibextid=wwXIfr"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <span aria-hidden="true"> · </span>
              <a href="https://x.com/sadiq_san_diego?s=11" rel="noopener noreferrer">
                X (Twitter)
              </a>
              <span aria-hidden="true"> · </span>
              <a
                href="https://www.instagram.com/thesadiq.1?igsh=NTc4MTIwNjQ2YQ=="
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </p>
            <p className="site-footer__donate">
              <Link to="/donate">Support our work</Link>
            </p>
          </div>
        </div>
        <p className="site-footer__copy">
          © {new Date().getFullYear()} Sadiq Foundation. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
