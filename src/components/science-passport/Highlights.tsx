/**
 * Highlights — Deterministic highlights section based on actual student data.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { PassportHighlight } from '../../features/science-passport';

interface HighlightsProps {
  highlights: PassportHighlight[];
  language: SupportedLanguage;
  onNavigate?: (route: string) => void;
}

export const Highlights: React.FC<HighlightsProps> = ({
  highlights,
  language,
  onNavigate,
}) => {
  const isTamil = language === 'ta';

  if (highlights.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {isTamil ? 'என் சிறப்பம்சங்கள்' : 'MY HIGHLIGHTS'}
      </Text>

      <View style={styles.grid}>
        {highlights.map((highlight) => {
          const text = isTamil ? highlight.text.ta : highlight.text.en;

          const content = (
            <View style={styles.highlightItem}>
              <Text style={styles.highlightIcon}>{highlight.icon}</Text>
              <Text style={styles.highlightText} numberOfLines={2}>
                {text}
              </Text>
            </View>
          );

          if (highlight.relatedRoute && onNavigate) {
            return (
              <TouchableOpacity
                key={highlight.id}
                onPress={() => onNavigate(highlight.relatedRoute!)}
                activeOpacity={0.7}
                style={styles.highlightTouchable}
              >
                {content}
              </TouchableOpacity>
            );
          }

          return (
            <View key={highlight.id} style={styles.highlightTouchable}>
              {content}
            </View>
          );
        })}
      </View>
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
    marginBottom: theme.spacing.md,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  highlightTouchable: {
    width: '48%',
    minWidth: 140,
  },
  highlightItem: {
    backgroundColor: theme.colors.purple50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  highlightIcon: {
    fontSize: 20,
  },
  highlightText: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.purple800,
    flex: 1,
  },
});
