#!/usr/bin/env python3
"""
Analyze WhatsApp extraction from Chaozão property pages
"""

import requests
import re
import json

def analyze_whatsapp_extraction():
    """Analyze how to extract WhatsApp numbers from property pages"""
    
    # Test URLs from the sample
    test_urls = [
        "https://chaozao.com.br/imovel/fazenda-em-cristalandia-tocantins-com-area-de-803-ha-r-22400000-cod-tn2w4s/TN2W4S",
        "https://chaozao.com.br/imovel/chacara-em-igarata-sao-paulo-com-area-de-8397-m-r-235000-cod-xl3lgq/XL3LGQ",
        "https://chaozao.com.br/imovel/fazenda-em-pium-tocantins-com-area-de-50336-ha-r-13000000-cod-5wn66m/5WN66M"
    ]
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    results = []
    
    for url in test_urls:
        try:
            print(f"\n=== ANALYZING {url} ===")
            
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            
            html_content = response.text
            
            # Extract property ID from URL
            property_id = url.split('/')[-1]
            
            # Extract WhatsApp numbers using the pattern we found
            whatsapp_numbers = []
            
            # Pattern that worked: wa.me/{number}
            wa_me_pattern = r'wa\.me/(\d{10,15})'
            matches = re.findall(wa_me_pattern, html_content, re.IGNORECASE)
            
            for match in matches:
                # Format the number properly
                if match.startswith('55'):  # Brazilian country code
                    formatted_number = f"+{match}"
                    whatsapp_numbers.append({
                        'raw': match,
                        'formatted': formatted_number,
                        'country_code': '55',
                        'area_code': match[2:4],
                        'number': match[4:]
                    })
            
            # Also look for phone numbers in telephone field
            telephone_pattern = r'"telephone":"([^"]*)"'
            telephone_matches = re.findall(telephone_pattern, html_content)
            
            # Look for structured contact data
            contact_info = {
                'property_id': property_id,
                'url': url,
                'whatsapp_numbers': whatsapp_numbers,
                'telephone': telephone_matches,
                'extraction_successful': len(whatsapp_numbers) > 0
            }
            
            results.append(contact_info)
            
            print(f"Property ID: {property_id}")
            print(f"WhatsApp Numbers Found: {len(whatsapp_numbers)}")
            for num in whatsapp_numbers:
                print(f"  - {num['formatted']} (Area: {num['area_code']})")
            
            print(f"Telephone Numbers Found: {telephone_matches}")
            
        except Exception as e:
            print(f"Error analyzing {url}: {e}")
            results.append({
                'property_id': url.split('/')[-1],
                'url': url,
                'error': str(e),
                'extraction_successful': False
            })
    
    # Save results
    with open('whatsapp_extraction_analysis.json', 'w', encoding='utf-8') as f:
        json.dump({
            'analysis_date': '2025-07-07',
            'total_properties_tested': len(test_urls),
            'successful_extractions': len([r for r in results if r.get('extraction_successful')]),
            'results': results
        }, f, indent=2, ensure_ascii=False)
    
    print(f"\n=== EXTRACTION ANALYSIS COMPLETE ===")
    print(f"Total properties tested: {len(test_urls)}")
    print(f"Successful extractions: {len([r for r in results if r.get('extraction_successful')])}")
    print("Results saved to: whatsapp_extraction_analysis.json")
    
    return results

if __name__ == "__main__":
    analyze_whatsapp_extraction()