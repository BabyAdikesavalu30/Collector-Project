/**
 * ZipBoard Component
 * High-performance, memoized grid for Game 1: Zip.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { ZipCell, ZipLevel } from '../../../features/games/zip';

interface ZipBoardProps {
  level: ZipLevel;
  path: ZipCell[];
  onCellPress: (row: number, col: number) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const BOARD_MAX_WIDTH = Math.min(SCREEN_WIDTH - 40, 360);

interface ZipCellViewProps {
  r: number;
  c: number;
  size: number;
  cellSize: number;
  cpNum: number | null;
  inPath: boolean;
  isHead: boolean;
  pathOrder: number | null;
  onPress: (r: number, c: number) => void;
}

const ZipCellView = React.memo<ZipCellViewProps>(({
  r,
  c,
  cellSize,
  cpNum,
  inPath,
  isHead,
  pathOrder,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.cell,
        { width: cellSize, height: cellSize },
        inPath && styles.cellInPath,
        isHead && styles.cellHead,
        Boolean(cpNum) && !inPath && styles.cellCheckpoint,
      ]}
      onPress={() => onPress(r, c)}
      activeOpacity={0.75}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Row ${r + 1}, column ${c + 1}${
        cpNum ? `, Checkpoint ${cpNum}` : inPath ? ', connected' : ', empty'
      }`}
    >
      {cpNum ? (
        <View
          style={[
            styles.checkpointBadge,
            inPath && styles.checkpointBadgeVisited,
          ]}
        >
          <Text
            style={[
              styles.checkpointText,
              inPath && styles.checkpointTextVisited,
            ]}
          >
            {cpNum}
          </Text>
        </View>
      ) : inPath ? (
        <Text style={styles.pathOrderText}>{pathOrder}</Text>
      ) : (
        <View style={styles.emptyDot} />
      )}
    </TouchableOpacity>
  );
});

ZipCellView.displayName = 'ZipCellView';

export const ZipBoard: React.FC<ZipBoardProps> = ({
  level,
  path,
  onCellPress,
}) => {
  const size = level.size;
  const cellSize = Math.max(44, Math.floor(BOARD_MAX_WIDTH / size) - 6);

  const getCheckpointNum = (r: number, c: number) => {
    const cp = level.checkpoints.find((chk) => chk.row === r && chk.col === c);
    return cp ? cp.number : null;
  };

  const isCellInPath = (r: number, c: number) => {
    return path.some((cell) => cell.row === r && cell.col === c);
  };

  const getPathOrder = (r: number, c: number) => {
    const idx = path.findIndex((cell) => cell.row === r && cell.col === c);
    return idx >= 0 ? idx + 1 : null;
  };

  const isLastCell = (r: number, c: number) => {
    if (path.length === 0) return false;
    const last = path[path.length - 1];
    return last.row === r && last.col === c;
  };

  return (
    <View style={styles.boardWrapper}>
      <View style={[styles.grid, { width: (cellSize + 6) * size }]}>
        {Array.from({ length: size }).map((_, r) => (
          <View key={`row-${r}`} style={styles.row}>
            {Array.from({ length: size }).map((_, c) => {
              return (
                <ZipCellView
                  key={`cell-${r}-${c}`}
                  r={r}
                  c={c}
                  size={size}
                  cellSize={cellSize}
                  cpNum={getCheckpointNum(r, c)}
                  inPath={isCellInPath(r, c)}
                  isHead={isLastCell(r, c)}
                  pathOrder={getPathOrder(r, c)}
                  onPress={onCellPress}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.lg,
  },
  grid: {
    backgroundColor: '#F1F5F9',
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
  cell: {
    margin: 3,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellInPath: {
    backgroundColor: '#EFF6FF',
    borderColor: theme.colors.actionPrimary,
  },
  cellHead: {
    backgroundColor: '#DBEAFE',
    borderColor: '#1D4ED8',
    borderWidth: 2.5,
  },
  cellCheckpoint: {
    backgroundColor: '#FAF5FF',
    borderColor: '#D8B4FE',
  },
  checkpointBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.brandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkpointBadgeVisited: {
    backgroundColor: theme.colors.actionPrimary,
  },
  checkpointText: {
    ...theme.typography.button,
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  checkpointTextVisited: {
    color: theme.colors.white,
  },
  pathOrderText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
  },
  emptyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.slate400,
  },
});
