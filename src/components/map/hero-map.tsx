'use client'

import dynamic from 'next/dynamic'
import { HERO_MAP_CONFIG } from '@/lib/mapbox/config'
import { useState, useEffect } from 'react'

const Map = dynamic(() => import('./map').then(mod => ({ default: mod.Map })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Carregando Mapa 3D</h3>
        <p className="text-white/80">Experiência imersiva em instantes...</p>
      </div>
    </div>
  )
})

interface HeroMapProps {
  className?: string
}

export function HeroMap({ className = '' }: HeroMapProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className={`${className} w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center`}>
        <div className="text-white text-center">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Inicializando Mapa 3D</h3>
          <p className="text-white/80">Aguarde...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`${className} hero-map-container`}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 5
      }}
    >
      <Map
        className="w-full h-full"
        initialViewState={{
          longitude: HERO_MAP_CONFIG.center.lng,
          latitude: HERO_MAP_CONFIG.center.lat,
          zoom: HERO_MAP_CONFIG.zoom,
          pitch: HERO_MAP_CONFIG.pitch,
          bearing: HERO_MAP_CONFIG.bearing
        }}
        enable3D={true}
        heroMode={true}
        properties={[]}
      />
    </div>
  )
}

HeroMap.displayName = 'HeroMap'