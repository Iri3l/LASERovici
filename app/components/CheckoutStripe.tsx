"use client"

import { useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { stripePromise } from "./Providers"
import CheckoutForm from "./CheckoutForm"
import { useCart } from "../context/CartContext"

export default function CheckoutStripe() {
  const { cart } = useCart()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only fetch client secret if Stripe is configured and we have items in cart
    if (!stripePromise || cart.length === 0) {
      return
    }

    setLoading(true)
    setError(null)

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems: cart }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setLoading(false)
        } else {
          setClientSecret(data.clientSecret)
          setLoading(false)
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to initialize payment")
        setLoading(false)
      })
  }, [cart])

  // Don't render if Stripe is not configured
  if (!stripePromise) {
    return null
  }

  if (loading) {
    return (
      <div className="text-center py-4 text-white/90">
        Loading payment options...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-300">
        {error}
      </div>
    )
  }

  if (!clientSecret) {
    return null
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  )
}

