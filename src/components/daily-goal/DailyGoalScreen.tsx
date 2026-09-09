/**
 * DailyGoalScreen Component
 * Main screen component for the /daily-goal route.
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AccessibilityInfo,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { getActivityHistory } from '../../features/activity';
import { useDailyGoal } from '../../features/daily-goal';
import { DailyGoalWithProgress } from '../../features/daily-goal';
import { SessionRepository } from '../../features/auth';
import {
  DailyGoalHero,
  DailyGoalProgress,
  DailyGoalReward,
  DailyGoalActivityList,
  DailyGoalCompletion,
} from './index';

interface DailyGoalScreenProps {
  language?: SupportedLanguage;
  goal?: DailyGoalWithProgress | null;
  isLoading?: boolean;
  onNavigate?: (route: string) => void;
}

export const DailyGoalScreen: React.FC<DailyGoalScreenProps> = ({
  language = 'en',
  goal: initialGoal,
  isLoading: initialLoading,
  onNavigate,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).dailyGoal;
  const isTamil = language === 'ta';
  const [languageState, setLanguageState] = useState<SupportedLanguage>(language);

  const { goal, isLoading, isClaiming, claimReward, refresh } = useDailyGoal();

  const displayGoal = initialGoal ?? goal;
  const displayLoading = initialLoading ?? isLoading;

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [session, storedLang] = await Promise.all([
          SessionRepository.getSession(),
          storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE),
        ]);

        if (isMounted) {
          if (!session || !session.isAuthenticated) {
            router.replace('/auth-welcome');
            return;
          }
          if (storedLang && (storedLang === 'en' || storedLang === 'ta')) {
            setLanguageState(storedLang);
          }
        }
      } catch {
        router.replace('/auth-welcome');
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleClaim = useCallback(async () => {
    if (!displayGoal) return;
    const ok = await claimReward();
    if (ok) {
      AccessibilityInfo.announceForAccessibility(
        isTamil ? 'தின இலக்கு வெகுமதி பெறப்பட்டது' : 'Daily goal reward claimed'
      );
    }
  }, [displayGoal, claimReward, isTamil]);

  const handleExploreMore = useCallback(() => {
    onNavigate?.('/explore');
    router.push('/explore');
  }, [onNavigate, router]);

  const handleBackHome = useCallback(() => {
    onNavigate?.('/home');
    router.replace('/home');
  }, [onNavigate, router]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  if (displayLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t.loading}</Text>
        </View>
      </View>
    );
  }

  if (!displayGoal) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🎯</Text>
          <Text style={styles.emptyTitle}>{t.emptyTitle}</Text>
          <Text style={styles.emptySubtitle}>{t.emptySubtitle}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={refresh}
            activeOpacity={0.85}
            accessible
            accessibilityRole="button"
          >
            <Text style={styles.retryButtonText}>{t.tryAgain}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const { definition, progress, status, completedActivityIds, rewardClaimed } = displayGoal;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 8, 16),
            paddingBottom: Math.max(insets.bottom + 24, 32),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.85}
            accessible
            accessibilityRole="button"
            accessibilityLabel={t.back}
          >
            <Text style={styles.backIcon}>{'\u003C'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t.title}</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.card}>
          <DailyGoalHero goal={displayGoal} language={languageState} />
        </View>

        <View style={styles.card}>
          <DailyGoalProgress progress={progress} status={status} language={languageState} />
        </View>

        <View style={styles.card}>
          <DailyGoalReward reward={definition.reward} claimed={rewardClaimed} language={languageState} />
        </View>

        {status === 'completed' && !rewardClaimed ? (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.claimButton}
              onPress={handleClaim}
              disabled={isClaiming}
              activeOpacity={0.85}
              accessible
              accessibilityRole="button"
              accessibilityLabel={t.claimReward}
            >
              <Text style={styles.claimButtonText}>
                {isClaiming ? (isTamil ? 'செயலாக்குகிறது...' : 'Claiming...') : t.claimReward}
              </Text>
            </TouchableOpacity>
          </View>
        ) : status === 'claimed' ? (
          <DailyGoalCompletion
            reward={definition.reward}
            language={languageState}
            onExploreMore={handleExploreMore}
            onBackHome={handleBackHome}
          />
        ) : (
          <>
            <View style={styles.card}>
              <DailyGoalActivityList
                completedActivityIds={completedActivityIds}
                history={[]}
                language={languageState}
              />
            </View>

            <View style={styles.ctaCard}>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleExploreMore}
                activeOpacity={0.85}
                accessible
                accessibilityRole="button"
                accessibilityLabel={t.continueActivities}
              >
                <Text style={styles.continueButtonText}>{t.continueActivities}</Text>
                <Text style={styles.continueButtonIcon}>→</Text>
              </TouchableOpacity>
            </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.base,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate500,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  emptyTitle: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  emptySubtitle: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate500,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  retryButton: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
  },
  retryButtonText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  backIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
    flex: 1,
    textAlign: 'center',
    marginLeft: -20,
  },
  headerSpacer: {
    width: 40,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  claimButton: {
    backgroundColor: theme.colors.actionPrimary,
    paddingVertical: 16,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  claimButtonText: {
    ...theme.typography.button,
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
  ctaCard: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: theme.colors.actionPrimary,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.md,
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  continueButtonText: {
    ...theme.typography.button,
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
  continueButtonIcon: {
    ...theme.typography.button,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
});