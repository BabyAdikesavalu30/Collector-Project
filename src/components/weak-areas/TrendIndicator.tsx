/**
 * TrendIndicator — small deterministic trend chip with accessible labels.
 * Color is never the only signal: the localized trend word is always shown.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { PerformanceTrend } from '../../features/weak-areas';
import { getWeakAreasI18n, interpolate } from './weakAreas.i18n';
import { SupportedLanguage } from '../../config/i18n';

interface TrendIndicatorProps {
  trend: PerformanceTrend;
  language: SupportedLanguage;
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({ trend, language }) => {
  const t = getWeakAreasI18n(language);

  const map: Record<
    PerformanceTrend,
    { label: string; icon: string; bg: string; border: string; color: string }
  > = {
    improving: { label: t.trendImproving, icon: '↗', bg: theme.colors.green50, border: theme.colors.green200, color: theme.colors.green700 },
    stable: { label: t.trendStable, icon: '→', bg: theme.colors.blue50, border: theme.colors.blue200, color: theme.colors.blue700 },
    declining: { label: t.trendDeclining, icon: '↘', bg: theme.colors.purple50, border: theme.colors.purple200, color: theme.colors.brandPrimary },
    insufficientData: { label: t.trendInsufficient, icon: '·', bg: theme.colors.gray100, border: theme.colors.gray200, color: theme.colors.slate600 },
  };
  const style = map[trend];

  return (
    <View
      style={[styles.chip, { backgroundColor: style.bg, borderColor: style.border }]}
      accessible
      accessibilityRole="text"
      accessibilityLabel={interpolate(t.accessibility.trendIndicator, { trend: style.label })}
    >
      <Text style={[styles.icon, { color: style.color }]}>{style.icon}</Text>
      <Text style={[styles.label, { color: style.color }]}>{style.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    minHeight: 24,
  },
  icon: {
    fontSize: 12,
    fontWeight: '800',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
});
