'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface NavigatorWithDeviceMemory extends Navigator {
  deviceMemory?: number
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Performance monitoring and optimization
export function usePerformanceOptimizer() {
  const frameRateRef = useRef(60)
  const lastFrameTimeRef = useRef(performance.now())

  useEffect(() => {
    // Monitor frame rate
    const monitorFrameRate = () => {
      const now = performance.now()
      const delta = now - lastFrameTimeRef.current
      const currentFPS = 1000 / delta
      
      frameRateRef.current = Math.round(currentFPS * 0.1 + frameRateRef.current * 0.9)
      lastFrameTimeRef.current = now

      // Reduce animation quality if performance is poor
      if (frameRateRef.current < 30) {
        gsap.globalTimeline.timeScale(0.5) // Slow down animations
        document.documentElement.style.setProperty('--animation-duration', '0.3s')
      } else if (frameRateRef.current > 50) {
        gsap.globalTimeline.timeScale(1)
        document.documentElement.style.setProperty('--animation-duration', '0.5s')
      }

      requestAnimationFrame(monitorFrameRate)
    }

    monitorFrameRate()

    // Prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReducedMotion.matches) {
      gsap.globalTimeline.timeScale(0.1)
      ScrollTrigger.batch('.animate-on-scroll', {
        onEnter: () => {}, // Disable scroll animations
        onLeave: () => {},
        onEnterBack: () => {},
        onLeaveBack: () => {}
      })
    }

    return () => {
      gsap.globalTimeline.timeScale(1)
    }
  }, [])

  return {
    fps: frameRateRef.current,
    isPerformant: frameRateRef.current > 45
  }
}

// Intersection Observer optimization for animations
export function useOptimizedIntersection(
  callback: (isVisible: boolean) => void,
  options: IntersectionObserverInit = {}
) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        callback(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [callback, options])

  return elementRef
}

// Debounced resize handler for responsive animations
export function useOptimizedResize(callback: () => void, delay: number = 250) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(callback, delay)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [callback, delay])
}

// Memory-efficient animation cleanup
export function useAnimationCleanup() {
  const animationsRef = useRef<gsap.core.Timeline[]>([])

  const addAnimation = (animation: gsap.core.Timeline) => {
    animationsRef.current.push(animation)
  }

  const cleanup = () => {
    animationsRef.current.forEach(animation => {
      animation.kill()
    })
    animationsRef.current = []
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }

  useEffect(() => {
    return cleanup
  }, [])

  return { addAnimation, cleanup }
}

// Optimized GSAP settings
export function setupPerformanceOptimizations() {
  if (typeof window === 'undefined') return

  // Enable hardware acceleration
  gsap.set('*', { force3D: false, transformPerspective: 1000 })

  // Optimize ScrollTrigger
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize'
  })

  // Batch DOM updates
  ScrollTrigger.batch('.batch-animate', {
    onEnter: elements => {
      gsap.fromTo(elements, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power2.out',
          overwrite: 'auto'
        }
      )
    },
    batchMax: 10,
    interval: 0.1
  })

  // Disable animations on low-end devices
  const isLowEndDevice = () => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl')
    const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info')
    const renderer = debugInfo ? gl?.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : null
    
    return (
      navigator.hardwareConcurrency <= 2 ||
      ((navigator as NavigatorWithDeviceMemory).deviceMemory || 0) <= 2 ||
      renderer?.includes('Mali') ||
      renderer?.includes('Adreno 3') ||
      renderer?.includes('PowerVR')
    )
  }

  if (isLowEndDevice()) {
    gsap.globalTimeline.timeScale(0.7)
    ScrollTrigger.config({ limitCallbacks: true })
  }
}

// Performance monitoring component
export function PerformanceMonitor() {
  const { fps, isPerformant } = usePerformanceOptimizer()

  useEffect(() => {
    setupPerformanceOptimizations()
  }, [])

  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 right-4 bg-black/80 text-white px-3 py-2 rounded text-xs font-mono z-50">
        FPS: {fps} {isPerformant ? '✅' : '⚠️'}
      </div>
    )
  }

  return null
}