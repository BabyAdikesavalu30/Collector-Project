/**
 * QuizReviewScreen Component
 * Full screen coordinator for Screen 20: Review Answers.
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { AppBackButton } from '../navigation';
import { ReviewedQuestion, ReviewFilterType, filterReviewedQuestions } from '../../features/quiz';
import { ReviewFilterTabs } from './ReviewFilterTabs';
import { ReviewQuestionCard } from './ReviewQuestionCard';

interface QuizReviewScreenProps {
  questions: ReviewedQuestion[];
  showExplanation: boolean;
  language: SupportedLanguage;
  onBackToResults: () => void;
}

export const QuizReviewScreen: React.FC<QuizReviewScreenProps> = ({
  questions,
  showExplanation,
  language,
  onBackToResults,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).quizReview;

  const [activeFilter, setActiveFilter] = useState<ReviewFilterType>('all');

  // Compute filter counts
  const counts = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    questions.forEach((q) => {
      if (q.isCorrect) correct++;
      else wrong++;
    });
    return {
      all: questions.length,
      correct,
      wrong,
    };
  }, [questions]);

  // Filtered list
  const filteredQuestions = useMemo(() => {
    return filterReviewedQuestions(questions, activeFilter);
  }, [questions, activeFilter]);

  const renderItem = ({ item }: { item: ReviewedQuestion }) => (
    <ReviewQuestionCard
      question={item}
      showExplanation={showExplanation}
      language={language}
      t={t}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.sm }]}>
        <AppBackButton
          onPress={onBackToResults}
          language={language}
          accessibilityLabel={t.backToResults}
          style={styles.backButton}
        />

        <Text style={styles.headerTitle}>{t.headerTitle}</Text>

        <View style={styles.headerSpacer} />
      </View>

      {/* Filter Tabs */}
      <ReviewFilterTabs
        activeFilter={activeFilter}
        counts={counts}
        onSelectFilter={setActiveFilter}
        t={t}
      />

      {/* Questions List / Empty State */}
      {filteredQuestions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🎉</Text>
          <Text style={styles.emptyTitle}>
            {activeFilter === 'wrong' ? t.noIncorrectAnswers : t.noQuestionsCategory}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredQuestions}
          keyExtractor={(item) => item.questionId}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + theme.spacing.xl },
          ]}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  backIcon: {
    fontSize: 22,
    color: theme.colors.navy900,
    fontWeight: '700',
  },
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  headerSpacer: {
    width: 44,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  emptyTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.slate600,
    textAlign: 'center',
  },
});
