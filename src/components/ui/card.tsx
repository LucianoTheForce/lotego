import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'elevated' | 'glass' | 'gradient'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: "rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
    elevated: "rounded-xl bg-white text-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100",
    glass: "rounded-xl bg-white/80 backdrop-blur-md text-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20",
    gradient: "rounded-xl bg-gradient-to-br from-white to-slate-50 text-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200"
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        "will-change-transform group cursor-pointer",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6 pb-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold leading-tight tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-600 leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-2", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }