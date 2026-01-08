# Copilot instructions — cellphones-store-fe ✅

Purpose: Short, actionable guidance to help an AI coding agent become productive quickly in this repository.

## Quick start 🔧
- Run dev server: `yarn dev` (or `npm run dev`). Dev script uses `next dev --turbopack` (remove `--turbopack` if you see Turbopack issues).
- Build / start: `yarn build` / `yarn start` (Next.js v15).
- Required env: create `.env.local` with `NEXT_PUBLIC_API_URL` (example: `NEXT_PUBLIC_API_URL=http://localhost:8000`). See `src/store/README.md`.
- Lint: `yarn lint`.

## Big picture 🏗️
- Framework: Next.js (App Router, `src/app`) + TypeScript + TailwindCSS + shadcn UI components (`src/components/ui/*`).
- Routing: uses Next App Router with route groups (e.g., `(main)`, `(admin)`, `(infomation)` under `src/app`). Layouts are nested via `layout.tsx` files.
- State & API: Redux Toolkit + RTK Query. Base API config is in `src/store/baseApi.ts`. Feature slices are under `src/store/features` (e.g., `authApi.ts`, `productApi.ts`, `cartApi.ts`).
- Providers: global providers are wrapped in `src/providers/ReduxProvider.tsx` and applied in `src/app/layout.tsx`.
- Imports: path alias `@/*` → `src/*` (see `tsconfig.json`).

## Important patterns & examples 🧭
- Base API (auth header & base URL): `src/store/baseApi.ts` uses `process.env.NEXT_PUBLIC_API_URL` and attaches `Authorization` header from `localStorage` keys (`access_token` or `token`) while gracefully ignoring localStorage during SSR.
  - Example: tokens stored under `access_token` and `refresh_token` (see `src/components/auth/LoginForm.tsx`).
  - Logout flow removes tokens and resets RTK Query cache via `baseApi.util.resetApiState()` (see `authApi.ts`).

- RTK Query usage:
  - Hooks exported from feature slices: `useGetProductsQuery`, `useLoginMutation`, etc. (See `src/store/README.md` and `src/store/features/*.ts`.)
  - **Client-only** hooks: call RTK Query hooks from components with `'use client'` top-line directive; do not attempt to use them inside server components.

- UI conventions:
  - Use shadcn-style primitives in `src/components/ui/*` for consistent look/behavior (Buttons, Inputs, Dialogs, etc.).
  - Tailwind classes are used per-component for responsive styles.

- Route & folder conventions:
  - Route groups exist as directories named in parentheses (e.g., `(admin)`), keep admin-only pages under `(admin)`.
  - Product detail routes use dynamic segments: `src/app/(main)/products/[slug]/page.tsx`.

## Integrations & externals 🔌
- API base URL: `NEXT_PUBLIC_API_URL` (frontend-only env var; used by RTK Query baseApi).
- Images: `next.config.js` allows remote images via wildcard `remotePatterns`.
- No test runner configured (no `test` script in `package.json`) — expect manual/local verification.

## Common gotchas / code smells ⚠️
- Watch for SSR vs client: any code accessing `localStorage` or `window` must be in client components; the project uses `try` guards in `baseApi` but prefer to keep client-only code in `'use client'` files.
- Response shape inconsistency: some components expect `result.data.access_token` while the typed API slice returns `access_token` at top-level — validate API responses before changing consumers.
- Keep TypeScript strictness: `tsconfig.json` has `strict: true`; small type changes can cascade.

## How to add a new API feature (short checklist) ✅
1. Create `src/store/features/<feature>Api.ts`.
2. `import { baseApi }` and call `baseApi.injectEndpoints({ endpoints: (build) => ({ ... }) })`.
3. Export hooks (e.g., `useGetXQuery`, `useCreateXMutation`) and add tag types if needed.
4. Use hooks in **client** components (`'use client'`) and update documentation in `src/store/README.md` if necessary.

## Useful files to reference 📂
- `src/store/baseApi.ts` — base API config (auth header & base URL)
- `src/store/README.md` — store usage examples
- `src/store/features/*.ts` — example feature API slices (auth/product/cart)
- `src/providers/ReduxProvider.tsx` and `src/app/layout.tsx` — provider wiring
- `src/components/ui/*` — shared UI primitives
- `next.config.js` and `package.json` — dev/start/build scripts

---
If anything here is unclear or you want more detail about any area (auth flows, admin routes, API shapes), tell me which part you'd like expanded and I’ll iterate. 🔁