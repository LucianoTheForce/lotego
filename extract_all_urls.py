#!/usr/bin/env python3
"""
Script otimizado para extrair apenas as URLs de todas as propriedades
"""

import requests
import xml.etree.ElementTree as ET
import json
import re
from urllib.parse import unquote
import time

def extract_all_urls():
    """Extrai todas as URLs dos sitemaps"""
    
    all_urls = []
    
    # Processar todos os sitemaps
    for i in range(8):  # sitemap-0.xml até sitemap-7.xml
        sitemap_url = f"https://chaozao.com.br/sitemap-{i}.xml"
        
        try:
            print(f"Processando sitemap {i+1}/8: {sitemap_url}")
            
            response = requests.get(sitemap_url, timeout=30)
            response.raise_for_status()
            
            # Parse XML
            root = ET.fromstring(response.content)
            
            # Extrair URLs de propriedades
            for url_elem in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}url'):
                loc_elem = url_elem.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')
                if loc_elem is not None:
                    url = loc_elem.text
                    # Filtrar apenas URLs de propriedades
                    if '/imovel/' in url:
                        all_urls.append(url)
            
            print(f"  -> {len(all_urls)} URLs extraídas até agora")
            
        except Exception as e:
            print(f"Erro ao processar sitemap {i}: {e}")
    
    return all_urls

def parse_url_data(url):
    """Extrai informações da URL"""
    
    # Remover protocolo e domínio
    path = url.replace('https://chaozao.com.br', '')
    
    # Padrão regex para extrair informações
    pattern = r'/imovel/([^/]+)/([^/]+)$'
    match = re.match(pattern, path)
    
    if not match:
        return None
    
    description = match.group(1)
    code = match.group(2)
    
    # Decodificar URL
    description = unquote(description)
    
    # Extrair tipo
    tipo_map = {
        'fazenda': 'Fazenda',
        'sitio': 'Sítio', 
        'chacara': 'Chácara',
        'terreno': 'Terreno',
        'casa': 'Casa Rural',
        'haras': 'Haras'
    }
    
    tipo = 'Não identificado'
    for key, value in tipo_map.items():
        if key in description.lower():
            tipo = value
            break
    
    # Extrair cidade e estado
    cidade = ''
    estado = ''
    
    em_pattern = r'em-([^-]+)-([^-]+)'
    em_match = re.search(em_pattern, description)
    if em_match:
        cidade = em_match.group(1).replace('-', ' ').title()
        estado_raw = em_match.group(2)
        
        # Mapear estados
        estados = {
            'sao-paulo': 'SP', 'goias': 'GO', 'mato-grosso': 'MT',
            'mato-grosso-do-sul': 'MS', 'tocantins': 'TO', 'minas-gerais': 'MG',
            'bahia': 'BA', 'para': 'PA', 'rondonia': 'RO', 'acre': 'AC',
            'amazonas': 'AM', 'roraima': 'RR', 'amapa': 'AP', 'maranhao': 'MA',
            'piaui': 'PI', 'ceara': 'CE', 'rio-grande-do-norte': 'RN',
            'paraiba': 'PB', 'pernambuco': 'PE', 'alagoas': 'AL',
            'sergipe': 'SE', 'espirito-santo': 'ES', 'rio-de-janeiro': 'RJ',
            'parana': 'PR', 'santa-catarina': 'SC', 'rio-grande-do-sul': 'RS',
            'distrito-federal': 'DF'
        }
        
        # Tratar estados compostos (ex: mato-grosso-do-sul)
        if estado_raw == 'mato' and 'grosso-do-sul' in description:
            estado = 'MS'
        elif estado_raw == 'mato' and 'grosso' in description:
            estado = 'MT'
        elif estado_raw == 'rio' and 'grande-do-norte' in description:
            estado = 'RN'
        elif estado_raw == 'rio' and 'grande-do-sul' in description:
            estado = 'RS'
        elif estado_raw == 'rio' and 'de-janeiro' in description:
            estado = 'RJ'
        else:
            estado = estados.get(estado_raw, estado_raw.upper())
    
    # Extrair área
    area_hectares = None
    area_m2 = None
    
    area_pattern = r'area-de-(\d+(?:\.\d+)?)-?(ha|m|hectares|metros)'
    area_match = re.search(area_pattern, description)
    if area_match:
        area_valor = float(area_match.group(1))
        area_unidade = area_match.group(2)
        
        if area_unidade in ['ha', 'hectares']:
            area_hectares = area_valor
        elif area_unidade in ['m', 'metros']:
            area_m2 = area_valor
    
    # Extrair preço
    preco = None
    preco_formatted = 'Consulte'
    
    preco_pattern = r'r-(\d+)'
    preco_match = re.search(preco_pattern, description)
    if preco_match:
        preco = int(preco_match.group(1))
        preco_formatted = f"R$ {preco:,.2f}".replace(',', '_').replace('.', ',').replace('_', '.')
    
    return {
        'id': code,
        'title': description.replace('-', ' ').title(),
        'type': tipo,
        'price': preco,
        'price_formatted': preco_formatted,
        'area_hectares': area_hectares,
        'area_m2': area_m2,
        'city': cidade,
        'state': estado,
        'reference_code': code,
        'url': url,
        'description_raw': description
    }

