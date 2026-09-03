/**
 * Vigyaan Mystery Lab — Core Data Types & Models
 * Strongly typed investigation system for science mystery cases.
 */

// ============================================================================
// Localization
// ============================================================================

export interface LocalizedText {
  en: string;
  ta: string;
}

// ============================================================================
// Enums & Categories
// ============================================================================

export type MysteryCategory =
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'space'
  | 'environment'
  | 'human-body'
  | 'everyday-science'
  | 'scientific-history';

export type MysteryDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type GradeRange = '6-7' | '8-10' | '11-12';

export type ClueType =
  | 'measurement'
  | 'observation'
  | 'document'
  | 'image'
  | 'sample'
  | 'statement';

export type ClueRelevance = 'essential' | 'supporting' | 'distractor';

export type MysteryStep =
  | 'introduction'
  | 'scene'
  | 'investigate'
  | 'clues'
  | 'evidence-board'
  | 'hypotheses'
  | 'conclusion'
  | 'result'
  | 'learning-insight';

export type ConfidenceLevel = 'low' | 'medium' | 'high';

export type EvidenceRelation = 'supports' | 'contradicts' | 'explains';

export type HintCost = {
  scoreDeduction: number;
};

// ============================================================================
// Case Data Models
// ============================================================================

export interface MysteryClue {
  id: string;
  title: LocalizedText;
  observation: LocalizedText;
  type: ClueType;
  relevance: ClueRelevance;
  dataLabel?: LocalizedText;
  dataValue?: LocalizedText;
  icon?: string;
}

export interface MysteryHypothesis {
  id: string;
  title: LocalizedText;
  explanation: LocalizedText;
}

export interface EvidenceConnection {
  fromClueId: string;
  toClueId: string;
  relation: EvidenceRelation;
}

export interface EvidenceRule {
  clueIds: string[];
  supportsHypothesisIds?: string[];
  contradictsHypothesisIds?: string[];
}

export interface MysteryHint {
  id: string;
  text: LocalizedText;
  cost: HintCost;
}

export interface MysteryReward {
  xp: number;
  badgeId?: string;
}

export interface SceneObject {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  clueConnectionId: string;
  icon: string;
  position: { x: number; y: number };
}

export interface MysteryCase {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  category: MysteryCategory;
  gradeRange: GradeRange;
  difficulty: MysteryDifficulty;
  estimatedMinutes: number;
  objective: LocalizedText;
  clues: MysteryClue[];
  hypotheses: MysteryHypothesis[];
  correctHypothesisId: string;
  explanation: LocalizedText;
  learningConcepts: string[];
  learningConceptIds: string[];
  rewards: MysteryReward;
  hints: MysteryHint[];
  sceneObjects: SceneObject[];
  evidenceConnections?: EvidenceConnection[];
  evidenceRules?: EvidenceRule[];
}

// ============================================================================
// Investigation State
// ============================================================================

export interface InvestigationState {
  caseId: string;
  currentStep: MysteryStep;
  discoveredClueIds: string[];
  inspectedObjectIds: string[];
  selectedEvidenceIds: string[];
  selectedHypothesisId?: string;
  confidence?: ConfidenceLevel;
  notes?: string;
  hintsUsed: string[];
  startedAt: number;
  completedAt?: number;
  elapsedMs: number;
}

// ============================================================================
// Scoring
// ============================================================================

export interface MysteryScoreBreakdown {
  conclusionPoints: number;
  evidencePoints: number;
  investigationPoints: number;
  timeBonusPoints: number;
  hintDeductions: number;
  totalScore: number;
  stars: 0 | 1 | 2 | 3;
  isPerfect: boolean;
}

export interface MysteryResultPayload {
  caseId: string;
  correct: boolean;
  score: MysteryScoreBreakdown;
  discoveredClueCount: number;
  totalClueCount: number;
  selectedEvidenceCount: number;
  hintsUsedCount: number;
  elapsedMs: number;
  elapsedFormatted: string;
  selectedHypothesisId: string;
  correctHypothesisId: string;
  completedAt: number;
}

// ============================================================================
// Progress & Storage
// ============================================================================

export interface MysteryCaseProgress {
  attempted: boolean;
  completed: boolean;
  bestScore: number;
  bestStars: 0 | 1 | 2 | 3;
  timesAttempted: number;
  completedAt?: number;
}

export interface MysteryProgress {
  completedCases: string[];
  attemptedCases: string[];
  caseProgress: Record<string, MysteryCaseProgress>;
  bestScores: Record<string, number>;
  mysteryStreak: {
    currentStreak: number;
    longestStreak: number;
    lastPlayedDate: string;
    history: string[];
  };
  favorites: string[];
  recentCases: string[];
  dailyMysteryCompletion: Record<string, string>;
  totalCasesSolved: number;
  averageScore: number;
  bestScore: number;
}

// ============================================================================
// Badges
// ============================================================================

export interface MysteryBadge {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  category: 'completion' | 'mastery' | 'streak' | 'special';
  requirement: string;
  requirementDescription: LocalizedText;
  unlockedAt?: number;
}

export type MysteryBadgeEvent =
  | 'MYSTERY_STARTED'
  | 'CLUE_DISCOVERED'
  | 'CASE_SOLVED'
  | 'PERFECT_CASE'
  | 'MYSTERY_STREAK_UPDATED'
  | 'CATEGORY_MASTERED';

// ============================================================================
// Collections
// ============================================================================

export interface MysteryCollection {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  accentColor: string;
  category: MysteryCategory;
}

// ============================================================================
// Recommendation
// ============================================================================

export interface MysteryRecommendation {
  caseId: string;
  reason: LocalizedText;
}

// ============================================================================
// Notification Events (Future-ready)
// ============================================================================

export type MysteryNotificationEvent =
  | 'DAILY_MYSTERY_READY'
  | 'CASE_SOLVED'
  | 'PERFECT_INVESTIGATION'
  | 'NEW_MYSTERY_AVAILABLE';

// ============================================================================
// Future Backend Contract
// ============================================================================

export interface MysteryBackendContract {
  getCases(): Promise<MysteryCase[]>;
  getCase(caseId: string): Promise<MysteryCase | null>;
  saveProgress(progress: MysteryProgress): Promise<void>;
  submitInvestigation(result: MysteryResultPayload): Promise<void>;
  getMysteryProgress(): Promise<MysteryProgress>;
}
