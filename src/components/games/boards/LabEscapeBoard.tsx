/**
 * LabEscapeBoard Component
 * Multi-stage science escape room console for Game 17: Lab Escape.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { EscapeStage, LabEscapeLevel } from '../../../features/games/lab-escape';

interface LabEscapeBoardProps {
  level: LabEscapeLevel;
  currentStage: EscapeStage | null;
  currentStageIndex: number;
  feedback: { isCorrect: boolean } | null;
  onSelectOption: (optionId: string) => void;
  language?: 'en' | 'ta';
  stageOfLabel?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const LabEscapeBoard: React.FC<LabEscapeBoardProps> = ({
  level,
  currentStage,
  currentStageIndex,
  feedback,
  onSelectOption,
  language = 'en',
  stageOfLabel = 'Stage {current} of {total}',
}) => {
  if (!currentStage) return null;

  const stageProgressText = stageOfLabel
    .replace('{current}', String(currentStageIndex + 1))
    .replace('{total}', String(level.stages.length));

  return (
    <View style={styles.container}>
      {/* Chamber Theme Header */}
      <View style={styles.themeBanner}>
        <Text style={styles.themeTitle}>
          🚪 {level.theme[language] || level.theme.en}
        </Text>
        <Text style={styles.stageProgressBadge}>{stageProgressText}</Text>
      </View>

      {/* Stage Briefing Card */}
      <View
        style={[
          styles.briefingCard,
          feedback?.isCorrect === true && styles.cardCorrect,
          feedback?.isCorrect === false && styles.cardIncorrect,
        ]}
      >
        <Text style={styles.stageTitle}>
          {currentStage.title[language] || currentStage.title.en}
        </Text>
        <Text style={styles.promptText}>
          {currentStage.prompt[language] || currentStage.prompt.en}
        </Text>
        {currentStage.hint ? (
          <View style={styles.hintBox}>
            <Text style={styles.hintText}>
              💡 Hint: {currentStage.hint[language] || currentStage.hint.en}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Action Options */}
      <View style={styles.optionsContainer}>
        {currentStage.options.map((opt) => (
          <TouchableOpacity
            key={opt.id}
            style={styles.optionButton}
            onPress={() => onSelectOption(opt.id)}
            activeOpacity={0.7}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Option ${opt.label[language] || opt.label.en}`}
          >
            {opt.icon ? <Text style={styles.optionIcon}>{opt.icon}</Text> : null}
            <Text style={styles.optionLabel}>
              {opt.label[language] || opt.label.en}
            </Text>
          </TouchableOpacity>
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
  themeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFE4E6',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#FECDD3',
    marginBottom: 14,
  },
  themeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#9F1239',
  },
  stageProgressBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#BE123C',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  briefingCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 16,
  },
  cardCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  cardIncorrect: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  stageTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
  },
  promptText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    lineHeight: 20,
  },
  hintBox: {
    marginTop: 10,
    backgroundColor: '#FFFBEB',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  hintText: {
    fontSize: 12,
    color: '#B45309',
    fontWeight: '500',
  },
  optionsContainer: {
    width: '100%',
    gap: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    gap: 12,
  },
  optionIcon: {
    fontSize: 22,
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
});
