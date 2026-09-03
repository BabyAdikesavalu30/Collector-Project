/**
 * Manual mock for react-native — provides just enough for pure unit tests
 * that only need Platform.select and type-only imports.
 */

const Platform = {
  OS: 'web',
  select: (obj) => obj.default ?? undefined,
};

module.exports = {
  Platform,
  StyleSheet: {
    create: (styles) => styles,
  },
  // TextStyle is a type-only import, no runtime value needed
};
