#!/usr/bin/env python3
"""
Script otimizado para baixar todas as imagens das 7.459 propriedades
"""

import json
import requests
import os
import time
from urllib.parse import urlparse
from pathlib import Path
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
import logging
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('image_download.log'),
        logging.StreamHandler()
    ]
)

class OptimizedImageDownloader:
    def __init__(self, max_workers=20, max_images_per_property=50):
        self.max_workers = max_workers
        self.max_images_per_property = max_images_per_property
        
        # Configurar session com retry strategy
        self.session = requests.Session()
        retry_strategy = Retry(
            total=3,
            backoff_factor=0.3,
            status_forcelist=[429, 500, 502, 503, 504]
        )
        adapter = HTTPAdapter(max_retries=retry_strategy)
        self.session.mount("http://", adapter)
        self.session.mount("https://", adapter)
        
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
        # Criar diretório
        self.images_dir = Path('chaozao_images')
        self.images_dir.mkdir(exist_ok=True)
        
        # Estatísticas
        self.stats = {
            'properties_processed': 0,
            'images_downloaded': 0,
            'images_skipped': 0,
            'errors': 0
        }
    
    def extract_image_urls_from_json(self, html_content):
        """Extrai URLs de imagens do JSON-LD estruturado"""
        image_urls = set()
        
        # Padrão para JSON-LD com imagens
        json_ld_pattern = r'"image":\s*\[(.*?)\]'
        matches = re.findall(json_ld_pattern, html_content, re.DOTALL)
        
        for match in matches:
            # Extrair URLs individuais do array
            url_pattern = r'"(https://[^"]+\.(?:jpg|jpeg|png|webp|gif))"'
            urls = re.findall(url_pattern, match, re.IGNORECASE)
            
            for url in urls:
                # Limpar URLs
                clean_url = url.replace('\\"', '').strip()
                if self.is_valid_image_url(clean_url):
                    image_urls.add(clean_url)
        
        return list(image_urls)
    
    def is_valid_image_url(self, url):
        """Verifica se é uma URL de imagem válida"""
        try:
            if not url or len(url) < 10:
                return False
            
            parsed = urlparse(url)
            if not parsed.scheme or not parsed.netloc:
                return False
            
            # Verificar extensão
            valid_extensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
            if not any(url.lower().endswith(ext) for ext in valid_extensions):
                return False
            
            # Filtrar URLs inválidas
            invalid_patterns = ['placeholder', 'loading', 'icon', 'logo', 'avatar']
            if any(pattern in url.lower() for pattern in invalid_patterns):
                return False
            
            return True
            
        except Exception:
            return False
    
    def download_image(self, image_url, save_path):
        """Baixa uma imagem"""
        try:
            if save_path.exists():
                return True
            
            response = self.session.get(image_url, timeout=15)
            response.raise_for_status()
            
            # Verificar se é realmente uma imagem
            content_type = response.headers.get('content-type', '')
            if not content_type.startswith('image/'):
                return False
            
            save_path.parent.mkdir(parents=True, exist_ok=True)
            
            with open(save_path, 'wb') as f:
                f.write(response.content)
            
            return True
            
        except Exception as e:
            logging.error(f"Erro ao baixar {image_url}: {e}")
            return False
    
    def process_property(self, property_data):
        """Processa uma propriedade"""
        property_id = property_data['id']
        property_url = property_data['url']
        
        try:
            # Extrair HTML da página
            response = self.session.get(property_url, timeout=30)
            response.raise_for_status()
            
            # Extrair URLs das imagens
            image_urls = self.extract_image_urls_from_json(response.text)
            
            # Limitar número de imagens
            if len(image_urls) > self.max_images_per_property:
                image_urls = image_urls[:self.max_images_per_property]
            
            # Criar pasta da propriedade
            property_dir = self.images_dir / property_id
            
            downloaded_images = []
            
            for i, image_url in enumerate(image_urls, 1):
                try:
                    # Determinar extensão
                    extension = Path(urlparse(image_url).path).suffix or '.jpg'
                    filename = f"image_{i:03d}{extension}"
                    save_path = property_dir / filename
                    
                    if self.download_image(image_url, save_path):
                        downloaded_images.append({
                            'original_url': image_url,
                            'local_path': str(save_path.relative_to(self.images_dir)),
                            'filename': filename
                        })
                        self.stats['images_downloaded'] += 1
                    else:
                        self.stats['images_skipped'] += 1
                
                except Exception as e:
                    logging.error(f"Erro na imagem {i} da propriedade {property_id}: {e}")
                    self.stats['errors'] += 1
            
            self.stats['properties_processed'] += 1
            
            return {
                'property_id': property_id,
                'total_images': len(downloaded_images),
                'images': downloaded_images
            }
            
        except Exception as e:
            logging.error(f"Erro ao processar propriedade {property_id}: {e}")
            self.stats['errors'] += 1
            return {
                'property_id': property_id,
                'total_images': 0,
                'images': []
            }
    
    def download_all_images(self, dataset_file='chaozao_complete_dataset.json'):
        """Baixa todas as imagens das propriedades"""
        
        logging.info("🚀 Iniciando download de todas as imagens...")
        
        # Carregar dataset
        with open(dataset_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        properties = data['properties']
        total_properties = len(properties)
        
        logging.info(f"📊 Total de propriedades: {total_properties}")
        
        start_time = time.time()
        results = []
        
        # Processar em lotes
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Submeter tarefas
            future_to_property = {
                executor.submit(self.process_property, prop): prop 
                for prop in properties
            }
            
            # Processar resultados
            for future in as_completed(future_to_property):
                try:
                    result = future.result()
                    results.append(result)
                    
                    # Log de progresso a cada 100 propriedades
                    if len(results) % 100 == 0:
                        elapsed = time.time() - start_time
                        rate = len(results) / elapsed
                        eta = (total_properties - len(results)) / rate if rate > 0 else 0
                        
                        logging.info(
                            f"📈 Progresso: {len(results)}/{total_properties} "
                            f"({len(results)/total_properties*100:.1f}%) - "
                            f"⏱️ ETA: {eta/60:.1f} min - "
                            f"📸 Imagens: {self.stats['images_downloaded']}"
                        )
                
                except Exception as e:
                    logging.error(f"Erro no future: {e}")
        
        # Atualizar dataset
        self.update_dataset(data, results, dataset_file)
        
        elapsed_time = time.time() - start_time
        
        logging.info("✅ DOWNLOAD CONCLUÍDO!")
        logging.info(f"⏱️  Tempo total: {elapsed_time/60:.1f} minutos")
        logging.info(f"📊 Propriedades processadas: {self.stats['properties_processed']}")
        logging.info(f"📸 Imagens baixadas: {self.stats['images_downloaded']}")
        logging.info(f"⚠️  Imagens puladas: {self.stats['images_skipped']}")
        logging.info(f"❌ Erros: {self.stats['errors']}")
        
        return results
    
    def update_dataset(self, original_data, results, dataset_file):
        """Atualiza dataset com informações das imagens"""
        
        # Mapear resultados
        result_map = {r['property_id']: r for r in results}
        
        # Atualizar propriedades
        for prop in original_data['properties']:
            prop_id = prop['id']
            if prop_id in result_map:
                result = result_map[prop_id]
                prop['images'] = {
                    'total_count': result['total_images'],
                    'files': result['images']
                }
            else:
                prop['images'] = {'total_count': 0, 'files': []}
        
        # Adicionar metadados
        original_data['image_download'] = {
            'date': time.strftime('%Y-%m-%d %H:%M:%S'),
            'stats': self.stats
        }
        
        # Salvar
        output_file = dataset_file.replace('.json', '_with_images.json')
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(original_data, f, indent=2, ensure_ascii=False)
        
        logging.info(f"💾 Dataset atualizado salvo: {output_file}")

def main():
    print("🖼️  DOWNLOAD DE TODAS AS IMAGENS DO CHÃOZÃO")
    print("=" * 50)
    
    downloader = OptimizedImageDownloader(max_workers=20, max_images_per_property=50)
    downloader.download_all_images()

if __name__ == "__main__":
    main()