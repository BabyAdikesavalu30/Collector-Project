/**
 * CollectionsCarousel Component
 * Horizontal scrolling collection packs for Vigyaan Games Universe.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { GameCollection } from '../../features/games/games.types';
import { GAME_COLLECTIONS } from '../../features/games/games.registry';
import { SupportedLanguage } from '../../config/i18n';

interface CollectionsCarouselProps {
  language: SupportedLanguage;
  onSelectCollection?: (collection: GameCollection) => void;
  sectionTitle?: string;
}

export const CollectionsCarousel: React.FC<CollectionsCarouselProps> = ({
  language,
  onSelectCollection,
  sectionTitle = 'Game Collections',
}) => {
  const isTamil = language === 'ta';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sectionTitle}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {GAME_COLLECTIONS.map((col) => (
          <TouchableOpacity
            key={col.id}
            style={[styles.card, { borderColor: col.accentColor }]}
            onPress={() => onSelectCollection?.(col)}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Collection ${col.title[language] || col.title.en}`}
          >
            <View style={[styles.iconCircle, { backgroundColor: `${col.accentColor}15` }]}>
              <Text style={styles.icon}>{col.icon}</Text>
            </View>
            <Text style={styles.colTitle}>
              {col.title[language] || col.title.en}
            </Text>
            <Text style={styles.colDesc} numberOfLines={2}>
              {col.description[language] || col.description.en}
            </Text>
            <View style={styles.footerRow}>
              <Text style={[styles.gameCount, { color: col.accentColor }]}>
                {col.gameIds.length} {isTamil ? 'விளையாட்டுகள்' : 'Games'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
    gap: 12,
    paddingRight: 16,
  },
  card: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 22,
  },
  colTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  colDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
    marginBottom: 8,
  },
  footerRow: {
    marginTop: 'auto',
  },
  gameCount: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
