# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WorkDNA is a React-based personality assessment web application for workplace environments. Users complete a 10-question survey to determine their work personality type from 4 categories (AA, AB, BA, BB).

## Technology Stack

- **Frontend**: React 19.1.0 with TypeScript, Vite 7.0.0 build tool
- **Routing**: React Router DOM 7.7.0 with AppRouter.tsx structure
- **Styling**: Tailwind CSS 4.1.11 with shadcn/ui component system
- **UI Components**: Radix UI primitives, Framer Motion 12.23.3 for animations
- **Backend**: Supabase 2.50.3 (PostgreSQL + anonymous access patterns)
- **Additional**: Kakao SDK integration, html2canvas-pro for image generation

## Architecture

### Routing Structure (AppRouter.tsx)
- `/` → TestApp (main personality test flow)
- `/dashboard` → Dashboard (protected admin analytics)
- `/care` → Care component (mental health assessment module)

### Core Components
- `TestQuestion.tsx`: Individual question display with progress tracking
- `TestResult.tsx`: Results with scroll animations and sharing functionality
- `ConsentDrawer.tsx`: GDPR-compliant privacy consent collection
- `SplashScreen.tsx`: Loading experience with animations
- `Dashboard.tsx`: Admin analytics interface with authentication

### Data Layer & State Management
- `useTest.ts`: Custom hook for test state management with localStorage persistence
- `AuthContext.tsx`: Authentication context for protected routes
- `src/lib/supabase.ts`: Supabase client configuration
- `calculatePersonalityType()`: Client-side personality type calculation algorithm

### Database Schema
Current primary table: `user_responses`
- Personal data (name, gender, age_range) - optional fields
- Individual answer columns (answer_1 through answer_10)
- Analytics data (device_type, browser, traffic_source, location)
- Personality results (personality_type, type_code, scores)
- Session tracking (duration, created_at, updated_at)

Legacy tables: `results`, `stats` for historical data

## Personality Type System

**Algorithm**: 
- Questions 1-5: Extrovert (A) vs Introvert (B) tendency
- Questions 6-10: Feeling (A) vs Thinking (B) tendency  
- 4 combinations: AA, AB, BA, BB with comparative scoring

**Types**:
- AA: "관계 속에서 빛나는 사교왕" (Social relationship-focused)
- AB: "진취적이며 자신감 있는 행동대장" (Confident action-oriented)
- BA: "배려가 넘치는 따뜻한 평화주의자" (Caring peacemaker)
- BB: "신뢰할 수 있는 솔직한 조언자" (Trustworthy advisor)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (includes TypeScript check)
npm run build

# Preview production build
npm run preview

# Linting only
npm run lint
```

## Environment Variables

Create a `.env` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## UI/UX Architecture

**Design System**:
- shadcn/ui component library with Radix UI primitives
- Custom color palette: gold tones (#d6b585) and navy (#1c3163)  
- Mobile-first responsive design (360px+ support)
- Framer Motion for micro-interactions and scroll animations

**Animation Patterns**:
- useInView hook for scroll-triggered animations
- Staggered animations for list items
- 3-second artificial loading delay for result anticipation
- Transform-based performance optimizations

**User Flow**:
1. Landing page with feature carousel (Embla Carousel)
2. Privacy consent with optional personal data collection
3. 10-question progressive assessment with visual progress
4. Loading animation with personality calculation
5. Results page with scroll animations and social sharing

## Key Implementation Details

**State Management**: 
- localStorage persistence for test progress across sessions
- Custom useTest hook centralizes test state logic
- AuthContext for dashboard authentication

**Analytics Integration**:
- Device/browser detection for user analytics
- Geographic location tracking (IP-based)  
- Session duration and traffic source attribution
- Comprehensive user journey tracking in user_responses table

**Performance Considerations**:
- Component-based architecture for code splitting potential
- Progressive image loading for personality type results
- Client-side personality calculation (no server dependency)
- Anonymous-first database design with RLS policies