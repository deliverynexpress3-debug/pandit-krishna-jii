import { useLang } from "../context/LanguageContext"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"

export default function Services() {
  const { t } = useLang()

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-maroon-dark/50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionTitle eyebrow={t.services.eyebrow} title={t.services.title} sub={t.services.sub} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className="group h-full glass gold-frame rounded-3xl p-6 sm:p-7 transition hover:-translate-y-1.5 hover:border-gold/50">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/25 to-saffron/20 text-3xl ring-1 ring-gold/30 transition group-hover:scale-110">
                  {s.icon}
                </div>
                <h3 className="mt-5 font-hindi text-xl font-semibold text-cream group-hover:text-gold transition">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm text-cream/60 font-light leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-cream/50 font-light flex items-center justify-center gap-2">
            <span className="text-gold/60">❁</span> {t.services.note} <span className="text-gold/60">❁</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
