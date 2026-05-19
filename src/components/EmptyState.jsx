import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, Heart, Search, Package } from 'lucide-react'

const EmptyCartSVG = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="empty-state-icon">
    <motion.path
      d="M60 140h100l10-80H70l10 80z"
      fill="#f3f4f6"
      stroke="#d1d5db"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
    <motion.circle
      cx="75" cy="155" r="12"
      fill="#f3f4f6"
      stroke="#d1d5db"
      strokeWidth="2"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    />
    <motion.circle
      cx="145" cy="155" r="12"
      fill="#f3f4f6"
      stroke="#d1d5db"
      strokeWidth="2"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    />
    <motion.path
      d="M85 100l30 30 30-30"
      stroke="#0066CC"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    />
    <motion.path
      d="M170 60l20 20M190 60l-20 20"
      stroke="#fbbf24"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    />
  </svg>
)

const EmptyWishlistSVG = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="empty-state-icon">
    <motion.path
      d="M100 170s-60-40-60-80c0-25 20-45 45-45 15 0 25 8 35 20 10-12 20-20 35-20 25 0 45 20 45 45 0 40-60 80-60 80z"
      fill="#f3f4f6"
      stroke="#ef4444"
      strokeWidth="2"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
    <motion.path
      d="M80 85l15 15 25-25"
      stroke="#ef4444"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      strokeDasharray="50"
      initial={{ strokeDashoffset: 50 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    />
  </svg>
)

const EmptySearchSVG = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="empty-state-icon">
    <motion.circle
      cx="90" cy="90" r="50"
      fill="#f3f4f6"
      stroke="#0066CC"
      strokeWidth="3"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4 }}
    />
    <motion.line
      x1="125" y1="125" x2="160" y2="160"
      stroke="#0066CC"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    />
    <motion.line
      x1="70" y1="80" x2="110" y2="80"
      stroke="#d1d5db"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.6, duration: 0.3 }}
      style={{ transformOrigin: '70px center' }}
    />
    <motion.line
      x1="70" y1="95" x2="95" y2="95"
      stroke="#d1d5db"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.7, duration: 0.3 }}
      style={{ transformOrigin: '70px center' }}
    />
  </svg>
)

const EmptyOrdersSVG = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="empty-state-icon">
    <motion.rect
      x="40" y="60" width="120" height="100"
      rx="8"
      fill="#f3f4f6"
      stroke="#d1d5db"
      strokeWidth="2"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    />
    <motion.line
      x1="40" y1="90" x2="160" y2="90"
      stroke="#d1d5db"
      strokeWidth="2"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    />
    <motion.rect
      x="55" y="105" width="40" height="40"
      rx="4"
      fill="#0066CC"
      opacity="0.3"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    />
    <motion.rect
      x="105" y="105" width="40" height="40"
      rx="4"
      fill="#10b981"
      opacity="0.3"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    />
    <motion.path
      d="M170 40l15 15M185 40l-15 15"
      stroke="#fbbf24"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    />
  </svg>
)

const EmptyStateComponents = {
  cart: { icon: EmptyCartSVG, title: 'Your cart is empty', subtitle: 'Looks like you haven\'t added anything to your cart yet.' },
  wishlist: { icon: EmptyWishlistSVG, title: 'Your wishlist is empty', subtitle: 'Save items you love by clicking the heart icon.' },
  search: { icon: EmptySearchSVG, title: 'No results found', subtitle: 'Try adjusting your search terms or browse our categories.' },
  orders: { icon: EmptyOrdersSVG, title: 'No orders yet', subtitle: 'Your order history will appear here once you make a purchase.' }
}

export function EmptyState({ type = 'cart', actionLabel = 'Start Shopping', actionLink = '/shop' }) {
  const { icon: Icon, title, subtitle } = EmptyStateComponents[type] || EmptyStateComponents.cart

  return (
    <motion.div 
      className="empty-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Icon />
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Link to={actionLink} className="btn btn-primary">
          {actionLabel}
        </Link>
      </motion.div>
    </motion.div>
  )
}

export const EmptyCart = (props) => <EmptyState type="cart" {...props} />
export const EmptyWishlist = (props) => <EmptyState type="wishlist" {...props} />
export const EmptySearch = (props) => <EmptyState type="search" {...props} />
export const EmptyOrders = (props) => <EmptyState type="orders" {...props} />

export default EmptyState