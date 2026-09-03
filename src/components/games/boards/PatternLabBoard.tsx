/**
 * PatternLabBoard Component
 * Scientific sequence deduction board for Game 14: Pattern Lab.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { PatternLabLevel, PatternLabOption } from '../../../features/games/pattern-lab';

interface PatternLabBoardProps {
  level: PatternLabLevel;
  selectedOptionId: string | null;
  feedback: { isCorrect: boolean } | null;
  onSelectOption: (optionId: string) => void;
  language?: 'en' | 'ta';
  chooseOptionLabel?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const PatternLabBoard: React.FC<PatternLabBoardProps> = ({
  level,
  selectedOptionId,
  feedback,
  onSelectOption,
  language = 'en',
  chooseOptionLabel = 'Choose the Next Element:',
}) => {
  return (
    <View style={styles.container}>
      {/* Rule / Clue Description */}
      <View style={styles.ruleCard}>
        <Text style={styles.ruleText}>
          {level.ruleDescription[language] || level.ruleDescription.en}
        </Text>
      </View>

      {/* Sequence Display Strip */}
      <View style={styles.sequenceWrapper}>
        {level.sequence.map((item, idx) => {
          const isMissing = idx === level.missingIndex;

          return (
            <View
              key={`seq-${idx}`}
              style={[styles.sequenceNode, isMissing && styles.sequenceNodeMissing]}
            >
              {item.icon ? <Text style={styles.nodeIcon}>{item.icon}</Text> : null}
              <Text
                style={[styles.nodeText, isMissing && styles.nodeTextMissing]}
                numberOfLines={2}
              >
                {item.display}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Options Selection */}
      <Text style={styles.chooseTitle}>{chooseOptionLabel}</Text>
      <View style={styles.optionsGrid}>
        {level.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isCorrect = feedback?.isCorrect && isSelected;
          const isWrong = feedback && !feedback.isCorrect && isSelected;

          return (
            <TouchableOpacity
              key={opt.id}
              style={[
                styles.optionButton,
                isSelected && styles.optionSelected,
                isCorrect && styles.optionCorrect,
                isWrong && styles.optionWrong,
              ]}
              onPress={() => onSelectOption(opt.id)}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Option ${opt.label[language] || opt.label.en}`}
            >
              {opt.icon ? <Text style={styles.optionIcon}>{opt.icon}</Text> : null}
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {opt.label[language] || opt.label.en}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Explanation when solved */}
      {feedback?.isCorrect ? (
        <View style={styles.explanationCard}>
          <Text style={styles.explanationTitle}>💡 Scientific Insight:</Text>
          <Text style={styles.explanationText}>
            {level.explanation[language] || level.explanation.en}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    width: '100%',
  },
  ruleCard: {
    backgroundColor: '#FAF5FF',
    borderRadius: 14,
    padding: 14,
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#E9D5FF',
    marginBottom: 16,
  },
  ruleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B21A8',
    textAlign: 'center',
  },
  sequenceWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  sequenceNode: {
    width: (SCREEN_WIDTH - 64) / 4,
    minHeight: 70,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sequenceNodeMissing: {
    borderColor: '#9333EA',
    borderStyle: 'dashed',
    backgroundColor: '#FDF4FF',
  },
  nodeIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  nodeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
  },
  nodeTextMissing: {
    color: '#9333EA',
    fontSize: 16,
    fontWeight: '900',
  },
  chooseTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
  },
  optionButton: {
    width: (SCREEN_WIDTH - 44) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  optionSelected: {
    borderColor: '#9333EA',
    backgroundColor: '#FAF5FF',
  },
  optionCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  optionWrong: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  optionIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#6B21A8',
  },
  explanationCard: {
    marginTop: 16,
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 14,
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
  },
  explanationTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#065F46',
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 13,
    color: '#047857',
    fontWeight: '500',
  },
});
