# FRONTEND_BACKEND_CONTRACT.md

**Project:** Vigyaan  
**Date:** September 13, 2026  
**Status:** CONTRACT DEFINITION — NOT YET INTEGRATED

---

This document specifies what the Vigyaan frontend requires from the backend for successful integration. It defines frontend domain models, required/optional fields, expected behaviors, and integration boundaries.

**⚠️ No backend source was provided. This contract is based on frontend analysis. Backend must confirm or negotiate these contracts before integration.**

---

## 1. AUTHENTICATION

### Frontend Model
```typescript
interface AuthSession {
  userId: string;
  email?: string;
  mobileNumber?: string;
  fullName?: string;
  isAuthenticated: boolean;
  authMode: 'password' | 'otp' | 'register' | 'demo';
  createdAt: number;
}
```

### Required Fields
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| userId | string | YES | Unique identifier, never empty |
| isAuthenticated | boolean | YES | Must be true for valid session |
| authMode | enum | YES | 'password' \| 'otp' \| 'register' \| 'demo' |
| createdAt | number | YES | Unix timestamp (ms) |

### Optional Fields
| Field | Type | Notes |
|-------|------|-------|
| email | string | Present if registered with email |
| mobileNumber | string | Present if registered with mobile |
| fullName | string | Student display name |

### Backend Responsibilities
- `POST /auth/register` → Create student account, return session
- `POST /auth/request-otp` → Send OTP to identifier
- `POST /auth/verify-otp` → Verify OTP, return session
- `POST /auth/login` → Authenticate with password or OTP
- `POST /auth/logout` → Invalidate session
- `GET /auth/session` → Validate/restore session from token
- `POST /auth/forgot-password` → Start recovery flow
- `POST /auth/reset-password` → Complete recovery

### Frontend Adapter Interface
```typescript
interface IAuthService {
  loginWithPassword(payload: PasswordLoginPayload): Promise<AuthActionResult>;
  requestLoginOtp(payload: OtpLoginPayload): Promise<AuthActionResult>;
  loginAsDemo(): Promise<AuthActionResult>;
  logout(): Promise<boolean>;
}
```

---

## 2. SESSION

### Frontend Model
```typescript
interface AuthSession {
  userId: string;
  isAuthenticated: boolean;
  // ... (see above)
}
```

### Required Behaviors
| Behavior | Requirement |
|----------|-------------|
| Token storage | Secure storage (NOT AsyncStorage in production) |
| Token refresh | Automatic refresh before expiry |
| Session validation | `GET /auth/session` must validate token |
| Expired session | Return 401 → frontend clears session → redirect to auth |
| Invalid session | Return 401 → frontend clears session |
| Logout | Clear server session + clear all per-user local state |

### Frontend Reset on Logout
The frontend clears these keys on logout:
- AUTH_SESSION
- STUDENT_PROFILE
- STUDENT_PROFILE_SETUP_COMPLETE
- ACTIVITY_HISTORY
- XP_TRANSACTIONS
- MISSIONS_STATE
- ACHIEVEMENTS_UNLOCKED
- CERTIFICATES_EARNED
- GAMES_PROGRESS, GAMES_STREAK, GAMES_RECENT_HISTORY
- QUIZ_HISTORY
- MICRO_LESSONS_PROGRESS, CONCEPT_MAPS_PROGRESS, EXPERIMENT_PROGRESS
- MYSTERY_LAB_PROGRESS, RIDDLE_PROGRESS
- CELEBRATION_STATE, SPIN_WHEEL_STATE
- EXPLORE_FAVORITES, EXPLORE_RECENTLY_VIEWED
- DAILY_GOAL_STATE
- DASHBOARD_CACHE

**Preserved on logout:** USER_LANGUAGE, ONBOARDING_COMPLETED, APP_SETTINGS, NOTIFICATION_PREFERENCES

---

## 3. PROFILE

### Frontend Model
```typescript
interface StoredProfile {
  avatarId?: string;
  fullName?: string;
  grade?: string;
  section?: string;
  school?: string;
  city?: string;
  points?: number;
  streak?: number;
}
```

### Required Fields
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| fullName | string | YES | Student display name |
| grade | string | YES | e.g. "Grade 8" |
| section | string | YES | e.g. "A" |
| school | string | YES | School name |

### Optional Fields
| Field | Type | Notes |
|-------|------|-------|
| avatarId | string | Avatar identifier |
| city | string | City/district |
| points | number | Total XP (authoritative from backend) |
| streak | number | Current streak (authoritative from backend) |

### Backend Responsibilities
- `GET /profile` → Return student profile
- `PUT /profile` → Update profile fields
- `PUT /profile/preferences` → Sync app settings

### Frontend Behavior
- Profile is read from local storage on every Home load
- Profile is updated locally on profile setup/edit
- Backend sync should be bidirectional with conflict resolution

