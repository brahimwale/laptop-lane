import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { usePricing } from '../context/PricingContext'
import { formatNaira } from '../utils/priceUtils'

const NIGERIAN_STATES = [
  { id: 'lagos', name: 'Lagos', shipping: 2500, freeShippingThreshold: 300000 },
  { id: 'abuja', name: 'Abuja (FCT)', shipping: 3500, freeShippingThreshold: 350000 },
  { id: 'port-harcourt', name: 'Port Harcourt', shipping: 4000, freeShippingThreshold: 400000 },
  { id: 'kano', name: 'Kano', shipping: 4500, freeShippingThreshold: 450000 },
  { id: 'ibadan', name: 'Ibadan', shipping: 3000, freeShippingThreshold: 350000 },
  { id: 'enugu', name: 'Enugu', shipping: 3500, freeShippingThreshold: 400000 },
  { id: 'kwara', name: 'Kwara', shipping: 3200, freeShippingThreshold: 380000 },
  { id: 'other', name: 'Other States', shipping: 5000, freeShippingThreshold: 500000 },
]

function Cart() {
  const items = useCartStore(state => state.items)
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const getSubtotal = useCartStore(state => state.getSubtotal)
  const clearCart = useCartStore(state => state.clearCart)
  const { exchangeRate } = usePricing()
  const [selectedState, setSelectedState] = useState('lagos')

  const subtotal = getSubtotal()
  const currentState = NIGERIAN_STATES.find(s => s.id === selectedState) || NIGERIAN_STATES[0]
  const shipping = subtotal > currentState.freeShippingThreshold / exchangeRate ? 0 : currentState.shipping
  const tax = subtotal * 0.075
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="container empty-cart-page">
        <div className="empty-state">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>
        
        <div className="cart-layout">
          <div className="cart-items-section">
            <div className="cart-header-row">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span></span>
            </div>

            {items.map(item => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-product">
                  <img src={item.images[0]} alt={item.name} />
                  <div>
                    <Link to={`/product/${item.slug}`} className="product-name-link">{item.name}</Link>
                    <span className="product-sku">SKU: {item.sku}</span>
                  </div>
                </div>
                
                <div className="cart-item-price">
                  {formatNaira(item.sale_price || item.price, exchangeRate)}
                </div>
                
                <div className="cart-item-quantity">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                
                <div className="cart-item-subtotal">
                  {formatNaira((item.sale_price || item.price) * item.quantity, exchangeRate)}
                </div>
                
                <button className="cart-item-remove" onClick={() => removeItem(item.id)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            ))}

            <div className="cart-actions">
              <Link to="/shop" className="btn btn-outline">Continue Shopping</Link>
              <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
            </div>
          </div>

          <div className="cart-summary-section">
            <h2>Cart Summary</h2>
            
            <div className="nigeria-shipping-section">
              <h4>🇳🇬 Delivery Location</h4>
              <select 
                value={selectedState} 
                onChange={(e) => setSelectedState(e.target.value)}
                className="state-selector"
              >
                {NIGERIAN_STATES.map(state => (
                  <option key={state.id} value={state.id}>{state.name}</option>
                ))}
              </select>
              <p className="shipping-info">
                Delivery: {shipping === 0 ? 'FREE' : formatNaira(shipping, exchangeRate)}
              </p>
              {subtotal < currentState.freeShippingThreshold / exchangeRate && (
                <p className="free-shipping-hint">
                  Add {formatNaira((currentState.freeShippingThreshold / exchangeRate) - subtotal, exchangeRate)} more for FREE delivery
                </p>
              )}
            </div>

            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatNaira(subtotal, exchangeRate)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="free-shipping">FREE</span> : formatNaira(shipping, exchangeRate)}</span>
              </div>
              <div className="summary-row">
                <span>VAT (7.5%)</span>
                <span>{formatNaira(tax, exchangeRate)}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>{formatNaira(total, exchangeRate)}</span>
              </div>
            </div>

            <Link to="/checkout" className="btn btn-primary btn-checkout">
              Proceed to Checkout
            </Link>

            <div className="promo-code-section">
              <h4>Have a promo code?</h4>
              <div className="promo-input">
                <input type="text" placeholder="Enter code" />
                <button>Apply</button>
              </div>
            </div>

            <div className="cart-trust-badges">
              <div className="trust-mini">
                <span>🔒</span>
                <span>Secure Checkout</span>
              </div>
              <div className="trust-mini">
                <span>↩️</span>
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
