# Vigyaan / VigyaanXpo — Backend Handoff Guide

This document is the authoritative engineering handoff guide for backend developers taking over the **Vigyaan / VigyaanXpo** mobile application. It details the complete frontend architecture, defines every mock/local boundary, maps all storage keys, and provides the typed contracts necessary to seamlessly integrate backend services without rewriting frontend screens.

---

## 1. System & Architecture Overview

```
app/                   Expo Router file-based route definitions (98 routes)
src/
├── components/        Presentational & UI components by domain
├── config/            Bilingual i18n dictionaries (EN/TA) with 100% key parity
├── context/           Global reactive contexts (LanguageContext)
├── features/          Domain logic: pure engines + storage + types + contracts
├── services/          Cross-cutting services: bootstrap, session management
├── storage/           AsyncStorage wrapper + canonical STORAGE_KEYS
└── theme/             Semantic design tokens (Pearl White, Navy, Blue, Purple, Green)
__mocks__/             Unit test mocks (react-native, async-storage)
```

### Architectural Principles
- **Separation of Concerns**: Pure mathematical/rule engines (`*.engine.ts`) are decoupled from storage (`*.storage.ts`) and UI (`src/components/`).
- **Offline-First & Resilient**: All reads and writes are safe against network failure and corrupted local storage.
- **Single Source of Truth**: Each domain entity has exactly one authoritative owner. No duplicate state stores.
- **Zero Sensitive Logging**: Passwords, OTPs, and authentication tokens are never printed to logs or stored unencrypted.

---

## 2. Route Inventory (98 Routes)

Expo Router manages file-based routing under `app/`:
- **Pre-App & Onboarding (7 routes)**: `/`, `/welcome`, `/onboarding`, `/onboarding-grow`, `/onboarding-learn`, `/onboarding-achieve`, `/language`.
- **Authentication (7 routes)**: `/auth-welcome`, `/auth`, `/login`, `/register`, `/otp`, `/forgot-password`, `/reset-password`.
- **Profile Setup (4 routes)**: `/profile-create`, `/profile-academic`, `/profile-complete`, `/profile-setup`.
- **Primary App Tabs (4 parent hubs)**:
  - **Home**: `/home`, `/notifications`, `/explore`, `/search`.
  - **Learn**: `/learn`, `/quiz-setup`, `/quiz-result`, `/quiz-review`, `/progress`, `/progress/[subject]`, `/quizzes`, `/micro-lessons`, `/micro-lesson/[id]`, `/concept-maps`, `/concept-map/[id]`, `/experiment-lab`, `/experiment/[id]`, `/weak-areas`.
  - **Games**: `/games`, `/riddles`, `/riddle-quiz`, `/riddle-result`, `/fun-facts`, `/spin-wheel`, `/escape-room`, `/challenges`, `/mystery-lab`, `/mystery-lab/cases`, `/mystery-lab/case`, `/mystery-lab/result`.
  - **Profile**: `/profile`, `/settings`, `/settings/notifications`, `/achievements`, `/achievement/[id]`, `/certificates`, `/certificate-view`, `/certificate/[id]`, `/science-passport`, `/rewards`, `/points-history`, `/daily-missions`, `/daily-goal`, `/streak`, `/leaderboard`, `/about`, `/account-security`, `/delete-account`, `/faq`, `/feedback`, `/guidelines`, `/help`, `/licenses`, `/privacy`, `/report-problem`, `/terms`, `/safety`, `/safe-science`.
- **20 Interactive Canvas Games**:
  - `/games/circuit-lab`, `/games/dna-sequence`, `/games/element-match`, `/games/gravity-path`, `/games/lab-escape`, `/games/logic-lock`, `/games/magnet-maze`, `/games/memory-matrix`, `/games/mini-sudoku`, `/games/molecule-builder`, `/games/orbit`, `/games/patches`, `/games/pattern-lab`, `/games/queens`, `/games/reaction-sort`, `/games/science-word-grid`, `/games/tango`, `/games/time-machine`, `/games/wend`, `/games/zip`.

---

## 3. Comprehensive Domain Specifications (18 Domains)

