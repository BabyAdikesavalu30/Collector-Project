/**
 * MagnetMazeBoard Component
 * Magnetic field maze board for Game 20: Magnet Maze.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { MagnetMazeLevel, MagnetPole } from '../../../features/games/magnet-maze';

interface MagnetMazeBoardProps {
  level: MagnetMazeLevel;
  currentPos: { row: number; col: number };
  currentPole: MagnetPole;
  remainingSteps: number;
  onCellPress: (row: number, col: number) => void;
  onTogglePole: () => void;
  language?: 'en' | 'ta';
  polarityLabel?: string;
  togglePolarityLabel?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_SIZE = Math.min(SCREEN_WIDTH - 48, 290);

export const MagnetMazeBoard: React.FC<MagnetMazeBoardProps> = ({
  level,
  currentPos,
  currentPole,
  remainingSteps,
  onCellPress,
  onTogglePole,
  language = 'en',
  polarityLabel = 'Active Polarity:',
  togglePolarityLabel = 'Switch Polarity (N ↔ S)',
}) => {
  const numRows = level.gridSize.rows;
  const numCols = level.gridSize.cols;
  const cellSize = GRID_SIZE / Math.max(numRows, numCols);

  return (
    <View style={styles.container}>
      {/* Polarity & Steps Gauge */}
      <View style={styles.gaugeCard}>
        <View style={styles.polarityIndicator}>
          <Text style={styles.gaugeLabel}>{polarityLabel}</Text>
          <View
            style={[
              styles.poleBadge,
              currentPole === 'N' ? styles.poleNorth : styles.poleSouth,
            ]}
          >
            <Text style={styles.poleText}>{currentPole}</Text>
          </View>
        </View>
        <Text style={styles.stepsText}>{remainingSteps} steps</Text>
      </View>

      {/* Magnet Maze Board */}
      <View style={[styles.gridBoard, { width: GRID_SIZE, height: (GRID_SIZE / numCols) * numRows }]}>
        {Array.from({ length: numRows }).map((_, r) => (
          <View key={`row-${r}`} style={styles.row}>
            {Array.from({ length: numCols }).map((__, c) => {
              const isWall = level.walls.some((w) => w.row === r && w.col === c);
              const emitter = level.emitters.find((e) => e.row === r && e.col === c);
              const isTarget = level.target.row === r && level.target.col === c;
              const isCurrent = currentPos.row === r && currentPos.col === c;

              let icon = '';
              let badge = '';

              if (isCurrent) {
                icon = currentPole === 'N' ? '🔴' : '🔵';
              } else if (isTarget) {
                icon = '🎯';
                badge = level.target.targetPole || '';
              } else if (emitter) {
                icon = emitter.pole === 'N' ? '🧲N' : '🧲S';
              } else if (isWall) {
                icon = '🧱';
              }

              return (
                <TouchableOpacity
                  key={`cell-${r}-${c}`}
                  style={[
                    styles.cell,
                    { width: cellSize, height: cellSize },
                    isWall && styles.cellWall,
                    isCurrent && styles.cellCurrent,
                  ]}
                  onPress={() => onCellPress(r, c)}
                  activeOpacity={0.7}
                  disabled={isWall}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`Sector row ${r + 1}, column ${c + 1}`}
                >
                  <Text style={styles.cellIcon}>{icon}</Text>
                  {badge ? (
                    <View
                      style={[
                        styles.targetPoleBadge,
                        badge === 'N' ? styles.poleNorth : styles.poleSouth,
                      ]}
                    >
                      <Text style={styles.targetPoleText}>{badge}</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {/* Switch Polarity Action Button */}
      <TouchableOpacity
        style={[
          styles.switchButton,
          currentPole === 'N' ? styles.btnNorth : styles.btnSouth,
        ]}
        onPress={onTogglePole}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={togglePolarityLabel}
      >
        <Text style={styles.switchButtonText}>
          🔄 {togglePolarityLabel} ({currentPole === 'N' ? 'N → S' : 'S → N'})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%',
  },
  gaugeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  polarityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gaugeLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
  },
  poleBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poleNorth: {
    backgroundColor: '#DC2626',
  },
  poleSouth: {
    backgroundColor: '#2563EB',
  },
  poleText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  stepsText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#B45309',
  },
  gridBoard: {
    backgroundColor: '#1E293B',
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
    borderColor: '#334155',
    backgroundColor: '#0F172A',
  },
  cellWall: {
    backgroundColor: '#475569',
  },
  cellCurrent: {
    backgroundColor: '#1E3A8A',
  },
  cellIcon: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  targetPoleBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetPoleText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  switchButton: {
    marginTop: 18,
    width: '90%',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  btnNorth: {
    backgroundColor: '#DC2626',
  },
  btnSouth: {
    backgroundColor: '#2563EB',
  },
  switchButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
