/**
 * QueensBoard Component
 * High-performance, memoized region-colored board for Game 6: Queens.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
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

const SCREEN_WIDTH = Dimensions.get('window').width;
const BOARD_SIZE = Math.min(SCREEN_WIDTH - 40, 320);

interface QueensCellViewProps {
  r: number;
  c: number;
  regId: number;
  regColor: string;
  cellSize: number;
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
  val,
  conflicted,
  onPress,
}) => {
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
      {val === 'queen' && <Text style={styles.queenIcon}>👑</Text>}
      {val === 'cross' && <Text style={styles.crossIcon}>✕</Text>}
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
  const size = level.size;
  const cellSize = Math.max(44, Math.floor(BOARD_SIZE / size) - 4);

  const isCellConflicted = (r: number, c: number) => {
    return conflicts.some((conf) => conf.row === r && conf.col === c);
  };

  return (
    <View style={styles.container}>
      {/* Region-Partitioned Board */}
      <View style={[styles.grid, { width: (cellSize + 4) * size }]}>
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
    alignItems: 'center',
    gap: 16,
    marginTop: theme.spacing.md,
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
