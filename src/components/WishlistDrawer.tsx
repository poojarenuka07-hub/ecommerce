import React from 'react';
import { X, Heart, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setActiveProductModal,
  } = useCart();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col">
          <div className="p-6 border-b border-stone-200/80 bg-[#FAF9F5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-rose-700 text-rose-700" />
              <h2 className="font-serif text-xl font-medium text-stone-900">Saved Objects</h2>
              <span className="text-xs font-mono tabular-nums text-stone-500">
                ({savedProducts.length})
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              aria-label="Close wishlist"
              className="p-1.5 text-stone-500 hover:text-stone-950 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-100">
            {savedProducts.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <Heart className="w-6 h-6 stroke-1" />
                </div>
                <p className="font-serif text-xl text-stone-800 mb-2">No saved objects yet</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto mb-6">
                  Save pieces while you browse to compare finishes or revisit later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-4">
                  <div
                    onClick={() => {
                      setActiveProductModal(product);
                      setIsWishlistOpen(false);
                    }}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4
                          onClick={() => {
                            setActiveProductModal(product);
                            setIsWishlistOpen(false);
                          }}
                          className="font-medium text-stone-900 text-xs sm:text-sm hover:underline cursor-pointer truncate"
                        >
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 uppercase tracking-wider mt-0.5">
                          {product.category}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleWishlist(product.id)}
                        aria-label={`Remove ${product.name} from wishlist`}
                        className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-mono tabular-nums text-sm font-semibold text-stone-900">
                        ${product.price}
                      </span>

                      <button
                        onClick={() => {
                          addToCart(product, product.variants[0], 1);
                        }}
                        className="px-3 py-1 bg-stone-900 text-white text-xs font-medium rounded hover:bg-stone-800 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
