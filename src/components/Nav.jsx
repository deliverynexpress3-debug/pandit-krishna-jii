import { useEffect, useState } from "react"
import { useLang } from "../context/LanguageContext"
import { CALL_LINK, PHONE_DISPLAY, WHATSAPP_LINK } from "../data/i18n"

// Requirement: Home, About, Services, Puja Packages, Gallery, Contact
const LINKS = ["home", "about", "services", "packages", "gallery", "contact"]

export default function Nav() {
  const { t, toggle, isHi } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    // let the menu close, then scroll
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    )
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong py-2 sm:py-1.5 shadow-lg shadow-black/40"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          {/* Logo left */}
          <button onClick={() => go("home")} className="flex items-center gap-3 shrink-0">
            <img
              src="/images/logo.png"
              alt="Anushthan Kendra Ujjain"
              className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-gold/50 shadow-lg shadow-gold/20"
            />
            <span className="hidden sm:block text-left leading-tight">
              <span className="block gold-text font-hindi text-lg font-semibold">अनुष्ठान केंद्र</span>
              <span className="block text-[10px] tracking-[0.4em] uppercase text-cream/60 font-en">
                Ujjain
              </span>
            </span>
          </button>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-7">
            {LINKS.map((id) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="group relative text-sm text-cream/80 transition hover:text-gold font-medium"
              >
                {t.nav[id]}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language toggle pill */}
            <button
              onClick={toggle}
              className="relative flex items-center rounded-full border border-gold/40 bg-gold/10 p-0.5 text-xs font-semibold"
              aria-label="Toggle language"
            >
              <span
                className={`rounded-full px-2.5 py-1 transition ${
                  isHi ? "bg-gold text-maroon-deep" : "text-gold"
                }`}
              >
                हिं
              </span>
              <span
                className={`rounded-full px-2.5 py-1 transition ${
                  !isHi ? "bg-gold text-maroon-deep" : "text-gold"
                }`}
              >
                EN
              </span>
            </button>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn btn-saffron hidden md:inline-flex !py-2 !px-4 text-sm"
            >
              <WhatsAppIcon /> {t.nav.waBtn}
            </a>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-gold/40 bg-gold/10"
              aria-label="Menu"
            >
              <span
                className={`block h-0.5 w-5 rounded bg-gold transition-all duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded bg-gold transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded bg-gold transition-all duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-in menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        {/* Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-[78%] max-w-xs glass-strong flex flex-col p-6 transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="gold-text font-hindi text-lg font-semibold">मन्यु</span>
            <button onClick={() => setOpen(false)} className="text-gold text-2xl leading-none">
              ✕
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {LINKS.map((id, i) => (
              <button
                key={id}
                onClick={() => go(id)}
                style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
                className={`rounded-xl px-4 py-3.5 text-left font-hindi text-lg text-cream/85 transition-all duration-500 hover:bg-gold/10 hover:text-gold ${
                  open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                }`}
              >
                <span className="mr-3 text-gold/50 text-xs">{String(i + 1).padStart(2, "0")}</span>
                {t.nav[id]}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-3">
            <a
              href={CALL_LINK}
              className="btn btn-saffron w-full justify-center text-sm"
            >
              📞 {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost w-full justify-center text-sm"
            >
              <WhatsAppIcon /> {t.nav.waBtn}
            </a>
            <p className="text-center text-[11px] text-cream/40 tracking-widest">
              जय श्री महाकाल
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.199.297-.767.966-.941 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.586-.916-2.18-.241-.58-.487-.502-.669-.511l-.57-.01c-.198 0-.52.074-.788.372-.268.297-1.02 1.02-1.02 2.458 0 1.44 1.045 2.833 1.193 3.031.149.198 2.086 3.184 5.082 4.46.714.306 1.27.487 1.702.626.715.226 1.362.194 1.873.118.57-.084 1.758-.719 2.006-1.414.248-.694.248-1.29.173-1.414-.075-.124-.273-.198-.57-.347zM12 2a10 10 0 00-8.6 15.047L2 22l5.047-1.4A10 10 0 1012 2zm0 18.172A8.2 8.2 0 017.588 18l-.546-.33L3.6 20.2l.537-.51L3.6 19.3a8.172 8.172 0 0114.95-4.77c.174.366.255.766.255 1.172 0 1.72-1.43 3.15-3.15 3.15a8.172 8.172 0 01-3.662-.376z" />
    </svg>
  )
}
