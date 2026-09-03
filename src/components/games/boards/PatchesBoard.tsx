/**
 * PatchesBoard Component
 * High-performance, memoized board and piece tray for Game 3: Patches.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { PatchesLevel, PlacedPieceInfo, PatchPiece } from '../../../features/games/patches';

interface PatchesBoardProps {
  level: PatchesLevel;
  placedPieces: Record<string, PlacedPieceInfo>;
  selectedPieceId?: string;
  onSelectPiece: (id: string) => void;
  onRemovePlacedPiece: (id: string) => void;
  onBoardCellPress: (row: number, col: number) => void;
  trayTitle?: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const BOARD_MAX_WIDTH = Math.min(SCREEN_WIDTH - 40, 320);

interface PatchesCellViewProps {
  r: number;
  c: number;
  cellSize: number;
  isTarget: boolean;
  piece: PatchPiece | null;
  onRemovePiece: (id: string) => void;
  onCellPress: (r: number, c: number) => void;
}

const PatchesCellView = React.memo<PatchesCellViewProps>(({
  r,
  c,
  cellSize,
  isTarget,
  piece,
  onRemovePiece,
  onCellPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.cell,
        { width: cellSize, height: cellSize },
        !isTarget && styles.cellEmpty,
        isTarget && !piece && styles.cellTarget,
        Boolean(piece) && {
          backgroundColor: piece?.color,
          borderColor: piece?.color,
        },
      ]}
      onPress={() => {
        if (piece) {
          onRemovePiece(piece.id);
        } else if (isTarget) {
          onCellPress(r, c);
        }
      }}
      disabled={!isTarget && !piece}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Row ${r + 1}, column ${c + 1}${
        piece ? `, piece ${piece.name}` : isTarget ? ', empty target slot' : ', inactive'
      }`}
    >
      {Boolean(piece) && (
        <Text style={styles.cellSymbol}>{piece?.symbol}</Text>
      )}
      {isTarget && !piece && <View style={styles.targetDot} />}
    </TouchableOpacity>
  );
});

PatchesCellView.displayName = 'PatchesCellView';

export const PatchesBoard: React.FC<PatchesBoardProps> = ({
  level,
  placedPieces,
  selectedPieceId,
  onSelectPiece,
  onRemovePlacedPiece,
  onBoardCellPress,
  trayTitle = 'Pieces Tray',
}) => {
  const { rows, cols } = level.boardSize;
  const cellSize = Math.max(44, Math.floor(BOARD_MAX_WIDTH / cols) - 6);

  // Find which piece occupies (r, c)
  const getPieceAt = (r: number, c: number) => {
    for (const [pieceId, placement] of Object.entries(placedPieces)) {
      const piece = level.pieces.find((p) => p.id === pieceId);
      if (!piece) continue;

      const pRow = r - placement.row;
      const pCol = c - placement.col;
      if (
        pRow >= 0 &&
        pRow < piece.shape.length &&
        pCol >= 0 &&
        pCol < piece.shape[pRow].length &&
        piece.shape[pRow][pCol] === 1
      ) {
        return piece;
      }
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Board */}
      <View style={[styles.grid, { width: (cellSize + 6) * cols }]}>
        {Array.from({ length: rows }).map((_, r) => (
          <View key={`row-${r}`} style={styles.row}>
            {Array.from({ length: cols }).map((_, c) => {
              const isTarget = level.targetShape[r][c];
              const piece = getPieceAt(r, c);

              return (
                <PatchesCellView
                  key={`cell-${r}-${c}`}
                  r={r}
                  c={c}
                  cellSize={cellSize}
                  isTarget={isTarget}
                  piece={piece}
                  onRemovePiece={onRemovePlacedPiece}
                  onCellPress={onBoardCellPress}
                />
              );
            })}
          </View>
        ))}
      </View>

      {/* Piece Selection Tray */}
      <View style={styles.trayContainer}>
        <Text style={styles.trayLabel}>{trayTitle}</Text>
        <View style={styles.trayList}>
          {level.pieces.map((piece) => {
            const isPlaced = Boolean(placedPieces[piece.id]);
            const isSelected = selectedPieceId === piece.id && !isPlaced;

            return (
              <TouchableOpacity
                key={piece.id}
                style={[
                  styles.trayItem,
                  { borderColor: piece.color },
                  isSelected && styles.trayItemSelected,
                  isPlaced && styles.trayItemPlaced,
                ]}
                onPress={() => {
                  if (isPlaced) {
                    onRemovePlacedPiece(piece.id);
                  } else {
                    onSelectPiece(piece.id);
                  }
                }}
                activeOpacity={0.75}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`${piece.name}${
                  isPlaced ? ', placed' : isSelected ? ', selected' : ', available'
                }`}
              >
                {/* Mini Shape Preview */}
                <View style={styles.shapePreview}>
                  {piece.shape.map((row, sr) => (
                    <View key={`sr-${sr}`} style={styles.miniRow}>
                      {row.map((val, sc) => (
                        <View
                          key={`sc-${sc}`}
                          style={[
                            styles.miniBlock,
                            val === 1
                              ? { backgroundColor: piece.color }
                              : styles.miniBlockEmpty,
                          ]}
                        />
                      ))}
                    </View>
                  ))}
                </View>

                <Text style={styles.pieceName} numberOfLines={1}>
                  {piece.name}
                </Text>
                {isPlaced && (
                  <View style={styles.placedBadge}>
                    <Text style={styles.placedText}>✓</Text>
                  </View>
                )}
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
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    margin: 3,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellEmpty: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  cellTarget: {
    backgroundColor: theme.colors.white,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
  },
  cellSymbol: {
    fontSize: 16,
  },
  targetDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.slate400,
  },
  trayContainer: {
    width: '100%',
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xs,
  },
  trayLabel: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.slate500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  trayList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  trayItem: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    padding: 8,
    alignItems: 'center',
    minWidth: 70,
    minHeight: 48,
    position: 'relative',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  trayItemSelected: {
    backgroundColor: '#F0FDF4',
    transform: [{ scale: 1.05 }],
  },
  trayItemPlaced: {
    opacity: 0.45,
    borderColor: theme.colors.border,
  },
  shapePreview: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  miniRow: {
    flexDirection: 'row',
  },
  miniBlock: {
    width: 10,
    height: 10,
    margin: 1,
    borderRadius: 2,
  },
  miniBlockEmpty: {
    backgroundColor: 'transparent',
  },
  pieceName: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  placedBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placedText: {
    fontSize: 9,
    color: theme.colors.white,
    fontWeight: '900',
  },
});