### 1. AUTH (Authentication)
- **CURRENT FRONTEND SOURCE**: `src/features/auth/auth.service.ts` (`IAuthService`).
- **CURRENT MOCK/LOCAL REPOSITORY**: `src/features/auth/auth.demo.ts` (`demoAuthAdapter`).
- **DATA SHAPE**:
  - `PasswordLoginPayload`: `{ identifier: string; password: string }`
  - `OtpLoginPayload`: `{ identifier: string }`
  - `RegistrationFormData`: `{ fullName, mobile, email, grade, section, school, city, password, acceptedTerms }`
  - `AuthActionResult`: `{ success: boolean; message?: string; error?: string }`
- **READ OPERATIONS**: Validates inputs against `auth.validation.ts` and matches against demo credentials.
- **WRITE OPERATIONS**: Calls `SessionRepository.saveSession()` and sets `@vigyaan/student_profile`.
- **EXPECTED ERRORS**: Invalid identifier/password format, mismatched passwords, expired OTP, server unreachable.
- **LOADING STATES**: `isSubmitting: boolean` triggers button loading spinner and disables submit buttons.
- **BACKEND REPLACEMENT POINT**: Replace `demoAuthAdapter` calls in `auth.service.ts` with HTTPS calls to `/api/v1/auth/login`, `/register`, `/otp/request`, `/otp/verify`.
- **IMPORTANT ASSUMPTIONS**: Passwords and OTPs must never be logged or stored unencrypted. Rate limiting required on OTP.

### 2. SESSION
- **CURRENT FRONTEND SOURCE**: `src/features/auth/auth.session.ts` (`SessionRepository`).
- **CURRENT MOCK/LOCAL REPOSITORY**: `@vigyaan/auth_session` in `asyncStorage.ts`.
- **DATA SHAPE**: `AuthSession`: `{ userId: string; email?: string; mobileNumber?: string; fullName?: string; isAuthenticated: boolean; authMode: 'password' | 'otp' | 'register' | 'demo'; createdAt: number }`.
- **READ OPERATIONS**: `SessionRepository.getSession()` reads, validates structure via `isValidSession()`, and purges corrupted data.
- **WRITE OPERATIONS**: `SessionRepository.saveSession(session)`, `SessionRepository.clearSession()`.
- **EXPECTED ERRORS**: Corrupted session payload triggers safe eviction and navigation redirect to `/auth-welcome`.
- **LOADING STATES**: Bootstrap splash verifies session asynchronously before transitioning to `/home` or `/welcome`.
- **BACKEND REPLACEMENT POINT**: Replace local storage token with secure storage (`expo-secure-store`) holding JWT Bearer tokens with refresh token rotation.
- **IMPORTANT ASSUMPTIONS**: Expired session must gracefully clear and navigate user to login screen.

### 3. PROFILE
- **CURRENT FRONTEND SOURCE**: `src/features/profile/profile.repository.ts`, `src/features/profile/profile.aggregate.ts`.
- **CURRENT MOCK/LOCAL REPOSITORY**: `@vigyaan/student_profile` and `@vigyaan/student_profile_setup_complete`.
- **DATA SHAPE**: `StoredProfile`: `{ avatarId?: string; fullName?: string; grade?: string; section?: string; school?: string; city?: string; points?: number; streak?: number }`.
- **READ OPERATIONS**: `profileRepository.getProfile()`.
- **WRITE OPERATIONS**: `profileRepository.saveProfile(profile)`, `profileRepository.setSetupComplete()`.
- **EXPECTED ERRORS**: Incomplete profile setup halts navigation and redirects to `/profile-create`.
- **LOADING STATES**: Skeletons shown in Profile summary cards while profile data resolves.
- **BACKEND REPLACEMENT POINT**: Wire `/api/v1/profile/me` (GET/PUT) to fetch and persist student academic profile.
- **IMPORTANT ASSUMPTIONS**: Student academic data is private personal data; minimize and encrypt in transit.

