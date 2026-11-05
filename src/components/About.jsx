import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "../context/LanguageContext"
import { ABOUT } from "../data/i18n"
import Reveal from "./Reveal"

gsap.registerPlugin(ScrollTrigger)

/** A gold rule that draws itself (scaleX 0 → 1) when scrolled into view. */
function DrawLine({ className = "" }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const anim = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.1,
        ease: "power2.out",
        transformOrigin: "left center",
        scrollTrigger: { trigger: el, start: "top 88%" },
      },
    )
    return () => anim.scrollTrigger?.kill()
  }, [])
  return <span ref={ref} className={`block h-[3px] rounded-full bg-gradient-to-r from-gold-soft via-gold to-saffron ${className}`} />
}

export default function About() {
  const { t, isHi } = useLang()
  const a = ABOUT[isHi ? "hi" : "en"]

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">
        {/* LEFT: arched temple-window image + rotating mandala */}
        <Reveal y={60}>
          <div className="relative mx-auto w-full max-w-md">
            {/* rotating gold mandala behind the arch */}
            <div className="pointer-events-none absolute -inset-10">
              <RotatingMandala />
            </div>

            {/* arch mask via border-radius + clip */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-t-[999px] rounded-b-3xl border-2 border-gold/50 p-3 shadow-2xl shadow-black/50">
                {/* arch border glow */}
                <div className="pointer-events-none absolute inset-3 rounded-t-[999px] rounded-b-2xl border border-gold/30" />
                <img
                  src="/images/pandit-shringar-darshan.png"
                  alt="Pandit Krishna Sharma ji performing puja"
                  className="w-full rounded-t-[999px] rounded-b-2xl object-cover aspect-[4/5]"
                  loading="lazy"
                />
                <div className="absolute inset-3 rounded-t-[999px] rounded-b-2xl bg-gradient-to-t from-maroon-deep/70 via-transparent to-transparent" />
              </div>

              {/* floating owner chip */}
              <div className="relative z-10 mx-5 -mt-6">
                <div className="glass gold-frame rounded-2xl px-5 py-3 text-center">
                  <p className="gold-text font-hindi text-lg font-semibold">{a.owner}</p>
                  <p className="text-[11px] tracking-wider text-cream/60">{a.ownerRole}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* RIGHT: heading + self-drawing underline + paragraph */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-gold-2">
              <span className="h-px w-8 bg-gold/60" />
              {t.about.eyebrow}
            </span>
            <h2 className="mt-4 font-hindi text-4xl sm:text-5xl font-semibold gold-text">
              {a.heading}
            </h2>
            <DrawLine className="mt-4 w-40 sm:w-52" />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-7 text-cream/75 font-light leading-loose text-base sm:text-lg">
              {a.para}
            </p>
          </Reveal>

          {/* small signature flourish */}
          <Reveal delay={0.3}>
            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-10 bg-gold/40" />
              <span className="font-en italic text-gold/80 text-lg tracking-widest">
                {isHi ? "जय महामंगल ❁" : "Jai Maha Mangal ❁"}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function RotatingMandala() {
  return (
    <svg viewBox="0 0 400 400" className="spin-slow h-full w-full opacity-30 text-gold" fill="none">
      <circle cx="200" cy="200" r="190" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.6" />
      <circle cx="200" cy="200" r="155" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.6" />
      <circle cx="200" cy="200" r="118" stroke="#e8731a" strokeOpacity="0.35" strokeWidth="0.6" />
      {Array.from({ length: 28 }).map((_, i) => {
        const ang = (i * Math.PI * 2) / 28
        return (
          <circle
            key={i}
            cx={200 + Math.cos(ang) * 190}
            cy={200 + Math.sin(ang) * 190}
            r="2.4"
            fill="currentColor"
            fillOpacity="0.55"
          />
        )
      })}
      {Array.from({ length: 14 }).map((_, i) => {
        const ang = (i * Math.PI * 2) / 14
        return (
          <circle
            key={`b${i}`}
            cx={200 + Math.cos(ang) * 155}
            cy={200 + Math.sin(ang) * 155}
            r="1.6"
            fill="#e8731a"
            fillOpacity="0.5"
          />
        )
      })}
      <g stroke="currentColor" strokeOpacity="0.25">
        {Array.from({ length: 14 }).map((_, i) => {
          const ang = (i * Math.PI * 2) / 14
          return (
            <line
              key={`l${i}`}
              x1="200"
              y1="200"
              x2={200 + Math.cos(ang) * 118}
              y2={200 + Math.sin(ang) * 118}
              strokeWidth="0.5"
            />
          )
        })}
      </g>
    </svg>
  )
}
