/**
 * WendBoard Component
 * High-performance, memoized letter grid for Game 2: Wend.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { WendCell, WendLevel } from '../../../features/games/wend';
import { SupportedLanguage } from '../../../config/i18n';

interface WendBoardProps {
  level: WendLevel;
  selectedPath: WendCell[];
  currentWord: string;
  language: SupportedLanguage;
  onCellPress: (row: number, col: number) => void;
  onUndo: () => void;
  findLabel?: string;
  hintLabel?: string;
  undoLabel?: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const BOARD_MAX_WIDTH = Math.min(SCREEN_WIDTH - 40, 340);

interface WendCellViewProps {
  r: number;
  c: number;
  letter: string;
  cellSize: number;
  selected: boolean;
  order: number | null;
  onPress: (r: number, c: number) => void;
}

const WendCellView = React.memo<WendCellViewProps>(({
  r,
  c,
  letter,
  cellSize,
  selected,
  order,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.cell,
        { width: cellSize, height: cellSize },
        selected && styles.cellSelected,
      ]}
      onPress={() => onPress(r, c)}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Letter ${letter}, Row ${r + 1}, column ${c + 1}${
        selected ? ', selected' : ', unselected'
      }`}
    >
      <Text
        style={[
          styles.cellLetter,
          selected && styles.cellLetterSelected,
        ]}
      >
        {letter}
      </Text>
      {Boolean(order) && (
        <View style={styles.orderBadge}>
          <Text style={styles.orderText}>{order}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
});

WendCellView.displayName = 'WendCellView';

export const WendBoard: React.FC<WendBoardProps> = ({
  level,
  selectedPath,
  currentWord,
  language,
  onCellPress,
  onUndo,
  findLabel = 'Target Word:',
  hintLabel = 'Hint:',
  undoLabel = 'Undo Letter',
}) => {
  const isTamil = language === 'ta';
  const grid = (isTamil && level.taGrid) ? level.taGrid : level.grid;
  const targetWord = isTamil ? level.targetWord.ta : level.targetWord.en;
  const hint = isTamil ? level.hint.ta : level.hint.en;

  const rows = grid.length;
  const cols = grid[0].length;
  const cellSize = Math.max(44, Math.floor(BOARD_MAX_WIDTH / cols) - 8);

  const isCellSelected = (r: number, c: number) => {
    return selectedPath.some((cell) => cell.row === r && cell.col === c);
  };

  const getSelectionOrder = (r: number, c: number) => {
    const idx = selectedPath.findIndex((cell) => cell.row === r && cell.col === c);
    return idx >= 0 ? idx + 1 : null;
  };

  return (
    <View style={styles.container}>
      {/* Target Word & Clue Card */}
      <View style={styles.targetCard}>
        <View style={styles.targetRow}>
          <Text style={styles.targetLabel}>{findLabel}</Text>
          <Text style={styles.targetWord}>{targetWord}</Text>
        </View>
        <Text style={styles.hintText}>
          {hintLabel} {hint}
        </Text>

        {/* Current Spelled Letter Tray */}
        <View style={styles.trayRow}>
          {targetWord.split('').map((_: string, i: number) => {
            const letter = currentWord[i] || '';
            const isFilled = Boolean(letter);
            return (
              <View
                key={i}
                style={[styles.traySlot, isFilled && styles.traySlotFilled]}
              >
                <Text style={styles.trayLetter}>{letter}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Grid */}
      <View style={[styles.grid, { width: (cellSize + 8) * cols }]}>
        {grid.map((row, r) => (
          <View key={`row-${r}`} style={styles.row}>
            {row.map((letter, c) => {
              return (
                <WendCellView
                  key={`cell-${r}-${c}`}
                  r={r}
                  c={c}
                  letter={letter}
                  cellSize={cellSize}
                  selected={isCellSelected(r, c)}
                  order={getSelectionOrder(r, c)}
                  onPress={onCellPress}
                />
              );
            })}
          </View>
        ))}
      </View>

      {/* Undo Button */}
      {selectedPath.length > 0 && (
        <TouchableOpacity
          style={styles.undoBtn}
          onPress={onUndo}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={undoLabel}
        >
          <Text style={styles.undoBtnText}>⌫ {undoLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginVertical: theme.spacing.md,
  },
  targetCard: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  targetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  targetLabel: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.slate500,
    textTransform: 'uppercase',
    marginRight: 6,
  },
  targetWord: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.brandPrimary,
    letterSpacing: 1,
  },
  hintText: {
    ...theme.typography.body,
    fontSize: 12.5,
    color: theme.colors.slate600,
    lineHeight: 18,
    marginBottom: 10,
  },
  trayRow: {
    flexDirection: 'row',
    gap: 6,
  },
  traySlot: {
    width: 36,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  traySlotFilled: {
    backgroundColor: '#FAF5FF',
    borderColor: '#C084FC',
  },
  trayLetter: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '900',
    color: theme.colors.brandPrimary,
  },
  grid: {
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.lg,
    padding: 6,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    margin: 4,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  cellSelected: {
    backgroundColor: '#7E22CE',
    borderColor: '#6B21A8',
  },
  cellLetter: {
    ...theme.typography.h1,
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.navy900,
  },
  cellLetterSelected: {
    color: theme.colors.white,
  },
  orderBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    fontSize: 10,
    fontWeight: '900',
    color: theme.colors.brandPrimary,
  },
  undoBtn: {
    marginTop: theme.spacing.md,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.full,
  },
  undoBtnText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
});
