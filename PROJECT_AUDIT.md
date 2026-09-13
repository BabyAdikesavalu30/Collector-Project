# PROJECT_AUDIT.md

**Project:** Vigyaan / VigyaanXpo  
**Audit Phase:** 1 — Discovery  
**Date:** September 13, 2026  
**Auditor:** Buffy (Codebuff Agent)

---

## Project Summary

| Metric | Value |
|--------|-------|
| Technology | Expo SDK 54, React Native 0.81.5, TypeScript 5.9, Expo Router 6 |
| Route files (app/) | 98 |
| Source files (src/) | 826 (including 89 test files) |
| Test files | 89 |
| Test cases | 1410 |
| Feature modules (src/features/) | 39 |
| Component directories (src/components/) | 42 |
| i18n translation files | 58 (29 EN + 29 TA) |
| Storage keys (unique) | 43 |
| Games | 20 + Fun Facts + Spin Wheel + Mystery Lab + Riddles |
| Languages | English, Tamil |

## Build Status (Verified This Session)

| Check | Result | Evidence |
|-------|--------|----------|
| TypeScript (`tsc --noEmit`) | **PASS** | 0 errors |
| Jest (full suite) | **PASS** | 89/89 suites, 1410/1410 tests |
| Expo Doctor | NOT VERIFIED | Environment limitation |
| Android build | NOT VERIFIED | Environment limitation |
| iOS build | NOT VERIFIED | Environment limitation |
| Physical devices | NOT VERIFIED | No device available |

---

## Architecture Overview

```
app/_layout.tsx
├── SafeAreaProvider
├── LanguageProvider (EN/TA)
├── AppShell
│   ├── FeatureErrorBoundary
│   ├── Stack Navigator (98 routes)
│   ├── AppBottomNav (4 tabs: Home, Learn, Games, Profile)
│   └── CelebrationOverlay
```

### Provider Hierarchy
1. `SafeAreaProvider` — device safe areas
2. `LanguageProvider` — bilingual state (EN/TA), persisted to AsyncStorage
3. `AppShell` — bottom nav, error boundary, celebration overlay

### Navigation
- **4 canonical tabs:** Home, Learn, Games, Profile
- **Bottom nav hidden on:** auth flow, onboarding, profile setup, fullscreen games/quiz
- **Auth guard:** Session check on protected routes (home, profile, leaderboard, etc.)

### Feature Modules (src/features/)
```
auth/          — Login, register, OTP, session, demo adapter
activity/      — Activity history ledger
xp/            — XP transactions, engine, storage
streaks/       — Streak calculation, calendar
levels/        — Science level definitions
achievements/  — Badge definitions, unlock engine
certificates/  — Certificate eligibility, storage
missions/      — Daily missions
daily-goal/    — Daily goal tracker
progress/      — Subject progress engine
quiz/          — Quiz engine, question bank, history
learn/         — Curriculum content, pathways
micro-lessons/ — 2-minute science lessons
concept-maps/  — Interactive concept maps
experiment-lab/— Virtual experiments
games/         — 20 game engines, storage, registry
mystery-lab/   — Science mystery investigation
riddles/       — Riddle categories, scoring
fun-facts/     — Science facts, quiz mode
spin-wheel/    — Daily spin wheel
challenges/    — Daily challenges
home/          — Dashboard (dual service: legacy + Home 2.0)
profile/       — Profile aggregation
settings/      — App preferences
notifications/ — Mock + generated inbox
search/        — Cross-feature search
recommendations/ — Rule-based recommendations
weak-areas/    — Focus area diagnosis
science-passport/ — Journey summary
celebration/   — Achievement celebrations
feedback/      — Hint engine
collections/   — Science collections
accessibility/ — Accessibility contracts
responsive/    — Responsive layout engine
```

---

## Route Inventory (98 Routes)

### Pre-App / Onboarding (Nav Hidden)
| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/` | Bootstrap gate → resolves destination | No |
| `/welcome` | Welcome screen | No |
| `/onboarding` | 4-step wizard | No |
| `/onboarding-grow` | Onboarding step 2 | No |
| `/onboarding-learn` | Onboarding step 3 | No |
| `/onboarding-achieve` | Onboarding step 4 | No |
| `/language` | EN/TA selection | No |

### Authentication (Nav Hidden)
| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/auth` | Auth entry | No |
| `/auth-welcome` | Auth welcome | No |
| `/login` | Login (password + OTP) | No |
| `/register` | Registration | No |
| `/otp` | OTP verification | No |
| `/forgot-password` | Password recovery | No |
| `/reset-password` | Password reset | No |

