'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FilterPill {
  id: string
  label: string
  icon?: React.ReactNode
  active?: boolean
}

interface FilterPillsProps {
  onFilterChange?: (filterId: string, active: boolean) => void
  className?: string
}

export function FilterPills({ onFilterChange, className = '' }: FilterPillsProps) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)

  const filters: FilterPill[] = [
    { id: 'rural', label: 'Rural', icon: '🌾' },
    { id: 'urbano', label: 'Urbano', icon: '🏙️' },
    { id: 'praia', label: 'Praia', icon: '🏖️' },
    { id: 'montanha', label: 'Montanha', icon: '⛰️' },
    { id: 'investimento', label: 'Investimento', icon: '💰' },
    { id: 'construção', label: 'Construção', icon: '🏗️' },
    { id: 'agricultura', label: 'Agricultura', icon: '🚜' },
    { id: 'comercial', label: 'Comercial', icon: '🏢' },
    { id: 'residencial', label: 'Residencial', icon: '🏠' },
    { id: 'industrial', label: 'Industrial', icon: '🏭' },
  ]

  const toggleFilter = (filterId: string) => {
    const newActiveFilters = new Set(activeFilters)
    const isActive = newActiveFilters.has(filterId)
    
    if (isActive) {
      newActiveFilters.delete(filterId)
    } else {
      newActiveFilters.add(filterId)
    }
    
    setActiveFilters(newActiveFilters)
    onFilterChange?.(filterId, !isActive)
  }

  const clearAllFilters = () => {
    activeFilters.forEach(filterId => {
      onFilterChange?.(filterId, false)
    })
    setActiveFilters(new Set())
  }

  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="px-4 py-3">
        {/* Horizontal Scrollable Pills */}
        <div className="flex items-center gap-3">
          {/* Scroll Left Button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 shrink-0 lg:hidden"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Pills Container */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-1 pb-1">
            {filters.map((filter) => {
              const isActive = activeFilters.has(filter.id)
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                    transition-all duration-200 shrink-0
                    ${isActive 
                      ? 'bg-gray-900 text-white shadow-lg' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                    }
                  `}
                >
                  {filter.icon && <span className="text-sm">{filter.icon}</span>}
                  {filter.label}
                </button>
              )
            })}
          </div>

          {/* Scroll Right Button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 shrink-0 lg:hidden"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Filters Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 shrink-0"
          >
            <Filter className="w-4 h-4" />
            Filtros
            {activeFilters.size > 0 && (
              <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px]">
                {activeFilters.size}
              </span>
            )}
          </Button>
        </div>

        {/* Active Filters Display */}
        {activeFilters.size > 0 && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-600">Filtros ativos:</span>
            <div className="flex gap-2 flex-wrap">
              {Array.from(activeFilters).map(filterId => {
                const filter = filters.find(f => f.id === filterId)
                if (!filter) return null
                
                return (
                  <span 
                    key={filterId}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {filter.icon} {filter.label}
                    <button
                      onClick={() => toggleFilter(filterId)}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )
              })}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Limpar tudo
            </Button>
          </div>
        )}
      </div>

      {/* Advanced Filters Modal/Dropdown */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-40 max-h-96 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Filtros</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-medium mb-3">Faixa de preço</h4>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Mínimo</label>
                  <input
                    type="number"
                    placeholder="R$ 0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Máximo</label>
                  <input
                    type="number"
                    placeholder="R$ 1.000.000+"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Area Range */}
            <div>
              <h4 className="font-medium mb-3">Área (m²)</h4>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Mínimo</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Máximo</label>
                  <input
                    type="number"
                    placeholder="10.000+"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Property Features */}
            <div>
              <h4 className="font-medium mb-3">Características</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Água', 'Energia', 'Acesso asfaltado', 'Documentação',
                  'Financiamento', 'Cerca', 'Poço artesiano', 'Nascente'
                ].map((feature) => (
                  <label key={feature} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={clearAllFilters} className="flex-1">
                Limpar
              </Button>
              <Button onClick={() => setShowFilters(false)} className="flex-1 bg-gray-900 hover:bg-gray-800">
                Aplicar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}