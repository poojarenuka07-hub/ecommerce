import React, { useState } from 'react';
import { X, CreditCard, Banknote, ShieldCheck, Check, ArrowLeft, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ShippingAddress, PaymentMethodType } from '../types/ecommerce';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    tax,
    total,
    placeOrder,
  } = useCart();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: 'Sophia Bennett',
    email: 'sophia.bennett@example.com',
    phone: '+1 (555) 234-8901',
    addressLine1: '428 Mercer Street, Apt 4B',
    addressLine2: '',
    city: 'New York',
    state: 'NY',
    postalCode: '10013',
    country: 'United States',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('credit_card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Credit card mockup inputs
  const [cardDetails, setCardDetails] = useState({
    number: '4532 •••• •••• 8821',
    expiry: '12/28',
    cvc: '382',
  });

  if (!isCheckoutOpen || cart.length === 0) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required for delivery';
    if (!formData.addressLine1.trim()) errs.addressLine1 = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief payment gateway authorization
    setTimeout(() => {
      placeOrder(formData, shippingMethod, paymentMethod);
      setIsSubmitting(false);
    }, 700);
  };

  const effectiveShipping = shippingMethod === 'express' ? shippingFee + 35 : shippingFee;
  const grandTotal = subtotal - discountAmount + effectiveShipping + tax;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 md:p-6">
      <div className="fixed inset-0" onClick={() => setIsCheckoutOpen(false)} />

      <div className="relative w-full max-w-4xl bg-white sm:rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 flex flex-col my-auto max-h-[96vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 bg-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1 text-stone-500 hover:text-stone-900 rounded cursor-pointer"
              aria-label="Back to store"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-serif text-xl sm:text-2xl text-stone-900">
              Checkout & Verification
            </h2>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout"
            className="p-1.5 text-stone-500 hover:text-stone-950 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 md:p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Form: Shipping & Payment */}
            <div className="lg:col-span-7 space-y-6">
              {/* Shipping Address */}
              <div>
                <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-900 mb-3 flex items-center gap-2">
                  <span>1. Shipping Information</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-stone-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-700 mt-0.5">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-stone-600 mb-1">Email (for receipt & tracking)</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                      />
                      {errors.email && <p className="text-[11px] text-rose-700 mt-0.5">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs text-stone-600 mb-1">Phone Number (courier SMS)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                      />
                      {errors.phone && <p className="text-[11px] text-rose-700 mt-0.5">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-600 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                    {errors.addressLine1 && <p className="text-[11px] text-rose-700 mt-0.5">{errors.addressLine1}</p>}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-stone-600 mb-1">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-600 mb-1">State / Province</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone-600 mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Speed Method */}
              <div className="pt-4 border-t border-stone-200">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-900 mb-3">
                  2. Delivery Speed
                </h3>
                <div className="space-y-2">
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-stone-900 bg-stone-50/80 shadow-xs'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${shippingMethod === 'standard' ? 'border-stone-900 bg-stone-900' : 'border-stone-400'}`}>
                        {shippingMethod === 'standard' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-stone-900">Standard White-Glove Delivery</div>
                        <div className="text-[11px] text-stone-500">Delivered within 3–5 business days</div>
                      </div>
                    </div>
                    <span className="font-mono tabular-nums text-xs font-medium text-stone-900">
                      {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-stone-900 bg-stone-50/80 shadow-xs'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${shippingMethod === 'express' ? 'border-stone-900 bg-stone-900' : 'border-stone-400'}`}>
                        {shippingMethod === 'express' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-stone-900">Priority Express Freight</div>
                        <div className="text-[11px] text-stone-500">Guaranteed 24–48hr courier dispatch</div>
                      </div>
                    </div>
                    <span className="font-mono tabular-nums text-xs font-medium text-stone-900">
                      +${35}
                    </span>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-4 border-t border-stone-200">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-900 mb-3">
                  3. Payment Method
                </h3>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'credit_card'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-xs font-semibold">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'apple_pay'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-semibold">Apple / Google Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span className="text-xs font-semibold">Cash on Delivery</span>
                  </button>
                </div>

                {/* Payment Sub-details */}
                {paymentMethod === 'credit_card' && (
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                    <div>
                      <label className="block text-[11px] text-stone-600 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-stone-600 mb-1">Expiration (MM/YY)</label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-stone-600 mb-1">Security Code (CVC)</label>
                        <input
                          type="password"
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                          className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                    <p className="font-semibold">Cash on Delivery Terms:</p>
                    <p className="text-amber-800 leading-relaxed font-light">
                      Payment is collected by the logistics courier in cash upon package handover. An SMS verification code will be sent to {formData.phone} prior to dispatch.
                    </p>
                  </div>
                )}

                {paymentMethod === 'apple_pay' && (
                  <div className="p-4 bg-stone-100 rounded-xl border border-stone-200 text-xs text-stone-700">
                    <p>Express digital wallet authorization will trigger immediately upon placing order.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Review */}
            <div className="lg:col-span-5 bg-stone-50 rounded-xl p-5 border border-stone-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-900 mb-3">
                  Order Summary ({cart.length} items)
                </h3>

                <div className="divide-y divide-stone-200/80 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded bg-stone-200 shrink-0"
                        />
                        <div className="truncate">
                          <div className="font-medium text-stone-900 truncate">{item.product.name}</div>
                          <div className="text-[11px] text-stone-500 font-mono">
                            Qty: {item.quantity} · {item.variant.name}
                          </div>
                        </div>
                      </div>
                      <span className="font-mono tabular-nums text-stone-900 font-medium shrink-0">
                        ${(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-stone-200 mt-4 space-y-2 text-xs text-stone-600">
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
                    <span>Delivery ({shippingMethod === 'express' ? 'Express Freight' : 'Standard'})</span>
                    <span className="font-mono tabular-nums text-stone-900">
                      {effectiveShipping === 0 ? 'Complimentary' : `$${effectiveShipping}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-mono tabular-nums text-stone-900">${tax.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-stone-300 text-base font-semibold text-stone-900">
                    <span>Total Due</span>
                    <span className="font-mono tabular-nums">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span>Authorizing Order...</span>
                  ) : (
                    <span>Place Order — ${grandTotal.toLocaleString()}</span>
                  )}
                </button>

                <p className="text-[11px] text-stone-400 text-center mt-3">
                  By confirming, you agree to Aura Studio Terms of Sale & 30-Day Guarantee.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
