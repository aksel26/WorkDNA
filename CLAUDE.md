# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WorkDNA is a React-based personality assessment web application for workplace environments. Users complete a 10-question survey to determine their work personality type from 4 categories (AA, AB, BA, BB).

## Technology Stack

- **Frontend**: React 19.1.0 with TypeScript, Vite 7.0.0 build tool
- **Routing**: React Router DOM 6.30.x with AppRouter.tsx structure
- **Styling**: Tailwind CSS 4.1.11 with shadcn/ui component system
- **UI Components**: Radix UI primitives, Framer Motion 12.23.3 for animations
- **Backend**: PocketBase (self-hosted on Fly.io, SDK via `pocketbase` npm package)
- **i18n**: i18next + react-i18next with browser language detection (ko/en, fallback: ko)
- **Charts**: Recharts 2.x for dashboard analytics visualization
- **Additional**: Kakao SDK integration, html2canvas-pro for image generation

## Architecture

### Routing Structure (AppRouter.tsx)
- `/` → TestApp (main personality test flow)
- `/dashboard` → Dashboard (protected admin analytics)
- `/care` → Care component (mental health assessment module)

### Core Components
- `TestQuestion.tsx`: Individual question display with progress tracking
- `TestResult.tsx`: Results with scroll animations and sharing functionality
- `TestLoading.tsx`: Loading screen during personality calculation
- `ConsentDrawer.tsx` / `ConsentModal.tsx`: Privacy consent collection
- `SplashScreen.tsx`: Loading experience with animations
- `Dashboard.tsx`: Admin analytics interface with authentication (recharts)
- `LoginPage.tsx` / `ProtectedRoute.tsx`: Auth flow for dashboard

### Care Module (Mental Health Assessment)
- `Care.tsx` → `CareIntro.tsx` → `CareTest.tsx` → `CareResult.tsx`
- Questions defined in `data/careQuestions.ts`
- Progress tracked via `hooks/useCareProgress.ts`

### Data Layer & State Management
- `useTest.ts`: Core test state hook with localStorage persistence (key: `workdna-test-state`)
- `useKakao.ts`: Kakao SDK sharing integration
- `useStats.ts` / `useWeeklyStats.ts`: Dashboard analytics hooks
- `AuthContext.tsx`: Authentication context for protected routes
- `src/lib/pocketbase.ts`: PocketBase client configuration, types, and `updateDailyStats()` helper
- `calculatePersonalityType()` in `data/personalityTypes.ts`: Client-side type calculation
- `data/questions.ts`: Question definitions, `data/typeDetails.ts`: Extended type info
- `utils/browserDetection.ts`: Device/browser/location/traffic detection
- `utils/personalityTypeUtils.ts`: Type code ↔ alias mapping

### Database Schema
Current primary table: `user_responses`
- Personal data (name, gender, age_range) - optional fields
- Individual answer columns (answer_1 through answer_10)
- Analytics data (device_type, browser, traffic_source, location)
- Personality results (personality_type, type_code, scores)
- Session tracking (duration, PocketBase auto-fields: `created`, `updated`)

Additional collections: `stats` (daily aggregates), `care_responses` (mental health data)

## Personality Type System

**Algorithm**: 
- Questions 1-5: Extrovert (A) vs Introvert (B) tendency
- Questions 6-10: Feeling (A) vs Thinking (B) tendency  
- 4 combinations: AA, AB, BA, BB with comparative scoring

**Types**: AA (외향+감정), AB (외향+논리), BA (내향+감정), BB (내향+논리)
- Full type names/descriptions defined in `data/personalityTypes.ts`
- Korean aliases (사교왕, 행동대장, 평화주의자, 조언자) in `utils/personalityTypeUtils.ts`

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

## Path Aliases

`@/*` maps to `./src/*` (configured in both tsconfig.json and vite.config.ts)

## Environment Variables

Create a `.env` file with:
```
VITE_POCKETBASE_URL=http://127.0.0.1:8090
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
- localStorage key `workdna-test-state` persists test progress across sessions
- Custom useTest hook centralizes test state logic
- AuthContext for dashboard authentication

**i18n**:
- Locales in `src/locales/{ko,en}/translation.json`
- Browser language auto-detected, fallback to Korean
- i18n debug mode is ON (`debug: true` in `src/i18n.ts`)

**Analytics Integration**:
- Device/browser detection for user analytics
- Geographic location tracking (IP-based)  
- Session duration and traffic source attribution
- Comprehensive user journey tracking in user_responses table

**Performance Considerations**:
- Component-based architecture for code splitting potential
- Progressive image loading for personality type results
- Client-side personality calculation (no server dependency)
- Anonymous-first database design with PocketBase API rules (public create/read, no delete)

## Gotchas

- Vite config uses only `@tailwindcss/vite` plugin — `@vitejs/plugin-react` is a devDependency but NOT used in `vite.config.ts`
- `server.allowedHosts: true` in vite config allows all hosts during development
- 3-second artificial delay in `useTest.ts` `completeTest()` before showing results (UX anticipation effect)
- localStorage state is only saved after `userId` is set (post-consent), not during splash/consent phase