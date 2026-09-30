# Golden Crumbs — Customer App (`bakery-cust-v1`)

The customer-facing storefront for Golden Crumbs Bakery. Built with Next.js (App Router) and React 19. Customers can browse products, manage a cart and wishlist, check out with cash or card (Kashier), track orders, and chat with an AI assistant.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS 4, shadcn/ui, `next-themes` (light/dark mode)
- **Data & forms:** TanStack Query, React Hook Form + `@hookform/resolvers`
- **Auth:** Google OAuth (`@react-oauth/google`)
- **Payments:** Kashier (hosted checkout sessions + webhook)
- **Charts:** Recharts
- **Notifications:** Sonner (toasts)
- **Icons:** Lucide
- **Zustand**

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [BakeryApi backend](https://github.com/amiraelzaian/BakeryApi)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://bakeryapi-production.up.railway.app/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

### Development

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

### Build & Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
app/
  (main)/          # Storefront routes (home, explore, product pages, etc.)
  login/
  register/
  resetPassword/
  verifyCode/
  layout.js         # Root layout — metadata, fonts, providers
  page.js
components/
  ui/                # Logo, ThemeProvider, shadcn primitives
  layout/            # Header, ScrollToTop, footer, etc.
  providers/         # QueryProvider, GoogleAuthProvider, AppProviders
lib/
  fonts.js           # Shared Next/font instances
services/            # API calls (orders, products, cart, wishlist, auth, etc.)
hooks/                # React Query hooks wrapping services
stores/               # Zustand or context-based client state (cart, etc.)
public/               # Static assets, favicons, images
```

## Key Features

- **Product browsing & search** — categories, seasonal offers, product details, reviews
- **Cart & wishlist** — persistent per-user cart, add/remove/update quantities
- **Checkout** — cash on delivery/pickup, or card payment via Kashier hosted checkout
- **Order tracking** — order history, order details, live status (pending → accepted → preparing → ready → out for delivery/picked up → delivered)
- **Account management** — profile info, address, password change
- **AI Assistant** — [describe what this does — product recommendations? order help?]
- **Theming** — light/dark mode via `next-themes`
- **Toasts** — user feedback via Sonner on every mutation (add to cart, place order, etc.)

## Payments (Kashier)

Card payments go through Kashier's hosted checkout:
1. Customer selects "Pay by card" at checkout.
2. Backend creates a Kashier payment session and returns a `paymentUrl`.
3. Customer is redirected to Kashier to complete payment.
4. Kashier redirects back to `/orders/payment-status` and also fires a server-side webhook that creates the actual order once payment is confirmed.

> Payment session creation requires `KASHIER_MERCHANT_ID`, `KASHIER_SECRET_KEY`, `KASHIER_PAYMENT_API_KEY`, `FRONT_URL`, and `APP_BASE_URL` to be set **on the backend** ([BakeryApi](https://github.com/amiraelzaian/BakeryApi)) — this frontend only initiates checkout and displays the resulting status.

## Deployment

Deployed on Vercel. Push to `main` triggers a deployment. Set the same environment variables in the Vercel project settings as in `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://bakeryapi-production.up.railway.app/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

Backend API: [BakeryApi](https://github.com/amiraelzaian/BakeryApi) — deployed on Railway.

Frontend Demo: [GOLDEN CRUMBS](https://golen-crumbs-bakery.vercel.app/) — deployed on Railway.

