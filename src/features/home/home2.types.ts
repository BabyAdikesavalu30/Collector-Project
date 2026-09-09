/**
 * Home 2.0 Types & View Models
 * Strongly typed structures for the upgraded personalized Home Dashboard.
 * All data is DERIVED from existing canonical feature stores.
 * Home is an aggregation/view layer — never a source of truth.
 */

// ============================================================================
// Student Identity
// ============================================================================

export interface HomeStudent {
  name: string;
  initials: string;
  grade: string;
  school: string;
  avatarId?: string;
  unreadNotifications: number;
}

// ============================================================================
// Today Overview
// ============================================================================

export interface TodayOverview {
  /** Today's date key (YYYY-MM-DD). */
  dateKey: string;
  /** Greeting message key. */
  greeting: string;
  /** XP earned today. */
  xpToday: number;
  /** Activities completed today. */
  activitiesToday: number;
  /** Current streak days. */
  streakDays: number;
  /** Next streak milestone (if applicable). */
  nextStreakMilestone?: number;
}

// ============================================================================
// Daily Goal
// ============================================================================

export interface HomeDailyGoal {
  title: string;
  titleTa: string;
  current: number;
  target: number;
  status: 'active' | 'completed' | 'claimed';
  rewardPoints: number;
  rewardXp: number;
}

// ============================================================================
// Continue Learning
// ============================================================================

export type ContinueLearningSource =
  | 'micro-lesson'
  | 'concept-map'
  | 'experiment'
  | 'mystery'
  | 'quiz';

export interface ContinueLearningItem {
  source: ContinueLearningSource;
  title: string;
  titleTa: string;
  subtitle: string;
  subtitleTa: string;
  subject: string;
  progressPercent: number;
  route: string;
  icon: string;
}

// ============================================================================
// Focus Area
// ============================================================================

export interface HomeFocusArea {
  topic: string;
  topicTa: string;
  subject: string;
  subjectTa: string;
  accuracy: number;
  action: {
    label: string;
    labelTa: string;
    route: string;
  };
}

// ============================================================================
// Progress Snapshot
// ============================================================================

export interface HomeProgressSnapshot {
  totalActivities: number;
  topicsExplored: number;
  practiceAccuracy: number | null;
  overallProgress: number;
  scienceLevel: {
    level: number;
    title: string;
    titleTa: string;
    icon: string;
    progressPercent: number;
    totalXp: number;
  } | null;
}

// ============================================================================
// Achievement Preview
// ============================================================================

export interface HomeAchievementPreview {
  id: string;
  title: string;
  titleTa: string;
  icon: string;
  unlockedLabel: string;
  unlockedLabelTa: string;
}

// ============================================================================
// Discovery / Collection Preview
// ============================================================================

export interface HomeDiscoveryPreview {
  title: string;
  titleTa: string;
  subtitle: string;
  subtitleTa: string;
  icon: string;
  completedCount: number;
  totalCount: number;
  route: string;
}

// ============================================================================
// Certificate Preview
// ============================================================================

export interface HomeCertificatePreview {
  count: number;
  latestTitle: string;
  latestTitleTa: string;
  route: string;
}

// ============================================================================
// Science Passport Preview
// ============================================================================

export interface HomePassportPreview {
  level: number;
  levelTitle: string;
  levelTitleTa: string;
  badgeCount: number;
  collectionCount: number;
  experimentCount: number;
  route: string;
}

// ============================================================================
// Explore Section Items
// ============================================================================

export interface HomeExploreItem {
  id: string;
  icon: string;
  title: string;
  titleTa: string;
  subtitle: string;
  subtitleTa: string;
  route: string;
  accentColor: string;
  bgColor: string;
}

// ============================================================================
// Recent Activity
// ============================================================================

export interface HomeRecentActivity {
  id: string;
  type: string;
  title: string;
  titleTa: string;
  timestamp: number;
  xpEarned: number;
  icon: string;
}

// ============================================================================
// Daily Challenge (preserved from existing)
// ============================================================================

export interface HomeDailyChallenge {
  id: string;
  title: string;
  titleTa: string;
  questionPreview: string;
  questionPreviewTa: string;
  durationMinutes: number;
  xpReward: number;
}

// ============================================================================
// Recommendation
// ============================================================================

export type HomeRecommendationReason =
  | 'daily_goal'
  | 'continue_learning'
  | 'focus_area'
  | 'daily_challenge'
  | 'streak'
  | 'achievement'
  | 'discovery'
  | 'experiment'
  | 'mystery'
  | 'game'
  | 'certificate'
  | 'passport'
  | 'explore';

export interface HomeRecommendation {
  reason: HomeRecommendationReason;
  title: string;
  titleTa: string;
  subtitle: string;
  subtitleTa: string;
  icon: string;
  route: string;
}

// ============================================================================
// Full Home 2.0 View Model
// ============================================================================

export interface HomeViewModel {
  /** Student identity. */
  student: HomeStudent;

  /** Today's overview. */
  today: TodayOverview;

  /** Daily goal state. */
  dailyGoal: HomeDailyGoal | null;

  /** Primary recommended action. */
  primaryRecommendation: HomeRecommendation | null;

  /** Continue learning item (unfinished activity). */
  continueLearning: ContinueLearningItem | null;

  /** Focus area (weak area needing attention). */
  focusArea: HomeFocusArea | null;

  /** Progress snapshot. */
  progress: HomeProgressSnapshot;

  /** Recent achievement preview. */
  recentAchievement: HomeAchievementPreview | null;

  /** Discovery / collection preview. */
  discovery: HomeDiscoveryPreview | null;

  /** Certificate preview. */
  certificate: HomeCertificatePreview | null;

  /** Science Passport preview. */
  passport: HomePassportPreview | null;

  /** Daily challenge. */
  dailyChallenge: HomeDailyChallenge | null;

  /** Explore section items. */
  exploreItems: HomeExploreItem[];

  /** Recent activity (last 5). */
  recentActivity: HomeRecentActivity[];

  /** Quick action items. */
  quickActions: Array<{
    id: string;
    icon: string;
    label: string;
    labelTa: string;
    route: string;
  }>;

  /** Whether data is loading. */
  isLoading: boolean;

  /** Whether data is from offline cache. */
  isOffline: boolean;

  /** Error message if assembly failed. */
  error: string | null;
}
