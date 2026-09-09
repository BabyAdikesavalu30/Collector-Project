/**
 * Experiment Lab Repository Unit Tests
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import { experimentRepository } from '../experiment.repository';
import { EXPERIMENTS } from '../experiment.data';
import { getTotalXpBalance, getActivityHistory } from '../../activity';

describe('Experiment Lab Repository', () => {
  const ohmsLaw = EXPERIMENTS.find((e) => e.id === 'exp-ohms-law')!;

  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.EXPERIMENT_PROGRESS);
    await storage.removeItem(STORAGE_KEYS.EXPERIMENT_BOOKMARKS);
    await storage.removeItem(STORAGE_KEYS.ACTIVITY_HISTORY);
    await storage.removeItem(STORAGE_KEYS.XP_TRANSACTIONS);
    await storage.removeItem(STORAGE_KEYS.ACHIEVEMENTS_UNLOCKED);
  });

  it('completes an experiment atomically, awarding +25 XP and recording activity on first completion', async () => {
    const result = await experimentRepository.completeExperiment(ohmsLaw, { voltage: 8, resistance: 4 });

    expect(result.newlyCompleted).toBe(true);
    expect(result.xpEarned).toBe(25);

    // 25 XP experiment + 20 XP first-step badge + 40 XP first-experiment badge = 85
    // Phase 54: canonical achievement pipeline via recordActivity now correctly
    // evaluates first-step (any 1st activity) and first-experiment badges.
    const balance = await getTotalXpBalance();
    expect(balance).toBe(85);

    const history = await getActivityHistory();
    const expEvents = history.filter((h) => h.type === 'experiment_completed');
    expect(expEvents.length).toBe(1);
    expect(expEvents[0].type).toBe('experiment_completed');
    expect(expEvents[0].xpEarned).toBe(25);
    expect(expEvents[0].metadata?.experimentId).toBe('exp-ohms-law');

    const progress = await experimentRepository.getExperimentProgress('exp-ohms-law');
    expect(progress?.completed).toBe(true);
    expect(progress?.runCount).toBe(1);
  });

  it('prevents duplicate XP awards when repeating the same experiment', async () => {
    // Run 1
    const run1 = await experimentRepository.completeExperiment(ohmsLaw, { voltage: 6, resistance: 3 });
    expect(run1.newlyCompleted).toBe(true);
    expect(run1.xpEarned).toBe(25);

    // Run 2 (repeat)
    const run2 = await experimentRepository.completeExperiment(ohmsLaw, { voltage: 10, resistance: 5 });
    expect(run2.newlyCompleted).toBe(false);
    expect(run2.xpEarned).toBe(0);

    // Balance should remain 85 (not duplicated)
    const balance = await getTotalXpBalance();
    expect(balance).toBe(85);

    // Run count incremented to 2
    const progress = await experimentRepository.getExperimentProgress('exp-ohms-law');
    expect(progress?.runCount).toBe(2);
  });

  it('toggles bookmarks and persists state in storage', async () => {
    const isNowBookmarked = await experimentRepository.toggleBookmark('exp-density');
    expect(isNowBookmarked).toBe(true);

    let bookmarks = await experimentRepository.getBookmarks();
    expect(bookmarks).toContain('exp-density');

    const unbookmarked = await experimentRepository.toggleBookmark('exp-density');
    expect(unbookmarked).toBe(false);

    bookmarks = await experimentRepository.getBookmarks();
    expect(bookmarks).not.toContain('exp-density');
  });

  it('updates variable values for resume capability', async () => {
    await experimentRepository.updateVariableValues('exp-ohms-law', { voltage: 12, resistance: 8 });

    const progress = await experimentRepository.getExperimentProgress('exp-ohms-law');
    expect(progress?.status).toBe('in_progress');
    expect(progress?.lastVariableValues?.voltage).toBe(12);
  });

  it('resets experiment progress without wiping earned XP balance', async () => {
    await experimentRepository.completeExperiment(ohmsLaw, { voltage: 6, resistance: 2 });
    expect(await getTotalXpBalance()).toBe(85);

    await experimentRepository.resetProgress('exp-ohms-law');
    const progress = await experimentRepository.getExperimentProgress('exp-ohms-law');
    expect(progress?.completed).toBe(false);
    expect(progress?.status).toBe('not_started');

    // XP remains intact after progress reset
    expect(await getTotalXpBalance()).toBe(85);
  });
});
