'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  MapPin, 
  Search, 
  Filter, 
  Home,
  DollarSign,
  Maximize2,
  ChevronDown,
  Star,
  Heart,
  TrendingUp
} from 'lucide-react'

export default function SearchMobilePage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [showFilters, setShowFilters] = React.useState(false)
  const [priceRange, setPriceRange] = React.useState([0, 1000000])
  const [areaRange, setAreaRange] = React.useState([0, 1000])
  const [selectedType, setSelectedType] = React.useState('all')

  const properties = [
    {
      id: 1,
      title: 'Terreno Vista Panorâmica',
      location: 'Jardim Europa, São Paulo',
      price: 'R$ 750.000',
      area: '500m²',
      image: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=400&h=300&fit=crop',
      rating: 4.9,
      featured: true
    },
    {
      id: 2,
      title: 'Lote em Condomínio',
      location: 'Alphaville, Barueri',
      price: 'R$ 450.000',
      area: '350m²',
      image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&h=300&fit=crop',
      rating: 4.7,
      featured: false
    },
    {
      id: 3,
      title: 'Terreno Comercial',
      location: 'Vila Olímpia, São Paulo',
      price: 'R$ 1.200.000',
      area: '800m²',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop',
      rating: 4.8,
      featured: true
    },
    {
      id: 4,
      title: 'Chácara com Nascente',
      location: 'Ibiúna, SP',
      price: 'R$ 320.000',
      area: '5000m²',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
      rating: 4.6,
      featured: false
    }
  ]

  const propertyTypes = [
    { value: 'all', label: 'Todos' },
    { value: 'residential', label: 'Residencial' },
    { value: 'commercial', label: 'Comercial' },
    { value: 'rural', label: 'Rural' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/home-mobile">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900 flex-1">Buscar Terrenos</h1>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Cidade, bairro ou região..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 bg-gray-50"
              variant="default"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-t border-b border-gray-200 px-4 py-4 space-y-4">
          {/* Property Type */}
          <div>
            <Label className="text-sm font-semibold mb-2 block">Tipo de Terreno</Label>
            <div className="grid grid-cols-2 gap-2">
              {propertyTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={selectedType === type.value ? 'green' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(type.value)}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <Label className="text-sm font-semibold mb-2 block">
              <DollarSign className="inline h-4 w-4 mr-1" />
              Faixa de Preço
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Mínimo"
                className="h-10"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              />
              <Input
                type="number"
                placeholder="Máximo"
                className="h-10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              />
            </div>
          </div>

          {/* Area Range */}
          <div>
            <Label className="text-sm font-semibold mb-2 block">
              <Maximize2 className="inline h-4 w-4 mr-1" />
              Área (m²)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Mínimo"
                className="h-10"
                value={areaRange[0]}
                onChange={(e) => setAreaRange([Number(e.target.value), areaRange[1]])}
              />
              <Input
                type="number"
                placeholder="Máximo"
                className="h-10"
                value={areaRange[1]}
                onChange={(e) => setAreaRange([areaRange[0], Number(e.target.value)])}
              />
            </div>
          </div>

          {/* Apply Filters */}
          <Button className="w-full" variant="green">
            Aplicar Filtros
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="px-4 py-3 flex justify-between items-center">
        <p className="text-sm text-gray-600">{properties.length} terrenos encontrados</p>
        <Button variant="ghost" size="sm" className="text-gray-600">
          Ordenar
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Property List */}
      <div className="px-4 space-y-4">
        {properties.map((property) => (
          <Link key={property.id} href={`/property-mobile/${property.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-56 object-cover"
                />
                {property.featured && (
                  <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Destaque
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault()
                    // Toggle favorite
                  }}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{property.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{property.title}</h3>
                <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </p>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{property.price}</p>
                    <p className="text-sm text-gray-600">{property.area}</p>
                  </div>
                  <Button size="sm" variant="green">
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Load More */}
      <div className="px-4 mt-6 mb-8">
        <Button variant="outline" className="w-full">
          Carregar mais terrenos
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="grid grid-cols-4 h-16">
          <Link href="/home-mobile" className="flex flex-col items-center justify-center text-gray-600">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Início</span>
          </Link>
          <Link href="/search-mobile" className="flex flex-col items-center justify-center text-green-600">
            <Search className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Buscar</span>
          </Link>
          <Link href="/map-mobile" className="flex flex-col items-center justify-center text-gray-600">
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