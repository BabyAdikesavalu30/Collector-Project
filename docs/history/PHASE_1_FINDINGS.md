# PHASE_1_FINDINGS.md

**Project:** Vigyaan / VigyaanXpo  
**Phase:** 1 — Discovery Audit  
**Date:** September 13, 2026  
**Auditor:** Buffy (Codebuff Agent)

---

## Findings Summary

| Severity | Count | Fixed in Phase 1 |
|----------|-------|-------------------|
| P0 — Release Blocker | 0 | — |
| P1 — Critical | 2 | 0 |
| P2 — Important | 5 | 0 |
| P3 — Minor | 7 | 0 |
| **Total** | **14** | **0** |

---

## P1 — CRITICAL

### BUG-001: AUTH_MODE Hardcoded to 'demo' — No Backend Switch
- **Severity:** P1
- **Category:** Auth / Backend Readiness
- **File:** `src/features/auth/auth.config.ts`
- **Line:** 7
- **Evidence:** `AUTH_MODE: 'demo' as 'demo' | 'backend'`
- **Problem:** The auth mode is hardcoded to `'demo'` with no environment variable or configuration mechanism to switch to `'backend'` mode. When the backend is ready, this must be manually changed in source code.
- **Expected:** Configuration-driven auth mode (e.g., `process.env.EXPO_PUBLIC_AUTH_MODE` or `app.json` extra config).
- **Actual:** Static string literal `'demo'`.
- **Impact:** Every auth flow (login, OTP, registration, session) routes through the demo adapter. Backend integration requires source code change.
- **Root Cause:** Auth mode was set during initial development and never made configurable.
- **Recommended Fix:** Add Expo `extra` config or environment variable to control `AUTH_MODE`. Default to `'demo'` in development, configurable for production.
- **Confidence:** HIGH
- **Verification Required:** Test both `'demo'` and `'backend'` modes.

### BUG-002: Production Auth Path Returns Fake Success Without Backend
- **Severity:** P1
- **Category:** Auth / Security
- **File:** `src/features/auth/auth.service.ts`
- **Lines:** 40-47, 55-62
- **Evidence:** When `AUTH_CONFIG.AUTH_MODE === 'backend'`:
  ```typescript
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, message: 'Authentication request dispatched' };
  ```
- **Problem:** The production auth path (when `AUTH_MODE` is not `'demo'`) returns a fake success after a delay without making any real API call. If someone switches `AUTH_MODE` to `'backend'`, all logins would silently succeed without actual authentication.
- **Expected:** Throw an error or return a clear "backend not configured" message.
- **Actual:** Returns `{ success: true }` with a fake message.
- **Impact:** Security risk — fake authentication success in production mode.
- **Root Cause:** Placeholder code that was never replaced with real backend calls.
- **Recommended Fix:** Return `{ success: false, error: 'Backend authentication not yet configured' }` or throw an error.
- **Confidence:** HIGH
- **Verification Required:** Test with `AUTH_MODE: 'backend'`.

---

## P2 — IMPORTANT

### BUG-003: Hardcoded 'Grade 8' Fallback in 3 Services
- **Severity:** P2
- **Category:** Fake Data / Profile
- **Files:**
  - `src/features/profile/profile.aggregate.ts:177`
  - `src/features/home/home2.service.ts:208`
  - `src/features/science-passport/sciencePassport.service.ts:159`
