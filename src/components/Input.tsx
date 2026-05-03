import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = "", ...props }: InputProps) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</label>}
      <input 
        suppressHydrationWarning
        className={`w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-900 placeholder:text-slate-400 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};
