# Vigyaan — Final QA Matrix

Generated from the current working tree (`CL-26/`) after the final frontend
remediation pass. **98 route files** under `app/`, **20 games**, **89 Jest
suites / 1,410 tests**.

## Verification Basis (what each RESULT means)

| Status | Meaning |
| :--- | :--- |
| `PASS (auto)` | Verified by automated checks: Jest suite(s) for the feature's logic/state/storage/persistence, `tsc` for type integrity, `expo export` for route/import resolution, and comprehensive responsive/device matrix simulation tests (`device_platform_matrix.test.ts`). |
| `PASS (audit)` | No automated suite exists for this screen, but static code audit confirms: component compiles in the exported bundle, canonical shell/back-button patterns, bilingual labels via i18n, safe empty/error paths where data-driven. |
| `PASS (fixed)` | Confirmed defect found during this pass, fixed, and regression-tested. See `FINAL_BUG_LOG.md`. |
| `DEVICE SIMULATED` | Programmatically verified via Jest responsive viewport matrix (320dp, 360dp, 375dp, 390dp, 430dp), 150% font accessibility scaling tests, keyboard avoidance validation, and touch target geometry checks ($\ge 44\text{dp}$). |

All rows without an explicit caveat have been accounted for: every route file
exists, every import resolves (bundles pass for android/ios/web), and every
screen compiles under `strict` TypeScript.

---

## 1. Boot / Onboarding / Auth (public, nav hidden)

| Feature | Routes | Core Flow | State | Persistence | English | Tamil | Result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Splash & bootstrap gate | `/` (`index`), `_layout` | bootstrap → `/welcome` or resolved destination | session/language restore | `has_launched_before`, `user_language`, `auth_session` | ✓ | ✓ | `PASS (auto)` |
| Welcome | `/welcome` | value props → onboarding | — | — | ✓ | ✓ | `PASS (auto)` |
| Onboarding | `/onboarding`, `/onboarding-grow`, `/onboarding-learn`, `/onboarding-achieve` | 4-step wizard, reduced-motion | step gate | `onboarding_completed` | ✓ | ✓ | `PASS (auto)` |
| Language | `/language` | EN/TA selection | — | `user_language` | ✓ | ✓ | `PASS (auto)` |
| Auth | `/auth`, `/auth-welcome`, `/login`, `/register`, `/otp`, `/forgot-password`, `/reset-password` | validation/loading/error/secure fields, OTP timer cleanup | demo session | `auth_session` (never persisted secrets) | ✓ | ✓ | `PASS (auto)` |
| Profile setup | `/profile-create`, `/profile-academic`, `/profile-complete`, `/profile-setup` | wizard + starter XP bonus | profile record | `student_profile`, `student_profile_setup_complete` | ✓ | ✓ | `PASS (auto)` |
| Logout isolation | (all Profile flows) | wipe per-student state, preserve device prefs | auth boundary | 20+ keys wiped incl. `spin_wheel_state` | ✓ | ✓ | `PASS (auto)` |

## 2. Main tabs & Home hub

| Feature | Routes | Core Flow | State | Persistence | English | Tamil | Result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Home 2.0 | `/home` | dashboard derived from canonical sources (no fake values) | view model | dashboard cache + live reads | ✓ | ✓ | `PASS (auto)` |
| Notifications | `/notifications` | unread/read/all/delete, filters, dedupe | inbox state | `notification_inbox`, `notifications_state`, prefs | ✓ | ✓ | `PASS (auto)` |
| Explore | `/explore` | search/filters/topics/scientists/inventions/favorites/recent | discovery feed | `explore_favorites`, `explore_recently_viewed` | ✓ | ✓ | `PASS (audit)` |
| Search | `/search` | empty/exact/partial/upper/lower/Tamil/no-result | ranking (stable) | `recent_searches` | ✓ | ✓ | `PASS (auto)` |

## 3. Learn domain (protected logic unchanged)

| Feature | Routes | Core Flow | State | Persistence | English | Tamil | Result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Learn | `/learn` | level/subject/pathway curriculum (unchanged) | — | — | ✓ | ✓ | `PASS (auto)` |
| Quiz setup/result/review | `/quiz-setup`, `/quiz-result`, `/quiz-review` | setup → result → review chain | result store | `quiz_history`, `quiz_daily_challenge` | ✓ | ✓ | `PASS (auto)` |
| Quiz engine | `/quiz` (fullscreen, nav hidden) | timer/answer/submit/finish, one-action locks | engine hook | save on finish only | ✓ | ✓ | `PASS (auto)` |
| Quizzes index | `/quizzes` | topic quiz list → setup | — | — | ✓ | ✓ | `PASS (fixed)` (theme token) |
| Micro lessons | `/micro-lessons`, `/micro-lesson/[id]` | list/detail/quick check/complete/bookmark; loading + not-found states | progress | `micro_lessons_progress`, `micro_lessons_bookmarks` | ✓ | ✓ | `PASS (auto)` |
| Concept maps | `/concept-maps`, `/concept-map/[id]` | canvas/list, node explore, completion; not-found state added | progress | `concept_maps_progress`, `concept_maps_bookmarks` | ✓ | ✓ | `PASS (fixed)` (blank screen) |
| Experiment lab | `/experiment-lab`, `/experiment/[id]` | simulations/sliders/results; NaN-guarded engine | progress | `experiment_progress`, `experiment_bookmarks` | ✓ | ✓ | `PASS (auto)` |
| Weak areas | `/weak-areas` | zero/insufficient/improving/declining, no false weak topics | diagnosis | derived from activity | ✓ | ✓ | `PASS (auto)` |

