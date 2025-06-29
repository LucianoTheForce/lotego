// Unified Property interface for the entire application

export interface Property {
  id: number
  title: string
  description: string
  price: number | string  // Can be number or formatted string like "R$ 450.000"
  area: number | string   // Can be number or formatted string like "450m²"
  location: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  type?: string
  status?: string
  coordinates: { lat: number; lng: number } | [number, number] // Support both formats
  images: string[]
  features?: string[]
  rating?: number
  reviewCount?: number
  distance?: string
  image?: string  // Single image for simple cases
}

// For map components that need simple coordinate format
export interface MapProperty {
  id: number
  title: string
  price: string
  location: string
  coordinates: [number, number] // [lng, lat]
  image: string
  area?: string
  rating?: number
}

// Convert Property to MapProperty format
export function toMapProperty(property: Property): MapProperty {
  return {
    id: property.id,
    title: property.title,
    price: typeof property.price === 'string' ? property.price : `R$ ${property.price.toLocaleString('pt-BR')}`,
    location: property.location,
    coordinates: Array.isArray(property.coordinates) 
      ? property.coordinates 
      : [property.coordinates.lng, property.coordinates.lat],
    image: property.image || property.images[0] || '',
    area: typeof property.area === 'string' ? property.area : `${property.area}m²`,
    rating: property.rating
  }
}