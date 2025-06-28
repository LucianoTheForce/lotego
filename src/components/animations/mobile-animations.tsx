'use client'

import { useEffect, useRef, useState } from 'react'
import { useIsClient } from '@/hooks/useIsClient'

// Smooth slide up animation for mobile cards
interface SlideUpProps {
  children: React.ReactNode
  isVisible?: boolean
  delay?: number
  duration?: number
  className?: string
}

export function SlideUp({ 
  children, 
  isVisible = true, 
  delay = 0, 
  duration = 300,
  className = '' 
}: SlideUpProps) {
  const isClient = useIsClient()
  const [shouldRender, setShouldRender] = useState(isVisible)
  
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
    } else {
      const timer = setTimeout(() => setShouldRender(false), duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration])

  if (!isClient || !shouldRender) {
    return null
  }

  return (
    <div
      className={`
        transition-all ease-out
        ${isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-full opacity-0'
        }
        ${className}
      `}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

// Fade and scale animation for cards
interface FadeScaleProps {
  children: React.ReactNode
  isVisible?: boolean
  delay?: number
  duration?: number
  className?: string
}

export function FadeScale({ 
  children, 
  isVisible = true, 
  delay = 0, 
  duration = 200,
  className = '' 
}: FadeScaleProps) {
  const isClient = useIsClient()

  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      className={`
        transition-all ease-out transform
        ${isVisible 
          ? 'scale-100 opacity-100' 
          : 'scale-95 opacity-0'
        }
        ${className}
      `}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

// Staggered list animation
interface StaggeredListProps {
  children: React.ReactNode[]
  isVisible?: boolean
  staggerDelay?: number
  itemDuration?: number
  className?: string
}

export function StaggeredList({ 
  children, 
  isVisible = true, 
  staggerDelay = 50,
  itemDuration = 200,
  className = '' 
}: StaggeredListProps) {
  const isClient = useIsClient()

  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`
            transition-all ease-out transform
            ${isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-4 opacity-0'
            }
          `}
          style={{
            transitionDuration: `${itemDuration}ms`,
            transitionDelay: `${isVisible ? index * staggerDelay : 0}ms`
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// Smooth height transition for collapsible content
interface CollapseProps {
  children: React.ReactNode
  isOpen?: boolean
  duration?: number
  className?: string
}

export function Collapse({ 
  children, 
  isOpen = false, 
  duration = 300,
  className = '' 
}: CollapseProps) {
  const isClient = useIsClient()
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0)

  useEffect(() => {
    if (!isClient || !contentRef.current) return

    if (isOpen) {
      const scrollHeight = contentRef.current.scrollHeight
      setHeight(scrollHeight)
      
      // After animation, remove height constraint
      const timer = setTimeout(() => setHeight(undefined), duration)
      return () => clearTimeout(timer)
    } else {
      setHeight(contentRef.current.scrollHeight)
      
      // Force reflow then collapse
      requestAnimationFrame(() => setHeight(0))
    }
  }, [isOpen, isClient, duration])

  if (!isClient) {
    return isOpen ? <div className={className}>{children}</div> : null
  }

  return (
    <div
      className={`overflow-hidden transition-all ease-out ${className}`}
      style={{
        height: height,
        transitionDuration: `${duration}ms`
      }}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  )
}

// Smooth slide animation for carousels
interface SlideCarouselProps {
  children: React.ReactNode[]
  currentIndex?: number
  direction?: 'horizontal' | 'vertical'
  duration?: number
  className?: string
}

export function SlideCarousel({ 
  children, 
  currentIndex = 0, 
  direction = 'horizontal',
  duration = 300,
  className = '' 
}: SlideCarouselProps) {
  const isClient = useIsClient()

  if (!isClient) {
    return <div className={className}>{children[currentIndex]}</div>
  }

  const translateProperty = direction === 'horizontal' ? 'translateX' : 'translateY'
  const translateValue = direction === 'horizontal' 
    ? `-${currentIndex * 100}%` 
    : `-${currentIndex * 100}%`

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`flex ${direction === 'horizontal' ? 'flex-row' : 'flex-col'} transition-transform ease-out`}
        style={{
          transform: `${translateProperty}(${translateValue})`,
          transitionDuration: `${duration}ms`
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className={`
              ${direction === 'horizontal' ? 'w-full' : 'h-full'} 
              flex-shrink-0
            `}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

// Bounce animation for interactive elements
interface BounceProps {
  children: React.ReactNode
  isActive?: boolean
  scale?: number
  duration?: number
  className?: string
}

export function Bounce({ 
  children, 
  isActive = false, 
  scale = 1.05,
  duration = 150,
  className = '' 
}: BounceProps) {
  const isClient = useIsClient()

  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      className={`transition-transform ease-out ${className}`}
      style={{
        transform: isActive ? `scale(${scale})` : 'scale(1)',
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  )
}

// Smooth opacity transition
interface FadeProps {
  children: React.ReactNode
  isVisible?: boolean
  duration?: number
  delay?: number
  className?: string
}

export function Fade({ 
  children, 
  isVisible = true, 
  duration = 200,
  delay = 0,
  className = '' 
}: FadeProps) {
  const isClient = useIsClient()

  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      className={`transition-opacity ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

// Pull to refresh animation
interface PullToRefreshProps {
  children: React.ReactNode
  onRefresh?: () => void
  threshold?: number
  className?: string
}

export function PullToRefresh({ 
  children, 
  onRefresh,
  threshold = 80,
  className = '' 
}: PullToRefreshProps) {
  const isClient = useIsClient()
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [startY, setStartY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      setStartY(e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === 0 || containerRef.current?.scrollTop !== 0) return
    
    const currentY = e.touches[0].clientY
    const distance = Math.max(0, currentY - startY)
    
    if (distance > 0) {
      e.preventDefault()
      setPullDistance(Math.min(distance * 0.5, threshold * 1.5))
    }
  }

  const handleTouchEnd = () => {
    if (pullDistance >= threshold && onRefresh) {
      setIsRefreshing(true)
      onRefresh()
      
      // Reset after 2 seconds (or when parent resets)
      setTimeout(() => {
        setIsRefreshing(false)
        setPullDistance(0)
      }, 2000)
    } else {
      setPullDistance(0)
    }
    
    setStartY(0)
  }

  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center transition-all duration-200"
        style={{
          height: `${pullDistance}px`,
          opacity: pullDistance > 0 ? 1 : 0
        }}
      >
        <div className={`
          w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center
          ${isRefreshing ? 'animate-spin border-t-blue-500' : ''}
          ${pullDistance >= threshold ? 'border-green-500 bg-green-50' : ''}
        `}>
          {isRefreshing ? (
            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : pullDistance >= threshold ? (
            <span className="text-green-500 text-xs">↓</span>
          ) : (
            <span className="text-gray-400 text-xs">↓</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200"
        style={{
          transform: `translateY(${pullDistance}px)`
        }}
      >
        {children}
      </div>
    </div>
  )
}