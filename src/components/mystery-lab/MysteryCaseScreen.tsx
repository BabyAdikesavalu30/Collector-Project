/**
 * Mystery Lab — Case Investigation Screen
 * Handles the full investigation flow: intro → scene → investigate → clues →
 * evidence board → hypotheses → conclusion → result → learning insight.
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { MysteryCase, MysteryClue, MysteryHypothesis, ConfidenceLevel } from '../../features/mystery-lab/mystery.types';
import { useMysteryInvestigation } from '../../features/mystery-lab/useMysteryInvestigation';
import {
  localize,
  CATEGORY_CONFIG,
  DIFFICULTY_CONFIG,
  GRADE_RANGE_CONFIG,
  formatElapsedMs,
} from '../../features/mystery-lab/mystery.utils';
import { getNextAvailableHint } from '../../features/mystery-lab/mystery.engine';
import { getStarRating } from '../../features/mystery-lab/mystery.scoring';
import { AppBackButton } from '../navigation';
import { getEssentialClueCount, getSelectedEssentialCount } from '../../features/mystery-lab/mystery.scoring';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface MysteryCaseScreenProps {
  mysteryCase: MysteryCase;
  language: SupportedLanguage;
}

export const MysteryCaseScreen: React.FC<MysteryCaseScreenProps> = ({ mysteryCase, language }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isTamil = language === 'ta';

  const investigation = useMysteryInvestigation(mysteryCase);
  const { state, result, elapsedSeconds, isTimerActive, currentHintIndex, maxHints } = investigation;

  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showHintPanel, setShowHintPanel] = useState(false);

  const currentHint = useMemo(
    () => getNextAvailableHint(state, mysteryCase),
    [state, mysteryCase]
  );

  const essentialCount = useMemo(() => getEssentialClueCount(mysteryCase), [mysteryCase]);
  const selectedEssentialCount = useMemo(
    () => getSelectedEssentialCount(mysteryCase, state.selectedEvidenceIds),
    [mysteryCase, state.selectedEvidenceIds]
  );

  // Handle back press
  const handleBack = useCallback(() => {
    if (state.currentStep !== 'introduction' && state.currentStep !== 'result') {
      setShowExitDialog(true);
    } else if (state.currentStep === 'result') {
      router.replace('/mystery-lab');
    } else {
      investigation.goBack();
      router.back();
    }
  }, [state.currentStep, investigation, router]);

  // Render based on current step
  const renderContent = () => {
    switch (state.currentStep) {
      case 'introduction':
        return renderIntroduction();
      case 'scene':
        return renderScene();
      case 'investigate':
        return renderInvestigate();
      case 'clues':
        return renderClues();
      case 'evidence-board':
        return renderEvidenceBoard();
      case 'hypotheses':
        return renderHypotheses();
      case 'conclusion':
        return renderConclusion();
      case 'result':
        return renderResult();
      case 'learning-insight':
        return renderLearningInsight();
      default:
        return null;
    }
  };

  // INTRODUCTION
  const renderIntroduction = () => (
    <View style={styles.stepContainer}>
      <View style={styles.introCard}>
        <View style={styles.introHeader}>
          <Text style={styles.introIcon}>{CATEGORY_CONFIG[mysteryCase.category].icon}</Text>
          <View>
            <Text style={styles.caseNumber}>{isTamil ? 'வழக்கு' : 'CASE'}</Text>
            <Text style={styles.caseTitle}>{localize(mysteryCase.title, language)}</Text>
          </View>
        </View>

        <View style={styles.introMeta}>
          <View style={styles.metaTag}>
            <Text style={styles.metaTagText}>{CATEGORY_CONFIG[mysteryCase.category].labelEn}</Text>
          </View>
          <View style={styles.metaTag}>
            <Text style={[styles.metaTagText, { color: DIFFICULTY_CONFIG[mysteryCase.difficulty].color }]}>
              {DIFFICULTY_CONFIG[mysteryCase.difficulty].labelEn}
            </Text>
          </View>
          <View style={styles.metaTag}>
            <Text style={styles.metaTagText}>{GRADE_RANGE_CONFIG[mysteryCase.gradeRange].labelEn}</Text>
          </View>
          <View style={styles.metaTag}>
            <Text style={styles.metaTagText}>⏱ {mysteryCase.estimatedMinutes} min</Text>
          </View>
        </View>

        <View style={styles.mysteryBox}>
          <Text style={styles.mysteryLabel}>{isTamil ? 'மர்மம்' : 'THE MYSTERY'}</Text>
          <Text style={styles.mysteryText}>{localize(mysteryCase.description, language)}</Text>
        </View>

        <View style={styles.objectiveBox}>
          <Text style={styles.objectiveLabel}>{isTamil ? 'இலக்கு' : 'OBJECTIVE'}</Text>
          <Text style={styles.objectiveText}>{localize(mysteryCase.objective, language)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={investigation.startInvestigation}
        activeOpacity={0.7}
      >
        <Text style={styles.primaryButtonText}>
          {isTamil ? 'விசாரணையைத் தொடங்கு' : 'Start Investigation'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // SCENE
  const renderScene = () => (
    <View style={styles.stepContainer}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Text style={styles.progressLabel}>
          {isTamil ? 'குறிப்புகள்' : 'Clues Found'} {state.discoveredClueIds.length} / {mysteryCase.clues.length}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, {
            width: `${(state.discoveredClueIds.length / mysteryCase.clues.length) * 100}%`
          }]} />
        </View>
      </View>

      <View style={styles.sceneCard}>
        <Text style={styles.sceneLabel}>{isTamil ? 'காட்சி' : 'THE SCENE'}</Text>
        <Text style={styles.sceneHint}>{isTamil ? 'ஆய்வு செய்ய பொருட்களைத் தட்டுங்கள்.' : 'Tap objects to investigate.'}</Text>

        {/* Scene Objects Grid */}
        <View style={styles.objectsGrid}>
          {mysteryCase.sceneObjects.map((obj) => {
            const isInspected = state.inspectedObjectIds.includes(obj.id);
            return (
              <TouchableOpacity
                key={obj.id}
                style={[styles.sceneObject, isInspected && styles.sceneObjectInspected]}
                onPress={() => investigation.inspectSceneObject(obj.id)}
                activeOpacity={0.7}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`${localize(obj.label, language)}, ${isInspected ? 'inspected' : 'tap to inspect'}`}
              >
                <Text style={styles.sceneObjectIcon}>{obj.icon}</Text>
                <Text style={styles.sceneObjectLabel}>{localize(obj.label, language)}</Text>
                {isInspected && <Text style={styles.inspectedBadge}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Discovered Evidence */}
      {state.discoveredClueIds.length > 0 && (
        <View style={styles.evidencePreview}>
          <Text style={styles.evidencePreviewLabel}>{isTamil ? 'கண்டறியப்பட்ட ஆதாரம்' : 'DISCOVERED EVIDENCE'}</Text>
          {mysteryCase.clues
            .filter((c) => state.discoveredClueIds.includes(c.id))
            .map((clue) => (
              <View key={clue.id} style={styles.evidenceItem}>
                <Text style={styles.evidenceItemIcon}>{clue.icon || '📋'}</Text>
                <Text style={styles.evidenceItemText}>{localize(clue.title, language)}</Text>
              </View>
            ))}
        </View>
      )}

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={investigation.advanceStep}
        activeOpacity={0.7}
      >
        <Text style={styles.primaryButtonText}>
          {isTamil ? 'தட்டுகளை ஆய்வு செய்' : 'Review Clues'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // INVESTIGATE
  const renderInvestigate = () => (
    <View style={styles.stepContainer}>
      <View style={styles.progressBarContainer}>
        <Text style={styles.progressLabel}>
          {isTamil ? 'குறிப்புகள்' : 'Clues Found'} {state.discoveredClueIds.length} / {mysteryCase.clues.length}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, {
            width: `${(state.discoveredClueIds.length / mysteryCase.clues.length) * 100}%`
          }]} />
        </View>
      </View>

      <View style={styles.sceneCard}>
        <Text style={styles.sceneLabel}>{isTamil ? 'ஆய்வு செய்' : 'INVESTIGATE'}</Text>
        <View style={styles.objectsGrid}>
          {mysteryCase.sceneObjects.map((obj) => {
            const isInspected = state.inspectedObjectIds.includes(obj.id);
            return (
              <TouchableOpacity
                key={obj.id}
                style={[styles.sceneObject, isInspected && styles.sceneObjectInspected]}
                onPress={() => investigation.inspectSceneObject(obj.id)}
                activeOpacity={0.7}
                accessible={true}
                accessibilityRole="button"
              >
                <Text style={styles.sceneObjectIcon}>{obj.icon}</Text>
                <Text style={styles.sceneObjectLabel}>{localize(obj.label, language)}</Text>
                {isInspected && <Text style={styles.inspectedBadge}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={investigation.advanceStep}
        activeOpacity={0.7}
      >
        <Text style={styles.primaryButtonText}>
          {isTamil ? 'சான்று பலகைக்குச் செல்' : 'Evidence Board'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // CLUES
  const renderClues = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.sectionTitle}>{isTamil ? 'குறிப்புகள்' : 'DISCOVERED CLUES'}</Text>
      {mysteryCase.clues
        .filter((c) => state.discoveredClueIds.includes(c.id))
        .map((clue) => (
          <ClueCard key={clue.id} clue={clue} language={language} />
        ))}

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={investigation.advanceStep}
        activeOpacity={0.7}
      >
        <Text style={styles.primaryButtonText}>
          {isTamil ? 'சான்று பலகைக்குச் செல்' : 'Go to Evidence Board'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // EVIDENCE BOARD
  const renderEvidenceBoard = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.sectionTitle}>{isTamil ? 'சான்று பலகை' : 'EVIDENCE BOARD'}</Text>
      <Text style={styles.sectionSubtitle}>
        {isTamil ? 'முக்கியமான சான்றுகளைத் தேர்ந்தெடுக்கவும்.' : 'Select the evidence that supports your conclusion.'}
      </Text>

      {mysteryCase.clues
        .filter((c) => state.discoveredClueIds.includes(c.id))
        .map((clue) => {
          const isSelected = state.selectedEvidenceIds.includes(clue.id);
          return (
            <TouchableOpacity
              key={clue.id}
              style={[styles.evidenceBoardItem, isSelected && styles.evidenceBoardItemSelected]}
              onPress={() => investigation.toggleEvidenceSelection(clue.id)}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isSelected }}
            >
              <View style={styles.evidenceBoardCheck}>
                <Text style={styles.evidenceBoardCheckIcon}>{isSelected ? '✓' : ''}</Text>
              </View>
              <View style={styles.evidenceBoardContent}>
                <Text style={styles.evidenceBoardTitle}>{localize(clue.title, language)}</Text>
                <Text style={styles.evidenceBoardObservation} numberOfLines={2}>
                  {localize(clue.observation, language)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

      <TouchableOpacity
        style={[styles.primaryButton, !investigation.canSubmit && styles.primaryButtonDisabled]}
        onPress={investigation.advanceStep}
        activeOpacity={0.7}
        disabled={!investigation.canSubmit}
      >
        <Text style={styles.primaryButtonText}>
          {isTamil ? 'நரம்பு தேர்வுகளுக்குச் செல்' : 'Select Hypothesis'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // HYPOTHESES
  const renderHypotheses = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.sectionTitle}>{isTamil ? 'நீங்கள் என்ன நினைக்கிறீர்கள்?' : 'WHAT DO YOU THINK HAPPENED?'}</Text>

      {mysteryCase.hypotheses.map((hyp, idx) => {
        const isSelected = state.selectedHypothesisId === hyp.id;
        const letters = ['A', 'B', 'C', 'D', 'E'];
        return (
          <TouchableOpacity
            key={hyp.id}
            style={[styles.hypothesisItem, isSelected && styles.hypothesisItemSelected]}
            onPress={() => investigation.selectHypothesisChoice(hyp.id)}
            activeOpacity={0.7}
            accessible={true}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
          >
            <View style={[styles.hypothesisLetter, isSelected && styles.hypothesisLetterSelected]}>
              <Text style={[styles.hypothesisLetterText, isSelected && styles.hypothesisLetterTextSelected]}>
                {letters[idx]}
              </Text>
            </View>
            <Text style={[styles.hypothesisText, isSelected && styles.hypothesisTextSelected]}>
              {localize(hyp.title, language)}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Confidence */}
      <View style={styles.confidenceSection}>
        <Text style={styles.confidenceLabel}>{isTamil ? 'நம்பிக்கை நிலை' : 'Confidence'}</Text>
        <View style={styles.confidenceRow}>
          {(['low', 'medium', 'high'] as ConfidenceLevel[]).map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.confidenceButton, state.confidence === level && styles.confidenceButtonSelected]}
              onPress={() => investigation.setConfidenceLevel(level)}
              activeOpacity={0.7}
            >
              <Text style={[styles.confidenceButtonText, state.confidence === level && styles.confidenceButtonTextSelected]}>
                {level === 'low' ? (isTamil ? 'குறைவு' : 'Low') : level === 'medium' ? (isTamil ? 'சராசரி' : 'Medium') : (isTamil ? 'அதிகம்' : 'High')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, !investigation.canSubmit && styles.primaryButtonDisabled]}
        onPress={investigation.advanceStep}
        activeOpacity={0.7}
        disabled={!investigation.canSubmit}
      >
        <Text style={styles.primaryButtonText}>
          {isTamil ? 'முடிவைச் சமர்ப்பி' : 'Submit Conclusion'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // CONCLUSION
  const renderConclusion = () => {
    const selectedHyp = mysteryCase.hypotheses.find((h) => h.id === state.selectedHypothesisId);
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.sectionTitle}>{isTamil ? 'உங்கள் முடிவு' : 'YOUR CONCLUSION'}</Text>

        {selectedHyp && (
          <View style={styles.conclusionCard}>
            <Text style={styles.conclusionText}>{localize(selectedHyp.title, language)}</Text>
          </View>
        )}

        <View style={styles.conclusionSummary}>
          <Text style={styles.summaryTitle}>{isTamil ? 'சுருக்கம்' : 'Summary'}</Text>
          <Text style={styles.summaryItem}>
            {isTamil ? 'கண்டறியப்பட்ட குறிப்புகள்' : 'Clues Discovered'}: {state.discoveredClueIds.length} / {mysteryCase.clues.length}
          </Text>
          <Text style={styles.summaryItem}>
            {isTamil ? 'தேர்ந்தெடுக்கப்பட்ட சான்று' : 'Evidence Selected'}: {state.selectedEvidenceIds.length}
          </Text>
          <Text style={styles.summaryItem}>
            {isTamil ? 'பயன்படுத்திய குறிப்புகள்' : 'Hints Used'}: {state.hintsUsed.length}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={investigation.submitFinalConclusion}
          activeOpacity={0.7}
        >
          <Text style={styles.primaryButtonText}>
            {isTamil ? 'முடிவைச் சமர்ப்பி' : 'Submit Conclusion'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // RESULT
  const renderResult = () => {
    if (!result) return null;
    const isCorrect = result.correct;
    const stars = result.score.stars;

    return (
      <View style={styles.stepContainer}>
        <View style={[styles.resultHeader, isCorrect ? styles.resultHeaderCorrect : styles.resultHeaderIncorrect]}>
          <Text style={styles.resultIcon}>{isCorrect ? '✓' : '🔍'}</Text>
          <Text style={[styles.resultTitle, isCorrect ? styles.resultTitleCorrect : styles.resultTitleIncorrect]}>
            {isCorrect
              ? (isTamil ? 'வழக்கு தீர்க்கப்பட்டது!' : 'CASE SOLVED!')
              : (isTamil ? 'விசாரணை முடிந்தது' : 'Investigation Complete')}
          </Text>
          <Text style={styles.resultCaseName}>{localize(mysteryCase.title, language)}</Text>
        </View>

        {/* Score */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreValue}>{result.score.totalScore}</Text>
          <Text style={styles.scoreLabel}>{isTamil ? 'மதிப்பெண்' : 'SCORE'}</Text>
          <Text style={styles.starsText}>
            {'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
          </Text>
          {result.score.isPerfect && (
            <Text style={styles.perfectText}>{isTamil ? 'துல்லியமான விசாரணை' : 'Perfect Investigation'}</Text>
          )}
        </View>

        {/* Breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>{isTamil ? 'மதிப்பெண் விவரம்' : 'Score Breakdown'}</Text>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>{isTamil ? 'முடிவு' : 'Conclusion'}</Text>
            <Text style={styles.breakdownValue}>{result.score.conclusionPoints}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>{isTamil ? 'சான்று' : 'Evidence'}</Text>
            <Text style={styles.breakdownValue}>{result.score.evidencePoints}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>{isTamil ? 'விசாரணை' : 'Investigation'}</Text>
            <Text style={styles.breakdownValue}>{result.score.investigationPoints}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>{isTamil ? 'நேர போனஸ்' : 'Time Bonus'}</Text>
            <Text style={styles.breakdownValue}>+{result.score.timeBonusPoints}</Text>
          </View>
          {result.score.hintDeductions < 0 && (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>{isTamil ? 'குறிப்பு குறைப்பு' : 'Hint Deductions'}</Text>
              <Text style={[styles.breakdownValue, { color: theme.colors.error }]}>{result.score.hintDeductions}</Text>
            </View>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>{isTamil ? 'கண்டறியப்பட்ட குறிப்புகள்' : 'Clues Found'}</Text>
            <Text style={styles.statValue}>{result.discoveredClueCount} / {result.totalClueCount}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>{isTamil ? 'தேர்ந்தெடுக்கப்பட்ட சான்று' : 'Evidence Used'}</Text>
            <Text style={styles.statValue}>{result.selectedEvidenceCount}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>{isTamil ? 'பயன்படுத்திய குறிப்புகள்' : 'Hints Used'}</Text>
            <Text style={styles.statValue}>{result.hintsUsedCount}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>{isTamil ? 'நேரம்' : 'Time'}</Text>
            <Text style={styles.statValue}>{result.elapsedFormatted}</Text>
          </View>
        </View>

        {/* Correct/Incorrect */}
        <View style={styles.conclusionResultCard}>
          <Text style={styles.conclusionResultLabel}>{isTamil ? 'உங்கள் முடிவு' : 'Your Conclusion'}</Text>
          <Text style={[styles.conclusionResultText, !isCorrect && styles.conclusionResultWrong]}>
            {localize(mysteryCase.hypotheses.find((h) => h.id === result.selectedHypothesisId)?.title || { en: '', ta: '' }, language)}
          </Text>
          {!isCorrect && (
            <>
              <Text style={styles.conclusionResultLabel}>{isTamil ? 'சரியான முடிவு' : 'Correct Conclusion'}</Text>
              <Text style={styles.conclusionResultText}>
                {localize(mysteryCase.hypotheses.find((h) => h.id === result.correctHypothesisId)?.title || { en: '', ta: '' }, language)} ✓
              </Text>
            </>
          )}
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => investigation.advanceStep()}
          activeOpacity={0.7}
        >
          <Text style={styles.primaryButtonText}>
            {isTamil ? 'அறிவியல் விளக்கம் பார்' : 'View Science Explanation'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={investigation.retryCase}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>
            {isTamil ? 'மீண்டும் முயற்சி' : 'Try Again'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ghostButton}
          onPress={() => router.replace('/mystery-lab')}
          activeOpacity={0.7}
        >
          <Text style={styles.ghostButtonText}>
            {isTamil ? 'மர்ம ஆய்வகத்திற்குத் திரும்பு' : 'Back to Mystery Lab'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // LEARNING INSIGHT
  const renderLearningInsight = () => (
    <View style={styles.stepContainer}>
      <View style={styles.insightCard}>
        <Text style={styles.insightLabel}>{isTamil ? 'மர்மத்தின் பின்னால் உள்ள அறிவியல்' : 'SCIENCE BEHIND THE MYSTERY'}</Text>
        <Text style={styles.insightText}>{localize(mysteryCase.explanation, language)}</Text>
      </View>

      <View style={styles.conceptCard}>
        <Text style={styles.conceptLabel}>{isTamil ? 'முக்கிய கருத்து' : 'KEY CONCEPT'}</Text>
        <View style={styles.conceptTags}>
          {mysteryCase.learningConcepts.map((concept) => (
            <View key={concept} style={styles.conceptTag}>
              <Text style={styles.conceptTagText}>{concept}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.replace('/mystery-lab')}
        activeOpacity={0.7}
      >
        <Text style={styles.primaryButtonText}>
          {isTamil ? 'அடுத்த மர்மம்' : 'Next Mystery'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.ghostButton}
        onPress={() => router.replace('/mystery-lab')}
        activeOpacity={0.7}
      >
        <Text style={styles.ghostButtonText}>
          {isTamil ? 'மர்ம ஆய்வகத்திற்குத் திரும்பு' : 'Back to Mystery Lab'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Hint Panel
  const renderHintPanel = () => {
    if (!currentHint) return null;
    return (
      <View style={styles.hintPanel}>
        <TouchableOpacity
          style={styles.hintToggleButton}
          onPress={() => setShowHintPanel(!showHintPanel)}
          activeOpacity={0.7}
        >
          <Text style={styles.hintToggleText}>
            💡 {isTamil ? 'ஒரு குறிப்பு வேண்டுமா?' : 'Need a Hint?'}
          </Text>
          <Text style={styles.hintToggleArrow}>{showHintPanel ? '▴' : '▾'}</Text>
        </TouchableOpacity>

        {showHintPanel && currentHint && (
          <View style={styles.hintContent}>
            <Text style={styles.hintText}>{currentHint.hintText}</Text>
            <TouchableOpacity
              style={styles.hintUseButton}
              onPress={() => {
                investigation.useInvestigationHint();
                setShowHintPanel(false);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.hintUseButtonText}>
                {isTamil ? 'குறிப்பைப் பயன்படுத்து' : 'Use Hint'} (-{currentHint.cost} {isTamil ? 'மதிப்பெண்' : 'points'})
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.xs }]}>
        <AppBackButton
          onPress={handleBack}
          accessibilityLabel={isTamil ? 'பின்னால் செல்லவும்' : 'Go back'}
          style={styles.backButton}
        />
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {localize(mysteryCase.title, language)}
          </Text>
          {isTimerActive && (
            <Text style={styles.timerText}>⏱ {formatElapsedMs(elapsedSeconds * 1000)}</Text>
          )}
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + theme.spacing.xxl }]}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}

        {/* Hint Panel (visible during investigation, not on result/intro) */}
        {state.currentStep !== 'introduction' && state.currentStep !== 'result' && state.currentStep !== 'learning-insight' && (
          renderHintPanel()
        )}
      </ScrollView>

      {/* Exit Dialog */}
      <Modal visible={showExitDialog} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setShowExitDialog(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isTamil ? 'விசாரணையை விட்டு வெளியேறுவதா?' : 'Leave Investigation?'}</Text>
            <Text style={styles.modalBody}>
              {isTamil
                ? 'உங்கள் விசாரணை முன்னேற்றம் இழக்கப்படும்.'
                : 'Your investigation progress will be lost.'}
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowExitDialog(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCancelText}>{isTamil ? 'இரு' : 'Stay'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalLeaveButton}
                onPress={() => {
                  setShowExitDialog(false);
                  investigation.goBack();
                  router.back();
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.modalLeaveText}>{isTamil ? 'வெளியேறு' : 'Leave'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

// ============================================================================
// Clue Card Sub-component
// ============================================================================

const ClueCard: React.FC<{ clue: MysteryClue; language: SupportedLanguage }> = ({ clue, language }) => (
  <View style={clueStyles.card}>
    <View style={clueStyles.header}>
      <Text style={clueStyles.icon}>{clue.icon || '📋'}</Text>
      <Text style={clueStyles.title}>{localize(clue.title, language)}</Text>
    </View>
    <Text style={clueStyles.observation}>{localize(clue.observation, language)}</Text>
    {clue.dataLabel && clue.dataValue && (
      <View style={clueStyles.dataRow}>
        <Text style={clueStyles.dataLabel}>{localize(clue.dataLabel, language)}</Text>
        <Text style={clueStyles.dataValue}>{localize(clue.dataValue, language)}</Text>
      </View>
    )}
  </View>
);

const clueStyles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    gap: 8,
  },
  icon: { fontSize: 20 },
  title: {
    ...theme.typography.bodyLarge,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  observation: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    lineHeight: 20,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.blue50,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  dataLabel: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
  },
  dataValue: {
    ...theme.typography.bodyLarge,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
  },
});

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.pearlWhite },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {},
  headerCenter: { flex: 1, alignItems: 'center', marginHorizontal: theme.spacing.xs },
  headerTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  timerText: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  headerSpacer: { width: 44 },
  scroll: { flex: 1 },
  scrollContent: { padding: theme.spacing.lg },
  stepContainer: {},

  // Progress
  progressBarContainer: { marginBottom: theme.spacing.md },
  progressLabel: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
    marginBottom: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.gray200,
    borderRadius: 3,
  },
  progressFill: {
    height: 6,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: 3,
  },

  // Introduction
  introCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.base,
  },
  introHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: 12,
  },
  introIcon: { fontSize: 36 },
  caseNumber: {
    ...theme.typography.overline,
    fontSize: 10,
    color: theme.colors.slate500,
  },
  caseTitle: {
    ...theme.typography.h2,
    fontSize: 20,
    color: theme.colors.navy900,
  },
  introMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: theme.spacing.md,
  },
  metaTag: {
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  metaTagText: {
    ...theme.typography.caption,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  mysteryBox: {
    backgroundColor: theme.colors.blue50,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  mysteryLabel: {
    ...theme.typography.overline,
    fontSize: 10,
    color: theme.colors.actionPrimary,
    marginBottom: 6,
  },
  mysteryText: {
    ...theme.typography.body,
    color: theme.colors.navy800,
    lineHeight: 20,
  },
  objectiveBox: {
    backgroundColor: theme.colors.green50,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  objectiveLabel: {
    ...theme.typography.overline,
    fontSize: 10,
    color: theme.colors.success,
    marginBottom: 6,
  },
  objectiveText: {
    ...theme.typography.body,
    color: theme.colors.navy800,
    lineHeight: 20,
  },

  // Scene
  sceneCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.base,
  },
  sceneLabel: {
    ...theme.typography.overline,
    fontSize: 11,
    color: theme.colors.slate500,
    marginBottom: 4,
  },
  sceneHint: {
    ...theme.typography.body,
    color: theme.colors.slate500,
    marginBottom: theme.spacing.md,
  },
  objectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  sceneObject: {
    width: (SCREEN_WIDTH - theme.spacing.lg * 2 - theme.spacing.lg * 2 - theme.spacing.sm * 2) / 2,
    backgroundColor: theme.colors.gray50,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  sceneObjectInspected: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.blue50,
  },
  sceneObjectIcon: { fontSize: 28, marginBottom: 6 },
  sceneObjectLabel: {
    ...theme.typography.caption,
    color: theme.colors.navy800,
    fontWeight: '600',
    textAlign: 'center',
  },
  inspectedBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    fontSize: 12,
    color: theme.colors.actionPrimary,
    fontWeight: '700',
  },

  // Evidence Preview
  evidencePreview: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.base,
  },
  evidencePreviewLabel: {
    ...theme.typography.overline,
    fontSize: 10,
    color: theme.colors.slate500,
    marginBottom: theme.spacing.sm,
  },
  evidenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 8,
  },
  evidenceItemIcon: { fontSize: 14 },
  evidenceItemText: {
    ...theme.typography.body,
    color: theme.colors.navy800,
    fontSize: 13,
  },

  // Section Titles
  sectionTitle: {
    ...theme.typography.h3,
    fontSize: 17,
    color: theme.colors.navy900,
    marginBottom: theme.spacing.sm,
  },
  sectionSubtitle: {
    ...theme.typography.body,
    color: theme.colors.slate500,
    marginBottom: theme.spacing.md,
  },

  // Evidence Board
  evidenceBoardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    gap: 12,
  },
  evidenceBoardItemSelected: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.blue50,
  },
  evidenceBoardCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.slate400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  evidenceBoardCheckIcon: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
  },
  evidenceBoardContent: { flex: 1 },
  evidenceBoardTitle: {
    ...theme.typography.bodyLarge,
    fontWeight: '700',
    color: theme.colors.navy900,
    fontSize: 14,
  },
  evidenceBoardObservation: {
    ...theme.typography.body,
    color: theme.colors.slate500,
    fontSize: 12,
    marginTop: 2,
  },

  // Hypotheses
  hypothesisItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    gap: 12,
  },
  hypothesisItemSelected: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.blue50,
  },
  hypothesisLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hypothesisLetterSelected: {
    backgroundColor: theme.colors.actionPrimary,
  },
  hypothesisLetterText: {
    ...theme.typography.bodyLarge,
    fontWeight: '800',
    color: theme.colors.slate600,
  },
  hypothesisLetterTextSelected: {
    color: theme.colors.textOnAction,
  },
  hypothesisText: {
    flex: 1,
    ...theme.typography.bodyLarge,
    color: theme.colors.navy800,
  },
  hypothesisTextSelected: {
    fontWeight: '700',
    color: theme.colors.navy900,
  },

  // Confidence
  confidenceSection: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.base,
  },
  confidenceLabel: {
    ...theme.typography.bodyLarge,
    fontWeight: '600',
    color: theme.colors.navy800,
    marginBottom: theme.spacing.sm,
  },
  confidenceRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  confidenceButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  confidenceButtonSelected: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.blue50,
  },
  confidenceButtonText: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  confidenceButtonTextSelected: {
    color: theme.colors.actionPrimary,
  },

  // Conclusion
  conclusionCard: {
    backgroundColor: theme.colors.blue50,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.base,
    borderWidth: 1.5,
    borderColor: theme.colors.actionPrimary,
  },
  conclusionText: {
    ...theme.typography.bodyLarge,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  conclusionSummary: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.base,
  },
  summaryTitle: {
    ...theme.typography.bodyLarge,
    fontWeight: '700',
    color: theme.colors.navy800,
    marginBottom: theme.spacing.sm,
  },
  summaryItem: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    marginBottom: 4,
  },

  // Result
  resultHeader: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.base,
  },
  resultHeaderCorrect: {
    backgroundColor: theme.colors.green50,
    borderWidth: 1.5,
    borderColor: theme.colors.successBorder,
  },
  resultHeaderIncorrect: {
    backgroundColor: theme.colors.gray50,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
  },
  resultIcon: { fontSize: 36, marginBottom: theme.spacing.sm },
  resultTitle: {
    ...theme.typography.h2,
    fontSize: 22,
    marginBottom: 4,
  },
  resultTitleCorrect: { color: theme.colors.success },
  resultTitleIncorrect: { color: theme.colors.navy900 },
  resultCaseName: {
    ...theme.typography.body,
    color: theme.colors.slate500,
  },

  // Score
  scoreCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.base,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  scoreLabel: {
    ...theme.typography.overline,
    color: theme.colors.slate500,
    marginBottom: theme.spacing.sm,
  },
  starsText: { fontSize: 24, letterSpacing: 4 },
  perfectText: {
    ...theme.typography.bodyLarge,
    fontWeight: '700',
    color: theme.colors.success,
    marginTop: theme.spacing.sm,
  },

  // Breakdown
  breakdownCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.base,
  },
  breakdownTitle: {
    ...theme.typography.bodyLarge,
    fontWeight: '700',
    color: theme.colors.navy800,
    marginBottom: theme.spacing.sm,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  breakdownLabel: {
    ...theme.typography.body,
    color: theme.colors.slate600,
  },
  breakdownValue: {
    ...theme.typography.bodyLarge,
    fontWeight: '700',
    color: theme.colors.navy900,
  },

  // Stats
  statsCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.base,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  statLabel: {
    ...theme.typography.body,
    color: theme.colors.slate600,
  },
  statValue: {
    ...theme.typography.bodyLarge,
    fontWeight: '700',
    color: theme.colors.navy900,
  },

  // Conclusion Result
  conclusionResultCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.base,
  },
  conclusionResultLabel: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
    marginBottom: 4,
    marginTop: 8,
  },
  conclusionResultText: {
    ...theme.typography.bodyLarge,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  conclusionResultWrong: {
    color: theme.colors.error,
  },

  // Learning Insight
  insightCard: {
    backgroundColor: theme.colors.blue50,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.infoBorder,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.base,
  },
  insightLabel: {
    ...theme.typography.overline,
    fontSize: 11,
    color: theme.colors.actionPrimary,
    marginBottom: theme.spacing.sm,
  },
  insightText: {
    ...theme.typography.body,
    color: theme.colors.navy800,
    lineHeight: 22,
  },
  conceptCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.base,
  },
  conceptLabel: {
    ...theme.typography.overline,
    fontSize: 10,
    color: theme.colors.slate500,
    marginBottom: theme.spacing.sm,
  },
  conceptTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conceptTag: {
    backgroundColor: theme.colors.purple50,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: theme.colors.brandBadgeBorder,
  },
  conceptTagText: {
    ...theme.typography.caption,
    color: theme.colors.brandBadgeText,
    fontWeight: '600',
  },

  // Hint Panel
  hintPanel: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: theme.spacing.base,
  },
  hintToggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  hintToggleText: {
    ...theme.typography.bodyLarge,
    fontWeight: '600',
    color: theme.colors.actionPrimary,
  },
  hintToggleArrow: {
    fontSize: 14,
    color: theme.colors.actionPrimary,
  },
  hintContent: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  hintText: {
    ...theme.typography.body,
    color: theme.colors.navy800,
    backgroundColor: theme.colors.blue50,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
  hintUseButton: {
    backgroundColor: theme.colors.actionSecondary,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.actionBorder,
  },
  hintUseButtonText: {
    ...theme.typography.body,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
  },

  // Buttons
  primaryButton: {
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: theme.spacing.base,
  },
  primaryButtonDisabled: {
    backgroundColor: theme.colors.gray300,
  },
  primaryButtonText: {
    ...theme.typography.button,
    fontSize: 15,
    color: theme.colors.textOnAction,
  },
  secondaryButton: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.actionPrimary,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  secondaryButtonText: {
    ...theme.typography.button,
    fontSize: 15,
    color: theme.colors.actionPrimary,
  },
  ghostButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  ghostButtonText: {
    ...theme.typography.body,
    fontWeight: '600',
    color: theme.colors.slate500,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: theme.colors.backgroundOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    width: '100%',
    maxWidth: 340,
  },
  modalTitle: {
    ...theme.typography.h3,
    color: theme.colors.navy900,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  modalBody: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  modalCancelText: {
    ...theme.typography.button,
    fontSize: 14,
    color: theme.colors.slate600,
  },
  modalLeaveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.error,
    alignItems: 'center',
  },
  modalLeaveText: {
    ...theme.typography.button,
    fontSize: 14,
    color: theme.colors.textOnAction,
  },
});
