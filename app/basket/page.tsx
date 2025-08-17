// app/basket/page.tsx  (SERVER COMPONENT — no "use client")
import type { Metadata } from "next"
import BasketClient from "./BasketClient"

export const metadata: Metadata = {
  title: "Your Basket | LASERovici Engraving",
  description: "Review your items and complete checkout securely with PayPal.",
  alternates: { canonical: "/basket" },
  openGraph: {
    type: "website",
    url: "https://shop.lazarovici.co.uk/basket",
    siteName: "LASERovici Engraving",
    title: "Your Basket | LASERovici Engraving",
    description:
      "Review your items and complete checkout securely with PayPal.",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Basket | LASERovici Engraving",
    description:
      "Review your items and complete checkout securely with PayPal.",
    images: ["/og-cover.jpg"],
  },
}

export default function Page() {
  return <BasketClient />
}
