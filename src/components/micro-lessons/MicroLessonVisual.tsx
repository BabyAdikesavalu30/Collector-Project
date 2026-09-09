/**
 * MicroLessonVisual Component
 * Clean, lightweight, responsive scientific diagrams designed for mobile screens.
 * Pure React Native vector shapes & styled visual elements with labeled parts.
 * Fully bilingual (EN/TA).
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { VisualDiagramType } from '../../features/micro-lessons/microLessons.types';
import { SupportedLanguage } from '../../config/i18n';

interface MicroLessonVisualProps {
  type: VisualDiagramType;
  language?: SupportedLanguage;
}

export const MicroLessonVisual: React.FC<MicroLessonVisualProps> = ({
  type,
  language = 'en',
}) => {
  const isTamil = language === 'ta';

  switch (type) {
    case 'newtons_first_law':
      return (
        <View style={styles.diagramBox}>
          <View style={styles.lawOneContainer}>
            <View style={styles.forceArrowLeft}>
              <Text style={styles.forceText}>← {isTamil ? 'உராய்வு விசை' : 'Friction Force'}</Text>
            </View>
            <View style={styles.boxObject}>
              <Text style={styles.boxObjectText}>📦 {isTamil ? 'பொருள் (நிறை M)' : 'Object (Mass M)'}</Text>
              <Text style={styles.boxSubtext}>v = {isTamil ? 'மாறிலி' : 'constant'}</Text>
            </View>
            <View style={styles.forceArrowRight}>
              <Text style={styles.forceText}>{isTamil ? 'உந்து விசை' : 'Push Force'} →</Text>
            </View>
          </View>
          <View style={styles.diagramFooter}>
            <Text style={styles.captionTag}>
              {isTamil ? 'சமன் செய்யப்பட்ட விசைகள்: மொத்த விசை = 0' : 'Balanced Forces: Net Force = 0'}
            </Text>
          </View>
        </View>
      );

    case 'newtons_third_law':
      return (
        <View style={styles.diagramBox}>
          <View style={styles.rocketRow}>
            <View style={styles.rocketGraphic}>
              <Text style={styles.rocketEmoji}>🚀</Text>
              <Text style={styles.vectorUp}>↑ {isTamil ? 'எதிர்செயல் (மேல்நோக்கிய விசை)' : 'Reaction (Upward Force)'}</Text>
            </View>
            <View style={styles.thrustGraphic}>
              <Text style={styles.exhaustFlame}>🔥💨</Text>
              <Text style={styles.vectorDown}>↓ {isTamil ? 'செயல் (வாயு வெளியேற்றம்)' : 'Action (Downward Thrust)'}</Text>
            </View>
          </View>
          <View style={styles.diagramFooter}>
            <Text style={styles.captionTag}>F(action) = - F(reaction)</Text>
          </View>
        </View>
      );

    case 'light_reflection':
      return (
        <View style={styles.diagramBox}>
          <View style={styles.opticsFrame}>
            <View style={styles.rayRow}>
              <Text style={styles.rayLabel}>i = {isTamil ? 'படுகோணம்' : 'Incidence'}</Text>
              <View style={styles.normalLine} />
              <Text style={styles.rayLabel}>r = {isTamil ? 'எதிரொளிப்பு' : 'Reflection'}</Text>
            </View>
            <View style={styles.mirrorSurface}>
              <Text style={styles.mirrorText}>🪞 {isTamil ? 'சமதள ஆடி (கண்ணாடி)' : 'Plane Mirror Surface'}</Text>
            </View>
          </View>
          <View style={styles.diagramFooter}>
            <Text style={styles.captionTag}>∠i = ∠r</Text>
          </View>
        </View>
      );

    case 'electric_circuit':
      return (
        <View style={styles.diagramBox}>
          <View style={styles.circuitLoop}>
            <View style={styles.circuitItem}>
              <Text style={styles.circuitIcon}>🔋</Text>
              <Text style={styles.circuitLabel}>{isTamil ? 'மின்கலம் (+ / -)' : 'Battery (Voltage)'}</Text>
            </View>
            <View style={styles.circuitWire}>
              <Text style={styles.currentArrow}>e⁻ ➔ ➔ ➔</Text>
            </View>
            <View style={styles.circuitItem}>
              <Text style={styles.circuitIcon}>💡</Text>
              <Text style={styles.circuitLabel}>{isTamil ? 'மின்விளக்கு' : 'Light Bulb'}</Text>
            </View>
          </View>
          <View style={styles.diagramFooter}>
            <Text style={styles.captionTag}>
              {isTamil ? 'மூடிய மின்சுற்று: எலக்ட்ரான் பாய்ச்சல்' : 'Closed Circuit: Electron Flow'}
            </Text>
          </View>
        </View>
      );

    case 'states_of_matter':
      return (
        <View style={styles.diagramBox}>
          <View style={styles.threeColumnStates}>
            <View style={styles.statePillar}>
              <Text style={styles.stateIcon}>🧊</Text>
              <Text style={styles.stateTitle}>{isTamil ? 'திடம்' : 'Solid'}</Text>
              <Text style={styles.stateDesc}>●●●●{"\n"}●●●●</Text>
            </View>
            <Text style={styles.transitionArrow}>→</Text>
            <View style={styles.statePillar}>
              <Text style={styles.stateIcon}>💧</Text>
              <Text style={styles.stateTitle}>{isTamil ? 'திரவம்' : 'Liquid'}</Text>
              <Text style={styles.stateDesc}>●  ●  ●{"\n"}  ●  ●</Text>
            </View>
            <Text style={styles.transitionArrow}>→</Text>
            <View style={styles.statePillar}>
              <Text style={styles.stateIcon}>💨</Text>
              <Text style={styles.stateTitle}>{isTamil ? 'வாயு' : 'Gas'}</Text>
              <Text style={styles.stateDesc}>●     {"\n"}    ●   ●</Text>
            </View>
          </View>
          <View style={styles.diagramFooter}>
            <Text style={styles.captionTag}>
              {isTamil ? '+ வெப்பம் = அதிக இயக்க ஆற்றல்' : '+ Thermal Energy = Increased Particle Motion'}
            </Text>
          </View>
        </View>
      );

    case 'photosynthesis':
      return (
        <View style={styles.diagramBox}>
          <View style={styles.photosynthesisGrid}>
            <View style={styles.photoInputCol}>
              <Text style={styles.pillInput}>☀️ {isTamil ? 'சூரிய ஒளி' : 'Light'}</Text>
              <Text style={styles.pillInput}>💨 {isTamil ? 'CO₂ காற்று' : 'CO₂ (Air)'}</Text>
              <Text style={styles.pillInput}>💧 {isTamil ? 'H₂O நீர்' : 'H₂O (Roots)'}</Text>
            </View>
            <View style={styles.photoCenter}>
              <Text style={styles.leafIcon}>🍃</Text>
              <Text style={styles.photoCenterText}>{isTamil ? 'பசுங்கணிகம்' : 'Chloroplast'}</Text>
            </View>
            <View style={styles.photoOutputCol}>
              <Text style={styles.pillOutput}>🍯 {isTamil ? 'குளுக்கோஸ்' : 'Glucose'}</Text>
              <Text style={styles.pillOutput}>🌬️ {isTamil ? 'O₂ ஆக்சிஜன்' : 'Oxygen (O₂)'}</Text>
            </View>
          </View>
          <View style={styles.diagramFooter}>
            <Text style={styles.captionTag}>6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂</Text>
          </View>
        </View>
      );

    case 'cell_structure':
      return (
        <View style={styles.diagramBox}>
          <View style={styles.cellVisual}>
            <View style={styles.nucleusBadge}>
              <Text style={styles.nucleusText}>🧬 {isTamil ? 'உட்கரு (DNA)' : 'Nucleus (DNA)'}</Text>
            </View>
            <View style={styles.organelleRow}>
              <View style={styles.organelleChip}>
                <Text style={styles.organelleText}>⚡ {isTamil ? 'மைட்டோகாண்ட்ரியா' : 'Mitochondria (ATP)'}</Text>
              </View>
              <View style={styles.organelleChip}>
                <Text style={styles.organelleText}>🛡️ {isTamil ? 'செல் சவ்வு' : 'Cell Membrane'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.diagramFooter}>
            <Text style={styles.captionTag}>
              {isTamil ? 'செல்லின் அடிப்படை நுண்ணுறுப்புகள்' : 'Key Cellular Organelles'}
            </Text>
          </View>
        </View>
      );

    case 'dna_helix':
      return (
        <View style={styles.diagramBox}>
          <View style={styles.dnaLadder}>
            <View style={styles.dnaRung}>
              <Text style={styles.baseA}>[ A ]</Text>
              <Text style={styles.hydrogenBond}>- -</Text>
              <Text style={styles.baseT}>[ T ]</Text>
            </View>
            <View style={styles.dnaRung}>
              <Text style={styles.baseC}>[ C ]</Text>
              <Text style={styles.hydrogenBond}>≡ ≡</Text>
              <Text style={styles.baseG}>[ G ]</Text>
            </View>
            <View style={styles.dnaRung}>
              <Text style={styles.baseT}>[ T ]</Text>
              <Text style={styles.hydrogenBond}>- -</Text>
              <Text style={styles.baseA}>[ A ]</Text>
            </View>
          </View>
          <View style={styles.diagramFooter}>
            <Text style={styles.captionTag}>
              {isTamil ? 'கார இணை விதி: A=T மற்றும் C≡G' : 'Complementary Base Pairing: A=T & C≡G'}
            </Text>
          </View>
        </View>
      );

    case 'ph_scale':
      return (
        <View style={styles.diagramBox}>
          <View style={styles.phBarContainer}>
            <View style={[styles.phSegment, { backgroundColor: '#EF4444' }]}>
              <Text style={styles.phNum}>0-2</Text>
              <Text style={styles.phLabel}>{isTamil ? 'கடுமையான அமிலம்' : 'Acid'}</Text>
            </View>
            <View style={[styles.phSegment, { backgroundColor: '#F59E0B' }]}>
              <Text style={styles.phNum}>3-6</Text>
              <Text style={styles.phLabel}>{isTamil ? 'மென்மையான அமிலம்' : 'Mild'}</Text>
            </View>
            <View style={[styles.phSegment, { backgroundColor: '#10B981' }]}>
              <Text style={styles.phNum}>7</Text>
              <Text style={styles.phLabel}>{isTamil ? 'நடுநிலை' : 'Neutral'}</Text>
            </View>
            <View style={[styles.phSegment, { backgroundColor: '#3B82F6' }]}>
              <Text style={styles.phNum}>8-11</Text>
              <Text style={styles.phLabel}>{isTamil ? 'மென்மையான காரம்' : 'Mild'}</Text>
            </View>
            <View style={[styles.phSegment, { backgroundColor: '#8B5CF6' }]}>
              <Text style={styles.phNum}>12-14</Text>
              <Text style={styles.phLabel}>{isTamil ? 'கடுமையான காரம்' : 'Base'}</Text>
            </View>
          </View>
          <View style={styles.diagramFooter}>
            <Text style={styles.captionTag}>
              {isTamil ? 'pH < 7 = அமிலம் | pH = 7 தூய நீர் | pH > 7 = காரம்' : 'pH < 7 Acid | pH = 7 Neutral | pH > 7 Base'}
            </Text>
          </View>
        </View>
      );

    case 'human_heart':
      return (
        <View style={styles.diagramBox}>
          <View style={styles.heartQuad}>
            <View style={styles.heartTopRow}>
              <View style={[styles.chamberBox, { backgroundColor: '#DBEAFE' }]}>
                <Text style={styles.chamberTitle}>{isTamil ? 'வலது ஆரிக்கிள்' : 'Right Atrium'}</Text>
                <Text style={styles.chamberBlood}>💙 {isTamil ? 'அசுத்த இரத்தம்' : 'Deoxy Blood'}</Text>
              </View>
              <View style={[styles.chamberBox, { backgroundColor: '#FEE2E2' }]}>
                <Text style={styles.chamberTitle}>{isTamil ? 'இடது ஆரிக்கிள்' : 'Left Atrium'}</Text>
                <Text style={styles.chamberBlood}>❤️ {isTamil ? 'சுத்த இரத்தம்' : 'Oxy Blood'}</Text>
              </View>
            </View>
            <View style={styles.heartBottomRow}>
              <View style={[styles.chamberBox, { backgroundColor: '#BFDBFE' }]}>
                <Text style={styles.chamberTitle}>{isTamil ? 'வலது வென்ட்ரிக்கிள்' : 'Right Ventricle'}</Text>
                <Text style={styles.chamberBlood}>→ {isTamil ? 'நுரையீரலுக்கு' : 'To Lungs'}</Text>
              </View>
              <View style={[styles.chamberBox, { backgroundColor: '#FECACA' }]}>
                <Text style={styles.chamberTitle}>{isTamil ? 'இடது வென்ட்ரிக்கிள்' : 'Left Ventricle'}</Text>
                <Text style={styles.chamberBlood}>→ {isTamil ? 'உடல் முழுவதற்கும்' : 'To Body'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.diagramFooter}>
            <Text style={styles.captionTag}>
              {isTamil ? 'இதயத்தின் 4 அறைகள் மற்றும் இரத்த ஓட்டம்' : '4 Heart Chambers & Dual Circulation'}
            </Text>
          </View>
        </View>
      );

    case 'solar_system':
      return (
        <View style={styles.diagramBox}>
          <View style={styles.orbitsStack}>
            <View style={styles.orbitRing3}>
              <View style={styles.orbitRing2}>
                <View style={styles.orbitRing1}>
                  <Text style={styles.sunSymbol}>☀️</Text>
                  <Text style={styles.planetDot1}>🌑</Text>
                </View>
                <Text style={styles.planetDot2}>🌍</Text>
              </View>
              <Text style={styles.planetDot3}>🪐</Text>
            </View>
          </View>
          <View style={styles.diagramFooter}>
            <Text style={styles.captionTag}>
              {isTamil ? 'சூரியனைச் சுற்றும் நீள்வட்டப் பாதைகள்' : 'Elliptical Planetary Orbits Around Sun'}
            </Text>
          </View>
        </View>
      );

    default:
      // Generic science concept representation
      return (
        <View style={styles.diagramBox}>
          <View style={styles.defaultDiagram}>
            <Text style={styles.defaultIcon}>🔬</Text>
            <Text style={styles.defaultText}>
              {isTamil ? 'அறிவியல் வரைபடம் மற்றும் கருத்து விளக்கம்' : 'Scientific Concept Diagram'}
            </Text>
          </View>
          <View style={styles.diagramFooter}>
            <Text style={styles.captionTag}>
              {isTamil ? 'கண்கூடாகப் புரிந்துகொள்ளும் விளக்கம்' : 'Visual Learning Model'}
            </Text>
          </View>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  diagramBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diagramFooter: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    width: '100%',
    alignItems: 'center',
  },
  captionTag: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.navy700,
  },

  // Newton 1
  lawOneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
  },
  forceArrowLeft: {
    marginRight: theme.spacing.sm,
  },
  forceArrowRight: {
    marginLeft: theme.spacing.sm,
  },
  forceText: {
    fontSize: 11,
    color: theme.colors.slate600,
    fontWeight: '500',
  },
  boxObject: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.actionPrimary,
    alignItems: 'center',
  },
  boxObjectText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  boxSubtext: {
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 2,
  },

  // Newton 3
  rocketRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rocketGraphic: {
    alignItems: 'center',
  },
  rocketEmoji: {
    fontSize: 36,
  },
  vectorUp: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.success,
    marginTop: 4,
  },
  thrustGraphic: {
    alignItems: 'center',
    marginTop: 6,
  },
  exhaustFlame: {
    fontSize: 22,
  },
  vectorDown: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.error,
    marginTop: 2,
  },

  // Reflection
  opticsFrame: {
    alignItems: 'center',
    width: '100%',
  },
  rayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '85%',
    marginBottom: theme.spacing.sm,
  },
  rayLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.actionPrimary,
  },
  normalLine: {
    width: 2,
    height: 36,
    backgroundColor: '#94A3B8',
    borderStyle: 'dashed',
  },
  mirrorSurface: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.sm,
    width: '90%',
    alignItems: 'center',
  },
  mirrorText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.navy800,
  },

  // Circuit
  circuitLoop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    paddingVertical: theme.spacing.xs,
  },
  circuitItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minWidth: 80,
  },
  circuitIcon: {
    fontSize: 24,
  },
  circuitLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.navy800,
    marginTop: 4,
    textAlign: 'center',
  },
  circuitWire: {
    paddingHorizontal: theme.spacing.xs,
  },
  currentArrow: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
  },

  // States of Matter
  threeColumnStates: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  statePillar: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: 75,
  },
  stateIcon: {
    fontSize: 22,
  },
  stateTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginTop: 2,
  },
  stateDesc: {
    fontSize: 9,
    color: theme.colors.slate600,
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 12,
  },
  transitionArrow: {
    fontSize: 16,
    color: theme.colors.slate400,
    fontWeight: '700',
  },

  // Photosynthesis
  photosynthesisGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  photoInputCol: {
    gap: 4,
  },
  pillInput: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  photoCenter: {
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    padding: 10,
    borderRadius: theme.borderRadius.full,
  },
  leafIcon: {
    fontSize: 30,
  },
  photoCenterText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#166534',
    marginTop: 2,
  },
  photoOutputCol: {
    gap: 4,
  },
  pillOutput: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF',
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },

  // Cell
  cellVisual: {
    backgroundColor: '#FFFFFF',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: '#86EFAC',
    width: '90%',
    alignItems: 'center',
  },
  nucleusBadge: {
    backgroundColor: '#FAF5FF',
    borderWidth: 1.5,
    borderColor: '#D8B4FE',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.sm,
  },
  nucleusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7E22CE',
  },
  organelleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  organelleChip: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.sm,
  },
  organelleText: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.navy800,
  },

  // DNA
  dnaLadder: {
    backgroundColor: '#FFFFFF',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  dnaRung: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  baseA: { fontSize: 13, fontWeight: '700', color: '#DC2626' },
  baseT: { fontSize: 13, fontWeight: '700', color: '#2563EB' },
  baseC: { fontSize: 13, fontWeight: '700', color: '#D97706' },
  baseG: { fontSize: 13, fontWeight: '700', color: '#16A34A' },
  hydrogenBond: { fontSize: 13, color: '#94A3B8', fontWeight: '700' },

  // pH
  phBarContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  phSegment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  phNum: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  phLabel: {
    fontSize: 8,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // Heart
  heartQuad: {
    width: '90%',
    gap: 6,
  },
  heartTopRow: {
    flexDirection: 'row',
    gap: 6,
  },
  heartBottomRow: {
    flexDirection: 'row',
    gap: 6,
  },
  chamberBox: {
    flex: 1,
    padding: 8,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  chamberTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.navy900,
    textAlign: 'center',
  },
  chamberBlood: {
    fontSize: 10,
    color: theme.colors.slate600,
    marginTop: 2,
  },

  // Solar System
  orbitsStack: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    width: 120,
  },
  orbitRing3: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitRing2: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitRing1: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunSymbol: { fontSize: 18 },
  planetDot1: { position: 'absolute', top: -6, fontSize: 8 },
  planetDot2: { position: 'absolute', bottom: -6, fontSize: 10 },
  planetDot3: { position: 'absolute', right: -6, fontSize: 12 },

  // Default
  defaultDiagram: {
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  defaultIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.navy700,
  },
});