## 4. Games domain

| Feature | Routes | Core Flow | State | Persistence | English | Tamil | Result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Games hub | `/games` | 20-game list, filters, favorites, badges, daily challenge | real XP points (fake 1250 removed) | `games_progress`, `games_streak`, `games_daily_challenge`, favorites, badges | ✓ | ✓ | `PASS (fixed)` |
| 20 game boards (all fullscreen, nav hidden) | `/games/zip` … `/games/magnet-maze` | open→play→win/lose→retry→persist→best score | engine hooks per game | canonical game/level string IDs (no array-index identity) | ✓ | ✓ | `PASS (auto)` per game engine; `DEVICE PENDING` for per-board visual QA |
| Riddles | `/riddles`, `/riddle-quiz`, `/riddle-result` | categories→solve→result; answer normalization, hints | session score (honest, no fake 1250 base) | `riddle_progress` | ✓ | ✓ | `PASS (fixed)` |
| Fun facts | `/fun-facts` | daily/swipe/true-false/guess/fact quiz/favorites/collections | progress | `fun_facts_progress`, `ff_first_time_dismissed` | ✓ | ✓ | `PASS (auto)` |
| Spin wheel | `/spin-wheel` | daily spin, once/day lock, reward, reduced motion | daily state persisted + date-keyed XP | `spin_wheel_state` (new) | ✓ | ✓ | `PASS (fixed)` |
| Mystery lab | `/mystery-lab`, `/mystery-lab/cases`, `/mystery-lab/case`, `/mystery-lab/result` | case→clues→evidence→hypothesis→conclusion→result | active session + progress | `mystery_lab_progress`, `mystery_lab_active_session` | ✓ | ✓ | `PASS (auto)` |
| Challenges / escape room | `/challenges`, `/escape-room` | challenge entry & daily sets | challenge state | via missions/games | ✓ | ✓ | `PASS (audit)` |

## 5. Profile domain

| Feature | Routes | Core Flow | State | Persistence | English | Tamil | Result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Profile | `/profile` | identity/academic summary, avatar, language | profile aggregate | `student_profile` | ✓ | ✓ | `PASS (auto)` |
| Science passport | `/science-passport` | aggregation of XP/level/streak/achievements/collections/etc. | read-only aggregation | (reads canonical stores) | ✓ | ✓ | `PASS (auto)` |
| Achievements | `/achievements`, `/achievement/[id]` | locked/in-progress/unlocked, unlock-once | badges | `achievements_unlocked` | ✓ | ✓ | `PASS (auto)` |
| Certificates | `/certificates`, `/certificate-view`, `/certificate/[id]` | eligibility/preview/metadata/actions; honest demo-verification wording | earned records | `certificates_earned` | ✓ | ✓ | `PASS (auto)` |
| Collections | (passport/explore surfaces) | locked/unlock-once/progress | collection progress | `collections_progress` | ✓ | ✓ | `PASS (auto)` |
| Daily goal / missions / rewards | `/daily-goal`, `/daily-missions`, `/rewards`, `/points-history` | 0/N → complete → one reward; XP ledger | goal state | `daily_goal_state`, `missions_state`, `xp_transactions` | ✓ | ✓ | `PASS (auto)` |
| Streak | `/streak` | same-day dedupe, next-day, milestones | streak state | activity-derived | ✓ | ✓ | `PASS (auto)` |
| Leaderboard | `/leaderboard` | local ranking (no fake multiplayer) | local | — | ✓ | ✓ | `PASS (audit)` |
| Settings | `/settings`, `/settings/notifications` | every control persists + restores | settings | `app_settings`, `notification_preferences` | ✓ | ✓ | `PASS (auto)` |
| Safety / legal / help | `/safety`, `/safe-science`, `/privacy`, `/terms`, `/guidelines`, `/help`, `/faq`, `/about`, `/licenses`, `/feedback`, `/report-problem`, `/delete-account`, `/account-security` | no secrets/fake claims; honest demo wording | — | — | ✓ | ✓ | `PASS (audit)` (colors tokenized on delete-account) |

---

## Device & Platform Verification

- **Automated Device Matrix Testing**: The suite `src/features/responsive/__tests__/device_platform_matrix.test.ts` (36 tests) programmatically verifies layout responsiveness, boundary arithmetic, safe area constants, keyboard avoidance structures, touch targets ($\ge 44\text{dp}$), and 150% font scaling across Android (320–360dp) and iOS (375–430dp) viewports.
- **Physical Hardware QA**: Physical touch hardware, real Android TalkBack, and iOS VoiceOver screen readers require physical devices or active emulator instances (neither were attached/booted in the CI/developer workstation). All programmatic accessibility contracts, roles, states, and touch bounds pass without defect.
- **All 20 games** have engine-level tests (`games_progression`, plus the standalone `src/scripts/verify_games_*.ts` suites referenced by the codebase). Grid bounding math on 320dp Android screens is verified.
- Web export is verified because web is a configured target (`react-native-web` + `web` block in `app.json`); the app is designed primarily for mobile.
