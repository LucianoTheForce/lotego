'use client'

import { useState } from 'react'
import { ArrowLeft, Share, Heart, Star, MapPin, ChevronRight } from 'lucide-react'
import { SlideUp, SlideCarousel } from '@/components/animations/mobile-animations'

const propertyImages = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop"
]

const amenities = [
  { icon: "💧", name: "Água encanada" },
  { icon: "⚡", name: "Energia elétrica" },
  { icon: "🚿", name: "Rede de esgoto" },
  { icon: "🛣️", name: "Rua asfaltada" },
  { icon: "🏛️", name: "Documentação" },
  { icon: "🌳", name: "Área verde" },
]

const reviews = [
  {
    id: 1,
    name: "João Silva",
    rating: 5,
    date: "Dezembro 2024",
    comment: "Excelente localização, muito bem documentado. O proprietário foi muito atencioso durante todo o processo.",
    avatar: "JS"
  },
  {
    id: 2,
    name: "Maria Santos",
    rating: 5,
    date: "Novembro 2024", 
    comment: "Terreno plano, ideal para construção. Vizinhança tranquila e segura.",
    avatar: "MS"
  }
]

export default function PropertyDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 py-4 pt-12">
        <div className="flex items-center justify-between">
          <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
              <Share className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Image Carousel */}
      <div className="relative h-80">
        <SlideCarousel 
          currentIndex={currentImageIndex}
          className="h-full"
        >
          {propertyImages.map((image, index) => (
            <div key={index} className="h-80 w-full">
              <img 
                src={image} 
                alt={`Imagem ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </SlideCarousel>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {propertyImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {propertyImages.length}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Title and Rating */}
        <SlideUp isVisible={true} delay={100}>
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-900 flex-1 mr-4">
                Lote Residencial Centro Uberaba
              </h1>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">4.8</span>
                <span className="text-gray-600">(23 avaliações)</span>
              </div>
            </div>

            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Centro, Uberaba - MG</span>
            </div>
          </div>
        </SlideUp>

        {/* Host Info */}
        <SlideUp isVisible={true} delay={200}>
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-700">CF</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Carlos Ferreira</div>
                <div className="text-sm text-gray-600">Proprietário há 3 anos</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </SlideUp>

        {/* Property Details */}
        <SlideUp isVisible={true} delay={300}>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Sobre este terreno</h2>
            <p className="text-gray-700 leading-relaxed">
              Excelente terreno no centro histórico de Uberaba, próximo a comércios e serviços. 
              Área plana, ideal para construção residencial ou comercial. Documentação em dia, 
              com todas as aprovações necessárias.
            </p>
          </div>
        </SlideUp>

        {/* Area and Price */}
        <SlideUp isVisible={true} delay={400}>
          <div className="grid grid-cols-2 gap-4 py-4 border-b border-gray-100">
            <div>
              <div className="text-2xl font-bold text-gray-900">300 m²</div>
              <div className="text-gray-600">Área total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">R$ 180.000</div>
              <div className="text-gray-600">Preço total</div>
            </div>
          </div>
        </SlideUp>

        {/* Amenities */}
        <SlideUp isVisible={true} delay={500}>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">O que este lugar oferece</h2>
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-xl">{amenity.icon}</span>
                  <span className="text-gray-700">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
        </SlideUp>

        {/* Reviews Section */}
        <SlideUp isVisible={true} delay={600}>
          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 inline mr-2" />
                4.8 • 23 avaliações
              </h2>
              <button className="text-gray-900 font-semibold underline">
                Ver todas
              </button>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-700">{review.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900">{review.name}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-500 text-sm">{review.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 text-sm">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideUp>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xl font-bold text-gray-900">R$ 180.000</div>
            <div className="text-gray-600">total</div>
          </div>
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl font-semibold">
            Agendar visita
          </button>
        </div>
      </div>
    </div>
  )
}