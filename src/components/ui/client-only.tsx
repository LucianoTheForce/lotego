'use client'

import { ReactNode } from 'react'
import { useIsClient } from '@/hooks/useIsClient'

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const isClient = useIsClient()

  if (!isClient) {
    return <>{fallback}</>
  }

  return <>{children}</>
}