#!/usr/bin/env python3
"""
Simple test to examine property page HTML without BeautifulSoup
"""

import requests
import re

def test_property_page_simple():
    """Test a property page using only built-in modules"""
    
    url = "https://chaozao.com.br/imovel/fazenda-em-cristalandia-tocantins-com-area-de-803-ha-r-22400000-cod-tn2w4s/TN2W4S"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        html_content = response.text
        
        print("=== PROPERTY PAGE ANALYSIS ===")
        print(f"URL: {url}")
        print(f"Status Code: {response.status_code}")
        print(f"Content Length: {len(html_content)} characters")
        
        # Search for WhatsApp patterns
        print("\n=== WHATSAPP SEARCH ===")
        whatsapp_patterns = [
            r'whatsapp[^"]*(\d{10,15})',
            r'wa\.me/(\d{10,15})',
            r'api\.whatsapp\.com/send\?phone=(\d{10,15})',
            r'whatsapp.*?(\d{2})\s*\d{8,9}'
        ]
        
        for pattern in whatsapp_patterns:
            matches = re.findall(pattern, html_content, re.IGNORECASE)
            if matches:
                print(f"WhatsApp Pattern '{pattern}' found: {matches}")
        
        # Search for phone numbers
        print("\n=== PHONE NUMBER SEARCH ===")
        phone_patterns = [
            r'(\d{2})\s*\d{4,5}[-\s]?\d{4}',  # (11) 99999-9999
            r'\+55\s*(\d{2})\s*\d{4,5}[-\s]?\d{4}',  # +55 11 99999-9999
            r'tel:(\d+)',
            r'phone.*?(\d{10,15})'
        ]
        
        for pattern in phone_patterns:
            matches = re.findall(pattern, html_content, re.IGNORECASE)
            if matches:
                print(f"Phone Pattern '{pattern}' found: {matches}")
        
        # Search for contact-related text
        print("\n=== CONTACT KEYWORDS SEARCH ===")
        contact_keywords = ['contato', 'phone', 'telefone', 'whatsapp', 'corretor', 'vendedor', 'corretora']
        
        for keyword in contact_keywords:
            if keyword.lower() in html_content.lower():
                print(f"Keyword '{keyword}' found in HTML")
                # Show context around the keyword
                pattern = rf'.{{0,50}}{re.escape(keyword)}.{{0,50}}'
                matches = re.findall(pattern, html_content, re.IGNORECASE)
                for match in matches[:3]:  # Show first 3 matches
                    print(f"  Context: {match.strip()}")
        
        # Look for contact links
        print("\n=== CONTACT LINKS SEARCH ===")
        link_patterns = [
            r'href="([^"]*whatsapp[^"]*)"',
            r'href="([^"]*tel:[^"]*)"',
            r'href="([^"]*phone[^"]*)"',
            r'href="([^"]*contato[^"]*)"'
        ]
        
        for pattern in link_patterns:
            matches = re.findall(pattern, html_content, re.IGNORECASE)
            if matches:
                print(f"Contact links found: {matches}")
        
        # Look for JavaScript variables with contact data
        print("\n=== JAVASCRIPT DATA SEARCH ===")
        js_patterns = [
            r'phone\s*[:=]\s*["\']([^"\']*)["\']',
            r'whatsapp\s*[:=]\s*["\']([^"\']*)["\']',
            r'contact\s*[:=]\s*["\']([^"\']*)["\']',
            r'telefone\s*[:=]\s*["\']([^"\']*)["\']'
        ]
        
        for pattern in js_patterns:
            matches = re.findall(pattern, html_content, re.IGNORECASE)
            if matches:
                print(f"JS Contact data found: {matches}")
        
        # Look for data attributes
        print("\n=== DATA ATTRIBUTES SEARCH ===")
        data_patterns = [
            r'data-phone="([^"]*)"',
            r'data-whatsapp="([^"]*)"',
            r'data-contact="([^"]*)"',
            r'data-telefone="([^"]*)"'
        ]
        
        for pattern in data_patterns:
            matches = re.findall(pattern, html_content, re.IGNORECASE)
            if matches:
                print(f"Data attributes found: {matches}")
        
        return True
        
    except Exception as e:
        print(f"Error testing property page: {e}")
        return False

if __name__ == "__main__":
    test_property_page_simple()