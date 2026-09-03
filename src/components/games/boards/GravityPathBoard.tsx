/**
 * GravityPathBoard Component
 * Directional gravity shifting puzzle board for Game 16: Gravity Path.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { GravityDirection, GravityPathLevel } from '../../../features/games/gravity-path';

interface GravityPathBoardProps {
  level: GravityPathLevel;
  currentPos: { row: number; col: number };
  remainingMoves: number;
  onApplyGravity: (dir: GravityDirection) => void;
  language?: 'en' | 'ta';
  movesLeftLabel?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_SIZE = Math.min(SCREEN_WIDTH - 48, 280);

export const GravityPathBoard: React.FC<GravityPathBoardProps> = ({
  level,
  currentPos,
  remainingMoves,
  onApplyGravity,
  language = 'en',
  movesLeftLabel = 'Moves Left:',
}) => {
  const numRows = level.gridSize.rows;
  const numCols = level.gridSize.cols;
  const cellSize = GRID_SIZE / Math.max(numRows, numCols);

  return (
    <View style={styles.container}>
      {/* Moves Gauge */}
      <View style={styles.movesCard}>
        <Text style={styles.movesLabel}>{movesLeftLabel}</Text>
        <Text style={styles.movesValue}>{remainingMoves}</Text>
      </View>

      {/* Physics Board */}
      <View style={[styles.gridBoard, { width: GRID_SIZE, height: (GRID_SIZE / numCols) * numRows }]}>
        {level.grid.map((row, r) => (
          <View key={`row-${r}`} style={styles.row}>
            {row.map((cellType, c) => {
              const isCurrent = currentPos.row === r && currentPos.col === c;
              const isTarget = level.target.row === r && level.target.col === c;

              let icon = '';
              if (isCurrent) {
                icon = '🔵';
              } else if (isTarget) {
                icon = '🧪';
              } else if (cellType === 'wall') {
                icon = '🧱';
              } else if (cellType === 'hazard') {
                icon = '⚡';
              } else if (cellType === 'portal-a' || cellType === 'portal-b') {
                icon = '🌀';
              }

              return (
                <View
                  key={`cell-${r}-${c}`}
                  style={[
                    styles.cell,
                    { width: cellSize, height: cellSize },
                    cellType === 'wall' && styles.cellWall,
                    cellType === 'hazard' && styles.cellHazard,
                    isCurrent && styles.cellCurrent,
                  ]}
                >
                  <Text style={styles.cellIcon}>{icon}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      {/* Directional Pad */}
      <View style={styles.dpadContainer}>
        <TouchableOpacity
          style={[styles.dpadButton, styles.dpadUp]}
          onPress={() => onApplyGravity('up')}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Gravity Up"
        >
          <Text style={styles.dpadArrow}>⬆️</Text>
        </TouchableOpacity>

        <View style={styles.dpadMiddleRow}>
          <TouchableOpacity
            style={[styles.dpadButton, styles.dpadLeft]}
            onPress={() => onApplyGravity('left')}
            activeOpacity={0.7}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Gravity Left"
          >
            <Text style={styles.dpadArrow}>⬅️</Text>
          </TouchableOpacity>

          <View style={styles.dpadCenter}>
            <Text style={styles.centerIcon}>🌌</Text>
          </View>

          <TouchableOpacity
            style={[styles.dpadButton, styles.dpadRight]}
            onPress={() => onApplyGravity('right')}
            activeOpacity={0.7}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Gravity Right"
          >
            <Text style={styles.dpadArrow}>➡️</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.dpadButton, styles.dpadDown]}
          onPress={() => onApplyGravity('down')}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Gravity Down"
        >
          <Text style={styles.dpadArrow}>⬇️</Text>
        </TouchableOpacity>
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
  movesCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#99F6E4',
  },
  movesLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F766E',
  },
  movesValue: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0D9488',
  },
  gridBoard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#334155',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#1E293B',
    backgroundColor: '#0F172A',
  },
  cellWall: {
    backgroundColor: '#334155',
  },
  cellHazard: {
    backgroundColor: '#450A0A',
  },
  cellCurrent: {
    backgroundColor: '#0284C7',
  },
  cellIcon: {
    fontSize: 20,
  },
  dpadContainer: {
    marginTop: 18,
    alignItems: 'center',
  },
  dpadMiddleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dpadButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#0D9488',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dpadUp: {
    marginBottom: 6,
  },
  dpadDown: {
    marginTop: 6,
  },
  dpadLeft: {},
  dpadRight: {},
  dpadCenter: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dpadArrow: {
    fontSize: 22,
  },
  centerIcon: {
    fontSize: 22,
  },
});
