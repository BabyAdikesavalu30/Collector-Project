/**
 * PointsHistoryScreen — XP ledger (/points-history).
 * Balance summary, period totals, source + date filters, and a FlatList of
 * transactions grouped by day.
 */

import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { XPTransaction, XPSource, RewardSummary, XP_SOURCE_ICONS } from '../../features/xp';
import { getXpDateKey } from '../../features/xp';
import { ScreenHeader, EmptyState, LoadingState, FilterChips } from '../shared';

const SOURCE_LABELS: Record<XPSource, { en: string; ta: string }> = {
  quiz_completion: { en: 'Quiz', ta: 'வினாடி வினா' },
  riddle_completion: { en: 'Riddle', ta: 'புதிர்' },
  game_completion: { en: 'Game', ta: 'விளையாட்டு' },
  mystery_completion: { en: 'Mystery', ta: 'மர்மம்' },
  fact_discovery: { en: 'Fact', ta: 'தகவல்' },
  challenge_completion: { en: 'Challenge', ta: 'சவால்' },
  daily_mission: { en: 'Daily Mission', ta: 'தினசரி பணி' },
  weekly_mission: { en: 'Weekly Mission', ta: 'வார பணி' },
  achievement: { en: 'Achievement', ta: 'சாதனை' },
  certificate: { en: 'Certificate', ta: 'சான்றிதழ்' },
  profile_setup_bonus: { en: 'Starter Bonus', ta: 'தொடக்க போனஸ்' },
  micro_lesson_completion: { en: 'Micro Lesson', ta: 'மைக்ரோ பாடம்' },
  concept_map_completion: { en: 'Concept Map', ta: 'கருத்து வரைபடம்' },
  experiment_completion: { en: 'Experiment Lab', ta: 'பரிசோதனை கூடம்' },
  spin_wheel: { en: 'Spin Wheel', ta: 'சுழல் சக்கரம்' },
};

type PeriodFilter = 'all' | 'today' | 'week' | 'month';

interface PointsHistoryScreenProps {
  language: SupportedLanguage;
  summary: RewardSummary;
  isLoading: boolean;
  onBack: () => void;
}

