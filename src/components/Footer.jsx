import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Trust Badges */}
        <div className="trust-badges">
          <div className="trust-badge">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <div>
              <h4>Free Shipping</h4>
              <p>On orders over $500</p>
            </div>
          </div>
          <div className="trust-badge">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            <div>
              <h4>30-Day Returns</h4>
              <p>Money-back guarantee</p>
            </div>
          </div>
          <div className="trust-badge">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <div>
              <h4>Secure Payment</h4>
              <p>100% protected</p>
            </div>
          </div>
          <div className="trust-badge">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
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
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="YouTube">📺</a>
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
              <li>📍 123 Tech Street, Silicon Valley, CA 94025</li>
              <li>📞 <a href="tel:+18000900980">+1 (800) 090-0980</a></li>
              <li>✉️ <a href="mailto:support@laptoplane.com">support@laptoplane.com</a></li>
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
