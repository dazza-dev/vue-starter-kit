# vue-starter-kit

Vue 3 SPA to start a project without rebuilding login, permissions, layout and theme from
scratch. Consumes [`laravel-starter-kit`](https://github.com/dazza-dev/laravel-starter-kit) or
[`nestjs-starter-kit`](https://github.com/dazza-dev/nestjs-starter-kit): they expose the same
contract, so it works with either without touching a line.

Vue 3.5 · Vuetify 4 · TypeScript 6 · Vite 8 · Pinia · Vue i18n · CASL

![Vue starter kit](https://github.com/user-attachments/assets/ed532588-0ed5-42f3-9e4d-26bca529969f)

---

## What's included

- Login, password recovery and user profile
- CASL permissions on three layers: router guard, `v-can` directive and sidebar filtering
- Full CRUD for users, roles (with permission matrix), groups and settings
- Layout, theme and components shipped in the project itself, under `src/core/`
- Light/dark themes with a switcher, eight palettes, i18n in `en`/`es`/`pt`
- Form components with built-in Vuelidate validation
- Rich text editor based on tiptap

## Requirements

- Node.js 18+
- pnpm

## Getting started

Start one of the two backends first and point `VITE_API_URL` to its URL.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Open `http://localhost:5173` and log in with the user created by the API's seeder.

## Commands

```bash
pnpm dev         # development server
pnpm build       # production build
pnpm typecheck   # vue-tsc --noEmit
pnpm lint        # eslint --fix
pnpm format      # prettier --write
```

## Structure

Everything shared lives in `src/core/`; each feature is a module in `src/modules/`.

```
src/
├── assets/scss/      Styles and Vuetify variables
├── core/
│   ├── components/   Form (App*), cards, modals, shared, widgets
│   ├── composables/  useApiCall and friends
│   ├── constants/    Table defaults
│   ├── directives/   v-can
│   ├── editor/       Rich text editor (tiptap)
│   ├── layouts/      FullLayout (sidebar + header) and BlankLayout
│   ├── plugins/      Vuetify, i18n and ability (CASL)
│   ├── sidebar/      sidebarApp.ts + useSidebarItems.ts
│   ├── stores/       config (settings) and customizer (theme)
│   ├── theme/        Light and dark palettes
│   ├── types/        Shared types
│   ├── utils/        Preconfigured axios, notify, download, logger
│   ├── views/        Error screens
│   └── widgets/      Notifications and header profile
├── locales/          common.json and sidebar.json per language + messages.ts
├── modules/
│   ├── authentication/  login, password recovery, profile
│   ├── dashboard/       landing screen
│   ├── users/           user CRUD  ← full example
│   └── configs/
│       ├── groups/      ← the smallest example of the pattern; copy it for new modules
│       ├── roles/       roles + permission matrix
│       └── settings/    application settings
└── routes/           AppRoutes, ConfigsRoutes, AuthRoutes, ProfileRoutes, router
```

Development rules, the module pattern and conventions live in [`CLAUDE.md`](./CLAUDE.md).

## Adding a module

1. Copy `src/modules/configs/groups/` and rename everything
2. Register its routes in `src/routes/AppRoutes.ts` (or `ConfigsRoutes.ts`)
3. Register its locales in `src/locales/messages.ts`, in all **three** languages
4. Add its sidebar entry in `src/core/sidebar/sidebarApp.ts` with its `permission`
5. Create the matching module in whichever backend you use, and its permissions in its seeder

## Customization

Every layout default lives in one place, the `setCustomizerDefaults()` call in `src/main.ts`:

| Option        | Values           | What it does                                                                   |
| ------------- | ---------------- | ------------------------------------------------------------------------------ |
| `activeTheme` | a palette name   | Colour palette. The backend's `app_theme` setting overrides it at runtime       |
| `darkMode`    | `true` / `false` | Mode on first load; the header toggle then remembers the user's choice          |
| `miniSidebar` | `true` / `false` | Sidebar collapsed on first load; the toggle then remembers the user's choice    |
| `boxed`       | `true` / `false` | `true` centres the content and caps it at 1200px, `false` fills the width       |
| `borderCard`  | `true` / `false` | `true` outlines cards with a border, `false` gives them a shadow                |

Palettes: `DEFAULT_THEME`, `BLUE_THEME`, `AQUA_THEME`, `ORANGE_THEME`, `PURPLE_THEME`, `GREEN_THEME`,
`CYAN_THEME`, `EMERALD_THEME`. Each ships a `DARK_` twin, picked automatically by the mode toggle.
Their colours are defined in `src/core/theme/LightTheme.ts` and `DarkTheme.ts`; the boxed width is
the `.max-width` class in `src/assets/scss/layout/_container.scss`, and the sidebar dimensions are
the `width` and `rail-width` props on the drawer in `AppSidebar.vue`.

`darkMode` and `miniSidebar` are only the **starting** values: once the user touches the header
toggle or the sidebar button, their choice is kept in `localStorage` and wins from then on.

`react-starter-kit` exposes the same options, in `src/core/context/config.ts`.

## Rebranding

- Logos in `src/assets/images/` (`logo.svg` for light backgrounds, `logo-light.svg` for the sidebar)
- Colors in `src/core/theme/LightTheme.ts` and `DarkTheme.ts`. The sidebar uses the `sidebarBg`
  token, which follows primary unless the theme overrides it (that's how `EMERALD_THEME`, the
  default, works: black sidebar and green buttons)
- The starting theme is set in `src/core/vuetify.ts`, `src/core/stores/customizer.ts` and the
  `app_theme` setting seeded by the API — the latter wins at runtime
- Name in `VITE_APP_NAME`; `index.html` reads it from there
- The favicon in `public/` is a placeholder: replace it
