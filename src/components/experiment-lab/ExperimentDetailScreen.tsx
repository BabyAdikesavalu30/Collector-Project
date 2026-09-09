/**
 * ExperimentDetailScreen Component
 * The interactive virtual laboratory runner screen.
 * Guides student through: Mission Objective -> Variable Manipulation -> Visual Simulation ->
 * Observations & Run Comparison -> Reflection Question -> Completion & XP.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { useExperimentDetail } from '../../features/experiment-lab/experiment.hooks';
import { EXPERIMENT_SUBJECTS } from '../../features/experiment-lab/experiment.data';
import { VariableControl } from './VariableControl';
import { SimulationVisualizer } from './SimulationVisualizer';
import { ObservationCard } from './ObservationCard';
import { ExperimentReflectionCoach } from '../feedback/ExperimentReflectionCoach';
import { ExperimentCompletion } from './ExperimentCompletion';
import { AppBackButton } from '../navigation/AppBackButton';
import { getTranslation, SupportedLanguage } from '../../config/i18n';

interface ExperimentDetailScreenProps {
  experimentId: string;
  language?: SupportedLanguage;
  onBack: () => void;
  onNavigate: (route: string) => void;
}

export const ExperimentDetailScreen: React.FC<ExperimentDetailScreenProps> = ({
  experimentId,
  language = 'en',
  onBack,
  onNavigate,
}) => {
  const isTamil = language === 'ta';
  const t = getTranslation(language).experimentLab;

  const {
    experiment,
    progress,
    isBookmarked,
    isLoading,
    variables,
    result,
    activeObservations,
    runA,
    selectedReflectionOption,
    reflectionFeedback,
    completionResult,
    isCompleting,
    updateVariable,
    snapshotRunA,
    clearComparison,
    answerReflection,
    completeCurrentExperiment,
    toggleBookmark,
    resetToDefaults,
  } = useExperimentDetail(experimentId);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.blue600} />
        <Text style={styles.loadingText}>
          {isTamil ? 'பரிசோதனை கூடம் தொடங்குகிறது...' : 'Setting up Virtual Laboratory...'}
        </Text>
      </SafeAreaView>
    );
  }

  if (!experiment || !result) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorEmoji}>🔬</Text>
        <Text style={styles.errorTitle}>
          {isTamil ? 'பரிசோதனை கிடைக்கவில்லை' : 'Experiment Not Found'}
        </Text>
        <Text style={styles.errorSub}>
          {isTamil
            ? 'கோரப்பட்ட உருவகப்படுத்துதலைக் கண்டறிய முடியவில்லை.'
            : 'The requested science simulation could not be loaded.'}
        </Text>
        <TouchableOpacity style={styles.backHomeBtn} onPress={onBack} activeOpacity={0.8}>
          <Text style={styles.backHomeBtnText}>
            {isTamil ? '← பரிசோதனை கூடத்திற்குத் திரும்பு' : '← Back to Experiment Lab'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const subjectMeta = EXPERIMENT_SUBJECTS.find((s) => s.id === experiment.subject) || EXPERIMENT_SUBJECTS[0];
  const subjectName = isTamil ? subjectMeta.title.ta : subjectMeta.title.en;

  const isCompleted = progress?.completed ?? false;
  const canComplete = reflectionFeedback.isCorrect && !isCompleted;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Navigation Bar */}
      <View style={styles.headerBar}>
        <AppBackButton onPress={onBack} />

        <View style={styles.headerCenter}>
          <Text style={styles.headerSubjectBadge}>{subjectName.toUpperCase()}</Text>
        </View>

        <TouchableOpacity
          style={styles.bookmarkBtn}
          onPress={toggleBookmark}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={isBookmarked ? t.accessibility?.removeBookmark : t.accessibility?.bookmarkSimulation}
        >
          <Text style={styles.bookmarkIcon}>{isBookmarked ? '🔖' : '☆'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Experiment Title & Meta */}
        <View style={styles.titleSection}>
          <View style={styles.heroRow}>
            <View style={styles.heroAssetBox}>
              <Text style={styles.heroAsset}>{experiment.heroAsset || '🧪'}</Text>
            </View>
            <View style={styles.titleCol}>
              <Text style={styles.experimentTitle}>{isTamil ? experiment.title.ta : experiment.title.en}</Text>
              <Text style={styles.experimentSub}>{isTamil ? experiment.subtitle.ta : experiment.subtitle.en}</Text>
            </View>
          </View>

          {/* Meta Badges */}
          <View style={styles.metaRow}>
            <View style={styles.metaBadge}>
              <Text style={styles.metaBadgeText}>⏱️ {experiment.durationMinutes} min</Text>
            </View>
            <View style={[styles.metaBadge, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
              <Text style={[styles.metaBadgeText, { color: colors.green700 }]}>+{experiment.xpReward} XP</Text>
            </View>
            <View style={styles.safetyTag}>
              <Text style={styles.safetyTagText}>🛡️ {isTamil ? 'மெய்நிகர் மாதிரி' : 'Virtual Simulation'}</Text>
            </View>
          </View>
        </View>

        {/* Mission Objective */}
        <View style={styles.missionCard}>
          <View style={styles.missionHeader}>
            <Text style={styles.missionIcon}>🎯</Text>
            <Text style={styles.missionTitle}>{isTamil ? 'உங்கள் இலக்கு (MISSION)' : 'YOUR MISSION'}</Text>
          </View>
          <Text style={styles.missionText}>
            {isTamil ? experiment.learningObjective.ta : experiment.learningObjective.en}
          </Text>
        </View>

        {/* Variable Controls */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionBlockTitle}>
              {isTamil ? '🎛️ மாறிகள் (VARIABLES)' : '🎛️ EXPERIMENT VARIABLES'}
            </Text>
            <TouchableOpacity onPress={resetToDefaults} activeOpacity={0.7}>
              <Text style={styles.resetText}>{isTamil ? 'மீட்டமைக்க' : 'Reset'}</Text>
            </TouchableOpacity>
          </View>

          {experiment.variables.map((v) => (
            <VariableControl
              key={v.id}
              variable={v}
              value={variables[v.id]}
              language={language}
              onChange={(val) => updateVariable(v.id, val)}
            />
          ))}
        </View>

        {/* Visual Simulation Display */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionBlockTitle}>
            {isTamil ? '🔬 காட்சி உருவகப்படுத்துதல்' : '🔬 VISUAL SIMULATION'}
          </Text>
          <SimulationVisualizer experiment={experiment} result={result} language={language} />
        </View>

        {/* Observations & Run Comparison */}
        <ObservationCard
          observations={activeObservations}
          result={result}
          runA={runA}
          language={language}
          onSnapshotRunA={snapshotRunA}
          onClearComparison={clearComparison}
        />

        {/* Reflection Question — with shared Hint + Coach layer.
            answerReflection/completion/XP ownership stays in Experiment Lab. */}
        <ExperimentReflectionCoach
          experimentId={experiment.id}
          question={experiment.reflectionQuestion}
          selectedOptionId={selectedReflectionOption}
          feedback={reflectionFeedback}
          language={language}
          onSelectOption={answerReflection}
          disabled={isCompleted}
        />

        {/* Complete Experiment Button (Active when reflection is answered correctly) */}
        {!isCompleted && (
          <TouchableOpacity
            style={[styles.completeButton, !reflectionFeedback.isCorrect && styles.completeButtonDisabled]}
            onPress={completeCurrentExperiment}
            disabled={!reflectionFeedback.isCorrect || isCompleting}
            activeOpacity={0.88}
            accessibilityRole="button"
            accessibilityLabel={t.accessibility?.completeClaimXp}
          >
            {isCompleting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.completeButtonText}>
                {reflectionFeedback.isCorrect
                  ? isTamil
                    ? '🎉 பரிசோதனையை முடிக்கவும் (+25 XP)'
                    : '🎉 Complete Experiment (+25 XP)'
                  : isTamil
                  ? 'விடை அளித்தவுடன் முடிக்கலாம்'
                  : 'Answer reflection above to complete'}
              </Text>
            )}
          </TouchableOpacity>
        )}

        {/* Celebratory Completion Card */}
        {isCompleted && (
          <ExperimentCompletion
            experiment={experiment}
            xpEarned={completionResult?.xpEarned ?? 0}
            newlyCompleted={completionResult?.newlyCompleted ?? false}
            language={language}
            onRunAgain={resetToDefaults}
            onNavigate={onNavigate}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.pearlWhite,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.pearlWhite,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.slate600,
    fontWeight: '600',
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.navy900,
    marginBottom: 6,
  },
  errorSub: {
    fontSize: 13,
    color: colors.slate500,
    textAlign: 'center',
    marginBottom: 20,
  },
  backHomeBtn: {
    backgroundColor: colors.blue600,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  backHomeBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerSubjectBadge: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.blue600,
    letterSpacing: 0.8,
  },
  bookmarkBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkIcon: {
    fontSize: 20,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 50,
  },
  titleSection: {
    marginBottom: 16,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  heroAssetBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroAsset: {
    fontSize: 28,
  },
  titleCol: {
    flex: 1,
  },
  experimentTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.navy900,
  },
  experimentSub: {
    fontSize: 13,
    color: colors.slate600,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metaBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.navy800,
  },
  safetyTag: {
    backgroundColor: '#FAF5FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  safetyTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.purple700,
  },
  missionCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  missionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  missionIcon: {
    fontSize: 16,
  },
  missionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.blue700,
    letterSpacing: 0.6,
  },
  missionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.navy900,
    lineHeight: 18,
  },
  sectionBlock: {
    marginBottom: 14,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionBlockTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.slate600,
    letterSpacing: 0.8,
  },
  resetText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.blue600,
  },
  completeButton: {
    backgroundColor: colors.blue600,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    ...Platform.select({
      ios: {
        shadowColor: colors.blue600,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  completeButtonDisabled: {
    backgroundColor: '#CBD5E1',
    shadowOpacity: 0,
    elevation: 0,
  },
  completeButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});
