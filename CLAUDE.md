# Vue Starter Kit — Development Rules

## Stack

- Vue 3.5, Vite 8, TypeScript 6
- **Vuetify 4.1** (component library)
- Vue Router 5.1, Pinia 3, Vue i18n 11
- Vuelidate 2 for form validation, CASL for permissions
- `axios-case-converter` middleware on the axios instance (auto-converts snake_case ↔ camelCase)
- Layout, theme and shared components live in `src/core/` — nothing is pulled from an external UI package
- `@dazzadev/vuetify-datatable` package (`DataTable` component, `LoadDataParams` type)

---

## Comments

- **Language:** every comment is written in **English**, same as the code.
- **Function / composable / class docblocks:** a JSDoc `/** ... */` block with a single sentence describing what it does.
- **Inline comments inside a function body:** a single line. If a comment needs two lines, cut it down to one.

---

## Module Structure

Every feature lives in `src/modules/{domain}/{feature}/` (or `src/modules/{domain}/` for top-level domains):

```
src/modules/configs/groups/
├── composables/
│   ├── useGroup.ts            # API calls
│   ├── useGroupForm.ts        # Form state + Vuelidate + save logic
│   └── useGroupPageConfig.ts  # headers, breadcrumbs, page title
├── locales/{en,es,pt}.json
├── routes/GroupsRoutes.ts
├── types/Group.ts
└── views/
    ├── GroupList.vue
    └── GroupForm.vue
```

Modules that ship with the starter:

| Domain           | Contents                               |
| ---------------- | -------------------------------------- |
| `authentication` | Login, password recovery, profile      |
| `dashboard`      | Landing screen after login             |
| `users`          | **Reference CRUD** — application users |
| `configs`        | `groups`, `roles`, `settings`          |

> `configs/groups` is the **smallest complete example** of the module pattern. Copy it when creating a new module. `users` is the fuller example: relations, options loading, richer validation.

---

## Local storage

Read and write through the browser `localStorage` directly; the only key the kit ships with is
`lang`, written by the language switcher and read by the axios interceptor.

---

## API Calls

All API calls go through `src/core/utils/axios` (pre-configured instance):

- `baseURL` = `getBaseUrl() + '/api'`
- `withCredentials: true`, `withXSRFToken: true` (session-based cookie auth)
- `axios-case-converter` middleware applied
- Request interceptor adds `Accept-Language`
- Response interceptor redirects to login on 401 (except `auth/profile` calls)

URL pattern: pass the path **relative to** `/api` — i.e. starting from `v1/`:

```ts
axios.get('v1/groups');
axios.post('v1/groups', form);
```

All keys in `params: {}` objects and request bodies **must be camelCase** — `axios-case-converter` converts them to snake_case on the wire automatically:

```ts
// ✓ correct
axios.get('v1/users', { params: { perPage: 15, roleUuid: uuid } });

// ✗ wrong — snake_case keys
axios.get('v1/users', { params: { per_page: 15, role_uuid: uuid } });
```

Wrap every call with `useApiCall(loading)`:

```ts
const loading = ref(false);
const apiCall = useApiCall(loading);

async function getGroups(params) {
    return apiCall(async () => {
        const response = await axios.get<{ data: Group[]; meta: { total: number } }>('v1/groups', { params });
        groups.value = response.data.data;
        totalItems.value = response.data.meta.total;
        return response;
    }, 'Error fetching groups:');
}
```

---

## Types

Rules:

- Never include `id` in entity interfaces — the API only returns `uuid`
- `uuid: string` is the public identifier on all entities
- `Form` interface contains only editable fields (no `uuid`)
- Filter fields that reference entity arrays must be `string[]` (UUIDs), never `number[]`
- No inline anonymous types for API-facing shapes — define a named `interface` in a `types/` file
- Shared utility types (`NamedOption`, `RoleOption`, `FilterType`, `HeaderTitleType`, `SidebarItem`) live in `src/core/types/common.type.ts` — import from there, never duplicate per-module

---

## UUID Convention

- Empty string `''` = creating mode
- Non-empty string = editing mode
- Never use numeric IDs (`-1`, `0`) as sentinel values

```ts
const isCreating = computed(() => props.groupUuid === '');
```

---

## Composables

Three per module, with one job each:

- `useXxx` — API layer. Returns `loading`, the data refs and the CRUD functions
- `useXxxForm` — form layer. Owns `editedItem`, the Vuelidate rules, `loadXxx`, `resetForm`, `saveXxx`. Validation rules live here, never in the component
- `useXxxPageConfig` — page chrome. Titles, breadcrumbs and table headers, refreshed on locale change via `useI18nTranslation`

Shared composables live in `src/core/composables/`. Never create module-level composables for data reused across the system — `useOptions()` already serves roles and groups from the dedicated `v1/settings/*` endpoints.

---

## Pinia Stores

All stores use the **composition API** form only:

```ts
// ✓ correct
export const useAuthStore = defineStore('auth', () => {
    const user = ref<AuthUser | null>(null);
    return { user };
});

// ✗ wrong — options API form
export const useAuthStore = defineStore('auth', { state: () => ({ user: null }) });
```

---

## Routing

Routes files export a plain object when they define a layout wrapper, or a spread array for children:

```ts
// src/routes/AppRoutes.ts
const AppRoutes = {
    path: '/app',
    meta: { requiresAuth: true, module: 'app' },
    component: FullLayout,
    children: [...UsersRoutes]
};
```

