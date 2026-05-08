# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This repo has two independent projects:

- **Root** — Node.js ESM project (`src/skills/`) with Jest tests and ESLint. Skills practice code lives here.
- **`app/`** — React + TypeScript SPA (Vehicle Management System). Has its own `package.json`, ESLint config, and toolchain. The root ESLint config explicitly ignores `app/`.

## Commands

### Root project
```bash
npm run lint          # ESLint (flat config, ESLint 9+)
npm run lint:fix      # Auto-fix lint issues
npm test              # Jest (ESM mode via --experimental-vm-modules)
npm run test:watch    # Jest watch mode
```

### App (`cd app/` first)
```bash
npm run dev           # Vite dev server at http://localhost:5173
npm run build         # TypeScript check + Vite build → dist/
npm run lint          # ESLint for app/src
```

### Single test (root)
```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js src/skills/__tests__/echo.test.js
```

## Pre-commit Hook

Husky runs `npm run lint` and `npm test` **in parallel** and blocks the commit if either fails. The hook is a POSIX shell script at `.husky/pre-commit` — it uses `mktemp` for buffered output. On Windows, Jest must be invoked via `node_modules/jest/bin/jest.js`, not `node_modules/.bin/jest` (which is a CMD wrapper).

## App Architecture

### Key decisions
- **Tailwind CSS v4**: No `tailwind.config.js`. Configured as a Vite plugin (`@tailwindcss/vite`). CSS uses `@import "tailwindcss"` with CSS custom properties for tokens. Running `npx tailwindcss init` will fail — don't do it.
- **MSW v2**: All API calls are mocked in the browser via a service worker at `app/public/mockServiceWorker.js`. The worker is started in `main.tsx` before React mounts. Handlers live in `src/mocks/handlers/`.
- **Auth**: `AuthContext` + `localStorage`. Role is either `"admin"` or `"user"`. `ProtectedRoute` guards all non-login routes; `AdminRoute` further restricts to admin role.
- **React Query**: All server state goes through TanStack Query. Mutations call `invalidateQueries` on success to refresh lists.
- **Path alias**: `@` maps to `app/src/` in both Vite and TypeScript.

### Data flow
Login → `POST /api/auth/login` (MSW) → token + role stored in `localStorage` → `AuthContext` reads on mount → role-based routing via `ProtectedRoute` / `AdminRoute`.

## OpenSpec Change Management

Changes follow the **spec-driven** schema: `proposal.md` → `design.md` → `specs/` → `tasks.md`.

```bash
openspec new change "<name>"                         # scaffold a new change
openspec status --change "<name>" --json             # check artifact status
openspec instructions <artifact-id> --change "<name>" --json  # get writing instructions
openspec archive "<name>" --yes                      # archive after all tasks done
```

Archived changes are in `openspec/changes/archive/`. Active specs are in `openspec/specs/`.

## Skills

Skills are defined in `.agents/skills/` and symlinked into `.claude/skills/`, `.cursor/skills/`, etc. Type `/` in Claude Code to see available skills. Key ones:

- `/git-smart-commit` — splits staged changes into conventional commits
- `/git-pr-description` — generates PR title + body
- `/gen-test-cases` — generates test cases from code
- `/git-branch-name` — suggests a kebab-case branch name
- `/opsx-propose` — create a new OpenSpec change with all artifacts
- `/opsx-apply` — implement pending tasks from an OpenSpec change
