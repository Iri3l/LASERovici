"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void
  updateQuantity: (id: number, qty: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Load from localStorage on first client render (SSR-safe)
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return []
    try {
      const raw = localStorage.getItem("cart")
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart))
    } catch {}
  }, [cart])

  const addToCart = (item: Omit<CartItem, "quantity">, qty: number = 1) => {
    const q = Math.max(1, Math.floor(qty || 1))
    setCart(prev => {
      const found = prev.find(i => i.id === item.id)
      if (found) {
        return prev.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + q } : i))
      }
      return [...prev, { ...item, quantity: q }]
    })
  }

  const updateQuantity = (id: number, qty: number) => {
    const q = Math.max(1, Math.floor(qty || 1))
    setCart(prev => prev.map(i => (i.id === id ? { ...i, quantity: q } : i)))
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const clearCart = () => setCart([])

  const total = useMemo(
    () => cart.reduce((sum, i) => sum + Number(i.price) * Number(i.quantity), 0),
    [cart]
  )

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
