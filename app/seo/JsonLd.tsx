// app/seo/JsonLd.tsx
"use client"

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Laser Engraving",
    url: "https://shop.lazarovici.co.uk/",
    logo: "https://shop.lazarovici.co.uk/icon-512.png",
    sameAs: [], // add socials later
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Laser Engraving",
    url: "https://shop.lazarovici.co.uk/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://shop.lazarovici.co.uk/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  )
}
