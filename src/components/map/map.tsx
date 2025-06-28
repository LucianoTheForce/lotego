'use client'

import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN, MAPBOX_STYLE, DEFAULT_CENTER, DEFAULT_ZOOM, DEFAULT_3D_CONFIG } from '@/lib/mapbox/config'

// Set the access token with safety check
if (typeof window !== 'undefined' && MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN
}

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

interface MapProps {
  className?: string
  initialViewState?: {
    longitude: number
    latitude: number
    zoom: number
    pitch?: number
    bearing?: number
  }
  onMove?: (viewport: { longitude: number; latitude: number; zoom: number }) => void
  properties?: Property[]
  onPropertyClick?: (property: Property) => void
  centerOnLocation?: string
  enable3D?: boolean
  heroMode?: boolean
}

export interface MapRef {
  flyTo: (lng: number, lat: number, zoom?: number) => void
  addMarkers: (properties: Property[]) => void
  geocodeAndFlyTo: (location: string) => Promise<void>
}

const MapComponent = forwardRef<MapRef, MapProps>(({ 
  className = '', 
  initialViewState = {
    longitude: DEFAULT_CENTER.lng,
    latitude: DEFAULT_CENTER.lat,
    zoom: DEFAULT_ZOOM,
    pitch: DEFAULT_3D_CONFIG.pitch,
    bearing: DEFAULT_3D_CONFIG.bearing
  },
  onMove,
  properties = [],
  onPropertyClick,
  centerOnLocation,
  enable3D = true,
  heroMode = false
}, ref) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])

  // Geocoding function
  const geocodeLocation = async (location: string): Promise<{ lng: number; lat: number } | null> => {
    try {
      console.log('Fazendo geocoding para:', location)
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${MAPBOX_TOKEN}&country=BR&limit=1&language=pt`
      )
      const data = await response.json()
      
      console.log('Resultado do geocoding:', data)
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center
        console.log('Coordenadas encontradas:', { lng, lat })
        return { lng, lat }
      }
      console.log('Nenhuma coordenada encontrada para:', location)
      return null
    } catch (error) {
      console.error('Erro no geocoding:', error)
      return null
    }
  }

  // Clear existing markers
  const clearMarkers = useCallback(() => {
    markers.current.forEach(marker => marker.remove())
    markers.current = []
  }, [])

  // Add markers for properties
  const addMarkers = useCallback((propertiesToAdd: Property[]) => {
    clearMarkers()
    
    propertiesToAdd.forEach(property => {
      if (property.coordinates && property.coordinates.lat && property.coordinates.lng) {
        // Create marker element
        const markerElement = document.createElement('div')
        markerElement.className = 'custom-marker'
        markerElement.innerHTML = `
          <div class="relative w-10 h-10 cursor-pointer transform transition-all hover:scale-110">
            <div class="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600 border-3 border-white rounded-full shadow-xl flex items-center justify-center">
              <div class="w-4 h-4 bg-white rounded-full shadow-inner"></div>
            </div>
            <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
          </div>
        `

        // Create popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          className: 'property-popup'
        }).setHTML(`
          <div class="p-3 min-w-[200px] bg-white rounded-lg">
            <h3 class="font-semibold text-sm mb-1 text-neutral-900">${property.title}</h3>
            <p class="text-xs text-neutral-600 mb-2">${property.location}</p>
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-success">R$ ${property.price.toLocaleString('pt-BR')}</span>
              <span class="text-xs text-neutral-500">${property.area} m²</span>
            </div>
            <button class="w-full bg-primary text-white text-xs py-1 px-2 rounded hover:bg-primary-hover transition-colors" 
                    onclick="window.propertyClick && window.propertyClick(${property.id})">
              Ver Detalhes
            </button>
          </div>
        `)

        // Create marker
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([property.coordinates.lng, property.coordinates.lat])
          .setPopup(popup)
          .addTo(map.current!)

        // Add click handler
        markerElement.addEventListener('click', () => {
          if (onPropertyClick) {
            onPropertyClick(property)
          }
        })

        markers.current.push(marker)
      }
    })
  }, [clearMarkers, onPropertyClick])

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    flyTo: (lng: number, lat: number, zoom: number = 14) => {
      if (map.current) {
        map.current.flyTo({
          center: [lng, lat],
          zoom,
          essential: true
        })
      }
    },
    addMarkers,
    geocodeAndFlyTo: async (location: string) => {
      console.log('geocodeAndFlyTo chamado para:', location)
      const coords = await geocodeLocation(location)
      if (coords && map.current) {
        console.log('Voando para coordenadas:', coords)
        map.current.flyTo({
          center: [coords.lng, coords.lat],
          zoom: 12,
          essential: true,
          duration: 2000
        })
      } else {
        console.log('Não foi possível fazer geocoding ou mapa não está pronto')
      }
    }
  }))

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: MAPBOX_STYLE,
        center: [initialViewState.longitude, initialViewState.latitude],
        zoom: initialViewState.zoom,
        pitch: enable3D ? (initialViewState.pitch || DEFAULT_3D_CONFIG.pitch) : 0,
        bearing: enable3D ? (initialViewState.bearing || DEFAULT_3D_CONFIG.bearing) : 0,
        projection: enable3D ? 'globe' : 'mercator',
        antialias: DEFAULT_3D_CONFIG.antialias
      })
    } catch (error) {
      console.error('Erro ao inicializar o mapa:', error)
      return
    }

    // Configure Mapbox Standard Style with 3D features
    map.current.on('style.load', () => {
      if (!map.current) return
      
      // Configure lighting based on mode
      if (heroMode) {
        map.current.setConfigProperty('basemap', 'lightPreset', 'dawn')
      } else {
        map.current.setConfigProperty('basemap', 'lightPreset', 'dusk')
      }
      
      // Enable terrain for 3D effect only if 3D is enabled
      if (enable3D) {
        map.current.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        })
        
        map.current.setTerrain({ 
          source: 'mapbox-dem', 
          exaggeration: heroMode ? 2.0 : 1.5 
        })
        
        // Add atmospheric styling for globe
        map.current.setFog({
          color: heroMode ? 'rgb(255, 239, 213)' : 'rgb(186, 210, 235)',
          'high-color': heroMode ? 'rgb(245, 159, 66)' : 'rgb(36, 92, 223)',
          'horizon-blend': heroMode ? 0.05 : 0.02,
          'space-color': heroMode ? 'rgb(11, 20, 40)' : 'rgb(11, 11, 25)',
          'star-intensity': heroMode ? 0.8 : 0.6
        })
      }

      // Add smooth rotation animation for hero mode
      if (heroMode) {
        const rotateMap = () => {
          if (!map.current) return
          map.current.rotateTo(map.current.getBearing() + 0.1, { duration: 0 })
          requestAnimationFrame(rotateMap)
        }
        rotateMap()
      }
    })

    if (onMove) {
      map.current.on('move', () => {
        if (!map.current) return
        const center = map.current.getCenter()
        const zoom = map.current.getZoom()
        onMove({
          longitude: center.lng,
          latitude: center.lat,
          zoom
        })
      })
    }

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Set up global property click handler
    if (typeof window !== 'undefined') {
      (window as Window & { propertyClick?: (propertyId: number) => void }).propertyClick = (propertyId: number) => {
        const property = properties.find(p => p.id === propertyId)
        if (property && onPropertyClick) {
          onPropertyClick(property)
        }
      }
    }

    return () => {
      clearMarkers()
      map.current?.remove()
      if (typeof window !== 'undefined') {
        delete (window as Window & { propertyClick?: (propertyId: number) => void }).propertyClick
      }
    }
  }, [initialViewState, onMove, properties, onPropertyClick, clearMarkers, enable3D, heroMode])

  // Add markers when properties change
  useEffect(() => {
    if (map.current && properties.length > 0) {
      addMarkers(properties)
    }
  }, [properties, addMarkers])

  // Handle centerOnLocation prop
  useEffect(() => {
    if (centerOnLocation && map.current) {
      geocodeLocation(centerOnLocation).then(coords => {
        if (coords) {
          map.current!.flyTo({
            center: [coords.lng, coords.lat],
            zoom: 12,
            essential: true
          })
        }
      })
    }
  }, [centerOnLocation])

  // Render fallback se não há token
  if (!MAPBOX_TOKEN) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200`}>
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 01.553-.894L9 4l6 3 6-3v13l-6 3-6-3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Mapa Indisponível</h3>
          <p className="text-gray-500 text-sm">Token do Mapbox não configurado</p>
        </div>
      </div>
    )
  }

  return <div ref={mapContainer} className={`${className} gpu-accelerated stable-layout`} />
})

MapComponent.displayName = 'Map'

export const Map = MapComponent