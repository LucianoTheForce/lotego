'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const spinnerRef = useRef<HTMLDivElement>(null)

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  useEffect(() => {
    if (!spinnerRef.current) return

    gsap.to(spinnerRef.current, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: 'none'
    })
  }, [])

  return (
    <div 
      ref={spinnerRef}
      className={cn(
        'border-2 border-primary-200 border-t-primary-600 rounded-full',
        sizeClasses[size],
        className
      )}
    />
  )
}

interface LoadingDotsProps {
  className?: string
}

export function LoadingDots({ className }: LoadingDotsProps) {
  const dotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dotsRef.current) return

    const dots = dotsRef.current.children

    gsap.fromTo(dots, 
      { scale: 0.8, opacity: 0.3 },
      {
        scale: 1.2,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      }
    )
  }, [])

  return (
    <div ref={dotsRef} className={cn('flex items-center space-x-1', className)}>
      <div className="w-2 h-2 bg-primary-600 rounded-full" />
      <div className="w-2 h-2 bg-primary-600 rounded-full" />
      <div className="w-2 h-2 bg-primary-600 rounded-full" />
    </div>
  )
}

interface LoadingPulseProps {
  className?: string
}

export function LoadingPulse({ className }: LoadingPulseProps) {
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pulseRef.current) return

    gsap.to(pulseRef.current, {
      scale: 1.1,
      opacity: 0.7,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    })
  }, [])

  return (
    <div 
      ref={pulseRef}
      className={cn(
        'w-4 h-4 bg-primary-600 rounded-full',
        className
      )}
    />
  )
}

interface SkeletonProps {
  className?: string
  lines?: number
}

export function Skeleton({ className, lines = 1 }: SkeletonProps) {
  const skeletonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!skeletonRef.current) return

    const elements = skeletonRef.current.children

    gsap.fromTo(elements,
      { opacity: 0.3 },
      {
        opacity: 0.8,
        duration: 1.5,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      }
    )
  }, [])

  return (
    <div ref={skeletonRef} className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i}
          className="h-4 bg-neutral-200 rounded-md animate-shimmer"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  )
}

interface PropertyCardSkeletonProps {
  className?: string
}

export function PropertyCardSkeleton({ className }: PropertyCardSkeletonProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const elements = cardRef.current.querySelectorAll('.skeleton-element')

    gsap.fromTo(elements,
      { opacity: 0.3 },
      {
        opacity: 0.8,
        duration: 1.5,
        stagger: 0.05,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      }
    )
  }, [])

  return (
    <div ref={cardRef} className={cn('card-modern p-6', className)}>
      <div className="skeleton-element h-6 bg-neutral-200 rounded-md mb-3 w-3/4" />
      <div className="skeleton-element h-4 bg-neutral-200 rounded-md mb-2 w-1/2" />
      <div className="skeleton-element h-4 bg-neutral-200 rounded-md mb-4 w-full" />
      <div className="skeleton-element h-4 bg-neutral-200 rounded-md mb-4 w-2/3" />
      <div className="flex justify-between items-center">
        <div className="skeleton-element h-6 bg-neutral-200 rounded-md w-24" />
        <div className="skeleton-element h-4 bg-neutral-200 rounded-md w-16" />
      </div>
      <div className="skeleton-element h-8 bg-neutral-200 rounded-md mt-4 w-full" />
    </div>
  )
}

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
  className?: string
}

export function LoadingOverlay({ isVisible, message = 'Carregando...', className }: LoadingOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!overlayRef.current) return

    if (isVisible) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.3,
        ease: 'power2.out'
      })
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }, [isVisible])

  return (
    <div 
      ref={overlayRef}
      className={cn(
        'fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center opacity-0 pointer-events-none',
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-neutral-600 font-medium">{message}</p>
      </div>
    </div>
  )
}