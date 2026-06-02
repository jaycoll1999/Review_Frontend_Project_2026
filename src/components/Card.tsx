import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  title?: string;
  subtitle?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, title, subtitle, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "bg-white rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-500 group overflow-hidden",
          className
        )}
        {...props}
      >
        {(title || subtitle) && (
          <div className="px-8 py-6 border-b border-slate-50">
            {title && <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none">{title}</h3>}
            {subtitle && <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{subtitle}</p>}
          </div>
        )}
        <div className="p-8 h-full">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
