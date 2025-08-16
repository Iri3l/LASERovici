"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

/**
 * Local-only favorites:
 * - Stores a boolean per product in localStorage (fav:<id> = "1")
 * - Stores a per-user count in localStorage (favcount:<id>)
 *   so the user sees a number that increments when they like.
 * - No backend. Each visitor has their own count.
 */
export default function FavoriteButton({ productId }: { productId: number }) {
  const likedKey = `fav:${productId}`
  const countKey = `favcount:${productId}`

  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState<number | null>(null) // null -> loading

  // load from localStorage
  useEffect(() => {
    try {
      const likedRaw = localStorage.getItem(likedKey)
      const countRaw = localStorage.getItem(countKey)
      setLiked(likedRaw === "1")
      setCount(countRaw ? Number(countRaw) : 0)
    } catch {
      setLiked(false)
      setCount(0)
    }
  }, [likedKey, countKey])

  function handleClick() {
    if (liked || count === null) return
    const next = (count ?? 0) + 1
    setLiked(true)
    setCount(next)
    try {
      localStorage.setItem(likedKey, "1")
      localStorage.setItem(countKey, String(next))
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={liked || count === null}
      aria-label={liked ? "Favorited" : "Add to favorites"}
      className={[
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition",
        liked ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-700 hover:bg-rose-100",
      ].join(" ")}
      title={liked ? "Thanks! ❤️" : "Add to favorites"}
    >
      <Heart className="h-4 w-4" {...(liked ? { fill: "currentColor" } : {})} />
      <span>{count === null ? "…" : count}</span>
    </button>
  )
}
