# Neo Coin Brief

A modern cryptocurrency newsletter landing page built with React, TypeScript, and Supabase.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher) or [Bun](https://bun.sh/)
- A [Supabase](https://supabase.io/) account
- A [CoinGecko](https://www.coingecko.com/) API key (optional for price data)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

   To get these values:
   1. Go to your Supabase project dashboard
   2. Navigate to Settings > API
   3. Copy the Project URL and Project API keys (anon and service_role)
   
   Note: For security, never commit your actual keys to version control.

4. Run the development server:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. Open your browser to http://localhost:3000

## Supabase Authentication Setup

This project uses Supabase Authentication for managing newsletter subscriptions:

1. In your Supabase dashboard, go to Authentication > Settings
2. Make sure "Enable email signup" is turned on
3. Under "Email Templates", you can customize the confirmation email template if needed

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally
- `npm run dev:vercel` - Start Vercel development server on port 8080

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/              # shadcn/ui components
├── pages/               # Page components for routing
├── integrations/        # Third-party service integrations
│   └── supabase/        # Supabase client and auth utilities
├── hooks/               # Custom React hooks
└── lib/                 # Utility functions
```

## Features

- Real-time cryptocurrency price ticker
- Newsletter subscription with Supabase Authentication
- Responsive design with mobile support
- Dark/light mode toggle
- SEO optimized