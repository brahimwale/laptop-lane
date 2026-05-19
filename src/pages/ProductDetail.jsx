import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { sampleProducts } from '../data/sampleData'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { usePricing } from '../context/PricingContext'
import { formatNaira } from '../utils/priceUtils'

function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const addItem = useCartStore(state => state.addItem)
  const isInWishlist = useWishlistStore(state => state.isInWishlist)
  const addItemToWishlist = useWishlistStore(state => state.addItem)
  const removeItemFromWishlist = useWishlistStore(state => state.removeItem)
  const { exchangeRate } = usePricing()
  const inWishlist = product ? isInWishlist(product.id) : false

  useEffect(() => {
    const found = sampleProducts.find(p => p.slug === slug)
    if (found) {
      setProduct(found)
      setSelectedImage(0)
    }
    window.scrollTo(0, 0)
  }, [slug])

  if (!product) {
    return (
      <div className="container not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeItemFromWishlist(product.id)
    } else {
      addItemToWishlist(product)
    }
  }

  const price = product.price
  const salePrice = product.sale_price
  const discount = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0

  const relatedProducts = sampleProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.name}</span>
        </div>

        {/* Product Main */}
        <div className="product-main">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
              {discount > 0 && <span className="sale-badge">-{discount}% OFF</span>}
            </div>
            {product.images.length > 1 && (
              <div className="thumbnail-list">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info-detail">
            <div className="product-header">
              {product.is_new_arrival && <span className="badge-new">New Arrival</span>}
              {product.is_best_seller && <span className="badge-best">Best Seller</span>}
            </div>
            
            <h1>{product.name}</h1>
            
            <div className="product-meta">
              <div className="product-rating-detail">
                <span className="stars-large">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                <span>{product.rating}</span>
                <span className="review-count">({product.review_count} reviews)</span>
              </div>
              <span className="sku">SKU: {product.sku}</span>
            </div>

            <div className="product-price-detail">
              {salePrice ? (
                <>
                  <span className="sale-price-large">{formatNaira(salePrice, exchangeRate)}</span>
                  <span className="original-price-large">{formatNaira(price, exchangeRate)}</span>
                  <span className="discount-badge">Save {formatNaira(price - salePrice, exchangeRate)}</span>
                </>
              ) : (
                <span className="price-large">{formatNaira(price, exchangeRate)}</span>
              )}
            </div>

            <p className="product-description-detail">{product.description}</p>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn-add-to-cart" onClick={handleAddToCart}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Add to Cart
                </button>
                <button className={`btn-wishlist ${inWishlist ? 'active' : ''}`} onClick={handleWishlistToggle}>
                  {inWishlist ? '❤️' : '🤍'}
                </button>
              </div>
            </div>

            <div className="product-stock-status">
              {product.stock_quantity > 0 ? (
                <span className="in-stock">✓ In Stock ({product.stock_quantity} available)</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            {/* Trust Badges */}
            <div className="trust-badges-detail">
              <div className="trust-item">
                <span>🚚</span>
                <span>Free Delivery in Lagos</span>
              </div>
              <div className="trust-item">
                <span>↩️</span>
                <span>7-Day Returns</span>
              </div>
              <div className="trust-item">
                <span>🛡️</span>
                <span>{product.local_warranty || '1-Year Warranty'}</span>
              </div>
              {product.available_in_nigeria && (
                <div className="trust-item nigeria-badge">
                  <span>🇳🇬</span>
                  <span>Available in Nigeria</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="product-tabs">
          <div className="tab-buttons">
            <button className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>
              Description
            </button>
            <button className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`} onClick={() => setActiveTab('specifications')}>
              Specifications
            </button>
            <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
              Reviews ({product.review_count})
            </button>
          </div>

          <div className="tab-content">
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
                    <span className="rating-stars">{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className="rating-total">out of 5 • {product.review_count} reviews</span>
                  </div>
                </div>
                <p className="reviews-note">Reviews from verified buyers</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>You May Also Like</h2>
            <div className="products-grid">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/product/${p.slug}`} className="product-card">
                  <div className="product-image-wrapper">
                    <img src={p.images[0]} alt={p.name} className="product-image" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{p.name}</h3>
                    <div className="product-price">
                      {p.salePrice ? (
                        <>
                          <span className="sale-price">${p.salePrice.toFixed(2)}</span>
                          <span className="original-price">${p.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="price">${p.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
