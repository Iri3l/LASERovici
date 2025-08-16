"use client"

import Link from "next/link"
import { useCart } from "../context/CartContext"
import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"

export default function Header() {
  const { cart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-white hover:text-yellow-300 transition-colors"
        >
          Laser Engraving
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-white/90 hover:text-yellow-300 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/basket"
            className="relative inline-flex items-center text-white hover:text-yellow-300 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />

            {/* Badge */}
            {mounted && itemCount > 0 && (
              <span
                aria-live="polite"
                aria-atomic="true"
                className="absolute -top-2 -right-3 bg-yellow-400 text-blue-900 font-bold rounded-full px-2 py-0.5 text-xs shadow-md"
              >
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
