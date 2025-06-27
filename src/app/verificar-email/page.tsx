import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, ArrowRight } from "lucide-react"

export default function VerificarEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Verifique seu email</CardTitle>
          <CardDescription>
            Enviamos um link de verificação para seu email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Email de verificação enviado
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Conta criada com sucesso
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <p className="text-blue-800 mb-2">
              <strong>Próximos passos:</strong>
            </p>
            <ol className="text-left text-blue-700 space-y-1">
              <li>1. Abra seu email</li>
              <li>2. Procure por um email da LotGo</li>
              <li>3. Clique no link de verificação</li>
              <li>4. Faça login na sua conta</li>
            </ol>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Não recebeu o email? Verifique sua pasta de spam ou solicite um novo link.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button variant="outline">
                Reenviar email de verificação
              </Button>
              
              <Button asChild>
                <Link href="/entrar">
                  Já verifiquei, fazer login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            Problemas? Entre em contato com nosso{" "}
            <Link href="/suporte" className="text-blue-600 hover:underline">
              suporte
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}