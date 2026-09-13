# Vigyaan (VigyaanXpo) — Mobile App

**Vigyaan / VigyaanXpo** is a comprehensive, bilingual (English & Tamil) science-learning mobile application designed for Tamil Nadu school students in Grades 6–12. The application integrates curriculum-aligned quizzes, science riddles, a 20-game interactive universe, forensic mystery labs, micro-lessons, concept maps, virtual experiments, weak area diagnosis, daily goal tracking, consistency streaks, science collections, achievements, and collectible certificates.

> ⚠️ **Repository status: Frontend Release Ready (Offline Demo Mode).**  
> All services (authentication, activity ledger, streaks, quizzes, game progression, celebrations, and certificates) operate locally on device via resilient in-memory cached AsyncStorage. There is no remote backend connected yet. For future backend service specifications, see [`BACKEND_HANDOFF.md`](./BACKEND_HANDOFF.md) and [`BACKEND_API_REQUIREMENTS.md`](./BACKEND_API_REQUIREMENTS.md).

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Expo SDK 54 (`expo@~54.0.37`) |
| **Runtime** | React Native `0.81.5`, React `19.1.0` |
| **Navigation** | Expo Router `~6.0.24` (98 file-based routes in `app/`) |
| **Language** | TypeScript `~5.9.2` |
| **Persistence** | `@react-native-async-storage/async-storage` `2.2.0` (with in-memory cache) |
| **Testing** | Jest `^29.7.0` + `ts-jest` `^29.2.5` (94 test suites, 1,460 tests) |
| **Internationalization** | Modular bilingual dictionaries (`src/config/i18n/index.ts`, feature-specific i18n) |
| **UI & Styling** | Vanilla React Native StyleSheet with custom design system tokens |

---

## System Requirements

- **Node.js**: 20+ (Required by Expo SDK 54)
- **npm**: 10+
- **iOS**: Xcode + CocoaPods (for local native builds) or Expo Go
- **Android**: Android Studio / SDK platform tools, or Expo Go
- **Project Root**: Always run commands from the project root. Do not build nested test projects.

---

## Installation & Setup

```bash
# 1. Clean installation using authoritative lockfile
npm ci

# 2. Start local Expo development server
npm start
```

Press `a` to open on an Android emulator/device, `i` to open on iOS simulator, or `w` for web preview.

---

## Verification & Build Commands

| Command | Purpose |
| :--- | :--- |
| `npm start` | Start Expo development server |
| `npm run android` | Launch app on Android emulator/device |
| `npm run ios` | Launch app on iOS simulator |
| `npm run web` | Launch app on web preview |
| `npx tsc --noEmit` | Comprehensive TypeScript typecheck (0 errors required) |
| `npm run lint` | ESLint / Typecheck verification |
| `npm test` | Run Jest test suites |
| `npm test -- --runInBand` | Run full test suite in-band (recommended for CI/CD) |
| `npx expo-doctor` | Validate Expo environment and dependencies |
| `npx expo export --platform android --no-bytecode` | Generate production Android bundle |
| `npx expo export --platform ios --no-bytecode` | Generate production iOS bundle |

---

## Project Structure

```
app/                        # Expo Router file-based routes (98 routes)
├── _layout.tsx             # Root Layout: SafeAreaProvider + AppShell + Stack
├── index.tsx               # Bootstrap gate (resolves /welcome … /home)
├── home.tsx                # Home 2.0 dashboard
├── learn.tsx               # Core curriculum learning hub (protected)
├── quiz.tsx                # Fullscreen timed quiz engine (protected)
├── games/                  # Games universe & 20 fullscreen game boards
├── mystery-lab/            # Science crime mystery investigation lab
├── progress/               # Subject progress 2.0 & topic breakdowns
└── …                       # Auth, profile, settings, passport, legal
src/
├── components/             # Modular presentation components by feature
├── config/                 # i18n dictionaries (EN/TA) and curriculum definitions
├── features/               # Pure mathematical engines, stores, repositories
├── services/               # Bootstrap service & demo session management
├── storage/                # Typed AsyncStorage wrapper with in-memory caching
├── theme/                  # Design tokens (Pearl White, Navy, Blue, Purple)
└── types/                  # Shared global TypeScript types
__mocks__/                  # Jest module mocks (react-native, AsyncStorage)
```

---

## Architecture & Governance Documents

- [`SOURCE_OF_TRUTH.md`](./SOURCE_OF_TRUTH.md): Master specification of all 14 application domains and single sources of truth.
- [`CROSS_FEATURE_ARCHITECTURE.md`](./CROSS_FEATURE_ARCHITECTURE.md): Canonical event flow, deduplication engine, and centralized celebration architecture.
- [`ROUTES.md`](./ROUTES.md): Complete catalog of all 98 routes, access rules, and navigation mapping.
- [`LOCAL_STORAGE_SCHEMA.md`](./LOCAL_STORAGE_SCHEMA.md): Complete schema of all 44 `@vigyaan/*` storage keys.
- [`RELEASE_CHECKLIST.md`](./RELEASE_CHECKLIST.md): Production release readiness checklist.
- [`QA_MATRIX.md`](./QA_MATRIX.md): Final per-feature/per-route QA status matrix.
- [`FINAL_BUG_LOG.md`](./FINAL_BUG_LOG.md): Log of every confirmed defect from the final stabilization pass.
- [`FRONTEND_HANDOFF.md`](./FRONTEND_HANDOFF.md): Engineering handoff guide for backend developers and maintainers.
- [`BACKEND_HANDOFF.md`](./BACKEND_HANDOFF.md): Detailed backend contract handoff guide.
- [`BACKEND_API_REQUIREMENTS.md`](./BACKEND_API_REQUIREMENTS.md): REST API specification for future cloud integration.

---

## Demo Mode & Security Notice

- Running the application requires **no network connection or external credentials**.
- Authentication, OTP verification, password recovery, and student profiles operate locally in demo mode.
- **Security Notice**: Demo credentials (`demo@vigyaan.app` / `VigyaanDemo@123`, OTP `123456`) are strictly for local development and QA exploration. Passwords, OTP codes, and tokens are never persisted or logged. Never commit production credentials to this repository.

