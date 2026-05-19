import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useWishlistStore } from '../store/wishlistStore'

function Account() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('orders')
  const wishlistItems = useWishlistStore(state => state.items)
  const removeWishlistItem = useWishlistStore(state => state.removeItem)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
      } else {
        navigate('/auth')
      }
      setLoading(false)
    })
  }, [navigate])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (loading) {
    return <div className="container loading-page">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="account-page">
      <div className="container">
        <h1 className="page-title">My Account</h1>
        
        <div className="account-layout">
          {/* Sidebar */}
          <aside className="account-sidebar">
            <div className="user-profile">
              <div className="user-avatar">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <h3>{user.user_metadata?.full_name || 'User'}</h3>
              <p>{user.email}</p>
            </div>
            
            <nav className="account-nav">
              <button 
                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                📦 My Orders
              </button>
              <button 
                className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                ❤️ Wishlist ({wishlistItems.length})
              </button>
              <button 
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                ⚙️ Account Settings
              </button>
              <button className="nav-item signout" onClick={handleSignOut}>
                🚪 Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="account-content">
            {activeTab === 'orders' && (
              <div className="tab-panel">
                <h2>My Orders</h2>
                <div className="empty-state-mini">
                  <p>No orders yet. Start shopping to see your orders here!</p>
                  <Link to="/shop" className="btn btn-primary">Browse Products</Link>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="tab-panel">
                <h2>My Wishlist</h2>
                {wishlistItems.length === 0 ? (
                  <div className="empty-state-mini">
                    <p>Your wishlist is empty. Save items you love!</p>
                    <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="wishlist-grid">
                    {wishlistItems.map(item => (
                      <div key={item.id} className="wishlist-item">
                        <Link to={`/product/${item.slug}`} className="wishlist-image">
                          <img src={item.images[0]} alt={item.name} />
                        </Link>
                        <div className="wishlist-info">
                          <Link to={`/product/${item.slug}`} className="wishlist-name">{item.name}</Link>
                          <div className="wishlist-price">
                            {item.sale_price ? (
                              <>
                                <span className="sale-price">${item.sale_price.toFixed(2)}</span>
                                <span className="original-price">${item.price.toFixed(2)}</span>
                              </>
                            ) : (
                              <span>${item.price.toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                        <button 
                          className="remove-wishlist-btn"
                          onClick={() => removeWishlistItem(item.id)}
                          aria-label="Remove from wishlist"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="tab-panel">
                <h2>Account Settings</h2>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={user.email} disabled />
                  </div>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.user_metadata?.full_name || ''} 
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="form-group">
                    <label>Shipping Address</label>
                    <textarea placeholder="Enter your default shipping address" rows="3"></textarea>
                  </div>
                  <button className="btn btn-primary">Save Changes</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Account
