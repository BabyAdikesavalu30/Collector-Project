/**
 * Fun Facts Storage
 * Local persistence for fun facts progress, favorites, streak, and history.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { recordActivity } from '../activity';
import { FunFactsProgress } from './fun-facts.types';
import { getTodayString, calculateStreak, getDailyFact } from './fun-facts.engine';
import { FUN_FACTS } from './fun-facts.mock';


const DEFAULT_PROGRESS: FunFactsProgress = {
  factsDiscovered: [],
  savedFactIds: [],
  trueFalseCorrect: 0,
  trueFalseTotal: 0,
  quizCorrect: 0,
  quizTotal: 0,
  collectionsCompleted: [],
  factHistory: [],
  streak: { currentStreak: 0, longestStreak: 0, lastViewedDate: '' },
  totalPoints: 0,
  dailyFactViewedDate: null,
};

export async function getFunFactsProgress(): Promise<FunFactsProgress> {
  const data = await storage.getItem<FunFactsProgress>(STORAGE_KEYS.FUN_FACTS_PROGRESS);
  return data || { ...DEFAULT_PROGRESS };
}

export async function saveFunFactsProgress(progress: FunFactsProgress): Promise<boolean> {
  return storage.setItem(STORAGE_KEYS.FUN_FACTS_PROGRESS, progress);
}

export async function markFactDiscovered(factId: string): Promise<FunFactsProgress> {
  const progress = await getFunFactsProgress();
  if (!progress.factsDiscovered.includes(factId)) {
    progress.factsDiscovered.push(factId);
  }
  addToHistory(progress, factId);
  await saveFunFactsProgress(progress);

  // Safe, additive shared integration: feed the unified activity/XP layer.
  const fact = FUN_FACTS.find((f) => f.id === factId);
  await recordActivity({
    type: 'fact_discovered',
    dedupeKey: `fact-${factId}`,
    title: 'Fun Fact Discovered',
    titleTa: 'சுவாரஸ்ய தகவல் கண்டறியப்பட்டது',
    subtitle: fact?.fact.en.slice(0, 60) || factId,
    subtitleTa: fact?.fact.ta.slice(0, 60) || factId,
    xpEarned: 5,
    timestamp: Date.now(),
    metadata: { factId, category: fact?.category, icon: '✨' },
  });

  return progress;
}

export async function toggleFactSaved(factId: string): Promise<FunFactsProgress> {
  const progress = await getFunFactsProgress();
  const idx = progress.savedFactIds.indexOf(factId);
  if (idx >= 0) {
    progress.savedFactIds.splice(idx, 1);
  } else {
    progress.savedFactIds.push(factId);
  }
  await saveFunFactsProgress(progress);
  return progress;
}

export async function isFactSaved(factId: string): Promise<boolean> {
  const progress = await getFunFactsProgress();
  return progress.savedFactIds.includes(factId);
}

export async function markDailyFactViewed(points: number = 5): Promise<FunFactsProgress> {
  const progress = await getFunFactsProgress();
  const today = getTodayString();
  if (progress.dailyFactViewedDate !== today) {
    progress.dailyFactViewedDate = today;
    progress.totalPoints += points;
    // Update streak
    if (!progress.factHistory.includes(today)) {
      progress.factHistory.push(today);
    }
    const { current, longest } = calculateStreak(progress.factHistory);
    progress.streak = {
      currentStreak: current,
      longestStreak: Math.max(longest, progress.streak.longestStreak),
      lastViewedDate: today,
    };
    await saveFunFactsProgress(progress);

    // Safe, additive shared integration: daily fact discovery event.
    const dailyFact = getDailyFact(today);
    await recordActivity({
      type: 'fact_discovered',
      dedupeKey: `fact-daily-${today}`,
      title: 'Daily Fact Discovered',
      titleTa: 'தினசரி தகவல் கண்டறியப்பட்டது',
      subtitle: dailyFact.fact.en.slice(0, 60),
      subtitleTa: dailyFact.fact.ta.slice(0, 60),
      xpEarned: 5,
      timestamp: Date.now(),
      metadata: { factId: dailyFact.id, category: dailyFact.category, icon: '✨' },
    });
  }
  return progress;
}

export async function updateTrueFalseStats(correct: boolean): Promise<FunFactsProgress> {
  const progress = await getFunFactsProgress();
  progress.trueFalseTotal += 1;
  if (correct) {
    progress.trueFalseCorrect += 1;
    progress.totalPoints += 5;
  }
  await saveFunFactsProgress(progress);
  return progress;
}

export async function updateQuizStats(correct: number, total: number): Promise<FunFactsProgress> {
  const progress = await getFunFactsProgress();
  progress.quizCorrect += correct;
  progress.quizTotal += total;
  progress.totalPoints += correct * 10;
  await saveFunFactsProgress(progress);
  return progress;
}

export async function markCollectionCompleted(collectionId: string): Promise<FunFactsProgress> {
  const progress = await getFunFactsProgress();
  if (!progress.collectionsCompleted.includes(collectionId)) {
    progress.collectionsCompleted.push(collectionId);
  }
  await saveFunFactsProgress(progress);
  return progress;
}

export async function resetFunFactsProgress(): Promise<void> {
  await saveFunFactsProgress({ ...DEFAULT_PROGRESS });
}

function addToHistory(progress: FunFactsProgress, factId: string): void {
  progress.factHistory.push(factId);
  if (progress.factHistory.length > 20) {
    progress.factHistory = progress.factHistory.slice(-20);
  }
}
