# Heroku Deployment Setup

This guide explains how to deploy LASERovici to Heroku with Stripe payment support.

## Why Heroku?

- **Stripe Support**: Heroku runs Next.js as a server (not static export), enabling API routes for Stripe
- **Apple Pay / Google Pay**: Full Stripe integration including Apple Pay and Google Pay
- **IONOS Integration**: You can point your IONOS subdomain to Heroku via CNAME or reverse proxy

## Prerequisites

1. Heroku account (free tier available)
2. Stripe account with API keys
3. Git repository connected to Heroku

## Deployment Steps

### 1. Install Heroku CLI

```bash
# macOS
brew tap heroku/brew && brew install heroku

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### 2. Login to Heroku

```bash
heroku login
```

### 3. Create Heroku App

```bash
# From your project directory
heroku create your-app-name

# Or create via Heroku dashboard: https://dashboard.heroku.com/new-app
```

### 4. Set Environment Variables

Configure the following environment variables on Heroku:

```bash
# Required: Enables server mode (disables static export)
heroku config:set HEROKU=true

# Required: Stripe secret key (from https://dashboard.stripe.com/apikeys)
heroku config:set STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Required: Stripe publishable key (from https://dashboard.stripe.com/apikeys)
heroku config:set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

**Or via Heroku Dashboard:**
1. Go to your app → Settings → Config Vars
2. Add the following:
   - `HEROKU` = `true`
   - `STRIPE_SECRET_KEY` = `sk_test_...`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_test_...`

### 5. Deploy to Heroku

```bash
# Push to Heroku
git push heroku docs-foundation:main

# Or if you want to deploy from main branch
git push heroku main:main
```

### 6. Verify Deployment

```bash
# Open your app in browser
heroku open

# Check logs
heroku logs --tail
```

## Connecting IONOS Subdomain to Heroku

### Option 1: CNAME Record (Recommended)

1. Get your Heroku app URL (e.g., `your-app-name.herokuapp.com`)
2. In IONOS DNS settings, add a CNAME record:
   - **Name**: `shop` (or your desired subdomain)
   - **Value**: `your-app-name.herokuapp.com`
   - **TTL**: 3600 (or default)

3. Heroku will automatically handle SSL certificates for your custom domain

### Option 2: Add Custom Domain in Heroku

1. In Heroku Dashboard → Settings → Domains
2. Click "Add domain"
3. Add: `shop.yourdomain.com`
4. Follow Heroku's instructions to configure DNS

## Payment Methods

Once deployed on Heroku with Stripe configured:

- ✅ **Stripe**: Apple Pay, Google Pay, Credit/Debit Cards
- ✅ **PayPal**: PayPal Account, Credit/Debit Cards (via PayPal)

Both payment methods are available in the basket/checkout page.

## IONOS vs Heroku Comparison

| Feature | IONOS (Static) | Heroku (Server) |
|---------|----------------|-----------------|
| Stripe Payments | ❌ No (API routes not supported) | ✅ Yes |
| PayPal Payments | ✅ Yes | ✅ Yes |
| Apple Pay / Google Pay | ❌ No (via Stripe) | ✅ Yes (via Stripe) |
| Build Time | Fast (static) | Slower (server build) |
| Cost | Depends on IONOS plan | Free tier available |
| Custom Domain | ✅ Yes | ✅ Yes (via CNAME) |

## Troubleshooting

### Build Fails

- Ensure `HEROKU=true` is set
- Check that Node.js version in `package.json` engines matches Heroku's supported versions
- Review build logs: `heroku logs --tail`

### Stripe Not Working

- Verify environment variables are set correctly
- Check that API keys are from the correct Stripe account (test vs live)
- Ensure `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` starts with `pk_`
- Ensure `STRIPE_SECRET_KEY` starts with `sk_`

### Domain Not Resolving

- Verify CNAME record is correctly configured
- Wait for DNS propagation (can take up to 48 hours)
- Use `dig shop.yourdomain.com` to check DNS resolution

## Next Steps

After deployment:

1. Test both Stripe and PayPal payment flows
2. Configure your custom domain
3. Set up Stripe webhooks (optional, for order notifications)
4. Switch to live Stripe keys when ready for production

