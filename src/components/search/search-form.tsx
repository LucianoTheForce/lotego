'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchFormProps {
  placeholder?: string
  size?: 'default' | 'large'
  className?: string
}

export function SearchForm({ 
  placeholder = "Digite cidade, bairro ou região...", 
  size = 'default',
  className = "" 
}: SearchFormProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      const params = new URLSearchParams()
      params.set('search', searchTerm.trim())
      router.push(`/buscar?${params}`)
    } else {
      router.push('/buscar')
    }
  }

  const buttonSize = size === 'large' ? 'lg' : 'default'
  const inputSize = size === 'large' ? 'h-12' : 'h-10'

  return (
    <form onSubmit={handleSearch} className={`flex gap-2 ${className}`}>
      <Input 
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`flex-1 ${inputSize}`}
      />
      <Button type="submit" size={buttonSize} className={size === 'large' ? 'px-8' : ''}>
        <Search className="w-5 h-5 mr-2" />
        Buscar
      </Button>
    </form>
  )
}