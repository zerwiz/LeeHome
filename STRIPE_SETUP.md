# Stripe Integration Setup Guide

This guide will walk you through setting up Stripe payment processing for the Zeediva Academy website.

## Prerequisites

1. A Stripe account (sign up at [https://stripe.com](https://stripe.com))
2. Netlify account with your site deployed
3. Access to Netlify dashboard for environment variables

## Step 1: Get Your Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Test Mode** for development (toggle in the top right)
3. Navigate to **Developers** → **API keys**
4. Copy your keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`) - Click "Reveal" to see it

## Step 2: Set Up Netlify Environment Variables

1. Go to your Netlify dashboard
2. Navigate to your site → **Site settings** → **Environment variables**
3. Add the following variables:

### For Development/Testing:
```
STRIPE_SECRET_KEY = sk_test_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY = pk_test_xxxxxxxxxxxxx
```

### For Production:
```
STRIPE_SECRET_KEY = sk_live_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY = pk_live_xxxxxxxxxxxxx
```

**Important:** 
- Never commit these keys to Git
- Use test keys during development
- Switch to live keys only when ready for production

## Step 3: Install Stripe Package for Netlify Functions

The Stripe package is already listed in `package.json`. If you need to install it locally:

```bash
npm install stripe
```

## Step 4: Configure Netlify Functions

The Netlify Functions are already set up in `netlify/functions/`:

- **`create-checkout.js`** - Creates Stripe Checkout Sessions
- **`stripe-webhook.js`** - Handles Stripe webhook events

### Verify Function Configuration

Check `netlify.toml` to ensure functions directory is configured:
```toml
[functions]
  directory = "netlify/functions"
```

## Step 5: Set Up Stripe Webhook (Production)

For production, you need to set up webhooks to handle payment events:

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Webhook signing secret** (starts with `whsec_`)
6. Add it to Netlify environment variables:
   ```
   STRIPE_WEBHOOK_SECRET = whsec_xxxxxxxxxxxxx
   ```

### For Local Testing (Stripe CLI)

1. Install [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Login: `stripe login`
3. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook
   ```
4. Copy the webhook signing secret from the CLI output

## Step 6: Update Frontend with Publishable Key

The frontend code in `pages/checkout.html` needs your publishable key. Update it:

```javascript
const stripe = Stripe('pk_test_xxxxxxxxxxxxx'); // Replace with your publishable key
```

Or better yet, use an environment variable approach if you have a build process.

## Step 7: Test the Integration

### Test Mode
1. Use Stripe test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Use any future expiry date, any CVC, any ZIP
2. Complete a test purchase
3. Check Stripe Dashboard → **Payments** to see the transaction

### Test Webhook Events
1. In Stripe Dashboard → **Webhooks** → Click on your endpoint
2. Click **Send test webhook**
3. Select event type (e.g., `checkout.session.completed`)
4. Verify your function receives and processes it correctly

## Step 8: Go Live

When ready for production:

1. Switch Stripe Dashboard to **Live Mode**
2. Get your live API keys
3. Update Netlify environment variables with live keys
4. Create a new webhook endpoint for production
5. Update frontend publishable key to live key
6. Test with a small real transaction first

## Troubleshooting

### Common Issues

**"No such payment_intent"**
- Check that you're using the correct API keys (test vs live)
- Verify the payment intent ID is correct

**Webhook signature verification failed**
- Ensure `STRIPE_WEBHOOK_SECRET` is set correctly
- Check that you're using the webhook secret from the correct endpoint

**Function not found**
- Verify `netlify.toml` has correct functions directory
- Check that functions are in `netlify/functions/` folder
- Redeploy your site after adding functions

**CORS errors**
- Netlify Functions handle CORS automatically
- If issues persist, check function response headers

### Testing Locally

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify dev`
3. Test functions at `http://localhost:8888/.netlify/functions/create-checkout`

## Security Best Practices

✅ **DO:**
- Store all secret keys in Netlify environment variables
- Use test mode during development
- Verify webhook signatures
- Use HTTPS (automatic with Netlify)
- Validate amounts server-side

❌ **DON'T:**
- Commit API keys to Git
- Expose secret keys in client-side code
- Trust client-side data for payment amounts
- Skip webhook signature verification

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Stripe Testing Guide](https://stripe.com/docs/testing)

## Support

If you encounter issues:
1. Check Stripe Dashboard → **Logs** for errors
2. Check Netlify Functions logs in dashboard
3. Review browser console for frontend errors
4. Verify all environment variables are set correctly

---

**Last Updated:** 2024
**Version:** 1.0
