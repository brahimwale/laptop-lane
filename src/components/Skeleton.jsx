import { motion } from 'framer-motion'

function Skeleton({ width, height, borderRadius = '8px', className = '' }) {
  return (
    <motion.div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="product-card skeleton-card">
      <Skeleton height="200px" borderRadius="var(--radius) var(--radius) 0 0" />
      <div className="product-info">
        <Skeleton height="20px" width="80%" style={{ marginBottom: '8px' }} />
        <Skeleton height="16px" width="40%" style={{ marginBottom: '12px' }} />
        <Skeleton height="24px" width="60%" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="products-grid">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="product-detail-skeleton">
      <div className="skeleton-gallery">
        <Skeleton height="400px" borderRadius="var(--radius-lg)" />
        <div className="skeleton-thumbnails">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} height="80px" width="80px" />
          ))}
        </div>
      </div>
      <div className="skeleton-info">
        <Skeleton height="40px" width="70%" style={{ marginBottom: '16px' }} />
        <Skeleton height="20px" width="30%" style={{ marginBottom: '24px' }} />
        <Skeleton height="60px" width="50%" style={{ marginBottom: '24px' }} />
        <Skeleton height="120px" style={{ marginBottom: '24px' }} />
        <Skeleton height="48px" width="200px" />
      </div>
    </div>
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="category-card skeleton-card">
      <Skeleton height="160px" borderRadius="var(--radius-lg)" />
    </div>
  )
}

export function BlogCardSkeleton() {
  return (
    <div className="blog-card skeleton-card">
      <Skeleton height="200px" borderRadius="var(--radius)" />
      <div style={{ padding: '16px' }}>
        <Skeleton height="24px" width="80%" style={{ marginBottom: '8px' }} />
        <Skeleton height="16px" width="60%" />
      </div>
    </div>
  )
}

export default Skeleton