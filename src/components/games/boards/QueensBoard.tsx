/**
 * QueensBoard Component
 * High-performance, memoized region-colored board for Game 6: Queens.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { theme } from '../../../theme';
import { QueenCellState, QueensLevel } from '../../../features/games/queens';

interface QueensBoardProps {
  level: QueensLevel;
  grid: QueenCellState[][];
  conflicts: { row: number; col: number }[];
  onCellPress: (row: number, col: number) => void;
  queenLegend?: string;
  crossLegend?: string;
}

interface QueensCellViewProps {
  r: number;
  c: number;
  regId: number;
  regColor: string;
  cellSize: number;
  hitSlop?: { top: number; bottom: number; left: number; right: number };
  val: QueenCellState;
  conflicted: boolean;
  onPress: (r: number, c: number) => void;
}

const QueensCellView = React.memo<QueensCellViewProps>(({
  r,
  c,
  regId,
  regColor,
  cellSize,
  hitSlop,
  val,
  conflicted,
  onPress,
}) => {
  const queenFontSize = Math.max(16, Math.round(cellSize * 0.48));
  const crossFontSize = Math.max(12, Math.round(cellSize * 0.36));

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        {
          width: cellSize,
          height: cellSize,
          backgroundColor: regColor,
        },
        conflicted && styles.cellConflicted,
      ]}
      hitSlop={hitSlop}
      onPress={() => onPress(r, c)}
      activeOpacity={0.75}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Row ${r + 1}, column ${c + 1}, Region ${
        regId + 1
      }, ${
        val === 'queen'
          ? 'queen placed'
          : val === 'cross'
          ? 'marked cross'
          : 'queen not placed'
      }${conflicted ? ', conflict' : ''}`}
    >
      {val === 'queen' && <Text style={[styles.queenIcon, { fontSize: queenFontSize }]}>👑</Text>}
      {val === 'cross' && <Text style={[styles.crossIcon, { fontSize: crossFontSize }]}>✕</Text>}
    </TouchableOpacity>
  );
});

QueensCellView.displayName = 'QueensCellView';

export const QueensBoard: React.FC<QueensBoardProps> = ({
  level,
  grid,
  conflicts,
  onCellPress,
  queenLegend = 'Queen 👑 (Tap 1x)',
  crossLegend = 'Mark ❌ (Tap 2x)',
}) => {
  const { width } = useWindowDimensions();
  const size = level.size;
  const isCompact = width < 360;
  const boardSize = Math.min(width - (isCompact ? 20 : 36), 340);
  const cellMargin = 2;
  const gridPadding = 3;
  const availableForCells = boardSize - (gridPadding * 2) - 4;
  const cellSize = Math.floor(availableForCells / size) - (cellMargin * 2);

  const hitSlopAmount = cellSize < 44 ? Math.ceil((44 - cellSize) / 2) : 0;
  const hitSlop = hitSlopAmount > 0
    ? { top: hitSlopAmount, bottom: hitSlopAmount, left: hitSlopAmount, right: hitSlopAmount }
    : undefined;

  const isCellConflicted = (r: number, c: number) => {
    return conflicts.some((conf) => conf.row === r && conf.col === c);
  };

  const gridWidth = (cellSize + cellMargin * 2) * size + gridPadding * 2 + 4;

  return (
    <View style={styles.container}>
      {/* Region-Partitioned Board */}
      <View style={[styles.grid, { width: gridWidth, padding: gridPadding }]}>
        {grid.map((row, r) => (
          <View key={`row-${r}`} style={styles.row}>
            {row.map((val, c) => {
              const regId = level.regions[r][c];
              const regColor = level.regionColors[regId] || '#EFF6FF';
              const conflicted = isCellConflicted(r, c);

              return (
                <QueensCellView
                  key={`cell-${r}-${c}`}
                  r={r}
                  c={c}
                  regId={regId}
                  regColor={regColor}
                  cellSize={cellSize}
                  hitSlop={hitSlop}
                  val={val}
                  conflicted={conflicted}
                  onPress={onCellPress}
                />
              );
            })}
          </View>
        ))}
      </View>

      {/* Control Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <Text style={styles.legendText}>{queenLegend}</Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={styles.legendText}>{crossLegend}</Text>
        </View>
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
    borderWidth: 2,
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
  cell: {
    margin: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellConflicted: {
    borderColor: theme.colors.error,
    borderWidth: 2.5,
  },
  queenIcon: {
    fontSize: 22,
  },
  crossIcon: {
    fontSize: 16,
    color: theme.colors.slate400,
    fontWeight: '900',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: theme.spacing.md,
    paddingHorizontal: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendText: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
});
