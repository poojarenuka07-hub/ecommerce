import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ProductCategory } from '../types/ecommerce';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-stone-800">
          {/* Brand & Newsletter */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-2xl font-serif tracking-[0.2em] font-medium text-white uppercase">
              Aura Studio
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 font-light max-w-sm leading-relaxed">
              Curated objects for intentional spaces. Handcrafted furniture, sculptural lighting, functional ceramics, and organic textiles.
            </p>

            <div className="pt-2">
              <span className="block text-xs uppercase tracking-wider font-semibold text-stone-300 mb-2">
                Join the Private Collector Dispatch
              </span>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-stone-800/80 p-3 rounded-lg border border-emerald-900/50">
                  <Check className="w-4 h-4" />
                  <span>Thank you. You have been added to the private preview dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-stone-800/90 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-100 hover:bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
              <span className="text-[11px] text-stone-500 block mt-1.5 font-light">
                Receive invitation-only artisan drop releases and architectural editorials.
              </span>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Catalog
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('All')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  All Objects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Furniture')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Furniture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Lighting')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Lighting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Objects')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Stoneware & Kitchen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Textiles')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Belgian Linen
                </button>
              </li>
            </ul>
          </div>

          {/* Client Services */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">White-Glove Shipping</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">30-Day In-Home Returns</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">10-Year Warranty Claim</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Trade & Architect Program</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Care & Material Guides</span></li>
            </ul>
          </div>

          {/* Ateliers */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              Studio Locations
            </h4>
            <div className="text-xs text-stone-400 space-y-2 font-light">
              <p>
                <strong className="font-semibold text-stone-300 block">Stockholm Showroom:</strong>
                Skeppsbron 14, Gamla Stan, Stockholm
              </p>
              <p>
                <strong className="font-semibold text-stone-300 block">Copenhagen Atelier:</strong>
                Kronprinsensgade 8, Indre By, København
              </p>
              <div className="pt-2 text-[11px] text-stone-500 font-mono">
                Concierge: concierge@aurastudio.design
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light">
          <div>
            © {new Date().getFullYear()} Aura Studio Design Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Privacy Charter</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Terms of Sale</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Sustainability Report</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
