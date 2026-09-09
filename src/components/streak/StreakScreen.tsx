/**
 * StreakScreen Component
 * Master screen for the Streak & Activity Calendar Experience.
 * Provides habit-building encouragement, visual calendar, day breakdown,
 * monthly summary, and milestones.
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { AppBackButton } from '../navigation/AppBackButton';
import { getStreakI18n } from './streak.i18n';
import { useStreakCalendar } from '../../features/streaks/streaks.hooks';
import { navigate, navigateDynamic } from '../../components/navigation/navigation.config';
import { StreakHeroCard } from './StreakHeroCard';
import { StreakTodayCard } from './StreakTodayCard';
import { StreakWeeklyPreview } from './StreakWeeklyPreview';
import { ActivityCalendar } from './ActivityCalendar';
import { StreakDayDetailCard } from './StreakDayDetailCard';
import { StreakMonthlySummaryCard } from './StreakMonthlySummaryCard';
import { StreakMilestonesCard } from './StreakMilestonesCard';

interface StreakScreenProps {
  language?: SupportedLanguage;
  onBack?: () => void;
  onNavigate?: (route: string) => void;
}

export const StreakScreen: React.FC<StreakScreenProps> = ({
  language = 'en',
  onBack,
  onNavigate,
}) => {
  const router = useRouter();
  const t = getStreakI18n(language);

  const {
    data,
    isLoading,
    isRefreshing,
    selectedDateKey,
    calendarYear,
    calendarMonth,
    selectDate,
    prevMonth,
    nextMonth,
    goToToday,
    refresh,
  } = useStreakCalendar();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  };

  const handleNavigate = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      try {
        navigateDynamic(router, route);
      } catch (err) {
        console.warn('[StreakScreen] Navigation failed:', err);
      }
    }
  };

  if (isLoading && !data) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <AppBackButton onPress={handleBack} language={language} variant="card" />
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{t.title}</Text>
          </View>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.actionPrimary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <AppBackButton onPress={handleBack} language={language} variant="card" />
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{t.title}</Text>
          </View>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{t.noActivityRecorded}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Sticky App Header */}
      <View style={styles.header}>
        <AppBackButton onPress={handleBack} language={language} variant="card" />
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{t.title}</Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {t.subtitle}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            colors={[theme.colors.actionPrimary]}
            tintColor={theme.colors.actionPrimary}
          />
        }
      >
        {/* 1. Streak Hero Card */}
        <StreakHeroCard
          currentStreak={data.streak.currentStreak}
          longestStreak={data.streak.longestStreak}
          isTodayActive={data.isTodayActive}
          language={language}
        />

        {/* 2. Today's Status & Action Card */}
        <StreakTodayCard
          isTodayActive={data.isTodayActive}
          dailyGoalSnapshot={data.dailyGoalSnapshot}
          onStartActivity={() => handleNavigate('/learn')}
          onViewDailyGoal={() => handleNavigate('/daily-goal')}
          language={language}
        />

        {/* 3. Weekly Preview Strip */}
        <StreakWeeklyPreview
          days={data.weeklyPreview}
          selectedDateKey={selectedDateKey}
          onSelectDate={selectDate}
          language={language}
        />

        {/* 4. Full Activity Calendar */}
        <ActivityCalendar
          year={data.calendarMonth.year}
          month={data.calendarMonth.month}
          monthNameEn={data.calendarMonth.monthNameEn}
          monthNameTa={data.calendarMonth.monthNameTa}
          days={data.calendarMonth.days}
          selectedDateKey={selectedDateKey}
          canGoNext={data.calendarMonth.canGoNext}
          canGoPrev={data.calendarMonth.canGoPrev}
          onSelectDate={selectDate}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          onTodayPress={goToToday}
          language={language}
        />

        {/* 5. Selected Day Activity Detail */}
        <StreakDayDetailCard
          detail={data.selectedDayDetail}
          language={language}
        />

        {/* 6. Monthly Summary & Consistency Insight */}
        <StreakMonthlySummaryCard
          summary={data.monthlySummary}
          consistency={data.consistencyInsight}
          language={language}
        />

        {/* 7. Streak Milestones */}
        <StreakMilestonesCard
          milestones={data.milestones}
          currentStreak={data.streak.currentStreak}
          language={language}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.colors.pearlWhite,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
  },
  headerTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  headerSubtitle: {
    fontSize: 12,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 14,
    color: theme.colors.slate600,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 32,
  },
});
