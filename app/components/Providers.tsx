"use client"

import { ReactNode } from "react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { CartProvider } from "../context/CartContext"

const PAYPAL_CLIENT_ID =
  "AVyIo8wrCcWraBoRQTBb31UYf_p-RhBl2R7dmi19vtgJb2kHqXQ-JBtCo1KrXVYdU6N1PKWmTSncoIrZ"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID, // ✅ use camelCase, not "client-id"
        currency: "GBP",
        intent: "capture",
      }}
    >
      <CartProvider>{children}</CartProvider>
    </PayPalScriptProvider>
  )
}
