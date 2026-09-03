# Backend Handoff

This document is for the backend development team taking over the Vigyaan /
VigyaanXpo project. It explains the frontend architecture, where the demo
(frontend-only) behavior lives, and the typed contracts a backend will replace
or back with real APIs.

Companion docs: [`BACKEND_API_REQUIREMENTS.md`](./BACKEND_API_REQUIREMENTS.md)
(conceptual API surface), [`LOCAL_STORAGE_SCHEMA.md`](./LOCAL_STORAGE_SCHEMA.md)
(persistence keys + sync intent), [`ROUTES.md`](./ROUTES.md) (route inventory).

## 1. Frontend Architecture

```
app/                 Expo Router screens (file-based routes, one file per screen)
src/components/      Presentational screens/UI grouped by feature area
src/features/        Feature modules: engine + storage + types + mocks (+ tests)
src/services/        Cross-cutting: bootstrap routing, (future) logging/API client
src/config/i18n.ts   EN/TA dictionaries (same key tree for both languages)
src/storage/         Typed AsyncStorage wrapper + canonical STORAGE_KEYS
src/theme/           Semantic design tokens (no raw UI colors in screens)
__mocks__/           Jest mocks for react-native + AsyncStorage
```

Patterns every feature follows:

- **Engine** — pure, unit-testable logic (scoring, validation, progression):
  `*.engine.ts`, `*.utils.ts`, `*.scoring.ts`.
- **Storage** — typed repository reading/writing `AsyncStorage` via the wrapper,
  validating untrusted JSON and applying defaults on corruption.
- **Mocks** — content and demo services in `*.mock.ts` / demo files; clearly
  separated from production interfaces. Content files are compiled into the
  bundle and never fetched.
- **Hooks** — `use*Game.ts`, `useQuizEngine.ts`, `useRiddleEngine.ts`,
  `useMysteryInvestigation.ts` orchestrate state + timers with unmount-safe
  cleanup and rapid-tap guards on completion.

## 2. Route Inventory & Navigation

75 routes under `app/` (full list: [`ROUTES.md`](./ROUTES.md)). Four canonical
tabs (Home/Learn/Games/Profile) are driven by one shell
(`src/components/navigation/`) — route→tab mapping, nav visibility and back
buttons are centralized; screens never re-implement navigation chrome.

## 3. Auth / Session Boundary (frontend demo)

- `src/features/auth/auth.demo.ts` simulates sign-in, OTP, registration and
  password recovery **entirely on device**. No requests are made; passwords and
  OTP values are never persisted or logged.
- `auth.session.ts` stores a local `AuthSession` under `@vigyaan/auth_session`.
- Backend replaces `auth.demo.ts` with real API calls and a server-issued
  session/token; the UI layer (`app/login.tsx`, `app/register.tsx`,
  `app/otp.tsx`, `app/forgot-password.tsx`, `app/reset-password.tsx` and their
  `src/components/auth/*` counterparts) already consume a promise-based service
  interface, so the seam is small.
- **Privacy:** never store raw credentials or tokens in AsyncStorage once a real
  backend exists — use secure storage (e.g. expo-secure-store) or short-lived
  in-memory tokens.

## 4. Storage Keys

All keys, shapes, owners, logout behavior and sync intent are in
[`LOCAL_STORAGE_SCHEMA.md`](./LOCAL_STORAGE_SCHEMA.md). Rule of thumb: keys
marked *Sync later = Yes* should eventually be mirrored server-side with
conflict resolution; local storage should remain the offline cache.

## 5. Learning & Quiz Contracts

- Learning levels/subjects/pathways: `src/features/learn/learn.types.ts`,
  content in `learn.mock.ts` + `learn.topics.foundation.ts`.
- Quiz content: `src/features/quiz/quiz.types.ts` + `quiz.mock.{foundation,
  core, advanced}-{physics,chemistry,biology}.ts` files (question pools keyed by
  level+subject+pathway+difficulty).
- Quiz result: `QuizResult` (`quiz.types.ts`) — totals, score, percentage,
  bestStreak, timestamps + `QuizSetupConfig`. Persisted as `QuizHistoryEntry`
  (`quiz-history.types.ts`).
- Screens expect a `Question { id, prompt, options, correctIndex,
  explanation, ... }`-style shape with bilingual fields where content is shown
  in-app. Backend should return exactly these contracts (see API doc §quiz).

## 6. Riddle Contracts

- Categories + items: `riddle.mock.ts`; engine/scoring in `riddle.engine.ts`,
  `riddle.scoring.ts`. Results stored via `riddle-result.store.ts`
  (difficulty, solved/skipped counts, score, hintsUsed, bestStreak).
- Performance tiers map score ratios to result copy (excellent/great/good/
  practice).

## 7. Games Universe Contracts (20 games)

- Registry: `src/features/games/games.registry.ts` (`GAME_ID`, `GameDefinition`,
  collections, badges). Each game: `zip`, `wend`, `patches`, `mini-sudoku`,
  `tango`, `queens`, `element-match`, `molecule-builder`, `circuit-lab`,
  `memory-matrix`, `orbit`, `reaction-sort`, `science-word-grid`,
  `pattern-lab`, `logic-lock`, `gravity-path`, `lab-escape`, `time-machine`,
  `dna-sequence`, `magnet-maze` — dataset per game under
  `src/features/games/<game>/`.
- **Level identity is canonical dataset IDs** (`zip-01`). Storage keys in
  `GameProgress.levels` are `levelId → GameLevelProgress { completed, unlocked,
  stars?, isPerfect?, bestTimeSeconds?, bestMoves?, highScore?, completedAt? }`.
- Mastery %, unlock-next-level and the deterministic daily challenge all derive
  from the real dataset level count (`getGameLevelCount`, `getGameLevelId`,
  `deriveDailyChallengeGame` in `games.storage.ts`).
- Games are 100 % offline/puzzle content today. Online play is explicitly a
  future boundary (`multiplayerNotice` copy already exists).

## 8. Mystery Lab Contracts

- Cases registry: `mystery.registry.ts` / `mystery.cases.ts`; engine +
  scoring: `mystery.engine.ts`, `mystery.scoring.ts`; session persistence:
  `mystery.storage.ts`. No fake network behavior — cases are local content.

## 9. Notification Contracts

- Types: `src/features/notifications/notifications.types.ts`
  (`NotificationType`, `AppNotification { id, type, title{en,ta}, body{en,ta},
  createdAt, isRead, action?: { route, params? }, priority? }`).
- Inbox today is a local mock (`notifications.mock.ts`) with read/delete state
  in `notifications.storage.ts`; deep-link `action.route` values must exist in
  the router. Real push arrives later; **no push provider is wired**.

## 10. Settings Contracts

- `AppSettings` (`src/features/settings/settings.types.ts`) covers language,
  theme, text scale, reduce-motion, notification toggles, learning/quiz
  preferences, sound/haptics, accessibility and privacy. Repository in
  `settings.repository.ts`, defaults in `settings.defaults.ts`.
- Reset-Preferences clears only app settings; Clear Cache only transient data.

## 11. Certificate Contracts (demo-only)

- Locally generated preview: `src/features/certificates/certificates.types.ts`
  + `certificates.engine.ts` + `certificates.storage.ts`.
- Future server contract (not yet real — UI must not claim verification):
  `certificateId`, `studentId`, `achievement`, `issueDate`, `verificationUrl`.

## 12. Achievement / Progress / Home

- `src/features/achievements/` (unlock engine + storage), `src/features/home/`
  (dashboard aggregation service + cache), `src/features/progress/` (tracking
  UI over quiz/game history), `src/features/challenges/` (daily challenge
  engine bridging games + quiz).

## 13. Expected Backend Responsibilities

1. Real authentication (password + OTP via email/SMS) and session/token
   management with secure storage guidance.
2. Serve curriculum/learning content (topics, pathways) and quiz questions.
3. Persist and report results: quiz sessions, riddle sessions, game progress,
   mystery lab completion, daily challenges, streaks, XP/points.
4. Issue and verify certificates (verification endpoint).
5. Push notifications inbox + real delivery; leaderboards/rankings.
6. Profile + preference sync across devices.
7. Analytics event intake (frontend already fires named events through an
   `onAnalyticsEvent`-style seam — no SDK is installed).

## 14. Known Frontend-Only Mock Behavior

- Auth (login/register/OTP/recovery) — simulated locally.
- All content/question/riddle/game/mystery data — bundled static mocks.
- Certificate generation — local preview only, not verifiable.
- Notification inbox — local list, no push.
- Leaderboards/rankings — computed locally from on-device state only.
- "Online multiplayer / tournaments" — explicitly future, UI copy only.

## 15. Do / Don't

**Do:** keep screens renderable from local state; keep pure engines testable;
keep `STORAGE_KEYS` as the single source of key names; extend the typed
contracts before touching UI.
**Don't:** import mock files into production service interfaces; write to
storage on renders; log credentials/OTPs/tokens; add a second navigation or
back-button implementation.
