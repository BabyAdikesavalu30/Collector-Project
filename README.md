# Vigyaan (VigyaanXpo) — Mobile App

**Vigyaan / VigyaanXpo** is a comprehensive, bilingual (English & Tamil) science-learning mobile application designed for Tamil Nadu school students in Grades 6–12. The application integrates curriculum-aligned quizzes, science riddles, a 20-game interactive universe, forensic mystery labs, micro-lessons, concept maps, virtual experiments, weak area diagnosis, daily goal tracking, consistency streaks, science collections, achievements, and collectible certificates.

> ⚠️ **Repository status: Frontend Release Ready (Offline Demo Mode).**  
> All services (authentication, activity ledger, streaks, quizzes, game progression, celebrations, and certificates) operate locally on device via resilient in-memory cached AsyncStorage. There is no remote backend connected yet. For future backend service specifications, see [`BACKEND_HANDOFF.md`](./docs/backend/BACKEND_HANDOFF.md) and [`BACKEND_API_REQUIREMENTS.md`](./docs/backend/BACKEND_API_REQUIREMENTS.md).

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
assets/                     # Static media & institutional assets
docs/                       # Comprehensive documentation & verification archive
├── architecture/           # System design, domain specs, storage & routing
├── backend/                # API requirements, contracts & handoff specifications
├── qa/                     # Comprehensive QA test matrices & verification reports
├── release/                # Production release checklist, manifest & bug log
└── history/                # Milestones, discovery findings & phase completion reports
__mocks__/                  # Jest module mocks (react-native, AsyncStorage)
```

---

## Documentation Directory

All comprehensive project documentation is organized under [`docs/`](./docs/):

### Architecture & System Design ([`docs/architecture/`](./docs/architecture/))
- [`SOURCE_OF_TRUTH.md`](./docs/architecture/SOURCE_OF_TRUTH.md): Master specification of all 14 application domains and single sources of truth.
- [`CROSS_FEATURE_ARCHITECTURE.md`](./docs/architecture/CROSS_FEATURE_ARCHITECTURE.md): Canonical event flow, deduplication engine, and centralized celebration architecture.
- [`LOCAL_STORAGE_SCHEMA.md`](./docs/architecture/LOCAL_STORAGE_SCHEMA.md): Complete schema of all 44 `@vigyaan/*` storage keys.
- [`ROUTES.md`](./docs/architecture/ROUTES.md): Complete catalog of all 98 routes, access rules, and navigation mapping.
- [`STORAGE_AUDIT.md`](./docs/architecture/STORAGE_AUDIT.md): Storage key audit and ownership matrix.

### Backend Integration & Contracts ([`docs/backend/`](./docs/backend/))
- [`FRONTEND_HANDOFF.md`](./docs/backend/FRONTEND_HANDOFF.md): Engineering handoff guide for backend developers and maintainers.
- [`FRONTEND_BACKEND_CONTRACT.md`](./docs/backend/FRONTEND_BACKEND_CONTRACT.md): Authoritative frontend-backend API contract.
- [`FRONTEND_BACKEND_INTEGRATION_MAP.md`](./docs/backend/FRONTEND_BACKEND_INTEGRATION_MAP.md): Component to backend API endpoint mapping.
- [`BACKEND_HANDOFF.md`](./docs/backend/BACKEND_HANDOFF.md): Detailed backend contract handoff guide.
- [`BACKEND_API_REQUIREMENTS.md`](./docs/backend/BACKEND_API_REQUIREMENTS.md): REST API specification for future cloud integration.
- [`BACKEND_FRONTEND_COMPATIBILITY.md`](./docs/backend/BACKEND_FRONTEND_COMPATIBILITY.md): Compatibility verification matrix.
- [`BACKEND_INTEGRATION_STATUS.md`](./docs/backend/BACKEND_INTEGRATION_STATUS.md): Current backend readiness and integration status.

### Quality Assurance & Testing ([`docs/qa/`](./docs/qa/))
- [`QA_MATRIX.md`](./docs/qa/QA_MATRIX.md): Final per-feature/per-route QA status matrix.
- [`DEVICE_QA_MATRIX.md`](./docs/qa/DEVICE_QA_MATRIX.md): Device compatibility and responsive breakpoint matrix.
- [`RESPONSIVE_QA_MATRIX.md`](./docs/qa/RESPONSIVE_QA_MATRIX.md): Responsive layout verification across screen sizes.
- [`USER_JOURNEY_QA_MATRIX.md`](./docs/qa/USER_JOURNEY_QA_MATRIX.md): End-to-end student user journey test matrix.
- [`FINAL_FRONTEND_QA_REPORT.md`](./docs/qa/FINAL_FRONTEND_QA_REPORT.md): Comprehensive QA execution results and evidence.
- [`FINAL_REGRESSION_MATRIX.md`](./docs/qa/FINAL_REGRESSION_MATRIX.md): Full regression test coverage matrix.

### Release Management ([`docs/release/`](./docs/release/))
- [`RELEASE_CHECKLIST.md`](./docs/release/RELEASE_CHECKLIST.md): Production release readiness checklist.
- [`RELEASE_MANIFEST.md`](./docs/release/RELEASE_MANIFEST.md): Release manifest and verification metrics.
- [`FINAL_RELEASE_REPORT.md`](./docs/release/FINAL_RELEASE_REPORT.md): Final frontend release sign-off report.
- [`FINAL_BUG_LOG.md`](./docs/release/FINAL_BUG_LOG.md): Log of every confirmed defect from the stabilization passes.
- [`PHASE_7_RELEASE_PACKAGING_REPORT.md`](./docs/release/PHASE_7_RELEASE_PACKAGING_REPORT.md): Release packaging and artifact audit.
- [`PHASE_8_FINAL_VERIFICATION_REPORT.md`](./docs/release/PHASE_8_FINAL_VERIFICATION_REPORT.md): Final comprehensive verification report.
- [`REPOSITORY_CLEANUP_AUDIT.md`](./docs/release/REPOSITORY_CLEANUP_AUDIT.md): Complete repository structural and dependency inventory.
- [`FINAL_REPOSITORY_CLEANUP_REPORT.md`](./docs/release/FINAL_REPOSITORY_CLEANUP_REPORT.md): Final repository cleanup and archive verification report.

### Project History & Audits ([`docs/history/`](./docs/history/))
- [`PHASE_1_FINDINGS.md`](./docs/history/PHASE_1_FINDINGS.md): Initial repository discovery and baseline findings.
- [`PHASE_2_COMPLETION_REPORT.md`](./docs/history/PHASE_2_COMPLETION_REPORT.md): Architecture consolidation milestone report.
- [`PHASE_3_UI_UX_COMPLETION_REPORT.md`](./docs/history/PHASE_3_UI_UX_COMPLETION_REPORT.md): UI/UX hardening milestone report.
- [`PHASE_4_AUTH_STORAGE_SECURITY_COMPLETION_REPORT.md`](./docs/history/PHASE_4_AUTH_STORAGE_SECURITY_COMPLETION_REPORT.md): Auth, storage & security completion report.
- [`PHASE_5_FRONTEND_INTEGRATION_READINESS_REPORT.md`](./docs/history/PHASE_5_FRONTEND_INTEGRATION_READINESS_REPORT.md): Backend integration readiness report.
- [`PRE_GITHUB_AUDIT.md`](./docs/history/PRE_GITHUB_AUDIT.md): Pre-GitHub audit report.
- [`PROJECT_AUDIT.md`](./docs/history/PROJECT_AUDIT.md): Phase 1 project audit and inventory.

---

## Demo Mode & Security Notice

- Running the application requires **no network connection or external credentials**.
- Authentication, OTP verification, password recovery, and student profiles operate locally in demo mode.
- **Security Notice**: Demo credentials (`demo@vigyaan.app` / `VigyaanDemo@123`, OTP `123456`) are strictly for local development and QA exploration. Passwords, OTP codes, and tokens are never persisted or logged. Never commit production credentials to this repository.

