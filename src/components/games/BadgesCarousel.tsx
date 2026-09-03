/**
 * BadgesCarousel Component
 * Displays student game achievement badges.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { GameBadge } from '../../features/games/games.types';
import { GAME_BADGES } from '../../features/games/games.registry';
import { SupportedLanguage } from '../../config/i18n';

interface BadgesCarouselProps {
  unlockedBadgeIds?: string[];
  language: SupportedLanguage;
  sectionTitle?: string;
}

export const BadgesCarousel: React.FC<BadgesCarouselProps> = ({
  unlockedBadgeIds = [],
  language,
  sectionTitle = 'Game Badges',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sectionTitle}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {GAME_BADGES.map((badge) => {
          const isUnlocked = unlockedBadgeIds.includes(badge.id);

          return (
            <View
              key={badge.id}
              style={[styles.card, isUnlocked && styles.cardUnlocked]}
            >
              <View style={[styles.iconCircle, isUnlocked && styles.iconCircleUnlocked]}>
                <Text style={styles.icon}>{isUnlocked ? badge.icon : '🔒'}</Text>
              </View>
              <Text style={[styles.badgeTitle, isUnlocked && styles.titleUnlocked]}>
                {badge.title[language] || badge.title.en}
              </Text>
              <Text style={styles.badgeRequirement} numberOfLines={2}>
                {badge.requirementDescription || badge.description[language] || badge.description.en}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  scrollContent: {
    gap: 10,
    paddingRight: 16,
  },
  card: {
    width: 130,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  cardUnlocked: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconCircleUnlocked: {
    backgroundColor: '#FEF3C7',
  },
  icon: {
    fontSize: 22,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 2,
  },
  titleUnlocked: {
    color: '#B45309',
    fontWeight: '800',
  },
  badgeRequirement: {
    fontSize: 9,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
