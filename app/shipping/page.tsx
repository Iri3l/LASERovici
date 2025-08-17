import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping & Delivery | LASERovici Engraving",
  description: "Lead times, packaging, UK/international delivery, and send-in item info.",
  alternates: { canonical: "/shipping" },
  openGraph: {
    type: "article",
    url: "https://shop.lazarovici.co.uk/shipping",
    title: "Shipping & Delivery | LASERovici Engraving",
    description: "Lead times, packaging, UK/international delivery, and send-in item info.",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping & Delivery | LASERovici Engraving",
    description: "Lead times, packaging, UK/international delivery, and send-in item info.",
    images: ["/og-cover.jpg"],
  },
}

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-extrabold">Shipping & Delivery</h1>
        <p className="mt-2 text-white/80 text-sm">Last updated: 2025-08-17</p>

        <div className="mt-8 space-y-6 bg-white/10 rounded-2xl p-6 backdrop-blur">
          <section>
            <h2 className="text-2xl font-bold">Packaging & Engraving Process</h2>
            <p className="mt-3 text-white/90">
              Some items must be opened to engrave correctly. Your engraved item may not be delivered in its original sealed box. We re-pack securely for transit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Lead Times</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-white/90">
              <li><strong>Sourced items:</strong> If we need to order the product first, we’ll provide an estimated delivery window before confirmation.</li>
              <li><strong>Send-in items:</strong> Turnaround begins once the item arrives and the design is approved.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">UK Shipping</h2>
            <p className="mt-3 text-white/90">Tracked delivery across the UK. You’ll receive confirmation and, where available, tracking details.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">International Shipping</h2>
            <p className="mt-3 text-white/90">International orders may incur customs duties/taxes in the destination country, payable by the customer.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Delivery Issues & Damages</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-white/90">
              <li>If your parcel arrives damaged, email <a href="mailto:irinel@lazarovici.co.uk" className="underline underline-offset-4">irinel@lazarovici.co.uk</a> within 48 hours with photos.</li>
              <li>Missed deliveries or incomplete addresses may incur redelivery fees.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Send-In (Customer-Owned) Items</h2>
            <p className="mt-3 text-white/90">Contact us first to confirm suitability. Use tracked/insured services when shipping items to us.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
