# Local Storage Schema

Single persistence layer: `@react-native-async-storage/async-storage`, accessed
only through the typed wrapper `src/storage/asyncStorage.ts` (`storage.getItem<T>`
/ `storage.setItem<T>` / `storage.removeItem` with JSON serialization and safe
parse fallback). Keys are namespaced with the `@vigyaan/` prefix and centralized
in `STORAGE_KEYS` — never invent raw key strings elsewhere.

Stored JSON is treated as **untrusted**: every feature repository validates and
sanitizes what it reads (games progress, settings, notifications, mystery
progress, quiz/riddle results). Corrupt values fall back to defaults without
clearing unrelated app state.

Legend — **Survives logout**: whether the key is expected to remain after the
user signs out / resets demo account state.
**Sync later**: whether a future backend should own or mirror this data.

## Global / Onboarding Keys

| Key | Purpose | Shape | Owner | Survives logout | Sync later |
| --- | ------- | ----- | ----- | --------------- | ---------- |
| `@vigyaan/has_launched_before` | First-launch flag | `boolean` | `services/bootstrap` | Yes | No |
| `@vigyaan/user_language` | UI language | `'en' \| 'ta'` | `config/i18n` + AppShell | Yes | Yes (profile preference) |
| `@vigyaan/onboarding_completed` | Onboarding finished | `boolean` | onboarding flow | Yes | No |
| `@vigyaan/student_profile_setup_complete` | Profile-setup finished | `boolean` | profile-setup flow | Yes | No |

## Identity / Session Keys

| Key | Purpose | Shape | Owner | Survives logout | Sync later |
| --- | ------- | ----- | ----- | --------------- | ---------- |
| `@vigyaan/auth_session` | Demo auth session | `AuthSession` (`src/features/auth/auth.types.ts`) | `features/auth` | **No** (cleared on logout) | Yes — replaced by real token/session |
| `@vigyaan/student_profile` | Student profile (name, grade, school, district, section…) | `StudentProfile` (`src/features/auth/auth.types.ts` or profile-setup) | profile-setup + Profile screen | **No** (cleared on logout) | Yes — server profile |

> Demo-only note: sessions are local-only, created by `auth.demo.ts`. Nothing is
> ever transmitted; OTP values are never stored.

## Feature State Keys

| Key | Purpose | Shape | Owner | Survives logout | Sync later |
| --- | ------- | ----- | ----- | --------------- | ---------- |
| `@vigyaan/dashboard_cache` | Home dashboard cache | `DashboardCache` (`src/features/home/home.types.ts`) | `features/home` | No | Yes |
| `@vigyaan/app_settings` | All user preferences | `AppSettings` (`src/features/settings/settings.types.ts`) | `features/settings` | Yes (preferences are device-level) | Yes (server-side prefs) |
| `@vigyaan/games_progress` | Per-game level progress | `Record<GameId, GameProgress>` — `GameProgress { gameId, levels: Record<levelId, GameLevelProgress>, highestUnlockedLevel, lastPlayedAt, masteryPercent? }` (`src/features/games/games.types.ts`) | `features/games` | No | Yes |
| `@vigyaan/last_played_game` (`GAMES_LAST_PLAYED`) | Resume target | game id + level | `features/games` | No | Yes |
| `@vigyaan/games_streak` | Daily play streak | `GameStreakInfo { currentStreak, longestStreak, lastPlayedDate, history[] }` | `features/games` | No | Yes |
| `@vigyaan/games_daily_challenge` | Today's deterministic challenge | `DailyChallengeInfo { date, gameId, levelIndex, completed, rewardStars }` | `features/challenges` | No | Yes |
| `@vigyaan/games_favorites` | Starred games | game id list | `features/games` | No | Yes |
| `@vigyaan/games_recent_history` | Recently played | array of game records | `features/games` | No | Yes |
| `@vigyaan/games_badges` (`GAMES_UNLOCKED_BADGES`) | Unlocked game badges | badge id list | `features/games` | No | Yes |
| `@vigyaan/notifications_state` | Inbox read/delete flags | `NotificationState { id, isRead, isDeleted }[]` + mock inbox items (`notifications.mock.ts`) | `features/notifications` | No | Yes — real push inbox |
| `@vigyaan/fun_facts_progress` | Fun-facts daily/quiz progress | `src/features/fun-facts/fun-facts.types.ts` | `features/fun-facts` | No | Yes |
| `@vigyaan/ff_first_time_dismissed` | First-open banner flag | `boolean` | `features/fun-facts` | Yes | No |
| `@vigyaan/riddle_progress` | Riddle results/history | riddle session results | `features/riddles` | No | Yes |
| `@vigyaan/mystery_lab_progress` | Mystery completion/score | per-case progress | `features/mystery-lab` | No | Yes |
| `@vigyaan/mystery_lab_active_session` | In-flight investigation | active case state (clues/evidence/hypothesis) | `features/mystery-lab` | No | Yes |
| `@vigyaan/quiz_history` | Past quiz sessions | `QuizHistoryEntry[]` (`src/features/quiz/quiz-history.types.ts`) | `features/quiz` | No | Yes |
| `@vigyaan/quiz_daily_challenge` | Daily quiz challenge state | daily quiz record | `features/quiz` / `features/challenges` | No | Yes |
| `@vigyaan/achievements_unlocked` | Unlocked achievement ids | string list | `features/achievements` | No | Yes |
| `@vigyaan/certificates_earned` | Locally generated certificates | `src/features/certificates/certificates.types.ts` | `features/certificates` | No | Yes — server-issued |

## Storage Invariants (enforced by tests)

- Game level records are keyed by **canonical dataset level IDs** (`zip-01`,
  `elem-03`, …). Legacy `level-<n>` style keys from older builds are migrated to
  real IDs on load; they are never written going forward.
- Progress, streaks and daily challenges are written only on meaningful state
  changes (level complete, day change, etc.) — never per game move or render.
- `Reset Preferences` in Settings clears `@vigyaan/app_settings` only; it must
  not clear auth, profile, onboarding, or language keys.
- `Clear Cache` clears transient caches (e.g. `dashboard_cache`) and must not
  log the user out.
- Logout clears session/profile/progress keys but leaves onboarding, language
  and settings intact.
