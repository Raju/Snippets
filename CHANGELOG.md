# Change Log

## [2.0.1] - 2026-01-19
- **React Core & Hooks**: Added support for React 19 APIs including `useActionState`, `useOptimistic`, `use`, `cache`, and the core `act` testing utility. Also added `Profiler` and `Consumer` component imports.
- **Prefix Standardization**: Standardized core and hook prefixes across all files (e.g., `imru...` for hooks, `imrc...` for create functions) for better mnemonics.
- **ReactDOM & Web APIs**: Added all React 19 Resource Loading APIs (`prefetch`, `preload`, `preinit`, etc.), `requestFormReset`, and `preloadModule`.
- **PropTypes Suite**: Added a comprehensive collection of PropTypes validation snippets including basic types, complex shapes (shape, oneOf), and `.isRequired` variants.
- **Asset & Data Imports**: New snippets for importing SVGs (`imsvg`), Images (`imimg`), and JSON (`imjson`) files with flexible extension support.
- **Root Boilerplates**: Implemented 4 distinct variants for `createRoot` and `hydrateRoot` (Simple, +Imports, +Error Catch, +Both) with built-in React 19 error handling.
- **Import Merger Helper**: Added `React Snippets: Merge Package Imports` command (`snippetz.mergeImports`) to consolidate multiple imports from the same package into a single line (works for any library like React, Lodash, etc.).
- **Infrastructure**: Modernized extension to target VS Code engine `^1.75.0` and optimized `activationEvents` for faster loading and cleaner configuration.
- **Professional Documentation**: Refined every snippet description with detailed usage context, "Pro-tips", and React 19 specific guidance.

## [1.0.4]
- Added imports for createPortal (imrdp) and flushSync (imrdf) and createPortal Boilerplate (rcp).
- We will add more snippets in the future release.

## [1.0.3]
- Added Form handle Change and handle Submit Snippets.
- We will add more snippets in the future release.

## [1.0.2]

- Added ReactJS Hooks Snippets.
- We will add more snippets in the future release.

## [1.0.1]

- Added more commonly used ReactJS Snippets such as imports, Hooks, ReactDOM and more.
- We will add more snippets in the future release.

## [1.0.0]

- Initial release of commonly used React Snippets.
- We will add more snippets in the future release.
