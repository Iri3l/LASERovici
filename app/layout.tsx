// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "./components/Providers";
import PWAProvider from "./components/PWAProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LASERovici Engraving",
  description:
    "Custom laser-engraved gifts and accessories — precision-crafted in the UK.",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    type: "website",
    url: "https://shop.lazarovici.co.uk/",
    siteName: "LASERovici Engraving",
    title: "LASERovici Engraving",
    description:
      "Custom laser-engraved gifts and accessories — precision-crafted in the UK.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#111827" />
        {/* iOS PWA support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className={inter.className}>
        <PWAProvider />
        <Providers>
          <Header />
          {/* Reserve header height on mobile (≈64px) */}
          <div className="h-[calc(4rem+env(safe-area-inset-top))] md:h-0" />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
