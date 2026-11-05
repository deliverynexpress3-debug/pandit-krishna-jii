import Reveal from "./Reveal"

/**
 * Thin gold temple-border divider between sections —
 * a ruled line with a small arch/lotus medallion at the centre.
 */
export default function TempleDivider({ className = "" }) {
  return (
    <Reveal className={`flex items-center justify-center ${className}`}>
      <div className="flex w-full items-center justify-center gap-5 px-6">
        <span className="h-px w-24 sm:w-40 bg-gradient-to-r from-transparent to-gold/60" />
        <span className="text-gold/70">❁</span>
        <svg width="46" height="26" viewBox="0 0 46 26" className="shrink-0 text-gold" aria-hidden="true">
          <path
            d="M3 24 Q3 4 23 4 Q43 4 43 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.85"
          />
          <path
            d="M11 24 Q11 12 23 12 Q35 12 35 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle cx="23" cy="4" r="2.4" fill="currentColor" />
        </svg>
        <span className="text-gold/70">❁</span>
        <span className="h-px w-24 sm:w-40 bg-gradient-to-l from-transparent to-gold/60" />
      </div>
    </Reveal>
  )
}
