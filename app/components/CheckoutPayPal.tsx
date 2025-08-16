// app/components/CheckoutPayPal.tsx
"use client"

import { PayPalButtons } from "@paypal/react-paypal-js"
import { useCart } from "../context/CartContext"
import { useEffect, useMemo, useState } from "react"

export default function CheckoutPayPal() {
  const { cart, total, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration issues
  useEffect(() => setMounted(true), [])

  // Build purchase_units items (optional but nice)
  const items = useMemo(
    () =>
      cart.map((i) => ({
        name: i.name,
        unit_amount: { currency_code: "GBP", value: Number(i.price).toFixed(2) },
        quantity: String(i.quantity),
      })),
    [cart]
  )

  if (!mounted) {
    return (
      <div className="w-full rounded-lg bg-gray-100 h-12 animate-pulse" aria-hidden />
    )
  }

  return (
    <PayPalButtons
      style={{ layout: "vertical", shape: "rect", color: "gold", label: "paypal" }}
      createOrder={async (_data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "GBP",
                value: Number(total).toFixed(2),
                breakdown: {
                  item_total: { currency_code: "GBP", value: Number(total).toFixed(2) },
                },
              },
              items, // optional, for better receipts
            },
          ],
        })
      }}
      onApprove={async (_data, actions) => {
        const details = await actions.order?.capture()
        // You can inspect `details` and store order info if needed
        alert("Payment completed! Thank you for your order 🙌")
        clearCart()
      }}
      onError={(err) => {
        console.error("PayPal error", err)
        alert("Sorry, PayPal checkout failed. Please try again.")
      }}
      disabled={cart.length === 0 || total <= 0}
      forceReRender={[Number(total).toFixed(2), cart.length]}
    />
  )
}
