'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import HermanyAndradeMap from '@/components/map/hermany-andrade-map'
import { 
  lotesHermanyAndrade, 
  loteamentoInfo, 
  type LoteHermanyAndrade 
} from '@/data/loteamento-hermany-andrade'
import { 
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Filter,
  Grid,
  List,
  Home,
  Building,
  Zap,
  Droplets,
  Truck,
  Sun
} from 'lucide-react'

export default function LoteamentoHermanyAndradePage() {
  const [selectedLote, setSelectedLote] = React.useState<LoteHermanyAndrade | null>(null)
  const [viewMode, setViewMode] = React.useState<'map' | 'list'>('map')
  const [statusFilter, setStatusFilter] = React.useState<string[]>(['disponivel', 'reservado', 'vendido'])
  const [typeFilter, setTypeFilter] = React.useState<string[]>(['residencial', 'comercial', 'misto'])

  const stats = {
    total: lotesHermanyAndrade.length,
    disponivel: lotesHermanyAndrade.filter(l => l.status === 'disponivel').length,
    reservado: lotesHermanyAndrade.filter(l => l.status === 'reservado').length,
    vendido: lotesHermanyAndrade.filter(l => l.status === 'vendido').length
  }

  const handleLoteClick = (lote: LoteHermanyAndrade) => {
    setSelectedLote(lote)
  }

  const filteredLotes = lotesHermanyAndrade.filter(lote => 
    statusFilter.includes(lote.status) && typeFilter.includes(lote.tipo)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/buscar">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{loteamentoInfo.nome}</h1>
                <p className="text-sm text-gray-600">{loteamentoInfo.cidade} - {loteamentoInfo.estado}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Mapa
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-2" />
                Lista
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total de Lotes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.disponivel}</div>
              <div className="text-sm text-gray-600">Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.reservado}</div>
              <div className="text-sm text-gray-600">Reservados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.vendido}</div>
              <div className="text-sm text-gray-600">Vendidos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filtros:</span>
            </div>
            
            {/* Status Filter */}
            <div className="flex gap-2">
              {[
                { key: 'disponivel', label: 'Disponível', color: 'bg-green-600' },
                { key: 'reservado', label: 'Reservado', color: 'bg-yellow-600' },
                { key: 'vendido', label: 'Vendido', color: 'bg-red-600' }
              ].map(status => (
                <Button
                  key={status.key}
                  variant={statusFilter.includes(status.key) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    if (statusFilter.includes(status.key)) {
                      setStatusFilter(statusFilter.filter(s => s !== status.key))
                    } else {
                      setStatusFilter([...statusFilter, status.key])
                    }
                  }}
                  className="text-xs"
                >
                  <div className={`w-2 h-2 rounded-full ${status.color} mr-2`} />
                  {status.label}
                </Button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex gap-2">
              {[
                { key: 'residencial', label: 'Residencial', icon: Home },
                { key: 'comercial', label: 'Comercial', icon: Building },
                { key: 'misto', label: 'Misto', icon: Grid }
              ].map(type => (
                <Button
                  key={type.key}
                  variant={typeFilter.includes(type.key) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    if (typeFilter.includes(type.key)) {
                      setTypeFilter(typeFilter.filter(t => t !== type.key))
                    } else {
                      setTypeFilter([...typeFilter, type.key])
                    }
                  }}
                  className="text-xs"
                >
                  <type.icon className="w-3 h-3 mr-2" />
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-1">
        {/* Main Content */}
        <main className="flex-1">
          {viewMode === 'map' ? (
            <HermanyAndradeMap
              className="h-screen"
              onLoteClick={handleLoteClick}
              showControls={true}
              filterByStatus={statusFilter}
              filterByType={typeFilter}
            />
          ) : (
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredLotes.map(lote => (
                  <Card key={lote.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg">{lote.numero}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          lote.status === 'disponivel' ? 'bg-green-100 text-green-800' :
                          lote.status === 'reservado' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {lote.status === 'disponivel' ? 'Disponível' :
                           lote.status === 'reservado' ? 'Reservado' : 'Vendido'}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Área:</span>
                          <span className="font-semibold">{lote.area}m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tipo:</span>
                          <span className="font-semibold capitalize">{lote.tipo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Preço:</span>
                          <span className="font-bold text-green-600">
                            R$ {lote.preco.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {lote.caracteristicas.slice(0, 2).map(carac => (
                            <span key={carac} className="px-2 py-1 bg-gray-100 rounded text-xs">
                              {carac}
                            </span>
                          ))}
                          {lote.caracteristicas.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                              +{lote.caracteristicas.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant={lote.status === 'disponivel' ? 'default' : 'outline'}
                        disabled={lote.status === 'vendido'}
                        onClick={() => setSelectedLote(lote)}
                      >
                        {lote.status === 'disponivel' ? 'Ver Detalhes' :
                         lote.status === 'reservado' ? 'Lista de Espera' : 'Vendido'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Sidebar with Loteamento Info */}
        <aside className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Loteamento Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{loteamentoInfo.nome}</h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {loteamentoInfo.cidade} - {loteamentoInfo.estado}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Grid className="h-4 w-4 mr-2" />
                    {loteamentoInfo.totalLotes} lotes em {loteamentoInfo.areaTotalLoteamento}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Infrastructure */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Infraestrutura</h3>
                <div className="space-y-2">
                  {loteamentoInfo.infraestrutura.map(item => (
                    <div key={item} className="flex items-center text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Contato</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {loteamentoInfo.contato.telefone}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {loteamentoInfo.contato.email}
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Phone className="h-4 w-4 mr-2" />
                  Entrar em Contato
                </Button>
              </CardContent>
            </Card>

            {/* Selected Lote Details */}
            {selectedLote && (
              <Card className="border-green-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Lote Selecionado: {selectedLote.numero}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Área:</span>
                      <span className="font-semibold">{selectedLote.area}m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="font-semibold capitalize">{selectedLote.tipo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-semibold ${
                        selectedLote.status === 'disponivel' ? 'text-green-600' :
                        selectedLote.status === 'reservado' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {selectedLote.status === 'disponivel' ? 'Disponível' :
                         selectedLote.status === 'reservado' ? 'Reservado' : 'Vendido'}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        R$ {selectedLote.preco.toLocaleString('pt-BR')}
                      </div>
                      <p className="text-sm text-gray-600">{loteamentoInfo.facilidadesPagamento}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Características:</h4>
                      {selectedLote.caracteristicas.map(carac => (
                        <div key={carac} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                          {carac}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full mt-4" disabled={selectedLote.status === 'vendido'}>
                    {selectedLote.status === 'disponivel' ? 'Comprar Este Lote' :
                     selectedLote.status === 'reservado' ? 'Entrar na Lista de Espera' : 'Lote Vendido'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}