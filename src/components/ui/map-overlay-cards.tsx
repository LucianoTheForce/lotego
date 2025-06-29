'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronUp, ChevronDown, X, MapPin, Star, Heart } from 'lucide-react'
import { PropertyCardAirbnb } from './property-card-airbnb'
import { Button } from './button'

interface Property {
  id: number
  title: string
  description: string
  price: number
  area: number
  location: string
  address: string
  city: string
  state: string
  zip_code: string
  type: string
  status: string
  coordinates: { lat: number; lng: number }
  images: string[]
  features: string[]
  rating?: number
  reviewCount?: number
  distance?: string
}

interface MapOverlayCardsProps {
  properties: Property[]
  selectedProperty?: Property | null
  onPropertySelect?: (property: Property | null) => void
  onClose?: () => void
  className?: string
}

export function MapOverlayCards({
  properties = [],
  selectedProperty,
  onPropertySelect,
  onClose,
  className = ''
}: MapOverlayCardsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Handle touch/mouse dragging
  const handleStart = (clientY: number) => {
    setIsDragging(true)
    setStartY(clientY)
    setCurrentY(clientY)
  }

  const handleMove = (clientY: number) => {
    if (!isDragging) return
    
    const deltaY = clientY - startY
    setCurrentY(clientY)
    
    // Determine expand/collapse based on drag direction and distance
    if (deltaY < -50 && !isExpanded) {
      setIsExpanded(true)
    } else if (deltaY > 50 && isExpanded) {
      setIsExpanded(false)
    }
  }

  const handleEnd = () => {
    setIsDragging(false)
    setStartY(0)
    setCurrentY(0)
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientY)
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientY)
  }

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientY)
  }

  const handleMouseUp = () => {
    handleEnd()
  }

  // Add/remove mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  const handlePropertyClick = (property: Property) => {
    onPropertySelect?.(property)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollTop)
  }

  if (properties.length === 0) return null

  return (
    <>
      {/* Backdrop for expanded state */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Main Container */}
      <div
        ref={containerRef}
        className={`
          fixed bottom-0 left-0 right-0 bg-white z-50 shadow-2xl
          transition-all duration-300 ease-out
          ${isExpanded ? 'h-[85vh]' : 'h-32'}
          ${className}
        `}
      >
        {/* Handle/Header */}
        <div
          className="flex flex-col items-center pt-2 pb-3 px-4 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          {/* Drag Handle */}
          <div className="w-12 h-1 bg-gray-300 rounded-full mb-3" />
          
          {/* Header Content */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">
                {properties.length} {properties.length === 1 ? 'terreno' : 'terrenos'}
              </span>
              {!isExpanded && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(true)}
                  className="p-1"
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {isExpanded && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="p-1"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="h-full overflow-hidden">
          {/* Collapsed View - Horizontal Scroll */}
          {!isExpanded && (
            <div className="px-4 pb-4">
              <div 
                className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {properties.slice(0, 10).map((property) => (
                  <div key={property.id} className="flex-shrink-0 w-72">
                    <PropertyCardAirbnb
                      {...property}
                      size="small"
                      onClick={() => handlePropertyClick(property)}
                      className={`
                        ${selectedProperty?.id === property.id ? 'ring-2 ring-rose-500' : ''}
                      `}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expanded View - Vertical Grid */}
          {isExpanded && (
            <div
              ref={scrollRef}
              className="h-full overflow-y-auto px-4 pb-4"
              onScroll={handleScroll}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {properties.map((property) => (
                  <PropertyCardAirbnb
                    key={property.id}
                    {...property}
                    size="medium"
                    onClick={() => handlePropertyClick(property)}
                    className={`
                      ${selectedProperty?.id === property.id ? 'ring-2 ring-rose-500' : ''}
                    `}
                  />
                ))}
              </div>
              
              {/* Load More Button */}
              {properties.length > 20 && (
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="px-6">
                    Carregar mais
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Selected Property Detail Sheet */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-white z-60 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{selectedProperty.title}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPropertySelect?.(null)}
              className="p-1"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-4">
            {/* Property Image Gallery */}
            <div className="aspect-video bg-gray-100 rounded-xl mb-4 relative overflow-hidden">
              {selectedProperty.images[0] && (
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Wishlist Button */}
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Property Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{selectedProperty.title}</h3>
                  <p className="text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedProperty.location}
                  </p>
                </div>
                
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-gray-900" />
                  <span className="font-medium">{selectedProperty.rating || 4.8}</span>
                  <span className="text-gray-500">({selectedProperty.reviewCount || 12})</span>
                </div>
              </div>

              <p className="text-gray-700">{selectedProperty.description}</p>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                <div>
                  <span className="text-gray-500 text-sm">Área</span>
                  <p className="font-semibold">{selectedProperty.area.toLocaleString()} m²</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Preço</span>
                  <p className="font-semibold">R$ {selectedProperty.price.toLocaleString('pt-BR')}</p>
                </div>
              </div>

              {/* Features */}
              {selectedProperty.features.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Características</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button variant="outline" className="py-3">
                  Salvar
                </Button>
                <Button className="py-3 bg-rose-500 hover:bg-rose-600">
                  Agendar Visita
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}