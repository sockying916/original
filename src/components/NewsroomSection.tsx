import { useState } from 'react';
import { ArrowRight, Newspaper } from 'lucide-react';
import { NEWSROOM_DATA, NewsArticle } from '../data/simplygoData';

interface NewsroomSectionProps {
  onSelectArticle: (article: NewsArticle) => void;
}

type CategoryFilter = 'All' | NewsArticle['category'];

const CATEGORIES: CategoryFilter[] = [
  'All',
  'Campaigns',
  'Cards & Charms',
  'Service Advisories',
];

export function NewsroomSection({ onSelectArticle }: NewsroomSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const filteredArticles =
    selectedCategory === 'All'
      ? NEWSROOM_DATA
      : NEWSROOM_DATA.filter((item) => item.category === selectedCategory);

  return (
    <section id="newsroom" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#E40046]">
              Campaigns &amp; Newsroom
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Latest transit rewards, card drops, and commuter advisories.
            </h2>
          </div>

          <div
            className="inline-flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl"
            role="tablist"
            aria-label="Filter updates by category"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {category === 'All' ? 'All Updates' : category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col sm:flex-row hover:border-slate-300 transition-colors"
            >
              <div className="sm:w-48 lg:w-56 shrink-0 bg-slate-100 aspect-[4/3] sm:aspect-auto overflow-hidden">
                {!imgErrors[article.id] ? (
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setImgErrors((prev) => ({ ...prev, [article.id]: true }))
                    }
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <Newspaper className="w-8 h-8 text-slate-400" />
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div>
                  {/* Zero-pill unboxed metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-[#E40046]">
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="mt-2 font-display text-lg font-bold text-slate-900 leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => onSelectArticle(article)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-[#E40046] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Read Update</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
