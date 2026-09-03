/**
 * TimeMachineBoard Component
 * Chronological milestone ordering board for Game 18: Time Machine.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { TimeMachineLevel } from '../../../features/games/time-machine';

interface TimeMachineBoardProps {
  level: TimeMachineLevel;
  currentOrder: string[];
  feedback: { isCorrect: boolean } | null;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onVerifyTimeline: () => void;
  language?: 'en' | 'ta';
  verifyTimelineLabel?: string;
}

export const TimeMachineBoard: React.FC<TimeMachineBoardProps> = ({
  level,
  currentOrder,
  feedback,
  onMoveUp,
  onMoveDown,
  onVerifyTimeline,
  language = 'en',
  verifyTimelineLabel = 'Verify Timeline',
}) => {
  const eventMap = React.useMemo(() => {
    return new Map(level.events.map((e) => [e.id, e]));
  }, [level]);

  return (
    <View style={styles.container}>
      {/* Era Header */}
      <View style={styles.eraBanner}>
        <Text style={styles.eraText}>
          ⏳ {level.era[language] || level.era.en}
        </Text>
      </View>

      {/* Reorderable Events List */}
      <View style={styles.eventsList}>
        {currentOrder.map((eventId, idx) => {
          const ev = eventMap.get(eventId);
          if (!ev) return null;

          return (
            <View
              key={ev.id}
              style={[
                styles.eventCard,
                feedback?.isCorrect && styles.cardCorrect,
              ]}
            >
              {/* Event Icon & Order Index */}
              <View style={styles.orderIndexBadge}>
                <Text style={styles.orderIndexText}>{idx + 1}</Text>
              </View>

              <Text style={styles.eventIcon}>{ev.icon}</Text>

              {/* Event Details */}
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>
                  {ev.title[language] || ev.title.en}
                </Text>
                <Text style={styles.eventScientist}>
                  {ev.scientist[language] || ev.scientist.en}
                </Text>
                {feedback?.isCorrect ? (
                  <Text style={styles.eventYear}>{ev.yearDisplay}</Text>
                ) : null}
              </View>

              {/* Reorder Controls */}
              <View style={styles.controlsCol}>
                <TouchableOpacity
                  style={[styles.arrowBtn, idx === 0 && styles.arrowDisabled]}
                  onPress={() => onMoveUp(idx)}
                  disabled={idx === 0}
                  activeOpacity={0.7}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Move item up"
                >
                  <Text style={styles.arrowText}>▲</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.arrowBtn,
                    idx === currentOrder.length - 1 && styles.arrowDisabled,
                  ]}
                  onPress={() => onMoveDown(idx)}
                  disabled={idx === currentOrder.length - 1}
                  activeOpacity={0.7}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Move item down"
                >
                  <Text style={styles.arrowText}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        style={[styles.verifyButton, feedback?.isCorrect && styles.verifyButtonCorrect]}
        onPress={onVerifyTimeline}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={verifyTimelineLabel}
      >
        <Text style={styles.verifyButtonText}>{verifyTimelineLabel}</Text>
      </TouchableOpacity>
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
  eraBanner: {
    backgroundColor: '#FDF4FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: '#F0ABFC',
    marginBottom: 14,
  },
  eraText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#A21CAF',
  },
  eventsList: {
    width: '100%',
    gap: 10,
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    gap: 10,
  },
  cardCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  orderIndexBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderIndexText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
  },
  eventIcon: {
    fontSize: 26,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  eventScientist: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  eventYear: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
    marginTop: 2,
  },
  controlsCol: {
    gap: 4,
  },
  arrowBtn: {
    width: 32,
    height: 26,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowDisabled: {
    opacity: 0.3,
  },
  arrowText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
  },
  verifyButton: {
    width: '90%',
    backgroundColor: '#C026D3',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  verifyButtonCorrect: {
    backgroundColor: '#10B981',
  },
  verifyButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