def main():
    print("=== EXTRAÇÃO COMPLETA DO CHÃOZÃO ===")
    print("Iniciando extração de todas as URLs...")
    
    start_time = time.time()
    
    # Extrair todas as URLs
    all_urls = extract_all_urls()
    
    print(f"\n✅ Total de URLs extraídas: {len(all_urls)}")
    
    # Processar URLs em lote
    print("\n📊 Processando dados das URLs...")
    
    processed_properties = []
    
    for i, url in enumerate(all_urls, 1):
        if i % 1000 == 0:
            print(f"  Processadas: {i}/{len(all_urls)} ({i/len(all_urls)*100:.1f}%)")
        
        parsed = parse_url_data(url)
        if parsed:
            processed_properties.append(parsed)
    
    # Salvar dados
    output_data = {
        'total_properties': len(processed_properties),
        'extraction_date': time.strftime('%Y-%m-%d %H:%M:%S'),
        'extraction_time_seconds': round(time.time() - start_time, 2),
        'properties': processed_properties
    }
    
    # Salvar JSON
    with open('chaozao_complete_dataset.json', 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    # Salvar CSV
    if processed_properties:
        import csv
        with open('chaozao_complete_dataset.csv', 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=processed_properties[0].keys())
            writer.writeheader()
            writer.writerows(processed_properties)
    
    elapsed_time = time.time() - start_time
    
    print(f"\n🎉 EXTRAÇÃO CONCLUÍDA!")
    print(f"📊 Total de propriedades: {len(processed_properties)}")
    print(f"⏱️  Tempo total: {elapsed_time:.2f} segundos")
    print(f"📁 Arquivos salvos:")
    print(f"   - chaozao_complete_dataset.json")
    print(f"   - chaozao_complete_dataset.csv")
    
    # Estatísticas básicas
    if processed_properties:
        print(f"\n📈 ESTATÍSTICAS BÁSICAS:")
        
        # Tipos de propriedades
        tipos = {}
        for prop in processed_properties:
            tipo = prop.get('type', 'Não identificado')
            tipos[tipo] = tipos.get(tipo, 0) + 1
        
        print(f"   Tipos de propriedades:")
        for tipo, count in sorted(tipos.items(), key=lambda x: x[1], reverse=True):
            print(f"     {tipo}: {count} ({count/len(processed_properties)*100:.1f}%)")
        
        # Estados
        estados = {}
        for prop in processed_properties:
            estado = prop.get('state', 'N/A')
            if estado and estado != 'N/A':
                estados[estado] = estados.get(estado, 0) + 1
        
        print(f"   Estados com mais propriedades:")
        for estado, count in sorted(estados.items(), key=lambda x: x[1], reverse=True)[:10]:
            print(f"     {estado}: {count} propriedades")
        
        # Preços
        precos = [p['price'] for p in processed_properties if p.get('price')]
        if precos:
            print(f"   Preços:")
            print(f"     Menor: R$ {min(precos):,.2f}")
            print(f"     Maior: R$ {max(precos):,.2f}")
            print(f"     Média: R$ {sum(precos)/len(precos):,.2f}")

if __name__ == "__main__":
    main()