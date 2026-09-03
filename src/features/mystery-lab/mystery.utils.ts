/**
 * Vigyaan Mystery Lab — Utility Functions
 * Deterministic helpers for daily case selection, date formatting, localization, and validation.
 */

import { LocalizedText, MysteryCase, MysteryCategory, GradeRange, MysteryDifficulty } from './mystery.types';

// ============================================================================
// Date Utilities
// ============================================================================

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDaysDifference(dateA: string, dateB: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utcA = Date.UTC(
    parseInt(dateA.substring(0, 4), 10),
    parseInt(dateA.substring(5, 7), 10) - 1,
    parseInt(dateA.substring(8, 10), 10)
  );
  const utcB = Date.UTC(
    parseInt(dateB.substring(0, 4), 10),
    parseInt(dateB.substring(5, 7), 10) - 1,
    parseInt(dateB.substring(8, 10), 10)
  );
  return Math.floor((utcB - utcA) / msPerDay);
}

// ============================================================================
// Deterministic Daily Case Selection
// ============================================================================

/**
 * Simple deterministic hash for consistent daily case selection.
 * Same date always produces the same case index.
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

export function getDailyCaseId(cases: MysteryCase[], dateStr?: string): string {
  const date = dateStr || getTodayDateString();
  const hash = simpleHash(`mystery-lab-daily-${date}`);
  const index = hash % cases.length;
  return cases[index].id;
}

// ============================================================================
// Localization Helpers
// ============================================================================

export function localize(text: LocalizedText, lang: 'en' | 'ta'): string {
  return lang === 'ta' ? text.ta : text.en;
}

// ============================================================================
// Time Formatting
// ============================================================================

export function formatElapsedMs(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function formatElapsedSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// ============================================================================
// Category Helpers
// ============================================================================

export const CATEGORY_CONFIG: Record<MysteryCategory, { icon: string; color: string; labelEn: string; labelTa: string }> = {
  physics: { icon: '⚡', color: '#2563EB', labelEn: 'Physics', labelTa: 'இயற்பியல்' },
  chemistry: { icon: '🧪', color: '#7E22CE', labelEn: 'Chemistry', labelTa: 'வேதியியல்' },
  biology: { icon: '🧬', color: '#16A34A', labelEn: 'Biology', labelTa: 'உயிரியல்' },
  space: { icon: '🪐', color: '#4F46E5', labelEn: 'Space', labelTa: 'விண்வெளி' },
  environment: { icon: '🌿', color: '#0D9488', labelEn: 'Environment', labelTa: 'சுற்றுச்சூழல்' },
  'human-body': { icon: '🫀', color: '#DC2626', labelEn: 'Human Body', labelTa: 'மனித உடல்' },
  'everyday-science': { icon: '🔬', color: '#D97706', labelEn: 'Everyday Science', labelTa: 'தினசரி அறிவியல்' },
  'scientific-history': { icon: '📜', color: '#9333EA', labelEn: 'Scientific History', labelTa: 'அறிவியல் வரலாறு' },
};

export const DIFFICULTY_CONFIG: Record<MysteryDifficulty, { color: string; labelEn: string; labelTa: string }> = {
  beginner: { color: '#16A34A', labelEn: 'Beginner', labelTa: 'தொடக்கநிலை' },
  intermediate: { color: '#2563EB', labelEn: 'Intermediate', labelTa: 'இடைநிலை' },
  advanced: { color: '#D97706', labelEn: 'Advanced', labelTa: 'மேம்பட்ட' },
  expert: { color: '#DC2626', labelEn: 'Expert', labelTa: 'நிபுணர்' },
};

export const GRADE_RANGE_CONFIG: Record<GradeRange, { labelEn: string; labelTa: string }> = {
  '6-7': { labelEn: 'Grades 6–7', labelTa: 'வகுப்பு 6–7' },
  '8-10': { labelEn: 'Grades 8–10', labelTa: 'வகுப்பு 8–10' },
  '11-12': { labelEn: 'Grades 11–12', labelTa: 'வகுப்பு 11–12' },
};

// ============================================================================
// Hint Cost Constants
// ============================================================================

export const HINT_COSTS: readonly { hintNumber: number; scoreDeduction: number }[] = [
  { hintNumber: 1, scoreDeduction: 5 },
  { hintNumber: 2, scoreDeduction: 10 },
  { hintNumber: 3, scoreDeduction: 15 },
] as const;

// ============================================================================
// Step Ordering
// ============================================================================

export const STEP_ORDER: readonly string[] = [
  'introduction',
  'scene',
  'investigate',
  'clues',
  'evidence-board',
  'hypotheses',
  'conclusion',
  'result',
  'learning-insight',
] as const;

export function getStepIndex(step: string): number {
  return STEP_ORDER.indexOf(step);
}

// ============================================================================
// Clue Discovery Helpers
// ============================================================================

/**
 * For beginner cases, all clues are discoverable immediately.
 * For intermediate+, clues are discovered by inspecting scene objects.
 */
export function shouldRevealAllClues(difficulty: MysteryDifficulty): boolean {
  return difficulty === 'beginner';
}

// ============================================================================
// Validation Helpers
// ============================================================================

export function isValidGradeRange(grade: string): grade is GradeRange {
  return ['6-7', '8-10', '11-12'].includes(grade);
}

export function isValidDifficulty(diff: string): diff is MysteryDifficulty {
  return ['beginner', 'intermediate', 'advanced', 'expert'].includes(diff);
}

export function isValidCategory(cat: string): cat is MysteryCategory {
  return [
    'physics', 'chemistry', 'biology', 'space', 'environment',
    'human-body', 'everyday-science', 'scientific-history',
  ].includes(cat);
}
