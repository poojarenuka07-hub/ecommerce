import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Product, ProductVariant, CartItem, Order, ShippingAddress, PaymentMethodType } from '../types/ecommerce';

interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'alert';
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[]; // product IDs
  orders: Order[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isOrdersOpen: boolean;
  isCheckoutOpen: boolean;
  activeProductModal: Product | null;
  lastCompletedOrder: Order | null;
  promoCode: string;
  discountPercentage: number;
  freeShippingPromo: boolean;
  promoError: string | null;
  toasts: Toast[];

  // Actions
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsOrdersOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setActiveProductModal: (prod: Product | null) => void;
  setLastCompletedOrder: (order: Order | null) => void;

  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;

  placeOrder: (shippingAddress: ShippingAddress, shippingMethod: 'standard' | 'express', paymentMethod: PaymentMethodType) => Order;
  showToast: (message: string, type?: 'info' | 'success' | 'alert') => void;
  removeToast: (id: string) => void;

  // Computed
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'aura_studio_cart_v1';
const WISHLIST_STORAGE_KEY = 'aura_studio_wishlist_v1';
const ORDERS_STORAGE_KEY = 'aura_studio_orders_v1';
const FREE_SHIPPING_THRESHOLD = 250;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);

  const [promoCode, setPromoCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [freeShippingPromo, setFreeShippingPromo] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (message: string, type: 'info' | 'success' | 'alert' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, variant?: ProductVariant, quantity = 1) => {
    const selectedVariant = variant || product.variants[0];
    const unitPrice = product.price + (selectedVariant?.additionalPrice || 0);
    const cartItemId = `${product.id}-${selectedVariant?.id || 'default'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          variant: selectedVariant,
          quantity,
          unitPrice,
        },
      ];
    });

    showToast(`Added "${product.name}" to your bag`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from bag');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved objects');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10' || clean === 'AURA10') {
      setPromoCode(clean);
      setDiscountPercentage(0.1);
      setPromoError(null);
      showToast('10% VIP discount applied', 'success');
      return true;
    } else if (clean === 'FREESHIP') {
      setPromoCode(clean);
      setFreeShippingPromo(true);
      setPromoError(null);
      showToast('Complimentary shipping applied', 'success');
      return true;
    } else if (clean === 'NORD20') {
      setPromoCode(clean);
      setDiscountPercentage(0.2);
      setPromoError(null);
      showToast('20% Curator discount applied', 'success');
      return true;
    } else {
      setPromoError('Invalid promotion code. Try "WELCOME10" or "FREESHIP"');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercentage(0);
    setFreeShippingPromo(false);
    setPromoError(null);
  };

  // Calculations
  const itemCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
    [cart]
  );

  const discountAmount = useMemo(
    () => Math.round(subtotal * discountPercentage),
    [subtotal, discountPercentage]
  );

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const standardShippingFee = freeShippingPromo || subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 25;

  const shippingFee = standardShippingFee;

  const tax = useMemo(() => Math.round((subtotal - discountAmount) * 0.08), [subtotal, discountAmount]);

  const total = useMemo(
    () => Math.max(0, subtotal - discountAmount + shippingFee + tax),
    [subtotal, discountAmount, shippingFee, tax]
  );

  const placeOrder = (
    shippingAddress: ShippingAddress,
    shippingMethod: 'standard' | 'express',
    paymentMethod: PaymentMethodType
  ): Order => {
    const effectiveShipping =
      shippingMethod === 'express'
        ? shippingFee + 35
        : shippingFee;

    const finalTotal = subtotal - discountAmount + effectiveShipping + tax;
    const orderNumber = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 10),
      orderNumber,
      createdAt: new Date().toISOString(),
      items: [...cart],
      shippingAddress,
      shippingMethod,
      paymentMethod,
      subtotal,
      discount: discountAmount,
      shippingFee: effectiveShipping,
      tax,
      total: finalTotal,
      status: 'Confirmed',
      estimatedDelivery: '3–5 business days',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    showToast(`Order ${orderNumber} confirmed!`, 'success');
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        isCartOpen,
        isWishlistOpen,
        isOrdersOpen,
        isCheckoutOpen,
        activeProductModal,
        lastCompletedOrder,
        promoCode,
        discountPercentage,
        freeShippingPromo,
        promoError,
        toasts,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsOrdersOpen,
        setIsCheckoutOpen,
        setActiveProductModal,
        setLastCompletedOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyPromoCode,
        removePromoCode,
        placeOrder,
        showToast,
        removeToast,
        itemCount,
        subtotal,
        discountAmount,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        remainingForFreeShipping,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
