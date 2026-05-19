import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { supabase } from '../lib/supabase'
import { categories } from '../data/sampleData'
import { ShoppingCart, User, Phone, Menu, X } from 'lucide-react'
import SearchBar from './SearchBar'

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
          <span>Nigeria's Trusted Laptop Store</span>
          <span className="separator">|</span>
          <span>Call/WhatsApp: 0801 234 5678</span>
          <span className="separator">|</span>
          <span>Free Delivery in Lagos</span>
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
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-text">Laptop<span className="logo-accent">Lane</span><span className="logo-ng">NG</span></span>
          </Link>

          {/* Search Bar */}
          <SearchBar />

          {/* Header Actions */}
          <div className="header-actions">
            <a href="tel:+2348012345678" className="call-order-btn">
              <Phone size={18} />
              <span>Call to Order</span>
            </a>
            {user ? (
              <div className="user-menu">
                <Link to="/account" className="user-link">
                  <User size={22} />
                  <span>Account</span>
                </Link>
                <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
              </div>
            ) : (
              <button className="header-action-btn" onClick={onAuthClick}>
                <User size={22} />
                <span>Sign In</span>
              </button>
            )}
            <button className="header-action-btn cart-btn" onClick={onCartClick}>
              <ShoppingCart size={22} />
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
            <Menu size={20} />
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
          <button className="close-menu" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
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