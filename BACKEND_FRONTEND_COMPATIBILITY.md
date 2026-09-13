# BACKEND_FRONTEND_COMPATIBILITY.md

**Project:** Vigyaan  
**Date:** September 13, 2026  
**Status:** BACKEND INTEGRATION — NOT VERIFIED (no backend source provided)

---

## Overview

This document analyzes the compatibility between the current frontend and the conceptual backend API requirements. No backend source code was provided for this audit. All backend API contracts are documented in `BACKEND_API_REQUIREMENTS.md` and `BACKEND_HANDOFF.md`.

## Compatibility Matrix

| Feature | Frontend Contract | Backend Contract | Adapter Required | Status |
|---------|-------------------|------------------|------------------|--------|
| **Auth — Login (Password)** | `authService.loginWithPassword(identifier, password)` | `POST /auth/login` | Yes (adapter boundary ready) | NOT VERIFIED |
| **Auth — Login (OTP)** | `authService.requestLoginOtp(identifier)` → `demoAuthAdapter.verifyOtp(code)` | `POST /auth/request-otp` → `POST /auth/verify-otp` | Yes | NOT VERIFIED |
| **Auth — Registration** | `registrationService.registerStudent(RegistrationFormData)` | `POST /auth/register` | Yes | NOT VERIFIED |
| **Auth — Session** | `SessionRepository.getSession()` with `AuthSession` model | `GET /auth/session` (token-based) | Yes (session model maps to token) | NOT VERIFIED |
| **Auth — Logout** | `authService.logout()` → clears session + per-student state | `POST /auth/logout` | Yes | NOT VERIFIED |
| **Profile — Read** | `storage.getItem(STUDENT_PROFILE)` → `{fullName, grade, section, school, city}` | `GET /profile` → `StudentProfile` | Yes (field mapping needed) | NOT VERIFIED |
| **Profile — Update** | Direct storage writes | `PUT /profile` | Yes | NOT VERIFIED |
| **Profile — Settings** | `settingsRepository` | `PUT /profile/preferences` | Yes | NOT VERIFIED |
| **Dashboard** | `dashboardService.getDashboard()` aggregates 14+ local stores | `GET /progress/summary` | Yes (composite of multiple endpoints) | NOT VERIFIED |
| **Learning — Content** | Local mock data (`learn.mock.ts` structure) | `GET /curriculum/pathways?level=&subject=` | Yes | NOT VERIFIED |
| **Quiz — Questions** | Local question bank (`quiz.mock.*.ts`) | `GET /quiz/questions` | Yes | NOT VERIFIED |
| **Quiz — Sessions** | Local quiz engine scoring | `POST /quiz/sessions` → `PUT /quiz/sessions/{id}/complete` | Yes | NOT VERIFIED |
| **XP** | Local `xp.transactions` ledger | `GET /progress/summary` (server-authoritative XP) | Yes (offline-first sync) | NOT VERIFIED |
| **Streaks** | `StreakService.getUnifiedStreak()` from activity history | `GET /streaks` | Yes | NOT VERIFIED |
| **Achievements** | Local evaluation engine (`achievements.engine.ts`) | `GET /achievements` + `POST /achievements/unlock` | Yes | NOT VERIFIED |
| **Games — Progress** | `games.storage.ts` local level progress | `PUT /games/{gameId}/levels/{levelId}/complete` | Yes (offline-first sync) | NOT VERIFIED |
| **Games — Manifest** | `games.registry.ts` local registry | `GET /games/manifest` | Optional (can stay local) | NOT VERIFIED |
| **Certificates** | Local preview only (`certificates.storage.ts`) | `POST /certificates/issue` + `GET /certificates` | Yes | NOT VERIFIED |
| **Leaderboard** | `DemoLeaderboardRepository` deterministic mock | `GET /leaderboard?scope=&period=` | Yes (replace demo repo) | NOT VERIFIED |
| **Notifications** | Mock + generated inbox (local) | `GET /notifications` + `POST /notifications/read` | Yes | NOT VERIFIED |
| **Riddles** | Local scoring engine + question bank | `GET /riddles/categories` + `POST /riddles/sessions/complete` | Yes | NOT VERIFIED |
| **Mystery Lab** | Local case registry + scoring | `GET /mystery/cases` + session endpoints | Yes | NOT VERIFIED |
| **Search** | Local cross-feature search | `GET /search?q=&lang=` | Yes | NOT VERIFIED |
| **Fun Facts** | Local fact bank | `GET /content/fun-facts` | Optional (can stay local) | NOT VERIFIED |
| **Account Deletion** | UI flow exists (`/delete-account`) | `DELETE /account` | Yes | NOT VERIFIED |

## Key Observations

1. **All adapters are ready** — The frontend uses clean service/repository boundaries. Each feature has an interface (`IAuthService`, `LeaderboardRepository`, etc.) with a demo implementation. Swapping to backend adapters requires only implementing the interface.

2. **Session model mismatch** — Frontend uses `AuthSession` with `userId`, `email`, `fullName`, `authMode`. Backend will likely use opaque tokens. An adapter must bridge these.

3. **Offline-first architecture** — The frontend is designed for local-first operation. Backend sync should be additive (sync deltas), not replace local storage.

4. **No API calls exist** — The frontend currently makes zero network requests. All data comes from local storage and in-memory computation.

## Migration Path

1. Implement `BackendAuthAdapter` implementing `IAuthService`
2. Implement `BackendProfileAdapter` implementing profile CRUD
3. Implement `BackendLeaderboardRepository` implementing `LeaderboardRepository`
4. Add sync layer for XP, progress, achievements, certificates
5. Replace `DashboardService` network simulation with real API calls
6. Each adapter maps backend response shapes → frontend domain models

---

**⚠️ No backend source was provided. All status entries are NOT VERIFIED.**
