/**
 * In-memory Mock for @react-native-async-storage/async-storage
 * Prevents Node environment ReferenceError ("window is not defined") during unit tests.
 */

const storage = new Map();

const asyncStorageMock = {
  getItem: jest.fn(async (key) => {
    return storage.has(key) ? storage.get(key) : null;
  }),
  setItem: jest.fn(async (key, value) => {
    storage.set(key, String(value));
    return null;
  }),
  removeItem: jest.fn(async (key) => {
    storage.delete(key);
    return null;
  }),
  clear: jest.fn(async () => {
    storage.clear();
    return null;
  }),
  getAllKeys: jest.fn(async () => {
    return Array.from(storage.keys());
  }),
  multiGet: jest.fn(async (keys) => {
    return keys.map((key) => [key, storage.has(key) ? storage.get(key) : null]);
  }),
  multiSet: jest.fn(async (keyValuePairs) => {
    keyValuePairs.forEach(([key, value]) => {
      storage.set(key, String(value));
    });
    return null;
  }),
  multiRemove: jest.fn(async (keys) => {
    keys.forEach((key) => {
      storage.delete(key);
    });
    return null;
  }),
  flushGetRequests: jest.fn(),
};

module.exports = asyncStorageMock;
module.exports.default = asyncStorageMock;
