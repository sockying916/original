import { useState } from 'react';
import { AppShowcaseSection } from './components/AppShowcaseSection';
import { HeroCarousel } from './components/HeroCarousel';
import { ArticleModal, DownloadAppModal, ProductModal } from './components/Modals';
import { Navbar } from './components/Navbar';
import { NewsroomSection } from './components/NewsroomSection';
import { ProductsSection } from './components/ProductsSection';
import { SupportFooterSection } from './components/SupportFooterSection';
import { TravelToolsSection } from './components/TravelToolsSection';
import { NewsArticle, ProductItem } from './data/simplygoData';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenDownloadModal={() => setDownloadModalOpen(true)} />

      <main className="flex-1">
        <HeroCarousel />
        <TravelToolsSection />
        <ProductsSection onSelectProduct={setSelectedProduct} />
        <AppShowcaseSection onOpenDownloadModal={() => setDownloadModalOpen(true)} />
        <NewsroomSection onSelectArticle={setSelectedArticle} />
      </main>

      <SupportFooterSection onOpenDownloadModal={() => setDownloadModalOpen(true)} />

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
