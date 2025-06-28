import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'gradient' | 'premium'
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 will-change-transform relative overflow-hidden group"
    
    const variants = {
      default: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
      outline: "border-2 border-slate-200 bg-transparent hover:bg-slate-50 hover:border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
      ghost: "hover:bg-slate-100 hover:text-slate-900 hover:-translate-y-0.5 active:translate-y-0",
      link: "text-slate-600 underline-offset-4 hover:underline hover:text-slate-900",
      gradient: "bg-gradient-to-r from-violet-600 to-emerald-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:from-violet-700 hover:to-emerald-600 active:translate-y-0",
      premium: "bg-gradient-to-r from-slate-900 via-violet-900 to-slate-900 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 border border-violet-500/20 active:translate-y-0"
    }
    
    const sizes = {
      default: "h-11 px-6 py-2 text-sm",
      sm: "h-9 px-4 text-sm",
      lg: "h-12 px-8 text-base",
      xl: "h-14 px-10 text-lg",
      icon: "h-11 w-11"
    }

    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }