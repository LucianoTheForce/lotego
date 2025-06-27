'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, TrendingUp, Shield, ArrowRight, Sparkles, Zap, Globe } from "lucide-react"
import { HomeMap } from "@/components/map/home-map"
import { SearchForm } from "@/components/search/search-form"
import { 
  AnimatedElement, 
  ParallaxElement, 
  MagneticElement, 
  StaggeredAnimation, 
  TextReveal, 
  FloatingElement 
} from "@/components/animations/gsap-animations"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <FloatingElement amplitude={15} duration={8} className="absolute top-10 left-10 opacity-10">
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 blur-3xl" />
        </FloatingElement>
        <FloatingElement amplitude={20} duration={12} delay={2} className="absolute bottom-20 right-20 opacity-10">
          <div className="w-96 h-96 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 blur-3xl" />
        </FloatingElement>
        <FloatingElement amplitude={10} duration={6} delay={4} className="absolute top-1/2 left-1/3 opacity-5">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-green-400 to-blue-600 blur-3xl" />
        </FloatingElement>
      </div>

      {/* Header */}
      <AnimatedElement animation="fadeIn" delay={0.2}>
        <header className="glass border-b border-white/20 sticky top-0 z-50">
          <div className="container-custom py-6">
            <div className="flex items-center justify-between">
              <MagneticElement strength={0.2}>
                <Link href="/" className="text-3xl font-black bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-transparent">
                  LotGo
                </Link>
              </MagneticElement>
              
              <nav className="hidden md:flex items-center gap-8">
                <MagneticElement strength={0.1}>
                  <Link href="/buscar" className="relative group text-neutral-700 hover:text-primary-600 transition-colors font-medium">
                    Buscar Terrenos
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-purple-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                </MagneticElement>
                <MagneticElement strength={0.1}>
                  <Link href="/vender" className="relative group text-neutral-700 hover:text-primary-600 transition-colors font-medium">
                    Anunciar
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-purple-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                </MagneticElement>
                <MagneticElement strength={0.1}>
                  <Link href="/sobre" className="relative group text-neutral-700 hover:text-primary-600 transition-colors font-medium">
                    Como Funciona
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-purple-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                </MagneticElement>
              </nav>
              
              <div className="flex items-center gap-4">
                <MagneticElement strength={0.15}>
                  <Button variant="ghost" asChild className="hover:bg-primary-50 hover:text-primary-700 transition-all duration-300">
                    <Link href="/entrar">Entrar</Link>
                  </Button>
                </MagneticElement>
                <MagneticElement strength={0.15}>
                  <Button asChild className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <Link href="/cadastro">
                      Cadastre-se
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </MagneticElement>
              </div>
            </div>
          </div>
        </header>
      </AnimatedElement>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <AnimatedElement animation="fadeUp" delay={0.4}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-50 to-purple-50 border border-primary-200/50 text-primary-700 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Plataforma #1 para terrenos no Brasil
                </div>
              </AnimatedElement>

              <div className="space-y-6">
                <TextReveal className="text-display-2xl font-black text-neutral-900 leading-tight">
                  O jeito inteligente de comprar e vender terrenos
                </TextReveal>
                
                <AnimatedElement animation="fadeUp" delay={0.8}>
                  <p className="text-xl text-neutral-600 leading-relaxed max-w-xl">
                    Encontre o terreno ideal ou venda sua propriedade com tecnologia, 
                    transparência e segurança. A primeira plataforma 100% focada em terrenos.
                  </p>
                </AnimatedElement>
              </div>

              <AnimatedElement animation="fadeUp" delay={1}>
                <div className="max-w-md">
                  <SearchForm size="large" />
                </div>
              </AnimatedElement>

              <StaggeredAnimation delay={1.2} stagger={0.1} className="flex items-center gap-8 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
                  <span className="font-medium">15 terrenos em Uberaba</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
                  <span className="font-medium">+500 vendas/mês</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
                  <span className="font-medium">100% seguro</span>
                </div>
              </StaggeredAnimation>
            </div>

            <AnimatedElement animation="scale" delay={0.6} className="relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-purple-600 rounded-3xl blur-3xl opacity-20 scale-105" />
                <div className="relative bg-white rounded-3xl shadow-2xl border border-neutral-200/50 overflow-hidden">
                  <HomeMap />
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-neutral-50 to-white relative">
        <ParallaxElement speed={0.3} className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,theme(colors.primary.200)_1px,transparent_1px)] bg-[length:50px_50px]" />
        </ParallaxElement>
        
        <div className="container-custom relative">
          <div className="text-center mb-16">
            <AnimatedElement animation="fadeUp">
              <h2 className="text-display-lg font-bold text-neutral-900 mb-4">
                Por que escolher a LotGo?
              </h2>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.2}>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Revolucionamos o mercado de terrenos com tecnologia de ponta e experiência premium
              </p>
            </AnimatedElement>
          </div>

          <StaggeredAnimation stagger={0.2} className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Busca Inteligente",
                description: "IA avançada para encontrar terrenos por localização, preço, tamanho e características específicas",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                icon: Globe,
                title: "Experiência Premium",
                description: "Interface moderna com mapas interativos, realidade aumentada e visitas guiadas por IA",
                gradient: "from-blue-400 to-cyan-500"
              },
              {
                icon: Shield,
                title: "Segurança Total",
                description: "Sistema de auditoria completo, documentação digital e acompanhamento jurídico",
                gradient: "from-green-400 to-emerald-500"
              }
            ].map((feature, index) => (
              <MagneticElement key={index} strength={0.1}>
                <div className="card-modern group cursor-pointer h-full">
                  <div className="p-8 h-full flex flex-col">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">{feature.title}</h3>
                    <p className="text-neutral-600 leading-relaxed flex-1">{feature.description}</p>
                    <div className="mt-6 flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                      Saiba mais
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </MagneticElement>
            ))}
          </StaggeredAnimation>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,theme(colors.primary.500/0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,theme(colors.purple.500/0.1)_0%,transparent_50%)]" />
        
        <div className="container-custom relative">
          <div className="text-center mb-16">
            <AnimatedElement animation="fadeUp">
              <h2 className="text-display-lg font-bold mb-4">
                Números que impressionam
              </h2>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.2}>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                Nossa plataforma já conectou milhares de pessoas aos seus terrenos ideais
              </p>
            </AnimatedElement>
          </div>

          <StaggeredAnimation stagger={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "15+", label: "Terrenos em Uberaba", suffix: "" },
              { number: "5.000+", label: "Propriedades Ativas", suffix: "" },
              { number: "500+", label: "Vendas por Mês", suffix: "" },
              { number: "99%", label: "Satisfação", suffix: "" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-neutral-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </StaggeredAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-50 via-purple-50 to-primary-100 relative">
        <div className="container-custom text-center">
          <AnimatedElement animation="fadeUp">
            <h2 className="text-display-lg font-bold text-neutral-900 mb-6">
              Pronto para encontrar seu terreno ideal?
            </h2>
          </AnimatedElement>
          <AnimatedElement animation="fadeUp" delay={0.2}>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Junte-se à revolução do mercado imobiliário. Cadastre-se gratuitamente e comece hoje mesmo.
            </p>
          </AnimatedElement>
          <StaggeredAnimation delay={0.4} stagger={0.1} className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticElement strength={0.15}>
              <Button size="lg" asChild className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group px-8 py-4 text-lg">
                <Link href="/buscar">
                  <MapPin className="w-5 h-5 mr-2" />
                  Buscar Terrenos
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </MagneticElement>
            <MagneticElement strength={0.15}>
              <Button size="lg" variant="outline" asChild className="border-2 border-primary-300 text-primary-700 hover:bg-primary-50 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg">
                <Link href="/vender">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Anunciar Terreno
                </Link>
              </Button>
            </MagneticElement>
          </StaggeredAnimation>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-neutral-900 text-white relative">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <Link href="/" className="text-2xl font-black bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                LotGo
              </Link>
              <p className="text-neutral-400 leading-relaxed">
                A plataforma inteligente para compra e venda de terrenos no Brasil. Tecnologia, transparência e segurança.
              </p>
            </div>
            {[
              {
                title: "Para Compradores",
                links: ["Buscar Terrenos", "Financiamento", "Simulador", "Suporte"]
              },
              {
                title: "Para Vendedores", 
                links: ["Anunciar Terreno", "Planos", "Para Corretores", "Analytics"]
              },
              {
                title: "Empresa",
                links: ["Sobre Nós", "Como Funciona", "Blog", "Carreiras"]
              }
            ].map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-bold text-lg">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-neutral-800 text-center text-neutral-400">
            <p>© 2024 LotGo. Todos os direitos reservados. Feito com ❤️ para revolucionar o mercado imobiliário.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}