### 4. XP (Experience Points Ledger)
- **CURRENT FRONTEND SOURCE**: `src/features/xp/xp.service.ts`, `src/features/xp/xp.storage.ts`.
- **CURRENT MOCK/LOCAL REPOSITORY**: `@vigyaan/xp_transactions` in `asyncStorage.ts`.
- **DATA SHAPE**: `XpTransaction`: `{ id: string; amount: number; source: string; dedupeKey: string; timestamp: number }`.
- **READ OPERATIONS**: `getXpSummary()`, `getXpTransactions()`, `getTotalXpBalance()`.
- **WRITE OPERATIONS**: `recordXp(input: XpTransactionInput)`. Idempotent against `dedupeKey`.
- **EXPECTED ERRORS**: Duplicate `dedupeKey` exits immediately without error, preventing double-rewarding.
- **LOADING STATES**: Optimistic in-memory update with background async commit.
- **BACKEND REPLACEMENT POINT**: Server-side double-entry points ledger with `/api/v1/xp/transactions`.
- **IMPORTANT ASSUMPTIONS**: Client emits `dedupeKey` (e.g. `quiz-qz-12345-core`); backend must enforce unique constraint on `(user_id, dedupe_key)`.

### 5. PROGRESS
- **CURRENT FRONTEND SOURCE**: `src/features/progress/progress.service.ts`.
- **CURRENT MOCK/LOCAL REPOSITORY**: Aggregates `@vigyaan/quiz_history`, `@vigyaan/micro_lessons_progress`, `@vigyaan/concept_maps_progress`, `@vigyaan/experiment_progress`.
- **DATA SHAPE**: `ProgressSummary`: `{ overallPercentage: number; completedActivitiesCount: number; subjectProgress: Record<string, SubjectProgress> }`.
- **READ OPERATIONS**: `getProgressSummary()`, `getSubjectProgress(subjectId)`.
- **WRITE OPERATIONS**: Derived purely on demand; no direct write to progress state.
- **EXPECTED ERRORS**: Missing activity history returns default 0% without crashing.
- **LOADING STATES**: `useProgressHub` displays animated progress skeletons while aggregating.
- **BACKEND REPLACEMENT POINT**: Server-side analytics rollup endpoint `/api/v1/progress/summary`.
- **IMPORTANT ASSUMPTIONS**: Progress calculations must be identical across mobile platforms.

### 6. STREAK
- **CURRENT FRONTEND SOURCE**: `src/features/streaks/streaks.service.ts` (`StreakService`).
- **CURRENT MOCK/LOCAL REPOSITORY**: Derived purely from `@vigyaan/activity_history`.
- **DATA SHAPE**: `StreakInfo`: `{ currentStreak: number; longestStreak: number; streakFreezeAvailable: boolean; streakHistory: string[] }`.
- **READ OPERATIONS**: `StreakService.getUnifiedStreak()`.
- **WRITE OPERATIONS**: Derived deterministically; activity entries write to activity storage.
- **EXPECTED ERRORS**: Gaps in activity history reset current streak to 0 or 1 if active today.
- **LOADING STATES**: Cached in-memory streak displayed immediately.
- **BACKEND REPLACEMENT POINT**: Timezone-aware server validator `/api/v1/streaks/status` taking `Asia/Kolkata` timezone.
- **IMPORTANT ASSUMPTIONS**: Streaks evaluate on calendar dates (YYYY-MM-DD), not 24-hour sliding windows.

### 7. DAILY GOAL
- **CURRENT FRONTEND SOURCE**: `src/features/daily-goal/dailyGoal.service.ts`.
- **CURRENT MOCK/LOCAL REPOSITORY**: `@vigyaan/daily_goal_state` in `asyncStorage.ts`.
- **DATA SHAPE**: `DailyGoalState`: `{ target: number; completedToday: number; lastActiveDate: string; isCompleted: boolean }`.
- **READ OPERATIONS**: `loadOrInitializeDailyGoal()`.
- **WRITE OPERATIONS**: `recordDailyActivity()`, `updateDailyGoalTarget()`.
- **EXPECTED ERRORS**: Corrupted state re-initializes to default 3 activities per day.
- **LOADING STATES**: Instant display from in-memory cache.
- **BACKEND REPLACEMENT POINT**: `/api/v1/goals/daily` with automatic UTC/IST midnight resets.
- **IMPORTANT ASSUMPTIONS**: Automatically resets progress count when `lastActiveDate !== today`.

