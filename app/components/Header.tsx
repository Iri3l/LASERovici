"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Orbitron, Playfair_Display } from "next/font/google"
import { useCart } from "../context/CartContext"

// Brand fonts
const orbitron = Orbitron({ subsets: ["latin"], weight: ["600", "700"] })
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600"] })

export default function Header() {
  const { cart } = useCart()

  // Hydration-safe count
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const liveCount = mounted ? cart.reduce((s, i) => s + i.quantity, 0) : 0

  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleMobile = () => setMobileOpen((v) => !v)

  // subtle pulse when count changes
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    if (!mounted) return
    setPulse(true)
    const t = setTimeout(() => setPulse(false), 500)
    return () => clearTimeout(t)
  }, [liveCount, mounted])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#0B1530]/90 via-[#152553]/90 to-[#1D3A8A]/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Desktop row */}
        <div className="h-16 md:h-18 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-1">
  <span className="relative">
    LASER
    <span className="absolute left-0 bottom-0 w-full h-[3px] bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 animate-pulse"></span>
  </span>
  <span className="text-white">ovici</span>
  <span className="text-lg md:text-xl italic text-white/90 ml-1">Engraving</span>
</Link>


          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-white/95 hover:text-amber-300 transition-colors text-sm font-medium"
            >
              Home
            </Link>

            <Link
              href="/basket"
              className="relative flex items-center gap-2 text-white/95 hover:text-amber-300 transition-colors"
              aria-label="View basket"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="text-sm font-medium">Basket</span>
              <span
                className={`absolute -top-2 -right-2 min-w-[20px] h-[20px] rounded-full px-1.5 flex items-center justify-center text-[11px] font-bold tabular-nums bg-rose-500 text-white ${
                  liveCount > 0 ? "opacity-100" : "opacity-0"
                } ${pulse && liveCount > 0 ? "animate-ping-once" : ""}`}
              >
                {liveCount}
              </span>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/95 hover:text-amber-300 hover:bg-white/10 focus:outline-none"
            onClick={toggleMobile}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden transition-[max-height,opacity] duration-300 overflow-hidden ${
          mobileOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 sm:px-6 pb-4 space-y-2 bg-gradient-to-r from-[#0B1530] via-[#152553] to-[#1D3A8A]">
          <Link
            href="/"
            className="block rounded-lg px-4 py-3 bg-white/10 text-white/95 hover:bg-white/15"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/basket"
            className="block rounded-lg px-4 py-3 bg-white/10 text-white/95 hover:bg-white/15"
            onClick={() => setMobileOpen(false)}
          >
            Basket
            {liveCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center rounded-full text-xs font-bold bg-rose-500 text-white px-2 py-0.5">
                {liveCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
