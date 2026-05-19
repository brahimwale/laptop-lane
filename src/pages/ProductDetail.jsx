import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { sampleProducts } from '../data/sampleData'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { usePricing } from '../context/PricingContext'
import { useToastStore } from '../store/toastStore'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'
import { formatNaira } from '../utils/priceUtils'
import { Heart, ShoppingCart, Truck, RotateCcw, Shield, CheckCircle, XCircle } from 'lucide-react'
import { ProductDetailSkeleton } from '../components/Skeleton'
import { staggerContainer, fadeInUp } from '../utils/animationVariants'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductCard from '../components/ProductCard'

function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [isLoading, setIsLoading] = useState(true)
  const addItem = useCartStore(state => state.addItem)
  const isInWishlist = useWishlistStore(state => state.isInWishlist)
  const addItemToWishlist = useWishlistStore(state => state.addItem)
  const removeItemFromWishlist = useWishlistStore(state => state.removeItem)
  const { exchangeRate } = usePricing()
  const success = useToastStore(state => state.success)
  const { recentProducts, addToRecentlyViewed } = useRecentlyViewed()
  const inWishlist = product ? isInWishlist(product.id) : false

  useEffect(() => {
    setIsLoading(true)
    window.scrollTo(0, 0)
    
    const timer = setTimeout(() => {
      const found = sampleProducts.find(p => p.slug === slug)
      if (found) {
        setProduct(found)
        setSelectedImage(0)
        addToRecentlyViewed(found.id)
      }
      setIsLoading(false)
    }, 600)
    
    return () => clearTimeout(timer)
  }, [slug, addToRecentlyViewed])

  if (isLoading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <ProductDetailSkeleton />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <motion.div 
        className="container not-found"
        initial="hidden"
        animate="show"
        variants={fadeInUp}
      >
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </motion.div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    success(`${product.name} added to cart`)
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

  const relatedProducts = sampleProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <motion.div 
      className="product-detail-page"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <div className="container">
        <motion.div className="breadcrumbs" variants={fadeInUp}>
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.name}</span>
        </motion.div>

        <motion.div className="product-main" variants={fadeInUp}>
          <motion.div className="product-gallery" variants={fadeInUp}>
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
              {discount > 0 && <span className="sale-badge">-{discount}% OFF</span>}
            </div>
            {product.images.length > 1 && (
              <motion.div className="thumbnail-list" variants={staggerContainer}>
                {product.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImage(idx)}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} loading="lazy" />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>

          <motion.div className="product-info-detail" variants={fadeInUp}>
            <motion.div className="product-header" variants={fadeInUp}>
              {product.is_new_arrival && <span className="badge-new">New Arrival</span>}
              {product.is_best_seller && <span className="badge-best">Best Seller</span>}
            </motion.div>
            
            <motion.h1 variants={fadeInUp}>{product.name}</motion.h1>
            
            <motion.div className="product-meta" variants={fadeInUp}>
              <div className="product-rating-detail">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>★</span>
                  ))}
                </div>
                <span>{product.rating}</span>
                <span className="review-count">({product.review_count} reviews)</span>
              </div>
              <span className="sku">SKU: {product.sku}</span>
            </motion.div>

            <motion.div className="product-price-detail" variants={fadeInUp}>
              {salePrice ? (
                <>
                  <span className="sale-price-large">{formatNaira(salePrice, exchangeRate)}</span>
                  <span className="original-price-large">{formatNaira(price, exchangeRate)}</span>
                  <span className="discount-badge">Save {formatNaira(price - salePrice, exchangeRate)}</span>
                </>
              ) : (
                <span className="price-large">{formatNaira(price, exchangeRate)}</span>
              )}
            </motion.div>

            <motion.p className="product-description-detail" variants={fadeInUp}>
              {product.description}
            </motion.p>

            <motion.div className="product-actions" variants={fadeInUp}>
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <motion.button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <span>{quantity}</span>
                  <motion.button 
                    onClick={() => setQuantity(quantity + 1)}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              <div className="action-buttons">
                <motion.button 
                  className="btn-add-to-cart" 
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </motion.button>
                <motion.button 
                  className={`btn-wishlist ${inWishlist ? 'active' : ''}`} 
                  onClick={handleWishlistToggle}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart size={20} />
                </motion.button>
              </div>
            </motion.div>

            <motion.div className="product-stock-status" variants={fadeInUp}>
              {product.stock_quantity > 0 ? (
                <span className="in-stock"><CheckCircle size={16} /> In Stock ({product.stock_quantity} available)</span>
              ) : (
                <span className="out-of-stock"><XCircle size={16} /> Out of Stock</span>
              )}
            </motion.div>

            <motion.div className="trust-badges-detail" variants={fadeInUp}>
              <div className="trust-item">
                <Truck size={20} />
                <span>Free Delivery in Lagos</span>
              </div>
              <div className="trust-item">
                <RotateCcw size={20} />
                <span>7-Day Returns</span>
              </div>
              <div className="trust-item">
                <Shield size={20} />
                <span>{product.local_warranty || '1-Year Warranty'}</span>
              </div>
              {product.available_in_nigeria && (
                <div className="trust-item nigeria-badge">
                  <span>Available in Nigeria</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="product-tabs" variants={fadeInUp}>
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`} 
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`} 
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} 
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.review_count})
            </button>
          </div>

          <motion.div className="tab-content" variants={fadeInUp} key={activeTab}>
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <h4>Key Features:</h4>
                <ul>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-panel">
                <h3>Technical Specifications</h3>
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td className="spec-label">{key}</td>
                        <td className="spec-value">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <h3>Customer Reviews</h3>
                <div className="reviews-summary">
                  <div className="rating-big">
                    <span className="rating-number">{product.rating}</span>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>★</span>
                      ))}
                    </div>
                    <span className="rating-total">out of 5 • {product.review_count} reviews</span>
                  </div>
                </div>
                <p className="reviews-note">Reviews from verified buyers</p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {relatedProducts.length > 0 && (
          <motion.section className="related-products" variants={fadeInUp}>
            <h2>You May Also Like</h2>
            <div className="products-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </motion.section>
        )}

        {recentProducts.length > 0 && (
          <motion.section className="recently-viewed" variants={fadeInUp}>
            <h2>Recently Viewed</h2>
            <div className="recently-viewed-grid">
              {recentProducts.slice(0, 5).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.div>
  )
}

export default ProductDetail