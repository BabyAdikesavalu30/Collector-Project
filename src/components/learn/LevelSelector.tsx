/**
 * LevelSelector Component
 * 3-tier class level selection for Foundation (6-7), Core (8-10), and Advanced (11-12).
 * Clean White cards with Royal Blue active state.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { LearningLevel } from '../../features/learn/learn.types';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface LevelSelectorProps {
  levels: LearningLevel[];
  selectedLevelId: string | null;
  language?: SupportedLanguage;
  onSelectLevel: (levelId: string) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  levels,
  selectedLevelId,
  language = 'en',
  onSelectLevel,
}) => {
  const t = getTranslation(language).learnScreen;

  const getLocalizedSubtitle = (id: string, defaultSubtitle: string): string => {
    if (id === 'foundation') return t.foundation;
    if (id === 'core') return t.core;
    if (id === 'advanced') return t.advanced;
    return defaultSubtitle;
  };

  const getLocalizedTitle = (id: string, defaultTitle: string): string => {
    if (id === 'foundation') return t.classes6to7;
    if (id === 'core') return t.classes8to10;
    if (id === 'advanced') return t.classes11to12;
    return defaultTitle;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.levelSectionTitle}</Text>

      <View style={styles.cardList}>
        {levels.map((lvl) => {
          const isSelected = selectedLevelId === lvl.id;
          const title = getLocalizedTitle(lvl.id, lvl.title);
          const subtitle = getLocalizedSubtitle(lvl.id, lvl.subtitle);

          return (
            <TouchableOpacity
              key={lvl.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => onSelectLevel(lvl.id)}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${title}, ${subtitle}. ${isSelected ? t.accessibility.levelSelected : ''}`}
            >
              <View style={styles.cardLeft}>
                <View style={[styles.indicatorCircle, isSelected && styles.indicatorCircleSelected]}>
                  {isSelected ? (
                    <Text style={styles.checkIcon}>✓</Text>
                  ) : (
                    <View style={styles.unselectedDot} />
                  )}
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                    {title}
                  </Text>
                  <Text style={[styles.cardSubtitle, isSelected && styles.cardSubtitleSelected]}>
                    {subtitle}
                  </Text>
                </View>
              </View>

              <View style={[styles.badge, isSelected && styles.badgeSelected]}>
                <Text style={[styles.badgeText, isSelected && styles.badgeTextSelected]}>
                  {lvl.badge}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.md,
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
  cardList: {
    gap: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardSelected: {
    backgroundColor: theme.colors.blue50,
    borderColor: theme.colors.actionPrimary,
    shadowColor: theme.colors.actionPrimary,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  indicatorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: theme.colors.slate400,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  indicatorCircleSelected: {
    backgroundColor: theme.colors.actionPrimary,
    borderColor: theme.colors.actionPrimary,
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  unselectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    ...theme.typography.body,
    fontSize: 14.5,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  cardTitleSelected: {
    color: theme.colors.actionPrimary,
    fontWeight: '800',
  },
  cardSubtitle: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    marginTop: 1,
  },
  cardSubtitleSelected: {
    color: theme.colors.navy900,
  },
  badge: {
    backgroundColor: theme.colors.gray100,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  badgeSelected: {
    backgroundColor: theme.colors.purple100,
    borderColor: theme.colors.purple200,
  },
  badgeText: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.slate600,
    fontWeight: '700',
  },
  badgeTextSelected: {
    color: theme.colors.brandPrimary,
    fontWeight: '800',
  },
});