`route.meta.module` drives which sidebar renders. The starter ships one module, `'app'`.

Each route declares the permission it needs in `meta.permission`. The router guard denies and redirects to `/403` when the user lacks it. It can also be a function deriving the permission from route params.

---

## Permissions

- Permissions come from `v1/permissions/me` and are pushed into CASL by `useAuthStore.getPermissions()`
- An admin gets `manage all` rather than an enumerated list — a permission added tomorrow works without a redeploy
- Three ways to check, all backed by the same CASL ability: the router guard (`meta.permission`), the `v-can` directive in templates, and `ability.can()` in scripts
- The sidebar filters itself: an item whose permission the user lacks disappears, and a group left with no visible children disappears too

---

## Sidebar

`src/core/sidebar/useSidebarItems.ts` watches `route.meta.module` and resolves the sidebar from `sidebarModules`. All items for the main module are defined in `src/core/sidebar/sidebarApp.ts`.

When adding a new item, add it there with its `permission`. To add a whole new module with its own navigation, create `sidebarXxx.ts` and register it in `sidebarModules`.

---

## Internationalisation

Three languages: `en`, `es`, `pt`.

Each module has its own locale files in `module/locales/{en,es,pt}.json`. Register them in `src/locales/messages.ts` in **all three** blocks. Namespace key = feature name in camelCase.

All user-visible text in `.vue` templates **must** go through `t('...')` or `$t('...')`. Never hardcode Spanish or English labels, button text, column headers, or placeholders:

```html
<!-- ✓ correct -->
<v-btn>{{ t('groups.create.button') }}</v-btn>

<!-- ✗ wrong — hardcoded label -->
<v-btn>Create group</v-btn>
```

---

## Core Components

UI components live in `src/core/components/`. Import them by path:

```ts
import AppInput from '@/core/components/form/AppInput.vue';
```

| Component          | Purpose                                                |
| ------------------ | ------------------------------------------------------ |
| `AppInput`         | Text input with Vuelidate support (`:v$="v$.field"`)   |
| `AppSelect`        | Select — wraps `v-select` with shared defaults         |
| `AppAutocomplete`  | Autocomplete — wraps `v-autocomplete`                  |
| `AppTextarea`      | Textarea — wraps `v-textarea`                          |
| `AppPasswordInput` | Password field with show/hide button                   |
| `AppColorPicker`   | Color swatch + popup with `v-color-picker`             |
| `AppModal`         | Dialog with fixed header/footer; only the body scrolls |
| `AppLink`          | Table/inline link with shared styling                  |
| `ImageUploader`     | Image upload with preview and validation               |

**Never use raw `v-select`, `v-autocomplete` or `v-textarea`** — always use the `App*` wrappers.
They set `variant="outlined"` and `hide-details`, forward the rest of the attributes via
`v-bind="$attrs"`, and accept an optional `:v$` to display validation errors.

Layout and presentation components (`PageHeader`, `ParentCard`, `FormCard`, `TagChip`,
`BreadcrumbBar`, `ConfirmationModal`, `PillTabs`, `TextItem`) are registered **globally** by
`src/core/plugin.ts` — those are never imported.

The rich text editor lives in `src/core/editor/` and uses tiptap and remixicon.

`AppLogo.vue` picks between two sources. If a logo was uploaded in settings, it renders it as-is
with an `<img>`: it's the client's brand and stays untouched. Otherwise it inlines `logo.svg`,
which is tinted with `currentColor`, and the component sets the color:

- `variant="dark"` (auth screens, light background) takes the theme's `primary`, so the logo
  changes color with the theme instead of clashing
- `variant="light"` (sidebar, colored background) stays white

It's inlined instead of `<img src>` because an `<img>` doesn't inherit `currentColor`. The
`mask` id is made unique per instance with `useId()`, so two logos on the same page don't collide.

`AppModal` caps the card at `90vh` and keeps header and footer out of the scroll area, so Save
and Cancel stay visible on long forms. It accepts `loading` (spinner on Save) and
`contentLoading` (spinner instead of the body while data loads).

When editing, the form loads the item before showing: `useXxxForm` exposes `loadingItem` and the
view passes it to `AppModal` as `:content-loading`. The modal shows a spinner and blocks Save
until the data arrives, so it never shows an empty form or saves halfway through. Doesn't apply
when creating.

---

## Layout customization

Layout defaults live in **one** place, the `setCustomizerDefaults()` call in `src/main.ts`:
`activeTheme`, `darkMode`, `miniSidebar`, `boxed` and `borderCard` (bordered vs shadowed cards).

Read them from the customizer store — never hardcode a colour, width or card style in a component.

`darkMode` and `miniSidebar` are only the starting values: the header toggle and the sidebar button
persist the user's choice in `localStorage` (`darkMode`, `miniSidebar`), which wins on the next
load. In `saas-starter-app` those keys are scoped per tenant.

`react-starter-kit` exposes the same options in `src/core/context/config.ts`. Keep the three in
sync when adding one.

---

## Notifications

```ts
import { notify } from '@/core/utils/common';

notify('success', t('groups.create.success'));
notify('error', `${t('groups.create.error')}: ${message}`);
```

---

## Before committing

```bash
pnpm typecheck   # vue-tsc --noEmit
pnpm lint        # eslint --fix
pnpm format      # prettier --write
```

---

## Related projects

- `laravel-starter-kit` — the Laravel API this SPA consumes
- `nestjs-starter-kit` — the same API in NestJS; either backend works without touching the SPA
