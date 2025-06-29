'use client'

import { useState } from 'react'
import { ArrowLeft, Search, MapPin, Calendar, DollarSign } from 'lucide-react'
import { SlideUp } from '@/components/animations/mobile-animations'

const recentSearches = [
  { id: 1, text: "Uberaba, MG", subtitle: "Centro e região" },
  { id: 2, text: "Alphaville, SP", subtitle: "Condomínios fechados" },
  { id: 3, text: "Brasília, DF", subtitle: "Jardim Botânico" },
]

const popularDestinations = [
  { id: 1, name: "São Paulo", subtitle: "Capital", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop" },
  { id: 2, name: "Uberaba", subtitle: "Triângulo Mineiro", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop" },
  { id: 3, name: "Ribeirão Preto", subtitle: "Interior SP", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100&h=100&fit=crop" },
  { id: 4, name: "Brasília", subtitle: "Capital Federal", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop" },
]

export default function SearchExpandedPage() {
  const [selectedTab, setSelectedTab] = useState('where')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 pt-12">
        <div className="flex items-center space-x-4 mb-6">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Buscar terrenos</h1>
        </div>

        {/* Search Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          <button 
            onClick={() => setSelectedTab('where')}
            className={`flex-1 text-center py-3 px-4 rounded-full text-sm font-medium transition-all ${
              selectedTab === 'where' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600'
            }`}
          >
            Terrenos
          </button>
          <button 
            onClick={() => setSelectedTab('experiences')}
            className={`flex-1 text-center py-3 px-4 rounded-full text-sm font-medium transition-all ${
              selectedTab === 'experiences' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600'
            }`}
          >
            Visitas
          </button>
        </div>
      </header>

      {/* Search Form */}
      <div className="px-4 space-y-4">
        {/* Where */}
        <SlideUp isVisible={true} delay={100}>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">ONDE</div>
                <input
                  type="text"
                  placeholder="Buscar destinos"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-base font-medium text-gray-900 placeholder-gray-400 border-0 p-0 w-full focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </SlideUp>

        {/* When */}
        <SlideUp isVisible={true} delay={200}>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">QUANDO</div>
                <div className="text-base text-gray-900 font-medium">Adicionar datas</div>
              </div>
            </div>
          </div>
        </SlideUp>

        {/* Budget */}
        <SlideUp isVisible={true} delay={300}>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">ORÇAMENTO</div>
                <div className="text-base text-gray-900 font-medium">Definir faixa de preço</div>
              </div>
            </div>
          </div>
        </SlideUp>

        {/* Search Button */}
        <SlideUp isVisible={true} delay={400}>
          <button className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-4 text-lg font-semibold mt-6">
            <Search className="w-5 h-5 inline mr-2" />
            Buscar
          </button>
        </SlideUp>
      </div>

      {/* Recent Searches */}
      {searchQuery === '' && (
        <div className="px-4 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Buscas recentes</h3>
          <div className="space-y-3">
            {recentSearches.map((search, index) => (
              <SlideUp key={search.id} isVisible={true} delay={500 + index * 100}>
                <button className="flex items-center w-full p-4 hover:bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{search.text}</div>
                    <div className="text-sm text-gray-500">{search.subtitle}</div>
                  </div>
                </button>
              </SlideUp>
            ))}
          </div>
        </div>
      )}

      {/* Popular Destinations */}
      {searchQuery === '' && (
        <div className="px-4 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Destinos populares</h3>
          <div className="grid grid-cols-2 gap-4">
            {popularDestinations.map((destination, index) => (
              <SlideUp key={destination.id} isVisible={true} delay={700 + index * 100}>
                <button className="relative rounded-xl overflow-hidden h-32 w-full">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-3 left-3 text-white text-left">
                    <div className="font-semibold">{destination.name}</div>
                    <div className="text-sm opacity-90">{destination.subtitle}</div>
                  </div>
                </button>
              </SlideUp>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}