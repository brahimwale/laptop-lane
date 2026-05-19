import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { sampleProducts, categories } from '../data/sampleData'
import ProductCard from '../components/ProductCard'
import QuickView from '../components/QuickView'
import { CheckCircle, Truck, RotateCcw, Headphones, ArrowRight } from 'lucide-react'
import { staggerContainer, fadeInUp, staggerContainerHome } from '../utils/animationVariants'
import { useToastStore } from '../store/toastStore'

function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [email, setEmail] = useState('')
  const success = useToastStore(state => state.success)
  const featuredProducts = sampleProducts.filter(p => p.is_featured).slice(0, 4)
  const bestSellers = sampleProducts.filter(p => p.is_best_seller).slice(0, 4)
  const newArrivals = sampleProducts.filter(p => p.is_new_arrival).slice(0, 4)
  const onSale = sampleProducts.filter(p => p.sale_price).slice(0, 4)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      success('Thank you for subscribing! Welcome to LaptopLane.')
      setEmail('')
    }
  }

  return (
    <motion.div 
      className="home"
      initial="hidden"
      animate="show"
      variants={staggerContainerHome}
    >
      {/* Hero Section */}
      <motion.section className="hero" variants={fadeInUp}>
        <div className="container hero-content">
          <motion.div className="hero-text" variants={fadeInUp}>
            <motion.span className="hero-badge" variants={fadeInUp}>
              New Arrivals 2026
            </motion.span>
            <motion.h1 variants={fadeInUp}>
              Premium <span>Laptops</span> for Every Need
            </motion.h1>
            <motion.p variants={fadeInUp}>
              Discover high-performance laptops and accessories designed for work, gaming, and creativity. Free shipping on orders over $500.
            </motion.p>
            <motion.div className="hero-buttons" variants={fadeInUp}>
              <Link to="/shop" className="btn btn-primary">Shop Now</Link>
              <Link to="/shop/gaming-laptops" className="btn btn-secondary">Explore Gaming</Link>
            </motion.div>
            <motion.div className="hero-stats" variants={fadeInUp}>
              <div className="stat">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.8</span>
                <span className="stat-label">Average Rating</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div className="hero-image" variants={fadeInUp}>
            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=500&fit=crop" alt="Premium Laptop" loading="lazy" />
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Showcase */}
      <motion.section className="categories-section" variants={fadeInUp}>
        <div className="container">
          <motion.h2 className="section-title" variants={fadeInUp}>
            Shop by <span>Category</span>
          </motion.h2>
          <motion.div className="categories-grid" variants={staggerContainer}>
            {categories.slice(0, 6).map((cat, index) => (
              <motion.div key={cat.id} variants={fadeInUp} custom={index}>
                <Link to={`/shop/${cat.slug}`} className={`category-card ${index === 0 ? 'featured' : ''}`}>
                  <div className="category-image">
                    <img src={cat.image} alt={cat.name} loading="lazy" />
                  </div>
                  <div className="category-overlay"></div>
                  <div className="category-arrow">
                    <ArrowRight size={20} color="#1e40af" />
                  </div>
                  <div className="category-info">
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Promotional Banner */}
      <motion.section className="promo-banner" variants={fadeInUp}>
        <div className="container promo-content">
          <motion.div className="promo-card" variants={fadeInUp}>
            <span className="promo-tag">Limited Offer</span>
            <h3>Gaming Laptops</h3>
            <p className="promo-price">From $1,899.99 <span className="original-price">$2,199.99</span></p>
            <p className="promo-desc">Save up to $300 on select gaming laptops</p>
            <Link to="/shop/gaming-laptops" className="btn btn-primary">Shop Gaming</Link>
          </motion.div>
          <motion.div className="promo-card" variants={fadeInUp}>
            <span className="promo-tag">New Arrival</span>
            <h3>Ultra Slim Series</h3>
            <p className="promo-price">Starting at $899.99</p>
            <p className="promo-desc">Lightweight powerhouses for professionals</p>
            <Link to="/shop/ultrabooks" className="btn btn-primary">Explore Now</Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section className="products-section" variants={fadeInUp}>
        <div className="container">
          <motion.div className="section-header" variants={fadeInUp}>
            <h2 className="section-title">Featured Products</h2>
            <Link to="/shop" className="view-all-link">View All</Link>
          </motion.div>
          <motion.div className="products-grid" variants={staggerContainer}>
            {featuredProducts.map(product => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard 
                  product={product} 
                  showQuickView={true}
                  onQuickView={setQuickViewProduct}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Best Sellers */}
      <motion.section className="products-section bg-light" variants={fadeInUp}>
        <div className="container">
          <motion.div className="section-header" variants={fadeInUp}>
            <h2 className="section-title">Best Sellers</h2>
            <Link to="/shop" className="view-all-link">View All</Link>
          </motion.div>
          <motion.div className="products-grid" variants={staggerContainer}>
            {bestSellers.map(product => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard 
                  product={product} 
                  showQuickView={true}
                  onQuickView={setQuickViewProduct}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* New Arrivals */}
      <motion.section className="products-section" variants={fadeInUp}>
        <div className="container">
          <motion.div className="section-header" variants={fadeInUp}>
            <h2 className="section-title">New Arrivals</h2>
            <Link to="/shop" className="view-all-link">View All</Link>
          </motion.div>
          <motion.div className="products-grid" variants={staggerContainer}>
            {newArrivals.map(product => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard 
                  product={product} 
                  showQuickView={true}
                  onQuickView={setQuickViewProduct}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* On Sale */}
      <motion.section className="products-section bg-light" variants={fadeInUp}>
        <div className="container">
          <motion.div className="section-header" variants={fadeInUp}>
            <h2 className="section-title">Hot Deals</h2>
            <Link to="/shop" className="view-all-link">View All</Link>
          </motion.div>
          <motion.div className="products-grid" variants={staggerContainer}>
            {onSale.map(product => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard 
                  product={product} 
                  showQuickView={true}
                  onQuickView={setQuickViewProduct}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section className="why-choose-us" variants={fadeInUp}>
        <div className="container">
          <motion.h2 className="section-title" variants={fadeInUp}>
            Why Choose <span>LaptopLane</span>?
          </motion.h2>
          <motion.div className="features-grid" variants={staggerContainer}>
            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon"><CheckCircle size={40} /></div>
              <h3>Quality Guaranteed</h3>
              <p>Every product is tested and certified to meet the highest quality standards.</p>
            </motion.div>
            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon"><Truck size={40} /></div>
              <h3>Fast Shipping</h3>
              <p>Free express shipping on orders over $500. Delivered to your doorstep.</p>
            </motion.div>
            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon"><RotateCcw size={40} /></div>
              <h3>30-Day Returns</h3>
              <p>Not satisfied? Return within 30 days for a full refund, no questions asked.</p>
            </motion.div>
            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon"><Headphones size={40} /></div>
              <h3>Expert Support</h3>
              <p>Our tech experts are available 24/7 to help you choose the right product.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section className="newsletter-section" variants={fadeInUp}>
        <div className="container newsletter-content">
          <motion.h2 variants={fadeInUp}>Stay Updated</motion.h2>
          <motion.p variants={fadeInUp}>
            Subscribe to our newsletter for exclusive deals, new arrivals, and tech tips.
          </motion.p>
          <motion.form 
              className="newsletter-form-large" 
              variants={fadeInUp}
              onSubmit={handleNewsletterSubmit}
            >
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe Now</button>
            </motion.form>
        </div>
      </motion.section>
      <QuickView 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)}
      />
    </motion.div>
  )
}

export default Home