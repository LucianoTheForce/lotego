'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, MapPin, Home, FileText } from "lucide-react"

export default function VenderPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    area: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'lot',
    features: [] as string[]
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const availableFeatures = [
    'Água', 'Luz', 'Esgoto', 'Gás', 'Internet', 'Pavimentação',
    'Portaria 24h', 'Área verde', 'Playground', 'Academia',
    'Quadra esportiva', 'Piscina', 'Salão de festas', 'Churrasqueira'
  ]

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Dados do anúncio:', formData)
    // Aqui seria feita a integração com a API
    alert('Anúncio criado com sucesso! (Demo)')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              LotGo
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/entrar">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/cadastro">Cadastre-se</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Anuncie seu terreno</h1>
            <p className="text-gray-600">
              Preencha as informações abaixo para criar seu anúncio gratuito
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[...Array(totalSteps)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={`w-20 h-1 ${
                      i + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600 text-center">
              Etapa {currentStep} de {totalSteps}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {currentStep === 1 && <><FileText className="w-5 h-5" /> Informações Básicas</>}
                  {currentStep === 2 && <><MapPin className="w-5 h-5" /> Localização</>}
                  {currentStep === 3 && <><Home className="w-5 h-5" /> Características</>}
                  {currentStep === 4 && <><Upload className="w-5 h-5" /> Fotos e Finalização</>}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Conte-nos sobre seu terreno"}
                  {currentStep === 2 && "Onde está localizado seu terreno?"}
                  {currentStep === 3 && "Quais as características do terreno?"}
                  {currentStep === 4 && "Adicione fotos e revise as informações"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title">Título do anúncio *</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Ex: Terreno em condomínio fechado"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        placeholder="Descreva as principais características do seu terreno..."
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="propertyType">Tipo de terreno *</Label>
                        <select
                          id="propertyType"
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm"
                          required
                        >
                          <option value="lot">Lote</option>
                          <option value="land">Área</option>
                          <option value="farm">Fazenda</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="area">Área (m²) *</Label>
                        <Input
                          id="area"
                          name="area"
                          type="number"
                          placeholder="Ex: 450"
                          value={formData.area}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Location */}
                {currentStep === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Rua, número, bairro"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="Ex: São Paulo"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado *</Label>
                        <select
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm"
                          required
                        >
                          <option value="">Selecione...</option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">CEP</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        placeholder="00000-000"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}

                {/* Step 3: Features */}
                {currentStep === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="price">Preço (R$) *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Ex: 250000"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Características disponíveis</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {availableFeatures.map(feature => (
                          <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.features.includes(feature)}
                              onChange={() => toggleFeature(feature)}
                              className="rounded"
                            />
                            <span className="text-sm">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Step 4: Photos and Review */}
                {currentStep === 4 && (
                  <>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">Adicione fotos do seu terreno</p>
                        <p className="text-sm text-gray-500">Clique para selecionar ou arraste as imagens aqui</p>
                        <Button type="button" variant="outline" className="mt-4">
                          Selecionar Fotos
                        </Button>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Resumo do anúncio:</h3>
                        <div className="space-y-1 text-sm">
                          <p><strong>Título:</strong> {formData.title || 'Não informado'}</p>
                          <p><strong>Tipo:</strong> {formData.propertyType === 'lot' ? 'Lote' : formData.propertyType === 'land' ? 'Área' : 'Fazenda'}</p>
                          <p><strong>Área:</strong> {formData.area} m²</p>
                          <p><strong>Preço:</strong> R$ {formData.price ? Number(formData.price).toLocaleString('pt-BR') : '0'}</p>
                          <p><strong>Localização:</strong> {formData.city}, {formData.state}</p>
                          <p><strong>Características:</strong> {formData.features.join(', ') || 'Nenhuma selecionada'}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Anterior
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button type="button" onClick={nextStep}>
                      Próximo
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      Publicar Anúncio
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}