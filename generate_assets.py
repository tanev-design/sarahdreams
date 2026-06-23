from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

ROOT = Path('.')

# Colors
ACCENT = '#9c5f59'
BG = '#f9f4ef'
TEXT = '#2d2424'

# Fonts (Windows system fonts)
font_dir = Path('C:/Windows/Fonts')
serif_font = str(font_dir / 'georgia.ttf')
sans_font = str(font_dir / 'segoeui.ttf')
sans_bold = str(font_dir / 'segoeuib.ttf')

# OG image
og = Image.new('RGB', (1200, 630), BG)
draw = ImageDraw.Draw(og)

# Subtle decorative shapes
accent_rgb = (156, 95, 89)
for i, (x, y, r) in enumerate([(900, 120, 280), (150, 500, 200)]):
    alpha = 18 if i == 0 else 12
    overlay = Image.new('RGBA', (1200, 630), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    odraw.ellipse([x - r, y - r, x + r, y + r], fill=accent_rgb + (alpha,))
    og = Image.alpha_composite(og.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(og)

# Title
try:
    title_font = ImageFont.truetype(serif_font, 120)
except Exception:
    title_font = ImageFont.load_default()
title = "SarahDream"
bbox = draw.textbbox((0, 0), title, font=title_font)
title_w = bbox[2] - bbox[0]
title_h = bbox[3] - bbox[1]
title_x = (1200 - title_w) // 2
title_y = 220

draw.text((title_x, title_y), title, font=title_font, fill=ACCENT)

# Tagline
try:
    tag_font = ImageFont.truetype(sans_font, 36)
except Exception:
    tag_font = ImageFont.load_default()
tagline = "Exclusive companionship  ·  Discreet booking"
bbox = draw.textbbox((0, 0), tagline, font=tag_font)
tag_w = bbox[2] - bbox[0]
tag_x = (1200 - tag_w) // 2
tag_y = title_y + title_h + 35
draw.text((tag_x, tag_y), tagline, font=tag_font, fill=TEXT)

# Small decorative line
line_y = tag_y + 60
draw.line([(500, line_y), (700, line_y)], fill=ACCENT, width=2)

og.save(ROOT / 'og-image.jpg', quality=90)
print('Generated og-image.jpg')

# Favicon base
size = 512
fav = Image.new('RGBA', (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(fav)
# Rounded square background
radius = 112
rect = [0, 0, size, size]
draw.rounded_rectangle(rect, radius=radius, fill=ACCENT)
# Letter S
try:
    s_font = ImageFont.truetype(sans_bold, 300)
except Exception:
    s_font = ImageFont.load_default()
bbox = draw.textbbox((0, 0), 'S', font=s_font)
s_w = bbox[2] - bbox[0]
s_h = bbox[3] - bbox[1]
s_x = (size - s_w) // 2
s_y = (size - s_h) // 2 - 10
draw.text((s_x, s_y), 'S', font=s_font, fill=(255, 255, 255, 255))

fav.save(ROOT / 'android-chrome-512x512.png')
fav.resize((192, 192), Image.LANCZOS).save(ROOT / 'android-chrome-192x192.png')
fav.resize((180, 180), Image.LANCZOS).save(ROOT / 'apple-touch-icon.png')
fav.resize((32, 32), Image.LANCZOS).save(ROOT / 'favicon-32x32.png')
fav.resize((16, 16), Image.LANCZOS).save(ROOT / 'favicon-16x16.png')
# favicon.ico with 16 and 32
fav.resize((32, 32), Image.LANCZOS).save(ROOT / 'favicon.ico', sizes=[(16, 16), (32, 32)], format='ICO')
print('Generated favicons')

# Web manifest
manifest = '''{
  "name": "SarahDream",
  "short_name": "SarahDream",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#9c5f59",
  "background_color": "#ffffff",
  "display": "standalone"
}'''
(ROOT / 'site.webmanifest').write_text(manifest, encoding='utf-8')
print('Generated site.webmanifest')
