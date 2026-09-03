/**
 * MemoryMatrixBoard Component
 * Flip card grid for Game 10: Memory Matrix.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { MemoryCard } from '../../../features/games/memory-matrix';

interface MemoryMatrixBoardProps {
  cards: MemoryCard[];
  flippedIndices: number[];
  matchedPairIds: string[];
  onCardPress: (index: number) => void;
  language?: 'en' | 'ta';
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_MAX_WIDTH = Math.min(SCREEN_WIDTH - 32, 340);

export const MemoryMatrixBoard: React.FC<MemoryMatrixBoardProps> = ({
  cards,
  flippedIndices,
  matchedPairIds,
  onCardPress,
  language = 'en',
}) => {
  const isTamil = language === 'ta';
  const cols = 4;
  const cardWidth = (GRID_MAX_WIDTH - (cols - 1) * 8) / cols;

  return (
    <View style={styles.container}>
      <View style={[styles.gridWrapper, { width: GRID_MAX_WIDTH }]}>
        {cards.map((card, index) => {
          const isFlipped = flippedIndices.includes(index);
          const isMatched = matchedPairIds.includes(card.pairId);
          const isRevealed = isFlipped || isMatched;
          const textContent = isTamil ? card.content.ta : card.content.en;

          return (
            <TouchableOpacity
              key={`card-${card.id}-${index}`}
              style={[
                styles.card,
                { width: cardWidth, height: cardWidth * 1.25 },
                isRevealed ? styles.cardRevealed : styles.cardHidden,
                isMatched && styles.cardMatched,
              ]}
              onPress={() => onCardPress(index)}
              disabled={isRevealed}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={
                isRevealed ? textContent : 'Facedown memory card'
              }
            >
              {isRevealed ? (
                <View style={styles.cardContent}>
                  <Text style={styles.cardIcon}>{card.icon}</Text>
                  <Text style={styles.cardLabel} numberOfLines={2}>
                    {textContent}
                  </Text>
                  {isMatched && <Text style={styles.matchedCheck}>✓</Text>}
                </View>
              ) : (
                <View style={styles.cardBack}>
                  <Text style={styles.cardBackSymbol}>⚛️</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHidden: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  cardRevealed: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    padding: 4,
  },
  cardMatched: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
    opacity: 0.85,
  },
  cardBack: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBackSymbol: {
    fontSize: 20,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cardIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 12,
  },
  matchedCheck: {
    position: 'absolute',
    top: -2,
    right: 0,
    fontSize: 11,
    fontWeight: '900',
    color: '#059669',
  },
});
