#!/usr/bin/env python3
"""
Test script to examine the structure of a Chaozão property page
and identify where contact information might be located.
"""

import requests
from bs4 import BeautifulSoup
import re

def test_property_page():
    """Test a single property page to understand its structure"""
    
    # Sample URL from the dataset
    url = "https://chaozao.com.br/imovel/fazenda-em-cristalandia-tocantins-com-area-de-803-ha-r-22400000-cod-tn2w4s/TN2W4S"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        print("=== PROPERTY PAGE STRUCTURE ANALYSIS ===")
        print(f"URL: {url}")
        print(f"Status Code: {response.status_code}")
        print(f"Page Title: {soup.title.string if soup.title else 'No title'}")
        
        # Look for common contact patterns
        print("\n=== CONTACT INFORMATION SEARCH ===")
        
        # Search for WhatsApp patterns
        whatsapp_patterns = [
            r'whatsapp:.*?(\d{10,15})',
            r'wa\.me/(\d{10,15})',
            r'api\.whatsapp\.com/send\?phone=(\d{10,15})',
            r'(\d{2})\s*\d{4,5}[-\s]?\d{4}',  # Brazilian phone pattern
            r'whatsapp.*?(\d{2})\s*\d{8,9}'
        ]
        
        html_content = str(soup)
        
        for pattern in whatsapp_patterns:
            matches = re.findall(pattern, html_content, re.IGNORECASE)
            if matches:
                print(f"WhatsApp Pattern '{pattern}' found: {matches}")
        
        # Search for phone numbers
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
        
        # Search for contact sections
        contact_keywords = ['contato', 'phone', 'telefone', 'whatsapp', 'corretor', 'vendedor']
        
        for keyword in contact_keywords:
            elements = soup.find_all(string=re.compile(keyword, re.IGNORECASE))
            if elements:
                print(f"Keyword '{keyword}' found in {len(elements)} elements")
                for elem in elements[:3]:  # Show first 3 matches
                    parent = elem.parent
                    print(f"  - {parent.name}: {str(elem).strip()[:100]}...")
        
        # Look for JavaScript variables or data
        print("\n=== JAVASCRIPT DATA SEARCH ===")
        scripts = soup.find_all('script')
        for script in scripts:
            if script.string:
                script_content = script.string
                
                # Search for phone numbers in JS
                js_phone_matches = re.findall(r'(\d{10,15})', script_content)
                if js_phone_matches:
                    print(f"Phone numbers in JS: {js_phone_matches}")
                
                # Search for WhatsApp in JS
                if 'whatsapp' in script_content.lower():
                    print("WhatsApp references found in JavaScript")
                    
                # Search for contact data structures
                if any(keyword in script_content.lower() for keyword in ['contact', 'phone', 'telefone']):
                    print("Contact-related data found in JavaScript")
        
        # Look for links with contact information
        print("\n=== CONTACT LINKS SEARCH ===")
        links = soup.find_all('a', href=True)
        
        for link in links:
            href = link['href']
            if any(pattern in href.lower() for pattern in ['whatsapp', 'tel:', 'phone', 'contato']):
                print(f"Contact link found: {href}")
                print(f"  Link text: {link.get_text().strip()}")
        
        # Look for specific contact divs/sections
        print("\n=== CONTACT SECTIONS SEARCH ===")
        contact_divs = soup.find_all(['div', 'section', 'span'], class_=re.compile(r'contact|phone|whatsapp|corretor', re.IGNORECASE))
        
        for div in contact_divs:
            print(f"Contact section found: {div.name} with class '{div.get('class')}'")
            print(f"  Content: {div.get_text().strip()[:200]}...")
        
        return True
        
    except Exception as e:
        print(f"Error testing property page: {e}")
        return False

if __name__ == "__main__":
    test_property_page()