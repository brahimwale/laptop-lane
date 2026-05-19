import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Heart, Star } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { usePricing } from '../context/PricingContext'
import { useToastStore } from '../store/toastStore'
import { formatNaira } from '../utils/priceUtils'

function QuickView({ product, isOpen, onClose }) {
  const addItem = useCartStore(state => state.addItem)
  const isInWishlist = useWishlistStore(state => state.isInWishlist)
  const addItemToWishlist = useWishlistStore(state => state.addItem)
  const removeItemFromWishlist = useWishlistStore(state => state.removeItem)
  const { exchangeRate } = usePricing()
  const success = useToastStore(state => state.success)

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

  if (!product) return null

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem(product)
    success(`${product.name} added to cart`)
    onClose()
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeItemFromWishlist(product.id)
      success(`Removed from wishlist`)
    } else {
      addItemToWishlist(product)
      success(`Added to wishlist`)
    }
  }

  const price = product.price
  const salePrice = product.sale_price
  const discount = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="quick-view-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="quick-view-modal"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            <button className="quick-view-close" onClick={onClose}>
              <X size={24} />
            </button>

            <div className="quick-view-content">
              <div className="quick-view-image">
                <img src={product.images[0]} alt={product.name} />
                {discount > 0 && (
                  <span className="quick-view-discount">-{discount}%</span>
                )}
              </div>

              <div className="quick-view-info">
                <div className="quick-view-badges">
                  {product.is_new_arrival && <span className="badge badge-new">New</span>}
                  {product.is_best_seller && <span className="badge badge-best">Best Seller</span>}
                </div>

                <h2 className="quick-view-title">{product.name}</h2>

                <div className="quick-view-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'} 
                        color={i < Math.floor(product.rating) ? '#fbbf24' : '#d1d5db'} 
                      />
                    ))}
                  </div>
                  <span className="rating-text">{product.rating} ({product.review_count} reviews)</span>
                </div>

                <div className="quick-view-price">
                  {salePrice ? (
                    <>
                      <span className="quick-view-sale-price">
                        {formatNaira(salePrice, exchangeRate)}
                      </span>
                      <span className="quick-view-original-price">
                        {formatNaira(price, exchangeRate)}
                      </span>
                    </>
                  ) : (
                    <span className="quick-view-price-value">
                      {formatNaira(price, exchangeRate)}
                    </span>
                  )}
                </div>

                <p className="quick-view-description">{product.description}</p>

                <div className="quick-view-specs">
                  {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="quick-view-spec">
                      <span className="spec-label">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="quick-view-actions">
                  <motion.button 
                    className="quick-view-add-cart"
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </motion.button>
                  
                  <motion.button 
                    className={`quick-view-wishlist ${inWishlist ? 'active' : ''}`}
                    onClick={handleWishlistToggle}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
                  </motion.button>
                </div>

                <Link 
                  to={`/product/${product.slug}`} 
                  className="quick-view-full-details"
                  onClick={onClose}
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default QuickView