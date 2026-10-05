import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { setActiveProductModal } = useCart();
  const [imageError, setImageError] = useState(false);

  const featuredChair = PRODUCTS.find((p) => p.id === 'prod-armchair-01');

  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text / Campaign Zone */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-stone-600">
              Autumn / Winter 2026 Edition
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-stone-900 leading-[1.12] tracking-tight [text-wrap:balance]">
              Objects for deliberate living and quiet spaces.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-xl">
              Sculptural forms crafted from monolithic stone, solid European white oak, and tactile long-staple linen. Each piece designed to age with grace.
            </p>

            {/* Clean Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-stone-800 transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <span>Explore The Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {featuredChair && (
                <button
                  onClick={() => setActiveProductModal(featuredChair)}
                  className="px-5 py-3.5 border border-stone-300 text-stone-800 text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-stone-100 hover:border-stone-400 transition-all cursor-pointer"
                >
                  View Lund Armchair
                </button>
              )}
            </div>

            {/* Quiet Trust Points - Zero Pill discipline: text with dot separators */}
            <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-600">
              <span>Solid European Oak</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Plastic-Free Packaging</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>10-Year Warranty</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Carbon-Neutral Transit</span>
            </div>
          </div>

          {/* Right Showcase Image Zone */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-stone-200 shadow-xl border border-stone-200/60 group">
              {!imageError ? (
                <img
                  src={HERO_IMAGE}
                  alt="Aura Studio minimalist architectural interior with sculpted lounge chair and ceramic objects"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 text-stone-500 p-8 text-center">
                  <Sparkles className="w-10 h-10 mb-2 stroke-1 text-stone-400" />
                  <span className="font-serif text-lg text-stone-700">Aura Studio Collection</span>
                  <span className="text-xs text-stone-500 mt-1">Tactile objects for contemplative spaces</span>
                </div>
              )}

              {/* Quiet Floating Product Tag */}
              {featuredChair && (
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#FAF9F5]/90 backdrop-blur-md px-4 py-3 rounded-xl border border-stone-200 shadow-md flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Featured Piece</div>
                    <div className="text-xs font-semibold text-stone-900">{featuredChair.name}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono tabular-nums font-semibold text-stone-900">${featuredChair.price}</span>
                    <button
                      onClick={() => setActiveProductModal(featuredChair)}
                      className="text-[11px] uppercase tracking-wider text-stone-900 hover:text-stone-600 underline font-medium cursor-pointer"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
