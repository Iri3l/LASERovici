// app/components/Providers.tsx
"use client"

import { ReactNode } from "react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { CartProvider } from "../context/CartContext"

const PAYPAL_CLIENT_ID =
  "AVyIo8wrCcWraBoRQTBb31UYf_p-RhBl2R7dmi19vtgJb2kHqXQ-JBtCo1KrXVYdU6N1PKWmTSncoIrZ"

// Initialize Stripe (only if publishable key is available)
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

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

// Export Stripe promise for use in components
export { stripePromise }
