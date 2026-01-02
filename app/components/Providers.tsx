// app/components/Providers.tsx
"use client"

import { ReactNode } from "react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { loadStripe } from "@stripe/stripe-js"
import { CartProvider } from "../context/CartContext"

const PAYPAL_CLIENT_ID =
  "AVyIo8wrCcWraBoRQTBb31UYf_p-RhBl2R7dmi19vtgJb2kHqXQ-JBtCo1KrXVYdU6N1PKWmTSncoIrZ"

// Get Stripe publishable key (works at runtime on Heroku)
// Next.js will replace NEXT_PUBLIC_* vars at build time, but we need runtime check too
const getStripePublishableKey = () => {
  if (typeof window !== 'undefined') {
    // Client-side: check if available in window (for runtime injection if needed)
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
  }
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
}

// Initialize Stripe promise (lazy load)
let stripePromise: ReturnType<typeof loadStripe> | null = null

export const getStripePromise = () => {
  if (!stripePromise) {
    const publishableKey = getStripePublishableKey()
    if (publishableKey) {
      stripePromise = loadStripe(publishableKey)
    }
  }
  return stripePromise
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID, // camelCase required by types
        currency: "GBP",
        intent: "capture",
      }}
    >
      <CartProvider>{children}</CartProvider>
    </PayPalScriptProvider>
  )
}
