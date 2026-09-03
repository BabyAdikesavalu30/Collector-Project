/**
 * Mystery Lab — Main Hub Screen
 * Entry point for the Mystery Lab feature showing hero, daily mystery,
 * featured cases, and progress.
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { getMysteryCases, getMysteryCaseById } from '../../features/mystery-lab/mystery.cases';
import { getMysteryProgress, isDailyMysteryCompleted } from '../../features/mystery-lab/mystery.storage';
import {
  getTodayDateString,
  getDailyCaseId,
  localize,
  CATEGORY_CONFIG,
  DIFFICULTY_CONFIG,
  GRADE_RANGE_CONFIG,
} from '../../features/mystery-lab/mystery.utils';
import { MysteryProgress, MysteryCase } from '../../features/mystery-lab/mystery.types';
import { getMysteryRecommendations } from '../../features/mystery-lab/mystery.registry';
import { AppBackButton } from '../navigation';

interface MysteryLabScreenProps {
  language: SupportedLanguage;
}

export const MysteryLabScreen: React.FC<MysteryLabScreenProps> = ({ language }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isTamil = language === 'ta';

  const [progress, setProgress] = useState<MysteryProgress | null>(null);
  const [dailyCase, setDailyCase] = useState<MysteryCase | null>(null);
  const [dailyCompleted, setDailyCompleted] = useState(false);
  const [featuredCases, setFeaturedCases] = useState<MysteryCase[]>([]);

  const loadData = useCallback(async () => {
    const cases = getMysteryCases();
    const [prog, completed] = await Promise.all([
      getMysteryProgress(),
      isDailyMysteryCompleted(),
    ]);

    setProgress(prog);
    setDailyCompleted(completed);

    // Daily case
    const dailyId = getDailyCaseId(cases);
    const dc = getMysteryCaseById(dailyId);
    if (dc) setDailyCase(dc);

    // Featured: pick 3 random non-completed cases
    const notCompleted = cases.filter((c) => !prog.completedCases.includes(c.id));
    const shuffled = [...notCompleted].sort(() => Math.random() - 0.5);
    setFeaturedCases(shuffled.slice(0, 3));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleStartCase = useCallback((caseId: string) => {
    router.push({ pathname: '/mystery-lab/case', params: { caseId } });
  }, [router]);

  const handleViewAllCases = useCallback(() => {
    router.push('/mystery-lab/cases');
  }, [router]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/games');
    }
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.xs }]}>
        <AppBackButton
          onPress={handleBack}
          accessibilityLabel={isTamil ? 'பின்னால் செல்லவும்' : 'Back to Games'}
          style={styles.backButton}
        />
        <Text style={styles.headerTitle}>
          {isTamil ? 'மர்ம ஆய்வகம்' : 'Mystery Lab'}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + theme.spacing.xxl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconRow}>
            <Text style={styles.heroIcon}>🔬</Text>
            <View style={styles.heroDot} />
            <Text style={styles.heroIcon}>🔍</Text>
            <View style={styles.heroDot} />
            <Text style={styles.heroIcon}>🧬</Text>
          </View>
          <Text style={styles.heroTitle}>
            {isTamil ? 'மர்ம ஆய்வகம்' : 'Mystery Lab'}
          </Text>
          <Text style={styles.heroSubtitle}>
            {isTamil
              ? 'குறிப்புகளை ஆய்வு செய்யுங்கள். விஞ்ஞானியாக சிந்தியுங்கள். வழக்கை தீர்க்கவும்.'
              : 'Investigate clues. Think like a scientist. Solve the case.'}
          </Text>
        </View>

        {/* Streak Banner */}
        {progress && progress.mysteryStreak.currentStreak > 0 && (
          <View style={styles.streakCard}>
            <Text style={styles.streakFlame}>🔥</Text>
            <View>
              <Text style={styles.streakCount}>
                {progress.mysteryStreak.currentStreak} {isTamil ? 'நாள் விசாரணை தொடர்ச்சி' : 'Day Investigation Streak'}
              </Text>
            </View>
          </View>
        )}

        {/* Today's Mystery */}
        {dailyCase && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isTamil ? 'இன்றைய மர்மம்' : "TODAY'S MYSTERY"}
            </Text>
            <TouchableOpacity
              style={styles.caseCard}
              onPress={() => handleStartCase(dailyCase.id)}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`${localize(dailyCase.title, language)}, ${isTamil ? CATEGORY_CONFIG[dailyCase.category].labelTa : CATEGORY_CONFIG[dailyCase.category].labelEn}`}
            >
              <View style={styles.caseCardHeader}>
                <Text style={styles.caseCategoryIcon}>
                  {CATEGORY_CONFIG[dailyCase.category].icon}
                </Text>
                <View style={styles.caseCardMeta}>
                  <Text style={styles.caseCardTitle}>{localize(dailyCase.title, language)}</Text>
                  <Text style={styles.caseCardCategory}>
                    {CATEGORY_CONFIG[dailyCase.category].labelEn}
                  </Text>
                  <Text style={styles.caseCardGrade}>
                    {GRADE_RANGE_CONFIG[dailyCase.gradeRange].labelEn} · {DIFFICULTY_CONFIG[dailyCase.difficulty].labelEn}
                  </Text>
                </View>
              </View>
              <Text style={styles.caseCardDescription} numberOfLines={2}>
                {localize(dailyCase.description, language)}
              </Text>
              <TouchableOpacity
                style={[styles.startButton, dailyCompleted && styles.startButtonCompleted]}
                onPress={() => handleStartCase(dailyCase.id)}
                activeOpacity={0.7}
                disabled={dailyCompleted}
              >
                <Text style={[styles.startButtonText, dailyCompleted && styles.startButtonTextCompleted]}>
                  {dailyCompleted
                    ? (isTamil ? 'முடிந்தது ✓' : 'Completed ✓')
                    : (isTamil ? 'விசாரணையைத் தொடங்கு' : 'Start Investigation')}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}

        {/* Featured Cases */}
        {featuredCases.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isTamil ? 'சிறப்பு வழக்குகள்' : 'FEATURED CASES'}
            </Text>
            {featuredCases.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={styles.featuredCard}
                onPress={() => handleStartCase(c.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.featuredIcon}>{CATEGORY_CONFIG[c.category].icon}</Text>
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredTitle}>{localize(c.title, language)}</Text>
                  <Text style={styles.featuredMeta}>
                    {CATEGORY_CONFIG[c.category].labelEn} · {DIFFICULTY_CONFIG[c.difficulty].labelEn}
                  </Text>
                </View>
                <Text style={styles.featuredArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* My Progress */}
        {progress && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {isTamil ? 'எனது முன்னேற்றம்' : 'MY PROGRESS'}
            </Text>
            <View style={styles.progressRow}>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatValue}>{progress.totalCasesSolved}</Text>
                <Text style={styles.progressStatLabel}>{isTamil ? 'தீர்க்கப்பட்ட வழக்குகள்' : 'Cases Solved'}</Text>
              </View>
              <View style={styles.progressStatDivider} />
              <View style={styles.progressStat}>
                <Text style={styles.progressStatValue}>{progress.averageScore}%</Text>
                <Text style={styles.progressStatLabel}>{isTamil ? 'சிறந்த மதிப்பெண்' : 'Best Score'}</Text>
              </View>
              <View style={styles.progressStatDivider} />
              <View style={styles.progressStat}>
                <Text style={styles.progressStatValue}>{progress.mysteryStreak.currentStreak}</Text>
                <Text style={styles.progressStatLabel}>{isTamil ? 'தொடர்ச்சி' : 'Streak'}</Text>
              </View>
            </View>
          </View>
        )}

        {/* View All Cases Button */}
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={handleViewAllCases}
          activeOpacity={0.7}
        >
          <Text style={styles.viewAllButtonText}>
            {isTamil ? 'அனைத்து வழக்குகளையும் காண்க' : 'View All Cases'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
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

  // Hero
  heroCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.base,
  },
  heroIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: 8,
  },
  heroIcon: { fontSize: 28 },
  heroDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.slate400,
  },
  heroTitle: {
    ...theme.typography.h1,
    fontSize: 24,
    color: theme.colors.navy900,
    marginBottom: theme.spacing.xs,
  },
  heroSubtitle: {
    ...theme.typography.body,
    color: theme.colors.slate500,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Streak
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    marginBottom: theme.spacing.base,
    gap: 12,
  },
  streakFlame: { fontSize: 24 },
  streakCount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#9A3412',
  },

  // Section
  section: { marginBottom: theme.spacing.lg },
  sectionTitle: {
    ...theme.typography.overline,
    fontSize: 11,
    color: theme.colors.slate500,
    marginBottom: theme.spacing.md,
    letterSpacing: 1.5,
  },

  // Case Card
  caseCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
  },
  caseCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
    gap: 12,
  },
  caseCategoryIcon: { fontSize: 32 },
  caseCardMeta: { flex: 1 },
  caseCardTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    color: theme.colors.navy900,
    marginBottom: 2,
  },
  caseCardCategory: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
  },
  caseCardGrade: {
    ...theme.typography.caption,
    color: theme.colors.slate400,
    marginTop: 2,
  },
  caseCardDescription: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    marginBottom: theme.spacing.md,
  },
  startButton: {
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 12,
    alignItems: 'center',
  },
  startButtonCompleted: {
    backgroundColor: theme.colors.gray100,
  },
  startButtonText: {
    ...theme.typography.button,
    fontSize: 14,
    color: theme.colors.textOnAction,
  },
  startButtonTextCompleted: {
    color: theme.colors.slate500,
  },

  // Featured
  featuredCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    gap: 12,
  },
  featuredIcon: { fontSize: 24 },
  featuredInfo: { flex: 1 },
  featuredTitle: {
    ...theme.typography.bodyLarge,
    fontWeight: '700',
    color: theme.colors.navy900,
    fontSize: 14,
  },
  featuredMeta: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  featuredArrow: {
    fontSize: 20,
    color: theme.colors.slate400,
    fontWeight: '600',
  },

  // Progress
  progressRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  progressStat: { flex: 1, alignItems: 'center' },
  progressStatValue: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  progressStatLabel: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
    marginTop: 4,
    textAlign: 'center',
  },
  progressStatDivider: {
    width: 1,
    height: 36,
    backgroundColor: theme.colors.border,
  },

  // View All
  viewAllButton: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  viewAllButtonText: {
    ...theme.typography.bodyLarge,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
  },
});
