from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import struct

ACCENT = '#9c5f59'
BG = '#fffaf7'

def find_font():
    candidates = [
        'C:/Windows/Fonts/segoeuib.ttf',
        'C:/Windows/Fonts/arialbd.ttf',
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        '/System/Library/Fonts/Helvetica.ttc',
    ]
    for p in candidates:
        if Path(p).exists():
            return p
    return None

def draw_monogram(size, font_path):
    img = Image.new('RGBA', (size, size), (0,0,0,0))
    d = ImageDraw.Draw(img)
    radius = size // 5
    # Rounded square background
    d.rounded_rectangle([0, 0, size-1, size-1], radius=radius, fill=ACCENT)
    # Subtle inner highlight border
    d.rounded_rectangle([size//40, size//40, size-1-size//40, size-1-size//40], radius=radius-size//40, outline=(255,255,255,60), width=max(1, size//100))

    font_size = int(size * 0.58)
    try:
        font = ImageFont.truetype(font_path, font_size)
    except Exception:
        font = ImageFont.load_default()

    bbox = d.textbbox((0,0), 'S', font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = (size - text_w) / 2 - bbox[0]
    y = (size - text_h) / 2 - bbox[1]
    d.text((x, y), 'S', font=font, fill='white')
    return img

def save_ico(images, path):
    # Save multi-size ICO. images: list of (size, PIL Image)
    images.sort(key=lambda x: x[0], reverse=True)
    ico = Image.new('RGBA', (images[0][0], images[0][0]), (0,0,0,0))
    ico.save(path, format='ICO', sizes=[(s,s) for s,_ in images], append_images=[im for _,im in images[1:]])

def main():
    font_path = find_font()
    sizes = [16, 32, 180, 192, 512]
    generated = {}
    for s in sizes:
        generated[s] = draw_monogram(s, font_path)

    generated[16].save('favicon-16x16.png')
    generated[32].save('favicon-32x32.png')
    generated[180].save('apple-touch-icon.png')
    generated[192].save('android-chrome-192x192.png')
    generated[512].save('android-chrome-512x512.png')

    # ICO with 16, 32, 48
    ico_images = [(16, generated[16]), (32, generated[32]), (48, draw_monogram(48, font_path))]
    save_ico(ico_images, 'favicon.ico')
    print('Favicons generated.')

if __name__ == '__main__':
    main()
