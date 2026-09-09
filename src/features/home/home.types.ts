/**
 * Dashboard Types & Models
 * Strongly typed structures for the Vigyaan Student Home Dashboard.
 */

export interface StudentHeaderInfo {
  name: string;
  grade: string;
  schoolName: string;
  avatarUrl?: string;
  unreadNotificationsCount: number;
}

export interface ContinueTopic {
  subject: string;
  topicTitle: string;
  progressPercentage: number;
  remainingTimeMinutes?: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  titleTa?: string;
  questionPreview: string;
  questionPreviewTa?: string;
  durationMinutes: number;
  xpReward: number;
}

export interface AchievementItem {
  id: string;
  title: string;
  titleTa?: string;
  unlockedLabel: string;
  icon: string;
}

export interface DailyGoalPreview {
  title: string;
  titleTa: string;
  current: number;
  target: number;
  rewardPoints: number;
  rewardXp: number;
  status: 'active' | 'completed' | 'claimed';
}

export interface DashboardData {
  student: StudentHeaderInfo;
  overallProgressPercentage: number;
  streakDays: number;
  points: number;
  rank?: number;
  continueTopic?: ContinueTopic | null;
  dailyChallenge?: DailyChallenge | null;
  recentAchievement?: AchievementItem | null;
  isNewStudent?: boolean;
  /** Unified science level summary (from the XP/levels domain). */
  scienceLevel?: {
    level: number;
    title: string;
    titleTa: string;
    icon: string;
    progressPercent: number;
    totalXp: number;
    xpToNextLevel: number;
    isMaxLevel: boolean;
  } | null;
  /** First daily mission preview (from the missions domain). */
  dailyMissionPreview?: {
    title: string;
    titleTa: string;
    icon: string;
    current: number;
    target: number;
    claimed: boolean;
  } | null;
  /** Daily Goal preview. */
  dailyGoalPreview?: DailyGoalPreview | null;
  /** Rule-based recommended activity. */
  recommendedActivity?: {
    title: string;
    titleTa: string;
    subtitle: string;
    subtitleTa: string;
    icon: string;
    route: string;
  } | null;
}
