import { useState } from "react"
import { useLang } from "../context/LanguageContext"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"

export default function Faq() {
  const { t } = useLang()
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionTitle eyebrow={t.faq.eyebrow} title={t.faq.title} />

        <div className="space-y-4">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={i} delay={(i % 3) * 0.06} y={28}>
                <div
                  className={`glass rounded-2xl overflow-hidden transition ${
                    isOpen ? "border-gold/50" : "border-gold/20"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  >
                    <span className="font-hindi text-base sm:text-lg font-semibold text-cream">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-gold/20" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-cream/65 font-light leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
