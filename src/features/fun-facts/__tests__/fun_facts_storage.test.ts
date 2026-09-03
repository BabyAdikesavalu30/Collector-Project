/**
 * Fun Facts Storage Unit Tests
 */

import {
  getFunFactsProgress,
  saveFunFactsProgress,
  markFactDiscovered,
  toggleFactSaved,
  isFactSaved,
} from '../fun-facts.storage';

describe('Fun Facts Storage & Favorites Contracts', () => {
  test('returns default progress when empty', async () => {
    const progress = await getFunFactsProgress();
    expect(progress).toBeDefined();
    expect(Array.isArray(progress.factsDiscovered)).toBe(true);
    expect(Array.isArray(progress.savedFactIds)).toBe(true);
  });

  test('markFactDiscovered adds fact to discovered array and history', async () => {
    const factId = 'ff-quantum-01';
    const progress = await markFactDiscovered(factId);
    expect(progress.factsDiscovered).toContain(factId);
    expect(progress.factHistory).toContain(factId);
  });

  test('toggleFactSaved adds and removes fact from savedFactIds', async () => {
    const factId = 'ff-space-02';
    expect(await isFactSaved(factId)).toBe(false);

    await toggleFactSaved(factId);
    expect(await isFactSaved(factId)).toBe(true);

    await toggleFactSaved(factId);
    expect(await isFactSaved(factId)).toBe(false);
  });
});
