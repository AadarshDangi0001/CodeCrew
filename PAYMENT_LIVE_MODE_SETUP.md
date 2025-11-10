# Razorpay Live Mode Setup Guide

## Current Status: TEST MODE ✅
## Target Status: LIVE MODE 🚀

---

## Step-by-Step Checklist

### ✅ Step 1: Get Live API Credentials from Razorpay

1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. **Switch to LIVE MODE** (toggle switch in top-left corner)
3. Navigate to: **Settings** → **API Keys**
4. Click **Generate Live Key** (if not already generated)
5. **Download and securely save** your credentials:
   - `Key ID`: Starts with `rzp_live_XXXXXXXXXX`
   - `Key Secret`: Keep this SECRET - never commit to Git!

### ✅ Step 2: Complete KYC and Activation

Before going live, Razorpay requires:
- ✅ Complete KYC verification
- ✅ Bank account verification
- ✅ Business details submission
- ✅ Account activation approval from Razorpay

**Check**: Your Razorpay account status should show **"Activated"** in live mode

### ✅ Step 3: Update Backend Environment Variables

Edit: `Code-Crew-Backend/.env`

```env
# BEFORE (Test Mode)
RAZORPAY_KEY_ID=rzp_test_Rc1u5Zk1zG5m3t
RAZORPAY_KEY_SECRET=Of2MUuw16iJj5IxH4fhW3qVF

# AFTER (Live Mode)
RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
```

### ✅ Step 4: Update Frontend Environment Variables

Edit: `Code-Crew-Frontend/.env`

```env
# Live Mode
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
```

**Note**: Frontend only needs the Key ID (not the secret)

### ✅ Step 5: Update API URLs (if deploying to production)

In `PaymentButton.jsx`, update URLs from localhost to production:

```javascript
// Development
const { data: order } = await axios.post("http://localhost:5050/payments/create-order");

// Production
const { data: order } = await axios.post("https://your-backend-domain.com/payments/create-order");
```

### ✅ Step 6: Restart Both Servers

```bash
# Backend
cd Code-Crew-Backend
npm run dev

# Frontend
cd Code-Crew-Frontend
npm run dev
```

### ✅ Step 7: Test Live Payment

1. Use a **real card** (not test cards)
2. Real money will be deducted
3. Verify payment appears in Razorpay Live Dashboard
4. Check webhook notifications (if configured)

---

## Important Differences: Test vs Live Mode

| Feature | Test Mode | Live Mode |
|---------|-----------|-----------|
| **Key ID Prefix** | `rzp_test_` | `rzp_live_` |
| **Payment Cards** | Test cards only | Real cards only |
| **Money Flow** | No real money | Real money deducted |
| **Dashboard** | Separate test dashboard | Live dashboard |
| **Settlements** | No settlements | Real bank settlements |

---

## Test Cards (Only work in TEST mode)

These will **NOT** work in live mode:
- **Success**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date

---

## Security Best Practices

### ✅ NEVER expose Key Secret
- ✅ Only store in backend `.env` file
- ✅ Never commit to Git
- ✅ Never send to frontend
- ✅ Never log in console

### ✅ Use Environment Variables
- ✅ Backend uses `process.env.RAZORPAY_KEY_ID`
- ✅ Frontend uses `import.meta.env.VITE_RAZORPAY_KEY_ID`

### ✅ Verify Webhooks (Recommended)
Set up Razorpay webhooks for payment status updates:
1. Go to Razorpay Dashboard → **Settings** → **Webhooks**
2. Add webhook URL: `https://your-domain.com/webhooks/razorpay`
3. Enable events: `payment.captured`, `payment.failed`

---

## Deployment Checklist

When deploying to production:

### Backend (.env on server)
```env
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXX
NODE_ENV=production
```

### Frontend (.env on hosting)
```env
VITE_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXX
VITE_API_BASE_URL=https://your-backend-domain.com
```

### Update API Calls
Replace all `localhost:5050` with your production backend URL

---

## Troubleshooting

### ❌ "Invalid Key" Error
- Check if you're using `rzp_live_` key in live mode
- Verify key is correctly copied (no extra spaces)

### ❌ "Account not activated" Error
- Complete KYC in Razorpay Dashboard
- Wait for Razorpay activation approval

### ❌ Payment fails immediately
- Ensure you're using real cards (not test cards)
- Check if account has sufficient balance

### ❌ Signature verification fails
- Ensure backend Key Secret matches the Key ID
- Check webhook secret if using webhooks

---

## Quick Switch Commands

### Switch to TEST mode (for testing):
```bash
# Backend .env
RAZORPAY_KEY_ID=rzp_test_Rc1u5Zk1zG5m3t
RAZORPAY_KEY_SECRET=Of2MUuw16iJj5IxH4fhW3qVF

# Frontend .env
VITE_RAZORPAY_KEY_ID=rzp_test_Rc1u5Zk1zG5m3t
```

### Switch to LIVE mode (for production):
```bash
# Backend .env
RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY
RAZORPAY_KEY_SECRET=YOUR_LIVE_SECRET

# Frontend .env
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY
```

---

## Support

- **Razorpay Docs**: https://razorpay.com/docs/
- **Dashboard**: https://dashboard.razorpay.com/
- **Support**: support@razorpay.com

---

**Last Updated**: November 5, 2025
