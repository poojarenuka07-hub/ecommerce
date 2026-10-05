import React from 'react';
import { Compass, Feather, Hammer, Sparkles } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="craftsmanship" className="border-t border-stone-200 bg-[#F5F4EE] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-[0.25em] font-semibold text-stone-500 mb-3">
            Our Philosophy
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight [text-wrap:balance]">
            Crafted for decades, not momentary seasons.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed mt-4 font-light">
            Every piece in the Aura Studio catalog is born in small European and Japanese family ateliers. We reject planned obsolescence in favor of monolithic stonework, solid sustainably harvested timber, and repairable mechanical joinery.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Pillar 1 */}
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-stone-200/80 flex items-center justify-center text-stone-800">
              <Hammer className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-stone-900 font-medium">
              01. Monolithic Materials
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Solid European white oak, unlacquered brass, Roman travertine, and long-staple linen. Materials that improve as they acquire natural patina from human touch.
            </p>
            <div className="pt-2 text-xs text-stone-500 font-mono">
              100% FSC-certified Nordic forestry
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-stone-200/80 flex items-center justify-center text-stone-800">
              <Feather className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-stone-900 font-medium">
              02. Small-Batch Ateliers
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              We commission dedicated runs of 100 to 250 units directly from master ceramicists and woodturners, ensuring living wages and meticulous hand inspection.
            </p>
            <div className="pt-2 text-xs text-stone-500 font-mono">
              Average atelier relationship: 8+ years
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-lg bg-stone-200/80 flex items-center justify-center text-stone-800">
              <Compass className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-stone-900 font-medium">
              03. Carbon-Neutral Transit
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              100% recyclable, zero-styrofoam honeycomb paper packaging. Every freight and courier kilometer is offset through certified European reforestation projects.
            </p>
            <div className="pt-2 text-xs text-stone-500 font-mono">
              Zero single-use plastics across fulfillment
            </div>
          </div>
        </div>

        {/* Quantitative Proof Metric Banner (Section 1.H Claim-to-proof Adjacency) */}
        <div className="mt-16 pt-10 border-t border-stone-300/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">10 Yrs</div>
            <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">Structural Warranty</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">100%</div>
            <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">Plastic-Free Delivery</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">4.92 ★</div>
            <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">Average Collector Score</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">30 Days</div>
            <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">In-Home Consideration</div>
          </div>
        </div>
      </div>
    </section>
  );
};
