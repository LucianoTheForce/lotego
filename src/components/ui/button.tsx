import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-lg transition-all duration-200",
      secondary: "bg-secondary text-foreground hover:bg-muted transition-all duration-200",
      outline: "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground transition-all duration-200",
      ghost: "hover:bg-accent hover:text-accent-foreground transition-all duration-200",
      link: "text-primary underline-offset-4 hover:underline transition-colors duration-200"
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-8",
      icon: "h-10 w-10"
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