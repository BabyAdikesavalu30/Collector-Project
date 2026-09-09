/**
 * LeaderboardScreen — competition presentation layer (/leaderboard).
 * My-rank card, scope + period segments, top-3 podium, and the ranked list
 * with the current student highlighted. Demo rankings are clearly labeled.
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { LeaderboardData, LeaderboardEntry, LeaderboardPeriod, LeaderboardScope } from '../../features/leaderboard';
import { ScreenHeader, LoadingState } from '../shared';

interface LeaderboardScreenProps {
  language: SupportedLanguage;
  data: LeaderboardData | null;
  isLoading: boolean;
  onBack: () => void;
  onScopeChange: (scope: LeaderboardScope) => void;
  onPeriodChange: (period: LeaderboardPeriod) => void;
}

const PODIUM_COLORS = ['#D97706', '#64748B', '#B45309'];

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  language,
  data,
  isLoading,
  onBack,
  onScopeChange,
  onPeriodChange,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).progress.leaderboard;
  const isTamil = language === 'ta';

  const scopes: Array<{ key: LeaderboardScope; label: string }> = [
    { key: 'class', label: t.class },
    { key: 'school', label: t.school },
    { key: 'state', label: t.state },
    { key: 'overall', label: t.overall },
  ];

  const periods: Array<{ key: LeaderboardPeriod; label: string }> = [
    { key: 'weekly', label: t.weekly },
    { key: 'monthly', label: t.monthly },
    { key: 'all_time', label: t.allTime },
  ];

  if (isLoading || !data) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <ScreenHeader title={t.title} language={language} onBack={onBack} />
        <LoadingState rows={4} />
      </View>
    );
  }

  const movementLabel = (entry: LeaderboardEntry): string => {
    if (entry.movement > 0) return t.movementUp.replace('{positions}', String(entry.movement));
    if (entry.movement < 0) return t.movementDown.replace('{positions}', String(Math.abs(entry.movement)));
    return t.movementSame;
  };

  const podium = data.entries.slice(0, 3);
  const rest = data.entries.slice(3);
  const currentUserEntry = data.entries.find((e) => e.isCurrentUser);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ScreenHeader title={t.title} language={language} onBack={onBack} />

      {/* Segments */}
      <View style={styles.segmentRow}>
        {scopes.map((scope) => {
          const isActive = data.scope === scope.key;
          return (
            <TouchableOpacity
              key={scope.key}
              style={[styles.segment, isActive && styles.segmentActive]}
              onPress={() => onScopeChange(scope.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.segmentText, isActive && styles.segmentTextActive]} numberOfLines={1}>
                {scope.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.segmentRow}>
        {periods.map((period) => {
          const isActive = data.period === period.key;
          return (
            <TouchableOpacity
              key={period.key}
              style={[styles.segment, isActive && styles.segmentActive]}
              onPress={() => onPeriodChange(period.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.segmentText, isActive && styles.segmentTextActive]} numberOfLines={1}>
                {period.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* My rank card */}
      <View style={styles.myRankCard} accessible accessibilityLabel={`${t.myRank} ${data.currentUser.rank}`}>
        <View style={styles.rankCircle}>
          <Text style={styles.rankCircleText}>#{data.currentUser.rank}</Text>
        </View>
        <View style={styles.rankInfo}>
          <Text style={styles.rankLabel}>{t.myRank.toUpperCase()}</Text>
          <Text style={styles.rankXp}>
            {t.xpThisWeek.replace('{xp}', String(data.currentUser.periodXp))}
          </Text>
          <Text style={styles.rankMovement}>
            {data.currentUser.movement > 0
              ? `↑ ${data.currentUser.movement}`
              : data.currentUser.movement < 0
              ? `↓ ${Math.abs(data.currentUser.movement)}`
              : '—'}
          </Text>
        </View>
        <Text style={styles.demoTag}>{t.demoNotice.split('.')[0]}</Text>
      </View>

      <FlatList
        data={[
          ...podium.map((entry) => ({ entry, kind: 'podium' as const })),
          ...rest.map((entry) => ({ entry, kind: 'row' as const })),
        ]}
        keyExtractor={(item) => item.entry.studentId}
        contentContainerStyle={[styles.listContent, { paddingBottom: Math.max(insets.bottom + 24, 32) }]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Podium */}
            <Text style={styles.sectionLabel}>{t.podium.toUpperCase()}</Text>
            <View style={styles.podiumRow}>
              {podium.length > 0 && (
                <View style={[styles.podiumCard, styles.podiumSecond]}>
                  <Text style={styles.podiumRank}>#2</Text>
                  <View style={[styles.podiumAvatar, { backgroundColor: PODIUM_COLORS[1] }]}>
                    <Text style={styles.podiumAvatarText}>{podium[1]?.avatarInitials || '—'}</Text>
                  </View>
                  <Text style={styles.podiumName} numberOfLines={1}>
                    {podium[1]?.displayName}
                  </Text>
                  <Text style={styles.podiumXp}>{podium[1]?.totalXp.toLocaleString()} XP</Text>
                </View>
              )}
              {podium.length > 0 && (
                <View style={[styles.podiumCard, styles.podiumFirst]}>
                  <Text style={styles.podiumRank}>#1</Text>
                  <View style={[styles.podiumAvatar, styles.podiumAvatarFirst, { backgroundColor: PODIUM_COLORS[0] }]}>
                    <Text style={styles.podiumAvatarText}>{podium[0]?.avatarInitials || '—'}</Text>
                  </View>
                  <Text style={styles.podiumName} numberOfLines={1}>
                    {podium[0]?.displayName}
                  </Text>
                  <Text style={styles.podiumXp}>{podium[0]?.totalXp.toLocaleString()} XP</Text>
                </View>
              )}
              {podium.length > 2 && (
                <View style={[styles.podiumCard, styles.podiumThird]}>
                  <Text style={styles.podiumRank}>#3</Text>
                  <View style={[styles.podiumAvatar, { backgroundColor: PODIUM_COLORS[2] }]}>
                    <Text style={styles.podiumAvatarText}>{podium[2]?.avatarInitials || '—'}</Text>
                  </View>
                  <Text style={styles.podiumName} numberOfLines={1}>
                    {podium[2]?.displayName}
                  </Text>
                  <Text style={styles.podiumXp}>{podium[2]?.totalXp.toLocaleString()} XP</Text>
                </View>
              )}
            </View>
            {podium.length > 0 && <Text style={styles.sectionLabel}>…</Text>}
          </>
        }
        renderItem={({ item }) => {
          const { entry } = item;
          if (item.kind === 'podium') return null;
          const isCurrent = entry.isCurrentUser;
          return (
            <View style={[styles.entryRow, isCurrent && styles.entryRowCurrent]} accessible>
              <Text style={[styles.entryRank, entry.rank <= 3 && styles.entryRankTop]}>{entry.rank}</Text>
              <View style={[styles.entryAvatar, isCurrent && styles.entryAvatarCurrent]}>
                <Text style={[styles.entryAvatarText, isCurrent && styles.entryAvatarTextCurrent]}>
                  {entry.avatarInitials}
                </Text>
              </View>
              <View style={styles.entryInfo}>
                <Text style={styles.entryName} numberOfLines={1}>
                  {entry.displayName} {isCurrent && `(${t.you})`}
                </Text>
                <Text style={styles.entryMeta}>
                  {t.level.replace('{level}', String(entry.level))} · {entry.totalXp.toLocaleString()} XP
                </Text>
              </View>
              <View style={styles.entryRight}>
                <Text style={styles.entryPeriodXp}>+{entry.periodXp}</Text>
                <Text style={styles.entryMovement}>{movementLabel(entry)}</Text>
              </View>
            </View>
          );
        }}
        ListFooterComponent={
          <Text style={styles.demoNotice} accessible accessibilityRole="summary">
            ℹ️ {t.demoNotice}
          </Text>
        }
      />
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
    marginTop: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  segmentActive: {
    backgroundColor: theme.colors.actionPrimary,
    borderColor: theme.colors.actionPrimary,
  },
  segmentText: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  segmentTextActive: {
    color: theme.colors.textOnAction,
  },
  myRankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: theme.spacing.base,
    marginTop: theme.spacing.md,
    padding: theme.spacing.base,
  },
  rankCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.brandPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  rankCircleText: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.textOnBrand,
  },
  rankInfo: {
    flex: 1,
  },
  rankLabel: {
    ...theme.typography.overline,
    fontSize: 10,
    color: theme.colors.brandPrimary,
    letterSpacing: 1,
    fontWeight: '800',
  },
  rankXp: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginTop: 2,
  },
  rankMovement: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.success,
    marginTop: 1,
  },
  demoTag: {
    ...theme.typography.caption,
    fontSize: 10,
    color: theme.colors.slate400,
  },
  listContent: {
    paddingHorizontal: theme.spacing.base,
  },
  sectionLabel: {
    ...theme.typography.overline,
    fontSize: 11,
    color: theme.colors.slate500,
    letterSpacing: 1,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  podiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  podiumCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  podiumFirst: {
    borderColor: theme.colors.warningBorder,
    backgroundColor: theme.colors.warningSurface,
  },
  podiumSecond: {
    opacity: 0.92,
  },
  podiumThird: {
    opacity: 0.92,
  },
  podiumRank: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '900',
    color: theme.colors.navy900,
  },
  podiumAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.xs,
  },
  podiumAvatarFirst: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  podiumAvatarText: {
    color: theme.colors.textOnBrand,
    fontSize: 15,
    fontWeight: '900',
  },
  podiumName: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '800',
    color: theme.colors.navy900,
    maxWidth: 90,
  },
  podiumXp: {
    ...theme.typography.caption,
    fontSize: 10,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  entryRowCurrent: {
    borderColor: theme.colors.brandPrimary,
    borderWidth: 1.5,
    backgroundColor: theme.colors.purple50,
  },
  entryRank: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '900',
    color: theme.colors.slate500,
    width: 32,
    textAlign: 'center',
  },
  entryRankTop: {
    color: theme.colors.warning,
  },
  entryAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.blue100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  entryAvatarCurrent: {
    backgroundColor: theme.colors.brandPrimary,
  },
  entryAvatarText: {
    fontSize: 13,
    fontWeight: '900',
    color: theme.colors.navy900,
  },
  entryAvatarTextCurrent: {
    color: theme.colors.textOnBrand,
  },
  entryInfo: {
    flex: 1,
  },
  entryName: {
    ...theme.typography.body,
    fontSize: 13.5,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  entryMeta: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  entryRight: {
    alignItems: 'flex-end',
  },
  entryPeriodXp: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '900',
    color: theme.colors.success,
  },
  entryMovement: {
    ...theme.typography.caption,
    fontSize: 10,
    color: theme.colors.slate400,
    marginTop: 1,
  },
  demoNotice: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate400,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
  },
});