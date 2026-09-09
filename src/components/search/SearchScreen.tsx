/**
 * SearchScreen — global product search (/search).
 * Search input, recent searches, suggested queries, category filter chips,
 * and a result list with direct navigation. Bilingual EN/TA matching.
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { SearchCategory, SearchResult } from '../../features/search';
import { ScreenHeader, EmptyState } from '../shared';

export interface CategoryFilterOption {
  key: SearchCategory | 'all';
  label: string;
}

interface SearchScreenProps {
  language: SupportedLanguage;
  query: string;
  results: SearchResult[];
  recentSearches: string[];
  suggestedQueries: string[];
  categories: CategoryFilterOption[];
  activeCategory: SearchCategory | 'all';
  onQueryChange: (query: string) => void;
  onClearQuery: () => void;
  onSelectResult: (result: SearchResult) => void;
  onSelectRecent: (query: string) => void;
  onSelectSuggestion: (query: string) => void;
  onClearHistory: () => void;
  onSelectCategory: (category: SearchCategory | 'all') => void;
  onBack: () => void;
}

const CATEGORY_COLORS: Record<SearchCategory, string> = {
  game: '#2563EB',
  riddle: '#D97706',
  fact: '#9333EA',
  mystery: '#4F46E5',
  achievement: '#16A34A',
  certificate: '#0D9488',
  collection: '#DB2777',
  explore: '#475569',
  micro_lesson: '#0284C7',
  concept_map: '#7C3AED',
  experiment: '#059669',
  scientist: '#9333EA',
  invention: '#D97706',
  everyday_science: '#0369A1',
};

export const SearchScreen: React.FC<SearchScreenProps> = ({
  language,
  query,
  results,
  recentSearches,
  suggestedQueries,
  categories,
  activeCategory,
  onQueryChange,
  onClearQuery,
  onSelectResult,
  onSelectRecent,
  onSelectSuggestion,
  onClearHistory,
  onSelectCategory,
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).progress.search;
  const isTamil = language === 'ta';
  const hasQuery = query.trim().length > 0;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ScreenHeader title={t.title} language={language} onBack={onBack} />

      {/* Search input */}
      <View style={styles.inputWrap}>
        <View style={styles.inputBox}>
          <Text style={styles.inputIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={onQueryChange}
            placeholder={t.placeholder}
            placeholderTextColor={theme.colors.slate400}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={Keyboard.dismiss}
            accessibilityLabel={t.placeholder}
            accessibilityRole="search"
          />
          {hasQuery && (
            <TouchableOpacity
              onPress={onClearQuery}
              accessibilityRole="button"
              accessibilityLabel={t.clear}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category chips */}
      <View style={styles.chipsWrap}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
          renderItem={({ item }) => {
            const isActive = item.key === activeCategory;
            return (
              <TouchableOpacity
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => onSelectCategory(item.key)}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {!hasQuery ? (
        <FlatList
          data={[{ key: 'content' }]}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.idleContent, { paddingBottom: insets.bottom + 24 }]}
          renderItem={() => (
            <>
              {recentSearches.length > 0 && (
                <View style={styles.idleSection}>
                  <View style={styles.idleHeader}>
                    <Text style={styles.idleTitle}>{t.recentSearches}</Text>
                    <TouchableOpacity onPress={onClearHistory} accessibilityRole="button" accessibilityLabel={t.clearHistory}>
                      <Text style={styles.clearHistory}>{t.clearHistory}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.recentWrap}>
                    {recentSearches.map((recent) => (
                      <TouchableOpacity
                        key={recent}
                        style={styles.recentChip}
                        onPress={() => onSelectRecent(recent)}
                        accessibilityRole="button"
                        accessibilityLabel={recent}
                      >
                        <Text style={styles.recentChipText}>🕘 {recent}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
              <View style={styles.idleSection}>
                <Text style={styles.idleTitle}>{t.suggested}</Text>
                <View style={styles.recentWrap}>
                  {suggestedQueries.map((suggestion) => (
                    <TouchableOpacity
                      key={suggestion}
                      style={styles.suggestionChip}
                      onPress={() => onSelectSuggestion(suggestion)}
                      accessibilityRole="button"
                      accessibilityLabel={suggestion}
                    >
                      <Text style={styles.suggestionChipText}>{suggestion}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.idleHint}>
                <Text style={styles.idleHintText}>💡 {t.emptySubtitle}</Text>
              </View>
            </>
          )}
        />
      ) : results.length === 0 ? (
        <EmptyState icon="🔍" title={t.noResultsTitle} subtitle={t.noResultsSubtitle} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.item.id}
          contentContainerStyle={[styles.resultList, { paddingBottom: insets.bottom + 24 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <Text style={styles.resultsCount}>
              {t.results.replace('{count}', String(results.length))}
            </Text>
          }
          renderItem={({ item }) => {
            const { item: searchItem } = item;
            const color = CATEGORY_COLORS[searchItem.category];
            return (
              <TouchableOpacity
                style={styles.resultCard}
                onPress={() => onSelectResult(item)}
                accessibilityRole="button"
                accessibilityLabel={`${isTamil ? searchItem.titleTa : searchItem.title}. ${isTamil ? searchItem.categoryLabelTa : searchItem.categoryLabel}`}
                activeOpacity={0.85}
              >
                <View style={[styles.resultIconCircle, { backgroundColor: `${color}1A` }]}>
                  <Text style={styles.resultIcon}>{searchItem.icon}</Text>
                </View>
                <View style={styles.resultContent}>
                  <Text style={styles.resultTitle} numberOfLines={1}>
                    {isTamil ? searchItem.titleTa : searchItem.title}
                  </Text>
                  <Text style={styles.resultSubtitle} numberOfLines={1}>
                    {isTamil ? searchItem.subtitleTa : searchItem.subtitle}
                  </Text>
                  <View style={[styles.categoryPill, { backgroundColor: `${color}14` }]}>
                    <Text style={[styles.categoryPillText, { color }]}>
                      {isTamil ? searchItem.categoryLabelTa : searchItem.categoryLabel}
                    </Text>
                  </View>
                </View>
                <Text style={styles.resultChevron}>›</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  inputWrap: {
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.md,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.base,
  },
  inputIcon: {
    fontSize: 15,
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14.5,
    color: theme.colors.navy900,
  },
  clearIcon: {
    fontSize: 14,
    color: theme.colors.slate400,
    paddingHorizontal: 4,
  },
  chipsWrap: {
    marginTop: theme.spacing.sm,
  },
  chips: {
    paddingHorizontal: theme.spacing.base,
    gap: theme.spacing.sm,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chipActive: {
    backgroundColor: theme.colors.actionPrimary,
    borderColor: theme.colors.actionPrimary,
  },
  chipText: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  chipTextActive: {
    color: theme.colors.textOnAction,
  },
  idleContent: {
    padding: theme.spacing.base,
  },
  idleSection: {
    marginBottom: theme.spacing.lg,
  },
  idleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  idleTitle: {
    ...theme.typography.overline,
    fontSize: 11,
    color: theme.colors.navy900,
    letterSpacing: 0.8,
    fontWeight: '800',
  },
  clearHistory: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.actionPrimary,
    fontWeight: '600',
  },
  recentWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  recentChip: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  recentChipText: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.navy800,
    fontWeight: '600',
  },
  suggestionChip: {
    backgroundColor: theme.colors.blue50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.blue100,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  suggestionChipText: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.actionPrimary,
    fontWeight: '700',
  },
  idleHint: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  idleHintText: {
    ...theme.typography.body,
    fontSize: 12.5,
    color: theme.colors.slate500,
    textAlign: 'center',
  },
  resultList: {
    paddingHorizontal: theme.spacing.base,
  },
  resultsCount: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  resultIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  resultIcon: {
    fontSize: 20,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  resultSubtitle: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  categoryPillText: {
    ...theme.typography.caption,
    fontSize: 9.5,
    fontWeight: '800',
  },
  resultChevron: {
    fontSize: 18,
    color: theme.colors.slate400,
    marginLeft: theme.spacing.sm,
  },
});