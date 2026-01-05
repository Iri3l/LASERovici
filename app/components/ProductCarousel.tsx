"use client"

import { useState, useMemo } from "react"
import { useSpring, animated } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
  images: string[]
  alt?: string
  className?: string
}

export default function ProductCarousel({ images, alt = "Product image", className = "" }: Props) {
  const safeImages = useMemo(
    () => (Array.isArray(images) && images.length ? images : ["/images/placeholder.jpg"]),
    [images]
  )

  const [index, setIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const [{ x, scale }, api] = useSpring(() => ({ x: 0, scale: 1 }))

  const goTo = (i: number) => {
    const next = (i + safeImages.length) % safeImages.length
    setIndex(next)
    api.start({ x: 0, scale: 1 })
    setZoomed(false)
  }

  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  // Drag/swipe: rely on horizontal movement (movement[0]) instead of "distance"
  useGesture(
    {
      onDrag: ({ down, movement: [mx], direction: [dx], last }) => {
        // If zoomed, pan slightly; otherwise use drag for swiping
        if (zoomed) {
          api.start({ x: mx, immediate: down })
        } else {
          // keep a tiny follow effect while dragging
          api.start({ x: down ? mx : 0, immediate: down })
          // trigger swipe if released and movement threshold exceeded
          if (last && Math.abs(mx) > 50) {
            if (dx < 0) next()
            else if (dx > 0) prev()
          }
        }
      },
      onPinch: ({ offset: [s], first, last }) => {
        // optional simple pinch-to-zoom support
        if (first) setZoomed(true)
        const clamped = Math.max(1, Math.min(2.5, s))
        api.start({ scale: clamped })
        if (last && clamped <= 1.01) {
          setZoomed(false)
          api.start({ x: 0, scale: 1 })
        }
      },
      onWheel: ({ event }) => {
        // prevent page scroll while zoomed and wheel is used on image
        if (zoomed) event.preventDefault()
      },
      onDoubleClick: () => {
        // toggle zoom
        const target = zoomed ? 1 : 2
        setZoomed(!zoomed)
        api.start({ scale: target, x: 0 })
      },
    },
    {
      target: typeof window !== "undefined" ? undefined : undefined, // keep TS happy; we bind directly on the animated div
      drag: { filterTaps: true, axis: "x" },
      pinch: { scaleBounds: { min: 1, max: 2.5 }, rubberband: 0.15 },
    }
  )

  return (
    <div className={`relative ${className}`}>
      {/* Image stage */}
      <div className="relative overflow-hidden rounded-xl bg-white">
        <animated.div
          // Bind gestures on this container
          className="touch-pan-y select-none"
          style={{
            x,
            scale,
            cursor: zoomed ? "grab" : "pointer",
          }}
          // Click toggles zoom (mobile-friendly)
          onClick={() => {
            const target = zoomed ? 1 : 2
            setZoomed(!zoomed)
            api.start({ scale: target, x: 0 })
          }}
        >
          <img
            src={safeImages[index]}
            alt={alt}
            className="w-full h-64 md:h-80 object-cover"
            draggable={false}
            loading="lazy"
          />
        </animated.div>

        {/* Left / Right arrows */}
        <button
          type="button"
          onClick={prev}
          className="absolute top-1/2 -translate-y-1/2 left-2 md:left-3 p-2 rounded-full bg-white/80 hover:bg-white shadow"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute top-1/2 -translate-y-1/2 right-2 md:right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {safeImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-cyan-600" : "w-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Thumbnails (optional) */}
      {safeImages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {safeImages.map((src, i) => (
            <button
              key={src + i}
              onClick={() => goTo(i)}
              className={`shrink-0 rounded-md border-2 ${
                i === index ? "border-cyan-600" : "border-transparent"
              }`}
              aria-label={`Select image ${i + 1}`}
              style={{ lineHeight: 0 }}
            >
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                className="w-14 h-14 object-cover rounded-md"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
