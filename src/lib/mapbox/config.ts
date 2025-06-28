export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// Debug: verificar se o token está carregado
if (typeof window !== 'undefined') {
  console.log('MAPBOX_TOKEN carregado:', MAPBOX_TOKEN ? 'Sim' : 'Não')
  if (!MAPBOX_TOKEN) {
    console.warn('⚠️ MAPBOX_TOKEN não encontrado! Verifique as variáveis de ambiente.')
  }
}

export const MAPBOX_STYLE = 'mapbox://styles/mapbox/standard'

export const DEFAULT_CENTER = {
  lng: -47.9195,
  lat: -19.9167
} // Região central do Brasil (entre Brasília e São Paulo)

export const DEFAULT_ZOOM = 6 // Zoom menor para mostrar mais do Brasil

// Configurações 3D para o mapa hero
export const HERO_MAP_CONFIG = {
  center: { lng: -47.9195, lat: -19.9167 },
  zoom: 4,
  pitch: 60, // Inclinação 3D
  bearing: -20 // Rotação
}

// Configurações 3D padrão para mapas
export const DEFAULT_3D_CONFIG = {
  pitch: 45,
  bearing: 0,
  antialias: true
}