/**
 * Progress Feature Domain Models
 * Strongly-typed definitions for Subject Progress 2.0.
 * Strictly adheres to Section 6 specifications: no `any`.
 */

export type SubjectId =
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'space'
  | 'environment'
  | 'human-body'
  | 'everyday-science';

export type PerformanceTrend = 'improving' | 'stable' | 'declining' | 'insufficientData';

export type StrengthLevel = 'exploring' | 'developing' | 'strong' | 'advanced';

export type TopicStatus =
  | 'not_started'
  | 'exploring'
  | 'in_progress'
  | 'strong'
  | 'improving'
  | 'focus_area'
  | 'completed';

export type GradeContext = 'grade_6_7' | 'grade_8_10' | 'grade_11_12';

export interface QuizReference {
  levelId: string;
  subjectId: string;
  pathwayId: string;
}

/** Section 6: SubjectProgress model */
export interface SubjectProgress {
  subjectId: string;
  title: string;
  overallProgress: number; // 0–100 percentage
  activityCount: number;
  completedActivities: number;
  topicCount: number;
  topicsStarted: number;
  topicsCompleted: number;
  averageAccuracy: number; // 0–100 percentage
  recentAccuracy: number; // 0–100 percentage
  improvingTopicCount: number;
  focusAreaCount: number;
  lastActivityAt: number | null;
  trend: PerformanceTrend;
  confidence: number; // 0–100 practice confidence
  strengthLevel: StrengthLevel;
}

/** Section 6: TopicProgress model */
export interface TopicProgress {
  topicId: string;
  subjectId: string;
  title: string;
  progressPercent: number; // 0–100 percentage
  attempts: number;
  correct: number;
  incorrect: number;
  accuracy: number; // 0–100 percentage
  recentAccuracy: number; // 0–100 percentage
  status: TopicStatus;
  trend: PerformanceTrend;
  lastActivityAt: number | null;
  microLessonId?: string;
  conceptMapId?: string;
  experimentId?: string;
  learnReference?: string;
  quizReference?: QuizReference;
}

/** Aggregated overall journey metrics for the student */
export interface OverallProgress {
  overallProgress: number; // 0–100 percentage
  streakDays: number;
  totalXp: number;
  achievementsCount: number;
  certificatesCount: number;
  subjectsExplored: number;
  totalSubjects: number;
  topicsExplored: number;
  totalTopics: number;
  activitiesCompleted: number;
  focusAreasCount: number;
  lastActivityAt: number | null;
}

/** Evidence-based subject strength entry */
export interface SubjectStrength {
  subjectId: string;
  title: string;
  progress: number;
  accuracy: number;
  strengthLevel: StrengthLevel;
}

/** Lightweight recent activity item shown on Progress screens */
export interface RecentProgressActivity {
  id: string;
  title: string;
  titleTa?: string;
  subjectId: string;
  topicTitle?: string;
  activityType: 'quiz' | 'micro_lesson' | 'concept_map' | 'experiment' | 'riddle' | 'mystery' | 'general';
  timestamp: number;
  route?: string;
}

/** Topic definition in the science curriculum catalog */
export interface TopicCatalogEntry {
  id: string;
  subjectId: SubjectId;
  title: { en: string; ta: string };
  gradeGroups: GradeContext[];
  microLessonId?: string;
  conceptMapId?: string;
  experimentId?: string;
  learnPathwayId?: string;
  quizReference?: QuizReference;
}

/** Subject visual and contextual metadata */
export interface SubjectMeta {
  id: SubjectId;
  title: { en: string; ta: string };
  subtitle: { en: string; ta: string };
  icon: string;
  color: string;
  accentBg: string;
}
