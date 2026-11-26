import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, MapPin } from 'lucide-react';
import { CardCharmDesign, LATEST_CARDS_AND_CHARMS } from '../data/simplygoData';

interface CardsAndCharmsSectionProps {
  onSelectDesign: (design: CardCharmDesign) => void;
}

type DesignFilter = 'All' | 'Transit Card' | 'Transit Charm';

function CardCharmArtwork({ design }: { design: CardCharmDesign }) {
  const { primary, secondary, accent } = design.palette;

  if (design.type === 'Transit Charm') {
    return (
      <div className="relative h-44 bg-slate-100 flex items-center justify-center overflow-hidden p-6">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${accent}22, transparent 70%)`,
          }}
        />
        {/* Keychain Ring + Geometric Charm SVG */}
        <svg
          viewBox="0 0 180 140"
          className="w-40 h-32 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          {/* Metallic keyring */}
          <circle
            cx="90"
            cy="24"
            r="14"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="4"
          />
          <circle
            cx="90"
            cy="24"
            r="10"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />

          {design.motif === 'hexagon' && (
            <g>
              <polygon
                points="90,34 132,58 132,106 90,130 48,106 48,58"
                fill={primary}
                stroke={secondary}
                strokeWidth="2"
              />
              <circle cx="90" cy="82" r="18" fill="none" stroke={accent} strokeWidth="3" />
              <path
                d="M84 82 C88 76, 94 76, 98 82"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="90" cy="46" r="3" fill="#CBD5E1" />
            </g>
          )}

          {design.motif === 'triangle' && (
            <g>
              <polygon
                points="90,34 138,124 42,124"
                fill={primary}
                stroke={secondary}
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="90" cy="94" r="13" fill="white" fillOpacity="0.18" />
              <path
                d="M82 96 C86 88, 94 88, 98 96"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="90" cy="52" r="3" fill="#FFFFFF" />
            </g>
          )}

          {design.motif === 'circle' && (
            <g>
              <circle
                cx="90"
                cy="82"
                r="46"
                fill={primary}
                stroke={secondary}
                strokeWidth="2"
              />
              <circle cx="90" cy="82" r="34" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="6 4" />
              <path
                d="M78 86 C84 74, 96 74, 102 86"
                fill="none"
                stroke={accent}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="90" cy="48" r="3" fill="#CBD5E1" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  return (
    <div className="relative h-44 bg-slate-100 flex items-center justify-center overflow-hidden p-5">
      {/* Realistic Horizontal Smart Transit Card Preview */}
      <div
        className="w-full max-w-[248px] aspect-[1.586/1] rounded-xl p-4 text-white shadow-lg flex flex-col justify-between relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.03]"
        style={{
          background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
        }}
      >
        {/* Subtle geometric wave pattern */}
        <svg
          viewBox="0 0 240 150"
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          aria-hidden="true"
        >
          <circle cx="205" cy="35" r="55" fill={accent} />
          <path
            d="M0 120 Q75 80 150 115 T250 95"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
        </svg>

        <div className="relative z-10 flex items-center justify-between">
          <span className="font-display text-xs font-extrabold tracking-tight">
            SimplyGo
          </span>
          <span className="text-[10px] font-mono opacity-85">EZ-LINK</span>
        </div>

        <div className="relative z-10 flex items-end justify-between">
          <div>
            <div className="w-7 h-5 rounded-sm bg-amber-200/90 border border-amber-100/60 mb-1.5" />
            <p className="text-[10px] font-mono opacity-80">1004 ···· ···· 5512</p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 16C8.5 13.5 8.5 10.5 6 8M10.5 18.5C14.5 14.5 14.5 9.5 10.5 5.5M15 21C20.5 15.5 20.5 8.5 15 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function CardsAndCharmsSection({ onSelectDesign }: CardsAndCharmsSectionProps) {
  const [filter, setFilter] = useState<DesignFilter>('All');

  const visibleDesigns =
    filter === 'All'
      ? LATEST_CARDS_AND_CHARMS
      : LATEST_CARDS_AND_CHARMS.filter((item) => item.type === filter);

  return (
    <section id="cards-charms" className="py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#E40046]">
              Latest Cards &amp; Charms
            </p>
            <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Browse the newest SimplyGo EZ-Link card and charm designs.
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              View current designs, pricing, and MRT station availability—every release works with remote app top-ups.
            </p>
          </div>

          <div
            className="inline-flex p-1 bg-slate-100 rounded-xl shrink-0"
            role="tablist"
            aria-label="Filter latest cards and charms"
          >
            {(['All', 'Transit Card', 'Transit Charm'] as DesignFilter[]).map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={filter === tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === tab
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'All' ? 'All Designs' : `${tab}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Catalog Grid of Actual Designs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleDesigns.map((design) => (
            <article
              key={design.id}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col hover:border-slate-300 transition-colors"
            >
              <CardCharmArtwork design={design} />

              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  {/* Zero-pill unboxed metadata */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span>
                      {design.type} · {design.releaseLabel}
                    </span>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      {design.price}
                    </span>
                  </div>

                  <h3 className="mt-1.5 font-display text-lg font-bold text-slate-900">
                    {design.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                    {design.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <p className="flex items-start gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="truncate">{design.whereToBuy}</span>
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>SimplyGo Ready</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectDesign(design)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#E40046] hover:text-[#C0003B] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>View Design</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