export const PointsHistoryScreen: React.FC<PointsHistoryScreenProps> = ({
  language,
  summary,
  isLoading,
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).progress.points;
  const isTamil = language === 'ta';

  const [sourceFilter, setSourceFilter] = useState<XPSource | 'all'>('all');
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all');

  const filtered = useMemo(() => {
    const todayKey = getXpDateKey(Date.now());
    const weekStart = (() => {
      const now = new Date();
      const day = (now.getDay() + 6) % 7;
      const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
      return monday.getTime();
    })();
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();

    return summary.transactions.filter((tx) => {
      if (sourceFilter !== 'all' && tx.source !== sourceFilter) return false;
      if (periodFilter === 'today' && tx.timestamp < new Date(todayKey).getTime()) return false;
      if (periodFilter === 'week' && tx.timestamp < weekStart) return false;
      if (periodFilter === 'month' && tx.timestamp < monthStart) return false;
      return true;
    });
  }, [summary.transactions, sourceFilter, periodFilter]);

  const groups = useMemo(() => {
    const map = new Map<string, XPTransaction[]>();
    for (const tx of filtered) {
      const key = getXpDateKey(tx.timestamp);
      const list = map.get(key) || [];
      list.push(tx);
      map.set(key, list);
    }
    return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [filtered]);

  const sourceOptions = [
    { key: 'all', label: t.allSources },
    ...Object.entries(SOURCE_LABELS).map(([key, labels]) => ({
      key,
      label: isTamil ? labels.ta : labels.en,
    })),
  ];

  const periodOptions: Array<{ key: PeriodFilter; label: string }> = [
    { key: 'all', label: isTamil ? 'அனைத்தும்' : 'All' },
    { key: 'today', label: t.today },
    { key: 'week', label: t.thisWeek },
    { key: 'month', label: t.thisMonth },
  ];

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <ScreenHeader title={t.title} language={language} onBack={onBack} />
        <LoadingState rows={4} />
      </View>
    );
  }

  const listData: Array<
    | { kind: 'header'; key: string; dateKey: string; total: number }
    | { kind: 'transaction'; key: string; tx: XPTransaction }
  > = [];
  for (const [dateKey, transactions] of groups) {
    listData.push({
      kind: 'header',
      key: `h-${dateKey}`,
      dateKey,
      total: transactions.reduce((s, tx) => s + tx.amount, 0),
    });
    for (const tx of transactions) {
      listData.push({ kind: 'transaction', key: tx.id, tx });
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ScreenHeader title={t.title} language={language} onBack={onBack} />

      {/* Summary header */}
      <View style={styles.summaryCard}>
        <View style={styles.balanceRow}>
          <View style={styles.balanceBlock}>
            <Text style={styles.balanceValue}>{summary.totalXp.toLocaleString()}</Text>
            <Text style={styles.balanceLabel}>{t.currentBalance}</Text>
          </View>
          <View style={styles.balanceBlock}>
            <Text style={styles.balanceValueGreen}>{summary.totalEarned.toLocaleString()}</Text>
            <Text style={styles.balanceLabel}>{t.totalEarned}</Text>
          </View>
        </View>
        <View style={styles.periodRow}>
          {[
            { label: t.today, value: summary.todayXp },
            { label: t.thisWeek, value: summary.weekXp },
            { label: t.thisMonth, value: summary.monthXp },
          ].map((period) => (
            <View key={period.label} style={styles.periodItem}>
              <Text style={styles.periodValue}>+{period.value}</Text>
              <Text style={styles.periodLabel}>{period.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Filters */}
      <Text style={styles.filterTitle}>{t.filter}</Text>
      <FilterChips options={periodOptions} selected={periodFilter} onSelect={(key) => setPeriodFilter(key as PeriodFilter)} />
      <FilterChips options={sourceOptions} selected={sourceFilter} onSelect={(key) => setSourceFilter(key as XPSource | 'all')} />

      {listData.length === 0 ? (
        <EmptyState icon="📈" title={t.emptyTitle} subtitle={t.emptySubtitle} />
      ) : (
        <FlatList
          data={listData}
          keyExtractor={(item) => item.key}
          contentContainerStyle={[styles.listContent, { paddingBottom: Math.max(insets.bottom + 24, 32) }]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            if (item.kind === 'header') {
              return (
                <View style={styles.dateHeader}>
                  <Text style={styles.dateLabel}>{item.dateKey}</Text>
                  <Text style={styles.dateTotal}>+{item.total} XP</Text>
                </View>
              );
            }
            const tx = item.tx;
            const time = new Date(tx.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });
            return (
              <View style={styles.txRow}>
                <Text style={styles.txIcon}>{tx.icon || XP_SOURCE_ICONS[tx.source]}</Text>
                <View style={styles.txContent}>
                  <Text style={styles.txTitle} numberOfLines={1}>
                    {isTamil ? tx.descriptionTa : tx.description}
                  </Text>
                  <Text style={styles.txMeta}>
                    {isTamil ? SOURCE_LABELS[tx.source].ta : SOURCE_LABELS[tx.source].en} · {time}
                  </Text>
                </View>
                <Text style={styles.txAmount}>+{tx.amount} XP</Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  summaryCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: theme.spacing.base,
    marginTop: theme.spacing.base,
    padding: theme.spacing.base,
  },
  balanceRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  balanceBlock: {
    flex: 1,
    alignItems: 'center',
  },
  balanceValue: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.brandPrimary,
  },
  balanceValueGreen: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.success,
  },
  balanceLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  periodRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
  },
  periodItem: {
    flex: 1,
    alignItems: 'center',
  },
  periodValue: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.success,
  },
  periodLabel: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  filterTitle: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
  },
  listContent: {
    paddingHorizontal: theme.spacing.base,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  dateLabel: {
    ...theme.typography.overline,
    fontSize: 11,
    color: theme.colors.slate500,
    letterSpacing: 1,
  },
  dateTotal: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '800',
    color: theme.colors.success,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  txIcon: {
    fontSize: 20,
    marginRight: theme.spacing.md,
  },
  txContent: {
    flex: 1,
  },
  txTitle: {
    ...theme.typography.body,
    fontSize: 13.5,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  txMeta: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  txAmount: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '900',
    color: theme.colors.success,
  },
});