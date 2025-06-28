'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, Star, MapPin, Calendar, Share, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PropertyCardAirbnbProps {
  id: number
  title: string
  location: string
  price: number
  area: number
  rating?: number
  reviewCount?: number
  images: string[]
  features?: string[]
  isWishlisted?: boolean
  distance?: string
  className?: string
  onClick?: () => void
  onWishlist?: (id: number, isWishlisted: boolean) => void
  size?: 'small' | 'medium' | 'large'
}

export function PropertyCardAirbnb({
  id,
  title,
  location,
  price,
  area,
  rating = 4.8,
  reviewCount = 12,
  images = [],
  features = [],
  isWishlisted = false,
  distance,
  className = '',
  onClick,
  onWishlist,
  size = 'medium'
}: PropertyCardAirbnbProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [wishlistState, setWishlistState] = useState(isWishlisted)

  const sizeClasses = {
    small: 'w-full max-w-xs',
    medium: 'w-full max-w-sm',
    large: 'w-full max-w-md'
  }

  const imageSizeClasses = {
    small: 'h-48',
    medium: 'h-64',
    large: 'h-72'
  }

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newWishlistState = !wishlistState
    setWishlistState(newWishlistState)
    onWishlist?.(id, newWishlistState)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const placeholderImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop'

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % Math.max(images.length, 1))
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1))
  }

  return (
    <div 
      className={`${sizeClasses[size]} bg-white rounded-xl overflow-hidden cursor-pointer group transition-transform duration-200 hover:scale-[1.02] ${className}`}
      onClick={onClick}
    >
      {/* Image Carousel */}
      <div className={`relative ${imageSizeClasses[size]} overflow-hidden bg-gray-100`}>
        {/* Main Image */}
        <Image
          src={imageError || !images[currentImageIndex] ? placeholderImage : images[currentImageIndex]}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              wishlistState ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'
            }`} 
          />
        </button>

        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            {/* Navigation Arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Distance Badge */}
        {distance && (
          <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-md text-xs font-medium">
            {distance}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm truncate">{title}</h3>
            <p className="text-gray-500 text-sm flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              {location}
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 ml-2">
            <Star className="w-3 h-3 text-gray-900 fill-gray-900" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
        </div>

        {/* Features Pills */}
        {features.length > 0 && (
          <div className="flex gap-1 mb-3 overflow-hidden">
            {features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
            {features.length > 2 && (
              <span className="text-xs text-gray-500 py-1">+{features.length - 2}</span>
            )}
          </div>
        )}

        {/* Area Info */}
        <p className="text-sm text-gray-600 mb-3">{area.toLocaleString()} m²</p>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-lg font-semibold text-gray-900">
              R$ {price.toLocaleString('pt-BR')}
            </span>
            <span className="text-sm text-gray-500 ml-1">total</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                // Handle share
              }}
            >
              <Share className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                // Handle bookmark
              }}
            >
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Visit Button */}
        <Button 
          className="w-full mt-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg py-2"
          onClick={(e) => {
            e.stopPropagation()
            // Handle visit booking
          }}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Agendar Visita
        </Button>
      </div>
    </div>
  )
}

// Grid wrapper for multiple cards
interface PropertyGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PropertyGrid({ 
  children, 
  columns = 2, 
  gap = 'md', 
  className = '' 
}: PropertyGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  }

  return (
    <div className={`grid ${gridCols[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}