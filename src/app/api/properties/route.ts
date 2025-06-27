import { NextRequest, NextResponse } from 'next/server'

// Mock data expandido para demonstrar funcionalidade
const mockProperties = [
  {
    id: 1,
    title: "Terreno em Alphaville",
    description: "Excelente terreno em condomínio fechado com infraestrutura completa",
    price: 450000,
    area: 450,
    location: "Alphaville, Barueri - SP",
    address: "Rua das Flores, 123",
    city: "Barueri",
    state: "SP",
    zip_code: "06454-000",
    type: "lot",
    status: "active",
    coordinates: { lat: -23.5041, lng: -46.8509 },
    images: ["/images/terreno1.jpg"],
    features: ["Água", "Luz", "Esgoto", "Portaria 24h"]
  },
  {
    id: 2,
    title: "Lote no Jardim Botânico",
    description: "Lote residencial em área nobre de Brasília",
    price: 320000,
    area: 360,
    location: "Jardim Botânico, Brasília - DF",
    address: "Quadra 10, Lote 15",
    city: "Brasília",
    state: "DF",
    zip_code: "71680-000",
    type: "lot",
    status: "active",
    coordinates: { lat: -15.8697, lng: -47.8292 },
    images: ["/images/terreno2.jpg"],
    features: ["Água", "Luz", "Área verde próxima"]
  },
  {
    id: 3,
    title: "Área Rural em Atibaia",
    description: "Grande área rural com potencial para desenvolvimento",
    price: 780000,
    area: 5000,
    location: "Zona Rural, Atibaia - SP",
    address: "Estrada Municipal, Km 12",
    city: "Atibaia",
    state: "SP",
    zip_code: "12940-000",
    type: "farm",
    status: "active",
    coordinates: { lat: -23.1170, lng: -46.5503 },
    images: ["/images/fazenda1.jpg"],
    features: ["Nascente", "Mata preservada", "Acesso por estrada de terra"]
  },
  {
    id: 4,
    title: "Lote Comercial Taguatinga",
    description: "Lote comercial em área de grande movimento",
    price: 520000,
    area: 800,
    location: "Taguatinga Norte, Brasília - DF",
    address: "QNM 40, Área Especial",
    city: "Brasília",
    state: "DF",
    zip_code: "72140-000",
    type: "lot",
    status: "active",
    coordinates: { lat: -15.8031, lng: -48.0519 },
    images: ["/images/comercial1.jpg"],
    features: ["Água", "Luz", "Esgoto", "Próximo ao metrô"]
  },
  {
    id: 5,
    title: "Chácara em Sobradinho",
    description: "Chácara com casa sede e muito verde",
    price: 380000,
    area: 2000,
    location: "Sobradinho, Brasília - DF",
    address: "Condomínio Rural, Chácara 25",
    city: "Brasília",
    state: "DF",
    zip_code: "73010-000",
    type: "land",
    status: "active",
    coordinates: { lat: -15.6533, lng: -47.7958 },
    images: ["/images/chacara1.jpg"],
    features: ["Casa sede", "Poço artesiano", "Área de lazer"]
  },
  // Lotes em Uberaba - MG
  {
    id: 6,
    title: "Lote Residencial Centro Uberaba",
    description: "Excelente lote no centro histórico de Uberaba, próximo a comércios e serviços",
    price: 180000,
    area: 300,
    location: "Centro, Uberaba - MG",
    address: "Rua Major Eustáquio, 456",
    city: "Uberaba",
    state: "MG",
    zip_code: "38010-000",
    type: "lot",
    status: "active",
    coordinates: { lat: -19.7482, lng: -47.9317 },
    images: ["/images/uberaba1.jpg"],
    features: ["Água", "Luz", "Esgoto", "Meio-fio", "Calçamento"]
  },
  {
    id: 7,
    title: "Terreno Comercial Av. Leopoldino de Oliveira",
    description: "Terreno comercial de esquina na principal avenida de Uberaba",
    price: 450000,
    area: 600,
    location: "Centro, Uberaba - MG",
    address: "Av. Leopoldino de Oliveira, 1234",
    city: "Uberaba",
    state: "MG",
    zip_code: "38010-200",
    type: "lot",
    status: "active",
    coordinates: { lat: -19.7456, lng: -47.9289 },
    images: ["/images/uberaba2.jpg"],
    features: ["Água", "Luz", "Esgoto", "Alto movimento", "Esquina", "Zoneamento comercial"]
  },
  {
    id: 8,
    title: "Lote Condomínio Pinheiros Uberaba",
    description: "Lote em condomínio fechado de alto padrão com infraestrutura completa",
    price: 320000,
    area: 450,
    location: "Bairro Pinheiros, Uberaba - MG",
    address: "Condomínio Residencial Pinheiros, Quadra B",
    city: "Uberaba",
    state: "MG",
    zip_code: "38050-100",
    type: "lot",
    status: "active",
    coordinates: { lat: -19.7234, lng: -47.9123 },
    images: ["/images/uberaba3.jpg"],
    features: ["Portaria 24h", "Área verde", "Playground", "Quadra", "Piscina", "Salão festas"]
  },
  {
    id: 9,
    title: "Sítio Rural Uberaba - 2 hectares",
    description: "Área rural ideal para agronegócio ou lazer, com nascente própria",
    price: 850000,
    area: 20000,
    location: "Zona Rural, Uberaba - MG",
    address: "Fazenda Santa Clara, s/n",
    city: "Uberaba",
    state: "MG",
    zip_code: "38112-000",
    type: "farm",
    status: "active",
    coordinates: { lat: -19.8123, lng: -47.8567 },
    images: ["/images/uberaba4.jpg"],
    features: ["Nascente", "Energia elétrica", "Estrada de acesso", "Solo fértil", "Mata preservada"]
  },
  {
    id: 10,
    title: "Lote Industrial Distrito Industrial",
    description: "Terreno no distrito industrial de Uberaba, ideal para indústria e logística",
    price: 380000,
    area: 1200,
    location: "Distrito Industrial, Uberaba - MG",
    address: "Rua das Indústrias, 500",
    city: "Uberaba",
    state: "MG",
    zip_code: "38064-000",
    type: "lot",
    status: "active",
    coordinates: { lat: -19.7789, lng: -47.8945 },
    images: ["/images/uberaba5.jpg"],
    features: ["Zoneamento industrial", "Gás natural", "Água", "Esgoto", "Acesso rodovia"]
  },
  {
    id: 11,
    title: "Terreno para Prédio Bairro Mercês",
    description: "Amplo terreno para construção de edifício residencial ou comercial",
    price: 680000,
    area: 800,
    location: "Bairro Mercês, Uberaba - MG",
    address: "Rua dos Bandeirantes, 789",
    city: "Uberaba",
    state: "MG",
    zip_code: "38020-100",
    type: "lot",
    status: "active",
    coordinates: { lat: -19.7345, lng: -47.9456 },
    images: ["/images/uberaba6.jpg"],
    features: ["Gabarito 8 andares", "Esquina", "Próximo shopping", "Transporte público"]
  },
  {
    id: 12,
    title: "Chácara Urbana Bairro Olinda",
    description: "Chácara urbana com área de lazer completa e casa sede",
    price: 580000,
    area: 2500,
    location: "Bairro Olinda, Uberaba - MG",
    address: "Rua das Palmeiras, 1500",
    city: "Uberaba",
    state: "MG",
    zip_code: "38030-200",
    type: "land",
    status: "active",
    coordinates: { lat: -19.7012, lng: -47.9012 },
    images: ["/images/uberaba7.jpg"],
    features: ["Casa sede", "Piscina", "Churrasqueira", "Pomar", "Poço artesiano", "Garagem 4 carros"]
  },
  {
    id: 13,
    title: "Lote Comercial Esquina Bairro Abadia",
    description: "Lote de esquina em ponto comercial estratégico no Bairro Abadia",
    price: 280000,
    area: 400,
    location: "Bairro Abadia, Uberaba - MG",
    address: "Av. Nenê Sabino esquina com Rua Coronel Antônio Rios",
    city: "Uberaba",
    state: "MG",
    zip_code: "38025-000",
    type: "lot",
    status: "active",
    coordinates: { lat: -19.7567, lng: -47.9234 },
    images: ["/images/uberaba8.jpg"],
    features: ["Esquina movimentada", "Próximo hospital", "Transporte público", "Comércio ativo"]
  },
  {
    id: 14,
    title: "Lote Residencial Alto Padrão Bairro Leblon",
    description: "Terreno em bairro nobre de Uberaba, ideal para casa de alto padrão",
    price: 420000,
    area: 600,
    location: "Bairro Leblon, Uberaba - MG",
    address: "Rua das Mansões, 200",
    city: "Uberaba",
    state: "MG",
    zip_code: "38045-100",
    type: "lot",
    status: "active",
    coordinates: { lat: -19.7123, lng: -47.8891 },
    images: ["/images/uberaba9.jpg"],
    features: ["Bairro nobre", "Segurança", "Paisagismo", "Clube próximo", "Escola particular"]
  },
  {
    id: 15,
    title: "Área para Empreendimento Bairro São Benedito",
    description: "Grande área para desenvolvimento de condomínio ou loteamento",
    price: 1200000,
    area: 5000,
    location: "Bairro São Benedito, Uberaba - MG",
    address: "Rua do Empreendedor, s/n",
    city: "Uberaba",
    state: "MG",
    zip_code: "38015-000",
    type: "land",
    status: "active",
    coordinates: { lat: -19.7678, lng: -47.8734 },
    images: ["/images/uberaba10.jpg"],
    features: ["Área para loteamento", "Projeto aprovado", "Infraestrutura próxima", "Potencial valorização"]
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  // Parâmetros de busca
  const search = searchParams.get('search')?.toLowerCase() || ''
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : Infinity
  const minArea = searchParams.get('minArea') ? Number(searchParams.get('minArea')) : 0
  const maxArea = searchParams.get('maxArea') ? Number(searchParams.get('maxArea')) : Infinity
  const type = searchParams.get('type')
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  try {
    // Filtrar propriedades
    const filteredProperties = mockProperties.filter(property => {
      const matchesSearch = !search || 
        property.title.toLowerCase().includes(search) ||
        property.city.toLowerCase().includes(search) ||
        property.state.toLowerCase().includes(search) ||
        property.location.toLowerCase().includes(search)

      const matchesPrice = property.price >= minPrice && property.price <= maxPrice
      const matchesArea = property.area >= minArea && property.area <= maxArea
      const matchesType = !type || type === 'all' || property.type === type

      return matchesSearch && matchesPrice && matchesArea && matchesType
    })

    // Paginação
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex)

    return NextResponse.json({
      properties: paginatedProperties,
      pagination: {
        page,
        limit,
        total: filteredProperties.length,
        totalPages: Math.ceil(filteredProperties.length / limit),
        hasNext: endIndex < filteredProperties.length,
        hasPrev: startIndex > 0
      }
    })
  } catch {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}