### 8. ACHIEVEMENTS
- **CURRENT FRONTEND SOURCE**: `src/features/achievements/achievements.engine.ts`.
- **CURRENT MOCK/LOCAL REPOSITORY**: `@vigyaan/achievements_unlocked` in `asyncStorage.ts`.
- **DATA SHAPE**: `UnlockedAchievementsMap`: `Record<string, { unlockedAt: number; progress: number }>`.
- **READ OPERATIONS**: `getUnlockedAchievements()`, `getBadgeDefinition(badgeId)`.
- **WRITE OPERATIONS**: `evaluateAchievements(events)` evaluates rules and persists new unlocks.
- **EXPECTED ERRORS**: Unknown badge ID handled safely by returning `null`.
- **LOADING STATES**: Pre-cached badge gallery loaded synchronously.
- **BACKEND REPLACEMENT POINT**: Backend event listener evaluating rule criteria on event ingestion.
- **IMPORTANT ASSUMPTIONS**: Celebrations trigger once per newly unlocked badge via `celebration.service.ts`.

### 9. COLLECTIONS
- **CURRENT FRONTEND SOURCE**: `src/features/science-passport/sciencePassport.collectionHelpers.ts`.
- **CURRENT MOCK/LOCAL REPOSITORY**: `@vigyaan/collections_progress` in `asyncStorage.ts`.
- **DATA SHAPE**: `CollectionProgress`: `{ collectionId: string; unlockedItemIds: string[]; completedAt?: number }`.
- **READ OPERATIONS**: `getCollectionProgress(id)`, `getAllCollectionProgress()`.
- **WRITE OPERATIONS**: `unlockCollectionItem(collectionId, itemId)`.
- **EXPECTED ERRORS**: Invalid collection ID returns safe empty list.
- **LOADING STATES**: Instant resolution from in-memory cache.
- **BACKEND REPLACEMENT POINT**: `/api/v1/passport/collections` syncing discovered science artifacts.
- **IMPORTANT ASSUMPTIONS**: Discovery items are unlocked by completing corresponding games and experiments.

### 10. CERTIFICATES
- **CURRENT FRONTEND SOURCE**: `src/features/certificates/certificates.service.ts`.
- **CURRENT MOCK/LOCAL REPOSITORY**: `@vigyaan/certificates_earned` in `asyncStorage.ts`.
- **DATA SHAPE**: `Certificate`: `{ id: string; studentId: string; recipientName: string; title: { en: string; ta: string }; certificateNumber: string; dateEarned: number; grade: string; location: string }`.
- **READ OPERATIONS**: `getCertificateById(id)`, `getCertificates()`.
- **WRITE OPERATIONS**: `issueCertificate(data)`.
- **EXPECTED ERRORS**: Unknown certificate ID displays friendly bilingual not-found card with back button. No fake certificates are ever fabricated.
- **LOADING STATES**: Loading indicator displayed while resolving ID.
- **BACKEND REPLACEMENT POINT**: Public verification endpoint `/api/v1/certificates/verify/{id}` + PDF generation service.
- **IMPORTANT ASSUMPTIONS**: Certificates are immutable once issued.

### 11. NOTIFICATIONS
- **CURRENT FRONTEND SOURCE**: `src/features/notifications/notifications.factory.ts`.
- **CURRENT MOCK/LOCAL REPOSITORY**: `@vigyaan/notification_inbox`, `@vigyaan/notification_preferences`.
- **DATA SHAPE**: `AppNotification`: `{ id: string; type: NotificationType; title: { en: string; ta: string }; body: { en: string; ta: string }; createdAt: number; isRead: boolean; action?: { route: string; params?: Record<string, string> } }`.
- **READ OPERATIONS**: `getNotifications()`, `getUnreadCount()`.
- **WRITE OPERATIONS**: `markAsRead(id)`, `deleteNotification(id)`.
- **EXPECTED ERRORS**: Empty inbox displays friendly bilingual empty state card.
- **LOADING STATES**: Standard activity spinner on initial load.
- **BACKEND REPLACEMENT POINT**: Connect Expo Push Token service to backend notification dispatcher (APNs / FCM).
- **IMPORTANT ASSUMPTIONS**: Tapping notification navigates to `action.route` within Expo Router.

