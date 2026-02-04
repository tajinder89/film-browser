# Film Browser - Full Stack Movie Application

A movie browser application built with React 19, Vite, Express, and TMDB API. Features server-side rendering, theme-based styling, comprehensive test suite, and client-side API integration.

## Features

- Browse Movies - Top Rated, Upcoming, and Now Playing categories
- Movie Details - Full information with cast, crew, and genres
- Wishlist Management - Add/remove favorites with localStorage persistence


## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- TMDB API Token (free at https://www.themoviedb.org/settings/api)

Verify versions:
```bash
node --version
npm --version
```

## Installation

1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd film-browser
npm install              # Install all dependencies including dev tools
```

**For Production Deployment:**
```bash
npm install --production    # Install only runtime dependencies (recommended for production)
```

Note: Use `npm install` for development (includes Vitest, Vite, TypeScript, etc.). Use `npm install --production` when deploying to production servers to reduce bundle size and install time.

2. Setup Environment Variables
```bash
# Copy template
cp .env.example .env

# Edit .env and add your TMDB Bearer Token
VITE_TMDB_AUTH_TOKEN=your_token_here
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

3. Get TMDB API Token
- Visit https://www.themoviedb.org/settings/api
- Generate API key or copy Bearer Token (v4 auth)
- Paste token into .env file

## Running the Application

Development:
```bash
npm run dev
```
Runs on http://localhost:5173 with SSR + HMR enabled

Production Build:
```bash
npm run build   # Builds optimized bundles (runs during a full npm install, as it requires Vite, which is a dev dependency)
npm run start   # Starts the production server on port 5173 (runs after a production npm install)
```


## API Configuration

**SECURITY WARNING**

❗ **The application exposes the TMDB API token to the client-side for direct API calls.**  
❗ This is **NOT intended in the app** but is done as part of the assignment. ( usually a logged in user will have access to token )

Environment Variables:

| Variable | Required | Purpose |
|----------|----------|---------|
| VITE_TMDB_AUTH_TOKEN | Yes | Bearer token for API authentication |
| VITE_TMDB_API_BASE_URL | No | TMDB API endpoint |
| VITE_TMDB_IMAGE_BASE_URL | No | Image CDN URL |
| VITE_IMAGE_SIZE_POSTER | No | Movie poster size |
| VITE_QUERY_STALE_TIME | No | Cache duration (ms) |
| VITE_QUERY_GC_TIME | No | Garbage collection (ms) |
| PORT | No | Server port |

## Testing

Run Tests:
```bash
npm run test              # Watch mode
npm run test:run          # Run once
npm run test:ui           # Visual dashboard
npm run test:coverage     # Coverage report
```

## Theme System

Color scheme changes based on movie source:

| Category | Color | Theme |
|----------|-------|-------|
| Top Rated | Blue (#1e40af) | Classic |
| Upcoming | Orange (#ea580c) | Vibrant |
| Now Playing | Green (#059669) | Fresh |

Theme applies to:
- Movie title color
- Favorite button background
- Genre tag colors

## Build Output

```
dist/
├── client/              # Client bundle
│   ├── assets/
│   └── index.html
├── server/              # SSR server bundle
│   └── entry-server.js
└── server.js            # Standalone production server
```