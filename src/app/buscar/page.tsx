'use client'

import { useState, useEffect, useCallback, useRef, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PropertyCardSkeleton, LoadingSpinner } from "@/components/ui/loading"
import { Search, Filter, MapPin, Home, DollarSign, ChevronLeft, ChevronRight } from "lucide-react"

const Map = dynamic(() => import("@/components/map/map").then(mod => ({ default: mod.Map })), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse" />
})

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
}

interface SearchResponse {
  properties: Property[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [priceRange, setPriceRange] = useState({ 
    min: searchParams.get('minPrice') || '', 
    max: searchParams.get('maxPrice') || '' 
  })
  const [areaRange, setAreaRange] = useState({ 
    min: searchParams.get('minArea') || '', 
    max: searchParams.get('maxArea') || '' 
  })
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || 'all')
  const [showFilters, setShowFilters] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [pagination, setPagination] = useState<SearchResponse['pagination'] | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1)
  const mapRef = useRef<{ flyTo: (lng: number, lat: number, zoom?: number) => void; addMarkers: (properties: Property[]) => void; geocodeAndFlyTo: (location: string) => Promise<void> } | null>(null)

  const searchProperties = useCallback(async (page: number = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.set('search', searchTerm)
      if (priceRange.min) params.set('minPrice', priceRange.min)
      if (priceRange.max) params.set('maxPrice', priceRange.max)
      if (areaRange.min) params.set('minArea', areaRange.min)
      if (areaRange.max) params.set('maxArea', areaRange.max)
      if (propertyType && propertyType !== 'all') params.set('type', propertyType)
      params.set('page', page.toString())
      params.set('limit', '10')

      const response = await fetch(`/api/properties?${params}`)
      const data: SearchResponse = await response.json()
      
      setProperties(data.properties)
      setPagination(data.pagination)
      setCurrentPage(page)

      // Se temos propriedades, centralizar mapa na primeira propriedade
      if (data.properties.length > 0 && data.properties[0].coordinates && mapRef.current) {
        setTimeout(() => {
          const firstProperty = data.properties[0]
          mapRef.current?.flyTo(firstProperty.coordinates.lng, firstProperty.coordinates.lat, 12)
        }, 800)
      }

      // Atualizar URL sem recarregar a página
      const newParams = new URLSearchParams(searchParams)
      if (searchTerm) newParams.set('search', searchTerm)
      else newParams.delete('search')
      if (priceRange.min) newParams.set('minPrice', priceRange.min)
      else newParams.delete('minPrice')
      if (priceRange.max) newParams.set('maxPrice', priceRange.max)
      else newParams.delete('maxPrice')
      if (areaRange.min) newParams.set('minArea', areaRange.min)
      else newParams.delete('minArea')
      if (areaRange.max) newParams.set('maxArea', areaRange.max)
      else newParams.delete('maxArea')
      if (propertyType && propertyType !== 'all') newParams.set('type', propertyType)
      else newParams.delete('type')
      newParams.set('page', page.toString())

      router.replace(`/buscar?${newParams}`)
    } catch (error) {
      console.error('Erro ao buscar propriedades:', error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, priceRange, areaRange, propertyType, router, searchParams])

  useEffect(() => {
    searchProperties(currentPage)
  }, [currentPage, searchProperties])

  // Centralizar mapa quando há termo de busca inicial
  useEffect(() => {
    const initialSearch = searchParams.get('search')
    if (initialSearch && mapRef.current) {
      setTimeout(() => {
        mapRef.current?.geocodeAndFlyTo(initialSearch)
      }, 1000) // Delay maior para carregamento inicial
    }
  }, [searchParams])


  const handlePageChange = (page: number) => {
    searchProperties(page)
  }

  const handlePropertyClick = (property: Property) => {
    if (mapRef.current && property.coordinates) {
      mapRef.current.flyTo(property.coordinates.lng, property.coordinates.lat, 16)
    }
  }

  const handlePropertyCardClick = (property: Property) => {
    handlePropertyClick(property)
  }

  const handleSearchSubmit = () => {
    setCurrentPage(1)
    searchProperties(1)
    
    // Se há um termo de busca, vamos tentar centralizar o mapa na localização
    if (searchTerm && mapRef.current) {
      setTimeout(() => {
        mapRef.current?.geocodeAndFlyTo(searchTerm)
      }, 500) // Delay para garantir que o mapa foi inicializado
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-2xl font-bold">
              LotGo
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/entrar">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/cadastro">Cadastre-se</Link>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Buscar por cidade, bairro ou região..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                className="flex-1"
              />
              <Button onClick={handleSearchSubmit} disabled={loading}>
                {loading ? <LoadingSpinner size="sm" className="mr-2" /> : <Search className="w-4 h-4 mr-2" />}
                {loading ? 'Buscando...' : 'Buscar'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Tipo de Terreno</Label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm"
                  >
                    <option value="all">Todos</option>
                    <option value="lot">Lote</option>
                    <option value="land">Área</option>
                    <option value="farm">Fazenda</option>
                  </select>
                </div>
                <div>
                  <Label>Faixa de Preço (R$)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Mín"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                    <Input
                      type="number"
                      placeholder="Máx"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Área (m²)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Mín"
                      value={areaRange.min}
                      onChange={(e) => setAreaRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                    <Input
                      type="number"
                      placeholder="Máx"
                      value={areaRange.max}
                      onChange={(e) => setAreaRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={handleSearchSubmit} disabled={loading}>
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)]">
        {/* Property List */}
        <div className="w-full lg:w-96 h-full overflow-y-auto border-r">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                {pagination ? `${pagination.total} terrenos encontrados` : 'Carregando...'}
              </p>
              {pagination && pagination.totalPages > 1 && (
                <div className="text-xs text-gray-500">
                  Página {pagination.page} de {pagination.totalPages}
                </div>
              )}
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {properties.map(property => (
                  <Card 
                    key={property.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handlePropertyCardClick(property)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{property.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {property.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {property.description}
                      </p>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-bold text-lg">
                            R$ {property.price.toLocaleString('pt-BR')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Home className="w-4 h-4" />
                          {property.area} m²
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="inline-block px-2 py-1 text-xs bg-gray-200 rounded">
                          {property.type === 'lot' ? 'Lote' : property.type === 'land' ? 'Área' : 'Fazenda'}
                        </span>
                        {property.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <Button size="sm" className="w-full">
                        Ver Detalhes
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrev || loading}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <span className="text-sm px-3">
                  {currentPage} / {pagination.totalPages}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNext || loading}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1">
          <Map 
            ref={mapRef}
            className="w-full h-full" 
            properties={properties}
            onPropertyClick={handlePropertyClick}
          />
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}