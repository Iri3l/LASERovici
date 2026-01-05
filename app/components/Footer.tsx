"use client"

import Link from "next/link"
import { Mail, ShieldCheck, PackageCheck, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-gradient-to-r from-violet-700/80 via-fuchsia-700/80 to-cyan-700/80 text-white">
      {/* Top: Value props */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-yellow-300 shrink-0" />
          <div>
            <h3 className="font-semibold">Premium Engraving</h3>
            <p className="text-white/80 text-sm">Precision crafted results.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <PackageCheck className="w-6 h-6 text-yellow-300 shrink-0" />
          <div>
            <h3 className="font-semibold">Careful Packaging</h3>
            <p className="text-white/80 text-sm">Ships protected and presentation-ready.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="w-6 h-6 text-yellow-300 shrink-0" />
          <div>
            <h3 className="font-semibold">Fast Turnaround</h3>
            <p className="text-white/80 text-sm">Small batches welcome, quick delivery.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="w-6 h-6 text-yellow-300 shrink-0" />
          <div>
            <h3 className="font-semibold">Direct Support</h3>
            <p className="text-white/80 text-sm">
              <a href="mailto:irinel@lazarovici.co.uk" className="underline underline-offset-4 hover:text-yellow-300">
                irinel@lazarovici.co.uk
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Mid: Brand + links + newsletter */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand block with laser beam underline */}
          <div>
            <div className="inline-flex items-baseline gap-1 group">
              <span className="relative text-2xl md:text-3xl font-extrabold tracking-widest uppercase text-yellow-300">
                LASER
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_14px_rgba(255,0,0,0.9)]" />
              </span>
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-white">ovici</span>
              <span className="text-lg md:text-xl italic text-white/90 ml-1">Engraving</span>
            </div>
            <p className="mt-3 text-white/80 text-sm max-w-sm">
              Custom laser-engraved gifts and accessories — precision-crafted in the UK.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:mx-auto">
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="text-white/95 hover:text-amber-300 transition-colors">
              <li><Link href="/" className="hover:text-yellow-300 transition-colors">Home</Link></li>
              <li><Link href="/basket" className="hover:text-yellow-300 transition-colors">Basket</Link></li>
              <li><a href="mailto:irinel@lazarovici.co.uk" className="hover:text-yellow-300 transition-colors">Contact</a></li>
              <li><Link href="/#products" className="hover:text-yellow-300 transition-colors">Products</Link></li>
              <li><Link href="/shipping" className="hover:text-yellow-300 transition-colors">Shipping & Delivery</Link></li>
<li><Link href="/refunds" className="hover:text-yellow-300 transition-colors">Returns & Refunds</Link></li>

            </ul>
          </div>

          {/* Newsletter (no backend; uses mailto for now) */}
          <div>
            <h4 className="font-semibold mb-3">Get updates</h4>
            <p className="text-white/80 text-sm mb-3">Occasional product drops and seasonal deals.</p>
            <form
              action="https://formsubmit.co/irinel@lazarovici.co.uk"
              method="POST"
              className="flex items-center gap-2"
            >
              {/* Honeypot + disable captcha via formsubmit (simple) */}
              <input type="hidden" name="_subject" value="LASERovici Newsletter Signup" />
              <input type="text" name="_honey" className="hidden" />
              <input type="hidden" name="_captcha" value="false" />

              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                className="w-full rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-white text-cyan-600 font-semibold px-4 py-2 hover:bg-cyan-50 transition"
              >
                Join
              </button>
            </form>
            <p className="text-white/60 text-xs mt-2">
              By subscribing, you agree to receive updates. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: legal */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-white/70 text-sm">
          <p>© {new Date().getFullYear()} LASERovici Engraving. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            <Link href="/privacy" className="hover:text-yellow-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-yellow-300 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
