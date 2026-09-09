/**
 * MicroLessonSection Component
 * Renders individual content modules maintaining visual rhythm:
 * Idea → Example → Visual → Think About It (interactive reveal) → Key Points → Remember.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { MicroLessonSection as SectionType } from '../../features/micro-lessons/microLessons.types';
import { MicroLessonVisual } from './MicroLessonVisual';
import { SupportedLanguage } from '../../config/i18n';

export interface MicroLessonSectionProps {
  section: SectionType;
  index: number;
  language?: SupportedLanguage;
}

export const MicroLessonSection: React.FC<MicroLessonSectionProps> = ({
  section,
  index,
  language = 'en',
}) => {
  const isTamil = language === 'ta';
  const [isRevealed, setIsRevealed] = useState(false);

  const titleText = section.title ? (isTamil ? section.title.ta : section.title.en) : null;
  const contentText = isTamil ? section.content.ta : section.content.en;
  const exampleText = section.example ? (isTamil ? section.example.ta : section.example.en) : null;

  switch (section.kind) {
    case 'idea':
      return (
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>💡</Text>
            <Text style={styles.sectionTitle}>
              {titleText || (isTamil ? 'அடிப்படை கருத்து' : 'Quick Idea')}
            </Text>
          </View>
          <Text style={styles.bodyText}>{contentText}</Text>
        </View>
      );

    case 'why_it_matters':
      return (
        <View style={[styles.sectionCard, styles.whyItMattersCard]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🌍</Text>
            <Text style={[styles.sectionTitle, { color: '#1E40AF' }]}>
              {titleText || (isTamil ? 'அன்றாட வாழ்வில் இது ஏன் முக்கியம்?' : 'Why It Matters')}
            </Text>
          </View>
          <Text style={styles.bodyText}>{contentText}</Text>
          {Boolean(exampleText) && (
            <View style={styles.exampleCallout}>
              <Text style={styles.exampleTag}>
                {isTamil ? '🔍 நிஜ உலக உதாரணம்:' : '🔍 Real-World Example:'}
              </Text>
              <Text style={styles.exampleContent}>{exampleText}</Text>
            </View>
          )}
        </View>
      );

    case 'visual_diagram':
      return (
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📐</Text>
            <Text style={styles.sectionTitle}>
              {titleText || (isTamil ? 'காட்சி விளக்கம்' : 'Visual Concept')}
            </Text>
          </View>
          {Boolean(section.visualType) && (
            <MicroLessonVisual type={section.visualType!} language={language} />
          )}
          {Boolean(contentText) && <Text style={styles.bodyText}>{contentText}</Text>}
        </View>
      );

    case 'think_about_it': {
      const questionText = section.thinkQuestion
        ? isTamil ? section.thinkQuestion.ta : section.thinkQuestion.en
        : contentText;
      const answerText = section.thinkAnswer
        ? isTamil ? section.thinkAnswer.ta : section.thinkAnswer.en
        : null;

      return (
        <View style={[styles.sectionCard, styles.thinkCard]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🤔</Text>
            <Text style={[styles.sectionTitle, { color: '#7E22CE' }]}>
              {titleText || (isTamil ? 'சிந்தித்துப் பாருங்கள்' : 'Think About It')}
            </Text>
          </View>
          <Text style={styles.thinkQuestion}>{questionText}</Text>

          {Boolean(answerText) && (
            <View style={styles.thinkActionBox}>
              <TouchableOpacity
                style={styles.revealButton}
                onPress={() => setIsRevealed(!isRevealed)}
                activeOpacity={0.8}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={
                  isRevealed
                    ? (isTamil ? 'விளக்கத்தை மறைக்கவும்' : 'Hide explanation')
                    : (isTamil ? 'விளக்கத்தைக் காண தட்டவும்' : 'Tap to reveal explanation')
                }
              >
                <Text style={styles.revealButtonText}>
                  {isRevealed
                    ? (isTamil ? '▲ விளக்கத்தை மறைக்கவும்' : '▲ Hide explanation')
                    : (isTamil ? '▼ விளக்கத்தைக் காண தட்டவும்' : '▼ Tap to reveal explanation')}
                </Text>
              </TouchableOpacity>

              {isRevealed && (
                <View style={styles.revealedAnswerBox}>
                  <Text style={styles.revealedAnswerText}>{answerText}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      );
    }

    case 'key_points':
      return (
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📌</Text>
            <Text style={styles.sectionTitle}>
              {titleText || (isTamil ? 'முக்கிய குறிப்புகள்' : 'Key Takeaways')}
            </Text>
          </View>
          {section.keyPoints && section.keyPoints.length > 0 ? (
            <View style={styles.pointsList}>
              {section.keyPoints.map((kp, kpIdx) => (
                <View key={`kp-${kpIdx}`} style={styles.pointRow}>
                  <Text style={styles.pointBullet}>✓</Text>
                  <Text style={styles.pointText}>{isTamil ? kp.ta : kp.en}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.bodyText}>{contentText}</Text>
          )}
        </View>
      );

    case 'remember': {
      const rememberText = section.rememberStatement
        ? isTamil ? section.rememberStatement.ta : section.rememberStatement.en
        : contentText;

      return (
        <View style={[styles.sectionCard, styles.rememberCard]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🌟</Text>
            <Text style={[styles.sectionTitle, { color: '#0F766E' }]}>
              {titleText || (isTamil ? 'நினைவில் கொள்க' : 'Remember')}
            </Text>
          </View>
          <Text style={styles.rememberText}>"{rememberText}"</Text>
        </View>
      );
    }

    default:
      return (
        <View style={styles.sectionCard}>
          {Boolean(titleText) && <Text style={styles.sectionTitle}>{titleText}</Text>}
          <Text style={styles.bodyText}>{contentText}</Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: theme.spacing.md,
    marginVertical: 6,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1.5,
  },
  whyItMattersCard: {
    backgroundColor: '#F8FAFC',
    borderColor: '#BFDBFE',
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.actionPrimary,
  },
  thinkCard: {
    backgroundColor: '#FAF5FF',
    borderColor: '#E9D5FF',
    borderLeftWidth: 4,
    borderLeftColor: '#9333EA',
  },
  rememberCard: {
    backgroundColor: '#F0FDFA',
    borderColor: '#99F6E4',
    borderLeftWidth: 4,
    borderLeftColor: '#0D9488',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: theme.spacing.sm,
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  bodyText: {
    fontSize: 14,
    color: theme.colors.navy800,
    lineHeight: 22,
  },
  exampleCallout: {
    backgroundColor: '#FFFFFF',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    marginTop: theme.spacing.sm,
  },
  exampleTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1D4ED8',
    marginBottom: 2,
  },
  exampleContent: {
    fontSize: 13,
    color: theme.colors.slate600,
    lineHeight: 18,
  },
  thinkQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.navy900,
    lineHeight: 21,
  },
  thinkActionBox: {
    marginTop: theme.spacing.sm,
  },
  revealButton: {
    backgroundColor: '#F3E8FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.md,
    alignSelf: 'flex-start',
    minHeight: 44,
    justifyContent: 'center',
  },
  revealButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7E22CE',
  },
  revealedAnswerBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8B4FE',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  revealedAnswerText: {
    fontSize: 13,
    color: theme.colors.navy900,
    lineHeight: 20,
    fontWeight: '500',
  },
  pointsList: {
    gap: 8,
    marginTop: 4,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  pointBullet: {
    color: '#16A34A',
    fontWeight: '800',
    fontSize: 14,
    marginTop: 2,
  },
  pointText: {
    fontSize: 13,
    color: theme.colors.navy800,
    lineHeight: 20,
    flex: 1,
  },
  rememberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#115E59',
    fontStyle: 'italic',
    lineHeight: 22,
  },
});
