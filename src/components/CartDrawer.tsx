import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ArrowRight, Tag, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    remainingForFreeShipping,
    freeShippingThreshold,
    tax,
    total,
    promoCode,
    applyPromoCode,
    removePromoCode,
    promoError,
    setIsCheckoutOpen,
    setActiveProductModal,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      const ok = applyPromoCode(inputCode);
      if (ok) setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShippingProgress = Math.min(100, Math.round(((freeShippingThreshold - remainingForFreeShipping) / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-stone-200/80 bg-[#FAF9F5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="font-serif text-xl font-medium text-stone-900">Your Shopping Bag</h2>
              <span className="text-xs font-mono tabular-nums text-stone-500">
                ({cart.reduce((a, b) => a + b.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close bag"
              className="p-1.5 text-stone-500 hover:text-stone-950 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-stone-100/70 border-b border-stone-200/60 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div>
                <p className="text-stone-700 mb-1.5">
                  Add <strong className="font-semibold text-stone-900 font-mono tabular-nums">${remainingForFreeShipping}</strong> more for complimentary delivery.
                </p>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-stone-900 rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <Check className="w-4 h-4" />
                <span>You unlocked complimentary worldwide delivery</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-6 h-6 stroke-1" />
                </div>
                <p className="font-serif text-xl text-stone-800 mb-2">Your bag is empty</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto mb-6">
                  Explore our curated objects for intentional interiors and everyday rituals.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Discover Objects
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <div
                    onClick={() => {
                      setActiveProductModal(item.product);
                      setIsCartOpen(false);
                    }}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0 cursor-pointer"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4
                          onClick={() => {
                            setActiveProductModal(item.product);
                            setIsCartOpen(false);
                          }}
                          className="font-medium text-stone-900 text-xs sm:text-sm hover:underline cursor-pointer truncate"
                        >
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 truncate mt-0.5">
                          {item.variant.name}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.product.name}`}
                        className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-stone-200 rounded bg-stone-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-600 hover:text-stone-950 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono tabular-nums text-xs font-medium text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-600 hover:text-stone-950 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono tabular-nums text-sm font-semibold text-stone-900">
                        ${(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout Module */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-[#FAF9F5] space-y-4">
              {/* Promo Code Input */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between bg-stone-200/70 px-3 py-2 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 text-stone-800">
                      <Tag className="w-3.5 h-3.5 text-stone-600" />
                      <span>Applied: <strong>{promoCode}</strong></span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-stone-500 hover:text-stone-900 text-[11px] underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. WELCOME10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 uppercase tracking-wider"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-700 mt-1">{promoError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200/60 font-normal">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900">${subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono tabular-nums text-stone-900">${tax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-stone-300 text-sm font-semibold text-stone-900">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-center text-stone-500">
                Guaranteed safe checkout · SSL encrypted
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
