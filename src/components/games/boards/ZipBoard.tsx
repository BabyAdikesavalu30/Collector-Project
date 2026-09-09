/**
 * ZipBoard Component
 * High-performance, memoized grid for Game 1: Zip.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { theme } from '../../../theme';
import { ZipCell, ZipLevel } from '../../../features/games/zip';

interface ZipBoardProps {
  level: ZipLevel;
  path: ZipCell[];
  onCellPress: (row: number, col: number) => void;
}

interface ZipCellViewProps {
  r: number;
  c: number;
  size: number;
  cellSize: number;
  cellMargin: number;
  badgeSize: number;
  badgeFontSize: number;
  hitSlop?: { top: number; bottom: number; left: number; right: number };
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
  cellMargin,
  badgeSize,
  badgeFontSize,
  hitSlop,
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
        { width: cellSize, height: cellSize, margin: cellMargin },
        inPath && styles.cellInPath,
        isHead && styles.cellHead,
        Boolean(cpNum) && !inPath && styles.cellCheckpoint,
      ]}
      hitSlop={hitSlop}
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
            { width: badgeSize, height: badgeSize, borderRadius: badgeSize / 2 },
            inPath && styles.checkpointBadgeVisited,
          ]}
        >
          <Text
            style={[
              styles.checkpointText,
              { fontSize: badgeFontSize },
              inPath && styles.checkpointTextVisited,
            ]}
          >
            {cpNum}
          </Text>
        </View>
      ) : inPath ? (
        <Text style={[styles.pathOrderText, { fontSize: Math.max(10, badgeFontSize - 2) }]}>
          {pathOrder}
        </Text>
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
  const { width } = useWindowDimensions();
  const size = level.size;
  const isCompact = width < 360;
  const boardMaxWidth = Math.min(width - (isCompact ? 20 : 36), 360);
  const cellMargin = isCompact ? 2 : 3;
  const gridPadding = isCompact ? 4 : 6;
  const availableForCells = boardMaxWidth - (gridPadding * 2) - 4; // subtract padding & borders
  const cellSize = Math.floor(availableForCells / size) - (cellMargin * 2);
  const badgeSize = Math.max(20, Math.min(32, cellSize - 6));
  const badgeFontSize = cellSize < 38 ? 11 : 14;

  const hitSlopAmount = cellSize < 44 ? Math.ceil((44 - cellSize) / 2) : 0;
  const hitSlop = hitSlopAmount > 0
    ? { top: hitSlopAmount, bottom: hitSlopAmount, left: hitSlopAmount, right: hitSlopAmount }
    : undefined;

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

  const gridWidth = (cellSize + cellMargin * 2) * size + gridPadding * 2 + 4;

  return (
    <View style={styles.boardWrapper}>
      <View style={[styles.grid, { width: gridWidth, padding: gridPadding }]}>
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
                  cellMargin={cellMargin}
                  badgeSize={badgeSize}
                  badgeFontSize={badgeFontSize}
                  hitSlop={hitSlop}
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
