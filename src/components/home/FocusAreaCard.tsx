/**
 * FocusAreaCard — Compact focus area card for Home 2.0.
 * Shows a topic needing practice with positive, encouraging language.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { HomeFocusArea } from '../../features/home/home2.types';

interface FocusAreaCardProps {
  focusArea: HomeFocusArea;
  language: SupportedLanguage;
  onPractice: () => void;
}

export const FocusAreaCard: React.FC<FocusAreaCardProps> = ({
  focusArea,
  language,
  onPractice,
}) => {
  const isTamil = language === 'ta';

  return (
    <View style={styles.container} accessible accessibilityRole="summary">
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeIcon}>🎯</Text>
          <Text style={styles.badgeText}>
            {isTamil ? 'கவனம் செலுத்த வேண்டிய பகுதி' : 'FOCUS AREA'}
          </Text>
        </View>
      </View>

      <Text style={styles.topic} numberOfLines={1}>
        {isTamil ? focusArea.topicTa : focusArea.topic}
      </Text>

      <Text style={styles.accuracy}>
        {isTamil ? 'பயிற்சி நம்பிக்கை' : 'Practice confidence'}: {focusArea.accuracy}%
      </Text>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${focusArea.accuracy}%` }]} />
      </View>

      <TouchableOpacity
        style={styles.practiceButton}
        onPress={onPractice}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={`${isTamil ? focusArea.action.labelTa : focusArea.action.label}: ${focusArea.topic}`}
      >
        <Text style={styles.practiceText}>
          {isTamil ? focusArea.action.labelTa : focusArea.action.label} →
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.sm,
  },
  header: {
    marginBottom: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.warningBackground,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    gap: 4,
  },
  badgeIcon: {
    fontSize: 11,
  },
  badgeText: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.warning,
    fontWeight: '700',
  },
  topic: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 2,
  },
  accuracy: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    marginBottom: 6,
  },
  track: {
    height: 5,
    backgroundColor: theme.colors.gray200,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  fill: {
    height: '100%',
    backgroundColor: theme.colors.warning,
    borderRadius: 3,
  },
  practiceButton: {
    alignSelf: 'flex-start',
  },
  practiceText: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
  },
});
