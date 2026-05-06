# Finance visualization dashboard

## Description

Personal portfolio project: a Vue 3 + Vite finance-style dashboard backed by a mock REST API. It pairs a large editable data grid with charts that summarize the same dataset (transaction distribution, geography, cities, gender).

## Problem statement

Finance and operations dashboards usually need two things at once: a data-heavy table that stays usable with thousands of rows, and charts that remain consistent with that table’s source of truth. This app exercises that combination—client-side grid behavior, derived aggregates for charts, and patch/delete flows against a local API.

## Implemented features

- **Data table (ag-grid)**: sorting, filtering, pagination, pinned totals row, editable numeric cells, row delete action with confirmation.
- **Charts (amCharts 5)**: pie, map, bar/column, and donut views driven from store data.
- **Routing (Vue Router)**: table route, charts gallery, not-found route.
- **API layer (axios)**: load, patch, and delete customers against `json-server` and [`db.json`](db.json).
- **Utilities**: currency/date formatters; phone masking with Maska.
- **State (Pinia)**: single `consumers` store with actions and derived getters for chart series.

## Setup

### Prerequisites

- Node.js 20+
- Yarn

### Install

```bash
yarn install
```

### Environment

```bash
cp .env.example .env
```

[`src/api/consumers.ts`](src/api/consumers.ts) reads `import.meta.env.VITE_API_URL` as the axios base URL (see [`.env.example`](.env.example)).

### Run

Terminal 1 — mock API (port `3000` by default):

```bash
yarn dev:api
```

Terminal 2 — Vite dev server:

```bash
yarn dev
```

Open the URL printed by Vite (often `http://localhost:5173`).

### Production build

```bash
yarn typecheck
yarn build
yarn preview
```

### Quality scripts

```bash
yarn lint
yarn lint:fix
yarn typecheck
yarn format:check
yarn format
```

## Roadmap

✓ **Vuex → Pinia**

1. Audit and upgrade dependencies to current stable compatible versions.
2. Adopt **TypeScript** (`vue-tsc`, typed API and grid models).
3. Extract table, analytics, and chart lifecycle into **composables**.
4. Add **Vitest** + **Vue Testing Library**; wire CI.
5. Performance work on the large grid and chart updates (measure first).
6. Accessibility pass: dialogs, focus, loading/error UX, chart alternatives.
7. **Storybook** for shared components and critical UI states.
8. **GitHub Actions**: lint, typecheck, test, build.
