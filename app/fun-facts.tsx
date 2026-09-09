/**
 * Fun Facts Route (/fun-facts)
 * Interactive science discovery experience with multiple modes.
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ViewStyle } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Share,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme, colors } from '../src/theme';
import { SupportedLanguage, getTranslation } from '../src/config/i18n';
import { useLanguage } from '../src/context';
import { LanguageToggle } from '../src/components/language';
import { AppBackButton } from '../src/components/navigation';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { useFunFacts } from '../src/features/fun-facts/useFunFacts';
import {
  FunFact,
  FunFactCategory,
  FactQuestion,
  CATEGORY_ICONS,
  CATEGORY_ACCENTS,
} from '../src/features/fun-facts/fun-facts.types';
import { FACT_COLLECTIONS } from '../src/features/fun-facts/fun-facts.mock';
import {
  getLocalizedText,
  getCategoryName,
  formatStreakText,
} from '../src/features/fun-facts/fun-facts.utils';
import { getTodayString } from '../src/features/fun-facts/fun-facts.engine';
import {
  getFactsByCategory,
  searchFacts,
} from '../src/features/fun-facts/fun-facts.engine';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type ViewMode = 'home' | 'swipe' | 'true-false' | 'guess' | 'quiz' | 'collections' | 'saved';

export default function FunFactsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [firstTimeDismissed, setFirstTimeDismissed] = useState(false);
  const [showFirstTime, setShowFirstTime] = useState(false);

  const funFacts = useFunFacts();
  const isTamil = language === 'ta';

  // Load first-time dismissal preference
  useEffect(() => {
    (async () => {
      const dismissed = await storage.getItem<boolean>(STORAGE_KEYS.FUN_FACTS_DISMISSED);
      if (!dismissed) setShowFirstTime(true);
      setFirstTimeDismissed(dismissed === true);
    })();
  }, []);

  const dismissFirstTime = async () => {
    setShowFirstTime(false);
    setFirstTimeDismissed(true);
    await storage.setItem(STORAGE_KEYS.FUN_FACTS_DISMISSED, true);
  };

  // ═══════════════════════════════════════════════════════════════════
  // FIRST TIME OVERLAY
  // ═══════════════════════════════════════════════════════════════════
  if (showFirstTime) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <View style={styles.firstTimeContainer}>
          <View style={styles.firstTimeIcon}>
            <Text style={{ fontSize: 48 }}>🔬</Text>
          </View>
          <Text style={styles.firstTimeTitle}>
            {isTamil ? 'அறிவியலை கண்டறியுங்கள்' : 'Discover Science'}
          </Text>
          <Text style={styles.firstTimeSubtitle}>
            {isTamil
              ? 'விரைவான உண்மைகளை ஆராயுங்கள், உங்களை சோதித்துக்கொள்ளுங்கள், உங்கள் அறிவியல் அறிவை வளர்த்துக்கொள்ளுங்கள்.'
              : 'Explore quick facts, test yourself, and build your science knowledge.'}
          </Text>
          <TouchableOpacity
            style={styles.firstTimeButton}
            onPress={dismissFirstTime}
            accessible
            accessibilityRole="button"
            accessibilityLabel={isTamil ? 'ஆராய்வோம்' : "Let's Explore"}
          >
            <Text style={styles.firstTimeButtonText}>
              {isTamil ? 'ஆராய்வோம்' : "Let's Explore"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // SUB-VIEWS
  // ═══════════════════════════════════════════════════════════════════

  const renderHeader = () => (
    <View style={styles.header}>
      <AppBackButton
        onPress={() => {
          if (viewMode === 'home') router.back();
          else setViewMode('home');
        }}
        language={language}
        style={styles.backBtn}
      />
      <Text style={styles.headerTitle}>
        {isTamil ? 'சுவாரஸ்ய தகவல்கள்' : 'Fun Facts'}
      </Text>
      <LanguageToggle />
    </View>
  );

  // ── FACT CARD ──────────────────────────────────────────────────────
  const FactCard: React.FC<{
    fact: FunFact;
    onPress?: () => void;
    compact?: boolean;
  }> = React.memo(({ fact, onPress, compact }) => {
    const saved = funFacts.progress?.savedFactIds.includes(fact.id) || false;
    return (
      <TouchableOpacity
        style={[styles.factCard, compact && styles.factCardCompact]}
        onPress={onPress}
        activeOpacity={0.85}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`${getCategoryName(fact.category, language)}: ${getLocalizedText(fact.fact, language)}`}
      >
        <View style={[styles.categoryBadge, { backgroundColor: CATEGORY_ACCENTS[fact.category] + '15' }]}>
          <Text style={[styles.categoryBadgeText, { color: CATEGORY_ACCENTS[fact.category] }]}>
            {CATEGORY_ICONS[fact.category]} {getCategoryName(fact.category, language).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.factText}>{getLocalizedText(fact.fact, language)}</Text>
        {fact.explanation && !compact && (
          <Text style={styles.factExplanation}>{getLocalizedText(fact.explanation, language)}</Text>
        )}
        <View style={styles.factFooter}>
          <Text style={styles.factIcon}>{fact.icon}</Text>
          {onPress && (
            <View style={styles.factActions}>
              <TouchableOpacity
                onPress={async () => {
                  await funFacts.saveFact(fact.id);
                }}
                accessible
                accessibilityRole="button"
                accessibilityLabel={saved ? (isTamil ? 'சேமிப்பு நீக்கு' : 'Unsave') : (isTamil ? 'சேமி' : 'Save')}
              >
                <Text style={styles.saveBtn}>{saved ? '♥' : '♡'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await Share.share({
                      message: `${getLocalizedText(fact.fact, language)}\n\n— ${isTamil ? 'விஞ்ஞான் சுவாரஸ்ய தகவல்கள்' : 'Vigyaan Fun Facts'}`,
                    });
                  } catch {}
                }}
                accessible
                accessibilityRole="button"
                accessibilityLabel={isTamil ? 'பகிர்' : 'Share'}
              >
                <Text style={styles.shareBtn}>↗</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  });

  // ═══════════════════════════════════════════════════════════════════
  // HOME VIEW
  // ═══════════════════════════════════════════════════════════════════
  const renderHome = () => {
    const dailyFact = funFacts.currentFact;
    const streak = funFacts.progress?.streak?.currentStreak || 0;
    const savedCount = funFacts.progress?.savedFactIds.length || 0;
    const discoveredCount = funFacts.progress?.factsDiscovered.length || 0;

    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + theme.spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.homeTitle}>{isTamil ? 'அறிவியலை கண்டறியுங்கள்' : 'Discover Science'}</Text>
        <Text style={styles.homeSubtitle}>
          {isTamil ? 'ஒரு நிமிடத்திற்குள் ஏதாவது ஆச்சரியமானதை கற்றுக்கொள்ளுங்கள்.' : 'Learn something amazing in less than a minute.'}
        </Text>

        {/* Streak */}
        {streak > 0 && (
          <View style={styles.streakCard}>
            <Text style={styles.streakText}>{formatStreakText(streak, language)}</Text>
          </View>
        )}

        {/* Daily Fact */}
        {dailyFact && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{isTamil ? 'இன்றைய தகவல்' : "TODAY'S FACT"}</Text>
            <FactCard
              fact={dailyFact}
              onPress={async () => {
                await funFacts.discoverFact(dailyFact.id);
                await funFacts.viewDailyFact();
                setViewMode('swipe');
                funFacts.startSwipe(1);
              }}
            />
          </View>
        )}

        {/* Quick Modes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{isTamil ? 'விரைவு முறைகள்' : 'QUICK MODES'}</Text>
          <View style={styles.modesGrid}>
            <TouchableOpacity
              style={[styles.modeCard, { backgroundColor: colors.infoBackground }]}
              onPress={() => {
                funFacts.startTrueFalse(10);
                setViewMode('true-false');
              }}
              accessible
              accessibilityRole="button"
            >
              <Text style={styles.modeIcon}>✅</Text>
              <Text style={styles.modeLabel}>{isTamil ? 'சரி அல்லது தவறு' : 'True or False'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeCard, { backgroundColor: colors.brandBadge }]}
              onPress={() => {
                funFacts.startGuessFact(10);
                setViewMode('guess');
              }}
              accessible
              accessibilityRole="button"
            >
              <Text style={styles.modeIcon}>❓</Text>
              <Text style={styles.modeLabel}>{isTamil ? 'தகவலை யூகி' : 'Guess the Fact'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeCard, { backgroundColor: colors.successSurface }]}
              onPress={() => {
                funFacts.startQuiz(5);
                setViewMode('quiz');
              }}
              accessible
              accessibilityRole="button"
            >
              <Text style={styles.modeIcon}>📝</Text>
              <Text style={styles.modeLabel}>{isTamil ? 'தகவல் வினாடி வினா' : 'Fact Quiz'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Collections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{isTamil ? 'தொகுப்புகள்' : 'COLLECTIONS'}</Text>
          {FACT_COLLECTIONS.map((col: { id: string; title: { en: string; ta: string }; factIds: string[]; icon: string }) => {
            const discovered = col.factIds.filter((id: string) =>
              funFacts.progress?.factsDiscovered.includes(id)
            ).length;
            const isComplete = discovered === col.factIds.length;
            return (
              <TouchableOpacity
                key={col.id}
                style={styles.collectionCard}
                onPress={() => setViewMode('collections')}
                accessible
                accessibilityRole="button"
                accessibilityLabel={`${getLocalizedText(col.title, language)}: ${discovered}/${col.factIds.length}`}
              >
                <Text style={styles.collectionIcon}>{col.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.collectionTitle}>{getLocalizedText(col.title, language)}</Text>
                  <Text style={styles.collectionProgress}>
                    {discovered} / {col.factIds.length} {isTamil ? 'கண்டறியப்பட்டது' : 'discovered'}
                  </Text>
                </View>
                {isComplete && <Text style={styles.collectionComplete}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Saved Facts */}
        {savedCount > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{isTamil ? 'சேமிக்கப்பட்ட தகவல்கள்' : 'SAVED FACTS'}</Text>
            <Text style={styles.savedCount}>{savedCount} {isTamil ? 'சேமிக்கப்பட்டது' : 'saved'}</Text>
          </View>
        )}

        {/* Discovery Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{isTamil ? 'கண்டறிதல் முன்னேற்றம்' : 'DISCOVERY PROGRESS'}</Text>
          <View style={styles.progressCard}>
            <Text style={styles.progressLabel}>{isTamil ? 'தகவல்கள் கண்டறியப்பட்டன' : 'Facts Discovered'}</Text>
            <Text style={styles.progressValue}>{discoveredCount} / {150}</Text>
          </View>
          <View style={styles.progressCard}>
            <Text style={styles.progressLabel}>{isTamil ? 'மொத்த புள்ளிகள்' : 'Total Points'}</Text>
            <Text style={styles.progressValue}>{funFacts.progress?.totalPoints || 0}</Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  // ═══════════════════════════════════════════════════════════════════
  // SWIPE VIEW
  // ═══════════════════════════════════════════════════════════════════
  const renderSwipeView = () => {
    const facts = funFacts.swipeFacts.length > 0 ? funFacts.swipeFacts : [funFacts.currentFact].filter(Boolean) as FunFact[];
    const fact = facts[funFacts.currentSwipeIndex] || facts[0];
    if (!fact) return null;

    return (
      <View style={styles.swipeContainer}>
        <Text style={styles.swipeProgress}>
          {funFacts.currentSwipeIndex + 1} / {facts.length}
        </Text>
        <FactCard fact={fact} onPress={() => funFacts.discoverFact(fact.id)} />
        <View style={styles.swipeActions}>
          <TouchableOpacity
            style={[styles.swipeBtn, styles.swipePrev]}
            onPress={funFacts.prevSwipe}
            disabled={funFacts.currentSwipeIndex === 0}
            accessible
            accessibilityRole="button"
          >
            <Text style={styles.swipeBtnText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.swipeBtn, styles.swipeNext]}
            onPress={funFacts.nextSwipe}
            disabled={funFacts.currentSwipeIndex >= facts.length - 1}
            accessible
            accessibilityRole="button"
          >
            <Text style={styles.swipeBtnText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // ═══════════════════════════════════════════════════════════════════
  // TRUE/FALSE VIEW
  // ═══════════════════════════════════════════════════════════════════
  const renderTrueFalse = () => {
    const q = funFacts.questions[funFacts.currentQuestionIndex];
    if (!q) return null;
    const total = funFacts.questions.length;
    const current = funFacts.currentQuestionIndex + 1;

    return (
      <View style={styles.quizContainer}>
        <Text style={styles.quizProgress}>
          {isTamil ? 'கேள்வி' : 'Question'} {current} {isTamil ? 'இல்' : 'of'} {total}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressBarFill, { width: `${(current / total) * 100}%` }]} />
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{getLocalizedText(q.statement, language)}</Text>
        </View>

        <View style={styles.tfButtons}>
          <TouchableOpacity
            style={[styles.tfBtn, styles.tfTrue, funFacts.selectedAnswer === 'true' && styles.tfBtnSelected]}
            onPress={() => funFacts.submitAnswer('true')}
            disabled={funFacts.hasAnswered}
            accessible
            accessibilityRole="button"
            accessibilityLabel="TRUE"
          >
            <Text style={[styles.tfBtnText, funFacts.selectedAnswer === 'true' && styles.tfBtnTextSelected]}>
              ✓ TRUE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tfBtn, styles.tfFalse, funFacts.selectedAnswer === 'false' && styles.tfBtnSelected]}
            onPress={() => funFacts.submitAnswer('false')}
            disabled={funFacts.hasAnswered}
            accessible
            accessibilityRole="button"
            accessibilityLabel="FALSE"
          >
            <Text style={[styles.tfBtnText, funFacts.selectedAnswer === 'false' && styles.tfBtnTextSelected]}>
              ✗ FALSE
            </Text>
          </TouchableOpacity>
        </View>

        {funFacts.hasAnswered && (
          <View style={styles.feedbackContainer}>
            <Text style={[styles.feedbackTitle, funFacts.isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect]}>
              {funFacts.isCorrect ? (isTamil ? '✓ சரி!' : '✓ Correct!') : (isTamil ? 'மன்னிக்கவும்' : 'Not quite.')}
            </Text>
            {q.explanation && (
              <Text style={styles.feedbackExplanation}>{getLocalizedText(q.explanation, language)}</Text>
            )}
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => {
                if (funFacts.currentQuestionIndex < funFacts.questions.length - 1) {
                  funFacts.nextQuestion();
                } else {
                  funFacts.finishQuiz();
                  setViewMode('home');
                }
              }}
              accessible
              accessibilityRole="button"
            >
              <Text style={styles.nextBtnText}>
                {funFacts.currentQuestionIndex < funFacts.questions.length - 1
                  ? (isTamil ? 'அடுத்த கேள்வி' : 'Next Fact')
                  : (isTamil ? 'முடிவுகள்' : 'View Results')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  // ═══════════════════════════════════════════════════════════════════
  // GUESS THE FACT VIEW
  // ═══════════════════════════════════════════════════════════════════
  const renderGuessFact = () => {
    const q = funFacts.questions[funFacts.currentQuestionIndex];
    if (!q || !q.options) return null;
    const total = funFacts.questions.length;
    const current = funFacts.currentQuestionIndex + 1;

    return (
      <View style={styles.quizContainer}>
        <Text style={styles.quizProgress}>
          {isTamil ? 'கேள்வி' : 'Question'} {current} {isTamil ? 'இல்' : 'of'} {total}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressBarFill, { width: `${(current / total) * 100}%` }]} />
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{getLocalizedText(q.statement, language)}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {q.options.map((opt, idx) => {
            const optText = getLocalizedText(opt, language);
            const isSelected = funFacts.selectedAnswer === optText;
            const isCorrectAnswer = q.correctAnswer === optText;
            let optionStyle: ViewStyle = styles.optionBtn;
            if (isSelected && funFacts.hasAnswered) {
              optionStyle = funFacts.isCorrect ? styles.optionCorrect : styles.optionIncorrect;
            } else if (funFacts.hasAnswered && isCorrectAnswer) {
              optionStyle = styles.optionCorrect;
            }
            return (
              <TouchableOpacity
                key={idx}
                style={optionStyle}
                onPress={() => funFacts.submitAnswer(optText)}
                disabled={funFacts.hasAnswered}
                accessible
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
              >
                <Text style={styles.optionText}>{optText}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {funFacts.hasAnswered && (
          <View style={styles.feedbackContainer}>
            <Text style={[styles.feedbackTitle, funFacts.isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect]}>
              {funFacts.isCorrect ? (isTamil ? '✓ சரி!' : '✓ Correct!') : (isTamil ? 'மன்னிக்கவும்' : 'Not quite.')}
            </Text>
            {q.explanation && (
              <Text style={styles.feedbackExplanation}>{getLocalizedText(q.explanation, language)}</Text>
            )}
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => {
                if (funFacts.currentQuestionIndex < funFacts.questions.length - 1) {
                  funFacts.nextQuestion();
                } else {
                  funFacts.finishQuiz();
                  setViewMode('home');
                }
              }}
              accessible
              accessibilityRole="button"
            >
              <Text style={styles.nextBtnText}>
                {funFacts.currentQuestionIndex < funFacts.questions.length - 1
                  ? (isTamil ? 'அடுத்த கேள்வி' : 'Next Fact')
                  : (isTamil ? 'முடிவுகள்' : 'View Results')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  // ═══════════════════════════════════════════════════════════════════
  // QUIZ VIEW (same as true-false but with mixed questions)
  // ═══════════════════════════════════════════════════════════════════
  const renderQuiz = () => {
    const q = funFacts.questions[funFacts.currentQuestionIndex];
    if (!q) return null;
    const total = funFacts.questions.length;
    const current = funFacts.currentQuestionIndex + 1;

    if (q.type === 'true-false') {
      return renderTrueFalse();
    }

    return renderGuessFact();
  };

  // ═══════════════════════════════════════════════════════════════════
  // COLLECTIONS VIEW
  // ═══════════════════════════════════════════════════════════════════
  const renderCollections = () => (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + theme.spacing.xl }]}
      showsVerticalScrollIndicator={false}
    >
      {FACT_COLLECTIONS.map((col: { id: string; title: { en: string; ta: string }; description: { en: string; ta: string }; factIds: string[]; icon: string; accentColor: string }) => {
        const discovered = col.factIds.filter((id: string) =>
          funFacts.progress?.factsDiscovered.includes(id)
        ).length;
        const isComplete = discovered === col.factIds.length;
        const progressPercent = col.factIds.length > 0 ? (discovered / col.factIds.length) * 100 : 0;

        return (
          <View key={col.id} style={styles.collectionDetailCard}>
            <View style={[styles.collectionHeader, { borderLeftColor: col.accentColor }]}>
              <Text style={styles.collectionDetailIcon}>{col.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.collectionDetailTitle}>{getLocalizedText(col.title, language)}</Text>
                <Text style={styles.collectionDetailDesc}>{getLocalizedText(col.description, language)}</Text>
              </View>
              {isComplete && <Text style={styles.completeBadge}>✓</Text>}
            </View>
            <View style={styles.collectionProgressBar}>
              <View style={[styles.collectionProgressFill, { width: `${progressPercent}%`, backgroundColor: col.accentColor }]} />
            </View>
            <Text style={styles.collectionProgressText}>
              {discovered} / {col.factIds.length} {isTamil ? 'கண்டறியப்பட்டது' : 'discovered'}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );

  // ═══════════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════════════════════════
  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      {renderHeader()}

      {viewMode === 'home' && renderHome()}
      {viewMode === 'swipe' && renderSwipeView()}
      {viewMode === 'true-false' && renderTrueFalse()}
      {viewMode === 'guess' && renderGuessFact()}
      {viewMode === 'quiz' && renderQuiz()}
      {viewMode === 'collections' && renderCollections()}
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════
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
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  backBtnText: {
    fontSize: 18,
    color: theme.colors.navy900,
  },
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.navy900,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  // First Time
  firstTimeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  firstTimeIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.colors.blue50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  firstTimeTitle: {
    ...theme.typography.h1,
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  firstTimeSubtitle: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 22,
  },
  firstTimeButton: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.md,
  },
  firstTimeButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
  },
  // Home
  homeTitle: {
    ...theme.typography.h1,
    color: theme.colors.navy900,
    marginBottom: theme.spacing.xs,
  },
  homeSubtitle: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  streakCard: {
    backgroundColor: colors.warningBackground,
    borderRadius: 12,
    padding: 14,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: colors.warningBorder,
  },
  streakText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.warning,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.overline,
    color: theme.colors.slate500,
    marginBottom: theme.spacing.md,
    letterSpacing: 1.5,
  },
  // Fact Card
  factCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  factCardCompact: {
    padding: theme.spacing.md,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: theme.spacing.sm,
  },
  categoryBadgeText: {
    ...theme.typography.caption,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  factText: {
    ...theme.typography.h3,
    color: theme.colors.navy900,
    lineHeight: 24,
    marginBottom: theme.spacing.sm,
  },
  factExplanation: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  factFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  factIcon: {
    fontSize: 20,
  },
  factActions: {
    flexDirection: 'row',
    gap: 16,
  },
  saveBtn: {
    fontSize: 20,
    color: theme.colors.error500,
  },
  shareBtn: {
    fontSize: 18,
    color: theme.colors.slate500,
  },
  // Modes Grid
  modesGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  modeCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  modeIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  modeLabel: {
    ...theme.typography.caption,
    color: theme.colors.navy900,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Collections
  collectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
    marginBottom: 8,
  },
  collectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  collectionTitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.navy900,
    fontWeight: '600',
  },
  collectionProgress: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  collectionComplete: {
    fontSize: 18,
    color: theme.colors.success,
    fontWeight: '700',
  },
  savedCount: {
    ...theme.typography.body,
    color: theme.colors.slate600,
  },
  progressCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
    marginBottom: 8,
  },
  progressLabel: {
    ...theme.typography.body,
    color: theme.colors.slate600,
  },
  progressValue: {
    ...theme.typography.bodyLarge,
    color: theme.colors.navy900,
    fontWeight: '700',
  },
  // Swipe
  swipeContainer: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  swipeProgress: {
    ...theme.typography.body,
    color: theme.colors.slate500,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  swipeActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: theme.spacing.lg,
  },
  swipeBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipePrev: {},
  swipeNext: {
    backgroundColor: theme.colors.actionPrimary,
    borderColor: theme.colors.actionPrimary,
  },
  swipeBtnText: {
    fontSize: 20,
    color: theme.colors.navy900,
  },
  // Quiz
  quizContainer: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  quizProgress: {
    ...theme.typography.body,
    color: theme.colors.slate500,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.gray200,
    borderRadius: 2,
    marginBottom: theme.spacing.lg,
  },
  progressBarFill: {
    height: 4,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: 2,
  },
  questionCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  questionText: {
    ...theme.typography.h3,
    color: theme.colors.navy900,
    textAlign: 'center',
    lineHeight: 26,
  },
  // True/False
  tfButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: theme.spacing.lg,
  },
  tfBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    borderWidth: 2,
  },
  tfTrue: {
    backgroundColor: colors.successSurface,
    borderColor: colors.successBorder,
  },
  tfFalse: {
    backgroundColor: colors.errorBackground,
    borderColor: colors.errorBorder,
  },
  tfBtnSelected: {
    borderWidth: 3,
  },
  tfBtnText: {
    ...theme.typography.button,
    fontSize: 16,
  },
  tfBtnTextSelected: {
    fontWeight: '800',
  },
  // Options
  optionsContainer: {
    gap: 10,
    marginBottom: theme.spacing.lg,
  },
  optionBtn: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    padding: 14,
    alignItems: 'center' as const,
  },
  optionCorrect: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.success,
    padding: 14,
    alignItems: 'center',
  },
  optionIncorrect: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.error,
    padding: 14,
    alignItems: 'center',
  },
  optionText: {
    ...theme.typography.bodyLarge,
    color: theme.colors.navy900,
    fontWeight: '500',
  },
  // Feedback
  feedbackContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  feedbackTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  feedbackCorrect: {
    color: theme.colors.success,
  },
  feedbackIncorrect: {
    color: theme.colors.error600,
  },
  feedbackExplanation: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  nextBtn: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    minWidth: 160,
    alignItems: 'center',
  },
  nextBtnText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 14,
  },
  // Collections Detail
  collectionDetailCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  collectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 3,
    paddingLeft: 12,
    marginBottom: theme.spacing.sm,
  },
  collectionDetailIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  collectionDetailTitle: {
    ...theme.typography.h3,
    color: theme.colors.navy900,
  },
  collectionDetailDesc: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
    marginTop: 2,
  },
  completeBadge: {
    fontSize: 18,
    color: theme.colors.success,
    fontWeight: '700',
  },
  collectionProgressBar: {
    height: 6,
    backgroundColor: theme.colors.gray200,
    borderRadius: 3,
    marginBottom: 6,
  },
  collectionProgressFill: {
    height: 6,
    borderRadius: 3,
  },
  collectionProgressText: {
    ...theme.typography.caption,
    color: theme.colors.slate500,
  },
});
