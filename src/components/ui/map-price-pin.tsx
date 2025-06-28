'use client'

import { useState } from 'react'

interface MapPricePinProps {
  price: number
  isSelected?: boolean
  isHovered?: boolean
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  onHover?: () => void
  onLeave?: () => void
  className?: string
}

export function MapPricePin({
  price,
  isSelected = false,
  isHovered = false,
  size = 'medium',
  onClick,
  onHover,
  onLeave,
  className = ''
}: MapPricePinProps) {
  const [isLocalHovered, setIsLocalHovered] = useState(false)
  
  const isActive = isSelected || isHovered || isLocalHovered

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
    large: 'px-4 py-2 text-base'
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `R$ ${(price / 1000000).toFixed(1)}M`
    } else if (price >= 1000) {
      return `R$ ${(price / 1000).toFixed(0)}k`
    } else {
      return `R$ ${price}`
    }
  }

  return (
    <div
      className={`
        relative cursor-pointer transition-all duration-200 transform
        ${isActive ? 'scale-110 z-50' : 'z-10'}
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={() => {
        setIsLocalHovered(true)
        onHover?.()
      }}
      onMouseLeave={() => {
        setIsLocalHovered(false)
        onLeave?.()
      }}
    >
      {/* Main Pin Body */}
      <div
        className={`
          ${sizeClasses[size]}
          font-semibold rounded-full shadow-lg border-2
          transition-all duration-200
          ${isActive 
            ? 'bg-gray-900 text-white border-gray-900 shadow-xl' 
            : 'bg-white text-gray-900 border-white hover:border-gray-200'
          }
        `}
      >
        {formatPrice(price)}
      </div>

      {/* Pin Tail/Arrow */}
      <div 
        className={`
          absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1
          transition-all duration-200
        `}
      >
        <div
          className={`
            w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px]
            border-l-transparent border-r-transparent
            ${isActive ? 'border-t-gray-900' : 'border-t-white'}
          `}
        />
      </div>

      {/* Hover/Active Ring */}
      {isActive && (
        <div className="absolute inset-0 -m-1 rounded-full border-2 border-rose-500 animate-pulse opacity-50" />
      )}
    </div>
  )
}

// Cluster pin for multiple properties
interface MapClusterPinProps {
  count: number
  isSelected?: boolean
  onClick?: () => void
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function MapClusterPin({
  count,
  isSelected = false,
  onClick,
  size = 'medium',
  className = ''
}: MapClusterPinProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const isActive = isSelected || isHovered

  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base'
  }

  return (
    <div
      className={`
        cursor-pointer transition-all duration-200 transform
        ${isActive ? 'scale-110 z-50' : 'z-10'}
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cluster Circle */}
      <div
        className={`
          ${sizeClasses[size]}
          rounded-full shadow-lg border-2 flex items-center justify-center
          font-bold transition-all duration-200
          ${isActive 
            ? 'bg-rose-500 text-white border-rose-500 shadow-xl' 
            : 'bg-white text-gray-900 border-gray-200 hover:border-rose-300'
          }
        `}
      >
        {count}
      </div>

      {/* Active Ring */}
      {isActive && (
        <div className="absolute inset-0 -m-1 rounded-full border-2 border-rose-300 animate-pulse opacity-50" />
      )}
    </div>
  )
}

// Area selection pin for drawing/selecting areas
interface MapAreaPinProps {
  label?: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function MapAreaPin({
  label = '📍',
  isActive = false,
  onClick,
  className = ''
}: MapAreaPinProps) {
  return (
    <div
      className={`
        cursor-pointer transition-all duration-200 transform
        ${isActive ? 'scale-110' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div
        className={`
          w-8 h-8 rounded-full shadow-lg border-2 flex items-center justify-center
          transition-all duration-200
          ${isActive 
            ? 'bg-blue-500 text-white border-blue-500' 
            : 'bg-white text-gray-900 border-gray-200 hover:border-blue-300'
          }
        `}
      >
        <span className="text-sm">{label}</span>
      </div>
    </div>
  )
}

// User location pin
export function MapUserPin({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer ring */}
      <div className="w-6 h-6 bg-blue-500 rounded-full opacity-30 animate-ping absolute" />
      
      {/* Inner dot */}
      <div className="w-3 h-3 bg-blue-500 rounded-full relative top-1.5 left-1.5 border-2 border-white shadow-lg" />
    </div>
  )
}