// Dados reais do Loteamento Hermany Andrade
// Baseado no arquivo CSV: Coordenadas_de_Todos_os_Lotes__Simulados_.csv

export interface LoteHermanyAndrade {
  id: number
  numero: string
  latitude: number
  longitude: number
  preco: number
  area: number
  status: 'disponivel' | 'reservado' | 'vendido'
  tipo: 'residencial' | 'comercial' | 'misto'
  caracteristicas: string[]
}

// Dados dos lotes do Loteamento Hermany Andrade
export const lotesHermanyAndrade: LoteHermanyAndrade[] = [
  { id: 1, numero: "Lote 1", latitude: -19.806827, longitude: -41.939709, preco: 45000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Esquina", "Próximo à entrada"] },
  { id: 2, numero: "Lote 2", latitude: -19.806875, longitude: -41.939899, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Vista panorâmica"] },
  { id: 3, numero: "Lote 3", latitude: -19.806923, longitude: -41.940089, preco: 42000, area: 250, status: "reservado", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 4, numero: "Lote 4", latitude: -19.806972, longitude: -41.940279, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 5, numero: "Lote 5", latitude: -19.807020, longitude: -41.940469, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 6, numero: "Lote 6", latitude: -19.807069, longitude: -41.940658, preco: 42000, area: 250, status: "vendido", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 7, numero: "Lote 7", latitude: -19.807117, longitude: -41.940848, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 8, numero: "Lote 8", latitude: -19.807165, longitude: -41.941038, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 9, numero: "Lote 9", latitude: -19.807214, longitude: -41.941228, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 10, numero: "Lote 10", latitude: -19.807262, longitude: -41.941418, preco: 50000, area: 300, status: "disponivel", tipo: "comercial", caracteristicas: ["Frente para avenida", "Maior área"] },
  { id: 11, numero: "Lote 11", latitude: -19.807311, longitude: -41.941608, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 12, numero: "Lote 12", latitude: -19.807359, longitude: -41.941797, preco: 42000, area: 250, status: "reservado", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 13, numero: "Lote 13", latitude: -19.807407, longitude: -41.941987, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 14, numero: "Lote 14", latitude: -19.807456, longitude: -41.942177, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 15, numero: "Lote 15", latitude: -19.807504, longitude: -41.942367, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 16, numero: "Lote 16", latitude: -19.807553, longitude: -41.942557, preco: 42000, area: 250, status: "vendido", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 17, numero: "Lote 17", latitude: -19.807601, longitude: -41.942746, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 18, numero: "Lote 18", latitude: -19.807649, longitude: -41.942936, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 19, numero: "Lote 19", latitude: -19.807698, longitude: -41.943126, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 20, numero: "Lote 20", latitude: -19.807746, longitude: -41.943316, preco: 48000, area: 280, status: "disponivel", tipo: "misto", caracteristicas: ["Esquina", "Uso misto"] },
  { id: 21, numero: "Lote 21", latitude: -19.807794, longitude: -41.943506, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 22, numero: "Lote 22", latitude: -19.807843, longitude: -41.943696, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 23, numero: "Lote 23", latitude: -19.807891, longitude: -41.943885, preco: 42000, area: 250, status: "reservado", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 24, numero: "Lote 24", latitude: -19.807940, longitude: -41.944075, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 25, numero: "Lote 25", latitude: -19.807988, longitude: -41.944265, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 26, numero: "Lote 26", latitude: -19.808036, longitude: -41.944455, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 27, numero: "Lote 27", latitude: -19.808085, longitude: -41.944645, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 28, numero: "Lote 28", latitude: -19.808133, longitude: -41.944835, preco: 42000, area: 250, status: "vendido", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 29, numero: "Lote 29", latitude: -19.808182, longitude: -41.945024, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 30, numero: "Lote 30", latitude: -19.808230, longitude: -41.945214, preco: 52000, area: 320, status: "disponivel", tipo: "comercial", caracteristicas: ["Frente dupla", "Área comercial"] },
  { id: 31, numero: "Lote 31", latitude: -19.808278, longitude: -41.945404, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 32, numero: "Lote 32", latitude: -19.808327, longitude: -41.945594, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 33, numero: "Lote 33", latitude: -19.808375, longitude: -41.945784, preco: 42000, area: 250, status: "reservado", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 34, numero: "Lote 34", latitude: -19.808423, longitude: -41.945974, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 35, numero: "Lote 35", latitude: -19.808472, longitude: -41.946163, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 36, numero: "Lote 36", latitude: -19.808520, longitude: -41.946353, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 37, numero: "Lote 37", latitude: -19.808569, longitude: -41.946543, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 38, numero: "Lote 38", latitude: -19.808617, longitude: -41.946733, preco: 42000, area: 250, status: "vendido", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 39, numero: "Lote 39", latitude: -19.808665, longitude: -41.946923, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 40, numero: "Lote 40", latitude: -19.808714, longitude: -41.947113, preco: 46000, area: 260, status: "disponivel", tipo: "misto", caracteristicas: ["Próximo ao centro", "Vista elevada"] },
  { id: 41, numero: "Lote 41", latitude: -19.808762, longitude: -41.947302, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 42, numero: "Lote 42", latitude: -19.808810, longitude: -41.947492, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 43, numero: "Lote 43", latitude: -19.808859, longitude: -41.947682, preco: 42000, area: 250, status: "reservado", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 44, numero: "Lote 44", latitude: -19.808907, longitude: -41.947872, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 45, numero: "Lote 45", latitude: -19.808956, longitude: -41.948062, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 46, numero: "Lote 46", latitude: -19.809004, longitude: -41.948252, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 47, numero: "Lote 47", latitude: -19.809052, longitude: -41.948441, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 48, numero: "Lote 48", latitude: -19.809101, longitude: -41.948631, preco: 42000, area: 250, status: "vendido", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 49, numero: "Lote 49", latitude: -19.809149, longitude: -41.948821, preco: 42000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Área plana"] },
  { id: 50, numero: "Lote 50", latitude: -19.809198, longitude: -41.949011, preco: 44000, area: 250, status: "disponivel", tipo: "residencial", caracteristicas: ["Final do loteamento", "Tranquilo"] }
]

// Informações gerais do loteamento
export const loteamentoInfo = {
  nome: "Loteamento Hermany Andrade",
  cidade: "Brahman",
  estado: "Minas Gerais",
  totalLotes: 50,
  areaTotalLoteamento: "15 hectares",
  infraestrutura: [
    "Energia elétrica",
    "Água encanada",
    "Esgoto sanitário",
    "Ruas asfaltadas",
    "Iluminação pública",
    "Área verde preservada"
  ],
  documentacao: "Registro aprovado no cartório",
  facilidadesPagamento: "Entrada + 60x no cartão",
  contato: {
    telefone: "(34) 99999-9999",
    email: "vendas@hermanyandrade.com.br",
    endereco: "Brahman - MG"
  },
  // Coordenadas centrais do loteamento (média das coordenadas)
  coordenadasCentrals: {
    latitude: -19.808012,
    longitude: -41.94436
  }
}

// Função para converter lotes para formato do mapa
export function convertLotesToMapProperties() {
  return lotesHermanyAndrade.map(lote => ({
    id: lote.id,
    title: lote.numero,
    price: `R$ ${lote.preco.toLocaleString('pt-BR')}`,
    location: `${loteamentoInfo.nome}, ${loteamentoInfo.cidade} - ${loteamentoInfo.estado}`,
    coordinates: [lote.longitude, lote.latitude] as [number, number],
    image: getImageByType(lote.tipo),
    area: `${lote.area}m²`,
    rating: 4.8,
    description: `${lote.numero} - ${lote.area}m² - ${lote.caracteristicas.join(', ')}`,
    status: lote.status,
    tipo: lote.tipo,
    caracteristicas: lote.caracteristicas
  }))
}

// Função para obter imagem baseada no tipo do lote
function getImageByType(tipo: string): string {
  const images = {
    residencial: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    comercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    misto: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&h=300&fit=crop'
  }
  return images[tipo as keyof typeof images] || images.residencial
}

// Função para obter cor do marcador baseada no status
export function getMarkerColorByStatus(status: string): string {
  const colors = {
    disponivel: '#16a34a', // verde
    reservado: '#eab308',  // amarelo
    vendido: '#dc2626'     // vermelho
  }
  return colors[status as keyof typeof colors] || colors.disponivel
}