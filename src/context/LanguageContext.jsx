import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { translations } from "../data/i18n"

const LanguageContext = createContext(null)
const STORAGE_KEY = "ak-ujjain-lang"

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === "hi" || saved === "en") return saved
    } catch {
      /* ignore */
    }
    return "hi"
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang
  }, [lang])

  const t = useMemo(() => translations[lang], [lang])
  const toggle = () => setLang((l) => (l === "hi" ? "en" : "hi"))

  const value = useMemo(
    () => ({ lang, setLang, toggle, t, isHi: lang === "hi" }),
    [lang, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLang must be used within LanguageProvider")
  return ctx
}
