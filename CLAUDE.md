# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with HMR (Vite)
npm run build      # Type-check then build for production (tsc -b && vite build)
npm run lint       # Run ESLint across all TS/TSX files
npm run preview    # Serve the production build locally
```

No test runner is configured yet.

## Stack

- **React 19** + **TypeScript** (~5.9)
- **Vite 7** with `@vitejs/plugin-react-swc` (SWC for Fast Refresh — note: React Compiler is not compatible with SWC)
- **ESLint 9** flat config with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`

## Architecture

Currently at the default Vite scaffold stage. The entry point is `src/main.tsx` → `src/App.tsx`. All portfolio content and components will be built out under `src/`.

## Notes

- The project uses ESM (`"type": "module"` in package.json).
- Two `tsconfig` files: `tsconfig.app.json` (browser code) and `tsconfig.node.json` (Vite config). Both are referenced from the root `tsconfig.json`.
- To enable stricter type-aware lint rules, update `eslint.config.js` to use `tseslint.configs.recommendedTypeChecked` with `parserOptions.project` pointing to both tsconfig files.
