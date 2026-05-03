import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Card = ({ children, className = "", title, subtitle }: CardProps) => {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="px-8 py-6 border-b border-slate-50">
          {title && <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>}
          {subtitle && <p className="text-sm font-medium text-slate-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-8">
        {children}
      </div>
    </div>
  );
};
