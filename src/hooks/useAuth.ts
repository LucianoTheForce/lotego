'use client'

import { useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface UseAuthReturn {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('lotgo-user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Error checking auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: 'João Silva',
        email: email,
        avatar: undefined
      }
      
      setUser(mockUser)
      localStorage.setItem('lotgo-user', JSON.stringify(mockUser))
    } catch (error) {
      throw new Error('Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('lotgo-user')
  }

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  }
}