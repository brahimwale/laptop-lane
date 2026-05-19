import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export default function MobileBottomNav() {
  const location = useLocation()
  const itemCount = useCartStore(state => state.getItemCount())

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/shop', icon: Search, label: 'Shop' },
    { path: '/wishlist', icon: Heart, label: 'Wishlist' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: itemCount },
    { path: '/account', icon: User, label: 'Account' }
  ]

  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-bottom-nav-items">
        {navItems.map(({ path, icon: Icon, label, badge }) => (
          <Link
            key={path}
            to={path}
            className={`mobile-bottom-nav-item ${location.pathname === path ? 'active' : ''}`}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={24} />
              {badge > 0 && (
                <span className="mobile-nav-cart-badge">{badge}</span>
              )}
            </div>
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}