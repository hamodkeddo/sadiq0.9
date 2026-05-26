import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Page.css'
import ImageModal from '../components/ImageModal'

export default function Events() {
  const [selectedImage, setSelectedImage] = useState<{ images: Array<{ src: string; alt: string }>; index: number } | null>(null)

  const protestImages = Array.from({ length: 22 }, (_, i) => ({
    src: `/images/protest1/${String(i + 1).padStart(2, '0')}.jpeg`,
    alt: `Protest in Balboa Park ${i + 1}`
  }))

  const wasfiImages = [{
    src: '/images/Wasfi-event-2025.jpeg',
    alt: 'Wasfi Massarani Event'
  }]
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__eyebrow">Gatherings</span>
          <h1>Recent & Upcoming events</h1>
          <p className="lead">
            Celebrate culture, build community, and learn how you can support rebuilding efforts.
            New dates are added regularly—join the newsletter so you never miss an announcement.
          </p>
        </div>
      </section>
      <div className="page">
        <article className="card card--feature">
          <h2 className="card--feature__title">Featured</h2>
          <h3 className="card--feature__headline">Wasfi Massarani — Celebrate and rebuild Syria</h3>
          <p className="card--feature__text">
            An evening in collaboration with Syrian Forum: music, community, and conversation
            about how we move forward together. Registration details and venue will be posted here
            and shared with our mailing list.
          </p>
          <div className="card--feature__image">
            <img
              src="/images/Wasfi-event-2025.jpeg"
              alt="Wasfi Massarani Event"
              onClick={() => setSelectedImage({ images: wasfiImages, index: 0 })}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <p className="card--feature__meta">
            <strong>Status:</strong> ended — feb 22, 2025.
          </p>
          <div className="cta-row">
            <Link className="btn btn--primary" to="/newsletter">
              Get event updates
            </Link>
            <Link className="btn btn--ghost" to="/contact">
              Host or sponsor an event
            </Link>
          </div>
        </article>
      </div>
      <div className="page">
        <article className="card card--feature">
          <h2 className="card--feature__title">Featured</h2>
          <h3 className="card--feature__headline">protesting for complet sanction removal</h3>
          <p className="card--feature__text">
            Those pictures of january of January 2025 protesting in balboa park in San Diego to lift the sanctions on syria.
          </p>
          <div className="card--feature__image-grid">
            {protestImages.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                onClick={() => setSelectedImage({ images: protestImages, index })}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
          <p className="card--feature__meta">
            <strong>Status:</strong> ended — spring 2025.
          </p>
          
        </article>
      </div>
      <ImageModal
        images={selectedImage?.images || []}
        currentIndex={selectedImage?.index ?? 0}
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
      />
    </>
  )
}
