/**
 * FocusAreasScreen (/weak-areas)
 * Answers: "What should I improve next?" — positive, data-supported,
 * actionable. Never shames, never compares, never claims AI.
 */

import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import {
  FocusArea,
  FocusSubjectId,
  FocusAreasSnapshot,
  useFocusAreas,
} from '../../features/weak-areas';
import { ScreenHeader, FilterChips, EmptyState } from '../shared';
import { FocusAreaCard } from './FocusAreaCard';
import { ImprovementCard } from './ImprovementCard';
import { SubjectSummaryCard } from './SubjectSummaryCard';
import { getWeakAreasI18n, interpolate } from './weakAreas.i18n';

interface FocusAreasScreenProps {
  language: SupportedLanguage;
  onBack: () => void;
  /** Parent decides navigation; the screen only reports the route. */
  onNavigate: (route: string, params?: Record<string, string>) => void;
  /** Prefetched snapshot (optional) — when absent the screen loads its own. */
  snapshot?: FocusAreasSnapshot | null;
}

const SUBJECT_FILTERS: Array<{ key: FocusSubjectId | 'all'; en: string; ta: string }> = [
  { key: 'all', en: 'All', ta: 'அனைத்தும்' },
  { key: 'physics', en: 'Physics', ta: 'இயற்பியல்' },
  { key: 'chemistry', en: 'Chemistry', ta: 'வேதியியல்' },
  { key: 'biology', en: 'Biology', ta: 'உயிரியல்' },
  { key: 'space', en: 'Space', ta: 'விண்வெளி' },
  { key: 'environment', en: 'Environment', ta: 'சுற்றுச்சூழல்' },
  { key: 'human-body', en: 'Human Body', ta: 'மனித உடல்' },
  { key: 'everyday-science', en: 'Everyday Science', ta: 'அன்றாட அறிவியல்' },
];

