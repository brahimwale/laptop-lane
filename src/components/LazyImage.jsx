import { useState } from 'react'
import { motion } from 'framer-motion'

function LazyImage({ src, alt, className, style }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`lazy-image-container ${className || ''}`} style={{ position: 'relative', ...style }}>
      {!isLoaded && !error && (
        <div className="lazy-image-placeholder">
          <div className="lazy-image-shimmer" />
        </div>
      )}
      
      {error && (
        <div className="lazy-image-error">
          <span>Failed to load</span>
        </div>
      )}
      
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        className={isLoaded ? 'loaded' : ''}
      />
    </div>
  )
}

export default LazyImage