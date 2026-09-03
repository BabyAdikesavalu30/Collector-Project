# Routes Inventory

Expo Router file-based routing under `app/` (75 route files). All screens render
inside a single global shell (`app/_layout.tsx` → `src/components/navigation/AppShell.tsx`)
that owns the canonical 4-tab bottom navigation (Home · Learn · Games · Profile).

## Boot Flow

`app/index.tsx` runs the bootstrap service (`src/services/bootstrap/`), which
restores local state and navigates to the first applicable screen:

1. Never launched → `/welcome`
2. Launched, onboarding incomplete → `/welcome`
3. Onboarding complete, language not chosen → `/language`
4. Language chosen, not authenticated → `/auth-welcome`
5. Authenticated, profile incomplete → `/profile-create`
6. Everything complete → `/home`

## Route Groups

### Public / Pre-App (bottom nav hidden)

| Route | Purpose |
| ----- | ------- |
| `/` (`index`) | Bootstrap gate (no UI) |
| `/welcome` | Welcome / value props |
| `/onboarding`, `/onboarding-grow`, `/onboarding-learn`, `/onboarding-achieve` | Onboarding steps |
| `/language` | Language selection (EN/TA) |

### Auth Flow (bottom nav hidden)

`/auth-welcome`, `/auth`, `/login`, `/register`, `/otp`, `/forgot-password`,
`/reset-password`

### Profile Setup Flow (bottom nav hidden)

`/profile-create`, `/profile-academic`, `/profile-complete`, `/profile-setup`

### Main Tabs (bottom nav visible)

| Tab | Route | Children mapped to tab |
| --- | ----- | ---------------------- |
| Home | `/home` | `/notifications` |
| Learn | `/learn` | `/learn`, `/quiz-setup`, `/quiz-result`, `/quiz-review`, `/progress`, `/quizzes` |
| Games | `/games` (index) | `/riddles`, `/riddle-quiz`, `/riddle-result`, `/fun-facts`, `/spin-wheel`, `/escape-room`, `/challenges`, `/mystery-lab`, `/mystery-lab/cases`, `/mystery-lab/result` |
| Profile | `/profile` | `/settings`, `/achievements`, `/certificates`, `/certificate-view`, `/about`, `/account-security`, `/delete-account`, `/faq`, `/feedback`, `/guidelines`, `/help`, `/licenses`, `/privacy`, `/report-problem`, `/terms` |

The route → tab mapping is centralized in
`src/components/navigation/navigation.config.ts` (`ROUTE_TAB_MAP`,
`getActiveTab`, `isNavVisible`). Do not duplicate this logic in screens.

### Fullscreen Game Boards (bottom nav hidden)

`/games/zip`, `/games/wend`, `/games/patches`, `/games/mini-sudoku`,
`/games/tango`, `/games/queens`, `/games/element-match`,
`/games/molecule-builder`, `/games/circuit-lab`, `/games/memory-matrix`,
`/games/orbit`, `/games/reaction-sort`, `/games/science-word-grid`,
`/games/pattern-lab`, `/games/logic-lock`, `/games/gravity-path`,
`/games/lab-escape`, `/games/time-machine`, `/games/dna-sequence`,
`/games/magnet-maze`

### Fullscreen Activity Screens (bottom nav hidden)

- `/quiz` — active timed quiz engine
- `/mystery-lab/case` — active mystery investigation

## Navigation Rules

- `isNavVisible(pathname)` returns **false** for the explicit
  `HIDDEN_NAV_ROUTES` set and for any `/games/*` sub-route (boards are
  fullscreen by design).
- `getActiveTab(pathname)` resolves the highlighted tab: exact match via
  `ROUTE_TAB_MAP`, then prefix matching for nested routes, defaulting to Home.
- The bottom nav is laid out in normal document flow **above** the keyboard on
  Android (`adjustResize` default); keyboard visibility never toggles the nav.
- A single canonical `AppBackButton`
  (`src/components/navigation/AppBackButton.tsx`) is used across Learn, Games,
  Profile and all feature headers (44×44 target, bilingual label).

## Future Boundaries

Routes that a backend will later serve data for (same paths, remote data):
`/home`, `/learn`, `/quiz-setup`, `/quiz-result`, `/riddles`, `/games`,
`/mystery-lab`, `/notifications`, `/achievements`, `/certificates`,
`/progress`. Screens must keep rendering from local state until sync lands —
see `BACKEND_HANDOFF.md`.
