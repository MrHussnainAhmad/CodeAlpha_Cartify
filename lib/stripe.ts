import { loadStripe, Stripe } from '@stripe/stripe-js';
import StripeServerSide from 'stripe';

// Client-side Stripe instance
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Server-side Stripe instance (lazy, server-only)
let stripeInstance: StripeServerSide | null = null;
export const getServerStripe = () => {
  if (stripeInstance) return stripeInstance;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }
  
  stripeInstance = new StripeServerSide(secretKey);
  return stripeInstance;
};

// Stripe webhook signature verification (server-only)
export const verifyStripeSignature = (
  rawBody: string,
  signature: string
): StripeServerSide.Event => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
  }
  
  const stripe = getServerStripe();
  return stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
};

// Helper function to format amount for display
export const formatPrice = (amount: number, currency = 'usd'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
};

// Helper function to convert price to cents
export const toCents = (amount: number): number => {
  return Math.round(amount * 100);
};
