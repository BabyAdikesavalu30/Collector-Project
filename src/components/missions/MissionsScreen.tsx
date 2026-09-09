/**
 * MissionsScreen — daily & weekly science missions (/daily-missions).
 * Segmented Daily/Weekly view. Progress is derived from the unified activity
 * history; completed missions can be claimed once per period.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { MissionWithProgress, MissionKind, MissionStatus } from '../../features/missions';
import { ScreenHeader, ProgressBar, LoadingState } from '../shared';

interface MissionsScreenProps {
  language: SupportedLanguage;
  daily: MissionWithProgress[];
  weekly: MissionWithProgress[];
  isLoading: boolean;
  isClaiming: boolean;
  onBack: () => void;
  onClaim: (mission: MissionWithProgress) => Promise<boolean>;
}

const STATUS_COLORS: Record<MissionStatus, string> = {
  claimed: theme.colors.success,
  completed: theme.colors.actionPrimary,
  in_progress: theme.colors.info,
  not_started: theme.colors.slate400,
};

export const MissionsScreen: React.FC<MissionsScreenProps> = ({
  language,
  daily,
  weekly,
  isLoading,
  isClaiming,
  onBack,
  onClaim,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).progress.missions;
  const isTamil = language === 'ta';
  const [activeTab, setActiveTab] = useState<MissionKind>('daily');

  const missions = activeTab === 'daily' ? daily : weekly;
  const claimedCount = missions.filter((m) => m.status === 'claimed').length;

  const handleClaim = async (mission: MissionWithProgress) => {
    const ok = await onClaim(mission);
    if (ok) {
      Alert.alert(
        t.missionCompleted,
        t.claimSuccess.replace('{xp}', String(mission.mission.reward.xp))
      );
    } else {
      Alert.alert(t.alreadyClaimed, t.notCompletedYet);
    }
  };

  const getStatusLabel = (status: MissionStatus): string => {
    switch (status) {
      case 'claimed':
        return t.claimed;
      case 'completed':
        return t.completed;
      case 'in_progress':
        return t.inProgress;
      default:
        return t.notStarted;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <ScreenHeader title={t.title} language={language} onBack={onBack} />
        <LoadingState rows={4} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ScreenHeader title={t.title} language={language} onBack={onBack} />

      {/* Segments */}
      <View style={styles.segmentRow}>
        {(['daily', 'weekly'] as const).map((kind) => {
          const isActive = activeTab === kind;
          const count = (kind === 'daily' ? daily : weekly).filter((m) => m.status === 'claimed').length;
          const total = (kind === 'daily' ? daily : weekly).length;
          return (
            <TouchableOpacity
              key={kind}
              style={[styles.segment, isActive && styles.segmentActive]}
              onPress={() => setActiveTab(kind)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>
                {kind === 'daily' ? t.dailyTab : t.weeklyTab}
              </Text>
              <View style={[styles.segmentCount, isActive && styles.segmentCountActive]}>
                <Text style={[styles.segmentCountText, isActive && styles.segmentCountTextActive]}>
                  {count}/{total}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom + 24, 32) }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>
          {activeTab === 'daily' ? t.dailyTitle.toUpperCase() : t.weeklyTitle.toUpperCase()}
        </Text>
        <Text style={styles.sectionSubtitle}>
          {claimedCount} / {missions.length} {t.claimed.toLowerCase()}
        </Text>

        {missions.map((entry) => {
          const { mission, progress, status } = entry;
          const percent = progress.target > 0 ? (progress.current / progress.target) * 100 : 0;
          const statusColor = STATUS_COLORS[status];

          return (
            <View key={mission.id} style={styles.missionCard} accessible>
              <View style={styles.missionTop}>
                <View style={[styles.missionIconCircle, { backgroundColor: `${statusColor}14` }]}>
                  <Text style={styles.missionIcon}>{mission.icon}</Text>
                </View>
                <View style={styles.missionInfo}>
                  <Text style={styles.missionTitle}>{isTamil ? mission.titleTa : mission.title}</Text>
                  <Text style={styles.missionDesc} numberOfLines={2}>
                    {isTamil ? mission.descriptionTa : mission.description}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${statusColor}14` }]}>
                  <Text style={[styles.statusText, { color: statusColor }]}>{getStatusLabel(status)}</Text>
                </View>
              </View>

              <View style={styles.progressRow}>
                <ProgressBar
                  progress={percent}
                  label={t.progressLabel.replace('{current}', String(progress.current)).replace('{target}', String(progress.target))}
                  color={statusColor}
                />
                <Text style={styles.progressText}>
                  {t.progressLabel.replace('{current}', String(progress.current)).replace('{target}', String(progress.target))}
                </Text>
              </View>

              <View style={styles.missionBottom}>
                <View style={styles.rewardBox}>
                  <Text style={styles.rewardLabel}>{t.rewardLabel}</Text>
                  <Text style={styles.rewardValue}>
                    +{mission.reward.xp} XP · +{mission.reward.points} {t.points}
                  </Text>
                  {mission.reward.badgeLabel && (
                    <Text style={styles.rewardBadge}>🏅 {isTamil ? mission.reward.badgeLabelTa : mission.reward.badgeLabel}</Text>
                  )}
                </View>

                {status === 'claimed' ? (
                  <View style={styles.claimedButton}>
                    <Text style={styles.claimedButtonText}>✓ {t.claimed}</Text>
                  </View>
                ) : status === 'completed' ? (
                  <TouchableOpacity
                    style={styles.claimButton}
                    onPress={() => handleClaim(entry)}
                    disabled={isClaiming}
                    accessibilityRole="button"
                    accessibilityLabel={t.claim}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.claimButtonText}>{isClaiming ? '...' : t.claim}</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.lockedHint}>
                    <Text style={styles.lockedHintText}>{t.notCompletedYet}</Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  segmentRow: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.base,
    marginTop: theme.spacing.base,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: theme.borderRadius.sm,
    gap: 8,
  },
  segmentActive: {
    backgroundColor: theme.colors.white,
  },
  segmentText: {
    ...theme.typography.body,
    fontSize: 13.5,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  segmentTextActive: {
    color: theme.colors.navy900,
  },
  segmentCount: {
    minWidth: 26,
    height: 18,
    borderRadius: 9,
    backgroundColor: theme.colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  segmentCountActive: {
    backgroundColor: theme.colors.actionPrimary,
  },
  segmentCountText: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.slate600,
  },
  segmentCountTextActive: {
    color: theme.colors.textOnAction,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.base,
  },
  sectionTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginTop: theme.spacing.sm,
  },
  sectionSubtitle: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate500,
    marginBottom: theme.spacing.sm,
  },
  missionCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.sm,
  },
  missionTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  missionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  missionIcon: {
    fontSize: 20,
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  missionDesc: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate500,
    marginTop: 2,
    lineHeight: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginLeft: theme.spacing.sm,
  },
  statusText: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '800',
  },
  progressRow: {
    marginTop: theme.spacing.md,
  },
  progressText: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 4,
  },
  missionBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: theme.spacing.md,
  },
  rewardBox: {
    flex: 1,
  },
  rewardLabel: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.slate500,
    letterSpacing: 1,
  },
  rewardValue: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '800',
    color: theme.colors.success,
    marginTop: 2,
  },
  rewardBadge: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
    marginTop: 2,
  },
  claimButton: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
  },
  claimButtonText: {
    ...theme.typography.button,
    fontSize: 12.5,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
  claimedButton: {
    backgroundColor: theme.colors.successSurface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
  },
  claimedButtonText: {
    ...theme.typography.button,
    fontSize: 12.5,
    fontWeight: '800',
    color: theme.colors.success,
  },
  lockedHint: {
    paddingHorizontal: 8,
  },
  lockedHintText: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.slate400,
    maxWidth: 130,
  },
});