// app/components/Hero.tsx
export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Laser Engraving
        </h1>
        <p className="mt-3 text-white/90 max-w-2xl mx-auto">
        Custom gifts and personalized items in wood, metal, leather, glass, and more. 
        High-precision engraving. Fast turnaround. Small-batch friendly. Signs for doors, floors, tables, street names, and more.
        Get in touch for your custom design and object/material to be engraved.
        </p>

        {/* Badges */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center text-sm">
          <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20">
            Wood · Metal · Leather · Glass · Plastic · Acrylics 
          </span>
          <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20">
            Made in the UK
          </span>
          <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20">
            Custom Design Support
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="#products"
            className="inline-flex items-center justify-center rounded-lg bg-white text-cyan-600 font-semibold px-5 py-3 shadow hover:bg-cyan-50 transition"
          >
            Browse Products
          </a>
          <a
            href="/basket"
            className="inline-flex items-center justify-center rounded-lg bg-fuchsia-500/20 text-white border border-white/30 px-5 py-3 hover:bg-fuchsia-500/30 transition"
          >
            View Basket
          </a>
        </div>
      </div>
    </section>
  )
}
