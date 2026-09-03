/**
 * Vigyaan Mystery Lab — Scoring Engine
 * Deterministic scoring with transparent breakdown.
 *
 * Scoring Scale: 0–100
 *
 * Components:
 * - Correct conclusion: +50
 * - Relevant evidence: up to +25 (proportional)
 * - Investigation completeness: up to +15 (proportional)
 * - Time bonus: up to +10
 * - Hints: deductions (-5, -10, -15)
 *
 * Stars:
 * - 3 stars: 90+
 * - 2 stars: 70–89
 * - 1 star: 1–69
 * - 0: not completed
 */

import {
  MysteryCase,
  MysteryScoreBreakdown,
  InvestigationState,
  ClueRelevance,
} from './mystery.types';
import { HINT_COSTS } from './mystery.utils';

// ============================================================================
// Constants
// ============================================================================

const MAX_SCORE = 100;

const CONCLUSION_POINTS = 50;
const EVIDENCE_POINTS = 25;
const INVESTIGATION_POINTS = 15;
const TIME_BONUS_MAX = 10;

/**
 * Estimated optimal time in ms based on case difficulty.
 * Used for time bonus calculation.
 */
const OPTIMAL_TIME_MS: Record<string, number> = {
  beginner: 3 * 60 * 1000,      // 3 minutes
  intermediate: 5 * 60 * 1000,   // 5 minutes
  advanced: 8 * 60 * 1000,       // 8 minutes
  expert: 12 * 60 * 1000,        // 12 minutes
};

// ============================================================================
// Scoring Functions
// ============================================================================

/**
 * Calculate complete mystery score from investigation result.
 */
export function calculateMysteryScore(
  mysteryCase: MysteryCase,
  state: InvestigationState,
  isCorrect: boolean
): MysteryScoreBreakdown {
  const conclusionPoints = calculateConclusionPoints(isCorrect);
  const evidencePoints = calculateEvidencePoints(mysteryCase, state);
  const investigationPoints = calculateInvestigationPoints(mysteryCase, state);
  const timeBonusPoints = calculateTimeBonus(mysteryCase, state);
  const hintDeductions = calculateHintDeductions(state);

  const rawTotal = conclusionPoints + evidencePoints + investigationPoints + timeBonusPoints + hintDeductions;
  const totalScore = Math.max(0, Math.min(MAX_SCORE, rawTotal));
  const stars = getStarRating(totalScore);
  const isPerfect = totalScore === MAX_SCORE && isCorrect && state.hintsUsed.length === 0;

  return {
    conclusionPoints,
    evidencePoints,
    investigationPoints,
    timeBonusPoints,
    hintDeductions,
    totalScore,
    stars,
    isPerfect,
  };
}

/**
 * Points for selecting the correct hypothesis.
 */
function calculateConclusionPoints(isCorrect: boolean): number {
  return isCorrect ? CONCLUSION_POINTS : 0;
}

/**
 * Points proportional to evidence selection quality.
 * Student selects relevant clues as evidence.
 */
function calculateEvidencePoints(
  mysteryCase: MysteryCase,
  state: InvestigationState
): number {
  if (state.selectedEvidenceIds.length === 0) return 0;

  const essentialClues = mysteryCase.clues.filter((c) => c.relevance === 'essential');
  const selectedEssentialCount = state.selectedEvidenceIds.filter((id) =>
    essentialClues.some((c) => c.id === id)
  ).length;

  // Proportional to essential evidence found
  const ratio = essentialClues.length > 0 ? selectedEssentialCount / essentialClues.length : 0;
  return Math.round(ratio * EVIDENCE_POINTS);
}

/**
 * Points for completeness of investigation (clues discovered, objects inspected).
 */
function calculateInvestigationPoints(
  mysteryCase: MysteryCase,
  state: InvestigationState
): number {
  const totalClues = mysteryCase.clues.length;
  const discovered = state.discoveredClueIds.length;
  const clueRatio = totalClues > 0 ? discovered / totalClues : 0;

  const totalObjects = mysteryCase.sceneObjects.length;
  const inspected = state.inspectedObjectIds.length;
  const objectRatio = totalObjects > 0 ? inspected / totalObjects : 0;

  // Weighted: 70% clues + 30% objects
  const combinedRatio = clueRatio * 0.7 + objectRatio * 0.3;
  return Math.round(combinedRatio * INVESTIGATION_POINTS);
}

/**
 * Bonus for completing faster than the estimated time.
 * No penalty for taking longer.
 */
function calculateTimeBonus(
  mysteryCase: MysteryCase,
  state: InvestigationState
): number {
  const optimalMs = OPTIMAL_TIME_MS[mysteryCase.difficulty] || 5 * 60 * 1000;
  const elapsed = state.elapsedMs;

  if (elapsed <= 0) return 0;

  // Full bonus if completed in half the optimal time
  // Linear scale: full bonus at 0, zero bonus at 2x optimal
  const ratio = elapsed / optimalMs;
  if (ratio <= 0.5) return TIME_BONUS_MAX;
  if (ratio >= 2) return 0;

  const normalized = 1 - (ratio - 0.5) / 1.5;
  return Math.round(normalized * TIME_BONUS_MAX);
}

/**
 * Deductions for hints used.
 */
function calculateHintDeductions(state: InvestigationState): number {
  let deductions = 0;
  for (const hintId of state.hintsUsed) {
    const hintIndex = parseInt(hintId.replace('hint-', ''), 10) - 1;
    const cost = HINT_COSTS[hintIndex]?.scoreDeduction || 0;
    deductions -= cost;
  }
  return deductions;
}

/**
 * Star rating based on total score.
 */
export function getStarRating(score: number): 0 | 1 | 2 | 3 {
  if (score >= 90) return 3;
  if (score >= 70) return 2;
  if (score >= 1) return 1;
  return 0;
}

/**
 * Get the count of essential clues in a case.
 */
export function getEssentialClueCount(mysteryCase: MysteryCase): number {
  return mysteryCase.clues.filter((c) => c.relevance === 'essential').length;
}

/**
 * Count how many of the student's selected evidence are essential.
 */
export function getSelectedEssentialCount(
  mysteryCase: MysteryCase,
  selectedEvidenceIds: string[]
): number {
  return selectedEvidenceIds.filter((id) =>
    mysteryCase.clues.some((c) => c.id === id && c.relevance === 'essential')
  ).length;
}
