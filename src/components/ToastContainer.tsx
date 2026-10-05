import React from 'react';
import { Check, Info, AlertCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 bg-stone-900 text-stone-100 text-xs px-4 py-3 rounded-xl shadow-xl border border-stone-800 transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-center gap-2">
            {toast.type === 'success' && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-stone-300 shrink-0" />}
            {toast.type === 'alert' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
            <span className="font-medium">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone-400 hover:text-white p-0.5"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
