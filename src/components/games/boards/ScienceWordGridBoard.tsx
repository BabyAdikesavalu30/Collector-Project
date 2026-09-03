/**
 * ScienceWordGridBoard Component
 * Bilingual science word search board for Game 13: Science Word Grid.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { ScienceWordGridLevel } from '../../../features/games/science-word-grid';

interface ScienceWordGridBoardProps {
  level: ScienceWordGridLevel;
  selectedCells: { row: number; col: number }[];
  foundWordIds: string[];
  onCellPress: (row: number, col: number) => void;
  language?: 'en' | 'ta';
  wordsToFindLabel?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_SIZE = Math.min(SCREEN_WIDTH - 40, 310);

export const ScienceWordGridBoard: React.FC<ScienceWordGridBoardProps> = ({
  level,
  selectedCells,
  foundWordIds,
  onCellPress,
  language = 'en',
  wordsToFindLabel = 'Words to Discover:',
}) => {
  const cellSize = GRID_SIZE / 5;

  return (
    <View style={styles.container}>
      {/* Letter Grid */}
      <View style={[styles.gridWrapper, { width: GRID_SIZE, height: GRID_SIZE }]}>
        {level.grid.map((row, r) => (
          <View key={`row-${r}`} style={styles.row}>
            {row.map((letter, c) => {
              const isSelected = selectedCells.some(
                (cell) => cell.row === r && cell.col === c
              );

              // Check if cell is in any found word path
              const isFound = level.words.some(
                (w) =>
                  foundWordIds.includes(w.id) &&
                  w.path.some((p) => p.row === r && p.col === c)
              );

              return (
                <TouchableOpacity
                  key={`cell-${r}-${c}`}
                  style={[
                    styles.cell,
                    { width: cellSize, height: cellSize },
                    isSelected && styles.cellSelected,
                    isFound && styles.cellFound,
                  ]}
                  onPress={() => onCellPress(r, c)}
                  activeOpacity={0.7}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`Letter ${letter}, row ${r + 1}, column ${c + 1}`}
                >
                  <Text
                    style={[
                      styles.cellLetter,
                      isSelected && styles.letterSelected,
                      isFound && styles.letterFound,
                    ]}
                  >
                    {letter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {/* Words Checklist */}
      <View style={styles.wordsCard}>
        <Text style={styles.wordsHeader}>{wordsToFindLabel}</Text>
        <View style={styles.wordsList}>
          {level.words.map((w) => {
            const isFound = foundWordIds.includes(w.id);
            return (
              <View
                key={w.id}
                style={[styles.wordBadge, isFound && styles.wordBadgeFound]}
              >
                <Text style={[styles.wordText, isFound && styles.wordTextFound]}>
                  {w.word[language] || w.word.en}
                </Text>
                {isFound && <Text style={styles.checkIcon}>✓</Text>}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%',
  },
  gridWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  cellSelected: {
    backgroundColor: '#93C5FD',
    borderColor: '#3B82F6',
  },
  cellFound: {
    backgroundColor: '#BBF7D0',
    borderColor: '#4ADE80',
  },
  cellLetter: {
    fontSize: 18,
    fontWeight: '800',
    color: '#334155',
  },
  letterSelected: {
    color: '#1E3A8A',
    fontWeight: '900',
  },
  letterFound: {
    color: '#166534',
    fontWeight: '900',
  },
  wordsCard: {
    width: '90%',
    marginTop: 14,
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#DCFCE7',
  },
  wordsHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  wordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wordBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  wordBadgeFound: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  wordText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  wordTextFound: {
    color: '#15803D',
    textDecorationLine: 'line-through',
    fontWeight: '700',
  },
  checkIcon: {
    fontSize: 12,
    fontWeight: '800',
    color: '#16A34A',
  },
});