### 12. FAVORITES
- **CURRENT FRONTEND SOURCE**: `src/features/games/games.storage.ts`, `src/features/explore/explore.service.ts`.
- **CURRENT MOCK/LOCAL REPOSITORY**: `@vigyaan/games_favorites`, `@vigyaan/explore_favorites`.
- **DATA SHAPE**: `string[]` of favorite IDs.
- **READ OPERATIONS**: `getFavoriteGames()`, `getExploreFavorites()`.
- **WRITE OPERATIONS**: `toggleFavoriteGame(gameId)`, `toggleExploreFavorite(id)`.
- **EXPECTED ERRORS**: Empty list returns honest empty state.
- **LOADING STATES**: Optimistic UI toggle with zero delay.
- **BACKEND REPLACEMENT POINT**: User preferences sync endpoint `/api/v1/profile/favorites`.
- **IMPORTANT ASSUMPTIONS**: Favorites persist across app restarts.

### 13. RECENT ACTIVITY
- **CURRENT FRONTEND SOURCE**: `src/features/activity/activity.repository.ts`, `src/features/activity/activity.storage.ts`.
- **CURRENT MOCK/LOCAL REPOSITORY**: `@vigyaan/activity_history` in `asyncStorage.ts`.
- **DATA SHAPE**: `ActivityHistoryItem`: `{ id: string; type: ActivityType; dedupeKey: string; title: string; titleTa: string; subtitle: string; subtitleTa: string; timestamp: number; metadata: Record<string, unknown> }`.
- **READ OPERATIONS**: `getActivityHistory()`, `getRecentActivity(limit)`.
- **WRITE OPERATIONS**: `recordActivity(input)`. Deduplicated by `dedupeKey`.
- **EXPECTED ERRORS**: In-memory fallback if disk storage fails.
- **LOADING STATES**: Skeletons shown on Home 2.0 Recent Activity card.
- **BACKEND REPLACEMENT POINT**: Append-only activity stream endpoint `/api/v1/activities`.
- **IMPORTANT ASSUMPTIONS**: The activity ledger is the canonical trigger for XP awards, streaks, daily goals, and achievements.

### 14. LEADERBOARD
- **CURRENT FRONTEND SOURCE**: `src/features/leaderboard/leaderboard.repository.ts`.
- **CURRENT MOCK/LOCAL REPOSITORY**: `DemoLeaderboardRepository` in `src/features/leaderboard/leaderboard.repository.ts`.
- **DATA SHAPE**: `LeaderboardData`: `{ entries: LeaderboardEntry[]; userRank: number; scope: LeaderboardScope; period: LeaderboardPeriod }`.
- **READ OPERATIONS**: `leaderboardRepository.getLeaderboard(scope, period)`.
- **WRITE OPERATIONS**: Read-only from UI; points calculated from XP balance.
- **EXPECTED ERRORS**: Network failure shows bilingual retry error state.
- **LOADING STATES**: Fullscreen skeleton while fetching ranking data.
- **BACKEND REPLACEMENT POINT**: `/api/v1/leaderboards?scope={class|school|district}&period={weekly|monthly|allTime}`.
- **IMPORTANT ASSUMPTIONS**: The current student identity and score must be dynamically derived from `SessionRepository` and `getTotalXpBalance()`.

