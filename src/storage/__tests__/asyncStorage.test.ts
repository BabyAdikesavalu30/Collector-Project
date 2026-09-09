import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage, STORAGE_KEYS } from '../asyncStorage';

describe('storage client in-memory cache & resilience', () => {
  beforeEach(async () => {
    storage.invalidateCache();
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it('reads from disk once and serves subsequent reads from cache', async () => {
    const testData = { username: 'ramanujan', xp: 500 };
    await AsyncStorage.setItem(STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(testData));

    // First read: hits AsyncStorage
    const firstRead = await storage.getItem<typeof testData>(STORAGE_KEYS.STUDENT_PROFILE);
    expect(firstRead).toEqual(testData);
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);

    // Second read: hits in-memory cache without querying AsyncStorage again
    const secondRead = await storage.getItem<typeof testData>(STORAGE_KEYS.STUDENT_PROFILE);
    expect(secondRead).toEqual(testData);
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('updates both in-memory cache and AsyncStorage on setItem', async () => {
    const session = { token: 'mock-token', studentId: 'stu-1' };
    const success = await storage.setItem(STORAGE_KEYS.AUTH_SESSION, session);
    expect(success).toBe(true);

    // Reading immediately returns the object from cache
    const read = await storage.getItem<typeof session>(STORAGE_KEYS.AUTH_SESSION);
    expect(read).toEqual(session);

    // Invalidate cache and verify disk contains serialized representation
    storage.invalidateCache(STORAGE_KEYS.AUTH_SESSION);
    const diskRead = await storage.getItem<typeof session>(STORAGE_KEYS.AUTH_SESSION);
    expect(diskRead).toEqual(session);
  });

  it('removes item from both cache and disk', async () => {
    await storage.setItem(STORAGE_KEYS.USER_LANGUAGE, 'ta');
    expect(await storage.getItem(STORAGE_KEYS.USER_LANGUAGE)).toBe('ta');

    await storage.removeItem(STORAGE_KEYS.USER_LANGUAGE);
    expect(await storage.getItem(STORAGE_KEYS.USER_LANGUAGE)).toBeNull();

    // Verify disk has also removed it
    storage.invalidateCache();
    expect(await storage.getItem(STORAGE_KEYS.USER_LANGUAGE)).toBeNull();
  });

  it('returns default value when data is missing', async () => {
    const res = await storage.getItem(STORAGE_KEYS.APP_SETTINGS, { darkMode: false });
    expect(res).toEqual({ darkMode: false });
  });

  it('recovers gracefully from malformed JSON on disk', async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.DASHBOARD_CACHE, '{invalid_json_corrupted');

    const result = await storage.getItem(STORAGE_KEYS.DASHBOARD_CACHE, { fallback: true });
    expect(result).toEqual({ fallback: true });
  });

  it('clears development state and resets cache', async () => {
    await storage.setItem(STORAGE_KEYS.STUDENT_PROFILE, { name: 'Student' });
    await storage.setItem(STORAGE_KEYS.USER_LANGUAGE, 'en');

    await storage.clearAllDevelopmentState();

    expect(await storage.getItem(STORAGE_KEYS.STUDENT_PROFILE)).toBeNull();
    expect(await storage.getItem(STORAGE_KEYS.USER_LANGUAGE)).toBeNull();
  });
});
