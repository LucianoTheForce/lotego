'use client'

import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/map/map").then(mod => mod.Map), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-gray-100 animate-pulse rounded-lg" />
})

export function HomeMap() {
  return <Map className="w-full h-[600px]" />
}