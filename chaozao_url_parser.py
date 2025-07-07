#!/usr/bin/env python3
"""
Script para extrair dados das URLs do Chãozão
Analisa as URLs para extrair informações dos imóveis
"""

import json
import re
import csv
from urllib.parse import unquote

def parse_url_data(url):
    """
    Extrai informações da URL do Chãozão
    Padrão: /imovel/{tipo}-em-{cidade}-{estado}-com-area-de-{area}-{unidade}-r-{preco}-cod-{codigo}/{ID}
    """
    
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
    
    # Extrair tipo de imóvel
    tipo_map = {
        'fazenda': 'Fazenda',
        'sitio': 'Sítio', 
        'chacara': 'Chácara',
        'terreno': 'Terreno',
        'casa': 'Casa Rural'
    }
    
    tipo = 'Não identificado'
    for key, value in tipo_map.items():
        if key in description.lower():
            tipo = value
            break
    
    # Extrair cidade e estado
    cidade = ''
    estado = ''
    
    # Padrão: tipo-em-cidade-estado
    em_pattern = r'em-([^-]+)-([^-]+)'
    em_match = re.search(em_pattern, description)
    if em_match:
        cidade = em_match.group(1).replace('-', ' ').title()
        estado_raw = em_match.group(2)
        
        # Mapear estados
        estados = {
            'sao-paulo': 'São Paulo',
            'goias': 'Goiás',
            'mato-grosso': 'Mato Grosso',
            'mato-grosso-do-sul': 'Mato Grosso do Sul',
            'tocantins': 'Tocantins',
            'minas-gerais': 'Minas Gerais',
            'bahia': 'Bahia',
            'para': 'Pará',
            'rondonia': 'Rondônia',
            'acre': 'Acre',
            'amazonas': 'Amazonas',
            'roraima': 'Roraima',
            'amapa': 'Amapá',
            'maranhao': 'Maranhão',
            'piaui': 'Piauí',
            'ceara': 'Ceará',
            'rio-grande-do-norte': 'Rio Grande do Norte',
            'paraiba': 'Paraíba',
            'pernambuco': 'Pernambuco',
            'alagoas': 'Alagoas',
            'sergipe': 'Sergipe',
            'espirito-santo': 'Espírito Santo',
            'rio-de-janeiro': 'Rio de Janeiro',
            'parana': 'Paraná',
            'santa-catarina': 'Santa Catarina',
            'rio-grande-do-sul': 'Rio Grande do Sul',
            'distrito-federal': 'Distrito Federal'
        }
        
        estado = estados.get(estado_raw, estado_raw.replace('-', ' ').title())
    
    # Extrair área
    area_hectares = None
    area_m2 = None
    
    # Padrão: area-de-{numero}-ha ou area-de-{numero}-m
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
    
    # Padrão: r-{numero}
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
    # Carregar dados existentes
    with open('chaozao_sample_20.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Processar cada propriedade
    processed_properties = []
    
    for prop in data['properties']:
        parsed = parse_url_data(prop['url'])
        if parsed:
            processed_properties.append(parsed)
    
    # Salvar dados processados
    output_data = {
        'total_properties': len(processed_properties),
        'extraction_date': data['extraction_date'],
        'properties': processed_properties
    }
    
    # Salvar JSON
    with open('chaozao_parsed_data.json', 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    # Salvar CSV
    with open('chaozao_parsed_data.csv', 'w', newline='', encoding='utf-8') as f:
        if processed_properties:
            writer = csv.DictWriter(f, fieldnames=processed_properties[0].keys())
            writer.writeheader()
            writer.writerows(processed_properties)
    
    print(f"Dados processados: {len(processed_properties)} propriedades")
    print("Arquivos salvos:")
    print("- chaozao_parsed_data.json")
    print("- chaozao_parsed_data.csv")

if __name__ == "__main__":
    main()