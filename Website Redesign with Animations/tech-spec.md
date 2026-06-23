# Tech Spec — SarahDream

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM renderer |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.4.0 | Vite React support |
| tailwindcss | ^4.0.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite integration |
| gsap | ^3.12.0 | Animation engine (includes ScrollTrigger) |
| lenis | ^1.1.0 | Smooth scroll |
| three | ^0.170.0 | 3D engine |
| @react-three/fiber | ^9.0.0 | React Three.js renderer |
| @react-three/drei | ^9.0.0 | R3F helpers (useTexture, PerspectiveCamera) |
| @react-three/postprocessing | ^3.0.0 | Post-processing effects |
| clsx | ^2.1.0 | Conditional class names |
| tailwind-merge | ^3.0.0 | Tailwind class deduplication |
| typescript | ^5.7.0 | Type system |
| @types/react | ^19.0.0 | React types |
| @types/react-dom | ^19.0.0 | React DOM types |
| @types/three | ^0.170.0 | Three.js types |

## Component Inventory

### Layout

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Fixed header, scroll-aware background transition, mobile hamburger overlay |
| Footer | Custom | Logo, links, language switcher, copyright |
| PageLoader | Custom | Full-screen text loader, dismisses on hero texture load |
| LenisProvider | Custom | Wraps app, initializes Lenis, syncs with GSAP ScrollTrigger |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Full-viewport, contains OrganicParallaxImage + text overlay + petals |
| AboutSection | Custom | Two-column, contains AlternateParallax + text content |
| GallerySection | Custom | Full-width, contains HorizontalGallery + header |
| ServicesSection | Custom | Two-column card grid |
| ContactSection | Custom | Two-column, info + form |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| SectionHeader | Custom (label + heading + decorative icon) | About, Gallery, Services, Contact |
| CTAButton | Custom (primary/secondary variants) | Hero, Contact |
| Lightbox | Custom | GallerySection |
| LanguageSwitcher | Custom | Navigation, Footer |
| FallingPetals | Custom | HeroSection |

### Core Effects

| Component | Source | Notes |
|-----------|--------|-------|
| OrganicParallaxImage | Custom (R3F) | Hero background — orthographic camera, two texture planes, mouse parallax, bokeh + grain post-processing |
| HorizontalGallery | Custom (GSAP ScrollTrigger) | Pinned horizontal scroll container |
| AlternateParallax | Custom (CSS + RAF) | About image — perspective container, two layers, mouse-driven rotation/translation |

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Page loader sequence | GSAP timeline | 3-step timeline: text fade-in → fade-out → slide-up. OnComplete triggers hero entrance | Medium |
| Hero text entrance | GSAP timeline | Staggered timeline: label (0.3s delay) → heading lines (0.15s stagger each) → subtext (0.9s) → CTAs (1.1s). All translateY + opacity, power3.out | Medium |
| Scroll indicator pulse | CSS @keyframes | Opacity 0.3 ↔ 0.8, 2s ease infinite. Fade out via GSAP after 200px scroll | Low |
| Navigation background | GSAP ScrollTrigger | Toggle class on scroll > 100px. CSS handles backdrop-filter transition | Low |
| About image entrance | GSAP ScrollTrigger | translateX(-60px) → 0 + opacity, 1s, power3.out, trigger at 85% viewport | Low |
| About text stagger | GSAP ScrollTrigger | Batch children with 0.12s stagger, translateY(30px) + opacity | Low |
| Stats count-up | GSAP | Animate from 0 to target value over 1.5s, power2.out, triggered on scroll enter | Low |
| Gallery pin + horizontal scroll | GSAP ScrollTrigger | Pin section, scrub xPercent: -62, end: "+=2000px" | Medium |
| Gallery container entrance | GSAP ScrollTrigger | translateY(80px) + opacity, 1.2s, power3.out | Low |
| Services cards entrance | GSAP ScrollTrigger | Left card: translateX(-40px), Right card: translateX(40px), 0.9s, 0.15s stagger | Low |
| Contact entrance | GSAP ScrollTrigger | Left: translateY(30px) + opacity 0.8s. Right: scale(0.96→1) + opacity 0.9s, 0.2s delay | Low |
| Section header reveals | GSAP ScrollTrigger | Shared pattern: translateY(30px) + opacity, 0.8s, power3.out, trigger at 85% | Low |
| Link underline grow | CSS | ::after pseudo, width 0→100%, transform-origin center, 0.4s ease | Low |
| Image hover (non-WebGL) | CSS | transform: scale(1.03), filter: brightness(1.05), 0.6s cubic-bezier(0.16,1,0.3,1) | Low |
| Card hover | CSS | border-color brighten, translateY(-3px), shadow deepen, 0.3s ease | Low |
| Organic parallax mouse | R3F useFrame | Lerp 0.05/frame on mouse position. Apply rotation + translation to layers group per frame | High |
| Bokeh post-processing | @react-three/postprocessing | BokehPass: focus 2.0, aperture 0.001, maxblur 0.015 | Medium |
| Film grain overlay | R3F useFrame | 128x128 canvas, random pixel fill each frame, opacity 0.03, OrthographicCamera fullscreen quad | Medium |
| Alternate parallax mouse | RAF loop | Mousemove updates state. rAF applies transform with depth multiplier per layer (1 + index * 0.3) | Medium |
| Falling petals | CSS @keyframes | 5 unique keyframe sets for fall + sway. 15 petals cycle through variants with staggered delays | Medium |
| Mobile menu overlay | GSAP timeline | Stagger fade-in links 0.08s each, 0.5s overlay slide | Low |
| Lightbox | CSS + JS | Overlay fade 0.3s, image scale(0.92→1) + opacity. Keyboard/touch navigation | Medium |

