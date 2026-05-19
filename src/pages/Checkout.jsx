import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

const NIGERIAN_LGAs = {
  'lagos': ['Lagos Island', 'Lagos Mainland', 'Ikeja', 'Victoria Island', 'Lekki', 'Ajah', 'Ogba', 'Surulere', 'Yaba', 'Apapa'],
  'abuja': ['Gwagwalada', 'Kuje', 'Abaji', 'Municipal Area Council', 'Bwari', 'Kwali'],
  'port-harcourt': ['Port Harcourt', 'Obio-Akpor', 'Ikwerre', 'Okrika', 'Eleme'],
  'kwara': ['Ilorin West', 'Ilorin East', 'Ilorin South', 'Offa', 'Oyun', 'Ifelodun', 'Ede', 'Ikeji', 'Baruten', 'Kaiama'],
}

function Checkout() {
  const navigate = useNavigate()
  const items = useCartStore(state => state.items)
  const getSubtotal = useCartStore(state => state.getSubtotal)
  const clearCart = useCartStore(state => state.clearCart)
  const { exchangeRate } = usePricing()
  
  const [selectedState, setSelectedState] = useState('lagos')
  const [deliveryMethod, setDeliveryMethod] = useState('door-delivery')
  
  const currentState = NIGERIAN_STATES.find(s => s.id === selectedState) || NIGERIAN_STATES[0]
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    lga: '',
    city: '',
    state: selectedState,
    phone: '',
    paymentMethod: 'paystack',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  })

  const [phoneError, setPhoneError] = useState('')

  const subtotal = getSubtotal()
  const shipping = subtotal > currentState.freeShippingThreshold / exchangeRate ? 0 : currentState.shipping
  const tax = subtotal * 0.075
  const total = subtotal + shipping + tax

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      const cleaned = value.replace(/[^0-9]/g, '')
      let formatted = cleaned
      if (cleaned.startsWith('234')) {
        formatted = '+' + cleaned
      } else if (cleaned.startsWith('0') && cleaned.length > 1) {
        formatted = '+234' + cleaned.substring(1)
      } else if (cleaned.length > 0 && !cleaned.startsWith('234') && !cleaned.startsWith('0')) {
        formatted = '+234' + cleaned
      }
      
      setFormData({ ...formData, [name]: formatted })
      
      if (formatted.length >= 14) {
        setPhoneError('')
      } else if (formatted.length > 0) {
        setPhoneError('Please enter a valid Nigerian phone number')
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleStateChange = (e) => {
    const newState = e.target.value
    setSelectedState(newState)
    setFormData({ ...formData, state: newState, lga: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.phone || formData.phone.length < 14) {
      setPhoneError('Please enter a valid Nigerian phone number')
      return
    }

    if (formData.paymentMethod === 'paystack') {
      alert('Redirecting to Paystack payment gateway... (Demo mode)')
    } else if (formData.paymentMethod === 'flutterwave') {
      alert('Redirecting to Flutterwave payment gateway... (Demo mode)')
    } else {
      alert('Order placed successfully! (Demo mode)')
    }
    
    clearCart()
    navigate('/account')
  }

  if (items.length === 0) {
    return (
      <div className="container empty-cart-page">
        <div className="empty-state">
          <h2>Nothing to Checkout</h2>
          <p>Your cart is empty. Add some products first!</p>
          <Link to="/shop" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <section className="checkout-section">
              <h2>🇳🇬 Delivery Information</h2>
              
              <div className="delivery-method-toggle">
                <label className={`delivery-option ${deliveryMethod === 'door-delivery' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="deliveryMethod" 
                    value="door-delivery" 
                    checked={deliveryMethod === 'door-delivery'} 
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                  <span>🚚 Door Delivery</span>
                </label>
                <label className={`delivery-option ${deliveryMethod === 'pickup' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="deliveryMethod" 
                    value="pickup" 
                    checked={deliveryMethod === 'pickup'} 
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />
                  <span>📦 Pickup Station</span>
                </label>
              </div>

              <div className="form-group">
                <label>Delivery State *</label>
                <select 
                  name="state" 
                  value={selectedState} 
                  onChange={handleStateChange}
                  required
                >
                  {NIGERIAN_STATES.map(state => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                  ))}
                </select>
              </div>

              {deliveryMethod === 'pickup' && (
                <div className="pickup-stations">
                  <div className="form-group">
                    <label>Select Pickup Station *</label>
                    <select name="pickupStation" required>
                      <option value="">Select a pickup location</option>
                      <option value=" Lagos Island - LaptopLane Hub">Lagos Island - LaptopLane Hub</option>
                      <option value=" Ikeja - LaptopLane Hub">Ikeja - LaptopLane Hub</option>
                      <option value=" Abuja - LaptopLane Hub">Abuja - LaptopLane Hub</option>
                      <option value=" Port Harcourt - LaptopLane Hub">Port Harcourt - LaptopLane Hub</option>
                    </select>
                  </div>
                </div>
              )}
            </section>

            <section className="checkout-section">
              <h2>Contact Information</h2>
              <div className="form-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label>Phone Number * (Nigerian format)</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  placeholder="+234 801 234 5678"
                  className={phoneError ? 'error' : ''}
                />
                {phoneError && <span className="error-message">{phoneError}</span>}
                <span className="form-hint">Enter your WhatsApp number for order updates</span>
              </div>
            </section>

            <section className="checkout-section">
              <h2>Shipping Address</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              
              {deliveryMethod === 'door-delivery' && (
                <>
                  <div className="form-group">
                    <label>Street Address *</label>
                    <input 
                      type="text" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      required 
                      placeholder="123 Street Name, Area"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Local Government Area (LGA) *</label>
                      <select 
                        name="lga" 
                        value={formData.lga} 
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select LGA</option>
                        {(NIGERIAN_LGAS[selectedState] || []).map(lga => (
                          <option key={lga} value={lga}>{lga}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>City/Town *</label>
                      <input 
                        type="text" 
                        name="city" 
                        value={formData.city} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                </>
              )}
            </section>

            <section className="checkout-section">
              <h2>💳 Payment Method</h2>
              <div className="payment-options nigeria-payments">
                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="paystack" 
                    checked={formData.paymentMethod === 'paystack'} 
                    onChange={handleChange} 
                  />
                  <div className="payment-option-content">
                    <span className="payment-icon">💳</span>
                    <div>
                      <span className="payment-name">Paystack</span>
                      <span className="payment-desc">Card, Bank Transfer, USSD, Mobile Money</span>
                    </div>
                  </div>
                </label>
                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="flutterwave" 
                    checked={formData.paymentMethod === 'flutterwave'} 
                    onChange={handleChange} 
                  />
                  <div className="payment-option-content">
                    <span className="payment-icon">🌐</span>
                    <div>
                      <span className="payment-name">Flutterwave</span>
                      <span className="payment-desc">Card, Bank Transfer, QR Code, USSD</span>
                    </div>
                  </div>
                </label>
                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="bank-transfer" 
                    checked={formData.paymentMethod === 'bank-transfer'} 
                    onChange={handleChange} 
                  />
                  <div className="payment-option-content">
                    <span className="payment-icon">🏦</span>
                    <div>
                      <span className="payment-name">Bank Transfer</span>
                      <span className="payment-desc">Direct bank transfer to our account</span>
                    </div>
                  </div>
                </label>
              </div>

              <div className="payment-security-badges">
                <span>🔒 Secure payments powered by</span>
                <div className="payment-providers">
                  <span className="provider-badge">Paystack</span>
                  <span className="provider-badge">Flutterwave</span>
                </div>
              </div>
            </section>

            <button type="submit" className="btn btn-gold btn-place-order">
              Pay {formatNaira(total, exchangeRate)}
            </button>
          </form>

          <aside className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {items.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.images[0]} alt={item.name} />
                  <div className="order-item-info">
                    <h4>{item.name}</h4>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <span className="order-item-price">
                    {formatNaira((item.sale_price || item.price) * item.quantity, exchangeRate)}
                  </span>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatNaira(subtotal, exchangeRate)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping to {currentState.name}</span>
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

            <div className="checkout-trust-badges">
              <div className="trust-mini">
                <span>🔒</span>
                <span>Secure Checkout</span>
              </div>
              <div className="trust-mini">
                <span>↩️</span>
                <span>7-Day Returns</span>
              </div>
              <div className="trust-mini">
                <span>🛡️</span>
                <span>Buyer Protection</span>
              </div>
              <div className="trust-mini">
                <span>💬</span>
                <span>WhatsApp Support</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Checkout