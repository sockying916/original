import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  TrainFront,
  X,
} from 'lucide-react';
import {
  FAQ_ITEMS,
  HERO_SLIDES,
  LATEST_CARDS_AND_CHARMS,
  NEWSROOM_DATA,
  PRODUCTS_DATA,
  TICKET_OFFICES,
} from '../data/simplygoData';

export type QuickSearchTarget =
  | { type: 'section'; id: string }
  | { type: 'tool'; tab: 'fare' | 'card' | 'concession' }
  | { type: 'design'; id: string }
  | { type: 'product'; id: string }
  | { type: 'article'; id: string }
  | { type: 'download' };

interface HeroCarouselProps {
  onQuickJump: (target: QuickSearchTarget) => void;
}

interface SearchEntry {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  keywords: string;
  target: QuickSearchTarget;
}

const QUICK_TASKS: { label: string; target: QuickSearchTarget }[] = [
  { label: 'Latest Cards & Charms', target: { type: 'section', id: 'cards-charms' } },
  { label: 'Check Card & Top Up', target: { type: 'tool', tab: 'card' } },
  { label: 'Fare Calculator', target: { type: 'tool', tab: 'fare' } },
  { label: 'Concession Eligibility', target: { type: 'tool', tab: 'concession' } },
  { label: 'Download SimplyGo App', target: { type: 'section', id: 'simplygo-app' } },
];

