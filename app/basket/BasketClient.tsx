// app/basket/BasketClient.tsx (CLIENT)
"use client"
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useCart } from "../context/CartContext"
import { PayPalButtons } from "@paypal/react-paypal-js"

export default function BasketClient() {
  // make sure your CartContext exports removeItem in addition to removeFromCart
  const { cart, addToCart, removeFromCart, removeItem, clearCart } = useCart()

  // Hydration-safe rendering
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Totals
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0),
    [cart]
  )
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">Your Basket</h1>
          <Link
            href="/"
            className="text-sm px-4 py-2 rounded-lg bg-white/90 text-blue-700 hover:bg-white transition"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {!mounted ? (
              // Skeleton during hydration
              <>
                <div className="rounded-xl bg-white/10 p-6 h-24 animate-pulse" />
                <div className="rounded-xl bg-white/10 p-6 h-24 animate-pulse" />
              </>
            ) : cart.length === 0 ? (
              <div className="rounded-xl bg-white/10 p-6">
                <p className="text-white/90">
                  Your basket is empty.{" "}
                  <Link href="/#products" className="underline underline-offset-4">
                    Browse products
                  </Link>
                  .
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.name}`}
                  className="rounded-xl bg-white/10 p-4 flex gap-4 items-center"
                >
                  <img
                    src={item.image ?? "/images/placeholder.jpg"}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold truncate">{item.name}</h2>
                    <p className="text-white/80 text-sm">£{Number(item.price).toFixed(2)}</p>

                    <div className="mt-2 flex items-center gap-2">
                      {/* Decrement by 1 */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, 1)}
                        className="px-2 py-1 rounded bg-white/20 hover:bg-white/30"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      {/* Qty */}
                      <span className="px-3 py-1 rounded bg-white/10">{item.quantity}</span>

                      {/* Increment by 1 */}
                      <button
                        type="button"
                        onClick={() =>
                          addToCart(
                            {
                              id: item.id,
                              name: item.name,
                              price: Number(item.price),
                              image: item.image ?? "/images/placeholder.jpg",
                            },
                            1
                          )
                        }
                        className="px-2 py-1 rounded bg-white/20 hover:bg-white/30"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>

                      {/* Remove whole line */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="ml-3 text-red-300 hover:text-red-200 underline underline-offset-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary / Checkout (sticky on large screens) */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl bg-white/10 p-6">
              <h3 className="text-xl font-semibold">Order Summary</h3>

              <div className="mt-4 space-y-2 text-white/90">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{mounted ? totalItems : 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{(mounted ? subtotal : 0).toFixed(2)}</span>
                </div>
              </div>

              {/* PayPal buttons only after mount to avoid hydration issues */}
              {mounted && cart.length > 0 && (
                <div className="mt-6">
                  <PayPalButtons
                    style={{
                      layout: "horizontal",
                      color: "gold",
                      label: "checkout",
                      shape: "rect",
                      height: 45,
                      tagline: false,
                    }}
                    createOrder={(_data, actions) =>
                      actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "GBP",
                              value: subtotal.toFixed(2),
                            },
                          },
                        ],
                        application_context: {
                          shipping_preference: "GET_FROM_FILE",
                        },
                      })
                    }
                    onApprove={async (_data, actions) => {
                      if (!actions.order) return
                      const details = await actions.order.capture()
                      alert(
                        `Transaction completed by ${
                          details.payer?.name?.given_name || "customer"
                        }`
                      )
                      clearCart()
                    }}
                    onError={(err) => {
                      console.error("PayPal error:", err)
                      alert("Sorry, PayPal checkout failed. Please try again.")
                    }}
                    // re-render when totals change
                    forceReRender={[subtotal.toFixed(2), String(totalItems)]}
                  />
                </div>
              )}

              <button
                type="button"
                onClick={clearCart}
                className="mt-4 text-sm text-white/80 hover:text-white underline underline-offset-4"
              >
                Clear basket
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
