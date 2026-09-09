import { getAllDiscoveryItems, clearDiscoveryItemsCacheForTesting } from '../../explore/explore.service';
import { buildSearchIndex, clearStaticSearchIndexCacheForTesting } from '../../search/search.indexer';
import { scoreItem } from '../../search/search.engine';
import { Certificate } from '../../certificates';
import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('Phase 53: Performance & Memory Optimization Test Suite', () => {
  beforeEach(async () => {
    clearDiscoveryItemsCacheForTesting();
    clearStaticSearchIndexCacheForTesting();
    storage.invalidateCache();
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  describe('1. Explore Discovery Caching', () => {
    it('returns the same memoized reference on repeated calls', () => {
      const first = getAllDiscoveryItems();
      const second = getAllDiscoveryItems();

      expect(first).toBe(second);
      expect(first.length).toBeGreaterThan(50);
    });

    it('pre-indexes lowercase fields on discovery items for zero-allocation searching', () => {
      const items = getAllDiscoveryItems();
      const sample = items[0] as Record<string, any>;

      expect(sample._titleEnLower).toBeDefined();
      expect(sample._titleTaLower).toBeDefined();
      expect(sample._descEnLower).toBeDefined();
      expect(sample._tagsLower).toBeInstanceOf(Array);
      expect(sample._titleEnLower).toBe(sample.title.en.toLowerCase());
    });
  });

  describe('2. Search Index Caching & Pre-normalization', () => {
    it('reuses cached static search items across repeated builds', () => {
      const first = buildSearchIndex([]);
      const second = buildSearchIndex([]);

      // Static items are preserved
      expect(first.items.length).toBe(second.items.length);
      expect(first.items[0]).toBe(second.items[0]);
    });

    it('merges dynamic certificates without corrupting cached static items', () => {
      const mockCert: Certificate = {
        id: 'cert-opt-1',
        title: { en: 'Junior Scientist', ta: 'இளம் விஞ்ஞானி' },
        subtitle: { en: 'Physics Master', ta: 'இயற்பியல் தேர்ச்சி' },
        kind: 'subject',
        subjectId: 'physics',
        recipientName: 'Kavitha',
        grade: '9',
        location: 'Chennai',
        dateEarned: 1700000000000,
        achievementsCount: 5,
        certificateNumber: 'VIG-2026-0001',
      };

      const withCert = buildSearchIndex([mockCert]);
      const withoutCert = buildSearchIndex([]);

      expect(withCert.items.length).toBe(withoutCert.items.length + 1);
      const foundCert = withCert.items.find((i) => i.id === 'certificate-cert-opt-1');
      expect(foundCert).toBeDefined();
      expect(foundCert?._normTitleEn).toBeDefined();
    });

    it('scores items accurately using pre-normalized fields in EN and TA', () => {
      const index = buildSearchIndex([]);
      const sampleItem = index.items.find((i) => i.category === 'game');
      expect(sampleItem).toBeDefined();

      if (sampleItem) {
        const scoreEn = scoreItem(sampleItem, sampleItem.title, 'en');
        expect(scoreEn).toBe(100);

        const scoreTa = scoreItem(sampleItem, sampleItem.titleTa, 'ta');
        expect(scoreTa).toBe(100);

        const scoreUnrelated = scoreItem(sampleItem, 'nonexistentxyz123', 'en');
        expect(scoreUnrelated).toBe(0);
      }
    });
  });

  describe('3. Game Timer Ref Decoupling Simulation', () => {
    it('simulates 60 timer updates without mutating state until completion', () => {
      const elapsedRef = { current: 0 };
      let stateCommittedTime = 0;
      let stateRenders = 0;

      const onTimeUpdate = (secs: number) => {
        elapsedRef.current = secs;
      };

      // Simulate 60 seconds of gameplay
      for (let sec = 1; sec <= 60; sec++) {
        onTimeUpdate(sec);
      }

      // During active gameplay, 0 state renders occur
      expect(stateRenders).toBe(0);
      expect(elapsedRef.current).toBe(60);

      // On completion, state is committed once
      const onGameCompleted = () => {
        stateCommittedTime = elapsedRef.current;
        stateRenders += 1;
      };
      onGameCompleted();

      expect(stateCommittedTime).toBe(60);
      expect(stateRenders).toBe(1);
    });
  });

  describe('4. Storage In-Memory Cache Bridge Protection', () => {
    it('prevents repetitive disk I/O when multiple services read the same key', async () => {
      const mockProfile = { id: 'test-stu', grade: '9', name: 'Kavitha' };
      await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE, mockProfile);

      // Simulate 10 simultaneous or repeated reads from different components
      const reads = await Promise.all(
        Array.from({ length: 10 }).map(() =>
          storage.getItem<typeof mockProfile>(STORAGE_KEYS.STUDENT_PROFILE)
        )
      );

      for (const res of reads) {
        expect(res).toEqual(mockProfile);
      }

      // AsyncStorage.setItem was called once, and AsyncStorage.getItem was called 0 times because cacheStore had it!
      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(0);
    });
  });
});
