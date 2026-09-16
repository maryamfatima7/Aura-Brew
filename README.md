# AURA BREW

AURA BREW is a fictional premium coffee brand experience built as a portfolio-quality React application. It combines an editorial ecommerce interface with an interactive Three.js coffee scene and a fully client-side demo purchasing flow.

## Features

- Cinematic responsive homepage with React Three Fiber coffee scenes
- Product menu with category filters, search, favorites, and detail pages
- Size-aware cart with quantity controls, tax, totals, and persistence
- Demo authentication with login, signup, redirect-aware protected routes, and logout
- Checkout with pickup/delivery validation and safe demo payment UI
- Local order creation, success state, expandable order history, and account dashboard
- Story and contact pages with demo forms
- Animated mobile navigation, toast feedback, reveal motion, and custom 404 page
- Vercel SPA rewrite configuration for direct route refreshes

## Technology

- React 19 and Vite
- JavaScript only
- React Router
- Tailwind CSS via `@tailwindcss/vite`
- Three.js, React Three Fiber, and React Three Drei
- Framer Motion
- Lucide React

## Demo architecture

Authentication, favorites, cart data, and orders use browser `localStorage`. This is intentionally a frontend demo mechanism, not secure production authentication. No backend, external API, or real payment processor is required.

The checkout never collects or stores real card numbers. The Card option only displays safe demo copy and a non-sensitive example ending in `4242`.

## Local development

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, typically `http://localhost:5173/`.

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/` and is ignored by Git.

## Deploy to Vercel

Import this repository into Vercel. Use the default Vite settings:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

`vercel.json` rewrites unknown server requests to `index.html`, allowing React Router routes such as `/menu`, `/product/velvet-latte`, `/checkout`, and `/orders` to load on direct refresh.

## Fictional brand details

AURA BREW is fictional. Brand location: Karachi, Pakistan. Contact details, opening hours, and social links are demonstration content only.
