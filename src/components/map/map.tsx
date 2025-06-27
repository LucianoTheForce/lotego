'use client'

import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN, MAPBOX_STYLE, DEFAULT_CENTER, DEFAULT_ZOOM } from '@/lib/mapbox/config'

// Set the access token
mapboxgl.accessToken = MAPBOX_TOKEN

interface Property {
  id: number
  title: string
  description: string
  price: number
  area: number
  location: string
  coordinates: { lat: number; lng: number }
  type: string
}

interface MapProps {
  className?: string
  initialViewState?: {
    longitude: number
    latitude: number
    zoom: number
  }
  onMove?: (viewport: { longitude: number; latitude: number; zoom: number }) => void
  properties?: Property[]
  onPropertyClick?: (property: Property) => void
  centerOnLocation?: string
}

export interface MapRef {
  flyTo: (lng: number, lat: number, zoom?: number) => void
  addMarkers: (properties: Property[]) => void
  geocodeAndFlyTo: (location: string) => Promise<void>
}

export const Map = forwardRef<MapRef, MapProps>(({ 
  className = '', 
  initialViewState = {
    longitude: DEFAULT_CENTER.lng,
    latitude: DEFAULT_CENTER.lat,
    zoom: DEFAULT_ZOOM
  },
  onMove,
  properties = [],
  onPropertyClick,
  centerOnLocation
}, ref) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])

  // Geocoding function
  const geocodeLocation = async (location: string): Promise<{ lng: number; lat: number } | null> => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${MAPBOX_TOKEN}&country=BR&limit=1`
      )
      const data = await response.json()
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center
        return { lng, lat }
      }
      return null
    } catch (error) {
      console.error('Erro no geocoding:', error)
      return null
    }
  }

  // Clear existing markers
  const clearMarkers = () => {
    markers.current.forEach(marker => marker.remove())
    markers.current = []
  }

  // Add markers for properties
  const addMarkers = (propertiesToAdd: Property[]) => {
    clearMarkers()
    
    propertiesToAdd.forEach(property => {
      if (property.coordinates && property.coordinates.lat && property.coordinates.lng) {
        // Create marker element
        const markerElement = document.createElement('div')
        markerElement.className = 'custom-marker'
        markerElement.innerHTML = `
          <div class="w-8 h-8 bg-blue-600 border-2 border-white rounded-full shadow-lg cursor-pointer transform transition-transform hover:scale-110 flex items-center justify-center">
            <div class="w-3 h-3 bg-white rounded-full"></div>
          </div>
        `

        // Create popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          className: 'property-popup'
        }).setHTML(`
          <div class="p-3 min-w-[200px]">
            <h3 class="font-semibold text-sm mb-1">${property.title}</h3>
            <p class="text-xs text-gray-600 mb-2">${property.location}</p>
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-green-600">R$ ${property.price.toLocaleString('pt-BR')}</span>
              <span class="text-xs text-gray-500">${property.area} m²</span>
            </div>
            <button class="w-full bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700 transition-colors" 
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
  }

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
      const coords = await geocodeLocation(location)
      if (coords && map.current) {
        map.current.flyTo({
          center: [coords.lng, coords.lat],
          zoom: 12,
          essential: true
        })
      }
    }
  }))

  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_STYLE,
      center: [initialViewState.longitude, initialViewState.latitude],
      zoom: initialViewState.zoom
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
      (window as any).propertyClick = (propertyId: number) => {
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
        delete (window as any).propertyClick
      }
    }
  }, [initialViewState, onMove])

  // Add markers when properties change
  useEffect(() => {
    if (map.current && properties.length > 0) {
      addMarkers(properties)
    }
  }, [properties])

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

  return <div ref={mapContainer} className={className} />
})