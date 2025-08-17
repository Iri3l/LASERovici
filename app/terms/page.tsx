import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | LASERovici Engraving",
  description: "Order terms for custom engraving, packaging, delivery, and returns.",
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "article",
    url: "https://shop.lazarovici.co.uk/terms",
    title: "Terms & Conditions | LASERovici Engraving",
    description: "Order terms for custom engraving, packaging, delivery, and returns.",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | LASERovici Engraving",
    description: "Order terms for custom engraving, packaging, delivery, and returns.",
    images: ["/og-cover.jpg"],
  },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-extrabold">Terms & Conditions</h1>
        <p className="mt-2 text-white/80 text-sm">Last updated: 2025-08-17</p>

        <div className="mt-8 space-y-6 bg-white/10 rounded-2xl p-6 backdrop-blur">
          <section>
            <h2 className="text-2xl font-bold">1) Custom products</h2>
            <p className="mt-3 text-white/90">
              If you provide customisation (names, dates, artwork, logos), the item becomes unique to you.
              <strong> Customised items are non-returnable and non-refundable</strong>, unless the item is damaged on arrival
              or there is an engraving error on our part.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">2) Opening original packaging</h2>
            <p className="mt-3 text-white/90">
              Some products must be opened to engrave correctly. This means your engraved item may not be delivered in its original sealed box.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">3) Stock & delivery times</h2>
            <p className="mt-3 text-white/90">
              We do not hold stock of every engravable product. If we need to source an item before engraving, delivery will take longer.
              We’ll provide an estimated delivery window before confirming your order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">4) Send-in (customer-owned) items</h2>
            <p className="mt-3 text-white/90">
              If you already have an item you’d like engraved, contact us first to confirm suitability (material, size, design).
              You are responsible for shipping the item to us safely; we recommend tracked/insured services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">5) Proofs & approval</h2>
            <p className="mt-3 text-white/90">
              For custom artwork we may send a digital proof. Please check spelling, dates, and layout carefully—your approval authorises engraving.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">6) Liability</h2>
            <p className="mt-3 text-white/90">
              Engraving is permanent. While we take great care, we are not responsible for minor variations typical of the material or process.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
