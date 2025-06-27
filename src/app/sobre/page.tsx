import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Users, Shield, TrendingUp, Clock, CheckCircle } from "lucide-react"

export default function SobrePage() {
  const steps = [
    {
      number: 1,
      title: "Cadastre-se gratuitamente",
      description: "Crie sua conta em menos de 2 minutos",
      icon: Users
    },
    {
      number: 2,
      title: "Busque ou anuncie",
      description: "Use nossa busca inteligente ou publique seu terreno",
      icon: Search
    },
    {
      number: 3,
      title: "Conecte-se",
      description: "Entre em contato direto ou através de nossos corretores",
      icon: MapPin
    },
    {
      number: 4,
      title: "Feche o negócio",
      description: "Complete a transação com segurança e transparência",
      icon: CheckCircle
    }
  ]

  const features = [
    {
      title: "Busca Inteligente com Mapa",
      description: "Encontre terrenos por localização, preço, tamanho e características específicas usando nossa interface de mapa interativa.",
      icon: MapPin
    },
    {
      title: "Sistema de Corretores",
      description: "Conecte-se com corretores locais ou opte pela visitação autônoma com nossa tecnologia de realidade aumentada.",
      icon: Users
    },
    {
      title: "Transparência Total",
      description: "Sistema de comissionamento transparente, histórico de visitas e auditoria completa de leads.",
      icon: Shield
    },
    {
      title: "Tecnologia Avançada",
      description: "IA para assistência durante visitas, simulação de projetos e análise de mercado em tempo real.",
      icon: TrendingUp
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            LotGo
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/buscar" className="hover:text-gray-600">
              Buscar Terrenos
            </Link>
            <Link href="/vender" className="hover:text-gray-600">
              Anunciar
            </Link>
            <Link href="/sobre" className="text-foreground font-medium">
              Como Funciona
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/entrar">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/cadastro">Cadastre-se</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Como funciona a LotGo?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A primeira plataforma digital do Brasil focada exclusivamente em terrenos, 
            lotes e fazendas. Conectamos compradores e vendedores com tecnologia, 
            transparência e segurança.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Em 4 passos simples
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nossas principais funcionalidades
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Models */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Modelos de uso
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Com Corretor
                </CardTitle>
                <CardDescription>Atendimento completo com profissionais</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Corretor estilo Uber
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Visita agendada
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Acompanhamento completo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Comissão: 5% (2,5% corretor + 2,5% plataforma)
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Corretor Exclusivo
                </CardTitle>
                <CardDescription>Atendimento especializado por região</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Especialista da região
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Conhecimento local
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Prioridade nos leads
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Taxa fixa mensal + comissão
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Autovisita IA
                </CardTitle>
                <CardDescription>Tecnologia de ponta para visitas autônomas</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Realidade aumentada
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    IA guiada
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    QR Code de acesso
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Comissão reduzida
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">
              Segurança e transparência
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Toda visualização gera registro com timestamp e IP. Auditamos vendas 
              para garantir o pagamento correto de comissões. Nossa equipe jurídica 
              acompanha os processos para máxima segurança.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Rastreamento</h3>
                <p className="text-sm text-gray-600">Cada interação é registrada</p>
              </div>
              <div>
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Auditoria</h3>
                <p className="text-sm text-gray-600">Verificação de todas as vendas</p>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Jurídico</h3>
                <p className="text-sm text-gray-600">Acompanhamento legal completo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Junte-se à revolução do mercado de terrenos no Brasil
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/buscar">Buscar Terrenos</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/vender">Anunciar Terreno</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            © 2024 LotGo. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}