import Reveal from "./Reveal"

export default function SectionTitle({ eyebrow, title, sub, align = "center" }) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start"
  return (
    <Reveal className={`flex flex-col gap-4 ${alignCls} mb-12 sm:mb-16`}>
      <span
        className={`inline-flex items-center gap-3 text-[11px] sm:text-xs font-semibold tracking-[0.35em] uppercase text-gold-2 ${
          align === "center" ? "" : "px-0"
        }`}
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
        {eyebrow}
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
      </span>
      <h2 className="gold-text font-hindi text-4xl sm:text-5xl lg:text-6xl leading-tight font-semibold">
        {title}
      </h2>
      {sub && (
        <p
          className={`max-w-2xl text-cream/70 font-light leading-relaxed text-sm sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  )
}
