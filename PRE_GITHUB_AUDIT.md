# Pre-GitHub Audit Report

Date: 2026-09-03 · Scope: final production cleanup, QA, and repository handoff
pass for the Vigyaan / VigyaanXpo frontend. No redesigns or new product features
were introduced — this pass cleaned, stabilized and documented the existing app.

---

## Files Inspected (key)

- **Config:** `package.json`, `package-lock.json`, `tsconfig.json`,
  `jest.config.js`, `app.json`, `.gitignore`
- **Navigation:** `app/_layout.tsx`, `src/components/navigation/*` (AppShell,
  AppBottomNav, AppBackButton, navigation.config, navigation.types),
  `app/{home,learn,games,profile}.tsx`
- **Games:** `src/features/games/{games.storage,games.types,games.registry}.ts`,
  all 20 game datasets under `src/features/games/<game>/`, level-select,
  completion-modal, timer + header components, game hooks
- **Quiz/Riddles:** `src/features/quiz/*`, `src/features/riddles/*`
- **Mystery Lab:** `src/features/mystery-lab/*`, mystery case screens
- **Settings / Notifications / Fun Facts / Challenges / Home:**
  `src/features/{settings,notifications,fun-facts,challenges,home}/*`
- **Auth/Bootstrap:** `src/features/auth/*`, `src/services/bootstrap/*`,
  `src/storage/asyncStorage.ts`, `src/config/i18n.ts`, `src/theme/*`
- **Tests/mocks:** all `src/**/__tests__/*`, `__mocks__/*`
- **Verification scripts:** `src/scripts/verify_*.ts`

## Issues Found & Fixed

| # | Issue | Fix |
| - | ----- | --- |
| 1 | `package-lock.json` out of sync with `package.json` (lockfile generated with jest 30 vs declared jest 29; `@types/react` 18 while react-native 0.81.5 needs React 19 types) | Aligned `@types/react` to `~19.1.10` and pinned `react-dom` to `19.1.0` (peer of `react` 19.1.0 for SDK 54); regenerated lockfile |
| 2 | Unused `@expo/metro-config@57` devDependency (SDK 57-era version; no `metro.config.js`/`babel.config.js` imports it) | Removed from `package.json` + lockfile |
| 3 | **Games progress bug:** storage wrote legacy `level-${index}` aliases alongside canonical dataset IDs (`zip-01`) | `games.storage.ts` now uses canonical dataset level IDs only; added one-time migration in `getAllGamesProgress` that rewrites legacy keys to real IDs and persists once |
| 4 | `LevelSelectModal` synthesized keys as `gameId-01` while real dataset prefixes differ (e.g. `elem-01`) | Now uses shared `getGameLevelId(gameId, index)` |
| 5 | `GameList` count helpers would count legacy `level-N` keys from old installs | Ignores non-dataset keys (defense in depth) |
| 6 | ~30 `as any`/`as any` router casts in app screens, nav, mystery lab, spin-wheel | Removed; plain `Href` strings typecheck cleanly (no typed-routes dependency) |
| 7 | Dead `HomeBottomNav` duplicate nav component (barrel export only) | Deleted + barrel cleaned |
| 8 | Tamil registration form leaked English for section headers 3 & 4 (`3. Account Security`, `4. Terms & Verification`) | Translated in `src/config/i18n.ts` |
| 9 | No automated i18n parity coverage | Added `src/config/__tests__/i18n_parity.test.ts` (exact key-tree parity EN↔TA + allow-list heuristic) |
| 10 | 100 runtime `console.log` breadcrumbs (`[DEBUG]`/`[LOGIN]`/`[ANALYTICS]`-style tags) across 36+ files | Removed; kept `console.warn`/`console.error` for genuine problems. Verified no log statement ever receives passwords/OTPs/tokens |
| 11 | No graceful failure for feature-level crashes | Added reusable `FeatureErrorBoundary` (bilingual fallback + retry) wired around screen content in `AppShell` — bottom nav survives a crash |
| 12 | Stale verify scripts `verify_games.ts`, `verify_games_suite.ts` hardcoded the old 6-game × 15-level model, contradicting the 20-game registry | Removed (unreferenced); kept current `verify_games_production.ts`/`verify_games_universe.ts` |
| 13 | `.DS_Store` artifacts in repo | Removed (root + `src/`) |
| 14 | `.gitignore` gaps (`.env*` full coverage, `__MACOSX/`, `*.log`, `.claude/`) | Hardened |
| 15 | `dist/`, `.expo/`, `node_modules/`, and the ZIP's `.git` metadata present | Removed for clean handoff state (kept `package-lock.json`) |

## Verified as Already Correct (no change needed)

- Route → tab mapping centralized in `navigation.config.ts` (`ROUTE_TAB_MAP`,
  `getActiveTab`, `isNavVisible`); no per-screen duplication.
- One canonical `AppBackButton` used across Learn/Games/Profile/features
  (44×44 target, hitSlop, bilingual a11y label); no `ProfileBackButton`-style
  duplicates.
- Bottom nav has **no** keyboard coupling — it sits in normal layout flow, so
  Android `adjustResize` keeps it above the keyboard. No global hide-on-focus
  rules exist.
- Timed game hooks stop timers on completion/reset/unmount and guard completion
  against double-fires; daily challenge and mastery derive from real dataset
  level counts (no hardcoded 10).
- Storage writes occur only on meaningful state changes; AsyncStorage reads
  validate untrusted JSON with safe defaults (settings, notifications, games,
  mystery, quiz/riddle results).
- Settings reset semantics correct: Reset Preferences clears only app settings;
  Clear Cache clears only transient data — neither logs out or clears
  auth/profile/onboarding/language.
- Reduced-motion is respected app-wide (`AccessibilityInfo.isReduceMotionEnabled`).
- `quiz`/`riddle`/`mystery`/`fun-facts` scoring models are single-source per
  feature; no duplicate local state models found.
- Certificates are clearly local previews (typed contract prepared, no
  verification claims); notifications inbox is local-only with typed actions.
- Secret scan of source: no API keys, private keys or credentials committed.

## Tests Executed (final dependency state, fresh `npm ci`)

All commands below ran from a clean install (`rm -rf node_modules && npm ci`,
exit 0) and passed:

| Command | Result |
| ------- | ------ |
| `npx tsc --noEmit` | ✅ no errors |
| `npm run lint` (= `tsc --noEmit`) | ✅ exit 0 |
| `npm test -- --runInBand` | ✅ 25 suites / **618 tests** passed |
| `npx expo export --platform android` | ✅ exported |
| `npx expo export --platform ios` | ✅ exported |

Installed versions verified: jest 29.7.0, ts-jest 29.x, expo 54.0.37,
react-native 0.81.5, expo-router 6.0.24, react 19.1.0, @types/react 19.1.x.

## Remaining Known Limitations

- **Frontend-only by design:** auth, content, notifications, certificates and
  games are local demo/mock implementations. No network calls exist.
- **No device UI QA was run:** this environment has no emulator/simulator, so
  small/large-phone and notch/Dynamic Island visual checks, plus interactive
  smoke flows in Tamil, were not exercised on hardware. Layouts use
  safe-area/flex patterns and unit tests cover logic; visual verification on
  devices is recommended before release.
- **Native build steps** (`expo run:android`/`run:ios`, Xcode/Gradle) were not
  run; only JS bundle exports (`expo export`) were verified.
- Standalone dev scripts under `src/scripts/verify_*.ts` exist as offline
  tools (run with ts-node if needed); they are not part of `npm test`.
- The git history in the source ZIP was removed per handoff instructions —
  initialize a fresh repository (`git init`) and commit the working tree.

## Final Repository Inventory

```
AGENTS.md  BACKEND_API_REQUIREMENTS.md  BACKEND_HANDOFF.md  CLAUDE.md
LICENSE  LOCAL_STORAGE_SCHEMA.md  PRE_GITHUB_AUDIT.md  README.md  ROUTES.md
__mocks__/  app/  app.json  assets/  jest.config.js  package.json
package-lock.json  src/  tsconfig.json  .gitignore
```

Not present: `node_modules/`, `dist/`, `.expo/`, `__MACOSX/`, `.DS_Store`,
`.git/`, local secrets. Documentation produced: `README.md`,
`BACKEND_HANDOFF.md`, `BACKEND_API_REQUIREMENTS.md`, `LOCAL_STORAGE_SCHEMA.md`,
`ROUTES.md`, and this report.

**Status: READY FOR GITHUB HANDOFF.**
