# Project Context: Neo Coin Brief

## Project Overview

This is a React-based cryptocurrency newsletter landing page built with Vite, TypeScript, and Tailwind CSS. The project uses shadcn/ui components and follows a modern crypto-themed design with gradients, glass morphism effects, and a dark/light mode toggle.

The application is structured as a single-page application with multiple routes for different content pages (About, Privacy Policy, Terms & Conditions, etc.) and integrates with Supabase for data storage and CoinGecko API for cryptocurrency price data.

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **UI Components**: Radix UI primitives with shadcn/ui implementation
- **Backend**: Express.js server with serverless functions
- **Database**: Supabase
- **APIs**: CoinGecko for cryptocurrency prices
- **Deployment**: Vercel

## Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ui/              # shadcn/ui components
│   ├── pages/               # Page components for routing
│   ├── integrations/        # Third-party service integrations
│   │   └── supabase/        # Supabase client and types
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions
├── api/                     # Serverless functions
├── server/                  # Express server
├── supabase/                # Supabase configuration
└── public/                  # Static assets
```

## Key Features

1. **Crypto Price Ticker**: Real-time cryptocurrency price display with scrolling marquee
2. **Newsletter Subscription**: Email capture form with Supabase integration
3. **Responsive Design**: Mobile-first approach with responsive breakpoints
4. **Dark/Light Mode**: Theme switching with next-themes
5. **Modern UI**: Glass morphism effects, gradients, and animations
6. **SEO Optimized**: Proper meta tags and semantic HTML

## Development Environment

### Prerequisites

- Node.js 18+ or Bun
- Package manager (npm, yarn, or bun)

### Environment Variables

Create a `.env.local` file with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally
- `npm run dev:vercel` - Start Vercel development server on port 8080

### Development Conventions

1. **Component Structure**: 
   - Components are built using shadcn/ui patterns
   - Custom components follow the atomic design pattern
   - Components use Tailwind CSS for styling with custom design tokens

2. **Routing**:
   - All routes are defined in `src/App.tsx`
   - Pages are located in `src/pages/`
   - Components are in `src/components/`

3. **Styling**:
   - Uses Tailwind CSS with custom color palette defined in `src/index.css`
   - Implements a comprehensive design system with crypto-themed colors
   - Responsive design with mobile-first approach

4. **Data Management**:
   - React Query for server state management
   - Supabase for database operations
   - Axios for API requests

5. **Type Safety**:
   - TypeScript for static type checking
   - Strict mode disabled for flexibility
   - Automatic type generation for Supabase

## Deployment

The application is configured for deployment on Vercel with serverless functions. The `vercel.json` file handles routing with a fallback to `index.html` for client-side routing.

## API Integration

The project integrates with the CoinGecko API to fetch cryptocurrency prices:
- Serverless function at `/api/crypto-prices` 
- Client-side caching with 45-second expiration
- Retry mechanism for failed requests

## Supabase Integration

Email subscriptions are stored in Supabase:
- Database client configured in `src/integrations/supabase/client.ts`
- Types automatically generated in `src/integrations/supabase/types.ts`

## Customization

The project uses a custom color palette defined in `tailwind.config.ts` with crypto-themed colors:
- Bitcoin Orange
- Ethereum Blue
- Crypto Gold
- Positive/Negative indicators for price changes

## Performance Considerations

- Code splitting through dynamic imports
- Image optimization (when implemented)
- Client-side caching for API responses
- Lazy loading for non-critical components