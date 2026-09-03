/**
 * LearnScreen Component (Screen 17 — Level / Subject Selection & Learning Pathways)
 * Student's primary learning entry point.
 * Features Level selection, progressive Subject filtering, Learning Pathway selection,
 * profile-grade auto-initialization, and safe Continue CTA.
 * Clean Pearl White background & White floating cards.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import {
  LEARNING_LEVELS,
  LEARNING_SUBJECTS,
  getPathwaysForSelection,
  mapGradeToLevelId,
} from '../../features/learn';
import { LearnHeader } from './LearnHeader';
import { LevelSelector } from './LevelSelector';
import { SubjectSelector } from './SubjectSelector';
import { LearningPathSelector } from './LearningPathSelector';
import { LearnContinueButton } from './LearnContinueButton';

interface LearnScreenProps {
  language?: SupportedLanguage;
  onBack: () => void;
  onContinue: (selection: {
    levelId: string;
    subjectId: string;
    pathwayId: string;
  }) => void;
  onAnalyticsEvent?: (eventName: string, params?: Record<string, unknown>) => void;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({
  language = 'en',
  onBack,
  onContinue,
  onAnalyticsEvent,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).learnScreen;

  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedPathwayId, setSelectedPathwayId] = useState<string | null>(null);

  // 1. Profile-Aware Defaults: Auto-select level matching student's registered grade
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const storedProfile = await storage.getItem<{ grade?: string }>(
          STORAGE_KEYS.STUDENT_PROFILE
        );
        if (isMounted && storedProfile?.grade) {
          const autoLevel = mapGradeToLevelId(storedProfile.grade);
          if (autoLevel) {
            setSelectedLevelId(autoLevel);
          }
        }
      } catch {
        // Fallback to neutral selection
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Telemetry on mount
  useEffect(() => {
    onAnalyticsEvent?.('learn_screen_viewed', { language });
  }, [language, onAnalyticsEvent]);

  // Level Selection Handler: Changing level resets subject and pathway
  const handleSelectLevel = useCallback(
    (levelId: string) => {
      onAnalyticsEvent?.('learn_level_selected', { levelId });
      setSelectedLevelId(levelId);
      setSelectedSubjectId(null);
      setSelectedPathwayId(null);
    },
    [onAnalyticsEvent]
  );

  // Subject Selection Handler: Changing subject resets pathway
  const handleSelectSubject = useCallback(
    (subjectId: string) => {
      onAnalyticsEvent?.('learn_subject_selected', { subjectId });
      setSelectedSubjectId(subjectId);
      setSelectedPathwayId(null);
    },
    [onAnalyticsEvent]
  );

  // Pathway Selection Handler
  const handleSelectPathway = useCallback(
    (pathwayId: string) => {
      onAnalyticsEvent?.('learn_pathway_selected', { pathwayId });
      setSelectedPathwayId(pathwayId);
    },
    [onAnalyticsEvent]
  );

  // Filter pathways for active level & subject
  const currentPathways =
    selectedLevelId && selectedSubjectId
      ? getPathwaysForSelection(selectedSubjectId, selectedLevelId)
      : [];

  // Continue CTA is enabled when all 3 selections are present
  const isContinueEnabled = Boolean(
    selectedLevelId && selectedSubjectId && selectedPathwayId
  );

  const handleContinuePress = () => {
    if (!selectedLevelId || !selectedSubjectId || !selectedPathwayId) return;

    onAnalyticsEvent?.('learn_continue_tapped', {
      levelId: selectedLevelId,
      subjectId: selectedSubjectId,
      pathwayId: selectedPathwayId,
    });

    onContinue({
      levelId: selectedLevelId,
      subjectId: selectedSubjectId,
      pathwayId: selectedPathwayId,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 8, Platform.OS === 'android' ? 28 : 16),
            paddingBottom: Math.max(insets.bottom + 24, 32),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LearnHeader language={language} onBack={onBack} />

        {/* Intro Banner */}
        <View style={styles.introCard} accessible={true} accessibilityRole="header">
          <View style={styles.introPill}>
            <Text style={styles.introPillText}>VIGYAAN LEARNING PATHWAYS</Text>
          </View>
          <Text style={styles.introTitle}>{t.introTitle}</Text>
          <Text style={styles.introSubtitle}>{t.introSubtitle}</Text>
        </View>

        {/* Section 1: Level Selection */}
        <LevelSelector
          levels={LEARNING_LEVELS}
          selectedLevelId={selectedLevelId}
          language={language}
          onSelectLevel={handleSelectLevel}
        />

        {/* Section 2: Subject Selection (Visible once Level is selected) */}
        {Boolean(selectedLevelId) && (
          <SubjectSelector
            subjects={LEARNING_SUBJECTS}
            selectedSubjectId={selectedSubjectId}
            selectedLevelId={selectedLevelId}
            language={language}
            onSelectSubject={handleSelectSubject}
          />
        )}

        {/* Section 3: Learning Pathway Preview (Visible once Subject is selected) */}
        {Boolean(selectedLevelId && selectedSubjectId) && (
          <LearningPathSelector
            pathways={currentPathways}
            selectedPathwayId={selectedPathwayId}
            language={language}
            onSelectPathway={handleSelectPathway}
          />
        )}

        {/* Primary Continue Action */}
        <LearnContinueButton
          isEnabled={isContinueEnabled}
          language={language}
          onPress={handleContinuePress}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.base,
  },
  introCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  introPill: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: theme.borderRadius.full,
    marginBottom: 6,
  },
  introPillText: {
    ...theme.typography.overline,
    fontSize: 9,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    letterSpacing: 1,
  },
  introTitle: {
    ...theme.typography.h2,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 3,
  },
  introSubtitle: {
    ...theme.typography.caption,
    fontSize: 12.5,
    color: theme.colors.slate600,
    lineHeight: 18,
  },
});
