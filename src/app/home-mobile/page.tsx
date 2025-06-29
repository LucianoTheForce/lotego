'use client'

import { useState } from 'react'
import { Search, Filter, User, Menu, MapPin, Heart } from 'lucide-react'
import { PropertyCardAirbnb } from '@/components/ui/property-card-airbnb'

// Mock data - primeiras propriedades em destaque
const featuredProperties = [
  {
    id: 1,
    title: "Terreno em Condomínio Fechado",
    location: "Alphaville, Barueri - SP",
    price: 450000,
    area: 450,
    rating: 4.8,
    reviewCount: 23,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
    ],
    features: ["Portaria 24h", "Área Verde", "Clube"],
    distance: "15 km de você"
  },
  {
    id: 2,
    title: "Lote Comercial Centro",
    location: "Centro, Uberaba - MG",
    price: 280000,
    area: 400,
    rating: 4.9,
    reviewCount: 17,
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
    ],
    features: ["Alto movimento", "Esquina", "Comercial"],
    distance: "2 km do centro"
  }
]

const categories = [
  { id: 'rural', name: 'Rural', icon: '🌾', active: false },
  { id: 'urbano', name: 'Urbano', icon: '🏙️', active: true },
  { id: 'comercial', name: 'Comercial', icon: '🏢', active: false },
  { id: 'residencial', name: 'Residencial', icon: '🏡', active: false },
  { id: 'investimento', name: 'Investimento', icon: '💰', active: false },
]

export default function HomeMobilePage() {
  const [activeCategory, setActiveCategory] = useState('urbano')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="px-4 pt-12 pb-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full bg-gray-100">
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
              <h1 className="text-2xl font-black text-rose-500">LotGo</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full bg-gray-100">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white border border-gray-200 rounded-full shadow-sm p-4">
            <div className="flex items-center">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">Onde você quer construir?</div>
                <div className="text-xs text-gray-500">Qualquer lugar • Qualquer tipo • Qualquer preço</div>
              </div>
              <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex space-x-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex flex-col items-center space-y-2 min-w-0 ${
                activeCategory === category.id ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div className={`text-2xl p-3 rounded-xl ${
                activeCategory === category.id ? 'bg-gray-100' : ''
              }`}>
                {category.icon}
              </div>
              <span className={`text-xs font-medium ${
                activeCategory === category.id ? 'text-gray-900' : 'text-gray-600'
              }`}>
                {category.name}
              </span>
              {activeCategory === category.id && (
                <div className="w-6 h-0.5 bg-gray-900 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filtros</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-full">
            <span className="text-sm font-medium">Preço</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-full">
            <span className="text-sm font-medium">Área</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-20">
        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Terrenos próximos a você
          </h2>
          <p className="text-gray-600">Encontrados em Uberaba e região</p>
        </div>

        {/* Properties Grid */}
        <div className="space-y-6">
          {featuredProperties.map((property) => (
            <PropertyCardAirbnb
              key={property.id}
              {...property}
              size="large"
              className="w-full"
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="text-gray-900 font-semibold underline">
            Mostrar mais terrenos
          </button>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center py-2">
            <Search className="w-5 h-5 text-rose-500" />
            <span className="text-xs font-medium text-rose-500 mt-1">Buscar</span>
          </button>
          <button className="flex flex-col items-center py-2">
            <Heart className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-600 mt-1">Favoritos</span>
          </button>
          <button className="flex flex-col items-center py-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-600 mt-1">Mapa</span>
          </button>
          <button className="flex flex-col items-center py-2">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-600 mt-1">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  )
}