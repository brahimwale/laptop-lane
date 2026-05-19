import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { usePricing } from '../context/PricingContext'
import { useToastStore } from '../store/toastStore'
import { motion } from 'framer-motion'
import { formatNaira } from '../utils/priceUtils'
import { ShoppingBag, Trash2, Truck, Shield, RotateCcw, Lock } from 'lucide-react'

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
  const success = useToastStore(state => state.success)
  const [selectedState, setSelectedState] = useState('lagos')

  const subtotal = getSubtotal()
  const currentState = NIGERIAN_STATES.find(s => s.id === selectedState) || NIGERIAN_STATES[0]
  const shipping = subtotal > currentState.freeShippingThreshold / exchangeRate ? 0 : currentState.shipping
  const tax = subtotal * 0.075
  const total = subtotal + shipping + tax

  const handleRemove = (item) => {
    removeItem(item.id)
    success(`${item.name} removed from cart`)
  }

  const handleClearCart = () => {
    clearCart()
    success('Cart cleared')
  }

  if (items.length === 0) {
    return (
      <motion.div 
        className="container empty-cart-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="empty-state">
          <ShoppingBag size={100} strokeWidth={1.5} />
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
        </div>
      </motion.div>
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
                
                <button className="cart-item-remove" onClick={() => handleRemove(item)}>
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            <div className="cart-actions">
              <Link to="/shop" className="btn btn-outline">Continue Shopping</Link>
              <motion.button className="btn btn-danger" onClick={handleClearCart}>
                Clear Cart
              </motion.button>
            </div>
          </div>

          <div className="cart-summary-section">
            <h2>Cart Summary</h2>
            
            <div className="nigeria-shipping-section">
              <h4><Truck size={18} /> Delivery Location</h4>
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
                <Lock size={16} />
                <span>Secure Checkout</span>
              </div>
              <div className="trust-mini">
                <RotateCcw size={16} />
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
