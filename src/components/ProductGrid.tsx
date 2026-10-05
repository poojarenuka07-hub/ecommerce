import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import { Product, ProductCategory } from '../types/ecommerce';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onSelectProduct: (product: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onSelectProduct,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories: ProductCategory[] = ['All', 'Furniture', 'Lighting', 'Objects', 'Textiles'];

  // Filter & Sort pipeline
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.details.materials.toLowerCase().includes(q) ||
          p.details.origin.toLowerCase().includes(q)
      );
    }

    // In-stock filter
    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // featured
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [products, activeCategory, searchQuery, inStockOnly, sortBy]);

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold mb-2">
            Curated Catalog
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
            {activeCategory === 'All' ? 'Complete Collection' : activeCategory}
          </h2>
        </div>

        {/* Counter & Active Search Badge */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
          <span className="font-mono tabular-nums font-medium text-stone-800">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'object' : 'objects'} available
          </span>

          {searchQuery && (
            <div className="flex items-center gap-1.5 bg-stone-200/80 px-2.5 py-1 rounded text-stone-800">
              <span>Query: &ldquo;{searchQuery}&rdquo;</span>
              <button
                onClick={onClearSearch}
                className="hover:text-stone-950 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Segmented Control (Allowed per Section 1.A DO) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort & Toggle Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* In-Stock Toggle */}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-2 cursor-pointer ${
              inStockOnly
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                inStockOnly ? 'bg-white border-white text-stone-900' : 'border-stone-400'
              }`}
            >
              {inStockOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span>Ready to Ship</span>
          </button>

          {/* Sort Selector */}
          <div className="relative flex items-center">
            <label htmlFor="sort-select" className="sr-only">
              Sort products
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-stone-200 text-stone-800 text-xs font-medium rounded-lg pl-3 pr-8 py-2 hover:border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-400 cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards Grid: 3-column desktop / 2-column tablet per reference 1_ecommerce_retail.md */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        /* Polished Empty State */
        <div className="py-20 text-center bg-white rounded-xl border border-stone-200 p-8">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-500">
            <SlidersHorizontal className="w-6 h-6 stroke-1" />
          </div>
          <h3 className="font-serif text-2xl text-stone-800 mb-2">No matching objects found</h3>
          <p className="text-stone-500 text-sm max-w-md mx-auto mb-6">
            We couldn&apos;t find any objects matching your criteria. Try resetting your search or exploring all categories.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                onSelectCategory('All');
                onClearSearch();
                setInStockOnly(false);
              }}
              className="px-5 py-2.5 bg-stone-900 text-white text-xs font-medium uppercase tracking-wider rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
