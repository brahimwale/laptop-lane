import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { sampleProducts, categories } from '../data/sampleData'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton } from '../components/Skeleton'
import { Filter, X } from 'lucide-react'
import { staggerContainer, fadeInUp } from '../utils/animationVariants'

function Shop() {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      let filtered = sampleProducts
      
      if (category) {
        filtered = filtered.filter(p => p.category === category)
      }
      
      if (priceRange === 'under500') {
        filtered = filtered.filter(p => (p.sale_price || p.price) < 500)
      } else if (priceRange === '500to1000') {
        filtered = filtered.filter(p => (p.sale_price || p.price) >= 500 && (p.sale_price || p.price) <= 1000)
      } else if (priceRange === '1000to2000') {
        filtered = filtered.filter(p => (p.sale_price || p.price) >= 1000 && (p.sale_price || p.price) <= 2000)
      } else if (priceRange === 'over2000') {
        filtered = filtered.filter(p => (p.sale_price || p.price) > 2000)
      }
      
      if (sortBy === 'price-low') {
        filtered.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price))
      } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price))
      } else if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating)
      } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name))
      }
      
      setProducts(filtered)
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [category, sortBy, priceRange])

  const currentCategory = categories.find(c => c.slug === category)

  return (
    <motion.div 
      className="shop-page"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <motion.div className="shop-header" variants={fadeInUp}>
        <div className="container">
          <h1>{currentCategory ? currentCategory.name : 'All Products'}</h1>
          <p className="shop-subtitle">
            {isLoading ? 'Loading...' : `${products.length} product${products.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
      </motion.div>

      <div className="container shop-content">
        <motion.aside 
          className={`shop-sidebar ${showFilters ? 'open' : ''}`}
          variants={fadeInUp}
        >
          <button className="close-filters" onClick={() => setShowFilters(false)}>
            <X size={24} />
          </button>
          
          <div className="filter-section">
            <h3>Categories</h3>
            <ul className="category-list">
              <li>
                <Link to="/shop" className={!category ? 'active' : ''}>All Products</Link>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop/${cat.slug}`} className={category === cat.slug ? 'active' : ''}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-filters">
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  value="all" 
                  checked={priceRange === 'all'}
                  onChange={() => setPriceRange('all')}
                />
                All Prices
              </label>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  value="under500" 
                  checked={priceRange === 'under500'}
                  onChange={() => setPriceRange('under500')}
                />
                Under $500
              </label>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  value="500to1000" 
                  checked={priceRange === '500to1000'}
                  onChange={() => setPriceRange('500to1000')}
                />
                $500 - $1,000
              </label>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  value="1000to2000" 
                  checked={priceRange === '1000to2000'}
                  onChange={() => setPriceRange('1000to2000')}
                />
                $1,000 - $2,000
              </label>
              <label>
                <input 
                  type="radio" 
                  name="price" 
                  value="over2000" 
                  checked={priceRange === 'over2000'}
                  onChange={() => setPriceRange('over2000')}
                />
                Over $2,000
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Quick Filters</h3>
            <div className="quick-filters">
              <Link to="/shop/gaming-laptops" className="filter-tag">Gaming Laptops</Link>
              <Link to="/shop/business-laptops" className="filter-tag">Business</Link>
              <Link to="/shop/ultrabooks" className="filter-tag">Ultrabooks</Link>
              <Link to="/shop/accessories" className="filter-tag">Accessories</Link>
            </div>
          </div>
        </motion.aside>

        <motion.div className="shop-main" variants={fadeInUp}>
          <div className="shop-toolbar">
            <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={20} />
              Filters
            </button>
            
            <div className="sort-dropdown">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : products.length === 0 ? (
            <motion.div className="empty-results" variants={fadeInUp}>
              <h3>No products found</h3>
              <p>Try adjusting your filters or browse all products.</p>
              <Link to="/shop" className="btn btn-primary">View All Products</Link>
            </motion.div>
          ) : (
            <motion.div className="products-grid" variants={staggerContainer}>
              {products.map(product => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Shop