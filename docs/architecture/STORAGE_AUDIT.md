# STORAGE_AUDIT.md

**Project:** Vigyaan  
**Date:** September 13, 2026

All keys use the `@vigyaan/` namespace prefix. Storage is managed via `src/storage/asyncStorage.ts` with in-memory cache + AsyncStorage fallback.

| Key Constant | AsyncStorage Key | Purpose | Owner Module |
|-------------|------------------|---------|-------------|
| `HAS_LAUNCHED_BEFORE` | `@vigyaan/has_launched_before` | First-launch detection | Bootstrap |
| `USER_LANGUAGE` | `@vigyaan/user_language` | Language preference (en/ta) | LanguageContext |
| `ONBOARDING_COMPLETED` | `@vigyaan/onboarding_completed` | Onboarding completion flag | Onboarding |
| `AUTH_SESSION` | `@vigyaan/auth_session` | Authenticated session | Auth SessionRepository |
| `STUDENT_PROFILE` | `@vigyaan/student_profile` | Student profile data | Auth / Profile |
| `STUDENT_PROFILE_SETUP_COMPLETE` | `@vigyaan/student_profile_setup_complete` | Profile setup completion | Auth |
| `DASHBOARD_CACHE` | `@vigyaan/dashboard_cache` | Cached dashboard snapshot | Home Dashboard |
| `APP_SETTINGS` | `@vigyaan/app_settings` | App preferences (notifications, quiz prefs) | Settings |
| `GAMES_PROGRESS` | `@vigyaan/games_progress` | All game level progress | Games Storage |
| `LAST_PLAYED_GAME` | `@vigyaan/last_played_game` | Last played game info | Games Storage |
| `GAMES_STREAK` | `@vigyaan/games_streak` | Daily game streak | Games Storage |
| `GAMES_DAILY_CHALLENGE` | `@vigyaan/games_daily_challenge` | Today's daily game challenge | Games Storage |
| `GAMES_FAVORITES` | `@vigyaan/games_favorites` | Favorite games list | Games Storage |
| `GAMES_RECENT_HISTORY` | `@vigyaan/games_recent_history` | Recent game sessions | Games Storage |
| `GAMES_BADGES` | `@vigyaan/games_badges` | Unlocked game badges | Games Storage |
| `NOTIFICATIONS_STATE` | `@vigyaan/notifications_state` | Notification read state | Notifications |
| `NOTIFICATION_PREFERENCES` | `@vigyaan/notification_preferences` | Notification toggle preferences | Settings |
| `NOTIFICATION_INBOX` | `@vigyaan/notification_inbox` | Generated notification inbox | Notifications Factory |
| `FUN_FACTS_PROGRESS` | `@vigyaan/fun_facts_progress` | Fun facts quiz progress | Fun Facts |
| `FUN_FACTS_DISMISSED` | `@vigyaan/ff_first_time_dismissed` | Fun facts first-time dismiss | Fun Facts |
| `RIDDLE_PROGRESS` | `@vigyaan/riddle_progress` | Riddle category progress | Riddles |
| `MYSTERY_LAB_PROGRESS` | `@vigyaan/mystery_lab_progress` | Mystery lab case progress | Mystery Lab |
| `MYSTERY_LAB_ACTIVE_SESSION` | `@vigyaan/mystery_lab_active_session` | Active mystery investigation | Mystery Lab |
| `QUIZ_HISTORY` | `@vigyaan/quiz_history` | Quiz attempt history | Quiz |
| `QUIZ_DAILY_CHALLENGE` | `@vigyaan/quiz_daily_challenge` | Quiz daily challenge state | Quiz |
| `ACHIEVEMENTS_UNLOCKED` | `@vigyaan/achievements_unlocked` | Unlocked achievements map | Achievements |
| `CERTIFICATES_EARNED` | `@vigyaan/certificates_earned` | Earned certificates list | Certificates |
| `ACTIVITY_HISTORY` | `@vigyaan/activity_history` | Activity event ledger | Activity |
| `XP_TRANSACTIONS` | `@vigyaan/xp_transactions` | XP transaction ledger | XP |
| `MISSIONS_STATE` | `@vigyaan/missions_state` | Daily missions progress | Missions |
| `DAILY_GOAL_STATE` | `@vigyaan/daily_goal_state` | Daily goal tracker | Daily Goal |
| `RECENT_SEARCHES` | `@vigyaan/recent_searches` | Recent search queries | Search |
| `MICRO_LESSONS_PROGRESS` | `@vigyaan/micro_lessons_progress` | Micro lesson progress | Micro Lessons |
| `MICRO_LESSONS_BOOKMARKS` | `@vigyaan/micro_lessons_bookmarks` | Micro lesson bookmarks | Micro Lessons |
| `CONCEPT_MAPS_PROGRESS` | `@vigyaan/concept_maps_progress` | Concept map progress | Concept Maps |
| `CONCEPT_MAPS_BOOKMARKS` | `@vigyaan/concept_maps_bookmarks` | Concept map bookmarks | Concept Maps |
| `EXPERIMENT_PROGRESS` | `@vigyaan/experiment_progress` | Experiment progress | Experiment Lab |
| `EXPERIMENT_BOOKMARKS` | `@vigyaan/experiment_bookmarks` | Experiment bookmarks | Experiment Lab |
| `CELEBRATION_STATE` | `@vigyaan/celebration_state` | Celebration overlay state | Celebration |
| `SPIN_WHEEL_STATE` | `@vigyaan/spin_wheel_state` | Spin wheel daily state | Spin Wheel |
| `COLLECTIONS_PROGRESS` | `@vigyaan/collections_progress` | Science collections progress | Science Passport |
| `EXPLORE_FAVORITES` | `@vigyaan/explore_favorites` | Explore section favorites | Explore |
| `EXPLORE_RECENTLY_VIEWED` | `@vigyaan/explore_recently_viewed` | Recently viewed explore items | Explore |

## Cleanup Behavior

- **Logout:** Clears session, profile, activity history, XP, missions, achievements, certificates, games progress, quiz history, micro lessons, concept maps, experiments, mystery lab, riddles, celebrations, spin wheel, explore data, and dashboard cache. Preserves app settings, language preference, and onboarding state.
- **Demo Reset:** Full fresh-install state via `clearAllDevelopmentState()`.

## Migration Notes

- **3 duplicate key aliases removed** in this session (same underlying AsyncStorage values).
- All keys are schema-versioned via JSON parsing with graceful fallback.
- No backend-replaced keys yet; all keys are local-only.

## Corrupt Data Handling

- JSON parse failures return `defaultValue` (null or provided fallback).
- Corrupted auth session is auto-cleared on detection.
- Storage operations never crash the app; all errors are caught internally.