---

## 4. LEARNING CONTENT

### Frontend Model
```typescript
interface Pathway {
  id: string;
  title: { en: string; ta: string };
  description: { en: string; ta: string };
  subject: string;
  topics: Topic[];
}
```

### Backend Responsibilities
- `GET /curriculum/levels` → Foundation/Core/Advanced
- `GET /curriculum/subjects` → Physics/Chemistry/Biology
- `GET /curriculum/pathways?level=&subject=` → Pathways with topics

### Frontend Behavior
- Learning content currently bundled locally (mock data)
- Backend should serve bilingual content (EN/TA)
- Frontend filters by grade → level → subject → pathway
- Content keys must match frontend i18n structure

---

## 5. LESSON PROGRESS

### Frontend Model
```typescript
interface LessonProgress {
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completedSteps: number;
  totalSteps: number;
  completedAt?: number;
}
```

### Backend Responsibilities
- `GET /progress/lessons` → All lesson progress
- `PUT /progress/lessons/{id}` → Update lesson progress
- `POST /progress/sync` → Batch sync local deltas

### Frontend Behavior
- Progress tracked locally (micro-lessons, concept maps, experiments)
- Each has its own storage key
- Backend sync should be additive (merge, not replace)

---

## 6. QUIZ

### Frontend Model
```typescript
interface Question {
  id: string;
  prompt: { en: string; ta: string };
  options: Array<{ en: string; ta: string }>;
  correctIndex: number;
  explanation: { en: string; ta: string };
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  percentage: number;
  bestStreak: number;
  timeTakenMs: number;
  completedAt: number;
}
```

### Backend Responsibilities
- `GET /quiz/questions?level=&subject=&pathway=&difficulty=&count=` → Questions
- `POST /quiz/sessions` → Create quiz attempt
- `PUT /quiz/sessions/{id}/complete` → Submit result, return verified result
- `GET /quiz/history` → Recent quiz history

### Frontend Behavior
- Questions served locally (mock data)
- Scoring done locally (client-side)
- Backend should validate scores server-side
- Quiz history persisted locally in QUIZ_HISTORY

---

## 7. XP (EXPERIENCE POINTS)

### Frontend Model
```typescript
interface XpTransaction {
  id: string;
  amount: number;
  source: string; // 'lesson_completed' | 'quiz_completed' | 'game_completed' | etc.
  timestamp: number;
  metadata?: Record<string, unknown>;
}
```

### XP Sources (Event Map)
| Source | Typical Amount | Trigger |
|--------|---------------|---------|
| Lesson completion | 25-50 | Micro-lesson/concept map/experiment completed |
| Quiz completion | 10-100 | Quiz result submitted |
| Game completion | 15-75 | Game level completed |
| Daily goal | 50-100 | Daily goal achieved |
| Achievement | 25-50 | Achievement unlocked |
| Spin wheel | 10-100 | Daily spin completed |
| Mystery lab | 30-80 | Case solved |

### Backend Responsibilities
- `GET /progress/summary` → Total XP, level, progress
- Backend should be authoritative for XP in production
- Offline XP events should sync via `POST /progress/sync`

### Frontend Behavior
- XP tracked locally in XP_TRANSACTIONS ledger
- Deduplication: same event ID never awarded twice
- Level calculated via `calculateScienceLevel(totalXp)`

---

## 8. STREAK

### Frontend Model
```typescript
interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string; // YYYY-MM-DD
  history: string[]; // dates with activity
}
```

### Backend Responsibilities
- `GET /streaks` → Current/longest streak + history
- Backend authoritative for streak in production

### Frontend Behavior
- Streak computed from activity history dates
- Same-day activities do not increase streak
- Streak increments on first activity of a new day

---

## 9. DAILY GOAL

### Frontend Model
```typescript
interface DailyGoalWithProgress {
  definition: {
    title: string;
    titleTa: string;
    target: number;
    reward: { points: number; xp: number };
  };
  progress: { current: number; target: number };
  status: 'active' | 'completed' | 'claimed';
}
```

### Backend Responsibilities
- `GET /daily-goal` → Today's goal definition + progress
- `POST /daily-goal/complete` → Mark goal complete
- `POST /daily-goal/claim` → Claim reward

### Frontend Behavior
- Goal initialized from activity history
- Progress tracked locally
- One reward event per goal completion (deduplication enforced)

---

## 10. ACHIEVEMENTS

### Frontend Model
```typescript
interface AchievementBadge {
  id: string;
  title: { en: string; ta: string };
  description: { en: string; ta: string };
  icon: string;
  category: string;
  requirement: BadgeRequirement;
  unlockedAt?: number;
}
```

### Backend Responsibilities
- `GET /achievements` → Achievement catalog
- `POST /achievements/unlock` → Verify and record unlock

