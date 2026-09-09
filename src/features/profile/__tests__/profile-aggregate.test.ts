/**
 * Profile Aggregation Tests
 * Science strengths, activity summary, milestones, and domain mapping.
 */

import {
  computeScienceStrengths,
  computeActivitySummary,
  computeReachedMilestones,
  StrengthInput,
} from '../profile.aggregate';
import { ActivityTypeCounts } from '../../activity';

describe('computeScienceStrengths', () => {
  it('returns all six domains with zero strength when no data exists', () => {
    const strengths = computeScienceStrengths({
      quizAccuracyBySubject: {},
      gameMasteryByDomain: {},
      mysterySolvedRatioByDomain: {},
      factDiscoveredRatioByDomain: {},
    });
    expect(strengths.length).toBe(6);
    for (const strength of strengths) {
      expect(strength.percent).toBe(0);
      expect(strength.signals).toEqual([]);
    }
  });

  it('averages available signals and excludes missing ones', () => {
    const input: StrengthInput = {
      quizAccuracyBySubject: { physics: 80 },
      gameMasteryByDomain: { physics: 40 },
      mysterySolvedRatioByDomain: {},
      factDiscoveredRatioByDomain: {},
    };
    const strengths = computeScienceStrengths(input);
    const physics = strengths.find((s) => s.domain === 'physics');
    expect(physics?.percent).toBe(60);
    expect(physics?.signals.sort()).toEqual(['games', 'quiz']);
  });

  it('clamps percentages to 0-100 before averaging', () => {
    const strengths = computeScienceStrengths({
      quizAccuracyBySubject: { chemistry: 150 },
      gameMasteryByDomain: { chemistry: -20 },
      mysterySolvedRatioByDomain: {},
      factDiscoveredRatioByDomain: {},
    });
    const chemistry = strengths.find((s) => s.domain === 'chemistry');
    // 150 → clamped 100, -20 → clamped 0 → average 50.
    expect(chemistry?.percent).toBe(50);
  });

  it('maps mystery and facts ratios into the right domains', () => {
    const strengths = computeScienceStrengths({
      quizAccuracyBySubject: {},
      gameMasteryByDomain: {},
      mysterySolvedRatioByDomain: { space: 50, environment: 100 },
      factDiscoveredRatioByDomain: { biology: 25 },
    });
    expect(strengths.find((s) => s.domain === 'space')?.percent).toBe(50);
    expect(strengths.find((s) => s.domain === 'environment')?.percent).toBe(100);
    expect(strengths.find((s) => s.domain === 'biology')?.percent).toBe(25);
    expect(strengths.find((s) => s.domain === 'physics')?.percent).toBe(0);
  });
});

describe('computeActivitySummary', () => {
  it('counts every activity type', () => {
    const counts: ActivityTypeCounts = {
      quiz_completed: 3,
      riddle_completed: 2,
      game_completed: 5,
      mystery_completed: 1,
      fact_discovered: 7,
      challenge_completed: 2,
    };
    const summary = computeActivitySummary(counts);
    expect(summary.quizzesCompleted).toBe(3);
    expect(summary.riddlesSolved).toBe(2);
    expect(summary.gamesPlayed).toBe(5);
    expect(summary.mysteriesSolved).toBe(1);
    expect(summary.factsDiscovered).toBe(7);
    expect(summary.challengesCompleted).toBe(2);
    expect(summary.totalActivities).toBe(20);
  });

  it('defaults missing types to zero', () => {
    const summary = computeActivitySummary({ game_completed: 1 });
    expect(summary.totalActivities).toBe(1);
    expect(summary.quizzesCompleted).toBe(0);
  });
});

describe('computeReachedMilestones', () => {
  it('returns milestones at or below the current XP', () => {
    expect(computeReachedMilestones(0)).toEqual([]);
    const at100 = computeReachedMilestones(100);
    expect(at100.length).toBe(1);
    expect(at100[0].id).toBe('milestone-100');
    const at1000 = computeReachedMilestones(1200);
    expect(at1000.map((m) => m.id)).toEqual(['milestone-100', 'milestone-500', 'milestone-1000']);
  });
});