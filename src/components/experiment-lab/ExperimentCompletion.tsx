/**
 * ExperimentCompletion Component
 * Celebratory state card presented when an experiment is successfully completed.
 * Shows +25 XP reward, key takeaways, and deep-links into Micro Lessons, Concept Maps, Learn, and Quiz.
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
import { Experiment } from '../../features/experiment-lab/experiment.types';
import { getTranslation, SupportedLanguage } from '../../config/i18n';

interface ExperimentCompletionProps {
  experiment: Experiment;
  xpEarned: number;
  newlyCompleted: boolean;
  language?: SupportedLanguage;
  onRunAgain: () => void;
  onNavigate: (route: string) => void;
}

export const ExperimentCompletion: React.FC<ExperimentCompletionProps> = ({
  experiment,
  xpEarned,
  newlyCompleted,
  language = 'en',
  onRunAgain,
  onNavigate,
}) => {
  const isTamil = language === 'ta';
  const t = getTranslation(language).experimentLab;
  const takeaways = isTamil ? experiment.keyTakeaways.ta : experiment.keyTakeaways.en;

  return (
    <View style={styles.card}>
      {/* Trophy / Header */}
      <View style={styles.header}>
        <Text style={styles.trophyIcon}>🎉</Text>
        <Text style={styles.title}>
          {isTamil ? 'பரிசோதனை நிறைவடைந்தது!' : 'Experiment Complete!'}
        </Text>
        <Text style={styles.subtitle}>
          {isTamil
            ? 'மாறிகளைச் சோதித்து அறிவியலின் உண்மையான விளைவுகளைக் கவனித்துவிட்டீர்கள்.'
            : 'You tested variables and observed real science in action.'}
        </Text>

        {/* XP Badge */}
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>
            {newlyCompleted && xpEarned > 0
              ? `+${xpEarned} XP`
              : isTamil
              ? '✓ ஏற்கனவே முடிக்கப்பட்டது'
              : '✓ Already Completed'}
          </Text>
        </View>
      </View>

      {/* Key Takeaways */}
      <View style={styles.takeawaysBox}>
        <Text style={styles.takeawaysTitle}>
          {isTamil ? '📌 முக்கிய சாராம்சங்கள்:' : '📌 Key Takeaways:'}
        </Text>
        {takeaways.map((point, index) => (
          <View key={index} style={styles.takeawayRow}>
            <Text style={styles.takeawayDot}>•</Text>
            <Text style={styles.takeawayText}>{point}</Text>
          </View>
        ))}
      </View>

      {/* Action Links & Integrations */}
      <View style={styles.actionsSection}>
        <Text style={styles.actionsHeader}>
          {isTamil ? 'கற்றலைத் தொடரவும்:' : 'Continue Learning:'}
        </Text>

        {/* Related Micro Lesson Link */}
        {experiment.microLessonId && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onNavigate(`/micro-lesson/${experiment.microLessonId}`)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={t.accessibility?.open2MinLesson}
          >
            <View style={styles.actionIconCircle}>
              <Text style={styles.actionIcon}>⚡</Text>
            </View>
            <View style={styles.actionTextCol}>
              <Text style={styles.actionButtonTitle}>
                {isTamil ? '2 நிமிடப் பாடம்' : '2-Minute Lesson'}
              </Text>
              <Text style={styles.actionButtonSub}>
                {isTamil ? 'கருத்தை விரைவாகப் படியுங்கள்' : 'Read bite-sized science story'}
              </Text>
            </View>
            <Text style={styles.actionChevron}>›</Text>
          </TouchableOpacity>
        )}

        {/* Related Concept Map Link */}
        {experiment.conceptMapId && (
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonPurple]}
            onPress={() => onNavigate(`/concept-map/${experiment.conceptMapId}`)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={t.accessibility?.exploreConceptMap}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#F3E8FF' }]}>
              <Text style={styles.actionIcon}>🗺️</Text>
            </View>
            <View style={styles.actionTextCol}>
              <Text style={[styles.actionButtonTitle, { color: colors.purple700 }]}>
                {isTamil ? 'கருத்து வரைபடம்' : 'Explore Concept Map'}
              </Text>
              <Text style={styles.actionButtonSub}>
                {isTamil ? 'முழுமையான காட்சித் தொடர்பைப் பாருங்கள்' : 'See the big picture connection'}
              </Text>
            </View>
            <Text style={[styles.actionChevron, { color: colors.purple700 }]}>›</Text>
          </TouchableOpacity>
        )}

        {/* Practice in Quiz */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onNavigate('/quiz-setup')}
          activeOpacity={0.85}
          accessibilityRole="button"            accessibilityLabel={t.accessibility?.practiceInQuiz}
        >
          <View style={[styles.actionIconCircle, { backgroundColor: '#DCFCE7' }]}>
            <Text style={styles.actionIcon}>🧠</Text>
          </View>
          <View style={styles.actionTextCol}>
            <Text style={[styles.actionButtonTitle, { color: colors.green700 }]}>
              {isTamil ? 'இத்தலைப்பைப் பயிற்சி செய்க' : 'Practice This Topic'}
            </Text>
            <Text style={styles.actionButtonSub}>
              {isTamil ? 'வினாடி வினாவில் உங்களைச் சோதிக்கவும்' : 'Test yourself with adaptive quiz'}
            </Text>
          </View>
          <Text style={[styles.actionChevron, { color: colors.green700 }]}>›</Text>
        </TouchableOpacity>

        {/* Re-run button */}
        <TouchableOpacity
          style={styles.runAgainButton}
          onPress={onRunAgain}
          activeOpacity={0.85}
          accessibilityRole="button"            accessibilityLabel={t.accessibility?.experimentAgain}
        >
          <Text style={styles.runAgainText}>
            {isTamil ? '🔬 மீண்டும் பரிசோதிக்கவும் (Run Again)' : '🔬 Experiment Again (Run Again)'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginVertical: 14,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    ...Platform.select({
      ios: {
        shadowColor: '#16A34A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  trophyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.navy900,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: colors.slate600,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  xpBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  xpText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.green700,
  },
  takeawaysBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  takeawaysTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.navy900,
    marginBottom: 8,
  },
  takeawayRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  takeawayDot: {
    fontSize: 14,
    color: colors.blue600,
    marginRight: 6,
    lineHeight: 18,
  },
  takeawayText: {
    flex: 1,
    fontSize: 12,
    color: colors.navy800,
    lineHeight: 18,
  },
  actionsSection: {
    gap: 8,
  },
  actionsHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.navy800,
    marginBottom: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  actionButtonPurple: {
    backgroundColor: '#FAF5FF',
    borderColor: '#E9D5FF',
  },
  actionIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  actionIcon: {
    fontSize: 18,
  },
  actionTextCol: {
    flex: 1,
  },
  actionButtonTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.blue700,
  },
  actionButtonSub: {
    fontSize: 11,
    color: colors.slate500,
    marginTop: 1,
  },
  actionChevron: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.blue600,
    marginLeft: 8,
  },
  runAgainButton: {
    marginTop: 6,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  runAgainText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.navy800,
  },
});
