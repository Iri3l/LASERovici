import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | LASERovici Engraving",
  description: "How we collect, use, and protect your data.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "article",
    url: "https://shop.lazarovici.co.uk/privacy",
    title: "Privacy Policy | LASERovici Engraving",
    description: "How we collect, use, and protect your data.",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | LASERovici Engraving",
    description: "How we collect, use, and protect your data.",
    images: ["/og-cover.jpg"],
  },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
        <p className="mt-2 text-white/80 text-sm">Last updated: 2025-08-17</p>

        <div className="mt-8 space-y-6 bg-white/10 rounded-2xl p-6 backdrop-blur">
          <p>
            At <strong>LASERovici Engraving</strong>, we respect your privacy and
            only collect what we need to fulfil your order and provide support.
          </p>

          <section>
            <h2 className="text-2xl font-bold">What we collect</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-white/90">
              <li>Name, email, phone (optional), and delivery address.</li>
              <li>Order details (product, customisation information, notes).</li>
              <li>Payments are processed securely by providers (e.g., PayPal); no card data is stored on our servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">How we use your data</h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-white/90">
              <li>Process and deliver orders.</li>
              <li>Provide updates and customer support.</li>
              <li>Meet legal, accounting, or fraud-prevention requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Sharing</h2>
            <p className="mt-3 text-white/90">
              Shared only with trusted processors essential to your order (e.g., payment providers, couriers). We don’t sell your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Your rights</h2>
            <p className="mt-3 text-white/90">
              Request access, correction, or deletion of your personal data by emailing{" "}
              <a href="mailto:irinel@lazarovici.co.uk" className="underline underline-offset-4">
                irinel@lazarovici.co.uk
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Data retention</h2>
            <p className="mt-3 text-white/90">
              We retain order records only as long as necessary for legal and accounting purposes.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
