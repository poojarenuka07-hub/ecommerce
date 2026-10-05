export type ProductCategory = 'All' | 'Furniture' | 'Lighting' | 'Objects' | 'Textiles';

export interface ProductVariant {
  id: string;
  name: string;
  inStock: boolean;
  colorHex?: string;
  additionalPrice?: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  galleryImages: string[];
  description: string;
  details: {
    dimensions: string;
    materials: string;
    origin: string;
    weight: string;
    care: string;
  };
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  featured?: boolean;
  badge?: string; // e.g. "Limited Edition" or "New Season" (clean unboxed)
  inStock: boolean;
  stockCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type PaymentMethodType = 'credit_card' | 'cod' | 'apple_pay';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: 'standard' | 'express';
  paymentMethod: PaymentMethodType;
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}
