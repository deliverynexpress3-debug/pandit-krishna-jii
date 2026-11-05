import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "../context/LanguageContext"
import { BOOKING } from "../data/booking"

gsap.registerPlugin(ScrollTrigger)

const DESKTOP = "(min-width: 1024px)"

/**
 * "पूज बक़ींंग पप्रक्य / How to Book" — 5-step journey.
 *  • Mobile: vertical timeline; the golden line draws top → bottom on scroll.
 *  • Desktop: horizontal timeline; the golden line draws left → right.
 *  • Each circular gold node "lights up" (gold fill + pulsing glow) as the
 *    drawn line reaches it. No invented claims — content from BOOKING only.
 */
export default function BookingTimeline() {
  const { isHi } = useLang()
  const rootRef = useRef(null)
  const lineRef = useRef(null)
  const steps = BOOKING.steps

  useEffect(() => {
    const root = rootRef.current
    const line = lineRef.current
    if (!root || !line) return

    const cleanups = []

    const setupLine = () => {
      const desktop = window.matchMedia(DESKTOP).matches
      // Reset scale on both axes so the old direction doesn't leak
      gsap.set(line, { scaleX: 0, scaleY: 0, transformOrigin: desktop ? "left center" : "top center" })
      const tween = gsap.to(line, {
        scaleX: desktop ? 1 : 0,
        scaleY: desktop ? 0 : 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 68%",
          end: "bottom 58%",
          scrub: 0.4,
        },
      })
      cleanups.push(() => {
        tween.scrollTrigger?.kill()
        tween.kill()
      })
    }

    const ctx = gsap.context(() => {
      setupLine()

      // Heading reveals
      gsap.fromTo(
        root.querySelectorAll("[data-bhead]"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 82%" },
        },
      )

      // Each step rises in; its circle lights up when the line has reached it
      root.querySelectorAll("[data-node]").forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 85%" },
          },
        )
        ScrollTrigger.create({
          trigger: node,
          start: "top 66%",
          onEnter: () => node.classList.add("lit"),
          onLeaveBack: () => node.classList.remove("lit"),
        })
      })
    }, root)

    // Re-init the line draw direction if the user crosses the lg breakpoint
    const mql = window.matchMedia(DESKTOP)
    const onBreakpoint = () => {
      cleanups.forEach((fn) => fn())
      cleanups.length = 0
      setupLine()
      ScrollTrigger.refresh()
    }
    mql.addEventListener("change", onBreakpoint)
    window.addEventListener("resize", () => ScrollTrigger.refresh(), { passive: true })

    return () => {
      ctx.revert()
      cleanups.forEach((fn) => fn())
      mql.removeEventListener("change", onBreakpoint)
    }
  }, [])

  const head = isHi ? BOOKING.hi : BOOKING.en
  const label = (s) => (isHi ? s.hi : s.en)
  const desc = (s) => (isHi ? s.descHi : s.descEn)

  return (
    <section id="booking" ref={rootRef} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="mb-14 sm:mb-20 text-center">
          <span
            data-bhead
            className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-gold-2"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
            {head.eyebrow}
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
          </span>
          <h2
            data-bhead
            className="gold-text font-hindi mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight"
          >
            {head.title}
          </h2>
          <p
            data-bhead
            className="mx-auto mt-5 max-w-2xl text-sm sm:text-base font-light text-cream/65 leading-relaxed"
          >
            {head.sub}
          </p>
        </div>

        {/* Timeline — one responsive list: column on mobile, 5-across on desktop */}
        <div className="relative">
          {/* golden line — vertical on mobile, horizontal on desktop */}
          <div
            ref={lineRef}
            className="tl-line pointer-events-none absolute bg-gradient-to-r from-gold/15 via-gold/90 to-gold/15
              left-[2.15rem] top-3 bottom-3 w-0.5
              lg:left-[10%] lg:right-[10%] lg:top-7 lg:bottom-auto lg:h-0.5 lg:w-auto"
          />
          <ol className="space-y-12 pl-2 lg:space-y-0 lg:pl-0 lg:grid lg:grid-cols-5 lg:gap-x-4">
            {steps.map((s, i) => (
              <li
                key={i}
                data-node
                className="tl-node relative flex gap-5 lg:flex-col lg:items-center lg:text-center lg:px-3"
              >
                <div className="relative z-10 shrink-0 lg:shrink">
                  <div className="tl-circle">{s.icon}</div>
                </div>
                <div className="pt-1 lg:pt-0">
                  <span className="block text-[11px] font-semibold tracking-widest text-gold-2 lg:mt-4 lg:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="tl-node-title mt-1 font-hindi text-lg sm:text-xl lg:text-lg font-semibold">
                    {label(s)}
                  </h3>
                  <p className="tl-node-desc mt-1.5 text-sm font-light leading-relaxed max-w-xs lg:mx-auto">
                    {desc(s)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
