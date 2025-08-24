import type { Metadata } from "next";
import HomeClient from "./components/HomeClient";
import ProductGallery from "./components/ProductGallery";

export const metadata: Metadata = {
  title: "Custom Laser Engraving in the UK | LASERovici Engraving",
  description:
    "Personalised laser engraving for gifts, décor, and accessories. Quality finishes and careful packaging. Order bespoke items or send in your own.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://shop.lazarovici.co.uk/",
    siteName: "LASERovici Engraving",
    title: "Custom Laser Engraving in the UK | LASERovici Engraving",
    description:
      "Personalised laser engraving for gifts, décor, and accessories. Order bespoke items or send in your own.",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Laser Engraving in the UK | LASERovici Engraving",
    description:
      "Personalised laser engraving for gifts, décor, and accessories. Quality craftsmanship and careful packaging.",
    images: ["/logo.jpg"],
  },
};

export default function Page() {
  return <HomeClient />; // Keep your existing homepage
}
