# LaptopLane - Premium Ecommerce Website

A professional, fully-featured ecommerce website built with React, Vite, and Supabase for LaptopLane - your trusted destination for premium laptops and accessories.

## 🚀 Features

### Best Features from Template Analysis:

**From Air Purifier Template:**
- Clean, minimalist clinical aesthetic
- Trust badges and social proof placement
- Health-tech positioning with stats and metrics
- Strategic conversion optimization

**From Electronics Megamarket:**
- Mega-menu category navigation
- Product quick view and wishlist
- Dynamic sale pricing with discount badges
- Star rating system
- Modal-based authentication

**From Phone Cases Template:**
- Device-specific filtering and browsing
- Tiered promotional campaigns
- Support-forward design with FAQ integration
- Custom case configuration workflow

### Core Features:
- ✅ Full product catalog with filtering and sorting
- ✅ Shopping cart with persistent state (Zustand + localStorage)
- ✅ Product detail pages with image galleries and specifications
- ✅ User authentication (Supabase Auth)
- ✅ Checkout flow with multiple payment methods
- ✅ Wishlist functionality
- ✅ User account dashboard
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ SEO-optimized structure
- ✅ Professional UI/UX with smooth animations

## 📦 Tech Stack

- **Frontend:** React 18, Vite
- **Routing:** React Router v6
- **State Management:** Zustand
- **Database & Auth:** Supabase
- **Styling:** Custom CSS (No frameworks)
- **Fonts:** Inter (Google Fonts)

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for database and authentication)

### Steps

1. **Navigate to the project directory:**
   ```bash
   cd laptop-lane
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Supabase:**
   - Create a new Supabase project at https://supabase.com
   - Copy the `.env.example` file to `.env`:
     ```bash
     copy .env.example .env
     ```
   - Update the `.env` file with your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Set up the database:**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the SQL from `supabase-schema.sql` to create tables and insert sample data

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
laptop-lane/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # Main header with navigation and cart
│   │   ├── Footer.jsx       # Footer with links and trust badges
│   │   ├── CartDrawer.jsx   # Slide-out cart drawer
│   │   └── ProductCard.jsx  # Product card component
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Homepage with hero and featured products
│   │   ├── Shop.jsx         # Product listing with filters
│   │   ├── ProductDetail.jsx # Product detail page
│   │   ├── Cart.jsx         # Shopping cart page
│   │   ├── Checkout.jsx     # Checkout flow
│   │   ├── Auth.jsx         # Login/Signup page
│   │   └── Account.jsx      # User account dashboard
│   ├── store/               # Zustand stores
│   │   ├── cartStore.js     # Shopping cart state
│   │   └── wishlistStore.js # Wishlist state
│   ├── lib/
│   │   └── supabase.js      # Supabase client configuration
│   ├── data/
│   │   └── sampleData.js    # Sample products and categories
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── supabase-schema.sql      # Database schema and sample data
├── .env.example             # Environment variables template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── index.html               # HTML template
```

## 🎨 Customization

### Colors
All colors are defined as CSS custom properties in `src/index.css`:
```css
:root {
  --primary: #2563eb;
  --secondary: #10b981;
  --accent: #f59e0b;
  --danger: #ef4444;
  /* ... more colors */
}
```

### Adding Products
Edit `src/data/sampleData.js` to add or modify products:
```javascript
{
  id: '11',
  name: 'Your Product Name',
  slug: 'your-product-slug',
  description: 'Product description...',
  price: 999.99,
  sale_price: 799.99, // or null
  category: 'laptops',
  // ... more fields
}
```

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the dist/ folder to Netlify
```

## 📊 Database Schema

The Supabase database includes:
- **categories** - Product categories
- **products** - Product listings with specs and pricing
- **users** - User profiles (extends auth.users)
- **orders** - Customer orders
- **order_items** - Items within orders
- **reviews** - Product reviews and ratings
- **wishlist** - User wishlists

All tables have Row Level Security (RLS) policies enabled.

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Yes |

## 📱 Responsive Breakpoints

- **Desktop:** 1024px and above
- **Tablet:** 768px - 1023px
- **Mobile:** 480px - 767px
- **Small Mobile:** Below 480px

## 🎯 Key Features Breakdown

### Homepage
- Hero section with stats and CTAs
- Category showcase grid
- Promotional banners
- Featured products, best sellers, new arrivals
- "Why Choose Us" trust section
- Newsletter subscription

### Shop Page
- Sidebar filters (categories, price range)
- Sort by price, rating, name
- Responsive product grid
- Empty state handling

### Product Detail
- Image gallery with thumbnails
- Quantity selector
- Add to cart and wishlist
- Product specifications tab
- Customer reviews tab
- Related products section

### Cart
- Full cart management (add, remove, update quantity)
- Subtotal, shipping, tax calculation
- Free shipping progress indicator
- Promo code input
- Secure checkout button

### Checkout
- Contact information form
- Shipping address form
- Multiple payment methods (Credit Card, PayPal, Bank Transfer)
- Order summary sidebar
- Trust badges

### User Account
- Order history
- Wishlist management
- Account settings
- Profile customization

## 🤝 Support

For questions or issues, please contact:
- 📧 support@laptoplane.com
- 📞 +1 (800) 090-0980

## 📄 License

This project is proprietary and confidential.

---

Built with ❤️ by LaptopLane Team
