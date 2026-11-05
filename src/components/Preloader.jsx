import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

/**
 * Temple-door preloader.
 * 1) Maroon screen with a fading-in logo (gold glow) + diya flame + pulsing ॐ
 * 2) After ~2.2s the screen splits into two doors that swing open,
 *    revealing the site behind, then the whole overlay is removed.
 */
export default function Preloader({ onDone }) {
  const rootRef = useRef(null)
  const [removing, setRemoving] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Intro: fade in logo, om and diya
      gsap.fromTo(el.querySelector("[data-om]"), { opacity: 0, scale: 0.6 }, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.15,
      })
      gsap.fromTo(el.querySelector("[data-logo]"), { opacity: 0, scale: 0.8, y: 12 }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.3,
      })
      gsap.fromTo(el.querySelector("[data-diya]"), { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.6,
      })

      // Doors open like temple gates
      const tl = gsap.timeline({
        delay: 2.35,
        onComplete: () => {
          setRemoving(true)
        },
      })
      tl.to(el.querySelectorAll("[data-door-left]"), {
        xPercent: -102,
        duration: 0.85,
        ease: "power2.inOut",
      })
      tl.to(
        el.querySelectorAll("[data-door-right]"),
        { xPercent: 102, duration: 0.85, ease: "power2.inOut" },
        "<",
      )
      tl.to(el, {
        opacity: 0,
        duration: 0.35,
        delay: 0.1,
        onComplete: () => onDone && onDone(),
      })
    }, el)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-[100] overflow-hidden ${removing ? "pointer-events-none" : ""}`}
      aria-hidden="true"
    >
      {/* Background maroon */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#3a070d_0%,#240409_55%,#3a070d_100%)]" />
      <div className="absolute inset-0 mandala-bg opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(245,184,0,0.14),transparent_65%)]" />

      {/* Centered content (fades out just before doors open) */}
      <div data-precontent className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <div data-om className="om-pulse gold-text font-hindi text-7xl sm:text-8xl font-semibold">
          ॐ
        </div>

        <div data-logo className="relative">
          <div className="absolute -inset-4 rounded-full bg-gold/25 blur-2xl glow-pulse" />
          <img
            src="/images/logo.png"
            alt="Anushthan Kendra Ujjain"
            className="relative h-28 w-28 rounded-full object-cover ring-4 ring-gold/60 shadow-2xl shadow-gold/40"
          />
        </div>

        {/* Diya */}
        <div data-diya className="relative mt-2 flex flex-col items-center">
          <span className="diya-flame" />
          <span className="diya-bowl mt-[-4px]" />
        </div>

        <p className="gold-text font-hindi text-lg sm:text-xl tracking-wide">
          अनुष्ठान केंद्र उज्जैन
        </p>
        <p className="text-cream/50 text-[11px] tracking-[0.4em] uppercase">
          Jai Shri Mahakal
        </p>
      </div>

      {/* Doors */}
      <div className="absolute inset-0 flex">
        <div data-door-left className="relative h-full w-1/2 bg-[linear-gradient(100deg,#4a0a12,#3a070d)]">
          <div className="absolute right-0 top-0 h-full w-1.5 bg-gold/50" />
          <div className="absolute inset-y-6 right-8 w-px bg-gold/20" />
          <div className="absolute inset-x-6 top-6 bottom-6 border border-gold/25 rounded-sm" />
        </div>
        <div data-door-right className="relative h-full w-1/2 bg-[linear-gradient(260deg,#4a0a12,#3a070d)]">
          <div className="absolute left-0 top-0 h-full w-1.5 bg-gold/50" />
          <div className="absolute inset-y-6 left-8 w-px bg-gold/20" />
          <div className="absolute inset-x-6 top-6 bottom-6 border border-gold/25 rounded-sm" />
        </div>
      </div>
    </div>
  )
}
