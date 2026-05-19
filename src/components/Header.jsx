import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { supabase } from '../lib/supabase'
import { categories } from '../data/sampleData'

function Header({ onCartClick, onAuthClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const itemCount = useCartStore(state => state.getItemCount())
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header className="header">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="container">
          <span>🇳🇬 Nigeria's Trusted Laptop Store | 📞 Call/WhatsApp: 0801 234 5678 | 🚚 Free Delivery in Lagos</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="container header-content">
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-icon">💻</span>
            <span className="logo-text">Laptop<span className="logo-accent">Lane</span><span className="logo-ng">NG</span></span>
          </Link>

          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search laptops, accessories, and more..." />
            <button aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>

          {/* Header Actions */}
          <div className="header-actions">
            <a href="tel:+2348012345678" className="call-order-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              Call to Order
            </a>
            {user ? (
              <div className="user-menu">
                <Link to="/account" className="user-link">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Account</span>
                </Link>
                <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
              </div>
            ) : (
              <button className="header-action-btn" onClick={onAuthClick}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Sign In</span>
              </button>
            )}
            <button className="header-action-btn cart-btn" onClick={onCartClick}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Cart</span>
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="main-nav">
        <div className="container nav-content">
          <button 
            className="categories-btn"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            All Categories
          </button>
          
          {megaMenuOpen && (
            <div 
              className="mega-menu"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <div className="mega-menu-grid">
                {categories.map(cat => (
                  <Link 
                    key={cat.id} 
                    to={`/shop/${cat.slug}`}
                    className="mega-menu-item"
                    onClick={() => setMegaMenuOpen(false)}
                  >
                    <div className="mega-menu-icon">{cat.image ? '📁' : '📦'}</div>
                    <div className="mega-menu-info">
                      <h4>{cat.name}</h4>
                      <p>{cat.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop All</Link></li>
            <li><Link to="/shop/laptops">Laptops</Link></li>
            <li><Link to="/shop/gaming-laptops">Gaming</Link></li>
            <li><Link to="/shop/accessories">Accessories</Link></li>
            <li><Link to="/shop/monitors">Monitors</Link></li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button className="close-menu" onClick={() => setMobileMenuOpen(false)}>×</button>
          <ul>
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Shop All</Link></li>
            {categories.map(cat => (
              <li key={cat.id}>
                <Link to={`/shop/${cat.slug}`} onClick={() => setMobileMenuOpen(false)}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
