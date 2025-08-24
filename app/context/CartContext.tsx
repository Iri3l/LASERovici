// app/context/CartContext.tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartContextValue = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (id: number, qty?: number) => void; // decrement qty
  removeItem: (id: number) => void; // remove line entirely
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "laserovici.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setCart(JSON.parse(raw));
    } catch {}
  }, []);
  // persist to localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      }
    } catch {}
  }, [cart]);

  const addToCart: CartContextValue["addToCart"] = (item, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + Math.max(1, qty) };
        return next;
      }
      return [...prev, { ...item, quantity: Math.max(1, qty) }];
    });
  };

  const removeFromCart: CartContextValue["removeFromCart"] = (id, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx === -1) return prev;
      const nextQty = prev[idx].quantity - Math.max(1, qty);
      if (nextQty > 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: nextQty };
        return next;
      }
      // remove line when qty hits 0 or below
      return prev.filter((i) => i.id !== id);
    });
  };

  const removeItem: CartContextValue["removeItem"] = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, removeItem, clearCart }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
