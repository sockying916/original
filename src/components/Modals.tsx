import { CheckCircle2, MapPin, Smartphone, X } from 'lucide-react';
import { CardCharmDesign, NewsArticle, ProductItem } from '../data/simplygoData';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onOpenDownload: () => void;
}

export function ProductModal({ product, onClose, onOpenDownload }: ProductModalProps) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#E40046]">{product.category}</p>
              <h3
                id="product-modal-title"
                className="mt-1 font-display text-2xl font-bold text-slate-900"
              >
                {product.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product details"
              className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {product.fullDesc}
          </p>

          <div className="space-y-2.5">
            <h4 className="text-sm font-semibold text-slate-900">Key Capabilities</h4>
            <ul className="space-y-2">
              {product.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <dt className="font-semibold text-slate-500">Eligibility</dt>
              <dd className="mt-1 text-slate-900 leading-relaxed">{product.eligibility}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Card Cost / Fees</dt>
              <dd className="mt-1 text-slate-900 leading-relaxed">{product.cardFee}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-semibold text-slate-500">Where to Apply or Purchase</dt>
              <dd className="mt-1 text-slate-900 leading-relaxed">{product.whereToGet}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDownload();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#E40046] hover:bg-[#C0003B] rounded-lg transition-colors cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Manage in SimplyGo App</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-[#E40046]">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.date}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close article"
              className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3
            id="article-modal-title"
            className="font-display text-2xl font-bold text-slate-900 leading-snug"
          >
            {article.title}
          </h3>

          <div className="rounded-xl overflow-hidden aspect-[16/9] bg-slate-100">
            <img
              src={article.image}
              alt={article.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadAppModal({ isOpen, onClose }: DownloadAppModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#E40046]">iOS &amp; Android</p>
            <h3
              id="download-modal-title"
              className="mt-1 font-display text-2xl font-bold text-slate-900"
            >
              Get the SimplyGo App
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close download dialog"
            className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Scan with your phone camera or search <strong>“SimplyGo”</strong> on the Apple App Store or Google Play Store to manage cards, concession passes, and rewards.
        </p>

        {/* Clean crisp QR matrix illustration */}
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-4">
          <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            fill="none"
            aria-label="SimplyGo App download QR matrix"
            className="rounded-lg bg-white p-2 border border-slate-200"
          >
            <rect x="8" y="8" width="32" height="32" rx="4" stroke="#0F172A" strokeWidth="6" />
            <rect x="18" y="18" width="12" height="12" fill="#E40046" />
            <rect x="88" y="8" width="32" height="32" rx="4" stroke="#0F172A" strokeWidth="6" />
            <rect x="98" y="18" width="12" height="12" fill="#0F172A" />
            <rect x="8" y="88" width="32" height="32" rx="4" stroke="#0F172A" strokeWidth="6" />
            <rect x="18" y="98" width="12" height="12" fill="#0F172A" />
            <rect x="52" y="12" width="8" height="8" fill="#0F172A" />
            <rect x="68" y="12" width="8" height="8" fill="#0F172A" />
            <rect x="52" y="28" width="16" height="8" fill="#0F172A" />
            <rect x="12" y="52" width="8" height="16" fill="#0F172A" />
            <rect x="28" y="60" width="16" height="8" fill="#0F172A" />
            <rect x="52" y="52" width="24" height="24" rx="4" fill="#E40046" />
            <rect x="84" y="52" width="12" height="8" fill="#0F172A" />
            <rect x="104" y="52" width="12" height="16" fill="#0F172A" />
            <rect x="84" y="68" width="16" height="12" fill="#0F172A" />
            <rect x="52" y="88" width="12" height="12" fill="#0F172A" />
            <rect x="72" y="88" width="12" height="24" fill="#0F172A" />
            <rect x="96" y="88" width="20" height="12" fill="#0F172A" />
            <rect x="52" y="108" width="12" height="12" fill="#0F172A" />
            <rect x="96" y="108" width="20" height="12" fill="#E40046" />
          </svg>
          <p className="text-xs font-medium text-slate-500">
            Supports Singpass Login &amp; NFC Card Top-Up
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a
            href="#simplygo-app"
            onClick={onClose}
            className="py-2.5 px-4 text-center text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
          >
            Apple App Store
          </a>
          <a
            href="#simplygo-app"
            onClick={onClose}
            className="py-2.5 px-4 text-center text-xs font-semibold rounded-lg bg-[#E40046] hover:bg-[#C0003B] text-white transition-colors"
          >
            Google Play
          </a>
        </div>
      </div>
    </div>
  );
}

interface CardCharmModalProps {
  design: CardCharmDesign | null;
  onClose: () => void;
  onOpenDownload: () => void;
}

export function CardCharmModal({ design, onClose, onOpenDownload }: CardCharmModalProps) {
  if (!design) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="design-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#E40046]">
              {design.type} · {design.releaseLabel}
            </p>
            <h3
              id="design-modal-title"
              className="mt-1 font-display text-2xl font-bold text-slate-900"
            >
              {design.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close card or charm design details"
            className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {design.description}
        </p>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <dt className="font-semibold text-slate-500">Retail Price</dt>
            <dd className="mt-1 font-mono text-base font-bold text-slate-900 tabular-nums">
              {design.price}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-500">Initial Value</dt>
            <dd className="mt-1 text-slate-900 font-medium">{design.storedValueIncluded}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-semibold text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Where to Buy</span>
            </dt>
            <dd className="mt-1 text-slate-900">{design.whereToBuy}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenDownload();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#E40046] hover:bg-[#C0003B] rounded-lg transition-colors cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span>Pair CAN in SimplyGo App</span>
          </button>
        </div>
      </div>
    </div>
  );
}

