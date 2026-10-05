import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Clock, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductCategory } from '../types/ecommerce';

interface HeaderProps {
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const {
    itemCount,
    wishlist,
    orders,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsOrdersOpen,
  } = useCart();

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const categories: { label: string; value: ProductCategory }[] = [
    { label: 'All Objects', value: 'All' },
    { label: 'Furniture', value: 'Furniture' },
    { label: 'Lighting', value: 'Lighting' },
    { label: 'Objects', value: 'Objects' },
    { label: 'Textiles', value: 'Textiles' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Slim Dismissible Top Notification Bar (Section 2.C Promotional Restraint) */}
      {showBanner && (
        <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 flex items-center justify-between tracking-wide">
          <div className="w-6" /> {/* spacer */}
          <div className="text-center truncate">
            <span>Complimentary worldwide delivery on orders over $250</span>
            <span className="mx-2 text-stone-500">·</span>
            <span className="text-stone-300">Use code <strong className="font-semibold text-white tracking-widest">WELCOME10</strong> for 10% off</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white transition-colors p-0.5 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl font-serif tracking-[0.2em] font-medium text-stone-900 uppercase shrink-0 transition-opacity hover:opacity-80"
        >
          Aura Studio
        </a>

        {/* Zone 2: 4-6 nav links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-wider uppercase font-medium text-stone-600">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                onSelectCategory(cat.value);
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`relative py-1 transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat.value
                  ? 'text-stone-950 font-semibold'
                  : 'hover:text-stone-950'
              }`}
            >
              {cat.label}
              {activeCategory === cat.value && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-stone-900 rounded-full" />
              )}
            </button>
          ))}
          <a
            href="#craftsmanship"
            className="py-1 transition-colors hover:text-stone-950 cursor-pointer whitespace-nowrap"
          >
            Craftsmanship
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Search Bar Affordance */}
          <div className="relative flex items-center">
            {isSearchExpanded ? (
              <div className="flex items-center bg-stone-100 rounded-lg px-2.5 py-1.5 border border-stone-300 shadow-inner w-44 sm:w-60 transition-all">
                <Search className="w-4 h-4 text-stone-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-stone-900 focus:outline-none w-full placeholder:text-stone-400"
                />
                <button
                  onClick={() => {
                    setIsSearchExpanded(false);
                    onSearchChange('');
                  }}
                  className="text-stone-400 hover:text-stone-700 ml-1 p-0.5"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchExpanded(true)}
                aria-label="Open search"
                className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Orders / History Link */}
          {orders.length > 0 && (
            <button
              onClick={() => setIsOrdersOpen(true)}
              aria-label="View recent orders"
              className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors relative cursor-pointer"
              title="Recent Orders"
            >
              <Clock className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-stone-800 rounded-full" />
            </button>
          )}

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="View saved objects"
            className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors relative cursor-pointer"
            title="Saved Objects"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-stone-900 text-stone-900' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-stone-900 text-[10px] font-mono tabular-nums text-white rounded-full flex items-center justify-center font-medium leading-none">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open shopping bag"
            className="flex items-center gap-2 px-3 py-2 text-stone-900 hover:bg-stone-100/80 rounded-lg transition-colors cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 bg-stone-900 text-white text-[10px] font-mono tabular-nums rounded-full flex items-center justify-center font-semibold leading-none shadow-sm">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase">
              Bag
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Category Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-stone-200/60 gap-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              onSelectCategory(cat.value);
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`text-xs font-medium tracking-wider uppercase whitespace-nowrap pb-1 transition-colors cursor-pointer ${
              activeCategory === cat.value
                ? 'text-stone-950 border-b-2 border-stone-900 font-semibold'
                : 'text-stone-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </header>
  );
};
