import { useEffect, useState, useRef, useCallback } from 'react'

interface ImageModalProps {
  images: Array<{ src: string; alt: string }>
  currentIndex: number
  isOpen: boolean
  onClose: () => void
}

export default function ImageModal({ images, currentIndex, isOpen, onClose }: ImageModalProps) {
  const [index, setIndex] = useState(currentIndex)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [initialPinchDistance, setInitialPinchDistance] = useState(0)
  const [initialZoom, setInitialZoom] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const touchStartX = useRef(0)

  useEffect(() => {
    setIndex(currentIndex)
  }, [currentIndex])

  useEffect(() => {
    if (!isOpen) {
      setZoom(1) // Reset zoom when modal closes
      setPan({ x: 0, y: 0 }) // Reset pan when modal closes
    }
  }, [isOpen])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && zoom > 1) {
      // Only allow panning when zoomed in
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      // Only allow panning when zoomed in
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleDoubleClick = () => {
    if (zoom === 1) {
      setZoom(2)
    } else {
      setZoom(1)
      setPan({ x: 0, y: 0 })
    }
  }

  const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
    return Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3))
    setPan({ x: 0, y: 0 }) // Reset pan when zooming
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1))
    setPan({ x: 0, y: 0 }) // Reset pan when zooming
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const goToPrevious = useCallback(() => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, index, goToPrevious, goToNext, onClose])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch to zoom
      setInitialPinchDistance(getDistance(e.touches[0], e.touches[1]))
      setInitialZoom(zoom)
    } else if (e.touches.length === 1) {
      // Single touch - record start position for swipe or pan
      touchStartX.current = e.changedTouches[0].screenX

      // Double-tap detection
      const currentTime = new Date().getTime()
      const tapLength = currentTime - lastTap
      if (tapLength < 300 && tapLength > 0) {
        // Double-tap detected
        if (zoom === 1) {
          setZoom(2)
        } else {
          setZoom(1)
          setPan({ x: 0, y: 0 })
        }
        e.preventDefault()
      }
      setLastTap(currentTime)

      if (zoom > 1) {
        // Only allow panning when zoomed in
        setIsDragging(true)
        setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y })
      }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance > 0) {
      // Pinch to zoom
      e.preventDefault()
      const currentDistance = getDistance(e.touches[0], e.touches[1])
      const scale = currentDistance / initialPinchDistance
      const newZoom = Math.min(Math.max(initialZoom * scale, 1), 3)
      setZoom(newZoom)
    } else if (e.touches.length === 1 && isDragging && zoom > 1) {
      // Only allow panning when zoomed in
      e.preventDefault()
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      })
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      // Touch ended
      setIsDragging(false)
      setInitialPinchDistance(0)

      // Only allow swipe when not zoomed in
      if (zoom === 1) {
        const touchEndX = e.changedTouches[0].screenX
        const swipeThreshold = 50
        const diff = touchStartX.current - touchEndX

        if (diff > swipeThreshold) {
          goToNext()
        } else if (diff < -swipeThreshold) {
          goToPrevious()
        }
      }
      // Don't reset pan when zoomed in - allow free movement
    }
  }

  if (!isOpen || images.length === 0) return null

  const currentImage = images[index]

  return (
    <div
      className="image-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <div
        className="image-modal__content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className="image-modal__close"
          onClick={onClose}
          aria-label="Close image viewer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {images.length > 1 && (
          <>
            <button
              className="image-modal__nav image-modal__nav--prev"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              className="image-modal__nav image-modal__nav--next"
              onClick={goToNext}
              aria-label="Next image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </>
        )}

        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="image-modal__img"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease',
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />

        {images.length > 1 && (
          <div className="image-modal__counter">
            {index + 1} / {images.length}
          </div>
        )}

        <div className="image-modal__zoom-controls">
          <button
            className="image-modal__zoom-btn"
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            aria-label="Zoom out"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
          <span className="image-modal__zoom-level">{Math.round(zoom * 100)}%</span>
          <button
            className="image-modal__zoom-btn"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            aria-label="Zoom in"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
