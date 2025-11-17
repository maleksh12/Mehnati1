# Design Guidelines: مهنتي Job Platform

## Design Approach
**System**: Custom design system built on Shadcn UI with Material Design influence, optimized for Arabic RTL content and information-dense job listing interfaces.

**Key Principles**: Professional credibility, information hierarchy, Arabic typography excellence, and accessibility-first design for Libya's job market.

## Typography
**Font Family**: Tajawal (Google Fonts) - optimized Arabic typeface with weights 300, 400, 500, 700, 800, 900

**Hierarchy**:
- Hero Headlines: text-4xl md:text-6xl, font-bold (تايتل رئيسي)
- Section Headers: text-2xl md:text-3xl, font-bold
- Card Titles: text-xl, font-bold
- Body Text: text-base, font-normal
- Metadata/Labels: text-sm, font-medium
- Captions: text-xs, text-muted-foreground

## Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm

**Container Strategy**:
- Main container: max-w-7xl mx-auto px-4
- Section padding: py-12 md:py-20
- Card spacing: gap-6 md:gap-8
- Component internal: p-4 md:p-6

**Grid Patterns**:
- Job/Company cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Stats dashboard: grid-cols-1 md:grid-cols-3
- Mobile-first stacking, progressive enhancement

## Component Library

### Navigation
- Sticky header with backdrop-blur-md glass effect
- Desktop: horizontal navigation with icon + text pairs
- Mobile: slide-out menu with full overlay
- Logo: 40px rounded gradient container with icon

### Cards
- Base: rounded-lg with border, hover:shadow-lg transition
- Job cards: company info, title, metadata badges, action buttons
- Company cards: logo placeholder, follower count, sector badge
- Elevation on hover: translateY(-4px)

### Buttons
**Primary**: bg-gradient-to-r from-blue-600 to-indigo-700, white text
**Secondary**: variant="outline" with border-blue-600, text-blue-600
**Glass buttons on images**: backdrop-blur-md bg-white/20, no hover transforms

### Forms
- Input fields: border focus:ring-2 focus:ring-blue-600
- Select dropdowns: Shadcn Select component
- Search bars: with Search icon, rounded-lg
- Textareas: min-height appropriate for job descriptions

### Badges
- Status indicators: rounded-full px-3 py-1 text-xs
- Sector tags: subtle background colors
- Application counts: with icon prefixes

### Data Display
- Stats cards: large numbers with labels, icon decorations
- Job listings: title, company, location, salary in structured layout
- Company profiles: grid of information fields

## Visual Treatment

### Gradients
- Primary: from-blue-600 to-indigo-700
- Background washes: from-slate-50 to-blue-50
- Dark sections: from-slate-900 to-blue-900
- Text gradients: bg-clip-text text-transparent

### Glass Effects
- Header: bg-white/80 backdrop-blur-md
- Overlays: bg-white/10 backdrop-blur-sm
- Hero overlays: from-blue-900/95 to-indigo-900/90

### Shadows
- Base cards: shadow-sm
- Hover states: shadow-lg
- Buttons: shadow-md with colored tint

## Page-Specific Patterns

### Home Page
- **Hero**: Full-width with background image (Libyan professionals/cityscape), gradient overlay from-blue-900/95, centered text max-w-3xl, dual CTA buttons
- **Stats Section**: 3-column grid, large numbers, icon decorations, py-16
- **Featured Jobs**: 3-column card grid, 6 items, "View All" link
- **Featured Companies**: 4-column grid on desktop, company cards with logos
- **Call-to-Action Section**: gradient background, centered content, newsletter/registration prompt

### Jobs Listing
- Filters sidebar (desktop) or drawer (mobile): city, sector, type, experience dropdowns
- Search bar prominent at top
- Results grid: 2-3 columns
- Load more pagination

### Company Profile
- Header section: company logo, name, follower count, follow button
- Info grid: sector, location, employee count, website
- About section: full-width text
- Open positions: job cards grid

### Static Pages (About/Contact/Help)
- Single column layouts: max-w-4xl centered
- Accordion for FAQ section
- Contact form: 2-column on desktop (form + info)
- Breathing room: generous py-20 sections

## Images
**Hero Image**: Professional workplace scene showing Libyan professionals, modern office, or Tripoli/Benghazi cityscapes. Full-width background-cover with gradient overlay.

**Company Logos**: Square placeholders 80px-120px, rounded corners, subtle border.

**Decorative Icons**: Lucide React icons throughout - Briefcase, Building2, MapPin, Search, Filter, User.

## Accessibility
- RTL direction enforced globally with `dir="rtl"`
- ARIA labels on icon-only buttons
- Keyboard navigation support
- Color contrast WCAG AA minimum
- Focus visible states on all interactive elements
- Semantic HTML structure