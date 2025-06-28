'use client'

import { ReactNode } from 'react'
import { ClientOnly } from '@/components/ui/client-only'

interface AnimationWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
}

export function AnimationWrapper({ children, fallback, className }: AnimationWrapperProps) {
  return (
    <ClientOnly fallback={fallback}>
      <div className={className} suppressHydrationWarning>
        {children}
      </div>
    </ClientOnly>
  )
}