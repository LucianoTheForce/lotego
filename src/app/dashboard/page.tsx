'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuthContext } from '@/contexts/AuthContext'
import { 
  LayoutDashboard,
  Search,
  Heart,
  Bell,
  Settings,
  User,
  LogOut,
  Plus,
  MapPin,
  DollarSign,
  Home,
  TrendingUp,
  Eye,
  Calendar,
  Star,
  Clock,
  BarChart3,
  Activity
} from 'lucide-react'

interface DashboardStats {
  savedProperties: number
  recentViews: number
  totalSpent: number
  averagePrice: number
}

interface SavedProperty {
  id: number
  title: string
  price: number
  location: string
  area: number
  image: string
  savedAt: string
}

interface RecentActivity {
  id: number
  type: 'view' | 'save' | 'contact' | 'visit'
  propertyTitle: string
  timestamp: string
  description: string
}

export default function DashboardPage() {
  const { user, logout } = useAuthContext()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState<DashboardStats>({
    savedProperties: 12,
    recentViews: 45,
    totalSpent: 0,
    averagePrice: 385000
  })
  
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([
    {
      id: 1,
      title: "Terreno Premium em Uberaba",
      price: 450000,
      location: "Vila Real, Uberaba - MG",
      area: 600,
      image: "/api/placeholder/300/200",
      savedAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Lote Comercial Centro",
      price: 320000,
      location: "Centro, Uberaba - MG", 
      area: 400,
      image: "/api/placeholder/300/200",
      savedAt: "2024-01-10"
    },
    {
      id: 3,
      title: "Terreno Residencial",
      price: 280000,
      location: "Jardim Califórnia, Uberaba - MG",
      area: 500,
      image: "/api/placeholder/300/200",
      savedAt: "2024-01-08"
    }
  ])

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: 1,
      type: 'save',
      propertyTitle: 'Terreno Premium em Uberaba',
      timestamp: '2024-01-15T10:30:00',
      description: 'Salvou um terreno na Lista de Favoritos'
    },
    {
      id: 2,
      type: 'view',
      propertyTitle: 'Lote Comercial Centro',
      timestamp: '2024-01-14T15:45:00',
      description: 'Visualizou detalhes do terreno'
    },
    {
      id: 3,
      type: 'contact',
      propertyTitle: 'Terreno Residencial',
      timestamp: '2024-01-13T09:20:00',
      description: 'Entrou em contato com o proprietário'
    },
    {
      id: 4,
      type: 'visit',
      propertyTitle: 'Área Rural em Uberaba',
      timestamp: '2024-01-12T14:00:00',
      description: 'Agendou visita para 18/01/2024'
    }
  ])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'save': return <Heart className="w-4 h-4 text-red-500" />
      case 'view': return <Eye className="w-4 h-4 text-blue-500" />
      case 'contact': return <Activity className="w-4 h-4 text-green-500" />
      case 'visit': return <Calendar className="w-4 h-4 text-violet-500" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours}h atrás`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d atrás`
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-200">
            <Link href="/" className="text-2xl font-black bg-gradient-to-r from-slate-900 to-violet-600 bg-clip-text text-transparent">
              LotGo
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'overview' 
                ? 'bg-violet-100 text-violet-700' 
                : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Visão Geral
            </button>
            
            <button
              onClick={() => setActiveTab('saved')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'saved' 
                ? 'bg-violet-100 text-violet-700' 
                : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-5 h-5" />
              Terrenos Salvos
              <Badge variant="secondary" className="ml-auto">{stats.savedProperties}</Badge>
            </button>
            
            <Link href="/buscar" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              <Search className="w-5 h-5" />
              Buscar Terrenos
            </Link>
            
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5" />
              Notificações
              <Badge variant="secondary" className="ml-auto">3</Badge>
            </button>
          </nav>
          
          {/* User Section */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-slate-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-900">{user?.name || 'Usuário'}</div>
                <div className="text-sm text-slate-600">{user?.email || 'email@exemplo.com'}</div>
              </div>
            </div>
            
            <div className="mt-3 space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                <Settings className="w-4 h-4" />
                Configurações
              </button>
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {activeTab === 'overview' ? 'Visão Geral' : 'Terrenos Salvos'}
            </h1>
            <p className="text-slate-600 mt-1">
              {activeTab === 'overview' 
                ? 'Acompanhe suas atividades e descobertas' 
                : 'Gerencie seus terrenos favoritos'
              }
            </p>
          </div>
          <Button variant="gradient" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Anunciar Terreno
          </Button>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Terrenos Salvos</p>
                      <p className="text-3xl font-bold text-slate-900">{stats.savedProperties}</p>
                      <p className="text-sm text-emerald-600 font-medium">+2 esta semana</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Visualizações</p>
                      <p className="text-3xl font-bold text-slate-900">{stats.recentViews}</p>
                      <p className="text-sm text-blue-600 font-medium">+12 hoje</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Eye className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Preço Médio</p>
                      <p className="text-3xl font-bold text-slate-900">
                        R$ {Math.round(stats.averagePrice / 1000)}k
                      </p>
                      <p className="text-sm text-violet-600 font-medium">dos salvos</p>
                    </div>
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-violet-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Visitas Agendadas</p>
                      <p className="text-3xl font-bold text-slate-900">3</p>
                      <p className="text-sm text-emerald-600 font-medium">próximas 7 dias</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Atividade Recente
                    </CardTitle>
                    <CardDescription>
                      Suas últimas interações com terrenos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900">{activity.propertyTitle}</p>
                          <p className="text-sm text-slate-600">{activity.description}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {formatTimeAgo(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card variant="gradient">
                  <CardHeader>
                    <CardTitle className="text-lg">Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="default" size="lg" className="w-full justify-start">
                      <Search className="w-4 h-4 mr-3" />
                      Nova Busca
                    </Button>
                    <Button variant="outline" size="lg" className="w-full justify-start">
                      <Heart className="w-4 h-4 mr-3" />
                      Ver Salvos
                    </Button>
                    <Button variant="outline" size="lg" className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-3" />
                      Anunciar Terreno
                    </Button>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-lg">Dica do Dia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Star className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 mb-1">
                          Visite presencialmente
                        </p>
                        <p className="text-sm text-slate-600">
                          Sempre visite o terreno antes de tomar qualquer decisão de compra.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <Card key={property.id} variant="elevated">
                <div className="aspect-video bg-slate-200 rounded-t-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </button>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{property.title}</h3>
                  <div className="flex items-center gap-1 text-slate-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-xl text-slate-900">
                        R$ {property.price.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-600 font-medium">
                      <Home className="w-4 h-4" />
                      {property.area} m²
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" variant="gradient">
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline">
                      <Activity className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}