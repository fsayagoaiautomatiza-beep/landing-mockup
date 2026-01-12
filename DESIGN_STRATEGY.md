# AiAutomatiza — Design Strategy Document

## Ultra-Minimalist, Apple-Style Landing Page

---

## 📑 Table of Contents

1. [Brand & Style Guide](#1-brand--style-guide)
2. [Section-by-Section Narrative Wireframe](#2-section-by-section-narrative-wireframe)
3. [Animation & Interaction Specifications](#3-animation--interaction-specifications)
4. [Technical Strategy & Stack](#4-technical-strategy--stack)
5. [SEO & Performance Optimizations](#5-seo--performance-optimizations)

---

## 1. Brand & Style Guide

### 1.1 Current Color Palette Analysis

Based on your existing `global.css`, your brand colors are:

| Token                | HSL Value                | Hex Equivalent | Usage                 |
| -------------------- | ------------------------ | -------------- | --------------------- |
| `--color-background` | `hsl(222.2 84% 4.9%)`    | `#020a18`      | Deep dark background  |
| `--color-foreground` | `hsl(210 40% 98%)`       | `#f8fafc`      | Primary text color    |
| `--color-primary`    | `hsl(217.2 91.2% 59.8%)` | `#3b82f6`      | Primary accent (Blue) |
| `--color-secondary`  | `hsl(217.2 32.6% 17.5%)` | `#1e293b`      | Secondary surfaces    |
| `--color-muted`      | `hsl(215 20.2% 65.1%)`   | `#94a3b8`      | Muted text            |
| `--color-accent`     | `hsl(217.2 32.6% 17.5%)` | `#1e293b`      | Accent elements       |

**Additional gradient colors detected:**

- Violet/Purple gradient end: `#7c3aed` → `#8b5cf6`
- Sky blue accent: `#0ea5e9`
- Green (success/WhatsApp): `#22c55e`

---

### 1.2 Minimalist Color Framework

To achieve Apple-style minimalism, we apply the **"20/80 Rule"** — 80% neutral tones (blacks, whites, grays), 20% brand color for strategic impact.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        COLOR HIERARCHY                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ████████████████████████████████████████  Deep Black (#020a18)     │
│  ────────────────────────────────────────  Primary Background       │
│                                                                     │
│  ████████████████████████████████  Slate-900 (#0f172a)              │
│  ────────────────────────────────  Card/Surface Background          │
│                                                                     │
│  ████████████████████  Slate-400/500 (#94a3b8)                      │
│  ────────────────────  Body Text, Muted Content                     │
│                                                                     │
│  ██████████  White (#f8fafc)                                        │
│  ──────────  Headlines, Primary Text                                │
│                                                                     │
│  ████  Blue Primary (#3b82f6)                                       │
│  ────  CTAs, Links, Key Accents ONLY                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 1.3 Typography System

**Font Stack:** Inter (already implemented)

| Level          | Size (Desktop/Mobile) | Weight | Line Height | Letter Spacing | Use Case           |
| -------------- | --------------------- | ------ | ----------- | -------------- | ------------------ |
| **Display XL** | 72px / 48px           | 700    | 1.0         | -2%            | Hero headline      |
| **Display L**  | 56px / 36px           | 700    | 1.1         | -1.5%          | Section titles     |
| **Display M**  | 40px / 28px           | 600    | 1.2         | -1%            | Sub-section titles |
| **Heading**    | 28px / 22px           | 600    | 1.3         | -0.5%          | Card titles        |
| **Body L**     | 20px / 18px           | 400    | 1.6         | 0              | Lead paragraphs    |
| **Body**       | 16px / 16px           | 400    | 1.7         | 0              | Default content    |
| **Caption**    | 14px / 12px           | 500    | 1.5         | 0.5%           | Labels, metadata   |

**Typography CSS Variables:**

```css
@theme {
  /* Font sizes - Mobile first */
  --font-size-display-xl: clamp(3rem, 8vw, 4.5rem);
  --font-size-display-l: clamp(2.25rem, 6vw, 3.5rem);
  --font-size-display-m: clamp(1.75rem, 4vw, 2.5rem);
  --font-size-heading: clamp(1.375rem, 2.5vw, 1.75rem);
  --font-size-body-l: clamp(1.125rem, 2vw, 1.25rem);
  --font-size-body: 1rem;
  --font-size-caption: 0.875rem;

  /* Letter spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.005em;
}
```

---

### 1.4 Spacing & Layout System

**Base Unit:** 8px grid

| Token      | Value | Usage                      |
| ---------- | ----- | -------------------------- |
| `space-1`  | 4px   | Micro spacing, icon gaps   |
| `space-2`  | 8px   | Element internal padding   |
| `space-3`  | 12px  | Tight groupings            |
| `space-4`  | 16px  | Standard padding           |
| `space-6`  | 24px  | Card padding, section gaps |
| `space-8`  | 32px  | Section internal spacing   |
| `space-12` | 48px  | Large section gaps         |
| `space-16` | 64px  | Section padding (mobile)   |
| `space-24` | 96px  | Section padding (desktop)  |
| `space-32` | 128px | Hero section padding       |

**Content Width:**

- Max content width: `1280px`
- Tight content: `960px` (for text-heavy sections)
- Ultra-tight: `720px` (for single-column narratives)

---

### 1.5 Glassmorphism & Surfaces

**Glass Card Specifications:**

```css
.glass-premium {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0.01) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px);
  border-radius: 24px; /* Generous, Apple-like */
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03) inset, 0 20px 50px -20px rgba(0, 0, 0, 0.5);
}

.glass-subtle {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  border-radius: 16px;
}
```

---

### 1.6 Brand Color Application Rules

**PRIMARY BLUE (#3b82f6)**

- ✅ CTA buttons (primary action only)
- ✅ Text links on hover
- ✅ Feature highlight text/accents
- ✅ Icon accents (used sparingly)
- ❌ Never for large background areas
- ❌ Never for decorative elements

**GRADIENT (Blue → Violet)**

```css
--gradient-primary: linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%);
--gradient-glow: radial-gradient(
  ellipse at center,
  rgba(59, 130, 246, 0.15) 0%,
  transparent 70%
);
```

- ✅ Hero CTA button
- ✅ Accent text (headlines, keywords)
- ✅ Subtle ambient glows
- ❌ Never fill entire sections

---

## 2. Section-by-Section Narrative Wireframe

### 2.1 Hero Section — "The Disruptive Hook"

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  NAVBAR (Floating glass pill) ───────────────────────────────────────────── │
│  [Logo] ─────────── [Links] ────────────────── [CTA Button]                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                    [Subtle animated badge: "IA Activa 24/7"]                │
│                                                                             │
│                         ┌─────────────────────────────┐                     │
│                         │  HEADLINE (Display XL)      │                     │
│                         │  "Tus pacientes             │                     │
│                         │   atendidos.                │                     │
│                         │   Siempre."                 │                     │
│                         │         ↳ gradient text     │                     │
│                         └─────────────────────────────┘                     │
│                                                                             │
│                    Sub-headline (Body L, muted slate-400)                   │
│                    "El 29% de las llamadas se pierden..."                   │
│                                                                             │
│                         ┌─────────────────────────┐                         │
│                         │   [ AGENDA TU DEMO →  ] │  ← Primary gradient CTA │
│                         └─────────────────────────┘                         │
│                                                                             │
│                    Trust indicators (small, subtle)                         │
│                    ✓ Sin contratos  ·  ✓ Setup 48h  ·  ✓ 40% más citas      │
│                                                                             │
│  ───────────────────────────────────────────────────────────────────────────│
│                                                                             │
│              ┌─────────────────────────────────────────────┐                │
│              │                                             │                │
│              │         VIDEO EMBED (Glass frame)           │                │
│              │         16:9 aspect ratio                   │                │
│              │         Subtle glow behind                  │                │
│              │                                             │                │
│              └─────────────────────────────────────────────┘                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Design Notes:**

- **Headline Strategy:** Apple-style — ultra-short, emotionally resonant
- **Layout:** Centered single-column for maximum impact
- **Micro-animation:** Badge pulse, subtle float on video frame
- **White space:** Extremely generous — 40% of hero is breathing room

---

### 2.2 Stats Section — "Social Proof Strip"

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐     │
│   │     40%     │   │     91%     │   │     92%     │   │     29%     │     │
│   │ Más citas   │   │ Resuelto    │   │ Menos carga │   │ Reactivación│     │
│   │             │   │ <2min       │   │             │   │             │     │
│   └─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘     │
│                                                                             │
│   [NÚMEROS: Gradient text from white to slate-500, creates depth]           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Design Notes:**

- Minimal glass divider line above/below
- Numbers use `font-weight: 700` with gradient fill
- Staggered fade-in animation (200ms delay between each)
- Counter animation on scroll-into-view (number counting up)

---

### 2.3 Clients Section — "Trust Carousel"

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│              "Clientes que confían en nosotros"                             │
│              ↳ gradient on "Clientes"                                       │
│                                                                             │
│   ← [ Logo ─ Logo ─ Logo ─ Logo ─ Logo ─ Logo ─ Logo ] →                    │
│        ↳ Infinite horizontal scroll, pauses on hover                       │
│        ↳ Edge fade gradients (left/right)                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Design Note:** Logos should be grayscale by default, subtle color on hover.

---

### 2.4 Problem/Solution — "The Visual Narrative"

**Current:** Cards in grid.
**Proposed:** Full-width comparison with cinematic depth.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│               "Entiende por qué pierdes pacientes"                          │
│                          ↓                                                  │
│              "Descubre cómo aumentar tus ingresos"                          │
│                                                                             │
│   ┌─────────────────────────────┬─────────────────────────────┐             │
│   │                             │                             │             │
│   │    SIN AIAutomatiza         │     CON AIAutomatiza        │             │
│   │    (Muted, red accents)     │     (Vibrant, blue glow)    │             │
│   │                             │                             │             │
│   │    ✕ Pacientes sin resp.    │     ✓ Respuesta instant.    │             │
│   │    ✕ Pérdida de ventas      │     ✓ Citas automáticas     │             │
│   │    ✕ Personal saturado      │     ✓ Seguimiento fácil     │             │
│   │                             │                             │             │
│   │    [iPhone mockup - dim]    │     [iPhone mockup - glow]  │             │
│   │                             │                             │             │
│   └─────────────────────────────┴─────────────────────────────┘             │
│                                                                             │
│                    ↳ Parallax depth on phone mockups                        │
│                    ↳ "Con" side has subtle pulsing glow                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 2.5 Solutions Section — "Bento Grid" (New Layout)

**Replace traditional 3-column grid with a Bento Grid layout:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    "Nuestras Soluciones"                                    │
│                                                                             │
│   ┌───────────────────────────────────────────┬─────────────────────────┐   │
│   │                                           │                         │   │
│   │         ASISTENTE WHATSAPP                │    RECEPCIÓN            │   │
│   │         (Large featured card)             │    LLAMADAS             │   │
│   │                                           │                         │   │
│   │         [Chat bubbles animation]          │    [iPhone mockup]      │   │
│   │                                           │                         │   │
│   │         • Responde 24/7                   │    • Atiende instant    │   │
│   │         • Agenda auto                     │    • Cero perdidas      │   │
│   │         • Recordatorios                   │                         │   │
│   │                                           │                         │   │
│   │                           [CTA →]         │              [CTA →]    │   │
│   │                                           │                         │   │
│   ├───────────────────────────────────────────┼─────────────────────────┤   │
│   │                                           │                         │   │
│   │         LLAMADAS SALIENTES                │    INTEGRACIÓN          │   │
│   │         (Medium card)                     │    TOTAL                │   │
│   │                                           │    (Small accent)       │   │
│   │         [iPhone mockup]                   │                         │   │
│   │                                           │    "CRM, calendarios,   │   │
│   │         • Campañas automáticas            │     y más..."           │   │
│   │         • Reactivación pacientes          │                         │   │
│   │                                           │                         │   │
│   │                           [CTA →]         │              [→]        │   │
│   │                                           │                         │   │
│   └───────────────────────────────────────────┴─────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Mobile: Stack vertically, maintain hierarchy
```

---

### 2.6 Testimonials / Social Proof (New Section Recommended)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│              "Lo que dicen nuestros clientes"                               │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │                                                                 │       │
│   │    "AiAutomatiza transformó nuestra clínica. Ahora              │       │
│   │     atendemos 3x más pacientes sin ampliar el equipo."          │       │
│   │                                                                 │       │
│   │                 — Dra. María González, Clínica Derma            │       │
│   │                   ★★★★★                                         │       │
│   │                                                                 │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
│   [  ○   ●   ○   ○  ] ← Carousel dots, auto-rotate every 5s                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 2.7 Final CTA Section — "The Closer"

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │                                                                 │       │
│   │              "¿Listo para automatizar                           │       │
│   │               tu clínica?"                                      │       │
│   │                                                                 │       │
│   │              [  AGENDA TU DEMO GRATIS  →  ]                     │       │
│   │                                                                 │       │
│   │              ↳ Subtle ambient glow animation behind button      │       │
│   │                                                                 │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                   ↳ Glass card with gradient border                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 2.8 Footer — "Clean & Minimal"

Current footer is good. Refinements:

- Reduce padding for more minimal feel
- Add subtle top gradient fade instead of hard border
- Simplify link structure

---

## 3. Animation & Interaction Specifications

### 3.1 Scroll-Triggered Animations (Reveal-on-Scroll)

**Implementation:** IntersectionObserver with CSS classes

| Element Type   | Animation           | Duration | Easing                        | Delay Stagger |
| -------------- | ------------------- | -------- | ----------------------------- | ------------- |
| Headlines      | Fade Up + Scale     | 800ms    | cubic-bezier(0.16, 1, 0.3, 1) | 0             |
| Body text      | Fade Up             | 600ms    | ease-out                      | 100ms         |
| Cards          | Fade Up + Translate | 700ms    | cubic-bezier(0.16, 1, 0.3, 1) | 150ms         |
| Stats numbers  | Fade In + Count Up  | 1200ms   | ease-out                      | 200ms         |
| Images/Mockups | Scale + Fade        | 900ms    | cubic-bezier(0.16, 1, 0.3, 1) | 0             |

**CSS Implementation:**

```css
/* Base state - hidden */
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Visible state */
[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children */
[data-animate-stagger] > *:nth-child(1) {
  transition-delay: 0ms;
}
[data-animate-stagger] > *:nth-child(2) {
  transition-delay: 100ms;
}
[data-animate-stagger] > *:nth-child(3) {
  transition-delay: 200ms;
}
[data-animate-stagger] > *:nth-child(4) {
  transition-delay: 300ms;
}
```

---

### 3.2 Parallax Effects

**Hero Background Blobs:**

- Scroll speed: 0.3x (moves slower than content)
- Range: 0-30% viewport scroll

**iPhone Mockups in Comparison:**

- Scroll speed: 0.9x (slight depth effect)
- Range: within section bounds

**Implementation:**

```javascript
// Lightweight parallax (no library)
const parallaxElements = document.querySelectorAll("[data-parallax]");

function updateParallax() {
  const scrollY = window.scrollY;
  parallaxElements.forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.5;
    const rect = el.getBoundingClientRect();
    const offset = (rect.top + scrollY) * speed;
    el.style.transform = `translateY(${-offset}px)`;
  });
}

window.addEventListener("scroll", () => requestAnimationFrame(updateParallax));
```

---

### 3.3 Hover Interactions

**Buttons (Primary CTA):**

```css
.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #7c3aed);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px -4px rgba(59, 130, 246, 0);
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 40px -8px rgba(59, 130, 246, 0.4);
}

.btn-primary:active {
  transform: translateY(0) scale(0.98);
}
```

**Cards (Glass surfaces):**

```css
.card-glass {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease,
    border-color 0.3s ease;
}

.card-glass:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}
```

**Links/Navigation:**

```css
.nav-link {
  position: relative;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #7c3aed);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: white;
}

.nav-link:hover::after {
  width: 100%;
}
```

---

### 3.4 Cinematic Micro-Interactions

**Badge Pulse (Hero "IA Activa 24/7"):**

```css
.badge-pulse span.dot {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
    transform: scale(1.1);
  }
}
```

**Floating Animation (Phone mockups):**

```css
.float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-16px);
  }
}
```

**Glow Pulse (CTA backdrop):**

```css
.glow-pulse {
  animation: glow 3s ease-in-out infinite;
}

@keyframes glow {
  0%,
  100% {
    opacity: 0.5;
    filter: blur(40px);
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    filter: blur(60px);
    transform: scale(1.2);
  }
}
```

---

### 3.5 Loading & Page Transitions

**Initial Page Load:**

1. Navbar fades in (0-300ms)
2. Hero content staggers in (300-1000ms)
3. Background blobs fade in (500-1500ms)

**Smooth Scroll:**

```css
html {
  scroll-behavior: smooth;
}

/* For Safari/older browsers */
@supports not (scroll-behavior: smooth) {
  html {
    scroll-behavior: auto;
  }
}
```

---

## 4. Technical Strategy & Stack

### 4.1 Current Stack (Keep)

| Technology           | Purpose               | Status  |
| -------------------- | --------------------- | ------- |
| **Astro 5.x**        | Static site generator | ✅ Keep |
| **Tailwind CSS 4.x** | Styling               | ✅ Keep |
| **TypeScript**       | Type safety           | ✅ Keep |
| **Lucide React**     | Icons                 | ✅ Keep |

### 4.2 Recommended Additions

| Technology              | Purpose            | Priority | Bundle Impact |
| ----------------------- | ------------------ | -------- | ------------- |
| **Vanilla JS Observer** | Scroll animations  | High     | ~1KB          |
| **GSAP (optional)**     | Complex animations | Medium   | ~50KB         |
| **Lenis**               | Smooth scroll      | Low      | ~5KB          |

**Recommendation:** Use pure CSS + IntersectionObserver first. Only add GSAP if you need:

- Complex timeline sequences
- Scroll-linked animations (pinning, scrubbing)
- Physics-based animations

### 4.3 Performance Optimizations

**Image Strategy:**

```astro
<!-- Use Astro's built-in image optimization -->
<Image
  src={import('../assets/hero-phone.png')}
  alt="Mockup"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, 50vw"
  format="webp"
  quality={80}
/>
```

**Font Loading:**

```html
<!-- Preload critical fonts -->
<link
  rel="preload"
  href="/fonts/Inter-var.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>

<!-- Use font-display: swap -->
<style>
  @font-face {
    font-family: "Inter";
    font-display: swap;
    src: url("/fonts/Inter-var.woff2") format("woff2");
  }
</style>
```

**Critical CSS:**

- Inline critical CSS in `<head>` for above-the-fold content
- Defer non-critical CSS

---

### 4.4 File Structure (Recommended)

```
src/
├── components/
│   ├── ui/                      # Reusable primitives
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Badge.astro
│   │   └── Container.astro
│   ├── sections/                # Page sections
│   │   ├── Hero.astro
│   │   ├── Stats.astro
│   │   ├── Clients.astro
│   │   ├── Comparison.astro
│   │   ├── Solutions.astro      # Bento grid
│   │   ├── Testimonials.astro   # New
│   │   ├── FinalCTA.astro       # New
│   │   └── Footer.astro
│   └── Navbar.astro
├── layouts/
│   └── Layout.astro
├── lib/
│   ├── animations.ts            # Scroll observer logic
│   └── utils.ts
├── styles/
│   ├── global.css               # Base + Tailwind
│   ├── animations.css           # Animation keyframes
│   └── typography.css           # Type scale (optional)
└── pages/
    └── index.astro
```

---

## 5. SEO & Performance Optimizations

### 5.1 HTML Structure

```html
<!-- Proper heading hierarchy -->
<h1>Tus pacientes atendidos. Siempre.</h1>
<h2>Resultados comprobados</h2>
<h2>¿Tu personal está saturado?</h2>
<h3>Llamadas Perdidas</h3>
<h3>Ausentismo Alto</h3>
<h3>Tareas Repetitivas</h3>
<h2>Nuestras Soluciones</h2>
<h3>Asistente de WhatsApp</h3>
<h3>Recepción de Llamadas</h3>
<h3>Llamadas Salientes</h3>
<h2>Lo que dicen nuestros clientes</h2>
<h2>¿Listo para automatizar tu clínica?</h2>
```

### 5.2 Meta Tags

```astro
---
// Layout.astro
const seo = {
  title: "AiAutomatiza | Automatización con IA para Clínicas",
  description: "Sistema de IA que atiende pacientes y genera ventas 24/7. WhatsApp, llamadas y agendamiento automático. +40% conversión garantizada.",
  image: "/og-image.jpg",
  url: "https://aiautomatiza.com"
};
---

<head>
  <!-- Primary Meta Tags -->
  <title>{seo.title}</title>
  <meta name="title" content={seo.title}>
  <meta name="description" content={seo.description}>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content={seo.url}>
  <meta property="og:title" content={seo.title}>
  <meta property="og:description" content={seo.description}>
  <meta property="og:image" content={seo.image}>

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content={seo.url}>
  <meta property="twitter:title" content={seo.title}>
  <meta property="twitter:description" content={seo.description}>
  <meta property="twitter:image" content={seo.image}>

  <!-- Canonical -->
  <link rel="canonical" href={seo.url}>

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AiAutomatiza",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Sistema de automatización con IA para clínicas",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  </script>
</head>
```

### 5.3 Core Web Vitals Targets

| Metric  | Target  | Strategy                           |
| ------- | ------- | ---------------------------------- |
| **LCP** | < 2.5s  | Preload hero image, optimize fonts |
| **FID** | < 100ms | Minimal JS, defer non-critical     |
| **CLS** | < 0.1   | Reserve space for images, fonts    |

### 5.4 Performance Checklist

- [ ] Enable Astro's static site generation
- [ ] Use `loading="lazy"` on below-fold images
- [ ] Compress all images to WebP
- [ ] Minify CSS/JS in production
- [ ] Implement service worker for caching
- [ ] Use CDN for assets
- [ ] Enable Brotli/Gzip compression

---

## Summary

This design strategy transforms AiAutomatiza's landing page into a **premium, Apple-inspired experience** while:

1. **Respecting your brand colors** — Blue/violet gradient remains primary, used strategically
2. **Maximizing white space** — 80% neutral, 20% accent for high-end feel
3. **Implementing cinematic interactions** — Scroll-triggered reveals, parallax, micro-animations
4. **Optimizing for conversions** — Clear CTA hierarchy, trust signals, emotional narrative
5. **Ensuring top performance** — Core Web Vitals optimized, SEO-ready structure

**Next Steps:**

1. Implement updated CSS variables and typography system
2. Refactor components with new glass/animation classes
3. Add IntersectionObserver for scroll animations
4. Create Bento Grid layout for Solutions section
5. Test and optimize Core Web Vitals

---

_Document created: January 2026_
_Version: 1.0_
