/**
 * ObservationCard Component
 * Displays real-time scientific observations, measured metric badges,
 * and Run A vs Run B comparison view.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import {
  ExperimentObservationRule,
  SimulationResult,
  RunSnapshot,
} from '../../features/experiment-lab/experiment.types';
import { SupportedLanguage } from '../../config/i18n';

interface ObservationCardProps {
  observations: ExperimentObservationRule[];
  result: SimulationResult;
  runA: RunSnapshot | null;
  language?: SupportedLanguage;
  onSnapshotRunA: () => void;
  onClearComparison: () => void;
}

export const ObservationCard: React.FC<ObservationCardProps> = ({
  observations,
  result,
  runA,
  language = 'en',
  onSnapshotRunA,
  onClearComparison,
}) => {
  const isTamil = language === 'ta';

  return (
    <View style={styles.card}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <Text style={styles.headerIcon}>🧐</Text>
          <Text style={styles.headerTitle}>
            {isTamil ? 'நீங்கள் என்ன கவனித்தீர்கள்?' : 'What Did You Observe?'}
          </Text>
        </View>

        {/* Snapshot / Compare Action */}
        <TouchableOpacity
          style={styles.compareButton}
          onPress={runA ? onClearComparison : onSnapshotRunA}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={
            runA
              ? isTamil
                ? 'ஒப்பீட்டை அழிக்க'
                : 'Clear Run Comparison'
              : isTamil
              ? 'இயக்கம் A என சேமிக்க'
              : 'Save as Run A for Comparison'
          }
        >
          <Text style={styles.compareButtonText}>
            {runA
              ? isTamil
                ? '✕ ஒப்பீட்டை அழி'
                : '✕ Clear Compare'
              : isTamil
              ? '📸 இயக்கம் A ஆக சேமி'
              : '📸 Set as Run A'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Measured Metrics Badges */}
      <View style={styles.metricsRow}>
        {result.metrics.map((m) => (
          <View key={m.id} style={styles.metricBadge}>
            <Text style={styles.metricLabel}>{isTamil ? m.label.ta : m.label.en}</Text>
            <Text style={styles.metricValue}>{m.formattedValue}</Text>
          </View>
        ))}
      </View>

      {/* Active Observations List */}
      {observations.length > 0 ? (
        <View style={styles.observationsContainer}>
          {observations.map((obs) => (
            <View key={obs.id} style={styles.observationItem}>
              <View style={styles.observationHeader}>
                <Text style={styles.observationBullet}>💡</Text>
                <Text style={styles.observationTitle}>{isTamil ? obs.title.ta : obs.title.en}</Text>
              </View>
              <Text style={styles.observationText}>{isTamil ? obs.text.ta : obs.text.en}</Text>
              <View style={styles.explanationBox}>
                <Text style={styles.explanationLabel}>{isTamil ? 'அறிவியல் காரணம்:' : 'Science Explanation:'}</Text>
                <Text style={styles.explanationText}>{isTamil ? obs.explanation.ta : obs.explanation.en}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.idleObservation}>
          <Text style={styles.idleText}>
            {isTamil
              ? 'மாறிகளை மாற்றி உருவகப்படுத்துதலை இயக்கவும்.'
              : 'Adjust variables to discover key scientific behaviors.'}
          </Text>
        </View>
      )}

      {/* Side-by-Side Run Comparison View */}
      {runA && (
        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonHeaderTitle}>
            {isTamil ? '📊 இயக்கங்களின் ஒப்பீடு (Run Comparison)' : '📊 Run Comparison (Run A vs Current)'}
          </Text>

          <View style={styles.comparisonColumns}>
            {/* Run A */}
            <View style={styles.comparisonCol}>
              <View style={[styles.colBadge, { backgroundColor: '#F1F5F9' }]}>
                <Text style={styles.colBadgeText}>{isTamil ? 'இயக்கம் A' : 'Run A (Snapshot)'}</Text>
              </View>
              {runA.result.metrics.map((m) => (
                <View key={m.id} style={styles.compareMetricItem}>
                  <Text style={styles.compareMetricLabel}>{isTamil ? m.label.ta : m.label.en}</Text>
                  <Text style={styles.compareMetricVal}>{m.formattedValue}</Text>
                </View>
              ))}
            </View>

            {/* Run B (Current) */}
            <View style={[styles.comparisonCol, styles.comparisonColCurrent]}>
              <View style={[styles.colBadge, { backgroundColor: '#DBEAFE' }]}>
                <Text style={[styles.colBadgeText, { color: colors.blue700 }]}>
                  {isTamil ? 'இயக்கம் B (தற்போதைய)' : 'Run B (Current)'}
                </Text>
              </View>
              {result.metrics.map((m) => (
                <View key={m.id} style={styles.compareMetricItem}>
                  <Text style={styles.compareMetricLabel}>{isTamil ? m.label.ta : m.label.en}</Text>
                  <Text style={[styles.compareMetricVal, { color: colors.blue700 }]}>{m.formattedValue}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.navy900,
  },
  compareButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  compareButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.slate600,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  metricBadge: {
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minWidth: 100,
  },
  metricLabel: {
    fontSize: 11,
    color: colors.slate600,
    fontWeight: '500',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.navy900,
  },
  observationsContainer: {
    gap: 10,
  },
  observationItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.blue600,
  },
  observationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  observationBullet: {
    fontSize: 14,
  },
  observationTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.navy900,
  },
  observationText: {
    fontSize: 13,
    color: colors.navy800,
    lineHeight: 18,
    marginBottom: 6,
  },
  explanationBox: {
    backgroundColor: colors.white,
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  explanationLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.blue600,
    marginBottom: 2,
  },
  explanationText: {
    fontSize: 12,
    color: colors.slate600,
    lineHeight: 16,
  },
  idleObservation: {
    padding: 12,
    alignItems: 'center',
  },
  idleText: {
    fontSize: 12,
    color: colors.slate500,
    fontStyle: 'italic',
  },
  comparisonSection: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  comparisonHeaderTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.navy900,
    marginBottom: 8,
  },
  comparisonColumns: {
    flexDirection: 'row',
    gap: 10,
  },
  comparisonCol: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  comparisonColCurrent: {
    borderColor: '#BFDBFE',
    backgroundColor: '#EFF6FF',
  },
  colBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  colBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.slate600,
  },
  compareMetricItem: {
    marginBottom: 6,
  },
  compareMetricLabel: {
    fontSize: 10,
    color: colors.slate500,
  },
  compareMetricVal: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.navy900,
  },
});
