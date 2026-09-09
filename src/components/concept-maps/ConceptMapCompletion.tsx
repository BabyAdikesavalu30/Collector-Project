/**
 * ConceptMapCompletion Component
 * Celebratory completion card displayed when a concept map's key concepts are mastered.
 * Highlights the +10 XP earned, summary takeaway, and direct pathways to quiz and curriculum.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { theme } from '../../theme';
import { ConceptMap } from '../../features/concept-maps/conceptMaps.types';
import { CONCEPT_SUBJECT_THEMES } from '../../features/concept-maps/conceptMaps.data';
import { getTranslation, SupportedLanguage } from '../../config/i18n';

export interface ConceptMapCompletionProps {
  map: ConceptMap;
  xpEarned?: number;
  language?: SupportedLanguage;
  onReviewMap: () => void;
  onGoToHub: () => void;
  onPracticeQuiz?: (subject: string) => void;
  testID?: string;
}

export const ConceptMapCompletion: React.FC<ConceptMapCompletionProps> = ({
  map,
  xpEarned = 10,
  language = 'en',
  onReviewMap,
  onGoToHub,
  onPracticeQuiz,
  testID = 'concept-map-completion',
}) => {
  const isTamil = language === 'ta';
  const t = getTranslation(language).conceptMaps;
  const subjectTheme = CONCEPT_SUBJECT_THEMES[map.subject] || CONCEPT_SUBJECT_THEMES.physics;
  const title = isTamil && map.title.ta ? map.title.ta : map.title.en;

  return (
    <View testID={testID} style={styles.card}>
      {/* Celebration Header Icon */}
      <View style={styles.badgeContainer}>
        <View style={[styles.outerGlow, { backgroundColor: subjectTheme.surface }]}>
          <Text style={styles.badgeEmoji}>🗺️</Text>
        </View>
        <View style={styles.sparkleBadge}>
          <Text style={styles.sparkleText}>🎉</Text>
        </View>
      </View>

      {/* Main Title & Subtitle */}
      <Text style={styles.congratsTitle}>
        {isTamil ? 'வரைபடம் நிறைவு!' : 'Concept Map Mastered!'}
      </Text>
      <Text style={styles.mapTitle} numberOfLines={2}>
        {title}
      </Text>

      {/* XP Reward Pill */}
      <View style={styles.xpPill}>
        <Text style={styles.xpEmoji}>⚡</Text>
        <Text style={styles.xpText}>+{xpEarned} XP</Text>
        <Text style={styles.xpSubtext}>
          {isTamil ? 'புள்ளிகள் சேர்க்கப்பட்டன' : 'added to your ledger'}
        </Text>
      </View>

      {/* Summary Takeaway */}
      <View style={styles.takeawayBox}>
        <Text style={styles.takeawayHeading}>
          {isTamil ? 'முக்கிய கற்றல்' : 'Key Takeaway'}
        </Text>
        <Text style={styles.takeawayText}>
          {isTamil
            ? `நீங்கள் ${title} வரைபடத்தின் அனைத்து முக்கிய கருத்துகளையும் அவற்றின் உறவுகளையும் வெற்றிகரமாக ஆராய்ந்துள்ளீர்கள்.`
            : `You have successfully connected all key concepts and relationships in ${title}.`}
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        {onPracticeQuiz && (
          <TouchableOpacity
            testID="completion-quiz-btn"
            accessibilityRole="button"
            accessibilityLabel={t.accessibility?.practiceWithQuiz}
            onPress={() => onPracticeQuiz(map.subject)}
            style={[styles.primaryActionBtn, { backgroundColor: subjectTheme.primary }]}
          >
            <Text style={styles.primaryActionText}>
              {isTamil ? '🎯 வினாடிவினா பயிற்சி செய்' : '🎯 Practice with Quiz'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.secondaryActionsRow}>
          <TouchableOpacity
            testID="completion-review-btn"
            accessibilityRole="button"
            accessibilityLabel={t.accessibility?.reviewMap}
            onPress={onReviewMap}
            style={styles.secondaryActionBtn}
          >
            <Text style={styles.secondaryActionText}>
              {isTamil ? 'மீண்டும் காண்க' : 'Review Map'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="completion-hub-btn"
            accessibilityRole="button"
            accessibilityLabel={t.accessibility?.returnToHub}
            onPress={onGoToHub}
            style={styles.secondaryActionBtn}
          >
            <Text style={styles.secondaryActionText}>
              {isTamil ? 'அனைத்து வரைபடங்கள்' : 'All Maps'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    margin: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: { elevation: 8 },
    }),
  },
  badgeContainer: {
    position: 'relative',
    marginBottom: 14,
  },
  outerGlow: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeEmoji: {
    fontSize: 40,
  },
  sparkleBadge: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 2,
    borderWidth: 1,
    borderColor: theme.colors.gray100,
  },
  sparkleText: {
    fontSize: 16,
  },
  congratsTitle: {
    fontSize: 14,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.green600,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  mapTitle: {
    fontSize: 20,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.navy900,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 14,
  },
  xpPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
  },
  xpEmoji: {
    fontSize: 14,
  },
  xpText: {
    fontSize: 15,
    fontFamily: theme.fontFamilies.bold,
    color: '#B45309',
  },
  xpSubtext: {
    fontSize: 12,
    fontFamily: theme.fontFamilies.medium,
    color: '#92400E',
  },
  takeawayBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  takeawayHeading: {
    fontSize: 11,
    fontFamily: theme.fontFamilies.bold,
    color: theme.colors.slate500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  takeawayText: {
    fontSize: 13,
    fontFamily: theme.fontFamilies.regular,
    color: theme.colors.navy800,
    lineHeight: 18,
  },
  actionsContainer: {
    width: '100%',
    gap: 10,
  },
  primaryActionBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionText: {
    color: theme.colors.white,
    fontSize: 15,
    fontFamily: theme.fontFamilies.bold,
  },
  secondaryActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryActionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  secondaryActionText: {
    color: theme.colors.slate600,
    fontSize: 13,
    fontFamily: theme.fontFamilies.bold,
  },
});
