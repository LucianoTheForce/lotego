import { NextRequest, NextResponse } from 'next/server'

// Dados mockados de cidades brasileiras populares para busca
const mockCities = [
  { name: "São Paulo", state: "SP", region: "Sudeste" },
  { name: "Rio de Janeiro", state: "RJ", region: "Sudeste" },
  { name: "Brasília", state: "DF", region: "Centro-Oeste" },
  { name: "Salvador", state: "BA", region: "Nordeste" },
  { name: "Fortaleza", state: "CE", region: "Nordeste" },
  { name: "Belo Horizonte", state: "MG", region: "Sudeste" },
  { name: "Manaus", state: "AM", region: "Norte" },
  { name: "Curitiba", state: "PR", region: "Sul" },
  { name: "Recife", state: "PE", region: "Nordeste" },
  { name: "Goiânia", state: "GO", region: "Centro-Oeste" },
  { name: "Belém", state: "PA", region: "Norte" },
  { name: "Porto Alegre", state: "RS", region: "Sul" },
  { name: "Guarulhos", state: "SP", region: "Sudeste" },
  { name: "Campinas", state: "SP", region: "Sudeste" },
  { name: "São Luís", state: "MA", region: "Nordeste" },
  { name: "São Gonçalo", state: "RJ", region: "Sudeste" },
  { name: "Maceió", state: "AL", region: "Nordeste" },
  { name: "Duque de Caxias", state: "RJ", region: "Sudeste" },
  { name: "Natal", state: "RN", region: "Nordeste" },
  { name: "Teresina", state: "PI", region: "Nordeste" },
  { name: "Barueri", state: "SP", region: "Sudeste" },
  { name: "Atibaia", state: "SP", region: "Sudeste" },
  { name: "Taguatinga", state: "DF", region: "Centro-Oeste" },
  { name: "Sobradinho", state: "DF", region: "Centro-Oeste" },
  { name: "Águas Claras", state: "DF", region: "Centro-Oeste" }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  const limit = Number(searchParams.get('limit')) || 10

  try {
    if (!query) {
      return NextResponse.json({ cities: [] })
    }

    // Filtrar cidades que começam com a query ou contêm a query
    const filteredCities = mockCities
      .filter(city => 
        city.name.toLowerCase().includes(query) ||
        city.state.toLowerCase().includes(query)
      )
      .slice(0, limit)
      .map(city => ({
        ...city,
        displayName: `${city.name}, ${city.state}`
      }))

    return NextResponse.json({ cities: filteredCities })
  } catch {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}