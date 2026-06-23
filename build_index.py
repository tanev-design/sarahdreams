from pathlib import Path
import re

BASE_URL = 'https://sarahdream.vercel.app'

html = Path('sarahdream-redesign.html').read_text(encoding='utf-8')

head_inject = f'''
    <meta name="theme-color" content="#9c5f59">
    <meta name="robots" content="noindex, nofollow, noarchive, noimageindex">
    <meta name="keywords" content="Sarah, SarahDream, sensual massage, companionship, Thun, Lucerne, Switzerland, discreet booking">
    <meta name="author" content="SarahDream">
    <link rel="canonical" href="{BASE_URL}/">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{BASE_URL}/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="{BASE_URL}/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{BASE_URL}/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="{BASE_URL}/apple-touch-icon.png">
    <link rel="manifest" href="{BASE_URL}/site.webmanifest">

    <!-- Open Graph -->
    <meta property="og:title" content="SarahDream - Book Your Appointment">
    <meta property="og:description" content="Exclusive sensual massage and companionship experience in Bulgaria. Book discreetly by phone, Viber, WhatsApp or online form - no registration required.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{BASE_URL}/">
    <meta property="og:image" content="{BASE_URL}/og-image.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="SarahDream">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="SarahDream - Book Your Appointment">
    <meta name="twitter:description" content="Exclusive sensual massage and companionship experience in Bulgaria. Book discreetly by phone, Viber, WhatsApp or online form - no registration required.">
    <meta name="twitter:image" content="{BASE_URL}/og-image.jpg">

    <!-- Structured data -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Sarah",
      "alternateName": "SarahDream",
      "telephone": "087 616 4633",
      "url": "{BASE_URL}/",
      "address": {{
        "@type": "PostalAddress",
        "addressLocality": "Bulgaria",
        "addressCountry": "BG"
      }}
    }}
    </script>
'''

# Insert after the title tag
html = re.sub(r'(</title>\n)', r'\1' + head_inject, html)

Path('index.html').write_text(html, encoding='utf-8')
print('Generated index.html')
