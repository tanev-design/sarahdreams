from pathlib import Path
import re

html = Path('sarahdream-redesign.html').read_text(encoding='utf-8')

# 1. Google Fonts: switch to Bodoni Moda + Work Sans
html = re.sub(
    r"<link href=\"https://fonts\.googleapis\.com/css2\?family=Playfair\+Display[^\"]+&family=Inter[^\"]+\" rel=\"stylesheet\">",
    '<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Work+Sans:wght@300..600&display=swap" rel="stylesheet">',
    html
)

# 2. Replace :root block
new_root = """:root {
            --bg: #ffffff;
            --section-alt: #f9f4ef;
            --surface: #ffffff;
            --card: #fffaf7;
            --card-soft: #f7ede6;
            --ink: #2d2424;
            --body: #5e524c;
            --muted: #6b5f59;
            --accent: #9c5f59;
            --accent-rgb: 156, 95, 89;
            --accent-dark: #7a443f;
            --champagne: #c9a96e;
            --border: #f0e2d8;
            --shadow: 0 6px 24px rgba(93, 69, 64, 0.06);
            --shadow-hover: 0 12px 32px rgba(93, 69, 64, 0.12);
            --shadow-strong: rgba(0, 0, 0, 0.45);
            --radius: 18px;
            --radius-sm: 12px;
            --radius-xs: 2px;
            --header-h: 72px;
            --font-serif: 'Bodoni Moda', Georgia, 'Times New Roman', serif;
            --font-sans: 'Work Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }"""
html = re.sub(r':root \{[^}]+\}', new_root, html, count=1)

# 3. Body font
html = html.replace(
    "font-family: 'Inter', system-ui, -apple-system, sans-serif;",
    "font-family: var(--font-sans);"
)

# 4. Heading/display fonts
html = html.replace(
    "font-family: 'Playfair Display', Georgia, serif;",
    "font-family: var(--font-serif);"
)
html = html.replace(
    "font-family: 'Playfair Display', serif;",
    "font-family: var(--font-serif);"
)

# 5. Button font
html = html.replace(
    "font-family: 'Inter', sans-serif;",
    "font-family: var(--font-sans);"
)

# 6. .label restyle (drop uppercase tracked eyebrow)
html = re.sub(
    r'\.label \{[^}]+\}',
    """.label {
            display: inline-block;
            font-size: 0.82rem;
            font-weight: 500;
            letter-spacing: 0.02em;
            text-transform: none;
            color: var(--accent-dark);
            font-style: italic;
            margin-bottom: 0.6rem;
        }""",
    html, count=1
)

# 7. Text-wrap balance on headings
html = re.sub(
    r'(h1, h2, h3, \.display \{[^}]+line-height: 1\.15;[^}]+)',
    r'''\1\n            text-wrap: balance;''',
    html
)

# 8. Button focus-visible
html = re.sub(
    r'(\.btn \{[^}]+transition: [^;]+;\n        \})',
    r'''\1\n\n        .btn:focus-visible {\n            outline: 2px solid var(--accent);\n            outline-offset: 3px;\n        }''',
    html
)

# 9. Primary button shadows use accent-rgb
html = html.replace(
    "box-shadow: 0 4px 16px rgba(197, 140, 133, 0.3);",
    "box-shadow: 0 4px 16px rgba(var(--accent-rgb), 0.3);"
)
html = html.replace(
    "box-shadow: 0 6px 22px rgba(197, 140, 133, 0.4);",
    "box-shadow: 0 6px 22px rgba(var(--accent-rgb), 0.4);"
)

# 10. Radius tokens for 2px values
html = html.replace("border-radius: 2px;", "border-radius: var(--radius-xs);")

# 11. Note box: remove side-tab
html = re.sub(
    r'\.note-box \{[^}]+\}',
    """.note-box {
            margin-top: 1rem;
            padding: 1rem;
            background: var(--card-soft);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            font-size: 0.86rem;
            color: var(--muted);
        }""",
    html, count=1
)

# 12. Time slot radius
html = re.sub(
    r'(\.time-slot \{[^}]+)border-radius: 10px;',
    r'\1border-radius: var(--radius-sm);',
    html
)

# 13. Lightbox shadow strong token
html = html.replace(
    "box-shadow: 0 20px 60px rgba(0,0,0,0.45);",
    "box-shadow: 0 20px 60px var(--shadow-strong);"
)

# 14. Add prefers-reduced-motion before Animations section
reduced_motion = '''\n        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
            .reveal, .reveal-left, .reveal-right, .reveal-scale {
                opacity: 1 !important;
                transform: none !important;
            }
        }\n'''
html = html.replace(
    "        /* Animations */",
    reduced_motion + "        /* Animations */"
)

# 15. Section alt backgrounds for about and booking
html = html.replace(
    "        /* About */",
    "        .about { background: var(--section-alt); }\n        .booking { background: var(--section-alt); }\n\n        /* About */"
)

# 16. Hero radial gradient colors refresh
html = html.replace(
    "radial-gradient(ellipse at 90% 10%, rgba(197, 140, 133, 0.12) 0%, transparent 45%),",
    "radial-gradient(ellipse at 90% 10%, rgba(var(--accent-rgb), 0.10) 0%, transparent 45%),"
)
html = html.replace(
    "radial-gradient(ellipse at 10% 90%, rgba(201, 169, 110, 0.08) 0%, transparent 40%);",
    "radial-gradient(ellipse at 10% 90%, rgba(var(--accent-rgb), 0.06) 0%, transparent 40%);"
)

# 17. Price row en dash -> hyphen
html = html.replace(
    "<tr><td data-i18n=\"price.60\">60 Minutes</td><td>€240 – €290</td></tr>",
    "<tr><td data-i18n=\"price.60\">60 Minutes</td><td>€240 - €290</td></tr>"
)

# 18. Remove gallery slide number spans
html = re.sub(r'<span class="num">\d{2}</span>', '', html)

# 19. Lightbox placeholder image
html = html.replace(
    '<img id="lightbox-img" src="" alt="Full size">',
    '<img id="lightbox-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Full size">'
)

# 20. Desktop gallery grid + hide nav
html = html.replace(
    "        @media (min-width: 1024px) {\n            .gallery-slide { flex: 0 0 28%; }\n        }",
    """        @media (min-width: 1024px) {
            .gallery-track {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 1rem;
                overflow-x: visible;
                padding-bottom: 0;
            }
            .gallery-slide {
                flex: none;
                max-width: none;
                width: 100%;
            }
            .gallery-nav { display: none; }
        }"""
)

# 21. Mobile CTA and buttons larger touch targets
html = html.replace(
    ".mobile-cta .btn { flex: 1; font-size: 0.85rem; padding: 0.75rem; }",
    ".mobile-cta .btn { flex: 1; font-size: 0.9rem; padding: 0.85rem; min-height: 48px; }"
)

Path('sarahdream-redesign.html').write_text(html, encoding='utf-8')
print('Polish edits applied.')
