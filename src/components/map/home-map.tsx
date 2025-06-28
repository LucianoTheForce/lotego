'use client'

import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/map/map").then(mod => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-neutral-100 rounded-lg flex items-center justify-center">
      <div className="text-neutral-500 font-medium">Carregando mapa...</div>
    </div>
  )
})

export function HomeMap() {
  return <Map className="w-full h-[600px] stable-layout" />
}