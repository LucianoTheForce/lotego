'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Set initial state for page enter animation
    gsap.set(container, {
      opacity: 0,
      y: 20,
      scale: 0.98
    })

    // Animate page enter
    const tl = gsap.timeline()
    
    tl.to(container, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out'
    })

    return () => {
      tl.kill()
    }
  }, [pathname])

  return (
    <div 
      ref={containerRef}
      className="will-change-transform"
    >
      {children}
    </div>
  )
}

export function usePageTransition() {
  const transitionOut = (callback: () => void) => {
    const tl = gsap.timeline()
    
    tl.to(document.body, {
      opacity: 0,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: callback
    })
  }

  const transitionIn = () => {
    gsap.fromTo(document.body, 
      {
        opacity: 0,
        scale: 1.02
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      }
    )
  }

  return { transitionOut, transitionIn }
}