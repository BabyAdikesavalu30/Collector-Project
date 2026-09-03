/**
 * AchievementPreview Component
 * Displays the student's most recently earned milestone badge.
 * Clean White card on Pearl White base.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { AchievementItem } from '../../features/home/home.types';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface AchievementPreviewProps {
  achievement: AchievementItem;
  language?: SupportedLanguage;
  onPress: () => void;
}

export const AchievementPreview: React.FC<AchievementPreviewProps> = ({
  achievement,
  language = 'en',
  onPress,
}) => {
  const t = getTranslation(language).home;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${t.recentAchievement}: ${achievement.title}`}
    >
      <View style={styles.iconCircle}>
        <Text style={styles.badgeIcon}>{achievement.icon}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.sectionHeader}>{t.recentAchievement}</Text>
        <Text style={styles.badgeTitle}>
          {language === 'ta' && achievement.titleTa ? achievement.titleTa : achievement.title}
        </Text>
        <Text style={styles.badgeMeta}>{t.unlockedRecently}</Text>
      </View>

      <Text style={styles.chevron}>→</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.sm,
    marginVertical: theme.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  badgeIcon: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  sectionHeader: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.brandPrimary,
    letterSpacing: 0.9,
    marginBottom: 2,
    fontWeight: '700',
  },
  badgeTitle: {
    ...theme.typography.caption,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  badgeMeta: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.success,
    fontWeight: '700',
    marginTop: 1,
  },
  chevron: {
    fontSize: 16,
    color: theme.colors.slate500,
    marginLeft: 8,
    fontWeight: '700',
  },
});
