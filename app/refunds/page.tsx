import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Returns & Refunds | LASERovici Engraving",
  description: "Policy for customised items, non-custom items, damages, and refund method.",
  alternates: { canonical: "/refunds" },
  openGraph: {
    type: "article",
    url: "https://shop.lazarovici.co.uk/refunds",
    title: "Returns & Refunds | LASERovici Engraving",
    description: "Policy for customised items, non-custom items, damages, and refund method.",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Returns & Refunds | LASERovici Engraving",
    description: "Policy for customised items, non-custom items, damages, and refund method.",
    images: ["/og-cover.jpg"],
  },
}

export default function RefundsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-extrabold">Returns & Refunds</h1>
        <p className="mt-2 text-white/80 text-sm">Last updated: 2025-08-17</p>

        <div className="mt-8 space-y-6 bg-white/10 rounded-2xl p-6 backdrop-blur">
          <section>
            <h2 className="text-2xl font-bold">Customised Items</h2>
            <p className="mt-3 text-white/90">
              Personalised items are unique and <strong>non-returnable / non-refundable</strong>, unless the product arrives damaged or there is an engraving error by us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Non-Custom Items</h2>
            <p className="mt-3 text-white/90">
              If an item is not customised, you may request a return within 14 days in unused, resale condition.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Opened Packaging</h2>
            <p className="mt-3 text-white/90">
              Some products must be opened for engraving. Your item may not be returned in a sealed box; packaging condition alone does not qualify for a refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">How to Request Help</h2>
            <ol className="mt-3 list-decimal pl-6 space-y-2 text-white/90">
              <li>Email <a href="mailto:irinel@lazarovici.co.uk" className="underline underline-offset-4">irinel@lazarovici.co.uk</a> within 14 days (48 hours for damage on arrival).</li>
              <li>Include order number, photos, and a brief description.</li>
              <li>We will assess and advise next steps (repair, replacement, partial refund, or rejection if ineligible).</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Customer-Owned Items</h2>
            <p className="mt-3 text-white/90">
              Engraving is permanent and cannot be undone. For send-in items, we’re not liable for transit damage/loss unless agreed in writing. Use tracked/insured shipping.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Refund Method</h2>
            <p className="mt-3 text-white/90">
              Approved refunds are returned via the original payment method within 5–10 business days (payment provider dependent).
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
