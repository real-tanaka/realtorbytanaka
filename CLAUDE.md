# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — `next lint` (ESLint, `next/core-web-vitals`)

There is no test suite or test runner configured.

## Stack

Next.js 12 (Pages Router) + React 17 + Chakra UI v1 (Emotion, framer-motion). Plain JS/JSX, no TypeScript. Old pinned versions — don't use Next 13+/React 18 APIs (no `app/` dir, no Server Components, `<Link>` needs an `<a>` child).

## Architecture

A property listing site (Dubai real estate) that is a thin UI over the Bayut RapidAPI (`https://bayut.p.rapidapi.com`). There is no database or own backend; `pages/api/hello.js` is just the create-next-app stub.

- **Data fetching**: every page fetches server-side (`getServerSideProps` / `getStaticProps`) through `utils/fetchApi.js` (`fetchApi(url)` + `baseUrl`), which attaches the RapidAPI headers. API responses are consumed as `data.hits` (list) or the raw object (details).
- **Search flow**: `components/SearchFilters.jsx` renders dropdowns from the `filterData` config in `utils/filterData.js` and pushes selections into the URL query via the router. `pages/search.js` reads those query params in `getServerSideProps`, applies defaults, and builds the `/properties/list` URL. To add a filter, add an entry to `filterData` (its `queryName` is the URL param) and map it to the API param in `pages/search.js` (note the API names differ: `minPrice`→`priceMin`, `maxPrice`→`priceMax`).
- **Pages**: `pages/index.js` (banners + featured properties), `pages/search.js`, `pages/property/[id].js` (details, uses `ImageScrollbar`). `pages/_app.js` wraps everything in `ChakraProvider` + `components/Layout` (Navbar/Footer) and wires NProgress to router events.
- **Images**: `next/image` remote images are restricted to the `bayut-production.s3.eu-central-1.amazonaws.com` domain in `next.config.js`; add new hosts there.

## Gotchas

- The RapidAPI key is hardcoded in `utils/fetchApi.js` (committed to the repo). If touching this, move it to an environment variable (e.g. `.env.local` read via `process.env`) rather than adding more secrets in source.
