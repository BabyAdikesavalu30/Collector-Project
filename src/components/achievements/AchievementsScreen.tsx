/**
 * AchievementsScreen Component (/achievements)
 * Upgraded collectible Science Badge Gallery for Grades 6-12.
 * Integrates real activity data, deterministic criteria evaluation,
 * status & category filtering, next milestone spotlight, and detailed modal views.
 */

import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { AppBackButton } from '../navigation';
import { navigate, navigateDynamic } from '../../components/navigation/navigation.config';
import {
  useAchievements,
  Achievement,
  AchievementCategory,
  AchievementStatus,
} from '../../features/achievements';
import { getAchievementsI18n } from './achievements.i18n';
import { AchievementSummaryCard } from './AchievementSummaryCard';
import { NextBadgeCard } from './NextBadgeCard';
import { RecentUnlocksRow } from './RecentUnlocksRow';
import { AchievementFilters } from './AchievementFilters';
import { AchievementCard } from './AchievementCard';
import { AchievementDetailModal } from './AchievementDetailModal';

export interface AchievementsScreenProps {
  language?: SupportedLanguage;
  onBack?: () => void;
  onStartLearning?: () => void;
  onNavigateToRoute?: (route: string) => void;
  initialBadgeId?: string;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  language = 'en',
  onBack,
  onStartLearning,
  onNavigateToRoute,
  initialBadgeId,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const i18n = getAchievementsI18n(language);

  const {
    achievements,
    allAchievements,
    summary,
    nextBadge,
    recentUnlocks,
    isLoading,
    isRefreshing,
    statusFilter,
    categoryFilter,
    setStatusFilter,
    setCategoryFilter,
    refresh,
    selectedBadge,
    selectBadge,
  } = useAchievements();

  // If navigated with initialBadgeId, select that badge once data is ready
  useEffect(() => {
    if (initialBadgeId && allAchievements.length > 0 && !selectedBadge) {
      const match = allAchievements.find((a) => a.id === initialBadgeId);
      if (match) {
        selectBadge(match);
      }
    }
  }, [initialBadgeId, allAchievements, selectedBadge, selectBadge]);

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [onBack, router]);

  const handleNavigate = useCallback(
    (route: string) => {
      if (onNavigateToRoute) {
        onNavigateToRoute(route);
      } else {
        navigateDynamic(router, route);
      }
    },
    [onNavigateToRoute, router]
  );

  const handleBadgePress = useCallback(
    (badge: Achievement) => {
      selectBadge(badge);
    },
    [selectBadge]
  );

  const handleCloseModal = useCallback(() => {
    selectBadge(null);
  }, [selectBadge]);

  const handleResetFilters = useCallback(() => {
    setStatusFilter('all');
    setCategoryFilter('all');
  }, [setStatusFilter, setCategoryFilter]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <AppBackButton onPress={handleBack} language={language} style={styles.headerBackBtn} />
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{i18n.screenTitle}</Text>
          <Text style={styles.headerSubtitle}>{i18n.screenSubtitle}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 32, 48) },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isLoading || isRefreshing} onRefresh={refresh} />}
      >
        {/* 1. Hero Summary Card */}
        <AchievementSummaryCard summary={summary} language={language} />

        {/* 2. Next Milestone Spotlight */}
        <NextBadgeCard
          badge={nextBadge}
          language={language}
          onPressBadge={handleBadgePress}
          onAction={handleNavigate}
        />

        {/* 3. Recent Unlocks Row (shown if any badge is earned) */}
        {recentUnlocks.length > 0 && (
          <RecentUnlocksRow
            badges={recentUnlocks}
            language={language}
            onPressBadge={handleBadgePress}
          />
        )}

        {/* 4. Dual Filters (Status + Category) */}
        <AchievementFilters
          selectedStatus={statusFilter as AchievementStatus | 'all'}
          selectedCategory={categoryFilter as AchievementCategory | 'all'}
          onSelectStatus={setStatusFilter}
          onSelectCategory={setCategoryFilter}
          language={language}
        />

        {/* 5. Badge Grid */}
        {achievements.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>{i18n.empty.title}</Text>
            <Text style={styles.emptySubtitle}>{i18n.empty.subtitle}</Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={handleResetFilters}
              activeOpacity={0.85}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={i18n.empty.resetBtn}
            >
              <Text style={styles.resetBtnText}>{i18n.empty.resetBtn}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.badgeGrid}>
            {achievements.map((badge) => (
              <AchievementCard
                key={badge.id}
                badge={badge}
                language={language}
                onPress={handleBadgePress}
              />
            ))}
          </View>
        )}

        {/* Optional Starter CTA when 0 achievements unlocked and user is viewing all */}
        {summary && summary.unlockedCount === 0 && !isLoading && onStartLearning && (
          <TouchableOpacity
            style={styles.startLearningBtn}
            onPress={onStartLearning}
            activeOpacity={0.85}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={language === 'ta' ? 'முதல் சாதனையைத் திறக்கவும்' : 'Unlock Your First Badge'}
          >
            <Text style={styles.startLearningBtnText}>
              {language === 'ta' ? 'முதல் சாதனையைத் தொடங்கவும் →' : 'Begin Your First Badge →'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Badge Detail Modal */}
      <AchievementDetailModal
        visible={selectedBadge !== null}
        badge={selectedBadge}
        language={language}
        onClose={handleCloseModal}
        onAction={handleNavigate}
      />
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
    backgroundColor: theme.colors.pearlWhite,
  },
  headerBackBtn: {},
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
  },
  headerSubtitle: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginTop: 1,
  },
  headerSpacer: {
    width: 44,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.base,
    gap: theme.spacing.md,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  emptyContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginVertical: theme.spacing.sm,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: theme.spacing.sm,
  },
  emptyTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 4,
  },
  emptySubtitle: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: theme.spacing.md,
  },
  resetBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.colors.navy900,
    borderRadius: theme.borderRadius.md,
  },
  resetBtnText: {
    ...theme.typography.button,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.white,
  },
  startLearningBtn: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.xs,
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  startLearningBtnText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
});