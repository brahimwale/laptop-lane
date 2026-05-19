-- Create tables for LaptopLane ecommerce

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2),
  sku TEXT UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  brand TEXT,
  images TEXT[],
  specifications JSONB,
  is_featured BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  rating DECIMAL(2, 1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT DEFAULT 'US',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT,
  shipping_city TEXT,
  shipping_state TEXT,
  shipping_zip TEXT,
  shipping_country TEXT DEFAULT 'US',
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);

-- Policies for authenticated users
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON reviews FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own wishlist" ON wishlist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wishlist" ON wishlist FOR ALL USING (auth.uid() = user_id);

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Laptops', 'laptops', 'Premium laptops for work and play'),
('Gaming Laptops', 'gaming-laptops', 'High-performance gaming laptops'),
('Business Laptops', 'business-laptops', 'Professional laptops for business'),
('Ultrabooks', 'ultrabooks', 'Thin and light ultrabooks'),
('Accessories', 'accessories', 'Laptop accessories and peripherals'),
('Laptop Bags', 'laptop-bags', 'Protective laptop bags and cases'),
('Chargers', 'chargers', 'Laptop chargers and power adapters'),
('Monitors', 'monitors', 'External monitors and displays');

-- Insert sample products
INSERT INTO products (name, slug, description, price, sale_price, sku, stock_quantity, category_id, brand, images, specifications, is_featured, is_best_seller, is_new_arrival, rating, review_count) VALUES
('LaptopLane Pro 15', 'laptoplane-pro-15', 'Premium 15-inch laptop with Intel Core i7, 16GB RAM, 512GB SSD. Perfect for professionals.', 1299.99, 1099.99, 'LL-PRO15-001', 50, (SELECT id FROM categories WHERE slug='business-laptops'), 'LaptopLane', ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600'], '{"Processor": "Intel Core i7-13700H", "RAM": "16GB DDR5", "Storage": "512GB NVMe SSD", "Display": "15.6\" FHD IPS", "Battery": "Up to 10 hours", "Weight": "1.8 kg"}', true, true, false, 4.8, 124),
('LaptopLane Gamer X17', 'laptoplane-gamer-x17', 'Ultimate gaming laptop with RTX 4070, 32GB RAM, 1TB SSD. Dominate every game.', 2199.99, 1899.99, 'LL-GAMER17-001', 30, (SELECT id FROM categories WHERE slug='gaming-laptops'), 'LaptopLane', ARRAY['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600', 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600'], '{"Processor": "Intel Core i9-13900H", "GPU": "NVIDIA RTX 4070", "RAM": "32GB DDR5", "Storage": "1TB NVMe SSD", "Display": "17.3\" QHD 165Hz", "Battery": "Up to 6 hours", "Weight": "2.8 kg"}', true, true, true, 4.9, 89),
('LaptopLane Ultra Slim 14', 'laptoplane-ultra-slim-14', 'Ultra-thin 14-inch laptop weighing only 1.2kg. Perfect for travel and remote work.', 899.99, null, 'LL-ULTRA14-001', 75, (SELECT id FROM categories WHERE slug='ultrabooks'), 'LaptopLane', ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'], '{"Processor": "AMD Ryzen 7 7840U", "RAM": "16GB LPDDR5", "Storage": "512GB NVMe SSD", "Display": "14\" 2.8K OLED", "Battery": "Up to 14 hours", "Weight": "1.2 kg"}', true, false, true, 4.7, 56),
('LaptopLane Elite 16', 'laptoplane-elite-16', 'Flagship 16-inch workstation with 4K display, 64GB RAM, RTX 4080.', 3499.99, 2999.99, 'LL-ELITE16-001', 20, (SELECT id FROM categories WHERE slug='laptops'), 'LaptopLane', ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600'], '{"Processor": "Intel Core i9-13980HX", "GPU": "NVIDIA RTX 4080", "RAM": "64GB DDR5", "Storage": "2TB NVMe SSD", "Display": "16\" 4K Mini-LED", "Battery": "Up to 8 hours", "Weight": "2.5 kg"}', true, false, false, 5.0, 42),
('Premium Laptop Backpack', 'premium-laptop-backpack', 'Water-resistant backpack fits up to 17" laptops. Multiple compartments.', 79.99, 59.99, 'LL-BAG-BP001', 150, (SELECT id FROM categories WHERE slug='laptop-bags'), 'LaptopLane', ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'], '{"Capacity": "30L", "Laptop Size": "Up to 17\"", "Material": "Water-resistant nylon", "Weight": "0.8 kg"}', false, true, false, 4.6, 203),
('USB-C Hub 7-in-1', 'usb-c-hub-7in1', 'Universal USB-C hub with HDMI, USB 3.0, SD card reader, and PD charging.', 49.99, 39.99, 'LL-HUB-7IN1', 200, (SELECT id FROM categories WHERE slug='accessories'), 'LaptopLane', ARRAY['https://images.unsplash.com/photo-1625842268584-8f3296246b7a?w=600'], '{"Ports": "HDMI, 3x USB 3.0, SD, microSD, USB-C PD", "Compatibility": "USB-C devices", "Cable Length": "15cm", "Weight": "0.1 kg"}', false, true, false, 4.5, 178),
('LaptopLane Charger 100W', 'laptoplane-charger-100w', 'GaN 100W USB-C charger. Compact and powerful for all your devices.', 69.99, null, 'LL-CHARGER-100W', 180, (SELECT id FROM categories WHERE slug='chargers'), 'LaptopLane', ARRAY['https://images.unsplash.com/photo-1583863788434-e58a370898d1?w=600'], '{"Power": "100W", "Ports": "2x USB-C, 1x USB-A", "Technology": "GaN", "Weight": "0.2 kg"}', false, false, true, 4.7, 95),
('27" 4K Monitor', '27-4k-monitor', 'Professional 27-inch 4K IPS monitor with HDR support and USB-C connectivity.', 449.99, 379.99, 'LL-MON-27-4K', 45, (SELECT id FROM categories WHERE slug='monitors'), 'LaptopLane', ARRAY['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600'], '{"Size": "27 inches", "Resolution": "3840 x 2160", "Panel": "IPS", "HDR": "HDR400", "Connectivity": "HDMI, DP, USB-C", "Weight": "5.2 kg"}', true, false, false, 4.8, 67),
('LaptopLane Starter 14', 'laptoplane-starter-14', 'Affordable 14-inch laptop for students and everyday computing.', 549.99, 449.99, 'LL-STARTER14-001', 100, (SELECT id FROM categories WHERE slug='laptops'), 'LaptopLane', ARRAY['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600'], '{"Processor": "Intel Core i5-1335U", "RAM": "8GB DDR4", "Storage": "256GB SSD", "Display": "14\" FHD", "Battery": "Up to 8 hours", "Weight": "1.5 kg"}', false, true, false, 4.4, 312),
('Wireless Mouse Pro', 'wireless-mouse-pro', 'Ergonomic wireless mouse with 4000 DPI, silent clicks, and 6-month battery life.', 39.99, 29.99, 'LL-MOUSE-PRO', 250, (SELECT id FROM categories WHERE slug='accessories'), 'LaptopLane', ARRAY['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600'], '{"DPI": "4000", "Connectivity": "Bluetooth 5.0 / 2.4GHz", "Battery": "Up to 6 months", "Weight": "0.09 kg"}', false, false, true, 4.6, 145);
