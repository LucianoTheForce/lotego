#!/usr/bin/env python3
"""
Script para extrair e baixar todas as imagens das propriedades do Chãozão
"""

import json
import requests
import os
import time
from urllib.parse import urlparse, urljoin
from pathlib import Path
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
import logging

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('image_scraper.log'),
        logging.StreamHandler()
    ]
)

class ChaoImageScraper:
    def __init__(self, max_workers=10, delay=0.5):
        self.max_workers = max_workers
        self.delay = delay
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        # Criar diretório base para imagens
        self.images_dir = Path('chaozao_images')
        self.images_dir.mkdir(exist_ok=True)
        
    def extract_images_from_page(self, property_url, property_id):
        """Extrai URLs das imagens de uma página de propriedade"""
        try:
            logging.info(f"Extraindo imagens da propriedade {property_id}")
            
            response = self.session.get(property_url, timeout=30)
            response.raise_for_status()
            
            html_content = response.text
            
            # Padrões para encontrar imagens
            image_patterns = [
                # URLs de imagens diretas
                r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>',
                # URLs em data attributes
                r'data-src=["\']([^"\']+)["\']',
                # URLs em background-image CSS
                r'background-image:\s*url\(["\']?([^"\'()]+)["\']?\)',
                # URLs específicas do Chãozão
                r'https://[^"\']+\.(?:jpg|jpeg|png|webp|gif)',
                # Carrossel de imagens
                r'"image":\s*"([^"]+)"',
                # Gallery data
                r'"url":\s*"([^"]+\.(?:jpg|jpeg|png|webp))"'
            ]
            
            image_urls = set()
            
            for pattern in image_patterns:
                matches = re.findall(pattern, html_content, re.IGNORECASE)
                for match in matches:
                    # Limpar e validar URL
                    clean_url = match.strip()
                    if clean_url and any(ext in clean_url.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif']):
                        # Converter URLs relativas para absolutas
                        if clean_url.startswith('//'):
                            clean_url = 'https:' + clean_url
                        elif clean_url.startswith('/'):
                            clean_url = urljoin(property_url, clean_url)
                        elif not clean_url.startswith('http'):
                            clean_url = urljoin(property_url, clean_url)
                        
                        image_urls.add(clean_url)
            
            # Filtrar apenas URLs válidas de imagem
            valid_images = []
            for url in image_urls:
                if self.is_valid_image_url(url):
                    valid_images.append(url)
            
            logging.info(f"Encontradas {len(valid_images)} imagens para propriedade {property_id}")
            return valid_images
            
        except Exception as e:
            logging.error(f"Erro ao extrair imagens da propriedade {property_id}: {e}")
            return []
    
    def is_valid_image_url(self, url):
        """Verifica se a URL é uma imagem válida"""
        try:
            parsed = urlparse(url)
            if not parsed.scheme or not parsed.netloc:
                return False
            
            # Verificar extensão
            path = parsed.path.lower()
            if not any(path.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif']):
                return False
            
            # Filtrar URLs inválidas comuns
            invalid_patterns = [
                'placeholder', 'loading', 'spinner', 'icon', 'logo',
                'avatar', 'profile', 'thumbnail_', 'thumb_'
            ]
            
            if any(pattern in url.lower() for pattern in invalid_patterns):
                return False
            
            return True
            
        except Exception:
            return False
    
    def download_image(self, image_url, save_path):
        """Baixa uma imagem individual"""
        try:
            response = self.session.get(image_url, timeout=30)
            response.raise_for_status()
            
            with open(save_path, 'wb') as f:
                f.write(response.content)
            
            return True
            
        except Exception as e:
            logging.error(f"Erro ao baixar imagem {image_url}: {e}")
            return False
    
    def process_property(self, property_data):
        """Processa uma propriedade: extrai e baixa todas as imagens"""
        property_id = property_data['id']
        property_url = property_data['url']
        
        # Criar pasta para a propriedade
        property_dir = self.images_dir / property_id
        property_dir.mkdir(exist_ok=True)
        
        # Extrair URLs das imagens
        image_urls = self.extract_images_from_page(property_url, property_id)
        
        downloaded_images = []
        
        for i, image_url in enumerate(image_urls, 1):
            try:
                # Determinar extensão da imagem
                parsed_url = urlparse(image_url)
                file_extension = Path(parsed_url.path).suffix or '.jpg'
                
                # Nome do arquivo
                filename = f"image_{i:03d}{file_extension}"
                save_path = property_dir / filename
                
                # Pular se já existe
                if save_path.exists():
                    downloaded_images.append({
                        'original_url': image_url,
                        'local_path': str(save_path.relative_to(self.images_dir)),
                        'filename': filename,
                        'index': i
                    })
                    continue
                
                # Baixar imagem
                if self.download_image(image_url, save_path):
                    downloaded_images.append({
                        'original_url': image_url,
                        'local_path': str(save_path.relative_to(self.images_dir)),
                        'filename': filename,
                        'index': i
                    })
                    logging.info(f"✓ Baixada: {property_id}/image_{i:03d}")
                
                # Delay entre downloads
                time.sleep(self.delay)
                
            except Exception as e:
                logging.error(f"Erro ao processar imagem {i} da propriedade {property_id}: {e}")
        
        return {
            'property_id': property_id,
            'total_images': len(downloaded_images),
            'images': downloaded_images
        }
    
    def scrape_all_images(self, dataset_file='chaozao_complete_dataset.json', sample_size=None):
        """Extrai e baixa todas as imagens das propriedades"""
        
        # Carregar dataset
        with open(dataset_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        properties = data['properties']
        
        if sample_size:
            properties = properties[:sample_size]
            logging.info(f"Processando amostra de {sample_size} propriedades")
        else:
            logging.info(f"Processando todas as {len(properties)} propriedades")
        
        results = []
        total_images = 0
        
        # Processar propriedades em paralelo
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Submeter tarefas
            future_to_property = {
                executor.submit(self.process_property, prop): prop 
                for prop in properties
            }
            
            # Processar resultados
            for i, future in enumerate(as_completed(future_to_property), 1):
                try:
                    result = future.result()
                    results.append(result)
                    total_images += result['total_images']
                    
                    # Log de progresso
                    if i % 100 == 0 or i == len(properties):
                        logging.info(f"Progresso: {i}/{len(properties)} propriedades ({i/len(properties)*100:.1f}%) - {total_images} imagens")
                
                except Exception as e:
                    property_data = future_to_property[future]
                    logging.error(f"Erro ao processar propriedade {property_data['id']}: {e}")
        
        # Atualizar dataset com informações das imagens
        self.update_dataset_with_images(data, results, dataset_file)
        
        logging.info(f"✅ Scraping concluído!")
        logging.info(f"📊 Total de propriedades processadas: {len(results)}")
        logging.info(f"📸 Total de imagens baixadas: {total_images}")
        
        return results
    
    def update_dataset_with_images(self, original_data, image_results, dataset_file):
        """Atualiza o dataset original com informações das imagens"""
        
        # Criar mapeamento de resultados por property_id
        image_map = {result['property_id']: result for result in image_results}
        
        # Atualizar propriedades
        for property_data in original_data['properties']:
            property_id = property_data['id']
            
            if property_id in image_map:
                image_info = image_map[property_id]
                property_data['images'] = {
                    'total_count': image_info['total_images'],
                    'files': image_info['images']
                }
            else:
                property_data['images'] = {
                    'total_count': 0,
                    'files': []
                }
        
        # Adicionar metadados
        original_data['image_scraping'] = {
            'date': time.strftime('%Y-%m-%d %H:%M:%S'),
            'total_properties_processed': len(image_results),
            'total_images_downloaded': sum(r['total_images'] for r in image_results)
        }
        
        # Salvar dataset atualizado
        output_file = dataset_file.replace('.json', '_with_images.json')
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(original_data, f, indent=2, ensure_ascii=False)
        
        logging.info(f"💾 Dataset atualizado salvo em: {output_file}")

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Scraper de imagens do Chãozão')
    parser.add_argument('--sample', type=int, help='Processar apenas uma amostra de N propriedades')
    parser.add_argument('--workers', type=int, default=5, help='Número de workers paralelos')
    parser.add_argument('--delay', type=float, default=0.5, help='Delay entre downloads (segundos)')
    parser.add_argument('--dataset', default='chaozao_complete_dataset.json', help='Arquivo do dataset')
    
    args = parser.parse_args()
    
    scraper = ChaoImageScraper(max_workers=args.workers, delay=args.delay)
    
    print("🖼️  INICIANDO SCRAPING DE IMAGENS DO CHÃOZÃO")
    print(f"📁 Imagens serão salvas em: {scraper.images_dir}")
    print(f"⚙️  Workers: {args.workers}, Delay: {args.delay}s")
    
    if args.sample:
        print(f"📊 Processando amostra de {args.sample} propriedades")
    else:
        print("📊 Processando TODAS as propriedades")
    
    results = scraper.scrape_all_images(
        dataset_file=args.dataset,
        sample_size=args.sample
    )
    
    print("\n✅ SCRAPING CONCLUÍDO!")
    print(f"📸 Total de imagens baixadas: {sum(r['total_images'] for r in results)}")

if __name__ == "__main__":
    main()