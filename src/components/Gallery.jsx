import { useState } from "react"
import { useLang } from "../context/LanguageContext"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"

// 8 labelled captions from i18n + additional real photos, all from uploads.
const GALLERY = [
  { src: "/images/mangalnath-shringar-1.png", cap: 0 },
  { src: "/images/yantra-mahamrityunjaya.png", cap: 1 },
  { src: "/images/yantra-vastu.png", cap: 2 },
  { src: "/images/havan-pratidin.png", cap: 3 },
  { src: "/images/shringar-mandir.png", cap: 4 },
  { src: "/images/red-shringar.png", cap: 5 },
  { src: "/images/havan-fire.png", cap: 6 },
  { src: "/images/janmasthan-shringar.png", cap: 7 },
  { src: "/images/shringar-mangalnath.png", cap: null },
  { src: "/images/mangalnath-shringar-2.png", cap: null },
  { src: "/images/havan-priest.png", cap: null },
  { src: "/images/havan-mandar.png", cap: null },
  { src: "/images/mahakal-temple.png", cap: null },
  { src: "/images/shani-temple.png", cap: null },
  { src: "/images/family-temple.png", cap: null },
  { src: "/images/yantra-vastu-2.png", cap: null },
]

export default function Gallery() {
  const { t } = useLang()
  const [open, setOpen] = useState(null)

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionTitle eyebrow={t.gallery.eyebrow} title={t.gallery.title} sub={t.gallery.sub} />

        {/* CSS masonry via columns */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-gap:1rem]">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={(i % 4) * 0.06} y={30}>
              <figure
                onClick={() => (g.cap !== null ? setOpen(i) : undefined)}
                className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-gold/25 shadow-lg shadow-black/40 ${
                  g.cap !== null ? "cursor-pointer" : ""
                }`}
              >
                <img
                  src={g.src}
                  alt={g.cap !== null ? t.gallery.captions[g.cap] : t.gallery.title}
                  className="w-full h-auto transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-deep/85 via-transparent to-transparent opacity-70" />
                {g.cap !== null ? (
                  <figcaption className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="inline-block rounded-full bg-maroon-deep/60 border border-gold/40 px-3 py-1 text-[11px] sm:text-xs text-gold-soft backdrop-blur">
                      {t.gallery.captions[g.cap]}
                    </span>
                  </figcaption>
                ) : null}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <button
            className="absolute top-5 right-6 text-3xl text-gold hover:rotate-90 transition"
            aria-label="Close"
          >
            ✕
          </button>
          <figure className="max-h-[85vh] max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY[open].src}
              alt={t.gallery.captions[GALLERY[open].cap]}
              className="max-h-[80vh] w-auto rounded-2xl border border-gold/40 shadow-2xl shadow-gold/20"
            />
            <figcaption className="mt-3 text-center text-sm tracking-wide text-cream/80">
              {t.gallery.captions[GALLERY[open].cap]}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
