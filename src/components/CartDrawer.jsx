import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../store/cartStore'
import { usePricing } from '../context/PricingContext'
import { useToastStore } from '../store/toastStore'
import { formatNaira } from '../utils/priceUtils'
import { ShoppingCart, Trash2, Minus, Plus, X } from 'lucide-react'

function CartDrawer({ open, onClose }) {
  const items = useCartStore(state => state.items)
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const getSubtotal = useCartStore(state => state.getSubtotal)
  const { exchangeRate } = usePricing()
  const success = useToastStore(state => state.success)

  const handleRemove = (item) => {
    removeItem(item.id)
    success(`${item.name} removed from cart`)
  }

  const handleUpdateQuantity = (item, newQty) => {
    if (newQty < 1) {
      handleRemove(item)
    } else {
      updateQuantity(item.id, newQty)
    }
  }

  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div 
            className="cart-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="cart-drawer-header">
              <h2>Shopping Cart ({items.length} items)</h2>
              <button className="close-btn" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-drawer-items">
              {items.length === 0 ? (
                <motion.div 
                  className="empty-cart"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ShoppingCart size={64} strokeWidth={1.5} />
                  <h3>Your cart is empty</h3>
                  <p>Add some products to get started!</p>
                  <Link to="/shop" className="continue-shopping-btn" onClick={onClose}>
                    Continue Shopping
                  </Link>
                </motion.div>
              ) : (
                <>
                  <motion.div 
                    className="cart-items-list"
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                  >
                    {items.map(item => (
                      <motion.div 
                        key={item.id} 
                        className="cart-item"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        layout
                      >
                        <img src={item.images[0]} alt={item.name} className="cart-item-image" loading="lazy" />
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <p className="cart-item-price">
                            {formatNaira((item.sale_price || item.price) * item.quantity, exchangeRate)}
                          </p>
                          <div className="cart-item-controls">
                            <div className="quantity-control">
                              <motion.button 
                                onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Minus size={14} />
                              </motion.button>
                              <span>{item.quantity}</span>
                              <motion.button 
                                onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Plus size={14} />
                              </motion.button>
                            </div>
                            <motion.button 
                              className="remove-btn" 
                              onClick={() => handleRemove(item)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div 
                    className="cart-drawer-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
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
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer