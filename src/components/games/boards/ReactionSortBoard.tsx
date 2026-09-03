/**
 * ReactionSortBoard Component
 * Science classification & categorization board for Game 12: Reaction Sort.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { SortCategory, SortItem } from '../../../features/games/reaction-sort';

interface ReactionSortBoardProps {
  currentItem: SortItem | null;
  categories: SortCategory[];
  sortedCount: number;
  totalItems: number;
  feedback: { isCorrect: boolean } | null;
  onSelectCategory: (categoryKey: string) => void;
  language?: 'en' | 'ta';
  sortPrompt?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ReactionSortBoard: React.FC<ReactionSortBoardProps> = ({
  currentItem,
  categories,
  sortedCount,
  totalItems,
  feedback,
  onSelectCategory,
  language = 'en',
  sortPrompt = 'Classify item into category:',
}) => {
  const isTamil = language === 'ta';

  if (!currentItem) return null;

  return (
    <View style={styles.container}>
      {/* Progress Counter */}
      <View style={styles.counterRow}>
        <Text style={styles.counterText}>
          Item {Math.min(sortedCount + 1, totalItems)} of {totalItems}
        </Text>
      </View>

      {/* Active Science Item Card */}
      <View
        style={[
          styles.itemCard,
          feedback?.isCorrect === true && styles.cardCorrect,
          feedback?.isCorrect === false && styles.cardIncorrect,
        ]}
      >
        {currentItem.icon ? <Text style={styles.itemIcon}>{currentItem.icon}</Text> : null}
        <Text style={styles.itemName}>{isTamil ? currentItem.name.ta : currentItem.name.en}</Text>
        {currentItem.hint ? (
          <Text style={styles.itemHint}>
            💡 {isTamil ? currentItem.hint.ta : currentItem.hint.en}
          </Text>
        ) : null}
      </View>

      {/* Target Category Bins */}
      <Text style={styles.promptText}>{sortPrompt}</Text>
      <View style={styles.binsContainer}>
        {categories.map((cat) => {
          const catLabel = isTamil ? cat.label.ta : cat.label.en;

          return (
            <TouchableOpacity
              key={`cat-${cat.key}`}
              style={[styles.categoryBin, { borderColor: cat.color }]}
              onPress={() => onSelectCategory(cat.key)}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Classify as ${catLabel}`}
            >
              <View style={[styles.categoryColorDot, { backgroundColor: cat.color }]} />
              <Text style={styles.categoryLabel}>{catLabel}</Text>
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
    alignItems: 'center',
    paddingVertical: 12,
  },
  counterRow: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  counterText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
  },
  itemCard: {
    width: Math.min(SCREEN_WIDTH - 48, 340),
    minHeight: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  cardCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  cardIncorrect: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  itemIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  itemHint: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  promptText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  binsContainer: {
    width: Math.min(SCREEN_WIDTH - 48, 340),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  categoryBin: {
    flex: 1,
    minWidth: 140,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
  },
});
