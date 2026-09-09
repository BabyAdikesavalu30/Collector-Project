/**
 * Concept Map Detail Route (/concept-map/[id])
 * Focused interactive concept map viewer with canvas and accessible list view.
 */

import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { theme } from '../../src/theme';
import { ConceptMapDetailScreen } from '../../src/components/concept-maps';
import { useConceptMapDetail } from '../../src/features/concept-maps';
import { useLanguage } from '../../src/context';
import { navigate, navigateDynamic } from '../../src/components/navigation/navigation.config';

export default function ConceptMapDetailPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const mapId = params.id || '';

  const { language } = useLanguage();

  const {
    map,
    progress,
    isBookmarked,
    selectedNodeId,
    viewMode,
    showCompletionModal,
    isLoading,
    selectNode,
    exploreNode,
    toggleBookmark,
    toggleViewMode,
    dismissCompletion,
  } = useConceptMapDetail(mapId);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      navigate(router, '/concept-maps');
    }
  }, [router]);

  const handleGoToHub = useCallback(() => {
    navigate(router, '/concept-maps');
  }, [router]);

  const handleDeepLinkQuiz = useCallback(
    (subject: string) => {
      const target = `/quiz-setup?subject=${subject}`;
      if (subject) {
        navigateDynamic(router, target);
      } else {
        navigate(router, '/quiz-setup');
      }
    },
    [router]
  );

  const handleDeepLinkMicroLesson = useCallback(
    (lessonId?: string) => {
      if (lessonId) {
        navigateDynamic(router, `/micro-lesson/${lessonId}`);
      } else {
        navigate(router, '/micro-lessons');
      }
    },
    [router]
  );

  const handleDeepLinkLearn = useCallback(() => {
    navigate(router, '/learn');
  }, [router]);

  if (isLoading && !map) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.actionPrimary} />
      </View>
    );
  }

  if (!map) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorEmoji}>🗺️</Text>
        <Text style={styles.errorTitle}>
          {language === 'ta' ? 'கருத்து வரைபடம் கிடைக்கவில்லை' : 'Concept Map Not Found'}
        </Text>
        <Text style={styles.errorDesc}>
          {language === 'ta'
            ? 'கோரப்பட்ட கருத்து வரைபடத்தை ஏற்ற முடியவில்லை.'
            : 'The requested concept map could not be loaded.'}
        </Text>
        <TouchableOpacity
          style={styles.backCtaButton}
          onPress={handleGoToHub}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={language === 'ta' ? 'கருத்து வரைபடங்களுக்குத் திரும்பு' : 'Back to Concept Maps'}
        >
          <Text style={styles.backCtaText}>
            ← {language === 'ta' ? 'கருத்து வரைபடங்களுக்குத் திரும்பு' : 'Back to Concept Maps'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ConceptMapDetailScreen
      map={map}
      progress={progress}
      isBookmarked={isBookmarked}
      selectedNodeId={selectedNodeId}
      viewMode={viewMode}
      showCompletionModal={showCompletionModal}
      language={language}
      onSelectNode={selectNode}
      onExploreNode={exploreNode}
      onToggleBookmark={toggleBookmark}
      onToggleViewMode={toggleViewMode}
      onDismissCompletion={dismissCompletion}
      onBack={handleBack}
      onGoToHub={handleGoToHub}
      onDeepLinkQuiz={handleDeepLinkQuiz}
      onDeepLinkMicroLesson={handleDeepLinkMicroLesson}
      onDeepLinkLearn={handleDeepLinkLearn}
    />
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  errorEmoji: {
    fontSize: 44,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: 6,
  },
  errorDesc: {
    fontSize: 13,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
  },
  backCtaButton: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    minHeight: 44,
    justifyContent: 'center',
  },
  backCtaText: {
    color: theme.colors.textOnAction,
    fontSize: 14,
    fontWeight: '700',
  },
});
