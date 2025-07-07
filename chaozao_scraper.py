#!/usr/bin/env python3
"""
Chaozão.com.br Property Scraper
Extrai dados de propriedades rurais do portal Chaozão

Uso:
    python chaozao_scraper.py --full     # Extrai todas as propriedades
    python chaozao_scraper.py --sample   # Extrai uma amostra
    python chaozao_scraper.py --sitemap  # Apenas extrai URLs do sitemap
"""

import requests
import xml.etree.ElementTree as ET
import json
import csv
import re
import time
from urllib.parse import urljoin
from dataclasses import dataclass
from typing import List, Dict, Optional
import argparse
import logging

# Configuração de logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class Property:
    """Classe para representar uma propriedade"""
    id: str
    title: str
    type: str
    price: Optional[int]
    price_formatted: str
    area_hectares: Optional[float]
    area_m2: Optional[float]
    area_alqueires: Optional[float]
    city: str
    state: str
    latitude: Optional[float]
    longitude: Optional[float]
    features: List[str]
    description: str
    reference_code: Optional[str]
    photos_count: int
    url: str

class ChaozaoScraper:
    """Scraper para extrair dados do Chaozão.com.br"""
    
    def __init__(self):
        self.base_url = "https://chaozao.com.br"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.properties = []
        
    def extract_sitemap_urls(self) -> List[str]:
        """Extrai todas as URLs do sitemap"""
        urls = []
        
        # Primeiro, pega o sitemap principal
        try:
            response = self.session.get(f"{self.base_url}/sitemap.xml")
            response.raise_for_status()
            
            root = ET.fromstring(response.content)
            
            # Extrai URLs dos sub-sitemaps
            for sitemap in root.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}sitemap"):
                loc = sitemap.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
                if loc is not None:
                    sitemap_url = loc.text
                    logger.info(f"Processando sitemap: {sitemap_url}")
                    urls.extend(self._extract_urls_from_sitemap(sitemap_url))
                    
        except Exception as e:
            logger.error(f"Erro ao processar sitemap principal: {e}")
            
        # Filtra apenas URLs de propriedades
        property_urls = [url for url in urls if "/imovel/" in url]
        logger.info(f"Total de propriedades encontradas: {len(property_urls)}")
        
        return property_urls
    
    def _extract_urls_from_sitemap(self, sitemap_url: str) -> List[str]:
        """Extrai URLs de um sitemap específico"""
        urls = []
        
        try:
            response = self.session.get(sitemap_url)
            response.raise_for_status()
            
            root = ET.fromstring(response.content)
            
            for url in root.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}url"):
                loc = url.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
                if loc is not None:
                    urls.append(loc.text)
                    
        except Exception as e:
            logger.error(f"Erro ao processar {sitemap_url}: {e}")
            
        return urls
    
    def extract_property_data(self, url: str) -> Optional[Property]:
        """Extrai dados de uma propriedade específica"""
        try:
            response = self.session.get(url)
            response.raise_for_status()
            
            html = response.text
            
            # Extrai dados básicos da URL
            url_pattern = r'/imovel/([^/]+)/([^/]+)$'
            match = re.search(url_pattern, url)
            if not match:
                logger.warning(f"URL não segue padrão esperado: {url}")
                return None
                
            description_slug = match.group(1)
            property_id = match.group(2)
            
            # Extrai dados do HTML (implementação simplificada)
            # Aqui você implementaria a lógica para extrair todos os dados
            # usando BeautifulSoup ou regex
            
            # Exemplo básico de extração
            title = self._extract_title(html)
            price = self._extract_price(html)
            location = self._extract_location(html)
            
            property_data = Property(
                id=property_id,
                title=title or "Título não encontrado",
                type=self._extract_type(description_slug),
                price=price,
                price_formatted=self._format_price(price),
                area_hectares=self._extract_area_hectares(html),
                area_m2=self._extract_area_m2(html),
                area_alqueires=self._extract_area_alqueires(html),
                city=location.get('city', ''),
                state=location.get('state', ''),
                latitude=self._extract_latitude(html),
                longitude=self._extract_longitude(html),
                features=self._extract_features(html),
                description=self._extract_description(html),
                reference_code=self._extract_reference_code(html),
                photos_count=self._extract_photos_count(html),
                url=url
            )
            
            return property_data
            
        except Exception as e:
            logger.error(f"Erro ao extrair dados de {url}: {e}")
            return None
    
    def _extract_title(self, html: str) -> Optional[str]:
        """Extrai o título da propriedade"""
        # Implementar lógica de extração do título
        pass
    
    def _extract_price(self, html: str) -> Optional[int]:
        """Extrai o preço da propriedade"""
        # Implementar lógica de extração do preço
        pass
    
    def _extract_location(self, html: str) -> Dict[str, str]:
        """Extrai localização da propriedade"""
        # Implementar lógica de extração da localização
        return {'city': '', 'state': ''}
    
    def _extract_type(self, description_slug: str) -> str:
        """Extrai tipo da propriedade da URL"""
        if 'fazenda' in description_slug:
            return 'Fazenda'
        elif 'chacara' in description_slug:
            return 'Chácara'
        elif 'sitio' in description_slug:
            return 'Sítio'
        elif 'rancho' in description_slug:
            return 'Rancho'
        else:
            return 'Propriedade Rural'
    
    def _extract_area_hectares(self, html: str) -> Optional[float]:
        """Extrai área em hectares"""
        # Implementar lógica de extração da área
        pass
    
    def _extract_area_m2(self, html: str) -> Optional[float]:
        """Extrai área em m²"""
        # Implementar lógica de extração da área
        pass
    
    def _extract_area_alqueires(self, html: str) -> Optional[float]:
        """Extrai área em alqueires"""
        # Implementar lógica de extração da área
        pass
    
    def _extract_latitude(self, html: str) -> Optional[float]:
        """Extrai latitude"""
        # Implementar lógica de extração das coordenadas
        pass
    
    def _extract_longitude(self, html: str) -> Optional[float]:
        """Extrai longitude"""
        # Implementar lógica de extração das coordenadas
        pass
    
    def _extract_features(self, html: str) -> List[str]:
        """Extrai características da propriedade"""
        # Implementar lógica de extração das características
        return []
    
    def _extract_description(self, html: str) -> str:
        """Extrai descrição da propriedade"""
        # Implementar lógica de extração da descrição
        return ""
    
    def _extract_reference_code(self, html: str) -> Optional[str]:
        """Extrai código de referência"""
        # Implementar lógica de extração do código
        pass
    
    def _extract_photos_count(self, html: str) -> int:
        """Extrai número de fotos"""
        # Implementar lógica de extração do número de fotos
        return 0
    
    def _format_price(self, price: Optional[int]) -> str:
        """Formata preço em reais"""
        if price is None:
            return "Consulte"
        return f"R$ {price:,.0f}".replace(',', '.')
    
    def scrape_all_properties(self, limit: Optional[int] = None) -> List[Property]:
        """Faz scraping de todas as propriedades"""
        urls = self.extract_sitemap_urls()
        
        if limit:
            urls = urls[:limit]
            
        for i, url in enumerate(urls, 1):
            logger.info(f"Processando propriedade {i}/{len(urls)}: {url}")
            
            property_data = self.extract_property_data(url)
            if property_data:
                self.properties.append(property_data)
                
            # Pausa entre requisições para ser respeitoso
            time.sleep(1)
            
        return self.properties
    
    def save_to_json(self, filename: str):
        """Salva dados em JSON"""
        data = {
            'total_properties': len(self.properties),
            'extraction_date': time.strftime('%Y-%m-%d %H:%M:%S'),
            'properties': [property.__dict__ for property in self.properties]
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            
        logger.info(f"Dados salvos em {filename}")
    
    def save_to_csv(self, filename: str):
        """Salva dados em CSV"""
        if not self.properties:
            logger.warning("Nenhuma propriedade para salvar")
            return
            
        fieldnames = [
            'id', 'title', 'type', 'price', 'price_formatted',
            'area_hectares', 'area_m2', 'area_alqueires',
            'city', 'state', 'latitude', 'longitude',
            'features', 'description', 'reference_code',
            'photos_count', 'url'
        ]
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            
            for property in self.properties:
                row = property.__dict__.copy()
                row['features'] = '; '.join(row['features'])
                writer.writerow(row)
                
        logger.info(f"Dados salvos em {filename}")

def main():
    """Função principal"""
    parser = argparse.ArgumentParser(description='Scraper para Chaozão.com.br')
    parser.add_argument('--full', action='store_true', help='Extrai todas as propriedades')
    parser.add_argument('--sample', type=int, default=10, help='Extrai uma amostra (padrão: 10)')
    parser.add_argument('--sitemap', action='store_true', help='Apenas extrai URLs do sitemap')
    parser.add_argument('--output', default='chaozao_data', help='Prefixo dos arquivos de saída')
    
    args = parser.parse_args()
    
    scraper = ChaozaoScraper()
    
    if args.sitemap:
        urls = scraper.extract_sitemap_urls()
        with open(f"{args.output}_urls.txt", 'w') as f:
            for url in urls:
                f.write(url + '\\n')
        logger.info(f"URLs salvas em {args.output}_urls.txt")
        return
    
    if args.full:
        scraper.scrape_all_properties()
    else:
        scraper.scrape_all_properties(limit=args.sample)
    
    # Salva os dados
    scraper.save_to_json(f"{args.output}.json")
    scraper.save_to_csv(f"{args.output}.csv")
    
    logger.info(f"Extração concluída. Total de propriedades: {len(scraper.properties)}")

if __name__ == "__main__":
    main()