export function HeroCarousel({ onQuickJump }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  const searchIndex: SearchEntry[] = useMemo(() => {
    const toolEntries: SearchEntry[] = [
      {
        id: 'tool-fare',
        title: 'MRT & Bus Fare Calculator',
        subtitle: 'Estimate adult, student, senior & pre-peak fares',
        category: 'Travel Tool',
        keywords: 'fare calculator journey mrt bus distance price cost',
        target: { type: 'tool', tab: 'fare' },
      },
      {
        id: 'tool-card',
        title: 'Check Card Balance, Top Up & Block Lost Card',
        subtitle: 'Look up 16-digit CAN ID, Auto Top-Up, and recent taps',
        category: 'Travel Tool',
        keywords: 'balance top up auto topup can id block lost card transactions',
        target: { type: 'tool', tab: 'card' },
      },
      {
        id: 'tool-concession',
        title: 'Concession Card & Monthly Pass Finder',
        subtitle: 'Student, Senior, PAssion Silver, NSF, Workfare & PWD schemes',
        category: 'Travel Tool',
        keywords: 'concession student senior passion silver nsf pwd workfare monthly pass',
        target: { type: 'tool', tab: 'concession' },
      },
      {
        id: 'app-section',
        title: 'SimplyGo Mobile App & Download',
        subtitle: 'What the SimplyGo App does + App Store & Google Play links',
        category: 'SimplyGo App',
        keywords: 'download app ios android qr code features ez-link transitlink',
        target: { type: 'section', id: 'simplygo-app' },
      },
    ];

    const designEntries: SearchEntry[] = LATEST_CARDS_AND_CHARMS.map((d) => ({
      id: `design-${d.id}`,
      title: d.name,
      subtitle: `${d.type} · ${d.price} · ${d.whereToBuy}`,
      category: 'Cards & Charms',
      keywords: `${d.name} ${d.type} ${d.tagline} ${d.whereToBuy} card charm design`,
      target: { type: 'design', id: d.id },
    }));

    const productEntries: SearchEntry[] = PRODUCTS_DATA.map((p) => ({
      id: `prod-${p.id}`,
      title: p.title,
      subtitle: p.shortDesc,
      category: 'Product & Service',
      keywords: `${p.title} ${p.category} ${p.shortDesc}`,
      target: { type: 'product', id: p.id },
    }));

    const articleEntries: SearchEntry[] = NEWSROOM_DATA.map((a) => ({
      id: `news-${a.id}`,
      title: a.title,
      subtitle: `${a.category} · ${a.date}`,
      category: 'Campaign & Update',
      keywords: `${a.title} ${a.category} ${a.summary}`,
      target: { type: 'article', id: a.id },
    }));

    const officeEntries: SearchEntry[] = TICKET_OFFICES.map((o) => ({
      id: `office-${o.id}`,
      title: `Ticket Office: ${o.station}`,
      subtitle: `${o.region} · ${o.hours}`,
      category: 'Ticket Office',
      keywords: `${o.station} ${o.region} ${o.services} ticket office kiosk`,
      target: { type: 'section', id: 'support' },
    }));

    const faqEntries: SearchEntry[] = FAQ_ITEMS.map((f) => ({
      id: `faq-${f.id}`,
      title: f.question,
      subtitle: f.category,
      category: 'FAQ',
      keywords: `${f.question} ${f.answer} ${f.category}`,
      target: { type: 'section', id: 'support' },
    }));

    return [
      ...designEntries,
      ...toolEntries,
      ...productEntries,
      ...articleEntries,
      ...officeEntries,
      ...faqEntries,
    ];
  }, []);

  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    const terms = trimmed.split(/\s+/);
    return searchIndex
      .filter((entry) => {
        const haystack = `${entry.title} ${entry.subtitle} ${entry.keywords}`.toLowerCase();
        return terms.every((t) => haystack.includes(t));
      })
      .slice(0, 6);
  }, [query, searchIndex]);

  const currentSlide = HERO_SLIDES[activeIndex];

  const handleSelectResult = (target: QuickSearchTarget) => {
    setQuery('');
    setSearchFocused(false);
    onQuickJump(target);
  };

  return (
    <section id="top" className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6 space-y-4">
        {/* Instant Search & Quick Task Jump Bar (No excessive scrolling needed) */}
        <div className="relative bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={query}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => window.setTimeout(() => setSearchFocused(false), 180)}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search functions, latest cards & charms, fares, or ticket offices..."
                aria-label="Search SimplyGo functions, cards, charms, and information"
                className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E40046]/25 focus:border-[#E40046]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Live Search Results Dropdown */}
              {searchFocused && query.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 z-30 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-sm text-slate-600">
                      No matching functions or cards found for “{query}”. Try “charm”, “fare”, “concession”, “top up”, or “download”.
                    </div>
                  ) : (
                    <ul className="divide-y divide-slate-100">
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <button
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleSelectResult(result.target);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center justify-between gap-4 transition-colors cursor-pointer"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900 truncate">
                                {result.title}
                              </p>
                              <p className="text-xs text-slate-500 truncate mt-0.5">
                                {result.category} · {result.subtitle}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#E40046] shrink-0" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* One-Click Direct Function Shortcuts */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 shrink-0">
              {QUICK_TASKS.map((task) => (
                <button
                  key={task.label}
                  type="button"
                  onClick={() => onQuickJump(task.target)}
                  className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 hover:text-slate-950 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {task.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Compact, Low-Profile Hero Banner (replaces oversized rotating banner) */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 min-h-[240px] lg:min-h-[270px] flex items-center">
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
              <TrainFront className="w-20 h-20 text-white/20" />
            </div>
          )}

          <div
            className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/70 to-slate-950/25"
            aria-hidden="true"
          />

          <div className="relative z-10 w-full p-6 sm:p-8 lg:px-10 lg:py-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl space-y-2.5">
              <p className="text-xs font-semibold tracking-wide text-rose-300">
                {currentSlide.eyebrow} · {currentSlide.accentLabel}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-white leading-[1.15] text-balance">
                {currentSlide.headline}
              </h1>
              <p className="text-sm text-slate-200 leading-relaxed max-w-lg">
                {currentSlide.summary}
              </p>
              <div className="pt-1.5 flex flex-wrap items-center gap-4">
                <a
                  href={currentSlide.ctaTarget}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#E40046] hover:bg-[#C0003B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>{currentSlide.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#cards-charms"
                  className="inline-flex items-center text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-colors whitespace-nowrap shrink-0"
                >
                  View All Card Designs
                </a>
              </div>
            </div>

            {/* Compact Slide Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Hero slides">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={idx === activeIndex}
                    aria-label={`Slide ${idx + 1}: ${slide.eyebrow}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                      idx === activeIndex
                        ? 'w-7 bg-white'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                  }
                  aria-label="Previous slide"
                  className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors backdrop-blur-sm cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length)
                  }
                  aria-label="Next slide"
                  className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors backdrop-blur-sm cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
