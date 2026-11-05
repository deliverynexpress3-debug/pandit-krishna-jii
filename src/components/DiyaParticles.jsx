import { useMemo } from "react"

/**
 * Softly floating diya-light particles, layered over a section.
 * Pure CSS animation (floatY keyframe) — cheap and smooth on mobile.
 */
export default function DiyaParticles({ count = 14, className = "" }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        top: 18 + Math.random() * 72,
        size: 4 + Math.random() * 9,
        d: 5 + Math.random() * 6,
        o: 0.25 + Math.random() * 0.45,
        delay: Math.random() * 4,
        key: i,
      })),
    [count],
  )

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {dots.map((p) => (
        <span
          key={p.key}
          className="diya"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.o,
            animationDuration: `${p.d}s`,
            animationDelay: `${p.delay}s`,
            ["--o"]: p.o,
          }}
        />
      ))}
    </div>
  )
}
