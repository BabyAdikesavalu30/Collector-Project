/**
 * SubjectSelector Component
 * Subject selection for Physics, Chemistry, and Biology.
 * Shows Botany & Zoology specialty hint when Advanced level (11-12) is active.
 * Clean White cards with Royal Blue active state.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { LearningSubject } from '../../features/learn/learn.types';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface SubjectSelectorProps {
  subjects: LearningSubject[];
  selectedSubjectId: string | null;
  selectedLevelId: string | null;
  language?: SupportedLanguage;
  onSelectSubject: (subjectId: string) => void;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  subjects,
  selectedSubjectId,
  selectedLevelId,
  language = 'en',
  onSelectSubject,
}) => {
  const t = getTranslation(language).learnScreen;
  const isAdvancedLevel = selectedLevelId === 'advanced';

  const getLocalizedSubjectTitle = (id: string, defaultTitle: string): string => {
    const dict = getTranslation(language).home;
    if (id === 'physics') return language === 'ta' ? 'இயற்பியல்' : 'Physics';
    if (id === 'chemistry') return language === 'ta' ? 'வேதியியல்' : 'Chemistry';
    if (id === 'biology') return language === 'ta' ? 'உயிரியல்' : 'Biology';
    return defaultTitle;
  };

  const getLocalizedSubjectSubtitle = (id: string, defaultSubtitle: string): string => {
    if (id === 'physics') {
      return language === 'ta'
        ? 'இயக்கம், விசை, ஆற்றல் மற்றும் பருப்பொருளை ஆராயுங்கள்'
        : 'Explore motion, force, energy and matter';
    }
    if (id === 'chemistry') {
      return language === 'ta'
        ? 'அணுக்கள், வேதிவினைகள் மற்றும் மூலக்கூறுகளை ஆராயுங்கள்'
        : 'Explore atoms, reactions and materials';
    }
    if (id === 'biology') {
      return language === 'ta'
        ? 'உயிரினங்கள், மனித உடற்கூறு மற்றும் தாவரங்களை ஆராயுங்கள்'
        : 'Explore life, systems and organisms';
    }
    return defaultSubtitle;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.subjectSectionTitle}</Text>

      <View style={styles.cardList}>
        {subjects.map((subj) => {
          const isSelected = selectedSubjectId === subj.id;
          const title = getLocalizedSubjectTitle(subj.id, subj.title);
          const subtitle = getLocalizedSubjectSubtitle(subj.id, subj.subtitle);
          const showSpecialties = isAdvancedLevel && subj.id === 'biology';

          return (
            <TouchableOpacity
              key={subj.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => onSelectSubject(subj.id)}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${title}. ${subtitle}. ${isSelected ? t.accessibility.subjectSelected : ''}`}
            >
              <View style={[styles.iconCircle, isSelected && styles.iconCircleSelected]}>
                <Text style={styles.iconText}>{subj.icon}</Text>
              </View>

              <View style={styles.textContainer}>
                <View style={styles.titleRow}>
                  <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                    {title}
                  </Text>
                  {showSpecialties && (
                    <View style={styles.specialtyBadge}>
                      <Text style={styles.specialtyText}>{t.botanyZoology}</Text>
                    </View>
                  )}
                </View>

                <Text style={[styles.cardSubtitle, isSelected && styles.cardSubtitleSelected]} numberOfLines={2}>
                  {subtitle}
                </Text>
              </View>

              <View style={[styles.checkCircle, isSelected && styles.checkCircleSelected]}>
                {isSelected ? <Text style={styles.checkText}>✓</Text> : <View style={styles.emptyDot} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  cardList: {
    gap: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardSelected: {
    backgroundColor: theme.colors.blue50,
    borderColor: theme.colors.actionPrimary,
    shadowColor: theme.colors.actionPrimary,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.gray50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconCircleSelected: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.blue200,
  },
  iconText: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 2,
  },
  cardTitle: {
    ...theme.typography.body,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  cardTitleSelected: {
    color: theme.colors.actionPrimary,
    fontWeight: '800',
  },
  specialtyBadge: {
    backgroundColor: theme.colors.purple100,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: theme.colors.purple200,
  },
  specialtyText: {
    ...theme.typography.caption,
    fontSize: 9.5,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
  },
  cardSubtitle: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate600,
    lineHeight: 16,
  },
  cardSubtitleSelected: {
    color: theme.colors.navy900,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: theme.colors.slate400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleSelected: {
    backgroundColor: theme.colors.actionPrimary,
    borderColor: theme.colors.actionPrimary,
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  emptyDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
});
