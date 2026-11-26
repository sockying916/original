import { useState } from 'react';
import { ArrowUpRight, CreditCard } from 'lucide-react';
import { PRODUCTS_DATA, ProductItem } from '../data/simplygoData';

interface ProductsSectionProps {
  onSelectProduct: (product: ProductItem) => void;
}

export function ProductsSection({ onSelectProduct }: ProductsSectionProps) {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  return (
    <section id="products" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold tracking-wide text-[#E40046]">
            Products &amp; Services
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Every way to pay across Singapore’s buses, trains, and roads.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Choose stored-value SimplyGo EZ-Link cards and charms, tap directly with contactless bank cards, or manage subsidised Concession schemes.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {PRODUCTS_DATA.map((product, index) => {
            const isWide = index === 0 || index === 3;
            const colSpanClass = isWide ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <article
                key={product.id}
                className={`${colSpanClass} group rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col hover:border-slate-300 transition-colors duration-200`}
              >
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  {!imgErrors[product.id] ? (
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImgErrors((prev) => ({ ...prev, [product.id]: true }))
                      }
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <CreditCard className="w-12 h-12 text-slate-400" />
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      0{index + 1} · {product.category}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl font-bold text-slate-900">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-500 truncate">
                      {product.cardFee}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E40046] hover:text-[#C0003B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
