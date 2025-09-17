# Neo Coin Brief

A modern cryptocurrency newsletter landing page built with React, TypeScript, Vite, and Supabase. This application features real-time cryptocurrency price tracking, newsletter subscription functionality, and a responsive design with dark/light mode support.

![Project Screenshot](public/preview.png)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Technology Stack](#technology-stack)
- [Components](#components)
- [API Endpoints](#api-endpoints)
- [Supabase Integration](#supabase-integration)
- [Styling](#styling)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- 📈 Real-time cryptocurrency price ticker with live data from CoinGecko
- 📧 Newsletter subscription with Supabase authentication
- 🌗 Dark/light mode toggle with system preference detection
- 📱 Fully responsive design for all device sizes
- ⚡ Fast performance with Vite and React
- 🎨 Modern UI with glass morphism effects and gradients
- 📚 SEO optimized with proper meta tags
- 🛡️ Form validation and error handling
- 📦 Component-based architecture with shadcn/ui

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher) or [Bun](https://bun.sh/)
- A [Supabase](https://supabase.io/) account
- A [CoinGecko](https://www.coingecko.com/) API key (optional for price data)

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/neo-coin-brief.git
   ```

2. Navigate to the project directory:
   ```bash
   cd neo-coin-brief
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

To get these values:

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the Project URL and Project API keys (anon and service_role)

**Note**: For security, never commit your actual keys to version control.

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
bun run dev
```

Open your browser to http://localhost:3000

## Project Structure

```
neo-coin-brief/
├── api/                    # Serverless API functions
├── src/
│   ├── components/         # Reusable UI components
│   │   └── ui/             # shadcn/ui components
│   ├── pages/              # Page components for routing
│   ├── integrations/       # Third-party service integrations
│   │   └── supabase/       # Supabase client and auth utilities
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and design tokens
├── public/                 # Static assets
├── .env.local              # Environment variables (not committed)
└── package.json            # Project dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally
- `npm run dev:vercel` - Start Vercel development server on port 8080

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **UI Components**: Radix UI primitives with shadcn/ui implementation
- **Backend**: Serverless functions (Node.js)
- **Database**: Supabase
- **APIs**: CoinGecko for cryptocurrency prices
- **Deployment**: Vercel

## Components

### Core Components

- `CryptoTicker` - Real-time cryptocurrency price display with scrolling marquee
- `HeroSection` - Main landing page section with newsletter subscription form
- `HowItWorks` - Process explanation section
- `Features` - Feature overview with icons
- `SocialProof` - Testimonials and user statistics
- `Faq` - Frequently asked questions accordion
- `Footer` - Site footer with navigation links
- `CryptoPopup` - Promotional popup for crypto offers

### UI Components

The project uses shadcn/ui components which are built on top of Radix UI primitives:
- Button
- Input
- Toast
- Tooltip
- Accordion
- And more...

## API Endpoints

### `/api/crypto-prices`

Fetches real-time cryptocurrency prices from CoinGecko API with 45-second caching.

**Method**: GET
**Response**:
```json
[
  {
    "symbol": "BTC/USD",
    "price": "43250.21",
    "priceChangePercent": "2.34"
  }
]
```

### `/api/save-email-to-supabase`

Handles newsletter subscription by saving email to Supabase authentication.

**Method**: POST
**Request Body**:
```json
{
  "email": "user@example.com"
}
```

## Supabase Integration

This project uses Supabase for authentication and user management:

1. **Authentication Setup**:
   - In your Supabase dashboard, go to Authentication > Settings
   - Make sure "Enable email signup" is turned on
   - Under "Email Templates", you can customize the confirmation email template if needed

2. **User Management**:
   - Users are created with email-only signup (no password required)
   - User metadata tracks subscription status
   - Service role key is used for server-side operations

## Styling

The project uses Tailwind CSS with a custom design system:

### Design Tokens

- **Fonts**: Montserrat (headings) and Inter (body text)
- **Colors**: Custom crypto-themed color palette
  - Bitcoin Orange: `#F7931A`
  - Ethereum Blue: `#627EEA`
  - Crypto Gold: `#FFC300`
  - Positive/Negative indicators for price changes
- **Gradients**: Custom gradients for hero sections and text
- **Glass Morphism**: Backdrop blur effects for modern UI

### Responsive Design

- Mobile-first approach
- Responsive breakpoints for all device sizes
- Flexible grid layouts using CSS Grid and Flexbox

## Deployment

This application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Deploy!

The `vercel.json` file handles routing with a fallback to `index.html` for client-side routing.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.