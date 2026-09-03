/**
 * LearningPathSelector Component
 * Topic pathway selection based on selected level and subject.
 * Clean White cards with Green/Blue selection indicators and duration/topic badges.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { LearningPathway } from '../../features/learn/learn.types';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface LearningPathSelectorProps {
  pathways: LearningPathway[];
  selectedPathwayId: string | null;
  language?: SupportedLanguage;
  onSelectPathway: (pathwayId: string) => void;
}

export const LearningPathSelector: React.FC<LearningPathSelectorProps> = ({
  pathways,
  selectedPathwayId,
  language = 'en',
  onSelectPathway,
}) => {
  const t = getTranslation(language).learnScreen;

  if (pathways.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{t.pathwaySectionTitle}</Text>
        <View style={styles.emptyCard} accessible={true} accessibilityRole="summary">
          <Text style={styles.emptyText}>{t.noPathways}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.pathwaySectionTitle}</Text>

      <View style={styles.cardList}>
        {pathways.map((path) => {
          const isSelected = selectedPathwayId === path.id;

          return (
            <TouchableOpacity
              key={path.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => onSelectPathway(path.id)}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${path.title}. ${path.description}. ${path.estimatedMinutes} ${t.estimatedMinutes}. ${path.topicCount} ${t.topics}. ${isSelected ? t.accessibility.pathSelected : ''}`}
            >
              <View style={styles.cardContent}>
                <View style={styles.headerRow}>
                  <Text style={[styles.pathTitle, isSelected && styles.pathTitleSelected]} numberOfLines={1}>
                    {path.title}
                  </Text>
                  <View style={[styles.checkCircle, isSelected && styles.checkCircleSelected]}>
                    {isSelected ? <Text style={styles.checkText}>✓</Text> : <View style={styles.emptyDot} />}
                  </View>
                </View>

                <Text style={[styles.pathDesc, isSelected && styles.pathDescSelected]} numberOfLines={2}>
                  {path.description}
                </Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaPill}>
                    <Text style={styles.metaIcon}>⏱</Text>
                    <Text style={styles.metaText}>
                      {path.estimatedMinutes} {t.estimatedMinutes}
                    </Text>
                  </View>

                  <View style={styles.metaPill}>
                    <Text style={styles.metaIcon}>📖</Text>
                    <Text style={styles.metaText}>
                      {path.topicCount} {t.topics}
                    </Text>
                  </View>
                </View>
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
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardSelected: {
    backgroundColor: theme.colors.green50,
    borderColor: theme.colors.success,
    shadowColor: theme.colors.success,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  cardContent: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  pathTitle: {
    ...theme.typography.body,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
    flex: 1,
    marginRight: 8,
  },
  pathTitleSelected: {
    color: theme.colors.navy900,
    fontWeight: '800',
  },
  pathDesc: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    lineHeight: 17,
    marginBottom: 8,
  },
  pathDescSelected: {
    color: theme.colors.navy900,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray100,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.sm,
  },
  metaIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  metaText: {
    ...theme.typography.caption,
    fontSize: 10.5,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: theme.colors.slate400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleSelected: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  emptyDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  emptyCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.slate500,
  },
});
