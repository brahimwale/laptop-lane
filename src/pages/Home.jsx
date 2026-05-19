import { Link } from 'react-router-dom'
import { sampleProducts, categories } from '../data/sampleData'
import ProductCard from '../components/ProductCard'

function Home() {
  const featuredProducts = sampleProducts.filter(p => p.is_featured).slice(0, 4)
  const bestSellers = sampleProducts.filter(p => p.is_best_seller).slice(0, 4)
  const newArrivals = sampleProducts.filter(p => p.is_new_arrival).slice(0, 4)
  const onSale = sampleProducts.filter(p => p.sale_price).slice(0, 4)

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-badge">✨ New Arrivals 2026</span>
            <h1>Premium <span>Laptops</span> for Every Need</h1>
            <p>Discover high-performance laptops and accessories designed for work, gaming, and creativity. Free shipping on orders over $500.</p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn btn-primary">Shop Now →</Link>
              <Link to="/shop/gaming-laptops" className="btn btn-secondary">Explore Gaming</Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.8★</span>
                <span className="stat-label">Average Rating</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=500&fit=crop" alt="Premium Laptop" />
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by <span>Category</span></h2>
          <div className="categories-grid">
            {categories.slice(0, 6).map(cat => (
              <Link key={cat.id} to={`/shop/${cat.slug}`} className="category-card">
                <div className="category-image">
                  <img src={cat.image} alt={cat.name} />
                </div>
                <div className="category-overlay"></div>
                <div className="category-arrow">→</div>
                <div className="category-info">
                  <h3>{cat.name}</h3>
                  <p>{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="container promo-content">
          <div className="promo-card">
            <span className="promo-tag">🔥 Limited Offer</span>
            <h3>Gaming Laptops</h3>
            <p className="promo-price">From $1,899.99 <span className="original-price">$2,199.99</span></p>
            <p className="promo-desc">Save up to $300 on select gaming laptops</p>
            <Link to="/shop/gaming-laptops" className="btn btn-primary">Shop Gaming →</Link>
          </div>
          <div className="promo-card">
            <span className="promo-tag">✨ New Arrival</span>
            <h3>Ultra Slim Series</h3>
            <p className="promo-price">Starting at $899.99</p>
            <p className="promo-desc">Lightweight powerhouses for professionals</p>
            <Link to="/shop/ultrabooks" className="btn btn-primary">Explore Now →</Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/shop" className="view-all-link">View All →</Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="products-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Best Sellers</h2>
            <Link to="/shop" className="view-all-link">View All →</Link>
          </div>
          <div className="products-grid">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <Link to="/shop" className="view-all-link">View All →</Link>
          </div>
          <div className="products-grid">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* On Sale */}
      <section className="products-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">🔥 Hot Deals</h2>
            <Link to="/shop" className="view-all-link">View All →</Link>
          </div>
          <div className="products-grid">
            {onSale.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <h2 className="section-title">Why Choose <span>LaptopLane</span>?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Quality Guaranteed</h3>
              <p>Every product is tested and certified to meet the highest quality standards.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast Shipping</h3>
              <p>Free express shipping on orders over $500. Delivered to your doorstep.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3>30-Day Returns</h3>
              <p>Not satisfied? Return within 30 days for a full refund, no questions asked.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎧</div>
              <h3>Expert Support</h3>
              <p>Our tech experts are available 24/7 to help you choose the right product.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for exclusive deals, new arrivals, and tech tips.</p>
          <form className="newsletter-form-large">
            <input type="email" placeholder="Enter your email address" />
            <button type="submit">Subscribe Now</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home
