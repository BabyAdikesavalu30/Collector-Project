/**
 * Recommendations Feature Engine
 * Transparent rule-based recommendations. Every rule is a pure function of
 * local data (recently played, activity counts, XP, streak, strengths).
 *
 * Rules:
 *  1. Game rec: recommend a game in a category the student already plays,
 *     skipping games they have already played.
 *  2. Mystery rec: after riddle/mystery activity, recommend a related case.
 *  3. Collection rec: after several fact discoveries, recommend a collection.
 *  4. Milestone rec: when approaching an XP milestone, surface it.
 *  5. Fresh-start rec: for brand-new students, point at popular entry content.
 */

import { RecommendedItem, RecommendationInput } from './recommendations.types';
import { GAMES_REGISTRY, GAME_COLLECTIONS } from '../games/games.registry';
import { XP_MILESTONES } from '../xp';

const CATEGORY_BASED_RECS: Record<string, string[]> = {
  physics: ['circuit-lab', 'gravity-path', 'magnet-maze'],
  chemistry: ['element-match', 'molecule-builder', 'reaction-sort'],
  biology: ['dna-sequence', 'memory-matrix'],
  space: ['orbit', 'time-machine'],
  logic: ['logic-lock', 'queens', 'tango'],
  words: ['wend', 'science-word-grid'],
  memory: ['memory-matrix', 'time-machine'],
  numbers: ['mini-sudoku', 'pattern-lab'],
  grid: ['patches', 'mini-sudoku'],
  patterns: ['pattern-lab', 'logic-lock'],
  spatial: ['orbit', 'patches'],
  science: ['lab-escape', 'reaction-sort'],
};

/**
 * Deterministic recommendation builder. Order is stable.
 */
export function buildRecommendations(input: RecommendationInput): RecommendedItem[] {
  const items: RecommendedItem[] = [];
  const played = new Set(input.recentlyPlayedGameIds);
  const favorites = new Set(input.favoriteGameIds);

  // 1. Category-based game recommendation.
  const strongestCategory = findStrongestCategory(input.strengths);
  const candidates = strongestCategory ? CATEGORY_BASED_RECS[strongestCategory] || [] : [];
  const unplayed = candidates.filter((gameId) => !played.has(gameId));
  if (unplayed.length > 0) {
    const game = GAMES_REGISTRY.find((g) => g.id === unplayed[0]);
    if (game) {
      items.push({
        id: `rec-game-${game.id}`,
        kind: 'game',
        title: game.title.en,
        titleTa: game.title.ta,
        subtitle: `Continue strengthening your ${strongestCategory} skills.`,
        subtitleTa: `${strongestCategory} திறன்களை மேலும் வலுப்படுத்துங்கள்.`,
        route: game.route,
        icon: game.icon,
        reasonKey: 'category-strength',
      });
    }
  }

  // 2. Mystery after riddle/mystery activity.
  if ((input.activityCounts.riddle_completed || 0) > 0 || (input.activityCounts.mystery_completed || 0) > 0) {
    items.push({
      id: 'rec-mystery-next',
      kind: 'mystery',
      title: 'Solve a Mystery Case',
      titleTa: 'ஒரு மர்ம வழக்கை தீர்க்கவும்',
      subtitle: 'You enjoy solving puzzles — investigate a science mystery.',
      subtitleTa: 'நீங்கள் புதிர்களை விரும்புகிறீர்கள் — அறிவியல் மர்மத்தை ஆய்வு செய்யுங்கள்.',
      route: '/mystery-lab',
      icon: '🕵️',
      reasonKey: 'riddle-to-mystery',
    });
  }

  // 3. Collection after multiple fact discoveries.
  if ((input.activityCounts.fact_discovered || 0) >= 3) {
    const collection = GAME_COLLECTIONS[1]; // Science Thinkers
    if (collection) {
      items.push({
        id: 'rec-collection-facts',
        kind: 'collection',
        title: collection.title.en,
        titleTa: collection.title.ta,
        subtitle: 'You discovered several facts — explore a science collection.',
        subtitleTa: 'நீங்கள் பல தகவல்களை கண்டறிந்தீர்கள் — அறிவியல் தொகுப்பை ஆராயுங்கள்.',
        route: '/games',
        icon: collection.icon,
        reasonKey: 'facts-to-collection',
      });
    }
  }

  // 4. Approaching XP milestone (skip for brand-new students — they get
  //    fresh-start recommendations instead).
  const nextMilestone = XP_MILESTONES.find((m) => m.xpThreshold > input.totalXp);
  if (nextMilestone && input.totalXp > 0) {
    const remaining = nextMilestone.xpThreshold - input.totalXp;
    if (remaining <= 200) {
      items.push({
        id: `rec-milestone-${nextMilestone.id}`,
        kind: 'milestone',
        title: `${remaining} XP to ${nextMilestone.title}`,
        titleTa: `${remaining} XP — ${nextMilestone.titleTa}`,
        subtitle: 'Earn more XP to unlock this milestone.',
        subtitleTa: 'மேலும் XP பெற்று இந்த மைல்கல்லை திறக்கவும்.',
        route: '/rewards',
        icon: nextMilestone.icon,
        reasonKey: 'milestone-close',
      });
    }
  }

  // 5. Fresh-start recommendation.
  if (input.totalXp === 0 && items.length === 0) {
    items.push({
      id: 'rec-fresh-start',
      kind: 'explore',
      title: 'Explore Your First Games',
      titleTa: 'உங்கள் முதல் விளையாட்டுகளை ஆராயுங்கள்',
      subtitle: 'Try a quick puzzle to start earning XP.',
      subtitleTa: 'XP சம்பாதிக்க ஒரு விரைவான புதிரை முயற்சிக்கவும்.',
      route: '/games',
      icon: '🎮',
      reasonKey: 'fresh-start',
    });
    items.push({
      id: 'rec-fresh-facts',
      kind: 'fun-fact',
      title: 'Discover Today\'s Fact',
      titleTa: 'இன்றைய தகவலை கண்டறியவும்',
      subtitle: 'One quick fact to spark your curiosity.',
      subtitleTa: 'உங்கள் ஆர்வத்தை தூண்ட ஒரு விரைவான தகவல்.',
      route: '/fun-facts',
      icon: '✨',
      reasonKey: 'fresh-start',
    });
  }

  // 6. Favorites safety net — always recommend at least the top popular game.
  if (items.length === 0) {
    const popular = GAMES_REGISTRY.find((g) => g.id === 'circuit-lab');
    if (popular && !played.has(popular.id)) {
      items.push({
        id: `rec-game-${popular.id}`,
        kind: 'game',
        title: popular.title.en,
        titleTa: popular.title.ta,
        subtitle: 'A popular pick to keep your streak going.',
        subtitleTa: 'உங்கள் தொடர்ச்சியை தொடர ஒரு பிரபலமான தேர்வு.',
        route: popular.route,
        icon: popular.icon,
        reasonKey: 'popular',
      });
    }
  }

  void favorites;
  return items.slice(0, 6);
}

function findStrongestCategory(strengths: Record<string, number>): string | null {
  const entries = Object.entries(strengths).filter(([, value]) => value > 0);
  if (entries.length === 0) return null;
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}