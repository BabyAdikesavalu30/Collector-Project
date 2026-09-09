/**
 * MicroLessonCompletion Component
 * Celebratory completion card shown when a student finishes viewing the lesson
 * and completes the quick check. Awards XP, shows takeaway, and links into Learn/Quiz.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { MicroLesson } from '../../features/micro-lessons/microLessons.types';
import { SupportedLanguage } from '../../config/i18n';

export interface MicroLessonCompletionProps {
  lesson: MicroLesson;
  xpAwarded: number;
  language?: SupportedLanguage;
  onPracticePress: () => void;
  onLearnPress?: () => void;
  onExploreMorePress: () => void;
}

export const MicroLessonCompletion: React.FC<MicroLessonCompletionProps> = ({
  lesson,
  xpAwarded,
  language = 'en',
  onPracticePress,
  onLearnPress,
  onExploreMorePress,
}) => {
  const isTamil = language === 'ta';
  const titleText = isTamil ? lesson.title.ta : lesson.title.en;
  const rememberText = isTamil ? lesson.rememberStatement.ta : lesson.rememberStatement.en;

  return (
    <View style={styles.container} accessible={true} accessibilityRole="summary">
      {/* Celebration Header */}
      <View style={styles.headerArea}>
        <Text style={styles.celebrationEmoji}>🎉</Text>
        <Text style={styles.congratsTitle}>
          {isTamil ? 'பாடம் நிறைவடைந்தது!' : 'LESSON COMPLETE!'}
        </Text>
        <Text style={styles.lessonName}>{titleText}</Text>
      </View>

      {/* XP Award Pill */}
      {xpAwarded > 0 && (
        <View style={styles.xpPill} accessible={true} accessibilityRole="text">
          <Text style={styles.xpText}>+{xpAwarded} XP</Text>
        </View>
      )}

      {/* Key Takeaway Card */}
      <View style={styles.takeawayCard}>
        <Text style={styles.takeawayHeading}>
          {isTamil ? '💡 நினைவில் கொள்ள வேண்டியது:' : '💡 Key Takeaway:'}
        </Text>
        <Text style={styles.takeawayText}>"{rememberText}"</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsCol}>
        {/* Practice This Topic (bridges to Quiz) */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onPracticePress}
          activeOpacity={0.85}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={isTamil ? 'இத்தலைப்பில் பயிற்சி செய்க' : 'Practice this topic'}
        >
          <Text style={styles.primaryButtonText}>
            🎯 {isTamil ? 'இத்தலைப்பில் பயிற்சி செய்க' : 'Practice This Topic'}
          </Text>
        </TouchableOpacity>

        {/* Continue in Learning (bridges to Learn) */}
        {Boolean(onLearnPress) && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onLearnPress}
            activeOpacity={0.85}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={isTamil ? 'கற்றல் பிரிவில் தொடரவும்' : 'Continue in Learning'}
          >
            <Text style={styles.secondaryButtonText}>
              📚 {isTamil ? 'கற்றல் பிரிவில் தொடரவும்' : 'Continue in Learning'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Explore More Micro Lessons */}
        <TouchableOpacity
          style={styles.ghostButton}
          onPress={onExploreMorePress}
          activeOpacity={0.85}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={isTamil ? 'மேலும் பாடங்களை ஆராய்க' : 'Explore more lessons'}
        >
          <Text style={styles.ghostButtonText}>
            🔍 {isTamil ? 'மேலும் பாடங்களை ஆராய்க' : 'Explore More Lessons'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.lg,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  headerArea: {
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  celebrationEmoji: {
    fontSize: 42,
    marginBottom: 6,
  },
  congratsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#15803D',
    letterSpacing: 0.8,
  },
  lessonName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginTop: 4,
    textAlign: 'center',
  },
  xpPill: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.md,
  },
  xpText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#B45309',
  },
  takeawayCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: theme.spacing.md,
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  takeawayHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.navy800,
    marginBottom: 4,
  },
  takeawayText: {
    fontSize: 13,
    color: theme.colors.slate600,
    fontStyle: 'italic',
    lineHeight: 19,
  },
  actionButtonsCol: {
    width: '100%',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: theme.borderRadius.md,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: theme.colors.actionPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderRadius: theme.borderRadius.md,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostButtonText: {
    color: theme.colors.slate600,
    fontSize: 13,
    fontWeight: '600',
  },
});
