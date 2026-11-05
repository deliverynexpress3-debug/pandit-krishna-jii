import { useLang } from "../context/LanguageContext"
import {
  ADDRESS,
  CALL_LINK,
  EMAIL,
  PHONE_DISPLAY,
  WHATSAPP_LINK,
} from "../data/i18n"

const LINKS = ["about", "services", "packages", "process", "gallery", "faq", "contact"]

export default function Footer() {
  const { t } = useLang()

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <footer className="relative border-t border-gold/20 bg-maroon-deep/80 pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 mandala-bg opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Anushthan Kendra Ujjain"
                className="h-14 w-14 rounded-full object-cover ring-2 ring-gold/50 shadow-lg shadow-gold/20"
              />
              <div>
                <p className="gold-text font-hindi text-xl font-semibold leading-tight">
                  अनुष्ठान केंद्र
                </p>
                <p className="font-en text-[10px] tracking-[0.4em] uppercase text-cream/50">
                  Ujjain
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-cream/60 font-light leading-relaxed">{t.footer.about}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold-2">{t.footer.quickT}</h4>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((id) => (
                <li key={id}>
                  <button onClick={() => go(id)} className="text-sm text-cream/65 hover:text-gold transition">
                    {t.nav[id]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold-2">{t.footer.svcT}</h4>
            <ul className="mt-4 space-y-2.5">
              {t.services.items.slice(0, 6).map((s, i) => (
                <li key={i} className="text-sm text-cream/65">
                  <span className="text-gold/60 mr-2">❁</span>
                  {s.t}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold-2">{t.footer.contactT}</h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li>
                <a href={CALL_LINK} className="hover:text-gold transition flex items-center gap-2">
                  <span>📞</span> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition flex items-center gap-2"
                >
                  <span>💬</span> WhatsApp
                </a>
              </li>
              <li className="break-all">
                <a href={`mailto:${EMAIL}`} className="hover:text-gold transition flex items-center gap-2">
                  <span>✉️</span> {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2 text-cream/55">
                <span>📍</span>
                <span>{ADDRESS}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gold/15 pt-6 flex flex-col items-center gap-3 text-center">
          <p className="gold-text font-hindi text-xl glow-pulse">{t.footer.blessing}</p>
          <p className="text-xs text-cream/40 font-light">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
