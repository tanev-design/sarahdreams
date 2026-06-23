---
version: 1.1
name: SarahDream
register: brand
description: A warm, discreet single-page brand site for an independent sensual companion. Soft cream surfaces, dusty-rose accents, and a serif/sans type pairing create an intimate, high-end mood while keeping services, pricing, and booking immediately scannable.

colors:
  bg: "#ffffff"
  section-alt: "#f9f4ef"
  surface: "#ffffff"
  card: "#fffaf7"
  card-soft: "#f7ede6"
  ink: "#2d2424"
  body: "#5e524c"
  muted: "#6b5f59"
  accent: "#9c5f59"
  accent-rgb: "156, 95, 89"
  accent-dark: "#7a443f"
  champagne: "#c9a96e"
  border: "#f0e2d8"
  shadow: "rgba(93, 69, 64, 0.06)"
  shadow-hover: "rgba(93, 69, 64, 0.12)"
  shadow-strong: "rgba(0, 0, 0, 0.45)"

typography:
  display:
    fontFamily: "'Bodoni Moda', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.6rem, 7vw, 4.6rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "'Bodoni Moda', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.7rem, 4vw, 2.6rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "'Bodoni Moda', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.15rem, 2vw, 1.35rem)"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: "'Work Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  body-small:
    fontFamily: "'Work Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Work Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.82rem"
    fontWeight: 500
    letterSpacing: "0.02em"
    textTransform: none
  button:
    fontFamily: "'Work Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.88rem"
    fontWeight: 600
    letterSpacing: "0.04em"

rounded:
  xs: 2px
  sm: 12px
  md: 18px
  lg: 24px
  full: 9999px

spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2.5rem
  section: 3.5rem
  section-lg: 4.5rem

components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    borderRadius: "{rounded.full}"
    padding: "0.85rem 1.6rem"
    shadow: "0 4px 16px rgba({colors.accent-rgb}, 0.3)"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    border: "1px solid {colors.border}"
    borderRadius: "{rounded.full}"
    padding: "0.85rem 1.6rem"
  card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    borderRadius: "{rounded.md}"
    padding: "1.75rem"
    shadow: "{colors.shadow}"
  input:
    backgroundColor: "{colors.card}"
    border: "1px solid {colors.border}"
    borderRadius: "{rounded.sm}"
    padding: "0.85rem 1rem"
    focusBorder: "{colors.accent}"
  header:
    backgroundColor: "rgba(255, 255, 255, 0.94)"
    blur: "14px"
    height: "72px"
---

## Overview

SarahDream is a brand-forward single-page site: the design itself is the product. The visual goal is to feel like a private invitation — warm, clean, and confident.

The page is built from a few large, scannable sections. The header is always available with a direct call button. The hero establishes the mood with a large serif headline and a single portrait. Services and prices are grouped into three cards so the offer is understood in seconds. The gallery is a horizontal carousel on mobile/tablet and a tidy centered grid on desktop. Booking is a single card with a no-registration form that opens the visitor's SMS or email app pre-filled.

### Color Strategy

A **Restrained** palette: warm neutral surfaces with one soft rose accent. The body background is pure white, so the warm cream cards (`#fffaf7`) and section tints (`#f9f4ef`) carry the softness without the page itself reading as generic beige. Cards are pure white with a subtle warm border. The accent (`#9c5f59`) carries every primary action, selected time slot, and phone link. No gradients are used; color meaning is consistent.

### Typography Strategy

A serif/sans pairing: **Bodoni Moda** for display and headings (elegant, editorial), **Work Sans** for body and UI. Headings use fluid `clamp()` sizing; body stays at a fixed `1rem`. Line lengths are capped with `max-width: 60ch` for comfort.

### Layout Strategy

Sections stack vertically with generous but not excessive spacing. Inside sections, content is constrained to a `1180px` container. Cards use CSS Grid with `auto-fit` for responsive columns. About and booking sit on a soft tinted background to create rhythm. The gallery centers on desktop via a 5-column grid.

### Motion Strategy

Entrance animations are subtle reveal transitions (opacity + translate/scale). They are gated on `IntersectionObserver`, but content is visible by default so reduced-motion users and headless renderers never see blank sections. Transitions on interactive elements are short (150–300ms) and use ease-out curves. No bounce, no elastic easing.
