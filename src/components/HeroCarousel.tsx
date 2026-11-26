import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, TrainFront } from 'lucide-react';
import { COMMUTER_HIGHLIGHTS, HERO_SLIDES } from '../data/simplygoData';

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 lg:pt-8 lg:pb-12">
        {/* Main Hero Carousel Frame */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 min-h-[460px] lg:min-h-[520px] flex items-end">
          {/* Background Image with resilient fallback */}
          {!imgErrorMap[currentSlide.id] ? (
            <img
              key={currentSlide.id}
              src={currentSlide.image}
              alt={currentSlide.imageAlt}
              referrerPolicy="no-referrer"
              onError={() =>
                setImgErrorMap((prev) => ({ ...prev, [currentSlide.id]: true }))
              }
              className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F1F3D] via-slate-800 to-[#7A0026] flex items-center justify-center">
              <TrainFront className="w-24 h-24 text-white/20" />
            </div>
          )}

          {/* Measured contrast scrim */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/20"
            aria-hidden="true"
          />

          {/* Slide Content */}
          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-rose-300">
                {currentSlide.eyebrow} · {currentSlide.accentLabel}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-white leading-[1.12] text-balance">
                {currentSlide.headline}
              </h1>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
                {currentSlide.summary}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={currentSlide.ctaTarget}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#E40046] hover:bg-[#C0003B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>{currentSlide.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#support"
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white/90 hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  Locate Ticket Offices
                </a>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={idx === activeIndex}
                    aria-label={`Show slide ${idx + 1}: ${slide.eyebrow}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      idx === activeIndex
                        ? 'w-8 bg-white'
                        : 'w-2.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors backdrop-blur-sm cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors backdrop-blur-sm cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Commuter Key Highlights Strip */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMMUTER_HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80"
            >
              <p className="text-xs font-medium text-slate-500">{item.label}</p>
              <p className="mt-1 font-display text-base font-bold text-slate-900 tabular-nums">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
