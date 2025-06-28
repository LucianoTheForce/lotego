'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsClient } from '@/hooks/useIsClient'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  delay?: number
  duration?: number
  className?: string
}

export function ScrollReveal({ 
  children, 
  direction = 'up', 
  distance = 50,
  delay = 0,
  duration = 1,
  className = ''
}: ScrollRevealProps) {
  const isClient = useIsClient()
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isClient || !elementRef.current) return

    const element = elementRef.current

    const directionMap = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { y: 0, x: distance },
      right: { y: 0, x: -distance }
    }

    const initialPos = directionMap[direction]

    gsap.fromTo(element,
      {
        opacity: 0,
        x: initialPos.x,
        y: initialPos.y,
        scale: 0.95
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [isClient, direction, distance, delay, duration])

  if (!isClient) {
    return (
      <div className={className} suppressHydrationWarning>
        {children}
      </div>
    )
  }

  return (
    <div ref={elementRef} className={`will-change-transform ${className}`} suppressHydrationWarning>
      {children}
    </div>
  )
}

interface ParallaxScrollProps {
  children: React.ReactNode
  speed?: number
  direction?: 'vertical' | 'horizontal'
  className?: string
}

export function ParallaxScroll({ 
  children, 
  speed = 0.5, 
  direction = 'vertical',
  className = ''
}: ParallaxScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    gsap.to(element, {
      [direction === 'vertical' ? 'yPercent' : 'xPercent']: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [speed, direction])

  return (
    <div ref={elementRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}

interface ScrollProgressProps {
  className?: string
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!progressRef.current) return

    const progress = progressRef.current

    gsap.to(progress, {
      scaleX: 1,
      transformOrigin: 'left',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === document.body) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div 
      ref={progressRef}
      className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-600 to-purple-600 z-50 scale-x-0 ${className}`}
      style={{ width: '100%' }}
    />
  )
}

interface ScrollSnapProps {
  children: React.ReactNode
  className?: string
}

export function ScrollSnap({ children, className = '' }: ScrollSnapProps) {
  return (
    <div className={`scroll-smooth snap-y snap-mandatory ${className}`}>
      {children}
    </div>
  )
}

interface ScrollSnapSectionProps {
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
}

export function ScrollSnapSection({ 
  children, 
  align = 'start',
  className = ''
}: ScrollSnapSectionProps) {
  const alignClass = {
    start: 'snap-start',
    center: 'snap-center',
    end: 'snap-end'
  }

  return (
    <div className={`min-h-screen ${alignClass[align]} ${className}`}>
      {children}
    </div>
  )
}

interface PinElementProps {
  children: React.ReactNode
  pinSpacing?: boolean
  className?: string
}

export function PinElement({ 
  children, 
  pinSpacing = true,
  className = ''
}: PinElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    ScrollTrigger.create({
      trigger: element,
      start: 'top top',
      end: 'bottom bottom',
      pin: true,
      pinSpacing
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [pinSpacing])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

interface ScrollTimelineProps {
  children: React.ReactNode[]
  stagger?: number
  className?: string
}

export function ScrollTimeline({ 
  children, 
  stagger = 0.2,
  className = ''
}: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const elements = container.children

    gsap.fromTo(elements,
      {
        opacity: 0,
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [stagger])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

interface CounterAnimationProps {
  from: number
  to: number
  duration?: number
  suffix?: string
  className?: string
}

export function CounterAnimation({ 
  from, 
  to, 
  duration = 2,
  suffix = '',
  className = ''
}: CounterAnimationProps) {
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!counterRef.current) return

    const counter = counterRef.current
    const obj = { value: from }

    gsap.to(obj, {
      value: to,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        counter.textContent = Math.round(obj.value).toLocaleString('pt-BR') + suffix
      },
      scrollTrigger: {
        trigger: counter,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === counter) {
          trigger.kill()
        }
      })
    }
  }, [from, to, duration, suffix])

  return <span ref={counterRef} className={className}>{from}{suffix}</span>
}