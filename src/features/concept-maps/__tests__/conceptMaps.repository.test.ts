/**
 * Concept Maps Repository Unit Tests
 */

import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import { DemoConceptMapRepository } from '../conceptMaps.repository';
import { CONCEPT_MAPS } from '../conceptMaps.data';
import { getActivityHistory, getTotalXpBalance } from '../../activity';

describe('DemoConceptMapRepository', () => {
  let repository: DemoConceptMapRepository;
  const testMap = CONCEPT_MAPS[0];

  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.CONCEPT_MAPS_PROGRESS);
    await storage.removeItem(STORAGE_KEYS.CONCEPT_MAPS_BOOKMARKS);
    await storage.removeItem(STORAGE_KEYS.ACTIVITY_HISTORY);
    await storage.removeItem(STORAGE_KEYS.XP_TRANSACTIONS);
    await storage.removeItem(STORAGE_KEYS.ACHIEVEMENTS_UNLOCKED);
    repository = new DemoConceptMapRepository();
  });

  it('retrieves all maps, by id, and by subject', async () => {
    const all = await repository.getAllMaps();
    expect(all.length).toBe(16);

    const found = await repository.getMapById(testMap.id);
    expect(found).not.toBeNull();
    expect(found?.id).toBe(testMap.id);

    const notFound = await repository.getMapById('non-existent-map');
    expect(notFound).toBeNull();

    const physics = await repository.getMapsBySubject('physics');
    expect(physics.length).toBe(5);
  });

  it('retrieves today concept map deterministically', async () => {
    const today = await repository.getTodayMap();
    expect(today).not.toBeNull();
    expect(today.id).toBeTruthy();
  });

  it('persists and retrieves map progress', async () => {
    const initial = await repository.getProgress(testMap.id);
    expect(initial).toBeNull();

    await repository.saveProgress({
      mapId: testMap.id,
      status: 'in_progress',
      progressPercent: 40,
      exploredNodeIds: ['fnm-force', 'fnm-mass'],
      startedAt: Date.now(),
    });

    const loaded = await repository.getProgress(testMap.id);
    expect(loaded).not.toBeNull();
    expect(loaded?.status).toBe('in_progress');
    expect(loaded?.progressPercent).toBe(40);
    expect(loaded?.exploredNodeIds).toEqual(['fnm-force', 'fnm-mass']);
  });

  it('explores nodes and marks completed when all key nodes are explored, awarding +10 XP', async () => {
    const initialXp = await getTotalXpBalance();
    expect(initialXp).toBe(0);

    const keyNodes = testMap.nodes.filter((n) => n.keyNode);
    expect(keyNodes.length).toBeGreaterThan(0);

    // Explore key nodes one by one
    for (let i = 0; i < keyNodes.length; i++) {
      const updated = await repository.exploreNode(testMap.id, keyNodes[i].id);
      expect(updated).not.toBeNull();
      if (i === keyNodes.length - 1) {
        // Last key node completes the map
        expect(updated?.status).toBe('completed');
        expect(updated?.completed).toBe(true);
      }
    }

    // Verify XP was credited
    const newXp = await getTotalXpBalance();
    // 10 XP map completion + 20 XP first-step badge + 40 XP first-concept-map badge = 70
    // Phase 54: canonical achievement pipeline via recordActivity now evaluates badges.
    expect(newXp).toBe(70);

    // Verify activity event was recorded with +10 XP
    const history = await getActivityHistory();
    const mapActivities = history.filter((h) => h.type === 'concept_map_completed');
    expect(mapActivities.length).toBe(1);
    expect(mapActivities[0].xpEarned).toBe(10);
    expect(mapActivities[0].metadata?.subject).toBe(testMap.subject);
  });

  it('prevents duplicate XP awards if completeMap is called twice', async () => {
    const res1 = await repository.completeMap(testMap.id);
    expect(res1.ok).toBe(true);
    expect(res1.xpAwarded).toBe(10);

    const res2 = await repository.completeMap(testMap.id);
    expect(res2.ok).toBe(true);
    expect(res2.xpAwarded).toBe(0);
    expect(res2.alreadyCompleted).toBe(true);

    const balance = await getTotalXpBalance();
    // Phase 54: 10 XP map + 20 XP first-step badge + 40 XP first-concept-map badge = 70
    expect(balance).toBe(70);
  });

  it('toggles bookmarks properly', async () => {
    const initial = await repository.getBookmarks();
    expect(initial).toEqual([]);

    const state1 = await repository.toggleBookmark(testMap.id);
    expect(state1).toBe(true);
    let bmarks = await repository.getBookmarks();
    expect(bmarks).toContain(testMap.id);

    const state2 = await repository.toggleBookmark(testMap.id);
    expect(state2).toBe(false);
    bmarks = await repository.getBookmarks();
    expect(bmarks).not.toContain(testMap.id);
  });

  it('resets progress correctly', async () => {
    await repository.completeMap(testMap.id);
    const completed = await repository.getProgress(testMap.id);
    expect(completed?.status).toBe('completed');

    const resetOk = await repository.resetProgress(testMap.id);
    expect(resetOk).toBe(true);

    const progressAfter = await repository.getProgress(testMap.id);
    expect(progressAfter).not.toBeNull();
    expect(progressAfter?.exploredNodeIds).toEqual([]);
    expect(progressAfter?.progressPercent).toBe(0);
  });
});
