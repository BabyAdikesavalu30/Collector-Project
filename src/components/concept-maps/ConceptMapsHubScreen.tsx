/**
 * ConceptMapsHubScreen Component
 * Hub route (/concept-maps): Search bar, subject filters, status tabs,
 * today's visual pick, continue exploring, and comprehensive concept map catalog.
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { AppBackButton } from '../navigation';
import {
  ConceptMap,
  ConceptMapFilterState,
  ConceptMapFilterStatus,
  ConceptMapProgress,
  ConceptSubjectId,
} from '../../features/concept-maps/conceptMaps.types';
import {
  CONCEPT_MAP_SUBJECTS,
  CONCEPT_SUBJECT_THEMES,
} from '../../features/concept-maps/conceptMaps.data';
import { ConceptMapCard } from './ConceptMapCard';
import { getTranslation, SupportedLanguage } from '../../config/i18n';

export interface ConceptMapsHubScreenProps {
  maps: ConceptMap[];
  todayMap: ConceptMap | null;
  recentMap: ConceptMap | null;
  progressMap: Record<string, ConceptMapProgress>;
  bookmarks: string[];
  filterState: ConceptMapFilterState;
  summary: { total: number; completed: number; inProgress: number; percent: number };
  isLoading: boolean;
  language?: SupportedLanguage;
  onFilterChange: (filters: Partial<ConceptMapFilterState>) => void;
  onMapPress: (mapId: string) => void;
  onBookmarkToggle: (mapId: string) => void;
  onBack: () => void;
}

export const ConceptMapsHubScreen: React.FC<ConceptMapsHubScreenProps> = ({
  maps,
  todayMap,
  recentMap,
  progressMap,
  bookmarks,
  filterState,
  summary,
  isLoading,
  language = 'en',
  onFilterChange,
  onMapPress,
  onBookmarkToggle,
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const isTamil = language === 'ta';
  const t = getTranslation(language).conceptMaps;

  // Status tabs config
  const statusTabs: { id: ConceptMapFilterStatus; label: { en: string; ta: string } }[] = [
    { id: 'all', label: { en: 'All', ta: 'அனைத்தும்' } },
    { id: 'in_progress', label: { en: 'In Progress', ta: 'செயலில்' } },
    { id: 'completed', label: { en: 'Completed', ta: 'நிறைவு' } },
    { id: 'bookmarked', label: { en: 'Bookmarked', ta: 'சேமித்தவை' } },
  ];

  // Subject tabs with "all" prepended
  const subjectList: { id: ConceptSubjectId | 'all'; label: { en: string; ta: string }; icon: string }[] = [
    { id: 'all', label: { en: 'All Subjects', ta: 'அனைத்து பாடங்கள்' }, icon: '🌐' },
    ...CONCEPT_MAP_SUBJECTS.map((s) => ({ id: s.id, label: s.title, icon: s.icon })),
  ];

  const totalNodesExplored = useMemo(() => {
    let count = 0;
    Object.values(progressMap).forEach((p) => {
      count += p.exploredNodeIds?.length || 0;
    });
    return count;
  }, [progressMap]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* Standard Header with AppBackButton */}
      <View style={styles.headerBar}>
        <AppBackButton
          onPress={onBack}
          accessibilityLabel={isTamil ? 'பின்செல்' : 'Go back'}
          language={language}
          testID="concept-maps-hub-back-btn"
        />
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>
            {isTamil ? 'கருத்து வரைபடங்கள்' : 'Concept Maps'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {isTamil ? 'அறிவியல் தொடர்புகளைக் காண்க' : 'Visual science knowledge graph'}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            testID="concept-maps-search-input"
            value={filterState.searchQuery}
            onChangeText={(text) => onFilterChange({ searchQuery: text })}
            placeholder={
              isTamil ? 'கருத்து அல்லது தலைப்பைத் தேடுக...' : 'Search concepts, topics, formulas...'
            }
            placeholderTextColor={theme.colors.slate400}
            style={styles.searchInput}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {filterState.searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => onFilterChange({ searchQuery: '' })}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Stats Summary Banner */}
        <View style={styles.statsBanner}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {summary.completed}/{summary.total}
            </Text>
            <Text style={styles.statLabel}>{isTamil ? 'வரைபடங்கள்' : 'Maps Mastered'}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalNodesExplored}</Text>
            <Text style={styles.statLabel}>{isTamil ? 'கருத்துகள்' : 'Nodes Explored'}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{summary.completed * 10} XP</Text>
            <Text style={styles.statLabel}>{isTamil ? 'வெகுமதி' : 'XP Earned'}</Text>
          </View>
        </View>

        {/* Subject Filter Chips Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectChipsRow}
        >
          {subjectList.map((subj) => {
            const isSelected = filterState.subjectId === subj.id;
            return (
              <TouchableOpacity
                key={subj.id}
                testID={`filter-subject-${subj.id}`}
                accessibilityRole="button"
                accessibilityLabel={isTamil ? subj.label.ta : subj.label.en}
                onPress={() => onFilterChange({ subjectId: subj.id })}
                style={[
                  styles.subjectChip,
                  isSelected && styles.subjectChipSelected,
                ]}
              >
                <Text style={styles.subjectChipIcon}>{subj.icon}</Text>
                <Text
                  style={[
                    styles.subjectChipText,
                    isSelected && styles.subjectChipTextSelected,
                  ]}
                >
                  {isTamil ? subj.label.ta : subj.label.en}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Status Filter Tabs (All, In Progress, Completed, Bookmarked) */}
        <View style={styles.statusTabsRow}>
          {statusTabs.map((tab) => {
            const isSelected = filterState.status === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                testID={`filter-status-${tab.id}`}
                accessibilityRole="button"
                accessibilityLabel={isTamil ? tab.label.ta : tab.label.en}
                onPress={() => onFilterChange({ status: tab.id })}
                style={[
                  styles.statusTab,
                  isSelected && styles.statusTabSelected,
                ]}
              >
                <Text
                  style={[
                    styles.statusTabText,
                    isSelected && styles.statusTabTextSelected,
                  ]}
                >
                  {isTamil ? tab.label.ta : tab.label.en}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Today's Featured Map (Shown when no search/status filters active) */}
        {!filterState.searchQuery && filterState.status === 'all' && filterState.subjectId === 'all' && todayMap && (
          <View style={styles.sectionWrap}>
            <ConceptMapCard
              map={todayMap}
              progress={progressMap[todayMap.id]}
              isBookmarked={bookmarks.includes(todayMap.id)}
              language={language}
              variant="featured"
              onPress={onMapPress}
              onBookmarkToggle={onBookmarkToggle}
              testID="concept-map-today-featured"
            />
          </View>
        )}

        {/* Continue Exploring (If recent map exists and is in progress) */}
        {!filterState.searchQuery && filterState.status === 'all' && recentMap && (
          <View style={styles.sectionWrap}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>
                {isTamil ? 'தொடர்ந்து ஆராய்க' : 'Continue Exploring'}
              </Text>
            </View>
            <ConceptMapCard
              map={recentMap}
              progress={progressMap[recentMap.id]}
              isBookmarked={bookmarks.includes(recentMap.id)}
              language={language}
              variant="standard"
              onPress={onMapPress}
              onBookmarkToggle={onBookmarkToggle}
              testID="concept-map-recent-card"
            />
          </View>
        )}

        {/* Main Catalog Header */}
        <View style={styles.catalogHeaderRow}>
          <Text style={styles.catalogHeading}>
            {isTamil ? 'அனைத்து கருத்து வரைபடங்கள்' : 'All Concept Maps'}
          </Text>
          <Text style={styles.catalogCount}>({maps.length})</Text>
        </View>

        {/* Loading Spinner */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.purple700} />
          </View>
        )}

        {/* Empty Search / Filter State */}
        {!isLoading && maps.length === 0 && (
          <View testID="concept-maps-empty-state" style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>
              {isTamil ? 'வரைபடங்கள் ஏதுமில்லை' : 'No Concept Maps Found'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {isTamil
                ? 'உங்கள் தேடலை மாற்றி அல்லது வடிகட்டிகளை மீட்டமைத்துப் பாருங்கள்.'
                : 'Try clearing your search or switching filters to see more concept maps.'}
            </Text>
            <TouchableOpacity
              testID="concept-maps-reset-filter-btn"
              accessibilityRole="button"
              accessibilityLabel={t.accessibility?.resetFilters}
              onPress={() => onFilterChange({ subjectId: 'all', status: 'all', searchQuery: '' })}
              style={styles.resetFilterBtn}
            >
              <Text style={styles.resetFilterText}>
                {isTamil ? 'வடிகட்டிகளை மீட்டமை' : 'Reset Filters'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Maps List */}
        {!isLoading &&
          maps.map((map) => (
            <ConceptMapCard
              key={map.id}
              map={map}
              progress={progressMap[map.id]}
              isBookmarked={bookmarks.includes(map.id)}
              language={language}
              variant="standard"
              onPress={onMapPress}
              onBookmarkToggle={onBookmarkToggle}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitleWrap: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
      },
      android: { elevation: 1 },
    }),
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.navy900,
  },
  clearIcon: {
    fontSize: 14,
    color: theme.colors.slate400,
    padding: 4,
  },
  statsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  subjectChipsRow: {
    gap: 8,
    paddingBottom: 12,
  },
  subjectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  subjectChipSelected: {
    backgroundColor: theme.colors.purple700,
    borderColor: theme.colors.purple700,
  },
  subjectChipIcon: {
    fontSize: 14,
  },
  subjectChipText: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.medium,
    color: theme.colors.navy800,
  },
  subjectChipTextSelected: {
    color: theme.colors.white,
    fontFamily: theme.fontFamilies.bold,
  },
  statusTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 3,
    marginBottom: 18,
  },
  statusTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  statusTabSelected: {
    backgroundColor: theme.colors.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
      },
      android: { elevation: 2 },
    }),
  },
  statusTabText: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.medium,
    color: theme.colors.slate600,
  },
  statusTabTextSelected: {
    color: theme.colors.purple700,
    fontFamily: theme.fontFamilies.bold,
  },
  sectionWrap: {
    marginBottom: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  catalogHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    marginTop: 6,
  },
  catalogHeading: {
    fontSize: 15,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
  },
  catalogCount: {
    fontSize: 13,
    fontFamily: theme.fontFamilies.medium,
    color: theme.colors.slate500,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.slate500,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  resetFilterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.colors.purple50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
  },
  resetFilterText: {
    fontSize: 13,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.purple700,
  },
});
