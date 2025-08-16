// app/components/Hero.tsx
export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
          Premium Laser Engraving
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 opacity-90">
          Transform ordinary items into unique, custom masterpieces.
          Precision-crafted with the <span className="font-semibold">LaserPecker 4</span>.
        </p>
        <a
          href="/basket"
          className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Shop Now
        </a>
      </div>
    </section>
  )
}
