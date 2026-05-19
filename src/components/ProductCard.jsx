import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { usePricing } from '../context/PricingContext'
import { useToastStore } from '../store/toastStore'
import { formatNaira } from '../utils/priceUtils'
import { Heart, ShoppingCart } from 'lucide-react'
import { cardHover } from '../utils/animationVariants'

function ProductCard({ product }) {
  const addItem = useCartStore(state => state.addItem)
  const isInWishlist = useWishlistStore(state => state.isInWishlist)
  const addItemToWishlist = useWishlistStore(state => state.addItem)
  const removeItemFromWishlist = useWishlistStore(state => state.removeItem)
  const { exchangeRate } = usePricing()
  const success = useToastStore(state => state.success)
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    success(`${product.name} added to cart`)
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
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
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
    >
      <Link to={`/product/${product.slug}`} className="product-card">
        <div className="product-image-wrapper">
          <img src={product.images[0]} alt={product.name} className="product-image" loading="lazy" />
          
          <div className="product-badges">
            {product.is_new_arrival && <span className="badge badge-new">New</span>}
            {product.is_best_seller && <span className="badge badge-best">Best Seller</span>}
            {discount > 0 && <span className="badge badge-sale">-{discount}%</span>}
            {product.available_in_nigeria && <span className="badge badge-nigeria">Available in Nigeria</span>}
          </div>

          <motion.button 
            className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            whileTap={{ scale: 0.9 }}
          >
            <Heart 
              size={20} 
              fill={inWishlist ? 'currentColor' : 'none'} 
              className={inWishlist ? 'wishlist-filled' : ''}
            />
          </motion.button>

          <motion.button 
            className="quick-add-btn" 
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </motion.button>
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>★</span>
              ))}
            </div>
            <span className="rating-count">({product.review_count})</span>
          </div>

          <div className="product-price">
            {salePrice ? (
              <>
                <span className="sale-price">{formatNaira(salePrice, exchangeRate)}</span>
                <span className="original-price">{formatNaira(price, exchangeRate)}</span>
              </>
            ) : (
              <span className="price">{formatNaira(price, exchangeRate)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard