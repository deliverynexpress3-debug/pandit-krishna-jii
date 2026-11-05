import { useLang } from "../context/LanguageContext"
import {
  CALL_LINK,
  EMAIL,
  PHONE_DISPLAY,
  WHATSAPP_LINK,
} from "../data/i18n"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"
import DiyaParticles from "./DiyaParticles"

const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent("Anushthan Kendra Ujjain — Puja Booking Enquiry")}`

export default function Contact() {
  const { t } = useLang()

  const cards = [
    {
      icon: "📞",
      label: t.contact.phone,
      value: PHONE_DISPLAY,
      href: CALL_LINK,
      cta: t.contact.msgBtnCall,
      external: false,
    },
    {
      icon: "💬",
      label: "WhatsApp",
      value: PHONE_DISPLAY,
      href: WHATSAPP_LINK,
      cta: t.contact.msgBtnWa,
      external: true,
    },
    {
      icon: "✉️",
      label: t.contact.email,
      value: EMAIL,
      href: mailto,
      cta: t.contact.msgBtnMail,
      external: true,
    },
  ]

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-maroon-dark/60 overflow-hidden">
      <DiyaParticles count={12} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 relative">
        <SectionTitle eyebrow={t.contact.eyebrow} title={t.contact.title} sub={t.contact.sub} />

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group block h-full glass gold-frame rounded-3xl p-7 text-center transition hover:-translate-y-1.5 hover:border-gold/50"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/25 to-saffron/20 text-3xl ring-1 ring-gold/30 transition group-hover:scale-110">
                  {c.icon}
                </div>
                <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-gold-2">{c.label}</p>
                <p className="mt-2 font-en text-lg font-semibold text-cream break-all">{c.value}</p>
                <span className="mt-4 inline-block rounded-full border border-saffron/60 bg-saffron/15 px-5 py-2 text-xs font-semibold text-saffron-2 transition group-hover:bg-saffron group-hover:text-maroon-deep">
                  {c.cta} →
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Address + hours */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="glass rounded-3xl p-7 h-full">
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold-2">
                <span className="text-lg">📍</span> {t.contact.address}
              </p>
              <p className="mt-3 font-hindi text-base leading-relaxed text-cream/80">
                {t.contact.addressVal}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-7 h-full">
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold-2">
                <span className="text-lg">🕉️</span> {t.contact.hoursT}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{t.contact.hours}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
