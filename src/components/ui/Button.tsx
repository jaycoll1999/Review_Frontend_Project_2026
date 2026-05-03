import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "gradient";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm active:scale-[0.98]",
      outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 active:scale-[0.98]",
      ghost: "hover:bg-slate-100 text-slate-600 hover:text-slate-900 active:scale-[0.98]",
      gradient: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 shadow-md shadow-purple-200 active:scale-[0.98]",
    };

    const sizes = {
      default: "h-11 px-6 py-2 text-sm font-semibold",
      sm: "h-9 px-4 text-xs font-semibold",
      lg: "h-13 px-8 text-base font-bold",
      icon: "h-11 w-11",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
