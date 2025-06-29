'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Search,
  Filter,
  Home,
  MapPin,
  TrendingUp,
  Locate,
  Layers,
  Minus,
  Plus,
  Star,
  DollarSign,
  Maximize2
} from 'lucide-react'

export default function MapMobilePage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [showPropertyCard, setShowPropertyCard] = React.useState(false)
  const [selectedProperty, setSelectedProperty] = React.useState(null)

  // Mock properties data for map markers
  const mapProperties = [
    {
      id: 1,
      title: 'Terreno Vista Panorâmica',
      location: 'Jardim Europa, SP',
      price: 'R$ 750.000',
      area: '500m²',
      rating: 4.9,
      coordinates: { lat: -23.550520, lng: -46.633308 },
      image: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Lote em Condomínio',
      location: 'Alphaville, Barueri',
      price: 'R$ 450.000',
      area: '350m²',
      rating: 4.7,
      coordinates: { lat: -23.520520, lng: -46.673308 },
      image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Terreno Comercial',
      location: 'Vila Olímpia, SP',
      price: 'R$ 1.200.000',
      area: '800m²',
      rating: 4.8,
      coordinates: { lat: -23.580520, lng: -46.653308 },
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop'
    }
  ]

  const handleMarkerClick = (property: any) => {
    setSelectedProperty(property)
    setShowPropertyCard(true)
  }

  return (
    <div className="relative h-screen bg-gray-100">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/home-mobile">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar na região..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 bg-gray-50 border-gray-200"
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-full pt-16 pb-16">
        {/* Mock Map Background */}
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden">
          {/* Map Pattern/Grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 144 }, (_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>

          {/* Property Markers */}
          {mapProperties.map((property) => (
            <div
              key={property.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                top: `${40 + (property.id * 15)}%`,
                left: `${35 + (property.id * 20)}%`
              }}
              onClick={() => handleMarkerClick(property)}
            >
              <div className="bg-green-600 text-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform marker-pulse">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white rounded-lg px-2 py-1 shadow-md text-xs font-semibold whitespace-nowrap">
                {property.price}
              </div>
            </div>
          ))}

          {/* Central Area Indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-8 h-8 border-2 border-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 top-24 z-10 flex flex-col gap-2">
        <Button variant="secondary" size="icon" className="bg-white shadow-lg">
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="bg-white shadow-lg">
          <Minus className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="bg-white shadow-lg">
          <Locate className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="bg-white shadow-lg">
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      {/* Results Counter */}
      <div className="absolute top-24 left-4 z-10">
        <Card className="bg-white/95 backdrop-blur-md border-0 shadow-lg">
          <CardContent className="px-3 py-2">
            <p className="text-sm font-semibold text-gray-900">
              {mapProperties.length} terrenos nesta área
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Property Quick View Card */}
      {showPropertyCard && selectedProperty && (
        <div className="absolute bottom-20 left-4 right-4 z-20">
          <Card className="bg-white shadow-xl border-0 overflow-hidden bottom-sheet-enter-active">
            <div className="flex">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-24 h-24 object-cover"
              />
              <CardContent className="p-3 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-gray-900 line-clamp-1">
                      {selectedProperty.title}
                    </h3>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {selectedProperty.location}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPropertyCard(false)}
                    className="p-1 h-auto"
                  >
                    ×
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold text-green-600">{selectedProperty.price}</p>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <Maximize2 className="h-3 w-3" />
                      {selectedProperty.area}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs">{selectedProperty.rating}</span>
                    </div>
                    <Link href={`/property-mobile/${selectedProperty.id}`}>
                      <Button size="sm" variant="green" className="text-xs h-8">
                        Ver
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex gap-2">
          <Link href="/search-mobile">
            <Button variant="secondary" className="bg-white shadow-lg">
              <Search className="mr-2 h-4 w-4" />
              Lista
            </Button>
          </Link>
          <Button variant="secondary" className="bg-white shadow-lg">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="grid grid-cols-4 h-16">
          <Link href="/home-mobile" className="flex flex-col items-center justify-center text-gray-600">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Início</span>
          </Link>
          <Link href="/search-mobile" className="flex flex-col items-center justify-center text-gray-600">
            <Search className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Buscar</span>
          </Link>
          <Link href="/map-mobile" className="flex flex-col items-center justify-center text-green-600">
            <MapPin className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Mapa</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center justify-center text-gray-600">
            <TrendingUp className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  )
}