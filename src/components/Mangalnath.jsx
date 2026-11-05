import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "../context/LanguageContext"
import { MANGALNATH } from "../data/mangalnath"
import { WHATSAPP_LINK } from "../data/i18n"

gsap.registerPlugin(ScrollTrigger)

/** Counts up from 0 to `target` when the element scrolls into view. */
function useCountUp(target, duration = 1.6) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const tween = gsap.fromTo(
      { v: 0 },
      { v: target, duration },
      {
        onUpdate() {
          const o = this.targets()[0]
          setValue(Math.round(o.v))
        },
        scrollTrigger: { trigger: el, start: "top 88%" },
        ease: "power2.out",
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [target, duration])

  return [ref, value]
}

function PackageCard({ pkg, isHi, labelKey, ribbon, delay = 0 }) {
  const M = MANGALNATH
  const label = isHi ? M.hi[labelKey] : M.en[labelKey]
  const [countRef, countVal] = useCountUp(pkg.price)
  const listRef = useRef(null)

  // Reveal list items one by one
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const items = el.querySelectorAll("li")
    const tween = gsap.fromTo(
      items,
      { opacity: 0, x: -14 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [pkg])

  const waMsg = encodeURIComponent(
    `नमस्ते, मैं ${isHi ? pkg.nameHi : pkg.nameEn} पकज (₹${pkg.price}) की बुकिंग करना चाहता हूं। कृपया शुभ मुहूर्त बताएं।`,
  )

  return (
    <article
      data-card
      className={`shimmer-border relative flex flex-col rounded-3xl p-7 sm:p-9 ${
        pkg.featured ? "lg:-my-4 lg:py-12" : ""
      }`}
      style={{ opacity: 0 }}
    >
      {/* Most complete ribbon */}
      {pkg.featured ? (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="gold-text font-hindi rounded-full bg-maroon-deep px-5 py-1.5 text-sm font-semibold shadow-lg shadow-gold/40 ring-1 ring-gold/60">
            {isHi ? M.hi.mostComplete : M.en.mostComplete}
          </span>
        </div>
      ) : null}

      {/* Card head */}
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold-2">{label}</p>
        <h3 className="mt-2 font-hindi text-2xl sm:text-3xl font-semibold gold-text">
          {isHi ? pkg.nameHi : pkg.nameEn}
        </h3>
      </div>

      {/* Price */}
      <div className="mt-6 flex items-end justify-center gap-1.5" ref={countRef}>
        <span className="font-en text-6xl sm:text-7xl font-semibold gold-text leading-none">
          {countVal.toLocaleString("en-IN")}
        </span>
        <span className="mb-2 text-xl text-cream/60">₹</span>
      </div>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
        <span className="text-gold/60">❁</span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
      </div>

      {/* Inclusions */}
      <ul ref={listRef} className="space-y-3.5">
        {pkg.items.map((it, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Lotus />
            </span>
            <div>
              <p className="font-hindi text-base leading-snug text-cream">{isHi ? it.hi : it.en}</p>
              <p className="mt-0.5 text-[11px] font-light text-cream/50">{isHi ? it.en : it.hi}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={`${WHATSAPP_LINK}?text=${waMsg}`}
        target="_blank"
        rel="noreferrer"
        className={`btn mt-8 w-full justify-center ${pkg.featured ? "btn-saffron" : "btn-gold"}`}
      >
        💬 {isHi ? M.hi.bookBtn : M.en.bookBtn} · {isHi ? pkg.nameHi : pkg.nameEn}
      </a>
    </article>
  )
}

function Lotus() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden="true">
      <path d="M12 4c-1.2 2.1-1.8 4-1.8 6 0 2 .6 4 1.8 6 1.2-2 1.8-4 1.8-6 0-2-.6-4-1.8-6z" />
      <path d="M5.5 8c1.4 1.3 2.3 2.8 2.6 4.5.3 1.7 0 3.5-.9 5.2 2-1 3.7-1.5 5.4-1.5 1.7 0 3.4.5 5.4 1.5-.9-1.7-1.2-3.5-.9-5.2.3-1.7 1.2-3.2 2.6-4.5-2 .3-3.7 1.1-5 2.3-.9-.8-2-1.3-3.4-1.5-1.4.2-2.5.7-3.4 1.5C6.8 9 6.2 8.3 5.5 8z" />
    </svg>
  )
}

export default function Mangalnath() {
  const { t, isHi } = useLang()
  const M = MANGALNATH
  const rootRef = useRef(null)
  const cardsRef = useRef(null)

  // Fade + rise both cards in sequence when the grid scrolls into view
  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll("[data-card]")
    if (!cards || cards.length === 0) return
    const tweens = Array.from(cards).map((el, i) =>
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: i * 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        },
      ),
    )
    return () => tweens.forEach((tw) => {
      tw.scrollTrigger?.kill()
      tw.kill()
    })
  }, [])

  return (
    <section id="packages" ref={rootRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 mandala-bg opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[520px] w-[520px] opacity-20 spin-slower pointer-events-none">
        <MandalaRing />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-gold-2">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
            {isHi ? M.hi.eyebrow : M.en.eyebrow}
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
          </span>
          <h2 className="gold-text font-hindi mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            {isHi ? M.hi.title : M.en.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl font-hindi text-base sm:text-lg leading-relaxed text-cream/80">
            {isHi ? M.hi.intro : M.en.intro}
          </p>
          <p className="mx-auto mt-4 flex max-w-2xl items-center justify-center gap-2 text-center text-xs sm:text-sm text-cream/50 font-light">
            <span className="text-gold/50">❁</span>
            {isHi ? M.hi.note : M.en.note}
            <span className="text-gold/50">❁</span>
          </p>
        </div>

        {/* Two cards */}
        <div
          ref={cardsRef}
          className="grid gap-8 md:grid-cols-2 lg:gap-10 mt-6 lg:mt-2"
        >
          <PackageCard
            pkg={MANGALNATH.packages[0]}
            isHi={isHi}
            labelKey="priceOne"
            ribbon={false}
          />
          <PackageCard
            pkg={MANGALNATH.packages[1]}
            isHi={isHi}
            labelKey="priceTwo"
            ribbon={true}
          />
        </div>
      </div>
    </section>
  )
}

function MandalaRing() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
      <circle cx="200" cy="200" r="185" stroke="#f5b800" strokeOpacity="0.4" strokeWidth="0.6" />
      <circle cx="200" cy="200" r="150" stroke="#f5b800" strokeOpacity="0.25" strokeWidth="0.6" />
      <circle cx="200" cy="200" r="110" stroke="#e8731a" strokeOpacity="0.3" strokeWidth="0.6" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 24
        return (
          <circle
            key={i}
            cx={200 + Math.cos(a) * 185}
            cy={200 + Math.sin(a) * 185}
            r="2"
            fill="#f5b800"
            fillOpacity="0.5"
          />
        )
      })}
    </svg>
  )
}
