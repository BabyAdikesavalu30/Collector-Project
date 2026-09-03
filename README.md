# Vigyaan (VigyaanXpo) — Mobile App

**Vigyaan / VigyaanXpo** is a bilingual (English & Tamil) science-learning mobile
application for Grades 6–12, featuring quizzes, riddles, a games universe, mystery
lab investigations, fun facts, achievements, certificates, and progress tracking.

> ⚠️ **Repository status: frontend-only.** There is no backend yet. All learning
> content and services are local demo/mock implementations that run entirely on
> device. See [BACKEND_HANDOFF.md](./BACKEND_HANDOFF.md) for the integration
> boundary.

---

## Tech Stack

| Layer        | Technology                                        |
| ------------ | ------------------------------------------------- |
| Framework    | Expo SDK 54 (`expo@~54.0.37`)                     |
| UI           | React Native `0.81.5`, React `19.1.0`             |
| Navigation   | Expo Router `~6.0.24` (file-based routes in `app/`) |
| Language     | TypeScript `~5.7.2`                                |
| Persistence  | `@react-native-async-storage/async-storage` `2.2.0` |
| Tests        | Jest `^29.7.0` + `ts-jest` `^29.2.5`               |
| i18n         | Custom dictionary (`src/config/i18n.ts`), EN + TA  |

## Requirements

- Node.js 20+ (Expo SDK 54 requirement)
- npm 10+
- iOS: Xcode + CocoaPods (native runs) or Expo Go
- Android: Android Studio/emulator, or Expo Go
- No environment variables are required.

## Installation

```bash
# 1. Install dependencies (lockfile is authoritative)
npm ci

# 2. Start the dev server
npm start          # then press i / a / w for iOS, Android, web
```

## Commands

| Command                    | Purpose                                |
| -------------------------- | -------------------------------------- |
| `npm start`                | Start Expo dev server                  |
| `npm run android`          | Start on Android                       |
| `npm run ios`              | Start on iOS                           |
| `npm run web`              | Start on web                           |
| `npm run lint`             | Type-check the whole project (`tsc --noEmit`) |
| `npm test`                 | Run Jest tests                         |
| `npm test -- --runInBand`  | Run Jest tests serially (recommended for CI) |
| `npx tsc --noEmit`         | TypeScript check                       |
| `npx expo export --platform android` | Production Android JS bundle    |
| `npx expo export --platform ios`     | Production iOS JS bundle        |

## Project Structure

```
app/                        # Expo Router file-based routes (75 screens)
├── _layout.tsx             # Root: SafeAreaProvider + AppShell + Stack
├── index.tsx               # Bootstrap entry (resolves /welcome … /home)
├── home.tsx  learn.tsx  games/  profile.tsx   # 4 main tabs
├── games/<game>.tsx        # Fullscreen game boards (20 games)
└── …                       # auth, profile-setup, settings, legal, etc.
src/
├── components/             # Screens & shared UI by feature area
├── features/               # Feature logic (engines, storage, types, mocks)
├── config/i18n.ts          # EN/TA translation dictionary
├── services/bootstrap/     # Splash bootstrapping & first-run routing
├── storage/asyncStorage.ts # Typed AsyncStorage wrapper + canonical keys
├── scripts/                # Standalone dev verification scripts
├── theme/                  # Semantic design tokens (Pearl White/Blue/Purple/Green/Navy)
└── types/                  # Shared types
__mocks__/                  # Jest module mocks (react-native, AsyncStorage)
jest.config.js              # Jest + ts-jest configuration
```

## Frontend / Backend Boundary

This repository is the **frontend only**:

- All "services" (auth, quiz content, riddles, games, notifications, certificates)
  are implemented as local, on-device **demo mocks** — none make network calls.
- Mock data files are named `*.mock.ts` and demo services are explicitly
  labelled frontend-demo in their file headers.
- AsyncStorage is the only persistence layer today. A future backend would
  replace the mock services and add server sync (see `LOCAL_STORAGE_SCHEMA.md`
  for which keys are expected to sync).
- Certificates are locally generated previews. Verification is **not** real and
  must not be claimed until a backend provides it.

## Demo Mode Note

Running the app requires **no** credentials or network. Accounts, OTP codes and
password recovery are simulated locally (development only) so the full flow —
onboarding → language → auth → profile → home — is explorable. OTP values are
never persisted or logged; never log credentials in future code.

## Environment Variables

None are required. If variables are added later, put them in `.env`/`.env.*`
files which are git-ignored; commit a `.env.example` instead. Never commit real
secrets.
