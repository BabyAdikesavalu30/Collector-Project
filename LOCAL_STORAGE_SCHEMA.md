# Local Storage Schema

Single persistence layer: `@react-native-async-storage/async-storage`, accessed only through the typed wrapper `src/storage/asyncStorage.ts` (`storage.getItem<T>`, `storage.setItem<T>`, `storage.removeItem` with in-memory caching and safe parse fallbacks). Keys are namespaced with the `@vigyaan/` prefix and centralized in `STORAGE_KEYS`.

Stored JSON is treated as **untrusted**: every feature repository sanitizes what it reads. Corrupted values gracefully fall back to empty or default structures without clearing unrelated app state or crashing.

---

## Storage Key Catalog

| Key | Purpose | Data Shape | Owning Domain | Survives Logout | Backend Sync Plan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `@vigyaan/has_launched_before` | First-launch onboarding gate | `boolean` | `services/bootstrap` | Yes | No |
| `@vigyaan/user_language` | Active UI language preference | `'en' \| 'ta'` | `config/i18n` + AppShell | Yes | Yes (user profile preference) |
| `@vigyaan/onboarding_completed` | Onboarding lifecycle completed | `boolean` | Onboarding flow | Yes | No |
| `@vigyaan/student_profile_setup_complete`| Profile setup wizard completed | `boolean` | Profile setup flow | Yes | No |
| `@vigyaan/auth_session` | Student session credentials | `AuthSession` | `features/auth` | **No** (cleared) | Yes (JWT / Session token) |
| `@vigyaan/student_profile` | Student profile details | `StudentProfile` | `features/profile` | **No** (cleared) | Yes (Server profile record) |
| `@vigyaan/dashboard_cache` | Cached home dashboard summary | `DashboardCache` | `features/home` | No | Yes (Server dashboard feed) |
| `@vigyaan/app_settings` | Student app settings | `AppSettings` | `features/settings` | Yes | Yes (User preferences sync) |
| `@vigyaan/games_progress` | Per-game level completion & mastery | `Record<GameId, GameProgress>` | `features/games` | No | Yes (Cloud game state) |
| `@vigyaan/last_played_game` | Quick resume game and level | `{ gameId, levelId, timestamp }` | `features/games` | No | Yes |
| `@vigyaan/games_streak` | Game-specific daily play streak | `GameStreakInfo` | `features/games` | No | Yes |
| `@vigyaan/games_daily_challenge` | Today's game challenge state | `DailyChallengeInfo` | `features/challenges` | No | Yes |
| `@vigyaan/games_favorites` | Starred games list | `string[]` | `features/games` | No | Yes |
| `@vigyaan/games_recent_history` | Chronological game play log | `GameHistoryItem[]` | `features/games` | No | Yes |
| `@vigyaan/games_badges` | Unlocked game-specific badges | `string[]` | `features/games` | No | Yes |
| `@vigyaan/notifications_state` | Read/deleted flags for notifications| `NotificationState[]` | `features/notifications` | No | Yes |
| `@vigyaan/fun_facts_progress` | Fun facts viewed & quizzes completed| `FunFactsProgress` | `features/fun-facts` | No | Yes |
| `@vigyaan/ff_first_time_dismissed` | Dismissed fact banner flag | `boolean` | `features/fun-facts` | Yes | No |
| `@vigyaan/riddle_progress` | Riddles attempted & solved | `RiddleProgress` | `features/riddles` | No | Yes |
| `@vigyaan/mystery_lab_progress` | Completed mystery cases & scores | `MysteryLabProgress` | `features/mystery-lab` | No | Yes |
| `@vigyaan/mystery_lab_active_session`| In-flight forensic investigation | `ActiveCaseSession` | `features/mystery-lab` | No | Yes |
| `@vigyaan/quiz_history` | Complete quiz attempt history | `QuizHistoryEntry[]` | `features/quiz` | No | Yes (Cloud quiz submissions) |
| `@vigyaan/quiz_daily_challenge` | Daily quiz challenge completion | `DailyQuizChallengeState` | `features/quiz` | No | Yes |
| `@vigyaan/achievements_unlocked` | Timestamped unlocked badge IDs | `Record<string, number>` | `features/achievements` | No | Yes (Cloud achievements) |
| `@vigyaan/certificates_earned` | Locally generated certificates | `CertificateRecord[]` | `features/certificates` | No | Yes (Server-verified certificates) |
| `@vigyaan/activity_history` | Canonical student activity log | `ActivityHistoryItem[]` | `features/activity` | No | Yes (Event stream sync) |
| `@vigyaan/xp_transactions` | Ledger of all XP awards & claims | `XpTransaction[]` | `features/xp` | No | Yes (XP wallet / balance sync) |
| `@vigyaan/missions_state` | Daily & weekly mission claims | `MissionsState` | `features/missions` | No | Yes |
| `@vigyaan/daily_goal_state` | 3 daily learning targets & progress | `DailyGoalState` | `features/daily-goal` | No | Yes |
| `@vigyaan/recent_searches` | Cached search query history | `string[]` | `features/search` | Yes | No |
| `@vigyaan/notification_preferences`| Notification toggle settings | `NotificationPreferences` | `features/notifications` | Yes | Yes (Device push settings) |
| `@vigyaan/notification_inbox` | In-app notification messages | `NotificationItem[]` | `features/notifications` | No | Yes (Cloud inbox) |
| `@vigyaan/micro_lessons_progress` | Micro-lesson reading progress | `Record<string, LessonProgress>` | `features/micro-lessons` | No | Yes |
| `@vigyaan/micro_lessons_bookmarks`| Bookmarked lesson IDs | `string[]` | `features/micro-lessons` | No | Yes |
| `@vigyaan/concept_maps_progress` | Explored concept maps and nodes | `Record<string, MapProgress>` | `features/concept-maps` | No | Yes |
| `@vigyaan/concept_maps_bookmarks` | Bookmarked concept map IDs | `string[]` | `features/concept-maps` | No | Yes |
| `@vigyaan/experiment_progress` | Completed lab simulations & results | `Record<string, LabProgress>` | `features/experiment-lab` | No | Yes |
| `@vigyaan/experiment_bookmarks` | Bookmarked experiment IDs | `string[]` | `features/experiment-lab` | No | Yes |
| `@vigyaan/celebration_state` | Deduplication set for celebrations | `CelebrationState` | `features/celebration` | No | No |
| `@vigyaan/spin_wheel_state` | Once-per-day spin wheel completion | `{ lastSpinDate: string \| null }` | `features/spin-wheel` | No | Yes |
| `@vigyaan/collections_progress` | Collection unlock progress per collection | `Record<string, { status?: string }>` | `features/science-passport` | No | Yes |
| `@vigyaan/explore_favorites` | Starred topics, scientists, discoveries| `string[]` | `features/explore` | No | Yes |
| `@vigyaan/explore_recently_viewed`| Recently browsed discovery items | `string[]` | `features/explore` | No | Yes |

---

## Storage Lifecycle Invariants

1. **Logout Safety**:
   `authService.logout()` wipes all private student identity, session, progress, activity history, and XP keys. It preserves device-level preferences (`@vigyaan/user_language`, `@vigyaan/app_settings`, `@vigyaan/notification_preferences`, `@vigyaan/has_launched_before`).
2. **Deterministic Deduplication**:
   All activity and ledger writes enforce unique keys (`dedupeKey`). Re-running operations will not double-write records or inflate XP balances.
3. **Graceful Fault Recovery**:
   When reading any key, if `JSON.parse` encounters malformed syntax, the storage wrapper catches the error, logs a debug warning, and transparently returns the safe default fallback value.
