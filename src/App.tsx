import { useState } from 'react';
import { AppShowcaseSection } from './components/AppShowcaseSection';
import { CardsAndCharmsSection } from './components/CardsAndCharmsSection';
import { HeroCarousel, QuickSearchTarget } from './components/HeroCarousel';
import {
  ArticleModal,
  CardCharmModal,
  DownloadAppModal,
  ProductModal,
} from './components/Modals';
import { Navbar } from './components/Navbar';
import { NewsroomSection } from './components/NewsroomSection';
import { ProductsSection } from './components/ProductsSection';
import { SupportFooterSection } from './components/SupportFooterSection';
import { ToolTab, TravelToolsSection } from './components/TravelToolsSection';
import {
  CardCharmDesign,
  LATEST_CARDS_AND_CHARMS,
  NEWSROOM_DATA,
  NewsArticle,
  PRODUCTS_DATA,
  ProductItem,
} from './data/simplygoData';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<CardCharmDesign | null>(null);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [activeToolTab, setActiveToolTab] = useState<ToolTab>('fare');

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickJump = (target: QuickSearchTarget) => {
    if (target.type === 'section') {
      scrollToElement(target.id);
    } else if (target.type === 'tool') {
      setActiveToolTab(target.tab);
      scrollToElement('travel-tools');
    } else if (target.type === 'design') {
      const found = LATEST_CARDS_AND_CHARMS.find((d) => d.id === target.id) ?? null;
      setSelectedDesign(found);
    } else if (target.type === 'product') {
      const found = PRODUCTS_DATA.find((p) => p.id === target.id) ?? null;
      setSelectedProduct(found);
    } else if (target.type === 'article') {
      const found = NEWSROOM_DATA.find((a) => a.id === target.id) ?? null;
      setSelectedArticle(found);
    } else if (target.type === 'download') {
      setDownloadModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenDownloadModal={() => setDownloadModalOpen(true)} />

      <main className="flex-1">
        <HeroCarousel onQuickJump={handleQuickJump} />
        <CardsAndCharmsSection onSelectDesign={setSelectedDesign} />
        <AppShowcaseSection onOpenDownloadModal={() => setDownloadModalOpen(true)} />
        <TravelToolsSection activeTab={activeToolTab} onTabChange={setActiveToolTab} />
        <ProductsSection onSelectProduct={setSelectedProduct} />
        <NewsroomSection onSelectArticle={setSelectedArticle} />
      </main>

      <SupportFooterSection onOpenDownloadModal={() => setDownloadModalOpen(true)} />

      <CardCharmModal
        design={selectedDesign}
        onClose={() => setSelectedDesign(null)}
        onOpenDownload={() => setDownloadModalOpen(true)}
      />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenDownload={() => setDownloadModalOpen(true)}
      />
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
      <DownloadAppModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
}
