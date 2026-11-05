import { useLang } from "../context/LanguageContext"
import { WHATSAPP_LINK } from "../data/i18n"

export default function FloatingWhatsApp() {
  const { t } = useLang()
  const msg = encodeURIComponent(
    "नमसते, अनुष्ठान केंद्र उज्जैन। मुझे पूजा-अनुष्ठान की जानकारी चाहिए।",
  )
  return (
    <a
      href={`${WHATSAPP_LINK}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 left-5 z-40 hidden md:inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 font-semibold text-white shadow-2xl shadow-[#25D366]/40 transition hover:scale-105"
    >
      <span className="text-2xl">💬</span>
      <span className="text-sm">{t.floatingWa}</span>
    </a>
  )
}
