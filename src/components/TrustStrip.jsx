import { useLang } from "../context/LanguageContext"
import { TRUST } from "../data/i18n"
import Reveal from "./Reveal"

/**
 * Four trust cards below the hero. Each fades up one after another
 * (staggered) as the strip scrolls into view.
 */
export default function TrustStrip() {
  const { isHi } = useLang()

  return (
    <section className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {TRUST.map((c, i) => (
            <Reveal key={i} delay={i * 0.16} y={36}>
              <div className="group glass gold-frame flex h-full items-center gap-4 rounded-2xl p-5 sm:p-6 transition hover:-translate-y-1.5 hover:border-gold/50">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/25 to-saffron/20 text-3xl ring-1 ring-gold/30 transition group-hover:scale-110">
                  {c.icon}
                </div>
                <div>
                  <h3 className="font-hindi text-base sm:text-lg font-semibold text-cream leading-snug">
                    {isHi ? c.hi : c.en}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-cream/55 font-light">
                    {isHi ? c.en : c.hi}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