### Profile Setup (Nav Hidden)
| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/profile-create` | Name/avatar | Yes |
| `/profile-academic` | Grade/section/school | Yes |
| `/profile-complete` | Setup complete | Yes |
| `/profile-setup` | Setup entry | Yes |

### Home Tab
| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/home` | Dashboard | Yes |
| `/notifications` | Notification inbox | Yes |
| `/explore` | Explore science | Yes |
| `/search` | Search | Yes |

### Learn Tab
| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/learn` | Curriculum hub | Yes |
| `/quizzes` | Quiz list | Yes |
| `/quiz-setup` | Quiz configuration | Yes |
| `/quiz` | Quiz engine (fullscreen) | Yes |
| `/quiz-result` | Quiz results | Yes |
| `/quiz-review` | Quiz review | Yes |
| `/progress` | Progress overview | Yes |
| `/progress/[subject]` | Subject detail | Yes |
| `/micro-lessons` | Micro lesson list | Yes |
| `/micro-lesson/[id]` | Micro lesson detail | Yes |
| `/concept-maps` | Concept map list | Yes |
| `/concept-map/[id]` | Concept map detail | Yes |
| `/experiment-lab` | Experiment list | Yes |
| `/experiment/[id]` | Experiment detail | Yes |
| `/weak-areas` | Focus areas | Yes |

### Games Tab
| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/games` | Games universe hub | Yes |
| `/games/zip` through `/games/magnet-maze` | 20 game boards (fullscreen) | Yes |
| `/riddles` | Riddle categories | Yes |
| `/riddle-quiz` | Riddle solving | Yes |
| `/riddle-result` | Riddle results | Yes |
| `/fun-facts` | Fun facts | Yes |
| `/spin-wheel` | Daily spin | Yes |
| `/challenges` | Daily challenges | Yes |
| `/escape-room` | Escape room | Yes |
| `/mystery-lab` | Mystery lab hub | Yes |
| `/mystery-lab/cases` | Case list | Yes |
| `/mystery-lab/case` | Active case (fullscreen) | Yes |
| `/mystery-lab/result` | Case result | Yes |

