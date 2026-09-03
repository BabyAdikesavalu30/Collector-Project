/**
 * Mystery Lab — Cases List Screen
 * Browse all mystery cases with search, category filters, and grade filters.
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { MysteryCase, MysteryCategory, GradeRange, MysteryProgress } from '../../features/mystery-lab/mystery.types';
import { getMysteryCases } from '../../features/mystery-lab/mystery.cases';
import { getMysteryProgress } from '../../features/mystery-lab/mystery.storage';
import {
  localize,
  CATEGORY_CONFIG,
  DIFFICULTY_CONFIG,
  GRADE_RANGE_CONFIG,
} from '../../features/mystery-lab/mystery.utils';
import { AppBackButton } from '../navigation';

interface MysteryCasesScreenProps {
  language: SupportedLanguage;
}

export const MysteryCasesScreen: React.FC<MysteryCasesScreenProps> = ({ language }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isTamil = language === 'ta';

  const allCases = useMemo(() => getMysteryCases(), []);
  const [progress, setProgress] = useState<MysteryProgress | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<MysteryCategory | 'all'>('all');
  const [gradeFilter, setGradeFilter] = useState<GradeRange | 'all'>('all');

  React.useEffect(() => {
    getMysteryProgress().then(setProgress);
  }, []);

  const filteredCases = useMemo(() => {
    let cases = [...allCases];

    if (search.trim()) {
      const q = search.toLowerCase();
      cases = cases.filter((c) =>
        localize(c.title, language).toLowerCase().includes(q) ||
        localize(c.description, language).toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.learningConcepts.some((l) => l.toLowerCase().includes(q))
      );
    }

    if (categoryFilter !== 'all') {
      cases = cases.filter((c) => c.category === categoryFilter);
    }

    if (gradeFilter !== 'all') {
      cases = cases.filter((c) => c.gradeRange === gradeFilter);
    }

    return cases;
  }, [allCases, search, categoryFilter, gradeFilter, language]);

  const categories: { id: MysteryCategory | 'all'; label: string }[] = [
    { id: 'all', label: isTamil ? 'அனைத்தும்' : 'All' },
    { id: 'physics', label: CATEGORY_CONFIG.physics.labelEn },
    { id: 'chemistry', label: CATEGORY_CONFIG.chemistry.labelEn },
    { id: 'biology', label: CATEGORY_CONFIG.biology.labelEn },
    { id: 'space', label: CATEGORY_CONFIG.space.labelEn },
    { id: 'environment', label: CATEGORY_CONFIG.environment.labelEn },
    { id: 'human-body', label: CATEGORY_CONFIG['human-body'].labelEn },
    { id: 'everyday-science', label: CATEGORY_CONFIG['everyday-science'].labelEn },
    { id: 'scientific-history', label: CATEGORY_CONFIG['scientific-history'].labelEn },
  ];

  const gradeFilters: { id: GradeRange | 'all'; label: string }[] = [
    { id: 'all', label: isTamil ? 'அனைத்து வகுப்புகள்' : 'All Grades' },
    { id: '6-7', label: GRADE_RANGE_CONFIG['6-7'].labelEn },
    { id: '8-10', label: GRADE_RANGE_CONFIG['8-10'].labelEn },
    { id: '11-12', label: GRADE_RANGE_CONFIG['11-12'].labelEn },
  ];

  const handleStartCase = useCallback((caseId: string) => {
    router.push({ pathname: '/mystery-lab/case', params: { caseId } });
  }, [router]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.xs }]}>
        <AppBackButton onPress={handleBack} style={styles.backButton} />
        <Text style={styles.headerTitle}>{isTamil ? 'வழக்குகள்' : 'All Cases'}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + theme.spacing.xxl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={isTamil ? 'வழக்குகளைத் தேடு...' : 'Search cases, concepts...'}
            placeholderTextColor={theme.colors.slate400}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} style={styles.clearButton}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <View style={styles.filterRow}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.filterChip, categoryFilter === cat.id && styles.filterChipActive]}
                onPress={() => setCategoryFilter(cat.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterChipText, categoryFilter === cat.id && styles.filterChipTextActive]}>
                  {cat.id !== 'all' && CATEGORY_CONFIG[cat.id as MysteryCategory]?.icon} {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Grade Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <View style={styles.filterRow}>
            {gradeFilters.map((gf) => (
              <TouchableOpacity
                key={gf.id}
                style={[styles.filterChip, gradeFilter === gf.id && styles.filterChipActive]}
                onPress={() => setGradeFilter(gf.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterChipText, gradeFilter === gf.id && styles.filterChipTextActive]}>
                  {gf.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Results Count */}
        <Text style={styles.resultsCount}>
          {filteredCases.length} {isTamil ? 'வழக்குகள்' : 'cases'}
        </Text>

        {/* Case List */}
        {filteredCases.map((c) => {
          const isCompleted = progress?.completedCases.includes(c.id) || false;
          return (
            <TouchableOpacity
              key={c.id}
              style={styles.caseCard}
              onPress={() => handleStartCase(c.id)}
              activeOpacity={0.7}
            >
              <View style={styles.caseCardHeader}>
                <Text style={styles.caseCardIcon}>{CATEGORY_CONFIG[c.category].icon}</Text>
                <View style={styles.caseCardInfo}>
                  <Text style={styles.caseCardTitle}>{localize(c.title, language)}</Text>
                  <Text style={styles.caseCardMeta}>
                    {CATEGORY_CONFIG[c.category].labelEn} · {DIFFICULTY_CONFIG[c.difficulty].labelEn} · {GRADE_RANGE_CONFIG[c.gradeRange].labelEn}
                  </Text>
                </View>
                {isCompleted && <Text style={styles.completedBadge}>✓</Text>}
              </View>
              <Text style={styles.caseCardDesc} numberOfLines={2}>
                {localize(c.description, language)}
              </Text>
              <View style={styles.caseCardFooter}>
                <Text style={styles.caseCardTime}>⏱ {c.estimatedMinutes} min</Text>
                <Text style={styles.caseCardClues}>{c.clues.length} {isTamil ? 'குறிப்புகள்' : 'clues'}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {filteredCases.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>{isTamil ? 'வழக்குகள் கிடைக்கவில்லை' : 'No cases found'}</Text>
            <Text style={styles.emptySubtext}>{isTamil ? 'வேறு வடிகட்டியை முயற்சிக்கவும்' : 'Try adjusting your filters'}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.pearlWhite },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {},
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  headerSpacer: { width: 44 },
  scroll: { flex: 1 },
  scrollContent: { padding: theme.spacing.lg },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    height: 44,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.navy900,
    padding: 0,
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: { fontSize: 12, color: theme.colors.slate500 },

  // Filters
  filterScroll: { marginBottom: theme.spacing.sm },
  filterRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingVertical: 4,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  filterChipActive: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.blue50,
  },
  filterChipText: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: theme.colors.actionPrimary,
  },

  // Results
  resultsCount: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
    marginBottom: theme.spacing.md,
  },

  // Case Card
  caseCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  caseCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 10,
  },
  caseCardIcon: { fontSize: 24 },
  caseCardInfo: { flex: 1 },
  caseCardTitle: {
    ...theme.typography.bodyLarge,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  caseCardMeta: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  completedBadge: {
    fontSize: 18,
    color: theme.colors.success,
    fontWeight: '700',
  },
  caseCardDesc: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    marginBottom: 6,
    lineHeight: 18,
  },
  caseCardFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  caseCardTime: {
    ...theme.typography.caption,
    color: theme.colors.slate400,
  },
  caseCardClues: {
    ...theme.typography.caption,
    color: theme.colors.slate400,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl,
  },
  emptyIcon: { fontSize: 48, marginBottom: theme.spacing.md },
  emptyText: {
    ...theme.typography.h3,
    color: theme.colors.navy900,
    marginBottom: 4,
  },
  emptySubtext: {
    ...theme.typography.body,
    color: theme.colors.slate500,
  },
});
