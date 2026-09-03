/**
 * HomeScreen Component (Screen 14 - Production Home Dashboard)
 * Primary personalized command center for Vigyaan science learners.
 * Features progress hero, continue learning, quick action grid,
 * daily challenge, recent achievement preview, and bottom navigation.
 * Clean Pearl White & White floating cards.
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  AccessibilityInfo,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { DashboardData } from '../../features/home/home.types';
import { HomeHeader } from './HomeHeader';
import { ProgressHeroCard } from './ProgressHeroCard';
import { ContinueLearningCard } from './ContinueLearningCard';
import { QuickActionGrid } from './QuickActionGrid';
import { DailyChallengeCard } from './DailyChallengeCard';
import { AchievementPreview } from './AchievementPreview';
import { DashboardSkeleton } from './DashboardSkeleton';

interface HomeScreenProps {
  language?: SupportedLanguage;
  data: DashboardData | null;
  isLoading: boolean;
  isOffline?: boolean;
  error?: string | null;
  onRefresh: () => Promise<void>;
  onNavigate: (route: string) => void;
  onAnalyticsEvent?: (eventName: string, params?: Record<string, unknown>) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language = 'en',
  data,
  isLoading,
  isOffline = false,
  error = null,
  onRefresh,
  onNavigate,
  onAnalyticsEvent,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).home;
  const [refreshing, setRefreshing] = useState(false);

  // Telemetry on mount
  useEffect(() => {
    onAnalyticsEvent?.('home_viewed', { language });
  }, [language, onAnalyticsEvent]);

  // Pull-to-refresh handler
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    onAnalyticsEvent?.('home_refresh');
    await onRefresh();
    setRefreshing(false);
  }, [onRefresh, onAnalyticsEvent]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 8, Platform.OS === 'android' ? 28 : 16),
            paddingBottom: Math.max(insets.bottom + 80, 96),
          },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.actionPrimary}
            colors={[theme.colors.actionPrimary]}
          />
        }
      >
        {/* OFFLINE INDICATOR BANNER */}
        {isOffline && (
          <View style={styles.offlineBanner} accessible={true} accessibilityRole="alert">
            <Text style={styles.offlineText}>📡 {t.offline}</Text>
          </View>
        )}

        {/* SKELETON LOADING STATE */}
        {isLoading && !data && <DashboardSkeleton />}

        {/* ERROR STATE */}
        {Boolean(error) && !isLoading && !data && (
          <View style={styles.errorContainer} accessible={true} accessibilityRole="alert">
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>{t.errorTitle}</Text>
            <Text style={styles.errorMessage}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleRefresh}
              activeOpacity={0.85}
              accessible={true}
              accessibilityRole="button"
            >
              <Text style={styles.retryButtonText}>{t.tryAgain}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* MAIN LOADED DASHBOARD */}
        {data && (
          <>
            {/* Header: Greeting & Profile */}
            <HomeHeader
              student={data.student}
              language={language}
              onNotificationPress={() => {
                onNavigate('/notifications');
              }}
              onAvatarPress={() => {
                onNavigate('/profile');
              }}
            />

            {/* Hero Progress Card */}
            <ProgressHeroCard
              progressPercentage={data.overallProgressPercentage}
              streakDays={data.streakDays}
              points={data.points}
              rank={data.rank ? `#${data.rank}` : undefined}
              language={language}
            />

            {/* Continue Learning OR New Student Empty State */}
            {data.continueTopic ? (
              <ContinueLearningCard
                topic={data.continueTopic}
                language={language}
                onPress={() => {
                  onNavigate('/learn');
                }}
              />
            ) : (
              <View style={styles.emptyCard} accessible={true} accessibilityRole="summary">
                <Text style={styles.emptyIcon}>🚀</Text>
                <Text style={styles.emptyTitle}>{t.emptyTitle}</Text>
                <Text style={styles.emptySubtitle}>{t.emptySubtitle}</Text>
                <TouchableOpacity
                  style={styles.exploreButton}
                  onPress={() => onNavigate('/learn')}
                  activeOpacity={0.85}
                  accessible={true}
                  accessibilityRole="button"
                >
                  <Text style={styles.exploreButtonText}>{t.exploreScience} →</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Quick Actions Grid */}
            <QuickActionGrid
              language={language}
              onQuizPress={() => {
                onNavigate('/learn');
              }}
              onRiddlePress={() => {
                onNavigate('/riddles');
              }}
              onSpinWheelPress={() => {
                onNavigate('/spin-wheel');
              }}
              onEscapeRoomPress={() => {
                onNavigate('/escape-room');
              }}
              onProgressPress={() => {
                onNavigate('/progress');
              }}
              onCertificatesPress={() => {
                onNavigate('/certificates');
              }}
            />

            {/* Daily Science Challenge */}
            {data.dailyChallenge && (
              <DailyChallengeCard
                challenge={data.dailyChallenge}
                language={language}
                onStart={() => {
                  onNavigate('/challenges');
                }}
              />
            )}

            {/* Recent Achievement Preview */}
            {data.recentAchievement && (
              <AchievementPreview
                achievement={data.recentAchievement}
                language={language}
                onPress={() => {
                  onNavigate('/achievements');
                }}
              />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.base,
  },
  offlineBanner: {
    width: '100%',
    backgroundColor: theme.colors.warningSurface,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    alignItems: 'center',
  },
  offlineText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.warning,
  },
  emptyCard: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    alignItems: 'center',
    marginVertical: theme.spacing.xs,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  emptyTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 4,
  },
  emptySubtitle: {
    ...theme.typography.caption,
    fontSize: 12.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  exploreButton: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  exploreButtonText: {
    ...theme.typography.button,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
  errorContainer: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.errorBorder,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  errorIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  errorTitle: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 4,
  },
  errorMessage: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  retryButton: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
  },
  retryButtonText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
});
