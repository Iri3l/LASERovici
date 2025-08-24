// app/components/CheckoutPayPal.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/CartContext";
import TermsConsentModal, { useTermsConsent } from "./TermsConsent";

export default function CheckoutPayPal() {
  const { cart, clearCart } = useCart();

  // hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // consent
  const { accepted, accept } = useTermsConsent();
  const [showTc, setShowTc] = useState(false);

  // promise gate (to resume PayPal automatically after Accept)
  const resolveRef = useRef<null | (() => void)>(null);
  const rejectRef = useRef<null | (() => void)>(null);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0),
    [cart]
  );
  const totalItems = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart]);

  if (!mounted || cart.length === 0) return null;

  return (
    <>
      <PayPalButtons
        style={{
          layout: "horizontal",
          color: "gold",
          label: "checkout",
          shape: "rect",
          height: 45,
          tagline: false,
        }}
        /**
         * Gate the click until T&C accepted:
         * Return a Promise; resolve => proceed, reject => cancel.
         */
        onClick={(_data, _actions) => {
          if (accepted) {
            return undefined; // proceed normally
          }
          setShowTc(true);
          return new Promise<void>((resolve, reject) => {
            resolveRef.current = resolve;
            rejectRef.current = reject;
          });
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
          if (!actions.order) return;
          const details = await actions.order.capture();
          alert(`Transaction completed by ${details.payer?.name?.given_name || "customer"}`);
          clearCart();
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          alert("Sorry, PayPal checkout failed. Please try again.");
        }}
        // re-render if totals or consent change
        forceReRender={[subtotal.toFixed(2), String(totalItems), String(accepted)]}
      />

      {/* T&C Modal */}
      <TermsConsentModal
        open={showTc}
        onClose={() => {
          setShowTc(false);
          if (rejectRef.current) {
            rejectRef.current();
            rejectRef.current = null;
            resolveRef.current = null;
          }
        }}
        onAccept={() => {
          accept(); // persist consent
          // resolve the pending PayPal click so it continues without a second tap
          if (resolveRef.current) {
            resolveRef.current();
            resolveRef.current = null;
            rejectRef.current = null;
          }
        }}
      />
    </>
  );
}
