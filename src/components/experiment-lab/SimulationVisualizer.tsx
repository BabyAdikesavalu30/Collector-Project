/**
 * SimulationVisualizer Component
 * Pure React Native interactive visual representations of scientific phenomena.
 * Built entirely with native Views, animated progress meters, and geometry indicators.
 * Respects accessibility with full text alternatives and reduced motion.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import { Experiment, SimulationResult } from '../../features/experiment-lab/experiment.types';
import { SupportedLanguage } from '../../config/i18n';

interface SimulationVisualizerProps {
  experiment: Experiment;
  result: SimulationResult;
  language?: SupportedLanguage;
}

export const SimulationVisualizer: React.FC<SimulationVisualizerProps> = ({
  experiment,
  result,
  language = 'en',
}) => {
  const isTamil = language === 'ta';
  const { visualState } = result;

  const renderVisualContent = () => {
    switch (experiment.simulationId) {
      // 1. Ohm's Law
      case 'ohms_law': {
        const brightness = Number(visualState.bulbBrightnessPct) || 10;
        const voltage = Number(visualState.voltage) || 1;
        const resistance = Number(visualState.resistance) || 1;
        const currentA = Number(visualState.currentA) || 0;

        return (
          <View style={styles.canvas}>
            <View style={styles.circuitDiagram}>
              {/* Battery source */}
              <View style={styles.componentBox}>
                <Text style={styles.componentIcon}>🔋</Text>
                <Text style={styles.componentValue}>{voltage} V</Text>
                <Text style={styles.componentSub}>{isTamil ? 'மின்னழுத்தம்' : 'Battery'}</Text>
              </View>

              {/* Connecting Wire */}
              <View style={styles.circuitWireHorizontal} />

              {/* Resistor */}
              <View style={styles.componentBox}>
                <Text style={styles.componentIcon}>⚡</Text>
                <Text style={styles.componentValue}>{resistance} Ω</Text>
                <Text style={styles.componentSub}>{isTamil ? 'மின்தடை' : 'Resistor'}</Text>
              </View>

              {/* Connecting Wire */}
              <View style={styles.circuitWireHorizontal} />

              {/* Glowing Bulb */}
              <View style={styles.componentBox}>
                <View
                  style={[
                    styles.bulbGlow,
                    {
                      backgroundColor: `rgba(217, 119, 6, ${Math.max(0.2, brightness / 100)})`,
                      shadowOpacity: Math.min(1, brightness / 80),
                    },
                  ]}
                >
                  <Text style={styles.componentIcon}>💡</Text>
                </View>
                <Text style={styles.componentValue}>{currentA} A</Text>
                <Text style={styles.componentSub}>{isTamil ? 'மின்னோட்டம்' : 'Current'}</Text>
              </View>
            </View>

            {/* Brightness Gauge Bar */}
            <View style={styles.meterContainer}>
              <View style={styles.meterHeader}>
                <Text style={styles.meterLabel}>{isTamil ? 'விளக்கின் பிரகாசம்' : 'Bulb Brightness'}</Text>
                <Text style={styles.meterValue}>{brightness}%</Text>
              </View>
              <View style={styles.meterTrack}>
                <View style={[styles.meterFill, { width: `${brightness}%`, backgroundColor: colors.textGold }]} />
              </View>
            </View>
          </View>
        );
      }

      // 2. Density
      case 'density': {
        const sinks = Boolean(visualState.sinks);
        const density = Number(visualState.density) || 1;
        const mass = Number(visualState.mass) || 50;
        const volume = Number(visualState.volume) || 50;

        return (
          <View style={styles.canvas}>
            <View style={styles.beakerContainer}>
              <View style={styles.waterTank}>
                {/* Water surface label */}
                <View style={styles.waterSurfaceLine}>
                  <Text style={styles.waterSurfaceText}>
                    {isTamil ? 'நீர் மட்டம் (1.0 கி/செ.மீ³)' : 'Water Level (1.0 g/cm³)'}
                  </Text>
                </View>

                {/* Floating or sunken block */}
                <View
                  style={[
                    styles.densityBlock,
                    sinks ? styles.densityBlockSunken : styles.densityBlockFloating,
                    { backgroundColor: sinks ? colors.error : colors.accentBlue },
                  ]}
                >
                  <Text style={styles.densityBlockText}>{mass}g</Text>
                  <Text style={styles.densityBlockSub}>{volume}cm³</Text>
                </View>
              </View>
            </View>

            <View style={styles.densityStatusBadge}>
              <Text style={styles.densityStatusText}>
                {sinks
                  ? (isTamil ? `⚠️ அடர்த்தி ${density} > 1.0 (மூழ்குகிறது)` : `⚠️ Density ${density} > 1.0 (Sinks)`)
                  : (isTamil ? `✨ அடர்த்தி ${density} < 1.0 (மிதக்கிறது)` : `✨ Density ${density} < 1.0 (Floats)`)}
              </Text>
            </View>
          </View>
        );
      }

      // 3. Reflection
      case 'reflection': {
        const angle = Number(visualState.incidenceAngle) || 0;

        return (
          <View style={styles.canvas}>
            <View style={styles.opticsBox}>
              <View style={styles.rayIndicatorRow}>
                <View style={styles.rayBadge}>
                  <Text style={styles.rayBadgeText}>
                    {isTamil ? `படுகதிர் i = ${angle}°` : `Incident Ray i = ${angle}°`}
                  </Text>
                </View>
                <View style={[styles.rayBadge, { backgroundColor: '#F3E8FF', borderColor: '#D8B4FE' }]}>
                  <Text style={[styles.rayBadgeText, { color: colors.purple700 }]}>
                    {isTamil ? `எதிரொளிப்பு r = ${angle}°` : `Reflected Ray r = ${angle}°`}
                  </Text>
                </View>
              </View>

              <View style={styles.mirrorContainer}>
                {/* Normal line */}
                <View style={styles.normalDashedLine} />

                {/* Left ray indicator */}
                <View style={[styles.rayLine, { transform: [{ rotate: `${-angle / 2}deg` }] }]} />

                {/* Right ray indicator */}
                <View style={[styles.rayLine, { transform: [{ rotate: `${angle / 2}deg` }] }]} />

                {/* Mirror surface */}
                <View style={styles.mirrorSurface}>
                  <Text style={styles.mirrorText}>{isTamil ? 'சமதள ஆடி (Plane Mirror)' : 'Plane Mirror Surface'}</Text>
                </View>
              </View>
            </View>
          </View>
        );
      }

      // 4. Refraction
      case 'refraction': {
        const angle1 = Number(visualState.incidenceAngle) || 45;
        const angle2 = Number(visualState.refractionAngle) || 30;
        const isTIR = Boolean(visualState.isTotalInternalReflection);

        return (
          <View style={styles.canvas}>
            <View style={styles.refractionMediumBoxTop}>
              <Text style={styles.mediumLabel}>{isTamil ? 'காற்று (Air, n=1.0)' : 'Medium 1: Air (n=1.0)'}</Text>
              <Text style={styles.mediumAngle}>{isTamil ? `படுகோணம் = ${angle1}°` : `Incident θ₁ = ${angle1}°`}</Text>
            </View>

            <View style={styles.refractionBoundaryLine} />

            <View style={styles.refractionMediumBoxBottom}>
              <Text style={styles.mediumLabel}>
                {isTamil ? `இரண்டாம் ஊடகம் (விலகல் கோணம் = ${angle2}°)` : `Medium 2 (Refracted θ₂ = ${angle2}°)`}
              </Text>
              <Text style={styles.mediumSub}>
                {isTIR
                  ? (isTamil ? 'முழு அக எதிரொளிப்பு!' : 'Total Internal Reflection!')
                  : isTamil
                  ? 'ஒளிக்கதிர் செங்குத்துக் கோட்டை நோக்கி வளைகிறது'
                  : 'Ray bends toward the normal line'}
              </Text>
            </View>
          </View>
        );
      }

      // 5. Free Fall
      case 'free_fall': {
        const heightM = Number(visualState.heightM) || 20;
        const fallTimeS = Number(visualState.fallTimeS) || 2;
        const speed = Number(visualState.impactSpeedMs) || 19.8;

        return (
          <View style={styles.canvas}>
            <View style={styles.freeFallContainer}>
              <View style={styles.heightRuler}>
                <Text style={styles.rulerTop}>{heightM}m</Text>
                <View style={styles.rulerBar} />
                <Text style={styles.rulerBottom}>0m (Ground)</Text>
              </View>

              <View style={styles.fallingObjectColumn}>
                <View style={styles.fallingSphere}>
                  <Text style={styles.sphereIcon}>⚽</Text>
                </View>
                <Text style={styles.velocityArrowText}>↓ {speed} m/s</Text>
              </View>
            </View>

            <View style={styles.meterContainer}>
              <Text style={styles.meterLabel}>
                {isTamil ? `விழும் நேரம்: ${fallTimeS} விநாடி` : `Fall Duration: ${fallTimeS} seconds`}
              </Text>
            </View>
          </View>
        );
      }

      // 6. Simple Pendulum
      case 'pendulum': {
        const lengthM = Number(visualState.lengthM) || 1;
        const periodS = Number(visualState.periodS) || 2;
        const massG = Number(visualState.massG) || 100;

        return (
          <View style={styles.canvas}>
            <View style={styles.pendulumCeiling}>
              <View style={styles.pendulumMount} />
              <View style={[styles.pendulumString, { height: Math.min(120, Math.max(50, lengthM * 50)) }]} />
              <View style={styles.pendulumBob}>
                <Text style={styles.bobText}>{massG}g</Text>
              </View>
            </View>

            <View style={styles.meterContainer}>
              <View style={styles.meterHeader}>
                <Text style={styles.meterLabel}>{isTamil ? 'அலைவு நேரம் (Period T)' : 'Oscillation Period (T)'}</Text>
                <Text style={styles.meterValue}>{periodS} s</Text>
              </View>
            </View>
          </View>
        );
      }

      // 7. pH Explorer
      case 'ph_explorer': {
        const ph = Number(visualState.ph) || 7;
        const color = String(visualState.indicatorColor || '#10B981');

        return (
          <View style={styles.canvas}>
            <View style={styles.phVisualRow}>
              <View style={[styles.phTube, { borderColor: color }]}>
                <View style={[styles.phLiquid, { backgroundColor: color }]}>
                  <Text style={styles.phTubeText}>pH {ph}</Text>
                </View>
              </View>

              <View style={styles.phScaleLegend}>
                <View style={[styles.phSegment, { backgroundColor: '#EF4444' }]}>
                  <Text style={styles.phSegmentText}>0-3 Acid</Text>
                </View>
                <View style={[styles.phSegment, { backgroundColor: '#FBBF24' }]}>
                  <Text style={styles.phSegmentText}>4-6 Weak</Text>
                </View>
                <View style={[styles.phSegment, { backgroundColor: '#10B981' }]}>
                  <Text style={styles.phSegmentText}>7 Neutral</Text>
                </View>
                <View style={[styles.phSegment, { backgroundColor: '#3B82F6' }]}>
                  <Text style={styles.phSegmentText}>8-11 Base</Text>
                </View>
                <View style={[styles.phSegment, { backgroundColor: '#8B5CF6' }]}>
                  <Text style={styles.phSegmentText}>12-14 Strong</Text>
                </View>
              </View>
            </View>
          </View>
        );
      }

      // 8. Solubility
      case 'solubility': {
        const dissolved = Number(visualState.dissolved) || 0;
        const residue = Number(visualState.residue) || 0;
        const tempC = Number(visualState.tempC) || 20;

        return (
          <View style={styles.canvas}>
            <View style={styles.solubilityBeaker}>
              <Text style={styles.tempBadge}>🔥 {tempC}°C</Text>
              <View style={styles.solubilityLiquid}>
                <Text style={styles.solubilityLabel}>
                  {isTamil ? `கரைந்த சர்க்கரை: ${dissolved}g` : `Dissolved Solute: ${dissolved}g`}
                </Text>
              </View>
              {residue > 0 && (
                <View style={styles.solubilityResidueBox}>
                  <Text style={styles.solubilityResidueText}>
                    {isTamil ? `கரையாத படிவு: ${residue}g` : `Undissolved Residue: ${residue}g`}
                  </Text>
                </View>
              )}
            </View>
          </View>
        );
      }

      // 9. States of Matter
      case 'states_of_matter': {
        const state = String(visualState.state || 'liquid');
        const kineticPct = Number(visualState.kineticPct) || 50;

        return (
          <View style={styles.canvas}>
            <View style={styles.particlesContainer}>
              <View style={styles.particlesGrid}>
                {Array.from({ length: 16 }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.particleDot,
                      state === 'solid' && styles.particleSolid,
                      state === 'liquid' && styles.particleLiquid,
                      state === 'gas' && styles.particleGas,
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.particleStateTitle}>
                {state.toUpperCase()} · {kineticPct}% Kinetic Motion
              </Text>
            </View>
          </View>
        );
      }

      // 10. Reaction Rate
      case 'reaction_rate': {
        const rate = Number(visualState.rateMultiplier) || 1;
        const time = Number(visualState.completionTimeS) || 60;

        return (
          <View style={styles.canvas}>
            <View style={styles.reactionFlask}>
              <Text style={styles.flaskIcon}>⚗️</Text>
              <View style={styles.bubbleRow}>
                <Text style={styles.bubbleIcon}>🫧</Text>
                <Text style={styles.bubbleIcon}>🫧</Text>
                <Text style={styles.bubbleIcon}>🫧</Text>
              </View>
            </View>

            <View style={styles.meterContainer}>
              <View style={styles.meterHeader}>
                <Text style={styles.meterLabel}>{isTamil ? 'வினை வேகம் (மடங்கு)' : 'Speed Multiplier'}</Text>
                <Text style={styles.meterValue}>{rate}x</Text>
              </View>
              <Text style={styles.meterSub}>
                {isTamil ? `சுமார் ${time} விநாடிகளில் முடிவடையும்` : `Completes in ~${time} seconds`}
              </Text>
            </View>
          </View>
        );
      }

      // 11. Photosynthesis
      case 'photosynthesis': {
        const rate = Number(visualState.ratePct) || 50;
        const bubbles = Number(visualState.oxygenBubblesPerMin) || 20;

        return (
          <View style={styles.canvas}>
            <View style={styles.biologyRow}>
              <View style={styles.bioPlantBox}>
                <Text style={styles.plantIcon}>🌿</Text>
                <Text style={styles.plantSub}>CO₂ + H₂O + Light</Text>
              </View>
              <View style={styles.bioArrowBox}>
                <Text style={styles.bioArrowText}>→</Text>
                <Text style={styles.bioBubbleLabel}>🫧 {bubbles} O₂/min</Text>
              </View>
            </View>

            <View style={styles.meterContainer}>
              <View style={styles.meterHeader}>
                <Text style={styles.meterLabel}>{isTamil ? 'ஒளிச்சேர்க்கை வீதம்' : 'Photosynthesis Activity'}</Text>
                <Text style={styles.meterValue}>{rate}%</Text>
              </View>
              <View style={styles.meterTrack}>
                <View style={[styles.meterFill, { width: `${rate}%`, backgroundColor: colors.success }]} />
              </View>
            </View>
          </View>
        );
      }

      // 12. Heart Rate
      case 'heart_rate': {
        const bpm = Number(visualState.currentBpm) || 72;
        const respiration = Number(visualState.respiration) || 16;

        return (
          <View style={styles.canvas}>
            <View style={styles.ecgCard}>
              <Text style={styles.heartIcon}>💓</Text>
              <Text style={styles.ecgBpmText}>{bpm} BPM</Text>
              <Text style={styles.ecgWaveText}>──/\_/\──/\_/\──/\_/\──</Text>
            </View>

            <View style={styles.meterContainer}>
              <Text style={styles.meterLabel}>
                {isTamil ? `சுவாச விகிதம்: ${respiration} சுவாசம்/நிமி` : `Breathing Rate: ${respiration} breaths/min`}
              </Text>
            </View>
          </View>
        );
      }

      // 13. Water Cycle
      case 'water_cycle': {
        const evap = Number(visualState.evaporationIndex) || 50;
        const rain = Number(visualState.precipitationRate) || 0;

        return (
          <View style={styles.canvas}>
            <View style={styles.waterCycleContainer}>
              <View style={styles.cloudRow}>
                <Text style={styles.cloudIcon}>☁️☁️</Text>
                {rain > 0 && <Text style={styles.rainIcon}>🌧️</Text>}
              </View>
              <View style={styles.evapArrows}>
                <Text style={styles.evapText}>↑ ↑ ↑ (Evaporation {evap}%)</Text>
              </View>
              <View style={styles.seaWaterLine}>
                <Text style={styles.seaText}>🌊 {isTamil ? 'பெருங்கடல் / நீர்நிலை' : 'Ocean / Water Reservoir'}</Text>
              </View>
            </View>
          </View>
        );
      }

      // 14. Greenhouse Effect
      case 'greenhouse_effect': {
        const heat = Number(visualState.trappedHeatPct) || 30;
        const temp = Number(visualState.averageTempC) || 15;

        return (
          <View style={styles.canvas}>
            <View style={styles.greenhouseContainer}>
              <View style={styles.atmosphereLayer}>
                <Text style={styles.atmosphereText}>{isTamil ? 'பசுமைக்குடில் வாயு அடுக்கு' : 'Atmospheric GHG Layer'}</Text>
              </View>
              <View style={styles.heatTrapBox}>
                <Text style={styles.heatTrapText}>♨️ {heat}% {isTamil ? 'வெப்பத் தேக்கம்' : 'Trapped Heat'}</Text>
                <Text style={styles.tempReadout}>🌡️ {temp} °C</Text>
              </View>
              <View style={styles.earthGround}>
                <Text style={styles.groundText}>🌍 {isTamil ? 'பூமியின் மேற்பரப்பு' : "Earth's Surface"}</Text>
              </View>
            </View>
          </View>
        );
      }

      // 15. Moon Phases
      case 'moon_phases': {
        const day = Number(visualState.dayOfOrbit) || 14;
        const illum = Number(visualState.illuminationPct) || 100;
        // moon_phases is the only simulation that stores a bilingual phaseTitle.
        // The runtime shape is { en: string; ta: string } | undefined; we assert it
        // defensively rather than weakening the shared SimulationResult type.
        const phaseTitleRaw = visualState.phaseTitle as
          | { en: string; ta: string }
          | undefined;
        const phaseTitle =
          isTamil && phaseTitleRaw?.ta
            ? phaseTitleRaw.ta
            : phaseTitleRaw?.en || 'Full Moon';

        return (
          <View style={styles.canvas}>
            <View style={styles.moonDisplay}>
              <Text style={styles.moonIconLarge}>
                {illum > 80 ? '🌕' : illum > 40 ? '🌗' : illum > 0 ? '🌒' : '🌑'}
              </Text>
              <Text style={styles.moonPhaseTitle}>{phaseTitle}</Text>
              <Text style={styles.moonDaySub}>
                {isTamil ? `நாள் ${day}/28 (${illum}% வெளிச்சம்)` : `Day ${day} of 28 (${illum}% Illumination)`}
              </Text>
            </View>
          </View>
        );
      }

      default:
        return null;
    }
  };

  return (
    <View style={styles.wrapper}>
      {renderVisualContent()}

      {/* Accessible Text Readout Banner */}
      <View style={styles.summaryBanner}>
        <Text style={styles.summaryIcon}>🔬</Text>
        <Text style={styles.summaryText}>
          {isTamil ? result.summaryText.ta : result.summaryText.en}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  canvas: {
    backgroundColor: colors.pearlWhite,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },
  circuitDiagram: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  componentBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 70,
  },
  componentIcon: {
    fontSize: 26,
  },
  componentValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.navy900,
    marginTop: 2,
  },
  componentSub: {
    fontSize: 10,
    color: colors.slate500,
  },
  circuitWireHorizontal: {
    flex: 1,
    height: 4,
    backgroundColor: colors.slate400,
  },
  bulbGlow: {
    borderRadius: 20,
    padding: 4,
    shadowColor: colors.textGold,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
  },
  meterContainer: {
    width: '100%',
    marginTop: 14,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  meterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  meterLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.navy800,
  },
  meterValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.blue600,
  },
  meterSub: {
    fontSize: 11,
    color: colors.slate500,
    marginTop: 4,
  },
  meterTrack: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    borderRadius: 4,
  },
  beakerContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  waterTank: {
    width: '90%',
    height: 100,
    backgroundColor: colors.infoSurface,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderWidth: 2,
    borderColor: colors.accentBlue,
    borderTopWidth: 0,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  waterSurfaceLine: {
    position: 'absolute',
    top: 4,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.accentBlue,
    alignItems: 'center',
  },
  waterSurfaceText: {
    fontSize: 10,
    color: colors.accentBlue,
    fontWeight: '600',
  },
  densityBlock: {
    width: 60,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  densityBlockFloating: {
    position: 'absolute',
    top: 6,
  },
  densityBlockSunken: {
    position: 'absolute',
    bottom: 6,
  },
  densityBlockText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  densityBlockSub: {
    color: colors.white,
    fontSize: 9,
    opacity: 0.9,
  },
  densityStatusBadge: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  densityStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.navy900,
  },
  opticsBox: {
    width: '100%',
    alignItems: 'center',
  },
  rayIndicatorRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  rayBadge: {
    backgroundColor: colors.infoBackground,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.infoBorder,
  },
  rayBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.blue700,
  },
  mirrorContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  normalDashedLine: {
    position: 'absolute',
    bottom: 12,
    width: 2,
    height: 60,
    backgroundColor: colors.slate500,
  },
  rayLine: {
    position: 'absolute',
    bottom: 12,
    width: 3,
    height: 55,
    backgroundColor: colors.accentBlue,
    borderRadius: 2,
  },
  mirrorSurface: {
    width: '100%',
    height: 12,
    backgroundColor: colors.slate400,
    borderTopWidth: 2,
    borderTopColor: colors.navy700,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mirrorText: {
    fontSize: 9,
    color: colors.white,
    fontWeight: '600',
  },
  refractionMediumBoxTop: {
    width: '100%',
    padding: 12,
    backgroundColor: colors.pearlWhite,
    alignItems: 'center',
  },
  refractionBoundaryLine: {
    width: '100%',
    height: 2,
    backgroundColor: colors.accentBlue,
  },
  refractionMediumBoxBottom: {
    width: '100%',
    padding: 16,
    backgroundColor: colors.infoSurface,
    alignItems: 'center',
  },
  mediumLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.navy900,
  },
  mediumAngle: {
    fontSize: 11,
    color: colors.blue600,
    fontWeight: '600',
    marginTop: 2,
  },
  mediumSub: {
    fontSize: 11,
    color: colors.accentBlue,
    marginTop: 2,
  },
  freeFallContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  heightRuler: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
  rulerTop: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.navy800,
  },
  rulerBar: {
    width: 4,
    flex: 1,
    backgroundColor: colors.surfaceBorder,
    marginVertical: 4,
  },
  rulerBottom: {
    fontSize: 10,
    color: colors.slate500,
  },
  fallingObjectColumn: {
    alignItems: 'center',
  },
  fallingSphere: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  sphereIcon: {
    fontSize: 22,
  },
  velocityArrowText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.error,
    marginTop: 6,
  },
  pendulumCeiling: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  pendulumMount: {
    width: 60,
    height: 6,
    backgroundColor: colors.navy700,
    borderRadius: 3,
  },
  pendulumString: {
    width: 2,
    backgroundColor: colors.slate600,
  },
  pendulumBob: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bobText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  phVisualRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  phTube: {
    width: 65,
    height: 110,
    borderWidth: 3,
    borderTopWidth: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  phLiquid: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phTubeText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 14,
  },
  phScaleLegend: {
    gap: 4,
  },
  phSegment: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  phSegmentText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  solubilityBeaker: {
    width: '80%',
    height: 110,
    backgroundColor: colors.infoSurface,
    borderWidth: 2,
    borderColor: colors.accentBlue,
    borderTopWidth: 0,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    justifyContent: 'space-between',
    padding: 8,
  },
  tempBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.warning,
    alignSelf: 'flex-end',
  },
  solubilityLiquid: {
    alignItems: 'center',
  },
  solubilityLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.navy800,
  },
  solubilityResidueBox: {
    backgroundColor: colors.warningSurface,
    padding: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  solubilityResidueText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.warning,
  },
  particlesContainer: {
    alignItems: 'center',
    width: '100%',
  },
  particlesGrid: {
    width: 140,
    height: 90,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
  },
  particleDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    margin: 4,
  },
  particleSolid: {
    backgroundColor: colors.accentBlue,
  },
  particleLiquid: {
    backgroundColor: colors.accentTeal,
  },
  particleGas: {
    backgroundColor: colors.textGold,
  },
  particleStateTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.navy800,
    marginTop: 8,
  },
  reactionFlask: {
    alignItems: 'center',
  },
  flaskIcon: {
    fontSize: 44,
  },
  bubbleRow: {
    flexDirection: 'row',
    gap: 6,
  },
  bubbleIcon: {
    fontSize: 16,
  },
  biologyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  bioPlantBox: {
    alignItems: 'center',
  },
  plantIcon: {
    fontSize: 40,
  },
  plantSub: {
    fontSize: 10,
    color: colors.slate600,
  },
  bioArrowBox: {
    alignItems: 'center',
  },
  bioArrowText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.success,
  },
  bioBubbleLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.navy800,
  },
  ecgCard: {
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 36,
  },
  ecgBpmText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.error,
    marginTop: 4,
  },
  ecgWaveText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.error,
    letterSpacing: 2,
  },
  waterCycleContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 6,
  },
  cloudRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cloudIcon: {
    fontSize: 32,
  },
  rainIcon: {
    fontSize: 26,
  },
  evapArrows: {
    paddingVertical: 2,
  },
  evapText: {
    fontSize: 11,
    color: colors.accentBlue,
    fontWeight: '700',
  },
  seaWaterLine: {
    width: '90%',
    padding: 6,
    backgroundColor: colors.infoSurface,
    borderRadius: 8,
    alignItems: 'center',
  },
  seaText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.accentBlue,
  },
  greenhouseContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  atmosphereLayer: {
    width: '90%',
    padding: 6,
    backgroundColor: colors.warningSurface,
    borderRadius: 6,
    alignItems: 'center',
  },
  atmosphereText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.warning,
  },
  heatTrapBox: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  heatTrapText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.error,
  },
  tempReadout: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.warning,
  },
  earthGround: {
    width: '90%',
    padding: 6,
    backgroundColor: colors.successSurface,
    borderRadius: 6,
    alignItems: 'center',
  },
  groundText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.success,
  },
  moonDisplay: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  moonIconLarge: {
    fontSize: 54,
  },
  moonPhaseTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.navy900,
    marginTop: 4,
  },
  moonDaySub: {
    fontSize: 12,
    color: colors.slate600,
    marginTop: 2,
  },
  summaryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.infoBackground,
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.infoBorder,
    gap: 10,
  },
  summaryIcon: {
    fontSize: 18,
  },
  summaryText: {
    flex: 1,
    fontSize: 13,
    color: colors.navy800,
    lineHeight: 18,
    fontWeight: '500',
  },
});
