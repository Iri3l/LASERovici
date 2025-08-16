// app/data/products.ts

export type Product = {
  id: number
  name: string
  price: number
  images: string[]
  description: string
  /**
   * Local favorites counter (optional).
   * Useful for UI + placeholder; replace with real DB later.
   */
  favorites?: number
}

export const products: Product[] = [
  {
    id: 1,
    name: "Engraved Wooden Keychain",
    price: 9.99,
    images: ["/images/keychain-front.jpg", "/images/keychain-back.jpg"],
    description:
      "A stylish wooden keychain with custom laser engraving. Perfect for gifts or personal keepsakes.",
    favorites: 0,
  },
  {
    id: 2,
    name: "Personalized Metal Bottle",
    price: 19.99,
    images: ["/images/bottle-front.jpg", "/images/bottle-back.jpg"],
    description:
      "Durable stainless steel bottle with your custom engraving. Keeps drinks hot or cold for hours.",
    favorites: 0,
  },
  {
    id: 3,
    name: "Custom Leather Wallet",
    price: 34.99,
    images: ["/images/wallet-front.jpg", "/images/wallet-back.jpg"],
    description:
      "Premium leather wallet engraved with initials or a short message. Timeless, practical, and unique.",
    favorites: 0,
  },
  {
    id: 4,
    name: "Engraved Wooden Phone Stand",
    price: 14.99,
    images: ["/images/stand-front.jpg", "/images/stand-back.jpg"],
    description:
      "Minimalist wooden phone stand with a sleek laser engraving. Perfect for desks or nightstands.",
    favorites: 0,
  },
  {
    id: 5,
    name: "Custom Glass Mug",
    price: 12.49,
    images: ["/images/mug-front.jpg", "/images/mug-back.jpg"],
    description:
      "Elegant glass mug engraved with your design. Dishwasher safe and perfect for daily use.",
    favorites: 0,
  },
  {
    id: 6,
    name: "Laser-Engraved Bamboo Board",
    price: 24.99,
    images: ["/images/board-front.jpg", "/images/board-back.jpg"],
    description:
      "Eco-friendly bamboo board with your design. Kitchen-safe with a beautiful natural grain.",
    favorites: 0,
  },
]
