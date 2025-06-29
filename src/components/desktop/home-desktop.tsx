'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import InteractiveMap from '@/components/map/interactive-map'
import { 
  Search,
  MapPin,
  Star,
  Filter,
  ChevronDown,
  Heart,
  Calendar,
  Users,
  TrendingUp,
  Award,
  Shield
} from 'lucide-react'

const properties = [
  {
    id: 1,
    title: "Terreno Residencial Centro",
    location: "Centro, Uberaba - MG", 
    price: "R$ 180.000",
    area: "300m²",
    rating: 4.8,
    reviews: 23,
    coordinates: [-47.931, -19.748] as [number, number],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    features: ["Documentação OK", "Energia Elétrica", "Água Encanada"]
  },
  {
    id: 2,
    title: "Lote Comercial Avenida Principal",
    location: "Centro, Uberaba - MG",
    price: "R$ 350.000", 
    area: "500m²",
    rating: 4.9,
    reviews: 17,
    coordinates: [-47.925, -19.750] as [number, number],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    features: ["Esquina", "Alto Tráfego", "Zoneamento Comercial"]
  },
  {
    id: 3,
    title: "Terreno Vista Panorâmica",
    location: "Jardim Europa, São Paulo - SP",
    price: "R$ 750.000",
    area: "500m²", 
    rating: 4.9,
    reviews: 31,
    coordinates: [-46.633308, -23.550520] as [number, number],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
    features: ["Vista Panorâmica", "Condomínio Fechado", "Segurança 24h"]
  },
  {
    id: 4,
    title: "Lote Residencial Premium",
    location: "Alphaville, Barueri - SP",
    price: "R$ 450.000",
    area: "350m²",
    rating: 4.7,
    reviews: 19,
    coordinates: [-46.673308, -23.520520] as [number, number],
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    features: ["Pronto para Construir", "Infraestrutura Completa", "Área Verde"]
  }
]

export default function HomeDesktop() {
  const [searchQuery, setSearchQuery] = React.useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-green-600">
                LotGo
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/search" className="text-gray-700 hover:text-green-600 font-medium">
                  Buscar Terrenos
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium">
                  Como Funciona
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-green-600 font-medium">
                  Contato
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                Anunciar Terreno
              </Button>
              <Button>
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Encontre o Terreno Perfeito
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Descubra e compre terrenos em todo o Brasil com transparência, 
                segurança e facilidade. Sua próxima oportunidade está aqui.
              </p>
              
              {/* Search Form */}
              <div className="bg-white rounded-xl p-6 shadow-2xl">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Onde você quer comprar?
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Cidade, estado ou região..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Faixa de Preço
                    </label>
                    <Button variant="outline" className="w-full h-12 justify-between">
                      Qualquer preço
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      &nbsp;
                    </label>
                    <Button className="w-full h-12 bg-green-600 hover:bg-green-700">
                      <Search className="mr-2 h-5 w-5" />
                      Buscar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">5.000+</div>
                    <div className="text-green-100">Terrenos Disponíveis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">98%</div>
                    <div className="text-green-100">Satisfação dos Clientes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">15+</div>
                    <div className="text-green-100">Estados Atendidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-green-100">Suporte Online</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Terrenos em Destaque
              </h2>
              <p className="text-gray-600">
                Selecionamos as melhores oportunidades para você
              </p>
            </div>
            <Button variant="outline">
              Ver Todos
            </Button>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-3 left-3 bg-green-600 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                    {property.price}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{property.rating}</span>
                    <span className="text-sm text-gray-500">({property.reviews})</span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                    {property.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {property.location}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{property.area}</span>
                    <Link href={`/property/${property.id}`}>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Explore Terrenos no Mapa
            </h2>
            <p className="text-gray-600">
              Visualize todos os terrenos disponíveis e encontre sua localização ideal
            </p>
          </div>
          
          <Card className="overflow-hidden">
            <InteractiveMap
              className="h-96 w-full"
              properties={properties}
              initialCenter={[-47.931, -19.748]}
              initialZoom={6}
              showControls={true}
            />
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Por que Escolher o LotGo?
            </h2>
            <p className="text-gray-600">
              A plataforma mais confiável para compra e venda de terrenos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Segurança Garantida
              </h3>
              <p className="text-gray-600">
                Todos os terrenos passam por verificação de documentação e análise jurídica completa.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Suporte Especializado
              </h3>
              <p className="text-gray-600">
                Equipe de corretores especializados para te ajudar em todo o processo de compra.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Melhor Preço
              </h3>
              <p className="text-gray-600">
                Preços transparentes e competitivos, sem taxas ocultas ou surpresas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-green-400 mb-4">LotGo</div>
              <p className="text-gray-400 mb-4">
                A plataforma digital que conecta você ao terreno dos seus sonhos.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">Sobre Nós</Link></li>
                <li><Link href="/careers" className="hover:text-white">Carreiras</Link></li>
                <li><Link href="/press" className="hover:text-white">Imprensa</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Central de Ajuda</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contato</Link></li>
                <li><Link href="/terms" className="hover:text-white">Termos de Uso</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-400">
                <li>contato@lotgo.com.br</li>
                <li>(11) 99999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LotGo. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}