'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  MapPin, 
  Home, 
  DollarSign, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  Calendar,
  Ruler,
  TreePine,
  Zap,
  Shield,
  Star
} from 'lucide-react'

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
  owner: {
    name: string
    phone: string
    email: string
    avatar?: string
  }
}

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // Simulating API call - replace with actual API
    const fetchProperty = async () => {
      try {
        // Mock data for now
        const mockProperty: Property = {
          id: parseInt(params.id as string),
          title: "Terreno Premium em Uberaba - Loteamento Exclusivo",
          description: "Excelente terreno localizado em um dos melhores loteamentos de Uberaba. Área plana, com infraestrutura completa incluindo asfalto, água, esgoto e energia elétrica. Perfeito para construção residencial de alto padrão. Localizado em área nobre da cidade, próximo a shopping centers, escolas e hospitais.",
          price: 450000,
          area: 600,
          location: "Loteamento Vila Real, Uberaba - MG",
          address: "Rua das Palmeiras, 123",
          city: "Uberaba",
          state: "MG",
          zip_code: "38055-000",
          type: "lot",
          status: "available",
          coordinates: { lat: -19.7479, lng: -47.9319 },
          images: [
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600",
            "/api/placeholder/800/600"
          ],
          features: [
            "Área plana",
            "Infraestrutura completa",
            "Documentação ok",
            "Próximo ao centro",
            "Área nobre",
            "Segurança 24h"
          ],
          owner: {
            name: "João Silva",
            phone: "(34) 99999-9999",
            email: "joao@email.com",
            avatar: "/api/placeholder/100/100"
          }
        }
        
        setProperty(mockProperty)
      } catch (error) {
        console.error('Error fetching property:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [params.id])

  const handleContact = () => {
    // Handle contact action
    console.log('Contact owner')
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleShare = () => {
    navigator.share?.({
      title: property?.title,
      url: window.location.href
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Terreno não encontrado</h1>
          <Button asChild>
            <Link href="/buscar">Voltar à busca</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Link href="/" className="text-2xl font-black bg-gradient-to-r from-slate-900 to-violet-600 bg-clip-text text-transparent">
                LotGo
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={handleFavorite}>
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card variant="elevated" className="overflow-hidden">
              <div className="relative h-96 bg-slate-200">
                <Image
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Property Info */}
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                      {property.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-slate-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900 mb-1">
                      R$ {property.price.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-slate-600 text-sm">
                      R$ {Math.round(property.price / property.area).toLocaleString('pt-BR')}/m²
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Features */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <Ruler className="w-6 h-6 text-violet-600 mx-auto mb-2" />
                    <div className="font-bold text-slate-900">{property.area} m²</div>
                    <div className="text-sm text-slate-600">Área total</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <Home className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="font-bold text-slate-900">
                      {property.type === 'lot' ? 'Lote' : property.type === 'land' ? 'Terreno' : 'Fazenda'}
                    </div>
                    <div className="text-sm text-slate-600">Tipo</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-bold text-slate-900">Regular</div>
                    <div className="text-sm text-slate-600">Documentação</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Descrição</h3>
                  <p className="text-slate-700 leading-relaxed">{property.description}</p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Características</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="bg-violet-100 text-violet-700">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card variant="gradient" className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">
                  Interessado?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                    <span className="font-bold text-slate-700">
                      {property.owner.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{property.owner.name}</div>
                    <div className="text-sm text-slate-600">Proprietário</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button variant="gradient" size="lg" className="w-full" onClick={handleContact}>
                    <Phone className="w-4 h-4 mr-2" />
                    Entrar em contato
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar visita
                  </Button>
                </div>

                <div className="text-center text-sm text-slate-600 pt-2">
                  <span>Resposta em até 2 horas</span>
                </div>
              </CardContent>
            </Card>

            {/* Location Info */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">
                  Localização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-sm text-slate-600">Endereço</div>
                    <div className="font-medium text-slate-900">{property.address}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-sm text-slate-600">Cidade</div>
                    <div className="font-medium text-slate-900">{property.city}, {property.state}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-sm text-slate-600">CEP</div>
                    <div className="font-medium text-slate-900">{property.zip_code}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}