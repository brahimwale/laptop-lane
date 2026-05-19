import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { usePricing } from '../context/PricingContext'
import { formatNaira } from '../utils/priceUtils'

function CartDrawer({ open, onClose }) {
  const items = useCartStore(state => state.items)
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const getSubtotal = useCartStore(state => state.getSubtotal)
  const { exchangeRate } = usePricing()

  if (!open) return null

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2>Shopping Cart ({items.length} items)</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-drawer-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
              <Link to="/shop" className="continue-shopping-btn" onClick={onClose}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.images[0]} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">
                        {formatNaira((item.sale_price || item.price) * item.quantity, exchangeRate)}
                      </p>
                      <div className="cart-item-controls">
                        <div className="quantity-control">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <button className="remove-btn" onClick={() => removeItem(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-drawer-footer">
                <div className="cart-subtotal">
                  <span>Subtotal:</span>
                  <span className="subtotal-amount">{formatNaira(getSubtotal(), exchangeRate)}</span>
                </div>
                <Link to="/checkout" className="checkout-btn" onClick={onClose}>
                  Proceed to Checkout
                </Link>
                <Link to="/cart" className="view-cart-link" onClick={onClose}>
                  View Full Cart
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
