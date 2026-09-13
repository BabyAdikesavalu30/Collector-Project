# FRONTEND TO BACKEND INTEGRATION MAP

This document maps every frontend domain in the **Vigyaan / VigyaanXpo** mobile application to its corresponding frontend contract, repository boundary, local/demo data source, and future backend replacement point.

---

## 1. Domain Architecture Overview

```
                      CURRENT FRONTEND ARCHITECTURE
                      
┌────────────────────────────────────────────────────────┐
│                   UI Screens / Pages                   │
│                       (app/*.tsx)                      │
└───────────────────────────┬────────────────────────────┘
                            │ (Calls Domain Repositories/Services)
                            ▼
┌────────────────────────────────────────────────────────┐
│      Frontend Domain Models & Repository Contracts     │
│                   (src/features/*)                     │
└─────────────┬────────────────────────────┬─────────────┘
              │                            │
      (Local Mode / Offline)        (Future Production)
              ▼                            ▼
┌───────────────────────────┐  ┌─────────────────────────┐
│ Local / Mock Implementations │  │ Backend API Adapters    │
│ (AsyncStorage / Demo Data)│  │ (HTTPS / WebSockets)    │
└───────────────────────────┘  └─────────────────────────┘
```

---

## 2. Comprehensive Domain Integration Map

| Domain | Frontend Owner / Interface | Local / Demo Implementation | Local Persistence Key | Future Backend Replacement Point |
| :--- | :--- | :--- | :--- | :--- |
| **Auth & Credentials** | `IAuthService` ([`auth.service.ts`](./src/features/auth/auth.service.ts)) | `demoAuthAdapter` ([`auth.demo.ts`](./src/features/auth/auth.demo.ts)) | In-memory session staging (passwords stripped) | Replace `demoAuthAdapter` with `BackendAuthAdapter` calling `/auth/login`, `/auth/register` |
| **Session** | `SessionRepository` ([`auth.session.ts`](./src/features/auth/auth.session.ts)) | `SessionRepository` | `@vigyaan/auth_session` | Replace local session with `expo-secure-store` holding JWT Bearer tokens |
| **Registration** | `IRegistrationService` ([`registration.service.ts`](./src/features/auth/registration.service.ts)) | `demoAuthAdapter.registerStudent()` | Staged in memory (5 min TTL), persists to `@vigyaan/student_profile` on OTP verify | Route to backend registration endpoint; server hashes password and issues OTP |
| **OTP Verification** | `IOtpService` ([`otp.service.ts`](./src/features/auth/otp.service.ts)) | `demoAuthAdapter.verifyOtp()` (Code: `123456`) | Transient memory | Route to backend OTP verification endpoint; server issues session JWT |
| **Student Profile** | `profileRepository` ([`profile.repository.ts`](./src/features/profile/profile.repository.ts)) | `LocalProfileRepository` | `@vigyaan/student_profile`, `@vigyaan/student_profile_setup_complete` | Replace `LocalProfileRepository` with `BackendProfileRepository` calling `GET/PUT /api/v1/profile` |
| **Profile Aggregation** | `loadProfileView()` ([`profile.aggregate.ts`](./src/features/profile/profile.aggregate.ts)) | Multi-source aggregator across local stores | Multi-key read | Server-side profile aggregation API `/api/v1/profile/summary` or client composition |
| **XP & Points Ledger** | `xpService` ([`xp.service.ts`](./src/features/xp/xp.service.ts)) | `xpStorage` | `@vigyaan/xp_transactions` | Client sends `dedupeKey`; backend enforces unique constraint on `(user_id, dedupe_key)` |
| **Activity Event Hub** | `recordActivity()` ([`activity.repository.ts`](./src/features/activity/activity.repository.ts)) | `activity.storage.ts` | `@vigyaan/activity_history` | Background event ingestion pipeline `/api/v1/events/activity` |
| **Daily Streak** | `getUnifiedStreak()` ([`activity.repository.ts`](./src/features/activity/activity.repository.ts)) | `streaks.engine.ts` | Computed from `@vigyaan/activity_history` | Server-authoritative streak engine with timezone support |
| **Daily Missions** | `getMissionsSnapshot()` ([`missions.ts`](./src/features/missions/missions.ts)) | `missions.storage.ts` | `@vigyaan/missions_state` | Daily challenge scheduler `/api/v1/missions/daily` |
| **Achievements** | `getUnlockedAchievements()` ([`achievements.storage.ts`](./src/features/achievements/achievements.storage.ts)) | `achievements.engine.ts` | `@vigyaan/achievements_unlocked` | Server achievement unlock evaluator on event ingestion |
| **Certificates** | `recomputeAndPersistCertificates()` ([`certificates.storage.ts`](./src/features/certificates/certificates.storage.ts)) | `certificates.engine.ts` | `@vigyaan/certificates_earned` | Verified digital certificates with cryptographic signature & PDF generator |
| **Leaderboard** | `LeaderboardRepository` ([`leaderboard.repository.ts`](./src/features/leaderboard/leaderboard.repository.ts)) | `DemoLeaderboardRepository` | In-memory deterministic generator | Server leaderboard query `/api/v1/leaderboard?scope=...&period=...` |
| **Quizzes** | `saveQuizResult()` ([`quiz-history.storage.ts`](./src/features/quiz/quiz-history.storage.ts)) | Static question bank + local history storage | `@vigyaan/quiz_history` | Client submits answers; backend scores and commits attempt to student record |
| **20 Science Games** | `saveLevelCompletion()` ([`games.storage.ts`](./src/features/games/games.storage.ts)) | Local level progress engine | `@vigyaan/games_progress` | Game session verification and score sync `/api/v1/games/progress` |
| **Curriculum Content** | Static catalogs (`micro-lessons`, `concept-maps`, `experiments`) | In-repo curated content | Read-only static bundles | Optional CMS / CDN delivery for remote updates |
| **Learning Progress** | `ProgressService` ([`progress.service.ts`](./src/features/progress/progress.service.ts)) | Aggregates local stores | `@vigyaan/micro_lessons_progress`, `@vigyaan/concept_maps_progress`, `@vigyaan/experiment_progress` | Unified progress sync `/api/v1/progress` |
| **Notifications** | `notifications.storage.ts`, `notifications.factory.ts` | Local event-driven inbox | `@vigyaan/notifications_state`, `@vigyaan/notification_inbox` | Remote Push Notification provider (APNs / FCM) + sync endpoint |
| **Search Catalog** | `buildSearchIndex()` ([`search.indexer.ts`](./src/features/search/search.indexer.ts)) | In-memory search index | `@vigyaan/recent_searches` | Client-side index suffices; optional remote elasticsearch if content expands |
| **Settings & Preferences**| `settingsRepository` ([`settings.repository.ts`](./src/features/settings/settings.repository.ts)) | `settings.storage.ts` | `@vigyaan/settings` | Device-level preference; optional cloud sync for cross-device preferences |

---

## 3. Guarantees Provided by Frontend

1. **Clean Decoupling**: Screens never communicate directly with remote endpoints or database queries. All interactions flow through typed feature repositories.
2. **Canonical Models**: All UI components consume standardized frontend domain models, shielding UI from API payload shifts.
3. **Offline Resilience**: The app continues to function fully in offline mode using local fallback repositories.
4. **Zero Cleartext Credentials**: Passwords and OTP codes are strictly isolated and never stored in AsyncStorage.
