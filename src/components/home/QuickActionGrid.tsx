/**
 * QuickActionGrid Component
 * 2x2 primary action grid for rapid navigation to Science Quizzes, Riddles,
 * Progress, and Certificates.
 * Uses the canonical QuickActionCard component to guarantee identical dimensions,
 * borders, padding, and alignments across all cards.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { QuickActionCard } from './QuickActionCard';

interface QuickActionGridProps {
  language?: SupportedLanguage;
  onQuizPress: () => void;
  onRiddlePress: () => void;
  onProgressPress: () => void;
  onCertificatesPress: () => void;
}

export const QuickActionGrid: React.FC<QuickActionGridProps> = ({
  language = 'en',
  onQuizPress,
  onRiddlePress,
  onProgressPress,
  onCertificatesPress,
}) => {
  const t = getTranslation(language).home;

  const row1Actions = [
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
  ];

  const row2Actions = [
    {
      id: 'progress',
      title: t.progressAction,
      icon: '📊',
      accentColor: theme.colors.success,
      bgGlow: theme.colors.green50,
      onPress: onProgressPress,
    },
    {
      id: 'certificates',
      title: t.certificates,
      icon: '🏅',
      accentColor: theme.colors.brandPrimary,
      bgGlow: theme.colors.purple50,
      onPress: onCertificatesPress,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.quickActions}</Text>

      {/* 2x2 Primary Action Grid: Explicit Row-based Normal Layout Flow */}
      <View style={styles.grid}>
        <View style={styles.row}>
          {row1Actions.map((action) => (
            <QuickActionCard
              key={action.id}
              id={action.id}
              title={action.title}
              icon={action.icon}
              accentColor={action.accentColor}
              bgGlow={action.bgGlow}
              onPress={action.onPress}
              accessibilityLabel={action.title}
            />
          ))}
        </View>

        <View style={styles.row}>
          {row2Actions.map((action) => (
            <QuickActionCard
              key={action.id}
              id={action.id}
              title={action.title}
              icon={action.icon}
              accentColor={action.accentColor}
              bgGlow={action.bgGlow}
              onPress={action.onPress}
              accessibilityLabel={action.title}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: theme.spacing.xs,
    // Dedicated bottom spacing so the Quick Action grid fully finishes before
    // the next section (EXPLORE SCIENCE) begins — prevents section collision.
    marginBottom: theme.spacing.base,
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
    flexDirection: 'column',
    gap: 8,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
});