### Profile Tab
| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/profile` | Profile center | Yes |
| `/settings` | App settings | Yes |
| `/settings/notifications` | Notification settings | Yes |
| `/achievements` | Achievement list | Yes |
| `/achievement/[id]` | Achievement detail | Yes |
| `/certificates` | Certificate list | Yes |
| `/certificate-view` | Certificate view | Yes |
| `/certificate/[id]` | Certificate detail | Yes |
| `/rewards` | Rewards center | Yes |
| `/points-history` | XP history | Yes |
| `/daily-missions` | Daily missions | Yes |
| `/daily-goal` | Daily goal | Yes |
| `/streak` | Streak calendar | Yes |
| `/science-passport` | Science passport | Yes |
| `/leaderboard` | Leaderboard | Yes |
| `/about` | About | Yes |
| `/account-security` | Security | Yes |
| `/delete-account` | Account deletion | Yes |
| `/faq` | FAQ | Yes |
| `/feedback` | Feedback | Yes |
| `/guidelines` | Guidelines | Yes |
| `/help` | Help | Yes |
| `/licenses` | Licenses | Yes |
| `/privacy` | Privacy policy | Yes |
| `/report-problem` | Report problem | Yes |
| `/terms` | Terms & conditions | Yes |
| `/safety` | Safety | Yes |
| `/safe-science` | Safe science | Yes |

---

## Source-of-Truth Audit

| Domain | Canonical Owner | Repository | Storage Key | UI Consumer | Derived From |
|--------|----------------|------------|-------------|-------------|-------------|
| Session | Auth | `SessionRepository` | `AUTH_SESSION` | All auth guards | — |
| Profile | Auth/Profile | `storage` direct | `STUDENT_PROFILE` | Home, Profile, Passport | — |
| Activity | Activity | `activity.repository` | `ACTIVITY_HISTORY` | Home, Profile, Passport | — |
| XP | XP | `xp.storage` | `XP_TRANSACTIONS` | Home, Profile, Rewards | Activity |
| Progress | Progress | `progress.service` | derived from activity | Learn, Profile | Activity + Quiz |
| Streak | Streaks | `StreakService` | derived from activity | Home, Profile, Passport | Activity |
| Daily Goal | Daily Goal | `dailyGoal.hooks` | `DAILY_GOAL_STATE` | Home, Profile | Activity |
| Achievements | Achievements | `achievements.storage` | `ACHIEVEMENTS_UNLOCKED` | Profile, Home | Activity + Games |
| Certificates | Certificates | `certificates.storage` | `CERTIFICATES_EARNED` | Profile, Home | Achievements |
| Notifications | Notifications | `notifications.factory` | `NOTIFICATION_INBOX` | Notifications screen | Events |
| Celebrations | Celebration | `celebration.service` | `CELEBRATION_STATE` | Overlay | Achievements + Certs |
| Favorites | Explore/Games | direct storage | `EXPLORE_FAVORITES`, `GAMES_FAVORITES` | Explore, Games | — |
| Recent Activity | Activity | `activity.repository` | `ACTIVITY_HISTORY` | Home, Profile | — |
| Language | Language | `LanguageContext` | `USER_LANGUAGE` | All screens | — |

### Competing Sources of Truth
| Issue | Files | Impact |
|-------|-------|--------|
| **Dual Home service** | `home.service.ts` vs `home2.service.ts` | Confusion about data source |
| **Mock data as production base** | `home.service.ts` uses `MOCK_ACTIVE_DASHBOARD` | Some fields show fake data |
| **Hardcoded fallbacks** | `profile.aggregate.ts`, `home2.service.ts`, `sciencePassport.service.ts` | Fake grade/school shown |

---

## AsyncStorage Audit

43 unique keys, all under `@vigyaan/` namespace.

| Key | Owner | Purpose | Type | Reset on Logout |
|-----|-------|---------|------|-----------------|
| `HAS_LAUNCHED_BEFORE` | Bootstrap | First launch | boolean | No |
| `USER_LANGUAGE` | Language | Language pref | string | No |
| `ONBOARDING_COMPLETED` | Onboarding | Completion flag | boolean | No |
| `AUTH_SESSION` | Auth | Session | AuthSession | **Yes** |
| `STUDENT_PROFILE` | Auth/Profile | Profile | object | **Yes** |
| `STUDENT_PROFILE_SETUP_COMPLETE` | Auth | Setup flag | boolean | **Yes** |
| `DASHBOARD_CACHE` | Home | Cache | DashboardData | **Yes** |
| `APP_SETTINGS` | Settings | Preferences | object | No |
| `GAMES_PROGRESS` | Games | Level progress | object | **Yes** |
| `LAST_PLAYED_GAME` | Games | Last game | object | No |
| `GAMES_STREAK` | Games | Game streak | object | **Yes** |
| `GAMES_DAILY_CHALLENGE` | Games | Daily challenge | object | No |
| `GAMES_FAVORITES` | Games | Favorites | object | No |
| `GAMES_RECENT_HISTORY` | Games | Recent sessions | array | **Yes** |
| `GAMES_BADGES` | Games | Badges | object | No |
| `NOTIFICATIONS_STATE` | Notifications | Read state | object | No |
| `FUN_FACTS_PROGRESS` | Fun Facts | Progress | object | No |
| `FUN_FACTS_DISMISSED` | Fun Facts | Dismiss flag | boolean | No |
| `RIDDLE_PROGRESS` | Riddles | Progress | object | **Yes** |
| `MYSTERY_LAB_PROGRESS` | Mystery | Case progress | object | **Yes** |
| `MYSTERY_LAB_ACTIVE_SESSION` | Mystery | Active session | object | No |
| `QUIZ_HISTORY` | Quiz | History | array | **Yes** |
| `QUIZ_DAILY_CHALLENGE` | Quiz | Daily state | object | No |
| `ACHIEVEMENTS_UNLOCKED` | Achievements | Badges | object | **Yes** |
| `CERTIFICATES_EARNED` | Certificates | Certs | array | **Yes** |
| `ACTIVITY_HISTORY` | Activity | Ledger | array | **Yes** |
| `XP_TRANSACTIONS` | XP | Ledger | array | **Yes** |
| `MISSIONS_STATE` | Missions | Progress | object | **Yes** |
| `DAILY_GOAL_STATE` | Daily Goal | Tracker | object | **Yes** |
| `RECENT_SEARCHES` | Search | Queries | array | **Yes** |
| `NOTIFICATION_PREFERENCES` | Settings | Toggles | object | No |
| `NOTIFICATION_INBOX` | Notifications | Inbox | array | **Yes** |
| `MICRO_LESSONS_PROGRESS` | Micro Lessons | Progress | object | **Yes** |
| `MICRO_LESSONS_BOOKMARKS` | Micro Lessons | Bookmarks | object | No |
| `CONCEPT_MAPS_PROGRESS` | Concept Maps | Progress | object | **Yes** |
| `CONCEPT_MAPS_BOOKMARKS` | Concept Maps | Bookmarks | object | No |
| `EXPERIMENT_PROGRESS` | Experiments | Progress | object | **Yes** |
| `EXPERIMENT_BOOKMARKS` | Experiments | Bookmarks | object | No |
| `CELEBRATION_STATE` | Celebration | State | object | **Yes** |
| `SPIN_WHEEL_STATE` | Spin Wheel | Daily state | object | **Yes** |
| `COLLECTIONS_PROGRESS` | Passport | Progress | object | No |
| `EXPLORE_FAVORITES` | Explore | Favorites | object | **Yes** |
| `EXPLORE_RECENTLY_VIEWED` | Explore | Recent | array | **Yes** |

### Storage Issues
- No duplicate keys (3 aliases were removed in previous session)
- Corrupted JSON handled gracefully (returns defaultValue)
- Memory cache + AsyncStorage dual-layer
- Logout clears 20+ user-specific keys; preserves 6 app-level keys

---

## Authentication Audit

### Auth Flows Verified
| Flow | Status | Notes |
|------|--------|-------|
| Password login (demo) | Functional | Matches demo@vigyaan.app / VigyaanDemo@123 |
| OTP request (demo) | Functional | Returns "Use 123456" |
| OTP verify (demo) | Functional | Creates session on correct code |
| Demo direct login | Functional | No credentials needed |
| Registration → OTP → Profile | Functional | 5-min TTL on pending registration |
| Session restore | Functional | Validated via `isValidSession()` |
| Logout | Functional | Clears per-user data, preserves app config |
| Corrupted session | Functional | Auto-cleared on detection |
| Expired session | Functional | Redirects to auth-welcome |

### Auth Issues
1. **P1:** `AUTH_MODE` hardcoded to `'demo'` — no config mechanism
2. **P1:** Production auth path returns fake success
3. **P3:** Demo profile persists fake data (Anu, Grade 8, 840 XP) to storage

---

## Hardcoded Data Audit

| Finding | File | Line | Value | Classification |
|---------|------|------|-------|---------------|
| Student name 'Anu' | `auth.demo.ts` | 25 | `fullName: 'Anu'` | DEMO DATA |
| Grade 'Grade 8' | `auth.demo.ts` | 26 | `grade: 'Grade 8'` | DEMO DATA |
| School 'R.M.K. School' | `auth.demo.ts` | 28 | `school: 'R.M.K. School'` | DEMO DATA |
| 840 XP | `auth.demo.ts` | 31 | `points: 840` | DEMO DATA |
| 5-day streak | `auth.demo.ts` | 32 | `streak: 5` | DEMO DATA |
| 72% progress | `auth.demo.ts` | 33 | `progress: 72` | DEMO DATA |
| Grade fallback 'Grade 8' | `profile.aggregate.ts` | 177 | `grade: \|\| 'Grade 8'` | **FAKE FALLBACK** |
| School fallback 'R.M.K. School' | `profile.aggregate.ts` | 179 | `school: \|\| 'R.M.K. School'` | **FAKE FALLBACK** |
| Name fallback 'Vigyaan Student' | `profile.aggregate.ts` | 173 | `name: \|\| 'Vigyaan Student'` | **FAKE FALLBACK** |
| Grade fallback 'Grade 8' | `home2.service.ts` | 208 | `grade: \|\| 'Grade 8'` | **FAKE FALLBACK** |
| Grade fallback 'Grade 8' | `sciencePassport.service.ts` | 159 | `grade: \|\| 'Grade 8'` | **FAKE FALLBACK** |
| Progress 50% | `home2.service.ts` | 300 | `progressPercent: 50` | **HARDCODED** |
| Progress 40% | `home2.service.ts` | 323 | `progressPercent: 40` | **HARDCODED** |
| Progress 30% | `home2.service.ts` | 346 | `progressPercent: 30` | **HARDCODED** |
| Mock dashboard as base | `home.service.ts` | 43 | `MOCK_ACTIVE_DASHBOARD` | **MOCK AS BASE** |

---

## Security Audit

| Check | Status | Notes |
|-------|--------|-------|
| No hardcoded secrets | PASS | No API keys, tokens, or private keys found |
| .env properly gitignored | PASS | `.gitignore` contains `.env` rules |
| Demo credentials isolated | PASS | Only in `auth.demo.ts`, clearly marked |
| No sensitive logging | PASS | console.warn/error are in catch blocks only |
| No debugger statements | PASS | None found |
| No @ts-ignore / @ts-nocheck | PASS | None found |
| No TODO / FIXME / HACK | PASS | None found |
| Password not persisted | PASS | Auth session stores only userId, not password |
| OTP not logged | PASS | Demo OTP is '123456' but never logged in production code |

---

## Test Audit

| Category | Suites | Tests | Status |
|----------|--------|-------|--------|
| Auth | 8 | ~120 | PASS |
| Activity | 1 | ~15 | PASS |
| XP | 1 | ~20 | PASS |
| Streaks | 4 | ~50 | PASS |
| Achievements | 3 | ~40 | PASS |
| Certificates | 1 | ~15 | PASS |
| Games | 2 | ~25 | PASS |
| Quiz | 1 | ~20 | PASS |
| Progress | 4 | ~50 | PASS |
| Home | 3 | ~40 | PASS |
| Profile | 1 | ~15 | PASS |
| Leaderboard | 1 | ~10 | PASS |
| Notifications | 2 | ~25 | PASS |
| Micro Lessons | 3 | ~35 | PASS |
| Concept Maps | 4 | ~45 | PASS |
| Experiments | 4 | ~40 | PASS |
| Mystery Lab | 3 | ~30 | PASS |
| Fun Facts | 1 | ~15 | PASS |
| Search | 1 | ~15 | PASS |
| Responsive | 2 | ~40 | PASS |
| Accessibility | 1 | ~15 | PASS |
| Language | 3 | ~35 | PASS |
| Settings | 1 | ~20 | PASS |
| Recommendations | 1 | ~10 | PASS |
| Feedback | 3 | ~30 | PASS |
| Weak Areas | 3 | ~30 | PASS |
| Science Passport | 2 | ~20 | PASS |
| Levels | 1 | ~10 | PASS |
| Theme | 1 | ~10 | PASS |
| Storage | 1 | ~15 | PASS |
| Onboarding | 3 | ~30 | PASS |
| Welcome | 1 | ~10 | PASS |
| i18n Parity | 1 | ~10 | PASS |
| Bootstrap | 1 | ~5 | PASS |
| **Total** | **89** | **1410** | **ALL PASS** |

### Test Quality Notes
- Tests cover storage, engine, navigation, i18n, integration, and component contracts
- No invalid hook calls detected
- No swallowed exceptions in test code
- Fixtures are current (not stale)
- No fake snapshots

---

## Documentation Audit

| Document | Status | Issues |
|----------|--------|--------|
| README.md | Updated | Machine-specific path removed |
| RELEASE_MANIFEST.md | Updated | Expo Doctor / Build claims marked NOT VERIFIED |
| FINAL_RELEASE_REPORT.md | Created | Complete with score and decision |
| FINAL_BUG_LOG.md | Created | 14 findings classified |
| PROJECT_AUDIT.md | This document | — |
| PHASE_1_FINDINGS.md | Created | Detailed findings with evidence |
| FRONTEND_HANDOFF.md | Existing | Not audited in detail |
| BACKEND_HANDOFF.md | Existing | Not audited in detail |
| QA_MATRIX.md | Existing | Claims should be re-verified |

---

## Release Artifact Audit

| Item | Status |
|------|--------|
| `vigyaan-release-v1.0.0.zip` | EXISTS in project root — must be removed for clean source |
| `Vigyaan_Final_Frontend_Production_Source.zip` | Created (2.6 MB) — clean, no nested ZIPs |
| node_modules | Properly excluded from ZIP |
| .git | Properly excluded from ZIP |
| .expo | Properly excluded from ZIP |

---

## Duplicate File Audit

No exact duplicate files found by content hash analysis. The dual Home service (`home.service.ts` and `home2.service.ts`) represents overlapping functionality, not exact duplicates.

---

*Phase 1 audit complete. See PHASE_1_FINDINGS.md for detailed findings with evidence.*
