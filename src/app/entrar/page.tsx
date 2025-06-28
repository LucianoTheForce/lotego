'use client'

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthContext } from "@/contexts/AuthContext"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (error) {
      setError((error as Error).message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-violet-400/20 to-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-400/20 to-violet-400/20 blur-3xl" />
      </div>
      
      {/* Header */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="text-3xl font-black bg-gradient-to-r from-slate-900 to-violet-600 bg-clip-text text-transparent">
          LotGo
        </Link>
      </div>
      
      <Card variant="glass" className="w-full max-w-lg">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-3xl font-bold text-slate-900">Bem-vindo de volta</CardTitle>
          <CardDescription className="text-slate-600 text-base">
            Entre na sua conta para continuar explorando os melhores terrenos
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6 p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                variant="modern"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-slate-700 font-medium">Senha</Label>
              <Input
                id="password"
                type="password"
                variant="modern"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <Link href="/esqueci-senha" className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors">
                Esqueceu a senha?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-6 p-8 pt-0">
            <Button type="submit" size="lg" variant="gradient" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar na minha conta'}
            </Button>
            <div className="text-center">
              <span className="text-slate-600">Não tem uma conta? </span>
              <Link href="/cadastro" className="text-violet-600 hover:text-violet-700 font-semibold transition-colors">
                Cadastre-se grátis
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}