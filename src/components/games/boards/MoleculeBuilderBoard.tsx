/**
 * MoleculeBuilderBoard Component
 * Interactive atom bond chamber and reagent tray for Game 8: Molecule Builder.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { AtomToken } from '../../../features/games/molecule-builder';

interface MoleculeBuilderBoardProps {
  formula: string;
  chemicalName: { en: string; ta: string };
  selectedAtoms: AtomToken[];
  availableAtoms: AtomToken[];
  onAddAtom: (atom: AtomToken) => void;
  onRemoveAtom: (index: number) => void;
  language?: 'en' | 'ta';
  targetLabel?: string;
  bondedLabel?: string;
  trayLabel?: string;
}

export const MoleculeBuilderBoard: React.FC<MoleculeBuilderBoardProps> = ({
  formula,
  chemicalName,
  selectedAtoms,
  availableAtoms,
  onAddAtom,
  onRemoveAtom,
  language = 'en',
  targetLabel = 'Target Molecule:',
  bondedLabel = 'Bond Chamber:',
  trayLabel = 'Available Atoms:',
}) => {
  return (
    <View style={styles.container}>
      {/* Target Formula Header Card */}
      <View style={styles.targetCard}>
        <Text style={styles.targetLabel}>{targetLabel}</Text>
        <Text style={styles.formulaText}>{formula}</Text>
        <Text style={styles.chemicalNameText}>{chemicalName[language] || chemicalName.en}</Text>
      </View>

      {/* Bond Chamber (Drop Zone) */}
      <View style={styles.chamberCard}>
        <Text style={styles.sectionTitle}>{bondedLabel}</Text>
        <View style={styles.bondedGrid}>
          {selectedAtoms.length === 0 ? (
            <Text style={styles.emptyChamberText}>Tap atom tokens below to synthesize bond</Text>
          ) : (
            selectedAtoms.map((atom, idx) => (
              <TouchableOpacity
                key={`bonded-${atom.id}-${idx}`}
                style={[styles.atomToken, { backgroundColor: atom.color }]}
                onPress={() => onRemoveAtom(idx)}
                activeOpacity={0.7}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Remove bonded atom ${atom.symbol}`}
              >
                <Text style={styles.atomSymbol}>{atom.symbol}</Text>
                <Text style={styles.atomValence}>v={atom.valence}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>

      {/* Available Atoms Tray */}
      <View style={styles.trayCard}>
        <Text style={styles.sectionTitle}>{trayLabel}</Text>
        <View style={styles.trayGrid}>
          {availableAtoms.map((atom) => {
            const nameStr = atom.name[language] || atom.name.en;

            return (
              <TouchableOpacity
                key={`tray-${atom.id}`}
                style={[styles.trayItem, { borderColor: atom.color }]}
                onPress={() => onAddAtom(atom)}
                activeOpacity={0.7}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Add atom ${atom.symbol} ${nameStr}`}
              >
                <View style={[styles.miniAtom, { backgroundColor: atom.color }]}>
                  <Text style={styles.miniAtomSymbol}>{atom.symbol}</Text>
                </View>
                <Text style={styles.trayName}>{nameStr}</Text>
                <Text style={styles.trayValence}>Valence {atom.valence}</Text>
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
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  targetCard: {
    width: '100%',
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  targetLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  formulaText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#38BDF8',
    marginVertical: 4,
  },
  chemicalNameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  chamberCard: {
    width: '100%',
    minHeight: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    borderStyle: 'dashed',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  bondedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
  },
  emptyChamberText: {
    fontSize: 13,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  atomToken: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  atomSymbol: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  atomValence: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '700',
  },
  trayCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  trayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  trayItem: {
    width: '47%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
  },
  miniAtom: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  miniAtomSymbol: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  trayName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
    textAlign: 'center',
  },
  trayValence: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
});
