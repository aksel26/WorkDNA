# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WorkDNA is a React-based web application that provides personality assessment tests for workplace environments. Users complete a 12-question survey to determine their work personality type from 8 different categories.

## Technology Stack

- **Frontend**: React 18 with TypeScript, Vite build tool
- **Styling**: Tailwind CSS v4 with custom design system
- **Backend**: Supabase (PostgreSQL database + Edge Functions)
- **Icons**: Lucide React
- **Deployment**: Designed for Vercel (frontend) + Supabase (backend)

## Architecture

### Core Components
- `App.tsx`: Main application component with routing logic
- `ConsentModal.tsx`: Privacy consent form with personal information collection
- `TestQuestion.tsx`: Individual question display with answer selection
- `TestResult.tsx`: Results display with personality type and scoring

### Data Layer
- `src/data/questions.ts`: Contains all 12 test questions with scoring logic
- `src/data/personalityTypes.ts`: Defines 8 personality types and calculation algorithm
- `src/lib/supabase.ts`: Supabase client configuration and database types

### Database Schema
- `users`: Personal information and consent tracking
- `answers`: Individual question responses
- `results`: Calculated personality types and scores
- `stats`: Daily/weekly aggregated statistics

## Key Features

1. **Privacy-First Design**: Consent modal before any data collection
2. **Progressive Test Flow**: 12 questions with progress tracking
3. **Real-time Scoring**: Personality type calculation upon completion
4. **Responsive Design**: Mobile-first approach (360px+ support)
5. **Social Sharing**: Native sharing API with clipboard fallback

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run tsc

# Linting
npm run lint
```

## Environment Variables

Create a `.env` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

1. Create a new Supabase project
2. Run the migration file: `supabase/migrations/001_initial_schema.sql`
3. Enable Row Level Security (RLS) policies are included
4. Configure anonymous access for the assessment flow

## Scoring Algorithm

The personality type calculation uses trait scoring from question responses:
- Each answer option has weighted traits
- Traits are aggregated across all questions
- 8 personality types are calculated based on dominant trait combinations
- Results include both the primary type and comparative scores

## UI/UX Patterns

- **Mobile-First**: All components designed for 360px+ screens
- **Animation**: 0.3s transitions for interactions
- **Color System**: Primary blue palette with semantic colors
- **Form Validation**: Client-side validation with error feedback
- **Loading States**: Proper loading indicators throughout the flow

## Testing Strategy

- Manual testing for user flows
- TypeScript for compile-time safety
- ESLint for code quality
- Test question accuracy and personality type calculations

## Common Tasks

- Add new questions: Update `src/data/questions.ts`
- Modify personality types: Update `src/data/personalityTypes.ts`
- Database changes: Create new migration files
- UI updates: Follow existing Tailwind patterns
- Add new features: Follow component-based architecture