- **Evidence:** All three files contain `grade: storedProfile?.grade || 'Grade 8'`
- **Problem:** When no profile exists (new user who hasn't completed profile setup), the UI displays "Grade 8" as if it's real student data. This is misleading.
- **Expected:** Empty state: `grade: storedProfile?.grade || ''` or `'—'`
- **Actual:** `storedProfile?.grade || 'Grade 8'`
- **Impact:** New users see fake grade data. Backend integration would inherit this wrong default.
- **Root Cause:** Demo-mode convenience fallback left in production code.
- **Recommended Fix:** Use honest empty state `'—'` when no profile exists.
- **Confidence:** HIGH
- **Verification Required:** Test with cleared student profile.

### BUG-004: Hardcoded Fake Progress Percentages in Continue Learning
- **Severity:** P2
- **Category:** Fake Data / Home
- **File:** `src/features/home/home2.service.ts`
- **Lines:** 300, 323, 346
- **Evidence:**
  ```typescript
  progressPercent: 50, // micro-lessons
  progressPercent: 40, // concept-maps
  progressPercent: 30, // experiments
  ```
- **Problem:** The "Continue Learning" card shows hardcoded fake progress percentages (50%, 40%, 30%) instead of actual progress from the activity/progress stores.
- **Expected:** Progress computed from actual completed steps / total steps.
- **Actual:** Static values regardless of actual progress.
- **Impact:** Users see misleading progress indicators.
- **Root Cause:** Progress calculation was deferred; hardcoded values used as placeholder.
- **Recommended Fix:** Compute actual progress from step completion data.
- **Confidence:** HIGH
- **Verification Required:** Verify with actual lesson progress data.

### BUG-005: MOCK_ACTIVE_DASHBOARD Used as Base Template in Home Service
- **Severity:** P2
- **Category:** Fake Data / Architecture
- **File:** `src/features/home/home.service.ts`
- **Line:** 43
- **Evidence:** `JSON.parse(JSON.stringify(options?.mockEmpty ? MOCK_EMPTY_DASHBOARD : MOCK_ACTIVE_DASHBOARD))`
- **Problem:** The legacy dashboard service uses `MOCK_ACTIVE_DASHBOARD` (containing fake data: 'Anu', 'Grade 8', 'R.M.K. Matriculation School', 840 points, 5-day streak, 72% progress, unread count 2) as the base template. Real data overwrites some fields but not all — fields like `student.unreadNotificationsCount` (always 2) and `continueTopic` remain hardcoded.
- **Expected:** Base template should be empty/zero-valued; real data fills all fields.
- **Actual:** Mock data is the base; real data patches over it.
- **Impact:** Some dashboard fields display fake data even when real data is available.
- **Root Cause:** Architectural shortcut — starting from mock and patching is easier than building from scratch.
- **Recommended Fix:** Refactor to build DashboardData from zero-valued base, populated entirely from canonical stores.
- **Confidence:** HIGH
- **Verification Required:** Compare displayed values with actual stored data.

### BUG-006: Dual Home Service Architecture (home.service vs home2.service)
- **Severity:** P2
- **Category:** Architecture / Source of Truth
- **Files:**
  - `src/features/home/home.service.ts` (legacy, uses mock base)
  - `src/features/home/home2.service.ts` (new, derives from canonical stores)
  - `src/components/home/HomeScreen.tsx` (uses BOTH simultaneously)
  - `app/home.tsx` (uses legacy `dashboardService`)
- **Evidence:** `app/home.tsx` imports `dashboardService` from `home.service.ts` and passes it as `data` prop to `HomeScreen`. `HomeScreen.tsx` independently loads `getHomeViewModel()` from `home2.service.ts` and uses it when available, falling back to legacy data.
- **Problem:** Two competing Home services run simultaneously. Legacy service is mock-based; Home 2.0 derives from canonical stores. This creates confusion about which is the source of truth.
- **Expected:** Single Home service using canonical data.
- **Actual:** Dual service with fallback chain.
- **Impact:** Maintenance confusion; some data comes from mock, some from real stores; inconsistent behavior.
- **Root Cause:** Incremental upgrade without completing migration.
- **Recommended Fix:** Complete migration to Home 2.0 service; remove legacy `home.service.ts`.
- **Confidence:** HIGH
- **Verification Required:** Trace data flow for each Home card.

### BUG-007: Mock Fallback for Daily Challenge in Home 2.0
- **Severity:** P2
- **Category:** Fake Data / Home
- **File:** `src/features/home/home2.service.ts`
- **Line:** 451
- **Evidence:** `const mock = MOCK_ACTIVE_DASHBOARD.dailyChallenge;`
- **Problem:** The `buildDailyChallenge()` function in Home 2.0 falls back to mock data from `MOCK_ACTIVE_DASHBOARD` instead of using the real challenge service (which exists in `home.service.ts`).
- **Expected:** Use `buildDailyChallengePreview()` from the challenges feature.
- **Actual:** Uses hardcoded mock from `home.mock.ts`.
- **Impact:** Daily challenge card shows mock data even when real challenge data is available.
- **Root Cause:** Home 2.0 migration incomplete — daily challenge wiring not finished.
- **Recommended Fix:** Wire to `buildDailyChallengePreview()` like the legacy service does.
- **Confidence:** HIGH
- **Verification Required:** Verify daily challenge shows real data.

---

## P3 — MINOR

### BUG-008: 'R.M.K. School' Hardcoded in Profile Fallback
- **Severity:** P3
- **Category:** Fake Data / Profile
- **File:** `src/features/profile/profile.aggregate.ts`
- **Line:** 179
- **Evidence:** `school: storedProfile?.school || 'R.M.K. School'`
- **Problem:** When no profile exists, school defaults to 'R.M.K. School' (the institutional sponsor). While this is the institution, it's misleading as student data.
- **Expected:** Empty state: `school: storedProfile?.school || ''`
- **Actual:** `storedProfile?.school || 'R.M.K. School'`
- **Impact:** Minor — users without profiles see fake school name.
- **Confidence:** HIGH

### BUG-009: 'Vigyaan Student' as Profile Name Fallback
- **Severity:** P3
- **Category:** Fake Data / Profile
- **File:** `src/features/profile/profile.aggregate.ts`
- **Line:** 173
- **Evidence:** `name: storedProfile?.fullName || session?.fullName || 'Vigyaan Student'`
- **Problem:** Fallback name 'Vigyaan Student' is used instead of honest empty state.
- **Expected:** Show initials or empty state.
- **Actual:** Shows 'Vigyaan Student' as if it's a real name.
- **Impact:** Minor — only affects users without profiles.
- **Confidence:** HIGH

### BUG-010: Registration Pending State Is Module-Level Mutable
- **Severity:** P3
- **Category:** Auth / Architecture
- **File:** `src/features/auth/auth.demo.ts`
- **Lines:** 38-39
- **Evidence:** `let pendingRegistration: RegistrationFormData | null = null; let pendingRegistrationTimestamp: number = 0;`
- **Problem:** Registration state is stored in module-level variables. If the module is reloaded (HMR) or if multiple registrations happen, state could be lost or corrupted.
- **Expected:** State should be in a class instance or closure.
- **Actual:** Module-level `let` variables.
- **Impact:** Minor — only affects demo mode; HMR could cause issues during development.
- **Confidence:** MEDIUM

### BUG-011: 33 console.warn/error Statements in App Routes
- **Severity:** P3
- **Category:** Code Quality / Security
- **Files:** 20+ route files in `app/`
- **Evidence:** All `app/*.tsx` route files contain `console.warn` or `console.error` in catch blocks.
- **Problem:** While these are in catch blocks (acceptable for error handling), production builds should not emit console output. React Native production builds strip console, but this is not guaranteed.
- **Expected:** Use a logging service that can be disabled in production.
- **Actual:** Direct `console.warn`/`console.error` calls.
- **Impact:** Low — console is typically stripped in production builds, but not guaranteed.
- **Confidence:** MEDIUM

### BUG-012: ESLint Disable in Leaderboard Route
- **Severity:** P3
- **Category:** Code Quality
- **File:** `app/leaderboard.tsx`
- **Line:** 76
- **Evidence:** `// eslint-disable-next-line react-hooks/exhaustive-deps`
- **Problem:** Suppresses React hooks exhaustive-deps warning for mount-only effect.
- **Expected:** Either fix the dependency or document why suppression is correct.
- **Actual:** Suppressed without inline explanation.
- **Impact:** Minimal — the suppression is technically correct for mount-only effects.
- **Confidence:** HIGH

### BUG-013: Home Service Reads Activity History 3+ Times
- **Severity:** P3
- **Category:** Performance
- **File:** `src/features/home/home.service.ts`
- **Lines:** 133, 151, 163
- **Evidence:** `getActivityHistory()` is called 3 separate times in the same `getDashboard()` method (for streak, missions, and daily goal).
- **Problem:** Redundant async reads of the same data.
- **Expected:** Read once, pass to all consumers.
- **Actual:** Three separate `await getActivityHistory()` calls.
- **Impact:** Minor performance waste; 3x storage reads instead of 1.
- **Confidence:** HIGH

### BUG-014: Home 2.0 Also Reads Activity History Multiple Times
- **Severity:** P3
- **Category:** Performance
- **File:** `src/features/home/home2.service.ts`
- **Lines:** 78 (via `Promise.all`), but `buildProgressSnapshot` also reads history
- **Evidence:** History is loaded once in `Promise.all` at line 78, but `buildProgressSnapshot` receives it correctly. However, `buildDailyChallenge()` bypasses the real service and uses mock.
- **Problem:** Architectural inconsistency — some data is properly derived, some falls back to mock.
- **Impact:** Minor — data flow is inconsistent.
- **Confidence:** MEDIUM

---

## Contradiction Check

### Documentation vs Source

| Claim | Source | Status |
|-------|--------|--------|
| RELEASE_MANIFEST: "Jest Test Suite: PASS (89/89, 1410/1410)" | Verified this session | CONFIRMED |
| RELEASE_MANIFEST: "Expo Doctor: PASS (18/18)" | Not run this session | NOT VERIFIED (previous claim) |
| RELEASE_MANIFEST: "Android Export: PASS" | Not run this session | NOT VERIFIED (previous claim) |
| RELEASE_MANIFEST: "iOS Export: PASS" | Not run this session | NOT VERIFIED (previous claim) |
| FINAL_RELEASE_REPORT: "Physical Android: NOT VERIFIED" | No device available | CONFIRMED |
| FINAL_BUG_LOG: "P2-001 Fixed" | Verified — 3 duplicate storage keys removed | CONFIRMED |
| README: Machine-specific path removed | Updated this session | CONFIRMED |

### Previous Fix Claims vs Current Source

| Claim | Current Source | Status |
|-------|---------------|--------|
| "Duplicate storage key aliases fixed" | `asyncStorage.ts` — 3 aliases removed | CONFIRMED FIXED |
| "No hardcoded fake production data" | `home.mock.ts` still contains 'Anu', 'Grade 8', 840 XP, etc. as base template | CONFLICT — mock data used as production base |
| "Backend integration NOT VERIFIED" | `auth.config.ts` hardcoded to 'demo' | CONFIRMED |

---

## NOT VERIFIED Items

| Item | Reason |
|------|--------|
| Expo Doctor | Environment limitation |
| Android build/export | Environment limitation |
| iOS build/export | Environment limitation |
| Physical Android device QA | No device available |
| Physical iOS device QA | No device available |
| Real backend integration | No backend provided |
| VoiceOver/TalkBack screen readers | No device available |
| Real device performance profiling | No device available |
| Network failure handling against real server | No backend available |
| Token refresh/expiry handling | No real tokens in demo mode |
| Rate limiting behavior | No backend available |

---

## Real User Journey Trace

### NEW USER JOURNEY
```
Splash (index.tsx) 
→ bootstrap resolves to /welcome
→ Welcome (welcome.tsx) → /onboarding
→ Onboarding 4-step (onboarding*.tsx) → /language
→ Language (language.tsx) → /auth-welcome
→ Auth Welcome (auth-welcome.tsx) → /register
→ Register (register.tsx) → /otp
→ OTP (otp.tsx) → /profile-create
→ Profile Create (profile-create.tsx) → /profile-academic
→ Profile Academic (profile-academic.tsx) → /profile-complete
→ Profile Complete (profile-complete.tsx) → /home
→ Home (home.tsx) ← session guard checks auth
```
**Status:** Journey is complete and functional. All routes exist and connect.

### RETURNING USER JOURNEY
```
Launch → index.tsx
→ bootstrap checks AUTH_SESSION in storage
→ If valid session → /home
→ If invalid → /welcome
```
**Status:** Session restoration works via `SessionRepository.getSession()`.

### DEMO LOGIN JOURNEY
```
Welcome → /auth-welcome → /login
→ Demo button → authService.loginAsDemo()
→ Creates session with userId: 'usr_demo_direct'
→ Stores DEMO_DEFAULT_PROFILE (Anu, Grade 8, R.M.K. School, 840 XP)
→ /home (session guard passes)
```
**Status:** Functional. Demo data is clearly labeled in code.

### LEARNING JOURNEY
```
Home → /learn → lesson list → lesson detail → completion → progress
```
**Status:** Functional. Learning content is local mock data.

### QUIZ JOURNEY
```
Learn → /quiz-setup → /quiz (fullscreen) → /quiz-result → /quiz-review
```
**Status:** Functional. Quiz engine is local.

### GAME JOURNEY
```
Home → /games → /games/{id} (fullscreen) → result → XP → achievement
```
**Status:** Functional. All 20 games have routes and engines.

### PROFILE JOURNEY
```
Home → /profile → edit → save → reload → verify
```
**Status:** Functional. Profile stored locally.

### LOGOUT JOURNEY
```
Profile → logout → authService.logout() → clears per-user data → /auth-welcome
```
**Status:** Functional. Clears 20+ storage keys, preserves app config.

---

*Phase 1 audit complete. All findings are evidence-based from source code inspection.*
