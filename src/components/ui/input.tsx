import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'default' | 'modern' | 'minimal'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', ...props }, ref) => {
    const variants = {
      default: "flex h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 hover:border-slate-300",
      modern: "flex h-14 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-6 py-4 text-base font-medium placeholder:text-slate-500 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 hover:bg-slate-100 hover:border-slate-300",
      minimal: "flex h-11 w-full border-b-2 border-slate-200 bg-transparent px-0 py-3 text-sm font-medium placeholder:text-slate-400 focus:border-violet-500 focus:outline-none transition-all duration-300 rounded-none"
    }
    
    return (
      <input
        type={type}
        className={cn(
          "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }