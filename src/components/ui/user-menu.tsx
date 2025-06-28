'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/contexts/AuthContext'
import { 
  User, 
  Settings, 
  LogOut, 
  Heart,
  LayoutDashboard,
  ChevronDown
} from 'lucide-react'

export function UserMenu() {
  const { user, logout, isAuthenticated } = useAuthContext()
  const [isOpen, setIsOpen] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <Button variant="ghost" asChild>
          <Link href="/entrar">Entrar</Link>
        </Button>
        <Button variant="gradient" asChild>
          <Link href="/cadastro">Cadastre-se</Link>
        </Button>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitials(user?.name || '')
            )}
          </div>
          <div className="hidden md:block text-left">
            <div className="font-medium text-slate-900">{user?.name}</div>
            <div className="text-sm text-slate-600">Ver perfil</div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="font-medium text-slate-900">{user?.name}</div>
              <div className="text-sm text-slate-600">{user?.email}</div>
            </div>
            
            <div className="py-2">
              <Link 
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              
              <Link 
                href="/favoritos"
                className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="w-4 h-4" />
                Favoritos
              </Link>
              
              <Link 
                href="/perfil"
                className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-4 h-4" />
                Perfil
              </Link>
              
              <Link 
                href="/configuracoes"
                className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-4 h-4" />
                Configurações
              </Link>
            </div>
            
            <div className="border-t border-slate-100 pt-2">
              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}