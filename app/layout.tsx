// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Providers from "./components/Providers" // keeps PayPal + any other providers

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LASERovici Engraving",
  description: "Custom laser-engraved gifts and accessories — precision-crafted in the UK.",
  // Use your JPG as the favicon (works fine)
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  // (Optional) Nice sharing cards if you already set them elsewhere, you can remove this block
  openGraph: {
    type: "website",
    url: "https://shop.lazarovici.co.uk/",
    siteName: "LASERovici Engraving",
    title: "LASERovici Engraving",
    description: "Custom laser-engraved gifts and accessories — precision-crafted in the UK.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
