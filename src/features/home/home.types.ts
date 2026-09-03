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
}
