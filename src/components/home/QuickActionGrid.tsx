/**
 * QuickActionGrid Component
 * 2x2 primary action grid + secondary action pills for rapid navigation
 * to Science Quizzes, Riddles, Spin Wheel, and Escape Rooms.
 * Clean White cards on Pearl White base with uniform, common-sized icon glyphs.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface QuickActionGridProps {
  language?: SupportedLanguage;
  onQuizPress: () => void;
  onRiddlePress: () => void;
  onSpinWheelPress: () => void;
  onEscapeRoomPress: () => void;
  onProgressPress: () => void;
  onCertificatesPress: () => void;
}

export const QuickActionGrid: React.FC<QuickActionGridProps> = ({
  language = 'en',
  onQuizPress,
  onRiddlePress,
  onSpinWheelPress,
  onEscapeRoomPress,
  onProgressPress,
  onCertificatesPress,
}) => {
  const t = getTranslation(language).home;

  const primaryActions = [
    {
      id: 'quizzes',
      title: t.quizzes,
      icon: '🧠',
      accentColor: theme.colors.actionPrimary,
      bgGlow: theme.colors.blue50,
      onPress: onQuizPress,
    },
    {
      id: 'riddles',
      title: t.riddles,
      icon: '🧩',
      accentColor: theme.colors.brandPrimary,
      bgGlow: theme.colors.purple50,
      onPress: onRiddlePress,
    },
    {
      id: 'spinWheel',
      title: t.spinWheel,
      icon: '🎡',
      accentColor: theme.colors.success,
      bgGlow: theme.colors.green50,
      onPress: onSpinWheelPress,
    },
    {
      id: 'escapeRoom',
      title: t.escapeRoom,
      icon: '🗝️',
      accentColor: theme.colors.brandPrimary,
      bgGlow: theme.colors.purple50,
      onPress: onEscapeRoomPress,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.quickActions}</Text>

      {/* 2x2 Primary Action Grid */}
      <View style={styles.grid}>
        {primaryActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.gridCard}
            onPress={action.onPress}
            activeOpacity={0.75}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={action.title}
          >
            {/* Standardized Circular Icon Housing */}
            <View style={[styles.iconCircle, { backgroundColor: action.bgGlow }]}>
              <Text style={styles.actionIcon}>{action.icon}</Text>
            </View>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Secondary Quick Action Row */}
      <View style={styles.secondaryRow}>
        <TouchableOpacity
          style={styles.secondaryPill}
          onPress={onProgressPress}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t.progressAction}
        >
          <Text style={styles.secondaryIcon}>📊</Text>
          <Text style={styles.secondaryText}>{t.progressAction}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryPill}
          onPress={onCertificatesPress}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t.certificates}
        >
          <Text style={styles.secondaryIcon}>🏅</Text>
          <Text style={styles.secondaryText}>{t.certificates}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: theme.spacing.xs,
  },
  sectionTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  gridCard: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    overflow: 'hidden',
  },
  actionIcon: {
    fontSize: 20,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: Platform.OS === 'ios' ? 24 : 22,
    includeFontPadding: false,
  },
  cardTitle: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '700',
    color: theme.colors.navy900,
    flex: 1,
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  secondaryPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 9,
    paddingHorizontal: 14,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  secondaryIcon: {
    fontSize: 16,
    width: 20,
    height: 20,
    textAlign: 'center',
    lineHeight: Platform.OS === 'ios' ? 20 : 18,
    marginRight: 6,
    includeFontPadding: false,
  },
  secondaryText: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
});
