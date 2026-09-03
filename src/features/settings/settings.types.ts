/**
 * Settings Feature Types
 * Strongly typed preferences and configuration data for the Vigyaan mobile app.
 */

export type ThemePreference = 'system' | 'light' | 'dark';
export type TextScalePreference = 'small' | 'default' | 'large' | 'extraLarge';
export type LearningDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type PreferredLevel = 'foundation' | 'core' | 'advanced';
export type PreferredSubject = 'physics' | 'chemistry' | 'biology';

export interface AppSettings {
  // Preferences
  language: 'en' | 'ta';
  theme: ThemePreference;
  textScale: TextScalePreference;
  reduceMotion: boolean;

  // Notifications
  dailyChallengeNotifications: boolean;
  quizReminders: boolean;
  achievementNotifications: boolean;
  streakReminders: boolean;
  leaderboardNotifications: boolean;
  learningRecommendations: boolean;
  generalNotifications: boolean;

  // Learning Preferences
  preferredSubject: PreferredSubject;
  preferredLevel: PreferredLevel;
  dailyLearningGoal: number; // minutes: 5, 10, 15, 20, 30
  difficulty: LearningDifficulty;

  // Quiz Preferences
  questionsPerQuiz: number; // 5, 10, 15, 20, 30
  quizTimer: boolean;
  quizSound: boolean;
  answerExplanation: boolean;
  autoAdvance: boolean;
  confirmBeforeFinish: boolean;

  // Sound & Haptics
  soundEffects: boolean;
  successSounds: boolean;
  errorSounds: boolean;
  haptics: boolean;

  // Accessibility
  highContrast: boolean;
  screenReaderFriendly: boolean;

  // Privacy & Data
  analyticsEnabled: boolean;
  personalizedRecommendations: boolean;
  usageDataSharing: boolean;
  downloadOverWifiOnly: boolean;
  autoDownloadLessons: boolean;
}

export interface SelectionOption {
  value: string;
  label: string;
  subtitle?: string;
}

export interface SettingsSearchItem {
  id: string;
  section: string;
  title: string;
  subtitle: string;
  keywords: string[];
  icon: string;
  actionType: 'navigate' | 'modal' | 'toggle';
  targetKey?: keyof AppSettings;
  targetRoute?: string;
  modalType?: string;
}