### 15. GAMES
- **CURRENT FRONTEND SOURCE**: `src/features/games/games.registry.ts`.
- **CURRENT MOCK/LOCAL REPOSITORY**: Static game registry of 20 games + datasets under `src/features/games/<game>/`.
- **DATA SHAPE**: `GameDefinition`: `{ id: GameId; title: string; titleTa: string; subtitle: string; subtitleTa: string; icon: string; category: GameCategory; levelCount: number }`.
- **READ OPERATIONS**: `getGameDefinition(id)`, `getAllGames()`.
- **WRITE OPERATIONS**: Read-only static registry.
- **EXPECTED ERRORS**: Invalid game ID redirects safely to `/games` hub.
- **LOADING STATES**: Instant client-side asset loading.
- **BACKEND REPLACEMENT POINT**: Optional game catalogue management; games remain bundled on-device for offline performance.
- **IMPORTANT ASSUMPTIONS**: Game levels must remain playable 100% offline.

### 16. GAME RESULTS & REWARDS
- **CURRENT FRONTEND SOURCE**: `src/features/games/games.storage.ts`.
- **CURRENT MOCK/LOCAL REPOSITORY**: `@vigyaan/games_progress` in `asyncStorage.ts`.
- **DATA SHAPE**: `GameProgress`: `{ gameId: string; levels: Record<string, GameLevelProgress>; totalScore: number }`.
- **READ OPERATIONS**: `getGameProgress(gameId)`, `getAllGamesProgress()`.
- **WRITE OPERATIONS**: `saveGameLevelCompletion(gameId, levelId, data)`. Emits `recordActivity`.
- **EXPECTED ERRORS**: Corrupted level data defaults to uncompleted level without crashing.
- **LOADING STATES**: Immediate feedback animation on level pass.
- **BACKEND REPLACEMENT POINT**: Level completion telemetry verification endpoint `/api/v1/games/progress`.
- **IMPORTANT ASSUMPTIONS**: XP is awarded once per level using deterministic dedupe keys (`game:<id>:<levelId>:completed`).

### 17. LEARNING PROGRESS
- **CURRENT FRONTEND SOURCE**: `src/features/micro-lessons/`, `src/features/concept-maps/`, `src/features/experiment-lab/`.
- **CURRENT MOCK/LOCAL REPOSITORY**: `@vigyaan/micro_lessons_progress`, `@vigyaan/concept_maps_progress`, `@vigyaan/experiment_progress`.
- **DATA SHAPE**: `Record<string, { completed: boolean; completedAt: number; score?: number }>`.
- **READ OPERATIONS**: `getAllProgress()`, `getItemProgress(id)`.
- **WRITE OPERATIONS**: `markComplete(id)`, `saveProgress(id, data)`.
- **EXPECTED ERRORS**: Safe default `{ completed: false }` on missing records.
- **LOADING STATES**: Progress indicators update reactively.
- **BACKEND REPLACEMENT POINT**: Sync syllabus completion with backend LMS `/api/v1/curriculum/progress`.
- **IMPORTANT ASSUMPTIONS**: Dedupe keys guarantee single XP award on first completion.

### 18. LANGUAGE PREFERENCE
- **CURRENT FRONTEND SOURCE**: `src/context/LanguageContext.tsx` (`useLanguage`).
- **CURRENT MOCK/LOCAL REPOSITORY**: `@vigyaan/user_language` in `asyncStorage.ts`.
- **DATA SHAPE**: `'en' | 'ta'`.
- **READ OPERATIONS**: `useLanguage().language`.
- **WRITE OPERATIONS**: `useLanguage().setLanguage(lang)`, `toggleLanguage()`.
- **EXPECTED ERRORS**: Invalid language code safely defaults to `'en'`.
- **LOADING STATES**: Zero-latency in-memory state toggle; persists asynchronously.
- **BACKEND REPLACEMENT POINT**: Sync preferred language to student profile `/api/v1/profile` and pass in `Accept-Language` header.
- **IMPORTANT ASSUMPTIONS**: Switching language must never force an application reload.

---

## 4. Development Credentials for Testing

- **Email**: `demo@vigyaan.app`
- **Password**: `VigyaanDemo@123`
- **OTP**: `123456`

---

## 5. Summary of Storage Keys & Schema

All 44 keys are defined in `src/storage/asyncStorage.ts` under `@vigyaan/*`:
Refer to [`LOCAL_STORAGE_SCHEMA.md`](./LOCAL_STORAGE_SCHEMA.md) for full JSON schemas, defaults, and eviction rules.
