import React from 'react';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderSuccessModal: React.FC = () => {
  const { lastCompletedOrder, setLastCompletedOrder } = useCart();

  if (!lastCompletedOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={() => setLastCompletedOrder(null)} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 p-6 sm:p-8">
        <button
          onClick={() => setLastCompletedOrder(null)}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded cursor-pointer"
          aria-label="Close receipt"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon & Header */}
        <div className="text-center pb-6 border-b border-stone-100">
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-800">
            <CheckCircle2 className="w-7 h-7 stroke-[2]" />
          </div>
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald-800 mb-1">
            Order Confirmed — Preparing Shipment
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900">
            Thank you, {lastCompletedOrder.shippingAddress.fullName.split(' ')[0]}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Order Reference: <strong className="font-mono text-stone-800">{lastCompletedOrder.orderNumber}</strong>
          </p>
        </div>

        {/* Status Tracker */}
        <div className="py-6 border-b border-stone-100">
          <div className="flex items-center justify-between text-xs text-stone-600 mb-3 font-medium">
            <span className="text-emerald-800 font-semibold">1. Confirmed</span>
            <span className="text-stone-400">2. Artisan Preparation</span>
            <span className="text-stone-400">3. In Transit</span>
            <span className="text-stone-400">4. Delivered</span>
          </div>
          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-700 w-1/4 rounded-full" />
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2">
            <span>Estimated delivery window: {lastCompletedOrder.estimatedDelivery}</span>
            <span className="font-mono">{new Date(lastCompletedOrder.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Itemized Receipt Summary */}
        <div className="py-5 space-y-3">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-stone-700">
            Receipt Summary
          </h3>
          <div className="divide-y divide-stone-100 max-h-48 overflow-y-auto">
            {lastCompletedOrder.items.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-medium text-stone-900">{item.product.name}</div>
                  <div className="text-[11px] text-stone-500 font-mono">
                    Qty: {item.quantity} · {item.variant.name}
                  </div>
                </div>
                <span className="font-mono tabular-nums text-stone-900 font-medium">
                  ${(item.unitPrice * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 text-xs space-y-1 text-stone-600">
            <div className="flex justify-between">
              <span>Delivery Address</span>
              <span className="text-stone-800 font-mono text-right truncate max-w-xs">
                {lastCompletedOrder.shippingAddress.addressLine1}, {lastCompletedOrder.shippingAddress.city}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Payment Mode</span>
              <span className="text-stone-800 capitalize font-medium">
                {lastCompletedOrder.paymentMethod.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-stone-200 text-sm font-semibold text-stone-900">
              <span>Total Paid</span>
              <span className="font-mono tabular-nums">${lastCompletedOrder.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => setLastCompletedOrder(null)}
            className="w-full sm:flex-1 py-3 px-4 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer text-center"
          >
            Continue Browsing
          </button>
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto py-3 px-4 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
