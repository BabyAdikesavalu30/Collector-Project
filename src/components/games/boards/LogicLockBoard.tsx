/**
 * LogicLockBoard Component
 * Multi-dial interactive vault dials and clues panel for Game 15: Logic Lock.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { LogicLockLevel } from '../../../features/games/logic-lock';

interface LogicLockBoardProps {
  level: LogicLockLevel;
  currentGuess: string[];
  feedback: { isCorrect: boolean } | null;
  onDigitChange: (dialIndex: number, delta: number) => void;
  onCheckCode: () => void;
  language?: 'en' | 'ta';
  cluesTitle?: string;
  checkCodeLabel?: string;
}

export const LogicLockBoard: React.FC<LogicLockBoardProps> = ({
  level,
  currentGuess,
  feedback,
  onDigitChange,
  onCheckCode,
  language = 'en',
  cluesTitle = 'Deductive Clues:',
  checkCodeLabel = 'Check Code',
}) => {
  return (
    <View style={styles.container}>
      {/* Vault Dials Area */}
      <View style={styles.dialsCard}>
        <View style={styles.dialsRow}>
          {currentGuess.map((digit, idx) => (
            <View key={`dial-${idx}`} style={styles.dialContainer}>
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={() => onDigitChange(idx, 1)}
                activeOpacity={0.7}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Increment dial ${idx + 1}`}
              >
                <Text style={styles.arrowText}>▲</Text>
              </TouchableOpacity>

              <View style={styles.dialWindow}>
                <Text style={styles.dialDigit}>{digit}</Text>
              </View>

              <TouchableOpacity
                style={styles.arrowButton}
                onPress={() => onDigitChange(idx, -1)}
                activeOpacity={0.7}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Decrement dial ${idx + 1}`}
              >
                <Text style={styles.arrowText}>▼</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Check Button */}
        <TouchableOpacity
          style={[styles.checkButton, feedback?.isCorrect && styles.checkButtonCorrect]}
          onPress={onCheckCode}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={checkCodeLabel}
        >
          <Text style={styles.checkButtonText}>{checkCodeLabel}</Text>
        </TouchableOpacity>
      </View>

      {/* Clues Panel */}
      <View style={styles.cluesCard}>
        <Text style={styles.cluesHeader}>{cluesTitle}</Text>
        {level.clues.map((clue, idx) => (
          <View key={`clue-${idx}`} style={styles.clueRow}>
            {/* Clue Guess Digits */}
            <View style={styles.clueDigits}>
              {clue.guess.map((d, dIdx) => (
                <View key={`cg-${idx}-${dIdx}`} style={styles.clueDigitBox}>
                  <Text style={styles.clueDigitText}>{d}</Text>
                </View>
              ))}
            </View>

            {/* Clue Badge & Hint */}
            <View style={styles.clueContent}>
              <Text style={styles.clueBadgeText}>
                {clue.badge[language] || clue.badge.en}
              </Text>
              <Text style={styles.clueHintText}>
                {clue.hint[language] || clue.hint.en}
              </Text>
            </View>
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
    paddingHorizontal: 16,
    width: '100%',
  },
  dialsCard: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 16,
  },
  dialsRow: {
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'center',
    marginBottom: 16,
  },
  dialContainer: {
    alignItems: 'center',
  },
  arrowButton: {
    width: 48,
    height: 32,
    backgroundColor: '#334155',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '800',
  },
  dialWindow: {
    width: 56,
    height: 64,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#EA580C',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  dialDigit: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FB923C',
  },
  checkButton: {
    width: '80%',
    backgroundColor: '#EA580C',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  checkButtonCorrect: {
    backgroundColor: '#10B981',
  },
  checkButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  cluesCard: {
    width: '100%',
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#FFEDD5',
  },
  cluesHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C2410C',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  clueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FED7AA',
    gap: 10,
  },
  clueDigits: {
    flexDirection: 'row',
    gap: 4,
  },
  clueDigitBox: {
    width: 24,
    height: 28,
    backgroundColor: '#1E293B',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clueDigitText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FB923C',
  },
  clueContent: {
    flex: 1,
  },
  clueBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#EA580C',
  },
  clueHintText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
});
