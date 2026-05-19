# LaptopLane Setup Guide

## Quick Start Guide

This guide will help you get your LaptopLane ecommerce website up and running.

### Step 1: Install Node.js

If you haven't already installed Node.js:

1. Download Node.js from https://nodejs.org/
2. Choose the LTS (Long Term Support) version
3. Run the installer and follow the installation wizard
4. Verify installation by opening a new terminal and running:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Create a Supabase Project

1. Go to https://supabase.com and sign up/create an account
2. Click "New Project"
3. Fill in:
   - Project name: `LaptopLane`
   - Database password: (create a strong password)
   - Region: Choose the closest to your users
4. Wait for the project to be created (usually takes 1-2 minutes)

### Step 3: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Project Settings** (gear icon)
2. Click on **API**
3. Copy these two values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

### Step 4: Configure Environment Variables

1. Navigate to the `laptop-lane` folder
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and replace:
   - `YOUR_SUPABASE_URL` with your Project URL
   - `YOUR_SUPABASE_ANON_KEY` with your anon/public key

### Step 5: Set Up the Database

1. In your Supabase dashboard, click on **SQL Editor** (in the left sidebar)
2. Click **New Query**
3. Open the file `supabase-schema.sql` in a text editor
4. Copy ALL the content
5. Paste it into the Supabase SQL Editor
6. Click **Run** to execute the SQL

This will create:
- All necessary database tables
- Security policies
- Sample categories
- 10 sample products with images and specifications

### Step 6: Install Dependencies and Run

1. Open terminal in the `laptop-lane` folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to http://localhost:5173

### Step 7: Test the Website

Try these features:
- ✅ Browse the homepage
- ✅ Click on products to see details
- ✅ Add items to cart
- ✅ Use the cart drawer (cart icon in header)
- ✅ Filter products by category
- ✅ Create an account (Authentication will work with Supabase)
- ✅ Add items to wishlist
- ✅ Go through checkout flow

## Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in your PATH
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### Products not showing
- Make sure you ran the SQL script in Supabase
- Check that the SQL executed without errors
- Verify your `.env` file has correct credentials

### Can't sign up/login
- Check your Supabase project is active
- Verify your `.env` credentials are correct
- Check browser console for error messages
- In Supabase, go to **Authentication** > **Providers** and make sure Email is enabled

### Cart not working
- The cart uses localStorage, clear your browser data if issues persist
- Check browser console for JavaScript errors

## Going to Production

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
Follow the prompts. Vercel will automatically:
- Build your project
- Set up continuous deployment
- Provide a production URL

Don't forget to add your environment variables in Vercel's dashboard.

### Option 2: Netlify
1. Run `npm run build`
2. Go to https://netlify.com
3. Drag and drop the `dist` folder
4. Add environment variables in Site Settings > Build & Deploy > Environment

### Option 3: Manual Deployment
1. Run `npm run build`
2. Upload the `dist` folder to any static hosting service:
   - AWS S3 + CloudFront
   - GitHub Pages
   - Firebase Hosting
   - Any static web host

## Next Steps

1. **Customize Products**: Edit `src/data/sampleData.js` to add your real products
2. **Update Content**: Modify text in the page components
3. **Change Colors**: Update CSS variables in `src/index.css`
4. **Add Logo**: Replace the emoji logo in `Header.jsx` with your actual logo
5. **Payment Processing**: Integrate Stripe or another payment provider in `Checkout.jsx`
6. **Email Notifications**: Set up Supabase Edge Functions for order confirmations

## Sample Login Credentials

After creating an account through the app, you can use it to login. The sample data doesn't include pre-made user accounts for security reasons.

## Support

If you encounter any issues:
1. Check the browser console (F12) for error messages
2. Verify all environment variables are set correctly
3. Make sure the Supabase database is properly set up
4. Check that all dependencies are installed (`npm install`)

---

Happy selling! 🚀
