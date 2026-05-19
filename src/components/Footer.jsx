import { Link } from 'react-router-dom'
import { Truck, RotateCcw, Shield, MessageCircle, MapPin, Phone, Mail } from 'lucide-react'

const FacebookIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const TwitterIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
)

const InstagramIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

const YoutubeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
  </svg>
)

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Trust Badges */}
        <div className="trust-badges">
          <div className="trust-badge">
            <Truck size={32} />
            <div>
              <h4>Free Shipping</h4>
              <p>On orders over $500</p>
            </div>
          </div>
          <div className="trust-badge">
            <RotateCcw size={32} />
            <div>
              <h4>30-Day Returns</h4>
              <p>Money-back guarantee</p>
            </div>
          </div>
          <div className="trust-badge">
            <Shield size={32} />
            <div>
              <h4>Secure Payment</h4>
              <p>100% protected</p>
            </div>
          </div>
          <div className="trust-badge">
            <MessageCircle size={32} />
            <div>
              <h4>24/7 Support</h4>
              <p>Dedicated help</p>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="footer-content">
          <div className="footer-section">
            <h3>About LaptopLane</h3>
            <p>Your trusted destination for premium laptops and accessories. We deliver quality, performance, and exceptional customer service.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FacebookIcon size={20} /></a>
              <a href="#" aria-label="Twitter"><TwitterIcon size={20} /></a>
              <a href="#" aria-label="Instagram"><InstagramIcon size={20} /></a>
              <a href="#" aria-label="YouTube"><YoutubeIcon size={20} /></a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/shop">Shop All</Link></li>
              <li><Link to="/shop/laptops">Laptops</Link></li>
              <li><Link to="/shop/gaming-laptops">Gaming Laptops</Link></li>
              <li><Link to="/shop/accessories">Accessories</Link></li>
              <li><Link to="/shop/monitors">Monitors</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#">Track Your Order</a></li>
              <li><a href="#">Shipping & Delivery</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul className="contact-info">
              <li><MapPin size={16} /> 123 Tech Street, Silicon Valley, CA 94025</li>
              <li><Phone size={16} /> <a href="tel:+18000900980">+1 (800) 090-0980</a></li>
              <li><Mail size={16} /> <a href="mailto:support@laptoplane.com">support@laptoplane.com</a></li>
            </ul>
            <div className="newsletter">
              <h4>Subscribe to Newsletter</h4>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; 2026 LaptopLane. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
