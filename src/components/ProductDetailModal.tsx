import React, { useState, useEffect } from 'react';
import { X, Heart, ShieldCheck, Truck, RefreshCw, Check, Star, Minus, Plus } from 'lucide-react';
import { Product, ProductVariant } from '../types/ecommerce';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0] || null);
      setQuantity(1);
      setActiveImageIndex(0);
      setIsAdded(false);
    }
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const currentVariant = selectedVariant || product.variants[0];
  const unitPrice = product.price + (currentVariant?.additionalPrice || 0);
  const isFavorited = isInWishlist(product.id);

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const handleAdd = () => {
    addToCart(product, currentVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white sm:rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 flex flex-col my-auto max-h-[96vh]">
        {/* Modal Header Bar with Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#FAF9F5]">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="uppercase tracking-wider font-medium">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>Ref: {product.id}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close product view"
            className="p-1.5 text-stone-500 hover:text-stone-950 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            {/* Gallery Left Zone */}
            <div className="md:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={images[activeImageIndex] || product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 text-[11px] font-medium tracking-wider uppercase text-stone-700 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded shadow-xs border border-stone-200">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails if multiple images */}
              {images.length > 1 && (
                <div className="flex items-center gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-stone-900 shadow-xs'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantee highlights */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-stone-100 text-center text-stone-600">
                <div className="p-2.5 rounded-lg bg-stone-50 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-stone-700" />
                  <span className="text-[11px] font-medium">Free Delivery</span>
                  <span className="text-[10px] text-stone-500">Orders over $250</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-stone-700" />
                  <span className="text-[11px] font-medium">10-Yr Guarantee</span>
                  <span className="text-[10px] text-stone-500">Heirloom grade</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-50 flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-stone-700" />
                  <span className="text-[11px] font-medium">30-Day Trial</span>
                  <span className="text-[10px] text-stone-500">Simple returns</span>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module Right Zone */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Title & Reviews */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-xs text-stone-500">
                    <div className="flex items-center text-amber-700">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-700 stroke-amber-700" />
                      ))}
                    </div>
                    <span className="font-mono tabular-nums font-semibold text-stone-800">
                      {product.rating.toFixed(2)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="underline hover:text-stone-800 cursor-pointer"
                    >
                      {product.reviewCount} customer reviews
                    </button>
                  </div>

                  <h1 className="font-serif text-2xl sm:text-3xl text-stone-900 leading-tight">
                    {product.name}
                  </h1>

                  <p className="text-xs sm:text-sm text-stone-500 mt-1 font-light">
                    {product.subtitle}
                  </p>
                </div>

                {/* Price Baseline */}
                <div className="flex items-baseline gap-3 py-2 border-y border-stone-100">
                  <span className="text-2xl sm:text-3xl font-mono tabular-nums font-medium text-stone-900">
                    ${unitPrice}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono tabular-nums text-stone-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-stone-500 ml-auto">
                    {product.inStock ? (
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                        In stock ({product.stockCount} units remaining)
                      </span>
                    ) : (
                      <span className="text-stone-400">Backordered</span>
                    )}
                  </span>
                </div>

                {/* Variant Selector */}
                {product.variants.length > 0 && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">
                      Finish / Variant:{' '}
                      <span className="font-normal text-stone-900 capitalize">
                        {currentVariant?.name}
                      </span>
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          disabled={!v.inStock}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-2 text-xs rounded-lg border flex items-center gap-2 transition-all cursor-pointer ${
                            currentVariant?.id === v.id
                              ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                              : v.inStock
                              ? 'border-stone-200 text-stone-800 hover:border-stone-300 bg-white'
                              : 'border-stone-100 text-stone-400 bg-stone-50 cursor-not-allowed opacity-60'
                          }`}
                        >
                          {v.colorHex && (
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                              style={{ backgroundColor: v.colorHex }}
                            />
                          )}
                          <span className="whitespace-nowrap">{v.name}</span>
                          {v.additionalPrice ? (
                            <span className="font-mono tabular-nums text-[11px] opacity-80">
                              (+${v.additionalPrice})
                            </span>
                          ) : null}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity and Primary Actions */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center gap-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50/50 p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                        className="p-1.5 text-stone-600 hover:text-stone-950 disabled:opacity-30 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-9 text-center font-mono tabular-nums text-xs font-semibold text-stone-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                        disabled={quantity >= product.stockCount}
                        aria-label="Increase quantity"
                        className="p-1.5 text-stone-600 hover:text-stone-950 disabled:opacity-30 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Primary Add to Bag CTA */}
                    <button
                      onClick={handleAdd}
                      disabled={!product.inStock}
                      className={`flex-1 py-3 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99] ${
                        isAdded
                          ? 'bg-emerald-800 text-white'
                          : 'bg-stone-900 text-white hover:bg-stone-800'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <span>Add to Bag — ${(unitPrice * quantity).toLocaleString()}</span>
                      )}
                    </button>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Toggle wishlist"
                      className="p-3 border border-stone-200 rounded-lg hover:border-stone-300 hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorited ? 'fill-rose-700 text-rose-700' : 'text-stone-700'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Tabs for Story, Specs, and Reviews */}
                <div className="pt-6 border-t border-stone-100">
                  <div className="flex items-center gap-6 border-b border-stone-200 text-xs font-medium uppercase tracking-wider mb-4">
                    <button
                      onClick={() => setActiveTab('details')}
                      className={`pb-2 transition-colors cursor-pointer ${
                        activeTab === 'details'
                          ? 'border-b-2 border-stone-900 text-stone-950 font-semibold'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('specs')}
                      className={`pb-2 transition-colors cursor-pointer ${
                        activeTab === 'specs'
                          ? 'border-b-2 border-stone-900 text-stone-950 font-semibold'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className={`pb-2 transition-colors cursor-pointer ${
                        activeTab === 'reviews'
                          ? 'border-b-2 border-stone-900 text-stone-950 font-semibold'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Reviews ({product.reviewCount})
                    </button>
                  </div>

                  {activeTab === 'details' && (
                    <div className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light space-y-2">
                      <p>{product.description}</p>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <dl className="space-y-2.5 text-xs">
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <dt className="text-stone-500 font-medium">Dimensions</dt>
                        <dd className="text-stone-800 font-mono text-right">{product.details.dimensions}</dd>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <dt className="text-stone-500 font-medium">Materials</dt>
                        <dd className="text-stone-800 text-right">{product.details.materials}</dd>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <dt className="text-stone-500 font-medium">Origin</dt>
                        <dd className="text-stone-800 text-right">{product.details.origin}</dd>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <dt className="text-stone-500 font-medium">Weight</dt>
                        <dd className="text-stone-800 font-mono text-right">{product.details.weight}</dd>
                      </div>
                      <div className="flex justify-between py-1">
                        <dt className="text-stone-500 font-medium">Care</dt>
                        <dd className="text-stone-800 text-right max-w-xs">{product.details.care}</dd>
                      </div>
                    </dl>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4 max-h-52 overflow-y-auto pr-2">
                      {product.reviews.length > 0 ? (
                        product.reviews.map((rev) => (
                          <div key={rev.id} className="p-3 bg-stone-50 rounded-lg text-xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-stone-900">{rev.author}</span>
                              <span className="text-stone-400 font-mono text-[11px]">{rev.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-amber-700">
                              {[...Array(rev.rating)].map((_, i) => (
                                <span key={i}>★</span>
                              ))}
                              {rev.verified && (
                                <span className="ml-2 text-[10px] text-emerald-700 font-medium uppercase tracking-wider">
                                  Verified Owner
                                </span>
                              )}
                            </div>
                            <div className="font-medium text-stone-800">{rev.title}</div>
                            <p className="text-stone-600 font-light leading-relaxed">{rev.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-stone-500 italic py-2">
                          No customer reviews yet. Be the first to acquire this piece.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
