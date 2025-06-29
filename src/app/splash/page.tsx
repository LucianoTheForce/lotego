'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Fade } from '@/components/animations/mobile-animations'

export default function SplashPage() {
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        router.push('/')
      }, 500)
    }, 2500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-rose-500 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-700" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/15 rounded-full animate-pulse delay-1000" />
      </div>

      <Fade isVisible={isVisible} duration={800}>
        <div className="text-center z-10">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-7xl font-black text-white tracking-tight">
              LotGo
            </h1>
            <p className="text-white/80 text-lg font-medium mt-2">
              Encontre seu terreno ideal
            </p>
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </Fade>
    </div>
  )
}