import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'default' | 'lg'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-gray-900 text-white",
      secondary: "bg-gray-100 text-gray-900",
      success: "bg-green-600 text-white",
      warning: "bg-yellow-500 text-white",
      error: "bg-red-600 text-white",
      outline: "border border-gray-200 bg-transparent text-gray-900"
    }
    
    const sizes = {
      sm: "px-2 py-1 text-xs",
      default: "px-3 py-1 text-sm",
      lg: "px-4 py-2 text-base"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-semibold transition-colors",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }