/**
 * RiddlePerformanceMessage Component
 * Celebration badge and adaptive performance headline based on solved ratio.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { RiddlePerformanceTier } from '../../features/riddles';

interface RiddlePerformanceMessageProps {
  tier: RiddlePerformanceTier;
  solvedRiddles: number;
  totalRiddles: number;
  skippedRiddles: number;
  t: {
    tierExcellentTitle: string;
    tierExcellentDesc: string;
    tierGreatTitle: string;
    tierGreatDesc: string;
    tierGoodTitle: string;
    tierGoodDesc: string;
    tierPracticeTitle: string;
    tierPracticeDesc: string;
    solvedRatio: string;
    skippedCount: string;
  };
}

export const RiddlePerformanceMessage: React.FC<RiddlePerformanceMessageProps> = ({
  tier,
  solvedRiddles,
  totalRiddles,
  skippedRiddles,
  t,
}) => {
  let headline = t.tierGreatTitle;
  let description = t.tierGreatDesc;
  let badgeIcon = '🎉';

  switch (tier) {
    case 'excellent':
      headline = t.tierExcellentTitle;
      description = t.tierExcellentDesc;
      badgeIcon = '🏆';
      break;
    case 'great':
      headline = t.tierGreatTitle;
      description = t.tierGreatDesc;
      badgeIcon = '🎉';
      break;
    case 'good':
      headline = t.tierGoodTitle;
      description = t.tierGoodDesc;
      badgeIcon = '👏';
      break;
    case 'practice':
      headline = t.tierPracticeTitle;
      description = t.tierPracticeDesc;
      badgeIcon = '💡';
      break;
  }

  const solvedText = t.solvedRatio
    .replace('{solved}', String(solvedRiddles))
    .replace('{total}', String(totalRiddles));

  return (
    <View style={styles.container}>
      {/* Celebration Icon Badge */}
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>{badgeIcon}</Text>
      </View>

      {/* Adaptive Headline */}
      <Text style={styles.headline}>{headline}</Text>

      {/* Solved Count Subtitle */}
      <Text style={styles.solvedText}>{solvedText}</Text>

      {/* Encouraging Description */}
      <Text style={styles.description}>{description}</Text>

      {/* Skipped indicator if any */}
      {skippedRiddles > 0 && (
        <Text style={styles.skippedText}>
          {t.skippedCount.replace('{count}', String(skippedRiddles))}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.purple50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  icon: {
    fontSize: 28,
  },
  headline: {
    ...theme.typography.h1,
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 4,
    textAlign: 'center',
  },
  solvedText: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 19,
  },
  skippedText: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate500,
    marginTop: 4,
  },
});
