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
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden"
    
    const variants = {
      default: "bg-gray-900 text-white hover:bg-gray-800",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      outline: "border-2 border-gray-200 bg-transparent hover:bg-gray-50",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      link: "text-gray-600 underline hover:text-gray-900",
      gradient: "bg-rose-500 text-white hover:bg-rose-600",
      premium: "bg-gray-900 text-white hover:bg-gray-800"
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