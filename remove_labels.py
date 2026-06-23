import re
import sys

def main():
    file_path = r'e:\WEBSITES\sarah\index.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove <span class="label" ...>...</span>
    # Wait, the hero has one. "hero.subtitle"
    # User said "that title of every section please". In screenshot, "Candid" and "About" were the span.labels.
    # We should remove all of them except maybe we should just remove all `span class="label"`.
    # Let's remove them all using regex, carefully.
    content = re.sub(r'[ \t]*<span class="label"[^>]*>.*?</span>\n?', '', content)

    # 2. Make contact-grid more compact and centered
    # Replace contact-grid CSS
    old_contact_grid = """        .contact-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            align-items: start;
        }

        @media (min-width: 900px) {
            .contact-grid {
                grid-template-columns: 1fr 1.15fr;
                gap: 2.5rem;
            }
        }"""
        
    new_contact_grid = """        .contact-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.25rem;
            align-items: start;
            max-width: 850px;
            margin: 0 auto;
        }

        @media (min-width: 900px) {
            .contact-grid {
                grid-template-columns: 1fr 1fr;
                gap: 1.5rem;
            }
        }"""
    
    if old_contact_grid in content:
        content = content.replace(old_contact_grid, new_contact_grid)
    else:
        print("Could not find contact-grid CSS")
        sys.exit(1)

    # 3. Make contact-list more compact
    old_contact_list = """        .contact-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 1.15rem;
            margin-top: 1.25rem;
        }"""
        
    new_contact_list = """        .contact-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-top: 0.75rem;
        }"""
        
    if old_contact_list in content:
        content = content.replace(old_contact_list, new_contact_list)
    else:
        print("Could not find contact-list CSS")
        # Proceed anyway

    # Also make form-grid in contact form more compact?
    # Form grid has gap 1.25rem, maybe we leave it or make it 1rem. We will just reduce contact-grid gap.
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated index.html")

if __name__ == '__main__':
    main()
