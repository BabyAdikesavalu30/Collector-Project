/**
 * SciencePassportScreen — The unified "My Science Journey" experience.
 * Aggregates data from all existing canonical feature stores into one identity card.
 * NOT a profile, NOT a dashboard, NOT a certificate screen.
 * It IS the student's long-term science identity.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { SciencePassportSummary, PassportErrorState } from '../../features/science-passport';
import { ScreenHeader, LoadingState } from '../shared';
import { PassportHero } from './PassportHero';
import { JourneyStats } from './JourneyStats';
import { MilestoneJourney } from './MilestoneJourney';
import { Highlights } from './Highlights';
import { PassportSections } from './PassportSections';

interface SciencePassportScreenProps {
  language: SupportedLanguage;
  data: SciencePassportSummary | null;
  isLoading: boolean;
  error: PassportErrorState | null;
  onBack: () => void;
  onNavigate: (route: string) => void;
  onRetry: () => void;
}

export const SciencePassportScreen: React.FC<SciencePassportScreenProps> = ({
  language,
  data,
  isLoading,
  error,
  onBack,
  onNavigate,
  onRetry,
}) => {
  const insets = useSafeAreaInsets();
  const isTamil = language === 'ta';
  const t = getTranslation(language);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <ScreenHeader
        title={isTamil ? 'அறிவியல் கடவுச்சீட்டு' : 'Science Passport'}
        language={language}
        onBack={onBack}
      />

      {isLoading && !data ? (
        <LoadingState rows={6} />
      ) : error?.hasError && !data ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>
            {isTamil
              ? 'உங்கள் அறிவியல் கடவுச்சீட்டை ஏற்ற முடியவில்லை.'
              : "My Science Passport couldn't load."}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={onRetry}
            activeOpacity={0.8}
          >
            <Text style={styles.retryText}>
              {isTamil ? 'மீண்டும் முயற்சி' : 'Try Again'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : data ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: Math.max(insets.bottom + 24, 32) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Passport Hero — Identity Card */}
          <PassportHero
            name={data.student.name}
            initials={data.student.initials}
            grade={data.student.grade}
            school={data.student.school}
            level={data.level}
            streak={data.streak.current}
            language={language}
          />

          {/* Highlights */}
          <Highlights
            highlights={data.highlights}
            language={language}
            onNavigate={onNavigate}
          />

          {/* Journey Statistics */}
          <JourneyStats
            activityStats={data.activityStats}
            featureCounts={data.featureCounts}
            language={language}
            onNavigate={onNavigate}
          />

          {/* Science Discovery Map (Milestone Journey) */}
          <MilestoneJourney
            milestones={data.milestones}
            language={language}
            onNavigate={onNavigate}
          />

          {/* Feature Section Cards */}
          <PassportSections
            activityStats={data.activityStats}
            featureCounts={data.featureCounts}
            latestCertificate={data.latestCertificate}
            language={language}
            onNavigate={onNavigate}
          />

          {/* Personal Bests */}
          {data.personalBests.longestStreak > 0 && (
            <View style={styles.bestsContainer}>
              <Text style={styles.sectionTitle}>
                {isTamil ? 'தனிப்பட்ட சாதனைகள்' : 'PERSONAL BESTS'}
              </Text>

              <View style={styles.bestsGrid}>
                {data.personalBests.longestStreak > 0 && (
                  <View style={styles.bestItem}>
                    <Text style={styles.bestIcon}>🔥</Text>
                    <Text style={styles.bestValue}>{data.personalBests.longestStreak}</Text>
                    <Text style={styles.bestLabel}>
                      {isTamil ? 'நீண்ட தொடர்ச்சி' : 'Longest Streak'}
                    </Text>
                  </View>
                )}
                {data.personalBests.highestGameLevels > 0 && (
                  <View style={styles.bestItem}>
                    <Text style={styles.bestIcon}>🎮</Text>
                    <Text style={styles.bestValue}>{data.personalBests.highestGameLevels}</Text>
                    <Text style={styles.bestLabel}>
                      {isTamil ? 'ஆட்ட நிலைகள்' : 'Game Levels'}
                    </Text>
                  </View>
                )}
                {data.personalBests.mostRiddlesSolved > 0 && (
                  <View style={styles.bestItem}>
                    <Text style={styles.bestIcon}>🧩</Text>
                    <Text style={styles.bestValue}>{data.personalBests.mostRiddlesSolved}</Text>
                    <Text style={styles.bestLabel}>
                      {isTamil ? 'புதிர்கள்' : 'Riddles'}
                    </Text>
                  </View>
                )}
                {data.personalBests.mostExperiments > 0 && (
                  <View style={styles.bestItem}>
                    <Text style={styles.bestIcon}>🧪</Text>
                    <Text style={styles.bestValue}>{data.personalBests.mostExperiments}</Text>
                    <Text style={styles.bestLabel}>
                      {isTamil ? 'சோதனைகள்' : 'Experiments'}
                    </Text>
                  </View>
                )}
                {data.personalBests.mostCollections > 0 && (
                  <View style={styles.bestItem}>
                    <Text style={styles.bestIcon}>📦</Text>
                    <Text style={styles.bestValue}>{data.personalBests.mostCollections}</Text>
                    <Text style={styles.bestLabel}>
                      {isTamil ? 'தொகுப்புகள்' : 'Collections'}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Recent Timeline */}
          {data.recentTimeline.length > 0 && (
            <View style={styles.timelineContainer}>
              <Text style={styles.sectionTitle}>
                {isTamil ? 'சமீபத்திய செயல்பாடு' : 'RECENT ACTIVITY'}
              </Text>

              {data.recentTimeline.slice(0, 5).map((entry) => (
                <View key={entry.id} style={styles.timelineItem}>
                  <Text style={styles.timelineIcon}>{entry.icon}</Text>
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle} numberOfLines={1}>
                      {isTamil ? entry.title.ta : entry.title.en}
                    </Text>
                    <Text style={styles.timelineXp}>+{entry.xpEarned} XP</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.base,
    paddingTop: 0,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxl,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  errorTitle: {
    ...theme.typography.body,
    fontSize: 16,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  retryButton: {
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
  },
  retryText: {
    ...theme.typography.button,
    fontSize: 14,
    color: theme.colors.textOnAction,
    fontWeight: '700',
  },
  sectionTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: theme.spacing.md,
  },
  bestsContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.md,
  },
  bestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  bestItem: {
    backgroundColor: theme.colors.green50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    padding: theme.spacing.sm,
    alignItems: 'center',
    width: '31%',
    minWidth: 90,
  },
  bestIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  bestValue: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.green700,
  },
  bestLabel: {
    ...theme.typography.caption,
    fontSize: 10,
    color: theme.colors.slate600,
    marginTop: 2,
    textAlign: 'center',
  },
  timelineContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  timelineIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  timelineContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timelineTitle: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.navy800,
    flex: 1,
  },
  timelineXp: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSuccess,
    marginLeft: 8,
  },
});
