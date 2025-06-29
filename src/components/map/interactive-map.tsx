'use client'

import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN, MAPBOX_STYLE } from '@/lib/mapbox/config'
import { MapProperty } from '@/types/property'

// Set the access token
if (typeof window !== 'undefined' && MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN
}

interface InteractiveMapProps {
  className?: string
  properties?: MapProperty[]
  onPropertyClick?: (property: MapProperty) => void
  initialCenter?: [number, number]
  initialZoom?: number
  showControls?: boolean
}

export default function InteractiveMap({
  className = '',
  properties = [],
  onPropertyClick,
  initialCenter = [-47.9195, -19.9167], // Centro do Brasil
  initialZoom = 6,
  showControls = true
}: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  // Clear existing markers
  const clearMarkers = () => {
    markers.current.forEach(marker => marker.remove())
    markers.current = []
  }

  // Add markers for properties
  const addMarkers = (propertiesToAdd: MapProperty[]) => {
    clearMarkers()
    
    propertiesToAdd.forEach(property => {
      if (property.coordinates && property.coordinates.length === 2) {
        // Create custom marker element
        const markerElement = document.createElement('div')
        markerElement.className = 'custom-property-marker'
        markerElement.innerHTML = `
          <div class="relative transform transition-all hover:scale-110 cursor-pointer">
            <div class="bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg border-2 border-white">
              <div class="text-xs font-semibold">${property.price}</div>
            </div>
            <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600"></div>
          </div>
        `

        // Create popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
          className: 'property-popup'
        }).setHTML(`
          <div class="p-4 min-w-[280px] bg-white rounded-lg">
            <img src="${property.image}" alt="${property.title}" class="w-full h-32 object-cover rounded-lg mb-3" />
            <h3 class="font-semibold text-sm mb-1 text-gray-900">${property.title}</h3>
            <p class="text-xs text-gray-600 mb-2">${property.location}</p>
            <div class="flex justify-between items-center mb-3">
              <span class="font-bold text-green-600 text-lg">${property.price}</span>
            </div>
            <button 
              class="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-lg transition-colors font-medium"
              onclick="window.openPropertyDetails && window.openPropertyDetails(${property.id})"
            >
              Ver Detalhes
            </button>
          </div>
        `)

        // Create marker
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat(property.coordinates)
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

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: MAPBOX_STYLE,
        center: initialCenter,
        zoom: initialZoom,
        projection: 'mercator'
      })

      map.current.on('load', () => {
        setMapLoaded(true)
        
        // Configure Standard Style lighting
        if (map.current) {
          map.current.setConfigProperty('basemap', 'lightPreset', 'day')
        }
      })

      // Add navigation controls if enabled
      if (showControls) {
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
      }

      // Set up global property click handler
      if (typeof window !== 'undefined') {
        (window as any).openPropertyDetails = (propertyId: number) => {
          const property = properties.find(p => p.id === propertyId)
          if (property && onPropertyClick) {
            onPropertyClick(property)
          }
        }
      }

    } catch (error) {
      console.error('Erro ao inicializar o mapa:', error)
    }

    return () => {
      clearMarkers()
      map.current?.remove()
      if (typeof window !== 'undefined') {
        delete (window as any).openPropertyDetails
      }
    }
  }, [initialCenter, initialZoom, showControls])

  // Add markers when properties change and map is loaded
  useEffect(() => {
    if (map.current && mapLoaded && properties.length > 0) {
      addMarkers(properties)
      
      // Fit map to show all properties
      if (properties.length > 1) {
        const bounds = new mapboxgl.LngLatBounds()
        properties.forEach(property => {
          if (property.coordinates) {
            bounds.extend(property.coordinates)
          }
        })
        map.current.fitBounds(bounds, { padding: 50 })
      }
    }
  }, [properties, mapLoaded])

  // Render fallback if no token
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

  return <div ref={mapContainer} className={`${className}`} />
}