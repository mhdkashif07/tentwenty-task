# TenTwenty — Timesheet Assessment (Checklist & Implementation Plan)

This file contains a step-by-step checklist and implementation plan that matches the assessment requirements, design notes, and coding standards you provided.

---

## Quick Start (developer)

1. Install dependencies:

```bash
npm install
# or
pnpm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open http://localhost:3000

---

## Implementation Checklist (complete this list while working)

- [ ] 1. Tailwind setup
  - [ ] Create `tailwind.config.js` with `app/`, `components/`, `pages/` content paths.
  - [ ] Replace `@import "tailwindcss";` in `app/globals.css` with `@tailwind base; @tailwind components; @tailwind utilities;` and add CSS variables for theme colors.
  - [ ] Update `postcss.config.mjs` to use `tailwindcss` and `autoprefixer`.

- [ ] 2. Authentication
  - [ ] Install and configure `next-auth` (Credentials provider) or confirm custom session approach.
  - [ ] Add route: `app/api/auth/[...nextauth]/route.ts`.
  - [ ] Wrap `app/layout.tsx` with `SessionProvider` and add redirects for protected pages.

- [ ] 3. Internal APIs & services (in-app/mock data)
  - [ ] Create `app/api/timesheets/route.ts` implementing GET/POST/PUT/DELETE using an in-memory store.
  - [ ] Add `services/TimesheetService.ts` for business logic and `types/Timesheet.ts` for types.
  - [ ] (Optional) `app/api/users/route.ts` for mock user data.

- [ ] 4. UI (app-dir pages & components)
  - [ ] Add `app/login/page.tsx` (login form matching the design).
  - [ ] Add `app/dashboard/page.tsx` (protected route showing timesheet list).
  - [ ] Create components in `components/` (TitleCase folders with `index.tsx`):
    - `TimesheetTable` — table with columns: Week #, Date, Status, Actions.
    - `TimesheetModal` — Add/Edit modal with validation.
    - `IconButton` — small reusable button component.

- [ ] 5. Hooks & data layer
  - [ ] `hooks/useAuth.ts` — session helpers and redirects.
  - [ ] `hooks/useTimesheets.ts` — fetch & mutate timesheets using client-side `fetch` to `app/api` routes.

- [ ] 6. Validation & UX
  - [ ] Client and server validation for the modal form.
  - [ ] Loading and error states.
  - [ ] Responsive layout (mobile-first, Tailwind utilities).

- [ ] 7. Tests
  - [ ] Add `vitest` + `@testing-library/react` and 3 basic tests:
    - Login flow (renders form and triggers sign-in).
    - Modal open/submit creates new timesheet.
    - Dashboard renders a list of timesheets.

- [ ] 8. Docs & final notes
  - [ ] Update `README.md` with final run instructions, assumptions, and time spent.
  - [ ] Provide notes on how to swap in persistence (JSON/SQLite) if desired.

---

## File/Folder Layout (recommended)

- `app/`
  - `layout.tsx` — root layout, add `SessionProvider` here.
  - `login/page.tsx` — login page.
  - `dashboard/page.tsx` — main dashboard.
  - `api/` — internal API routes (`auth/`, `timesheets/`).
- `components/` (TitleCase folders; `index.tsx` entry)
- `services/` — business logic and API wrappers.
- `hooks/` — custom hooks for auth and timesheets.
- `types/` — TypeScript types (e.g., `Timesheet.ts`).

Follow the coding standards provided: TitleCase for folders/files, camelCase for variables/functions, SCREAMING_SNAKE_CASE for constants. Keep components <= 150 lines and separate logic into `services`/`hooks`.

---

## Theme / Tailwind Colors (use these variables)

Use Tailwind custom colors and CSS variables as the single source of truth. The brand colors for the design (login screen) are:

- `--panel-hero`: #1C64F2 (right-panel background)
- `--primary`: #1A56DB (login button / CTA)
- `--background`: #FFFFFF
- `--foreground`: #0F172A
- `--muted`: #94A3B8
- `--accent`: #60A5FA
- `--success`: #16A34A
- `--danger`: #DC2626
- `--border`: #E5E7EB

Map `primary` -> `#1A56DB` and `brand`/`panel` -> `#1C64F2` in `tailwind.config.js`.

---

## Helpful Commands

Install deps:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

Typecheck:

```bash
npm run build
```

---

## Assumptions & Notes

- This implementation keeps data in-memory (per assessment request). When restarting the server, data will reset.
- Authentication will use `next-auth` Credentials provider by default (dummy validation). We can switch to a custom session if you prefer.
- Tests are small smoke-tests (Vitest + Testing Library) to demonstrate component and flow coverage.
- The project uses the `app` directory (Next.js app router). All API routes should be created under `app/api`.

---

## Time tracking

- Estimated time: 6–10 hours (core features + basic tests)
- Actual time: _TBD_

---

If you want me to apply these changes now I can: add Tailwind config, update `app/globals.css`, add NextAuth scaffolding, create the initial API routes, and scaffold pages/components. Reply with `Apply changes` and I will implement the next batch of files.

---

Contact / questions: add notes here if you want any deviation from the checklist (custom session, JSON persistence, additional UI polish).
