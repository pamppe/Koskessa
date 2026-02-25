# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Koskessa is a map-based MVP for displaying fishing rapids (koski) locations in Finland. It has two parallel apps sharing the same data model:

- `web/` — React + TypeScript + Vite + Leaflet (OpenStreetMap)
- `mobile/` — React Native + Expo + React Native Maps
- `data/` — Shared JSON and GeoJSON data (also duplicated into `web/src/data/` and `mobile/src/data/`)

## Commands

### Web

```bash
cd web
npm install
npm run dev        # Start dev server
npm run build      # Type-check + build
npm run lint       # ESLint
npm run preview    # Preview production build
```

### Mobile

```bash
cd mobile
npm install
npx expo start             # Start Expo dev server
npx expo start --android   # Android emulator
npx expo start --ios       # iOS simulator
```

No test suite is configured in either app.

## Architecture

### Data Model

The `Spot` type is defined in `web/src/types/spot.ts` and used across both apps:

```typescript
type Spot = {
  id: string;
  name: string;
  municipality: string;
  teaser: string;
  priceFromEur?: number;
  lat: number;
  lng: number;
  imageUrl?: string;
};
```

Geographic boundaries are in `spot-areas.geojson` with a `spotId` property linking each polygon/linestring to a spot.

### Web App Routing

Three routes via React Router (`App.tsx`):
- `/` — `ListPage` (grid of spots)
- `/spot/:id` — `DetailPage`
- `/spot/:id/map` — `MapPage` (Leaflet + GeoJSON overlay, auto-fit bounds)

Leaflet requires explicit icon configuration — see existing `MapPage.tsx` for the fix pattern.

### Mobile Navigation

Three screens via React Navigation native-stack (`src/navigation/AppNavigator.tsx`):
- `ListScreen` → `DetailScreen` → `MapScreen`

### Shared Data

Data files live in `data/` at the repo root and are also copied into each app's source tree. When updating spot data or GeoJSON, update all copies.

## TypeScript

- **Web**: strict mode, ES2022 target, `moduleResolution: bundler`, `noUnusedLocals`/`noUnusedParameters` enforced
- **Mobile**: strict mode, extends Expo preset (`tsconfig.base.json`), ES5 target
