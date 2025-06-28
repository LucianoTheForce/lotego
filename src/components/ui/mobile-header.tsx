'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Menu, User, X, MapPin, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserMenu } from '@/components/ui/user-menu-simple'

interface MobileHeaderProps {
  onSearch?: (term: string) => void
  onFilterChange?: (filters: any) => void
  searchValue?: string
  isSearchPage?: boolean
}

export function MobileHeader({ 
  onSearch, 
  onFilterChange, 
  searchValue = '', 
  isSearchPage = false 
}: MobileHeaderProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(searchValue)

  const handleSearchSubmit = () => {
    onSearch?.(searchTerm)
    if (!isSearchPage) {
      setIsSearchExpanded(false)
    }
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-3">
          {/* Collapsed Header */}
          {(!isSearchExpanded && !isSearchPage) && (
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="text-xl font-black text-rose-500">
                LotGo
              </Link>

              {/* Search Button */}
              <div 
                className="flex-1 mx-4 bg-white border border-gray-300 rounded-full shadow-sm"
                onClick={() => setIsSearchExpanded(true)}
              >
                <div className="flex items-center px-4 py-2">
                  <Search className="w-4 h-4 text-gray-500 mr-3" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Onde?</div>
                    <div className="text-xs text-gray-500">Qualquer lugar • Qualquer tipo</div>
                  </div>
                  <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* User Menu */}
              <UserMenu />
            </div>
          )}

          {/* Expanded Search or Search Page Header */}
          {(isSearchExpanded || isSearchPage) && (
            <div className="space-y-4">
              {/* Top Row */}
              <div className="flex items-center gap-3">
                {!isSearchPage && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchExpanded(false)}
                    className="p-2"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}
                
                {isSearchPage && (
                  <Link href="/" className="text-xl font-black text-rose-500">
                    LotGo
                  </Link>
                )}
                
                <div className="flex-1" />
                
                <UserMenu />
              </div>

              {/* Search Tabs */}
              <div className="flex bg-gray-100 rounded-full p-1">
                <button className="flex-1 text-center py-2 px-4 bg-white rounded-full text-sm font-medium shadow-sm">
                  Terrenos
                </button>
                <button className="flex-1 text-center py-2 px-4 text-sm font-medium text-gray-600">
                  Experiências
                </button>
              </div>

              {/* Search Form */}
              <div className="space-y-3">
                {/* Location */}
                <div className="bg-white border border-gray-300 rounded-xl p-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">ONDE</div>
                      <Input
                        placeholder="Buscar destinos"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                        className="border-0 p-0 text-sm font-medium focus:ring-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Check-in/out and Guests in grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-gray-300 rounded-xl p-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-xs text-gray-500">ENTRADA</div>
                        <div className="text-sm font-medium">Adicionar datas</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-300 rounded-xl p-4">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-xs text-gray-500">VISITANTES</div>
                        <div className="text-sm font-medium">Adicionar pessoas</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <Button 
                  onClick={handleSearchSubmit}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-4 text-lg font-semibold"
                  size="lg"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-black text-rose-500">LotGo</span>
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(false)}
                className="p-2"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            <nav className="space-y-6">
              <Link href="/" className="block text-lg font-medium">Início</Link>
              <Link href="/buscar" className="block text-lg font-medium">Buscar</Link>
              <Link href="/dashboard" className="block text-lg font-medium">Dashboard</Link>
              <Link href="/favorites" className="block text-lg font-medium">Favoritos</Link>
              <Link href="/trips" className="block text-lg font-medium">Minhas Visitas</Link>
              <div className="border-t pt-6">
                <Link href="/host" className="block text-lg font-medium">Anunciar terreno</Link>
                <Link href="/help" className="block text-lg font-medium">Ajuda</Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}