### Frontend Behavior
- Achievement evaluation done locally (achievements.engine.ts)
- Unlocked achievements stored in ACHIEVEMENTS_UNLOCKED
- One unlock event per achievement (no duplicates)

---

## 11. GAMES

### Frontend Model
```typescript
interface GameResult {
  gameId: GameId;
  levelId: string;
  levelIndex: number;
  completed: boolean;
  score: number;
  stars?: 1 | 2 | 3;
  timeMs: number;
  moves: number;
  mistakes: number;
  isPerfect?: boolean;
  completedAt: number;
}
```

### 20 Games
1. Zip, 2. Wend, 3. Patches, 4. Mini Sudoku, 5. Tango
6. Queens, 7. Element Match, 8. Molecule Builder, 9. Circuit Lab, 10. Memory Matrix
11. Orbit, 12. Reaction Sort, 13. Science Word Grid, 14. Pattern Lab, 15. Logic Lock
16. Gravity Path, 17. Lab Escape, 18. Time Machine, 19. DNA Sequence, 20. Magnet Maze

### Backend Responsibilities
- `PUT /games/{gameId}/levels/{levelId}/complete` → Submit result
- `GET /games/{gameId}/progress` → User's progress
- `GET /games/daily` → Daily challenge

### Frontend Behavior
- Game engine runs entirely client-side
- Result submitted to backend after completion
- Backend authoritative for XP rewards
- Level progress persisted locally in GAMES_PROGRESS

---

## 12. CERTIFICATES

### Frontend Model
```typescript
interface Certificate {
  certificateId: string;
  studentId: string;
  achievement: string;
  issueDate: string;
  verificationUrl?: string;
}
```

### Backend Responsibilities
- `POST /certificates/issue` → Issue certificate
- `GET /certificates` → List earned certificates
- `GET /certificates/{id}/verify` → Public verification

### Frontend Behavior
- Certificates are local preview only until backend integration
- Valid certificate ID → show certificate
- Invalid ID → show not-found state
- No fabricated certificates

---

## 13. LEADERBOARD

### Frontend Model
```typescript
interface LeaderboardEntry {
  rank: number;
  studentId: string;
  displayName: string;
  level: number;
  totalXp: number;
  periodXp: number;
  movement: number;
  isCurrentUser: boolean;
  avatarInitials: string;
}
```

### Backend Responsibilities
- `GET /leaderboard?scope=&period=` → Rankings

### Frontend Behavior
- Currently uses DemoLeaderboardRepository (deterministic mock)
- Current user injected from real session identity
- Backend replaces demo repo without UI changes

---

## 14. NOTIFICATIONS

### Frontend Model
```typescript
interface AppNotification {
  id: string;
  type: string;
  title: { en: string; ta: string };
  body: { en: string; ta: string };
  isRead: boolean;
  createdAt: number;
  action?: { route: string; params?: Record<string, string> };
}
```

### Backend Responsibilities
- `GET /notifications` → Inbox
- `POST /notifications/read` → Mark as read
- `POST /notifications/read-all` → Mark all read
- `DELETE /notifications/{id}` → Delete notification

### Frontend Behavior
- Mock notifications + generated notifications (local)
- Backend should serve real notification inbox

---

## 15. FAVORITES & RECENT ACTIVITY

### Frontend Model
```typescript
// Favorites
type Favorites = Record<string, boolean>; // key → favorited

// Recent Activity
interface ActivityHistoryItem {
  id: string;
  type: string; // 'quiz_completed' | 'game_completed' | etc.
  title: string;
  titleTa: string;
  timestamp: number;
  xpEarned: number;
  metadata?: Record<string, unknown>;
}
```

### Backend Responsibilities
- `GET /favorites` → User's favorites
- `PUT /favorites/{id}` → Toggle favorite
- `GET /activity` → Recent activity history

### Frontend Behavior
- Favorites stored locally (EXPLORE_FAVORITES)
- Activity history stored locally (ACTIVITY_HISTORY)
- Backend sync should merge, not replace

---

## Integration Priority Order

When backend becomes available, integrate in this order:

1. **Authentication** (login, register, OTP, session)
2. **Session** (token management, refresh, expiry)
3. **Profile** (read, update, preferences)
4. **Home bootstrap** (dashboard aggregation)
5. **Learning** (content, pathways)
6. **Lesson progress** (micro-lessons, concept maps, experiments)
7. **Quiz** (questions, sessions, results)
8. **XP** (transactions, level calculation)
9. **Streak** (current, longest, history)
10. **Achievements** (catalog, unlocks)
11. **Games** (progress, results, daily challenge)
12. **Certificates** (issue, verify)
13. **Leaderboard** (rankings)
14. **Notifications** (inbox, read status)
15. **Favorites & Activity** (sync, history)

---

*This contract is based on frontend source analysis. Backend developer must confirm or negotiate before integration begins.*
