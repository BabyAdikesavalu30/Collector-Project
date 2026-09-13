# Vigyaan / VigyaanXpo — Complete Route Matrix (98 Route Files)

Expo Router file-based routing under `app/` (98 route files). All screens render inside a single global shell (`app/_layout.tsx` -> `src/components/navigation/AppShell.tsx`) that owns the canonical 4-tab bottom navigation (Home · Learn · Games · Profile).

| Route Path | Source File | Purpose | Parameters | Back Behavior | Data Dependencies |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `app/index.tsx` | Index Route (Screen 01 Entry Screen) | `None` | router.replace(...) | Static UI |
| `/about` | `app/about.tsx` | About Vigyaan Screen (/about) | `None` | router.back() / fallback | LanguageContext |
| `/account-security` | `app/account-security.tsx` | Account Security Boundary Route (/account-security) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/achievement/[id]` | `app/achievement/[id].tsx` | Achievement Detail Deep Link Route (/achievement/[id]) | `{ id: string }` | canGoBack() ? back() : fallback | LanguageContext |
| `/achievements` | `app/achievements.tsx` | Achievements Route (/achievements) | `None` | canGoBack() ? back() : fallback | LanguageContext |
| `/auth` | `app/auth.tsx` | Route Alias / Forwarder for Auth Welcome (Screen 07) | `None` | router.back() / fallback | Static UI |
| `/auth-welcome` | `app/auth-welcome.tsx` | Authentication Welcome Route (Screen 07 - /auth-welcome) | `None` | router.replace(...) | AsyncStorage, LanguageContext |
| `/certificate-view` | `app/certificate-view.tsx` | Certificate View Route (/certificate-view) | `{ id?: string; recipientName?: string; g` | canGoBack() ? back() : fallback | AsyncStorage, LanguageContext |
| `/certificate/[id]` | `app/certificate/[id].tsx` | Certificate Detail Route (/certificate/[id]) | `{ id?: string }` | canGoBack() ? back() : fallback | LanguageContext |
| `/certificates` | `app/certificates.tsx` | Certificates Route (/certificates) | `None` | canGoBack() ? back() : fallback | LanguageContext |
| `/challenges` | `app/challenges.tsx` | Challenges Route (/challenges) | `None` | canGoBack() ? back() : fallback | LanguageContext |
| `/concept-map/[id]` | `app/concept-map/[id].tsx` | Concept Map Detail Route (/concept-map/[id]) | `{ id?: string }` | canGoBack() ? back() : fallback | LanguageContext |
| `/concept-maps` | `app/concept-maps.tsx` | Concept Maps Hub Route (/concept-maps) | `None` | canGoBack() ? back() : fallback | LanguageContext |
| `/daily-goal` | `app/daily-goal.tsx` | Daily Goal Route (/daily-goal) | `None` | canGoBack() ? back() : fallback | DomainService, LanguageContext |
| `/daily-missions` | `app/daily-missions.tsx` | Daily / Weekly Missions Route (/daily-missions) | `None` | canGoBack() ? back() : fallback | DomainService, LanguageContext |
| `/delete-account` | `app/delete-account.tsx` | Delete Account Boundary Route (/delete-account) | `None` | router.back() / fallback | LanguageContext |
| `/escape-room` | `app/escape-room.tsx` | Escape Room Boundary Route (/escape-room) | `None` | router.replace(...) | Static UI |
| `/experiment-lab` | `app/experiment-lab.tsx` | Experiment Lab Hub Route (/experiment-lab) | `None` | canGoBack() ? back() : fallback | LanguageContext |
| `/experiment/[id]` | `app/experiment/[id].tsx` | Experiment Detail Route (/experiment/[id]) | `{ id?: string }` | canGoBack() ? back() : fallback | LanguageContext |
| `/explore` | `app/explore.tsx` | Explore 2.0 Route (/explore) | `None` | canGoBack() ? back() : fallback | AsyncStorage, DomainService, LanguageContext |
| `/faq` | `app/faq.tsx` | FAQ Boundary Route (/faq) | `None` | router.back() / fallback | LanguageContext |
| `/feedback` | `app/feedback.tsx` | Feedback Boundary Route (/feedback) | `None` | router.back() / fallback | LanguageContext |
| `/forgot-password` | `app/forgot-password.tsx` | Production Forgot Password Route (Screen 11 - /forgot-password) | `None` | router.replace(...) | LanguageContext |
| `/fun-facts` | `app/fun-facts.tsx` | Fun Facts Route (/fun-facts) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games` | `app/games/index.tsx` | Games Hub Route (/games) | `None` | canGoBack() ? back() : fallback | LanguageContext |
| `/games/circuit-lab` | `app/games/circuit-lab.tsx` | Circuit Lab Game Screen (/games/circuit-lab) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/dna-sequence` | `app/games/dna-sequence.tsx` | DNA Sequence Game Screen (/games/dna-sequence) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/element-match` | `app/games/element-match.tsx` | Element Match Game Screen (/games/element-match) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/gravity-path` | `app/games/gravity-path.tsx` | Gravity Path Game Screen (/games/gravity-path) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/lab-escape` | `app/games/lab-escape.tsx` | Lab Escape Game Screen (/games/lab-escape) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/logic-lock` | `app/games/logic-lock.tsx` | Logic Lock Game Screen (/games/logic-lock) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/magnet-maze` | `app/games/magnet-maze.tsx` | Magnet Maze Game Screen (/games/magnet-maze) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/memory-matrix` | `app/games/memory-matrix.tsx` | Memory Matrix Game Screen (/games/memory-matrix) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/mini-sudoku` | `app/games/mini-sudoku.tsx` | Mini Sudoku Game Screen (/games/mini-sudoku) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/molecule-builder` | `app/games/molecule-builder.tsx` | Molecule Builder Game Screen (/games/molecule-builder) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/orbit` | `app/games/orbit.tsx` | Orbit Game Screen (/games/orbit) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/patches` | `app/games/patches.tsx` | Patches Game Screen (/games/patches) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/pattern-lab` | `app/games/pattern-lab.tsx` | Pattern Lab Game Screen (/games/pattern-lab) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/queens` | `app/games/queens.tsx` | Queens Game Screen (/games/queens) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/reaction-sort` | `app/games/reaction-sort.tsx` | Reaction Sort Game Screen (/games/reaction-sort) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/science-word-grid` | `app/games/science-word-grid.tsx` | Science Word Grid Game Screen (/games/science-word-grid) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/tango` | `app/games/tango.tsx` | Tango Game Screen (/games/tango) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/time-machine` | `app/games/time-machine.tsx` | Time Machine Game Screen (/games/time-machine) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/wend` | `app/games/wend.tsx` | Wend Game Screen (/games/wend) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/games/zip` | `app/games/zip.tsx` | Zip Game Screen (/games/zip) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/guidelines` | `app/guidelines.tsx` | Community Guidelines Boundary Route (/guidelines) | `None` | router.back() / fallback | LanguageContext |
| `/help` | `app/help.tsx` | Help & Support Screen (/help) | `None` | router.back() / fallback | LanguageContext |
| `/home` | `app/home.tsx` | Production Home Dashboard Route (Screen 14 - /home) | `None` | router.replace(...) | DomainService, LanguageContext |
| `/language` | `app/language.tsx` | Language Selection Route (Screen 06 - /language) | `None` | router.back() / fallback | AsyncStorage, DomainService, LanguageContext |
| `/leaderboard` | `app/leaderboard.tsx` | Leaderboard Route (/leaderboard) | `None` | canGoBack() ? back() : fallback | AsyncStorage, DomainService, LanguageContext |
| `/learn` | `app/learn.tsx` | Production Learn Screen Route (Screen 17 — /learn) | `None` | router.replace(...) | LanguageContext |
| `/licenses` | `app/licenses.tsx` | Open Source Licenses Boundary Route (/licenses) | `None` | router.back() / fallback | LanguageContext |
| `/login` | `app/login.tsx` | Production Login Route (Screen 08 - /login) | `None` | router.replace(...) | LanguageContext |
| `/micro-lesson/[id]` | `app/micro-lesson/[id].tsx` | Micro Lesson Detail Route (/micro-lesson/[id]) | `{ id?: string }` | canGoBack() ? back() : fallback | LanguageContext |
| `/micro-lessons` | `app/micro-lessons.tsx` | Micro Lessons Hub Route (/micro-lessons) | `None` | canGoBack() ? back() : fallback | LanguageContext |
| `/mystery-lab` | `app/mystery-lab.tsx` | Mystery Lab Route (/mystery-lab) | `None` | router.back() / fallback | LanguageContext |
| `/mystery-lab/case` | `app/mystery-lab/case.tsx` | Mystery Lab Case Route (/mystery-lab/case) | `{ caseId?: string }` | router.replace(...) | LanguageContext |
| `/mystery-lab/cases` | `app/mystery-lab/cases.tsx` | Mystery Lab Cases Route (/mystery-lab/cases) | `None` | router.back() / fallback | LanguageContext |
| `/mystery-lab/result` | `app/mystery-lab/result.tsx` | Mystery Lab Result Route (/mystery-lab/result) | `None` | router.back() / fallback | Static UI |
| `/notifications` | `app/notifications.tsx` | Notifications Route (/notifications) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/onboarding` | `app/onboarding.tsx` | Onboarding Route (Screen 03 - /onboarding) | `None` | router.replace(...) | AsyncStorage |
| `/onboarding-achieve` | `app/onboarding-achieve.tsx` | Onboarding Route (Screen 04 - /onboarding-achieve) | `None` | router.replace(...) | AsyncStorage |
| `/onboarding-grow` | `app/onboarding-grow.tsx` | Onboarding Route (Screen 05 - /onboarding-grow) | `None` | router.replace(...) | AsyncStorage |
| `/onboarding-learn` | `app/onboarding-learn.tsx` | Route Alias / Forwarder for Onboarding Step 2 | `None` | router.back() / fallback | Static UI |
| `/otp` | `app/otp.tsx` | Production OTP Verification Route (Screen 10 - /otp) | `{ mode?: string; context?: string; ident` | router.replace(...) | LanguageContext |
| `/points-history` | `app/points-history.tsx` | Points History Route (/points-history) | `None` | canGoBack() ? back() : fallback | DomainService, LanguageContext |
| `/privacy` | `app/privacy.tsx` | Privacy Policy Screen (/privacy) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/profile` | `app/profile.tsx` | Student Profile 2.0 Route (/profile) | `None` | canGoBack() ? back() : fallback | DomainService, LanguageContext |
| `/profile-academic` | `app/profile-academic.tsx` | Academic Setup Route (Screen 14 - /profile-academic) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/profile-complete` | `app/profile-complete.tsx` | Profile Complete Route (Screen 15 - /profile-complete) | `None` | router.replace(...) | AsyncStorage, DomainService, LanguageContext |
| `/profile-create` | `app/profile-create.tsx` | Create Profile Route (Screen 13 - /profile-create) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/profile-setup` | `app/profile-setup.tsx` | Profile Setup Boundary Route (/profile-setup) | `None` | router.replace(...) | Static UI |
| `/progress` | `app/progress.tsx` | Progress Hub Route (/progress) | `None` | canGoBack() ? back() : fallback | AsyncStorage, LanguageContext |
| `/progress/[subject]` | `app/progress/[subject].tsx` | Subject Progress Detail Route (/progress/[subject]) | `{ subject?: string }` | canGoBack() ? back() : fallback | LanguageContext |
| `/quiz` | `app/quiz.tsx` | Quiz Engine Route (/quiz) | `{ levelId?: string; subjectId?: string; ` | router.replace(...) | AsyncStorage, LanguageContext |
| `/quiz-result` | `app/quiz-result.tsx` | Quiz Results Route (/quiz-result) | `{ totalQuestions?: string; correctAnswer` | router.replace(...) | AsyncStorage, LanguageContext |
| `/quiz-review` | `app/quiz-review.tsx` | Quiz Review Answers Route (/quiz-review) | `None` | router.back() / fallback | LanguageContext |
| `/quiz-setup` | `app/quiz-setup.tsx` | Production Quiz Setup Route (Screen 18 - /quiz-setup) | `{ levelId?: string; subjectId?: string; ` | canGoBack() ? back() : fallback | AsyncStorage, DomainService, LanguageContext |
| `/quizzes` | `app/quizzes.tsx` | Science Quizzes Boundary Route (/quizzes) | `None` | router.back() / fallback | LanguageContext |
| `/register` | `app/register.tsx` | Production Student Registration Route (Screen 09 - /register) | `None` | router.replace(...) | LanguageContext |
| `/report-problem` | `app/report-problem.tsx` | Report Problem Boundary Route (/report-problem) | `None` | router.back() / fallback | LanguageContext |
| `/reset-password` | `app/reset-password.tsx` | Production Reset Password Route (Screen 12 - /reset-password) | `None` | router.replace(...) | LanguageContext |
| `/rewards` | `app/rewards.tsx` | Rewards Center Route (/rewards) | `None` | canGoBack() ? back() : fallback | AsyncStorage, DomainService, LanguageContext |
| `/riddle-quiz` | `app/riddle-quiz.tsx` | Riddle Quiz Route (/riddle-quiz) | `{ difficulty?: string; }` | router.replace(...) | LanguageContext |
| `/riddle-result` | `app/riddle-result.tsx` | Riddle Results Route (/riddle-result) | `{ difficulty?: string; totalRiddles?: st` | router.replace(...) | AsyncStorage, LanguageContext |
| `/riddles` | `app/riddles.tsx` | Science Riddles Category Selection Route (/riddles) | `None` | router.back() / fallback | AsyncStorage, LanguageContext |
| `/safe-science` | `app/safe-science.tsx` | Safe Science Route (/safe-science) | `None` | router.back() / fallback | LanguageContext |
| `/safety` | `app/safety.tsx` | Safety Hub Route (/safety) | `None` | router.back() / fallback | LanguageContext |
| `/science-passport` | `app/science-passport.tsx` | Science Passport Route (/science-passport) | `None` | canGoBack() ? back() : fallback | DomainService, LanguageContext |
| `/search` | `app/search.tsx` | Global Search Route (/search) | `None` | canGoBack() ? back() : fallback | DomainService, LanguageContext |
| `/settings` | `app/settings.tsx` | Production Settings Route (/settings) | `None` | router.replace(...) | LanguageContext |
| `/settings/notifications` | `app/settings/notifications.tsx` | Settings → Notification Preferences Route (/settings/notifications) | `None` | canGoBack() ? back() : fallback | LanguageContext |
| `/spin-wheel` | `app/spin-wheel.tsx` | Daily Spin Wheel Route (/spin-wheel) | `None` | canGoBack() ? back() : fallback | AsyncStorage, LanguageContext |
| `/streak` | `app/streak.tsx` | Streak & Activity Calendar Route (/streak) | `None` | canGoBack() ? back() : fallback | LanguageContext |
| `/terms` | `app/terms.tsx` | Terms & Conditions Screen (/terms) | `None` | router.back() / fallback | LanguageContext |
| `/weak-areas` | `app/weak-areas.tsx` | Weak Areas & Improvement Center Route (/weak-areas) | `None` | canGoBack() ? back() : fallback | LanguageContext |
| `/welcome` | `app/welcome.tsx` | Welcome Route (Screen 02 - /welcome) | `None` | router.replace(...) | AsyncStorage, LanguageContext |

---

## Root Shell & Navigation Rules

1. **Root Layout**: `app/_layout.tsx` mounts `SafeAreaProvider`, `LanguageProvider`, and `AppShell`.
2. **Centralized Tab Mapping**: Defined in `src/components/navigation/navigation.config.ts`.
3. **Canonical Back Control**: Every child header mounts `<AppBackButton />` enforcing a >=44x44 touch target and bilingual TalkBack / VoiceOver labeling.