## State & Logic

### Lenis ↔ GSAP ScrollTrigger Bridge

Lenis owns the scroll. GSAP ScrollTrigger must receive updates. On Lenis init:
```
lenis.on('scroll', ScrollTrigger.update)
```
This is the only integration point. All scroll-triggered animations (pinning, reveals, scrub) use ScrollTrigger as normal — it reads the Lenis-managed scroll position.

### Language State

Simple string state: `'en' | 'bg' | 'de'`. All translated text lookups happen at render time via a translation map. No async loading — all three languages bundled. Language switch is instant. Does not affect animations.

### Gallery Scroll ↔ WebGL Uniform Bridge

The horizontal gallery scroll position drives `uScrollSpeed` in the distortion shader. Architecture:
1. A shared scroll state object (`{ x: number }`) is updated by GSAP ScrollTrigger's onUpdate callback
2. The WebGL gallery component reads this same object each frame in useFrame
3. Velocity = (prevX - currentX), smoothed at 0.07 lerp/frame
4. This value is written to the material's uScrollSpeed uniform

### Hero Texture Loading → Page Loader Dismissal

The OrganicParallaxImage component manages its own texture loading (useTexture or TextureLoader). On successful load:
1. Set a loaded state flag (React state)
2. This triggers a callback prop (onLoaded) consumed by the parent HeroSection
3. HeroSection starts the GSAP loader timeline (fade out → slide up → hero entrance begins)

### Mouse State for WebGL Effects

Two separate mouse tracking systems:
1. **Organic Parallax**: Tracks mouse on the window. Normalized to [-1, 1]. Lerp 0.05/frame. Drives layer group rotation + translation.
2. **Gallery Distortion**: Tracks pointer on the R3F canvas. Converted to UV space [0, 1]. Lerp 0.08/frame. Drives uMouse uniform + bulge effect.

Both use refs (not state) for 60fps updates to avoid React re-renders.

## Other Key Decisions

### Raw Three.js for Hero vs. R3F Helpers

The hero uses a custom `useEffect`-based Three.js setup (not declarative R3F components) because it requires:
- Custom `PlaneGeometry` with manual vertex rotation (not standard R3F mesh props)
- Manual post-processing pipeline (EffectComposer with BokehPass + OutputPass)
- Custom grain overlay with per-frame canvas manipulation

The R3F `<Canvas>` still wraps it for React integration and context, but the scene construction is imperative.

### Gallery WebGL Strategy — Fallback Plan

Primary: Each gallery image renders as a WebGL plane with the fluid distortion shader. This requires:
- A single R3F canvas overlaying the gallery section
- Plane meshes positioned to match DOM image positions (or replacing DOM images entirely)
- Scroll velocity → uScrollSpeed uniform each frame

Fallback (if performance issues): Use DOM-based horizontal scroll with CSS transforms only. Apply distortion as a single fullscreen shader composited over the entire gallery. This loses per-image hover bulge but keeps scroll-velocity distortion.

Simplest fallback: GSAP horizontal scroll + CSS scale hover effects. No WebGL. Documented as acceptable.

### Mobile Input Handling

- **Hero parallax**: On touch devices, replace mouse tracking with a gentle sine-wave auto-animation (slow orbiting motion). Disable mouse listeners.
- **Gallery**: Reduce image width, reduce scroll distance. Touch scroll works naturally with horizontal track.
- **Alternate parallax**: Reduce rotation intensity by 50%.
- **Petals**: Reduce count from 15 to 8.

### Image Asset Paths

All images referenced as `/photo_N_2026-06-08_16-40-33.jpg` (served from public/ directory). No build-time imports — loaded at runtime via TextureLoader (hero) or `<img>` tags (gallery/about). This avoids Vite asset pipeline issues with the specific filenames.
