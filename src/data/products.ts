import { Product } from '../types/ecommerce';

import ceramicLampImg from '../assets/images/product_ceramic_lamp_1791181571449.jpg';
import oakArmchairImg from '../assets/images/product_oak_armchair_1791181582699.jpg';
import brassPourerImg from '../assets/images/product_brass_pourer_1791181593587.jpg';
import linenThrowImg from '../assets/images/product_linen_throw_1791181603501.jpg';
import heroImg from '../assets/images/hero_lifestyle_showcase_1791181557707.jpg';

export const HERO_IMAGE = heroImg;

export const PRODUCTS: Product[] = [
  {
    id: 'prod-armchair-01',
    name: 'Lund Solid Oak Reading Armchair',
    subtitle: 'Sculptural silhouette in solid white oak with Italian bouclé',
    category: 'Furniture',
    price: 890,
    originalPrice: 980,
    image: oakArmchairImg,
    galleryImages: [oakArmchairImg, heroImg],
    description:
      'Engineered for quiet contemplative moments, the Lund Armchair balances brutalist solid white oak joinery with the soft tactile luxury of heavyweight textured bouclé cushioning. Hand-finished with natural matte oil to accentuate organic grain variance.',
    details: {
      dimensions: 'W 78cm × D 84cm × H 74cm (Seat Height: 41cm)',
      materials: 'FSC-Certified Solid European White Oak, Italian Bouclé Wool Blend, Feather-Down Core',
      origin: 'Handcrafted in Småland, Sweden',
      weight: '19.5 kg',
      care: 'Dust with soft dry cloth. Spot clean upholstery with wool-safe solvent only.',
    },
    variants: [
      { id: 'var-natural-cream', name: 'Natural Oak / Raw Cream Bouclé', inStock: true, colorHex: '#F4EFE6' },
      { id: 'var-smoked-charcoal', name: 'Smoked Oak / Charcoal Melange', inStock: true, colorHex: '#383635', additionalPrice: 50 },
      { id: 'var-bleached-sand', name: 'Bleached Ash / Oat Grain', inStock: true, colorHex: '#DFDACF' },
    ],
    rating: 4.95,
    reviewCount: 42,
    reviews: [
      {
        id: 'rev-01',
        author: 'Astrid Lindholm',
        rating: 5,
        date: 'February 18, 2026',
        title: 'Heirloom craftsmanship that anchors the entire room',
        comment:
          'The proportions are mathematically sublime. It is supportive without feeling rigid, and the bouclé fabric has immense tactile depth.',
        verified: true,
      },
      {
        id: 'rev-02',
        author: 'Henrik Vane',
        rating: 5,
        date: 'January 29, 2026',
        title: 'Impeccable joinery and serene comfort',
        comment:
          'Arrived perfectly crated. The mortise-and-tenon wood joins show remarkable precision. A true centerpiece.',
        verified: true,
      },
    ],
    featured: true,
    badge: 'Limited Run of 120',
    inStock: true,
    stockCount: 8,
  },
  {
    id: 'prod-lamp-02',
    name: 'Kallio Stoneware Table Lamp',
    subtitle: 'Cast textured ceramic base with raw pleated linen diffuser',
    category: 'Lighting',
    price: 340,
    originalPrice: 380,
    image: ceramicLampImg,
    galleryImages: [ceramicLampImg, heroImg],
    description:
      'Formed from mineral-rich coarse stoneware and fired at 1,280°C to achieve a raw textured micro-crater surface. Casts a warm 2700K ambient wash that softens architectural shadows. Includes solid brass rotary dimmer.',
    details: {
      dimensions: 'Diameter 32cm × H 46cm (Cord length: 2.2m)',
      materials: 'Coarse Chamotte Stoneware, Natural Unbleached Linen, Brushed Brass',
      origin: 'Thrown in Helsinki, Finland',
      weight: '4.8 kg',
      care: 'Wipe base with clean lint-free cloth. E27 warm dimming LED bulb included (8W max).',
    },
    variants: [
      { id: 'var-bone-white', name: 'Bone White Stoneware', inStock: true, colorHex: '#ECE7DE' },
      { id: 'var-iron-black', name: 'Iron Black Matte Glaze', inStock: true, colorHex: '#262423', additionalPrice: 20 },
      { id: 'var-terracotta-raw', name: 'Raw Ochre Terracotta', inStock: false, colorHex: '#A3684D' },
    ],
    rating: 4.88,
    reviewCount: 38,
    reviews: [
      {
        id: 'rev-03',
        author: 'Clara Dupond',
        rating: 5,
        date: 'March 02, 2026',
        title: 'The brass rotary switch feels so deliberate',
        comment:
          'The glow through the linen shade is hypnotic in evening hours. It completely eliminates harsh downlights.',
        verified: true,
      },
    ],
    featured: true,
    badge: 'Artisan Batch',
    inStock: true,
    stockCount: 14,
  },
  {
    id: 'prod-pourer-03',
    name: 'Torne Precision Pour-Over Kettle',
    subtitle: 'Brushed solid brass and matte silicone-coated thermal steel',
    category: 'Objects',
    price: 185,
    image: brassPourerImg,
    galleryImages: [brassPourerImg],
    description:
      'Calibrated for intentional morning brew rituals. Features an ergonomic counterweighted brass handle and a continuous 8mm gooseneck spout designed for laminar water flow and absolute pour trajectory control.',
    details: {
      dimensions: 'W 27cm × D 14cm × H 16.5cm (Capacity: 900ml)',
      materials: '304 Medical-Grade Stainless Steel, Solid Forged Brass, Heat-Treated Silicone',
      origin: 'Crafted in Niigata, Japan',
      weight: '780g',
      care: 'Hand wash with non-abrasive sponge. Suitable for all stovetops including induction.',
    },
    variants: [
      { id: 'var-matte-brass', name: 'Matte Obsidian & Brushed Brass', inStock: true, colorHex: '#2E2D2B' },
      { id: 'var-raw-steel', name: 'Satin Industrial Steel', inStock: true, colorHex: '#B8B5B0' },
    ],
    rating: 4.92,
    reviewCount: 56,
    reviews: [
      {
        id: 'rev-04',
        author: 'Julian Thorne',
        rating: 5,
        date: 'February 12, 2026',
        title: 'Masterclass in fluid dynamics and hand balance',
        comment:
          'The flow rate is astonishingly steady. The brass handle warms gently without ever becoming uncomfortably hot.',
        verified: true,
      },
    ],
    featured: true,
    badge: 'Curator Pick',
    inStock: true,
    stockCount: 22,
  },
  {
    id: 'prod-linen-04',
    name: 'Hede Heavyweight Belgian Linen Throw',
    subtitle: '420 GSM washed flax blanket with frayed artisanal selvedge',
    category: 'Textiles',
    price: 220,
    originalPrice: 260,
    image: linenThrowImg,
    galleryImages: [linenThrowImg],
    description:
      'Woven from long-staple Normandy flax and stonewashed with volcanic river stones for immediate relaxed drape. Substantial weight provides comforting thermal insulation year-round while remaining naturally breathable.',
    details: {
      dimensions: '150cm × 210cm',
      materials: '100% Certified Masters of Linen® European Flax',
      origin: 'Woven in Courtrai, Belgium',
      weight: '1.4 kg',
      care: 'Gentle machine wash cold with eco-detergent. Line dry or tumble dry low.',
    },
    variants: [
      { id: 'var-flax-oatmeal', name: 'Raw Oatmeal Melange', inStock: true, colorHex: '#D4CEBF' },
      { id: 'var-moss-green', name: 'Muted Forest Moss', inStock: true, colorHex: '#606456' },
      { id: 'var-clay-sand', name: 'Warm Desert Clay', inStock: true, colorHex: '#C59E85' },
    ],
    rating: 4.97,
    reviewCount: 64,
    reviews: [
      {
        id: 'rev-05',
        author: 'Elena R.',
        rating: 5,
        date: 'March 11, 2026',
        title: 'Incredible texture and substantial weight',
        comment:
          'This is real linen with heirloom heft, not the paper-thin blends sold elsewhere. The color matches our oak bench effortlessly.',
        verified: true,
      },
    ],
    featured: true,
    inStock: true,
    stockCount: 19,
  },
  {
    id: 'prod-vessel-05',
    name: 'Sarek Sculptural Mineral Vessel',
    subtitle: 'Hand-coiled tactile travertine centerpiece with honed rim',
    category: 'Objects',
    price: 160,
    image: ceramicLampImg,
    galleryImages: [ceramicLampImg],
    description:
      'Carved from solid monolithic Roman travertine stone blocks. Each vessel exhibits unique natural cavities, sedimentary striations, and crystalline formations that celebrate geological passage of time.',
    details: {
      dimensions: 'Diameter 24cm × H 18cm',
      materials: 'Monolithic Unfilled Roman Travertine Stone',
      origin: 'Tivoli, Italy',
      weight: '3.6 kg',
      care: 'Seal against acidic liquids. Clean with damp micro-cloth and mild soap.',
    },
    variants: [
      { id: 'var-travertine-ivory', name: 'Ivory Travertine', inStock: true, colorHex: '#EAE5D9' },
      { id: 'var-travertine-walnut', name: 'Noce Dark Travertine', inStock: true, colorHex: '#8C7764', additionalPrice: 25 },
    ],
    rating: 4.81,
    reviewCount: 19,
    reviews: [
      {
        id: 'rev-06',
        author: 'Marcus K.',
        rating: 5,
        date: 'January 14, 2026',
        title: 'Raw geological presence on my desk',
        comment: 'Heavier than expected and beautifully tactile.',
        verified: true,
      },
    ],
    inStock: true,
    stockCount: 11,
  },
  {
    id: 'prod-sconce-06',
    name: 'Aros Brass Disc Wall Sconce',
    subtitle: 'Spun solid raw brass disc with dim-to-warm indirect reflector',
    category: 'Lighting',
    price: 295,
    originalPrice: 330,
    image: brassPourerImg,
    galleryImages: [brassPourerImg],
    description:
      'A study in quiet celestial geometry. The unlacquered spun brass disc reflects an ethereal halo of indirect warm light, aging naturally over decades into a deep golden patina.',
    details: {
      dimensions: 'Diameter 28cm × Depth 7.5cm',
      materials: 'Solid Spun Unlacquered Brass, Opal Glass Diffuser',
      origin: 'Copenhagen, Denmark',
      weight: '1.8 kg',
      care: 'Hardwired installation required. Will patina gracefully with air exposure.',
    },
    variants: [
      { id: 'var-raw-brass', name: 'Raw Natural Brass', inStock: true, colorHex: '#D8B168' },
      { id: 'var-blackened-brass', name: 'Blackened Chemical Brass', inStock: true, colorHex: '#302F2D', additionalPrice: 30 },
    ],
    rating: 4.9,
    reviewCount: 27,
    reviews: [],
    inStock: true,
    stockCount: 7,
  },
];
