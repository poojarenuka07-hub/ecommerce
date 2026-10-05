import React, { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../types/ecommerce';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isAddedBriefly, setIsAddedBriefly] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.variants[0], 1);
    setIsAddedBriefly(true);
    setTimeout(() => setIsAddedBriefly(false), 1400);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group flex flex-col bg-white rounded-xl border border-stone-200 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-stone-300 relative"
    >
      {/* Product Image Slot (65-75% visual dominance) */}
      <div className="relative aspect-[4/3] bg-[#F5F4F0] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-stone-100">
            <span className="text-stone-400 font-serif text-lg">{product.name}</span>
            <span className="text-[11px] text-stone-400 mt-1 uppercase tracking-wider">{product.category}</span>
          </div>
        )}

        {/* Subtle Text Tag (Section 2.B: Max 1 subtle text tag, NOT a colorful pill) */}
        {product.badge && (
          <div className="absolute top-3 left-3 text-[11px] font-medium tracking-wider uppercase text-stone-700 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs border border-stone-200/60">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-stone-950 hover:bg-white shadow-xs transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-rose-700 text-rose-700' : 'text-stone-700'
            }`}
          />
        </button>

        {/* Quick Add Button on Hover */}
        <div className="absolute bottom-3 right-3 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            aria-label={`Quick add ${product.name} to bag`}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md shadow-md flex items-center gap-1.5 transition-all cursor-pointer ${
              isAddedBriefly
                ? 'bg-emerald-800 text-white'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {isAddedBriefly ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Rating - Zero Pill rule: unboxed text with dot separator */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider text-[11px] font-medium">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-amber-700">★</span>
              <span className="font-mono tabular-nums text-stone-700 font-medium">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Subtitle / Spec Note */}
          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Variant count */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-medium text-stone-900 font-mono tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <span className="text-[11px] text-stone-500">
            {product.variants.length > 1
              ? `${product.variants.length} finishes`
              : 'Standard edition'}
          </span>
        </div>
      </div>
    </div>
  );
};
