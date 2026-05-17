# FixPro Mobile

React Native mobile app built with **Expo SDK 54** (managed workflow) targeting iOS and Android.

## Prerequisites

- **Node.js** ≥ 18
- **npm** (or pnpm/yarn)
- **iOS Simulator** (macOS only) — Xcode ≥ 15
- **Android Emulator** — Android Studio with a virtual device running API 34+

## Setup

```bash
# From the monorepo root
cd mobile

# Install dependencies
npm install

# Copy environment config
cp .env.example .env
# Edit .env and set EXPO_PUBLIC_API_URL to your backend URL
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `EXPO_PUBLIC_API_URL` | `http://localhost:3000` | Base URL of the Next.js backend (Better Auth + REST endpoints) |

The value is also available through `app.json` → `extra.API_URL` as a fallback at build time.

## Development

```bash
# Start the Expo dev server
npm start

# Run on iOS Simulator (macOS only)
npm run ios

# Run on Android Emulator
npm run android

# Run in web browser
npm run web
```

## Project Structure

```
mobile/
├── src/
│   ├── app/                # Expo Router file-based routes
│   │   ├── _layout.tsx     # Root layout (AuthProvider wrapper)
│   │   ├── index.tsx       # Entry redirect (auth gate)
│   │   ├── (auth)/         # Unauthenticated group
│   │   │   ├── _layout.tsx
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   └── (tabs)/         # Authenticated tab navigator
│   │       ├── _layout.tsx
│   │       └── index.tsx   # Home screen
│   ├── api/                # Shared API layer
│   │   ├── client.ts       # HTTP client with auth token injection
│   │   ├── auth-client.ts  # Better Auth client instance
│   │   └── index.ts        # Re-exports
│   ├── constants/
│   │   └── env.ts          # Environment config (API_URL etc.)
│   └── lib/
│       └── auth-context.tsx # React context for session state
├── app.json                # Expo config
├── babel.config.js         # Babel with module-resolver (@/ → src/)
├── tsconfig.json           # TypeScript (strict, path aliases)
├── eslint.config.mjs       # ESLint (expo preset, no-explicit-any off)
├── .prettierrc             # Prettier (2-space tabs, matching web app)
├── .env.example            # Environment variable template
└── README.md
```

## API Client

The `src/api/client.ts` module provides a typed HTTP client that:

- Prepends `EXPO_PUBLIC_API_URL` to all requests
- Sends cookies via `credentials: "include"` for Better Auth session management
- Sets `Content-Type: application/json` by default
- Throws `ApiError` on non-2xx responses with parsed error bodies

Usage:

```typescript
import { apiGet, apiPost } from "@/api";

// GET request
const data = await apiGet("/api/admin/users");

// POST request
const result = await apiPost("/api/estimate/upload", { fileUrl: "..." });
```

## Authentication

Authentication uses **Better Auth** (`better-auth/client`), the same library powering the web app. The client is configured in `src/api/auth-client.ts` and points at the shared backend.

The `AuthProvider` in `src/lib/auth-context.tsx` provides a React context with:

- `session` — current Better Auth session or `null`
- `isPending` — `true` while restoring session on app launch
- `error` — any error that occurred during session fetch

## Out of Scope

The following are intentionally **not** included in this scaffold:

- UI component library (shadcn/rn, Tamagui, etc.)
- Screen implementations beyond login/register/home
- Store builds (EAS Build / Submit)
- Push notifications
- Offline storage / cache layer