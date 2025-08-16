// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 grid gap-6 md:flex md:items-center md:justify-between">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Laser Engraving. All rights reserved.
        </p>

        <nav className="flex gap-4 text-sm">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/basket" className="hover:text-white">Basket</a>
          {/* If these pages don’t exist yet, keep them commented or point to "#" */}
          {/* <a href="/about" className="hover:text-white">About</a>
          <a href="/contact" className="hover:text-white">Contact</a> */}
          <a
            href="mailto:irinel@lazarovici.co.uk"
            className="hover:text-white"
          >
            Email Us
          </a>
        </nav>
      </div>
    </footer>
  )
}
