import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { usePricing } from '../context/PricingContext'
import { formatNaira } from '../utils/priceUtils'

function ProductCard({ product }) {
  const addItem = useCartStore(state => state.addItem)
  const isInWishlist = useWishlistStore(state => state.isInWishlist)
  const addItemToWishlist = useWishlistStore(state => state.addItem)
  const removeItemFromWishlist = useWishlistStore(state => state.removeItem)
  const { exchangeRate } = usePricing()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeItemFromWishlist(product.id)
    } else {
      addItemToWishlist(product)
    }
  }

  const price = product.price
  const salePrice = product.sale_price
  const discount = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0

  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <div className="product-image-wrapper">
        <img src={product.images[0]} alt={product.name} className="product-image" />
        
        <div className="product-badges">
          {product.is_new_arrival && <span className="badge badge-new">New</span>}
          {product.is_best_seller && <span className="badge badge-best">Best Seller</span>}
          {discount > 0 && <span className="badge badge-sale">-{discount}%</span>}
          {product.available_in_nigeria && <span className="badge badge-nigeria">🇳🇬 Available in Nigeria</span>}
        </div>

        <button 
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>

        <button className="quick-add-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
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
  )
}

export default ProductCard
