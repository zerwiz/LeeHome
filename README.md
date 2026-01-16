# Zeediva Academy Homepage

A modern, responsive homepage for Zeediva Academy - an AI-powered digital commerce education platform. Built with vanilla HTML, CSS, and JavaScript for Netlify hosting.

**GitHub Repository:** [https://github.com/zerwiz/LeeHome](https://github.com/zerwiz/LeeHome)

## Features

- Modern, dark-themed design with gradient accents
- Fully responsive mobile-first layout
- Smooth scrolling navigation with scroll effects
- Interactive mobile menu
- Course showcase sections
- Community and testimonials sections
- Uses Tailwind CSS via CDN for rapid styling
- Lucide icons for beautiful iconography
- Optimized for performance and SEO
- Ready for Netlify deployment

## Local Development

Simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Netlify Deployment

### Option 1: Drag and Drop
1. Go to [Netlify](https://www.netlify.com/)
2. Sign up or log in
3. Drag and drop the entire project folder onto the Netlify dashboard
4. Your site will be live in seconds!

### Option 2: Git Integration
1. Push your code to GitHub, GitLab, or Bitbucket
2. Connect your repository to Netlify
3. Netlify will automatically detect the settings from `netlify.toml`
4. Deploy!

### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Project Structure

```
.
├── index.html          # Main HTML file (Zeediva Academy homepage)
├── styles.css          # Custom styles and animations
├── script.js           # JavaScript functionality (menu, scroll effects)
├── netlify.toml        # Netlify configuration
├── .cursorrules        # Cursor IDE rules
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Lucide Icons** - Beautiful icon library (via CDN)
- **Vanilla JavaScript** - No frameworks, pure JS
- **Netlify** - Static site hosting

## Customization

- **Content**: Edit `index.html` to update course information, testimonials, and copy
- **Styling**: Modify `styles.css` for custom styles, or adjust Tailwind classes in HTML
- **Functionality**: Add interactive features in `script.js`
- **Deployment**: Update `netlify.toml` for deployment settings and redirects

## Key Sections

- **Hero Section** - Main landing area with CTA
- **Core Courses** - Three featured course cards
- **Flagship Program** - Premium certification program showcase
- **Community** - Discord and Zoom masterclass information
- **Testimonials** - Success stories from students
- **Footer** - Final CTA and site navigation

## E-Commerce Features

The site includes a complete e-commerce system:

### Pages
- **Shop Page** (`shop.html`) - Browse and add courses to cart
- **Cart Page** (`cart.html`) - View and manage cart items
- **Checkout Page** (`checkout.html`) - Secure payment processing with Stripe
- **Success Page** (`success.html`) - Payment confirmation

### Features
- Shopping cart using localStorage
- Real-time cart count updates
- Stripe payment integration
- Netlify Functions for secure payment processing
- Responsive design matching main site

### Stripe Setup

1. **Get Stripe Keys**:
   - Sign up at [Stripe](https://stripe.com)
   - Get your API keys from the dashboard
   - Use test keys for development

2. **Configure Netlify Environment Variables**:
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add:
     - `STRIPE_SECRET_KEY` - Your Stripe secret key (starts with `sk_`)
     - `STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key (starts with `pk_`)
     - `STRIPE_WEBHOOK_SECRET` - Webhook signing secret (for production)

3. **Update Checkout Page**:
   - Open `checkout.html`
   - Find `STRIPE_PUBLISHABLE_KEY` constant
   - Replace with your actual publishable key

4. **Install Dependencies** (for Netlify Functions):
   ```bash
   npm install
   ```

5. **Webhook Setup** (for production):
   - In Stripe Dashboard → Webhooks
   - Add endpoint: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy the webhook signing secret to Netlify environment variables

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free to use and modify.
