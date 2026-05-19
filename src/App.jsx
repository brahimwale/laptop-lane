import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PricingProvider } from './context/PricingContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Auth from './pages/Auth'
import Account from './pages/Account'
import CartDrawer from './components/CartDrawer'
import WhatsAppButton from './components/WhatsAppButton'
import ToastContainer from './components/Toast'
import BackToTop from './components/BackToTop'
import MobileBottomNav from './components/MobileBottomNav'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <PricingProvider>
      <Router>
        <div className="app" style={{ minHeight: '100vh' }}>
          <Header onCartClick={() => setCartOpen(true)} onAuthClick={() => setAuthOpen(true)} />
          <main className="main-content">
            <AnimatedRoutes />
          </main>
          <Footer />
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
          <Auth open={authOpen} onClose={() => setAuthOpen(false)} />
          <WhatsAppButton />
          <BackToTop />
          <MobileBottomNav />
          <ToastContainer />
        </div>
      </Router>
    </PricingProvider>
  )
}

export default App