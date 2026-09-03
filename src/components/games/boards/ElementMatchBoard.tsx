/**
 * ElementMatchBoard Component
 * Dual-column matching board for Game 7: Element Match.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { ElementItem } from '../../../features/games/element-match';

interface ElementMatchBoardProps {
  elements: ElementItem[];
  selectedSymbol: string | null;
  selectedName: string | null;
  matchedIds: string[];
  onSelectSymbol: (id: string) => void;
  onSelectName: (id: string) => void;
  symbolsLabel?: string;
  namesLabel?: string;
  language?: 'en' | 'ta';
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ElementMatchBoard: React.FC<ElementMatchBoardProps> = ({
  elements,
  selectedSymbol,
  selectedName,
  matchedIds,
  onSelectSymbol,
  onSelectName,
  symbolsLabel = 'Symbols',
  namesLabel = 'Names',
  language = 'en',
}) => {
  const isTamil = language === 'ta';

  // Deterministic reverse order for names column to create puzzle challenge
  const shuffledNames = React.useMemo(() => {
    return [...elements].reverse();
  }, [elements]);

  return (
    <View style={styles.container}>
      <View style={styles.columnsWrapper}>
        {/* Left Column: Symbols */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>{symbolsLabel}</Text>
          {elements.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedSymbol === item.id;

            return (
              <TouchableOpacity
                key={`sym-${item.id}`}
                style={[
                  styles.card,
                  styles.symbolCard,
                  isSelected && styles.cardSelected,
                  isMatched && styles.cardMatched,
                ]}
                onPress={() => !isMatched && onSelectSymbol(item.id)}
                activeOpacity={0.7}
                disabled={isMatched}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Element symbol ${item.symbol}`}
              >
                <Text
                  style={[
                    styles.symbolText,
                    isMatched && styles.textMatched,
                    isSelected && styles.textSelected,
                  ]}
                >
                  {item.symbol}
                </Text>
                <Text style={styles.atomicNumber}>#{item.atomicNumber}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Right Column: Element Names */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>{namesLabel}</Text>
          {shuffledNames.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedName === item.id;
            const nameStr = isTamil ? item.name.ta : item.name.en;

            return (
              <TouchableOpacity
                key={`name-${item.id}`}
                style={[
                  styles.card,
                  styles.nameCard,
                  isSelected && styles.cardSelected,
                  isMatched && styles.cardMatched,
                ]}
                onPress={() => !isMatched && onSelectName(item.id)}
                activeOpacity={0.7}
                disabled={isMatched}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Element name ${nameStr}`}
              >
                <Text
                  style={[
                    styles.nameText,
                    isMatched && styles.textMatched,
                    isSelected && styles.textSelected,
                  ]}
                  numberOfLines={1}
                >
                  {nameStr}
                </Text>
                {isMatched && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
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
  columnsWrapper: {
    flexDirection: 'row',
    width: Math.min(SCREEN_WIDTH - 32, 400),
    justifyContent: 'space-between',
    gap: 12,
  },
  column: {
    flex: 1,
    gap: 8,
  },
  columnHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
    textAlign: 'center',
  },
  card: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  symbolCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  nameCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  cardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
    borderWidth: 2,
  },
  cardMatched: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
    opacity: 0.7,
  },
  symbolText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1E293B',
  },
  atomicNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  textSelected: {
    color: '#4F46E5',
    fontWeight: '800',
  },
  textMatched: {
    color: '#059669',
    fontWeight: '800',
  },
  checkmark: {
    fontSize: 14,
    fontWeight: '900',
    color: '#059669',
    marginLeft: 4,
  },
});
