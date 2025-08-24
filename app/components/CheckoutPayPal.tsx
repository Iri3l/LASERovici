// app/components/CheckoutPayPal.tsx (CLIENT)
"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/CartContext";

export default function CheckoutPayPal() {
  const { cart, clearCart } = useCart();

  // avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0),
    [cart]
  );
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  if (!mounted || cart.length === 0) return null;

  return (
    <PayPalButtons
      style={{
        layout: "horizontal",
        color: "gold",
        label: "checkout",
        shape: "rect",
        height: 45,
        tagline: false
      }}
      createOrder={(_data, actions) =>
        actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "GBP",
                value: subtotal.toFixed(2)
              }
            }
          ],
          application_context: {
            shipping_preference: "GET_FROM_FILE"
          }
        })
      }
      onApprove={async (_data, actions) => {
        if (!actions.order) return;
        const details = await actions.order.capture();
        alert(`Transaction completed by ${details.payer?.name?.given_name || "customer"}`);
        clearCart();
      }}
      onError={(err) => {
        console.error("PayPal error:", err);
        alert("Sorry, PayPal checkout failed. Please try again.");
      }}
      // re-render when totals change
      forceReRender={[subtotal.toFixed(2), String(totalItems)]}
    />
  );
}
