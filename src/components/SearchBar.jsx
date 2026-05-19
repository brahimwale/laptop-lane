import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, ArrowRight } from 'lucide-react'
import { useSearchStore } from '../store/searchStore'
import { sampleProducts } from '../data/sampleData'

function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const { recentSearches, addSearch } = useSearchStore()

  useEffect(() => {
    if (query.trim()) {
      const filtered = sampleProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand?.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim()) {
      addSearch(searchQuery)
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`)
      setQuery('')
      setIsOpen(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query)
    }
    if (e.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
    }
  }

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search laptops, accessories, and more..."
          className="search-input"
        />
        <button 
          className="search-btn"
          onClick={() => handleSearch(query)}
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (query || recentSearches.length > 0) && (
          <motion.div 
            className="search-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {results.length > 0 && (
              <div className="search-results">
                <div className="search-section-title">Products</div>
                {results.map(product => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.slug}`}
                    className="search-result-item"
                    onClick={() => {
                      addSearch(product.name)
                      setIsOpen(false)
                      setQuery('')
                    }}
                  >
                    <img src={product.images[0]} alt={product.name} className="result-image" />
                    <div className="result-info">
                      <span className="result-name">{product.name}</span>
                      <span className="result-price">${product.sale_price || product.price}</span>
                    </div>
                    <ArrowRight size={16} className="result-arrow" />
                  </Link>
                ))}
              </div>
            )}

            {query && results.length === 0 && (
              <div className="search-no-results">
                <p>No products found for "{query}"</p>
                <button onClick={() => handleSearch(query)}>
                  Search for "{query}"
                </button>
              </div>
            )}

            {!query && recentSearches.length > 0 && (
              <div className="search-recent">
                <div className="search-section-title">
                  Recent Searches
                  <button 
                    className="clear-recent"
                    onClick={() => useSearchStore.getState().clearSearchHistory()}
                  >
                    Clear all
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="recent-search-item"
                    onClick={() => {
                      setQuery(search)
                      handleSearch(search)
                    }}
                  >
                    <Clock size={16} />
                    <span>{search}</span>
                    <button 
                      className="remove-recent"
                      onClick={(e) => {
                        e.stopPropagation()
                        useSearchStore.getState().removeSearch(search)
                      }}
                    >
                      <X size={14} />
                    </button>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && <div className="search-overlay" onClick={() => setIsOpen(false)} />}
    </div>
  )
}

export default SearchBar