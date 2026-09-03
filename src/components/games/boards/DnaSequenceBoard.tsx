/**
 * DnaSequenceBoard Component
 * Genetic nucleotide pairing and transcription board for Game 19: DNA Sequence.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { DnaBase, DnaSequenceLevel } from '../../../features/games/dna-sequence';

interface DnaSequenceBoardProps {
  level: DnaSequenceLevel;
  playerStrand: (DnaBase | null)[];
  activeSlotIndex: number;
  onSelectBase: (base: DnaBase) => void;
  onUndo: () => void;
  language?: 'en' | 'ta';
  templateLabel?: string;
  complementLabel?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BASE_COLORS: Record<DnaBase, { bg: string; text: string }> = {
  A: { bg: '#EF4444', text: '#FFFFFF' },
  T: { bg: '#3B82F6', text: '#FFFFFF' },
  C: { bg: '#F59E0B', text: '#FFFFFF' },
  G: { bg: '#10B981', text: '#FFFFFF' },
  U: { bg: '#8B5CF6', text: '#FFFFFF' },
};

const BASE_OPTIONS: DnaBase[] = ['A', 'T', 'C', 'G', 'U'];

export const DnaSequenceBoard: React.FC<DnaSequenceBoardProps> = ({
  level,
  playerStrand,
  activeSlotIndex,
  onSelectBase,
  onUndo,
  language = 'en',
  templateLabel = 'Template Strand (3′ → 5′):',
  complementLabel = 'Synthesized Strand (5′ → 3′):',
}) => {
  return (
    <View style={styles.container}>
      {/* Target Protein Info */}
      {level.targetProtein ? (
        <View style={styles.proteinBadge}>
          <Text style={styles.proteinText}>
            🧬 Target: {level.targetProtein[language] || level.targetProtein.en}
          </Text>
        </View>
      ) : null}

      {/* Double Helix Ladder Representation */}
      <View style={styles.ladderCard}>
        {/* Template Strand */}
        <Text style={styles.strandLabel}>{templateLabel}</Text>
        <View style={styles.strandRow}>
          {level.templateStrand.map((base, idx) => (
            <View
              key={`tmpl-${idx}`}
              style={[
                styles.baseNode,
                { backgroundColor: BASE_COLORS[base]?.bg || '#64748B' },
              ]}
            >
              <Text style={styles.baseNodeText}>{base}</Text>
            </View>
          ))}
        </View>

        {/* Hydrogen Bonds Connector */}
        <View style={styles.bondsRow}>
          {level.templateStrand.map((_, idx) => (
            <View key={`bond-${idx}`} style={styles.bondConnector}>
              <Text style={styles.bondLines}>╏</Text>
            </View>
          ))}
        </View>

        {/* Player Strand */}
        <Text style={styles.strandLabel}>{complementLabel}</Text>
        <View style={styles.strandRow}>
          {level.templateStrand.map((_, idx) => {
            const base = playerStrand[idx];
            const isActive = idx === activeSlotIndex;

            return (
              <View
                key={`player-${idx}`}
                style={[
                  styles.baseNode,
                  base
                    ? { backgroundColor: BASE_COLORS[base]?.bg }
                    : styles.emptySlot,
                  isActive && styles.activeSlotGlow,
                ]}
              >
                <Text
                  style={[
                    styles.baseNodeText,
                    !base && styles.emptySlotText,
                  ]}
                >
                  {base || '?'}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Nucleotide Keypad */}
      <View style={styles.keypadRow}>
        {BASE_OPTIONS.map((base) => {
          // Hide U if dna-pair mode
          if (level.mode === 'dna-pair' && base === 'U') return null;
          // Hide T if rna-transcribe mode
          if (level.mode === 'rna-transcribe' && base === 'T') return null;

          return (
            <TouchableOpacity
              key={`key-${base}`}
              style={[
                styles.keypadButton,
                { backgroundColor: BASE_COLORS[base]?.bg },
              ]}
              onPress={() => onSelectBase(base)}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Select nucleotide base ${base}`}
            >
              <Text style={styles.keypadText}>{base}</Text>
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
    paddingHorizontal: 16,
    width: '100%',
  },
  proteinBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    marginBottom: 12,
  },
  proteinText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  ladderCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  strandLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  strandRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  baseNode: {
    width: 32,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  baseNodeText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  emptySlot: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
  },
  emptySlotText: {
    color: '#94A3B8',
  },
  activeSlotGlow: {
    borderColor: '#2563EB',
    borderWidth: 2,
    backgroundColor: '#DBEAFE',
  },
  bondsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginVertical: 4,
  },
  bondConnector: {
    width: 32,
    alignItems: 'center',
  },
  bondLines: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '900',
  },
  keypadRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    width: '100%',
  },
  keypadButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  keypadText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});
