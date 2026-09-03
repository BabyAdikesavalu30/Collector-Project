/**
 * OrbitBoard Component
 * Deep-space celestial navigation grid for Game 11: Orbit.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { OrbitLevel } from '../../../features/games/orbit';

interface OrbitBoardProps {
  level: OrbitLevel;
  path: { row: number; col: number }[];
  onCellPress: (row: number, col: number) => void;
  remainingFuel: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_SIZE = Math.min(SCREEN_WIDTH - 40, 310);

export const OrbitBoard: React.FC<OrbitBoardProps> = ({
  level,
  path,
  onCellPress,
  remainingFuel,
}) => {
  const cellSize = (GRID_SIZE - 24) / level.gridSize.cols;
  const currentPos = path[path.length - 1];

  return (
    <View style={styles.container}>
      {/* Fuel Gauge */}
      <View style={styles.fuelCard}>
        <Text style={styles.fuelLabel}>🚀 Spacecraft Fuel Range:</Text>
        <Text style={styles.fuelValue}>{remainingFuel} jumps</Text>
      </View>

      {/* Cosmic Navigation Grid */}
      <View style={[styles.gridBoard, { width: GRID_SIZE, height: GRID_SIZE }]}>
        {Array.from({ length: level.gridSize.rows }).map((_, r) => (
          <View key={`row-${r}`} style={styles.row}>
            {Array.from({ length: level.gridSize.cols }).map((__, c) => {
              const isStart = level.start.row === r && level.start.col === c;
              const isTarget = level.target.row === r && level.target.col === c;
              const obstacle = level.obstacles.find((o) => o.row === r && o.col === c);
              const waypoint = level.waypoints.find((w) => w.row === r && w.col === c);

              const pathIndex = path.findIndex((p) => p.row === r && p.col === c);
              const isVisited = pathIndex >= 0;
              const isCurrent = currentPos?.row === r && currentPos?.col === c;

              let content = '';
              let badge = '';

              if (isCurrent) {
                content = '🛰️';
              } else if (isVisited) {
                content = '✦';
              } else if (isTarget) {
                content = '🪐';
              } else if (waypoint) {
                content = '⭐';
                badge = String(waypoint.order);
              } else if (isStart) {
                content = '🚀';
              } else if (obstacle) {
                content = obstacle.type === 'black-hole' ? '🕳️' : '☄️';
              }

              return (
                <TouchableOpacity
                  key={`orbit-cell-${r}-${c}`}
                  style={[
                    styles.cell,
                    { width: cellSize, height: cellSize },
                    isVisited && styles.cellVisited,
                    isCurrent && styles.cellCurrent,
                    isTarget && styles.cellTarget,
                  ]}
                  onPress={() => onCellPress(r, c)}
                  activeOpacity={0.7}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`Orbit cell ${r + 1}, ${c + 1}`}
                >
                  <Text style={styles.cellIcon}>{content}</Text>
                  {badge ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{badge}</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  fuelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: GRID_SIZE,
    backgroundColor: '#0F172A',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  fuelLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  fuelValue: {
    fontSize: 13,
    fontWeight: '900',
    color: '#38BDF8',
  },
  gridBoard: {
    backgroundColor: '#020617',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#1E293B',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  cellVisited: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: '#0284C7',
  },
  cellCurrent: {
    backgroundColor: 'rgba(56, 189, 248, 0.3)',
    borderColor: '#38BDF8',
    borderWidth: 2,
  },
  cellTarget: {
    borderColor: '#F59E0B',
  },
  cellIcon: {
    fontSize: 22,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});
