import { useLang } from "../context/LanguageContext"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"

export default function Process() {
  const { t } = useLang()

  return (
    <section id="process" className="relative py-24 sm:py-32 bg-maroon-dark/50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionTitle eyebrow={t.process.eyebrow} title={t.process.title} sub={t.process.sub} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className="group relative h-full glass gold-frame rounded-3xl p-7 overflow-hidden transition hover:-translate-y-1.5">
                <div className="absolute -top-4 -right-4 font-en text-7xl font-bold text-gold/10 select-none">
                  {i + 1}
                </div>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-saffron text-maroon-deep font-bold text-lg shadow-lg shadow-gold/30">
                  {i + 1}
                </div>
                <h3 className="relative mt-5 font-hindi text-xl font-semibold text-cream group-hover:text-gold transition">
                  {s.t}
                </h3>
                <p className="relative mt-2 text-sm text-cream/60 font-light leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
