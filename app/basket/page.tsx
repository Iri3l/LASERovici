"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { useCart } from "../context/CartContext"
import { PayPalButtons } from "@paypal/react-paypal-js"

type ShippingInfo = {
  name?: string
  line1?: string
  line2?: string
  city?: string
  postcode?: string
  country?: string
}

export default function BasketPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Basket</h1>
        <div className="h-24 rounded-xl bg-white shadow animate-pulse" />
      </main>
    )
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const isEmpty = cart.length === 0

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-gray-900">
      <div className="max-w-4xl mx-auto p-6 pb-40">
        <h1 className="text-3xl font-bold mb-6 text-white">Your Basket</h1>

        {/* Show shipping info after a successful capture */}
        {shippingInfo && (
          <div className="mb-6 rounded-xl bg-white shadow p-4">
            <p className="font-semibold text-green-700">Order received ✅</p>
            <p className="text-sm text-gray-700 mt-1">
              Ship to: <span className="font-medium">{shippingInfo.name}</span>
            </p>
            <p className="text-sm text-gray-700">
              {shippingInfo.line1}
              {shippingInfo.line2 ? `, ${shippingInfo.line2}` : ""}
            </p>
            <p className="text-sm text-gray-700">
              {shippingInfo.city} {shippingInfo.postcode}, {shippingInfo.country}
            </p>
          </div>
        )}

        {isEmpty ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-700 mb-4">Your basket is empty.</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              ← Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white rounded-xl shadow p-4"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow"
                />

                {/* Details */}
                <div className="flex-1 px-4 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">
                    £{item.price.toFixed(2)} × {item.quantity}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition"
                  title="Remove item"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600" />
                </button>
              </div>
            ))}

            {/* Actions above the sticky bar */}
            <div className="flex justify-between items-center pt-2">
              <Link
                href="/"
                className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="inline-block px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Clear Basket
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== Sticky Checkout Bar ===== */}
      {!isEmpty && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/30 bg-white/90 backdrop-blur">
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center gap-4 md:gap-6">
            {/* Total summary */}
            <div className="flex-1 w-full md:w-auto text-center md:text-left">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-extrabold text-gray-900">
                £{total.toFixed(2)}
              </p>
            </div>

            {/* PayPal Button (ScriptProvider is already in app/components/Providers.tsx) */}
            <div className="w-full md:w-auto">
              <PayPalButtons
                style={{ layout: "horizontal", color: "gold", label: "checkout", shape: "rect" }}
                createOrder={(_data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "GBP",
                          value: total.toFixed(2),
                        },
                      },
                    ],
                    application_context: {
                      // ✅ Ask PayPal to return the buyer's shipping address
                      shipping_preference: "GET_FROM_FILE",
                    },
                  })
                }}
                onApprove={(_data, actions) => {
                  if (actions.order) {
                    return actions.order.capture().then((details) => {
                      // Extract shipping address (if buyer has one saved)
                      const pu = details.purchase_units?.[0]
                      const ship = pu?.shipping
                      const name = ship?.name?.full_name
                      const addr = ship?.address

                      // Save in state so we can render a confirmation banner
                      setShippingInfo({
                        name: name || details.payer?.name?.given_name || undefined,
                        line1: addr?.address_line_1 || undefined,
                        line2: addr?.address_line_2 || undefined,
                        city: addr?.admin_area_2 || undefined,
                        postcode: addr?.postal_code || undefined,
                        country: addr?.country_code || undefined,
                      })

                      // Clear the basket after successful payment
                      clearCart()
                    })
                  }
                  return Promise.resolve()
                }}
                onError={(err) => {
                  console.error("PayPal error:", err)
                  alert("Sorry, PayPal checkout failed. Please try again.")
                }}
                disabled={isEmpty || total <= 0}
                forceReRender={[total.toFixed(2), cart.length]}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
