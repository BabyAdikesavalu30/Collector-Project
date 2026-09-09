/**
 * TangoBoard Component
 * High-performance, memoized 4x4 Sun ☀️ & Moon 🌙 balance grid with clues.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { theme } from '../../../theme';
import { TangoSymbol, TangoLevel, TangoClue } from '../../../features/games/tango';

interface TangoBoardProps {
  level: TangoLevel;
  grid: TangoSymbol[][];
  conflicts: { row: number; col: number }[];
  onCellPress: (row: number, col: number) => void;
  legendSun?: string;
  legendMoon?: string;
  legendEqual?: string;
  legendOpposite?: string;
}

interface TangoCellViewProps {
  r: number;
  c: number;
  val: TangoSymbol;
  given: boolean;
  conflicted: boolean;
  cellSize: number;
  hClue: TangoClue | null | undefined;
  onPress: (r: number, c: number) => void;
}

const TangoCellView = React.memo<TangoCellViewProps>(({
  r,
  c,
  val,
  given,
  conflicted,
  cellSize,
  hClue,
  onPress,
}) => {
  return (
    <View style={styles.cellWrapper}>
      <TouchableOpacity
        style={[
          styles.cell,
          { width: cellSize, height: cellSize },
          given && styles.cellGiven,
          conflicted && styles.cellConflicted,
        ]}
        onPress={() => onPress(r, c)}
        disabled={given}
        activeOpacity={0.75}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Row ${r + 1}, column ${c + 1}, ${
          val === 'sun'
            ? 'Sun'
            : val === 'moon'
            ? 'Moon'
            : 'unknown'
        }${given ? ', fixed' : ''}${conflicted ? ', conflict' : ''}`}
      >
        <Text style={[styles.symbolText, { fontSize: Math.max(18, Math.round(cellSize * 0.45)) }]}>
          {val === 'sun' ? '☀️' : val === 'moon' ? '🌙' : '·'}
        </Text>
      </TouchableOpacity>

      {/* Horizontal Clue Overlay between columns */}
      {hClue && (
        <View style={[styles.hClueBadge, { top: Math.round(cellSize / 2) - 8 }]}>
          <Text style={styles.clueText}>
            {hClue.type === 'equal' ? '=' : '×'}
          </Text>
        </View>
      )}
    </View>
  );
});

TangoCellView.displayName = 'TangoCellView';

export const TangoBoard: React.FC<TangoBoardProps> = ({
  level,
  grid,
  conflicts,
  onCellPress,
  legendSun = 'Sun',
  legendMoon = 'Moon',
  legendEqual = 'Equal =',
  legendOpposite = 'Opposite ×',
}) => {
  const { width } = useWindowDimensions();
  const isCompact = width < 360;
  const boardSize = Math.min(width - (isCompact ? 24 : 40), 320);
  const cellSize = Math.floor((boardSize - 24) / 4);

  const isCellConflicted = (r: number, c: number) => {
    return conflicts.some((conf) => conf.row === r && conf.col === c);
  };

  const isGiven = (r: number, c: number) => {
    return level.initialGrid[r][c] !== null;
  };

  // Find clue between two cells if one exists
  const getHorizontalClue = (r: number, c: number) => {
    return level.clues.find(
      (clue) =>
        (clue.cell1.row === r && clue.cell1.col === c && clue.cell2.row === r && clue.cell2.col === c + 1) ||
        (clue.cell2.row === r && clue.cell2.col === c && clue.cell1.row === r && clue.cell1.col === c + 1)
    );
  };

  return (
    <View style={styles.container}>
      {/* 4x4 Board */}
      <View style={styles.grid}>
        {grid.map((row, r) => (
          <View key={`row-${r}`} style={styles.row}>
            {row.map((val, c) => {
              const conflicted = isCellConflicted(r, c);
              const given = isGiven(r, c);
              const hClue = c < 3 ? getHorizontalClue(r, c) : null;

              return (
                <TangoCellView
                  key={`cell-wrap-${r}-${c}`}
                  r={r}
                  c={c}
                  val={val}
                  given={given}
                  conflicted={conflicted}
                  cellSize={cellSize}
                  hClue={hClue}
                  onPress={onCellPress}
                />
              );
            })}
          </View>
        ))}
      </View>

      {/* Mini Rule Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <Text style={styles.legendIcon}>☀️</Text>
          <Text style={styles.legendText}>{legendSun}</Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={styles.legendIcon}>🌙</Text>
          <Text style={styles.legendText}>{legendMoon}</Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={styles.legendBadge}>=</Text>
          <Text style={styles.legendText}>{legendEqual}</Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={styles.legendBadge}>×</Text>
          <Text style={styles.legendText}>{legendOpposite}</Text>
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
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.lg,
    padding: 6,
    borderWidth: 2,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
  },
  cellWrapper: {
    position: 'relative',
    margin: 3,
  },
  cell: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellGiven: {
    backgroundColor: '#F1F5F9',
    borderColor: '#CBD5E1',
  },
  cellConflicted: {
    backgroundColor: '#FEE2E2',
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  symbolText: {
    fontSize: 24,
  },
  hClueBadge: {
    position: 'absolute',
    right: -7,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  clueText: {
    fontSize: 10,
    color: theme.colors.white,
    fontWeight: '900',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: theme.spacing.md,
    paddingHorizontal: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  legendBadge: {
    fontSize: 12,
    fontWeight: '900',
    color: theme.colors.brandPrimary,
    backgroundColor: theme.colors.purple50,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
});
