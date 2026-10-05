import React from 'react';
import { X, Package, Clock, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderHistoryModal: React.FC = () => {
  const { orders, isOrdersOpen, setIsOrdersOpen, setLastCompletedOrder } = useCart();

  if (!isOrdersOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={() => setIsOrdersOpen(false)} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-stone-800" />
            <h2 className="font-serif text-2xl text-stone-900">Your Order History</h2>
          </div>
          <button
            onClick={() => setIsOrdersOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded cursor-pointer"
            aria-label="Close orders"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 max-h-[65vh] overflow-y-auto space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="text-stone-600 font-medium text-sm">No orders recorded yet</p>
              <p className="text-xs text-stone-400 mt-1">Orders placed during your session will appear here.</p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200/80 text-xs">
                  <div>
                    <span className="font-semibold text-stone-900">Order #{ord.orderNumber}</span>
                    <span className="mx-2 text-stone-400">·</span>
                    <span className="text-stone-500 font-mono">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      {ord.status}
                    </span>
                    <button
                      onClick={() => {
                        setLastCompletedOrder(ord);
                        setIsOrdersOpen(false);
                      }}
                      className="text-stone-700 hover:text-stone-950 underline font-medium cursor-pointer"
                    >
                      View Receipt
                    </button>
                  </div>
                </div>

                <div className="py-3 divide-y divide-stone-100 text-xs">
                  {ord.items.map((item) => (
                    <div key={item.id} className="py-1.5 flex justify-between">
                      <span className="text-stone-700">
                        {item.quantity}× {item.product.name} ({item.variant.name})
                      </span>
                      <span className="font-mono tabular-nums text-stone-900 font-medium">
                        ${(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs font-semibold text-stone-900">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums text-sm">${ord.total.toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
