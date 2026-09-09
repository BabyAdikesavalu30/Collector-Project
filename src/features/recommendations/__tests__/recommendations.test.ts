/**
 * Recommendations Feature Tests
 * Deterministic rule coverage: strengths, riddles→mystery, facts→collection,
 * milestone proximity, and fresh-start.
 */

import { buildRecommendations } from '../recommendations.engine';
import { RecommendationInput } from '../recommendations.types';

function input(overrides: Partial<RecommendationInput> = {}): RecommendationInput {
  return {
    recentlyPlayedGameIds: [],
    favoriteGameIds: [],
    activityCounts: {},
    totalXp: 0,
    streakDays: 0,
    strengths: {},
    ...overrides,
  };
}

describe('buildRecommendations', () => {
  it('is deterministic for the same input', () => {
    const base = input({ totalXp: 300, activityCounts: { fact_discovered: 4 } });
    const a = buildRecommendations(base);
    const b = buildRecommendations(base);
    expect(a.map((r) => r.id)).toEqual(b.map((r) => r.id));
  });

  it('recommends a game from the student strongest category', () => {
    const recommendations = buildRecommendations(
      input({ strengths: { chemistry: 80, physics: 20 }, recentlyPlayedGameIds: [] })
    );
    expect(recommendations.some((r) => r.kind === 'game')).toBe(true);
    const gameRec = recommendations.find((r) => r.kind === 'game');
    expect(gameRec?.reasonKey).toBe('category-strength');
  });

  it('does not re-recommend an already played game', () => {
    const recommendations = buildRecommendations(
      input({
        strengths: { chemistry: 80 },
        recentlyPlayedGameIds: ['element-match', 'molecule-builder', 'reaction-sort'],
      })
    );
    const gameRecs = recommendations.filter((r) => r.kind === 'game');
    for (const rec of gameRecs) {
      expect(rec.reasonKey).not.toBe('category-strength');
    }
  });

  it('recommends a mystery after riddle or mystery activity', () => {
    const recommendations = buildRecommendations(
      input({ activityCounts: { riddle_completed: 2 } })
    );
    expect(recommendations.some((r) => r.kind === 'mystery')).toBe(true);
  });

  it('recommends a collection after several fact discoveries', () => {
    const recommendations = buildRecommendations(
      input({ activityCounts: { fact_discovered: 5 } })
    );
    expect(recommendations.some((r) => r.kind === 'collection')).toBe(true);
  });

  it('recommends a milestone when within 200 XP', () => {
    const recommendations = buildRecommendations(input({ totalXp: 400 }));
    const milestone = recommendations.find((r) => r.kind === 'milestone');
    expect(milestone).toBeDefined();
    expect(milestone?.title).toContain('XP');
  });

  it('does not recommend a milestone far from the next threshold', () => {
    // 100 XP → next milestone 500, 400 XP away.
    const recommendations = buildRecommendations(input({ totalXp: 100 }));
    expect(recommendations.some((r) => r.kind === 'milestone')).toBe(false);
  });

  it('suggests fresh-start content for a brand new student', () => {
    const recommendations = buildRecommendations(input({ totalXp: 0 }));
    expect(recommendations.some((r) => r.reasonKey === 'fresh-start')).toBe(true);
  });

  it('always returns a safety-net popular pick when nothing else matches', () => {
    const recommendations = buildRecommendations(
      input({
        totalXp: 1500,
        activityCounts: {},
        strengths: {},
        recentlyPlayedGameIds: ['zip'],
      })
    );
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations.some((r) => r.reasonKey === 'popular')).toBe(true);
  });

  it('caps at six recommendations', () => {
    const recommendations = buildRecommendations(
      input({
        totalXp: 400,
        activityCounts: { riddle_completed: 2, fact_discovered: 5 },
        strengths: { chemistry: 80 },
      })
    );
    expect(recommendations.length).toBeLessThanOrEqual(6);
  });
});