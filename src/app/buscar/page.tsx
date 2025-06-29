'use client'

import { useState, useEffect, useCallback, useRef, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { MobileHeader } from "@/components/ui/mobile-header"
import { FilterPills } from "@/components/ui/filter-pills"
import { PropertyCardAirbnb, PropertyGrid } from "@/components/ui/property-card-airbnb"
import { MapOverlayCards } from "@/components/ui/map-overlay-cards"
import { PropertyCardSkeleton } from "@/components/ui/loading"
import { SlideUp, StaggeredList } from "@/components/animations/mobile-animations"

const Map = dynamic(() => import("@/components/map/map").then(mod => ({ default: mod.Map })), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl" />
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
  // State variables for future filter implementation
  // const [priceRange, setPriceRange] = useState({ 
  //   min: searchParams.get('minPrice') || '', 
  //   max: searchParams.get('maxPrice') || '' 
  // })
  // const [areaRange, setAreaRange] = useState({ 
  //   min: searchParams.get('minArea') || '', 
  //   max: searchParams.get('maxArea') || '' 
  // })
  // const [propertyType, setPropertyType] = useState(searchParams.get('type') || 'all')
  // const [showFilters, setShowFilters] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [pagination, setPagination] = useState<SearchResponse['pagination'] | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1)
  const [hasInitializedMap, setHasInitializedMap] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isMapView, setIsMapView] = useState(true)
  const [showOverlayCards, setShowOverlayCards] = useState(true)
  const mapInitTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mapRef = useRef<{ flyTo: (lng: number, lat: number, zoom?: number) => void; addMarkers: (properties: Property[]) => void; geocodeAndFlyTo: (location: string) => Promise<void> } | null>(null)

  const searchProperties = useCallback(async (page: number = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.set('search', searchTerm)
      // Future filter implementation
      // if (priceRange.min) params.set('minPrice', priceRange.min)
      // if (priceRange.max) params.set('maxPrice', priceRange.max)
      // if (areaRange.min) params.set('minArea', areaRange.min)
      // if (areaRange.max) params.set('maxArea', areaRange.max)
      // if (propertyType && propertyType !== 'all') params.set('type', propertyType)
      params.set('page', page.toString())
      params.set('limit', '10')

      const response = await fetch(`/api/properties?${params}`)
      const data: SearchResponse = await response.json()
      
      setProperties(data.properties)
      setPagination(data.pagination)
      setCurrentPage(page)

      // Atualizar URL sem recarregar a página
      const newParams = new URLSearchParams(searchParams)
      if (searchTerm) newParams.set('search', searchTerm)
      else newParams.delete('search')
      // Future filter URL params
      // if (priceRange.min) newParams.set('minPrice', priceRange.min)
      // else newParams.delete('minPrice')
      // if (priceRange.max) newParams.set('maxPrice', priceRange.max)
      // else newParams.delete('maxPrice')
      // if (areaRange.min) newParams.set('minArea', areaRange.min)
      // else newParams.delete('minArea')
      // if (areaRange.max) newParams.set('maxArea', areaRange.max)
      // else newParams.delete('maxArea')
      // if (propertyType && propertyType !== 'all') newParams.set('type', propertyType)
      // else newParams.delete('type')
      newParams.set('page', page.toString())

      router.replace(`/buscar?${newParams}`)
    } catch (error) {
      console.error('Erro ao buscar propriedades:', error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, router, searchParams])

  useEffect(() => {
    searchProperties(currentPage)
  }, [currentPage, searchProperties])

  // Centralizar mapa de forma inteligente
  useEffect(() => {
    if (!mapRef.current || hasInitializedMap) return

    // Limpar timeout anterior se existir
    if (mapInitTimeoutRef.current) {
      clearTimeout(mapInitTimeoutRef.current)
    }

    mapInitTimeoutRef.current = setTimeout(() => {
      const initialSearch = searchParams.get('search')
      
      if (initialSearch) {
        // Se há um termo de busca, centralizar na busca
        mapRef.current?.geocodeAndFlyTo(initialSearch)
      } else if (properties.length > 0 && properties[0].coordinates) {
        // Se não há busca mas há propriedades, centralizar na primeira
        const firstProperty = properties[0]
        mapRef.current?.flyTo(firstProperty.coordinates.lng, firstProperty.coordinates.lat, 12)
      }
      
      setHasInitializedMap(true)
      mapInitTimeoutRef.current = null
    }, 1200) // Delay único para permitir carregamento completo

    return () => {
      if (mapInitTimeoutRef.current) {
        clearTimeout(mapInitTimeoutRef.current)
        mapInitTimeoutRef.current = null
      }
    }
  }, [properties, searchParams, hasInitializedMap])


  const handlePageChange = (page: number) => {
    searchProperties(page)
  }

  const handlePropertyClick = (property: Property) => {
    if (mapRef.current && property.coordinates) {
      // Esta é uma ação intencional do usuário, pode mover o mapa
      mapRef.current.flyTo(property.coordinates.lng, property.coordinates.lat, 16)
    }
  }


  const handleSearchSubmit = (term?: string) => {
    if (term !== undefined) {
      setSearchTerm(term)
    }
    setCurrentPage(1)
    setHasInitializedMap(false)
    searchProperties(1)
  }

  const handleFilterChange = (filterId: string, active: boolean) => {
    // Handle filter changes here
    console.log(`Filter ${filterId} is now ${active ? 'active' : 'inactive'}`)
    searchProperties(1)
  }

  const handlePropertySelect = (property: Property | null) => {
    setSelectedProperty(property)
    if (property && mapRef.current) {
      mapRef.current.flyTo(property.coordinates.lng, property.coordinates.lat, 16)
    }
  }

  const handleWishlist = (id: number, isWishlisted: boolean) => {
    // Handle wishlist toggle
    console.log(`Property ${id} wishlist status: ${isWishlisted}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <MobileHeader 
        onSearch={handleSearchSubmit}
        searchValue={searchTerm}
        isSearchPage={true}
      />

      {/* Filter Pills */}
      <FilterPills 
        onFilterChange={handleFilterChange}
        className="sticky top-[88px] z-40"
      />

      {/* Results Count & View Toggle */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">
            {pagination ? `${pagination.total} terrenos` : 'Carregando...'}
            {pagination && (
              <span className="text-gray-500 ml-1">
                • Página {pagination.page} de {pagination.totalPages}
              </span>
            )}
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMapView(false)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                !isMapView ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setIsMapView(true)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                isMapView ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Mapa
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* List View */}
        {!isMapView && (
          <SlideUp isVisible={!isMapView} className="p-4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <StaggeredList isVisible={!loading}>
                <PropertyGrid columns={2} gap="md">
                  {properties.map(property => (
                    <PropertyCardAirbnb
                      key={property.id}
                      {...property}
                      rating={4.8}
                      reviewCount={12}
                      distance="5 km de distância"
                      onClick={() => handlePropertySelect(property)}
                      onWishlist={handleWishlist}
                      size="medium"
                    />
                  ))}
                </PropertyGrid>
              </StaggeredList>
            )}
            
            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!pagination.hasPrev || loading}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  
                  <span className="px-4 py-2 text-sm text-gray-600">
                    {currentPage} de {pagination.totalPages}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!pagination.hasNext || loading}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Próxima
                  </button>
                </div>
              </div>
            )}
          </SlideUp>
        )}

        {/* Map View */}
        {isMapView && (
          <div className="relative h-[calc(100vh-200px)]">
            <Map 
              ref={mapRef}
              className="w-full h-full" 
              properties={properties}
              onPropertyClick={handlePropertySelect}
            />
            
            {/* Overlay Cards */}
            {showOverlayCards && properties.length > 0 && (
              <MapOverlayCards
                properties={properties}
                selectedProperty={selectedProperty}
                onPropertySelect={handlePropertySelect}
                onClose={() => setShowOverlayCards(false)}
              />
            )}
          </div>
        )}
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