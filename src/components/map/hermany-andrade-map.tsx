'use client'

import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN, MAPBOX_STYLE } from '@/lib/mapbox/config'
import { 
  lotesHermanyAndrade, 
  loteamentoInfo, 
  getMarkerColorByStatus, 
  type LoteHermanyAndrade 
} from '@/data/loteamento-hermany-andrade'

// Set the access token
if (typeof window !== 'undefined' && MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN
}

interface HermanyAndradeMapProps {
  className?: string
  onLoteClick?: (lote: LoteHermanyAndrade) => void
  showControls?: boolean
  filterByStatus?: string[]
  filterByType?: string[]
}

export default function HermanyAndradeMap({
  className = '',
  onLoteClick,
  showControls = true,
  filterByStatus = ['disponivel', 'reservado', 'vendido'],
  filterByType = ['residencial', 'comercial', 'misto']
}: HermanyAndradeMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  // Clear existing markers
  const clearMarkers = () => {
    markers.current.forEach(marker => marker.remove())
    markers.current = []
  }

  // Add markers for lotes
  const addLoteMarkers = (lotes: LoteHermanyAndrade[]) => {
    clearMarkers()
    
    // Filter lotes based on status and type
    const filteredLotes = lotes.filter(lote => 
      filterByStatus.includes(lote.status) && filterByType.includes(lote.tipo)
    )
    
    filteredLotes.forEach(lote => {
      // Create custom marker element
      const markerElement = document.createElement('div')
      markerElement.className = 'hermany-lote-marker'
      
      const markerColor = getMarkerColorByStatus(lote.status)
      const isEspecial = lote.tipo === 'comercial' || lote.tipo === 'misto'
      
      markerElement.innerHTML = `
        <div class="relative transform transition-all hover:scale-110 cursor-pointer">
          <div class="relative ${isEspecial ? 'w-8 h-8' : 'w-6 h-6'} rounded-full border-2 border-white shadow-lg" 
               style="background-color: ${markerColor}">
            ${isEspecial ? '<div class="absolute inset-1 bg-white rounded-full opacity-30"></div>' : ''}
          </div>
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded px-2 py-1 shadow-md text-xs font-semibold whitespace-nowrap border">
            ${lote.numero}
          </div>
          <div class="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded px-2 py-1 text-xs font-semibold whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
            R$ ${lote.preco.toLocaleString('pt-BR')}
          </div>
        </div>
      `

      // Create popup with detailed information
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        className: 'lote-popup'
      }).setHTML(`
        <div class="p-4 min-w-[300px] bg-white rounded-lg">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-lg text-gray-900">${lote.numero}</h3>
            <span class="px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(lote.status)}">
              ${getStatusLabel(lote.status)}
            </span>
          </div>
          
          <div class="space-y-2 mb-4">
            <div class="flex justify-between">
              <span class="text-gray-600">Área:</span>
              <span class="font-semibold">${lote.area}m²</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Tipo:</span>
              <span class="font-semibold capitalize">${lote.tipo}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Preço:</span>
              <span class="font-bold text-green-600 text-lg">R$ ${lote.preco.toLocaleString('pt-BR')}</span>
            </div>
          </div>
          
          <div class="mb-4">
            <h4 class="font-semibold text-gray-900 mb-2">Características:</h4>
            <div class="flex flex-wrap gap-1">
              ${lote.caracteristicas.map(carac => 
                `<span class="px-2 py-1 bg-gray-100 rounded text-xs">${carac}</span>`
              ).join('')}
            </div>
          </div>
          
          ${lote.status === 'disponivel' ? `
            <button 
              class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
              onclick="window.openLoteDetails && window.openLoteDetails(${lote.id})"
            >
              Ver Detalhes / Comprar
            </button>
          ` : lote.status === 'reservado' ? `
            <button 
              class="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
              onclick="window.openLoteDetails && window.openLoteDetails(${lote.id})"
            >
              Entrar na Lista de Espera
            </button>
          ` : `
            <button 
              class="w-full bg-gray-400 text-white py-2 px-4 rounded-lg font-semibold cursor-not-allowed"
              disabled
            >
              Lote Vendido
            </button>
          `}
        </div>
      `)

      // Create marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([lote.longitude, lote.latitude])
        .setPopup(popup)
        .addTo(map.current!)

      // Add click handler
      markerElement.addEventListener('click', () => {
        if (onLoteClick) {
          onLoteClick(lote)
        }
      })

      markers.current.push(marker)
    })
  }

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: MAPBOX_STYLE,
        center: [loteamentoInfo.coordenadasCentrals.longitude, loteamentoInfo.coordenadasCentrals.latitude],
        zoom: 16, // Zoom alto para ver detalhes dos lotes
        pitch: 45, // Visão 3D
        bearing: 0,
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
        
        // Add fullscreen control
        map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right')
        
        // Add scale control
        map.current.addControl(new mapboxgl.ScaleControl({
          maxWidth: 100,
          unit: 'metric'
        }), 'bottom-left')
      }

      // Set up global lote click handler
      if (typeof window !== 'undefined') {
        (window as any).openLoteDetails = (loteId: number) => {
          const lote = lotesHermanyAndrade.find(l => l.id === loteId)
          if (lote && onLoteClick) {
            onLoteClick(lote)
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
        delete (window as any).openLoteDetails
      }
    }
  }, [showControls])

  // Add markers when map is loaded
  useEffect(() => {
    if (map.current && mapLoaded) {
      addLoteMarkers(lotesHermanyAndrade)
    }
  }, [mapLoaded, filterByStatus, filterByType])

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

// Helper functions
function getStatusBadgeClass(status: string): string {
  const classes = {
    disponivel: 'bg-green-100 text-green-800',
    reservado: 'bg-yellow-100 text-yellow-800',
    vendido: 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes] || classes.disponivel
}

function getStatusLabel(status: string): string {
  const labels = {
    disponivel: 'Disponível',
    reservado: 'Reservado',
    vendido: 'Vendido'
  }
  return labels[status as keyof typeof labels] || 'Disponível'
}