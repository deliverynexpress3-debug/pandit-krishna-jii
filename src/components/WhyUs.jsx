import { useLang } from "../context/LanguageContext"
import { WHATSAPP_LINK } from "../data/i18n"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"
import DiyaParticles from "./DiyaParticles"

export default function WhyUs() {
  const { t } = useLang()

  return (
    <section id="why" className="relative py-24 sm:py-32 bg-maroon-dark/60 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 relative">
        <SectionTitle eyebrow={t.why.eyebrow} title={t.why.title} />

        <div className="grid gap-6 lg:grid-cols-2">
          {t.why.points.map((p, i) => (
            <Reveal key={i} delay={(i % 2) * 0.1}>
              <div className="group relative h-full glass gold-frame rounded-3xl p-7 sm:p-8 overflow-hidden transition hover:-translate-y-1.5">
                <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl transition group-hover:bg-gold/20" />
                <div className="relative flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/40 bg-gold/10 text-2xl">
                    {["🛕", "📿", "🤝", "✨"][i]}
                  </div>
                  <div>
                    <h3 className="font-hindi text-xl font-semibold text-cream group-hover:text-gold transition">
                      {p.t}
                    </h3>
                    <p className="mt-2 text-sm text-cream/65 font-light leading-relaxed">{p.d}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA banner */}
        <Reveal delay={0.15}>
          <div className="relative mt-12 overflow-hidden rounded-3xl glass-strong p-8 sm:p-12 text-center">
            <DiyaParticles count={10} />
            <div className="relative">
              <p className="font-hindi text-2xl sm:text-4xl gold-text font-semibold">
                {t.why.ctaT}
              </p>
              <p className="mt-3 text-cream/60 font-light text-sm sm:text-base flex items-center justify-center gap-2 flex-wrap">
                <span>📞 91838 83995</span>
                <span className="text-gold/50">❁</span>
                <span>💬 WhatsApp</span>
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn btn-saffron mt-7 text-base"
              >
                💬 {t.why.ctaT}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
