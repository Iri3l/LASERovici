"use client"
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useCart } from "../context/CartContext"
import CheckoutForm from "../components/CheckoutForm"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Appearance } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BasketClient() {
  const { cart, addToCart, removeFromCart, removeItem, clearCart } = useCart()
  const [clientSecret, setClientSecret] = useState("");
  const [mounted, setMounted] = useState(false)
  const [tcAccepted, setTcAccepted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (cart.length > 0) {
      // Create PaymentIntent as soon as the page loads with a cart
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cart }),
      })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    }
  }, [cart]);

  const appearance: Appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };


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

              {/* T&C inline gate */}
              {mounted && cart.length > 0 && (
                <div className="mt-5 space-y-3">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4"
                      checked={tcAccepted}
                      onChange={(e) => setTcAccepted(e.currentTarget.checked)}
                    />
                    <span className="text-sm text-white/90">
                      I have read and accept the{" "}
                      <Link href="/terms" target="_blank" className="underline underline-offset-4">
                        Terms &amp; Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" target="_blank" className="underline underline-offset-4">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>

                  {/* Payment Methods */}
                  <div className="relative">
                    {!tcAccepted && (
                      <div
                        className="absolute inset-0 z-10 rounded-lg bg-black/20 backdrop-blur-sm flex items-center justify-center pointer-events-auto"
                        aria-hidden="true"
                      >
                        <span className="text-xs text-white/90 bg-black/40 px-2 py-1 rounded">
                          Please accept Terms &amp; Conditions to continue
                        </span>
                      </div>
                    )}
                    {/* Render CheckoutForm */}
                    {tcAccepted && clientSecret && (
                      <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                      </Elements>
                    )}
                  </div>
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
