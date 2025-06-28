'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'

export function UserMenu() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/entrar">Entrar</Link>
      </Button>
      <Button size="sm" className="bg-rose-500 hover:bg-rose-600" asChild>
        <Link href="/cadastro">Cadastre-se</Link>
      </Button>
    </div>
  )
}