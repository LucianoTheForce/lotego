'use client'

import { useState } from 'react'
import { ArrowLeft, Search, Filter, List, Map as MapIcon, Heart, Share } from 'lucide-react'
import { MapPricePin } from '@/components/ui/map-price-pin'
import { SlideUp } from '@/components/animations/mobile-animations'

// Mock properties for map
const mapProperties = [
  { id: 1, lat: -19.7482, lng: -47.9317, price: 180000 },
  { id: 2, lat: -19.7456, lng: -47.9289, price: 450000 },
  { id: 3, lat: -19.7234, lng: -47.9123, price: 320000 },
  { id: 4, lat: -19.7345, lng: -47.9456, price: 680000 },
  { id: 5, lat: -19.7567, lng: -47.9234, price: 280000 },
]

const selectedProperty = {
  id: 1,
  title: "Lote Residencial Centro",
  location: "Centro, Uberaba - MG",
  price: 180000,
  area: 300,
  rating: 4.8,
  reviews: 23,
  images: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
  ],
  features: ["Água", "Luz", "Esgoto", "Calçamento"]
}

export default function MapViewPage() {
  const [showCard, setShowCard] = useState(true)
  const [selectedPin, setSelectedPin] = useState(1)

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/50 px-4 py-4 pt-12">
        <div className="flex items-center justify-between">
          <button className="p-2 rounded-full bg-white shadow-sm">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-white shadow-sm rounded-full px-4 py-2">
              <Filter className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium">Filtros</span>
            </button>
            
            <button className="p-2 rounded-full bg-white shadow-sm">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Map Container */}
      <div className="h-screen w-full bg-gradient-to-br from-green-100 to-blue-100 relative">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gray-200">
          <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-12 h-full w-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border border-gray-300/30" />
                ))}
              </div>
            </div>
            
            {/* Streets */}
            <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-400/40" />
            <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-400/40" />
            <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400/40" />
            <div className="absolute right-1/3 top-0 bottom-0 w-1 bg-gray-400/40" />
          </div>
        </div>

        {/* Property Pins */}
        {mapProperties.map((property) => (
          <div
            key={property.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${30 + (property.id * 15)}%`,
              top: `${40 + (property.id * 8)}%`
            }}
          >
            <MapPricePin
              price={property.price}
              isSelected={selectedPin === property.id}
              onClick={() => {
                setSelectedPin(property.id)
                setShowCard(true)
              }}
            />
          </div>
        ))}
      </div>

      {/* Bottom Toggle */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex bg-white shadow-lg rounded-full p-1">
          <button className="flex items-center space-x-2 bg-gray-900 text-white rounded-full px-4 py-2">
            <MapIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Mapa</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-700 rounded-full px-4 py-2">
            <List className="w-4 h-4" />
            <span className="text-sm font-medium">Lista</span>
          </button>
        </div>
      </div>

      {/* Property Card */}
      {showCard && (
        <SlideUp isVisible={showCard} className="absolute bottom-0 left-0 right-0 z-40">
          <div className="bg-white rounded-t-2xl shadow-2xl p-6 mx-4 mb-4">
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {selectedProperty.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{selectedProperty.location}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold text-gray-900">
                    R$ {selectedProperty.price.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-sm text-gray-600">
                    {selectedProperty.area} m²
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Property Image */}
            <div className="aspect-video bg-gray-100 rounded-xl mb-4 overflow-hidden">
              <img 
                src={selectedProperty.images[0]} 
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProperty.features.map((feature, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium">⭐ {selectedProperty.rating}</span>
                <span className="text-sm text-gray-500">({selectedProperty.reviews} avaliações)</span>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-3 font-semibold">
              Ver detalhes
            </button>
          </div>
        </SlideUp>
      )}

      {/* Results Badge */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 mt-4">
        <div className="bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg">
          <span className="text-sm font-medium">{mapProperties.length} terrenos</span>
        </div>
      </div>
    </div>
  )
}