'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MapPin, Search, TrendingUp, Shield, Clock, Star, Home } from 'lucide-react'

export default function HomeMobile() {
  const [searchQuery, setSearchQuery] = React.useState('')

  const features = [
    {
      icon: MapPin,
      title: 'Localização Privilegiada',
      description: 'Terrenos em áreas valorizadas'
    },
    {
      icon: Shield,
      title: 'Compra Segura',
      description: 'Documentação verificada'
    },
    {
      icon: Clock,
      title: 'Visita Agendada',
      description: 'Escolha o melhor horário'
    }
  ]

  const featuredProperties = [
    {
      id: 1,
      title: 'Terreno em Condomínio Fechado',
      location: 'Alphaville, SP',
      price: 'R$ 450.000',
      area: '450m²',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Lote Comercial Prime',
      location: 'Centro, Campinas',
      price: 'R$ 890.000',
      area: '600m²',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
      rating: 4.9
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-green-600 to-green-700 text-white">
        <div className="px-4 pt-8 pb-6">
          <h1 className="text-3xl font-bold mb-2">LotGo</h1>
          <p className="text-green-100 mb-6">Encontre o terreno dos seus sonhos</p>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar por cidade, bairro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-14 bg-white text-gray-900 border-0 shadow-lg"
            />
          </div>
          
          <div className="flex gap-2 mt-4">
            <Link href="/map-mobile" className="flex-1">
              <Button variant="secondary" className="w-full h-12 font-semibold">
                <MapPin className="mr-2 h-4 w-4" />
                Ver Mapa
              </Button>
            </Link>
            <Link href="/search-mobile" className="flex-1">
              <Button variant="secondary" className="w-full h-12 font-semibold">
                <Search className="mr-2 h-4 w-4" />
                Busca Avançada
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 -mt-6">
        <Card className="bg-white shadow-xl border-0">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">5.000+</div>
                <div className="text-xs text-gray-600">Terrenos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-xs text-gray-600">Satisfação</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">24h</div>
                <div className="text-xs text-gray-600">Resposta</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="px-4 mt-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Por que escolher o LotGo?</h2>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <feature.icon className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Properties */}
      <div className="px-4 mt-8 pb-24">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Terrenos em Destaque</h2>
          <Link href="/search-mobile">
            <Button variant="ghost" size="sm" className="text-green-600">
              Ver todos
            </Button>
          </Link>
        </div>
        
        <div className="space-y-4">
          {featuredProperties.map((property) => (
            <Link key={property.id} href={`/property-mobile/${property.id}`}>
              <Card className="overflow-hidden border-gray-200 hover:shadow-lg transition-all">
                <div className="relative h-48">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{property.rating}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{property.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {property.location}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">{property.price}</p>
                      <p className="text-sm text-gray-600">{property.area}</p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 h-16">
          <Link href="/home-mobile" className="flex flex-col items-center justify-center text-green-600">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Início</span>
          </Link>
          <Link href="/search-mobile" className="flex flex-col items-center justify-center text-gray-600">
            <Search className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Buscar</span>
          </Link>
          <Link href="/map-mobile" className="flex flex-col items-center justify-center text-gray-600">
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