export const FocusAreasScreen: React.FC<FocusAreasScreenProps> = ({
  language,
  onBack,
  onNavigate,
  snapshot: prefetch,
}) => {
  const insets = useSafeAreaInsets();
  const t = getWeakAreasI18n(language);
  const { snapshot: loaded, isLoading, hasError, selectedSubjectId, setSelectedSubjectId, reload } =
    useFocusAreas();
  const snapshot = prefetch ?? loaded;

  const handlePractice = useCallback(
    (area: FocusArea) => {
      onNavigate(area.action.route, area.action.params);
    },
    [onNavigate]
  );

  const filters = useMemo(
    () =>
      SUBJECT_FILTERS.filter((f) => {
        if (f.key === 'all') return true;
        return snapshot?.subjects.some((s) => s.subjectId === f.key);
      }).map((f) => ({
        key: f.key as string,
        label: language === 'ta' ? f.ta : f.en,
      })),
    [snapshot, language]
  );

  const visibleFocusAreas = useMemo(() => {
    if (!snapshot) return [];
    if (selectedSubjectId === 'all') return snapshot.focusAreas;
    return snapshot.focusAreas.filter((f) => f.subjectId === selectedSubjectId);
  }, [snapshot, selectedSubjectId]);

  const recommended = visibleFocusAreas[0] ?? null;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ScreenHeader title={t.title} language={language} onBack={onBack} subtitle={t.subtitle} />

      {hasError ? (
        <View style={styles.centerWrap}>
          <EmptyState
            icon="🔄"
            title={t.errorTitle}
            actionLabel={t.tryAgain}
            onAction={reload}
          />
        </View>
      ) : isLoading && !snapshot ? (
        <View style={styles.centerWrap}>
          <Text style={styles.loadingText}>…</Text>
        </View>
      ) : snapshot && !snapshot.hasEnoughData ? (
        /* ---- No-data / discovery state for fresh students ---- */
        <View style={styles.centerWrap}>
          <EmptyState
            icon="🔭"
            title={t.emptyTitle}
            subtitle={t.emptySub}
            actionLabel={t.exploreScience}
            onAction={() => onNavigate('/explore')}
          />
        </View>
      ) : snapshot ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom + 24, 32) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Intro card */}
          <View style={styles.introCard}>
            <Text style={styles.introText}>{t.intro}</Text>
            <Text style={styles.introMeta}>{t.basedOnActivity}</Text>
          </View>

          {/* Overall summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.sectionLabel}>{t.overallSummary}</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryBox}>
                <Text style={styles.summaryValue}>{snapshot.topicsAnalyzed}</Text>
                <Text style={styles.summaryLabel}>{t.analyzedTopics}</Text>
              </View>
              <View style={styles.summaryBox}>
                <Text style={styles.summaryValue}>{snapshot.focusAreas.length}</Text>
                <Text style={styles.summaryLabel}>{t.focusAreasCount}</Text>
              </View>
              <View style={styles.summaryBox}>
                <Text style={[styles.summaryValue, { color: theme.colors.green700 }]}>
                  {snapshot.improving.length}
                </Text>
                <Text style={styles.summaryLabel}>{t.improvingCount}</Text>
              </View>
              <View style={styles.summaryBox}>
                <Text style={[styles.summaryValue, { color: theme.colors.green700 }]}>
                  {snapshot.strongTopics.length}
                </Text>
                <Text style={styles.summaryLabel}>{t.strongCount}</Text>
              </View>
            </View>
          </View>

          {/* Subject overview */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>{t.topicsNeedingPractice}</Text>
            {snapshot.subjects.map((s) => (
              <SubjectSummaryCard key={s.subjectId} summary={s} language={language} />
            ))}
          </View>

          {/* Subject filter */}
          {snapshot.focusAreas.length > 0 ? (
            <FilterChips
              options={filters}
              selected={selectedSubjectId}
              onSelect={(key) => setSelectedSubjectId(key as FocusSubjectId | 'all')}
            />
          ) : null}

          {/* Recommended next step — one clear CTA */}
          {recommended ? (
            <View style={styles.nextStepCard}>
              <Text style={styles.sectionLabel}>{t.recommendedNextStep}</Text>
              <Text style={styles.nextStepTitle}>
                {language === 'ta' ? recommended.title.ta : recommended.title.en}
              </Text>
              <TouchableOpacity
                style={styles.nextStepButton}
                onPress={() => handlePractice(recommended)}
                accessibilityRole="button"
                accessibilityLabel={`${t.start}: ${recommended.title[language]}`}
                activeOpacity={0.85}
              >
                <Text style={styles.nextStepButtonText}>{t.start}</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* Focus area cards */}
          {visibleFocusAreas.length > 0 ? (
            <>
              <Text style={styles.sectionHeader}>{t.yourFocusAreas}</Text>
              {visibleFocusAreas.map((area) => (
                <FocusAreaCard
                  key={area.topicId}
                  area={area}
                  language={language}
                  onPractice={handlePractice}
                />
              ))}
            </>
          ) : (
            <View style={styles.card}>
              <Text style={styles.emptyInlineTitle}>{t.keepExploring}</Text>
              <Text style={styles.emptyInlineSub}>{t.notEnoughDataSub}</Text>
            </View>
          )}

          {/* Getting stronger */}
          {snapshot.improving.length > 0 ? (
            <>
              <Text style={styles.sectionHeader}>{t.gettingStronger}</Text>
              {snapshot.improving.map((area) => (
                <ImprovementCard
                  key={area.topicId}
                  area={area}
                  language={language}
                  onKeepPracticing={handlePractice}
                />
              ))}
            </>
          ) : null}

          {/* Strong topics preview */}
          {snapshot.strongTopics.length > 0 ? (
            <>
              <Text style={styles.sectionHeader}>{t.strongTopics}</Text>
              <View style={styles.card}>
                {snapshot.strongTopics.map((area) => (
                  <View key={area.topicId} style={styles.strongRow}>
                    <Text style={styles.strongIcon}>🌟</Text>
                    <Text style={styles.strongName} numberOfLines={1}>
                      {area.title[language]}
                    </Text>
                    <Text style={styles.strongAccuracy}>{area.accuracy}%</Text>
                  </View>
                ))}
              </View>
            </>
          ) : null}
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  centerWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    textAlign: 'center',
    color: theme.colors.slate500,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.base,
    gap: theme.spacing.sm,
  },
  introCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginTop: theme.spacing.sm,
  },
  introText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: theme.colors.navy900,
    lineHeight: 21,
  },
  introMeta: {
    fontSize: 11.5,
    color: theme.colors.slate500,
    marginTop: 4,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
  },
  summaryCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
  },
  sectionLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  summaryBox: {
    flexBasis: '48%',
    flexGrow: 1,
    backgroundColor: theme.colors.blue50,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.slate600,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.navy900,
    letterSpacing: 0.6,
    marginTop: theme.spacing.xs,
  },
  nextStepCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
    padding: theme.spacing.base,
  },
  nextStepTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  nextStepButton: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.actionPrimary,
    minHeight: 44,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  nextStepButtonText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
  emptyInlineTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  emptyInlineSub: {
    fontSize: 12.5,
    color: theme.colors.slate600,
    marginTop: 4,
    lineHeight: 18,
  },
  strongRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  strongIcon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  strongName: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  strongAccuracy: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.green700,
  },
});
