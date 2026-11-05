import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useLang } from "../context/LanguageContext"
import { CALL_LINK, WHATSAPP_LINK } from "../data/i18n"

// Floating golden sparks (generated once, positioned via CSS)
function useSparks(count = 26) {
  const [sparks] = useState(() =>
    Array.from({ length: count }).map((_, i) => ({
      left: Math.random() * 100,
      top: 12 + Math.random() * 80,
      size: 2 + Math.random() * 4,
      d: 4 + Math.random() * 6,
      delay: Math.random() * 5,
      o: 0.3 + Math.random() * 0.5,
      key: i,
    })),
  )
  return sparks
}

export default function Hero() {
  const { t } = useLang()
  const bgRef = useRef(null)
  const parallaxRef = useRef(null)
  const rootRef = useRef(null)
  const sparks = useSparks(28)

  // Line-by-line cinematic reveal
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.22,
          delay: 0.3,
          ease: "power3.out",
        },
      )
      // gentle continuous float on the sub line
      gsap.to(el.querySelector("[data-sub]"), {
        y: -6,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 2.4,
      })
    }, el)
    return () => ctx.revert()
  }, [t])

  // Mouse parallax on the background layer
  useEffect(() => {
    const bg = bgRef.current
    const layer = parallaxRef.current
    if (!bg || !layer) return
    let raf = 0
    const move = (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2
      const cy = (e.clientY / window.innerHeight - 0.5) * 2
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        gsap.to(bg, { x: cx * -22, y: cy * -14, duration: 1.4, ease: "power2.out" })
        gsap.to(layer, { x: cx * 26, y: cy * 18, duration: 1.4, ease: "power2.out" })
      })
    }
    window.addEventListener("mousemove", move)
    return () => {
      window.removeEventListener("mousemove", move)
      cancelAnimationFrame(raf)
    }
  }, [])

  const goPackages = () =>
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Ken Burns + parallax background */}
      <div ref={bgRef} className="absolute -inset-6">
        <img
          src="/images/mahakal-temple.png"
          alt=""
          className="ken-burns h-full w-full object-cover opacity-55"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep/85 via-maroon-dark/70 to-maroon-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(72%_58%_at_50%_44%,transparent,rgba(36,4,9,0.92))]" />

      {/* Floating sparks */}
      <div ref={parallaxRef} className="pointer-events-none absolute inset-0">
        {sparks.map((s) => (
          <span
            key={s.key}
            className="diya"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              opacity: s.o,
              animationDuration: `${s.d}s`,
              animationDelay: `${s.delay}s`,
              ["--o"]: s.o,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <p data-reveal className="font-en text-base sm:text-xl italic tracking-[0.3em] text-gold/90">
          {t.hero.shloka}
        </p>

        <h1 data-reveal className="mt-6">
          <span className="gold-text font-hindi text-5xl sm:text-7xl lg:text-8xl font-semibold leading-[1.04]">
            {t.hero.title}
          </span>
        </h1>

        <p
          data-reveal
          data-sub
          className="mx-auto mt-7 max-w-2xl font-hindi text-lg sm:text-2xl leading-relaxed text-cream"
        >
          {t.hero.sub}
        </p>

        <p
          data-reveal
          className="mx-auto mt-4 max-w-xl text-sm sm:text-base font-light text-cream/60"
        >
          {t.hero.tagline}
        </p>

        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={goPackages}
            className="btn btn-saffron text-base"
          >
            <span>🪔</span> {t.hero.ctaBook}
          </button>
          <a href={CALL_LINK} className="btn btn-gold text-base">
            <span>📞</span> {t.hero.ctaCall}
          </a>
        </div>

        {/* subtle WhatsApp secondary */}
        <a
          data-reveal
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="mx-auto mt-5 block text-xs tracking-widest text-cream/50 transition hover:text-gold"
        >
          WhatsApp · 91838 83995
        </a>
      </div>

      {/* Bouncing scroll indicator */}
      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.35em] uppercase text-cream/50">
          {t.hero.scroll}
        </span>
        <div className="bounce-down flex h-9 w-5 items-start justify-center rounded-full border border-gold/50 p-1">
          <span className="h-2 w-1 rounded-full bg-gold" />
        </div>
      </div>
    </section>
  )
}
