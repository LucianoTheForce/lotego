'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import InteractiveMap from '@/components/map/interactive-map'
import { 
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Calendar,
  Home,
  Shield,
  Car,
  TreePine,
  Waves,
  Zap,
  Search,
  TrendingUp
} from 'lucide-react'

interface PropertyMobileClientProps {
  propertyId: string
}

export default function PropertyMobileClient({ propertyId }: PropertyMobileClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
  const [isLiked, setIsLiked] = React.useState(false)

  // Mock data - in real app, fetch based on propertyId
  const property = {
    id: propertyId,
    title: 'Terreno Vista Panorâmica Premium',
    location: 'Jardim Europa, São Paulo',
    price: 'R$ 750.000',
    pricePerM2: 'R$ 1.500/m²',
    area: '500m²',
    description: 'Excelente terreno localizado em uma das áreas mais valorizadas de São Paulo. Vista panorâmica da cidade, infraestrutura completa e documentação em dia. Ideal para construção de residência de alto padrão.',
    images: [
      'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
    ],
    rating: 4.9,
    reviews: 27,
    features: [
      { icon: Shield, label: 'Documentação OK' },
      { icon: Car, label: 'Acesso Asfaltado' },
      { icon: TreePine, label: 'Área Verde' },
      { icon: Waves, label: 'Vista Panorâmica' },
      { icon: Zap, label: 'Energia Elétrica' },
      { icon: Home, label: 'Pronto p/ Construir' }
    ],
    broker: {
      name: 'Carlos Silva',
      rating: 4.8,
      phone: '(11) 99999-9999',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    coordinates: [-23.550520, -46.633308]
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Image Gallery */}
      <div className="relative h-80">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent">
          <Link href="/search-mobile">
            <Button variant="ghost" size="icon" className="bg-white/80 backdrop-blur-sm hover:bg-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className="bg-white/80 backdrop-blur-sm hover:bg-white">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {property.images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm font-semibold">{property.rating}</span>
        </div>
      </div>

      {/* Property Info */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <p className="text-gray-600 flex items-center gap-1 mb-2">
              <MapPin className="h-4 w-4" />
              {property.location}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>{property.rating} ({property.reviews} avaliações)</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 mb-1">{property.price}</p>
              <p className="text-sm text-gray-600">{property.pricePerM2} • {property.area}</p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Características</h2>
          <div className="grid grid-cols-2 gap-3">
            {property.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="bg-green-100 p-2 rounded-full">
                  <feature.icon className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Descrição</h2>
          <p className="text-gray-700 leading-relaxed">{property.description}</p>
        </div>

        {/* Map Preview */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Localização</h2>
          <Card className="overflow-hidden">
            <InteractiveMap
              className="h-48 w-full"
              properties={[{
                id: parseInt(propertyId),
                title: property.title,
                price: property.price,
                location: property.location,
                coordinates: [property.coordinates[1], property.coordinates[0]], // [lng, lat]
                image: property.images[0]
              }]}
              initialCenter={[property.coordinates[1], property.coordinates[0]]}
              initialZoom={15}
              showControls={true}
            />
          </Card>
        </div>

        {/* Broker Info */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Corretor Responsável</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={property.broker.image}
                  alt={property.broker.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{property.broker.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{property.broker.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{property.broker.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="flex-1">
            <Phone className="mr-2 h-5 w-5" />
            Ligar
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            <MessageCircle className="mr-2 h-5 w-5" />
            Mensagem
          </Button>
          <Button size="lg" className="flex-1 bg-green-600 hover:bg-green-700">
            <Calendar className="mr-2 h-5 w-5" />
            Agendar Visita
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 h-16">
          <Link href="/home-mobile" className="flex flex-col items-center justify-center text-gray-600">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Início</span>
          </Link>
          <Link href="/search-mobile" className="flex flex-col items-center justify-center text-gray-600">
            <Search className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Buscar</span>
          </Link>
          <Link href="/map-mobile" className="flex flex-col items-center justify-center text-green-600">
            <MapPin className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Mapa</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center justify-center text-gray-600">
            <TrendingUp className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  )
}