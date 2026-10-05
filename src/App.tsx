import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { PRODUCTS } from './data/products';
import { ProductCategory, Product } from './types/ecommerce';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { ToastContainer } from './components/ToastContainer';

function Storefront() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { activeProductModal, setActiveProductModal } = useCart();

  const handleExploreClick = () => {
    setActiveCategory('All');
    setSearchQuery('');
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProduct = (product: Product) => {
    setActiveProductModal(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-stone-200">
      {/* Top Bar Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* Campaign Hero Showcase */}
        <Hero onExploreClick={handleExploreClick} />

        {/* Curated Product Grid with interactive filters and search */}
        <ProductGrid
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onSelectProduct={handleSelectProduct}
        />

        {/* Philosophy & Craftsmanship */}
        <StorySection />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={setActiveCategory} />

      {/* Global Interactive Overlays */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
      />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <WishlistDrawer />
      <OrderHistoryModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}
