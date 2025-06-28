'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'
import { useIsClient } from '@/hooks/useIsClient'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedElementProps {
  children: React.ReactNode
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' | 'reveal'
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function AnimatedElement({ 
  children, 
  animation = 'fadeUp', 
  delay = 0, 
  duration = 0.8,
  className = '',
  once = true
}: AnimatedElementProps) {
  const isClient = useIsClient()
  const elementRef = useRef<HTMLDivElement>(null)
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: once,
  })

  // Combine refs
  const setRefs = (node: HTMLDivElement) => {
    elementRef.current = node
    inViewRef(node)
  }

  useEffect(() => {
    if (!isClient || !elementRef.current || !inView) return

    const element = elementRef.current

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: animation === 'fadeUp' ? 50 : 0,
      x: animation === 'slideLeft' ? -50 : animation === 'slideRight' ? 50 : 0,
      scale: animation === 'scale' ? 0.8 : 1,
      rotation: animation === 'rotate' ? -10 : 0,
      clipPath: animation === 'reveal' ? 'inset(100% 0 0 0)' : 'none',
    })

    // Animate to final state
    const tl = gsap.timeline()
    
    tl.to(element, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      clipPath: animation === 'reveal' ? 'inset(0% 0 0 0)' : 'none',
      duration,
      delay,
      ease: 'power3.out',
    })

    return () => {
      tl.kill()
    }
  }, [isClient, inView, animation, delay, duration])

  // Render without animations on server to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className={className} suppressHydrationWarning>
        {children}
      </div>
    )
  }

  return (
    <div ref={setRefs} className={`will-change-transform ${className}`} suppressHydrationWarning>
      {children}
    </div>
  )
}

interface ParallaxElementProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxElement({ children, speed = 0.5, className = '' }: ParallaxElementProps) {
  const isClient = useIsClient()
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isClient || !elementRef.current) return

    const element = elementRef.current

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })

    tl.fromTo(element, 
      { y: -100 * speed },
      { y: 100 * speed, ease: 'none' }
    )

    return () => {
      tl.kill()
    }
  }, [isClient, speed])

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

interface MagneticElementProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function MagneticElement({ children, strength = 0.3, className = '' }: MagneticElementProps) {
  const isClient = useIsClient()
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isClient || !elementRef.current) return

    const element = elementRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isClient, strength])

  if (!isClient) {
    return (
      <div className={`cursor-pointer ${className}`} suppressHydrationWarning>
        {children}
      </div>
    )
  }

  return (
    <div ref={elementRef} className={`cursor-pointer will-change-transform ${className}`} suppressHydrationWarning>
      {children}
    </div>
  )
}

interface StaggeredAnimationProps {
  children: React.ReactNode[]
  delay?: number
  stagger?: number
  animation?: 'fadeUp' | 'fadeIn' | 'scale'
  className?: string
}

export function StaggeredAnimation({ 
  children, 
  delay = 0, 
  stagger = 0.1, 
  animation = 'fadeUp',
  className = ''
}: StaggeredAnimationProps) {
  const isClient = useIsClient()
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const setRefs = (node: HTMLDivElement) => {
    containerRef.current = node
    inViewRef(node)
  }

  useEffect(() => {
    if (!isClient || !containerRef.current || !inView) return

    const elements = containerRef.current.children

    // Set initial state
    gsap.set(elements, {
      opacity: 0,
      y: animation === 'fadeUp' ? 30 : 0,
      scale: animation === 'scale' ? 0.8 : 1,
    })

    // Animate with stagger
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      delay,
      stagger,
      ease: 'power2.out',
    })
  }, [isClient, inView, delay, stagger, animation])

  if (!isClient) {
    return (
      <div className={className} suppressHydrationWarning>
        {children}
      </div>
    )
  }

  return (
    <div ref={setRefs} className={className} suppressHydrationWarning>
      {children}
    </div>
  )
}

interface TextRevealProps {
  children: string
  delay?: number
  className?: string
}

export function TextReveal({ children, delay = 0, className = '' }: TextRevealProps) {
  const isClient = useIsClient()
  const textRef = useRef<HTMLDivElement>(null)
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const setRefs = (node: HTMLDivElement) => {
    textRef.current = node
    inViewRef(node)
  }

  useEffect(() => {
    if (!isClient || !textRef.current || !inView) return

    const text = textRef.current
    const words = children.split(' ')
    
    // Wrap each word in a span
    text.innerHTML = words
      .map(word => `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`)
      .join(' ')

    const wordSpans = text.querySelectorAll('span span')

    // Set initial state
    gsap.set(wordSpans, {
      y: '100%',
      opacity: 0,
    })

    // Animate words
    gsap.to(wordSpans, {
      y: '0%',
      opacity: 1,
      duration: 0.8,
      delay,
      stagger: 0.05,
      ease: 'power3.out',
    })
  }, [isClient, inView, children, delay])

  if (!isClient) {
    return (
      <div className={className} suppressHydrationWarning>
        {children}
      </div>
    )
  }

  return (
    <div ref={setRefs} className={className} suppressHydrationWarning>
      {children}
    </div>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  amplitude?: number
  duration?: number
  delay?: number
  className?: string
}

export function FloatingElement({ 
  children, 
  amplitude = 10, 
  duration = 3, 
  delay = 0,
  className = ''
}: FloatingElementProps) {
  const isClient = useIsClient()
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isClient || !elementRef.current) return

    const element = elementRef.current

    gsap.to(element, {
      y: amplitude,
      duration: duration / 2,
      delay,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    gsap.to(element, {
      rotation: 2,
      duration: duration,
      delay,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }, [isClient, amplitude, duration, delay])

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