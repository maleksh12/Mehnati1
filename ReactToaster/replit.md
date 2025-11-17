# مهنتي (Mehnati) - Libyan Job Platform

## Overview

مهنتي is a professional networking and job platform specifically designed for the Libyan job market. It connects Libyan graduates with employment opportunities and helps companies find qualified talent. The platform features job listings, company profiles, and a bilingual interface optimized for Arabic RTL content with English language support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for client-side routing, providing a lightweight alternative to React Router with support for Arabic content paths.

**UI Components**: Custom design system built on Shadcn UI components with Radix UI primitives. The component library includes 40+ pre-built components (accordion, alert-dialog, avatar, badge, button, card, carousel, etc.) following a consistent design language optimized for Arabic typography and RTL layouts.

**Styling**: 
- Tailwind CSS for utility-first styling
- Custom CSS variables for theming (light/dark mode support)
- Tajawal font family from Google Fonts for Arabic typography excellence
- RTL-first design with `dir="rtl"` on the root element
- Responsive breakpoints using Tailwind's mobile-first approach

**State Management**: 
- TanStack Query (React Query) v5 for server state management and caching
- React hooks for local component state
- Custom query client configuration with persistent caching and optimized refetch behavior

**Design System**:
- Material Design influence with custom adaptations
- Information-dense layouts optimized for job listings
- Glass morphism effects (backdrop-blur) for modern UI elements
- Gradient backgrounds and elevation system for visual hierarchy
- Consistent spacing using Tailwind units (2, 4, 6, 8, 12, 16, 20, 24, 32)

### Backend Architecture

**Framework**: Express.js running on Node.js with TypeScript for type safety.

**Server Setup**:
- Custom Vite middleware integration for development hot module replacement
- Static file serving for production builds
- Request/response logging middleware
- JSON body parsing with raw body verification support

**API Structure**: RESTful API design with the following endpoints:
- `/api/stats` - Platform statistics (total jobs, companies, applications)
- `/api/companies` - Company CRUD operations
- `/api/companies/featured` - Featured companies listing
- `/api/companies/:id` - Individual company details
- `/api/companies/:id/jobs` - Jobs by company
- `/api/jobs` - Job CRUD operations
- `/api/jobs/recent` - Recent job listings

**Data Layer**: Abstract storage interface (`IStorage`) with in-memory implementation (`MemStorage`) for development. The architecture supports easy migration to database-backed storage through the interface pattern.

**Validation**: Zod schemas for runtime type validation of incoming data, with `drizzle-zod` integration for schema-to-validator generation.

### Data Storage Solutions

**Current**: In-memory storage using JavaScript Maps for rapid development and testing. Includes seed data for Libyan companies and jobs.

**Planned**: PostgreSQL via Drizzle ORM configured with Neon serverless adapter. Schema definitions are already in place in `shared/schema.ts`.

**Schema Design**:
- **Companies Table**: id, name, description, sector, city, website, companyType, employeeCount, followersCount, createdAt
- **Jobs Table**: id, companyId, title, description, requirements, jobType, experienceLevel, city, sector, salaryRange, isActive, applicationsCount, createdAt

**Data Models**:
- Type-safe TypeScript interfaces generated from Drizzle schemas
- Separate insert schemas (omitting auto-generated fields)
- Zod validation schemas for API input validation

### Authentication & Authorization

**Current Status**: Not yet implemented. UI includes placeholder authentication dialogs and user profile components.

**Planned Approach**: Session-based authentication using `connect-pg-simple` for PostgreSQL session storage (dependency already included).

### Localization & RTL Support

**Primary Language**: Arabic (RTL layout)
**Secondary**: English language support in codebase
**Implementation**:
- Root-level `dir="rtl"` attribute
- Tajawal font family optimized for Arabic
- RTL-aware Tailwind utilities
- Meta tags in Arabic for SEO

### Data Constants

**Libyan Cities**: Tripoli, Benghazi, Misrata, Zawiya, Bayda, Sabha, Gharyan, Zliten, Khoms, Sabratha, Zintan, Tarhuna, Surman, Derna, Tobruk, Marj, Ajdabiya (17 cities)

**Sectors**: Oil & Gas, Technology & Programming, Education, Healthcare, Engineering, Accounting & Finance, Marketing & Sales, Construction, Tourism & Hospitality, Law, Media (11 sectors)

**Job Types**: Full-time, Part-time, Contract, Freelance

**Experience Levels**: Entry Level, Mid-Level, Senior, Executive

## External Dependencies

### Core Framework Dependencies
- **React 18**: UI framework with concurrent features
- **TypeScript**: Type safety across frontend and backend
- **Express.js**: Backend web server
- **Vite**: Build tool and development server with HMR

### UI Component Libraries
- **Radix UI**: Headless component primitives (40+ components)
- **Shadcn UI**: Pre-built accessible components
- **class-variance-authority**: Component variant management
- **Lucide React**: Icon library

### Data & State Management
- **TanStack Query v5**: Server state management
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **Drizzle ORM**: Type-safe database toolkit
- **@neondatabase/serverless**: PostgreSQL serverless adapter

### Styling & Fonts
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing
- **Google Fonts (Tajawal)**: Arabic typography

### Development Tools
- **Wouter**: Lightweight client-side routing
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development plugins

### Session Management (Configured)
- **connect-pg-simple**: PostgreSQL session store for Express

### Database
- **PostgreSQL**: Production database (via Neon serverless)
- **Drizzle Kit**: Database migration tool

### Build Configuration
- **Target**: ESNext modules with DOM libraries
- **Module Resolution**: Bundler mode for modern tooling
- **Path Aliases**: `@/` for client code, `@shared/` for shared schemas
- **TypeScript**: Strict mode enabled with incremental compilation