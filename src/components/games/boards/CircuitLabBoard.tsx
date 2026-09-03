/**
 * CircuitLabBoard Component
 * Interactive grid and component toolbox for Game 9: Circuit Lab.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { CircuitComponentType, CircuitLabLevel } from '../../../features/games/circuit-lab';

interface CircuitLabBoardProps {
  level: CircuitLabLevel;
  grid: CircuitComponentType[][];
  selectedTool: CircuitComponentType | null;
  onSelectTool: (tool: CircuitComponentType) => void;
  onCellPress: (row: number, col: number) => void;
  isCircuitClosed: boolean;
  toolsTitle?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_SIZE = Math.min(SCREEN_WIDTH - 48, 300);

const TOOLBOX_OPTIONS: { type: CircuitComponentType; icon: string; label: string }[] = [
  { type: 'wire-horizontal', icon: '━', label: 'Wire H' },
  { type: 'wire-vertical', icon: '┃', label: 'Wire V' },
  { type: 'corner-bl', icon: '┗', label: 'Corner ┗' },
  { type: 'corner-br', icon: '┛', label: 'Corner ┛' },
  { type: 'corner-tl', icon: '┏', label: 'Corner ┏' },
  { type: 'corner-tr', icon: '┓', label: 'Corner ┓' },
  { type: 'switch-closed', icon: '⏻', label: 'Switch ON' },
  { type: 'empty', icon: '✕', label: 'Erase' },
];

function getCellIcon(type: CircuitComponentType, isClosed: boolean): string {
  switch (type) {
    case 'battery':
      return '🔋';
    case 'bulb':
      return isClosed ? '💡' : '⚪';
    case 'switch-open':
      return '⏼';
    case 'switch-closed':
      return '⏻';
    case 'resistor':
      return '〰️';
    case 'wire-horizontal':
      return '━';
    case 'wire-vertical':
      return '┃';
    case 'corner-bl':
      return '┗';
    case 'corner-br':
      return '┛';
    case 'corner-tl':
      return '┏';
    case 'corner-tr':
      return '┓';
    default:
      return '';
  }
}

export const CircuitLabBoard: React.FC<CircuitLabBoardProps> = ({
  level,
  grid,
  selectedTool,
  onSelectTool,
  onCellPress,
  isCircuitClosed,
  toolsTitle = 'Component Toolbox',
}) => {
  const rows = level.gridSize.rows;
  const cols = level.gridSize.cols;
  const cellSize = (GRID_SIZE - (cols - 1) * 6) / cols;

  const isFixed = (r: number, c: number) => {
    return level.fixedCells.some((fc) => fc.row === r && fc.col === c);
  };

  return (
    <View style={styles.container}>
      {/* Current Circuit Status */}
      <View style={[styles.statusBanner, isCircuitClosed && styles.statusBannerClosed]}>
        <Text style={[styles.statusText, isCircuitClosed && styles.statusTextClosed]}>
          {isCircuitClosed ? '⚡ Current Flowing! Circuit Active' : '⭕ Circuit Open - Place Components'}
        </Text>
      </View>

      {/* Grid Board */}
      <View style={[styles.grid, { width: GRID_SIZE, height: GRID_SIZE }]}>
        {grid.map((row, r) => (
          <View key={`row-${r}`} style={styles.gridRow}>
            {row.map((cellType, c) => {
              const fixed = isFixed(r, c);
              const icon = getCellIcon(cellType, isCircuitClosed);

              return (
                <TouchableOpacity
                  key={`cell-${r}-${c}`}
                  style={[
                    styles.cell,
                    { width: cellSize, height: cellSize },
                    fixed && styles.fixedCell,
                    isCircuitClosed && styles.activeCell,
                  ]}
                  onPress={() => !fixed && onCellPress(r, c)}
                  disabled={fixed}
                  activeOpacity={0.7}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`Grid cell ${r + 1}, ${c + 1}: ${cellType}`}
                >
                  <Text
                    style={[
                      styles.cellIcon,
                      cellType === 'bulb' && isCircuitClosed && styles.bulbGlow,
                    ]}
                  >
                    {icon}
                  </Text>
                  {fixed && <View style={styles.fixedDot} />}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {/* Toolbox Section */}
      <Text style={styles.toolboxHeader}>{toolsTitle}</Text>
      <View style={styles.toolbox}>
        {TOOLBOX_OPTIONS.map((tool) => {
          const isSelected = selectedTool === tool.type;

          return (
            <TouchableOpacity
              key={`tool-${tool.type}`}
              style={[styles.toolCard, isSelected && styles.toolCardSelected]}
              onPress={() => onSelectTool(tool.type)}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Select component ${tool.label}`}
            >
              <Text style={styles.toolIcon}>{tool.icon}</Text>
              <Text style={[styles.toolLabel, isSelected && styles.toolLabelSelected]}>
                {tool.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  statusBanner: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  statusBannerClosed: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#64748B',
  },
  statusTextClosed: {
    color: '#059669',
  },
  grid: {
    backgroundColor: '#1E293B',
    borderRadius: 18,
    padding: 8,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    backgroundColor: '#334155',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#475569',
  },
  fixedCell: {
    backgroundColor: '#1E293B',
    borderColor: '#64748B',
    borderWidth: 1.5,
  },
  activeCell: {
    borderColor: '#F59E0B',
  },
  cellIcon: {
    fontSize: 22,
    color: '#F8FAFC',
  },
  bulbGlow: {
    fontSize: 26,
  },
  fixedDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94A3B8',
  },
  toolboxHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    textAlign: 'center',
  },
  toolbox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    width: GRID_SIZE,
    justifyContent: 'center',
  },
  toolCard: {
    width: 68,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  toolCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
    borderWidth: 2,
  },
  toolIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  toolLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  toolLabelSelected: {
    color: '#4F46E5',
    fontWeight: '800',
  },
});
