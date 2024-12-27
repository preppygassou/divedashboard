import Stripe from 'stripe'

/* let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
}; */

export const stripe = new Stripe(process.env.STRIPE_PUBLIC_KEY ?? '', {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Dive Card',
    version: '0.1.0',
  },
})

export const CARD_PRICES = {
  basic: 'price_basic',
  pro: 'price_pro',
  elite: 'price_elite',
} as const;