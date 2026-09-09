/**
 * SudokuBoard Component
 * High-performance, memoized 4x4 Mini Sudoku grid with 2x2 box division and keypad.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { theme } from '../../../theme';
import { SudokuGrid, SudokuCellVal, SudokuLevel } from '../../../features/games/sudoku';

interface SudokuBoardProps {
  level: SudokuLevel;
  grid: SudokuGrid;
  selectedCell: { row: number; col: number } | null;
  conflicts: { row: number; col: number }[];
  onSelectCell: (row: number, col: number) => void;
  onNumberPress: (val: SudokuCellVal) => void;
  clearLabel?: string;
}

interface SudokuCellViewProps {
  r: number;
  c: number;
  val: SudokuCellVal;
  given: boolean;
  selected: boolean;
  conflicted: boolean;
  cellSize: number;
  onSelect: (r: number, c: number) => void;
}

const SudokuCellView = React.memo<SudokuCellViewProps>(({
  r,
  c,
  val,
  given,
  selected,
  conflicted,
  cellSize,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.cell,
        { width: cellSize, height: cellSize },
        c === 1 && styles.cellBorderRight,
        selected && styles.cellSelected,
        conflicted && styles.cellConflicted,
      ]}
      onPress={() => onSelect(r, c)}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Row ${r + 1}, column ${c + 1}, ${
        val ? `number ${val}` : 'empty'
      }${given ? ', fixed' : ''}${conflicted ? ', conflict' : ''}`}
    >
      <Text
        style={[
          styles.cellText,
          given ? styles.givenText : styles.playerText,
          conflicted && styles.conflictText,
        ]}
      >
        {val || ''}
      </Text>
    </TouchableOpacity>
  );
});

SudokuCellView.displayName = 'SudokuCellView';

export const SudokuBoard: React.FC<SudokuBoardProps> = ({
  level,
  grid,
  selectedCell,
  conflicts,
  onSelectCell,
  onNumberPress,
  clearLabel = 'Clear',
}) => {
  const { width } = useWindowDimensions();
  const isCompact = width < 360;
  const boardSize = Math.min(width - (isCompact ? 24 : 32), 340);
  const cellSize = Math.floor((boardSize - 30) / 4);

  const isCellConflicted = (r: number, c: number) => {
    return conflicts.some((conf) => conf.row === r && conf.col === c);
  };

  const isGiven = (r: number, c: number) => {
    return level.initialGrid[r][c] !== null;
  };

  return (
    <View style={styles.container}>
      {/* 4x4 Grid with 2x2 Box Subdivisions */}
      <View style={styles.grid}>
        {grid.map((row, r) => (
          <View
            key={`row-${r}`}
            style={[
              styles.row,
              r === 1 && styles.rowBorderBottom,
            ]}
          >
            {row.map((val, c) => {
              const selected =
                selectedCell?.row === r && selectedCell?.col === c;
              const conflicted = isCellConflicted(r, c);
              const given = isGiven(r, c);

              return (
                <SudokuCellView
                  key={`cell-${r}-${c}`}
                  r={r}
                  c={c}
                  val={val}
                  given={given}
                  selected={selected}
                  conflicted={conflicted}
                  cellSize={cellSize}
                  onSelect={onSelectCell}
                />
              );
            })}
          </View>
        ))}
      </View>

      {/* Number Pad: 1, 2, 3, 4, Clear */}
      <View style={[styles.keypad, isCompact && styles.keypadCompact]}>
        {[1, 2, 3, 4].map((num) => (
          <TouchableOpacity
            key={`key-${num}`}
            style={[styles.keyBtn, isCompact && styles.keyBtnCompact]}
            onPress={() => onNumberPress(num)}
            activeOpacity={0.75}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Input number ${num}`}
          >
            <Text style={[styles.keyText, isCompact && styles.keyTextCompact]}>{num}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.clearBtn, isCompact && styles.clearBtnCompact]}
          onPress={() => onNumberPress(null)}
          activeOpacity={0.75}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={clearLabel}
        >
          <Text style={[styles.clearText, isCompact && styles.clearTextCompact]}>⌫ {clearLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginVertical: theme.spacing.md,
  },
  grid: {
    backgroundColor: '#0F172A',
    borderRadius: theme.borderRadius.lg,
    padding: 3,
    borderWidth: 3,
    borderColor: '#0F172A',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
  },
  rowBorderBottom: {
    borderBottomWidth: 3,
    borderBottomColor: '#0F172A',
  },
  cell: {
    backgroundColor: theme.colors.white,
    margin: 1.5,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellBorderRight: {
    marginRight: 3,
  },
  cellSelected: {
    backgroundColor: '#DBEAFE',
    borderColor: theme.colors.actionPrimary,
    borderWidth: 2,
  },
  cellConflicted: {
    backgroundColor: '#FEE2E2',
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  cellText: {
    ...theme.typography.h1,
    fontSize: 26,
    fontWeight: '900',
  },
  givenText: {
    color: theme.colors.navy900,
  },
  playerText: {
    color: theme.colors.actionPrimary,
  },
  conflictText: {
    color: theme.colors.error,
  },
  keypad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: theme.spacing.lg,
    width: '100%',
  },
  keypadCompact: {
    gap: 6,
    marginTop: theme.spacing.md,
  },
  keyBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  keyBtnCompact: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  keyText: {
    ...theme.typography.h2,
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.navy900,
  },
  keyTextCompact: {
    fontSize: 18,
  },
  clearBtn: {
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 26,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearBtnCompact: {
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 22,
  },
  clearText: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.slate600,
  },
  clearTextCompact: {
    fontSize: 12,
  },
});
