# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Note Plus is a monorepo project for an AI-powered knowledge base application. The codebase is organized with pnpm workspaces and Turborepo for build orchestration.

**Current Status**: Basic infrastructure is complete. No business logic implemented yet.

## Architecture

### Monorepo Structure

```
note-plus/
├── apps/
│   ├── web/          # Next.js 15 frontend (port 3000)
│   └── api/          # NestJS 10 backend (port 3001)
└── packages/
    ├── shared-types/ # Shared TypeScript types
    └── shared-utils/ # Shared utility functions
```

### Key Architectural Decisions

1. **Styling**: Uses **Tailwind CSS 3** (with **shadcn/ui** component library) as the styling solution. Tailwind configuration is in `apps/web/tailwind.config.ts`. Global styles in `apps/web/app/globals.css`.

2. **UI Components**: Uses **shadcn/ui** as the component library. Components are installed locally in `apps/web/components/ui/`. Add new components via `pnpm dlx shadcn@latest add <component-name>`.

3. **API Routes**: All NestJS endpoints are prefixed with `/api` (configured in `apps/api/src/main.ts`).

4. **CORS**: Enabled globally in the API for frontend-backend communication.

5. **Build Order**: Turborepo automatically handles build dependencies. Packages build before apps.

## Development Commands

### Installation & Setup

```bash
pnpm install  # Install all dependencies across workspaces
```

### Running Development Servers

```bash
# Start both frontend and backend
pnpm dev

# Start only frontend (Next.js on :3000)
pnpm dev:web

# Start only backend (NestJS on :3001)
pnpm dev:api
```

### Building

```bash
# Build all packages and apps
pnpm build

# Build specific workspace
pnpm --filter web build
pnpm --filter api build
```

### Working with Workspaces

```bash
# Run command in specific workspace
pnpm --filter <workspace-name> <command>

# Examples:
pnpm --filter web add lodash
pnpm --filter api add @nestjs/typeorm
```

### Cleaning

```bash
# Clean all build artifacts and node_modules
pnpm clean
```

## Important Implementation Notes

### Frontend (Next.js)

- **App Router**: Uses Next.js 15 App Router (not Pages Router)
- **Layouts**: Root layout is in `apps/web/app/layout.tsx`
- **Styling**:
  - **Primary**: Tailwind CSS with `globals.css` for base styles
  - **Components**: shadcn/ui components in `components/ui/`
- **Path Aliases**: `@/*` maps to project root (configured in `tsconfig.json`)
- **Adding UI Components**: Run `pnpm dlx shadcn@latest add <component-name>` to add new shadcn/ui components
- **Utility Functions**: `lib/utils.ts` contains `cn()` helper for className merging

### Backend (NestJS)

- **Port**: Default port is 3001 (configurable via `PORT` env var)
- **Global Prefix**: All routes automatically prefixed with `/api`
- **Health Check**: Available at `http://localhost:3001/api/health`
- **Module Structure**: Empty `src/modules/` directory ready for feature modules

### Shared Packages

Both `@note-plus/shared-types` and `@note-plus/shared-utils` are placeholder packages. They export empty objects and are ready for implementation.

## Turborepo Behavior

- **Build Task**: Depends on `^build` (builds dependencies first)
- **Dev Task**: Runs persistently without caching
- **Outputs**: Caches `.next/**` and `dist/**` directories
- **Environment**: Watches `**/.env` files as global dependencies

## Git Commit Convention

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) using commitlint + husky.

**Format**: `<type>: <subject>`

**Allowed types**: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`, `style`, `revert`

**Examples**:
```bash
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复 PDF 预览问题"
git commit -m "refactor: 优化数据库查询"
```

See `COMMIT_CONVENTION.md` for detailed guidelines.

## Testing & Verification

```bash
# Run verification script
./verify.sh  # Tests build, API health, and frontend rendering
```

## Port Allocation

- `3000`: Next.js frontend
- `3001`: NestJS API

## Future Implementation Areas

The following are **not yet implemented** but are planned:
- User authentication (JWT)
- Database integration (TypeORM + PostgreSQL)
- PDF document processing
- RAG (Retrieval-Augmented Generation) system
- Supabase integration
- WebSocket for real-time features
