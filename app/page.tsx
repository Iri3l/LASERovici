"use client"

import { useState } from "react"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

import Hero from "./components/Hero"
import { products, type Product } from "./data/products"
import { useCart } from "./context/CartContext"

export default function HomePage() {
  const { addToCart } = useCart()

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* HERO */}
        <Hero />

        {/* Section title */}
        <header className="mt-10 mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Our Products
          </h2>
          <p className="mt-2 text-white/80">
            Tap an image to zoom. Use thumbnails to view front/back and more.
          </p>
        </header>

        {/* GRID */}
        <section
          id="products"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={() => addToCart(
              {
                id: p.id,
                name: p.name,
                price: Number(p.price),
                image: (Array.isArray(p.images) && p.images.length ? p.images[0] : "/images/placeholder.jpg"),
              },
              1
            )} />
          ))}
        </section>
      </div>
    </main>
  )
}

/* ================= Product Card ================= */

function ProductCard({
  product,
  onAdd,
}: {
  product: Product
  onAdd: () => void
}) {
  const imageList =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["/images/placeholder.jpg"]

  const [activeSrc, setActiveSrc] = useState(imageList[0])

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:-translate-y-0.5 transition-transform">
      {/* Main Image (Zoomable) */}
      <div className="relative">
        <Zoom>
          <img
            src={activeSrc}
            alt={product.name}
            className="w-full h-56 object-cover cursor-zoom-in"
            loading="lazy"
          />
        </Zoom>

        {/* Decorative gradient edge */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 to-transparent" />
      </div>

      {/* Thumbnails */}
      <div className="px-4 pt-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {imageList.map((src, idx) => (
            <button
              key={`${product.id}-${idx}`}
              onClick={() => setActiveSrc(src)}
              aria-label={`View image ${idx + 1} of ${product.name}`}
              className={`relative shrink-0 rounded-md border-2 ${
                activeSrc === src ? "border-blue-600" : "border-transparent"
              }`}
              style={{ lineHeight: 0 }}
            >
              <img
                src={src}
                alt={`${product.name} ${idx + 1}`}
                className="w-14 h-14 object-cover rounded-md"
                loading="lazy"
              />
              {/* Optional “Front/Back” labels for first two images */}
              {idx < 2 && (
                <span className="absolute bottom-1 left-1 text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-white">
                  {idx === 0 ? "Front" : "Back"}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-xl font-extrabold text-blue-700">
              £{Number(product.price).toFixed(2)}
            </p>
          </div>

          <button
            onClick={onAdd}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium px-4 py-2 hover:bg-blue-700 transition"
            aria-label={`Add ${product.name} to basket`}
          >
            Add to Basket
          </button>
        </div>
      </div>
    </article>
  )
}
