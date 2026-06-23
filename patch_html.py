import re

with open('sarahdream-redesign.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find script block
m = re.search(r'(<script>).*?(</script>)', html, re.DOTALL)
if not m:
    print('Script tag not found')
    exit(1)

new_script = '''    <script>
        const translations = {
            en: {
                "nav.about": "About", "nav.gallery": "Gallery", "nav.services": "Services", "nav.contact": "Contact",
                "hero.subtitle": "Welcome", "hero.title": "Welcome to Sarah",
                "hero.desc": "Experience sensual massages and passionate erotic encounters designed for your complete wellbeing and relaxation.",
                "hero.cta1": "Book Now", "hero.cta2": "Explore Gallery",
                "about.label": "About", "about.title": "About Sarah",
                "about.p1": "My name is Sarah, I am 37 years old, 158 cm tall, weigh 49 kg, with beautiful brown eyes and long, thick hair.",
                "about.p2": "I enjoy listening to music and spending time with friends and family.",
                "about.p3": "With me you will find tingling eroticism, an experienced and sensual lover, and unforgettable adventures.",
                "about.p4": "I love beautiful and sensual eroticism. I seek sophisticated and friendly clientele who appreciate me and my work, so we can enjoy a varied time together.",
                "about.p5": "With me you will find high-class eroticism and no cheap service. Looking forward to many erotic adventures. Your Sandy",
                "stats.age": "Years", "stats.height": "cm", "stats.weight": "kg",
                "gallery.label": "Portfolio", "gallery.title": "Photo Gallery",
                "services.label": "Experience", "services.title": "Services & Prices",
                "services.myService": "My Service",
                "services.item1": "Experience an unforgettable beautiful time with me",
                "services.item2": "Hot sex, beautiful massages and pure eroticism",
                "services.item3": "Shower together & kisses",
                "services.item4": "Pure blowjobs with swallowing just for you",
                "services.item5": "Get to know me or enjoy a highly erotic quickie",
                "services.prices": "Prices in EUR",
                "services.noteTitle": "Important:", "services.noteText": "Sex only protected. No anal sex.",
                "price.bj": "Blowjob (15 min)", "price.quick": "Quickie (15 min)", "price.30": "30 Minutes",
                "price.45": "45 Minutes", "price.60": "60 Minutes", "price.90": "90 Minutes", "price.120": "120 Minutes",
                "contact.label": "Connection", "contact.title": "Contact Me",
                "contact.intro": "If you have questions or would like to arrange an appointment, you can contact me as follows:",
                "contact.locationTitle": "Location",
                "contact.tempLocation": "From Monday, 02.03.2026 in Lucerne for 7 days: Fluhmühle 18",
                "contact.phoneTitle": "Phone", "contact.hoursTitle": "Opening Hours",
                "hours.today": "Open today",
                "form.title": "Email Sarah", "form.name": "Name", "form.email": "Email *",
                "form.phone": "Phone", "form.message": "Message", "form.send": "Send",
                "footer.impressum": "Impressum / Contact"
            },
            bg: {
                "nav.about": "За мен", "nav.gallery": "Галерия", "nav.services": "Услуги", "nav.contact": "Контакт",
                "hero.subtitle": "Добре дошли", "hero.title": "Добре дошли при Сара",
                "hero.desc": "Преживейте чувствени масажи и страстни еротични срещи, създадени за вашето пълно благополучие и релаксация.",
                "hero.cta1": "Резервирай", "hero.cta2": "Разгледай галерията",
                "about.label": "За мен", "about.title": "За Сара",
                "about.p1": "Казвам се Сара, на 37 години съм, висока 158 см, тежа 49 кг, с красиви кафяви очи и дълга, гъста коса.",
                "about.p2": "Обичам да слушам музика и да прекарвам време с приятели и семейство.",
                "about.p3": "При мен ще откриете трептяща еротика, опитна и чувствена любовница и незабравими приключения.",
                "about.p4": "Обичам красивата и чувствена еротика. Търся изискана и приятелска клиентела, която да ме оценява, за да можем заедно да се насладим на разнообразно време.",
                "about.p5": "При мен ще откриете висококласна еротика, а не евтина услуга. Очаквам с нетърпение много еротични приключения. Твоята Санди",
                "stats.age": "Години", "stats.height": "см", "stats.weight": "кг",
                "gallery.label": "Портфолио", "gallery.title": "Фотогалерия",
                "services.label": "Изживяване", "services.title": "Услуги и цени",
                "services.myService": "Моите услуги",
                "services.item1": "Преживейте незабравимо прекрасно време с мен",
                "services.item2": "Горещ секс, красиви масажи и чиста еротика",
                "services.item3": "Заедно под душа и целувки",
                "services.item4": "Чисти свирчоци с гълтане само за теб",
                "services.item5": "Запознай се с мен или се наслади на високо еротичен бърз секс",
                "services.prices": "Цени в EUR",
                "services.noteTitle": "Важно:", "services.noteText": "Секс само с предпазни средства. Без анален секс.",
                "price.bj": "Свирчок (15 мин)", "price.quick": "Бърз секс (15 мин)", "price.30": "30 минути",
                "price.45": "45 минути", "price.60": "60 минути", "price.90": "90 минути", "price.120": "120 минути",
                "contact.label": "Връзка", "contact.title": "Свържи се с мен",
                "contact.intro": "Ако имате въпроси или искате да уговорите среща, можете да се свържете с мен по следния начин:",
                "contact.locationTitle": "Локация",
                "contact.tempLocation": "От понеделник, 02.03.2026 в Люцерн за 7 дни: Fluhmühle 18",
                "contact.phoneTitle": "Телефон", "contact.hoursTitle": "Работно време",
                "hours.today": "Отворено днес",
                "form.title": "Имейл до Сара", "form.name": "Име", "form.email": "Имейл *",
                "form.phone": "Телефон", "form.message": "Съобщение", "form.send": "Изпрати",
                "footer.impressum": "Импресум / Контакт"
            },
            de: {
                "nav.about": "Über mich", "nav.gallery": "Galerie", "nav.services": "Service", "nav.contact": "Kontakt",
                "hero.subtitle": "Willkommen", "hero.title": "Willkommen bei Sarah",
                "hero.desc": "Erleben Sie sinnliche Massagen und heisse Erotiktreffen für Ihr Wohlbefinden und Entspannung.",
                "hero.cta1": "Jetzt buchen", "hero.cta2": "Galerie erkunden",
                "about.label": "Über mich", "about.title": "Über Sarah",
                "about.p1": "Ich heisse Sarah, ich bin 37 Jahre alt, 158 cm, ich wiege 49 Kgs, habe schöne braune Augen und lang, dichte Haare.",
                "about.p2": "Ich höre gerne Musik und verbringe gerne Zeit mit Freunden und Familie.",
                "about.p3": "Bei mir findest du prickelnde Erotik, eine erfahrene und sinnliche Liebesdienerin und unvergessliche Abenteuer.",
                "about.p4": "Ich mag schöne und sinnliche Erotik. Ich suche niveauvolle und freundliche Kundschaft, welche mich und meine Arbeit schätzt und wir zusammen eine abwechslungsreiche Zeit zusammen geniessen können.",
                "about.p5": "Bei mir findest du hochstehende Erotik und keinen Billigservice. Auf viele erotische Abenteuer. Deine Sandy",
                "stats.age": "Jahre", "stats.height": "cm", "stats.weight": "kg",
                "gallery.label": "Portfolio", "gallery.title": "Fotogalerie",
                "services.label": "Erlebnis", "services.title": "Service und Preise",
                "services.myService": "Mein Service",
                "services.item1": "Erlebe eine unvergesslich schöne Zeit bei mir",
                "services.item2": "Heissen Sex, wunderschöne Massagen und pure Erotik",
                "services.item3": "Gemeinsames duschen & Küsse",
                "services.item4": "Blowjobs pur mit Aufnahme und schlucken nur für Dich",
                "services.item5": "Zum kennen lernen oder für ein kurzes Abenteuer einen hocherotischen Quicki geniessen",
                "services.prices": "Preise in EUR",
                "services.noteTitle": "Wichtig:", "services.noteText": "Sex nur geschützt. Kein Analsex.",
                "price.bj": "Blowjob (15 Minuten)", "price.quick": "Quicki (15 Minuten)", "price.30": "30 Minuten",
                "price.45": "45 Minuten", "price.60": "60 Minuten", "price.90": "90 Minuten", "price.120": "120 Minuten",
                "contact.label": "Verbindung", "contact.title": "Kontaktiere mich",
                "contact.intro": "Hast du Fragen, oder möchtest Du einen Termin vereinbaren, kannst du mich wie folgt kontaktieren.",
                "contact.locationTitle": "Standort",
                "contact.tempLocation": "Ab Montag, 02.03.2026 in Luzern für 7 Tage: Fluhmühle 18",
                "contact.phoneTitle": "Telefon", "contact.hoursTitle": "Öffnungszeiten",
                "hours.today": "Heute geöffnet",
                "form.title": "E-Mail an Sarah", "form.name": "Name", "form.email": "E-Mail *",
                "form.phone": "Telefon", "form.message": "Nachricht", "form.send": "Senden",
                "footer.impressum": "Impressum / Kontakt"
            }
        };

        let currentLang = 'en';
        function setLang(lang) {
            currentLang = lang;
            document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.dataset.i18n;
                if (translations[lang][key]) el.textContent = translations[lang][key];
            });
            document.documentElement.lang = lang === 'bg' ? 'bg' : lang;
        }

        function toggleNav() {
            document.getElementById('hamburger').classList.toggle('active');
            document.getElementById('navLinks').classList.toggle('open');
        }
        function closeNav() {
            document.getElementById('hamburger').classList.remove('active');
            document.getElementById('navLinks').classList.remove('open');
        }

        const galleryImages = [
            'photo_2_2026-06-08_16-40-33.jpg','photo_4_2026-06-08_16-40-33.jpg',
            'photo_5_2026-06-08_16-40-33.jpg','photo_6_2026-06-08_16-40-33.jpg',
            'photo_7_2026-06-08_16-40-33.jpg','photo_8_2026-06-08_16-40-33.jpg',
            'photo_9_2026-06-08_16-40-33.jpg','photo_10_2026-06-08_16-40-33.jpg',
            'photo_11_2026-06-08_16-40-33.jpg','photo_12_2026-06-08_16-40-33.jpg'
        ];
        const track = document.getElementById('galleryTrack');
        const dotsContainer = document.getElementById('galleryDots');
        galleryImages.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
            dot.onclick = () => scrollToSlide(i);
            dotsContainer.appendChild(dot);
        });
        function scrollToSlide(i) {
            const slide = track.children[i];
            if (slide) slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
        function galleryPrev() { track.scrollBy({ left: -track.clientWidth * 0.6, behavior: 'smooth' }); }
        function galleryNext() { track.scrollBy({ left: track.clientWidth * 0.6, behavior: 'smooth' }); }
        track.addEventListener('scroll', () => {
            const slides = Array.from(track.children);
            const center = track.scrollLeft + track.clientWidth / 2;
            let closest = 0, minDist = Infinity;
            slides.forEach((s, i) => {
                const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - center);
                if (d < minDist) { minDist = d; closest = i; }
            });
            document.querySelectorAll('.gallery-dot').forEach((d, i) => d.classList.toggle('active', i === closest));
        });

        let lbIndex = 0;
        function openLightbox(index) {
            lbIndex = index;
            updateLightbox();
            document.getElementById('lightbox').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function updateLightbox() {
            document.getElementById('lightbox-img').src = galleryImages[lbIndex];
        }
        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('active');
            document.body.style.overflow = '';
        }
        function lightboxPrev() { lbIndex = (lbIndex - 1 + galleryImages.length) % galleryImages.length; updateLightbox(); }
        function lightboxNext() { lbIndex = (lbIndex + 1) % galleryImages.length; updateLightbox(); }
        document.addEventListener('keydown', e => {
            if (!document.getElementById('lightbox').classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightboxPrev();
            if (e.key === 'ArrowRight') lightboxNext();
        });
        let lbTouchStartX = 0;
        document.getElementById('lightbox').addEventListener('touchstart', e => { lbTouchStartX = e.changedTouches[0].screenX; });
        document.getElementById('lightbox').addEventListener('touchend', e => {
            const diff = e.changedTouches[0].screenX - lbTouchStartX;
            if (diff > 40) lightboxPrev(); else if (diff < -40) lightboxNext();
        });

        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 18; i++) {
            const p = document.createElement('div'); p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = (6 + Math.random() * 6) + 's';
            p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
            particlesContainer.appendChild(p);
        }

        const animObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.12 });
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => animObserver.observe(el));

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    </script>'''

start = html.find('<script>')
end = html.find('</script>', start) + len('</script>')
html = html[:start] + new_script + html[end:]

with open('sarahdream-redesign.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Done patching script')
