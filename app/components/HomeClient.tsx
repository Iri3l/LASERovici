// app/components/HomeClient.tsx (CLIENT)
"use client"
/* eslint-disable @next/next/no-img-element */

import Script from "next/script"
import { useState, useEffect } from "react"
import Hero from "../components/Hero"
import { products as defaultProducts, Product } from "../data/products"
import { useCart } from "../context/CartContext"

// Lightbox (regular imports — plugins aren’t React components)
import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css"

/* --- ProductCard --- */
function ProductCard({
  product,
  addToCart,
}: {
  product: Product
  addToCart: (item: { id: number; name: string; price: number; image: string }) => void
}) {
  const [selectedImage, setSelectedImage] = useState(product.images[0])

  // Lightbox state
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)
  const openLightboxAt = (src: string) => {
    const idx = product.images.findIndex((i) => i === src)
    setLbIndex(Math.max(0, idx))
    setLbOpen(true)
  }

  // Description collapse state
  const [expanded, setExpanded] = useState(false)
  const PREVIEW_LEN = 120
  const fullDesc = product.description || ""
  const shortDesc =
    fullDesc.length > PREVIEW_LEN ? fullDesc.slice(0, PREVIEW_LEN) + "…" : fullDesc

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition">
      <div className="relative w-full h-64">
        {/* Main image: click opens lightbox with arrows/zoom */}
        <button
          type="button"
          className="w-full h-64"
          onClick={() => openLightboxAt(selectedImage)}
          aria-label={`Open ${product.name} gallery`}
        >
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-64 object-cover"
            draggable={false}
          />
        </button>

        {/* Thumbnails */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {product.images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedImage(img)}
              onDoubleClick={() => openLightboxAt(img)} // double‑click thumb to open zoomed
              className={`w-10 h-10 rounded overflow-hidden border-2 ${
                selectedImage === img
                  ? "border-blue-600"
                  : "border-transparent hover:border-gray-300"
              }`}
              aria-label={`View ${product.name} image ${i + 1}`}
            >
              <img
                src={img}
                alt={`${product.name} ${i + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>

        {/* Collapsible description */}
        <p id={`desc-${product.id}`} className="text-gray-600 text-sm">
          {expanded ? fullDesc : shortDesc}
        </p>

        {fullDesc.length > PREVIEW_LEN && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-blue-600 text-sm mt-1 self-start hover:underline"
            aria-expanded={expanded}
            aria-controls={`desc-${product.id}`}
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}

        <p className="mt-2 text-lg font-bold text-blue-600">
          £{product.price.toFixed(2)}
        </p>

        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0] ?? "/images/placeholder.jpg",
            })
          }
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
        >
          Add to Basket
        </button>
      </div>

      {/* Lightbox with arrows + zoom */}
      {lbOpen && (
        <Lightbox
          open={lbOpen}
          close={() => setLbOpen(false)}
          index={lbIndex}
          slides={product.images.map((src) => ({ src }))}
          plugins={[Zoom]}
          controller={{ closeOnBackdropClick: true }}
          carousel={{ finite: false }} // wrap-around
        />
      )}
    </div>
  )
}

/* --- HomeClient --- */
export default function HomeClient() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>(defaultProducts)

  // Products are loaded from products.ts (source of truth)
  // All product changes must be made in app/data/products.ts and committed
  useEffect(() => {
    setProducts(defaultProducts);
  }, []);

  // JSON-LD (Organization + WebSite)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "LASERovici Engraving", url: "https://shop.lazarovici.co.uk", sameAs: [] },
      { "@type": "WebSite", name: "LASERovici Engraving", url: "https://shop.lazarovici.co.uk" }
    ]
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-gray-900">
      {/* Structured data */}
      <Script
        id="ld-org-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      <div className="max-w-7xl mx-auto px-6 pb-16" id="products">
        <h1 className="text-3xl font-bold mb-8 text-white">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </main>
  )
}
