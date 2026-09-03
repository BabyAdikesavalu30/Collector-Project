# Backend API Requirements (Conceptual)

> ⚠️ **No API is implemented.** Nothing in this repository performs network
> calls. This document is a conceptual contract for the backend team — it
> describes *what* endpoints should eventually exist and *which frontend
> contracts they must satisfy*. Paths, payloads and auth style below are
> suggestions, not commitments.

Frontend shape expectations referenced here live in `src/features/**/*.types.ts`
— see [`BACKEND_HANDOFF.md`](./BACKEND_HANDOFF.md) §5–§14 for file pointers.

## Cross-cutting

- **Auth:** token-based session (opaque or JWT) returned on sign-in; token held
  securely (never in AsyncStorage once real); refresh flow.
- **Localization:** content endpoints accept `?lang=en|ta` (or return both and
  let the client pick); all user-facing strings in the API should be bilingual.
- **Versioning:** version the API; the app declares no backend dependency yet,
  so introduce it behind the future service layer.

## 1. Auth

| Endpoint | Purpose | Notes |
| -------- | ------- | ----- |
| `POST /auth/register` | Student registration (personal + academic + credentials) | Validate like `auth.validation.ts`; do NOT return raw OTP in production logs |
| `POST /auth/request-otp` | Send OTP (email/SMS) for register/login/recovery | Rate-limited |
| `POST /auth/verify-otp` | Verify OTP | Never log the code; track attempts server-side |
| `POST /auth/login` | Password or OTP sign-in | Returns session |
| `POST /auth/forgot-password` | Start recovery | No account enumeration in responses |
| `POST /auth/reset-password` | Complete recovery | Bounded session/token expiry |
| `POST /auth/logout` | Revoke session | |
| `GET /auth/session` | Restore/validate session | Drives bootstrap routing in `services/bootstrap` |

## 2. Profile

- `GET /profile` → `StudentProfile` (name, grade, section, school, district,
  preferred language…)
- `PUT /profile` — update profile
- `PUT /profile/preferences` — sync `AppSettings` (language, theme, text scale,
  notification toggles, quiz prefs…)
- `DELETE /account` — account deletion (frontend has `/delete-account` flow)

## 3. Curriculum / Learning

- `GET /curriculum/levels` → foundation/core/advanced
- `GET /curriculum/subjects` → physics/chemistry/biology (+botany/zoology)
- `GET /curriculum/pathways?level=&subject=` → pathways + topics with bilingual
  titles, duration estimates (see `learn.types.ts`)
- Content keys should mirror the current `learn.mock.ts` structure so screens
  render unchanged.

## 4. Quiz Questions & Sessions

- `GET /quiz/questions?level=&subject=&pathway=&difficulty=&count=` →
  `Question[]` matching `quiz.types.ts` (bilingual prompt/options/explanation,
  correct-index kept server-side if desired, but the current client scores
  locally from `correctIndex`).
- `POST /quiz/sessions` → create attempt (config echoed back)
- `PUT /quiz/sessions/{id}` or `POST /quiz/sessions/{id}/complete` → submit
  `QuizResult` (totals, score, percentage, bestStreak, timestamps) and return
  server-verified result.
- `GET /quiz/history` → recent `QuizHistoryEntry[]`.

## 5. Riddles

- `GET /riddles/categories?difficulty=` → riddle sets
- `POST /riddles/sessions/complete` → submit solved/skipped/hints/score;
  return result + tier (excellent/great/good/practice) per `riddle.scoring.ts`.

## 6. Games

- `GET /games/manifest` → registry metadata (ids, titles en/ta, collections,
  badges) — used by `games.registry.ts`
- `PUT /games/{gameId}/levels/{levelId}/complete` → submit
  `GameLevelProgress` (stars, perfect, best time/moves/score); server computes
  unlock of next level and mastery % over the **real level count** for the game.
- `GET /games/{gameId}/progress` → user's `GameProgress`
- `GET /games/daily` → deterministic daily challenge per user (date + game +
  level) — today derived locally (`deriveDailyChallengeGame`).
- Level *puzzles themselves* may remain bundled client-side (offline play) or be
  served; design decision for the backend team.

## 7. Progress / Achievements / Leaderboard

- `POST /progress/sync` — batch upsert of local progress deltas (offline-first)
- `GET /progress/summary` → XP, streaks, mastery, daily-goal state (feeds home
  dashboard + progress screens)
- `GET /achievements` / `POST /achievements/unlock` — achievement catalog +
  verified unlocks (see `achievements.types.ts`)
- `GET /leaderboard?scope=class|school|all` — rankings (frontend today computes
  local "rank" only)
- `GET /streaks` — current/longest streak + history

## 8. Certificates

- `POST /certificates/issue` → issues certificate for completed achievement
- `GET /certificates` → earned list
- `GET /certificates/{id}/verify` → public verification (the frontend
  certificate contract: `certificateId`, `studentId`, `achievement`,
  `issueDate`, `verificationUrl`). **Until this exists, certificates are local
  previews only.**

## 9. Notifications

- `GET /notifications` → inbox (match `AppNotification`: type, bilingual
  title/body, createdAt, read flag, deep-link action `{route, params}`)
- `POST /notifications/read` / `POST /notifications/read-all`
- `DELETE /notifications/{id}`
- Push delivery handled by a separate push provider; this API is the inbox.

## 10. Search & Content

- `GET /search?q=&lang=` → combined results (topics, quizzes, riddles, games,
  fun facts) — supports the Games search + any global search UI.
- `GET /content/fun-facts` — fact collections (daily + quiz mode).
- `GET /content/mystery-cases` — mystery lab case packs (today bundled in
  `mystery.registry.ts`).

## 11. Mystery Lab

- `GET /mystery/cases` → case metadata
- `POST /mystery/sessions` → start investigation
- `PUT /mystery/sessions/{id}` → submit clue/evidence/hypothesis progress
- `POST /mystery/sessions/{id}/conclude` → conclusion + score per
  `mystery.scoring.ts`

## Security & Privacy Notes

- Never return or log OTPs, passwords, tokens or secrets.
- Student data (name, school, grade, district) is personal data — minimize,
  encrypt in transit/at rest, and support deletion (GDPR-style) via the account
  deletion API.
- Add rate limiting on auth/OTP endpoints and request validation mirroring the
  client-side validators (`auth.validation.ts`, `otp.validation.ts`).
