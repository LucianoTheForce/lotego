'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SmoothScrollingProviderProps {
  children: React.ReactNode
}

export function SmoothScrollingProvider({ children }: SmoothScrollingProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Add scroll progress indicator
    const scrollIndicator = document.createElement('div')
    scrollIndicator.className = 'scroll-indicator'
    scrollIndicator.style.width = '0%'
    document.body.appendChild(scrollIndicator)

    lenis.on('scroll', ({ progress }: { progress: number }) => {
      scrollIndicator.style.width = `${progress * 100}%`
    })

    // Setup global GSAP defaults
    gsap.defaults({
      duration: 0.8,
      ease: 'power2.out',
    })

    // Add class to html for Lenis
    document.documentElement.classList.add('lenis')

    return () => {
      lenis.destroy()
      document.documentElement.classList.remove('lenis')
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
      const indicator = document.querySelector('.scroll-indicator')
      if (indicator) {
        indicator.remove()
      }
    }
  }, [])

  return <>{children}</>
}