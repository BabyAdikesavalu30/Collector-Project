/**
 * ExploreSection — Grid of science exploration entry points for Home 2.0.
 * Compact cards for Mystery, Experiments, Games, Riddles, Fun Facts, Passport.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { HomeExploreItem } from '../../features/home/home2.types';

interface ExploreSectionProps {
  items: HomeExploreItem[];
  language: SupportedLanguage;
  onItemPress: (route: string) => void;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  items,
  language,
  onItemPress,
}) => {
  const isTamil = language === 'ta';
  const row1Items = items.slice(0, 3);
  const row2Items = items.slice(3, 6);

  const renderCard = (item: HomeExploreItem) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.card, { borderColor: item.accentColor + '40' }]}
      onPress={() => onItemPress(item.route)}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${isTamil ? item.titleTa : item.title}: ${isTamil ? item.subtitleTa : item.subtitle}`}
    >
      <View style={[styles.iconCircle, { backgroundColor: item.bgColor }]}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <Text style={styles.cardTitle} numberOfLines={1}>
        {isTamil ? item.titleTa : item.title}
      </Text>
      <Text style={styles.cardSubtitle} numberOfLines={1}>
        {isTamil ? item.subtitleTa : item.subtitle}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {isTamil ? 'அறிவியலை ஆராயுங்கள்' : 'EXPLORE SCIENCE'}
      </Text>

      <View style={styles.grid}>
        <View style={styles.row}>
          {row1Items.map(renderCard)}
        </View>
        {row2Items.length > 0 && (
          <View style={styles.row}>
            {row2Items.map(renderCard)}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  card: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    fontSize: 18,
  },
  cardTitle: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.navy900,
    textAlign: 'center',
  },
  cardSubtitle: {
    ...theme.typography.caption,
    fontSize: 9,
    color: theme.colors.slate500,
    textAlign: 'center',
    marginTop: 1,
  },
});
