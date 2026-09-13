# Vigyaan Mobile: Source-of-Truth Specification

This document defines the canonical source of truth for all primary domains across the **Vigyaan / VigyaanXpo** React Native mobile application. To maintain strict data integrity and prevent conflicting state or duplicate reward counters, each domain is owned and mutated by exactly one authoritative repository/service. Derived and aggregated views read from these canonical sources without maintaining parallel state.

---

## Source-of-Truth Matrix

| Domain | Source of Truth | Primary Storage Key | Read By | Written By | Invariants & Guarantees |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Session** | `SessionRepository` / `auth.service.ts` | `@vigyaan/auth_session` | AppShell, Boot flow, Profile, Science Passport, Navigation Gate | `authService.login`, `authService.register`, `authService.logout` | Synchronous in-memory caching backed by AsyncStorage. Cleared completely upon logout. |
| **Profile** | `storage` (`@vigyaan/student_profile`) | `@vigyaan/student_profile` | Profile, Home, Science Passport, Certificates, Progress | Profile Setup, Academic Setup, Profile Edit, `authService.logout` (cleared) | Single identity record for name, grade, school, district, and section. No duplicate profile stores. |
| **Activity History** | `activity.storage.ts` (`recordActivity`) | `@vigyaan/activity_history` | Home, Science Passport, Profile, Progress, Streaks, Achievements, Missions | Canonical `recordActivity` orchestrator | Every activity completion is logged with a stable `dedupeKey`. Idempotent: duplicate events are dropped. |
| **XP / Ledger** | `xp.storage.ts` (`recordXp`) | `@vigyaan/xp_transactions` | Profile, Science Passport, Home, Rewards | `recordXp` (invoked atomically by `recordActivity` and mission claims) | Append-only transaction ledger. Balance is computed as sum of valid ledger transactions with duplicate protection. |
| **Streak** | `streaks.service.ts` / `streaks.engine.ts` | Dynamically derived from `@vigyaan/activity_history` | Home, Science Passport, Profile, Streak Screen (`/streak`) | `StreakService.getUnifiedStreak()` (derived on-demand) | Pure mathematical calculation over local calendar dates (`YYYY-MM-DD`). Zero UTC drift; multiple same-day activities count as 1 active day. |
| **Progress** | `progress.service.ts` | Aggregated domain progress stores | Progress Screen (`/progress`), Home | Aggregates `microLessons`, `conceptMaps`, `experiment`, and `quiz` stores | Pure aggregation over underlying feature repositories. Does not maintain duplicate progress tallies. |
| **Daily Goal** | `dailyGoal.storage.ts` / `dailyGoal.service.ts` | `@vigyaan/daily_goal_state` | Home, Daily Goal Screen (`/daily-goal`), Missions | `dailyGoalService.onActivityCompleted`, `claimDailyGoalReward` | 3 daily goals evaluated against qualified activities. Date rollover resets daily target cleanly without data loss. |
| **Achievements** | `achievements.storage.ts` / `achievements.engine.ts` | `@vigyaan/achievements_unlocked` | Home, Science Passport, Profile, Achievements Gallery (`/achievements`) | `evaluateAndSyncAchievements`, `persistUnlockedAchievements` | 43 data-driven badges evaluated deterministically. Unlocks are idempotent and rewarded exactly once. |
| **Collections** | `sciencePassport.collectionHelpers.ts` | `@vigyaan/collections_progress` | Home, Science Passport, Explore (`/explore`) | Collection unlock helpers / discovery evaluations | 5 collectible categories (Astronomy, Physics, Chemistry, Biology, Technology). Atomic unlocked ID set. |
| **Certificates** | `certificates.storage.ts` | `@vigyaan/certificates_earned` | Home, Science Passport, Profile, Certificates Screen (`/certificates`) | `recomputeAndPersistCertificates` | Issued based on verified milestone eligibility. Deterministic certificate ID based on student and subject/grade. |
| **Notifications** | `notifications.factory.ts` / `notifications_storage.ts` | `@vigyaan/notification_inbox` | Notifications Screen (`/notifications`), Header bell indicator, Profile | `createNotification` | In-app notification queue deduplicated by stable event ID. No notification storms; read/delete states tracked locally. |
| **Celebrations** | `celebration.service.ts` | `@vigyaan/celebration_state` | `<CelebrationOverlay>` (mounted globally in `AppShell`) | `celebrationService.trigger*` | Priority queue (Toast vs Modal vs Confetti). Deduplicated in memory and storage to prevent replay on remount. |
| **Favorites** | `explore.storage.ts` | `@vigyaan/explore_favorites` | Explore (`/explore`), Search (`/search`) | `toggleFavorite` | Set of favorited content IDs (scientists, inventions, topics) with toggle semantics. |
| **Recent Activity** | `activity.storage.ts` | `@vigyaan/activity_history` (via `getRecentActivity(limit)`) | Home Dashboard, Profile Screen, Points History | `recordActivity` | Sliced and sorted view of the canonical activity history. Never maintains separate storage. |
| **Language** | `LanguageContext` (`LanguageProvider`) | `@vigyaan/user_language` | Entire Application (Headers, Navigation, Forms, Games, Quizzes, Cards) | `useLanguage().setLanguage()`, `toggleLanguage()` | Single reactive runtime context backed by immediate in-memory state and asynchronous persistence to `@vigyaan/user_language`. 100% EN/TA parity. |


---

## Architectural Guarantees

1. **No Parallel Engines**: Features never duplicate calculation logic. For example, streak numbers across Home, Profile, Science Passport, and the Streak Calendar all resolve from `StreakService.getUnifiedStreak()`.
2. **Deterministic Deduplication**: Event emission format `act-${feature}:${id}:${action}` ensures that rapid button taps, screen re-renders, and network switches never write duplicate data or double-reward XP.
3. **Graceful Storage Degradation**: If storage corruption occurs on an untrusted device, repositories fall back to empty structures or sanitized defaults without throwing exceptions or crashing the UI.
4. **Session Boundary Enforcement**: When `authService.logout()` executes, all identity and private session keys are wiped immediately.
